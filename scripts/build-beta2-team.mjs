/**
 * build-beta2-team.mjs — the team and integrations pages, in four languages.
 *
 * Team. Enter Agents and Enter Tech each have their own founder and chief
 * executive, so a page that does not say so leaves a reader counting two CEOs
 * and quietly concluding somebody is inflating titles. Section 02 states it
 * plainly, in every language.
 *
 * Integrations. "60+ integrated" and "44 documented" used to look like a
 * contradiction on this site. They count different things and the page says
 * which is which rather than hoping nobody notices. The catalogue itself is
 * read from the production content module, which is already translated — one
 * source of truth, and one less place for four languages to drift.
 *
 * Copy: scripts/beta2-pages-copy.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES, ROOT_LOCALE, boardHref, e, headLinks, key, page, pageHead, section, sub } from "./beta2-page.mjs";
import { pagesCopy } from "./beta2-pages-copy.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Names and photographs do not translate; roles do. */
const PEOPLE = [
  [["Gašpar Nagy", "/assets/team/gaspar-nagy.jpg"], ["Adam Nagy", "/assets/team/adam-nagy.jpg"]],
  [["Honza Nedvídek", "/assets/team/nedvidek.jpg"], ["Ondřej Hanigovský", "/assets/team/hanigovsky.jpg"]],
  [["Jiří Čechal", "/assets/team/studio-1.jpg"], ["Vítek Sasin", "/assets/team/studio-2.jpg"]],
];
const TEAM_NAMES = ["Enter Tech", "Enter Agents", "Enter Studio"];
const TEAM_TONES = ["navy", "turquoise", "violet"];

const faceCap = (name, role, img, span = 2) => `      <div class="key key--navy key--photo key--face" style="grid-column:span ${span}">
        <img class="key-bg" src="${img}" alt="${e(name)}" width="440" height="440" loading="lazy">
        <span class="key-title key-title--sm">${e(name)}</span>
        <p class="key-meta">${e(role)}</p>
      </div>`;

function renderTeam(code) {
  const C = pagesCopy[code].team;
  const U = ui[code];

  const structure = section({
    id: "teams", no: "01", hue: 0,
    kicker: C.structKicker, h2: C.structH2, ask: C.structAsk,
    keys: [
      ...C.teams.map((t, i) =>
        key({
          span: 4, tone: TEAM_TONES[i], eyebrow: t.size, title: TEAM_NAMES[i],
          size: "big", sub: t.body, list: t.does,
          rule: PEOPLE[i].map(([n]) => n).join(" · "),
        })),
      /* The faces behind those names. Photo caps, so the row reads as people
         rather than as a directory. */
      ...C.teams.flatMap((t, i) =>
        PEOPLE[i].map(([name, img], j) => faceCap(name, t.roles[j], img))),
    ],
  });

  const titles = section({
    id: "titles", no: "02", hue: 1,
    kicker: C.titlesKicker, h2: C.titlesH2,
    keys: [
      key({ span: 8, tone: "navy", body: C.titlesBody, mascot: "wave" }),
      faceCap("Milo Brzák", C.miloRole, "/assets/team/milo.jpg"),
      faceCap("Michaela Klesnárová", C.michaelaRole, "/assets/team/klesnarova.jpg"),
    ],
  });

  const shape = section({
    id: "shape", no: "03", hue: 2,
    kicker: C.shapeKicker, h2: C.shapeH2,
    keys: [
      ...C.stats.map(([stat, statLabel, subText], i) =>
        key({
          span: 3, tone: ["turquoise", "white", "blue"][i] || "white", stat, statLabel, sub: subText || undefined,
        })),
      key({
        span: 12, tone: "violet", title: C.ownerTitle, size: "big",
        sub: C.ownerSub, go: C.ownerGo, href: bookingUrl,
      }),
    ],
  });

  const where = section({
    id: "where", no: "04", hue: 3,
    kicker: C.whereKicker, h2: C.whereH2,
    keys: [
      key({ span: 6, tone: "violet", title: C.remoteTitle, size: "sm", sub: C.remoteSub }),
      key({
        span: 6, tone: "turquoise", title: C.hiringTitle, size: "sm",
        sub: C.hiringSub, go: C.hiringGo, href: bookingUrl,
      }),
    ],
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "team.html")),
    body: [
      pageHead({ code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta, cta: C.cta, bookingUrl }),
      structure, titles, shape, where,
    ].join("\n\n"),
  });
}

