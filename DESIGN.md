---
name: SQUAD
description: Brand identity for SQUAD — a global app for finding, organizing, and joining recreational sports games.
colors:
  # ─── Brand anchors (descriptive aliases) ─────────────────
  fired-terracotta: "#EE4721"
  deep-terracotta: "#C5371A"
  heat-terracotta: "#F26B49"
  wash-terracotta: "#FBDDD2"
  jet-ink: "#13222C"
  field-navy: "#1D3444"
  cool-slate: "#BEC4CE"
  deep-slate: "#8E96A1"
  warm-linen: "#EBE7DB"
  pressed-bone: "#F5F2E9"
  body-smoke: "#3A4550"
  caption-ash: "#6B7480"
  hairline: "#D8D4CA"
  # ─── Terracotta ramp (hue ~35°) ──────────────────────────
  terra-50:  "#FDEDE6"
  terra-100: "#FBDDD2"  # alias of wash-terracotta
  terra-200: "#F8B79F"
  terra-300: "#F26B49"  # alias of heat-terracotta
  terra-400: "#F05633"
  terra-500: "#EE4721"  # alias of fired-terracotta — BRAND ANCHOR
  terra-600: "#C5371A"  # alias of deep-terracotta — pressed/hover
  terra-700: "#9D2C14"
  terra-800: "#75210E"
  terra-900: "#4D1608"
  # ─── Steel ramp (hue ~230°, the cool dark family) ────────
  steel-50:  "#F0F2F4"
  steel-100: "#D6DBE0"
  steel-200: "#BEC4CE"  # alias of cool-slate
  steel-300: "#8E96A1"  # alias of deep-slate
  steel-400: "#6B7480"  # alias of caption-ash
  steel-500: "#3A4550"  # alias of body-smoke
  steel-600: "#1D3444"  # alias of field-navy
  steel-700: "#13222C"  # alias of jet-ink — BRAND ANCHOR
  steel-800: "#0C1820"
  steel-900: "#060D14"
  # ─── Linen ramp (hue ~80°, the warm neutral family) ──────
  linen-50:  "#FAF8F1"
  linen-100: "#F5F2E9"  # alias of pressed-bone — THE BRAND'S "WHITE"
  linen-200: "#EBE7DB"  # alias of warm-linen — BRAND ANCHOR / page bg
  linen-300: "#D8D4CA"  # alias of hairline
  linen-400: "#B5B0A2"
  linen-500: "#8C8775"
  linen-600: "#635E4D"
  linen-700: "#423F30"
  linen-800: "#28261B"
  linen-900: "#15130A"
typography:
  display:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(120px, 18vw, 296px)"
    fontWeight: 900
    lineHeight: 0.82
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "clamp(64px, 8vw, 108px)"
    fontWeight: 900
    lineHeight: 0.88
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "34px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  lede:
    fontFamily: "Inter Tight, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1.7
    letterSpacing: "0.16em"
  kicker:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.7
    letterSpacing: "0.22em"
rounded:
  xs: "4px"
  sm: "6px"
  md: "10px"
  lg: "14px"
  xl: "18px"
  xxl: "24px"
  pill: "999px"
spacing:
  s1: "8px"
  s2: "16px"
  s3: "24px"
  s4: "32px"
  s5: "40px"
  s6: "48px"
  s7: "56px"
  s8: "64px"
  s10: "80px"
  s12: "96px"
  s14: "112px"
  s16: "128px"
