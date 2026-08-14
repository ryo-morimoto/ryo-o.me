# ryo-o.me — おしゃん個人ブログ

Astro（コンテンツ）+ Cloudflare（エッジ）の個人サイト。

## 特徴

- **Life Changelog** をホームの主役に
- 記事は 65ch 前後の読書レイアウト + Reading Rail / Focus (`R`) / 動的残り時間
- Recall Strip・Margin Whisper
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

## コンテンツ

- 記事: `src/content/posts/*.mdx`
- Changelog: `src/content/changelog/*.md`
- サイト名など: `src/lib/site.ts`

貢献の手順は [CONTRIBUTING.md](./CONTRIBUTING.md) を参照してください。
