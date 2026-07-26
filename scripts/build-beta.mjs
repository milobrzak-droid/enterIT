/**
 * build-beta.mjs — renders the /beta/ prototype (navy design system).
 *
 * Reads the SAME content modules as the live homepage build, so beta copy stays
 * in sync with production. Only the presentation layer differs: beta ships the
 * dark-navy Figma design system (beta/assets/ds.css + page.css) instead of the
 * light site shell.
 *
 * Output: beta/index.html (EN — English leads), beta/cs.html, beta/de.html, beta/pl.html
 * Run:    node scripts/build-beta.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { bookingUrl, locales } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { escapeHtml } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* English leads on the beta track, so EN owns index.html. */
const betaOrder = ["en", "cs", "de", "pl"];
const betaFile = { en: "index.html", cs: "cs.html", de: "de.html", pl: "pl.html" };
const betaLabel = { en: "EN", cs: "CZ", de: "DE", pl: "PL" };

/**
 * Beta content overrides.
 *
 * The manufacturing case ships an AI-adoption metric ("17 → 78%") on the live
 * site. Adoption is EnterAI's story; EnterIT's proof is delivery outcome, so the
 * beta states the time saved instead. Same project, same source data — only the
 * headline figure and its framing change.
 */
const caseOverrides = {
  en: {
    metric: "40 min / user / week",
    problem: "Manual information lookup around Business Central slowed down everyday work.",
    impact: "Approximately 40 minutes saved per user every week, with a complete audit trail over every query.",
  },
  cs: {
    metric: "40 min / uživatel / týden",
    problem: "Ruční dohledávání informací kolem Business Central zdržovalo běžnou práci.",
    impact: "Zhruba 40 minut ušetřených na uživatele týdně, s kompletní auditní stopou u každého dotazu.",
  },
  de: {
    metric: "40 Min / Nutzer / Woche",
    problem: "Manuelles Nachschlagen von Informationen rund um Business Central bremste die tägliche Arbeit.",
    impact: "Rund 40 Minuten Einsparung pro Nutzer und Woche — mit vollständigem Audit-Trail über jede Abfrage.",
  },
  pl: {
    metric: "40 min / użytkownik / tydzień",
    problem: "Ręczne wyszukiwanie informacji wokół Business Central spowalniało codzienną pracę.",
    impact: "Około 40 minut oszczędności na użytkownika tygodniowo, z pełną ścieżką audytu każdego zapytania.",
  },
};

/**
 * Beta-only chrome. These strings have no home in the production content model
 * (the live site carries the EnterAI relationship elsewhere), so the beta keeps
 * its own copy for the notice bar and the hero eyebrow.
 */
const betaCopy = {
  en: {
    notice: "Delivery team of <b>EnterAI</b> — we build and run what strategy specifies.",
    noticeLink: "About EnterAI",
    eyebrow: "Enterprise software · AI · integrations",
  },
  cs: {
    notice: "Exekuční tým sesterské <b>EnterAI</b> — stavíme a provozujeme to, co strategie zadá.",
    noticeLink: "O EnterAI",
    eyebrow: "Enterprise software · AI · integrace",
  },
  de: {
    notice: "Umsetzungsteam von <b>EnterAI</b> — wir bauen und betreiben, was die Strategie vorgibt.",
    noticeLink: "Über EnterAI",
    eyebrow: "Enterprise-Software · KI · Integrationen",
  },
  pl: {
    notice: "Zespół wykonawczy <b>EnterAI</b> — budujemy i utrzymujemy to, co określa strategia.",
    noticeLink: "O EnterAI",
    eyebrow: "Enterprise software · AI · integracje",
  },
};

const e = (v) => escapeHtml(v ?? "");
const arrow = '<span class="arr">→</span>';

/* Accent rotation used across card grids. */
const accents = ["turquoise", "blue", "violet", "pink", "yellow", "red"];

/* Enter's line-art artwork, matched to each ready-made solution in catalogue order. */
const solutionArt = [
  "illustration-calendar.webp",
  "illustration-conversation.webp",
  "illustration-team.webp",
  "illustration-workstation.webp",
  "illustration-calendar.webp",
  "illustration-system.webp",
  "illustration-documents.webp",
  "illustration-modules.webp",
];

