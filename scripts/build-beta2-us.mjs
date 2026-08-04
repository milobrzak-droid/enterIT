/**
 * build-beta2-us.mjs — renders the English board at /beta2/ for a US buyer.
 *
 * The other three locales still build from build-beta2.mjs on the older
 * eight-chapter structure; this one implements the copy deck of 28 July 2026 as
 * fourteen sections. They are deliberately separate: the English page is the one
 * under review, and translating a structure that is still moving would mean
 * translating it twice.
 *
 * Everything the deck marked as unverified renders as a visible marker rather
 * than as prose. Nothing on this page is typeset as fact unless it is one —
 * including client names, which stay behind a marker until there is written
 * consent to use them on a public page aimed at the US market.
 *
 * Run: node scripts/build-beta2.mjs   (which calls this)
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { us } from "./beta2-us-copy.mjs";
import { bookingUrl } from "./homepage-content.mjs";
import { escapeHtml } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const e = (v) => escapeHtml(v ?? "");

const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

const mascot = {
  wave: "/assets/decor/mascot-wave.svg",
  blue: "/assets/decor/mascot-blue.svg",
  red: "/assets/decor/mascot-red.svg",
};

/** A fact we do not have yet, printed where it will be missed. */
const nd = (n) => (n ? `<span class="needs"><b>${e(us.needLabel)}</b>${e(n.__need)}</span>` : "");

/** Section shell: number, eyebrow, headline, and whatever answers it. */
function section({ id, no, eyebrow, h2, intro, hue, body }) {
  return `  <section class="chap" id="${id}" data-hue="${hue}">
    <div class="chap-head">
      <span class="chap-no">${e(no)}</span>
      <div>
        <span class="chap-kicker">${e(eyebrow)}</span>
        <h2>${e(h2)}</h2>
        ${intro ? `<p>${e(intro)}</p>` : ""}
      </div>
    </div>
${body}
  </section>`;
}

/* ---------------------------------------------------------------------- */

function heroBlock() {
  const h = us.hero;
  const stats = h.stats
    .map(([v, l, n]) => `      <span class="stat"><b>${e(v)}</b>${e(l)}${nd(n)}</span>`)
    .join("\n");
  return `  <div class="hero-bar">
    <div class="hero-say">
      <span class="hero-note">${e(h.eyebrow)}</span>
      <h1>${e(h.h1)}</h1>
      <p>${e(h.lead)}</p>
      <span class="hero-cta">
        <a class="btn btn--go" href="${bookingUrl}" target="_blank" rel="noopener">${e(h.primary)}</a>
        <a class="btn btn--ghost" href="#proof">${e(h.secondary)}</a>
      </span>
    </div>
    <div class="hero-side">
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI">
      <span class="hero-ms">
        <span class="sq"><i></i><i></i><i></i><i></i></span>
        <span><b>Microsoft</b><span>Solutions Partner</span></span>
      </span>
      ${nd(h.badgesNeed)}
    </div>
  </div>

  <div class="strip">
${stats}
  </div>`;
}

/** 01 — the missing head. One block, no tiles: it is read whole or not at all. */
function shortBlock() {
  const s = us.short;
  return section({
    id: "short", no: s.no, eyebrow: s.eyebrow, h2: s.h2, hue: 0,
    body: `    <div class="keys">
      <div class="key key--white panel" style="grid-column:span 12">
        <img class="key-mascot" src="${mascot.wave}" alt="" loading="lazy">
${s.body.map((p) => `        <p>${e(p)}</p>`).join("\n")}
      </div>
    </div>`,
  });
}

