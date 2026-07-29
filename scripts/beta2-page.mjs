/**
 * beta2-page.mjs — the shared shell every beta2 page renders on.
 *
 * The board and the subpages are one system, not a page plus a set of
 * lookalikes. Everything visual lives here: the header, the footer, the section
 * shell, the keycap, and the marker for a fact we do not have yet. A subpage
 * builder supplies content and colour and nothing else.
 *
 * Paths. English sits at the domain root — the site leads with its global
 * audience — and cs/de/pl each get a folder. Routine slugs stay localised, so
 * the English invoices page is /routines/invoices.html and the Czech one is
 * /cs/routines/faktury.html.
 *
 * Colour rules are the board's rules, unchanged: turquoise is the primary and
 * the only colour that fills a large cap by default; blue, violet, red and
 * yellow are accents, one assigned per section, rotating one step per visit;
 * no tints, no pink, no gradient.
 */
import { escapeHtml } from "./site-shell.mjs";

export const e = (v) => escapeHtml(v ?? "");

export const LOCALES = ["en", "cs", "de", "pl"];
export const langAttr = { en: "en", cs: "cs", de: "de", pl: "pl" };
export const langLabel = { en: "EN", cs: "CZ", de: "DE", pl: "PL" };

/** Where a subpage lives, and where the board for a locale lives. */
export const ROOT_LOCALE = "en";
export const sub = (code, file) => (code === ROOT_LOCALE ? `/${file}` : `/${code}/${file}`);
export const boardHref = (code) => (code === ROOT_LOCALE ? "/" : `/${code}/`);

export const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

export const back =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5m6-7-7 7 7 7"/></svg>';

/* Enty comes in two limb colours: Stabilní černá by default, white on a dark
   ground where black would simply disappear. */
const DARK_TONES = new Set(["navy", "soft", "photo-hire"]);
export const mascotFile = (face, tone) => {
  const onDark = DARK_TONES.has(tone);
  if (face === "wave") return onDark ? "/assets/decor/mascot-wave.svg" : "/assets/decor/mascot-wave-ink.svg";
  return onDark ? `/assets/decor/mascot-${face}-light.svg` : `/assets/decor/mascot-${face}.svg`;
};

/** A fact we do not have yet. Rendered where it will be missed, never omitted.
 *  It survives translation — an unverified claim is unverified in every
 *  language, and dropping the marker abroad would be the easy way to lose it. */
export const need = (what) => ({ __need: what });
export const nd = (n, label = "Needs data") =>
  n ? `<span class="needs"><b>${e(label)}</b>${e(n.__need)}</span>` : "";

/**
 * One pressable cap.
 *
 * `tone` picks the face: white (which wears the section accent as a hairline),
 * turquoise, navy, or one of the four named accents where a set of equal peers
 * should read as a palette rather than as one colour repeated.
 */