components:
  hero-card:
    backgroundColor: "{colors.jet-ink}"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "96px 80px"
  surface-card:
    backgroundColor: "{colors.pressed-bone}"
    textColor: "{colors.jet-ink}"
    rounded: "{rounded.sm}"
    padding: "56px"
  surface-card-dark:
    backgroundColor: "{colors.field-navy}"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "56px"
  surface-card-terracotta:
    backgroundColor: "{colors.fired-terracotta}"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "56px"
  stat-block:
    backgroundColor: "{colors.fired-terracotta}"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "48px 40px"
  badge:
    backgroundColor: "{colors.fired-terracotta}"
    textColor: "{colors.warm-linen}"
    rounded: "4px"
    padding: "10px 16px"
  eyebrow:
    textColor: "{colors.fired-terracotta}"
    typography: "{typography.label}"
  divider:
    backgroundColor: "{colors.hairline}"
    height: "1px"
  button-primary:
    backgroundColor: "{colors.terra-500}"
    textColor: "{colors.steel-800}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-primary-hover:
    backgroundColor: "{colors.terra-300}"
    textColor: "{colors.steel-800}"
  button-primary-active:
    backgroundColor: "{colors.terra-400}"
    textColor: "{colors.steel-800}"
  button-secondary:
    backgroundColor: "{colors.jet-ink}"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.jet-ink}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-outline-linen:
    backgroundColor: "transparent"
    textColor: "{colors.warm-linen}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.terra-500}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
  button-disabled:
    backgroundColor: "{colors.hairline}"
    textColor: "{colors.caption-ash}"
    rounded: "{rounded.sm}"
    padding: "14px 26px"
---

# Design System: SQUAD

## 1. Overview

**Creative North Star: "Built Chunky"**

SQUAD looks like the sign on the wall of a working gym, not the gradient on a fitness app. The system is built around heavy display type set in **Inter Tight 900**, a fired terracotta that does the talking, and tactical jet-and-navy that holds the page. Every surface should feel substantial enough to lean against. The interface is a teammate: direct, present, useful, and incapable of fading into the background.

The aesthetic is industrial-tactical-athletic. **Inter Tight at black weight (900)** carries display, headline, title, lede, and body. **JetBrains Mono** carries every tactical label and kicker. Two fonts, no third family. One terracotta accent that does heavy work in small doses. Generous whitespace around heavy type. No drop shadows except the one subtle ambient lift on hero cards. No gradients. No glass. **No italic.**

This system explicitly rejects the **football-app neon-on-black** template (FotMob, OneFootball, betting-app dark) and the **Azerbaijan-government-portal cream-and-blue** civic-portal aesthetic. SQUAD does not chase either failure mode.

**Key Characteristics:**
- Inter Tight 900 carries the display tier, sized to be visible across a room.
- Two fonts only: Inter Tight (sans, every role) + JetBrains Mono (label + kicker).
- Fired terracotta accent used surgically, never as a wash.
- Jet ink + warm linen as the dominant pairing, navy + bone as secondary surfaces.
- Mono labels carry data, metadata, and tactical voice.
- Flat by default. Depth comes from color contrast and scale, not shadow.
- Generous spacing on the 8-grid; no dense clusters.

## 2. Colors

A warm, athletic palette built around fired terracotta against jet ink and tactical navy, set on warm linen. **Colors are locked and not subject to change in this revision.**

### Primary

- **Fired Terracotta** (`#EE4721`): The brand's voice. Used on accent text, badges, stat blocks, the terracotta surface card, and the cover diagonal accent rule. Loud and intentional. Never decorative wash.
- **Deep Terracotta** (`#C5371A`): Pressed-state and hover-state for terracotta surfaces and interactive emphasis. Also used for `.pair-stack span` data emphasis on light backgrounds.
- **Heat Terracotta** (`#F26B49`): Lighter accent variant. Used for the color spike on dark backgrounds (e.g. accent words on navy) where the standard terracotta would lose contrast.
- **Wash Terracotta** (`#FBDDD2`): Soft tint for backgrounds, illustrations, and quiet accent moments. Use rarely.

### Secondary

- **Jet Ink** (`#13222C`): The primary dark surface. Cover background, hero card background, primary text on light surfaces. Reads almost-black but carries a navy hue at scale.
- **Field Navy** (`#1D3444`): The secondary dark surface, used for nested dark cards within a jet context, and for hairlines that need to register on a dark surface (e.g. cover bottom strip border).

### Neutral

- **Warm Linen** (`#EBE7DB`): The page background. Warmer than off-white. Sets the editorial, document-grade tone.
- **Pressed Bone** (`#F5F2E9`): Lighter neutral for raised surface cards on a linen page. Sits ~5% above linen — barely visible but enough to define a card edge without a border.
- **Cool Slate** (`#BEC4CE`): Subdued text and meta on dark surfaces (sub-copy on cover/hero, slate divider rules).
- **Deep Slate** (`#8E96A1`): Slate variant for slightly higher-contrast secondary text on dark surfaces.
- **Body Smoke** (`#3A4550`): Body copy on light surfaces. NOT pure jet — softer, less aggressive at body sizes.
- **Caption Ash** (`#6B7480`): Caption / label text on light surfaces (tactical labels, eyebrows when not accented in terracotta).
- **Hairline** (`#D8D4CA`): The only divider color. 1px, used sparingly between major sections.

