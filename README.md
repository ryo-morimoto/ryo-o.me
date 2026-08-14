# ryo-o.me — おしゃん個人ブログ

Astro（コンテンツ）+ Cloudflare（エッジ）の個人サイト。

## 特徴

- **Life Changelog** をホームの主役に
- 記事は 65ch 前後の読書レイアウト + Reading Rail / Focus (`R`) / 動的残り時間
- Recall Strip・Margin Whisper
- Modest Subscribe（RSS 先行）

## 開発

```sh
pnpm install
pnpm dev
```

## コンテンツ

- 記事: `src/content/posts/*.mdx`
- Changelog: `src/content/changelog/*.md`
- サイト名など: `src/lib/site.ts`
