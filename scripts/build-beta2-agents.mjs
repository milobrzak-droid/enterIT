/**
 * build-beta2-agents.mjs — /beta2/agents.html, how we build AI agents.
 *
 * The Czech original is the best page on the site: it draws the one distinction
 * a technical buyer actually cares about — automation is a fixed track, an agent
 * is a goal plus judgment — and then earns it by listing the eight things that
 * have to be defined before an agent is trustworthy. Nothing of that is lost
 * here; it is re-voiced for a US reader and moved onto the keycap board.
 *
 * The section a sceptical reader reaches for is "what an agent never does". It
 * is deliberately not buried at the bottom.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { key, page, pageHead, section } from "./beta2-page.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* The distinction the whole page rests on. */
const difference = section({
  id: "difference", no: "01", hue: 0,
  kicker: "The distinction that matters",
  h2: "An agent is not a bigger automation.",
  ask: "If you take one thing from this page, take this. The two are priced differently, fail differently and are operated differently, and a supplier who blurs them will sell you the wrong one.",
  keys: [
    key({
      span: 6, tone: "white", legend: "A",
      eyebrow: "Automation", title: "A fixed track.", size: "big",
      sub: "A defined procedure handles predictable input reliably and cheaply. It is the right answer far more often than people expect. It stalls the moment something arrives that nobody described in advance, which is why every automation we ship has an exception queue with a person at the end of it.",
      rule: "Cheap, fast, low risk. Breaks visibly rather than quietly.",
    }),
    key({
      span: 6, tone: "turquoise", legend: "B",
      eyebrow: "Agent", title: "A goal, plus judgment.", size: "big",
      sub: "Give it a goal, a boundary and a set of tools, and it decides which steps to take. Ask it to create ERP line items and it can read two orders written differently, because it is working from content rather than from format.",
      rule: "More capable, more engineering around it, and it needs governing.",
      mascot: "blue",
    }),
    key({
      span: 12, tone: "navy",
      title: "Why this matters before you buy either one.",
      size: "sm",
      body: [
        "Agents take on the document-heavy routine that used to need a human to interpret it — which is exactly where time and know-how leak out of a company today. That makes them valuable and it makes them risky in the same breath.",
        "It is not magic; it is engineering. What separates an agent that runs for two years from one that demos well in March and is switched off in June is whether the eight things in the next section were defined before anyone wrote code.",
      ],
    }),
  ],
});

/* The eight components. This is the page's spine. */
const parts = [
  ["Role — and the explicit non-role", "We map the process, then write down what the agent does and, just as carefully, what it does not. The boundary is the reliability."],
  ["Input and output at every step", "Every PDF, email or query has a defined output: ERP rows, a draft reply, an import file. That is what makes the result testable rather than impressive."],
  ["Guardrails — may and may not", "What it may do alone, and where it has to stop and wait. This is what makes access to a live system something you can sign off on."],
  ["Tools — the agent's hands", "ERP, SharePoint, Microsoft 365, CRM, PDM and CAD, email, WhatsApp, connected through APIs where they exist and through the interface where they do not."],
  ["Memory and retrieval", "Company documents consolidated, scans run through OCR, and answers drawn only from approved context — always with the source attached."],
  ["Human-in-the-loop", "The agent recommends and prepares. A person approves. We define each handover point by name, not by principle."],
  ["Metrics", "Errors, response time, work returned and adoption, all measured against the baseline we took before building. An agent nobody measures is an agent nobody can defend."],
  ["Governance and security", "Ownership, access and AI-use rules designed at the start. Sensitive workloads can run entirely on your own infrastructure."],
];

const anatomy = section({
  id: "anatomy", no: "02", hue: 1,
  kicker: "What a reliable agent is made of",
  h2: "Eight things, defined before a line of code.",
  ask: "An agent is a system of defined parts, not one clever model. Each of these is load-bearing: drop one and the agent works in the demo and fails in the third month.",
  keys: [
    ...parts.map(([title, sub], i) =>
      key({
        span: 3, tone: i === 0 ? "turquoise" : i === 5 ? "violet" : "white",
        legend: String(i + 1), title, size: "sm", sub,
      })),
    key({
      span: 12, tone: "navy", legend: "!",
      eyebrow: "The limits, stated plainly",
      title: "What an agent never does.", size: "big",
      list: [
        "It does not send anything outside the company without approval.",
        "It does not delete data.",
        "It does not make financial decisions.",
        "It does not decide anything with legal exposure — pricing, credit, hiring. It prepares the case; a person signs it.",
        "And your data is not used to train a model for anyone else, contractually on our side and on the model vendor's.",
      ],
      mascot: "red",
    }),
  ],
});

