/**
 * build-beta2-engage.mjs — /beta2/engagement.html, /beta2/company-2030.html,
 * /beta2/calculator.html.
 *
 * Engagement is the page an IT-company owner reads first and the one the old
 * site did not have at all. Commercial models, SLA, who owns the code, what
 * happens at the exit, and the four practical questions a US buyer asks before
 * any technical one. Everything still unconfirmed carries a marker rather than
 * a confident sentence.
 *
 * Company 2030 is the self-check. Its value is the honest read, so the levels
 * are written with the sentence you would actually hear in that company rather
 * than with a maturity label nobody recognizes themselves in.
 *
 * The calculator is deliberately blunt. It runs entirely in the page, asks for
 * no email, and says on its face that it is an order of magnitude and not a
 * quote — a calculator that oversells is worse than no calculator.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { e, key, need, page, pageHead, section } from "./beta2-page.mjs";
import { bookingUrl } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { us } from "./beta2-us-copy.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* -------------------------------------------------------- Engagement ---- */

const models = section({
  id: "models", no: "01", hue: 0,
  kicker: "Four commercial models",
  h2: "Pick the one that matches how much you want to hand over.",
  ask: "They are not tiers and there is no upsell path built into them. Most clients start with the second and move to whichever of the other three fits what they learned.",
  keys: us.engage.cards.map((c, i) =>
    key({
      span: 3, tone: i === 1 ? "turquoise" : i === 2 ? "navy" : "white",
      legend: String(i + 1), title: c.title, size: "sm", sub: c.body,
      needs: c.need,
    })),
});

const money = section({
  id: "money", no: "02", hue: 1,
  kicker: "What it costs",
  h2: "The number you came here for.",
  keys: [
    key({
      span: 8, tone: "white",
      body: [
        "A buyer who cannot find even an order of magnitude usually leaves rather than asking, so we would rather publish a range than look coy. Time to a working pilot is 4 to 7 weeks from kickoff.",
        "What moves the number: how many systems have to be reached, whether they have APIs, how clean the master data is, and how many exception paths the process really has. The discovery phase exists to answer exactly those four before anyone commits to a build.",
      ],
      needs: need("typical first-engagement range in USD, and the fixed discovery fee — both are blocking for this page"),
    }),
    key({
      span: 4, tone: "turquoise", mascot: "wave",
      title: "Size it yourself first.", size: "sm",
      sub: "Four inputs, an order-of-magnitude estimate, no email required.",
      go: "Open the calculator →", href: "/beta2/calculator.html",
    }),
  ],
});

const guarantees = section({
  id: "guarantees", no: "03", hue: 2,
  kicker: "How you are protected",
  h2: "We plan the ending at the beginning.",
  ask: "This is the part most suppliers leave for the contract review, by which point the leverage has moved. It is easier to read it now.",
  keys: us.safe.cards.map((c, i) =>
    key({
      span: 4, tone: i === 0 ? "turquoise" : i === 2 ? "navy" : "white",
      eyebrow: c.tag, title: c.title, size: "sm", sub: c.body, needs: c.need,
    })),
});

const atlantic = section({
  id: "atlantic", no: "04", hue: 3,
  kicker: "Across the Atlantic",
  h2: "The practical questions, answered up front.",
  raw: `      <div class="key key--white panel" style="grid-column:span 12">
${us.atlantic.items.map((x) => `        <div class="qa"><b>${e(x.q)}</b><p>${e(x.a)}</p>${x.need ? `<span class="needs"><b>Needs data</b>${e(x.need.__need)}</span>` : ""}</div>`).join("\n")}
      </div>`,
});

const limits = section({
  id: "limits", no: "05", hue: 4,
  kicker: "Boundaries",
  h2: "Things we will turn down.",
  ask: "The cheapest credibility on this site. A supplier who says yes to everything is telling you where their limit is anyway — just later, and at your expense.",
  keys: [
    key({
      span: 12, tone: "navy",
      body: us.limits.items,
      mascot: "red",
    }),
  ],
});

const engageBody = [
  pageHead({
    eyebrow: "Engagement",
    h1: "How this is actually bought.",
    lead: "Four commercial models, what happens to the code, who is on the hook once it is live, and what a US client needs to know about working with a team six hours ahead. If you run an IT company yourself, this is the page to read first.",
    meta: "Fixed-scope · Discovery · Dedicated team · Run and evolve",
    cta: "Talk through the right model",
    bookingUrl,
  }),
  models, money, guarantees, atlantic, limits,
].join("\n\n");

/* ------------------------------------------------------ Company 2030 ---- */

