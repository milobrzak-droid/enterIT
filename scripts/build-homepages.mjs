import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { bookingUrl, localeOrder, locales } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { arrow, escapeHtml, languageMenu, siteFooter } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetVersion = "20260723-release-1";
const faviconVersion = assetVersion;

const solutionIcons = [
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"></circle><path d="M12 7v5l3 2"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16v12H4z"></path><path d="m4 7 8 6 8-6"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.6 2.8 7.8 7 10 4.2-2.2 7-5.4 7-10V6z"></path><path d="m9 12 2 2 4-5"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m4 8 8-4 8 4-8 4z"></path><path d="M4 8v8l8 4 8-4V8"></path><path d="M12 12v8"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v15H5z"></path><path d="M8 3v4M16 3v4M5 9h14"></path><path d="m9 14 2 2 4-4"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 17h14l-1-6-3-3H9l-3 3z"></path><circle cx="8" cy="18" r="1.5"></circle><circle cx="16" cy="18" r="1.5"></circle><path d="M9 8 7 5M15 8l2-3"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h10l3 3v15H6z"></path><path d="M16 3v4h4M9 11h6M9 15h6"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v17H7z"></path><path d="M9 2h6v4H9zM10 11h4M10 15h4"></path></svg>',
];

const implementationIcons = [
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11l3 3v13H5z"></path><path d="M16 4v4h4M8 12h8M8 16h5"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10"></path><circle cx="8" cy="6" r="2"></circle><circle cx="15" cy="12" r="2"></circle><circle cx="11" cy="18" r="2"></circle></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3"></circle><path d="M6 20c.6-4 2.6-6 6-6s5.4 2 6 6"></path><path d="m17 10 2 2 3-4"></path></svg>',
  '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v14H4z"></path><path d="m8 12 3 3 5-6"></path></svg>',
];

function homepageLanguageMenu(current) {
  const page = locales[current];
  const links = Object.fromEntries(localeOrder.map((code) => [code, locales[code].homeHref]));
  return languageMenu({ current, label: page.languageLabel, links, order: localeOrder });
}

function schemaFor(page) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://enterit.cz/#organization",
        name: "EnterIT",
        alternateName: "Enter IT",
        legalName: "AI Enter s.r.o.",
        url: "https://enterit.cz/",
        logo: {
          "@type": "ImageObject",
          "@id": "https://enterit.cz/#logo",
          url: "https://enterit.cz/assets/enter_logo_color.svg",
          contentUrl: "https://enterit.cz/assets/enter_logo_color.svg",
          width: 477,
          height: 200,
        },
        image: "https://enterit.cz/assets/og.png",
        email: "milo@enterit.cz",
        telephone: "+420608969263",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Zahradní 2004/46d",
          postalCode: "792 01",
          addressLocality: "Bruntál",
          addressCountry: "CZ",
        },
        vatID: "CZ19086652",
        sameAs: [
          "https://www.facebook.com/profile.php?id=61579684083040",
          "https://www.instagram.com/enterco/",
          "https://www.linkedin.com/company/enterin/",
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "sales",
          email: "milo@enterit.cz",
          telephone: "+420608969263",
          availableLanguage: localeOrder,
        },
        knowsAbout: [
          "AI agents",
          "business process automation",
          "systems integration",
          "custom software development",
          "data platforms",
        ],
      },
      {
        "@type": "WebSite",
        "@id": "https://enterit.cz/#website",
        url: "https://enterit.cz/",
        name: "EnterIT",
        alternateName: "Enter IT",
        inLanguage: localeOrder,
        publisher: { "@id": "https://enterit.cz/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": `${page.canonical}#webpage`,
        url: page.canonical,
        name: page.title,
        description: page.description,
        inLanguage: page.lang,
        isPartOf: { "@id": "https://enterit.cz/#website" },
        about: { "@id": "https://enterit.cz/#organization" },
      },
    ],
  });
}

