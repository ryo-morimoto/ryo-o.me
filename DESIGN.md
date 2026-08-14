---
name: ryo
description: Letterpress type specimen — zinc plate, sumi, vermilion proof.
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

**Creative North Star: "活版 活字見本帳"**

The site is a foundry specimen sheet hung in north light: zinc plate, sumi, one vermilion proof mark. Changelog entries are cuts of the same face, largest first. The old mist-teal optical-serif room is an anti-reference.

**Key Characteristics:**
- Zinc ground, sumi ink, vermilion proof only
- Kaisei Decol display / BIZ UDPGothic body / Martian Mono point sizes
- Off-centre 72–6pt rail as navigation
- Square stamps, no pills, no drop shadows
- Focus (R) rakes light; it does not add chrome

## Colors

### Primary
- **Vermilion** (`#c42b2b`): proof marks, current nav, kind labels, Focus pressed. Scarce.

### Neutral
- **Zinc** (`#d7dbe0`): plate ground.
- **Rail** (`#cfd3d8`): foundry rail strip.
- **Proof** (`#f3f4f6`): stamp fill, skip-link inverse.
- **Sumi** (`#12110f`): type.

### Named Rules
**The One Impression Rule.** Do not polish entries into plaza metrics.

**The One Vermilion Rule.** Accent is a proof mark, never a fill.

## Typography

**Display Font:** Kaisei Decol
**Body Font:** BIZ UDPGothic
**Label/Mono Font:** Martian Mono

### Hierarchy
- **Display:** home name, ~72pt cut.
- **Headline:** page titles.
- **Title:** changelog, stepped down the specimen staircase.
- **Body:** 65ch.
- **Label:** dates, point sizes, rail nav.

### Named Rules
**The Measure Rule.** Reading copy stays near 65ch.

**The Staircase Rule.** Recency is type size, not a badge.

## Layout

Fixed 4.75rem rail on the left (≥720px). Shell padded by the rail. Mobile: rail becomes a sticky horizontal foundry bar.

## Elevation & Depth

Flat plate. No box-shadow. Depth is zinc vs proof vs sumi, plus Focus raking light.

### Named Rules
**The Flat Plate Rule.** No glass pills, no drop shadows.

## Shapes

Radius 0. Hairline sumi rules. Stamps are rectangles with vermilion or sumi stroke.

## Components

### Buttons
Square proof stamps. RSS and Recall use proof fill + vermilion or sumi stroke. Focus is a fixed stamp; R is the rake.

### Inputs
Proof/zinc fields, square, hairline.

### Navigation
Vertical Martian Mono labels on the rail. Current = vermilion.

### Signature: size rail
72–6pt ticks. Newest / Home is the 72pt vermilion tick.

## Do's and Don'ts

### Do:
- **Do** let recency live in type size.
- **Do** keep vermilion scarce.
- **Do** rake light for Focus, hide chrome.

### Don't:
- **Don't** restore mist, teal, Fraunces, or IBM Plex.
- **Don't** use pills or equal-size cards as the page structure.
- **Don't** add like counts or rank chrome.
- **Don't** put an eyebrow above a heading.
