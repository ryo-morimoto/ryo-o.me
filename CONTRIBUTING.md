# Contributing

## Cold start

1. Install Node.js `>=24` (nvm / fnm reads `.nvmrc` → `24.19.0`).
2. Enable pnpm 11 if needed: `corepack enable` (lockfile expects `pnpm@11.21.0`).
3. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The app listens on http://localhost:4321/. No environment file is required.

Do not run Launch `pnpm dev` and `pnpm ensure-dev` at the same time (both use port 4321).

If `pnpm install --frozen-lockfile` fails, the lockfile is out of date — regenerate with `pnpm install` and commit `pnpm-lock.yaml` (do not commit a placeholder).

`pnpm-workspace.yaml` sets `minimumReleaseAge: 0` so same-day releases (Astro / TanStack) still install. Treat lockfile reviews as the supply-chain gate.

## Agent / background server

`astro` is a local binary. Use package scripts, not a global `astro` on PATH (ignore `astro dev stop|status|logs` printed by the Astro CLI). `pnpm dev:status` exits 0 even when idle — start with `pnpm ensure-dev`:

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

`pnpm dev:logs` follows logs (`astro dev logs --follow`) and does not return until the server stops or you interrupt it.

## Checks

```sh
pnpm test
pnpm typecheck
pnpm build
```

CI (`.github/workflows/ci.yml`, job `ci`) runs the same three commands after `pnpm install --frozen-lockfile`. The a11y JSON must exist under `dist/` or the job fails.

`pnpm check` / `astro check` is not used: `@astrojs/check` still needs TypeScript's 6.x programmatic API, and this repo pins TypeScript 7.

`pnpm typecheck` runs `astro sync` first so `.astro/types.d.ts` exists (it is gitignored). Then `tsc --noEmit`.