### Color Ramps

The brand has **three color families**, each with a 10-step ramp from 50 (lightest) to 900 (deepest). The descriptive names above are aliases for specific stops on the ramps. Use the descriptive name in prose; use the ramp slug in code where stepping matters.

**Terracotta** (the accent voice, hue ~35°)

| Slug | Hex | Role |
|---|---|---|
| `terra-50` | `#FDEDE6` | Page-wash tint. The faintest terracotta presence (illustrations, soft section breaks). |
| `terra-100` | `#FBDDD2` | Wash background tint. Alias: **Wash Terracotta**. Use rarely, never as a primary surface. |
| `terra-200` | `#F8B79F` | Pale tint for chips, soft chips, secondary accents. |
| `terra-300` | `#F26B49` | Alias: **Heat Terracotta**. Accent on dark surfaces (jet, navy) where Fired loses contrast; primary CTA hover when paired with Pressed Jet text. |
| `terra-400` | `#F05633` | Primary CTA active state when paired with Pressed Jet text. Rarely lands on a surface alone. |
| `terra-500` | `#EE4721` | **THE BRAND ANCHOR.** Alias: **Fired Terracotta**. The color spike, badges, stat blocks, primary buttons. |
| `terra-600` | `#C5371A` | Alias: **Deep Terracotta**. Deep accent and non-text terracotta state; avoid for normal-size CTA labels unless contrast is re-tested. |
| `terra-700` | `#9D2C14` | Pressed-deep state for non-text graphics and dense product UI when 600 isn't enough contrast. |
| `terra-800` | `#75210E` | Deep wood. Reserved for rare accents (icons on terracotta backgrounds). |
| `terra-900` | `#4D1608` | Burnt edge. Brand-illustration accent only. |

**Steel** (the dark structural family, hue ~230°)

| Slug | Hex | Role |
|---|---|---|
| `steel-50` | `#F0F2F4` | Cool-tinted page wash. Use sparingly; Linen is the default page bg. |
| `steel-100` | `#D6DBE0` | Pale slate divider on cool sections. |
| `steel-200` | `#BEC4CE` | Alias: **Cool Slate**. Subdued text on dark surfaces, slate divider rules. |
| `steel-300` | `#8E96A1` | Alias: **Deep Slate**. Higher-contrast secondary text on dark. |
| `steel-400` | `#6B7480` | Alias: **Caption Ash**. Caption/label text on light surfaces. |
| `steel-500` | `#3A4550` | Alias: **Body Smoke**. Body copy color on light. NOT pure jet, less aggressive. |
| `steel-600` | `#1D3444` | Alias: **Field Navy**. Secondary dark surface, nested cards on jet, hairlines on dark. |
| `steel-700` | `#13222C` | **THE BRAND ANCHOR.** Alias: **Jet Ink**. Replaces pure black. Primary text, hero card surface, dark sections. |
| `steel-800` | `#0C1820` | Pressed jet. Use for active/pressed state on jet surfaces. |
| `steel-900` | `#060D14` | Deepest. Brand-illustration only. Almost never used in interfaces. |

**Linen** (the warm neutral family, hue ~80°)

| Slug | Hex | Role |
|---|---|---|
| `linen-50` | `#FAF8F1` | Lightest warm wash. Use only for subtle highlights on Bone (cards-on-cards rare cases). |
| `linen-100` | `#F5F2E9` | **THE BRAND'S "WHITE."** Alias: **Pressed Bone**. Raised content cards on Linen pages. |
| `linen-200` | `#EBE7DB` | **THE BRAND ANCHOR.** Alias: **Warm Linen**. Page background. Replaces pure white. |
| `linen-300` | `#D8D4CA` | Alias: **Hairline**. The only 1px divider color. |
| `linen-400` | `#B5B0A2` | Deeper linen for borders or muted backgrounds where Hairline is too faint. |
| `linen-500` | `#8C8775` | Earth tone. Reserved for outdoor/print signage. Not used in product UI. |
| `linen-600` | `#635E4D` | Deep earth. Brand-illustration accent. |
| `linen-700` | `#423F30` | Dark earth. Brand-illustration only. |
| `linen-800` | `#28261B` | Earth ink. Almost never used. |
| `linen-900` | `#15130A` | Burnt cream. Brand-illustration only. |

