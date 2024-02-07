import { useCallback, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import * as msGraph from 'msal-bundle';
import type { UserRole } from 'msal-bundle/dist/models';

import { AuthState } from 'utils/const';

// TODO:
const cookieOptions = {
  // path: '/',
  // sameSite: 'none',
};

export const useAuth = () => {
  const [authState, setAuthState] = useState(AuthState.Loading);
  const [userName, setUserName] = useState('');
  const [guestToken, setGuestToken] = useState('');

  const [
    { token, role },
    setCookie,
    removeCookie,
  ] = useCookies<'token' | 'role', {
    token?: string;
    role?: UserRole;
  }>(['token', 'role']);

  console.log('searchParams', window.location.search);

  const login = async () => {
    try {
      const user = await msGraph.loginFn();
      console.log('auth user', user);
      setUserName(user.account.username);
      setAuthState(AuthState.LoggedIn);
      setCookie('token', user.accessToken, cookieOptions);
    } catch (e) {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    }
  };

  const logout = useCallback(async () => {
    setUserName('');
    removeCookie('token');
    removeCookie('role');
    setAuthState(AuthState.LoggedOut);
    await msGraph.logoutFn(true);
    window.history.replaceState({}, '', '/');
  }, [removeCookie]);

  useEffect(() => {
    msGraph.acquireToken().then((result) => {
      console.log('msGraph.getToken()', result);
      if (result) {
        setAuthState(AuthState.LoggedIn);
        setUserName(result.account.username);
        setCookie('token', result.accessToken, cookieOptions);
      } else {
        setAuthState(AuthState.LoggedOut);
      }
    }).catch((e) => {
      console.error(e);
      setAuthState(AuthState.LoggedOut);
    });
  }, [setCookie]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    const queryLogout = searchParams.get('logout');
    if (queryLogout) {
      console.log('unauth');
      logout();
    }

    const queryGuestToken = searchParams.get('token');
    if (queryGuestToken) {
      msGraph.getGuestTokenValidity(queryGuestToken)
        .then((isValid) => {
          if (isValid) {
            setAuthState(AuthState.LoggedIn);
            setUserName('Guest');
            setGuestToken(queryGuestToken);
            setCookie('token', guestToken, cookieOptions);
            setCookie('role', 'guest');
          } else {
            alert('Token invalid');
            setAuthState(AuthState.LoggedOut);
          }
        });
    }
  }, [guestToken, logout, removeCookie, setCookie]);

  return {
    userName,
    token,
    guestToken,
    role,
    login,
    logout,
    authState,
  };
};
