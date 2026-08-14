# Contributing

## Cold start

1. Install Node.js `>=22.12.0` (nvm / fnm will read `.nvmrc`).
2. Enable pnpm 10 if needed: `corepack enable`.
3. From the repository root:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

The app listens on http://localhost:4321/. No environment file is required.

If `pnpm install --frozen-lockfile` fails, the lockfile is out of date — regenerate with `pnpm install` and commit `pnpm-lock.yaml` (do not commit a placeholder).

## Agent / background server

`astro` is a local binary. Use package scripts, not a global `astro` on PATH (ignore `astro dev stop|status|logs` printed by the Astro CLI):

```sh
pnpm dev:background
pnpm dev:status
pnpm dev:logs
pnpm dev:stop
```

## Checks

```sh
pnpm check
pnpm typecheck
pnpm build
```

CI runs `pnpm install --frozen-lockfile` then `pnpm build` (see `.github/workflows/ci.yml`).
