## Prerequisites

- Node.js `>=24` (see `.nvmrc`)
- pnpm `11` (`packageManager` in `package.json`; Corepack: `corepack enable`)

No `.env` or Cloudflare account is required to browse locally. Quiet Letter falls back to in-memory storage when D1/KV bindings are empty. IDs in `wrangler.jsonc` are placeholders until real Cloudflare resources exist. Wrangler may log placeholder KV ids at compile time; that does not block local pages or `POST /api/letters`.

## Development

Install from the repo root (requires the committed `pnpm-lock.yaml`):

```
pnpm install --frozen-lockfile
```

Do not call `astro` from PATH; it is not installed globally. Always use the `pnpm` scripts below (including instead of any `astro dev …` lines printed by the Astro CLI).

Check for an existing server, then start if needed (one command; `pnpm dev:status` exits 0 even when idle, so do not use `status || background`):

```
pnpm ensure-dev
```

That is the same command `.cursor/environment.json` `terminals` uses before `pnpm dev:logs`. Manage a running server with `pnpm dev:stop` and `pnpm dev:logs`. App: http://localhost:4321/

Do not start a second server on port 4321.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
