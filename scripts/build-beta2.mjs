/**
 * build-beta2.mjs — renders the /beta2/ keycap board.
 *
 * beta2 is a second prototype track that sits alongside beta1; neither
 * overwrites the other. Where beta1 is a scrolling page, beta2 is a bento board
 * of pressable keys: each key is a door onto one subject, carrying only a
 * headline and one measured line. The detail lives behind the key.
 *
 * Content comes from the same modules as the live site and beta1, so all three
 * stay in sync and nothing from beta1 is lost — every beta1 section is mapped
 * onto a key below.
 *
 * Output: beta2/index.html (EN), beta2/cs.html, beta2/de.html, beta2/pl.html
 * Run:    node scripts/build-beta2.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { bookingUrl, locales } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { escapeHtml } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const e = (v) => escapeHtml(v ?? "");

const order = ["en", "cs", "de", "pl"];
const file = { en: "index.html", cs: "cs.html", de: "de.html", pl: "pl.html" };
const label = { en: "EN", cs: "CZ", de: "DE", pl: "PL" };

/* Board-only copy. No home in the production content model. */
const chrome = {
  en: {
    hello: "Hello.",
    heroLead: "A 75-person engineering team in Czechia. We design, build and then operate what we shipped.",
    caseEyebrow: "Case study", casesGo: "Read all 3 cases →",
    teamEyebrow: "Who we are", teamGo: "Bruntál & remote →",
    factsEyebrow: "Facts & numbers",
    canEyebrow: "We can", solutionsGo: "See all 8 routines →",
    startEyebrow: "Start here", startPress: "press enter",
    selfEyebrow: "Firma 2030 · self-check", selfGo: "5 levels →",
    intgEyebrow: "Integrations", intgGo: "even legacy without an API →",
    roiEyebrow: "ROI calculator",
    roiTitle: "What is your routine costing you?", roiOpen: "Open the calculator →",
    processEyebrow: "How we work", processGo: "4 stages →",
    slaEyebrow: "Accountability", slaGo: "EU cloud · audit trail →",
    docsTitle: "Documents that file themselves.",
    docsMeta: "Invoices, orders, delivery notes and timesheets read straight into your ERP.",
    agentsTitle: "Agents act. Your people approve.",
    agentsMeta: "Every sensitive step waits for a human. Every action lands in an audit trail your auditor can read.",
    intgTitle: "SAP, Pohoda + 58 more systems we already speak.",
    selfTitle: "Where is your company on the agentic road?",
    rack: ["What we build", "Results", "How we work", "Integrations", "Team", "Calculator", "Contact"],
  },
  cs: {
    hello: "Dobrý den.",
    heroLead: "Pětasedmdesátičlenný engineering tým v Česku. Navrhujeme, stavíme a pak provozujeme, co jsme dodali.",
    caseEyebrow: "Případovka", casesGo: "Všechny 3 případovky →",
    teamEyebrow: "Kdo jsme", teamGo: "Bruntál & remote →",
    factsEyebrow: "Fakta & čísla",
    canEyebrow: "Umíme", solutionsGo: "Všech 8 rutin →",
    startEyebrow: "Začněte tady", startPress: "zmáčkni enter",
    selfEyebrow: "Firma 2030 · sebehodnocení", selfGo: "5 úrovní →",
    intgEyebrow: "Integrace", intgGo: "i legacy bez API →",
    roiEyebrow: "Kalkulačka",
    roiTitle: "Kolik vás rutina stojí?", roiOpen: "Otevřít kalkulačku →",
    processEyebrow: "Jak pracujeme", processGo: "4 fáze →",
    slaEyebrow: "Odpovědnost", slaGo: "EU cloud · auditní stopa →",
    docsTitle: "Dokumenty, které se založí samy.",
    docsMeta: "Faktury, objednávky, dodací listy a výkazy rovnou do vašeho ERP.",
    agentsTitle: "Agenti jednají. Vaši lidé schvalují.",
    agentsMeta: "Každý citlivý krok čeká na člověka. Každá akce má auditní stopu, kterou auditor přečte.",
    intgTitle: "SAP, Pohoda a dalších 58 systémů, kterým rozumíme.",
    selfTitle: "Kde je vaše firma na cestě k agentnímu provozu?",
    rack: ["Co stavíme", "Výsledky", "Jak pracujeme", "Integrace", "Tým", "Kalkulačka", "Kontakt"],
  },
  de: {
    hello: "Guten Tag.",
    heroLead: "Ein 75-köpfiges Engineering-Team in Tschechien. Wir entwerfen, bauen und betreiben, was wir geliefert haben.",
    caseEyebrow: "Fallstudie", casesGo: "Alle 3 Fallstudien →",
    teamEyebrow: "Wer wir sind", teamGo: "Bruntál & remote →",
    factsEyebrow: "Fakten & Zahlen",
    canEyebrow: "Wir können", solutionsGo: "Alle 8 Routinen →",
    startEyebrow: "Hier starten", startPress: "Enter drücken",
    selfEyebrow: "Firma 2030 · Selbstcheck", selfGo: "5 Stufen →",
    intgEyebrow: "Integrationen", intgGo: "auch Legacy ohne API →",
    roiEyebrow: "ROI-Rechner",
    roiTitle: "Was kostet Sie die Routine?", roiOpen: "Rechner öffnen →",
    processEyebrow: "So arbeiten wir", processGo: "4 Phasen →",
    slaEyebrow: "Verantwortung", slaGo: "EU-Cloud · Audit-Trail →",
    docsTitle: "Dokumente, die sich selbst ablegen.",
    docsMeta: "Rechnungen, Bestellungen, Lieferscheine und Stundenzettel direkt ins ERP.",
    agentsTitle: "Agenten handeln. Ihre Leute genehmigen.",
    agentsMeta: "Jeder sensible Schritt wartet auf einen Menschen. Jede Aktion landet im Audit-Trail.",
    intgTitle: "SAP, Pohoda und 58 weitere Systeme, die wir sprechen.",
    selfTitle: "Wo steht Ihr Unternehmen auf dem Weg zum agentischen Betrieb?",
    rack: ["Was wir bauen", "Ergebnisse", "So arbeiten wir", "Integrationen", "Team", "Rechner", "Kontakt"],
  },
  pl: {
    hello: "Dzień dobry.",
    heroLead: "75-osobowy zespół inżynierski w Czechach. Projektujemy, budujemy, a potem utrzymujemy to, co dostarczyliśmy.",
    caseEyebrow: "Case study", casesGo: "Wszystkie 3 case studies →",
    teamEyebrow: "Kim jesteśmy", teamGo: "Bruntál & zdalnie →",
    factsEyebrow: "Fakty i liczby",
    canEyebrow: "Potrafimy", solutionsGo: "Wszystkie 8 rutyn →",
    startEyebrow: "Zacznij tutaj", startPress: "naciśnij enter",
    selfEyebrow: "Firma 2030 · samoocena", selfGo: "5 poziomów →",
    intgEyebrow: "Integracje", intgGo: "nawet legacy bez API →",
    roiEyebrow: "Kalkulator ROI",
    roiTitle: "Ile kosztuje Cię rutyna?", roiOpen: "Otwórz kalkulator →",
    processEyebrow: "Jak pracujemy", processGo: "4 etapy →",
    slaEyebrow: "Odpowiedzialność", slaGo: "Chmura UE · ścieżka audytu →",
    docsTitle: "Dokumenty, które same się archiwizują.",
    docsMeta: "Faktury, zamówienia, listy przewozowe i karty pracy prosto do ERP.",
    agentsTitle: "Agenci działają. Twoi ludzie zatwierdzają.",
    agentsMeta: "Każdy wrażliwy krok czeka na człowieka. Każde działanie trafia do ścieżki audytu.",
    intgTitle: "SAP, Pohoda i 58 innych systemów, które znamy.",
    selfTitle: "Gdzie jest Twoja firma na drodze do operacji agentowych?",
    rack: ["Co budujemy", "Wyniki", "Jak pracujemy", "Integracje", "Zespół", "Kalkulator", "Kontakt"],
  },
};

