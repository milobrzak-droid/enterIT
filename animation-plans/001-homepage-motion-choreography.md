# 001 — Replace generic homepage reveals with purposeful choreography

- **Status**: COMPLETE
- **Commit**: fd7c107
- **Severity**: HIGH
- **Category**: Purpose & frequency, easing & duration, performance & accessibility
- **Estimated scope**: 3 source files plus 4 generated homepage files, roughly 250–400 lines

## Problem

The homepage technically animates, but almost every section receives the same low-amplitude fade-rise. The fixed navigation also remains unsettled for 870 ms, whole grids launch offscreen child animations at once, interactive integration/calculator state changes teleport, and reduced-motion is sampled only at startup. This makes the page feel simultaneously static and mechanically generic.

```js
// assets/home.js:94 — current
function initMotion() {
  if (reducedMotion || !("animate" in Element.prototype)) return;

  var easing = "cubic-bezier(0.23, 1, 0.32, 1)";

  function play(element, variant, index) {
    if (!element || element.dataset.motionDone === "true") return;
    element.dataset.motionDone = "true";
    var delay = Math.min(index || 0, 6) * 48;
    var duration = 620;
    var frames = [
      { opacity: 0.42, transform: "translateY(16px)" },
      { opacity: 1, transform: "translateY(0)" }
    ];
```

```js
// assets/home.js:153 — current
function playGroup(element) {
  Array.prototype.forEach.call(element.children, function (child, index) {
    play(child, "item", index);
  });
}
```

```js
// assets/home.js:243 — current
function filterSystems() {
  var query = normalize(input.value.trim());
  var visible = 0;

  groups.forEach(function (group) {
    var groupVisible = 0;
    var chips = Array.prototype.slice.call(group.querySelectorAll(".system-list span"));

    chips.forEach(function (chip) {
      var matches = matchesQuery(normalize(chip.textContent), query);
      chip.hidden = !matches;
      if (matches) groupVisible += 1;
    });
```

```js
// assets/home.js:318 — current
if (money) money.textContent = currencyFormat.format(savedHours * hourlyRate);
if (hours) hours.textContent = numberFormat.format(savedHours) + " h";
if (fte) fte.textContent = decimalFormat.format(savedHours / fteHours) + "×";
```

```css
/* assets/home.css:1891 — current */
@media (hover: hover) and (pointer: fine) {
  .text-link:hover::after { transform: translateX(4px); }
  .solution-card:hover { transform: translateY(-3px); }
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
}
```

## Target

Create one premium but restrained homepage motion system. Motion must explain hierarchy, direction, or state; it must not add a loader, glow, mockup, floating decoration, infinite idle loop, or blanket generic fade. Content must remain visible when JavaScript fails.

Use these exact timing values:

```css
/* assets/home.css — target tokens */
:root {
  --motion-content: 520ms;
  --motion-hero: 760ms;
  --motion-stagger: 68ms;
}
```