/** 02 — five disciplines. The correction the whole rewrite exists for. */
function buildBlock() {
  const b = us.build;
  const tones = ["turquoise", "blue", "navy", "violet", "yellow"];
  const spans = [6, 6, 12, 6, 6];
  const cards = b.cards.map((c, i) => {
    const outputs = c.outputs
      ? `        <ul class="key-list">${c.outputs.map((o) => `<li>${e(o)}</li>`).join("")}</ul>`
      : "";
    const kinds = c.kinds
      ? `        <ul class="kinds">${c.kinds.map(([k, v]) => `<li><b>${e(k)}</b> ${e(v)}</li>`).join("")}</ul>`
      : "";
    return `      <div class="key key--${tones[i]} disc" style="grid-column:span ${spans[i]}">
        <span class="key-legend">${e(c.n)}</span>
        <span class="key-eyebrow">${e(c.strap)}</span>
        <span class="key-title key-title--big">${e(c.title)}</span>
        <p class="key-sub">${e(c.body)}</p>
        ${c.body2 ? `<p class="key-sub">${e(c.body2)}</p>` : ""}
${kinds}
${outputs}
        ${c.never ? `<p class="key-meta key-meta--rule">${e(c.never)}</p>` : ""}
        ${c.clientsNeed ? nd(c.clientsNeed) : ""}
        ${c.who ? `<p class="key-meta">${e(c.who)}</p>` : ""}
        ${c.note ? `<p class="key-meta">${e(c.note)}</p>` : ""}
      </div>`;
  }).join("\n");

  return section({
    id: "build", no: b.no, eyebrow: b.eyebrow, h2: b.h2, intro: b.intro, hue: 1,
    body: `    <div class="keys">
${cards}
      <a class="key key--white close" href="#next" style="grid-column:span 12">
        <span class="key-arrow">${chevron}</span>
        <span class="key-title key-title--sm">${e(b.close)}</span>
        <span class="key-go">${e(b.closeGo)}</span>
      </a>
    </div>`,
  });
}

/** 03 — the objection: a firm that does everything does nothing well. */
function rangeBlock() {
  const r = us.range;
  return section({
    id: "range", no: r.no, eyebrow: r.eyebrow, h2: r.h2, hue: 2,
    body: `    <div class="keys">
      <div class="key key--navy panel" style="grid-column:span 12">
        <img class="key-mascot" src="${mascot.red}" alt="" loading="lazy">
${r.body.map((p) => `        <p>${e(p)}</p>`).join("\n")}
      </div>
    </div>`,
  });
}

/** 04 — proof, with context. A Czech client name alone means nothing in the US. */
function proofBlock() {
  const p = us.proof;
  const tones = ["turquoise", "navy", "white", "violet", "white", "blue", "white", "yellow"];
  const spans = [6, 6, 6, 6, 6, 6, 6, 6];
  const cards = p.cases.map((c, i) => `      <div class="key key--${tones[i]} case" style="grid-column:span ${spans[i]}">
        <span class="key-legend">${i + 1}</span>
        <span class="key-eyebrow">${e(c.context)}</span>
        <span class="key-stat${c.metric.length > 9 ? " key-stat--sm" : ""}">${e(c.metric)}<small>${e(c.metricLabel)}</small></span>
        <span class="key-title key-title--sm">${e(c.client)}</span>
        <p class="case-line"><b>The problem.</b> ${e(c.problem)}</p>
        <p class="case-line"><b>What we built.</b> ${e(c.built)}</p>
        ${typeof c.result === "string" ? `<p class="case-line"><b>The result.</b> ${e(c.result)}</p>` : ""}
        ${c.result && c.result.__need ? `<p class="case-line"><b>The result.</b></p>${nd(c.result)}` : ""}
        ${c.resultNeed ? nd(c.resultNeed) : ""}
        <p class="key-meta">${e(c.tech)}${c.by ? ` · ${e(c.by)}` : ""}</p>
      </div>`).join("\n");

  return section({
    id: "proof", no: p.no, eyebrow: p.eyebrow, h2: p.h2, intro: p.intro, hue: 3,
    body: `    <div class="keys">
${cards}
      <div class="key key--white also" style="grid-column:span 12">
        <span class="key-eyebrow">${e(p.alsoLabel)}</span>
        <ul class="key-list">${p.also.map(([n, d]) => `<li><b>${e(n)}</b> — ${e(d)}</li>`).join("")}</ul>
        <p class="key-meta key-meta--rule">${e(p.alsoNote)}</p>
        <a class="key-go" href="#next">${e(p.go)}</a>
      </div>
    </div>`,
  });
}