function head(page) {
  return `<!doctype html>
<html lang="${page.lang}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${page.lang === "cs" ? '  <meta name="google-site-verification" content="TIwBuUuxDZcJpJkTfmhk2jhrqD3BiVpEhQBnvMJpknI">\n' : ""}  <script>document.documentElement.classList.replace("no-js", "js")</script>
  <title>${escapeHtml(page.title)}</title>
  <meta name="description" content="${escapeHtml(page.description)}">
  <meta name="robots" content="index,follow">
  <meta name="author" content="AI Enter s.r.o.">
  <meta name="theme-color" content="#41E39E">
  <link rel="canonical" href="${page.canonical}">
  <link rel="alternate" hreflang="cs" href="https://enterit.cz/">
  <link rel="alternate" hreflang="en" href="https://enterit.cz/en.html">
  <link rel="alternate" hreflang="de" href="https://enterit.cz/de.html">
  <link rel="alternate" hreflang="pl" href="https://enterit.cz/pl.html">
  <link rel="alternate" hreflang="x-default" href="https://enterit.cz/">
  <link rel="sitemap" type="application/xml" href="https://enterit.cz/sitemap.xml">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=${faviconVersion}">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=${faviconVersion}">
  <link rel="icon" href="/favicon.ico?v=${faviconVersion}" sizes="any">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=${faviconVersion}">
  <link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/site-shell.css?v=${assetVersion}">
  <link rel="stylesheet" href="/assets/home.css?v=${assetVersion}">
  <link rel="stylesheet" href="/assets/brand-manual.css?v=${assetVersion}">
  <script src="/assets/home.js?v=${assetVersion}" defer></script>
  <script src="/assets/brand-manual.js?v=${assetVersion}" defer></script>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EnterIT">
  <meta property="og:locale" content="${page.ogLocale}">
  <meta property="og:title" content="${escapeHtml(page.title)}">
  <meta property="og:description" content="${escapeHtml(page.description)}">
  <meta property="og:url" content="${page.canonical}">
  <meta property="og:image" content="https://enterit.cz/assets/og.png">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${escapeHtml(page.title)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(page.title)}">
  <meta name="twitter:description" content="${escapeHtml(page.description)}">
  <meta name="twitter:image" content="https://enterit.cz/assets/og.png">
  <meta name="twitter:image:alt" content="${escapeHtml(page.title)}">
  <script type="application/ld+json">${schemaFor(page)}</script>
  <script defer src="/assets/analytics.js?v=${assetVersion}"></script>
</head>`;
}

function navigation(page, code) {
  const navigationLinks = `
    <a href="#services">${escapeHtml(page.nav.services)}</a>
    <a href="#results">${escapeHtml(page.nav.results)}</a>
    <a href="#process">${escapeHtml(page.nav.process)}</a>
    <a href="#integrations">${escapeHtml(page.nav.integrations)}</a>
    <a href="#team">${escapeHtml(page.nav.team)}</a>`;

  return `<header class="site-header" id="site-header">
  <div class="shell nav-shell">
    <a class="brand" href="${page.homeHref}" aria-label="${escapeHtml(page.homeLabel)}">
      <img src="/assets/enter_logo_black.svg" alt="EnterIT" width="477" height="200">
    </a>
    <nav class="desktop-nav" aria-label="${escapeHtml(page.mainNavLabel)}">${navigationLinks}</nav>
    <div class="nav-actions">
      ${homepageLanguageMenu(code)}
      <a class="button button--small" href="#contact">${escapeHtml(page.nav.contact)} ${arrow}</a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="${escapeHtml(page.menuOpen)}" data-open-label="${escapeHtml(page.menuOpen)}" data-close-label="${escapeHtml(page.menuClose)}" aria-controls="mobile-panel" aria-expanded="false"><span></span></button>
    </div>
  </div>
  <div class="mobile-panel" id="mobile-panel" aria-hidden="true" inert hidden>
    <nav class="mobile-nav" aria-label="${escapeHtml(page.mobileNavLabel)}">${navigationLinks}</nav>
    <div class="mobile-panel__bottom">
      <a class="button button--small" href="#contact">${escapeHtml(page.nav.contact)} ${arrow}</a>
    </div>
  </div>
</header>`;
}

function hero(page) {
  const proof = page.proof
    .map(
      ([value, label]) =>
        `<div class="proof-item"><strong data-count-up>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`,
    )
    .join("");

  return `<section class="hero brand-section" id="home">
  <div class="shell hero__inner">
    <div class="hero__stage">
      <div class="hero__copy">
        <h1>${escapeHtml(page.hero.title)} <em>${escapeHtml(page.hero.highlight)}</em></h1>
        <div class="hero__bottom">
          <p class="hero__lead">${escapeHtml(page.hero.lead)}</p>
          <div class="hero__actions">
            <a class="button" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(page.hero.primary)} ${arrow}</a>
            <a class="button button--ghost" href="#results">${escapeHtml(page.hero.secondary)}</a>
          </div>
        </div>
      </div>
      <div class="hero-brand-art" aria-hidden="true">
        <span class="hero-brand-art__shape"><img src="/assets/decor/mascot-blue.svg" alt="" width="130" height="101"></span>
      </div>
    </div>
    <div class="proof-strip">${proof}</div>
  </div>
</section>`;
}

