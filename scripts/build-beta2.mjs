/**
 * build-beta2.mjs — renders the /beta2/ keycap board.
 *
 * beta2 is a second prototype track that sits alongside beta1; neither
 * overwrites the other. Where beta1 is a scrolling page, beta2 is a board of
 * pressable keys: each key is a door onto one subject, carrying a headline and
 * one measured line. The detail lives behind the key.
 *
 * The board is read top to bottom as a single argument, one chapter at a time:
 *
 *   00  what we are            — hero, in one sentence, with the two partner marks
 *   01  what we build          — the three disciplines
 *   02  where it starts        — eight named routines, so the reader finds themself
 *   03  what came out          — three measured cases, plus the house numbers
 *   04  how it runs            — the four stages and what each one costs in time
 *   05  what it plugs into     — the systems we already speak
 *   06  who carries it after   — SLA, ownership, security
 *   07  who is behind it       — the team and the people who answer for it
 *   08  your move              — calculator, self-check, and a way to start
 *
 * Each chapter answers the question the previous one raises, so the reader
 * gains one thing per stop and nothing important arrives before it is earned.
 *
 * Content comes from the same modules as the live site and beta1, so all three
 * stay in sync. Colour is assigned per chapter, not per key, and the whole set
 * of chapter accents rotates one step on each visit.
 *
 * Output: beta2/index.html (EN), beta2/cs.html, beta2/de.html, beta2/pl.html
 * Run:    node scripts/build-beta2.mjs
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { boardOrder, caseStudies } from "./case-studies-content.mjs";
import { bookingUrl, locales } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { escapeHtml } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const e = (v) => escapeHtml(v ?? "");

const order = ["en", "cs", "de", "pl"];
const file = { en: "index.html", cs: "cs.html", de: "de.html", pl: "pl.html" };
const label = { en: "EN", cs: "CZ", de: "DE", pl: "PL" };

/* Board-only copy — the connective tissue between chapters, which has no home
   in the production content model. Everything else is read from it. */
