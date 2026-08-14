# Product

<!-- impeccable:product-schema 1 -->

<!-- Interview: serve-question timed out with no answer. Facts below are from shipped copy and code. Lines marked [inferred] were not confirmed by a human this session. -->

## Platform

web

## Users

著者 **ryo** が、技術と生活のメモを同じ時間軸に置くための個人サイト。訪問者は、いいねやランキングのない部屋として読みに来る人。[inferred] 主読者は、情報の広場の数字に疲れて、長文をプライベートに読みたい日本語話者。著者自身も第一の利用者（書く・公開する・自分のログを辿る）。

## Product Purpose

`ryo-o.me` はポートフォリオのショーケースでも SNS でもなく、**広場ではなく部屋**として文章と活動の時間軸を置く。成功はトラフィックや公開カウントではなく、読み終わりまで居られること、数字を見ずに感想や自分の言葉を手元に残せること、著者の「その人の時間」が残ること。

## Positioning

評価の数字を出さず、読む行為そのものを装置にする。行長を読む測度（約 65ch）に保ち、Focus（`R`）、Reading Rail、動的な残り時間、任意の Recall Strip / Margin Whisper で、閉じられる進捗と自己説明だけを残す。人気順推薦やいいね数は置かない。隣の個人ブログが同じ CMS を使っても、「評価ゲームにしない」はコピーできない主張として出荷コピーに固定されている。

## Operating Context

- 公開 URL: `https://ryo-o.me`。ロケール `ja-JP`。
- ローカル: `pnpm ensure-dev` → http://localhost:4321/（Node 24 / pnpm 11）。`.env` や Cloudflare アカウントは閲覧に不要。
- コンテンツ: 記事 `src/content/posts/*.mdx`、Changelog `src/content/changelog/*.md`、サイト名は `src/lib/site.ts`。
- ホームの主役は Life Changelog（Twitter より静か、ポートフォリオより人間味、というコピー）。
- 記事一覧は新しい順。評価順ではない。
- 購読は RSS 先行（Modest Subscribe）。メールの週次ダイジェストはコピー上「想定」で未実装。
- 読書ツールの一部（Focus、Recall、Whisper）は端末の `sessionStorage` / `localStorage` にだけ残る。サーバに個人メモは送らない。

## Capabilities and Constraints

出荷されている面:

- Home（Changelog）、Posts、記事、About、Subscribe、RSS、記事 OG（`/og/[slug].svg`）。
- 記事: Post Header、動的残り時間、Reading Rail（目次と進捗）、本文、任意の Thread of Self（「この頃の自分」）、Recall Strip（「3行で言うと？」・端末内）、前後ナビ、Focus Mode（`R`）、Margin Whisper（「なぜ？」メモ・端末内）。
- CI は `pnpm test` / `typecheck` / `build` と a11y チェックリスト JSON の存在確認。

用語（出荷 UI）: Life Changelog、Personal room、Modest Subscribe、Reading Rail、Focus、Recall Strip、Margin Whisper、Thread of Self（この頃の自分）。

制約:

- いいね数・ランキング・公開カウントを置かない。
- 依存を薄く、読む体験を厚く（About の主張）。スタックは Astro + Cloudflare。
- 週次メールは未実装。未決定のまま残す。
- 記事・Changelog は Serendipity Walk や数字のない感想レターに触れるが、現行 UI には未実装。復活するかどうかは未決定。実装されていない機能を、あるものとして描かない。

## Brand Commitments

- 名前: **ryo**。サイト: **ryo-o.me**。
- 声: 静か、急かさない、評価しない。「広場ではなく、部屋。評価の数字は置きません。」
- タグライン: 「静かめの部屋に、考えてたことと作ったものを置いています。」
- 言語: 日本語（ナビラベルの Home / Posts 等は英語のまま出荷）。
- 記事内の言及（catnose の Changelog、sizu の静けさ、hiroppy の軽い器）は著者の参照であり、それらの見た目を再現する拘束ではない。
- 見た目のトークンは `src/styles/tokens.css` にあるが、視覚世界の正本は DESIGN.md ではなく現行実装。init は視覚を決めない。

## Evidence on Hand

実コンテンツのみ:

- 記事: `src/content/posts/oshian-blog-notes.mdx`、`reading-as-a-room.mdx`、`edge-quiet-stack.mdx`
- Changelog: `src/content/changelog/*.md`（公開・読書装置・散歩などの生活ログ）
- コピーの正本: `src/lib/site.ts`、各ページ、フッター

ないもの（捏造禁止）: 利用者の声、導入事例、ベンチマーク、有料プラン、受賞、第三者の推薦、未実装機能のスクリーンショットを「出荷済み」とする主張。

## Product Principles

1. **部屋であって広場ではない。** 公開カウント、ランキング、いいね競争を足さない。
2. **読む装置を厚くし、エンゲージメント装置を薄くする。** 進捗は閉じられること。無限フィードにしない。
3. **気づいた人だけが使う。** Recall と Whisper は任意。ドリルや必須オンボーディングにしない。
4. **実在する文とログだけを証拠にする。** ない証言・ない機能・ない数字を足さない。
5. **依存は薄く、日本語の読み心地が本体。** 将来の面も、部屋の声と RSS 先行を壊さない。

## Accessibility & Inclusion

出荷済み: `html lang=ja`、本文へスキップ、ランドマーク、`:focus-visible`、`prefers-reduced-motion` でアニメーション時間を 0 にする意図、CI 用 `GET /api/a11y-checklist.json`。WCAG の公式適合宣言はしていない。追加のユーザーニーズ（低視力向けテーマ切替など）は未決定。
