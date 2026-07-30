/**
 * build-beta2-agents.mjs — the agents page, in four languages.
 *
 * The Czech original is the best writing on the site: it draws the one
 * distinction a technical buyer actually cares about — automation is a fixed
 * track, an agent is a goal plus judgment — and then earns it by listing the
 * eight things that have to be defined before an agent is trustworthy.
 *
 * The section a sceptical reader reaches for is "what an agent never does". It
 * is a full-width cap in section 02 in every language, deliberately not buried.
 *
 * Copy: scripts/beta2-agents-copy.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES, ROOT_LOCALE, headLinks, key, page, pageHead, section, sub } from "./beta2-page.mjs";
import { agentsCopy } from "./beta2-agents-copy.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function render(code) {
  const C = agentsCopy[code];
  const U = ui[code];

  const difference = section({
    id: "difference", no: "01", hue: 0,
    kicker: C.difference.kicker, h2: C.difference.h2, ask: C.difference.ask,
    keys: [
      key({
        span: 6, tone: "white",
        eyebrow: C.difference.autoEyebrow, title: C.difference.autoTitle, size: "big",
        sub: C.difference.autoSub, rule: C.difference.autoRule,
      }),
      key({
        span: 6, tone: "turquoise",
        eyebrow: C.difference.agentEyebrow, title: C.difference.agentTitle, size: "big",
        sub: C.difference.agentSub, rule: C.difference.agentRule, mascot: "blue",
      }),
      key({
        span: 12, tone: "navy",
        title: C.difference.whyTitle, size: "sm", body: C.difference.why,
      }),
      /* The distinction above is abstract. This is the concrete version of it:
         the agent types, a person presses the key that commits. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/keyboard.webp", alt: C.difference.photoAlt,
        title: C.difference.photoTitle, size: "big", sub: C.difference.photoSub,
      }),
    ],
  });

  const anatomy = section({
    id: "anatomy", no: "02", hue: 1,
    kicker: C.anatomy.kicker, h2: C.anatomy.h2, ask: C.anatomy.ask,
    keys: [
      ...C.anatomy.parts.map(([title, subText], i) =>
        key({
          span: 3, tone: ["turquoise", "white", "blue", "white", "violet", "white", "yellow", "white"][i] || "white", title, size: "sm", sub: subText,
        })),
      key({
        span: 12, tone: "navy",
        eyebrow: C.anatomy.neverEyebrow, title: C.anatomy.neverTitle, size: "big",
        list: C.anatomy.never, mascot: "red",
      }),
    ],
  });

  const kindTones = ["turquoise", "blue", "white", "violet", "yellow", "white"];
  const types = section({
    id: "types", no: "03", hue: 2,
    kicker: C.types.kicker, h2: C.types.h2, ask: C.types.ask,
    keys: C.types.kinds.map(([title, subText], i) =>
      key({ span: 4, tone: kindTones[i], title: `${title} ${C.types.suffix}`, size: "sm", sub: subText })),
  });

  const stack = section({
    id: "stack", no: "04", hue: 3,
    kicker: C.stack.kicker, h2: C.stack.h2,
    keys: C.stack.cards.map(([eyebrow, title, subText], i) =>
      key({ span: 3, tone: ["turquoise", "white", "blue", "white"][i], eyebrow, title, size: "sm", sub: subText })),
  });

  const trust = section({
    id: "trust", no: "05", hue: 4,
    kicker: C.trust.kicker, h2: C.trust.h2,
    keys: [
      key({ span: 8, tone: "navy", body: C.trust.body, mascot: "wave" }),
      key({
        span: 4, tone: "turquoise",
        eyebrow: C.trust.nextEyebrow, title: C.trust.nextTitle, size: "sm",
        sub: C.trust.nextSub, go: C.trust.nextGo, href: sub(code, "automation.html"),
      }),
    ],
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "agents.html")),
    body: [
      pageHead({
        code, ui: U,
        eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta,
        cta: C.cta, bookingUrl,
      }),
      difference, anatomy, types, stack, trust,
    ].join("\n\n"),
  });
}

export function writeAgents() {
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE ? root : resolve(root, code);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "agents.html"), render(code), "utf8");
  }
  console.log("**/agents.html  (4 languages)");
}
