# 002 — Make homepage scroll motion unmistakable

- **Status**: COMPLETE
- **Commit**: fd7c107
- **Severity**: HIGH
- **Category**: Purpose & frequency, performance, cohesion, missed opportunities
- **Estimated scope**: 3 source files plus 4 generated homepage files, roughly 300–450 lines

## Problem

The current homepage reveal system is technically active but feels static in use. It runs only once, resolves most of its movement in the first 100–220 ms because of the aggressive easing, moves most elements only 4–10 px, and does not animate numbers or structural lines.

```js
// assets/home.js — current once-only behavior
cue.done = true;
cue.element.classList.remove("home-motion-pending");
if (!reducedMotion) cue.choreography();
observer.unobserve(entry.target);
```

```js
// assets/home.js — current near-invisible amplitudes
revealSoft(sectionHead.querySelector(".section-title"), "translateY(8px)", 6, motion.focus, 10, 0.08);
revealTransform(card, "translateY(10px) scale(.998)", 460, 0, 0.24);
```

The user explicitly wants clear movement while scrolling: count-ups, slides, fades, and visibly animated section structure. The result must remain professional, preserve the existing layout/copy, and avoid continuous JavaScript scroll work.

## Target

Implement a hybrid motion system:

1. Chromium/Safari and any browser that passes both checks below use compositor-friendly CSS View Timelines so scroll motion visibly tracks viewport progress and naturally replays when scrolling back:

```js
CSS.supports("animation-timeline: view()") &&
CSS.supports("animation-range: entry 0% cover 35%")
```

2. Other browsers keep an IntersectionObserver fallback, but it toggles an in-view class instead of permanently setting `done` and unobserving. CSS transitions must retarget cleanly when direction changes. Never use `scroll`, `scrollY`, `scrollTop`, or a continuous rAF loop for element position.

3. Add explicit, accessible count-ups for real static metrics only. Use one bounded shared rAF scheduler that stops when the active counters finish.

4. Draw existing structural rules with transform-only pseudo-elements. Do not introduce ornamental UI.

Use these shared values:

```css
:root {
  --motion-view-title-y: 44px;
  --motion-view-card-y: 48px;
  --motion-view-side-x: 44px;
  --motion-view-scale: .97;
  --motion-view-fallback: 720ms;
  --motion-view-stagger: 70ms;
  --motion-line: 900ms;
  --motion-count: 1000ms;
}
```

- CSS View Timeline keyframes use `linear`, because progress comes from scrolling.
- Time-based fallback entrances use the existing `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`.
- Marketing transitions may run `620–820ms`; hover/press/UI feedback remains `140–220ms`.
- View-timeline motion animates `transform` and `opacity` only.
- Blur is a separate once-only transition on small text targets, maximum `6px` desktop / `4px` mobile, `620ms var(--ease-out)`. Never continuously animate blur with a scroll timeline and never blur cards, photos, sections, catalogs, or the green contact surface.

## Repo conventions to follow

- Motion tokens live in `assets/site-shell.css` and homepage-specific tokens in `assets/home.css`.
- Homepage behavior is plain ES5-compatible JavaScript in `assets/home.js`; do not add a framework or dependency.
- Generated locale homepages come only from `scripts/build-homepages.mjs`.
- Existing progressive enhancement leaves content visible when JavaScript is absent; preserve it.
- Existing integration FLIP batching and synchronous calculator behavior are correct and must remain intact.

## Steps

### 1. Add explicit count-up targets in the generator

In `scripts/build-homepages.mjs`, add `data-count-up` only to:

- `.proof-item > strong`
- numeric `.solution-card__proof` values (the runtime parser may safely reject the two nonnumeric values)
- `.case-card > strong`
- `.implementation-outcome > strong`
- `.integration-proof > strong`
- `.team-stat > strong`

Do not mark calculator/live outputs, integration search count, step indexes/timings, contexts/body copy, footer/contact numbers, product names, dates, phone/address/company IDs, or solution flow `<1 %`.

### 2. Implement the count-up engine

In `assets/home.js`, create `initCountUps()` and call it after `initMotion()`.