const chrome = {
  en: {
    hello: "Hello.",
    heroWhat: "AI agents, automations and integrations — built into the systems you already run, then operated by us. 120+ projects live, from invoice extraction to agentic layers over Business Central.",
    heroNote: "Czech engineering team · 75 people · delivering across Europe",
    chapters: ["What we build", "Where it starts", "What came out", "How it runs", "What it plugs into", "Who carries it after", "Who is behind it", "Your move"],
    asks: [
      "You have a process that costs more than it should. Three disciplines cover it, and one team answers for all three.",
      "Most of it is not exotic. These eight routines are the ones we are asked for most — find yours and you already know what the first project looks like.",
      "Numbers from live systems, anonymised. We bring the matching reference to the meeting.",
      "Nothing runs for a year before it earns its keep. Each stage ends in a decision, and you can stop at any of them.",
      "You keep your stack. We read, verify and write where your people already work — API, database, files, even a screen if that is all there is.",
      "The part most vendors leave out: who is on the hook once it is live, and what happens if you leave.",
      "One roof, one contract, and a named person who answers when something breaks at seven in the morning.",
      "Two ways to size it yourself, and one way to just ask.",
    ],
    stepLabel: "Stage",
    inOut: "in → out",
    proofLabel: "The house, in three numbers",
    systemsGo: "See the whole catalogue →",
    casesGo: "Read all three →",
    solutionsGo: "See all eight routines →",
    leadersEyebrow: "Leadership",
    teamGo: "Meet the whole team →",
    opsGo: "Terms and SLA →",
    processGo: "The four stages in detail →",
    selfEyebrow: "Firma 2030 · self-check",
    selfTitle: "Where is your company on the agentic road?",
    selfSub: "Five maturity levels, and the one practical step that moves you to the next.",
    selfGo: "Find your level →",
    roiGo: "Open the calculator →",
    startPress: "press enter",
    bubbleSay: "Tell us the process that is slowing your team down. We will tell you straight whether it is worth automating.",
    hiringPill: "We are hiring",
    hiringTitle: "Build systems that actually go live.",
    hiringSub: "No proof-of-concept graveyard. You ship to production and you keep it running.",
    hiringGo: "Open roles →",
    reachEyebrow: "Beyond Czechia",
    reachTitle: "A European delivery partner.",
    reachSub: "US consultancies, Microsoft partners and systems integrators use us as their engineering bench in Europe.",
    reachGo: "US partnership →",
    teamPhotoAlt: "The EnterIT team at work",
    processPhotoAlt: "An engineer working on a client system",
    artHint: "Photo goes here",
    slots: [
      "The floor: a real machine, a real operator, the document in hand",
      "A screen mid-work — the extraction running against the ERP",
      "The stand-up: three engineers and a whiteboard of the flow",
      "Server room or laptop on a client desk — where it actually runs",
      "Portrait of the person who answers the phone at 7am",
    ],
    rack: ["What we build", "Results", "How we work", "Integrations", "Team", "Calculator", "Contact"],
  },
  cs: {
    hello: "Dobrý den.",
    heroWhat: "AI agenti, automatizace a integrace — postavené do systémů, které už používáte, a pak námi provozované. 120+ projektů v ostrém provozu, od vytěžování faktur po agentní vrstvy nad Business Central.",
    heroNote: "Český engineering tým · 75 lidí · dodáváme po celé Evropě",
    chapters: ["Co stavíme", "Kde to začíná", "Co z toho vyšlo", "Jak to běží", "Do čeho to zapadne", "Kdo to ponese dál", "Kdo za tím stojí", "Váš krok"],
    asks: [
      "Máte proces, který stojí víc, než by měl. Pokrývají ho tři disciplíny a za všechny tři ručí jeden tým.",
      "Většina toho není exotika. Těchto osm rutin po nás lidé chtějí nejčastěji — najděte tu svou a už víte, jak vypadá první projekt.",
      "Čísla z ostrého provozu, anonymizovaná. Odpovídající referenci doložíme na schůzce.",
      "Nic neběží rok, než se zaplatí. Každá fáze končí rozhodnutím a v každé můžete skončit.",
      "Váš stack zůstává. Čteme, ověřujeme a zapisujeme tam, kde vaši lidé už pracují — přes API, databázi, soubory, i přes obrazovku, když nic jiného není.",
      "To, co většina dodavatelů vynechá: kdo za to ručí po nasazení a co se stane, když odejdete.",
      "Jedna střecha, jedna smlouva a jmenovitě určený člověk, který to zvedne, když v sedm ráno něco spadne.",
      "Dvě cesty, jak si to sami změřit, a jedna, jak se prostě zeptat.",
    ],
    stepLabel: "Fáze",
    inOut: "vstup → výstup",
    proofLabel: "Firma ve třech číslech",
    systemsGo: "Celý přehled systémů →",
    casesGo: "Všechny tři →",
    solutionsGo: "Všech osm rutin →",
    leadersEyebrow: "Vedení",
    teamGo: "Poznat celý tým →",
    opsGo: "Podmínky a SLA →",
    processGo: "Čtyři fáze detailně →",
    selfEyebrow: "Firma 2030 · sebehodnocení",
    selfTitle: "Kde je vaše firma na cestě k agentnímu provozu?",
    selfSub: "Pět úrovní zralosti a jeden praktický krok, který vás posune na další.",
    selfGo: "Zjistit svou úroveň →",
    roiGo: "Otevřít kalkulačku →",
    startPress: "zmáčkni enter",
    bubbleSay: "Řekněte nám proces, který vás brzdí. Řekneme vám na rovinu, jestli se ho vyplatí automatizovat.",
    hiringPill: "Hledáme lidi",
    hiringTitle: "Stavějte systémy, které opravdu naběhnou.",
    hiringSub: "Žádný hřbitov proof-of-conceptů. Dodáte do provozu a pak to provozujete.",
    hiringGo: "Volné pozice →",
    reachEyebrow: "Za hranice Česka",
    reachTitle: "Evropský dodavatelský partner.",
    reachSub: "Americké konzultanty, Microsoft partnery a systémové integrátory obsluhujeme jako jejich engineering zázemí v Evropě.",
    reachGo: "Partnerství pro US →",
    teamPhotoAlt: "Tým EnterIT při práci",
    processPhotoAlt: "Vývojář pracuje na klientském systému",
    artHint: "Sem přijde fotka",
    slots: [
      "Provoz: skutečný stroj, skutečná obsluha, doklad v ruce",
      "Obrazovka při práci — vytěžování běží proti ERP",
      "Stand-up: tři vývojáři a nakreslený tok na tabuli",
      "Serverovna nebo notebook na stole u klienta — kde to reálně běží",
      "Portrét člověka, který zvedne telefon v sedm ráno",
    ],
    rack: ["Co stavíme", "Výsledky", "Jak pracujeme", "Integrace", "Tým", "Kalkulačka", "Kontakt"],
  },
  de: {
    hello: "Guten Tag.",
    heroWhat: "KI-Agenten, Automatisierungen und Integrationen — eingebaut in Ihre bestehenden Systeme und von uns betrieben. 120+ Projekte im Echtbetrieb, von der Rechnungsextraktion bis zu agentischen Schichten über Business Central.",
    heroNote: "Tschechisches Engineering-Team · 75 Personen · Lieferung in ganz Europa",
    chapters: ["Was wir bauen", "Wo es anfängt", "Was dabei herauskam", "Wie es läuft", "Wo es sich einfügt", "Wer es danach trägt", "Wer dahintersteht", "Ihr Zug"],
    asks: [
      "Sie haben einen Prozess, der mehr kostet als nötig. Drei Disziplinen decken ihn ab, und ein Team haftet für alle drei.",
      "Das meiste ist nichts Exotisches. Diese acht Routinen werden am häufigsten angefragt — finden Sie Ihre, und Sie wissen, wie das erste Projekt aussieht.",
      "Zahlen aus dem Echtbetrieb, anonymisiert. Die passende Referenz bringen wir zum Termin mit.",
      "Nichts läuft ein Jahr, bevor es sich rechnet. Jede Phase endet mit einer Entscheidung, und Sie können in jeder aufhören.",
      "Ihr Stack bleibt. Wir lesen, prüfen und schreiben dort, wo Ihre Leute bereits arbeiten — API, Datenbank, Dateien, notfalls über die Oberfläche.",
      "Das, was die meisten Anbieter weglassen: wer nach dem Go-live haftet und was passiert, wenn Sie gehen.",
      "Ein Dach, ein Vertrag und eine namentlich benannte Person, die abnimmt, wenn morgens um sieben etwas ausfällt.",
      "Zwei Wege, es selbst zu bemessen, und einer, einfach zu fragen.",
    ],
    stepLabel: "Phase",
    inOut: "Eingang → Ausgang",
    proofLabel: "Das Haus in drei Zahlen",
    systemsGo: "Gesamter Katalog →",
    casesGo: "Alle drei lesen →",
    solutionsGo: "Alle acht Routinen →",
    leadersEyebrow: "Führung",
    teamGo: "Das ganze Team →",
    opsGo: "Bedingungen und SLA →",
    processGo: "Die vier Phasen im Detail →",
    selfEyebrow: "Firma 2030 · Selbstcheck",
    selfTitle: "Wo steht Ihr Unternehmen auf dem Weg zum agentischen Betrieb?",
    selfSub: "Fünf Reifegrade und der eine praktische Schritt zur nächsten Stufe.",
    selfGo: "Stufe ermitteln →",
    roiGo: "Rechner öffnen →",
    startPress: "Enter drücken",
    bubbleSay: "Nennen Sie uns den Prozess, der Ihr Team bremst. Wir sagen Ihnen offen, ob sich Automatisierung lohnt.",
    hiringPill: "Wir stellen ein",
    hiringTitle: "Systeme bauen, die wirklich live gehen.",
    hiringSub: "Kein Proof-of-Concept-Friedhof. Sie liefern in den Betrieb und halten es am Laufen.",
    hiringGo: "Offene Stellen →",
    reachEyebrow: "Über Tschechien hinaus",
    reachTitle: "Ein europäischer Delivery-Partner.",
    reachSub: "US-Beratungen, Microsoft-Partner und Systemintegratoren nutzen uns als ihre Engineering-Bank in Europa.",
    reachGo: "US-Partnerschaft →",
    teamPhotoAlt: "Das EnterIT-Team bei der Arbeit",
    processPhotoAlt: "Ein Entwickler arbeitet an einem Kundensystem",
    artHint: "Hier kommt ein Foto",
    slots: [
      "Die Fläche: eine echte Maschine, echte Bedienung, der Beleg in der Hand",
      "Ein Bildschirm mitten in der Arbeit — die Extraktion läuft gegen das ERP",
      "Das Stand-up: drei Entwickler und der Flow am Whiteboard",
      "Serverraum oder Laptop auf dem Kundentisch — wo es wirklich läuft",
      "Porträt der Person, die um sieben Uhr morgens ans Telefon geht",
    ],
    rack: ["Was wir bauen", "Ergebnisse", "So arbeiten wir", "Integrationen", "Team", "Rechner", "Kontakt"],
  },
  pl: {
    hello: "Dzień dobry.",
    heroWhat: "Agenci AI, automatyzacje i integracje — wbudowane w systemy, których już używacie, i utrzymywane przez nas. 120+ projektów na produkcji, od ekstrakcji faktur po warstwy agentowe nad Business Central.",
    heroNote: "Czeski zespół inżynierski · 75 osób · dostarczamy w całej Europie",
    chapters: ["Co budujemy", "Gdzie się zaczyna", "Co z tego wyszło", "Jak to działa", "W co się wpina", "Kto to poniesie dalej", "Kto za tym stoi", "Twój ruch"],
    asks: [
      "Macie proces, który kosztuje więcej, niż powinien. Pokrywają go trzy dyscypliny, a odpowiada za nie jeden zespół.",
      "Większość to nic egzotycznego. O te osiem rutyn pytają nas najczęściej — znajdź swoją, a już wiesz, jak wygląda pierwszy projekt.",
      "Liczby z produkcji, zanonimizowane. Odpowiednią referencję przynosimy na spotkanie.",
      "Nic nie działa rok, zanim się zwróci. Każdy etap kończy się decyzją i na każdym możesz przerwać.",
      "Wasz stack zostaje. Czytamy, weryfikujemy i zapisujemy tam, gdzie wasi ludzie już pracują — API, baza, pliki, w razie potrzeby przez ekran.",
      "To, co większość dostawców pomija: kto odpowiada po wdrożeniu i co się stanie, gdy odejdziecie.",
      "Jeden dach, jedna umowa i imiennie wskazana osoba, która odbierze, gdy o siódmej rano coś padnie.",
      "Dwa sposoby, by zmierzyć to samodzielnie, i jeden, by po prostu zapytać.",
    ],
    stepLabel: "Etap",
    inOut: "wejście → wyjście",
    proofLabel: "Firma w trzech liczbach",
    systemsGo: "Cały katalog →",
    casesGo: "Przeczytaj wszystkie trzy →",
    solutionsGo: "Wszystkie osiem rutyn →",
    leadersEyebrow: "Kierownictwo",
    teamGo: "Poznaj cały zespół →",
    opsGo: "Warunki i SLA →",
    processGo: "Cztery etapy szczegółowo →",
    selfEyebrow: "Firma 2030 · samoocena",
    selfTitle: "Gdzie jest Twoja firma na drodze do operacji agentowych?",
    selfSub: "Pięć poziomów dojrzałości i jeden praktyczny krok na wyższy.",
    selfGo: "Sprawdź swój poziom →",
    roiGo: "Otwórz kalkulator →",
    startPress: "naciśnij enter",
    bubbleSay: "Powiedz nam, który proces spowalnia Twój zespół. Powiemy wprost, czy warto go automatyzować.",
    hiringPill: "Rekrutujemy",
    hiringTitle: "Buduj systemy, które naprawdę ruszają.",
    hiringSub: "Żadnego cmentarza proof-of-conceptów. Wdrażasz na produkcję i utrzymujesz.",
    hiringGo: "Otwarte role →",
    reachEyebrow: "Poza Czechami",
    reachTitle: "Europejski partner wdrożeniowy.",
    reachSub: "Amerykańskie konsultingi, partnerzy Microsoftu i integratorzy korzystają z nas jako zaplecza inżynierskiego w Europie.",
    reachGo: "Partnerstwo dla USA →",
    teamPhotoAlt: "Zespół EnterIT w pracy",
    processPhotoAlt: "Inżynier pracuje nad systemem klienta",
    artHint: "Tu wejdzie zdjęcie",
    slots: [
      "Hala: prawdziwa maszyna, prawdziwa obsługa, dokument w ręku",
      "Ekran w trakcie pracy — ekstrakcja działa przeciwko ERP",
      "Stand-up: trzech inżynierów i przepływ na tablicy",
      "Serwerownia albo laptop na biurku klienta — gdzie to naprawdę działa",
      "Portret osoby, która odbiera telefon o siódmej rano",
    ],
    rack: ["Co budujemy", "Wyniki", "Jak pracujemy", "Integracje", "Zespół", "Kalkulator", "Kontakt"],
  },
};