### Role Mapping (the canonical reference)

When in doubt, this table answers "what color should I use here?"

| Role | Token | Hex |
|---|---|---|
| **The brand's "white"** (raised cards on the page) | `linen-100` / Pressed Bone | `#F5F2E9` |
| **The brand's "black"** (primary text, dark surfaces) | `steel-700` / Jet Ink | `#13222C` |
| **Page background** (the canvas of every brand surface) | `linen-200` / Warm Linen | `#EBE7DB` |
| **Body text** (narrative copy on light) | `steel-500` / Body Smoke | `#3A4550` |
| **Caption / label text** (small uppercase mono labels) | `steel-400` / Caption Ash | `#6B7480` |
| **Subdued text on dark** (sub-copy on jet/navy) | `steel-200` / Cool Slate | `#BEC4CE` |
| **Readable footer metadata on dark** (tiny copyright / ticker tails on jet) | `steel-300` / Deep Slate | `#8E96A1` |
| **Hairline / divider** (1px separators between sections) | `linen-300` / Hairline | `#D8D4CA` |
| **Brand accent (THE color spike)** | `terra-500` / Fired Terracotta | `#EE4721` |
| **Small CTA text on terracotta** (primary button labels) | `steel-800` / Pressed Jet | `#0C1820` |
| **Pressed / hover accent** | `terra-600` / Deep Terracotta | `#C5371A` |
| **Accent on dark surfaces** (where Fired loses contrast) | `terra-300` / Heat Terracotta | `#F26B49` |
| **Wash tint** (gentle terracotta background, never primary) | `terra-100` / Wash Terracotta | `#FBDDD2` |
| **Primary dark surface** (hero cards, dark sections) | `steel-700` / Jet Ink | `#13222C` |
| **Secondary dark surface** (nested cards on jet) | `steel-600` / Field Navy | `#1D3444` |
| **Pressed jet** (active state on dark surfaces) | `steel-800` | `#0C1820` |

### Named Rules

**The Terracotta Spike Rule.** Fired terracotta is a spike, not a wash. Use it for one element on a screen (a badge, a stat block, a single accent word, a button). When it appears as a full-bleed surface — the terracotta surface card or stat block — it is the focal point of that section, not a backdrop. Never use terracotta as a body-text color. Never use it on more than ~15% of any composition.

**The No Pure Black, No Pure White Rule.** Jet Ink (`#13222C`) replaces black. Warm Linen (`#EBE7DB`) replaces white. Pure `#000` and `#fff` are forbidden across the entire system. Both endpoints are tinted toward the brand temperature.

**The CTA Contrast Rule.** Normal-size text on terracotta CTAs uses Pressed Jet (`steel-800`, `#0C1820`), not Warm Linen. The approved primary button stack is `steel-800` on `terra-500` default (4.76:1), `steel-800` on `terra-300` hover (5.98:1), and `steel-800` on `terra-400` active (5.21:1). This is a deliberate accessibility exception to the usual warm-linen-on-terracotta brand surface pairing.

**The Tactical Mono Rule.** Mono is reserved for data, metadata, tactical labels, and supporting text. It is NOT used for body copy, headlines, or anything narrative. Mono is the system speaking to the user about the system; everything else uses sans.

## 3. Typography

**Display + Body Font:** **Inter Tight** (Rasmus Andersson, Google Fonts). Variable axis 100&ndash;900. Carries every sans role: display, headline, title, lede, body. Pan-language verified at every weight: Latin, Latin Extended-A (full Azerbaijani support including ə, ç, ğ, ı, İ, ö, ş, ü), Cyrillic, Cyrillic Extended, Greek, Greek Extended, Vietnamese.

