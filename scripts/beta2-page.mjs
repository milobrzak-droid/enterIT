/**
 * beta2-page.mjs — the shared shell every beta2 page renders on.
 *
 * The board and the subpages are one system, not a page plus a set of
 * lookalikes. Everything visual lives here: the header, the footer, the section
 * shell, the keycap, and the marker for a fact we do not have yet. A subpage
 * builder supplies content and colour and nothing else.
 *
 * Colour rules are the board's rules, unchanged: turquoise is the primary and
 * the only colour that fills a large cap by default; blue, violet, red and
 * yellow are accents, one assigned per section, rotating one step per visit;
 * no tints, no pink, no gradient.
 */
import { escapeHtml } from "./site-shell.mjs";

export const e = (v) => escapeHtml(v ?? "");

export const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

export const back =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6-7-7 7 7 7"/></svg>';

export const mascot = {
  wave: "/assets/decor/mascot-wave.svg",
  blue: "/assets/decor/mascot-blue.svg",
  red: "/assets/decor/mascot-red.svg",
};

/** A fact we do not have yet. Rendered where it will be missed, never omitted. */
export const need = (what) => ({ __need: what });
export const nd = (n) =>
  n ? `<span class="needs"><b>Needs data</b>${e(n.__need)}</span>` : "";

/**
 * One pressable cap.
 *
 * `tone` picks the face: white (which wears the section accent as a hairline),
 * turquoise, navy, or one of the four named accents where a set of equal peers
 * should read as a palette rather than as one colour repeated.
 */
export function key({
  span = 4, tone = "white", href, legend, eyebrow, title, size, sub, body,
  list, flow, meta, rule, stat, statLabel, go, mascot: face, needs, extra,
}) {
  const sizeClass = size === "big" ? " key-title--big" : size === "sm" ? " key-title--sm" : "";
  const Tag = href ? "a" : "div";
  const statClass = stat && stat.length > 9 ? " key-stat--sm" : "";
  return `      <${Tag} class="key key--${tone}"${href ? ` href="${href}"` : ""} style="grid-column:span ${span}">
        ${face ? `<img class="key-mascot" src="${mascot[face]}" alt="" loading="lazy">` : ""}
        ${href ? `<span class="key-arrow">${chevron}</span>` : ""}
        ${legend ? `<span class="key-legend">${e(legend)}</span>` : ""}
        ${eyebrow ? `<span class="key-eyebrow">${e(eyebrow)}</span>` : ""}
        ${stat ? `<span class="key-stat${statClass}">${e(stat)}${statLabel ? `<small>${e(statLabel)}</small>` : ""}</span>` : ""}
        ${title ? `<span class="key-title${sizeClass}">${e(title)}</span>` : ""}
        ${sub ? `<p class="key-sub">${e(sub)}</p>` : ""}
        ${(body || []).map((p) => `<p class="key-sub">${e(p)}</p>`).join("")}
        ${flow ? `<span class="key-flow"><b>${e(flow[0])}</b><i>→</i><b>${e(flow[1])}</b></span>` : ""}
        ${list ? `<ul class="key-list">${list.map((x) => `<li>${e(x)}</li>`).join("")}</ul>` : ""}
        ${rule ? `<p class="key-meta key-meta--rule">${e(rule)}</p>` : ""}
        ${meta ? `<p class="key-meta">${e(meta)}</p>` : ""}
        ${needs ? nd(needs) : ""}
        ${extra || ""}
        ${go ? `<span class="key-go">${e(go)}</span>` : ""}
      </${Tag}>`;
}

/** A section: number, kicker, headline, the ask, then the caps that answer it. */
export function section({ id, no, kicker, h2, ask, hue = 0, keys = [], raw }) {
  return `  <section class="chap"${id ? ` id="${id}"` : ""} data-hue="${hue}">
    <div class="chap-head">
      ${no ? `<span class="chap-no">${e(no)}</span>` : ""}
      <div>
        ${kicker ? `<span class="chap-kicker">${e(kicker)}</span>` : ""}
        <h2>${e(h2)}</h2>
        ${ask ? `<p>${e(ask)}</p>` : ""}
      </div>
    </div>
    <div class="keys">
${raw || keys.filter(Boolean).join("\n")}
    </div>
  </section>`;
}

/** The masthead of a subpage: where you are, and the way back to the board. */
export function pageHead({ eyebrow, h1, lead, meta, cta, bookingUrl }) {
  return `  <div class="hero-bar hero-bar--page">
    <div class="hero-say">
      <a class="back" href="/beta2/"><span>${back}</span>Back to the overview</a>
      <span class="hero-note">${e(eyebrow)}</span>
      <h1>${e(h1)}</h1>
      <p>${e(lead)}</p>
      ${meta ? `<p class="hero-meta">${e(meta)}</p>` : ""}
      ${cta ? `<span class="hero-cta"><a class="btn btn--go" href="${bookingUrl}" target="_blank" rel="noopener">${e(cta)}</a></span>` : ""}
    </div>
  </div>`;
}

const NAV = [
  ["What we build", "/beta2/#build"],
  ["Work", "/beta2/#proof"],
  ["How we work", "/beta2/#work"],
  ["Team", "/beta2/team.html"],
  ["Engagement", "/beta2/engagement.html"],
  ["Integrations", "/beta2/integrations.html"],
];

/** The whole document. Subpages differ only in `body`. */
export function page({ title, description, body, bookingUrl }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
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
${NAV.map(([l, h]) => `    <a href="${h}">${e(l)}</a>`).join("\n")}
  </nav>
  <span class="head-right">
    <a class="btn btn--sm" href="${bookingUrl}" target="_blank" rel="noopener">Book a call</a>
  </span>
</header>

<main class="board">

${body}

</main>

<footer class="site-foot">
  <span>© 2026 EnterIT · AI Enter s.r.o. · Reg. No. 19086652</span>
  <span><a href="/en/gdpr.html">Privacy</a> · <a href="/beta2/engagement.html">Terms</a> · <a href="/beta2/">Overview</a></span>
</footer>

<script>
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
