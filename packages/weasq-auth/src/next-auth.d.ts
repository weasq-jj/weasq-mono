import { Session } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    error?: 'RefreshAccessTokenError';
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string;
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    error?: 'RefreshAccessTokenError';
  }
}

export type WeasqAuthSession = Session;
export type WeasqAuthToken = JWT;