function renderIntegrations(code) {
  const C = pagesCopy[code].integrations;
  const U = ui[code];
  const cat = restorationContent[code].integrations;
  const total = cat.groups.reduce((n, g) => n + g.systems.length, 0);

  const routeTones = ["turquoise", "white", "white", "violet"];
  const routes = section({
    id: "routes", no: "01", hue: 0,
    kicker: C.routesKicker, h2: C.routesH2, ask: C.routesAsk,
    keys: C.routes.map(([title, subText], i) =>
      key({ span: 3, tone: routeTones[i], legend: String(i + 1), title, size: "sm", sub: subText })),
  });

  const numbers = section({
    id: "numbers", no: "02", hue: 1,
    kicker: C.numbersKicker, h2: C.numbersH2,
    keys: [
      key({
        span: 12, tone: "navy", mascot: "blue",
        body: [`${C.numbersBodyA} ${total} ${C.numbersBodyB}`],
      }),
    ],
  });

  const catalog = section({
    id: "catalog", no: "03", hue: 2,
    kicker: `${total} ${C.catalogKickerB}`, h2: C.catalogH2, ask: C.catalogAsk,
    keys: cat.groups.map((g, i) =>
      key({
        span: 4, tone: ["turquoise", "white", "blue", "violet"][i] || "white",
        eyebrow: `${g.title} · ${g.systems.length}`,
        title: g.systems.join(" · "), size: "sm",
      })),
  });

  const rules = section({
    id: "rules", no: "04", hue: 3,
    kicker: C.rulesKicker, h2: C.rulesH2,
    keys: [
      ...C.rules.map(([title, subText], i) =>
        key({ span: 4, tone: ["white", "yellow", "turquoise"][i] || "white", title, size: "sm", sub: subText })),
      /* Two different answers, and conflating them would be the dishonest move.
         For a European client the hosting claim is firm because it rests on
         something real. For a US partner it is not a hosting promise at all. */
      key({ span: 6, tone: "navy", eyebrow: C.euEyebrow, title: C.euTitle, size: "sm", sub: C.euSub }),
      key({
        span: 6, tone: "turquoise", eyebrow: C.usEyebrow, title: C.usTitle,
        size: "sm", sub: C.usSub, go: C.usGo, href: bookingUrl,
      }),
      /* Closing the section with the thing itself: hosting is a choice about a
         machine somewhere, not an abstraction. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/infra.webp", alt: C.infraAlt,
        title: C.infraTitle, size: "big", sub: C.infraSub,
      }),
    ],
  });

  const hrefs = [bookingUrl, sub(code, "agents.html"), `${boardHref(code)}#start`];
  const next = section({
    id: "next", no: "05", hue: 4,
    kicker: C.nextKicker, h2: C.nextH2,
    keys: C.nextCards.map(([title, subText, go], i) =>
      key({
        span: 4, tone: i === 0 ? "turquoise" : "white",
        mascot: i === 0 ? "wave" : undefined,
        title, size: "sm", sub: subText, go, href: hrefs[i],
      })),
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "integrations.html")),
    body: [
      pageHead({
        code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead,
        meta: `${C.metaA} ${total} ${C.metaB}`, cta: C.cta, bookingUrl,
      }),
      routes, numbers, catalog, rules, next,
    ].join("\n\n"),
  });
}

export function writeTeamAndIntegrations() {
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE ? root : resolve(root, code);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "team.html"), renderTeam(code), "utf8");
    writeFileSync(resolve(dir, "integrations.html"), renderIntegrations(code), "utf8");
  }
  console.log("**/team.html, integrations.html  (4 languages)");
}
