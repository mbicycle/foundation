import { useCallback, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getGuestTokenValidity, logoutFn } from '@mbicycle/msal-bundle';
import useAuthStore from 'stores/auth';
import useGuestTokenStore from 'stores/guestToken';
import useUserStore from 'stores/user';

import { AuthState } from 'utils/const';
import CONFIG from 'utils/envConfig';
import msGraphInstance from 'utils/msal';
import type { CookieSetOptions } from 'utils/types';

const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
  domain: CONFIG.appDomain,
};

export const useAuthSilent = () => {
  const { setState: setAuthState } = useAuthStore();
  const { setUser, removeUser } = useUserStore();
  const { guestToken, setGuestToken, clearGuestToken } = useGuestTokenStore();

  const [{ token }, setCookie, removeCookie] = useCookies(['token']);

  const logout = useCallback(async () => {
    removeUser();
    clearGuestToken();
    removeCookie('token');
    setAuthState(AuthState.LoggedOut);
    await logoutFn(msGraphInstance.msalInstance, msGraphInstance.config.auth.redirectUri);
  }, [clearGuestToken, removeCookie, removeUser, setAuthState]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryLogout = searchParams.get('logout');
    if (queryLogout) {
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
      return;
    }

    msGraphInstance.acquireToken().then((result) => {
      if (result) {
        setAuthState(AuthState.LoggedIn);
        setUser({
          name: result.account.username,
          role: result.idTokenClaims.roles[0] || '',
        });
        setCookie('token', result.accessToken, cookieOptions);
      } else {
        setAuthState(AuthState.LoggedOut);
      }
    }).catch((e) => {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    });
  }, [logout, removeCookie, setAuthState, setCookie, setGuestToken, setUser]);

  return {
    token,
    guestToken,
  };
};