const levels = [
  ["Manual operation", "Data gets retyped between systems and the knowledge lives in people's heads and inboxes.", "“That is something only one person in accounting knows.”", "Start with a single routine that has a clear owner. Attendance or invoices are usually the shortest path to a measured result."],
  ["Licenses bought, impact never measured", "The AI licenses exist. Regular use and measured adoption do not.", "“We are paying for it, but we do not know whether it pays off.”", "Take a baseline before doing anything else. Without one, nothing that follows can be defended in a budget meeting."],
  ["People ready, first agents in production", "Role-based adoption and the first agents in production, delivering measured hours, with people approving the high-impact actions.", "“We can finally see it in the numbers.”", "Widen from one process to the ones next to it, and put the governance model in writing before the count grows."],
  ["Connected agent workflows", "Order, warehouse and invoicing agents pass work between them; people review the exceptions. One energy client runs nine agents this way.", "“The agents pass work around on their own. We just approve the exceptions.”", "Move the monitoring and the metrics into one place. At this level the risk stops being capability and starts being oversight."],
  ["A company running on the loop", "The agentic layer is core operations. Sensitive data and learned procedures stay inside; anything external follows explicit rules.", "“We add a new process to the loop in days, not quarters.”", "This is the 2030 position. Nobody we work with is fully here yet, and any supplier who tells you their client is should be asked for the audit trail."],
];

const pace = section({
  id: "pace", no: "01", hue: 0,
  kicker: "Why the question is worth asking now",
  h2: "Four numbers, none of them ours.",
  ask: "We cite these because they are independent. The last one is the one worth sitting with.",
  keys: [
    key({ span: 3, tone: "white", stat: "×2", statLabel: "every ~7 months — the length of task AI can complete on its own", meta: "METR, 2025–26" }),
    key({ span: 3, tone: "white", stat: "280×", statLabel: "fall in the cost of GPT-3.5-level performance in two years", meta: "Stanford AI Index, 2025" }),
    key({ span: 3, tone: "white", stat: "22%", statLabel: "of jobs reshuffled by 2030", meta: "World Economic Forum, 2025" }),
    key({ span: 3, tone: "red", stat: "95%", statLabel: "of generative-AI pilots show no measurable profit impact", meta: "MIT, 2025" }),
    key({
      span: 12, tone: "navy",
      title: "That last number is the reason we start every engagement with a baseline, an owner and a defined benefit.",
      size: "big",
      sub: "The pilots in that 95% did not fail on the technology. They failed on method, ownership and measurement — three things that cost nothing to fix at the start and cannot be fixed at the end.",
      mascot: "wave",
    }),
  ],
});

const ladder = section({
  id: "levels", no: "02", hue: 1,
  kicker: "Five levels",
  h2: "Find the sentence you actually hear in your company.",
  ask: "Most companies are at level 1 or 2, which is also where progress is fastest. Read the quoted line rather than the label — it is the more honest test.",
  keys: levels.map(([title, body, tell, step], i) =>
    key({
      span: i === 4 ? 12 : 3,
      tone: i === 4 ? "turquoise" : i === 2 ? "violet" : "white",
      legend: String(i + 1), title, size: "sm", sub: body,
      rule: tell,
      meta: `Next step — ${step}`,
    })),
});

const c2030Body = [
  pageHead({
    eyebrow: "Company 2030 · self-check",
    h1: "Where is your company on the agentic road?",
    lead: "Five levels, the sentence you would actually hear at each one, and the single practical step that moves you to the next. It takes about two minutes and there is no form at the end.",
    meta: "No email required · read the quoted line, not the label",
    cta: "Talk through your level",
    bookingUrl,
  }),
  pace, ladder,
].join("\n\n");

/* -------------------------------------------------------- Calculator ---- */

const calc = restorationContent.en.calculator;
const f = calc.fields;

const field = (id, x) => `        <label class="calc-field" for="c-${id}">
          <span class="calc-label">${e(x.label)}<b id="c-${id}-out">${x.defaultValue}</b></span>
          <input id="c-${id}" type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.defaultValue}">
          <span class="calc-hint">${e(x.hint)}</span>
        </label>`;