/** 05 — the eight patterns. Eight equal peers, so the grid takes the whole
    palette: one colour per cap, and no two that touch carry the same one. */
function startBlock() {
  const s = us.start;
  const tones = ["turquoise", "violet", "yellow", "blue", "red", "navy", "turquoise", "violet"];
  /* Row order on the board matches the order in beta2-routines.mjs. */
  const slugs = ["invoices", "orders", "warehouse", "attendance", "timesheets", "mileage", "complaints", "time-off"];
  const caps = s.rows.map(([name, before, after, effect], i) => `      <a class="key key--${tones[i]}" href="/beta2/routines/${slugs[i]}.html" style="grid-column:span 3">
        <span class="key-arrow">${chevron}</span>
        <span class="key-title key-title--sm">${e(name)}</span>
        <span class="key-flow"><b>${e(before)}</b><i>→</i><b>${e(after)}</b></span>
        <span class="key-meta">${e(effect)}</span>
      </a>`).join("\n");
  return section({
    id: "start", no: s.no, eyebrow: s.eyebrow, h2: s.h2, intro: s.intro, hue: 4,
    body: `    <div class="keys">
${caps}
      <div class="key key--white close" style="grid-column:span 12">
        <span class="key-sub">${e(s.foot)}</span>
        <a class="key-go" href="#next">${e(s.go)}</a>
      </div>
    </div>`,
  });
}

/** 06 — four stages, each ending in a decision the client can walk away from. */
function workBlock() {
  const w = us.work;
  const tones = ["white", "white", "white", "turquoise"];
  const cards = w.stages.map((s, i) => `      <div class="key key--${tones[i]}" style="grid-column:span 3">
        <span class="key-legend">${i + 1}</span>
        <span class="key-eyebrow">Stage ${i + 1} · ${e(s.time)}</span>
        <span class="key-title key-title--sm">${e(s.title)}</span>
        <p class="key-sub">${e(s.body)}</p>
        <p class="key-meta key-meta--rule"><b>You get:</b> ${e(s.get)}</p>
      </div>`).join("\n");
  return section({
    id: "work", no: w.no, eyebrow: w.eyebrow, h2: w.h2, intro: w.intro, hue: 5,
    body: `    <div class="keys">
${cards}
      <div class="key key--navy links" style="grid-column:span 12">
        <a class="key-go" href="/beta2/agents.html">${e(w.links[0])}</a>
        <a class="key-go" href="/beta2/automation.html">${e(w.links[1])}</a>
      </div>
    </div>`,
  });
}

/** 07 — 75 people as an argument rather than a statistic. */
function teamBlock() {
  const t = us.team;
  const tones = ["navy", "turquoise", "white"];
  const cards = t.teams.map((x, i) => `      <div class="key key--${tones[i]}" style="grid-column:span 4">
        <span class="key-eyebrow">${e(x.size)}</span>
        <span class="key-title key-title--sm">${e(x.name)}</span>
        <p class="key-sub">${e(x.body)}</p>
        <ul class="key-list">${x.people.map((p) => `<li>${e(p)}</li>`).join("")}</ul>
      </div>`).join("\n");
  const group = t.group.map((g) => `      <a class="key key--navy key--photo" href="/beta2/team.html" style="grid-column:span 4">
        <img class="key-bg" src="${g.image}" alt="${e(g.name)}" loading="lazy">
        <span class="key-eyebrow">${e(g.role)}</span>
        <span class="key-title key-title--sm">${e(g.name)}</span>
        <p class="key-sub">${e(g.body)}</p>
        ${g.need ? nd(g.need) : ""}
      </a>`).join("\n");
  return section({
    id: "team", no: t.no, eyebrow: t.eyebrow, h2: t.h2, intro: t.intro, hue: 0,
    body: `    <div class="keys">
${cards}
      <div class="key key--white panel" style="grid-column:span 4">
        <span class="key-eyebrow">${e(t.groupLabel)}</span>
        <p class="key-sub">${e(t.titlesNote)}</p>
        <p class="key-sub">${e(t.close)}</p>
        <a class="key-go" href="/beta2/team.html">${e(t.go)}</a>
      </div>
${group}
    </div>`,
  });
}

