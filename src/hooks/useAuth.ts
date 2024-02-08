import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import * as msGraph from 'msal-bundle';

import { AuthState } from 'utils/const';
import type { CookieSetOptions } from 'utils/types';

interface IUser {
  name: string
  role: string
}

const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
};

export const useAuth = () => {
  const [authState, setAuthState] = useState(AuthState.Loading);
  const [user, setUser] = useState<IUser | null>(null);
  const [guestToken, setGuestToken] = useState('');

  const [{ token }, setCookie, removeCookie] = useCookies(['token']);

  const login = async () => {
    try {
      const authResult = await msGraph.loginFn();
      setUser({
        name: authResult.account.username,
        role: authResult.idTokenClaims.roles[0] || '',
      });
      setAuthState(AuthState.LoggedIn);
      setCookie('token', authResult.accessToken, cookieOptions);
    } catch (e) {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    }
  };

  const logout = useCallback(async () => {
    setUser(null);
    setGuestToken('');
    removeCookie('token');
    setAuthState(AuthState.LoggedOut);
    await msGraph.logoutFn(true);
  }, [removeCookie]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryLogout = searchParams.get('logout');
    if (queryLogout) {
      logout();
      return;
    }

    const queryGuestToken = searchParams.get('token');
    if (queryGuestToken) {
      msGraph.getGuestTokenValidity(queryGuestToken)
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

    msGraph.acquireToken().then((result) => {
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
  }, [logout, removeCookie, setCookie]);

  return {
    user,
    token,
    guestToken,
    login,
    logout,
    authState,
  };
};
