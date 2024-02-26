export enum AuthState {
    Loading = 'loading',
    LoggedIn = 'loggedIn',
    LoggedOut = 'loggedOut',
}

export enum Routes {
    Login = '/',
    Dashboard = '/dashboard',
    Redirect = '/redirect',
}

export const COOKIE_NAME = 'msalUserEmail';
