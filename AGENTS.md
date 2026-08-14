## Prerequisites

- Node.js `>=22.12.0` (see `.nvmrc`)
- pnpm `10` (`packageManager` in `package.json`; Corepack: `corepack enable`)

No `.env` or Cloudflare account is required to browse locally. Quiet Letter falls back to in-memory storage when D1/KV bindings are empty. IDs in `wrangler.jsonc` are placeholders until real Cloudflare resources exist. Wrangler may log placeholder KV ids at compile time; that does not block local pages or `POST /api/letters`.

## Development

Install from the repo root (requires the committed `pnpm-lock.yaml`):

```
pnpm install --frozen-lockfile
```

Do not call `astro` from PATH; it is not installed globally. Always use the `pnpm` scripts below (including instead of any `astro dev …` lines printed by the Astro CLI).

Check for an existing server first:

```
pnpm dev:status
```

If none is running, start in background mode:

```
pnpm dev:background
```

Manage it with `pnpm dev:stop` and `pnpm dev:logs`. App: http://localhost:4321/

Cursor Cloud (`.cursor/environment.json` `terminals`) uses the same scripts: status, then `pnpm dev:background` if needed, then `pnpm dev:logs`. Do not start a second server on port 4321.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
