/**
 * build-beta2-automation.mjs — /beta2/automation.html.
 *
 * The companion to the agents page, and the one most readers should act on
 * first. It opens with four situations taken from real engagements rather than
 * with a definition, because a reader recognizes their own back office faster
 * than they recognize a category.
 *
 * The Helios machine-shop walkthrough at the end is the most useful thing on the
 * page: it is the only place on the whole site where a reader can see what an
 * engagement actually looked like week by week, including the part where we
 * audited ten drawings before quoting.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { key, need, page, pageHead, section } from "./beta2-page.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Four situations, all from real engagements. Recognition before definition. */
const symptoms = [
  ["The order arrives by email and someone retypes it",
   "A wholesaler's back office entered orders and attendance by hand, line by line. Every entry was work nobody needed to do and a chance to get a digit wrong.", "turquoise"],
  ["A process engineer spends hours creating near-identical items",
   "A machine shop created 15 to 25 assemblies — 70 to 120 Helios items — every week from drawings, applying the same standards each time.", "white"],
  ["A salesperson clicks through exports to find a price",
   "Sales searched K2 and Excel for the right combination of dimension, material and colour, quoting from data that might already be stale.", "violet"],
  ["Management signs off but cannot prove who read it",
   "Contract approvals ran through email with no audit trail, so nobody could show afterwards who had reviewed which version.", "white"],
];

const problem = section({
  id: "problem", no: "01", hue: 0,
  kicker: "Where it hurts",
  h2: "Repetitive work does not just cost hours. It costs capacity.",
  ask: "These four are from real engagements. If one of them sounds like your own back office, that is the conversation to have — the impact is measurable in hours and in money, and we measure it before we quote.",
  keys: symptoms.map(([title, sub, tone]) =>
    key({ span: 3, tone, title, size: "sm", sub })),
});

/* The five layers. */
const layers = [
  ["Transactional", "Data that gets retyped", "Pull attachments apart, sync CRM and ERP, create records, generate quotes — including the whole email-to-order path."],
  ["Knowledge", "Answers buried in documents", "Ask a question across PDFs, spreadsheets and drawings in plain language and get the answer with the source attached."],
  ["Reporting", "Numbers people are waiting on", "ERP and warehouse data assembled into one view without somebody rebuilding it by hand every Monday."],
  ["Communication", "Questions that keep coming back", "Recurring web, email and WhatsApp traffic handled around the clock, with only the exceptions escalated."],
  ["Monitoring", "Deadlines and deviations that slip", "Catch a slipping date or an out-of-range value early, and leave the decision about it to a person."],
];

const scope = section({
  id: "scope", no: "02", hue: 1,
  kicker: "The five layers",
  h2: "Five kinds of bottleneck, and they are usually not the ones people name first.",
  ask: "Most companies ask us about the transactional layer because it is the visible one. The knowledge and monitoring layers are where the quieter money is.",
  keys: layers.map(([title, strap, sub], i) =>
    key({
      span: i === 0 ? 4 : i === 1 ? 4 : i === 2 ? 4 : 6,
      tone: i === 0 ? "turquoise" : i === 3 ? "blue" : "white",
      legend: String(i + 1), eyebrow: strap, title, size: "sm", sub,
    })),
});

/* Four phases with the decision points named. */
const phases = [
  ["Analysis", "Measure today", "We map inputs, handoffs and duplicated work, then set a baseline for time, cost and quality. Without that number, nobody can tell in month nine whether it worked.", "1 to 2 weeks"],
  ["Pilot", "Prove it on real data", "A live prototype runs against your actual documents. On one machine-shop engagement we audited five to ten real drawings before quoting, because the layout of a title block changes both the reliability and the price.", "2 to 3 weeks"],
  ["Implementation", "Connect systems and roles", "Existing systems, data, approvals and decision points wired together so the thing becomes part of the working day rather than a tool somebody has to remember to open.", "1 to 2 weeks"],
  ["Support", "Run it, measure it, tune it", "We operate and keep improving it after launch. One K2 engagement ran with two years of hosting and a source-code buyout option written in from the start.", "ongoing"],
];

const how = section({
  id: "how", no: "03", hue: 2,
  kicker: "Four phases",
  h2: "Each phase ends where you could walk away.",
  ask: "The order is deliberate. We spend the first two weeks finding out whether this is worth doing at all, and we have told clients it is not.",
  keys: phases.map(([tag, title, sub, time], i) =>
    key({
      span: 3, tone: i === 3 ? "turquoise" : "white", legend: String(i + 1),
      eyebrow: `${tag} · ${time}`, title, size: "sm", sub,
    })),
});

