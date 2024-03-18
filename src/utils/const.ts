import CONFIG from './envConfig';
import type { CookieSetOptions } from './types';

export enum AuthState {
    Loading = 'loading',
    LoggedIn = 'loggedIn',
    LoggedOut = 'loggedOut',
}

export enum Routes {
    Base = '/',
    Login = '/login',
    Dashboard = '/dashboard',
}

export const cookieOptions: CookieSetOptions = {
  path: '/',
  sameSite: 'none',
  secure: true,
  domain: CONFIG.appDomain,
};

export const COOKIE_NAME = 'msalUserEmail';
