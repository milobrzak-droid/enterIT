import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { localeOrder, locales } from "./homepage-content.mjs";
import { arrow, escapeHtml, languageMenu, siteFooter } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetVersion = "20260717-17";
const shellAssetVersion = "20260717-6";
const uiAssetVersion = "20260717-9";
const faviconVersion = "20260717-enter-symbol";

const subpageIconPaths = {
  receipt: '<path d="M6 2h12v20l-3-2-3 2-3-2-3 2V2Z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  "inbox-arrow": '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6M12 2v7m-3-3 3 3 3-3"/>',
  "message-check": '<path d="M21 14a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z"/><path d="m9 10 2 2 4-5"/>',
  "package-scan": '<path d="m4 7 8-4 8 4-8 4-8-4Zm0 0v10l8 4 8-4V7M12 11v10"/><path d="M2 5V2h3M19 2h3v3M22 19v3h-3M5 22H2v-3"/>',
  "user-clock": '<circle cx="9" cy="7" r="4"/><path d="M2.5 21v-2a6.5 6.5 0 0 1 10.2-5.4"/><circle cx="17" cy="17" r="5"/><path d="M17 14.5V17l1.8 1.2"/>',
  "calendar-check": '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18m-12 5 2 2 4-4"/>',
  route: '<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 3-3v-1a3 3 0 0 0-3-3h-1a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h6"/>',
  "clipboard-clock": '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M8 9h5M8 13h3"/><circle cx="16" cy="16" r="4"/><path d="M16 14v2l1.5 1"/>',
  "workflow-user": '<circle cx="12" cy="6" r="3"/><path d="M7 15a5 5 0 0 1 10 0M12 9v3M5 12H2v7h5v-3M19 12h3v7h-5v-3"/>',
  workflow: '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M9 6h4a4 4 0 0 1 4 4v5M15 18h-4a4 4 0 0 1-4-4V9"/>',
  levels: '<path d="M3 20h18M5 20v-4h4v4m0 0v-8h4v8m0 0V7h4v13m0 0V3h4v17"/>',
  cpu: '<rect x="7" y="7" width="10" height="10" rx="2"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3M10 10h4v4h-4z"/>',
  "server-lock": '<rect x="3" y="3" width="18" height="7" rx="2"/><path d="M7 6.5h.01M3 14h10M7 17.5h.01"/><rect x="13" y="14" width="8" height="7" rx="1.5"/><path d="M15 14v-2a2 2 0 0 1 4 0v2"/>',
  "file-scan": '<path d="M6 2h8l4 4v16H6zM14 2v5h5"/><path d="M9 13h6M9 17h4M3 8V5h3M21 8V5h-3"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  "book-search": '<path d="M4 5a3 3 0 0 1 3-3h5v17H7a3 3 0 0 0-3 3V5Zm16 7V2h-5a3 3 0 0 0-3 3"/><circle cx="17" cy="17" r="3"/><path d="m19.2 19.2 2 2"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  message: '<path d="M21 14a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v7Z"/><path d="M8 9h8M8 13h5"/>',
  "database-arrows": '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3 1 0 2-.1 2.8-.2M4 11v6c0 1.7 3.6 3 8 3"/><path d="m17 12 3 3-3 3m3-3h-6"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  plug: '<path d="M8 12 4 8m12 4 4-4M7 7l3-3m7 3-3-3M8 12h8v2a4 4 0 0 1-8 0v-2Zm4 6v4"/>',
  "shield-check": '<path d="M12 2 4 5v6c0 5 3.4 8.5 8 11 4.6-2.5 8-6 8-11V5z"/><path d="m8.5 12 2.2 2.2 4.8-5"/>',
  "ruler-chart": '<path d="M3 21h18M5 18V9m5 9V5m5 13v-7m5 7V3"/><path d="M3 3h7M3 3v4m3-4v2"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>',
  coins: '<ellipse cx="9" cy="6" rx="6" ry="3"/><path d="M3 6v4c0 1.7 2.7 3 6 3s6-1.3 6-3V6M3 10v4c0 1.7 2.7 3 6 3 1.2 0 2.3-.2 3.2-.5"/><path d="M15 13h6v7h-6z"/>',
  users: '<circle cx="9" cy="7" r="4"/><path d="M2 21v-2a7 7 0 0 1 14 0v2M17 4a4 4 0 0 1 0 7M18 14a6 6 0 0 1 4 5v2"/>',
};

const heroIcons = {
  "reseni-faktury.html": "receipt",
  "reseni-objednavky.html": "inbox-arrow",
  "reseni-reklamace.html": "message-check",
  "reseni-sklad-bez-papiru.html": "package-scan",
  "reseni-dochazka.html": "user-clock",
  "reseni-dovolene.html": "calendar-check",
  "reseni-kniha-jizd.html": "route",
  "reseni-pracovni-vykazy.html": "clipboard-clock",
  "jak-stavime-agenty.html": "workflow-user",
  "jak-stavime-automatizace.html": "workflow",
  "firma-2030.html": "levels",
};

