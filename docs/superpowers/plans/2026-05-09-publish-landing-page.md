# Publish SQUAD Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deploy the SQUAD coming-soon page to `https://squad.az` on Cloudflare Pages with HTTPS, security headers, SEO/social metadata, an actually-working email signup (Buttondown via a Pages Function, protected by Cloudflare Turnstile), and Cloudflare Web Analytics.

**Architecture:** Cloudflare Pages serves the static `index.html` (Git-integrated, push-to-deploy with PR preview URLs). A Pages Function at `functions/api/subscribe.ts` proxies signups to the Buttondown API server-side so the API token never reaches the browser, after verifying a Cloudflare Turnstile token to block bots. Security headers and asset caching ship via `_headers`; apex↔www redirects via `_redirects`. DNS moves to Cloudflare for clean apex+CNAME-flattening (with an A/AAAA fallback if the `.az` registry blocks nameserver delegation through online.az).

**Tech Stack:** Cloudflare Pages (host) · Cloudflare Pages Functions (TypeScript on the Workers runtime) · Cloudflare Turnstile (anti-bot) · Cloudflare Web Analytics · Buttondown (email service) · Vitest (function unit tests) · Wrangler (local Pages dev)

---

## File Structure

After this plan is fully executed, the repository looks like:

```
/
├── index.html                       # MODIFIED — meta tags, Turnstile widget, real form submit
├── 404.html                         # NEW — minimal branded 404
├── robots.txt                       # NEW
├── sitemap.xml                      # NEW
├── _headers                         # NEW — Cloudflare Pages headers config
├── _redirects                       # NEW — apex/www canonicalization
├── .gitignore                       # NEW — node_modules, .dev.vars, .wrangler
├── package.json                     # NEW — root scripts (test, dev) + devDeps
├── tsconfig.json                    # NEW
├── vitest.config.ts                 # NEW
├── assets/
│   ├── squad_logo_transparent_2.png   # existing
│   ├── squad_logomark.png             # existing
│   ├── favicon.ico                    # NEW (multi-size)
│   ├── favicon-16.png                 # NEW
│   ├── favicon-32.png                 # NEW
│   ├── apple-touch-icon.png           # NEW (180×180)
│   ├── og-image.png                   # NEW (1200×630, optimized)
│   └── site.webmanifest               # NEW
├── functions/
│   └── api/
│       ├── subscribe.ts             # NEW — POST /api/subscribe handler
│       └── _lib/
│           ├── validation.ts        # NEW — pure helpers (email, honeypot)
│           └── validation.test.ts   # NEW — Vitest unit tests
├── docs/
│   ├── project-brief.md             # existing
│   └── superpowers/plans/<this file>
├── README.md                        # MODIFIED — quick-start
└── CLAUDE.md                        # MODIFIED — note new dev commands + arch
```

The `functions/` toolchain is the only concession to a build step and is intentionally scoped to the API endpoint — `index.html` remains a hand-written, single-file page (per CLAUDE.md). `wrangler pages dev .` serves the static page and the function together with no bundling required for the HTML.

---

## Pre-flight: account credentials you will need

Before Task 4 you will need accounts for:

- **Cloudflare** (free) — `https://dash.cloudflare.com/sign-up`. Used for Pages, Turnstile, Web Analytics, optionally DNS.
- **Buttondown** (free up to 100 subscribers, $9/mo paid) — `https://buttondown.com/register`.
- **GitHub** (free) — for the deploy repo (Cloudflare Pages also supports GitLab; this plan uses GitHub).

Have email/password ready before starting Task 4.

---

## Task 1: Stage existing site files into the deploy branch

**Context:** The current branch (`claude/peaceful-tereshkova-ab1b35` in this worktree) was created from a "first commit" that contained only `README.md`. The actual `index.html`, `assets/`, and `docs/` live in the parent checkout at `/Users/faridbabayev/projects/personal/SQUAD/` and are not yet committed anywhere in git. This task brings them onto the deploy branch.

**Files:**
- Create (copied from parent): `index.html`, `assets/squad_logo_transparent_2.png`, `assets/squad_logomark.png`, `docs/project-brief.md`
- Create: `.gitignore`

- [ ] **Step 1: Copy files into the worktree**

```bash
cd /Users/faridbabayev/projects/personal/SQUAD/.claude/worktrees/peaceful-tereshkova-ab1b35
cp ../../../index.html .
cp -r ../../../assets .
mkdir -p docs && cp ../../../docs/project-brief.md docs/
ls -la
```

Expected: `index.html`, `assets/`, `docs/`, `README.md`, `CLAUDE.md`, `docs/superpowers/` all present.

- [ ] **Step 2: Create `.gitignore`**

Create `.gitignore` with this exact content:

```
# Dependencies
node_modules/

# Wrangler / Pages local dev
.wrangler/
.dev.vars
.env.local
.env.*.local

# OS / editor
.DS_Store
.vscode/
.idea/

# Test/build artifacts
coverage/
dist/
```

- [ ] **Step 3: Verify nothing sensitive is being staged**

```bash
git status
git diff --stat
```

Expected: only the four files above plus `.gitignore` are untracked or modified. No keys, no node_modules.

- [ ] **Step 4: Commit**

```bash
git add .gitignore index.html assets/ docs/
git commit -m "chore: bring landing page assets onto deploy branch"
git log --oneline -3
```

Expected: new commit on top of the "first commit" with all four paths.

---

## Task 2: SEO, social metadata, favicon set, OG image, 404 page

**Files:**
- Modify: `index.html` (head meta tags only)
- Create: `assets/favicon.ico`, `assets/favicon-16.png`, `assets/favicon-32.png`, `assets/apple-touch-icon.png`, `assets/og-image.png`, `assets/site.webmanifest`
- Create: `404.html`, `robots.txt`, `sitemap.xml`

- [ ] **Step 1: Generate the favicon set + OG image with ImageMagick**

Requires ImageMagick. Install on macOS if needed: `brew install imagemagick` (verify with `magick --version`).

Generate the four favicon files plus the OG image with these exact commands:

```bash
# Multi-size .ico (Windows / legacy)
magick assets/squad_logomark.png -define icon:auto-resize=16,32,48 assets/favicon.ico

# Modern PNG favicons
magick assets/squad_logomark.png -resize 16x16 assets/favicon-16.png
magick assets/squad_logomark.png -resize 32x32 assets/favicon-32.png

# Apple touch icon: 180x180 with linen background (iOS doesn't honor transparency well)
magick assets/squad_logomark.png -resize 180x180 \
  -background '#F5F2E9' -gravity center -extent 180x180 \
  assets/apple-touch-icon.png

# OG image: 1200x630 with the wordmark lockup centered on linen
magick -size 1200x630 xc:'#F5F2E9' \
  \( assets/squad_logo_transparent_2.png -resize 600x \) \
  -gravity center -composite \
  -strip -quality 85 assets/og-image.png

ls -la assets/favicon.ico assets/favicon-16.png assets/favicon-32.png \
  assets/apple-touch-icon.png assets/og-image.png
```

Expected: all five files exist, `og-image.png` is under 200 KB, the favicons are tiny (each <10 KB).

- [ ] **Step 1b: Create `assets/site.webmanifest`**

Hand-write `assets/site.webmanifest` (PWA manifest — browsers read this when a user adds the site to their home screen):

```json
{
  "name": "SQUAD",
  "short_name": "SQUAD",
  "icons": [
    { "src": "/assets/favicon-16.png", "sizes": "16x16", "type": "image/png" },
    { "src": "/assets/favicon-32.png", "sizes": "32x32", "type": "image/png" },
    { "src": "/assets/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ],
  "theme_color": "#F5F2E9",
  "background_color": "#F5F2E9",
  "display": "browser",
  "start_url": "/"
}
```

- [ ] **Step 2: Add SEO + social meta tags to `index.html`**

Open `index.html`. Find the existing block:

```html
<meta name="description" content="SQUAD — one place for recreational sports. Find games. Run them. Get noticed. Coming soon.">
<meta name="theme-color" content="#F5F2E9">
<title>SQUAD — Coming Soon</title>
```

Immediately after the `<title>` line, insert:

```html
<link rel="canonical" href="https://squad.az/">
<meta name="robots" content="index, follow">
<meta name="color-scheme" content="light dark">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="SQUAD">
<meta property="og:title" content="SQUAD — Find your game.">
<meta property="og:description" content="One place for recreational sports in Azerbaijan. Coming soon.">
<meta property="og:url" content="https://squad.az/">
<meta property="og:image" content="https://squad.az/assets/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="SQUAD logo on linen background">
<meta property="og:locale" content="en_US">
<meta property="og:locale:alternate" content="ru_RU">
<meta property="og:locale:alternate" content="az_AZ">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="SQUAD — Find your game.">
<meta name="twitter:description" content="One place for recreational sports in Azerbaijan. Coming soon.">
<meta name="twitter:image" content="https://squad.az/assets/og-image.png">

<!-- Icons / manifest -->
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico" sizes="any">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/assets/site.webmanifest">
```

Then **delete** the now-redundant existing line (it was only a 16/32 fallback):

```html
<link rel="icon" type="image/png" href="assets/squad_logomark.png">
```

- [ ] **Step 3: Create `robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://squad.az/sitemap.xml
```

- [ ] **Step 4: Create `sitemap.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://squad.az/</loc>
    <lastmod>2026-05-09</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="en" href="https://squad.az/"/>
    <xhtml:link rel="alternate" hreflang="ru" href="https://squad.az/"/>
    <xhtml:link rel="alternate" hreflang="az" href="https://squad.az/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://squad.az/"/>
  </url>
</urlset>
```

- [ ] **Step 5: Create a minimal `404.html`**

```html
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#F5F2E9">
<title>404 — SQUAD</title>
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<style>
  html,body{margin:0;padding:0;height:100%;background:#F5F2E9;color:#13222C;
    font-family:'Inter Tight',system-ui,-apple-system,sans-serif;
    display:grid;place-items:center;text-align:center}
  main{padding:2rem;max-width:32rem}
  h1{font-size:clamp(3rem,10vw,5rem);font-weight:800;letter-spacing:-0.02em;margin:0 0 1rem}
  p{font-size:1rem;line-height:1.5;color:#3A4550;margin:0 0 1.5rem}
  a{color:#EE4721;text-decoration:none;font-weight:600;font-family:'JetBrains Mono',ui-monospace,monospace;
    font-size:0.875rem;letter-spacing:0.16em;text-transform:uppercase}
  a:hover{text-decoration:underline}
</style>
</head>
<body>
<main>
  <h1>404</h1>
  <p>That page doesn't exist yet. Neither does most of SQUAD — we're still warming up.</p>
  <a href="/">← Back to the squad</a>
</main>
</body>
</html>
```

- [ ] **Step 6: Verify HTML is well-formed**

```bash
# Check for unmatched tags / structural issues
python3 -c "from html.parser import HTMLParser; import sys; \
  HTMLParser(convert_charrefs=True).feed(open('index.html').read()); \
  HTMLParser(convert_charrefs=True).feed(open('404.html').read()); \
  print('OK')"
```

Expected: prints `OK`.

- [ ] **Step 7: Commit**

```bash
git add index.html 404.html robots.txt sitemap.xml assets/
git commit -m "feat(seo): add OG/Twitter meta, full favicon set, robots, sitemap, 404"
```

---

## Task 3: Cloudflare Pages headers and redirects

**Files:**
- Create: `_headers`
- Create: `_redirects`

- [ ] **Step 1: Create `_headers`**

Cloudflare Pages reads `_headers` at the project root. Each indented block under a path-glob applies headers to matching responses.

Create `_headers` with this exact content:

```
/*
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self' https://cloudflareinsights.com https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; form-action 'self'; base-uri 'self'; object-src 'none'; upgrade-insecure-requests

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/index.html
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate

/404.html
  Cache-Control: public, max-age=300
```

**Why `'unsafe-inline'` is acceptable here:** the page contains intentional inline `<script>` and `<style>` blocks (theme pre-paint script, design system, IIFE) and renders no user-controlled HTML. With no XSS vector, hash-based CSP would just create maintenance churn for no security gain. If the page later starts rendering user content, revisit this.

- [ ] **Step 2: Create `_redirects`**

Cloudflare Pages reads `_redirects` for redirect rules. Use `301!` (the trailing `!` forces the redirect even if a matching file exists).