**Label / Mono Font:** **JetBrains Mono** (JetBrains, Google Fonts). Reserved for tactical labels, kickers, badges, score timestamps. Two voices only (see `Label` and `Kicker` rules below).

**The system is two fonts total.** No third family. Inter Tight at 400 is body-readable; pulling in a separate body sans would dilute the brand voice and add a network round-trip for nothing.

**Character:** Inter Tight is Inter with the slack pulled out. Tighter sidebearings, sharper terminals, denser at the same weight. At 900 it lands hard but reads as engineered, not ornamental. JetBrains Mono is the analyst's voice, used for data and metadata only.

### Hierarchy

- **Display** (Inter Tight 900, `clamp(120px, 18vw, 296px)`, line-height 0.82, letter-spacing -0.04em, uppercase): Cover hero, landing page hero, brand campaign moments. The accent word (one only) sits in fired terracotta.
- **Headline** (Inter Tight 900, ~96px on desktop, line-height 0.88, letter-spacing -0.035em, uppercase): Section titles, large content callouts, in-card hero text. Typically two-line with one terracotta accent word.
- **Title** (Inter Tight 800, 34px, line-height 1.1, letter-spacing -0.02em): Card titles, pairing titles, second-tier headings. Mixed-case, not uppercase.
- **Lede** (Inter Tight 500, 24px, line-height 1.5): Hero subtitles and lead paragraphs. Inline emphasis at weight 700.
- **Body** (Inter Tight 400, 17px, line-height 1.6, max-width 65&ndash;75ch): Standard body copy, descriptive text in surface cards. Inline emphasis at weight 700 via `<strong>`.
- **Label** (JetBrains Mono 500, 11px, letter-spacing 0.16em, uppercase): In-card tactical labels, captions, metadata, score timestamps. The "data voice."
- **Kicker** (JetBrains Mono 600, 12px, letter-spacing 0.22em, uppercase): Eyebrows, signage, badges, OOH callouts. The "marquee voice." More tracked, slightly heavier than Label.

### Named Rules

**The Color Spike Rule.** One accent word per headline, set in fired terracotta. Everything else stays in jet ink at the same heavy weight. Italic is forbidden as an accent device because pan-language italic at black weight is unreliable across Inter Tight's full subset coverage. Color does the spike, not slant.

**The Uppercase Display Rule.** Display and Headline tiers are uppercase. Title and below are mixed-case. Mono labels and kickers are always uppercase. This split is non-negotiable: it is what gives the system its signage feel.

**The Two-Voice Mono Rule.** Mono has exactly two voices. Label (11px / 500 / 0.16em) for in-card data and metadata; Kicker (12px / 600 / 0.22em) for eyebrows and signage. Any letter-spacing other than 0.16em or 0.22em on a mono element is a violation.

**The Tight-On-Tight Rule.** Inter Tight comes pre-tightened by design; the system tightens further with negative letter-spacing on display and headline tiers (-0.04em and -0.035em respectively). Do not loosen this. The tightness is the brand's posture.

**The Tabular Numerals Rule.** Score panels, stat blocks, and any column of digits use `font-variant-numeric: tabular-nums`. Inter Tight supports it; the rule is to opt in, not rely on the default.

**The No Reflex Rule.** Inter is the AI-default sans of the last decade, used by every SaaS landing page. Inter Tight is its tighter, denser sibling, but the family resemblance is real. SQUAD avoids the reflex by leading with Black weight (900), heavy negative tracking, the terracotta color spike, and warm linen as the page background. Whenever a SQUAD surface starts to feel like a Linear or Notion screen, the cause will be (a) not enough weight, (b) not enough scale, or (c) page background drifting toward white. Catch and correct.

**The Trilingual Type Test (verified).** Inter Tight has been verified for Azerbaijani diacritics (ə, ç, ğ, ı, İ, ö, ş, ü) and full Cyrillic at weight 900 via Google Fonts CSS API on 2026-05-08. The variable font ships Latin, Latin Extended-A, Cyrillic, Cyrillic Extended, Greek, Greek Extended, and Vietnamese subsets at every weight. Re-verify any time a major Inter Tight version bump lands.

## 4. Elevation