function partners(page) {
  return `<section class="partner-bar" aria-label="${escapeHtml(page.partnerLabel)}">
  <div class="shell partner-bar__inner">
    <span class="partner-bar__label">${escapeHtml(page.partnerLabel)}</span>
    <div class="partner-logos">
      <img class="partner-logo partner-logo--microsoft" src="/assets/logos/microsoft.png" alt="Microsoft Solutions Partner" width="1000" height="200" loading="lazy" decoding="async">
      <img class="partner-logo partner-logo--tdsynnex" src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI" width="1300" height="460" loading="lazy" decoding="async">
    </div>
  </div>
</section>`;
}

function services(page) {
  const cards = page.services.cards
    .map(
      (card) => `<article class="service-card">
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>
        <ul class="service-list">${card.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
        <a class="text-link" href="${card.href}">${escapeHtml(card.link)}</a>
      </article>`,
    )
    .join("");

  return `<section class="section brand-section" id="services">
  <div class="shell">
    <div class="section-head">
      <div><h2 class="section-title">${escapeHtml(page.services.title)}</h2></div>
      <p class="section-intro">${escapeHtml(page.services.intro)}</p>
    </div>
    <div class="brand-illustration brand-illustration--services" aria-hidden="true"><img class="brand-illustration__scene" src="/assets/decor/illustration-workstation.webp" alt="" width="720" height="540" loading="lazy" decoding="async"><img class="brand-illustration__mascot" src="/assets/decor/mascot-red.svg" alt="" width="127" height="99" loading="lazy" decoding="async"></div>
    <div class="services-grid">${cards}</div>
  </div>
</section>`;
}

function solutionCatalog(content) {
  const cards = content.cards
    .map(
      (card, index) => `<a class="solution-card" href="${escapeHtml(card.href)}">
        <span class="solution-card__icon">${solutionIcons[index % solutionIcons.length]}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.description)}</p>
        <div class="solution-card__flow" aria-label="${escapeHtml(`${card.input} → ${card.output}`)}">
          <span class="solution-card__input">${escapeHtml(card.input)}</span><b class="solution-card__arrow" aria-hidden="true">→</b><span class="solution-card__output">${escapeHtml(card.output)}</span>
        </div>
        <strong class="solution-card__proof" data-count-up>${escapeHtml(card.proof)}</strong>
        <span class="solution-card__link" aria-hidden="true">→</span>
      </a>`,
    )
    .join("");

  return `<section class="section section--white solutions brand-section" id="solutions">
  <div class="shell">
    <div class="section-head">
      <div><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <p class="section-intro">${escapeHtml(content.intro)}</p>
    </div>
    <div class="solution-grid">${cards}</div>
    <div class="solution-catalog__cta"><a class="text-link" href="#contact">${escapeHtml(content.cta)}</a></div>
  </div>
</section>`;
}

function results(page, content) {
  const cases = content.cards
    .map(
      (item, index) => `<article class="case-card" aria-labelledby="case-${index + 1}-title">
        <div class="case-card__top">
          <h3 class="case-card__context" id="case-${index + 1}-title">${escapeHtml(item.context)}</h3>
          <strong data-count-up>${escapeHtml(item.metric)}</strong>
        </div>
        <div class="case-card__detail">
          <span>${escapeHtml(content.labels.problem)}</span>
          <p>${escapeHtml(item.problem)}</p>
        </div>
        <div class="case-card__detail">
          <span>${escapeHtml(content.labels.solution)}</span>
          <p>${escapeHtml(item.solution)}</p>
        </div>
        <div class="case-card__impact">
          <span>${escapeHtml(content.labels.impact)}</span>
          <p>${escapeHtml(item.impact)}</p>
        </div>
        <div class="case-card__technology">
          <span>${escapeHtml(content.labels.technology)}</span>
          <div class="case-card__tech">${item.tech.map((tech) => `<span>${escapeHtml(tech)}</span>`).join("")}</div>
        </div>
      </article>`,
    )
    .join("");

  return `<section class="section results brand-section" id="results">
  <div class="shell">
    <div class="section-head">
      <div><span class="section-kicker">${escapeHtml(content.kicker)}</span><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <p class="section-intro">${escapeHtml(content.intro)}</p>
    </div>
    <div class="case-grid">${cases}</div>
    <p class="results-note"><span>${escapeHtml(page.results.note)}</span><a class="text-link" href="#contact">${escapeHtml(page.results.link)}</a></p>
  </div>
</section>`;
}

