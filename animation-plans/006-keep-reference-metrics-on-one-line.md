# 006 — Keep reference metrics on one line

- **Status**: COMPLETE
- **Commit**: fd7c107
- **Severity**: HIGH
- **Category**: Typography, responsive cohesion
- **Estimated scope**: 2 source files plus 4 generated homepages

## Problem

The fifth reference metric (`−180 h/měs`, localized as `−180 h/mo`, `−180 h/Mon.`, `−180 h/mies.`) wraps onto two lines in the three-column results grid. The current `.case-card strong` uses `font-size: clamp(40px, 5vw, 66px)` plus `overflow-wrap:anywhere`. At the desktop shell width each metric column has about `350px`; the longest Polish/German variants need a maximum near `59px` to fit. Around the 921–1024px three-column breakpoint they need roughly `39–45px`.

## Target

All six primary metrics in the references/results grid remain on exactly one line in CS/EN/DE/PL at every viewport width. Keep them visually dominant and consistent as a set; do not single out a locale or hard-code the fifth card.

## Steps

1. In `assets/home.css`, update `.case-card strong`:

```css
.case-card strong {
  /* existing display/margins/colors/weight/line-height/letter-spacing stay */
  font-size: clamp(39px, 4.3vw, 59px);
  overflow-wrap: normal;
  white-space: nowrap;
  word-break: normal;
}
```

2. Inside the existing `@media (max-width: 920px)` case-card block, set `.case-card strong { font-size: 40px; }`. The grid is one column there, so retain the current mobile/tablet visual size while keeping nowrap.
3. Do not truncate, ellipsize, scale, abbreviate, rewrite, or clip metric text. Do not alter card widths/padding or reference copy.
4. Bump homepage asset refs from `20260720-12` to `20260720-13` in `scripts/build-homepages.mjs` and regenerate only `index.html`, `en.html`, `de.html`, `pl.html` twice deterministically.
5. Preserve Plan 005 counter inheritance exactly; the visible and accessible counter layers must use the new parent size and stay on one line throughout counting.

## Verification

- Syntax check, generator twice, `git diff --check`.
- Playwright at widths `390, 768, 920, 921, 1024, 1280, 1440, 1920` for CS/EN/DE/PL: every `.case-card > strong` has a single rendered line; `scrollWidth <= clientWidth` or the layer's rect remains within the parent rect.
- Confirm no horizontal page overflow and no broken assets.
- Confirm metric sizes are 40px at `<=920px`, responsive through the three-column range, and cap at 59px.

## Done when

No reference metric wraps at any supported locale/viewport and the result grid remains balanced.
