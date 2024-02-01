import type { AuthenticationResult } from '@azure/msal-browser';

export type UserRole = 'admin' | 'god' | 'user' | 'guest';
export interface MsUser {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    businessPhones: any[];
    displayName: string;
    givenName: string;
    jobTitle: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
}

export interface IdTokenClaims {
    aud: string;
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    aio: string;
    name: string;
    nonce: string;
    oid: string;
    'preferred_username': string;
    rh: string;
    sub: string;
    tid: string;
    uti: string;
    ver: string;
    roles: UserRole[]
}

export interface AuthModel extends AuthenticationResult{
    idTokenClaims: IdTokenClaims;
}