function implementation(content) {
  const stages = content.stages
    .map(
      (stage, index) => `<li class="implementation-step${stage.human ? " implementation-step--human" : ""}">
        <span class="implementation-step__icon">${implementationIcons[index % implementationIcons.length]}</span><div><h3>${escapeHtml(stage.title)}</h3><p>${escapeHtml(stage.text)}</p></div>
      </li>`,
    )
    .join("");

  return `<section class="section section--white implementation brand-section" id="implementation">
  <div class="shell">
    <div class="section-head">
      <div><span class="section-kicker">${escapeHtml(content.kicker)}</span><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <p class="section-intro">${escapeHtml(content.intro)}</p>
    </div>
    <div class="implementation-panel implementation-panel--editorial">
      <ol class="implementation-flow">${stages}</ol>
      <p class="implementation-note">${escapeHtml(content.note)}</p>
    </div>
  </div>
</section>`;
}

function processSection(page, timings) {
  const steps = page.process.steps
    .map(
      ([title, text], index) =>
        `<article class="process-step"><span class="process-step__timing">${escapeHtml(timings[index] || "")}</span><h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p></article>`,
    )
    .join("");

  return `<section class="section section--white brand-section" id="process">
  <div class="shell">
    <div class="section-head process-head">
      <div class="process-head__copy"><h2 class="section-title">${escapeHtml(page.process.title)}</h2><p class="section-intro">${escapeHtml(page.process.intro)}</p></div>
      <div class="process-head__visual" aria-hidden="true"><img class="process-head__mascot" src="/assets/decor/mascot-red.svg" alt="" width="127" height="99" loading="eager" decoding="async"></div>
    </div>
    <div class="process-grid">${steps}</div>
    <div class="process-links">
      <a class="text-link" href="${page.prefix}jak-stavime-agenty.html">${escapeHtml(page.process.agentsLink)}</a>
      <a class="text-link" href="${page.prefix}jak-stavime-automatizace.html">${escapeHtml(page.process.automationLink)}</a>
    </div>
  </div>
</section>`;
}

function integrations(page, content) {
  const points = page.integrations.points.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const groups = content.groups
    .map(
      ({ title, systems }) => `<div class="system-group">
        <h3>${escapeHtml(title)}</h3>
        <div class="system-list">${systems.map((system) => `<span>${escapeHtml(system)}</span>`).join("")}</div>
      </div>`,
    )
    .join("");

  return `<section class="section brand-section" id="integrations">
  <div class="shell integration-layout">
    <div class="integration-copy">
      <div class="integration-copy__primary">
        <h2 class="section-title">${escapeHtml(content.title)}</h2>
        <p class="integration-proof"><strong data-count-up>60+</strong><span>${escapeHtml(content.proof || "")}</span></p>
      </div>
      <div class="integration-copy__details">
        <p class="section-intro">${escapeHtml(content.intro)}</p>
        <ul class="integration-points">${points}</ul>
      </div>
    </div>
    <div class="integration-catalog">
      <div class="integration-catalog__head">
        <label class="integration-search">
          <span class="sr-only">${escapeHtml(content.searchLabel)}</span>
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input type="search" data-integration-search placeholder="${escapeHtml(content.searchPlaceholder)}" aria-label="${escapeHtml(content.searchLabel)}">
        </label>
        <span class="integration-count" data-integration-count data-count-one="${escapeHtml(content.catalogCount?.one || "")}" data-count-few="${escapeHtml(content.catalogCount?.few || "")}" data-count-many="${escapeHtml(content.catalogCount?.many || "")}" data-count-other="${escapeHtml(content.catalogCount?.other || "")}" aria-live="polite" aria-atomic="true">${escapeHtml(content.catalogLabel || "")}</span>
      </div>
      <div class="system-groups">${groups}</div>
      <p class="integration-empty" data-integration-empty hidden>${escapeHtml(content.empty)}</p>
    </div>
  </div>
</section>`;
}

