# CLAUDE.md

## What this repo is

A "coming soon" landing page for **SQUAD**, an early-stage community sports platform for Azerbaijan. The current wedge is Baku + soccer + organizer reliability — see [docs/project-brief.md](docs/project-brief.md) for the framing brief.

The page is live at **https://squad.az**. It collects email signups (via Buttondown), shows brand intent, and runs a Cloudflare Pages Function to proxy the signup API. Internal design docs (`DESIGN.md`, `DESIGN.json`, `PRODUCT.md`, `project-brief.md`) live under `docs/` for version-controlled team reference but are intentionally blocked from the public site (see below).

## Stack and commands

The site is one hand-written [index.html](index.html) (~2875 lines, all CSS and JS inline) plus logo PNGs in `assets/`. The only compiled artifact is the Pages Function bundle. There is no build step for the HTML itself.

```bash
npm install
npm run dev        # http://localhost:8788 — serves page + /api/subscribe + /docs/* 404
npm test           # Vitest function unit tests
npm run typecheck  # tsc --noEmit
```

`npm run dev` is shorthand for `wrangler pages dev . --port 8788`. It runs the full local stack including Pages Functions. You need a `.dev.vars` file (see [.dev.vars.example](.dev.vars.example)) with real secrets to exercise `/api/subscribe` locally.

Push to `main` to deploy — Cloudflare Pages watches the `bbyvfrd/SQUAD` GitHub repo and deploys on every push.

If you find yourself wanting to add a bundler or framework, stop and confirm with the user first — the single-file constraint is intentional for this stage.

## index.html architecture

The file is laid out top-to-bottom as: `<head>` → inline `<style>` → `<body>` markup → inline `<script>` IIFE. Approximate landmarks:

- **Design tokens (`:root`, ~line 22):** terracotta / steel / linen palette, spacing scale `--s1`..`--s10`, fonts, easings, durations. Dark-theme overrides live in `html[data-theme="dark"]` immediately below. Never hard-code hex values or px spacing — extend these token blocks instead.
- **Component CSS** follows the tokens, then responsive blocks at the bottom of `<style>`.
- **Body markup (~line 1631):** background layers (drift grid + terracotta sweep + parallax logo mark) → topbar (theme toggle, language menu) → single `<main class="hero">` containing the flip-card "COMING SOON" timer, the animated `#gameboard`, and the `#signup` form → stadium-style ticker strip in place of a footer.
- **Script IIFE (~line 1767):** `STRINGS` (i18n dicts) → `BOARD_FRAMES` (rotating gameboard copy) → `TICKER_ITEMS` → state vars → theme controller → `applyLanguage` → flip-card animator (`runFlip`, idle blink) → gameboard cycler → form handler → ticker builder → parallax → boot block at the very end.

## Conventions that matter

- **i18n is three locales: `en` (default), `ru`, `az`.** Every user-visible string lives in `STRINGS[lang]` and is wired to markup via `data-i18n="key"` (innerHTML) or `data-i18n-attr-placeholder="key"` (input placeholder). When adding or changing copy, update all three locales — partial translations fall back to the English literal baked into the markup, which looks broken. The rotating gameboard copy is in `BOARD_FRAMES` (also keyed per locale); ticker items are in `TICKER_ITEMS`. Russian has special line-break tweaks under `html[lang="ru"]` selectors — check those if you change hero typography.
- **Theme persists, language does not.** Theme is saved to `localStorage['squad-theme']` (`light`|`dark`) and a pre-paint `<script>` in `<head>` applies it before first paint to avoid a flash. The page always boots to `<html lang="en">`; the language selector switches at runtime but is forgotten on reload. Don't "fix" this without asking — it may be deliberate.
- **Every animation respects `prefers-reduced-motion`.** Flip cards, gameboard cycle, idle blink, mouse parallax, and the celebration sequence all branch on `window.matchMedia('(prefers-reduced-motion: reduce)')`. Preserve this when touching animation code.
- **Theme-color meta tag is updated dynamically** in `applyTheme` to match light/dark — keep it in sync if you add a new theme variant.

## Signup pipeline

The signup form at `#signup` in `index.html` uses:

1. **Cloudflare Turnstile** for bot protection (widget embedded in the form, `data-sitekey` is the public site key baked into the HTML).
2. **`/api/subscribe`** — a Pages Function at [functions/api/subscribe.ts](functions/api/subscribe.ts) that validates the token server-side and proxies to Buttondown.

### Turnstile callback pattern — do not change this

The form handler uses the **callback option in `turnstile.render()`**, not `await turnstile.execute()`. This is intentional and correct. `execute()` returns `void`; the token is delivered asynchronously via the `callback` option. The current handler registers `callback`, `error-callback`, `expired-callback`, and `timeout-callback` to resolve a pending Promise, with a 10-second safety timeout (`TURNSTILE_EXECUTE_TIMEOUT_MS`). Do not "simplify" this back to `await execute()` — that was a documented bug that was fixed.