function generatedIcon(name, className) {
  const paths = subpageIconPaths[name];
  if (!paths) throw new Error(`Unknown subpage icon: ${name}`);
  return `<!-- enterit-icon:${name}:start --><span class="${className}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${paths}</svg></span><!-- enterit-icon:end -->`;
}

const pageNames = [
  "firma-2030.html",
  "gdpr.html",
  "jak-stavime-agenty.html",
  "jak-stavime-automatizace.html",
  "podminky.html",
  "reseni-dochazka.html",
  "reseni-dovolene.html",
  "reseni-faktury.html",
  "reseni-kniha-jizd.html",
  "reseni-objednavky.html",
  "reseni-pracovni-vykazy.html",
  "reseni-reklamace.html",
  "reseni-sklad-bez-papiru.html",
  "tym.html",
];

const oldFragments = {
  problems: "services",
  solutions: "services",
  how: "process",
  integ: "integrations",
  work: "results",
};

const calculatorCtaLabels = {
  cs: "Spočítat úsporu v kalkulačce",
  en: "Calculate the saving in the calculator",
  de: "Ersparnis im Rechner berechnen",
  pl: "Oblicz oszczędność w kalkulatorze",
};

function pagePath(code, pageName) {
  return code === "cs" ? pageName : `${code}/${pageName}`;
}

function pageHref(code, pageName) {
  return `/${pagePath(code, pageName)}`;
}

function navigation(page, code, pageName) {
  const teamCurrent = pageName === "tym.html" ? ' class="active" aria-current="page"' : "";
  const navigationLinks = `
    <a href="${page.homeHref}#services">${escapeHtml(page.nav.services)}</a>
    <a href="${page.homeHref}#results">${escapeHtml(page.nav.results)}</a>
    <a href="${page.homeHref}#process">${escapeHtml(page.nav.process)}</a>
    <a href="${page.homeHref}#integrations">${escapeHtml(page.nav.integrations)}</a>
    <a href="/${page.prefix}tym.html"${teamCurrent}>${escapeHtml(page.nav.team)}</a>`;
  const links = Object.fromEntries(localeOrder.map((candidate) => [candidate, pageHref(candidate, pageName)]));

  return `<header class="site-header" id="site-header">
  <div class="shell nav-shell">
    <a class="brand" href="${page.homeHref}" aria-label="${escapeHtml(page.homeLabel)}">
      <img src="/assets/enter_logo_black.svg" alt="EnterIT" width="477" height="200">
    </a>
    <nav class="desktop-nav" aria-label="${escapeHtml(page.mainNavLabel)}">${navigationLinks}</nav>
    <div class="nav-actions">
      ${languageMenu({ current: code, label: page.languageLabel, links, order: localeOrder })}
      <a class="button button--small" href="${page.homeHref}#contact">${escapeHtml(page.nav.contact)} ${arrow}</a>
      <button class="menu-toggle" id="menu-toggle" type="button" aria-label="${escapeHtml(page.menuOpen)}" data-open-label="${escapeHtml(page.menuOpen)}" data-close-label="${escapeHtml(page.menuClose)}" aria-controls="mobile-panel" aria-expanded="false"><span></span></button>
    </div>
  </div>
  <div class="mobile-panel" id="mobile-panel" aria-hidden="true" inert hidden>
    <nav class="mobile-nav" aria-label="${escapeHtml(page.mobileNavLabel)}">${navigationLinks}</nav>
    <div class="mobile-panel__bottom">
      <a class="button button--small" href="${page.homeHref}#contact">${escapeHtml(page.nav.contact)} ${arrow}</a>
    </div>
  </div>
</header>`;
}

function refreshAssets(html) {
  html = html.replace(/^<link rel="stylesheet" href="\/assets\/(?:site-ui|home|site-shell|subpage)\.css(?:\?[^\"]*)?">\n?/gm, "");
  html = html.replace(/^<script src="\/assets\/(?:site-ui|home|subpage)\.js(?:\?[^\"]*)?" defer><\/script>\n?/gm, "");
  html = html.replace(/<\/style>\s*<\/head>/, "</style>\n</head>");
  const assets = `<link rel="stylesheet" href="/assets/site-ui.css?v=${uiAssetVersion}">
<link rel="stylesheet" href="/assets/site-shell.css?v=${shellAssetVersion}">
<link rel="stylesheet" href="/assets/subpage.css?v=${assetVersion}">
<script src="/assets/site-ui.js?v=${uiAssetVersion}" defer></script>`;
  return html.replace("</head>", `${assets}\n</head>`);
}