function operations(content) {
  const cards = content.cards
    .map(
      (card) => `<article class="operation-card">
        <span class="operation-card__tag">${escapeHtml(card.tag)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>
        <span class="operation-card__meta">${escapeHtml(card.meta)}</span>
      </article>`,
    )
    .join("");

  return `<section class="section operations brand-section" id="operations">
  <div class="shell">
    <div class="section-head">
      <div><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <p class="section-intro">${escapeHtml(content.intro)}</p>
    </div>
    <div class="operations-grid">${cards}</div>
    <div class="operation-cta"><a class="text-link" href="#contact">${escapeHtml(content.cta)}</a></div>
  </div>
</section>`;
}

function team(page) {
  const stats = page.team.stats
    .map(([value, label]) => `<div class="team-stat"><strong data-count-up>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`)
    .join("");
  const leaders = page.team.leaders
    .map(
      (leader) => `<article class="leader-card">
        <img src="${escapeHtml(leader.image)}" alt="${escapeHtml(`${leader.name}, ${leader.role}`)}" width="600" height="600" loading="lazy" decoding="async">
        <div class="leader-card__copy">
          <h3>${escapeHtml(leader.name)}</h3>
          <span>${escapeHtml(leader.role)}</span>
          <p>${escapeHtml(leader.text)}</p>
        </div>
      </article>`,
    )
    .join("");

  return `<section class="section section--white brand-section" id="team">
  <div class="shell team-section">
    <div class="team-story">
      <div class="team-copy">
        <span class="section-kicker">${escapeHtml(page.team.kicker)}</span>
        <h2 class="section-title">${escapeHtml(page.team.title)}</h2>
        <p class="section-intro">${escapeHtml(page.team.intro)}</p>
        <div class="team-stats">${stats}</div>
        <a class="button" href="/${page.prefix}tym.html">${escapeHtml(page.team.link)} ${arrow}</a>
      </div>
      <figure class="team-photo">
        <img src="/assets/decor/firmy.webp" alt="${escapeHtml(page.team.photoAlt)}" width="900" height="675" loading="lazy" decoding="async">
      </figure>
    </div>
    <div class="leadership-head">
      <h3>${escapeHtml(page.team.leadershipTitle)}</h3>
      <p>${escapeHtml(page.team.leadershipIntro)}</p>
    </div>
    <div class="leadership-grid">${leaders}</div>
  </div>
</section>`;
}

function resources(content) {
  const cards = content.cards
    .map(
      (card) => `<article class="resource-card">
        <span class="resource-card__tag">${escapeHtml(card.tag)}</span>
        <h3>${escapeHtml(card.title)}</h3>
        <p>${escapeHtml(card.text)}</p>
        <div class="resource-card__links">${card.links
          .map((link) => `<a class="text-link" href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)
          .join("")}</div>
      </article>`,
    )
    .join("");

  return `<section class="section section--white resources brand-section" id="resources">
  <div class="shell">
    <div class="section-head section-head--compact">
      <div><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <div class="brand-illustration brand-illustration--resources" aria-hidden="true"><img class="brand-illustration__scene" src="/assets/decor/illustration-modules.webp" alt="" width="720" height="540" loading="lazy" decoding="async"></div>
    </div>
    <div class="resources-grid">${cards}</div>
  </div>
