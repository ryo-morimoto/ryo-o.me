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
pnpm verify   # test + TS7 tsc --checkers 4 + astro check --noSync + oxlint --type-aware + oxfmt --check
pnpm build    # HTML, content collections, a11y JSON — merge gate
```

`pnpm verify` is `pnpm test && pnpm typecheck && pnpm check:astro && pnpm lint && pnpm fmt:check`. Use it after a code change before paying for a full build.

Do not replace `pnpm typecheck` with `astro check`, and do not set `build` to `astro check && astro build`.

Policy A: `.ts` truth is TypeScript 7 via `@typescript/native` (`tsc --noEmit --checkers 4`). `--checkers 4` is the compiler default, pinned so local and CI partition the same way; do not override it. `astro check` is in the loop because `tsc` ignores `.astro` files. It also type-checks `.ts` again through the TypeScript 6 language server (`typescript` is aliased to `@typescript/typescript6` so that API exists). The `.ts` overlap is accepted. If the two tools disagree on a `.ts` file, `tsc` wins.

`pnpm check:astro` is `astro check --noSync`. Run it only after `pnpm typecheck` (or `astro sync`). `pnpm typecheck:tsc6` is comparison-only and is not the merge gate.

`pnpm lint` is `oxlint --type-aware --deny-warnings` (tsgolint). Type-aware linting is a correctness check. `pnpm fmt` / `pnpm fmt:check` is Oxfmt; format-on-save is in `.vscode/settings.json`. Authored posts under `src/content/` are not formatted.

CI (`.github/workflows/ci.yml`, job `ci`) runs `pnpm test`, `pnpm typecheck`, `pnpm check:astro`, `pnpm lint`, `pnpm fmt:check`, then `pnpm build` after `pnpm install --frozen-lockfile`. The a11y JSON must exist under `dist/` or the job fails.

Unit tests cover pure helpers under `src/lib/` (file-level). Content collection schemas, MDX, islands, and generated routes are gated by `pnpm build`, not by the unit suite. If you change `src/content.config.ts`, `src/content/**`, or page/island templates, run `pnpm build` even when `pnpm verify` is green.

CI does not retry failed steps.
