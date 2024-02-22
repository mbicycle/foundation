import { useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { loginFn, logoutFn } from '@mbicycle/msal-bundle';
import useAuthStore from 'stores/auth';
import useUserStore from 'stores/user';

import { AuthState } from 'utils/const';
import msGraphInstance from 'utils/msal';
import type { CookieSetOptions } from 'utils/types';

const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
  domain: '.localhost',
};

export const useAuth = () => {
  const { setState: setAuthState } = useAuthStore();
  const { setUser, removeUser } = useUserStore();

  const [{ token }, setCookie, removeCookie] = useCookies(['token']);

  const login = useCallback(async () => {
    try {
      const authResult = await loginFn(msGraphInstance.msalInstance);
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
  }, [setAuthState, setCookie, setUser]);

  const logout = useCallback(async () => {
    removeUser();
    removeCookie('token');
    setAuthState(AuthState.LoggedOut);
    await logoutFn(msGraphInstance.msalInstance, true);
  }, [removeCookie, removeUser, setAuthState]);

  return {
    token,
    login,
    logout,
  };
};