/* The six kinds we have actually shipped. */
const kinds = [
  ["Extraction", "Turns drawings, bills of materials, invoices and contracts into structured data.", "turquoise"],
  ["Email", "Pulls order lines out of free-form messages into the ERP and drafts replies to recurring queries.", "white"],
  ["Knowledge", "Answers from your own documentation and cites the source document. It does not answer from memory.", "blue"],
  ["Process", "Turns meeting notes and tickets into tasks, owners and escalations a team can actually run.", "white"],
  ["Reporting", "Answers plain-language questions against the ERP or the warehouse.", "violet"],
  ["Communication", "Handles web, WhatsApp and inbox traffic around the clock, and hands off to a human cleanly.", "white"],
];

const types = section({
  id: "types", no: "03", hue: 2,
  kicker: "What we have shipped",
  h2: "Six kinds of agent, all of them in production somewhere.",
  ask: "These are not a product menu. Each one exists because a client had the problem first. We pick the model and the tooling per task and per data sensitivity, not per fashion.",
  keys: kinds.map(([title, sub, tone]) =>
    key({ span: 4, tone, title: `${title} agents`, size: "sm", sub })),
});

const stack = section({
  id: "stack", no: "04", hue: 3,
  kicker: "Under the hood",
  h2: "Your tenant, your rules.",
  keys: [
    key({
      span: 3, tone: "white", eyebrow: "Models", size: "sm",
      title: "Claude, GPT, Gemini — or Llama and Mistral on your own hardware.",
      sub: "Chosen for the task and for how sensitive the data is. When it cannot leave the building, it does not leave the building.",
    }),
    key({
      span: 3, tone: "white", eyebrow: "Orchestration", size: "sm",
      title: "n8n, Make or Power Automate.",
      sub: "Matched to the stack your own people will maintain after we hand over, not to what we happen to like.",
    }),
    key({
      span: 3, tone: "white", eyebrow: "Integrations", size: "sm",
      title: "SAP, Business Central, Helios, K2, Pohoda and the rest.",
      sub: "Official APIs where they exist. Database, files or the interface itself where they do not.",
    }),
    key({
      span: 3, tone: "turquoise", eyebrow: "Where it runs", size: "sm",
      title: "Your Azure or M365 tenant, your server, or EU cloud.",
      sub: "GDPR and the EU AI Act designed in at the start rather than argued about at go-live.",
    }),
  ],
});

const trust = section({
  id: "trust", no: "05", hue: 4,
  kicker: "The hard part",
  h2: "A trustworthy agent knows when it does not know.",
  keys: [
    key({
      span: 8, tone: "navy",
      body: [
        "The engineering that matters is not making an agent capable. It is drawing the line where its confidence runs out and the decision goes back to a person — and drawing it before deployment, not after the first bad week.",
        "In practice that means the agent reads the fields it can read reliably and refuses the ones it cannot. On one machine-shop engagement it reads the title block and the parts list and leaves ambiguous dimensions to the process engineer by design, because a wrong dimension costs more than the time it saves.",
        "It also means we will tell you when the answer is an automation, or no software at all. That conversation happens in stage two, before there is a budget to defend.",
      ],
      mascot: "wave",
    }),
    key({
      span: 4, tone: "turquoise",
      eyebrow: "Next", title: "See the same discipline applied to automation.",
      size: "sm",
      sub: "Fixed-track work, the five layers we cover, and where we stop.",
      go: "How we build automation →", href: "/beta2/automation.html",
    }),
  ],
});

const body = [
  pageHead({
    code: "en", ui: ui.en,
    eyebrow: "How we do it",
    h1: "An agent is a colleague with a written job description.",
    lead: "We build agents that read documents, act inside stated rules, and hand every judgment call to a person. This page is how we define the role, the inputs, the outputs and the guardrails — because that definition, not the model, is what decides whether it is still running next year.",
    meta: "Roughly a six-minute read · written for a technical reader",
    cta: "Talk through an agent you have in mind",
    bookingUrl,
  }),
  difference, anatomy, types, stack, trust,
].join("\n\n");

export function writeAgents() {
  writeFileSync(
    resolve(root, "beta2", "agents.html"),
    page({
      code: "en", ui: ui.en,
      title: "How we build AI agents | EnterIT",
      description: "An agent is a goal plus judgment, not a bigger automation. The eight things we define before writing code, the six kinds we run in production, and what an agent never does.",
      body, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/agents.html");
}