/** 08 — the stack, and the honest gap between "60+" and "44 documented". */
function stackBlock() {
  const s = us.stack;
  const groups = s.groups.map(([name, items], i) => `      <div class="key key--${i === 1 ? "turquoise" : i === 4 ? "accent" : "white"}" style="grid-column:span 4">
        <span class="key-eyebrow">${e(name)}</span>
        <span class="key-title key-title--sm">${e(items)}</span>
      </div>`).join("\n");
  return section({
    id: "stack", no: s.no, eyebrow: s.eyebrow, h2: s.h2, intro: s.intro, hue: 1,
    body: `    <div class="keys">
      <div class="key key--navy panel" style="grid-column:span 5">
        <img class="key-mascot" src="${mascot.blue}" alt="" loading="lazy">
        <span class="key-eyebrow">${e(s.catalogLabel)}</span>
        <ul class="key-list">${s.principles.map((p) => `<li>${e(p)}</li>`).join("")}</ul>
        <p class="key-meta">${e(s.catalogNote)}</p>
        <a class="key-go" href="/beta2/integrations.html">${e(s.go)}</a>
      </div>
      <div class="key key--white sheet" style="grid-column:span 7">
        <div class="keys keys--nested">
${groups}
        </div>
      </div>
    </div>`,
  });
}

/** 09 — the questions a buyer asks before the technical ones. */
function safeBlock() {
  const s = us.safe;
  const tones = ["turquoise", "white", "navy"];
  const cards = s.cards.map((c, i) => `      <div class="key key--${tones[i]}" style="grid-column:span 4">
        <span class="key-eyebrow">${e(c.tag)}</span>
        <span class="key-title key-title--sm">${e(c.title)}</span>
        <p class="key-sub">${e(c.body)}</p>
        ${nd(c.need)}
      </div>`).join("\n");
  return section({
    id: "safe", no: s.no, eyebrow: s.eyebrow, h2: s.h2, hue: 2,
    body: `    <div class="keys">
${cards}
      <a class="key key--white close" href="/beta2/engagement.html" style="grid-column:span 12">
        <span class="key-arrow">${chevron}</span>
        <span class="key-go">${e(s.go)}</span>
      </a>
    </div>`,
  });
}

/** 10 — how it is bought. For an IT-company owner this is the page. */
function engageBlock() {
  const g = us.engage;
  const tones = ["white", "turquoise", "navy", "white"];
  const cards = g.cards.map((c, i) => `      <div class="key key--${tones[i]}" style="grid-column:span 3">
        <span class="key-legend">${i + 1}</span>
        <span class="key-title key-title--sm">${e(c.title)}</span>
        <p class="key-sub">${e(c.body)}</p>
        ${c.need ? nd(c.need) : ""}
      </div>`).join("\n");
  return section({
    id: "engage", no: g.no, eyebrow: g.eyebrow, h2: g.h2, intro: g.intro, hue: 3,
    body: `    <div class="keys">
${cards}
      <div class="key key--white panel" style="grid-column:span 12">
        <p class="key-sub">${e(g.foot)}</p>
      </div>
    </div>`,
  });
}

/** 11 — four answers a US buyer wants before any technical question. */
function atlanticBlock() {
  const a = us.atlantic;
  const items = a.items.map((x) => `        <div class="qa">
          <b>${e(x.q)}</b>
          <p>${e(x.a)}</p>
          ${x.need ? nd(x.need) : ""}
        </div>`).join("\n");
  return section({
    id: "atlantic", no: a.no, eyebrow: a.eyebrow, h2: a.h2, hue: 4,
    body: `    <div class="keys">
      <div class="key key--white panel" style="grid-column:span 12">
${items}
      </div>
    </div>`,
  });
}