function languageSwitcher(current, extraStyle = "") {
  const items = betaOrder
    .map((code) => {
      const href = code === "en" ? "/beta/" : `/beta/${betaFile[code]}`;
      const cls = code === current ? ' class="on"' : "";
      return `<a${cls} href="${href}">${betaLabel[code]}</a>`;
    })
    .join("");
  return `<span class="lang"${extraStyle}>${items}</span>`;
}

function head(page, code) {
  const alternates = betaOrder
    .map((c) => {
      const href = c === "en" ? "https://enterit.cz/beta/" : `https://enterit.cz/beta/${betaFile[c]}`;
      return `<link rel="alternate" hreflang="${locales[c].lang}" href="${href}">`;
    })
    .join("\n");
  return `<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${e(page.title)} — beta</title>
<meta name="description" content="${e(page.description)}">
<meta property="og:locale" content="${e(page.ogLocale)}">
${alternates}
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/beta/assets/ds.css">
<link rel="stylesheet" href="/beta/assets/page.css">
</head>`;
}

function navLinks(page) {
  const n = page.nav;
  return [
    ["#services", n.services],
    ["#results", n.results],
    ["#process", n.process],
    ["#integrations", n.integrations],
    ["#team", n.team],
  ]
    .map(([href, label]) => `<a href="${href}">${e(label)}</a>`)
    .join("\n      ");
}

function header(page, code) {
  const chrome = betaCopy[code];
  return `<div class="notice">
  <span>${chrome.notice}</span>
  <a href="https://enterai.cz" target="_blank" rel="noopener">${e(chrome.noticeLink)} ${arrow}</a>
</div>

<header class="site-header">
  <div class="wrap hd">
    <a class="brand" href="${code === "en" ? "/beta/" : `/beta/${betaFile[code]}`}" aria-label="${e(page.homeLabel)}">
      <img src="/assets/enter_logo_white.svg" alt="Enter">
      <span class="it">IT</span>
    </a>

    <nav class="nav" aria-label="${e(page.mainNavLabel)}">
      ${navLinks(page)}
      ${languageSwitcher(code)}
      <a class="btn btn--sm" href="#contact">${e(page.nav.contact)} ${arrow}</a>
    </nav>

    <button class="burger" id="burger" aria-label="${e(page.menuOpen)}" aria-expanded="false" style="margin-left:auto">
      <i></i><i></i><i></i>
    </button>
  </div>
  <nav class="mobile-nav" id="mobileNav" aria-label="${e(page.mobileNavLabel)}">
    ${navLinks(page)}
    ${languageSwitcher(code, ' style="align-self:flex-start"')}
    <a class="btn" href="#contact">${e(page.nav.contact)} ${arrow}</a>
  </nav>
</header>`;
}

function hero(page, code) {
  const stats = page.proof
    .map(([value, label]) => `<div><b>${e(value)}</b><span>${e(label)}</span></div>`)
    .join("\n      ");

  return `<section class="hero section--deep" id="home">
  <div class="glow glow-a"></div>
  <div class="glow glow-b"></div>

  <div class="wrap rel">
    <div class="hero-grid">

      <div class="hero-copy">
        <div class="hero-head">
          <div class="kicker"><span>${e(betaCopy[code].eyebrow)}</span></div>
          <img class="hero-mascot" src="/assets/decor/mascot-wave.svg" alt="" aria-hidden="true">
          <h1>${e(page.hero.title)} <em>${e(page.hero.highlight)}</em></h1>
        </div>

        <p class="lead">${e(page.hero.lead)}</p>

        <div class="hero-actions">
          <a class="btn" href="${bookingUrl}" target="_blank" rel="noopener">${e(page.hero.primary)} ${arrow}</a>
          <a class="btn btn--outline" href="#results">${e(page.hero.secondary)}</a>
        </div>
      </div>

      <div class="console">
        <div class="cons-bar">
          <span class="dots"><i></i><i></i><i></i></span>
          <span class="cons-title">Agent Ops</span>
          <span class="cons-live"><span class="ld"></span>LIVE · uptime 99.98 %</span>
        </div>
        <div class="cons-kpis">
          <div class="cons-kpi"><b class="num" data-val="12480">0</b><span>tasks today</span></div>
          <div class="cons-kpi"><b class="num" data-val="99" data-suf=" %">0</b><span>error-free</span></div>
          <div class="cons-kpi"><b class="num" data-val="612" data-suf=" h">0</b><span>saved / mo</span></div>
        </div>
        <div class="cons-rows">
          <div class="cons-row" style="--d:4.2s">
            <span class="rh"><span class="sd"></span><span class="nm">Invoicing agent</span><span class="pct">running</span></span>
            <span class="tk">OCR invoice #4821 → ERP</span>
            <span class="bar"><i></i></span>
          </div>
          <div class="cons-row" style="--d:5.1s">
            <span class="rh"><span class="sd"></span><span class="nm">Order agent</span><span class="pct">processing</span></span>
            <span class="tk">extracting order #2207</span>
            <span class="bar"><i></i></span>
          </div>
          <div class="cons-row" style="--d:3.6s">
            <span class="rh"><span class="sd"></span><span class="nm">Knowledge agent</span><span class="pct">running</span></span>
            <span class="tk">looking up price in&nbsp;K2 price list</span>
            <span class="bar"><i></i></span>
          </div>
        </div>
      </div>

    </div>

    <div class="stats">
      ${stats}
    </div>
  </div>
</section>

<section class="partners section--deep">
  <div class="wrap">
    <div class="partners-row">
      <span class="p-lbl">${e(page.partnerLabel)}</span>
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI" loading="lazy">
      <span class="ms-logo">
        <span class="ms-sq"><i></i><i></i><i></i><i></i></span>
        <span><b>Microsoft</b>Solutions Partner</span>
      </span>
    </div>
  </div>
</section>`;
}

