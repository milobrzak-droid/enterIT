import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { localeOrder, locales } from "./homepage-content.mjs";
import { arrow, escapeHtml, languageMenu, siteFooter } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const assetVersion = "20260723-release-1";
const shellAssetVersion = assetVersion;
const uiAssetVersion = assetVersion;
const faviconVersion = assetVersion;

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

const brandHeroMascots = {
  "reseni-faktury.html": "mascot-red",
  "reseni-objednavky.html": "mascot-blue",
  "reseni-reklamace.html": "mascot-red",
  "reseni-sklad-bez-papiru.html": "mascot-blue",
  "reseni-dochazka.html": "mascot-blue",
  "reseni-dovolene.html": "mascot-red",
  "reseni-kniha-jizd.html": "mascot-blue",
  "reseni-pracovni-vykazy.html": "mascot-red",
  "jak-stavime-agenty.html": "mascot-blue",
  "jak-stavime-automatizace.html": "mascot-red",
  "firma-2030.html": "mascot-red",
  "tym.html": null,
  "gdpr.html": null,
  "podminky.html": null,
};

const brandMascotDimensions = {
  "mascot-red": [127, 99],
  "mascot-blue": [130, 101],
};

const brandStoryArt = {
  "jak-stavime-agenty.html": "illustration-documents",
  "jak-stavime-automatizace.html": "illustration-modules",
  "firma-2030.html": "illustration-team",
};

const legacyStyleBundles = {
  "jak-stavime-agenty.html": "method-agents",
  "jak-stavime-automatizace.html": "method-automation",
  "firma-2030.html": "future",
  "tym.html": "team",
  "gdpr.html": "legal",
  "podminky.html": "legal",
};

function legacyStyleBundle(pageName) {
  return pageName.startsWith("reseni-") ? "solution" : legacyStyleBundles[pageName];
}

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

