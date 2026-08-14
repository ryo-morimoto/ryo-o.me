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

`pnpm-workspace.yaml` sets `minimumReleaseAge: 0` so same-day releases (Astro) still install. Treat lockfile reviews as the supply-chain gate.

## Agent / background server

`astro` is a local binary. Use package scripts, not a global `astro` on PATH (ignore `astro dev stop|status|logs` printed by the Astro CLI). `pnpm dev:status` exits 0 even when idle — start with `pnpm ensure-dev`:

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

`pnpm dev:logs` follows logs (`astro dev logs --follow`) and does not return until the server stops or you interrupt it.

## Checks

Layers (cheapest correctness first):

```sh
pnpm verify   # test + typecheck — local / agent inner loop
pnpm build    # HTML, content collections, a11y JSON — merge gate
```

`pnpm verify` is `pnpm test && pnpm typecheck`. Use it after a code change before paying for a full build. `pnpm check` / `astro check` is not used: `@astrojs/check` still needs TypeScript's 6.x programmatic API, and this repo pins TypeScript 7.

CI (`.github/workflows/ci.yml`, job `ci`) runs `pnpm test`, `pnpm typecheck`, then `pnpm build` after `pnpm install --frozen-lockfile`. The a11y JSON must exist under `dist/` or the job fails. There is no linter in this repo; do not add one as a PR-blocking step.

`pnpm typecheck` runs `astro sync` first so `.astro/types.d.ts` exists (it is gitignored). Then `tsc --noEmit`, including `tests/`.

Unit tests cover pure helpers under `src/lib/` (file-level). Content collection schemas, MDX, islands, and generated routes are gated by `pnpm build`, not by the unit suite. If you change `src/content.config.ts`, `src/content/**`, or page/island templates, run `pnpm build` even when `pnpm verify` is green.

CI does not retry failed steps.