function services(page, content) {
  const pillars = page.services.cards
    .map(
      (card, i) => `      <article class="pillar sticker">
        <span class="p-no">0${i + 1}</span>
        <h3>${e(card.title)}</h3>
        <p>${e(card.text)}</p>
      </article>`
    )
    .join("\n");

  const solutions = content.solutions.cards
    .map((card, i) => {
      const art = solutionArt[i % solutionArt.length];
      return `      <a class="sol sticker accent-${accents[i % accents.length]}" href="/${card.href}">
        <span class="illus-wrap"><img class="illus" src="/assets/decor/${art}" alt="" loading="lazy"></span>
        <h4>${e(card.title)}</h4>
        <p>${e(card.description)}</p>
        <span class="sol-flow"><b>${e(card.input)}</b><i>→</i><b>${e(card.output)}</b></span>
        <span class="sol-proof">${e(card.proof)}</span>
      </a>`;
    })
    .join("\n");

  return `<section class="section section--surface has-decor" id="services">
  <span class="squig squig--curl" style="width:190px;top:56px;right:-42px;--accent:var(--blue)"></span>
  <span class="squig squig--wave" style="width:420px;bottom:40px;left:-90px;--accent:var(--violet);opacity:.32"></span>
  <div class="wrap">
    <div class="kicker"><span><b>01</b> · ${e(page.services.kicker)}</span></div>
    <h2 style="max-width:20ch">${e(page.services.title)}</h2>

    <div class="pillars" style="margin-top:clamp(32px,4vw,56px)">
${pillars}
    </div>

    <h2 style="max-width:22ch;margin-top:clamp(56px,7vw,104px)">${e(content.solutions.title)}</h2>

    <div class="sol-grid" style="margin-top:clamp(28px,3.5vw,44px)">
${solutions}
    </div>

    <p class="sol-cta">${e(content.solutions.cta)} <a href="#contact">${e(page.contact.primary)} ${arrow}</a></p>
  </div>
</section>`;
}

