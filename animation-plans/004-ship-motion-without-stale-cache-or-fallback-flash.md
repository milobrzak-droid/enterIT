# 004 — Ship motion without stale cache or fallback flash

- **Status**: COMPLETE
- **Severity**: HIGH
- **Category**: Delivery, progressive enhancement, performance

## Problem

Plan 003 changed the homepage CSS/JS without changing the asset query version, so a warm browser may keep the pre-fix scale/count code. The unsupported-browser fallback adds the hidden target class before IntersectionObserver reports initially visible targets, which can flash visible content to hidden and back on deep links or restored scroll positions. Blanket offscreen `will-change` also retains unnecessary layers.

## Steps

1. Bump the three homepage asset references in `scripts/build-homepages.mjs` from `20260720-10` to `20260720-11`, regenerate only `index.html`, `en.html`, `de.html`, `pl.html`, and verify deterministic output.
2. In the fallback path of `assets/home.js`, collect all targets, batch-read their initial rects, and add `.home-motion-target` together with `.home-fallback-in-view` for targets already intersecting the viewport before observation begins. Do not interleave layout reads and class writes.
3. Remove persistent `will-change` from `.home-focus-pending` and fallback targets. Do not replace it with blanket promotion.
4. Move `.solution-card:hover` and `.contact-card .button--light:hover` visual rules inside the existing fine-pointer hover media query. Preserve keyboard focus styles.
5. Preserve Plan 003: no scale on text-bearing entrances, no counter layer swap, no animated line/loading overlays.

## Verification

- Syntax check, generator twice with identical hashes, `git diff --check`.
- Exactly three `20260720-11` references per locale and no `20260720-10` homepage asset references.
- Forced fallback: initially visible content never enters a hidden state; offscreen content still replays on enter/exit.
- Supported mode: scale remains exactly 1 throughout text motion; counters keep stable width and final stack.
- Reduced motion and mobile interaction remain correct.

## Done when

Fresh motion assets are guaranteed to load and neither fallback initialization nor layer promotion can cause a visible typography flash/jump.
