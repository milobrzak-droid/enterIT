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
    buildGo: "Three disciplines, one team →",
    factsLabel: "given back per user, every week",
    agentsGo: "How we build agents →",
    teamPhotoAlt: "The EnterIT team at work",
    processPhotoAlt: "An engineer working on a client system",
    selfSub: "Five maturity levels, and the one practical step that moves you to the next.",
    reachEyebrow: "Beyond Czechia",
    reachTitle: "A European delivery partner.",
    reachSub: "US consultancies, Microsoft partners and systems integrators use us as their engineering bench in Europe.",
    reachGo: "US partnership →",
    bubbleSay: "Tell us the process that is slowing your team down. We will tell you straight whether it is worth automating.",
    hiringPill: "We are hiring", hiringTitle: "Build systems that actually go live.",
    hiringSub: "No proof-of-concept graveyard. You ship to production and you keep it running.", hiringGo: "Open roles →",
    heroWhat: "AI agents, automations and integrations — built into the systems you already run, then operated by us. 120+ projects live, from invoice extraction to agentic layers over Business Central.",
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
    buildGo: "Tři disciplíny, jeden tým →",
    factsLabel: "vráceno každému uživateli, každý týden",
    agentsGo: "Jak stavíme agenty →",
    teamPhotoAlt: "Tým EnterIT při práci",
    processPhotoAlt: "Vývojář pracuje na klientském systému",
    selfSub: "Pět úrovní zralosti a jeden praktický krok, který vás posune na další.",
    reachEyebrow: "Za hranice Česka",
    reachTitle: "Evropský dodavatelský partner.",
    reachSub: "Americké konzultanty, Microsoft partnery a systémové integrátory obsluhujeme jako jejich engineering zázemí v Evropě.",
    reachGo: "Partnerství pro US →",
    bubbleSay: "Řekněte nám proces, který vás brzdí. Řekneme vám na rovinu, jestli se ho vyplatí automatizovat.",
    hiringPill: "Hledáme lidi", hiringTitle: "Stavějte systémy, které opravdu naběhnou.",
    hiringSub: "Žádný hřbitov proof-of-conceptů. Dodáte do provozu a pak to provozujete.", hiringGo: "Volné pozice →",
    heroWhat: "AI agenti, automatizace a integrace — postavené do systémů, které už používáte, a pak námi provozované. 120+ projektů v ostrém provozu, od vytěžování faktur po agentní vrstvy nad Business Central.",
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
    buildGo: "Drei Disziplinen, ein Team →",
    factsLabel: "pro Nutzer zurückgewonnen, jede Woche",
    agentsGo: "Wie wir Agenten bauen →",
    teamPhotoAlt: "Das EnterIT-Team bei der Arbeit",
    processPhotoAlt: "Ein Entwickler arbeitet an einem Kundensystem",
    selfSub: "Fünf Reifegrade und der eine praktische Schritt zur nächsten Stufe.",
    reachEyebrow: "Über Tschechien hinaus",
    reachTitle: "Ein europäischer Delivery-Partner.",
    reachSub: "US-Beratungen, Microsoft-Partner und Systemintegratoren nutzen uns als ihre Engineering-Bank in Europa.",
    reachGo: "US-Partnerschaft →",
    bubbleSay: "Nennen Sie uns den Prozess, der Ihr Team bremst. Wir sagen Ihnen offen, ob sich Automatisierung lohnt.",
    hiringPill: "Wir stellen ein", hiringTitle: "Systeme bauen, die wirklich live gehen.",
    hiringSub: "Kein Proof-of-Concept-Friedhof. Sie liefern in den Betrieb und halten es am Laufen.", hiringGo: "Offene Stellen →",
    heroWhat: "KI-Agenten, Automatisierungen und Integrationen — eingebaut in Ihre bestehenden Systeme und von uns betrieben. 120+ Projekte im Echtbetrieb, von der Rechnungsextraktion bis zu agentischen Schichten über Business Central.",
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
    buildGo: "Trzy dyscypliny, jeden zespół →",
    factsLabel: "zwrócone każdemu użytkownikowi, co tydzień",
    agentsGo: "Jak budujemy agentów →",
    teamPhotoAlt: "Zespół EnterIT w pracy",
    processPhotoAlt: "Inżynier pracuje nad systemem klienta",
    selfSub: "Pięć poziomów dojrzałości i jeden praktyczny krok na wyższy.",
    reachEyebrow: "Poza Czechami",
    reachTitle: "Europejski partner wdrożeniowy.",
    reachSub: "Amerykańskie konsultingi, partnerzy Microsoftu i integratorzy korzystają z nas jako zaplecza inżynierskiego w Europie.",
    reachGo: "Partnerstwo dla USA →",
    bubbleSay: "Powiedz nam, który proces spowalnia Twój zespół. Powiemy wprost, czy warto go automatyzować.",
    hiringPill: "Rekrutujemy", hiringTitle: "Buduj systemy, które naprawdę ruszają.",
    hiringSub: "Żadnego cmentarza proof-of-conceptów. Wdrażasz na produkcję i utrzymujesz.", hiringGo: "Otwarte role →",
    heroWhat: "Agenci AI, automatyzacje i integracje — wbudowane w systemy, których już używacie, i utrzymywane przez nas. 120+ projektów na produkcji, od ekstrakcji faktur po warstwy agentowe nad Business Central.",
    rack: ["Co budujemy", "Wyniki", "Jak pracujemy", "Integracje", "Zespół", "Kalkulator", "Kontakt"],
  },
};