function results(page, content, code) {
  const labels = content.cases.labels;
  const cards = content.cases.cards
    .map((item, i) => {
      const patch = i === 0 ? caseOverrides[code] : null;
      const metric = patch ? patch.metric : item.metric;
      const problem = patch ? patch.problem : item.problem;
      const impact = patch ? patch.impact : item.impact;
      const tech = (item.tech || [])
        .map((t) => `<span>${e(t)}</span>`)
        .join("");
      return `      <article class="case">
        <span class="case-ob">${e(item.context)}</span>
        <span class="case-kpi">${e(metric)}</span>
        <dl>
          <div><dt>${e(labels.problem)}</dt><dd>${e(problem)}</dd></div>
          <div><dt>${e(labels.solution)}</dt><dd>${e(item.solution)}</dd></div>
          <div><dt>${e(labels.impact)}</dt><dd>${e(impact)}</dd></div>
        </dl>
        <div class="tech">${tech}</div>
      </article>`;
    })
    .join("\n");

  const impl = content.implementation;
  const stages = impl.stages
    .map(
      (s) => `        <li>
          <h4>${e(s.title)}</h4>
          <p>${e(s.text)}</p>
        </li>`
    )
    .join("\n");

  return `<section class="section section--deep" id="results">
  <div class="wrap">
    <div class="kicker"><span><b>02</b> · ${e(page.results.kicker)}</span></div>
    <h2 style="max-width:20ch">${e(page.results.title)}</h2>

    <div class="case-grid" style="margin-top:clamp(32px,4vw,56px)">
${cards}
    </div>

    <p class="case-note">
      <span>${e(page.results.note)}</span>
      <a href="#contact">${e(page.results.link)} →</a>
    </p>

    <div class="feature">
      <span class="feature-tag">${e(impl.badge)}</span>
      <h3>${e(impl.title)}</h3>
      <p class="f-lead">${e(impl.intro)}</p>

      <ol class="flow accent-blue">
${stages}
      </ol>

      <p class="disclaimer">${e(impl.note)}</p>
    </div>
  </div>
</section>`;
}

function process(page, content) {
  const steps = page.process.steps
    .map(
      ([title, text], i) => `      <article class="step">
        <h3>${e(title)}</h3>
        <p>${e(text)}</p>
        <p style="margin-top:8px;font-family:var(--font-mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;color:var(--accent)">${e(content.processTimings[i] || "")}</p>
      </article>`
    )
    .join("\n");

  return `<section class="section section--surface has-decor" id="process">
  <span class="squig squig--wave" style="width:520px;top:34px;right:-120px;--accent:var(--turquoise);opacity:.34"></span>
  <div class="wrap">
    <div class="kicker"><span><b>03</b> · ${e(page.process.kicker)}</span></div>
    <h2 style="max-width:18ch">${e(page.process.title)}</h2>
    <p class="lead" style="margin-top:var(--s4);margin-bottom:clamp(36px,4.5vw,64px)">${e(page.process.intro)}</p>

    <div class="steps">
${steps}
    </div>
  </div>
</section>`;
}

function integrations(page, content) {
  const groups = content.integrations.groups
    .map((g, i) => {
      const chips = g.systems.map((s) => `<span>${e(s)}</span>`).join("");
      return `      <div class="intg-row accent-${accents[i % accents.length]}">
        <h3>${e(g.title)}</h3>
        <div class="intg-chips">${chips}</div>
      </div>`;
    })
    .join("\n");

  const points = page.integrations.points
    .map(
      (p, i) =>
        `      <div class="card accent-${accents[i % accents.length]}"><ul class="check-list"><li>${e(p)}</li></ul></div>`
    )
    .join("\n");

  return `<section class="section section--deep has-decor" id="integrations">
  <span class="squig squig--loop" style="width:210px;top:70px;right:-40px;--accent:var(--yellow);opacity:.4"></span>
  <div class="wrap">
    <div class="kicker"><span><b>04</b> · ${e(page.integrations.kicker)}</span></div>
    <h2 style="max-width:18ch">${e(page.integrations.title)}</h2>
    <p class="lead" style="margin-top:var(--s4);margin-bottom:clamp(28px,3.5vw,40px)">${e(page.integrations.intro)}</p>

    <div class="intg-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
      <input class="field" id="intgSearch" type="search" placeholder="${e(content.integrations.searchPlaceholder)}" aria-label="${e(content.integrations.searchLabel)}" autocomplete="off">
    </div>

    <div id="intgWrap">
${groups}
    </div>
    <p class="intg-empty" id="intgEmpty">${e(content.integrations.empty)}</p>

    <div class="intg-principles">
${points}
    </div>
  </div>
</section>`;
}

const opsIcons = [
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 4 6v6c0 5 3.4 9 8 10 4.6-1 8-5 8-10V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M4 12h16M4 17h10"/><circle cx="18" cy="17" r="3"/></svg>',
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>',
];

