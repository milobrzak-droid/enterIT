/**
 * build-beta2-routines.mjs — routines/*.html, one page per routine per language.
 *
 * Eight pages from one template, because eight pages that answer the same
 * questions in a different order are eight pages nobody can compare. A buyer
 * weighing invoices against timesheets should find the trust section, the
 * timeline and the objections in the same place on both.
 *
 * The section that does the selling is "what it never does". It sits third,
 * ahead of the timeline, because the objection it answers arrives before the
 * question about the schedule does.
 *
 * Content: scripts/beta2-routines.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { ROOT_LOCALE, boardHref, e, headLinks, key, page, pageHead, section, sub } from "./beta2-page.mjs";
import { LOCALES } from "./beta2-page.mjs";
import { routineTones, routinesByLocale } from "./beta2-routines.mjs";
import { routineUi } from "./beta2-routines-ui.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function renderRoutine(code, r, i) {
  const U = ui[code];
  const R = routineUi[code];
  const routines = routinesByLocale[code];
  const tone = routineTones[i];
  const others = routines
    .filter((x) => x.slug !== r.slug)
    .map((x, j) => key({
      span: 3, tone: j % 3 === 0 ? "white" : "white",
      title: x.tag, size: "sm", sub: x.lead,
      go: `${x.stat} ${x.statLabel} →`, href: sub(code, `routines/${x.slug}.html`),
    }));

  const pain = section({
    id: "pain", no: "01", hue: 0,
    kicker: R.painKicker,
    h2: R.painH2,
    ask: R.painAsk,
    keys: [
      ...r.pain.map((p, j) =>
        key({ span: 4, tone: j === 0 ? tone : "white", legend: String(j + 1), title: p, size: "sm" })),
      /* Optional. A photograph of the work as it looks today, placed where the
         reader has just recognised their own back office. */
      r.photo && key({
        span: 12, tone: "navy",
        /* Some frames leave the right half open instead of the left. */
        wide: !r.photoRight, wideRight: !!r.photoRight,
        photo: r.photo, alt: r.photoAlt,
        eyebrow: R.todayEyebrow,
        title: r.h1, size: "big",
        meta: `${r.flowIn}  →  ${r.flowOut}`,
      }),
    ],
  });

  const flow = section({
    id: "flow", no: "02", hue: 1,
    kicker: R.flowKicker,
    h2: R.flowH2,
    ask: R.flowAsk,
    keys: r.flow.map(([title, sub], j) =>
      key({
        span: r.flow.length > 6 && j >= 4 ? 4 : 3,
        tone: j === r.flow.length - 1 ? "navy" : "white",
        legend: String(j + 1), title, size: "sm", sub,
      })),
  });

  const never = section({
    id: "never", no: "03", hue: 2,
    kicker: R.neverKicker,
    h2: R.neverH2,
    ask: R.neverAsk,
    keys: [
      ...r.never.map((n, j) =>
        key({ span: 4, tone: j === 1 ? tone : "white", legend: "✕", title: n, size: "sm" })),
      key({
        span: 12, tone: "navy",
        eyebrow: R.runsEyebrow,
        title: R.runsTitle,
        size: "sm",
        list: R.runsList,
        mascot: "blue",
      }),
    ],
  });

  const setup = section({
    id: "setup", no: "04", hue: 3,
    kicker: R.setupKicker,
    h2: R.setupH2,
    ask: R.setupAsk,
    keys: [
      ...r.need.map((n, j) =>
        key({ span: 4, tone: "white", legend: String(j + 1), title: n, size: "sm" })),
      key({
        span: 12, tone: tone,
        eyebrow: R.expectEyebrow,
        size: "sm",
        /* Figures first, then the engagement that backs them — a proof line
           above the numbers reads as a caption for the wrong thing. */
        extra: `<div class="strip strip--in">${r.expect
          .map(([v, l]) => `<span class="stat"><b>${e(v)}</b>${e(l)}</span>`)
          .join("")}</div>${r.proof ? `<p class="key-meta key-meta--rule">${e(r.proof)}</p>` : ""}`,
      }),
    ],
  });

  const faq = section({
    id: "faq", no: "05", hue: 4,
    kicker: R.faqKicker,
    h2: R.faqH2,
    raw: `      <div class="key key--white panel" style="grid-column:span 12">
${r.faq.map(([q, a]) => `        <div class="qa"><b>${e(q)}</b><p>${e(a)}</p></div>`).join("\n")}
      </div>`,
  });

  const next = section({
    id: "next", no: "06", hue: 5,
    kicker: R.nextKicker,
    h2: R.nextH2,
    ask: R.nextAsk,
    keys: [
      key({
        span: 4, tone: "turquoise", mascot: "wave",
        title: R.bookTitle, size: "sm",
        sub: "milo@enterit.cz · +420 608 969 263",
        go: R.bookGo, href: bookingUrl,
      }),
      key({
        span: 4, tone: "white",
        title: R.calcTitle, size: "sm",
        sub: R.calcSub,
        go: R.calcGo, href: sub(code, "calculator.html"),
      }),
      key({
        span: 4, tone: "white",
        title: R.allTitle, size: "sm",
        sub: R.allSub,
        go: R.allGo, href: `${boardHref(code)}#start`,
      }),
    ],
  });

  const more = section({
    id: "more", no: "07", hue: 0,
    kicker: R.moreKicker,
    h2: R.moreH2,
    keys: others,
  });

  return page({
    code, ui: U,
    title: `${r.tag}: ${r.h1} | EnterIT`,
    description: r.lead,
    bookingUrl,
    ...headLinks(code, (x) => sub(x, `routines/${routinesByLocale[x][i].slug}.html`)),
    body: [
      pageHead({
        eyebrow: `${R.eyebrow} · ${r.tag}`,
        code, ui: U,
        h1: r.h1,
        lead: r.lead,
        meta: `${r.flowIn}  →  ${r.flowOut}   ·   ${r.stat} ${r.statLabel}`,
        cta: R.cta,
        bookingUrl,
      }),
      pain, flow, never, setup, faq, next, more,
    ].join("\n\n"),
  });
}

export function writeRoutines() {
  let n = 0;
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE
      ? resolve(root, "routines")
      : resolve(root, code, "routines");
    mkdirSync(dir, { recursive: true });
    routinesByLocale[code].forEach((r, i) => {
      writeFileSync(resolve(dir, `${r.slug}.html`), renderRoutine(code, r, i), "utf8");
      n += 1;
    });
  }
  console.log(`**/routines/*.html  (${n} pages, four languages)`);
}