```
# Force apex — www → apex
https://www.squad.az/* https://squad.az/:splat 301!

# Force HTTPS (Cloudflare also does this at the edge, belt-and-braces)
http://squad.az/* https://squad.az/:splat 301!
http://www.squad.az/* https://squad.az/:splat 301!
```

- [ ] **Step 3: Commit**

```bash
git add _headers _redirects
git commit -m "feat(infra): add CSP, security headers, cache rules, www→apex redirect"
```

---

## Task 4: Provision external accounts and capture secrets

**This task requires manual dashboard work; no code is committed.** You will end with three values written to `.dev.vars` (gitignored, used by `wrangler pages dev`):

- `BUTTONDOWN_API_KEY`
- `TURNSTILE_SITE_KEY` (public — also embedded in HTML in Task 7)
- `TURNSTILE_SECRET` (server-side only)

- [ ] **Step 1: Create a Buttondown account and capture an API key**

1. Open `https://buttondown.com/register` and sign up using your `squad.az` brand email or a personal email.
2. After login, go to **Settings → API & Webhooks → API keys**.
3. Click **Create API key**. Name it `squad-landing-prod`. Copy the token (starts with characters, treat it like a password).
4. Verify the API works:

```bash
# Replace YOUR_KEY with the token you just copied
curl -sS -o /dev/null -w "%{http_code}\n" \
  -H "Authorization: Token YOUR_KEY" \
  https://api.buttondown.email/v1/subscribers?limit=1
```

Expected: `200`. Anything else → wrong key or wrong endpoint.

> **Endpoint note:** Buttondown's docs may list either `api.buttondown.email` or `api.buttondown.com`. Whichever returns 200 above is the one to use in Task 6. If both work, prefer `api.buttondown.email` (the historical canonical host).

- [ ] **Step 2: Create a Cloudflare Turnstile site and capture keys**

1. Open `https://dash.cloudflare.com/?to=/:account/turnstile`. Sign in or create an account.
2. Click **Add site**. Configure:
   - **Site name:** `squad.az landing`
   - **Hostname management:** Add hostnames `squad.az`, `www.squad.az`, and `localhost` (the last one lets you test locally).
   - **Widget mode:** **Invisible**
   - **Pre-clearance:** off
3. Click **Create**. Copy the **Site Key** (public) and **Secret Key** (server-side).

- [ ] **Step 3: Save the three secrets to `.dev.vars`** (gitignored)

```bash
cat > .dev.vars <<'EOF'
BUTTONDOWN_API_KEY=paste_buttondown_token_here
TURNSTILE_SITE_KEY=paste_turnstile_site_key_here
TURNSTILE_SECRET=paste_turnstile_secret_here
EOF

# Confirm it's ignored
git check-ignore -v .dev.vars
```

Expected: `git check-ignore` prints the matching `.gitignore` rule. **Do not commit `.dev.vars`.**

- [ ] **Step 4: Sanity-check the Turnstile keys with the official test endpoint**

```bash
# Replace YOUR_SECRET below
curl -sS -X POST https://challenges.cloudflare.com/turnstile/v0/siteverify \
  -d "secret=YOUR_SECRET" \
  -d "response=invalid-token" \
  | python3 -m json.tool
```

Expected: JSON with `"success": false` and `"error-codes": ["invalid-input-response"]`. (Failing on an invalid token *with* a 200 HTTP status confirms the secret is reaching Turnstile correctly.)

---

## Task 5: Pages Function project scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `vitest.config.ts`
- Create: `functions/api/_lib/validation.ts` (skeleton), `functions/api/_lib/validation.test.ts` (skeleton)

- [ ] **Step 1: Initialize package.json**

Create `package.json` with:

```json
{
  "name": "squad-landing",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "wrangler pages dev . --port 8788",
    "test": "vitest run",
    "test:watch": "vitest",
    "typecheck": "tsc --noEmit"
  },
  "devDependencies": {
    "@cloudflare/workers-types": "^4.20240909.0",
    "typescript": "^5.5.0",
    "vitest": "^2.0.0",
    "wrangler": "^3.78.0"
  }
}
```

- [ ] **Step 2: Initialize TypeScript config**

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "Bundler",
    "lib": ["ES2022"],
    "types": ["@cloudflare/workers-types", "vitest/globals"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "noEmit": true
  },
  "include": ["functions/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Initialize Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    include: ['functions/**/*.test.ts'],
    environment: 'node',
  },
});
```

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` populated, `package-lock.json` created. No errors.

- [ ] **Step 5: Verify the toolchain runs**

```bash
npx tsc --noEmit
npx vitest run --reporter=verbose
```

Expected: `tsc` exits 0 with no output (nothing to typecheck yet); `vitest` exits 0 with `No test files found`.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json tsconfig.json vitest.config.ts
git commit -m "chore: scaffold Pages Functions toolchain (typescript, vitest, wrangler)"
```

---

## Task 6: TDD `validation.ts` — pure helpers for the subscribe endpoint

**Files:**
- Create: `functions/api/_lib/validation.ts`
- Create: `functions/api/_lib/validation.test.ts`

The `_lib` prefix excludes this directory from Pages routing.

- [ ] **Step 1: Write the failing tests**

Create `functions/api/_lib/validation.test.ts`:

```ts
import { describe, it, expect } from 'vitest';
import { isValidEmail, isHoneypotTripped, parseSubscribeBody } from './validation';

describe('isValidEmail', () => {
  it('accepts a normal address', () => {
    expect(isValidEmail('a@b.co')).toBe(true);
    expect(isValidEmail('first.last+tag@sub.domain.az')).toBe(true);
  });

  it('rejects empty / whitespace / missing parts', () => {
    expect(isValidEmail('')).toBe(false);
    expect(isValidEmail('   ')).toBe(false);
    expect(isValidEmail('no-at-sign')).toBe(false);
    expect(isValidEmail('no@dot')).toBe(false);
    expect(isValidEmail('@nope.com')).toBe(false);
  });

  it('rejects strings over 254 characters', () => {
    const local = 'a'.repeat(250);
    expect(isValidEmail(`${local}@b.co`)).toBe(false);
  });
});

describe('isHoneypotTripped', () => {
  it('returns false when honeypot is empty / missing', () => {
    expect(isHoneypotTripped('')).toBe(false);
    expect(isHoneypotTripped(undefined)).toBe(false);
  });

  it('returns true when anything is in the honeypot', () => {
    expect(isHoneypotTripped('bot was here')).toBe(true);
    expect(isHoneypotTripped(' ')).toBe(true);
  });
});

