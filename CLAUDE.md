# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single-file "coming soon" landing page for **SQUAD**, an early-stage community sports platform for Azerbaijan. The current wedge is Baku + soccer + organizer reliability — see `docs/project-brief.md` for the framing brief (status: discovery, not PRD).

The page itself is the only product surface that exists today. There is no backend, no app, no waitlist database — just a static page collecting visual + brand intent and (eventually) email signups.

## Stack and commands

There is **no build step, no package manager, no test suite, no linter**. The entire site is one hand-written `index.html` (~2.5k lines, all CSS and JS inline) plus two logo PNGs in `assets/`.

- **Preview locally:** open `index.html` directly in a browser, or serve the directory statically (e.g. `python3 -m http.server 8000`, `npx serve .`). No install step.
- **Deploy:** any static host. The page is fully self-contained; only external requests are Google Fonts (Inter Tight, JetBrains Mono) and the two local PNGs in `assets/`.

If you find yourself wanting to add a bundler, framework, or split the file up, **stop and confirm with the user first** — the single-file constraint is intentional for this stage.

## index.html architecture

The file is laid out top-to-bottom as: `<head>` → inline `<style>` → `<body>` markup → inline `<script>` IIFE. Approximate landmarks:

- **Design tokens (`:root`, ~line 22):** terracotta / steel / linen palette, spacing scale `--s1`..`--s10`, fonts, easings, durations. Dark-theme overrides live in `html[data-theme="dark"]` immediately below. **Never hard-code hex values or px spacing** — extend these token blocks instead.
- **Component CSS** follows the tokens, then responsive blocks at the bottom of `<style>`.
- **Body markup (~line 1631):** background layers (drift grid + terracotta sweep + parallax logo mark) → topbar (theme toggle, language menu) → single `<main class="hero">` containing the flip-card "COMING SOON" timer, the animated `#gameboard`, and the `#signup` form → stadium-style ticker strip in place of a footer.
- **Script IIFE (~line 1767):** `STRINGS` (i18n dicts) → `BOARD_FRAMES` (rotating gameboard copy) → `TICKER_ITEMS` → state vars → theme controller → `applyLanguage` → flip-card animator (`runFlip`, idle blink) → gameboard cycler → form handler → ticker builder → parallax → boot block at the very end.

## Conventions that matter

- **i18n is three locales: `en` (default), `ru`, `az`.** Every user-visible string lives in `STRINGS[lang]` and is wired to markup via `data-i18n="key"` (innerHTML) or `data-i18n-attr-placeholder="key"` (input placeholder). When adding or changing copy, update **all three** locales — partial translations will fall back to the English literal baked into the markup, which looks broken. The rotating gameboard copy is in `BOARD_FRAMES` (also keyed per locale); ticker items are in `TICKER_ITEMS`. Russian has special line-break tweaks under `html[lang="ru"]` selectors — check those if you change hero typography.
- **Theme persists, language does not.** Theme is saved to `localStorage['squad-theme']` (`light`|`dark`) and a pre-paint `<script>` in `<head>` applies it before first paint to avoid a flash. The page always boots to `<html lang="en">`; the language selector switches at runtime but is forgotten on reload. Don't "fix" this without asking — it may be deliberate.
- **The signup form does not actually submit anywhere.** `form#signup`'s submit handler validates the email regex and runs a celebration animation; there is no `fetch`, no provider, no endpoint. Wiring up real signup (Formspree / Mailchimp / Supabase / a custom endpoint) is an open decision — ask the user which provider before introducing network code or environment variables.
- **Every animation respects `prefers-reduced-motion`.** Flip cards, gameboard cycle, idle blink, mouse parallax, and the celebration sequence all branch on `window.matchMedia('(prefers-reduced-motion: reduce)')`. Preserve this when touching animation code.
- **Theme-color meta tag is updated dynamically** in `applyTheme` to match light/dark — keep it in sync if you add a new theme variant.

## Project context for design decisions

`docs/project-brief.md` is the source of truth for product framing. Two things to remember when making content/copy/visual judgement calls:

1. The long-term vision is a multi-sport platform, but the current wedge is **soccer in Baku, organizer-first**. Marketing copy should be honest about that scope — don't oversell breadth the product hasn't earned.
2. The brief links to a `discovery-baku-soccer-coordination.md` that **does not yet exist** in the repo. If a task references it, surface that gap rather than inventing content.