const solutionMetaDescriptions = {
  cs: {
    "reseni-dochazka.html": "Automatizovaná evidence docházky spojí data z píchaček, Excelů i papírů, zkontroluje směny a připraví podklady pro mzdy. Úspora přibližně 15 h/měs.",
    "reseni-dovolene.html": "Automatizované žádosti o dovolenou v Teams: vedoucí schválí jedním kliknutím, zůstatky se aktualizují a HR má přehled v reálném čase. Nasazení za 2–4 týdny.",
    "reseni-faktury.html": "Automatizace přijatých faktur: agent vytěží data, spáruje fakturu s objednávkou a pošle ji ke schválení. Chybovost pod 1 % a úspora přibližně 30 h/měs.",
    "reseni-kniha-jizd.html": "Automatická kniha jízd vzniká průběžně z GPS, tankovacích karet a kalendářů. Hlídá STK, servis i pojistky a šetří přibližně 10 h/měs. Nasazení za 3–4 týdny.",
    "reseni-objednavky.html": "Automatizace objednávek z e-mailu: agent rozpozná libovolný formát, založí objednávku v ERP a potvrdí ji zákazníkovi. Obchod ušetří přibližně 25 h/měs.",
    "reseni-pracovni-vykazy.html": "Automatizace pracovních výkazů sbírá data z terénu, páruje je se zakázkami a připravuje podklady pro fakturaci i mzdy. Administrativa ušetří ~12 h/měs.",
    "reseni-reklamace.html": "Automatizace reklamací zachytí podněty z e-mailu, telefonu i e-shopu, přiřadí je, hlídá lhůty a informuje zákazníka. Odpověď odešle během minut.",
    "reseni-sklad-bez-papiru.html": "Papírový dodací list stačí vyfotit: agent vytěží data, spáruje je s objednávkou a naskladní zboží. Skladník ušetří ~20 h/měs a stav skladu je aktuální do minut.",
  },
  en: {
    "reseni-dochazka.html": "Automated attendance tracking combines clocking terminals, Excel and leave records, checks shifts, prepares payroll input and saves about 15 hours a month.",
    "reseni-dovolene.html": "Automated leave requests in Teams: managers approve in one click, balances update automatically and HR gets a real-time overview. Deployment takes 2–4 weeks.",
    "reseni-faktury.html": "Invoice automation extracts data, matches purchase orders and routes invoices for approval. Error rates stay below 1%, saving about 30 hours a month.",
    "reseni-kniha-jizd.html": "Automated logbooks use GPS, fuel cards and calendars to record journeys, track roadworthiness tests, service and insurance, and save about 10 hours monthly.",
    "reseni-objednavky.html": "Email order automation reads any format, creates orders in your ERP and sends customer confirmation within minutes, saving sales about 25 hours a month.",
    "reseni-pracovni-vykazy.html": "Automated field timesheets are matched to jobs and prepared for invoicing and payroll. The back office saves about 12 hours a month, with fewer forgotten hours.",
    "reseni-reklamace.html": "Complaint automation logs cases from email, phone and online shops, tracks deadlines and updates customers within minutes, preventing missed deadlines.",
    "reseni-sklad-bez-papiru.html": "Paperless warehouse automation reads delivery note photos, matches them to orders and books goods in. Stock updates in minutes, saving about 20 hours monthly.",
  },
  de: {
    "reseni-dochazka.html": "Automatisierte Anwesenheitserfassung bündelt Daten aus Stechuhren und Excel, prüft Schichten und erstellt die Lohnunterlage. Ersparnis: rund 15 Std./Monat.",
    "reseni-dovolene.html": "Urlaubsanträge in Teams automatisch verwalten: Freigabe per Klick, aktuelle Salden und Echtzeit-Übersicht für HR. Go-live innerhalb von 2–4 Wochen.",
    "reseni-faktury.html": "Automatisierung liest Eingangsrechnungen aus, gleicht Bestellungen ab und sendet sie zur Freigabe. Unter 1 % Fehlerquote und rund 30 Std. Ersparnis pro Monat.",
    "reseni-kniha-jizd.html": "Das automatische Fahrtenbuch entsteht laufend aus GPS, Tankkarten und Kalendern, überwacht TÜV, Service und Versicherung und spart rund 10 Std. pro Monat.",
    "reseni-objednavky.html": "Bestellungen aus E-Mails automatisch ins ERP übernehmen: Der Agent erkennt jedes Format und bereitet die Bestätigung vor. Der Vertrieb spart rund 25 Std./Monat.",
    "reseni-pracovni-vykazy.html": "Automatisierte Technikernachweise werden Aufträgen zugeordnet und für Abrechnung sowie Löhne vorbereitet. Die Verwaltung spart rund 12 Std. pro Monat.",
    "reseni-reklamace.html": "Reklamationsbearbeitung erfasst Fälle aus allen Kanälen, weist sie zu, überwacht Fristen und informiert Kunden in Minuten. Keine versäumten Fristen.",
    "reseni-sklad-bez-papiru.html": "Papierloses Lager: Lieferschein fotografieren, auslesen, Bestellung abgleichen und Ware einlagern. Lagerbestand in Minuten aktuell, rund 20 Std./Monat gespart.",
  },
  pl: {
    "reseni-dochazka.html": "Automatyczna ewidencja czasu pracy łączy dane z czytników i Excela, sprawdza grafiki i przygotowuje dane do płac. Dział płac oszczędza około 15 godz./mies.",
    "reseni-dovolene.html": "Automatyczne wnioski urlopowe w Teams: akceptacja jednym kliknięciem, bieżące salda i podgląd dla HR w czasie rzeczywistym. Wdrożenie w 2–4 tygodnie.",
    "reseni-faktury.html": "Automatyzacja faktur zakupowych odczytuje dane, paruje je z zamówieniami i wysyła do zatwierdzenia. Poziom błędów poniżej 1%, oszczędność ~30 godz./mies.",
    "reseni-kniha-jizd.html": "Automatyczna ewidencja przejazdów powstaje z GPS, kart paliwowych i kalendarzy, pilnuje przeglądów, serwisu i ubezpieczeń oraz oszczędza ~10 godz./mies.",
    "reseni-objednavky.html": "Automatyzacja zamówień z e-maili rozpoznaje każdy format, zapisuje zamówienie w ERP i wysyła potwierdzenie klientowi. Dział handlowy oszczędza ~25 godz./mies.",
    "reseni-pracovni-vykazy.html": "Automatyczne raporty terenowe są łączone ze zleceniami i przygotowywane do fakturowania oraz płac. Mniej pominiętych godzin i ~12 godz./mies. oszczędności.",
    "reseni-reklamace.html": "Automatyzacja reklamacji rejestruje zgłoszenia z każdego kanału, przypisuje je, pilnuje terminów i informuje klienta o statusie w kilka minut.",
    "reseni-sklad-bez-papiru.html": "Magazyn bez papieru: agent odczytuje dowód dostawy, paruje go z zamówieniem i przyjmuje towar. Stan magazynu aktualny w kilka minut; oszczędność ~20 godz./mies.",
  },
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

function refreshAssets(html, pageName) {
  const legacyBundle = legacyStyleBundle(pageName);
  if (!legacyBundle) throw new Error(`${pageName}: missing legacy style bundle`);
  const legacyAsset = resolve(root, `assets/subpage-legacy-${legacyBundle}.css`);
  if (!existsSync(legacyAsset)) throw new Error(`${pageName}: missing ${legacyAsset}`);

  html = html.replace(/<script data-subpage-motion-bootstrap>[\s\S]*?<\/script>\n?/g, "");
  html = html.replace(/^<script defer src="\/assets\/analytics\.js(?:\?v=[^"]+)?"><\/script>\n?/gm, "");
  html = html.replace(/^<link rel="stylesheet" href="\/assets\/(?:site-ui|home|site-shell|subpage|subpage-legacy-[^\"]+|brand-manual)\.css(?:\?[^\"]*)?">\n?/gm, "");
  html = html.replace(/^<script src="\/assets\/(?:site-ui|home|subpage|brand-manual)\.js(?:\?[^\"]*)?" defer><\/script>\n?/gm, "");
  html = html.replace(/^<link rel="preload" href="\/assets\/fonts\/FiraMono-Medium\.woff2"[^>]*>\n?/gm, "");
  const assets = `<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/assets/subpage-legacy-${legacyBundle}.css?v=${assetVersion}">
<link rel="stylesheet" href="/assets/site-ui.css?v=${uiAssetVersion}">
<link rel="stylesheet" href="/assets/site-shell.css?v=${shellAssetVersion}">
<link rel="stylesheet" href="/assets/subpage.css?v=${assetVersion}">
<link rel="stylesheet" href="/assets/brand-manual.css?v=${assetVersion}">
<script src="/assets/site-ui.js?v=${uiAssetVersion}" defer></script>
<script src="/assets/brand-manual.js?v=${assetVersion}" defer></script>
<script defer src="/assets/analytics.js?v=${assetVersion}"></script>`;
  return html.replace("</head>", `${assets}\n</head>`);
}

