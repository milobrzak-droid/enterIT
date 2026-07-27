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
 * Beta-only chrome. These strings have no home in the production content model
 * (the live site carries the EnterAI relationship elsewhere), so the beta keeps
 * its own copy for the notice bar and the hero eyebrow.
 */
const betaCopy = {
  en: {
    notice: "Delivery team of <b>EnterAI</b> — we build and run what strategy specifies.",
    noticeLink: "About EnterAI",
    eyebrow: "Enterprise software · AI · integrations",
    usTitle: "US delivery partnership",
    usText: "A European engineering partner for US consultancies, Microsoft partners and systems integrators.",
    aiTitle: "Looking for strategy first?",
    aiText: "EnterAI maps where AI pays off before anything gets built. We deliver what it specifies.",
  },
  cs: {
    notice: "Exekuční tým sesterské <b>EnterAI</b> — stavíme a provozujeme to, co strategie zadá.",
    noticeLink: "O EnterAI",
    eyebrow: "Enterprise software · AI · integrace",
    usTitle: "Dodavatelské partnerství pro US",
    usText: "Evropský engineering partner pro americké konzultanty, Microsoft partnery a systémové integrátory.",
    aiTitle: "Potřebujete nejdřív strategii?",
    aiText: "EnterAI zmapuje, kde se AI vyplatí, ještě než se začne stavět. My pak dodáme, co zadá.",
  },
  de: {
    notice: "Umsetzungsteam von <b>EnterAI</b> — wir bauen und betreiben, was die Strategie vorgibt.",
    noticeLink: "Über EnterAI",
    eyebrow: "Enterprise-Software · KI · Integrationen",
    usTitle: "Delivery-Partnerschaft für die USA",
    usText: "Ein europäischer Engineering-Partner für US-Beratungen, Microsoft-Partner und Systemintegratoren.",
    aiTitle: "Zuerst die Strategie?",
    aiText: "EnterAI zeigt, wo sich KI rechnet, bevor gebaut wird. Wir liefern anschließend die Umsetzung.",
  },
  pl: {
    notice: "Zespół wykonawczy <b>EnterAI</b> — budujemy i utrzymujemy to, co określa strategia.",
    noticeLink: "O EnterAI",
    eyebrow: "Enterprise software · AI · integracje",
    usTitle: "Partnerstwo wdrożeniowe dla USA",
    usText: "Europejski partner inżynieryjny dla amerykańskich konsultingów, partnerów Microsoftu i integratorów.",
    aiTitle: "Najpierw strategia?",
    aiText: "EnterAI wskazuje, gdzie AI się opłaca, zanim cokolwiek powstanie. My realizujemy to, co określi.",
  },
};

const e = (v) => escapeHtml(v ?? "");
const arrow = '<span class="arr">→</span>';

const chev = (dir) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${
    dir === "prev" ? "m15 18-6-6 6-6" : "m9 18 6-6-6-6"
  }"/></svg>`;

/** Wraps tiles in a horizontally scrollable rail with prev/next controls. */
function rail(tilesHtml, labels) {
  return `    <div class="rail">
      <div class="rail-head">
        <p class="rail-hint">${e(labels.hint)}</p>
        <div class="rail-nav">
          <button class="rail-btn" type="button" data-rail="prev" aria-label="${e(labels.prev)}">${chev("prev")}</button>
          <button class="rail-btn" type="button" data-rail="next" aria-label="${e(labels.next)}">${chev("next")}</button>
        </div>
      </div>
      <div class="rail-track">
${tilesHtml}
      </div>
    </div>`;
}

/* Rail affordance copy — no home in the production content model. */
const railLabels = {
  en: { hint: "Swipe or use the arrows for more", prev: "Previous", next: "Next" },
  cs: { hint: "Posuňte nebo použijte šipky pro další", prev: "Předchozí", next: "Další" },
  de: { hint: "Wischen oder Pfeile für mehr nutzen", prev: "Zurück", next: "Weiter" },
  pl: { hint: "Przesuń lub użyj strzałek, by zobaczyć więcej", prev: "Poprzedni", next: "Następny" },
};

/**
 * Colour discipline, per the Enter brand manual.
 *
 * Turquoise is the primary and dominates; pink, blue, violet, red and yellow are
 * accents, not equal partners. So colour is assigned per SECTION, never per card
 * — a grid of cards in six different colours reads as noise, not as a system.
 */
