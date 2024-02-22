import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { getGuestTokenValidity, logoutFn } from '@mbicycle/msal-bundle';
import useAuthStore from 'stores/auth';
import useUserStore from 'stores/user';

import { AuthState } from 'utils/const';
import msGraphInstance from 'utils/msal';
import type { CookieSetOptions } from 'utils/types';

const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
};

export const useAuthSilent = () => {
  const { setState: setAuthState } = useAuthStore();
  const { setUser } = useUserStore();

  const [guestToken, setGuestToken] = useState('');

  const [{ token }, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryLogout = searchParams.get('logout');
    if (queryLogout) {
      logoutFn(msGraphInstance.msalInstance, true);
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
            // setCookie('guestToken', queryGuestToken, cookieOptions);
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
  }, [removeCookie, setAuthState, setCookie, setUser]);

  return {
    token,
    guestToken,
  };
};