function operations(content) {
  const cards = content.operations.cards
    .map(
      (card, i) => `      <article class="ops">
        <span class="ops-ico">${opsIcons[i % opsIcons.length]}</span>
        <h3>${e(card.title)}</h3>
        <p>${e(card.text)}</p>
      </article>`
    )
    .join("\n");

  return `<section class="section section--surface" id="operations">
  <div class="wrap">
    <div class="kicker"><span><b>05</b> · ${e(content.operations.kicker)}</span></div>
    <h2 style="max-width:24ch">${e(content.operations.title)}</h2>

    <div class="ops-grid" style="margin-top:clamp(32px,4vw,56px)">
${cards}
    </div>
  </div>
</section>`;
}

function team(page, content) {
  const people = page.team.leaders
    .map(
      (p) => `      <article class="person">
        <img src="${e(p.image)}" alt="${e(p.name)}" loading="lazy">
        <div class="p-body">
          <span class="p-role">${e(p.role)}</span>
          <h3>${e(p.name)}</h3>
          <p>${e(p.text)}</p>
        </div>
      </article>`
    )
    .join("\n");

  const details = content.resources.cards
    .map((card, i) => {
      const links = (card.links || [])
        .map(({ label, href }) => `<a href="${href.startsWith("#") ? href : `/${href}`}">${e(label)} ${arrow}</a>`)
        .join("\n          ");
      return `      <article class="detail">
        <h3>${e(card.title)}</h3>
        <p>${e(card.text)}</p>
        <div class="d-links">
          ${links}
        </div>
      </article>`;
    })
    .join("\n");

  return `<section class="section section--deep" id="team">
  <div class="wrap">
    <div class="kicker"><span><b>06</b> · ${e(page.team.kicker)}</span></div>
    <h2 style="max-width:20ch">${e(page.team.title)}</h2>
    <p class="lead" style="margin-top:var(--s4);margin-bottom:clamp(36px,4.5vw,60px)">${e(page.team.intro)}</p>

    <h3 style="font-size:clamp(19px,2vw,23px);max-width:34ch;margin-bottom:var(--s3)">${e(page.team.leadershipTitle)}</h3>
    <p style="font-size:var(--t-body);color:var(--text-3);max-width:60ch;margin-bottom:clamp(28px,3.5vw,44px)">${e(page.team.leadershipIntro)}</p>

    <div class="people">
${people}
    </div>

    <div style="margin-top:var(--s6)">
      <a class="btn btn--outline" href="/${page.prefix}tym.html">${e(page.team.link)} ${arrow}</a>
    </div>

    <h2 style="max-width:22ch;margin-top:clamp(56px,7vw,104px)">${e(content.resources.title)}</h2>

    <div class="detail-grid" style="margin-top:clamp(28px,3.5vw,44px)">
${details}
    </div>
  </div>
</section>`;
}

function contact(page) {
  return `<section class="section section--surface" id="contact">
  <div class="wrap">
    <div class="contact-card">
      <div class="kicker"><span><b>07</b> · ${e(page.contact.kicker)}</span></div>
      <h2>${e(page.contact.title)}</h2>
      <p class="c-lead">${e(page.contact.text)}</p>
      <div class="contact-actions">
        <a class="btn btn--lg" href="${bookingUrl}" target="_blank" rel="noopener">${e(page.contact.primary)} ${arrow}</a>
        <a class="btn btn--outline btn--lg" href="mailto:milo@enterit.cz">${e(page.contact.secondary)}</a>
      </div>
    </div>
  </div>
</section>`;
}

