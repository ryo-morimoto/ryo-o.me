## Prerequisites

- Node.js `>=22.12.0` (see `.nvmrc`)
- pnpm `10` (`packageManager` in `package.json`; Corepack: `corepack enable`)

No `.env` or Cloudflare account is required to browse locally. Quiet Letter falls back to in-memory storage when D1/KV bindings are empty. IDs in `wrangler.jsonc` are placeholders until real Cloudflare resources exist.

## Development

Install from the repo root (requires the committed `pnpm-lock.yaml`):

```
pnpm install --frozen-lockfile
```

When starting the dev server, use background mode via the package script (do not call `astro` from PATH; it is not installed globally):

```
pnpm dev:background
```

Manage the background server with `pnpm dev:stop`, `pnpm dev:status`, and `pnpm dev:logs`.

Foreground equivalent (README): `pnpm dev` → http://localhost:4321/

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
