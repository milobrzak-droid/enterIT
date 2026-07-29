/**
 * build-beta2-team.mjs — /beta2/team.html and /beta2/integrations.html.
 *
 * Team. The copy deck flagged a real credibility problem: Enter Agents and
 * Enter Tech each have their own CEO and founder, and on a page that does
 * not say so, a US reader counts two CEOs and two founders and stops believing
 * the page. So every title here carries the entity it belongs to, and the
 * distinction is stated once in plain words rather than left to be inferred.
 *
 * Integrations. Two numbers on this site have always looked like a
 * contradiction — "60+ systems integrated" and "44 systems documented". Both
 * are true and they count different things. The page says which is which in the
 * first paragraph instead of hoping nobody notices.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { e, key, need, page, pageHead, section } from "./beta2-page.mjs";
import { bookingUrl } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* -------------------------------------------------------------- Team ---- */

const teams = [
  {
    name: "Enter Tech", size: "45 engineers", tone: "navy",
    body: "Large systems, architecture, custom development, integrations, legacy modernization, DevOps and infrastructure. The oldest practice in the group and the one behind our longest-running engagements — the work measured in years rather than in sprints.",
    does: ["Custom internal applications and portals", "ERP, CRM and WMS integration", "Legacy modernization and gradual replacement", "Cloud, DevOps and long-term maintenance"],
    people: [
      ["Gašpar Nagy", "Founder, Enter Tech", "/assets/team/gaspar-nagy.jpg"],
      ["Adam Nagy", "CIO, Enter Tech", "/assets/team/adam-nagy.jpg"],
    ],
  },
  {
    name: "Enter Agents", size: "25 engineers", tone: "turquoise",
    body: "AI agents and custom LLM systems put into live operations. The engineers are forward-deployed: they sit with your process owners and watch the work happen instead of building from a specification document that was already out of date when it was written.",
    does: ["Agents in production, with governance", "Document extraction and knowledge retrieval", "Agentic layers over an existing ERP", "Data pipelines and retrieval infrastructure"],
    people: [
      ["Honza Nedvídek", "CEO, Enter Agents", "/assets/team/nedvidek.jpg"],
      ["Ondřej Hanigovský", "CTO, Enter Agents", "/assets/team/hanigovsky.jpg"],
    ],
  },
  {
    name: "Enter Studio", size: "5 people", tone: "violet",
    body: "The interface layer on top of what the other two teams build: the screens people actually work in. Product and front-end, from an MVP to something that survives real use — and on larger engagements it borrows capacity from Enter Tech rather than pretending five people can do everything.",
    does: ["Internal apps and portals people use daily", "The screens on top of an agent or an automation", "Product work from MVP to scale", "Design systems and component libraries"],
    people: [
      ["Jiří Čechal", "Head of Development, Enter Studio", "/assets/team/studio-1.jpg"],
      ["Vítek Sasin", "C programmer, Enter Studio", "/assets/team/studio-2.jpg"],
    ],
  },
];

const structure = section({
  id: "teams", no: "01", hue: 0,
  kicker: "Three teams",
  h2: "Three practices, one delivery process.",
  ask: "They are separate teams because the disciplines genuinely differ, and one organization because the failures we get called in to fix live in the gaps between suppliers. Work crosses the boundary internally, not through a subcontract.",
  keys: [
    ...teams.map((t) =>
      key({
        span: 4, tone: t.tone, eyebrow: t.size, title: t.name, size: "big",
        sub: t.body, list: t.does,
        rule: t.people.map(([n]) => n).join(" · "),
      })),
    /* The faces behind those three names. Photo caps, so the row reads as
       people rather than as a directory. */
    ...teams.flatMap((t) => t.people).map(([name, role, img]) => `      <div class="key key--navy key--photo" style="grid-column:span 2">
        <img class="key-bg" src="${img}" alt="${e(name)}" loading="lazy">
        <span class="key-title key-title--sm">${e(name)}</span>
        <p class="key-meta">${e(role)}</p>
      </div>`),
  ],
});

