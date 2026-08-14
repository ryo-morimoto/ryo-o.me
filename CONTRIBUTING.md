# Contributing

## コールドスタート

1. Node.js `>=24` を入れる（nvm / fnm は `.nvmrc` の `24.19.0` を読む）。
2. 必要なら `corepack enable` で pnpm 11 を有効にする（lockfile は `pnpm@11.21.0`）。
3. リポジトリの根で次を実行する。

```sh
pnpm install --frozen-lockfile
pnpm ensure-dev
```

http://localhost:4321/ で開く。
環境ファイルは要らない。

Launch の `pnpm dev` と `pnpm ensure-dev` は同時に動かさない。
どちらも 4321 を使う。

`pnpm install --frozen-lockfile` が失敗したら、lockfile が古い。
`pnpm install` で作り直し、`pnpm-lock.yaml` をコミットする。
プレースホルダの lockfile はコミットしない。

`pnpm-workspace.yaml` の `minimumReleaseAge` は `0` である。
当日の Astro リリースも入る。
サプライチェーンの門は lockfile のレビューである。

## エージェントとバックグラウンドサーバー

`astro` はローカルのバイナリである。
PATH のグローバル `astro` は使わない。
Astro CLI が出す `astro dev stop|status|logs` は無視する。

`pnpm dev:status` は止まっていても exit 0 である。
起動は `pnpm ensure-dev` である。

```sh
pnpm ensure-dev
pnpm dev:logs
pnpm dev:stop
```

`pnpm dev:logs` はログを追う。
サーバーが止まるか、中断するまで戻らない。

## 検査

```sh
pnpm test
pnpm typecheck
pnpm build
```

CI（`.github/workflows/ci.yml` の job `ci`）は、`pnpm install --frozen-lockfile` のあと、同じ三つを走らせる。
`dist/` に a11y の JSON が無いと job は落ちる。

`pnpm check` と `astro check` は使わない。
`@astrojs/check` が TypeScript 6 の programmatic API を要求し、このリポジトリは TypeScript 7 をピンしているためである。

`pnpm typecheck` は先に `astro sync` を走らせ、gitignore された `.astro/types.d.ts` を作ってから `tsc --noEmit` する。