The system is **flat by default**. Surfaces define themselves through color contrast and scale, not shadow. Hairline dividers (1px Hairline `#D8D4CA`) are used sparingly between major sections.

The **single exception**: hero cards carry a subtle ambient lift to separate them from the page beneath. This is the only shadow allowed in the system, and it is diffuse, not directional.

### Shadow Vocabulary

- **Hero Lift** (`box-shadow: 0 2px 6px rgba(0,0,0,0.08), 0 12px 40px rgba(0,0,0,0.08)`): Used exclusively on top-level hero cards to lift them off the page background. Never on stat blocks, surface cards, badges, or any other element.

### Named Rules

**The Flat-By-Default Rule.** Every surface is flat unless it is the page-defining hero card. Stat blocks, surface cards, badges, buttons, inputs — all flat. Depth is created by color shift (linen → bone → jet) and scale, not by shadow.

**The Hairline Rule.** When separation is needed and a color shift is wrong, use a single 1px Hairline `#D8D4CA` rule. No multi-pixel borders. No dotted/dashed. No double rules. The hairline is the only border in the system.

## 5. Components

The visible component vocabulary in the brand kit. New components in this system should adopt these patterns or extend them — never invent new card or surface types without referencing this set.

### Logo & Lockup

**Logo is locked. Do not redraw, recolor outside the approved tint set, or modify the silhouette.**

- **Logomark**: `assets/squad_logomark.png` — the standalone two-blade mark.
- **Lockup (horizontal)**: `assets/squad_logo_transparent_2.png` — mark + wordmark side by side.
- **Lockup (stacked)**: `assets/squad_logo_transparent_1.png` — mark above wordmark.
- **Tints**: `terra` (default, no filter), `jet`, `linen`, `slate`. Apply via the documented CSS filter recipes in `brand-kit.jsx`. The tint set is exhaustive — no other tints permitted.

### Hero Card

The system's centerpiece component. Used for landing-page heroes, top-of-page brand moments, marquee callouts.

- **Shape**: 6px radius (`{rounded.sm}`).
- **Background**: Jet Ink (`#13222C`).
- **Padding**: 96px 80px (generous; hero-only).
- **Shadow**: Hero Lift (the only shadow in the system).
- **Typography**: Display tier inside, Inter Tight 900, with a single terracotta accent word (color spike).
- **Optional badge**: top-right, terracotta background, mono label.
- **Optional kicker**: small terracotta uppercase mono above the display headline.

### Surface Card

The standard content card. Three variants by surface color, each carrying a different tonal intent.

- **Shape**: 6px radius (`{rounded.sm}`).
- **Padding**: 56px (uniform).
- **Min-height**: 380px when used in a paired grid.
- **Variants**:
  - **Light** (`background: #F5F2E9 Pressed Bone`, text: Jet Ink): Default content surface, sits one tonal step above the linen page.
  - **Dark** (`background: #1D3444 Field Navy`, text: Warm Linen): Tonal contrast variant for emphasis or pull-quote moments.
  - **Terracotta** (`background: #EE4721 Fired Terracotta`, text: Warm Linen): The brand-spike variant. Use for one card per layout maximum. Italic accents shift to Jet Ink on this surface.

### Stat Block

A small, dense card for numeric data — scores, counts, metrics, KPIs.

- **Shape**: 6px radius (`{rounded.sm}`).
- **Padding**: 48px 40px.
- **Default background**: Fired Terracotta with Warm Linen text.
- **Series treatment**: when used in a row of three, alternate backgrounds — terracotta, jet ink, pressed bone — to produce rhythm rather than repetition.
- **Number**: Inter Tight 900, ~96px, line-height 0.82, letter-spacing -0.04em, `font-variant-numeric: tabular-nums`.
- **Label**: mono, 11px, 0.2em letter-spacing, uppercase.

### Badge

The smallest brand-marked element.

- **Shape**: 4px radius (smaller than `{rounded.sm}`).
- **Background**: Fired Terracotta.
- **Text**: Warm Linen, JetBrains Mono, 12px / 600 / 0.22em (kicker tier), uppercase.
- **Padding**: 10px 16px.
- **Position**: typically top-right of a hero card.

### Eyebrow

A typographic element, not a containerized component. Mono uppercase tactical label that sits above a section title.

