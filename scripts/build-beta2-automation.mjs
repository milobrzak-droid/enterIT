/**
 * build-beta2-automation.mjs — the automation page, in four languages.
 *
 * The companion to the agents page, and the one most readers should act on
 * first. It opens with four situations from real engagements rather than with a
 * definition, because a reader recognises their own back office faster than
 * they recognise a category.
 *
 * The Helios walkthrough at the end is the most useful thing on the page: the
 * only place on the site where a reader sees an engagement in order, including
 * the week spent auditing ten drawings before quoting.
 *
 * Copy: scripts/beta2-automation-copy.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES, ROOT_LOCALE, headLinks, key, page, pageHead, section, sub } from "./beta2-page.mjs";
import { automationCopy } from "./beta2-automation-copy.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function render(code) {
  const C = automationCopy[code];
  const U = ui[code];

  const symptomTones = ["turquoise", "white", "violet", "white"];
  const problem = section({
    id: "problem", no: "01", hue: 0,
    kicker: C.problem.kicker, h2: C.problem.h2, ask: C.problem.ask,
    keys: [
      ...C.problem.items.map(([title, subText], i) =>
        key({ span: 3, tone: symptomTones[i], title, size: "sm", sub: subText })),
      /* All four symptoms look the same from behind: a document open on one
         side of the screen and the system it has to reach on the other. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/screenwork.webp", alt: C.photoAlt,
        title: C.photoTitle, size: "big", sub: C.photoSub,
      }),
    ],
  });

  const scope = section({
    id: "scope", no: "02", hue: 1,
    kicker: C.scope.kicker, h2: C.scope.h2, ask: C.scope.ask,
    keys: C.scope.layers.map(([title, strap, subText], i) =>
      key({
        span: i < 3 ? 4 : 6,
        tone: i === 0 ? "turquoise" : i === 3 ? "blue" : "white", eyebrow: strap, title, size: "sm", sub: subText,
      })),
  });

  const how = section({
    id: "how", no: "03", hue: 2,
    kicker: C.how.kicker, h2: C.how.h2, ask: C.how.ask,
    keys: C.how.phases.map(([tag, title, subText, time], i) =>
      key({
        span: 3, tone: i === 3 ? "turquoise" : "white",
        eyebrow: `${tag} · ${time}`, title, size: "sm", sub: subText,
      })),
  });

  const boundaryTones = ["white", "turquoise", "violet", "white"];
  const boundary = section({
    id: "boundary", no: "04", hue: 3,
    kicker: C.boundary.kicker, h2: C.boundary.h2, ask: C.boundary.ask,
    keys: [
      ...C.boundary.items.map(([title, subText], i) =>
        key({ span: 6, tone: boundaryTones[i], title, size: "sm", sub: subText })),
      key({
        span: 12, tone: "navy",
        eyebrow: C.boundary.realEyebrow, title: C.boundary.realTitle, size: "sm",
        sub: C.boundary.realSub, mascot: "red",
      }),
    ],
  });

  const walkthrough = section({
    id: "walkthrough", no: "05", hue: 4,
    kicker: C.walk.kicker, h2: C.walk.h2, ask: C.walk.ask,
    keys: [
      ...C.walk.steps.map(([eyebrow, title, subText], i) =>
        key({
          span: 4, tone: i === 1 ? "turquoise" : "white",
          eyebrow, title, size: "sm", sub: subText,
        })),
      key({
        span: 8, tone: "navy",
        eyebrow: C.walk.endEyebrow, title: C.walk.endTitle, size: "big",
        sub: C.walk.endSub, meta: C.walk.endMeta,
      }),
      key({
        span: 4, tone: "turquoise",
        eyebrow: C.walk.nextEyebrow, title: C.walk.nextTitle, size: "sm",
        sub: C.walk.nextSub, go: C.walk.nextGo, href: sub(code, "agents.html"),
      }),
    ],
  });

  const foundation = section({
    id: "foundation", no: "06", hue: 5,
    kicker: C.foundation.kicker, h2: C.foundation.h2,
    keys: C.foundation.cards.map(([title, subText], i) =>
      key({ span: 4, tone: i === 2 ? "turquoise" : "white", title, size: "sm", sub: subText })),
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "automation.html")),
    body: [
      pageHead({
        code, ui: U,
        eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta,
        cta: C.cta, bookingUrl,
      }),
      problem, scope, how, boundary, walkthrough, foundation,
    ].join("\n\n"),
  });
}

export function writeAutomation() {
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE ? root : resolve(root, code);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "automation.html"), render(code), "utf8");
  }
  console.log("**/automation.html  (4 languages)");
}