/* The distinction the deck said would otherwise cost us the reader. */
const titles = section({
  id: "titles", no: "02", hue: 1,
  kicker: "About the titles",
  h2: "Yes, there is more than one CEO. Here is why.",
  keys: [
    key({
      span: 8, tone: "navy",
      body: [
        "Enter Agents and Enter Tech are companies with their own founders and their own chief executives, and they say so on their own websites. Enter Group is the organization the three of them deliver under, and it has one founder and one CEO.",
        "We spell it out because on a page that does not, a reader counts two CEOs and two founders and quietly concludes that somebody is inflating titles. The structure is ordinary; only the labels look odd out of context.",
        "What it means commercially: you sign one contract with Enter Group, and the named owner for your engagement is a person, not a company.",
      ],
      mascot: "wave",
    }),
    `      <div class="key key--navy key--photo" style="grid-column:span 2">
        <img class="key-bg" src="/assets/team/milo.jpg" alt="Milo Brzák" loading="lazy">
        <span class="key-eyebrow">Enter Group</span>
        <span class="key-title key-title--sm">Milo Brzák</span>
        <p class="key-meta">Founder &amp; CEO. Strategy, product and methodology. 800+ people trained across more than a hundred companies.</p>
      </div>`,
    `      <div class="key key--navy key--photo" style="grid-column:span 2">
        <img class="key-bg" src="/assets/team/klesnarova.jpg" alt="Michaela Klesnárová" loading="lazy">
        <span class="key-eyebrow">Enter Group</span>
        <span class="key-title key-title--sm">Michaela Klesnárová</span>
        <p class="key-meta">Operations &amp; Delivery. Owns client delivery and production operations across all three teams.</p>
      </div>`,
  ],
});

const shape = section({
  id: "shape", no: "03", hue: 2,
  kicker: "What that adds up to",
  h2: "75 engineers, and the reason the number matters.",
  keys: [
    key({
      span: 3, tone: "white", stat: "75", statLabel: "engineers, permanent",
      sub: "Not a network of freelancers assembled per project.",
    }),
    key({
      span: 3, tone: "white", stat: "45 / 25 / 5", statLabel: "tech / agents / studio",
    }),
    key({
      span: 3, tone: "white", stat: "120+", statLabel: "projects delivered",
      needs: need("confirm the count before launch"),
    }),
    key({
      span: 3, tone: "white", stat: "60+", statLabel: "systems integrated",
      needs: need("confirm the count before launch"),
    }),
    key({
      span: 12, tone: "violet",
      title: "Every area has a named owner, and you always know who decides.",
      size: "big",
      sub: "That is the whole argument for a team this size rather than a bigger one. Large enough to hold three disciplines permanently; small enough that the person accountable for your engagement answers their own phone.",
      go: "Talk to us →", href: bookingUrl,
    }),
  ],
});

const where = section({
  id: "where", no: "04", hue: 3,
  kicker: "Where we are",
  h2: "Bruntál and Prague, working with teams across Europe and in the US.",
  keys: [
    key({
      span: 6, tone: "white",
      title: "Remote by default, on site when it earns its travel.", size: "sm",
      sub: "Discovery and the early process mapping are worth doing in the room. Almost everything after that is better done asynchronously, with a written status waiting when your day starts.",
    }),
    key({
      span: 6, tone: "turquoise",
      title: "We are hiring.", size: "sm",
      sub: "No proof-of-concept graveyard. You ship to production and then you keep it running — which is a different job, and the one worth having.",
      go: "Open roles →", href: "/en/tym.html",
    }),
  ],
});

const teamBody = [
  pageHead({
    eyebrow: "Who does the work",
    h1: "75 engineers. Three teams. One name on the contract.",
    lead: "Three permanent teams that have worked together long enough to hand work across the boundary without dropping it. This page is who they are, who runs them, and why the titles look the way they do.",
    meta: "Enter Tech · Enter Agents · Enter Studio",
    cta: "Meet the people who would run your engagement",
    bookingUrl,
  }),
  structure, titles, shape, where,
].join("\n\n");

/* ------------------------------------------------------ Integrations ---- */

const cat = restorationContent.en.integrations;
const catalogTotal = cat.groups.reduce((n, g) => n + g.systems.length, 0);

const routes = section({
  id: "routes", no: "01", hue: 0,
  kicker: "Four ways in",
  h2: "In this order of preference, and never the other way round.",
  ask: "The route is chosen by what the system actually supports, not by what is quickest for us. A system with no modern API is a normal Tuesday, not a reason to say no.",
  keys: [
    key({ span: 3, tone: "turquoise", legend: "1", title: "API", size: "sm",
      sub: "Official, documented, versioned. Where it exists this is always the answer." }),
    key({ span: 3, tone: "white", legend: "2", title: "Database", size: "sm",
      sub: "Read directly, write through a controlled layer with the vendor's blessing where the vendor still exists." }),
    key({ span: 3, tone: "white", legend: "3", title: "Files", size: "sm",
      sub: "Scheduled exports and imports. Unglamorous, entirely reliable, and often what a twenty-year-old system was designed for." }),
    key({ span: 3, tone: "violet", legend: "4", title: "The interface itself", size: "sm",
      sub: "UI automation, when there is genuinely nothing else. It is the last resort and we will say so out loud rather than quietly billing for it." }),
  ],
});