/** One pressable key. `span`/`row` place it on the 12-column board. */
function key({ col, span, row, tone, legend, eyebrow, title, meta, go, href, big }) {
  const place = `grid-column:${col} / span ${span};grid-row:${row}`;
  return `      <a class="key key--${tone}" href="${href}" style="${place}">
        ${legend ? `<span class="key-legend">${legend}</span>` : ""}
        ${eyebrow ? `<span class="key-eyebrow">${e(eyebrow)}</span>` : ""}
        <span class="key-title${big ? " key-title--big" : ""}">${e(title)}</span>
        ${meta ? `<span class="key-meta">${e(meta)}</span>` : ""}
        ${go ? `<span class="key-go">${e(go)}</span>` : ""}
      </a>`;
}

function render(code) {
  const page = locales[code];
  const c = restorationContent[code];
  const t = chrome[code];
  const prefix = page.prefix;

  const metals = c.cases.cards[1];      // the payback case
  const manufacturing = c.cases.cards[0];
  const langs = order
    .map((x) => `<a class="${x === code ? "on" : ""}" href="${x === "en" ? "/beta2/" : `/beta2/${file[x]}`}">${label[x]}</a>`)
    .join("");
  const rack = t.rack
    .map((l, i) => `        <a class="rack-key" href="${["#build", "#results", "#process", "#integrations", "#team", "#roi", "#contact"][i]}">${e(l)}</a>`)
    .join("\n");

  return `<!doctype html>
<html lang="${page.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="robots" content="noindex,nofollow">
<title>${e(page.title)} — beta2</title>
<meta name="description" content="${e(page.description)}">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/beta2/assets/keys.css">
</head>
<body>

<header class="site-head">
  <a href="${code === "en" ? "/beta2/" : `/beta2/${file[code]}`}" aria-label="${e(page.homeLabel)}">
    <img src="/assets/enter_logo_white.svg" alt="EnterIT">
  </a>
  <nav class="head-nav" aria-label="${e(page.mainNavLabel)}">
    <a href="#build">${e(page.nav.services)}</a>
    <a href="#results">${e(page.nav.results)}</a>
    <a href="#process">${e(page.nav.process)}</a>
    <a href="#integrations">${e(page.nav.integrations)}</a>
    <a href="#team">${e(page.nav.team)}</a>
  </nav>
  <span class="lang">${langs}</span>
</header>

<main class="board">

  <div class="hero-bar">
    <div>
      <h1>${e(t.hello)} ${e(page.hero.title)} ${e(page.hero.highlight)}</h1>
      <p>${e(t.heroLead)}</p>
    </div>
    <div class="hero-side">
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI" style="height:30px;filter:invert(1)">
      <span style="font-family:var(--font-head);font-weight:700;font-size:14px">Microsoft<br><span style="font-family:var(--font-mono);font-weight:500;font-size:10.5px;opacity:.6">Solutions Partner</span></span>
    </div>
  </div>

${key({ col: 1, span: 3, row: 2, tone: "red", legend: "C", eyebrow: t.caseEyebrow,
        title: metals.metric, meta: `${metals.context} · ${metals.impact}`, go: t.casesGo, href: "#results" })}

${key({ col: 4, span: 9, row: 2, tone: "navy", legend: "T", eyebrow: t.teamEyebrow,
        title: page.team.title, meta: page.team.stats.map((s) => s.join(" ")).join(" · "), go: t.teamGo,
        href: `/${prefix}tym.html`, big: true })}

${key({ col: 1, span: 3, row: 3, tone: "blue", legend: "N", eyebrow: t.factsEyebrow,
        title: manufacturing.metric, meta: manufacturing.solution, href: "#results" })}

${key({ col: 4, span: 3, row: 3, tone: "yellow", legend: "D", eyebrow: t.canEyebrow,
        title: t.docsTitle, meta: t.docsMeta, go: t.solutionsGo, href: "#build" })}

      <a class="key key--enter" href="${bookingUrl}" target="_blank" rel="noopener" style="grid-column:7 / span 6;grid-row:3">
        <span class="key-legend">⏎</span>
        <span class="key-eyebrow">${e(t.startEyebrow)}</span>
        <span class="key-title">${e(page.contact.primary)}</span>
        <span class="key-meta">${e(page.contact.text)}</span>
        <span class="key-go">${e(t.startPress)} · milo@enterit.cz · +420 608 969 263</span>
      </a>

${key({ col: 1, span: 6, row: 4, tone: "turquoise", legend: "F", eyebrow: t.selfEyebrow,
        title: t.selfTitle, go: t.selfGo, href: `/${prefix}firma-2030.html` })}

      <div class="rack" style="grid-column:7 / span 6;grid-row:4">
${rack}
      </div>

${key({ col: 1, span: 3, row: 5, tone: "white", legend: "I", eyebrow: t.intgEyebrow,
        title: t.intgTitle, go: t.intgGo, href: "#integrations" })}

${key({ col: 4, span: 5, row: 5, tone: "violet", legend: "A", eyebrow: t.canEyebrow,
        title: t.agentsTitle, meta: t.agentsMeta, href: `/${prefix}jak-stavime-agenty.html` })}

${key({ col: 9, span: 4, row: 5, tone: "white", legend: "R", eyebrow: t.roiEyebrow,
        title: t.roiTitle, go: t.roiOpen, href: "#roi" })}

${key({ col: 1, span: 5, row: 6, tone: "navy", legend: "P", eyebrow: t.processEyebrow,
        title: page.process.title, go: t.processGo, href: "#process" })}

${key({ col: 6, span: 7, row: 6, tone: "pink", legend: "S", eyebrow: t.slaEyebrow,
        title: c.operations.cards[1].title, go: t.slaGo, href: `/${prefix}podminky.html` })}

</main>

<footer class="site-foot">
  <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652</span>
  <span><a href="/${prefix}gdpr.html">${e(page.footer.privacy)}</a> · <a href="/${prefix}podminky.html">${e(page.footer.terms)}</a> · <a href="/beta/">beta 1</a></span>
</footer>

</body>
</html>
`;
}

for (const code of order) {
  writeFileSync(resolve(root, "beta2", file[code]), render(code), "utf8");
  console.log(`beta2/${file[code]}  (${code})`);
}
console.log("Beta2 board built.");
