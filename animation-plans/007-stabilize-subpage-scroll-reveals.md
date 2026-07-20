# 007 — Stabilize every shared subpage scroll reveal

- **Status**: COMPLETE
- **Commit**: fd7c107
- **Severity**: HIGH
- **Category**: Scroll-linked motion lifecycle, progressive enhancement, performance
- **Estimated scope**: 4 source files plus 56 generated EnterIT subpages; roughly 180 lines

## Problem

All 56 generated EnterIT subpages render their scroll targets in the final author-CSS state. The observer only creates the WAAPI animation after a target intersects, so the user first sees the final element and then sees it reset to the first keyframe before it animates. A measured heading on `reseni-kniha-jizd.html` was `opacity: 1; transform: none` immediately after scrolling into view, then 8 ms later became `opacity: .28; transform: translateY(18px); clip-path: inset(0 0 18%)`.

```js
// assets/site-ui.js:247-253 — current
var animation = element.animate(frames, {
  duration: duration,
  delay: delay,
  easing: easing,
  fill: "both"
});
animation.finished.then(function () { animation.cancel(); }).catch(function () {});
```

The scroll targets are registered only after the hero has started and have no prepared CSS state:

```js
// assets/site-ui.js:283-302 — current
addCues(".block:not(.rs-hero):not(.jp-hero):not(.f30-hero):not(.tym-hero):not(.legal-hero) .h2", "heading");
addCues(".block:not(.rs-hero):not(.jp-hero):not(.f30-hero):not(.tym-hero):not(.legal-hero) .lead", "item");
addCues(".rs-pains, .rs-donts, .rs-flow, .rs-need, .rs-badges, .rs-stats, .rs-faq, .jp-blocks, .jp-stack, .jp-walk, .f30-stats, .f30-levels, .eng-grid, .cap-grid, .proof-grid, .team-grid", "group");
addCues(".rs-sec-box, .rs-case, .jp-callout, .f30-quote, .stack, .team-group", "panel");
addCues(".cta-card", "contact");

if (!("IntersectionObserver" in window)) return;
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) return;
    var cue = cues.find(function (item) { return item.element === entry.target; });
    if (cue) {
      if (cue.variant === "group") playGroup(cue.element);
      else play(cue.element, cue.variant, 0);
    }
    observer.unobserve(entry.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

cues.forEach(function (cue) { observer.observe(cue.element); });
```

The completion path immediately cancels the filled effect. That hands text and panels from composited `transform`/`clip-path` values back to author CSS in one step and can create a second raster/compositing snap. The current cue list also creates nested motion owners: every non-legal `.cta-card` animates together with its child `.h2`, and `tym.html` animates `.team-group` while its child `.team-grid` independently animates every card. The method pages keep `.jp-walk` in a closed `details`; when opened, its content can become visible before the observer callback resets it.

The generator strips every legacy `reveal` class, so the remaining inline rules do not prepare any generated element:

```js
// scripts/build-subpages.mjs:435-439 — current
html = html.replace(/\s*<span class="n">\d{2}<\/span>/g, "");
html = html.replace(/\sclass="([^"]*)"/g, (_attribute, classNames) => {
  const kept = classNames.split(/\s+/).filter((className) => className && className !== "reveal");
  return kept.length ? ` class="${kept.join(" ")}"` : "";
});
```

## Target

Keep the current WAAPI/IntersectionObserver choreography, but establish each owned element's first keyframe before it can enter the viewport. The observable lifecycle must be:

`prepared first frame → monotonic reveal → stable final author-CSS state`

It must never be:

`visible final state → reset → reveal → compositing snap`

Use one early capability gate on `html.subpage-motion`. Add it only when all three conditions are true: reduced motion is not requested, `IntersectionObserver` exists, and `Element.prototype.animate` exists. The inline bootstrap must run before the shared subpage stylesheets and set a 2000 ms watchdog that removes the class if `site-ui.js` never claims initialization. With JavaScript disabled, reduced motion, missing WAAPI, missing IntersectionObserver, or a runtime exception, normal author CSS stays fully visible.

Shared prepared CSS must match the first frames already used by the runtime:

- navigation and non-title hero children: `opacity: .12; transform: translateY(17px)`;
- hero title: `opacity: .01; transform: translateY(24px); clip-path: inset(0 0 23% 0)`;
- non-CTA section headings: `opacity: .28; transform: translateY(18px); clip-path: inset(0 0 18% 0)`;
- section leads and direct children of staggered groups: `opacity: .32; transform: translateY(16px)`;
- panels that do not own a nested animated grid: `opacity: .42; transform: translateY(10px); clip-path: inset(0 0 0 9%)`;
- whole CTA card: `opacity: .48; transform: translateY(10px); clip-path: inset(0 12% 0 0 round 16px)`.

