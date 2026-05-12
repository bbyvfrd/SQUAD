# Locale auto-detection and persistence — design

**Date:** 2026-05-10
**Branch:** `locale-auto-detect`
**Scope:** `index.html` only — no framework migration.

## Problem

The landing page supports three languages (`en`, `ru`, `az`) via a custom i18n dictionary in `index.html`, but has two gaps:

1. **No auto-detection.** Visitors always see English regardless of their browser language. Manual locale selection happens via a dropdown, but there is no signal-based default.
2. **No persistence.** Clicking a language updates the page in-memory only. On refresh, the boot path reads `html.getAttribute('lang')`, which is hardcoded to `"en"` in markup — the chosen locale is lost.

The fix is small and stays inside the existing static page. A framework migration (Nuxt/React) was considered and rejected: the only meaningful gain would be locale-prefixed URLs (`/ru/`), which is not a current requirement.

## Goals

- First-time visitors with a browser language matching `en|ru|az` see the page in that language.
- Once a visitor manually picks a locale, refresh keeps them on it. (Auto-detected values are not persisted — they are re-derived on each visit from `navigator.languages`, so a later change to the user's browser language takes effect on the next visit.)
- No "English flash" on first paint when auto-detection picks a non-English locale.
- Zero new external dependencies, zero network calls, zero build pipeline changes.

## Non-goals

- Geo-IP detection. Browser language already encodes user preference better than IP geolocation; geo-IP would override the explicit signal an Azerbaijani-in-Baku-with-English-browser is sending. Considered and rejected.
- URL query param overrides (`?lang=xx`). Useful for shareable per-locale links, but not currently needed. Trivial to add later (~3 lines in the early script).
- Re-detecting after a stored choice exists. Once a locale is saved, it wins until the user changes it — matches how the theme toggle works.
- Removing the `<html lang="en">` default. Kept for no-JS crawlers and SEO; the inline script overrides before paint.
- Framework migration. Out of scope; revisit only if locale-prefixed URLs become a requirement.

## Detection priority

1. `localStorage['squad-lang']` — manual choice or value cached from a previous auto-detect.
2. `navigator.languages[]` — first entry whose `xx` prefix (lowercased) matches `en|ru|az`.
3. `navigator.language` — used only if `navigator.languages` is missing/empty.
4. `'en'` — default fallback.

## Architecture

Three changes to `index.html`:

### 1. Inline early-detect script in `<head>`

Mirrors the existing theme script at lines 9–15. Runs before first paint, sets `html.lang` to the detected locale. Does not touch text content or load the i18n dictionary — that happens later in the existing boot path. The page's hardcoded `<html lang="en">` is overridden in-place.

```html
<script>
  try {
    var SUPPORTED = ['en','ru','az'];
    var stored = localStorage.getItem('squad-lang');
    var lang = SUPPORTED.indexOf(stored) !== -1 ? stored : null;
    if (!lang) {
      var prefs = (navigator.languages && navigator.languages.length)
        ? navigator.languages
        : [navigator.language || 'en'];
      for (var i = 0; i < prefs.length && !lang; i++) {
        var p = String(prefs[i]).toLowerCase();
        for (var j = 0; j < SUPPORTED.length; j++) {
          if (p.indexOf(SUPPORTED[j]) === 0) { lang = SUPPORTED[j]; break; }
        }
      }
      if (!lang) lang = 'en';
    }
    document.documentElement.setAttribute('lang', lang);
  } catch (_) {}
</script>
```

Iteration order is **prefs-first**: walk the user's `navigator.languages` array in order and pick the first entry whose prefix matches any supported code. This honors the user's explicit preference ordering — a user with `["az-AZ", "ru-RU"]` gets AZ, not RU.

Pre-ES6 syntax (`var`, `for`, `indexOf`) is deliberate — this script runs before paint and should be maximally tolerant of older runtimes, matching the defensive style of the existing theme script.

Placement: immediately after the existing theme inline script (currently lines 9–15).

### 2. `applyLanguage()` gains a persistence flag

Located at `index.html:2379`. Match the existing theme pattern at line 2348 (`applyTheme(theme, shouldPersist = false)`). Boot path calls without persist (just reflects what the early script set); click handler calls with persist.

```js
function applyLanguage(lang, shouldPersist = false) {
  if (!STRINGS[lang]) return;
  // ...existing body unchanged...
  if (shouldPersist) {
    try { localStorage.setItem('squad-lang', lang); } catch (_) {}
  }
}
```

### 3. Click handler passes `shouldPersist=true`

At `index.html:2434`:

```js
applyLanguage(b.getAttribute('data-lang'), true);
```

The boot call at `index.html:2765` stays unchanged — it should not persist, because that would be a no-op for the localStorage path and a write of the auto-detected value for the navigator path. Persisting auto-detected values is a deliberate non-goal: if a user changes their browser language later, we want the next visit to follow it (until they manually pick something).

## Data flow

**First visit, browser set to Russian:**
1. Inline script runs → reads localStorage (empty) → checks `navigator.languages` → finds `ru` match → sets `html.lang="ru"`.
2. Page paints with `lang="ru"` already set.
3. Boot path at line 2764 reads `html.getAttribute('lang')` → `"ru"` → calls `applyLanguage('ru')` → text swaps to Russian dictionary.
4. No localStorage write yet — auto-detection is not persisted.

**User clicks EN button:**
1. Click handler calls `applyLanguage('en', true)`.
2. Text swaps to English; `localStorage['squad-lang'] = 'en'`.

**Refresh after manual EN click:**
1. Inline script runs → reads `localStorage['squad-lang']` → `"en"` → sets `html.lang="en"`.
2. Page paints in English. Browser language no longer consulted.

**Browser set to French (unsupported):**
1. Inline script → no `navigator.languages` match → defaults to `'en'` → sets `html.lang="en"`.
2. Page paints in English. User can manually pick any of the three.

## Edge cases

| Case | Behavior |
|---|---|
| `localStorage` blocked (private mode, disabled cookies) | `try/catch` swallows the error; auto-detection runs each visit. Acceptable. |
| Stale/invalid stored value (e.g., user manually set `localStorage` to `"fr"`) | `SUPPORTED.includes()` rejects; falls through to `navigator` detection. |
| `navigator.languages` undefined (older browsers) | Falls back to `navigator.language`, then `'en'`. |
| `navigator.language` returns regional code (e.g., `"ru-RU"`) | `startsWith('ru')` match works correctly. |
| User has multiple preferences (e.g., `["fr-FR", "ru-RU", "en-US"]`) | First supported match wins (`ru` here). Iteration order matches user's stated preference. |
| Inline script throws unexpectedly | `try/catch` swallows; `html.lang` stays at the hardcoded `"en"` default; existing boot path renders English. No worse than today. |

## Testing checklist

- Set browser language to RU, clear `localStorage`, load page → renders Russian, no EN flash.
- Set browser language to AZ, clear `localStorage`, load page → renders Azerbaijani.
- Set browser language to FR, clear `localStorage`, load page → renders English.
- Click EN button while in RU mode → refresh → stays EN.
- Click RU button → refresh → stays RU.
- Clear `localStorage` → refresh → re-detects from current browser language.
- Manually set `localStorage['squad-lang'] = 'fr'` → refresh → falls through to browser detection.
- Disable JavaScript → page renders with `<html lang="en">` (degrades to English, current behavior).

## Risk and rollback

The inline script is a single try/catch block. If it fails for any reason, the page falls back to the existing hardcoded `<html lang="en">` and the existing boot path renders English. Rollback is reverting the commit on `locale-auto-detect`.

## Implementation size

Estimated change: ~15 lines added (inline script), ~3 lines modified (`applyLanguage` signature + body, click handler). All in `index.html`.