const calcSection = section({
  id: "calc", no: "01", hue: 0,
  kicker: "Savings calculator",
  h2: "Four inputs. One order of magnitude.",
  ask: "Deliberately rough. It exists to tell you whether this is a five-figure conversation or a six-figure one, and nothing more precise than that should be trusted before we have seen your data.",
  raw: `      <div class="key key--white calc" style="grid-column:span 7">
${field("people", f.people)}
${field("hours", f.hours)}
${field("rate", f.rate)}
${field("share", f.share)}
      </div>
      <div class="key key--turquoise calc-out" style="grid-column:span 5">
        <span class="key-eyebrow">${e(calc.results.annualSavings)}</span>
        <span class="calc-big" id="c-out-money">—</span>
        <span class="key-meta">${e(calc.results.annualSavingsHint)}</span>
        <div class="strip strip--in">
          <span class="stat"><b id="c-out-hours">—</b>${e(calc.results.hoursSaved)}</span>
          <span class="stat"><b id="c-out-fte">—</b>${e(calc.results.fteFreed)}</span>
        </div>
        <p class="key-meta key-meta--rule">${e(calc.disclaimer)}</p>
        <a class="key-go" href="${bookingUrl}" target="_blank" rel="noopener">${e(calc.results.cta)} →</a>
      </div>`,
});

const calcAfter = section({
  id: "after", no: "02", hue: 1,
  kicker: "What happens to this number",
  h2: "We replace it with a real one in the first two weeks.",
  keys: [
    key({
      span: 8, tone: "navy",
      body: [
        "Stage one exists to turn this estimate into a measurement: how much work there actually is, how many exceptions the process really has, and what the current way of doing it costs including the part nobody counts, which is senior people doing junior work.",
        "Sometimes that measurement kills the project. That has happened, and it is cheaper for both of us in week two than in month six.",
      ],
      mascot: "blue",
    }),
    key({
      span: 4, tone: "white",
      title: "See the four stages.", size: "sm",
      sub: "Each one ends with a deliverable, a decision point and an owner.",
      go: "How we work →", href: "/beta2/#work",
    }),
  ],
});

const calcBody = [
  pageHead({
    eyebrow: "Savings calculator",
    h1: "What is the routine costing you today?",
    lead: "Move four sliders and get an order-of-magnitude estimate of what repetitive work costs your company each year. It runs entirely in this page — nothing is sent anywhere and there is no form.",
    meta: `Based on ${calc.weeksPerYear} working weeks and ${calc.fteHoursPerYear} hours per FTE per year`,
    bookingUrl,
  }),
  calcSection, calcAfter,
].join("\n\n");

const calcScript = `
<script>
/* Runs in the page, sends nothing anywhere. The rounding is deliberately coarse:
   this is an order of magnitude, and a figure like 47,318 would imply a
   precision the inputs cannot support. */
(function(){
  var ids = ["people","hours","rate","share"];
  var els = {};
  ids.forEach(function(id){
    els[id] = document.getElementById("c-" + id);
    els[id].addEventListener("input", run);
  });
  /* Namespaced: the sliders already own c-hours, and an id collision here
     silently pointed the result at the input. */
  var money = document.getElementById("c-out-money");
  var hoursOut = document.getElementById("c-out-hours");
  var fteOut = document.getElementById("c-out-fte");
  var fmt = new Intl.NumberFormat("${calc.currency.locale}", {
    style: "currency", currency: "${calc.currency.code}", maximumFractionDigits: 0
  });
  function round(n){
    if (n >= 100000) return Math.round(n / 10000) * 10000;
    if (n >= 10000) return Math.round(n / 1000) * 1000;
    return Math.round(n / 100) * 100;
  }
  function run(){
    var v = {};
    ids.forEach(function(id){
      v[id] = parseFloat(els[id].value);
      document.getElementById("c-" + id + "-out").textContent =
        id === "share" ? v[id] + "%" : id === "rate" ? "${calc.currency.symbol}" + v[id] : v[id];
    });
    var hours = v.people * v.hours * ${calc.weeksPerYear} * (v.share / 100);
    money.textContent = fmt.format(round(hours * v.rate));
    hoursOut.textContent = Math.round(hours / 10) * 10;
    fteOut.textContent = (hours / ${calc.fteHoursPerYear}).toFixed(1);
  }
  run();
})();
<\/script>`;

export function writeEngagement() {
  writeFileSync(
    resolve(root, "beta2", "engagement.html"),
    page({
      title: "How we engage | EnterIT",
      description: "Four commercial models, who owns the code, what happens at the exit, and the practical questions a US client asks before any technical one.",
      body: engageBody, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/engagement.html");

  writeFileSync(
    resolve(root, "beta2", "company-2030.html"),
    page({
      title: "Company 2030 · self-check | EnterIT",
      description: "Five maturity levels on the agentic road, the sentence you would actually hear at each, and the one practical step to the next.",
      body: c2030Body, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/company-2030.html");

  writeFileSync(
    resolve(root, "beta2", "calculator.html"),
    page({
      title: "Savings calculator | EnterIT",
      description: "Four sliders and an order-of-magnitude estimate of what routine work costs your company each year. Runs in the page; no email required.",
      body: calcBody + calcScript, bookingUrl,
    }),
    "utf8",
  );
  console.log("beta2/calculator.html");
}