const sectionAccent = {
  services: "turquoise",
  results: "blue",
  process: "turquoise",
  integrations: "violet",
  operations: "turquoise",
  team: "pink",
};

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
    <div class="partners-band">
      <span class="p-lbl">${e(page.partnerLabel)}</span>
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI">
      <span class="ms-logo">
        <span class="ms-sq"><i></i><i></i><i></i><i></i></span>
        <span><b>Microsoft</b>Solutions Partner</span>
      </span>
    </div>
  </div>
</section>`;
}

function services(page, content, code) {
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
      /* Card carries the outcome only. The how — inputs, outputs, walkthrough —
         lives on the solution page a click away. */
      return `      <a class="sol sticker" href="/${card.href}">
        <span class="illus-wrap"><img class="illus" src="/assets/decor/${art}" alt="" loading="lazy"></span>
        <h4>${e(card.title)}</h4>
        <span class="sol-proof">${e(card.proof)}</span>
      </a>`;
    })
    .join("\n");

  return `<section class="section section--surface has-decor accent-turquoise" id="services">
  <div class="wrap">
    <div class="kicker"><span><b>01</b> · ${e(page.services.kicker)}</span></div>
    <div class="sec-head"><h2 style="max-width:20ch">${e(page.services.title)}</h2><span class="squig squig--curl" style="width:118px;top:-46px;right:-104px"></span></div>

    <div class="pillars" style="margin-top:clamp(32px,4vw,56px)">
${pillars}
    </div>

    <h2 style="max-width:22ch;margin-top:clamp(56px,7vw,104px)">${e(content.solutions.title)}</h2>

    <div style="margin-top:clamp(28px,3.5vw,44px)">
${rail(solutions, railLabels[code])}
    </div>

    <p class="sol-cta">${e(content.solutions.cta)} <a href="#contact">${e(page.contact.primary)} ${arrow}</a></p>
  </div>
