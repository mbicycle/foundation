import { loginRequest, msalConfig } from './config';
import msalInstance from './instance';
import type { AuthModel } from './models';

function loginFn(): Promise<AuthModel> {
  return msalInstance.loginPopup(loginRequest) as Promise<AuthModel>;
}

async function logoutFn(): Promise<void> {
  const msalAccount = msalInstance.getAllAccounts()[0];
  const logoutRequest = {
    account: msalAccount,
    postLogoutRedirectUri: msalConfig.auth.redirectUri,
    mainWindowRedirectUri: msalConfig.auth.redirectUri,
  };

  msalInstance.logoutPopup(logoutRequest);
}

export {
  loginFn,
  logoutFn,
};