function footer(page) {
  const f = page.footer;
  const menu = [
    ["#services", page.nav.services],
    ["#results", page.nav.results],
    ["#process", page.nav.process],
    ["#integrations", page.nav.integrations],
    ["#team", page.nav.team],
  ]
    .map(([href, label]) => `        <a href="${href}">${e(label)}</a>`)
    .join("\n");

  const solutions = f.solutions
    .map(([label, href]) => `        <a href="/${page.prefix}${href}">${e(label)}</a>`)
    .join("\n");

  return `<footer class="site-footer">
  <div class="wrap">
    <p class="foot-claim">${e(f.headline)}</p>

    <div class="foot-grid">
      <div class="foot-col foot-contact">
        <h3>${e(f.contactHeading)}</h3>
        <a href="mailto:milo@enterit.cz">milo@enterit.cz</a>
        <a href="tel:+420608969263">+420 608 969 263</a>
        <p class="foot-addr">
          AI Enter s.r.o.<br>
          IČO 19086652 · DIČ CZ19086652<br>
          Zahradní 2004/46d<br>
          792 01 Bruntál, Czechia
        </p>
        <div class="socials">
          <a href="https://www.linkedin.com/company/enterin/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95 4 0 4.4 2.5 4.4 5.8V21h-4v-5.6c0-1.35-.02-3.1-1.9-3.1s-2.2 1.48-2.2 3v5.7H9z"/></svg>
          </a>
          <a href="https://www.instagram.com/enterco/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none"/></svg>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61579684083040" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.3-.04-1.3-.13-2.45-.13-2.42 0-4.08 1.48-4.08 4.2v2.22H7.5V13h2.67v8z"/></svg>
          </a>
        </div>
      </div>

      <div class="foot-col">
        <h3>${e(f.menuHeading)}</h3>
${menu}
        <a href="/us/">US delivery partnership</a>
        <a href="https://enterai.cz" target="_blank" rel="noopener">EnterAI</a>
      </div>

      <div class="foot-col">
        <h3>${e(f.solutionsHeading)}</h3>
${solutions}
      </div>
    </div>

    <div class="foot-bar">
      <span>© 2026 EnterIT · AI Enter s.r.o.</span>
      <span class="legal">
        <a href="/${page.prefix}gdpr.html">${e(f.privacy)}</a>
        <a href="/${page.prefix}podminky.html">${e(f.terms)}</a>
      </span>
    </div>
  </div>
</footer>`;
}

const behaviour = `<script>
(function(){
  var b = document.getElementById('burger'), m = document.getElementById('mobileNav');
  b.addEventListener('click', function(){
    var open = m.classList.toggle('open');
    b.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  m.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ m.classList.remove('open'); b.setAttribute('aria-expanded','false'); });
  });

  /* count-up uses setInterval: requestAnimationFrame stalls in headless preview */
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function countUp(el){
    var target = +el.dataset.val, suf = el.dataset.suf || '', dur = 1600, t0 = Date.now();
    if(reduced){ el.textContent = target.toLocaleString('en-GB') + suf; return; }
    var id = setInterval(function(){
      var p = Math.min((Date.now() - t0) / dur, 1), eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString('en-GB') + suf;
      if(p >= 1) clearInterval(id);
    }, 32);
  }
  var seen = false, k = document.querySelector('.cons-kpis');
  function startCounters(){
    if(seen || !k) return;
    var r = k.getBoundingClientRect();
    if(r.top >= window.innerHeight || r.bottom <= 0) return;
    seen = true;
    document.querySelectorAll('.num').forEach(countUp);
    window.removeEventListener('scroll', startCounters);
  }
  startCounters();
  window.addEventListener('scroll', startCounters, {passive:true});
  setTimeout(startCounters, 400);

  var search = document.getElementById('intgSearch');
  if(search){
    var rows = [].slice.call(document.querySelectorAll('#intgWrap .intg-row'));
    var empty = document.getElementById('intgEmpty');
    search.addEventListener('input', function(){
      var q = search.value.trim().toLowerCase();
      var anyVisible = false;
      rows.forEach(function(row){
        var chips = [].slice.call(row.querySelectorAll('.intg-chips span'));
        var rowHas = false;
        chips.forEach(function(ch){
          var match = !q || ch.textContent.toLowerCase().indexOf(q) !== -1;
          ch.style.display = match ? '' : 'none';
          ch.classList.toggle('hit', !!q && match);
          if(match) rowHas = true;
        });
        row.style.display = rowHas ? '' : 'none';
        if(rowHas) anyVisible = true;
      });
      empty.style.display = (q && !anyVisible) ? 'block' : 'none';
    });
  }
})();
<\/script>`;

function renderBeta(code) {
  const page = locales[code];
  const content = restorationContent[code];
  return `<!doctype html>
<html lang="${page.lang}">
${head(page, code)}
<body>

${header(page, code)}

${hero(page, code)}

${services(page, content)}

${results(page, content, code)}

${process(page, content)}

${integrations(page, content)}

${operations(content)}

${team(page, content)}

${contact(page)}

${footer(page)}

${behaviour}
</body>
</html>
`;
}

for (const code of betaOrder) {
  const out = resolve(root, "beta", betaFile[code]);
  writeFileSync(out, renderBeta(code), "utf8");
  console.log(`beta/${betaFile[code]}  (${code})`);
}
console.log("Beta built.");