const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

/**
 * One pressable key.
 *
 * `title` is the load-bearing element — it runs large across the cap and should
 * carry the point without the support beneath it. `sub` explains, `stat` leads
 * with a figure instead of a sentence, `photo` turns the cap into an image.
 */
function key({ col, span, row, tone, hue, legend, eyebrow, title, size, sub, meta, stat, statLabel, go, href, photo, alt, mark = true }) {
  const place = `grid-column:${col} / span ${span};grid-row:${row}`;
  const sizeClass = size === "xl" ? " key-title--xl" : size === "big" ? " key-title--big" : "";
  return `      <a class="key key--${tone}${photo ? " key--photo" : ""}"${hue !== undefined ? ` data-hue="${hue}"` : ""} href="${href}" style="${place}">
        ${photo ? `<img class="key-bg" src="${photo}" alt="${e(alt || "")}" loading="lazy">` : ""}
        ${mark ? `<img class="key-mark" src="/assets/enter_symbol_color.svg" alt="">` : ""}
        <span class="key-arrow">${chevron}</span>
        ${legend ? `<span class="key-legend">${legend}</span>` : ""}
        ${eyebrow ? `<span class="key-eyebrow">${e(eyebrow)}</span>` : ""}
        ${stat ? `<span class="key-stat">${e(stat)}${statLabel ? `<small>${e(statLabel)}</small>` : ""}</span>` : ""}
        ${title ? `<span class="key-title${sizeClass}">${e(title)}</span>` : ""}
        ${sub ? `<span class="key-sub">${e(sub)}</span>` : ""}
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
    <img src="/assets/enter_logo_black.svg" alt="EnterIT">
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
      <p>${e(t.heroWhat)}</p>
    </div>
    <div class="hero-side">
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI">
      <span class="hero-ms">
        <span class="sq"><i></i><i></i><i></i><i></i></span>
        <span><b>Microsoft</b><span>Solutions Partner</span></span>
      </span>
    </div>
  </div>

${key({ col: 1, span: 7, row: 2, tone: "turquoise", hue: 0, legend: "W", eyebrow: page.services.kicker,
        title: page.services.title, size: "big",
        sub: page.services.cards.map((x) => x.title).join(" · "),
        go: t.buildGo, href: "#build" })}

${key({ col: 8, span: 5, row: 2, tone: "navy", legend: "T", eyebrow: t.teamEyebrow,
        title: page.team.title, size: "big", sub: page.team.intro,
        go: t.teamGo, href: `/${prefix}tym.html`,
        photo: "/assets/decor/firmy.webp", alt: t.teamPhotoAlt })}

${key({ col: 1, span: 3, row: 3, tone: "blue", hue: 1, legend: "N", eyebrow: t.factsEyebrow,
        stat: manufacturing.metric, statLabel: t.factsLabel,
        sub: manufacturing.solution, href: "#results" })}

${key({ col: 4, span: 4, row: 3, tone: "red", hue: 2, legend: "C", eyebrow: t.caseEyebrow,
        stat: metals.metric, statLabel: metals.context,
        sub: metals.impact, go: t.casesGo, href: "#results" })}

${key({ col: 8, span: 5, row: 3, tone: "violet", hue: 3, legend: "A", eyebrow: t.canEyebrow,
        title: t.agentsTitle, size: "big", sub: t.agentsMeta,
        go: t.agentsGo, href: `/${prefix}jak-stavime-agenty.html` })}

      <a class="key key--bubble" href="${bookingUrl}" target="_blank" rel="noopener" style="grid-column:1 / span 5;grid-row:4">
        <span class="key-legend">⏎</span>
        <span class="key-eyebrow">${e(t.startEyebrow)}</span>
        <span class="key-title key-title--big">${e(t.bubbleSay)}</span>
        <span class="bubble-by">
          <img src="/assets/decor/mascot-wave.svg" alt="">
          <span><b>${e(t.startPress)}</b><span>milo@enterit.cz · +420 608 969 263</span></span>
        </span>
      </a>

      <div class="rack" style="grid-column:6 / span 4;grid-row:4">
${rack}
      </div>

      <a class="key key--photo key--navy" href="${`/${prefix}tym.html`}" style="grid-column:10 / span 3;grid-row:4">
        <img class="key-bg" src="/assets/team/klesnarova.jpg" alt="" loading="lazy">
        <img class="key-mark" src="/assets/enter_symbol_color.svg" alt="">
        <span class="key-arrow">${chevron}</span>
        <span class="key-pill">${searchIcon}${e(t.hiringPill)}</span>
        <span class="key-title">${e(t.hiringTitle)}</span>
        <span class="key-sub">${e(t.hiringSub)}</span>
        <span class="key-go">${e(t.hiringGo)}</span>
      </a>

${key({ col: 1, span: 4, row: 5, tone: "yellow", hue: 4, legend: "D", eyebrow: t.canEyebrow,
        title: t.docsTitle, sub: t.docsMeta, go: t.solutionsGo, href: "#build" })}

${key({ col: 5, span: 4, row: 5, tone: "white", legend: "I", eyebrow: t.intgEyebrow,
        title: t.intgTitle, sub: page.integrations.intro,
        go: t.intgGo, href: "#integrations" })}

${key({ col: 9, span: 4, row: 5, tone: "white", legend: "R", eyebrow: t.roiEyebrow,
        title: t.roiTitle, sub: c.calculator.intro, go: t.roiOpen, href: "#roi" })}

${key({ col: 1, span: 5, row: 6, tone: "navy", legend: "P", eyebrow: page.process.kicker,
        title: page.process.title, size: "big", sub: page.process.intro,
        go: t.processGo, href: "#process",
        photo: "/assets/decor/guy.webp", alt: t.processPhotoAlt })}

${key({ col: 6, span: 7, row: 6, tone: "pink", hue: 5, legend: "S", eyebrow: c.operations.kicker,
        title: c.operations.title, size: "big",
        sub: c.operations.cards.map((x) => x.title).join(" · "),
        go: t.slaGo, href: `/${prefix}podminky.html` })}

${key({ col: 1, span: 6, row: 7, tone: "turquoise", hue: 1, legend: "F", eyebrow: t.selfEyebrow,
        title: t.selfTitle, size: "big", sub: t.selfSub,
        go: t.selfGo, href: `/${prefix}firma-2030.html` })}

${key({ col: 7, span: 6, row: 7, tone: "navy", legend: "U", eyebrow: t.reachEyebrow,
        title: t.reachTitle, size: "big", sub: t.reachSub,
        go: t.reachGo, href: "/us/" })}

</main>

<footer class="site-foot">
  <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652</span>
  <span><a href="/${prefix}gdpr.html">${e(page.footer.privacy)}</a> · <a href="/${prefix}podminky.html">${e(page.footer.terms)}</a> · <a href="/beta/">beta 1</a></span>
</footer>


<script>
/* The palette rotates on each visit: every colourable cap declares a slot and
   the whole set is offset by one step, so the board greets a returning visitor
   in a different arrangement while the brand's own colours stay in charge.
   Turquoise leads the list, so it keeps the largest share of the board. */
(function(){
  var PALETTE = ["turquoise","blue","violet","pink","yellow","red"];
  var offset = Math.floor(Math.random() * PALETTE.length);
  document.querySelectorAll(".key[data-hue]").forEach(function(cap){
    var slot = (parseInt(cap.dataset.hue, 10) + offset) % PALETTE.length;
    PALETTE.forEach(function(name){ cap.classList.remove("key--" + name); });
    cap.classList.add("key--" + PALETTE[slot]);
  });
})();
<\/script>
</body>
</html>
`;
}

for (const code of order) {
  writeFileSync(resolve(root, "beta2", file[code]), render(code), "utf8");
  console.log(`beta2/${file[code]}  (${code})`);
}
console.log("Beta2 board built.");
