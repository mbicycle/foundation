import type { AccountInfo, SilentRequest } from '@azure/msal-browser';
import { InteractionRequiredAuthError, InteractionType, PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import {
  AuthCodeMSALBrowserAuthenticationProvider,
} from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

import { loginRequest, msalConfig } from './config';
import type { AuthModel } from './models';

const msGraph = (): {
    graphClient: Client,
    authProvider: AuthCodeMSALBrowserAuthenticationProvider,
    msalInstance: PublicClientApplication,
    setActiveAccount: () => Promise<AccountInfo | null>
    getRequest: () => SilentRequest
    acquireToken: () => Promise<AuthModel | null>
} => {
  const msalInstance = new PublicClientApplication(msalConfig);
  msalInstance.initialize();

  const getRequest = (): SilentRequest => {
    const account = msalInstance.getActiveAccount();
    return {
      ...loginRequest,
      account: account ?? {} as AccountInfo,
      forceRefresh: true,
      redirectUri: '/',
    };
  };

  let graphClient: Client | undefined;

  const acquireToken = async () => {
    const request = getRequest();
    let result: AuthModel | null = null;
    try {
      console.log('acquireTokenSilent');
      result = await msalInstance.acquireTokenSilent(request) as AuthModel;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        console.log('InteractionRequiredAuthError');
        result = await msalInstance.acquireTokenSilent(request) as AuthModel;
      }
      console.log('acquireToken error', error);
    }
    return result;
  };

  const setActiveAccount = async (): Promise<AccountInfo | null> => {
    await msalInstance.initialize();
    const activeAccount = msalInstance.getActiveAccount();
    const request = getRequest();

    if (!activeAccount) {
      if (request.account) {
        msalInstance.setActiveAccount(request.account);
      }
    }

    return activeAccount;
  };

  const ensureClient = (authProvider: AuthCodeMSALBrowserAuthenticationProvider): Client => {
    setActiveAccount();

    console.log('graphClient', graphClient);

    if (!graphClient) {
      graphClient = Client.initWithMiddleware({ authProvider });
      console.log('graphClient2', graphClient);
    }

    return graphClient;
  };
  const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance as PublicClientApplication,
        {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          account: msalInstance.getActiveAccount()!,
          scopes: loginRequest.scopes,
          interactionType: InteractionType.Silent,
        },
  );

  return {
    authProvider,
    graphClient: ensureClient(authProvider),
    msalInstance,
    setActiveAccount,
    getRequest,
    acquireToken,
  };
};

export default msGraph();
