# `@weasq/weasq-auth`

Reusable Keycloak + NextAuth helpers for weasQ apps.

## Required env vars (per app)

- `KEYCLOAK_ISSUER`
- `KEYCLOAK_CLIENT_ID`
- `KEYCLOAK_CLIENT_SECRET`
- `NEXTAUTH_URL`
- `NEXTAUTH_SECRET`

## App setup checklist

1. Add API routes:
   - `/app/api/auth/[...nextauth]/route.ts`
   - `/app/api/auth/federated-logout/route.ts`
2. Add type augmentation import in app types:
   - `import type {} from "@weasq/weasq-auth/next-auth";`
3. Wrap app tree with `Providers` from `@weasq/weasq-auth/providers`.
