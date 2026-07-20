# 005 — Preserve counter typography exactly

- **Status**: COMPLETE
- **Commit**: fd7c107
- **Severity**: HIGH
- **Category**: Cohesion, typography
- **Estimated scope**: 2 source files plus 4 generated homepages

## Problem

The persistent count-up wrapper inserts nested `<span>` elements inside metric `<strong>` elements. Existing label selectors such as `.proof-item span`, `.implementation-outcome span`, `.integration-proof span`, and `.team-stat span` then match the counter layers and override the metric typography.

Measured on desktop CS:

- `.proof-item strong`: parent `43px/900/43px`, counter layer `14px/900/18.9px` plus muted color and `8px` margin.
- `.implementation-outcome > strong`: parent `42px`, counter layer `13px`.
- `.integration-proof > strong`: parent `36px`, counter layer `13px`.
- `.team-stat > strong`: parent `29px`, counter layer `12px` plus `7px` margin.

The case metrics and solution proofs currently happen to match, but the fix must protect every count target from descendant label rules.

## Target

Every `.count-stack`, `.count-source`, and `.count-visual` must inherit the exact font family, size, style, weight, line-height, letter-spacing, color, and numeric variant from its `[data-count-up]` parent. Counter layers must add no margin or padding. The existing inline-grid width reservation, accessible source, aria-hidden visual, stable completion layer and count animation remain unchanged.

## Steps

1. In `assets/home.css`, strengthen the count-layer selectors so they outrank contextual descendant selectors regardless of source order:

```css
[data-count-up] > .count-stack,
[data-count-up] > .count-stack > .count-source,
[data-count-up] > .count-stack > .count-visual {
  margin: 0;
  padding: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-style: inherit;
  font-weight: inherit;
  font-variant-numeric: inherit;
  letter-spacing: inherit;
  line-height: inherit;
}
```

2. Preserve `[data-count-up] > .count-stack { display:inline-grid; max-inline-size:100%; }` and the two grid layers on the same cell. Explicitly keep `.count-source { opacity:0; }`, and `.count-visual { user-select:none; }`. Do not restore the old end-of-animation DOM swap.
3. Bump homepage asset refs in `scripts/build-homepages.mjs` from `20260720-11` to `20260720-12` and regenerate only `index.html`, `en.html`, `de.html`, `pl.html` twice deterministically.
4. Do not change the intended parent metric sizes or any label typography. Do not alter motion amplitudes, content, layout, actual calculator sliders, EnterAI or subpages.

## Verification

- `node --check assets/home.js`, generator twice, `git diff --check`.
- At 1440px and 390px, compare computed typography of each parent and both layers for: `.proof-item strong`, `.solution-card__proof`, `.case-card > strong`, `.implementation-outcome > strong`, `.integration-proof > strong`, `.team-stat > strong`. Font size, weight, line-height, letter-spacing and color must match exactly; nested layer margin must be `0px`.
- Sample start, middle and final counter frames; size and width remain unchanged while only digits change.
- All four locales load v12, have no overflow or broken assets.

## Done when

Hero, team, implementation, integration, solution and reference metrics render at their original designed size throughout the entire count animation with no final snap.