Every prepared selector must be guarded by `:not([data-motion-state="done"])`. WAAPI owns the pixels while an element is `running`. At successful completion, set the state to `done` while the filled final frame is still active, then cancel on the next animation frame. The underlying author CSS is then already the same final appearance, and existing hover transforms remain available because no inline final transform is retained. Do not add blanket `will-change`, blur filters, scale, animated loading lines, mockups, or dependencies.

## Repo conventions to follow

- The shared motion easing already lives at `assets/site-ui.js:190`: `cubic-bezier(0.23, 1, 0.32, 1)`. Preserve it.
- Shared subpage visual rules belong in `assets/subpage.css`; do not copy motion CSS into 56 HTML files.
- Generated subpage assets and cache keys are controlled by `scripts/build-subpages.mjs:9-11`; the final reviewed runtime and closed-details CSS ship as `assetVersion` and `uiAssetVersion` `20260720-6`, while `shellAssetVersion` remains unchanged. Regenerate with `node scripts/build-subpages.mjs`.
- `scripts/build-subpages.mjs:64-79` is the authoritative 14-page list and `localeOrder` supplies `cs`, `en`, `de`, `pl`. EnterAI, demos, and homepages are outside this generator and remain untouched.
- Existing reduced-motion behavior at the end of `assets/subpage.css` removes interaction transforms. Extend that media query defensively so prepared motion targets are fully visible with `opacity: 1`, `transform: none`, and `clip-path: none`.

## Steps

1. In `scripts/build-subpages.mjs`, make `refreshAssets()` remove any previous `data-subpage-motion-bootstrap` script before reinserting assets so consecutive generator runs are byte-identical. Insert a tiny, self-contained `<script data-subpage-motion-bootstrap>` immediately before the three shared CSS links. It must capability-check reduced motion, IntersectionObserver, and WAAPI; add `subpage-motion`; and expose a namespaced 2000 ms watchdog handle which removes that class if the deferred runtime never initializes. Ship the final reviewed subpage CSS and UI runtime under `20260720-6`.
2. In `assets/subpage.css`, add the prepared-state selectors described in **Target**. Mirror the runtime ownership exactly. Exclude `.h2` and `.lead` descendants of `.cta-card` because the card is their sole motion owner. Exclude `.team-group:has(.team-grid)` from the whole-panel prepared selector because its grid children are the motion owners. Do not hide group containers; prepare only their direct children, matching `playGroup()`.
3. Refactor `assets/site-ui.js:initMotion()` into a fail-open lifecycle. Require both WAAPI and IntersectionObserver before any animation; otherwise remove `subpage-motion` and clear the watchdog. Build the cue list before starting hero motion. Make `play()` ignore `running` and `done`, set `data-motion-state="running"`, start the existing frames/options, and on success set `done` before canceling on the following `requestAnimationFrame`. On animation rejection or synchronous failure, finalize the affected element instead of leaving it prepared. If initialization itself throws, disconnect the observer if created, remove `subpage-motion`, clear the watchdog, and expose all prepared content.
4. Remove nested ownership in the runtime as well as CSS: skip headings/leads whose closest `.cta-card` exists; skip `.team-group` as a panel when it contains `.team-grid`; keep the nested grid's staggered children. Preserve the existing once-only behavior and 46 ms stagger.
5. During initial cue registration, batch-read each cue rectangle. If a visible-size cue is already fully above the viewport (`rect.bottom <= 0`), finalize it without replaying. If it intersects the current viewport/root entry area, play it immediately. If it is below the viewport, observe it. If its rect has zero width and height because it is inside closed `details`, keep it prepared and observed; first open must reveal it smoothly. This covers restored scroll positions, hash/deep entry, and the method-page `.jp-walk` details.
6. Clear the bootstrap watchdog only after cue setup and observer construction succeed. Start the prepared navigation and hero children immediately. Do not remove the root class during normal operation; completed elements opt out through `data-motion-state="done"`.
7. Run `node scripts/build-subpages.mjs` twice. Confirm the second run makes no additional changes and hashes are identical. The output must update all 56 shared EnterIT subpages and no homepage or EnterAI file.

## Boundaries