- Parse the exact source string into literal and numeric fragments with `/\d+(?:[ \u00A0\u202F.,]\d+)*/g`.
- Preserve literals byte-for-byte, including `~`, `<`, `−`, `+`, `%`, spaces, units, arrows and range separators.
- One numeric token: animate magnitude `0 → target`.
- Arrow relation (`17 → 78`, `3 → 1`): keep the first value fixed and interpolate from first to destination.
- Range (`4–8`): animate both endpoints from zero.
- Reject comparator targets `≤1`, so `<1 den/day/Tag/dzień` reveals normally.
- Space/NBSP/narrow-NBSP are grouping separators. Treat `.`/`,` followed by exactly three digits as grouping punctuation; otherwise retain the original decimal separator and precision.
- At progress `1`, restore the exact original source text.
- During animation, replace the metric contents with an inline-grid stack: an invisible exact accessible `.count-source` reserves final width, while `.count-visual[aria-hidden=true]` changes. Restore the original plain text on completion.
- Use `font-variant-numeric: tabular-nums` on the visual layer.
- Use one shared bounded rAF scheduler, no layout reads inside the loop, and update `textContent` only when formatted output changes.
- Duration `850ms` for solution proof, `1000ms` for hero/integration/team/outcome, and `1150ms` for case metrics. Sibling delay `index × 65ms`, capped at `130ms`.
- Skip entirely under reduced motion and write the exact final string. On preference change to reduce, stop the scheduler and restore all final strings.
- Trigger each metric independently at `threshold: .01`, neutral bottom margin. Prepare the visual zero state only after confirming IntersectionObserver exists. Do not unhide a final value and then reset it.

### 3. Add scroll-linked view animations

In `assets/home.js`, detect View Timeline support and toggle `html.home-view-motion`. In supported mode, do not apply `.home-motion-pending` or the current once-only JS choreography to scroll sections; keep the header/hero load choreography.

In `assets/home.css`, under both feature checks, define these transform/opacity-only scroll animations with `animation-duration: 1ms`, `animation-timing-function: linear`, `animation-fill-mode: both`, and `animation-timeline: view(block)`:

- `.partner-bar__inner`: `opacity: 0; translateY(28px) → settled`, range `entry 0% cover 24%`.
- `.section-head .section-kicker`: `opacity: 0; translateY(20px)`, range `entry 0% cover 22%`.
- `.section-head .section-title`: `opacity: 0; translateY(44px) scale(.97)`, range `entry 0% cover 36%`.
- `.section-head .section-intro`: `opacity: 0; translateX(44px)`, range `entry 0% cover 34%`.
- `.service-card`: `opacity: 0; translateX(-44px)`, range `entry 0% cover 32%`.
- `.solution-card`, `.case-card`, `.operation-card`, `.resource-card`: `opacity: 0; translateY(48px) scale(.97)`, range `entry 0% cover 34%`. Alternate row members may use 42/54 px Y amplitude, but do not move cards sideways.
- `.implementation-step`: `opacity: 0; translateX(46px)`, range `entry 0% cover 32%`.
- `.implementation-outcome`, `.process-step`: `opacity: 0; translateY(42px)`, range `entry 0% cover 33%`.
- `.integration-copy`: `opacity: 0; translateX(-44px)`, and `.integration-catalog`: `opacity: 0; translateX(44px)`, range `entry 0% cover 34%`.
- `.system-group`: `opacity: 0; translateY(30px)`, range `entry 0% cover 28%`.
- `.team-copy`: `opacity: 0; translateX(-44px)`, range `entry 0% cover 34%`.
- `.portrait`: `opacity: 0; translateY(54px) scale(.94)`, range `entry 0% cover 38%`. Do not blur or clip the image continuously.
- `.calculator-form`: `opacity: 0; translateX(-44px)` and `.calculator-result`: `opacity: 0; translateX(44px)`, range `entry 0% cover 34%`.
- `.contact-card`: `opacity: .12; translateY(54px) scale(.965)`, range `entry 0% cover 42%`.
- `.footer-intro`, `.footer-main > *`, `.footer-bottom`: `opacity: 0; translateY(36px)`, ranges `entry 0% cover 26–36%`.

Use selector-specific animation names when the initial transform differs. Do not apply one blanket selector to the entire page.

### 4. Add structural line drawing

Add one top-rule overlay pseudo-element to these existing ruled containers:

```text
.proof-strip
.services-grid
.solution-grid
.case-grid
.implementation-flow
.process-grid
.operations-grid
.resources-grid
.team-stats
.calculator-grid
```

- Set the container to `position: relative` only where needed.
- The pseudo-element is `position:absolute; top:-1px; left:0; right:0; height:2px; transform:scaleX(0); transform-origin:left; pointer-events:none`.
- Use `var(--mint-dark)` on light sections and `rgba(85, 227, 164, .78)` in `.results`.
- Supported mode: animate `scaleX(0 → 1)` with a view timeline, `linear`, range `entry 0% cover 28%`.
- Fallback mode: toggle a class and transition `transform 900ms var(--ease-out)`.
- Do not remove or alter the original border; the moving line overlays it and settles without layout change.

