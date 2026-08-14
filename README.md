# ryo-o.me — おしゃん個人ブログ

Astro（コンテンツ）+ TanStack（読書の対話島）+ Cloudflare（エッジ）の個人サイト。

## 特徴

- **Life Changelog** をホームの主役に
- 記事は 65ch 前後の読書レイアウト + Reading Rail / Focus (`R`) / 動的残り時間
- Quiet Letter（いいね数なし）・Recall Strip・Margin Whisper
- Serendipity Walk（人気順ではない偶然の一本）
- Modest Subscribe（RSS 先行）

## 必要環境

- Node.js `>=24`（ピンは `.nvmrc` / `.node-version` の `24.19.0`）
- pnpm `11`（ピンは `package.json` の `packageManager`: `pnpm@11.21.0`。未導入なら `corepack enable`）

シークレット、`.env`、Docker、Cloudflare アカウントは **ローカル閲覧には不要** です。

## 開発

```sh
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで http://localhost:4321/ を開く。

Launch（`.vscode/launch.json` の `pnpm dev`）と `pnpm ensure-dev` は同時に使わない。どちらも 4321 を取る。

エージェント向け（PATH に `astro` は置かない。CLI が出す `astro dev stop` も使わず、次のスクリプトだけ使う）。`pnpm dev:status` はサーバー未起動でも exit 0 なので、起動判定は `pnpm ensure-dev` を使う:

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

`pnpm dev:logs` はバックグラウンドサーバーのログを追従する（`astro dev logs --follow`）。未起動なら非ゼロで終了する。

## Cloudflare（任意）

`wrangler.jsonc` の D1 / KV ID はプレースホルダです。ローカルの `pnpm dev` ではページはそのまま動き、Quiet Letter（`POST /api/letters`）はワーカー環境が空なら **そのプロセス内のメモリ** に保存します（再起動や別 isolate では消え、本番の永続化ではない）。本番には本物の D1 / KV を結びます。`GET /api/letters` は POST 専用のため 405 を返します。

## コンテンツ

- 記事: `src/content/posts/*.mdx`
- Changelog: `src/content/changelog/*.md`
- サイト名など: `src/lib/site.ts`

貢献の手順は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。