</section>`;
}

function calculator(content) {
  const fieldOrder = ["people", "hours", "rate", "share"];
  const numberFormat = new Intl.NumberFormat(content.currency.locale, { maximumFractionDigits: 0 });
  const decimalFormat = new Intl.NumberFormat(content.currency.locale, {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
  const currencyFormat = new Intl.NumberFormat(content.currency.locale, {
    style: "currency",
    currency: content.currency.code,
    maximumFractionDigits: 0,
  });
  const defaultSavedHours =
    content.fields.people.defaultValue *
    content.fields.hours.defaultValue *
    (content.fields.share.defaultValue / 100) *
    content.weeksPerYear;
  const fields = fieldOrder
    .map((name) => {
      const field = content.fields[name];
      const suffix = name === "hours" ? " h" : name === "share" ? " %" : "";
      const defaultOutput =
        name === "rate"
          ? currencyFormat.format(field.defaultValue)
          : `${numberFormat.format(field.defaultValue)}${suffix}`;
      return `<div class="calculator-field">
        <div class="calculator-field__label"><label for="calc-${name}">${escapeHtml(field.label)}</label><output data-calc-output="${name}" for="calc-${name}">${escapeHtml(defaultOutput)}</output></div>
        <input id="calc-${name}" type="range" data-calc-field="${name}" data-suffix="${escapeHtml(suffix)}" min="${field.min}" max="${field.max}" step="${field.step}" value="${field.defaultValue}" aria-describedby="calc-${name}-hint" aria-valuetext="${escapeHtml(defaultOutput)}">
        <p id="calc-${name}-hint">${escapeHtml(field.hint)}</p>
      </div>`;
    })
    .join("");

  return `<section class="section calculator brand-section" id="calc" data-calculator data-locale="${escapeHtml(content.currency.locale)}" data-currency="${escapeHtml(content.currency.code)}" data-weeks="${content.weeksPerYear}" data-fte-hours="${content.fteHoursPerYear}">
  <div class="shell">
    <div class="section-head">
      <div><h2 class="section-title">${escapeHtml(content.title)}</h2></div>
      <p class="section-intro">${escapeHtml(content.intro)}</p>
    </div>
    <div class="calculator-grid">
      <div class="calculator-form" role="group" aria-label="${escapeHtml(content.title)}">${fields}</div>
      <aside class="calculator-result">
        <span class="calculator-result__label">${escapeHtml(content.results.annualSavings)}</span>
        <strong class="calculator-result__money" data-calc-money aria-live="polite" aria-atomic="true">${escapeHtml(currencyFormat.format(defaultSavedHours * content.fields.rate.defaultValue))}</strong>
        <p>${escapeHtml(content.results.annualSavingsHint)}</p>
        <div class="calculator-result__split">
          <div><strong data-calc-hours>${escapeHtml(`${numberFormat.format(defaultSavedHours)} h`)}</strong><span>${escapeHtml(content.results.hoursSaved)}</span></div>
          <div><strong data-calc-fte>${escapeHtml(`${decimalFormat.format(defaultSavedHours / content.fteHoursPerYear)}×`)}</strong><span>${escapeHtml(content.results.fteFreed)}</span></div>
        </div>
        <a class="button" href="#contact">${escapeHtml(content.results.cta)} ${arrow}</a>
        <small>${escapeHtml(content.disclaimer)}</small>
      </aside>
    </div>
  </div>
</section>`;
}

function contact(page) {
  return `<section class="contact-section brand-section" id="contact">
  <div class="shell">
    <div class="contact-card">
      <div class="contact-card__content">
        <h2>${escapeHtml(page.contact.title)}</h2>
        <p>${escapeHtml(page.contact.text)}</p>
        <div class="contact-actions">
          <a class="button" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(page.contact.primary)} ${arrow}</a>
          <a class="button button--light" href="mailto:milo@enterit.cz">${escapeHtml(page.contact.secondary)}</a>
        </div>
      </div>
      <div class="contact-brand-art" aria-hidden="true"><img src="/assets/decor/mascot-wave.svg" alt="" width="91" height="96" loading="lazy" decoding="async"></div>
    </div>
  </div>
</section>`;
}

function renderHomepage(page, code) {
  const restored = restorationContent[code];
  return `${head(page)}
<body class="home-page brand-manual" data-locale="${code}">
<a class="skip-link" href="#main-content">${escapeHtml(page.skip)}</a>
${navigation(page, code)}
<main id="main-content" tabindex="-1">
${hero(page)}
${partners(page)}
${services(page)}
${solutionCatalog(restored.solutions)}
${results(page, restored.cases)}
${implementation(restored.implementation)}
${processSection(page, restored.processTimings)}
${integrations(page, restored.integrations)}
${operations(restored.operations)}
${team(page)}
${resources(restored.resources)}
${calculator(restored.calculator)}
${contact(page)}
</main>
${siteFooter(page)}
</body>
</html>
`;
}

for (const code of localeOrder) {
  const page = locales[code];
  writeFileSync(resolve(root, page.file), renderHomepage(page, code), "utf8");
}

console.log(`Generated ${localeOrder.map((code) => locales[code].file).join(", ")}`);