describe('parseSubscribeBody', () => {
  it('returns the parsed shape for valid input', () => {
    const out = parseSubscribeBody({
      email: 'a@b.co',
      turnstileToken: 'tok-123',
      hp: '',
    });
    expect(out).toEqual({
      ok: true,
      email: 'a@b.co',
      turnstileToken: 'tok-123',
      hp: '',
    });
  });

  it('lowercases and trims the email', () => {
    const out = parseSubscribeBody({
      email: '  Hello@Example.COM  ',
      turnstileToken: 'tok',
    });
    expect(out).toEqual({
      ok: true,
      email: 'hello@example.com',
      turnstileToken: 'tok',
      hp: '',
    });
  });

  it('rejects non-object input', () => {
    expect(parseSubscribeBody(null).ok).toBe(false);
    expect(parseSubscribeBody('string').ok).toBe(false);
    expect(parseSubscribeBody(42).ok).toBe(false);
  });

  it('rejects missing or non-string fields', () => {
    expect(parseSubscribeBody({}).ok).toBe(false);
    expect(parseSubscribeBody({ email: 'a@b.co' }).ok).toBe(false);
    expect(parseSubscribeBody({ email: 1, turnstileToken: 't' }).ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npx vitest run functions/api/_lib/validation.test.ts
```

Expected: all suites fail with "Cannot find module './validation'".

- [ ] **Step 3: Write the minimal implementation**

Create `functions/api/_lib/validation.ts`:

```ts
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: unknown): boolean {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > 254) return false;
  return EMAIL_RE.test(trimmed);
}

export function isHoneypotTripped(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value !== 'string') return true;
  return value.length > 0;
}

export type ParsedBody =
  | { ok: true; email: string; turnstileToken: string; hp: string }
  | { ok: false; reason: string };

export function parseSubscribeBody(input: unknown): ParsedBody {
  if (input === null || typeof input !== 'object') {
    return { ok: false, reason: 'body must be an object' };
  }
  const obj = input as Record<string, unknown>;
  if (typeof obj.email !== 'string') {
    return { ok: false, reason: 'email must be a string' };
  }
  if (typeof obj.turnstileToken !== 'string') {
    return { ok: false, reason: 'turnstileToken must be a string' };
  }
  const hp = typeof obj.hp === 'string' ? obj.hp : '';
  return {
    ok: true,
    email: obj.email.trim().toLowerCase(),
    turnstileToken: obj.turnstileToken,
    hp,
  };
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npx vitest run functions/api/_lib/validation.test.ts
npx tsc --noEmit
```

Expected: 13 passing tests across 3 suites; `tsc` clean.

- [ ] **Step 5: Commit**

```bash
git add functions/api/_lib/
git commit -m "feat(api): pure validation helpers for /api/subscribe (TDD)"
```

---

## Task 7: Implement the `/api/subscribe` Pages Function

**Files:**
- Create: `functions/api/subscribe.ts`

Pages Functions: this file is automatically routed at `/api/subscribe`. It exports `onRequestPost` (called for POST) and `onRequest` (fallback for other methods → 405).

- [ ] **Step 1: Write the handler**

Create `functions/api/subscribe.ts`:

```ts
import { isValidEmail, isHoneypotTripped, parseSubscribeBody } from './_lib/validation';

interface Env {
  BUTTONDOWN_API_KEY: string;
  TURNSTILE_SECRET: string;
}

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
const BUTTONDOWN_URL = 'https://api.buttondown.email/v1/subscribers';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function verifyTurnstile(token: string, secret: string, ip: string | null): Promise<boolean> {
  const form = new FormData();
  form.append('secret', secret);
  form.append('response', token);
  if (ip) form.append('remoteip', ip);
  const res = await fetch(TURNSTILE_VERIFY_URL, { method: 'POST', body: form });
  if (!res.ok) return false;
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

interface ButtondownResult {
  ok: boolean;
  alreadySubscribed: boolean;
}

async function subscribeToButtondown(email: string, apiKey: string): Promise<ButtondownResult> {
  const res = await fetch(BUTTONDOWN_URL, {
    method: 'POST',
    headers: {
      Authorization: `Token ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email_address: email, tags: ['squad-waitlist'] }),
  });

  if (res.status === 201) return { ok: true, alreadySubscribed: false };

  // Buttondown returns 400 with detail "already subscribed" for duplicates.
  if (res.status === 400) {
    const text = await res.text();
    if (/already.*subscrib/i.test(text)) {
      return { ok: true, alreadySubscribed: true };
    }
  }
  return { ok: false, alreadySubscribed: false };
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ ok: false, error: 'invalid_json' }, 400);
  }

  const parsed = parseSubscribeBody(body);
  if (!parsed.ok) {
    return jsonResponse({ ok: false, error: 'invalid_body' }, 400);
  }

  // Honeypot tripped → respond 200 OK without doing anything (don't tip off bots).
  if (isHoneypotTripped(parsed.hp)) {
    return jsonResponse({ ok: true });
  }

  if (!isValidEmail(parsed.email)) {
    return jsonResponse({ ok: false, error: 'invalid_email' }, 400);
  }

  const ip = request.headers.get('CF-Connecting-IP');
  const turnstileOk = await verifyTurnstile(parsed.turnstileToken, env.TURNSTILE_SECRET, ip);
  if (!turnstileOk) {
    return jsonResponse({ ok: false, error: 'challenge_failed' }, 403);
  }

  const result = await subscribeToButtondown(parsed.email, env.BUTTONDOWN_API_KEY);
  if (!result.ok) {
    return jsonResponse({ ok: false, error: 'upstream_error' }, 502);
  }

  return jsonResponse({ ok: true, alreadySubscribed: result.alreadySubscribed });
};

export const onRequest: PagesFunction<Env> = async () => {
  return new Response('Method Not Allowed', {
    status: 405,
    headers: { Allow: 'POST', 'Content-Type': 'text/plain' },
  });
};
```

- [ ] **Step 2: Typecheck**

```bash
npx tsc --noEmit
```

Expected: clean exit.

- [ ] **Step 3: Manual integration test against the Pages dev server**

In one terminal:

```bash
npx wrangler pages dev . --port 8788
```

Expected: server starts, prints `Ready on http://127.0.0.1:8788`. The `.dev.vars` file is auto-loaded.

In a second terminal, exercise the failure paths:

```bash
# Method not allowed
curl -sS -o /dev/null -w "%{http_code}\n" http://127.0.0.1:8788/api/subscribe
# Expected: 405

# Invalid JSON
curl -sS -o - -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/subscribe \
  -H "Content-Type: application/json" --data 'not json'
# Expected: {"ok":false,"error":"invalid_json"} then 400

# Missing fields
curl -sS -o - -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/subscribe \
  -H "Content-Type: application/json" --data '{}'
# Expected: {"ok":false,"error":"invalid_body"} then 400

# Honeypot tripped (no Turnstile/Buttondown calls happen)
curl -sS -o - -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/subscribe \
  -H "Content-Type: application/json" \
  --data '{"email":"a@b.co","turnstileToken":"x","hp":"bot"}'
# Expected: {"ok":true} then 200

# Invalid email
curl -sS -o - -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/subscribe \
  -H "Content-Type: application/json" \
  --data '{"email":"not-email","turnstileToken":"x","hp":""}'
# Expected: {"ok":false,"error":"invalid_email"} then 400

# Bad Turnstile token (real verify call fails)
curl -sS -o - -w "\n%{http_code}\n" -X POST http://127.0.0.1:8788/api/subscribe \
  -H "Content-Type: application/json" \
  --data '{"email":"a@b.co","turnstileToken":"definitely-bad","hp":""}'
# Expected: {"ok":false,"error":"challenge_failed"} then 403
```

(Happy-path testing requires a real Turnstile token from a real browser session, which we'll exercise after Task 8.)

Stop the dev server with `Ctrl+C`.

- [ ] **Step 4: Commit**

```bash
git add functions/api/subscribe.ts
git commit -m "feat(api): /api/subscribe with honeypot, Turnstile, Buttondown proxy"
```

---

## Task 8: Wire the frontend signup form to `/api/subscribe`

**Files:**
- Modify: `index.html` (add Turnstile script + widget, add honeypot input, replace form handler, add error strings)

- [ ] **Step 1: Add the Turnstile script in `<head>`**

Open `index.html`. Find the existing line:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@100..900&family=JetBrains+Mono:wght@500;600;700&display=swap" rel="stylesheet">
```

Immediately after that line, add:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" async defer></script>
```

- [ ] **Step 2: Add the Turnstile site key as a top-level constant**

Open `index.html`. **Replace `PASTE_YOUR_TURNSTILE_SITE_KEY_HERE` with the actual public site key from Task 4 Step 2.** This key is public and is meant to be shipped to browsers.

Find the opening of the main IIFE:

```js
(function() {
  'use strict';

  /* ─── i18n strings (2-word coming-soon for every language) ── */
  const STRINGS = {
```

Insert immediately above `const STRINGS = {`:

```js
  const TURNSTILE_SITE_KEY = 'PASTE_YOUR_TURNSTILE_SITE_KEY_HERE';
```

- [ ] **Step 3: Add a server-error string to all three locales**

In the same `STRINGS` object, add `emailErrorServer` to `en`, `ru`, `az`. Find the existing `emailErrorBad` lines for each locale and add a new line right after each one:

For `en`:
```js
      emailErrorServer: 'Could not submit. Try again in a moment.',
```

For `ru`:
```js
      emailErrorServer: 'Не удалось отправить. Попробуйте ещё раз.',
```

For `az`:
```js
      emailErrorServer: 'Göndərilə bilmədi. Bir az sonra yenidən cəhd edin.',
```

- [ ] **Step 4: Add the honeypot input + Turnstile widget container to the form**

Find the existing form markup (around line 1736):

```html
<form class="signup reveal reveal-4" id="signup" novalidate>
  <div class="signup-row">
    <input class="signup-input" id="emailInput" type="email" required
      data-i18n-attr-placeholder="emailPlaceholder"
      placeholder="Your email"
      autocomplete="email" inputmode="email">
    <button class="signup-btn" type="submit" data-i18n="emailButton">Notify me</button>
  </div>
```

Immediately **after** the `<div class="signup-row">…</div>` closing `</div>` and **before** the existing `<div class="signup-help"...>` line, insert:

```html
        <input type="text" name="hp" tabindex="-1" autocomplete="off" aria-hidden="true"
               style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">
        <div id="turnstile-widget" style="margin-top:var(--s2)"></div>
```

- [ ] **Step 5: Replace the form submit handler with a real network call**

Find the existing form-handler block (around line 2469):

```js
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dict = STRINGS[currentLang];
    const v = (input.value || '').trim();
    if (!v) {
      help.textContent = dict.emailErrorEmpty;
      help.classList.add('is-error');
      input.focus();
      return;
    }
    if (!EMAIL_RE.test(v)) {
      help.textContent = dict.emailErrorBad;
      help.classList.add('is-error');
      input.focus();
      return;
    }
    celebrateThenLand();
  });
```

Replace it **in full** with:

```js
  let turnstileWidgetId = null;
  function renderTurnstile() {
    if (typeof window.turnstile === 'undefined') {
      setTimeout(renderTurnstile, 200);
      return;
    }
    turnstileWidgetId = window.turnstile.render('#turnstile-widget', {
      sitekey: TURNSTILE_SITE_KEY,
      size: 'invisible',
      action: 'subscribe',
    });
  }
  renderTurnstile();

  const submitBtn = form.querySelector('.signup-btn');
  const hpInput = form.querySelector('input[name="hp"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const dict = STRINGS[currentLang];
    const v = (input.value || '').trim();
    if (!v) {
      help.textContent = dict.emailErrorEmpty;
      help.classList.add('is-error');
      input.focus();
      return;
    }
    if (!EMAIL_RE.test(v)) {
      help.textContent = dict.emailErrorBad;
      help.classList.add('is-error');
      input.focus();
      return;
    }

    submitBtn.disabled = true;
    help.classList.remove('is-error');

    try {
      let token = '';
      if (turnstileWidgetId !== null && window.turnstile) {
        token = await window.turnstile.execute(turnstileWidgetId, { action: 'subscribe' });
      }
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: v,
          turnstileToken: token,
          hp: hpInput ? hpInput.value : '',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        help.textContent = dict.emailErrorServer;
        help.classList.add('is-error');
        submitBtn.disabled = false;
        if (turnstileWidgetId !== null && window.turnstile) {
          window.turnstile.reset(turnstileWidgetId);
        }
        return;
      }
      celebrateThenLand();
    } catch (_err) {
      help.textContent = dict.emailErrorServer;
      help.classList.add('is-error');
      submitBtn.disabled = false;
      if (turnstileWidgetId !== null && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId);
      }
    }
  });
```

- [ ] **Step 6: Local end-to-end test**

```bash
npx wrangler pages dev . --port 8788
```

In a browser, visit `http://localhost:8788/`. Open DevTools → Network. Then:

1. Type a real test email (e.g. your own) and click **Notify me**.
2. Watch Network: a `POST /api/subscribe` request fires. Status should be **200**, response `{"ok":true,...}`.
3. The page should run the celebration animation and show the success state.
4. Verify the email landed in Buttondown: in the dashboard at `https://buttondown.com/subscribers`, the test email appears with tag `squad-waitlist`.
5. Submit the same email a second time → still 200 (`alreadySubscribed: true`), page still celebrates. Idempotent.
6. Open DevTools → Application → look for the honeypot input. Type "spam" into it via the console (`document.querySelector('input[name=hp]').value = 'spam'`), submit again → response 200 but Buttondown shows no new entry. Honeypot working.

Stop the dev server.

- [ ] **Step 7: Clean up the test subscriber from Buttondown** (optional)

In the Buttondown dashboard, delete the test subscriber so prod metrics start clean.

- [ ] **Step 8: Commit**

```bash
git add index.html
git commit -m "feat(signup): wire form to /api/subscribe with Turnstile + honeypot"
```

---

## Task 9: Push to GitHub and connect Cloudflare Pages

**Files:** none changed; this is configuration.

- [ ] **Step 1: Create the GitHub repo and push**

Use the GitHub CLI (preferred) or the web UI. Repo should be **private** initially — site is static so privacy isn't security-critical, but private avoids accidental config leaks.

```bash
gh repo create squad-landing --private --source=. --remote=origin --description "SQUAD coming-soon landing page" --push
```

If you don't have `gh`, do the equivalent: create the repo via `https://github.com/new`, then:

```bash
git remote add origin git@github.com:<your-username>/squad-landing.git
git branch -M main   # only if you want to rename; otherwise skip
git push -u origin HEAD
```

Expected: repo exists at `https://github.com/<you>/squad-landing` and the deploy branch is pushed.

- [ ] **Step 2: Connect Cloudflare Pages to the repo**

1. Open `https://dash.cloudflare.com/?to=/:account/pages`.
2. Click **Create application → Pages → Connect to Git**.
3. Authorize Cloudflare's GitHub app (scope it to just `squad-landing`).
4. Select the `squad-landing` repo. Click **Begin setup**.
5. Configure the build:
   - **Project name:** `squad-landing`
   - **Production branch:** the branch you pushed in Step 1 (likely `claude/peaceful-tereshkova-ab1b35` for now; can be renamed to `main` later via dashboard)
   - **Framework preset:** None
   - **Build command:** *(leave empty)*
   - **Build output directory:** *(leave empty — defaults to repo root)*
   - **Environment variables (build & preview):** none yet
6. Click **Save and Deploy**.

Expected: first build runs in ~30s. Pages assigns a `*.pages.dev` URL (e.g. `https://squad-landing.pages.dev`).

- [ ] **Step 3: Add the three production secrets**

Still in the Pages project:

1. Go to **Settings → Environment variables**.
2. Under **Production**, add (set type to **Secret** for the API tokens):
   - `BUTTONDOWN_API_KEY` (Secret) = the Buttondown token from Task 4
   - `TURNSTILE_SECRET` (Secret) = the Turnstile secret from Task 4
3. Repeat under **Preview** so PR previews also work.
4. Trigger a redeploy: **Deployments → Retry deployment** on the latest build.

> `TURNSTILE_SITE_KEY` is **not** added here — it's a public value already baked into `index.html`.

- [ ] **Step 4: Smoke-test the `*.pages.dev` URL**

```bash
PAGES_URL="https://squad-landing.pages.dev"   # replace with your actual URL

# Page loads
curl -sS -o /dev/null -w "page: %{http_code}\n" "$PAGES_URL/"

# Security headers present
curl -sSI "$PAGES_URL/" | grep -iE 'strict-transport-security|content-security-policy|x-content-type-options|x-frame-options|referrer-policy|permissions-policy'

# Long cache on assets
curl -sSI "$PAGES_URL/assets/squad_logomark.png" | grep -i cache-control

# 404 page works
curl -sS -o /dev/null -w "404: %{http_code}\n" "$PAGES_URL/does-not-exist"

# Function endpoint exists
curl -sS -o /dev/null -w "GET /api/subscribe: %{http_code}\n" "$PAGES_URL/api/subscribe"
```

Expected:
- `page: 200`
- All six security headers print
- `Cache-Control: public, max-age=31536000, immutable`
- `404: 404`
- `GET /api/subscribe: 405` (method not allowed)

Open `$PAGES_URL` in a browser, submit the form with a real email, confirm Buttondown delivery. (The Turnstile site allows `*.pages.dev`? It does **not** by default — temporarily add `squad-landing.pages.dev` to the Turnstile site's allowed hostnames in the dashboard for this smoke test, then remove or keep it as you prefer.)

---

## Task 10: Custom domain `squad.az` + DNS cutover at online.az

**Files:** none changed.

The clean path is to move DNS to Cloudflare (free, integrates with Pages). The `.az` ccTLD historically restricts nameserver delegation through some registrars, so we'll attempt the clean path first and document the fallback.

- [ ] **Step 1: Add the apex domain to the Pages project**

In the Cloudflare Pages project (`squad-landing`):

1. Go to **Custom domains → Set up a custom domain**.
2. Enter `squad.az`. Click **Continue**.
3. Cloudflare will show **one of two flows**:
   - **(a) "Activate domain on Cloudflare":** if `squad.az` isn't on Cloudflare DNS yet, it offers to onboard. Click through. Cloudflare will assign you two nameservers (e.g. `gina.ns.cloudflare.com`, `kirk.ns.cloudflare.com`). **Copy these.**
   - **(b) "Add CNAME / A record":** if Cloudflare DNS is already managing `squad.az`, it auto-creates the records.

4. Repeat the entire flow for `www.squad.az`.

- [ ] **Step 2: Change nameservers at online.az** (preferred path)

1. Log in at `https://online.az/`.
2. Navigate to your domain panel for `squad.az`.
3. Find the **DNS / Nameservers** section. Look for "Custom nameservers" or "Change DNS".
4. Replace the existing nameservers with the two Cloudflare nameservers from Step 1.
5. Save. Note the registry's listed propagation time (often "up to 24h" but usually <1h for `.az`).

If the panel **does not allow** custom nameservers (some `.az` registry policies block this), skip to **Step 2-fallback**.

- [ ] **Step 2-fallback: Keep DNS at online.az, use direct records**

Only do this if Step 2 wasn't possible.

In Cloudflare Pages → Custom domains, the dialog will show specific records to set on your existing DNS provider:

- For apex `squad.az`: A and AAAA records pointing to the IPs Cloudflare prints (e.g. `A 192.0.2.1`, `AAAA 2606:4700::1` — use the **exact** values shown in your dashboard, do not copy these).
- For `www.squad.az`: a CNAME to `squad-landing.pages.dev`.

In the online.az DNS panel, create those three records exactly as shown. Save.

- [ ] **Step 3: Verify DNS has propagated**

Wait 5–15 minutes, then:

```bash
# Either path should resolve
dig +short squad.az A
dig +short squad.az AAAA
dig +short www.squad.az

# If you went the nameserver path, NS should be Cloudflare's
dig +short squad.az NS
```

Expected: A and AAAA records resolve; NS records (if used) point to `*.ns.cloudflare.com`. Cloudflare Pages **Custom domains** tab will flip the domain status from "Pending" to "Active" once it sees correct records. Refresh until Active.

- [ ] **Step 4: Verify HTTPS, redirects, and headers on the real domain**

```bash
# Apex serves the page over HTTPS
curl -sS -o /dev/null -w "apex: %{http_code}\n" https://squad.az/

# www → apex
curl -sS -o /dev/null -w "www: %{http_code} → %{redirect_url}\n" https://www.squad.az/

# Plain HTTP → HTTPS
curl -sS -o /dev/null -w "http: %{http_code} → %{redirect_url}\n" http://squad.az/

# Cert is valid + chain to a public CA
curl -sSv https://squad.az/ 2>&1 | grep -E 'subject:|issuer:|TLSv1\.[23]'

# Security headers
curl -sSI https://squad.az/ | grep -iE 'strict-transport-security|content-security-policy|referrer-policy|permissions-policy|x-frame-options|x-content-type-options'
```

Expected:
- `apex: 200`
- `www: 301 → https://squad.az/`
- `http: 301 → https://...` (Cloudflare also force-upgrades at the edge)
- TLS 1.3, cert subject includes `squad.az`, issued by a public CA (e.g. Google Trust Services, used by Cloudflare's universal SSL)
- All security headers present

- [ ] **Step 5: Add `squad.az` and `www.squad.az` to the Turnstile site's allowed hostnames** (if not already)

In Cloudflare Turnstile dashboard → your site → Settings → Hostnames. Confirm `squad.az`, `www.squad.az`, `localhost`, and (optionally) `*.pages.dev` are listed.

- [ ] **Step 6: Real end-to-end signup test on production**

Open `https://squad.az/` in a private browser window. Submit a fresh test email. Confirm:

1. POST returns 200.
2. Subscriber appears in Buttondown with tag `squad-waitlist`.
3. Resubmitting the same email still returns 200 and celebrates (idempotent).
4. Submitting an obviously fake/throwaway address still works (Turnstile only blocks bots, not fake addresses).

---

## Task 11: Cloudflare Web Analytics + production verification sweep

**Files:** none changed.

- [ ] **Step 1: Enable Web Analytics for the Pages project**

1. Open `https://dash.cloudflare.com/?to=/:account/web-analytics`.
2. Click **Add a site** → choose **Free** (no JS injection by you required when using a Pages-hosted site).
3. Pick **Automatic setup** and select the `squad.az` zone (now that DNS is on Cloudflare from Task 10). If you took the fallback path and DNS is still on online.az, choose **Manual setup**: copy the provided beacon snippet and add it to `index.html` immediately before `</body>`, then commit and push.

- [ ] **Step 2: Verify analytics is firing**

Visit `https://squad.az/` in a fresh browser window with DevTools → Network filter on `cloudflareinsights`.

Expected: a request to `https://static.cloudflareinsights.com/beacon.min.js` (script load) and a POST to `https://cloudflareinsights.com/cdn-cgi/rum` (page-view event), both 200.

If the CSP blocks them, check `_headers` — `script-src` must include `https://static.cloudflareinsights.com` and `connect-src` must include `https://cloudflareinsights.com`. (Both already do per Task 3.)

- [ ] **Step 3: Production checklist — scripted sweep**

Run this script and confirm every line is green:

```bash
set -e
DOM=https://squad.az

echo "1. Apex 200..."
test "$(curl -sS -o /dev/null -w '%{http_code}' $DOM/)" = "200"

echo "2. www → apex 301..."
test "$(curl -sS -o /dev/null -w '%{http_code}' https://www.squad.az/)" = "301"

echo "3. 404 page returns 404..."
test "$(curl -sS -o /dev/null -w '%{http_code}' $DOM/no-such-path)" = "404"

echo "4. /api/subscribe rejects GET with 405..."
test "$(curl -sS -o /dev/null -w '%{http_code}' $DOM/api/subscribe)" = "405"

echo "5. /api/subscribe rejects empty body with 400..."
test "$(curl -sS -X POST -o /dev/null -w '%{http_code}' $DOM/api/subscribe \
  -H 'Content-Type: application/json' --data '{}')" = "400"

echo "6. HSTS header present..."
curl -sSI $DOM/ | grep -qi 'strict-transport-security: max-age=63072000'

echo "7. CSP header present..."
curl -sSI $DOM/ | grep -qi 'content-security-policy:'

echo "8. robots.txt accessible..."
test "$(curl -sS -o /dev/null -w '%{http_code}' $DOM/robots.txt)" = "200"

echo "9. sitemap.xml accessible and references squad.az..."
curl -sS $DOM/sitemap.xml | grep -q 'https://squad.az/'

echo "10. OG image returns 200..."
test "$(curl -sS -o /dev/null -w '%{http_code}' $DOM/assets/og-image.png)" = "200"

echo "11. Long cache on /assets..."
curl -sSI $DOM/assets/squad_logomark.png | grep -qi 'cache-control: public, max-age=31536000, immutable'

echo "ALL CHECKS PASSED"
```

Expected: every echo prints, no failures, last line is `ALL CHECKS PASSED`.

- [ ] **Step 4: External validators (manual)**

Open each URL in a browser and confirm the corresponding result:

- `https://www.ssllabs.com/ssltest/analyze.html?d=squad.az` → grade **A** or higher (Cloudflare Universal SSL passes by default).
- `https://securityheaders.com/?q=squad.az&followRedirects=on` → grade **A** or higher (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy all detected).
- `https://search.google.com/test/rich-results?url=https%3A%2F%2Fsquad.az%2F` → no errors; OG metadata picked up.
- Lighthouse in Chrome DevTools (mobile preset) on `https://squad.az/` → Performance / Accessibility / Best Practices / SEO all ≥ 90. Investigate any individual <90.

- [ ] **Step 5: Tell Google the site exists**

1. Open `https://search.google.com/search-console`.
2. Add `https://squad.az` as a property (Domain property is cleanest now that DNS is on Cloudflare — it asks for a TXT record; create it via Cloudflare DNS).
3. Submit `https://squad.az/sitemap.xml` under **Sitemaps**.

---

## Task 12: Update CLAUDE.md and README.md

**Files:**
- Modify: `CLAUDE.md`
- Modify: `README.md`

- [ ] **Step 1: Update `CLAUDE.md`**

The existing CLAUDE.md says there's no build step and the signup form does nothing. Both are now outdated. Update the relevant sections.

Replace the **Stack and commands** section with:

```markdown
## Stack and commands

The frontend is still one hand-written `index.html` (no bundler, no framework). A small TypeScript Pages Function at `functions/api/subscribe.ts` handles the email signup — that's the one place a build step exists.

- **Install:** `npm install` (only needed for the function tests + local Pages dev)
- **Local dev (full stack — page + function):** `npm run dev` → serves at `http://localhost:8788/`. Requires `.dev.vars` with `BUTTONDOWN_API_KEY`, `TURNSTILE_SECRET`, `TURNSTILE_SITE_KEY`.
- **Function tests:** `npm test` (or `npm run test:watch`)
- **Typecheck:** `npm run typecheck`
- **Deploy:** push to the production branch — Cloudflare Pages auto-deploys. PRs get preview URLs at `<pr>.<project>.pages.dev`.
- **Live URL:** `https://squad.az/`
```

Replace the bullet about "The signup form does not actually submit anywhere" with:

```markdown
- **Signup is real and goes to Buttondown.** The frontend posts to `/api/subscribe` (the Pages Function), which verifies a Cloudflare Turnstile token, checks a honeypot, then calls the Buttondown API with the `squad-waitlist` tag. Duplicates are treated as success. The Buttondown API key only exists in Cloudflare Pages env vars and `.dev.vars` (gitignored) — never in client code.
```

Add a new section after **Conventions that matter**:

```markdown
## Deployment and infra

- **Host:** Cloudflare Pages, Git-integrated. Production branch deploys to `squad.az`; PRs get preview URLs.
- **DNS:** Cloudflare (moved from online.az during initial setup). If you need to change registrar things, the registrar is still online.az.
- **Headers / caching:** `_headers` (CSP, HSTS, etc., long-cache on `/assets/*`, no-cache on `/` and `/index.html`).
- **Redirects:** `_redirects` (`www.squad.az` → `squad.az`, HTTP → HTTPS).
- **Analytics:** Cloudflare Web Analytics (privacy-friendly, no cookie banner).
- **Anti-bot:** Cloudflare Turnstile, invisible mode. Allowed hostnames: `squad.az`, `www.squad.az`, `localhost`. Add new ones in the CF dashboard if you ever need preview deploys to validate.
- **Secrets** (Cloudflare Pages env vars, both Production and Preview): `BUTTONDOWN_API_KEY`, `TURNSTILE_SECRET`. The site key is public and is in `index.html`.
```

- [ ] **Step 2: Update `README.md`**

Replace the entire `README.md` contents with:

```markdown
# SQUAD

Coming-soon landing page for SQUAD — a community sports platform for Azerbaijan.

Live at **https://squad.az**.

See [`docs/project-brief.md`](docs/project-brief.md) for product framing and [`CLAUDE.md`](CLAUDE.md) for the technical map.

## Quick start

```bash
npm install
cp .dev.vars.example .dev.vars   # then fill in real values
npm run dev                      # http://localhost:8788
npm test                         # function tests
```

Push to the production branch to deploy via Cloudflare Pages.
```

- [ ] **Step 3: Create the `.dev.vars.example`** referenced above

```bash
cat > .dev.vars.example <<'EOF'
# Copy to .dev.vars and fill in real values. .dev.vars is gitignored.
BUTTONDOWN_API_KEY=
TURNSTILE_SITE_KEY=
TURNSTILE_SECRET=
EOF
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md README.md .dev.vars.example
git commit -m "docs: update CLAUDE.md and README for live deploy + signup wiring"
git push
```

Expected: Cloudflare Pages picks up the push and deploys the documentation update (no user-visible change). Verify in **Deployments**.

---

## Done

After Task 12, the site is publicly live at `https://squad.az` with:

- Real, working email signup (Buttondown, Turnstile-protected, honeypot-guarded)
- Modern security headers (A+ on securityheaders.com)
- Privacy-friendly analytics (Cloudflare Web Analytics)
- Full SEO/social metadata (OG, Twitter card, sitemap, robots, full favicon set)
- Aggressive asset caching with proper `Cache-Control`
- Custom 404 page
- Apex + www both work; HTTP redirects to HTTPS; www redirects to apex
- Push-to-deploy via Cloudflare Pages with PR previews
- Function tests for the validation layer

If anything in the production sweep (Task 11 Step 3) ever fails on a future change, that's your regression signal — re-run it before merging.
