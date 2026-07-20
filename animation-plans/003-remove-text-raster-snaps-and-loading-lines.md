# 003 — Remove text raster snaps and loading-line motion

- **Status**: COMPLETE
- **Severity**: HIGH
- **Category**: Cohesion, typography, performance
- **Estimated scope**: 2 source files

## Problem

The new homepage motion visibly scales containers that contain text. During scroll this changes glyph rasterization and makes headings/cards look smaller or softer until the animation settles. Static metric count-ups also replace their layered visual with a new plain text node at completion, creating a final-frame typography snap. The animated top-rule overlays read as generic loading/progress bars.

## Target

Keep the unmistakable scroll movement, fades, count-ups and browser fallback while making text geometry stable from the first frame to the last. Remove the animated line-drawing grammar everywhere; the existing borders remain static.

## Steps

1. In `assets/home.css`, remove scale from every scroll/load transform on a text-bearing homepage container:
   - `.section-title`, card groups, `.portrait`, `.contact-card` in both View Timeline keyframes and fallback starting states.
   - The hero `h1` start transform is updated in `assets/home.js` from `translateY(...) scale(...)` to translation only.
   - Preserve scale only for explicit press/hover feedback on controls/images; do not change calculator thumb feedback or portrait image hover.
2. Keep scroll entrances using opacity plus `translateX`/`translateY`. Do not shrink text at any animation frame.
3. In the count-up engine, do not replace the completed `.count-stack` with a new text node during normal completion. Set `.count-visual` to the exact source string and mark the item complete while retaining the same DOM/font layer. The hidden `.count-source` remains the accessible exact value and width reservation. `stopCountUps()` must still restore plain exact text when reduced motion is switched on.
4. Add `font-variant-numeric: tabular-nums` to `[data-count-up]` so the prepared, animated and final states use identical numeral metrics.
5. Remove all structural line animation code:
   - delete the overlay pseudo-element rules used only for `.proof-strip`, grids, flows and stats;
   - delete `home-view-line`, named view timelines for those overlays, fallback line classes/transitions and their JavaScript selectors/toggles;
   - preserve the original static borders and layout.
6. Do not alter copy, layout, colors, assets, interaction logic, languages, EnterAI or subpages. Do not add loaders, progress bars, animated dividers or mockups.

## Verification

- `node --check assets/home.js`
- `git diff --check`
- Scroll CS desktop and mobile: text size remains constant while opacity/translation changes.
- Count-ups finish without replacing `.count-stack` and without visible final-frame snap; exact strings remain available to accessibility APIs.
- No `home-view-line`, `home-motion-line`, `home-line-in-view`, animated `::before` rule overlay or `scaleX` loading-line motion remains.
- View Timeline still reverses on upward scroll; fallback still replays; reduced motion shows final static content.
- Calculator and integration search remain synchronous and functional.

## Done when

Homepage motion is clearly visible but never rescales text, completed counters do not switch typography layers, and no animated line resembles a loader or slider.
