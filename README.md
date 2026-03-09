# weasq mono

A pnpm + Turborepo monorepo for weasQ.

## Stack baseline

- Node.js `>=24`
- React `19`
- Tailwind CSS `4`

## Workspace layout

- `apps/weasq-bpt-dashboard`: Next.js app
- `packages/weasq-ui`: shared UI package
- `packages/config-eslint`: shared ESLint configs
- `packages/config-typescript`: shared TypeScript configs
- `packages/config-prettier`: shared Prettier config (Tailwind class sorting + organize imports)

## Commands

- `pnpm dev`: run all dev tasks through Turbo
- `pnpm build`: build all workspaces
- `pnpm lint`: run lint across workspaces
- `pnpm check-types`: run type checks across workspaces
- `pnpm format`: format code with shared Prettier config

## Env setup

- Root template: `.env.example`
- App template: `apps/weasq-bpt-dashboard/.env.example`

Copy templates for local setup:

```sh
cp ".env.example" ".env.local"
cp "apps/weasq-bpt-dashboard/.env.example" "apps/weasq-bpt-dashboard/.env.local"
```

For environment-specific app values, use:

- `apps/weasq-bpt-dashboard/.env.development`
- `apps/weasq-bpt-dashboard/.env.production`

Yes, that is the right approach. Keep real secrets in local/non-committed env files, and keep only `*.example` files in git.
