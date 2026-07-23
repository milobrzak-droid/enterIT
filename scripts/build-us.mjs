import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { bookingUrl, locales } from "./homepage-content.mjs";
import { arrow, escapeHtml, siteFooter } from "./site-shell.mjs";
import { usPage } from "./us-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const output = resolve(root, "us/index.html");
const assetVersion = "20260723-release-1";

function schema() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://enterit.cz/#organization",
        name: "EnterIT",
        legalName: "AI Enter s.r.o.",
        url: "https://enterit.cz/",
        logo: "https://enterit.cz/assets/enter_logo_color.svg",
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
        knowsAbout: [
          "Enterprise AI delivery",
          "Microsoft Azure",
          "Microsoft Fabric",
          "custom software engineering",
          "systems integration",
          "AI agents",
          "cloud operations",
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${usPage.canonical}#webpage`,
        url: usPage.canonical,
        name: usPage.title,
        description: usPage.description,
        inLanguage: usPage.lang,
        about: { "@id": "https://enterit.cz/#organization" },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: "https://enterit.cz/assets/decor/firmy.webp",
        },
      },
      {
        "@type": "Service",
        "@id": `${usPage.canonical}#service`,
        name: "European AI and software delivery partnership",
        serviceType: "Enterprise AI and software engineering delivery",
        provider: { "@id": "https://enterit.cz/#organization" },
        areaServed: ["United States", "Europe"],
        availableLanguage: ["English"],
        url: usPage.canonical,
        description: usPage.description,
      },
    ],
  });
}

function head() {
  return `<!doctype html>
<html lang="${usPage.lang}" class="no-js">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <script>document.documentElement.classList.replace("no-js", "js")</script>
  <title>${escapeHtml(usPage.title)}</title>
  <meta name="description" content="${escapeHtml(usPage.description)}">
  <meta name="robots" content="index,follow">
  <meta name="author" content="AI Enter s.r.o.">
  <meta name="theme-color" content="#41E39E">
  <link rel="canonical" href="${usPage.canonical}">
  <link rel="sitemap" type="application/xml" href="https://enterit.cz/sitemap.xml">
  <link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=${assetVersion}">
  <link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=${assetVersion}">
  <link rel="icon" href="/favicon.ico?v=${assetVersion}" sizes="any">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=${assetVersion}">
  <link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/site-shell.css?v=${assetVersion}">
  <link rel="stylesheet" href="/assets/home.css?v=${assetVersion}">
  <link rel="stylesheet" href="/assets/brand-manual.css?v=${assetVersion}">
  <link rel="stylesheet" href="/assets/us.css?v=${assetVersion}">
  <script src="/assets/home.js?v=${assetVersion}" defer></script>
  <script src="/assets/us.js?v=${assetVersion}" defer></script>
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="EnterIT">
  <meta property="og:locale" content="${usPage.ogLocale}">
  <meta property="og:title" content="${escapeHtml(usPage.title)}">
  <meta property="og:description" content="${escapeHtml(usPage.description)}">
  <meta property="og:url" content="${usPage.canonical}">
  <meta property="og:image" content="https://enterit.cz/assets/og.png">
  <meta property="og:image:alt" content="EnterIT, European AI and software delivery partner">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(usPage.title)}">
  <meta name="twitter:description" content="${escapeHtml(usPage.description)}">
  <meta name="twitter:image" content="https://enterit.cz/assets/og.png">
  <meta name="twitter:image:alt" content="EnterIT, European AI and software delivery partner">
  <script type="application/ld+json">${schema()}</script>
  <script defer src="/assets/analytics.js?v=${assetVersion}"></script>
</head>`;
}

function navigation() {
  const links = `
    <a href="#services">${escapeHtml(usPage.nav.services)}</a>
    <a href="#process">${escapeHtml(usPage.nav.process)}</a>
    <a href="#integrations">${escapeHtml(usPage.nav.integrations)}</a>
    <a href="#results">${escapeHtml(usPage.nav.results)}</a>
    <a href="#team">${escapeHtml(usPage.nav.team)}</a>`;

  return `<header class="site-header" id="site-header">
  <div class="shell nav-shell">
    <a class="brand" href="/us" aria-label="${escapeHtml(usPage.homeLabel)}">
      <img src="/assets/enter_logo_black.svg" alt="EnterIT" width="477" height="200">
    </a>
    <nav class="desktop-nav" aria-label="${escapeHtml(usPage.mainNavLabel)}">${links}</nav>
    <div class="nav-actions">
      <a class="button button--small" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(usPage.nav.contact)} ${arrow}</a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="${escapeHtml(usPage.menuOpen)}" data-open-label="${escapeHtml(usPage.menuOpen)}" data-close-label="${escapeHtml(usPage.menuClose)}" aria-controls="mobile-panel" aria-expanded="false"><span></span></button>
    </div>
  </div>
  <div class="mobile-panel" id="mobile-panel" aria-hidden="true" inert hidden>
    <nav class="mobile-nav" aria-label="${escapeHtml(usPage.mobileNavLabel)}">${links}</nav>
    <div class="mobile-panel__bottom">
      <a class="button button--small" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(usPage.nav.contact)} ${arrow}</a>
    </div>
  </div>
</header>`;
}