const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

const mascots = {
  wave: "/assets/decor/mascot-wave.svg",
  blue: "/assets/decor/mascot-blue.svg",
  red: "/assets/decor/mascot-red.svg",
};

/**
 * One pressable key.
 *
 * `title` is the load-bearing element — it runs large across the cap and should
 * carry the point without the support beneath it. `sub` explains, `stat` leads
 * with a figure instead of a sentence, `photo` turns the cap into an image and
 * `mascot` lets the avatar lean into a corner.
 *
 * `tone` picks the cap face: `accent` and `tint` follow the chapter's own
 * colour, so a chapter reads as one family and the whole board still rotates.
 */
function key({
  span, rows, tone = "white", legend, eyebrow, title, size, sub, meta, stat, statLabel,
  bullets, flow, go, href, photo, alt, mascot, pill, mark = true, tag, quiet,
}) {
  const style = `grid-column:span ${span}${rows ? `;grid-row:span ${rows}` : ""}`;
  const sizeClass = size === "xl" ? " key-title--xl" : size === "big" ? " key-title--big" : size === "sm" ? " key-title--sm" : "";
  /* A figure that is a phrase rather than a number cannot run at stat size
     without wrapping into a wall, so it steps down a notch. */
  const statClass = stat && stat.length > 9 ? " key-stat--sm" : "";
  const Tag = href ? "a" : "div";
  return `      <${Tag} class="key key--${tone}${photo ? " key--photo" : ""}${quiet ? " key--quiet" : ""}"${href ? ` href="${href}"` : ""} style="${style}">
        ${photo ? `<img class="key-bg" src="${photo}" alt="${e(alt || "")}" loading="lazy">` : ""}
        ${mascot ? `<img class="key-mascot" src="${mascots[mascot]}" alt="" loading="lazy">` : ""}
        ${mark ? `<img class="key-mark" src="/assets/enter_symbol_color.svg" alt="">` : ""}
        ${href ? `<span class="key-arrow">${chevron}</span>` : ""}
        ${legend ? `<span class="key-legend">${legend}</span>` : ""}
        ${pill ? `<span class="key-pill">${searchIcon}${e(pill)}</span>` : ""}
        ${eyebrow ? `<span class="key-eyebrow">${e(eyebrow)}</span>` : ""}
        ${tag ? `<span class="key-tag">${e(tag)}</span>` : ""}
        ${stat ? `<span class="key-stat${statClass}">${e(stat)}${statLabel ? `<small>${e(statLabel)}</small>` : ""}</span>` : ""}
        ${title ? `<span class="key-title${sizeClass}">${e(title)}</span>` : ""}
        ${sub ? `<span class="key-sub">${e(sub)}</span>` : ""}
        ${flow ? `<span class="key-flow"><b>${e(flow[0])}</b><i>→</i><b>${e(flow[1])}</b></span>` : ""}
        ${bullets ? `<ul class="key-list">${bullets.map((b) => `<li>${e(b)}</li>`).join("")}</ul>` : ""}
        ${meta ? `<span class="key-meta">${e(meta)}</span>` : ""}
        ${go ? `<span class="key-go">${e(go)}</span>` : ""}
      </${Tag}>`;
}

