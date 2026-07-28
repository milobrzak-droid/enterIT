/**
 * build-beta2-routines.mjs — /beta2/routines/*.html, one page per routine.
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

import { e, key, page, pageHead, section } from "./beta2-page.mjs";
import { routineTones, routines } from "./beta2-routines.mjs";
import { bookingUrl } from "./homepage-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function renderRoutine(r, i) {
  const tone = routineTones[i];
  const others = routines
    .filter((x) => x.slug !== r.slug)
    .map((x, j) => key({
      span: 3, tone: j % 3 === 0 ? "white" : "white",
      title: x.tag, size: "sm", sub: x.lead,
      go: `${x.stat} ${x.statLabel} →`, href: `/beta2/routines/${x.slug}.html`,
    }));

  const pain = section({
    id: "pain", no: "01", hue: 0,
    kicker: "Where the time goes",
    h2: "What this looks like today.",
    ask: "If none of these three is familiar, this is probably not your first project — and we would rather tell you that than sell you one.",
    keys: r.pain.map((p, j) =>
      key({ span: 4, tone: j === 0 ? tone : "white", legend: String(j + 1), title: p, size: "sm" })),
  });

  const flow = section({
    id: "flow", no: "02", hue: 1,
    kicker: "Step by step",
    h2: "How it runs, with the human points named.",
    ask: "Nothing here happens off-screen. Every step has a defined output, and the places a person decides are written down before anything is built.",
    keys: r.flow.map(([title, sub], j) =>
      key({
        span: r.flow.length > 6 && j >= 4 ? 4 : 3,
        tone: j === r.flow.length - 1 ? "navy" : "white",
        legend: String(j + 1), title, size: "sm", sub,
      })),
  });

  const never = section({
    id: "never", no: "03", hue: 2,
    kicker: "The limits",
    h2: "What it never does on its own.",
    ask: "This is the part worth reading twice. A system that is allowed to do everything is a system nobody can sign off on.",
    keys: [
      ...r.never.map((n, j) =>
        key({ span: 4, tone: j === 1 ? tone : "white", legend: "✕", title: n, size: "sm" })),
      key({
        span: 12, tone: "navy",
        eyebrow: "And where it runs",
        title: "Your infrastructure or EU cloud. Your call, made before we build.",
        size: "sm",
        list: [
          "Encrypted in transit and at rest, with on-premises operation available for sensitive data.",
          "GDPR and EU AI Act controls designed in at the start.",
          "Role-based access, approval steps and a complete audit trail.",
        ],
        mascot: "blue",
      }),
    ],
  });

  const setup = section({
    id: "setup", no: "04", hue: 3,
    kicker: "What we need from you",
    h2: "Three things, and none of them is a project.",
    ask: "The most common reason a pilot slips is waiting on access. This is the whole list.",
    keys: [
      ...r.need.map((n, j) =>
        key({ span: 4, tone: "white", legend: String(j + 1), title: n, size: "sm" })),
      key({
        span: 12, tone: tone,
        eyebrow: "What to expect",
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
    kicker: "The objections people actually raise",
    h2: "Answered plainly.",
    raw: `      <div class="key key--white panel" style="grid-column:span 12">
${r.faq.map(([q, a]) => `        <div class="qa"><b>${e(q)}</b><p>${e(a)}</p></div>`).join("\n")}
      </div>`,
  });

  const next = section({
    id: "next", no: "06", hue: 5,
    kicker: "Your move",
    h2: "Thirty minutes is enough to size this.",
    ask: "We map the process, estimate what it costs you today and tell you whether it is worth automating. You will get an answer either way.",
    keys: [
      key({
        span: 4, tone: "turquoise", mascot: "wave",
        title: "Book 30 minutes.", size: "sm",
        sub: "milo@enterit.cz · +420 608 969 263",
        go: "Book a call →", href: bookingUrl,
      }),
      key({
        span: 4, tone: "white",
        title: "Or size it yourself first.", size: "sm",
        sub: "Four inputs and an order-of-magnitude estimate of what this routine costs you today.",
        go: "Open the calculator →", href: "/beta2/#next",
      }),
      key({
        span: 4, tone: "white",
        title: "Not sure this is the right one?", size: "sm",
        sub: "The other seven are below, and most conversations start with whichever one hurts most.",
        go: "All eight routines →", href: "/beta2/#start",
      }),
    ],
  });

  const more = section({
    id: "more", no: "07", hue: 0,
    kicker: "The other seven",
    h2: "Same approach, different process.",
    keys: others,
  });

  return page({
    title: `${r.tag}: ${r.h1} | EnterIT`,
    description: r.lead,
    bookingUrl,
    body: [
      pageHead({
        eyebrow: `Ready-made solutions · ${r.tag}`,
        h1: r.h1,
        lead: r.lead,
        meta: `${r.flowIn}  →  ${r.flowOut}   ·   ${r.stat} ${r.statLabel}`,
        cta: "Talk through your version of this",
        bookingUrl,
      }),
      pain, flow, never, setup, faq, next, more,
    ].join("\n\n"),
  });
}

export function writeRoutines() {
  mkdirSync(resolve(root, "beta2", "routines"), { recursive: true });
  routines.forEach((r, i) => {
    writeFileSync(resolve(root, "beta2", "routines", `${r.slug}.html`), renderRoutine(r, i), "utf8");
  });
  console.log(`beta2/routines/*.html  (${routines.length} pages)`);
}
