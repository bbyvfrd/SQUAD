# Locale auto-detection and persistence — implementation plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `index.html` auto-detect supported locales (`en|ru|az`) from `navigator.languages` on first visit, and persist the visitor's chosen locale across refreshes via `localStorage`.

**Architecture:** Three sequential edits to one file (`index.html`). An inline early-detect script in `<head>` sets `html.lang` before paint (no English flash). The existing `applyLanguage()` gains a `shouldPersist` flag matching the theme pattern. Only manual user clicks persist; auto-detected values are not stored, so a later browser-language change still takes effect on next visit until the user manually picks.

**Tech Stack:** Vanilla HTML/JS — no build step, no test framework. Verification is manual in a real browser.

**Spec:** `docs/superpowers/specs/2026-05-10-locale-detection-design.md`

**Branch:** `locale-auto-detect` (already checked out)

**Sequencing:** Tasks 1 → 2 → 3 → 4 must run **sequentially**. They all edit the same file, and each subsequent task assumes the prior one is committed. Use unique string anchors (shown in each task) rather than line numbers — line numbers shift after Task 1 inserts new content.

---

## Task 1: Add inline early-detect script to `<head>`

**Files:**
- Modify: `index.html` (insert after the existing theme inline script, identified by the unique anchor `localStorage.getItem('squad-theme')`)

- [ ] **Step 1: Locate the existing theme inline script**

Run: `grep -n "localStorage.getItem('squad-theme')" index.html`

Expected output:
```
11:      if (localStorage.getItem('squad-theme') === 'dark') {
```

Confirm the surrounding `<script>` block runs from `<script>` (one line above) through `</script>` (three lines below the matched line).

- [ ] **Step 2: Insert the locale-detect script immediately after the theme script's closing `</script>`**

The current block ends with:
```html
  } catch (_) {}
</script>
<link rel="icon" type="image/png" href="assets/squad_logomark.png">
```

Use the Edit tool to replace this exact `old_string`:

```
  } catch (_) {}
</script>
<link rel="icon" type="image/png" href="assets/squad_logomark.png">
```

with this exact `new_string`:

```
  } catch (_) {}
</script>
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
<link rel="icon" type="image/png" href="assets/squad_logomark.png">
```

Note the use of `var` and `indexOf`/`for` loops rather than `let`/`const`/`Array.prototype.find`. The script runs in `<head>` before the page paints, so it should be maximally tolerant of older browsers — matching the defensive style of the existing theme script.

- [ ] **Step 3: Verify the edit took**