/* Where the machine stops. The credibility section. */
const boundary = section({
  id: "boundary", no: "04", hue: 3,
  kicker: "Where it stops",
  h2: "Knowing what not to automate is most of the skill.",
  ask: "Reliability comes from the line, not from the coverage. Four places where we deliberately leave the work with a person.",
  keys: [
    key({
      span: 6, tone: "white",
      title: "We exclude unreliable machine reading.", size: "sm",
      sub: "On complex drawings, OCR reads the title block and the bill of materials — the fields that are dependable. Ambiguous dimensions are not read at all, because a wrong dimension costs more than the minute it saves.",
    }),
    key({
      span: 6, tone: "turquoise",
      title: "What only a person can see stays with a person.", size: "sm",
      sub: "An engineer enters sheet thickness or bend count in a short dialog; the verified figure then builds the ERP structure. The machine does the typing, the human does the seeing.",
    }),
    key({
      span: 6, tone: "violet",
      title: "The system records. The person signs.", size: "sm",
      sub: "A contract workflow logs who reviewed what and when, and produces the audit trail. The signature itself stays human, every time.",
    }),
    key({
      span: 6, tone: "white",
      title: "It flags. It does not decide.", size: "sm",
      sub: "The monitoring layer raises a deviation. What happens next is somebody's call, and that somebody has a name in the design document.",
    }),
    key({
      span: 12, tone: "navy",
      eyebrow: "And one that is about us, not the software",
      title: "Realism is part of the contract.", size: "sm",
      sub: "Plans account for ERP data arriving late, for holidays, and for the client-side dependencies that always exist. We would rather quote a date we can hold than the date that wins the meeting.",
      mascot: "red",
    }),
  ],
});

/* The walkthrough. The most useful thing on the page. */
const walkthrough = section({
  id: "walkthrough", no: "05", hue: 4,
  kicker: "One engagement, end to end",
  h2: "A machine shop, and the agent that stopped the retyping.",
  ask: "The clearest way to explain how we work is to show one engagement in order, including the week we spent finding out whether it was possible at all.",
  keys: [
    key({
      span: 4, tone: "white", legend: "1",
      eyebrow: "Starting point", title: "Hours of routine, every day.", size: "sm",
      sub: "One process engineer manually created 15 to 25 assemblies — 70 to 120 Helios items — each week from PDF, DWG and DXF files, applying the same standards every time.",
    }),
    key({
      span: 4, tone: "turquoise", legend: "2",
      eyebrow: "Before quoting", title: "We audited ten real drawings first.", size: "sm",
      sub: "Title-block layout decides what can be read reliably, and therefore what the work costs. We would rather spend a week finding that out than quote a number we would have to revise.",
    }),
    key({
      span: 4, tone: "white", legend: "3",
      eyebrow: "What it does now", title: "Reads, matches, builds the structure.", size: "sm",
      sub: "The agent reads title blocks and parts lists, finds similar existing items, and builds the component structure with process steps and time standards attached.",
    }),
    key({
      span: 8, tone: "navy", legend: "4",
      eyebrow: "Where it stops", title: "The engineer reviews and decides instead of typing.", size: "big",
      sub: "Dimensions that need judgment were left with the process engineer on purpose. The rollout was staged rather than switched on, so each step could be checked against the old way before the next one started.",
      meta: "Helios API · PDF, DWG and DXF parsing · OCR · staged rollout",
      needs: need("hours returned on this engagement — the one number this walkthrough is missing"),
    }),
    key({
      span: 4, tone: "turquoise",
      eyebrow: "Next", title: "The same discipline, applied to agents.", size: "sm",
      sub: "Where a fixed track is not enough and the work needs judgment.",
      go: "How we build agents →", href: "/beta2/agents.html",
    }),
  ],
});

const foundation = section({
  id: "foundation", no: "06", hue: 5,
  kicker: "Three constants",
  h2: "Your systems, security in the design, and a number at the end.",
  keys: [
    key({
      span: 4, tone: "white", title: "We build on what you already run.", size: "sm",
      sub: "K2, Helios, Business Central, SharePoint, Microsoft 365, your accounting package, PDM and CAD, email and WhatsApp — connected through whichever orchestration layer your own people will be able to maintain.",
    }),
    key({
      span: 4, tone: "white", title: "Security starts in the design.", size: "sm",
      sub: "Encrypted data, GDPR controls, an on-premises option, and stated rules for AI use. That is what makes regulated and sensitive work possible rather than a special case.",
    }),
    key({
      span: 4, tone: "turquoise", title: "Every solution has a business case.", size: "sm",
      sub: "Time, transaction cost, quality, errors and capacity, measured against the baseline from phase one. Typical payback is 3 to 12 months.",
    }),
  ],
});

const body = [
  pageHead({
    code: "en", ui: ui.en,
    eyebrow: "How we do it",
    h1: "Automation that removes repetitive work, not people.",
    lead: "Retyping orders, hunting through price lists, filling the same form twice — that is machine work. We automate the processes and systems you actually have, and leave judgment and control where they belong.",
    meta: "Roughly a five-minute read · start here if you are not sure where to start",
    cta: "Tell us which process hurts",
    bookingUrl,
  }),
  problem, scope, how, boundary, walkthrough, foundation,
].join("\n\n");

export function writeAutomation() {
  writeFileSync(
    resolve(root, "beta2", "automation.html"),
    page({
      code: "en", ui: ui.en,
      title: "How we build automation | EnterIT",
      description: "Five kinds of operational bottleneck, four phases each ending in a decision you can walk away from, and the places we deliberately leave the work with a person.",
      body, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/automation.html");
}