/**
 * A reserved place for artwork we do not have yet. It is deliberately visible
 * rather than an empty cap: the brief for the photograph is printed on the tile
 * it will fill, so the shot list and the layout never drift apart.
 */
function slot({ span, rows, hint, brief }) {
  return `      <div class="key key--slot" style="grid-column:span ${span}${rows ? `;grid-row:span ${rows}` : ""}">
        <img class="slot-mascot" src="${mascots.blue}" alt="" loading="lazy">
        <span class="slot-hint">${e(hint)}</span>
        <span class="slot-brief">${e(brief)}</span>
      </div>`;
}

/** A chapter: number, one-line ask, title, and the keys that answer it. */
function chapter({ id, no, hue, kicker, title, ask, keys }) {
  return `  <section class="chap" id="${id}" data-hue="${hue}">
    <div class="chap-head">
      <span class="chap-no">${no}</span>
      <div>
        <span class="chap-kicker">${e(kicker)}</span>
        <h2>${e(title)}</h2>
        ${ask ? `<p>${e(ask)}</p>` : ""}
      </div>
    </div>
    <div class="keys">
${keys.filter(Boolean).join("\n")}
    </div>
  </section>`;
}

function render(code) {
  const page = locales[code];
  const c = restorationContent[code];
  const t = chrome[code];
  const prefix = page.prefix;
  const at = (f) => `/${prefix}${f}`;

  const langs = order
    .map((x) => `<a class="${x === code ? "on" : ""}" href="${x === "en" ? "/beta2/" : `/beta2/${file[x]}`}">${label[x]}</a>`)
    .join("");
  const rackIds = ["#build", "#results", "#process", "#integrations", "#team", "#start", "#start"];
  const rack = t.rack
    .map((l, i) => `      <a class="rack-key" href="${rackIds[i]}">${e(l)}</a>`)
    .join("\n");

  /* ---- 01 · what we build --------------------------------------------- */
  const disciplineTones = ["turquoise", "navy", "white"];
  const build = chapter({
    id: "build", no: "01", hue: 0,
    kicker: page.services.kicker, title: page.services.title, ask: t.asks[0],
    keys: [
      ...page.services.cards.map((card, i) =>
        key({
          span: 4, tone: disciplineTones[i], legend: ["E", "A", "C"][i],
          title: card.title, size: "big", sub: card.text, bullets: card.bullets,
          mascot: i === 1 ? "wave" : undefined,
          go: card.link, href: at(card.href),
        })),
      key({
        span: 8, tone: "grad", legend: "U", eyebrow: t.reachEyebrow,
        title: t.reachTitle, size: "big", sub: t.reachSub, go: t.reachGo, href: "/us/",
      }),
      slot({ span: 4, hint: t.artHint, brief: t.slots[3] }),
    ],
  });

  /* ---- 02 · where it starts ------------------------------------------- */
  const solutions = chapter({
    id: "solutions", no: "02", hue: 1,
    kicker: c.solutions.kicker, title: c.solutions.title, ask: t.asks[1],
    keys: [
      ...c.solutions.cards.map((card, i) =>
        key({
          span: 3, tone: i % 6 === 0 ? "turquoise" : "white",
          title: card.title, size: "sm", sub: card.description,
          flow: [card.input, card.output], meta: card.proof,
          href: `/${card.href}`, mark: false,
        })),
      key({
        span: 12, tone: "navy", legend: "?", title: c.solutions.cta, size: "big",
        mascot: "red", go: t.solutionsGo, href: "#start",
      }),
    ],
  });

  /* ---- 03 · what came out ---------------------------------------------
     The two the reader is most likely to recognise themselves in lead at half
     the board's width; four more follow at a quarter each. Every figure is the
     one published in the case study — nothing is rounded up here. */
  const cs = caseStudies[code];
  const pick = (id) => cs.cards.find((x) => x.id === id);
  const [lead, second, ...rest] = boardOrder.map(pick);
  const smallTones = ["white", "white", "white", "white"];

  const results = chapter({
    id: "results", no: "03", hue: 2,
    kicker: cs.kicker, title: cs.title, ask: cs.intro,
    keys: [
      key({
        span: 6, tone: "turquoise", legend: "1", eyebrow: lead.client,
        title: lead.title, size: "big", sub: lead.impact,
        meta: `${lead.industry} · ${lead.tech.join(" · ")} · ${cs.byLabel[lead.by]}`,
        href: "#start",
      }),
      key({
        span: 6, tone: "navy", legend: "2", eyebrow: second.client,
        stat: second.metric, statLabel: second.metricLabel,
        sub: second.impact,
        meta: `${second.industry} · ${second.tech.join(" · ")} · ${cs.byLabel[second.by]}`,
        mascot: "blue", href: "#start",
      }),
      ...rest.map((card, i) =>
        key({
          span: 3, tone: smallTones[i], legend: String(i + 3),
          eyebrow: card.client, stat: card.metric, statLabel: card.metricLabel,
          title: card.title, size: "sm",
          meta: `${card.industry} · ${cs.byLabel[card.by]}`,
          href: "#start", mark: false,
        })),
      /* The house numbers sit on the team at work — the photograph runs quiet
         under a heavy scrim, there to prove the place is alive rather than to
         be looked at. */
      key({
        span: 7, tone: "navy", legend: "N", eyebrow: t.proofLabel,
        title: page.proof.map(([v, l]) => `${v} ${l}`).join(" · "),
        size: "big", sub: page.results.note,
        go: t.teamGo, href: at("tym.html"),
        photo: "/assets/decor/firmy.webp", alt: t.teamPhotoAlt, quiet: true,
      }),
      slot({ span: 5, hint: t.artHint, brief: t.slots[0] }),
    ],
  });

  /* ---- 04 · how it runs ------------------------------------------------ */
  const process = chapter({
    id: "process", no: "04", hue: 3,
    kicker: page.process.kicker, title: page.process.title, ask: t.asks[3],
    keys: [
      ...page.process.steps.map(([title, text], i) =>
        key({
          span: 3, tone: i === 3 ? "turquoise" : "white", legend: String(i + 1),
          eyebrow: `${t.stepLabel} ${i + 1}`, title, size: "sm", sub: text,
          meta: c.processTimings[i], mark: false,
        })),
      key({
        span: 7, tone: "navy", legend: "P", eyebrow: c.implementation.kicker,
        title: c.implementation.title, size: "big", sub: c.implementation.intro,
        meta: c.implementation.flowLabel,
        go: t.processGo, href: at("jak-stavime-automatizace.html"),
        photo: "/assets/decor/guy.webp", alt: t.processPhotoAlt,
      }),
      slot({ span: 5, hint: t.artHint, brief: t.slots[1] }),
    ],
  });

  /* ---- 05 · what it plugs into ---------------------------------------- */
  const integrations = chapter({
    id: "integrations", no: "05", hue: 4,
    kicker: page.integrations.kicker, title: page.integrations.title, ask: t.asks[4],
    keys: [
      ...page.integrations.groups.map(([name, items], i) =>
        key({
          span: 4, tone: i === 1 ? "turquoise" : "white", legend: ["E", "C", "D"][i],
          eyebrow: name, title: items.join(" · "), size: "sm",
          mark: false,
        })),
      key({
        span: 5, tone: "navy", legend: "I", eyebrow: c.integrations.catalogLabel,
        title: c.integrations.proof, size: "big", mascot: "blue",
        go: t.systemsGo, href: at("integrace.html"),
      }),
      key({
        span: 7, tone: "white", legend: "S", eyebrow: page.integrations.kicker,
        title: page.integrations.intro, size: "sm",
        bullets: page.integrations.points, mascot: "wave", mark: false,
      }),
    ],
  });

  /* ---- 06 · who carries it after -------------------------------------- */
  const operations = chapter({
    id: "operations", no: "06", hue: 5,
    kicker: c.operations.kicker, title: c.operations.title, ask: t.asks[5],
    keys: [
      ...c.operations.cards.map((card, i) =>
        key({
          span: 4, tone: i === 0 ? "turquoise" : i === 1 ? "white" : "soft",
          legend: ["S", "O", "G"][i], eyebrow: card.tag,
          title: card.title, sub: card.text, meta: card.meta,
          go: i === 2 ? t.opsGo : undefined, href: i === 2 ? at("podminky.html") : "#start",
        })),
    ],
  });

  /* ---- 07 · who is behind it ------------------------------------------ */
  const team = chapter({
    id: "team", no: "07", hue: 0,
    kicker: page.team.kicker, title: page.team.title, ask: t.asks[6],
    keys: [
      key({
        span: 7, tone: "navy", legend: "T", eyebrow: page.team.kicker,
        title: page.team.stats.map(([v, l]) => `${v} ${l}`).join(" · "),
        size: "big", sub: page.team.intro,
        go: t.teamGo, href: at("tym.html"),
        photo: "/assets/decor/firmy.webp", alt: t.teamPhotoAlt,
      }),
      key({
        span: 5, tone: "turquoise", legend: "L", eyebrow: t.leadersEyebrow,
        title: page.team.leadershipTitle, size: "sm", sub: page.team.leadershipIntro,
        bullets: page.team.leaders.map((l) => `${l.name} — ${l.role}`),
        go: t.teamGo, href: at("tym.html"), mascot: "red",
      }),
      ...page.team.leaders.map((l, i) =>
        key({
          span: 3, tone: "navy", photo: l.image, alt: l.name,
          eyebrow: l.role, title: l.name, size: "sm", sub: l.text,
          href: at("tym.html"), mark: false,
        })),
      key({
        span: 3, tone: "photo-hire", legend: "H", photo: "/assets/team/studio-1.jpg",
        pill: t.hiringPill, title: t.hiringTitle, size: "sm", sub: t.hiringSub,
        go: t.hiringGo, href: at("tym.html"), mark: false,
      }),
      slot({ span: 12, hint: t.artHint, brief: t.slots[2] }),
    ],
  });

  /* ---- 08 · your move -------------------------------------------------- */
  const start = `  <section class="chap" id="start" data-hue="1">
    <div class="chap-head">
      <span class="chap-no">08</span>
      <div>
        <span class="chap-kicker">${e(page.contact.kicker)}</span>
        <h2>${e(page.contact.title)}</h2>
        <p>${e(t.asks[7])}</p>
      </div>
    </div>
    <div class="keys">
${key({ span: 4, tone: "white", legend: "R", eyebrow: c.calculator.kicker,
        title: c.calculator.title, size: "sm", sub: c.calculator.intro,
        go: t.roiGo, href: at("kalkulacka.html") })}
${key({ span: 4, tone: "turquoise", legend: "F", eyebrow: t.selfEyebrow,
        title: t.selfTitle, size: "sm", sub: t.selfSub, mascot: "blue",
        go: t.selfGo, href: at("firma-2030.html") })}
${slot({ span: 4, hint: t.artHint, brief: t.slots[4] })}
      <a class="key key--bubble" href="${bookingUrl}" target="_blank" rel="noopener" style="grid-column:span 8">
        <span class="key-legend">⏎</span>
        <span class="key-eyebrow">${e(page.contact.kicker)}</span>
        <span class="key-title key-title--big">${e(t.bubbleSay)}</span>
        <span class="bubble-by">
          <img src="${mascots.wave}" alt="">
          <span><b>${e(t.startPress)}</b><span>milo@enterit.cz · +420 608 969 263</span></span>
        </span>
      </a>
      <div class="rack" style="grid-column:span 4">
${rack}
      </div>
    </div>
  </section>`;

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
    <div class="hero-say">
      <h1>${e(t.hello)} ${e(page.hero.title)} ${e(page.hero.highlight)}</h1>
      <p>${e(t.heroWhat)}</p>
      <span class="hero-note">${e(t.heroNote)}</span>
    </div>
    <div class="hero-side">
      <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI">
      <span class="hero-ms">
        <span class="sq"><i></i><i></i><i></i><i></i></span>
        <span><b>Microsoft</b><span>Solutions Partner</span></span>
      </span>
    </div>
  </div>

${build}

${solutions}

${results}

${process}

${integrations}

${operations}

${team}

${start}

</main>

<footer class="site-foot">
  <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652</span>
  <span><a href="${at("gdpr.html")}">${e(page.footer.privacy)}</a> · <a href="${at("podminky.html")}">${e(page.footer.terms)}</a> · <a href="/beta/">beta 1</a></span>
</footer>


<script>
/* Colour is assigned per chapter, not per key, so a chapter reads as one family
   and neighbouring caps never fight. The whole set of chapter accents is then
   offset one step on each visit, which keeps the board alive without ever
   letting an accent take over a page it was not given. Turquoise leads the
   list, so it keeps the largest share of the board. */
(function(){
  var PALETTE = ["turquoise","blue","violet","pink","yellow","red"];
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

for (const code of order) {
  writeFileSync(resolve(root, "beta2", file[code]), render(code), "utf8");
  console.log(`beta2/${file[code]}  (${code})`);
}
console.log("Beta2 board built.");
