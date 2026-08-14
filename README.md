# ryo-o.me

Astro で記事を書き、Cloudflare に載せる個人サイトである。

ホームは Changelog である。
記事は約 65ch で読む。
Reading Rail、Focus（`R`）、残り時間、Recall、Whisper がある。
購読は RSS が先である。

ノートと `/lab` はまだない。

## 必要環境

- Node.js `>=24`（ピンは `.nvmrc` の `24.19.0`）
- pnpm `11`（`package.json` の `packageManager` は `pnpm@11.21.0`。未導入なら `corepack enable`）

ローカルでページを開くのに、シークレットも `.env` も Cloudflare アカウントも要らない。

## 開発

```sh
pnpm install --frozen-lockfile
pnpm ensure-dev
```

http://localhost:4321/ を開く。

`pnpm dev:status` はサーバーが止まっていても exit 0 である。
起動判定に使わない。`pnpm ensure-dev` を使う。

Launch（`.vscode/launch.json` の `pnpm dev`）と `pnpm ensure-dev` は同時に使わない。
どちらも 4321 を取る。

PATH の `astro` は使わない。
Astro CLI が出す `astro dev stop` も使わない。
次だけ使う。

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

`pnpm dev:logs` はバックグラウンドサーバーのログを追う。
未起動なら非ゼロで終わる。

## コンテンツ

- 記事：`src/content/posts/*.mdx`
- Changelog：`src/content/changelog/*.md`
- サイト名：`src/lib/site.ts`

手順の続きは [CONTRIBUTING.md](./CONTRIBUTING.md) にある。
製品の事実は [PRODUCT.md](./PRODUCT.md) にある。
現行の見た目の記録は [DESIGN.md](./DESIGN.md) にある。
