# ryo-o.me — おしゃん個人ブログ

Astro（コンテンツ）+ TanStack（読書の対話島）+ Cloudflare（エッジ）の個人サイト。

## 特徴

- **Life Changelog** をホームの主役に
- 記事は 65ch 前後の読書レイアウト + Reading Rail / Focus (`R`) / 動的残り時間
- Quiet Letter（いいね数なし）・Recall Strip・Margin Whisper
- Serendipity Walk（人気順ではない偶然の一本）
- Modest Subscribe（RSS 先行）

## 必要環境

- Node.js `>=22.12.0`（`.nvmrc` / `.node-version`）
- pnpm `10`（`package.json` の `packageManager`。未導入なら `corepack enable`）

シークレット、`.env`、Docker、Cloudflare アカウントは **ローカル閲覧には不要** です。

## 開発

```sh
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで http://localhost:4321/ を開く。

エージェント向け（PATH に `astro` は置かない。CLI が出す `astro dev stop` も使わず、次のスクリプトだけ使う）。`pnpm dev:status` はサーバー未起動でも exit 0 なので、起動判定は `pnpm ensure-dev` を使う:

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

VS Code / Cursor の Launch 設定（`.vscode/launch.json`）も同じ `pnpm` 経由です。

## Cloudflare（任意）

`wrangler.jsonc` の D1 / KV ID はプレースホルダです。ローカルの `astro dev` ではページはそのまま動き、Quiet Letter（`POST /api/letters`）はワーカー環境が空ならインメモリに保存します。本番の永続化には本物の D1 / KV を結びます。`GET /api/letters` は POST 専用のため 405 を返します。

## コンテンツ

- 記事: `src/content/posts/*.mdx`
- Changelog: `src/content/changelog/*.md`
- サイト名など: `src/lib/site.ts`

貢献の手順は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。