### 5. Add small-text focus accents

Only in View Timeline mode, use an IntersectionObserver to prepare and toggle a filter transition on:

```text
.section-title
.solution-card h3
.case-card > strong
.implementation-outcome > strong
.team-stat > strong
.calculator-result__money
.contact-card h2
.footer-statement
```

Prepared state: `filter: blur(6px)` (`4px` at `max-width:620px`). Visible state: `filter: blur(0)`. Transition `620ms var(--ease-out)`. Remove the transition/preparation classes after `transitionend`. This is once-only and independent from the scroll timeline, which owns only transform/opacity.

### 6. Replace the unsupported-browser fallback

When View Timelines are unavailable:

- Keep IntersectionObserver, but replace permanent `done + unobserve` for scroll sections with toggled `.home-fallback-in-view` state.
- Initial/pending variants use the same clear amplitudes as the View Timeline keyframes, not the current 4–10 px values.
- Enter transition: `720ms var(--ease-out)`.
- Exit transition: `260ms var(--ease-in-out)` only after the element fully leaves below/above the viewport; avoid threshold flicker.
- Cards and titles may replay when the user scrolls back. Static counters remain once-only.
- Keep content visible without JavaScript and add no loader/failsafe overlay.

### 7. Strengthen hero load choreography

Keep it time-based and one-shot, but use visibly readable amplitudes:

- Hero title: opacity `.001`, `translateY(40px) scale(.975)`, blur `8px → 0`, `780ms`.
- Lead: opacity `.08`, `translateX(-30px)`, blur `4px`, `620ms`, delay `100ms`.
- Actions: opacity `.08`, `translateX(30px)`, blur `2px`, `520ms`, delay `180ms`.
- Proof items: opacity `.08`, `translateY(22px)`, `540ms`, delay `260ms + index × 70ms`; count-ups start with the proof group.
- Preserve header usability under 300ms.

### 8. Accessibility, performance and asset regeneration

- No scroll event, scroll-position read loop, parallax rAF, infinite animation, animated gradient, glow, particle, loader, cursor follower or mockup.
- View Timeline animations are transform/opacity only. Blur is ≤6px, once-only, and text-only. Count scheduler is bounded and stops.
- Fine-pointer hover motion remains gated and under 220ms.
- Under `prefers-reduced-motion`, remove View Timeline animations, pending/fallback transforms, line animation and count-up. Show final content/lines immediately; keep at most a `180ms` opacity crossfade and normal color feedback.
- Preserve the integration search FLIP, menu behavior, calculator values, layout, typography, colors, copy, images, favicon and footer content.
- Bump homepage asset query references from `20260720-9` to `20260720-10` and regenerate exactly `index.html`, `en.html`, `de.html`, and `pl.html`.

## Boundaries

- Do NOT touch EnterAI or any subpage.
- Do NOT change content, layout, fonts, colors, images, partner logos, favicon or footer information.
- Do NOT add dependencies.
- Do NOT hand-edit generated homepage HTML.
- Do NOT commit or push.
- Do NOT restore delayed/repeating calculator blur; live calculator values must remain synchronous and stable.
- If the current code materially differs from the excerpts above, stop and report rather than improvising outside this scope.

## Verification

- **Mechanical**:
  - Run `/Users/matusfojtik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --check assets/home.js`.
  - Run `/Users/matusfojtik/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/build-homepages.mjs` twice; the second run must produce no new diff.
  - Run `git diff --check`.
  - Confirm all four locales reference `20260720-10` assets.
- **Feel check in supported browser**:
  - Scroll slowly and quickly through every section. Titles/cards must visibly travel tens of pixels and fade with scroll progress, not finish at the bottom edge.
  - Scroll back upward; view-linked surfaces visibly reverse/re-enter rather than remaining permanently done.
  - Hero, structural rules, number counts, section compositions, cards, process steps, portraits, contact and footer are all visibly animated.
  - Count-ups preserve exact final strings in CS/EN/DE/PL, reserve width without CLS, and never touch calculator/search live outputs.
- **Fallback check**:
  - Force View Timeline support detection false. Scroll down/up and confirm the transition classes replay smoothly without final→start flashes.
- **Performance/accessibility**:
  - Confirm no horizontal overflow or broken images in all locales.
  - Confirm no layout reads occur inside animation frame loops.
  - Toggle reduced motion: all transforms, scroll-linked lines and counts stop; final content remains visible and interactions work.
- **Done when**: the page has unmistakable motion during scroll, numeric metrics count up, structural rules draw, the motion replays on reverse scrolling where appropriate, and no animation uses continuous JavaScript scroll work.