Turnstile load failure (CSP error, adblocker, network) is handled by a poll loop capped at 25 attempts (`TURNSTILE_MAX_ATTEMPTS`). After the cap, `turnstileLoadFailed = true` is set and the submit handler short-circuits with a user-visible error instead of sending a tokenless request.

### Server-side handler ([functions/api/subscribe.ts](functions/api/subscribe.ts))

- Validates `Content-Type`, honeypot field (`website`), and presence of `email` and `cf-turnstile-response`.
- Verifies the Turnstile token against `https://challenges.cloudflare.com/turnstile/v0/siteverify` using `TURNSTILE_SECRET`.
- A replayed token returns `{success:false, error-codes:["timeout-or-duplicate"]}` — the handler maps this to 403 `challenge_failed`. No client-side dedup is needed.
- On success, proxies to the Buttondown subscribers API using `BUTTONDOWN_API_KEY`.
- No explicit body-size cap — relies on Cloudflare Workers' default 100 MB limit. Acceptable for a JSON form payload.

### Secrets

Stored as Cloudflare Pages environment variables in **both Production and Preview** environments:

| Name | Purpose |
|---|---|
| `BUTTONDOWN_API_KEY` | Buttondown API key for the subscribers endpoint |
| `TURNSTILE_SECRET` | Cloudflare Turnstile secret key for server-side verify |

For local dev, copy [.dev.vars.example](.dev.vars.example) to `.dev.vars` (gitignored) and fill in real values.

## Deployment and infrastructure

- **Host:** Cloudflare Pages, project `squad-6qe.pages.dev`. Git-integrated — push to `main` triggers a deploy.
- **Repo:** `bbyvfrd/SQUAD` (private). Production branch: `main`.
- **Domain:** `squad.az` registered at online.az; DNS is on Cloudflare (`coleman.ns.cloudflare.com`, `adaline.ns.cloudflare.com`). Both `squad.az` and `www.squad.az` are added as custom domains in the Cloudflare Pages project (both show Active).
- **www → apex redirect:** a zone-level Redirect Rule in the Cloudflare dashboard (Rules → Redirect Rules). This is not in the repo and cannot be — Cloudflare Pages' `_redirects` does not support absolute-URL rewrites with hostname matching.
- **HTTP → HTTPS:** handled by Cloudflare's "Always Use HTTPS" zone setting (enabled by default). Not in code.
- **Web Analytics:** auto-injected by the Cloudflare zone setting (Analytics → Web Analytics). The CSP in [_headers](_headers) already allows `static.cloudflareinsights.com` and `cloudflareinsights.com`. No code changes needed to enable or disable it.

## `_headers` and `functions/docs/` quirks

### Why `_redirects` does not exist

The original deploy plan included a `_redirects` file for www→apex, HTTP→HTTPS, and `/docs/* → 404`. Cloudflare Pages' `_redirects` dialect is stricter than Netlify's — it does not support absolute URLs with hostnames, does not support the `!` force flag, and **404 is not a valid redirect status code**. All three redirects were replaced by out-of-repo or function mechanisms (see above). There is no `_redirects` file in this repo; don't create one.

### `/docs/*` blocking

[functions/docs/[[catchall]].ts](functions/docs/[[catchall]].ts) is a Pages Function that returns a plain-text 404 for any request to `/docs/*`. This prevents internal design documents under `docs/` from being served publicly. The `docs/` directory is under version control for team reference; the function ensures those paths never reach visitors.

### Asset cache discipline

[_headers](_headers) serves `/assets/*` with `Cache-Control: public, max-age=31536000, immutable`. There is **no asset hashing or fingerprinting** in this repo — `index.html` references assets directly by filename. To invalidate a cached asset after a content change, **rename the file** (e.g., `og-image.png` → `og-image-v2.png`) and update the reference in `index.html`. Otherwise clients see the stale cached version for up to one year.

## Known issues

**npm audit dev-only CVEs:** `npm audit` reports 8 dev-only vulnerabilities (7 moderate, 1 high) in the `wrangler@3.x` / `miniflare` / `esbuild` / `undici` dependency chain. Production is unaffected — none of these tools ship in the deployed runtime (only the static HTML and the compiled Pages Function bundle do). Fixing requires upgrading to `wrangler@4`, which is a breaking change. Revisit when `wrangler@4` is stable in the team's tooling.

## Project context for design decisions

`docs/project-brief.md` is the source of truth for product framing. Two things to remember when making content, copy, or visual judgement calls:

1. The long-term vision is a multi-sport platform, but the current wedge is **soccer in Baku, organizer-first**. Marketing copy should be honest about that scope — don't oversell breadth the product hasn't earned.
2. The brief links to a `discovery-baku-soccer-coordination.md` that does not yet exist in the repo. If a task references it, surface that gap rather than inventing content.
