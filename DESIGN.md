---
name: ryo
description: Quiet mist and ink teal — a personal reading room, not a plaza.
colors:
  mist: "#eef2f4"
  mist-elevated: "#f7f9fa"
  mist-floor: "#e7ecee"
  wash-cool: "#d9e6ea"
  wash-leaf: "#e8efe8"
  ink: "#1c2428"
  ink-soft: "#3d4a52"
  muted: "#6b7a84"
  teal: "#0f6b63"
  teal-deep: "#0a4a45"
  teal-soft: "#d6ebe7"
  code-bg: "#1e2a2e"
  code-ink: "#e8f0f2"
typography:
  display:
    fontFamily: "Fraunces, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(2.6rem, 6vw + 1rem, 4.5rem)"
    fontWeight: 550
    lineHeight: 1.15
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Fraunces, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "clamp(1.75rem, 2.5vw + 1rem, 2.35rem)"
    fontWeight: 550
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Fraunces, Hiragino Mincho ProN, Yu Mincho, serif"
    fontSize: "1.5rem"
    fontWeight: 550
    lineHeight: 1.3
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Zen Kaku Gothic New, Hiragino Sans, Yu Gothic, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "normal"
  label:
    fontFamily: "IBM Plex Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.02em"
rounded:
  sm: "0.35rem"
  md: "0.5rem"
  lg: "0.6rem"
  pill: "999px"
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
  link-default:
    textColor: "{colors.teal-deep}"
  link-hover:
    textColor: "{colors.teal}"
  button-pill:
    backgroundColor: "{colors.teal-soft}"
    textColor: "{colors.teal-deep}"
    rounded: "{rounded.pill}"
    padding: "0.65rem 1.1rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    padding: "0.4rem 0.85rem"
  input-field:
    backgroundColor: "{colors.mist-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "0.8rem"
  nav-item:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label}"
  nav-item-current:
    textColor: "{colors.teal-deep}"
---

# Design System: ryo

## Overview

**Creative North Star: "Quiet Mist Ink"**

A cool mist field with ink-teal accents. The room stays light, quiet, and slightly damp — not cream paper, not purple dusk, not a newspaper. Display type is a serif with a soft optical size (Fraunces); body is a Japanese gothic that can sit for 65ch. Chrome recedes; reading is the object.

Depth comes from two faint radial washes and a sticky glass header, not from drop shadows. Motion is a single 320ms ease-out, and it collapses to zero under `prefers-reduced-motion`.

**Key Characteristics:**
- Mist ground + teal ink accent, never purple / cream-terracotta / broadsheet
- Serif display / gothic body / mono meta
- Measure ~65ch; large vertical rhythm
- Pill actions, hairline ink borders, almost no shadow
- Focus ring is the same teal as the accent

## Colors

Cool mist neutrals with one teal voice. Accent is scarce: links, current nav, selection, a few pills.

### Primary
- **Teal** (`#0f6b63`): hover links, focus ring, selection wash, pressed Focus chip.
- **Deep Teal** (`#0a4a45`): default links, current nav, successful quiet states.

### Neutral
- **Mist** (`#eef2f4`): page ground.
- **Elevated Mist** (`#f7f9fa`): fields, chips, raised panels.
- **Mist Floor** (`#e7ecee`): bottom of the page gradient.
- **Cool Wash** (`#d9e6ea`) / **Leaf Wash** (`#e8efe8`): fixed background veils, not blocks of paint.
- **Ink** (`#1c2428`): body and headings.
- **Soft Ink** (`#3d4a52`): secondary copy.
- **Muted** (`#6b7a84`): meta, hints, footer notes.
- **Code Night** (`#1e2a2e` / `#e8f0f2`): fenced code only.

### Named Rules
**The One Teal Rule.** Teal is a voice, not a fill. Do not flood a viewport with accent background.

**The No Purple Paper Rule.** Do not introduce purple, cream-terracotta, or broadsheet cream. The token file already names these as rejects.

## Typography

**Display Font:** Fraunces (Hiragino Mincho / Yu Mincho)
**Body Font:** Zen Kaku Gothic New (Hiragino Sans / Yu Gothic)
**Label/Mono Font:** IBM Plex Mono

