/**
 * build-beta2-cases.mjs — cases.html in four languages.
 *
 * One page, three case studies, each rendered as its own chapter with an anchor
 * the board's result cards link to. Outcome numbers render as stat caps only
 * when the case has published figures; the manufacturing case has none it can
 * publish, so it carries the NDA note instead of a fabricated stat — an empty
 * slot is honest, an invented number is not.
 *
 * A case's `quote` renders only when it exists. The slots are null on purpose:
 * see beta2-cases.mjs for why they must not be filled with drafted words.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import {
  LOCALES, ROOT_LOCALE, boardHref, e, headLinks, key, page, pageHead, section, sub,
} from "./beta2-page.mjs";
import { casesByLocale } from "./beta2-cases.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const caseTones = ["turquoise", "blue", "violet"];

function renderCases(code) {
  const C = casesByLocale[code];
  const U = ui[code];

  const chapters = C.cases.map((c, i) => section({
    id: c.id, no: String(i + 1).padStart(2, "0"), hue: i,
    kicker: `${c.client} · ${c.industry}`, h2: c.title, ask: c.problem,
    keys: [
      key({
        span: c.outcome ? 7 : 8, tone: "white", eyebrow: C.builtLabel,
        list: c.built,
      }),
      c.outcome
        ? key({
            span: 5, tone: caseTones[i], eyebrow: C.outcomeLabel,
            extra: `<div class="strip">${c.outcome
              .map(([n, l]) => `<span class="stat"><b>${e(n)}</b>${e(l)}</span>`)
              .join("")}</div>`,
            meta: `${C.statusLabel}: ${c.status}`,
          })
        : key({
            span: 4, tone: "navy", eyebrow: C.outcomeLabel,
            sub: C.ndaNote, meta: `${C.statusLabel}: ${c.status}`, mascot: "blue",
          }),
      key({ span: 12, tone: "navy", eyebrow: C.runsLabel, body: [c.runs] }),
      c.quote
        ? key({ span: 12, tone: "turquoise", title: `„${c.quote.text}“`, size: "sm", meta: c.quote.by })
        : "",
    ],
  }));

  const close = section({
    id: "next", no: "04", hue: 3,
    kicker: C.eyebrow, h2: C.cta,
    keys: [
      key({ span: 8, tone: "turquoise", title: C.cta, size: "big", go: "→", href: bookingUrl, mascot: "wave" }),
      key({ span: 4, tone: "white", title: C.backLabel, size: "sm", href: `${boardHref(code)}#results` }),
    ],
  });

  return page({
    code, ui: U, title: `${C.eyebrow} | EnterIT`, description: C.lead, bookingUrl,
    ...headLinks(code, (x) => sub(x, "cases.html")),
    body: [
      pageHead({ code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta, cta: C.cta, bookingUrl }),
      ...chapters, close,
    ].join("\n\n"),
  });
}

export function writeCases() {
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE ? root : resolve(root, code);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "cases.html"), renderCases(code), "utf8");
  }
  console.log("**/cases.html  (4 languages)");
}