</section>`;
}

function results(page, content, code) {
  const labels = content.cases.labels;
  const cards = content.cases.cards
    .map((item) => {
      const tech = (item.tech || [])
        .map((t) => `<span>${e(t)}</span>`)
        .join("");
      /* The card states outcome only. Problem and solution sit behind a toggle so
         the grid stays scannable and the detail is one click away, not a wall. */
      return `      <article class="case">
        <span class="case-ob">${e(item.context)}</span>
        <span class="case-kpi">${e(item.metric)}</span>
        <p class="case-impact">${e(item.impact)}</p>
        <details class="case-more">
          <summary>${e(labels.problem)} &amp; ${e(labels.solution)}</summary>
          <dl>
            <div><dt>${e(labels.problem)}</dt><dd>${e(item.problem)}</dd></div>
            <div><dt>${e(labels.solution)}</dt><dd>${e(item.solution)}</dd></div>
          </dl>
        </details>
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

  return `<section class="section section--deep has-decor accent-blue" id="results">
  <span class="blob blob--violet" style="width:520px;height:520px;top:-180px;right:-190px"></span>
  <span class="blob blob--blue" style="width:420px;height:420px;bottom:-160px;left:-170px"></span>
  <div class="wrap rel">
    <div class="kicker"><span><b>02</b> · ${e(page.results.kicker)}</span></div>
    <div class="sec-head"><h2 style="max-width:20ch">${e(page.results.title)}</h2><span class="squig squig--loop" style="width:126px;top:-40px;right:-116px"></span></div>

    <div style="margin-top:clamp(32px,4vw,56px)">
${rail(cards, railLabels[code])}
    </div>

    <p class="case-note">
      <span>${e(page.results.note)}</span>
      <a href="#contact">${e(page.results.link)} →</a>
    </p>

    <div class="feature">
      <img class="mascot mascot--peek mascot--float" src="/assets/decor/mascot-blue.svg" alt="" aria-hidden="true" style="top:-40px;right:34px">
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

  return `<section class="section section--surface has-decor accent-turquoise" id="process">
  <div class="wrap">
    <div class="kicker"><span><b>03</b> · ${e(page.process.kicker)}</span></div>
    <div class="sec-head"><h2 style="max-width:18ch">${e(page.process.title)}</h2><span class="squig squig--wave" style="width:230px;bottom:-34px;right:-190px"></span></div>
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
      return `      <div class="intg-row">
        <h3>${e(g.title)}</h3>
        <div class="intg-chips">${chips}</div>
      </div>`;
    })
    .join("\n");

  const points = page.integrations.points
    .map(
      (p, i) =>
        `      <div class="card"><ul class="check-list"><li>${e(p)}</li></ul></div>`
    )
    .join("\n");

  return `<section class="section section--deep has-decor accent-violet" id="integrations">
  <div class="wrap">
    <div class="kicker"><span><b>04</b> · ${e(page.integrations.kicker)}</span></div>
    <div class="sec-head"><h2 style="max-width:18ch">${e(page.integrations.title)}</h2><span class="squig squig--hook" style="width:104px;top:-38px;right:-92px"></span></div>
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

  return `<section class="section section--surface accent-turquoise" id="operations">
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

  return `<section class="section section--deep has-decor accent-pink" id="team">
  <span class="blob blob--turquoise" style="width:460px;height:460px;top:-140px;left:-180px"></span>
  <div class="wrap rel">
    <div class="kicker"><span><b>06</b> · ${e(page.team.kicker)}</span></div>
    <div class="sec-head"><h2 style="max-width:20ch">${e(page.team.title)}</h2><span class="squig squig--curl" style="width:120px;top:-42px;right:-108px"></span></div>
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

/**
 * Savings calculator.
 *
 * Laid out on the brand manual's web pattern: a rounded info panel holding about
 * 30% of the width on the left, the working area on the right.
 */
function calculator(content) {
  const c = content.calculator;
  const f = c.fields;
  const slider = (key, field) => `        <div class="calc-field">
          <label for="calc-${key}">${e(field.label)} <b id="calc-${key}-v"></b></label>
          <input id="calc-${key}" type="range" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.defaultValue}">
          <span class="calc-hint">${e(field.hint)}</span>
        </div>`;

  return `<section class="section section--surface accent-turquoise" id="calculator">
  <div class="wrap">
    <div class="calc-layout">

      <aside class="calc-panel">
        <div class="kicker"><span><b>07</b> · ${e(c.kicker)}</span></div>
        <h2>${e(c.title)}</h2>
        <p class="calc-intro">${e(c.intro)}</p>
        <p class="calc-disclaimer">${e(c.disclaimer)}</p>
      </aside>

      <div class="calc-work"
           data-weeks="${c.weeksPerYear}" data-fte="${c.fteHoursPerYear}"
           data-symbol="${e(c.currency.symbol)}" data-locale="${e(c.currency.locale)}">
        <div class="calc-fields">
${slider("people", f.people)}
${slider("hours", f.hours)}
${slider("rate", f.rate)}
${slider("share", f.share)}
        </div>

        <div class="calc-results">
          <div class="calc-primary">
            <b id="calc-out-money">—</b>
            <span>${e(c.results.annualSavings)}</span>
            <small>${e(c.results.annualSavingsHint)}</small>
          </div>
          <div class="calc-secondary">
            <div><b id="calc-out-hours">—</b><span>${e(c.results.hoursSaved)}</span></div>
            <div><b id="calc-out-fte">—</b><span>${e(c.results.fteFreed)}</span></div>
          </div>
          <a class="btn" href="#contact">${e(c.results.cta)} ${arrow}</a>
        </div>
      </div>

    </div>
  </div>