function decorateBrandManual(html, pageName) {
  html = html.replace(/\s*<!-- brand-manual:hero:start -->[\s\S]*?<!-- brand-manual:hero:end -->/g, "");
  html = html.replace(/\s*<!-- brand-manual:team-hero:start -->[\s\S]*?<!-- brand-manual:team-hero:end -->/g, "");
  if (pageName === "tym.html") {
    const teamScene = `
    <!-- brand-manual:team-hero:start -->
    <div class="team-hero-scene" aria-hidden="true">
      <div class="team-hero-scene__photo"><img src="/assets/decor/firmy.webp" alt="" width="900" height="675" loading="eager" decoding="async"></div>
      <img class="team-hero-scene__mascot" src="/assets/decor/mascot-red.svg" alt="" width="127" height="99" loading="eager" decoding="async">
    </div>
    <!-- brand-manual:team-hero:end -->`;
    return html.replace(
      /(<section\b[^>]*class="[^"]*\btym-hero\b[^"]*"[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*\bwrap\b[^"]*"[^>]*>)/,
      `$1${teamScene}`,
    );
  }
  const mascot = brandHeroMascots[pageName];
  if (!mascot) return html;
  const [mascotWidth, mascotHeight] = brandMascotDimensions[mascot];
  const heroArt = `
    <!-- brand-manual:hero:start -->
    <div class="hero-brand-art brand-hero-art brand-hero-art--subpage" aria-hidden="true">
      <span class="hero-brand-art__shape"><img src="/assets/decor/${mascot}.svg" alt="" width="${mascotWidth}" height="${mascotHeight}" decoding="async"></span>
    </div>
    <!-- brand-manual:hero:end -->`;
  return html.replace(
    /(<section\b[^>]*class="[^"]*\b(?:rs-hero|jp-hero|f30-hero|tym-hero|legal-hero)\b[^"]*"[^>]*>[\s\S]*?<div\b[^>]*class="[^"]*\bwrap\b[^"]*"[^>]*>)/,
    `$1${heroArt}`,
  );
}

function decorateStoryArt(html, pageName) {
  html = html.replace(/\s*<!-- brand-manual:story:start -->[\s\S]*?<!-- brand-manual:story:end -->/g, "");
  html = html.replace(/\s*<span class="story-flow-rail"[^>]*><\/span>/g, "");
  const story = brandStoryArt[pageName];
  if (!story) return html;

  const flowClass = pageName.startsWith("reseni-")
    ? "rs-flow"
    : pageName === "firma-2030.html"
      ? "f30-levels"
      : "jp-walk";
  const storyMarkup = `
    <!-- brand-manual:story:start -->
    <div class="brand-story-art" aria-hidden="true">
      <img class="brand-story-art__illustration" src="/assets/decor/${story}.webp" alt="" width="720" height="540" loading="lazy" decoding="async">
    </div>
    <!-- brand-manual:story:end -->`;

  return html.replace(
    new RegExp(`(<div class="${flowClass}">)`),
    `${storyMarkup}\n    $1<span class="story-flow-rail" aria-hidden="true"></span>`,
  );
}

function normalizeFonts(html) {
  return html
    .replace(/^@font-face\{font-family:(['"])Greycliff CF\1;[^\n]*\}\n?/gm, "")
    .replace(/^@font-face\{font-family:(['"])Fira Mono\1;[^\n]*\}\n?/gm, "")
    .replace(/GreycliffCF-(Medium|Bold|Heavy)\.otf/g, "GreycliffCF-$1.woff2")
    .replace(/type="font\/otf"/g, 'type="font/woff2"')
    .replace(/format\((['"])opentype\1\)/g, 'format("woff2")');
}

function updateStructuredDescriptions(value, description) {
  if (Array.isArray(value)) {
    value.forEach((item) => updateStructuredDescriptions(item, description));
    return;
  }
  if (!value || typeof value !== "object") return;

  const types = Array.isArray(value["@type"]) ? value["@type"] : [value["@type"]];
  if (types.includes("WebPage") || types.includes("Service")) value.description = description;
  Object.values(value).forEach((item) => updateStructuredDescriptions(item, description));
}

function refreshSolutionMetadata(html, code, pageName) {
  if (!pageName.startsWith("reseni-")) return html;
  const description = solutionMetaDescriptions[code]?.[pageName];
  if (!description) throw new Error(`${code}/${pageName}: missing solution meta description`);
  const escapedDescription = escapeHtml(description);

  html = html
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${escapedDescription}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${escapedDescription}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${escapedDescription}">`);

  return html.replace(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,
    (script, jsonText) => {
      let structuredData;
      try {
        structuredData = JSON.parse(jsonText);
      } catch (error) {
        throw new Error(`${code}/${pageName}: invalid JSON-LD (${error.message})`);
      }
      updateStructuredDescriptions(structuredData, description);
      return `<script type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
    },
  );
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

function removeEmbeddedStyles(html, code, pageName) {
  const styles = html.match(/<style(?:\s[^>]*)?>[\s\S]*?<\/style>/g) || [];
  if (styles.length > 1) {
    throw new Error(`${code}/${pageName}: expected at most one embedded style block, found ${styles.length}`);
  }
  return html.replace(/\s*<style(?:\s[^>]*)?>[\s\S]*?<\/style>\s*/g, "\n");
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
    )
    .replaceAll("border-left:3px solid var(--green);", "border-left:0;");
}

function normalizeLegalConsentControl(html, pageName) {
  if (pageName !== "gdpr.html") return html;
  return html.replace(
    /<button type="button" onclick="window\.eitOpenConsent && window\.eitOpenConsent\(\)"(?:\s+class="[^"]*")?\s+style="[^"]*">/g,
    '<button type="button" class="legal-consent-button" onclick="window.eitOpenConsent && window.eitOpenConsent()">',
  );
}

function removeLegalDraftNote(html, pageName) {
  if (pageName !== "gdpr.html" && pageName !== "podminky.html") return html;
  return html.replace(/\s*<div class="legal-note">[\s\S]*?<\/div>\s*/g, "\n");
}

function unwrapFaqDetails(html) {
  return html
    .replace(
      /<details class="content-details(?: reveal)?">\s*<summary>[\s\S]*?<\/summary>\s*(<div class="(?:rs-faq-grid|rs-faq)">[\s\S]*?<\/div>)\s*<\/details>/g,
      "$1",
    )
    .replace(
      /<details class="content-details(?: reveal)?">\s*<summary>[\s\S]*?<\/summary>\s*(<div class="jp-walk">[\s\S]*?<\/div>)\s*<\/details>/g,
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
  html = html.replace(/<div class="jp-block(?: reveal)?">/g, (match) => {
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
    html = html.replace(/<div class="jp-stack-item(?: reveal)?">/g, (match) => {
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
    /(<div class="f30-stat(?: reveal)?">)\s*<p>([\s\S]*?)<cite>([\s\S]*?)<\/cite><\/p>(\s*<\/div>)/g,
    "$1<p>$2</p><cite>$3</cite>$4",
  );

  const statIcons = ["levels", "coins", "users", "ruler-chart"];
  let statIndex = 0;
  html = html.replace(/<div class="f30-stat(?: reveal)?">/g, (match) => {
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

function simplifyEditorialScaffolding(html) {
  let keptHeroEyebrow = false;
  html = html.replace(
    /\s*<span class="eyebrow(?: reveal)?">[\s\S]*?<\/span>/g,
    (eyebrow) => {
      if (keptHeroEyebrow) return "";
      keptHeroEyebrow = true;
      return eyebrow;
    },
  );
  html = html.replace(/\s*<span class="n">\d{2}<\/span>/g, "");
  html = html.replace(/\sclass="([^"]*)"/g, (_attribute, classNames) => {
    const kept = classNames.split(/\s+/).filter((className) => className && className !== "reveal");
    return kept.length ? ` class="${kept.join(" ")}"` : "";
  });
  return html.replace(/<([a-z][a-z0-9-]*)\s+>/gi, "<$1>");
}

function removeTeamConsultants(html, pageName) {
  if (pageName !== "tym.html") return html;

  const compactGrid = html.indexOf('class="team-grid compact"');
  if (compactGrid === -1) return html;

  const groupStart = html.lastIndexOf('<div class="team-group">', compactGrid);
  if (groupStart === -1) throw new Error("tym.html: compact consultant group has no wrapper");

  const divTag = /<\/?div\b[^>]*>/g;
  divTag.lastIndex = groupStart;
  let depth = 0;
  let groupEnd = -1;
  let match;

  while ((match = divTag.exec(html))) {
    depth += match[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      groupEnd = divTag.lastIndex;
      break;
    }
  }

  if (groupEnd === -1) throw new Error("tym.html: compact consultant group is not balanced");

  const lineStart = html.lastIndexOf("\n", groupStart) + 1;
  let removeEnd = groupEnd;
  while (html[removeEnd] === " " || html[removeEnd] === "\t") removeEnd += 1;
  if (html[removeEnd] === "\r") removeEnd += 1;
  if (html[removeEnd] === "\n") removeEnd += 1;
  return html.slice(0, lineStart) + html.slice(removeEnd);
}

function refreshPage(code, pageName) {
  const page = locales[code];
  const target = resolve(root, pagePath(code, pageName));
  if (!existsSync(target)) throw new Error(`Missing production page: ${target}`);

  let html = readFileSync(target, "utf8");
  html = removeTeamConsultants(html, pageName);
  html = unwrapFaqDetails(html);
  html = normalizeFonts(html);
  html = refreshSolutionMetadata(html, code, pageName);
  html = html.replace(
    /<meta name="theme-color" content="[^"]*">/,
    '<meta name="theme-color" content="#41E39E">',
  );
  if (!/<body\b[^>]*class="[^"]*\bsubpage\b/.test(html)) {
    html = html.replace("<body>", '<body class="subpage">');
  }
  const pageFamily = pageName.startsWith("reseni-")
    ? "solution"
    : pageName.startsWith("jak-stavime-")
      ? "method"
      : pageName === "tym.html"
        ? "team"
        : pageName === "firma-2030.html"
          ? "future"
          : "legal";
  html = html.replace(
    /<body\b[^>]*>/,
    `<body class="subpage brand-manual" data-locale="${code}" data-page-family="${pageFamily}" data-page="${pageName.replace(".html", "")}">`,
  );
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
  html = normalizeLegalConsentControl(html, pageName);
  html = removeLegalDraftNote(html, pageName);
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
  html = decorateBrandManual(html, pageName);
  html = decorateStoryArt(html, pageName);
  html = simplifyEditorialScaffolding(html);
  html = removeEmbeddedStyles(html, code, pageName);

  html = refreshAssets(html, pageName);
  html = html.replace(/[ \t]+$/gm, "");
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