/** 12 — the cheapest credibility on the page: where the line is. */
function limitsBlock() {
  const l = us.limits;
  return section({
    id: "limits", no: l.no, eyebrow: l.eyebrow, h2: l.h2, hue: 5,
    body: `    <div class="keys">
      <div class="key key--navy panel" style="grid-column:span 12">
${l.items.map((p) => `        <p>${e(p)}</p>`).join("\n")}
      </div>
    </div>`,
  });
}

/** 13 — the ask. */
function nextBlock() {
  const n = us.next;
  const tools = n.tools.map((t) => `      <a class="key key--white" href="${t.href}" style="grid-column:span 4">
        <span class="key-arrow">${chevron}</span>
        <span class="key-title key-title--sm">${e(t.title)}</span>
        <p class="key-sub">${e(t.body)}</p>
        <span class="key-go">${e(t.go)}</span>
      </a>`).join("\n");
  return section({
    id: "next", no: n.no, eyebrow: n.eyebrow, h2: n.h2, intro: n.intro, hue: 0,
    body: `    <div class="keys">
      <div class="key key--turquoise" style="grid-column:span 4">
        <img class="key-mascot" src="${mascot.wave}" alt="" loading="lazy">
        <span class="hero-cta hero-cta--stack">
          <a class="btn btn--dark" href="${bookingUrl}" target="_blank" rel="noopener">${e(n.primary)}</a>
          <a class="btn btn--line" href="mailto:milo@enterai.cz">${e(n.secondary)}</a>
        </span>
        <p class="key-meta">${n.contact.map(e).join("<br>")}</p>
      </div>
${tools}
    </div>`,
  });
}

export function renderUs() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${e(us.seo.title)}</title>
<meta name="description" content="${e(us.seo.description)}">
<meta property="og:title" content="${e(us.seo.og)}">
<meta property="og:description" content="${e(us.seo.description)}">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/beta2/assets/keys.css">
</head>
<body>

<header class="site-head">
  <a href="/beta2/" aria-label="EnterIT home">
    <img src="/assets/enter_logo_black.svg" alt="EnterIT">
  </a>
  <nav class="head-nav" aria-label="Main">
${us.nav.map(([l, h]) => `    <a href="${h}">${e(l)}</a>`).join("\n")}
  </nav>
  <span class="head-right">
    <a class="btn btn--sm" href="${bookingUrl}" target="_blank" rel="noopener">${e(us.navCta)}</a>
    <span class="lang">
      <a class="on" href="/beta2/">EN</a><a href="/beta2/cs.html">CZ</a><a href="/beta2/de.html">DE</a><a href="/beta2/pl.html">PL</a>
    </span>
  </span>
</header>

<main class="board">

${heroBlock()}

${shortBlock()}

${buildBlock()}

${rangeBlock()}

${proofBlock()}

${startBlock()}

${workBlock()}

${teamBlock()}

${stackBlock()}

${safeBlock()}

${engageBlock()}

${atlanticBlock()}

${limitsBlock()}

${nextBlock()}

</main>

<footer class="site-foot">
  <span>© 2026 EnterIT · AI Enter s.r.o. · Reg. No. 19086652</span>
  <span><a href="/en/gdpr.html">Privacy</a> · <a href="/beta2/engagement.html">Terms</a> · <a href="/beta/">beta 1</a></span>
</footer>

<script>
/* Colour rotates one step per visit; turquoise still leads and pink is not in
   the set. See keys.css for why. */
(function(){
  var PALETTE = ["turquoise","blue","violet","red","yellow"];
  var offset = Math.floor(Math.random() * PALETTE.length);
  document.querySelectorAll(".chap[data-hue]").forEach(function(chap){
    var slot = (parseInt(chap.dataset.hue, 10) + offset) % PALETTE.length;
    PALETTE.forEach(function(name){ chap.classList.remove("ch--" + name); });
    chap.classList.add("ch--" + PALETTE[slot]);
  });
})();
<\/script>
</body>
</html>
`;
}

export function writeUs() {
  writeFileSync(resolve(root, "beta2", "index.html"), renderUs(), "utf8");
  console.log("beta2/index.html  (en · US copy deck, 14 sections)");
}
