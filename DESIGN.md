---
name: ryo
description: 現行実装は活版見本帳。新しい面は PRODUCT.md の無彩色と黄、本文システムフォントに従う。
colors:
  zinc: "#d7dbe0"
  zinc-elevated: "#e4e7eb"
  zinc-wash: "#c5cad1"
  zinc-floor: "#dfe2e6"
  rail: "#cfd3d8"
  proof: "#f3f4f6"
  sumi: "#12110f"
  sumi-soft: "#2c2a27"
  sumi-muted: "#5c5854"
  vermilion: "#c42b2b"
  vermilion-deep: "#9b1c1c"
typography:
  display:
    fontFamily: "Kaisei Decol, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(3rem, 8vw + 1rem, 5.5rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Kaisei Decol, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.35rem)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Kaisei Decol, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.02em"
  body:
    fontFamily: "BIZ UDPGothic, Hiragino Sans, Yu Gothic, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.04em"
rounded:
  none: "0"
spacing:
  1: "0.25rem"
  2: "0.5rem"
  3: "0.75rem"
  4: "1rem"
  5: "1.5rem"
  6: "2rem"
  7: "3rem"
  8: "4.5rem"
  9: "7rem"
components:
  stamp:
    backgroundColor: "{colors.proof}"
    textColor: "{colors.vermilion-deep}"
    rounded: "{rounded.none}"
    padding: "0.7rem 1.1rem"
  link-default:
    textColor: "{colors.sumi}"
  link-hover:
    textColor: "{colors.vermilion-deep}"
  nav-item:
    textColor: "{colors.sumi-soft}"
    typography: "{typography.label}"
  nav-item-current:
    textColor: "{colors.vermilion}"
---

# Design System: ryo

## Overview

**Creative North Star: "活版 活字見本帳（現行実装）"**

フロントマターの色と書体は、いま画面に出ている実装の記録である。
亜鉛の地、墨、朱の校正印、見出しの明朝（Kaisei Decol）がそれである。

PRODUCT.md は別の拘束を置いている。
基調は無彩色、アクセントは黄色一色、本文はシステムフォント、明朝は採用しない。
霧とティールの初版と、この見本帳そのものが反参照である。

新しい面では PRODUCT.md が勝つ。
黄の HEX と見出し書体名は未決定なので、このファイルに仮の黄は書かない。

**Key Characteristics:**
- 現行：亜鉛の地、墨、朱は校正印だけ
- 現行：見出し Kaisei Decol、本文 BIZ UDPGothic、ラベル Martian Mono
- 現行：左の 72–6pt レールがナビ
- 角は 0。ドロップシャドウはない
- 新しい面：無彩色と黄の面、本文はシステムフォント（PRODUCT.md）

## Colors

現行パレットは亜鉛と墨と朱である。
新しい面の黄は未決定なので、ここに値を置かない。

### Primary
- **Vermilion** (`#c42b2b`)：現行の校正印、現在地ナビ、Focus。塗りつぶしの面には使っていない。

### Neutral
- **Zinc** (`#d7dbe0`)：地。
- **Rail** (`#cfd3d8`)：レール。
- **Proof** (`#f3f4f6`)：スタンプの中。
- **Sumi** (`#12110f`)：文字。

### Named Rules
**The Shipped Plate Rule.** ここの HEX は現行実装である。新しい面で朱をブランドとして増やさない。

**The Yellow Surface Rule.** 決まっている黄は、ライトでは文字色にしない。面（ハイライト、罫線、ホバー背景）に使う。値は未決定。

## Typography

**Display Font:** Kaisei Decol（現行。明朝。新しい面では使わない）
**Body Font:** BIZ UDPGothic（現行。新しい面の本文はシステムフォント）
**Label/Mono Font:** Martian Mono（現行）

**Character:** 見出しは太い明朝、本文はゴシック、メタは等幅、という現行の分担である。
PRODUCT.md は本文をシステムフォント、見出しを Web フォント一書体（名前未決定）とする。

### Hierarchy
- **Display**（700、`clamp(3rem, 8vw + 1rem, 5.5rem)`、行送り 1.12）：ホームの名前。
- **Headline**（700、`clamp(1.75rem, 2.5vw + 1rem, 2.35rem)`）：ページ見出し。
- **Title**（700、`1.5rem`）：Changelog。新しいものほど大きい。
- **Body**（400、`1.0625rem`、行送り 1.75）：本文。行長は約 65ch。
- **Label**（400、`0.875rem`、字間 0.04em）：日付、ポイントサイズ、レール。

### Named Rules
**The Measure Rule.** 本文の行長は約 65ch に留める。

**The Staircase Rule.** 新しさはタイプサイズで示す。バッジでは示さない。

## Layout

幅 4.75rem のレールを左に固定する（720px 以上）。
シェルはその幅だけ左を空ける。
狭い画面ではレールを上の横棒にする。

## Elevation & Depth

平板である。`box-shadow` はない。
奥行きは亜鉛、校正紙、墨の面の差と、Focus の光だけである。

### Named Rules
**The Flat Plate Rule.** ガラスのピルもドロップシャドウも置かない。

## Shapes

角丸は 0。
罫は墨のヘアライン。
スタンプは矩形。

## Components

### Buttons
RSS と Recall は校正紙の矩形スタンプである。
Focus も固定のスタンプで、`R` が光を入れる。

### Inputs
校正紙または亜鉛のフィールド。角は直角。ヘアライン。

### Navigation
レール上の Martian Mono。
現在地だけ朱。

### Signature: size rail
72–6pt の目盛り。
Home の最新が 72pt の朱。

## Do's and Don'ts

### Do:
- **Do** 現行画面を直すときは、ここのトークンを使う。
- **Do** 新しい面では PRODUCT.md の無彩色と黄、本文システムフォントに従う。
- **Do** 本文の行長を約 65ch に留める。
- **Do** 新しさをタイプサイズで示す。

### Don't:
- **Don't** 霧、ティール、Fraunces を戻す。
- **Don't** 新しい面で Kaisei Decol や朱をブランドとして増やす。
- **Don't** ピルや同じ大きさのカードでページを組む。
- **Don't** いいねや順位のクロムを足す。
- **Don't** 見出しの上にアイブロウを置く。
