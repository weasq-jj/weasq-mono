import { Account, AuthOptions, TokenSet } from 'next-auth';
import { JWT, getToken } from 'next-auth/jwt';
import KeycloakProvider from 'next-auth/providers/keycloak';
import { NextRequest, NextResponse } from 'next/server';

export interface KeycloakAuthEnv {
  KEYCLOAK_ISSUER: string;
  KEYCLOAK_CLIENT_ID: string;
  KEYCLOAK_CLIENT_SECRET: string;
  NEXTAUTH_URL: string;
  NEXTAUTH_SECRET: string;
}

const assertNonEmpty = (name: keyof KeycloakAuthEnv, value: string) => {
  if (!value) {
    throw new Error(`[weasq-auth] Missing required environment variable: ${name}`);
  }
};

const readEnv = (overrides: Partial<KeycloakAuthEnv> = {}): KeycloakAuthEnv => {
  const env: KeycloakAuthEnv = {
    KEYCLOAK_ISSUER: overrides.KEYCLOAK_ISSUER ?? process.env.KEYCLOAK_ISSUER ?? '',
    KEYCLOAK_CLIENT_ID: overrides.KEYCLOAK_CLIENT_ID ?? process.env.KEYCLOAK_CLIENT_ID ?? '',
    KEYCLOAK_CLIENT_SECRET: overrides.KEYCLOAK_CLIENT_SECRET ?? process.env.KEYCLOAK_CLIENT_SECRET ?? '',
    NEXTAUTH_URL: overrides.NEXTAUTH_URL ?? process.env.NEXTAUTH_URL ?? '',
    NEXTAUTH_SECRET: overrides.NEXTAUTH_SECRET ?? process.env.NEXTAUTH_SECRET ?? '',
  };

  assertNonEmpty('KEYCLOAK_ISSUER', env.KEYCLOAK_ISSUER);
  assertNonEmpty('KEYCLOAK_CLIENT_ID', env.KEYCLOAK_CLIENT_ID);
  assertNonEmpty('KEYCLOAK_CLIENT_SECRET', env.KEYCLOAK_CLIENT_SECRET);
  assertNonEmpty('NEXTAUTH_URL', env.NEXTAUTH_URL);
  assertNonEmpty('NEXTAUTH_SECRET', env.NEXTAUTH_SECRET);

  return env;
};

const requestRefreshOfAccessToken = async (token: JWT, env: KeycloakAuthEnv) =>
  fetch(`${env.KEYCLOAK_ISSUER}/protocol/openid-connect/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken!,
    }),
    method: 'POST',
    cache: 'no-store',
  });

export const createKeycloakAuthOptions = (overrides: Partial<KeycloakAuthEnv> = {}): AuthOptions => {
  const env = readEnv(overrides);

  return {
    providers: [
      KeycloakProvider({
        clientId: env.KEYCLOAK_CLIENT_ID,
        clientSecret: env.KEYCLOAK_CLIENT_SECRET,
        issuer: env.KEYCLOAK_ISSUER,
      }),
    ],
    session: {
      maxAge: 60 * 30,
    },
    callbacks: {
      async jwt({ token, account }: { token: JWT; account: Account | null }) {
        if (account) {
          token.idToken = account.id_token;
          token.accessToken = account.access_token;
          token.refreshToken = account.refresh_token;
          token.expiresAt = account.expires_at;
          return token;
        }

        if (!token.expiresAt || Date.now() < token.expiresAt * 1000 - 60 * 1000) {
          return token;
        }

        if (!token.refreshToken) {
          return { ...token, error: 'RefreshAccessTokenError' };
        }

        try {
          const response = await requestRefreshOfAccessToken(token, env);
          const tokens: TokenSet = await response.json();

          if (!response.ok) {
            throw tokens;
          }

          return {
            ...token,
            idToken: tokens.id_token,
            accessToken: tokens.access_token,
            expiresAt: Math.floor(Date.now() / 1000 + (tokens.expires_in as number)),
            refreshToken: tokens.refresh_token ?? token.refreshToken,
          };
        } catch (error) {
          console.error('Error refreshing access token', error);
          return { ...token, error: 'RefreshAccessTokenError' };
        }
      },
      async session({ session, token }) {
        if (token.error === 'RefreshAccessTokenError') {
          return { ...session, error: 'RefreshAccessTokenError' };
        }

        session.accessToken = token.accessToken;
        return session;
      },
    },
  };
};

const buildLogoutUrl = (token: JWT, env: KeycloakAuthEnv) => {
  const endpoint = new URL(`${env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout`);
  const params = new URLSearchParams({
    id_token_hint: token.idToken as string,
    post_logout_redirect_uri: env.NEXTAUTH_URL,
  });

  return `${endpoint.toString()}?${params.toString()}`;
};

export const createFederatedLogoutHandler = (overrides: Partial<KeycloakAuthEnv> = {}) => {
  const env = readEnv(overrides);

  return async (req: NextRequest) => {
    try {
      const token = await getToken({ req });

      if (!token?.idToken) {
        return NextResponse.json({ error: 'No session present' }, { status: 400 });
      }

      return NextResponse.json({ url: buildLogoutUrl(token, env) });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Unable to logout from session' }, { status: 500 });
    }
  };
};