</section>`;
}

function contact(page, code) {
  return `<section class="section section--surface" id="contact">
  <div class="wrap">
    <div class="contact-card">
      <div class="kicker"><span><b>08</b> · ${e(page.contact.kicker)}</span></div>
      <h2>${e(page.contact.title)}</h2>
      <p class="c-lead">${e(page.contact.text)}</p>
      <div class="contact-actions">
        <a class="btn btn--lg" href="${bookingUrl}" target="_blank" rel="noopener">${e(page.contact.primary)} ${arrow}</a>
        <a class="btn btn--outline btn--lg" href="mailto:milo@enterit.cz">${e(page.contact.secondary)}</a>
      </div>
      <img class="mascot mascot--float" src="/assets/decor/mascot-red.svg" alt="" aria-hidden="true" style="top:clamp(28px,4vw,56px);right:clamp(28px,5vw,80px);width:clamp(64px,8vw,116px)">
    </div>

    <!-- Figma's two-up closing pair: one dark card, one gradient card. -->
    <div class="cta-duo" style="margin-top:clamp(28px,3.5vw,44px)">
      <a class="cta-card cta-card--dark" href="/us/">
        <h3>${e(betaCopy[code].usTitle)}</h3>
        <p>${e(betaCopy[code].usText)}</p>
        <span class="cta-go">↗</span>
      </a>
      <a class="cta-card cta-card--grad" href="https://enterai.cz" target="_blank" rel="noopener">
        <h3>${e(betaCopy[code].aiTitle)}</h3>
        <p>${e(betaCopy[code].aiText)}</p>
        <span class="cta-go">${arrow}</span>
      </a>
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

  /* horizontal tile rails */
  document.querySelectorAll('.rail').forEach(function(rail){
    var track = rail.querySelector('.rail-track');
    var prev = rail.querySelector('[data-rail="prev"]');
    var next = rail.querySelector('[data-rail="next"]');
    if(!track) return;

    function step(){
      var first = track.firstElementChild;
      return first ? first.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    }
    var head = rail.querySelector('.rail-head');
    function sync(){
      var max = track.scrollWidth - track.clientWidth;
      /* Nothing hidden means no affordance: promising "more" when the tiles
         already fit would be a lie the user pays for with a wasted click. */
      var scrollable = max > 2;
      if(head) head.hidden = !scrollable;
      rail.dataset.static = !scrollable;
      if(!scrollable){ rail.dataset.atStart = true; rail.dataset.atEnd = true; return; }
      var atStart = track.scrollLeft <= 2;
      var atEnd = track.scrollLeft >= max - 2;
      rail.dataset.atStart = atStart;
      rail.dataset.atEnd = atEnd;
      if(prev) prev.disabled = atStart;
      if(next) next.disabled = atEnd;
    }
    /* Own tween instead of behavior:'smooth' — the native option is a no-op in
       some embedded webviews, which would leave the arrows doing nothing. */
    var anim = null;
    function glide(delta){
      if(matchMedia('(prefers-reduced-motion: reduce)').matches){
        track.scrollLeft += delta; sync(); return;
      }
      clearInterval(anim);
      var from = track.scrollLeft, to = from + delta, t0 = Date.now(), dur = 380;
      anim = setInterval(function(){
        var p = Math.min((Date.now() - t0) / dur, 1);
        track.scrollLeft = from + (to - from) * (1 - Math.pow(1 - p, 3));
        if(p >= 1){ clearInterval(anim); sync(); }
      }, 16);
    }
    if(prev) prev.addEventListener('click', function(){ glide(-step()); });
    if(next) next.addEventListener('click', function(){ glide(step()); });
    track.addEventListener('scroll', sync, {passive:true});
    window.addEventListener('resize', sync);
    sync();
  });

  /* savings calculator */
  var calc = document.querySelector('.calc-work');
  if(calc){
    var WEEKS = +calc.dataset.weeks, FTE = +calc.dataset.fte;
    var SYM = calc.dataset.symbol, LOC = calc.dataset.locale;
    var ids = ['people','hours','rate','share'];
    var el = {};
    ids.forEach(function(k){ el[k] = document.getElementById('calc-'+k); });
    var out = {
      money: document.getElementById('calc-out-money'),
      hours: document.getElementById('calc-out-hours'),
      fte: document.getElementById('calc-out-fte')
    };
    function fmt(n){ return Math.round(n).toLocaleString(LOC); }
    function run(){
      var p = +el.people.value, h = +el.hours.value, r = +el.rate.value, s = +el.share.value / 100;
      document.getElementById('calc-people-v').textContent = p;
      document.getElementById('calc-hours-v').textContent = h + ' h';
      document.getElementById('calc-rate-v').textContent = SYM + r;
      document.getElementById('calc-share-v').textContent = (s * 100) + ' %';
      var savedHrs = p * h * s * WEEKS;
      out.money.textContent = SYM + fmt(savedHrs * r);
      out.hours.textContent = fmt(savedHrs);
      out.fte.textContent = (savedHrs / FTE).toFixed(1).replace('.', ',') + '×';
    }
    ids.forEach(function(k){ el[k].addEventListener('input', run); });
    run();
  }

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

${services(page, content, code)}

${results(page, content, code)}

${process(page, content)}

${integrations(page, content)}

${operations(content)}

${team(page, content)}

${calculator(content)}

${contact(page, code)}

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