- **Family**: mono.
- **Color**: Fired Terracotta (default), Caption Ash (low-emphasis variant).
- **Style**: JetBrains Mono, 12px / 600 / 0.22em (kicker tier), uppercase.
- **Spacing below**: 16-24px before the title that follows.

### Diagonal Accent Rule

A signature decorative element on the cover and other large brand surfaces.

- **A 4px-wide, ~220px-tall vertical bar of Fired Terracotta**, anchored bottom-left of a hero composition.
- Used **once per brand surface, maximum**. It is a punctuation mark, not a divider.

### Buttons

**Locked 2026-05-08.** Three sizes, six variants, one tracking value, one weight, one font.

**Shared tokens (apply to every button):**
- Family: Inter Tight (DISPLAY)
- Weight: **800** (one notch lighter than display 900 to preserve hierarchy)
- Letter-spacing: **0.06em** (single value, no spread)
- Text-transform: uppercase
- Transition: `background 180ms cubic-bezier(0.25,1,0.5,1), transform 180ms cubic-bezier(0.25,1,0.5,1)`

**Sizes:**

| Size | Font Size | Padding | Radius |
|---|---|---|---|
| `lg` | 17px | 18px 32px | 6px |
| `md` (default) | 15px | 14px 26px | 6px |
| `sm` | 13px | 10px 20px | 4px |

**Variants:**

| Variant | Background | Text | Border | Use |
|---|---|---|---|---|
| `primary` | `terra-500` | Pressed Jet | none | Brand CTA. The color spike; AA-safe at normal text sizes. |
| `secondary` | Jet | Linen | none | Strong action on light backgrounds. |
| `outline` | transparent | Jet | 2px Jet | Secondary action on light. |
| `outline-linen` | transparent | Linen | 2px Cool Slate | Secondary action on dark backgrounds. |
| `ghost` | transparent | `terra-500` | none | Tertiary. "View all", text links. |
| `disabled` | Hairline | Caption Ash | none, `cursor: not-allowed` | Non-interactive. |

**Hover / pressed states:**
- **primary hover**: bg shifts to `terra-300` (Heat Terracotta), text stays `steel-800`, `transform: translateY(-1px)`
- **primary active / pressed**: bg shifts to `terra-400`, text stays `steel-800`, `transform: translateY(0)`
- **secondary hover**: bg shifts to `steel-800` (pressed jet), same lift
- **outline hover**: bg fills with `rgba(19,34,44,0.06)` (jet at 6% alpha)
- **outline-linen hover**: bg fills with `rgba(235,231,219,0.08)` (linen at 8% alpha)
- **ghost hover**: bg fills with `rgba(238,71,33,0.08)` (terra at 8% alpha)
- **active / pressed**: `transform: translateY(0)` and bg shifts to the documented active stop for the variant
- **focus-visible**: 2px outline `terra-500` with 2px offset
- **disabled**: no hover, no pressed

**Named Rules:**

**The One Tracking Rule.** All buttons use exactly **0.06em** letter-spacing. Any other tracking on a button is a violation. Mono labels (Two-Voice Mono Rule) and buttons (One Tracking Rule) are independent systems.

**The One Spike Per Surface Rule.** Only one `primary` button per visible surface (above-the-fold landing area, single card, single dialog). If a layout needs two CTAs, the second is `secondary`, `outline`, or `ghost`. Two terracotta buttons next to each other dilute the spike.

**The CTA Contrast Rule.** Primary buttons use Pressed Jet text on the terracotta ramp. Do not use Warm Linen for normal-size primary CTA labels; it fails the contrast floor on the default terracotta stop.

**The Hierarchy Order.** Visual weight order, lightest to heaviest: `ghost` < `disabled` < `outline-linen` ≈ `outline` < `secondary` < `primary`. Lay out actions in increasing weight as you approach the primary action.

### Ticker / Footer Metadata

A dense mono metadata strip for live-feed tickers, copyright tails, and footer status text.

- **Family**: JetBrains Mono label tier.
- **Background**: Jet Ink (`steel-700`) or Field Navy (`steel-600`).
- **Primary ticker text**: Cool Slate (`steel-200`) on dark.
- **Tiny footer/copyright metadata**: Deep Slate (`steel-300`) on Jet Ink. Do not use Caption Ash (`steel-400`) here; it reads as light-surface caption color and falls below AA on jet at tiny sizes.
- **Accent dots / separators**: Fired Terracotta for dots only, not full metadata strings.