function refreshFavicons(html) {
  html = html
    .replace(/^<link rel="icon"[^>]*>\n?/gm, "")
    .replace(/^<link rel="apple-touch-icon"[^>]*>\n?/gm, "");
  const icons = `<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg?v=${faviconVersion}">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png?v=${faviconVersion}">
<link rel="icon" href="/favicon.ico?v=${faviconVersion}" sizes="any">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png?v=${faviconVersion}">`;
  return html.replace(
    /(<link rel="alternate" hreflang="x-default"[^>]*>)/,
    `$1\n${icons}`,
  );
}

function removeLegacyUiScript(html) {
  return html.replace(
    /\n<script>\s*\(function\(\)\{\s*["']use strict["'];\s*var header = document\.getElementById\(["']header["']\);[\s\S]*?<\/script>\s*(?=(?:<script>|<\/body>))/,
    "\n",
  );
}

function normalizeSolutionSecurity(html) {
  const icon = '<span class="ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.6 2.6L16.5 9"/></svg></span>';
  return html.replace(
    /<div class="rs-sec-box reveal">([\s\S]*?)<\/div>/g,
    function (_panel, content) {
      const items = Array.from(content.matchAll(/<p>([\s\S]*?)<\/p>/g), function (match) {
        return `<div class="rs-badge">${icon}<span class="cap">${match[1]}</span></div>`;
      });
      return items.length ? `<div class="rs-badges reveal">\n      ${items.join("\n      ")}\n    </div>` : _panel;
    },
  );
}

function removeResidualEffects(html) {
  return html
    .replaceAll(
      "background:radial-gradient(120% 120% at 75% 10%,rgba(65,227,158,.18),transparent 55%),linear-gradient(160deg,#1e2a3c,#141d2b);",
      "background:#f2f5ef;",
    )
    .replaceAll(
      "filter:drop-shadow(0 18px 34px rgba(0,0,0,.5));",
      "filter:none;",
    );
}

function unwrapFaqDetails(html) {
  return html.replace(
    /<details class="content-details reveal">\s*<summary>[\s\S]*?<\/summary>\s*(<div class="(?:rs-faq-grid|rs-faq)">[\s\S]*?<\/div>)\s*<\/details>/g,
    "$1",
  );
}

function stripGeneratedIcons(html) {
  return html.replace(
    /\s*<!-- enterit-icon:[^:]+:start -->[\s\S]*?<!-- enterit-icon:end -->/g,
    "",
  );
}

function decorateHeroIcon(html, pageName) {
  const iconName = heroIcons[pageName];
  if (!iconName) return html;

  const heroClass = pageName.startsWith("reseni-")
    ? "rs-hero"
    : pageName === "firma-2030.html"
      ? "f30-hero"
      : "jp-hero";

  return html.replace(
    new RegExp(`(<section class="block ${heroClass}">\\s*<div class="wrap">)`),
    `$1\n    ${generatedIcon(iconName, "subpage-hero-icon reveal")}`,
  );
}

function decorateMethodIcons(html, pageName) {
  const blockIcons = pageName === "jak-stavime-agenty.html"
    ? {
        4: "file-scan",
        5: "mail",
        6: "book-search",
        7: "workflow-user",
        8: "chart",
        9: "message",
      }
    : pageName === "jak-stavime-automatizace.html"
      ? {
          4: "database-arrows",
          5: "book-search",
          6: "chart",
          7: "message",
          8: "bell",
          19: "plug",
          20: "shield-check",
          21: "ruler-chart",
        }
      : null;

  if (!blockIcons) return html;

  let blockIndex = 0;
  html = html.replace(/<div class="jp-block reveal">/g, (match) => {
    const iconName = blockIcons[blockIndex];
    blockIndex += 1;
    return iconName
      ? `${match}${generatedIcon(iconName, "subpage-card-icon")}`
      : match;
  });

  const expectedBlocks = pageName === "jak-stavime-agenty.html" ? 18 : 22;
  if (blockIndex !== expectedBlocks) {
    throw new Error(`${pageName}: expected ${expectedBlocks} method cards, found ${blockIndex}`);
  }

  if (pageName === "jak-stavime-agenty.html") {
    const stackIcons = ["cpu", "workflow", "plug", "server-lock"];
    let stackIndex = 0;
    html = html.replace(/<div class="jp-stack-item reveal">/g, (match) => {
      const iconName = stackIcons[stackIndex];
      stackIndex += 1;
      return `${match}${generatedIcon(iconName, "subpage-card-icon")}`;
    });
    if (stackIndex !== stackIcons.length) {
      throw new Error(`${pageName}: expected ${stackIcons.length} stack cards, found ${stackIndex}`);
    }
  }

  return html;
}

function decorateFirmaStats(html, pageName) {
  if (pageName !== "firma-2030.html") return html;

  html = html.replace(
    /(<div class="f30-stat reveal">)\s*<p>([\s\S]*?)<cite>([\s\S]*?)<\/cite><\/p>(\s*<\/div>)/g,
    "$1<p>$2</p><cite>$3</cite>$4",
  );

  const statIcons = ["levels", "coins", "users", "ruler-chart"];
  let statIndex = 0;
  html = html.replace(/<div class="f30-stat reveal">/g, (match) => {
    const iconName = statIcons[statIndex];
    statIndex += 1;
    return `${match}${generatedIcon(iconName, "subpage-card-icon")}`;
  });
  if (statIndex !== statIcons.length) {
    throw new Error(`${pageName}: expected ${statIcons.length} stat cards, found ${statIndex}`);
  }
  return html;
}

function normalizeSolutionBadgeIcons(html, pageName) {
  if (!pageName.startsWith("reseni-")) return html;

  html = html.replace(
    /<span class="ic"(?:\s+aria-hidden="true")?>\s*<svg[\s\S]*?<\/svg>\s*<\/span>/g,
    "",
  );

  const badgeCount = (html.match(/<div class="rs-badge">/g) || []).length;
  const badgeIcons = badgeCount === 4
    ? ["server-lock", "lock", "shield-check", "eye"]
    : badgeCount === 3
      ? ["server-lock", "shield-check", "eye"]
      : null;

  if (!badgeIcons) {
    throw new Error(`${pageName}: expected 3 or 4 security badges, found ${badgeCount}`);
  }

  let badgeIndex = 0;
  html = html.replace(/<div class="rs-badge">/g, (match) => {
    const iconName = badgeIcons[badgeIndex];
    badgeIndex += 1;
    return `${match}${generatedIcon(iconName, "ic")}`;
  });
  return html;
}

function decorateSubpageIcons(html, pageName) {
  html = stripGeneratedIcons(html);
  html = decorateHeroIcon(html, pageName);
  html = decorateMethodIcons(html, pageName);
  html = decorateFirmaStats(html, pageName);
  html = normalizeSolutionBadgeIcons(html, pageName);
  return html;
}

function refreshPage(code, pageName) {
  const page = locales[code];
  const target = resolve(root, pagePath(code, pageName));
  if (!existsSync(target)) throw new Error(`Missing production page: ${target}`);

  let html = readFileSync(target, "utf8");
  html = unwrapFaqDetails(html);
  html = html.replace(
    /<meta name="theme-color" content="[^"]*">/,
    '<meta name="theme-color" content="#f5f7f2">',
  );
  if (!/<body\b[^>]*class="[^"]*\bsubpage\b/.test(html)) {
    html = html.replace("<body>", '<body class="subpage">');
  }
  html = html.replace(
    /<header\b[^>]*\bid="(?:header|site-header)"[^>]*>[\s\S]*?(?=<main\b)/,
    `${navigation(page, code, pageName)}\n\n`,
  );
  html = html.replace(
    /<footer\b[^>]*class="[^"]*(?:site-footer|footer)[^"]*"[^>]*>[\s\S]*?<\/footer>/,
    siteFooter(page),
  );
  html = removeLegacyUiScript(html);
  html = removeResidualEffects(html);
  html = refreshFavicons(html);

  while (html.includes(`${page.homeHref}#integrationsrations`)) {
    html = html.replaceAll(`${page.homeHref}#integrationsrations`, `${page.homeHref}#integrations`);
  }
  Object.entries(oldFragments).forEach(([oldFragment, newFragment]) => {
    html = html.replaceAll(
      `href="${page.homeHref}#${oldFragment}"`,
      `href="${page.homeHref}#${newFragment}"`,
    );
  });
  if (pageName.startsWith("reseni-")) {
    html = normalizeSolutionSecurity(html);
    html = html.replace(
      /(<div\b[^>]*class="[^"]*\brs-flow-step\b[^"]*"[^>]*>\s*<b>)\s*\d+[.)]\s*/g,
      "$1",
    );
    const calculatorCta = new RegExp(
      `<a href="${page.homeHref.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}#contact" class="btn outline">[\\s\\S]*?<\\/a>`,
    );
    html = html.replace(
      calculatorCta,
      `<a href="${page.homeHref}#calc" class="btn outline">${escapeHtml(calculatorCtaLabels[code])}</a>`,
    );
  }

  html = decorateSubpageIcons(html, pageName);

  html = refreshAssets(html);
  writeFileSync(target, html);
}

let count = 0;
for (const code of localeOrder) {
  for (const pageName of pageNames) {
    refreshPage(code, pageName);
    count += 1;
  }
}

console.log(`Refreshed ${count} EnterIT subpages`);