- Read `--ease-out`, `--motion-fast`, `--motion-ui`, `--motion-section`, `--motion-content`, `--motion-hero`, and `--motion-stagger` from computed CSS in `home.js`, with current repository values as fallbacks. Do not repeat the easing literal throughout the file.
- Navigation: animate `.brand`, `.desktop-nav`, and `.nav-actions` from `opacity: .55; transform: translateY(-6px)` to settled over `220ms`, with WAAPI delays `0/35/70ms`. In the double-rAF transition fallback use `0/20/40ms` so its additional frame setup still keeps the last control within 300 ms. Do not run the old 680 ms `hero-body` preset on `.nav-shell`.
- Hero: animate `h1` from `opacity: .001; transform: translateY(34px) scale(.985)` to settled over `760ms`; hero lead from `translateY(18px)` over `520ms` at `120ms`; actions from `translateX(18px)` over `520ms` at `200ms`; each `.proof-item` from `translateY(16px)` over `520ms` at `260ms + index × 68ms`. Keep the existing `<em>` color static; animate only transform and opacity. No underline, glow, blur, clipping, or color animation.
- Partner bar: reveal its label and each logo independently with `translateX(-14px/+14px)` and opacity over `420ms`, staggered by `68ms`.
- Section heads: animate the natural two-column hierarchy, not the whole container: kicker/title from `translateY(28px) scale(.99)` over `640ms`, intro from `translateX(24px)` over `520ms` at `90ms`. Observe each section head separately.
- Services: observe each `.service-card`. Choreograph `h3` from `translateX(-24px)`, description from `translateY(14px)`, list items from `translateX(14px)` with `42ms` internal stagger, and link from `translateX(-10px)`. Durations `420–520ms`, maximum final delay `260ms`.
- Solutions: observe every `.solution-card` individually so offscreen cards remain eligible. The card itself may animate opacity only for `360ms`; animate `.solution-card__top`, `h3`, direct paragraph, flow, and proof with `translateY(14px)` or `translateX(14px)` over `420–520ms`, `42ms` stagger. Reveal `.solution-card__link` with opacity only so its hover transform remains immediately responsive. Never animate card `transform` through WAAPI because CSS owns hover transform.
- Results: observe each `.case-card`. Animate context first, the headline metric from `opacity: .001; transform: translateY(14px) scale(.92)` over `640ms`, then body and technology tags with `42ms` stagger. This should make the proof feel earned without count-up gimmicks.
- Implementation and process: observe each `.implementation-step`, `.implementation-outcome`, and `.process-step` individually. Use meaningful left-to-right order on desktop (`index × 68ms`) but cap delay at `204ms`; on mobile each item still waits for its own intersection. Indices enter from `translateX(-12px)`, headings/bodies from `translateY(14px)`. Animate panel labels/note as their own elements, not the full panel surface.
- Integrations: animate `.integration-copy` children and then observe each `.system-group`; stagger visible chips by `32ms` capped at `160ms`. In filtering, capture current visible chip rectangles before toggling `hidden`, then FLIP only still-visible/newly-visible chips using transform/opacity for `220ms` and the shared ease-out. Cancel any previous per-chip filter animation before retargeting. Animate the live count over `140ms`; rapid updates must retarget from its current computed opacity rather than restarting at a fixed value. Do not animate width, height, top, left, or other layout properties.
- Operations/resources: observe each card separately and choreograph its tag, heading, body, and meta/links with a `42ms` internal stagger. Do not animate noninteractive cards on hover as if they were clickable.
- Team: animate copy children, each stat, and every portrait only when each is visible. Reveal the team CTA button with opacity only so hover/press transforms always remain responsive. Portrait entrance may use alternating `rotate(-1.5deg/1.5deg) translateY(20px)` to settled over `640ms`. Fine-pointer hover may scale only the image to `1.035` and move the caption up `3px`; it must not imply the figure is clickable.
- Calculator: animate fields individually on entry. Reveal its CTA button with opacity only so hover/press transforms always remain responsive. Keep live input synchronous; debounce result feedback by `80ms`, then animate money/hours/FTE from `opacity: .55; transform: translateY(6px)` to settled over `180ms`. Cancel/restart from the current state so rapid slider input never queues animations. Add range-thumb press scale `1.1` with `140ms` ease-out.
- Contact: animate the card surface from `opacity: .35; transform: translateY(30px) scale(.985)` to settled over `700ms`, then its heading, paragraph, and action group over `520–640ms` with `80ms` staging. No `clip-path` and no decorative effects.
- Fine-pointer interactions: strengthen existing solution-card/link/button feedback through transform-only transitions. Buttons hover at `translateY(-2px)`, arrows move `5px`, and `:active` must win with `scale(.97)` even while hovered. Solution cards hover at `translateY(-5px)` and their two arrow elements move/rotate slightly. Keep every feedback duration at `140–220ms`.
- All scroll reveals are once-only and individually observed with threshold around `0.16` and bottom root margin around `-7%`. Never start a whole grid's offscreen children.
- Store active WAAPI animations and cancel them immediately if `prefers-reduced-motion` changes to reduce. Future reveals must also skip motion. If the preference returns to no-preference, unrevealed elements may animate when they later intersect.
- When `Element.prototype.animate` is unavailable, run the same two-frame transform/opacity choreography through a cancelable CSS-transition controller. It must preserve owner keys, active-animation tracking, easing/duration/delay, and restore original inline styles after completion or cancellation. Use double `requestAnimationFrame` to guarantee the initial frame paints; account for those frames in the navigation delay as specified above.
- Under `prefers-reduced-motion: reduce`, keep content/state updates instant, disable scroll smoothing and all homepage transform transitions/hover motion. The skip link may jump into place but must not transition. Opacity/color feedback may remain at 120 ms or less.

