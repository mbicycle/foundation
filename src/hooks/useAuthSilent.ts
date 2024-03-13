import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getGuestTokenValidity } from '@mbicycle/msal-bundle';

import useAuthStore from 'stores/auth';
import useGuestTokenStore from 'stores/guestToken';
import useUserStore from 'stores/user';

import { AuthState, COOKIE_NAME } from 'utils/const';
import CONFIG from 'utils/envConfig';
import msGraphInstance from 'utils/msal';
import type { CookieSetOptions } from 'utils/types';

import { useAuth } from './useAuth';

const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
  domain: CONFIG.appDomain,
};

export const useAuthSilent = () => {
  const { login, logout } = useAuth();
  const { state: authState, setState: setAuthState } = useAuthStore();
  const { setUser } = useUserStore();
  const { guestToken, setGuestToken } = useGuestTokenStore();

  const [, setCookie, removeCookie] = useCookies([COOKIE_NAME]);

  useEffect(() => {
    if (authState === AuthState.LoggedIn) {
      msGraphInstance.acquireToken().then((authResult) => {
        // TODO: if there is no cookie, set it
        if (authResult) setCookie(COOKIE_NAME, authResult.account.username, cookieOptions);
      });
    }
  }, [authState, setCookie]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryLogout = searchParams.get('logout');
    if (queryLogout && authState !== AuthState.LoggedOut) {
      logout();
      return;
    }

    const queryGuestToken = searchParams.get('token');
    if (queryGuestToken) {
      getGuestTokenValidity(queryGuestToken)
        .then((isValid) => {
          if (isValid) {
            setAuthState(AuthState.LoggedIn);
            setUser({
              name: 'Guest',
              role: 'guest',
            });
            setGuestToken(queryGuestToken);
          } else {
            alert('Guest token is invalid');
            setAuthState(AuthState.LoggedOut);
          }
        });
    }
  }, [authState, logout, removeCookie, setAuthState, setGuestToken, setUser]);

  return {
    guestToken,
    logout,
    login,
  };
};