function hero() {
  const proof = usPage.proof.metrics
    .map(
      ([value, label]) =>
        `<div class="us-proof__metric"><strong data-count-up>${escapeHtml(value)}</strong><span>${escapeHtml(label)}</span></div>`,
    )
    .join("");
  const capabilities = usPage.proof.capabilities
    .map((item) => `<span>${escapeHtml(item)}</span>`)
    .join("");

  return `<section class="us-hero" id="home">
  <div class="shell us-hero__inner">
    <div class="us-hero__copy">
      <span class="us-kicker" data-us-hero>${escapeHtml(usPage.hero.kicker)}</span>
      <h1 data-us-hero>${escapeHtml(usPage.hero.title)} <em>${escapeHtml(usPage.hero.highlight)}</em></h1>
      <p data-us-hero>${escapeHtml(usPage.hero.lead)}</p>
      <div class="us-hero__actions" data-us-hero>
        <a class="button" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(usPage.hero.primary)} ${arrow}</a>
        <a class="button button--ghost" href="#process">${escapeHtml(usPage.hero.secondary)}</a>
      </div>
    </div>
    <div class="us-hero__visual" data-us-hero aria-hidden="true">
      <img src="/assets/decor/mascot-wave.svg" alt="" width="420" height="420">
    </div>
  </div>
</section>
<section class="us-proof-strip" aria-label="Delivery proof">
  <div class="shell us-proof" data-us-reveal="rail">
      <div class="us-proof__metrics">${proof}</div>
      <div class="us-proof__capabilities" aria-label="Delivery capabilities">${capabilities}</div>
  </div>
</section>`;
}

function partnerships() {
  const reasons = usPage.partnership.reasons
    .map(
      (reason, index) => `<article class="us-reason" data-us-reveal="row">
        <span class="us-reason__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(reason.title)}</h3>
        <p>${escapeHtml(reason.text)}</p>
      </article>`,
    )
    .join("");

  return `<section class="us-section us-partnership" id="services">
  <div class="shell">
    <div class="us-section-head" data-us-reveal="head">
      <div><span class="us-kicker">${escapeHtml(usPage.partnership.kicker)}</span><h2>${escapeHtml(usPage.partnership.title)}</h2></div>
      <p>${escapeHtml(usPage.partnership.intro)}</p>
    </div>
    <aside class="us-scenario" data-us-reveal="feature">
      <div class="us-scenario__copy">
        <span>For consultancies, Microsoft partners and SIs</span>
        <h3>${escapeHtml(usPage.partnership.scenarioTitle)}</h3>
        <p>${escapeHtml(usPage.partnership.scenarioText)}</p>
      </div>
      <img src="/assets/decor/illustration-conversation-cutout.png" alt="" width="720" height="540" loading="lazy" decoding="async" aria-hidden="true">
    </aside>
    <div class="us-reasons">${reasons}</div>
  </div>
</section>`;
}

function partnerProof() {
  return `<section class="partner-bar" aria-label="${escapeHtml(usPage.proof.partnerLabel)}">
  <div class="shell partner-bar__inner" data-us-reveal="rail">
    <span class="partner-bar__label">${escapeHtml(usPage.proof.partnerLabel)}</span>
    <div class="partner-logos">
      <img class="partner-logo partner-logo--microsoft" src="/assets/logos/microsoft.png" alt="Microsoft Solutions Partner" width="1000" height="200" loading="lazy" decoding="async">
      <img class="partner-logo partner-logo--tdsynnex" src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI" width="1300" height="460" loading="lazy" decoding="async">
    </div>
  </div>
</section>`;
}

function delivery() {
  const items = usPage.delivery.items
    .map(
      (item, index) => `<article class="us-delivery-row" data-us-reveal="row">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </article>`,
    )
    .join("");

  return `<section class="us-section us-delivery" id="process">
  <div class="shell">
    <div class="us-delivery__head" data-us-reveal="head">
      <div><span class="us-kicker">${escapeHtml(usPage.delivery.kicker)}</span><h2>${escapeHtml(usPage.delivery.title)}</h2></div>
      <div><p>${escapeHtml(usPage.delivery.intro)}</p><img src="/assets/decor/mascot-blue.svg" alt="" width="250" height="250" loading="lazy" decoding="async" aria-hidden="true"></div>
    </div>
    <div class="us-delivery__rows">${items}</div>
  </div>
</section>`;
}