const numbers = section({
  id: "numbers", no: "02", hue: 1,
  kicker: "About the two numbers",
  h2: "60+ integrated, 44 documented. Both are true.",
  keys: [
    key({
      span: 12, tone: "navy",
      body: [
        `We have connected more than sixty systems. ${catalogTotal} of them are listed below, because those are the ones we can name — the rest are client-specific builds or legacy systems covered by an NDA.`,
        "The two figures appear next to each other on this site and they used to look like a contradiction. They are not; they count different things. If a number on any page of ours does not add up, ask — we would rather explain it than have you quietly discount everything else.",
      ],
      mascot: "blue",
    }),
  ],
});

const catalog = section({
  id: "catalog", no: "03", hue: 2,
  kicker: `${catalogTotal} systems documented`,
  h2: "The ones we can name.",
  ask: "Not on the list does not mean not possible. It usually means we have connected it and not written it down yet.",
  keys: cat.groups.map((g, i) =>
    key({
      span: 4,
      tone: i === 1 ? "turquoise" : i === 4 ? "violet" : "white",
      eyebrow: `${g.title} · ${g.systems.length}`,
      title: g.systems.join(" · "), size: "sm",
    })),
});

const rules = section({
  id: "rules", no: "04", hue: 3,
  kicker: "Three constants",
  h2: "The same three rules on every integration we build.",
  keys: [
    key({ span: 4, tone: "white",
      title: "A human approves anything sensitive.", size: "sm",
      sub: "Defined per step, named in the design document, and enforced in the code rather than in a policy nobody reads." }),
    key({ span: 4, tone: "white",
      title: "Everything lands in an audit trail.", size: "sm",
      sub: "Who or what did it, when, on which record, and what the previous value was. Written so an auditor can follow it without us in the room." }),
    key({ span: 4, tone: "turquoise",
      title: "Roles and monitoring on day one.", size: "sm",
      sub: "Not retrofitted after go-live, when it is both more expensive and less complete." }),
    key({
      span: 12, tone: "navy",
      eyebrow: "Where it runs",
      title: "Your tenant, your servers, or EU cloud — decided before we build, not after.",
      size: "sm",
      sub: "US-region hosting where a client requires it. Encryption in transit and at rest either way, with GDPR and the EU AI Act handled at design time.",
      needs: need("confirm US-region hosting is genuinely available before this goes live"),
    }),
  ],
});

const intNext = section({
  id: "next", no: "05", hue: 4,
  kicker: "Your move",
  h2: "Tell us what you run. We will tell you what is reachable.",
  keys: [
    key({ span: 4, tone: "turquoise", mascot: "wave",
      title: "Book 30 minutes.", size: "sm",
      sub: "Bring a list of your systems. We will be straight about which ones are easy, which are work, and which are not worth it.",
      go: "Book a call →", href: bookingUrl }),
    key({ span: 4, tone: "white",
      title: "See how we build agents.", size: "sm",
      sub: "What sits on top of these connections once they exist.",
      go: "How we build agents →", href: "/beta2/agents.html" }),
    key({ span: 4, tone: "white",
      title: "Or start with a routine.", size: "sm",
      sub: "Eight processes we have solved often enough to quote quickly.",
      go: "All eight routines →", href: "/beta2/#start" }),
  ],
});

const intBody = [
  pageHead({
    eyebrow: "Integrations",
    h1: "You do not have to replace anything you already run.",
    lead: "We read, verify and write where your people already work. Through the API where there is one, through the database, the files, or the interface itself where there is not — including software old enough to have no modern API at all.",
    meta: `60+ systems integrated · ${catalogTotal} documented below`,
    cta: "Tell us what you run",
    bookingUrl,
  }),
  routes, numbers, catalog, rules, intNext,
].join("\n\n");

export function writeTeamAndIntegrations() {
  writeFileSync(
    resolve(root, "beta2", "team.html"),
    page({
      title: "The team | EnterIT",
      description: "75 engineers in three permanent teams — Enter Tech, Enter Agents and Enter Studio — with a named owner for every area and one contract across all three.",
      body: teamBody, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/team.html");

  writeFileSync(
    resolve(root, "beta2", "integrations.html"),
    page({
      title: "Integrations | EnterIT",
      description: `60+ systems integrated, ${catalogTotal} documented. API, database, files or the interface itself — in that order of preference, chosen by what the system actually supports.`,
      body: intBody, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/integrations.html");
}