Run: `grep -c "squad-lang" index.html`
Expected: `1` (the new script's `localStorage.getItem('squad-lang')` is the only occurrence so far).

Run: `grep -n "var SUPPORTED = \['en','ru','az'\]" index.html`
Expected: a single match inside the new `<script>` block.

- [ ] **Step 4: Quick syntax sanity check**

Run: `node --check <(sed -n '/<script>/,/<\/script>/{/<script>/d;/<\/script>/d;p}' index.html | head -25)` — only if `node` is available; otherwise skip. (This is a soft check; real verification is in Task 4.)

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(locale): add inline early-detect script for html[lang]"
```

---

## Task 2: Add `shouldPersist` flag to `applyLanguage()`

**Files:**
- Modify: `index.html` — the `applyLanguage` function definition. Anchor: the line `function applyLanguage(lang) {` (unique in the file).

- [ ] **Step 1: Confirm the anchor is unique**

Run: `grep -n "function applyLanguage(lang)" index.html`
Expected: exactly one match.

- [ ] **Step 2: Read the current function body to confirm what we're replacing**

Run: `grep -n -A 30 "function applyLanguage(lang) {" index.html | head -35`

Expected: a function body that ends with `buildTicker();` followed by a closing `}`. Confirm the closing brace is reached around 27 lines after the opening line. (No edit yet — this is to prevent surprises.)

- [ ] **Step 3: Modify the function signature and add the persistence write**

Use the Edit tool. Replace this exact `old_string`:

```
  function applyLanguage(lang) {
    if (!STRINGS[lang]) return;
    currentLang = lang;
    const dict = STRINGS[lang];
    html.setAttribute('lang', lang);
```

with this exact `new_string`:

```
  function applyLanguage(lang, shouldPersist = false) {
    if (!STRINGS[lang]) return;
    currentLang = lang;
    const dict = STRINGS[lang];
    html.setAttribute('lang', lang);
    if (shouldPersist) {
      try { localStorage.setItem('squad-lang', lang); } catch (_) {}
    }
```

This adds the parameter and writes to `localStorage` only when explicitly asked. The boot path call (which uses the default `false`) will not persist — that is intentional per the spec (auto-detected values must not be cached, so browser-language changes take effect next visit).

- [ ] **Step 4: Verify the edit**

Run: `grep -n "function applyLanguage(lang, shouldPersist" index.html`
Expected: exactly one match.

Run: `grep -n "localStorage.setItem('squad-lang'" index.html`
Expected: exactly one match (inside the function body).

Run: `grep -c "applyLanguage(" index.html`
Expected: `3` — definition + click handler + boot call. Unchanged.

- [ ] **Step 5: Commit**

```bash
git add index.html
git commit -m "feat(locale): persist chosen language via shouldPersist flag"
```

---

## Task 3: Pass `shouldPersist=true` from the language-button click handler

**Files:**
- Modify: `index.html` — the click handler call site. Anchor: the line `applyLanguage(b.getAttribute('data-lang'));` (unique — the boot call uses `STRINGS[initialLang]` instead).

- [ ] **Step 1: Confirm the anchor is unique**

Run: `grep -n "applyLanguage(b.getAttribute('data-lang'))" index.html`
Expected: exactly one match.

- [ ] **Step 2: Update the call site**

Use the Edit tool. Replace this exact `old_string`:

```
      applyLanguage(b.getAttribute('data-lang'));
```

with this exact `new_string`:

```
      applyLanguage(b.getAttribute('data-lang'), true);
```

- [ ] **Step 3: Verify the edit**

Run: `grep -n "applyLanguage(b.getAttribute('data-lang'), true)" index.html`
Expected: exactly one match.

Run: `grep -n "applyLanguage(" index.html`
Expected: three lines — the definition (now with `shouldPersist`), the click handler (now with `, true`), and the boot call (unchanged). Confirm the boot call still reads `applyLanguage(STRINGS[initialLang] ? initialLang : 'en');` with no second argument.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat(locale): persist language on user click"
```

---

## Task 4: Manual browser verification

**Files:** None modified. This task only verifies behavior.

This project has no automated test framework. Verification is manual in a real browser. Do **all** of the following before declaring done. The reviewer must see screenshots or a clear pass/fail report for each row.

- [ ] **Step 1: Serve the page locally**

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000` in a browser. Use the browser's DevTools to control the language preferences and `localStorage`.

- [ ] **Step 2: Run the verification matrix**

For each row: configure the precondition, hard-refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`), observe the result.

| # | Precondition | Expected on load |
|---|---|---|
| 1 | `localStorage` cleared. Browser language list = `["ru-RU","en-US"]`. | Page renders in Russian. No English flash. `<html lang="ru">` in DevTools. |
| 2 | `localStorage` cleared. Browser language list = `["az-AZ"]`. | Page renders in Azerbaijani. `<html lang="az">`. |
| 3 | `localStorage` cleared. Browser language list = `["fr-FR"]` (unsupported). | Page renders in English. `<html lang="en">`. |
| 4 | `localStorage` cleared. Browser language list = `["fr-FR","ru-RU","en-US"]`. | Page renders in Russian (first supported preference wins). |
| 5 | After row 1, click the EN button in the language menu. | Page swaps to English. `localStorage['squad-lang']` is now `"en"`. |
| 6 | Refresh the page after row 5. Browser language still RU. | Page renders in English. Manual choice overrides browser preference. |
| 7 | Click the RU button. Refresh. | Page renders in Russian. `localStorage['squad-lang']` is `"ru"`. |
| 8 | Manually set `localStorage['squad-lang'] = 'fr'` in DevTools. Refresh. | Falls through to browser detection (whatever browser language is). Stale value ignored. |
| 9 | Open the page with JavaScript disabled. | Page renders with `<html lang="en">` (the markup default). No errors visible. |
| 10 | Open the page in a private/incognito window with `localStorage` blocked. | Page still renders in browser-detected language. No console errors. |

- [ ] **Step 3: Visual smoke check**

Confirm the rendered text is correct in each language for at least one obvious element:
- English: hero says "FIND YOUR GAME."
- Russian: hero text rendered in Cyrillic.
- Azerbaijani: hero text rendered in Latin script with Azerbaijani-specific characters where applicable.

If any row fails, stop and report. If row 1's "no English flash" fails, the inline script in Task 1 is loading too late or the boot path is being hit before the early script — debug before merging.

- [ ] **Step 4: Report pass/fail**

Report verification results inline (no commit). If all pass, the implementation is complete and ready for review/merge.

---

## Plan self-review (already done by author)

- **Spec coverage:** Detection priority (Task 1), persistence (Task 2 + 3), no-flash (Task 1 inline script in `<head>`), edge cases (Task 4 rows 8–10), verification (Task 4 matrix). All spec sections covered.
- **Placeholder scan:** No TBDs/TODOs. All code shown verbatim.
- **Type/identifier consistency:** `shouldPersist` parameter name used consistently in Tasks 2 and 3. `localStorage` key `'squad-lang'` consistent across Tasks 1 and 2. `SUPPORTED = ['en','ru','az']` matches `STRINGS` keys in `index.html`.
- **Sequencing risk:** All three edits hit the same file. They MUST run sequentially. Anchors are unique strings, not line numbers — robust against shifts.