function technology() {
  const groups = usPage.technology.groups
    .map(
      (group) => `<article class="us-tech-group" data-us-reveal="row">
        <h3>${escapeHtml(group.title)}</h3>
        <div>${group.items.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
      </article>`,
    )
    .join("");

  return `<section class="us-section us-technology" id="integrations">
  <div class="shell">
    <div class="us-technology__intro" data-us-reveal="head">
      <div class="us-technology__copy">
        <span class="us-kicker">${escapeHtml(usPage.technology.kicker)}</span>
        <h2>${escapeHtml(usPage.technology.title)}</h2>
        <p>${escapeHtml(usPage.technology.intro)}</p>
      </div>
      <img src="/assets/decor/illustration-system-cutout.png" alt="" width="720" height="540" loading="lazy" decoding="async" aria-hidden="true">
    </div>
    <div class="us-tech-map">${groups}</div>
  </div>
</section>`;
}

function cases() {
  const cards = usPage.cases.cards
    .map(
      (item, index) => `<article class="us-case" data-us-reveal="case" aria-labelledby="us-case-${index + 1}-title">
        <header><h3 class="us-case__title" id="us-case-${index + 1}-title">${escapeHtml(item.context)}</h3><strong data-count-up>${escapeHtml(item.metric)}</strong></header>
        <div><span>${escapeHtml(usPage.cases.labels.problem)}</span><p>${escapeHtml(item.problem)}</p></div>
        <div><span>${escapeHtml(usPage.cases.labels.solution)}</span><p>${escapeHtml(item.solution)}</p></div>
        <div class="us-case__impact"><span>${escapeHtml(usPage.cases.labels.impact)}</span><p>${escapeHtml(item.impact)}</p></div>
        <footer><span>${escapeHtml(usPage.cases.labels.technology)}</span><p>${item.tech.map((tech) => `<b>${escapeHtml(tech)}</b>`).join("")}</p></footer>
      </article>`,
    )
    .join("");

  return `<section class="us-section us-cases" id="results">
  <div class="shell">
    <div class="us-section-head us-section-head--light" data-us-reveal="head">
      <div><span class="us-kicker">${escapeHtml(usPage.cases.kicker)}</span><h2>${escapeHtml(usPage.cases.title)}</h2></div>
      <p>${escapeHtml(usPage.cases.intro)}</p>
    </div>
    <div class="us-cases__grid">${cards}</div>
  </div>
</section>`;
}

function team() {
  const leaders = usPage.team.leaders
    .map(
      (leader) => `<article class="us-leader" data-us-reveal="row">
        <img src="${escapeHtml(leader.image)}" alt="${escapeHtml(`${leader.name}, ${leader.role}`)}" width="500" height="500" loading="lazy" decoding="async">
        <div><h4>${escapeHtml(leader.name)}</h4><span>${escapeHtml(leader.role)}</span><p>${escapeHtml(leader.text)}</p></div>
      </article>`,
    )
    .join("");

  return `<section class="us-section us-team" id="team">
  <div class="shell">
    <div class="us-team__head" data-us-reveal="head">
      <div><span class="us-kicker">${escapeHtml(usPage.team.kicker)}</span><h2>${escapeHtml(usPage.team.title)}</h2></div>
      <p>${escapeHtml(usPage.team.intro)}</p>
    </div>
    <figure class="us-team__photo" data-us-reveal="photo">
      <img src="/assets/decor/firmy.webp" alt="${escapeHtml(usPage.team.photoAlt)}" width="900" height="675" loading="lazy" decoding="async">
      <figcaption>A working session with part of the EnterIT team.</figcaption>
    </figure>
    <div class="us-leadership">
      <h3 data-us-reveal="head">${escapeHtml(usPage.team.leadersTitle)}</h3>
      <div>${leaders}</div>
    </div>
  </div>
</section>`;
}

function contact() {
  return `<section class="us-contact" id="contact">
  <div class="shell">
    <div class="us-contact__card" data-us-reveal="feature">
      <div><h2>${escapeHtml(usPage.contact.title)}</h2><p>${escapeHtml(usPage.contact.text)}</p></div>
      <div class="us-contact__actions">
        <a class="button" href="${escapeHtml(bookingUrl)}" target="_blank" rel="noopener">${escapeHtml(usPage.contact.primary)} ${arrow}</a>
        <a class="button button--ghost" href="mailto:milo@enterit.cz">${escapeHtml(usPage.contact.secondary)}</a>
      </div>
      <img src="/assets/decor/mascot-red.svg" alt="" width="280" height="280" loading="lazy" decoding="async" aria-hidden="true">
    </div>
  </div>
</section>`;
}

function render() {
  const footerPage = {
    ...locales.en,
    ...usPage,
    prefix: "en/",
    footer: {
      ...locales.en.footer,
      headline: "Ready to deliver the next enterprise AI program?",
    },
    nav: usPage.nav,
    homeHref: "/us",
    footerTeamHref: "/us#team",
  };

  return `${head()}
<body class="brand-manual us-page" data-locale="en">
<a class="skip-link" href="#main-content">${escapeHtml(usPage.skip)}</a>
${navigation()}
<main id="main-content" tabindex="-1">
${hero()}
${partnerProof()}
${partnerships()}
${delivery()}
${technology()}
${cases()}
${team()}
${contact()}
</main>
${siteFooter(footerPage)}
</body>
</html>
`;
}

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, render(), "utf8");
console.log("Generated us/index.html");