**Character:** Optical serif for names and titles; gothic for the long read; mono for dates, kbd, and quiet meta. Japanese fallbacks are part of the stack, not an afterthought.

### Hierarchy
- **Display** (550, `clamp(2.6rem, 6vw + 1rem, 4.5rem)`, 1.15, -0.04em): home brand name only, max ~10ch.
- **Headline** (550, `clamp(1.75rem, 2.5vw + 1rem, 2.35rem)`): page titles (About, Subscribe, Posts).
- **Title** (550, 1.5rem): changelog and post-list titles.
- **Body** (400, 1.0625rem / 1.75): article measure 65ch.
- **Label** (IBM Plex Mono, 0.875rem): dates, remaining time, footer meta.

### Named Rules
**The Measure Rule.** Continuous reading copy stays near 65ch. Lists and asides may run shorter (36–52ch), not wider.

## Layout

Shell is `min(1120px, 100% - 2.5rem)` centered. Header is 3.5rem sticky glass. Article column maxes at 760px; About ~40rem; Subscribe ~36rem. Spacing scale is 0.25rem → 7rem; heroes and footers use 8–9. Reading rail wants 1100px before it becomes a side toc; post list stacks the date under 640px; whisper trigger tucks in under 820px; post nav splits at 720px.

## Elevation & Depth

No box-shadow vocabulary. Depth is tonal: mist vs elevated mist, two radial washes, `backdrop-filter: blur(10px)` on the header and `blur(8px)` on the Focus chip, 12% ink hairlines.

### Named Rules
**The Flat-By-Default Rule.** Do not add drop shadows to rest surfaces. If something needs to lift, mix mist with transparency and blur.

## Shapes

Small radius on skip-link and inline code (`0.35rem`). Fields `0.5rem`. Code blocks `0.6rem`. Actions and Focus are pills (`999px`). Hairline borders from 12% ink. Blockquotes: 2px teal left bar, no box.

## Components

### Buttons
- **Shape:** pill
- **Primary (RSS):** teal-soft fill, teal-deep text, 1px accent-mixed border, padding `0.65rem 1.1rem`
- **Ghost (Recall save):** transparent, hairline, ink-soft text
- **Focus chip:** fixed bottom-left, elevated mist glass, kbd in mono; pressed state uses teal-deep text and a stronger teal border
- **Hover / Focus:** color shift on links; 2px teal outline, 3px offset on interactive controls

### Inputs / Fields
- **Style:** elevated mist, 1px hairline, 0.5rem corners, 0.8rem padding, inherit body font
- **Focus:** the global teal ring
- **Error:** not a system token yet; do not invent a red scale

### Navigation
- **Header:** Fraunces brand at 1.5rem / 600; text links at 0.875rem ink-soft; current and hover go teal-deep; no underline
- **Footer:** display name, muted room line, RSS · About
- **Reading rail:** desktop toc + progress at ≥1100px; mobile chrome bar otherwise

### Lists
Changelog and Posts are hairline-divided rows, not cards. Emoji is a small lead mark, not a badge system.

### Signature: reading chrome
Reading Rail, remaining-time meta, Recall, Margin Whisper, and Focus are part of the room. They use the same hairline, mist, and teal — they must not grow a second visual language. In Focus mode, `.site-chrome` and the rail fade and stop taking pointer events.

## Do's and Don'ts

### Do:
- **Do** keep accent rare and teal.
- **Do** set long reading copy to ~65ch with 1.75 body leading.
- **Do** honor `prefers-reduced-motion` by zeroing `--duration`.
- **Do** keep personal tools (Recall, Whisper, Focus) quiet and optional.
- **Do** use hairlines and tonal washes instead of cards-with-shadows.

### Don't:
- **Don't** add like counts, rank badges, or public metrics chrome.
- **Don't** introduce purple, cream-terracotta, or broadsheet cream.
- **Don't** add drop shadows as default elevation.
- **Don't** stretch article measure past ~65ch to "use the width".
- **Don't** invent a second accent hue for hover or errors without a real token.