### Inputs

### Inputs

Not yet present in the brand kit. Anticipated direction (deferred):

- Linen or pressed bone background, jet ink text, single-line hairline bottom border, no outer border, focus = terracotta hairline.

## 6. Do's and Don'ts

### Do:

- **Do** lean on **Inter Tight 900** as the loudest brand element. Type carries SQUAD; decoration does not.
- **Do** use `font-variant-numeric: tabular-nums` on score panels, stat blocks, and any aligned digit columns. Inter Tight supports it.
- **Do** use **Fired Terracotta** as a surgical spike — one accent word, one badge, one stat block, one surface per composition.
- **Do** pair **Jet Ink + Warm Linen** as the dominant tonal axis. Field Navy and Pressed Bone are the secondary surfaces.
- **Do** keep mono reserved for **tactical labels, metadata, and data** — never narrative copy.
- **Do** stay flat. Depth is built from color and scale, not shadow.
- **Do** use the 8-grid spacing scale (8 / 16 / 24 / 32 / 48 / 56 / 64 / 80 / 96 / 128). Section vertical padding lives in the 80-140 range; card internal padding lives in the 48-96 range.
- **Do** use **Hero Lift** shadow only on top-level hero cards. Every other surface stays flat.
- **Do** use the **6px** radius (`{rounded.sm}`) on cards, surfaces, and stat blocks. Use **4px** on badges. Larger radii are reserved for future components, not retrofitted to existing ones.
- **Do** uppercase Display, Headline, and Label tiers. Mixed-case Title and below.
- **Do** test typography candidates against **Azerbaijani diacritics and Cyrillic at the heaviest weight** before locking a family.
- **Do** keep small CTA labels contrast-safe: Pressed Jet on terracotta buttons, Deep Slate for tiny footer metadata on jet.

### Don't:

- **Don't** look like **football-app neon-on-black** (FotMob, OneFootball, betting apps). The category-reflex aesthetic for "football product." Reject.
- **Don't** look like **Azerbaijan-government-portal cream-and-blue**. Reject civic-portal stiffness in all forms.
- **Don't** use pure `#000` or `#fff`. Jet Ink and Warm Linen are the endpoints.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored stripe accent on cards or list items. Use full borders, color shifts, or leading mono labels instead.
- **Don't** use italic anywhere in the system. The Color Spike Rule replaces italic; the spike is terracotta, not slant. Browsers' default `<em>` italic must be overridden where used.
- **Don't** apply `background-clip: text` gradient text. Emphasis comes from weight, scale, and the terracotta color spike, never from gradient fills on type.
- **Don't** introduce a third font family. Inter Tight + JetBrains Mono is the entire system. Adding a body sans, a serif accent, or a display variant breaks the brand.
- **Don't** use glassmorphism, frosted blurs, or backdrop-filter for decorative depth. The system is flat.
- **Don't** stack identical card grids of icon + heading + text. Vary card weight, surface, and scale.
- **Don't** use Fired Terracotta as a body-text color. Never. It is a spike, not a body voice.
- **Don't** use Fired Terracotta as a background wash on more than ~15% of a composition. Beyond that, it stops spiking and starts droning.
- **Don't** set normal-size primary CTA labels in Warm Linen on Fired Terracotta, or tiny footer copyright in Caption Ash on Jet Ink.
- **Don't** introduce shadows on stat blocks, surface cards, badges, buttons, or any element other than top-level hero cards. The Flat-By-Default Rule is absolute.
- **Don't** redraw, recolor (outside the approved tint set), or otherwise modify the **logo**. The logo is locked.
- **Don't** lock a typography family without testing it in **all three scripts (EN / RU / AZ)** at the chosen heaviest weight. Fallback to a different weight or family across languages breaks the brand.
- **Don't** invent new card or surface variants without referencing the documented set. New patterns extend the system; they do not replace it.
- **Don't** use em dashes in brand or product copy. Use commas, colons, semicolons, periods, or parentheses.