export function key({
  span = 4, tone = "white", href, legend, eyebrow, title, size, sub: subText, body,
  list, flow, meta, rule, stat, statLabel, go, mascot: face, needs, needsLabel, extra,
  photo, alt, quiet, wide, wideRight,
}) {
  const sizeClass = size === "big" ? " key-title--big" : size === "sm" ? " key-title--sm" : "";
  const Tag = href ? "a" : "div";
  const statClass = stat && stat.length > 9 ? " key-stat--sm" : "";
  return `      <${Tag} class="key key--${tone}${photo ? " key--photo" : ""}${quiet ? " key--quiet" : ""}${wide ? " key--wide" : ""}${wideRight ? " key--wide key--wide-r" : ""}"${href ? ` href="${href}"` : ""} style="grid-column:span ${span}">
        ${photo ? `<img class="key-bg" src="${photo}" alt="${e(alt || "")}" loading="lazy">` : ""}
        ${face ? `<img class="key-mascot" src="${mascotFile(face, tone)}" alt="" loading="lazy">` : ""}
        ${href ? `<span class="key-arrow">${chevron}</span>` : ""}
        ${legend ? `<span class="key-legend">${e(legend)}</span>` : ""}
        ${eyebrow ? `<span class="key-eyebrow">${e(eyebrow)}</span>` : ""}
        ${stat ? `<span class="key-stat${statClass}">${e(stat)}${statLabel ? `<small>${e(statLabel)}</small>` : ""}</span>` : ""}
        ${title ? `<span class="key-title${sizeClass}">${e(title)}</span>` : ""}
        ${subText ? `<p class="key-sub">${e(subText)}</p>` : ""}
        ${(body || []).map((p) => `<p class="key-sub">${e(p)}</p>`).join("")}
        ${flow ? `<span class="key-flow"><b>${e(flow[0])}</b><i>→</i><b>${e(flow[1])}</b></span>` : ""}
        ${list ? `<ul class="key-list">${list.map((x) => `<li>${e(x)}</li>`).join("")}</ul>` : ""}
        ${rule ? `<p class="key-meta key-meta--rule">${e(rule)}</p>` : ""}
        ${meta ? `<p class="key-meta">${e(meta)}</p>` : ""}
        ${needs ? nd(needs, needsLabel) : ""}
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
export function pageHead({ code, eyebrow, h1, lead, meta, cta, bookingUrl, ui }) {
  return `  <div class="hero-bar hero-bar--page">
    <div class="hero-say">
      <a class="back" href="${boardHref(code)}"><span>${back}</span>${e(ui.back)}</a>
      <span class="hero-note">${e(eyebrow)}</span>
      <h1>${e(h1)}</h1>
      <p>${e(lead)}</p>
      ${meta ? `<p class="hero-meta">${e(meta)}</p>` : ""}
      ${cta ? `<span class="hero-cta"><a class="btn btn--go" href="${bookingUrl}" target="_blank" rel="noopener">${e(cta)}</a></span>` : ""}
    </div>
  </div>`;
}

/** The whole document. Subpages differ only in `body`. */
export const SITE = "https://enterit.cz";

/** "Skip to content" for keyboard and screen-reader users, per locale. */
export const SKIP = {
  cs: "Přeskočit na obsah", en: "Skip to content",
  de: "Zum Inhalt springen", pl: "Przejdź do treści",
};
export const LANG_ARIA = {
  cs: "Jazyk webu", en: "Site language", de: "Sprache", pl: "Język strony",
};
export const OG_LOCALE = { cs: "cs_CZ", en: "en_US", de: "de_DE", pl: "pl_PL" };

/**
 * Canonical and hreflang for one page, given a function that returns its path
 * in any language. Routine slugs are localised, so the caller supplies the
 * lookup rather than us assuming the filename is the same everywhere.
 */
export const headLinks = (code, pathFor) => ({
  canonical: pathFor(code),
  alternates: [...LOCALES.map((x) => [x, pathFor(x)]), ["x-default", pathFor(ROOT_LOCALE)]],
});

export function page({ code, title, description, body, bookingUrl, ui, canonical, alternates }) {
  const nav = [
    [ui.nav.build, `${boardHref(code)}#build`],
    [ui.nav.work, `${boardHref(code)}#results`],
    [ui.nav.how, `${boardHref(code)}#process`],
    [ui.nav.team, sub(code, "team.html")],
    [ui.nav.engagement, sub(code, "engagement.html")],
    [ui.nav.integrations, sub(code, "integrations.html")],
  ];
  const langs = LOCALES
    .map((x) => `<a class="${x === code ? "on" : ""}" href="${boardHref(x)}">${langLabel[x]}</a>`)
    .join("");

  return `<!doctype html>
<html lang="${langAttr[code]}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${e(title)}</title>
<meta name="description" content="${e(description)}">
<meta name="theme-color" content="#17202E">
${canonical ? `<link rel="canonical" href="${SITE}${canonical}">` : ""}
${alternates ? alternates.map(([x, href]) => `<link rel="alternate" hreflang="${x}" href="${SITE}${href}">`).join("\n") : ""}
<meta property="og:type" content="website">
<meta property="og:site_name" content="EnterIT">
<meta property="og:locale" content="${OG_LOCALE[code]}">
<meta property="og:title" content="${e(title)}">
<meta property="og:description" content="${e(description)}">
${canonical ? `<meta property="og:url" content="${SITE}${canonical}">` : ""}
<meta property="og:image" content="${SITE}/assets/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/keys.css">
<script defer src="/assets/analytics.js"><\/script>
</head>
<body>

<a class="skip" href="#main">${e(SKIP[code])}</a>
<header class="site-head">
  <a href="${boardHref(code)}" aria-label="EnterIT">
    <img src="/assets/enter_logo_black.svg" alt="EnterIT" width="62" height="26">
  </a>
  <nav class="head-nav" aria-label="${e(ui.navLabel)}">
${nav.map(([l, h]) => `    <a href="${h}">${e(l)}</a>`).join("\n")}
  </nav>
  <span class="head-right">
    <a class="btn btn--sm" href="${bookingUrl}" target="_blank" rel="noopener">${e(ui.bookShort)}</a>
    <span class="lang" role="group" aria-label="${e(LANG_ARIA[code])}">${langs}</span>
  </span>
</header>

<main class="board" id="main">

${body}

</main>

<footer class="site-foot">
  <div class="foot-grid">
    <div class="foot-col foot-col--who">
      <img class="foot-mark" src="/assets/enter_logo_black.svg" alt="EnterIT" width="52" height="22">
      <p>${e(ui.footClaim)}</p>
      <p class="foot-reg">
        AI Enter s.r.o.<br>
        IČO 19086652 · DIČ CZ19086652<br>
        Zahradní 2004/46d<br>
        792 01 Bruntál, ${e(ui.czechia)}
      </p>
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(ui.footAsk)}</span>
      <a href="mailto:milo@enterit.cz">milo@enterit.cz</a>
      <a href="tel:+420608969263">+420 608 969 263</a>
      <a href="${bookingUrl}" target="_blank" rel="noopener">${e(ui.footBook)}</a>
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(ui.navLabel)}</span>
${nav.map(([l, h]) => `      <a href="${h}">${e(l)}</a>`).join("\n")}
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(ui.footGroup)}</span>
      <a href="https://www.enterai.cz" target="_blank" rel="noopener">EnterAI</a>
      <a href="${sub(code, "team.html")}">Enter Tech</a>
      <a href="${sub(code, "team.html")}">Enter Agents</a>
      <a href="${sub(code, "team.html")}">Enter Studio</a>
    </div>
  </div>
  <div class="foot-line">
    <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652 · DIČ CZ19086652 · Zahradní 2004/46d, 792 01 Bruntál</span>
    <span><a href="${boardHref(code)}">${e(ui.overview)}</a></span>
  </div>
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