## Repo conventions to follow

- Existing shared tokens are in `assets/site-shell.css:41-47`: `--ease-out`, `--motion-fast`, `--motion-ui`, and `--motion-section`.
- Existing progressive enhancement keeps content visible in CSS and starts WAAPI from JavaScript; preserve that convention.
- Use ES5-compatible syntax already used by `assets/home.js` (`var`, function expressions, `Array.prototype` helpers). Do not introduce a framework or dependency.
- Generated locale homepages come from `scripts/build-homepages.mjs`; never hand-edit `index.html`, `en.html`, `de.html`, or `pl.html` before regeneration.

## Steps

1. In `assets/home.css`, add the three homepage timing tokens, replace raw homepage transition times with repository tokens where touched, add the fine-pointer micro-interactions specified above, and expand the reduced-motion override. Keep all visual colors, typography, spacing, layout, copy, and assets unchanged.
2. In `assets/home.js`, replace `initMotion()` and `playGroup()` with an individually-observed choreography registry and active-animation lifecycle. Implement every component-specific sequence in Target using transform/opacity and no large-surface clip-path. Include the cancelable CSS-transition fallback for browsers without WAAPI.
3. In `assets/home.js`, enhance `filterSystems()` with interruptible FLIP transitions and enhance calculator results with debounced, cancelable feedback. Both features must keep their current synchronous semantic state and ARIA updates.
4. In `scripts/build-homepages.mjs`, bump homepage asset query versions from `20260720-5` to `20260720-6` for `site-shell.css`, `home.css`, and `home.js`; do not change generated content.
5. Run the homepage generator so `index.html`, `en.html`, `de.html`, and `pl.html` all receive the same v6 assets.

## Boundaries

- Do NOT touch EnterAI files, EnterAI routes, or any EnterAI asset.
- Do NOT redesign text, layout, fonts, colors, images, partner logos, favicon, footer, or page structure.
- Do NOT add a loader, glow, gradient aura, mockup, particle field, marquee, cursor follower, infinite animation, or new decorative element.
- Do NOT touch `assets/site-shell.css`; homepage-only overrides belong in `assets/home.css`.
- Do NOT add dependencies.
- Do NOT hand-edit generated locale HTML; regenerate it.
- Do NOT commit or push.
- If a step doesn't match the code at commit `fd7c107`, stop and report instead of improvising.

## Verification

- **Mechanical**:
  - `/Users/matusfojtik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check assets/home.js` exits 0.
  - `/Users/matusfojtik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-homepages.mjs` regenerates exactly `index.html`, `en.html`, `de.html`, and `pl.html` without errors.
  - Running the generator a second time produces no further diff.
  - `git diff --check` exits 0.
  - `rg -n "20260720-6" index.html en.html de.html pl.html` finds the three homepage asset refs in every locale.
- **Feel check**: run `http://127.0.0.1:8000/`, reload at the top, then scroll steadily through every homepage section and confirm:
  - Navigation is usable and settled within 300 ms; hero hierarchy continues after it.
  - Repeat the hero check with `Element.prototype.animate` unavailable and confirm the transition fallback still runs and the last navigation control settles within 300 ms.
  - Cards animate only when their own row reaches the viewport; later solution cards do not finish offscreen.
  - Services, solution cards, proof metrics, implementation/process, team, calculator, and contact each have recognizably different but cohesive motion.
  - Hovering a solution card during entrance still moves the card immediately because WAAPI never owns its transform.
  - Typing rapidly in integration search preserves visual continuity and never queues stale transforms.
  - Dragging sliders updates values immediately and produces one short settle after input pauses.
  - In DevTools at 10% playback speed, no element snaps at the end, overshoots, bounces, or scales from an unrelated origin.
  - Toggle `prefers-reduced-motion: reduce`; all spatial motion stops, content remains visible, search/calculator remain functional, and switching the preference mid-animation cancels active movement.
- **Done when**: the four localized homepages share one noticeably richer motion system, remain layout-identical, show no console errors or horizontal overflow, and satisfy every reduced-motion check above.