- Do NOT touch `assets/home.js`, `assets/home.css`, homepage HTML, EnterAI, demos, content, layout, typography, colors, or interaction copy.
- Do NOT reintroduce the legacy `reveal` class or use it as a second motion system.
- Do NOT animate parent and descendant motion owners simultaneously.
- Do NOT add scale, blur filters, looping/ambient motion, loading bars, animated lines, mockups, or global `will-change`.
- Do NOT add a library or replace WAAPI/IntersectionObserver with Scroll Timelines in this repair.
- Do NOT leave content hidden when scripting, capability checks, or runtime initialization fail.
- Preserve every unrelated dirty-worktree change. If the current files drift from the cited lifecycle, stop and report rather than rewriting unrelated code.

## Verification

- **Mechanical**:
  - `node --check assets/site-ui.js`
  - `node --check scripts/build-subpages.mjs`
  - run `node scripts/build-subpages.mjs` twice and compare hashes for all 56 generated pages;
  - `git diff --check`;
  - verify every generated page has exactly one `data-subpage-motion-bootstrap`, one `site-ui.js?v=20260720-6`, and one `subpage.css?v=20260720-6`;
  - verify no homepage/EnterAI asset reference changes are introduced by this plan.
- **Frame-level browser check** at 1440×900 and 390×844:
  - On `reseni-kniha-jizd.html`, sample the first below-fold `.h2` before intersection, synchronously after scrolling, at the first observer frame, throughout the reveal, at the final frame, and two frames after `getAnimations()` becomes empty. Opacity must never fall from `1` to `.28`; transform and clipping must never jump backward at intersection; final and post-cancel appearance must match.
  - Repeat one heading, group child, panel, and CTA on a long solution page; verify no target receives two simultaneous entrance animations.
  - On `tym.html`, verify `.team-group` and its `.team-grid` are not both motion owners and card hover does not jump at completion.
  - On both method pages, open the closed procedure `details` before and after scrolling to it; `.jp-walk` children must begin in their prepared state and reveal once, without visible-reset-visible.
  - Reload mid-page, navigate away/back through BFCache, and jump quickly across multiple sections; already-passed cues must be final and no cue may remain stranded hidden.
- **Fallback/accessibility**:
  - emulate `prefers-reduced-motion: reduce`: all content is immediately visible and has no entrance transform/clip;
  - disable JavaScript, stub IntersectionObserver as unavailable, and stub `Element.prototype.animate` as unavailable in separate runs: all content remains visible;
  - block `/assets/site-ui.js`: after the 2000 ms watchdog, all content is visible;
  - confirm language menus, the mobile drawer, focus/inert behavior, and `firma-2030` interactive controls still work.
- **Feel check**: at 10% animation playback, a target must already be sitting at its first frame before it enters the viewport, travel only toward the final state, and remain visually unchanged when the WAAPI effect is released. There must be no compounded CTA fade or team parent/child transform.
- **Done when**: every shared EnterIT subpage has a single deterministic motion owner per element, no final→reset→animate sequence, no completion snap, and a fail-open visible state for reduced motion and unsupported/failed scripting.

## Completion evidence

- Added the capability-gated `subpage-motion` bootstrap and 2000 ms fail-open watchdog to all 56 generated EnterIT subpages; each page has exactly one bootstrap, one `site-ui.js?v=20260720-6`, and one `subpage.css?v=20260720-6` reference.
- Matched the shared CSS preparation to the WAAPI first frames and removed CTA heading/lead plus nested team-grid ownership conflicts.
- Reworked the runtime around `running` → `done` ownership, next-frame effect release, closed-`details` observation, deep/restored-scroll classification, and scroll-frame reconciliation for sections skipped by a fast jump.
- `node --check` passed for both JavaScript sources, `git diff --check` passed, and two consecutive generator runs produced identical SHA-256 hashes for all 56 pages.
- Playwright checks passed at 1440×900 and 390×844: heading opacity/transform remained monotonic from the prepared frame through post-cancel, group/panel/CTA/team targets had at most one owner, closed procedure details revealed once, and a direct jump past 29 targets left zero prepared targets stranded above the viewport.
- Both method pages in all four locales now explicitly hide the direct-child `.jp-walk` while their procedure `details` is closed. Closed content measured `display: none` with a zero rectangle; opening restored `display: flex` at the prepared first frame, revealed monotonically, reclosed cleanly, and reopened in its stable final state without replay.
- Dormant unresolved cues inside closed procedure details no longer keep the passive scroll reconciliation listener active. Instrumented post-settlement scrolls produced zero runtime `getBoundingClientRect()` reads while the details remained closed, and the existing IntersectionObserver resolved the cue once the visible summary was opened.
- Reduced motion, disabled JavaScript, unavailable IntersectionObserver, unavailable WAAPI, blocked runtime/watchdog, deep reload, BFCache, language/mobile navigation, and representative interactive controls were verified fail-open by the execution and independent review runs.
