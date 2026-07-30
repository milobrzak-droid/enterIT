/**
 * build-beta2.mjs — renders the keycap board, one per language.
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
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { writeAgents } from "./build-beta2-agents.mjs";
import { writeAutomation } from "./build-beta2-automation.mjs";
import { writeRoutines } from "./build-beta2-routines.mjs";
import { writeCases } from "./build-beta2-cases.mjs";
import { writeEngagement } from "./build-beta2-engage.mjs";
import { writeTeamAndIntegrations } from "./build-beta2-team.mjs";
import { voice } from "./beta2-copy.mjs";
import { LANG_ARIA, LOCALES, OG_IMAGE, OG_LOCALE, ROOT_LOCALE, SITE, SKIP, asset, boardHref, sub } from "./beta2-page.mjs";
import { routinesByLocale } from "./beta2-routines.mjs";
import { boardOrder, caseStudies } from "./case-studies-content.mjs";
import { bookingUrl, locales } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";
import { escapeHtml } from "./site-shell.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const e = (v) => escapeHtml(v ?? "");

/* All four locales run the keycap board. The English one carries more keys —
   five disciplines instead of three, plus the engagement and boundary keys from
   the US copy deck — but it is the same board, pressed the same way. The
   fourteen-section document that briefly replaced it was the wrong shape: this
   is a keyboard you press, not a page you read. */
const order = ["en", "cs", "de", "pl"];
/* Czech is the root locale, so it writes index.html at the top of the site and
   the other three get a folder each. */
const LOGO_DIMS = { isotra: [332, 86], gentec: [373, 118], brgroup: [731, 133],
  rsm: [1183, 497], proact: [1221, 229], autoklastr: [330, 90], bigboard: [321, 65] };
const outFile = (code) => (code === ROOT_LOCALE ? "index.html" : `${code}/index.html`);
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

const euStars =
  '<svg class="eu-stars" viewBox="0 0 120 120" fill="currentColor" aria-hidden="true"><polygon points="60.00,10.60 61.66,15.71 67.04,15.71 62.69,18.87 64.35,23.99 60.00,20.83 55.65,23.99 57.31,18.87 52.96,15.71 58.34,15.71"/><polygon points="81.00,16.23 82.66,21.34 88.04,21.34 83.69,24.50 85.35,29.61 81.00,26.45 76.65,29.61 78.31,24.50 73.96,21.34 79.34,21.34"/><polygon points="96.37,31.60 98.03,36.71 103.41,36.71 99.06,39.87 100.72,44.99 96.37,41.83 92.02,44.99 93.68,39.87 89.34,36.71 94.71,36.71"/><polygon points="102.00,52.60 103.66,57.71 109.04,57.71 104.69,60.87 106.35,65.99 102.00,62.83 97.65,65.99 99.31,60.87 94.96,57.71 100.34,57.71"/><polygon points="96.37,73.60 98.03,78.71 103.41,78.71 99.06,81.87 100.72,86.99 96.37,83.83 92.02,86.99 93.68,81.87 89.34,78.71 94.71,78.71"/><polygon points="81.00,88.97 82.66,94.09 88.04,94.09 83.69,97.25 85.35,102.36 81.00,99.20 76.65,102.36 78.31,97.25 73.96,94.09 79.34,94.09"/><polygon points="60.00,94.60 61.66,99.71 67.04,99.71 62.69,102.87 64.35,107.99 60.00,104.83 55.65,107.99 57.31,102.87 52.96,99.71 58.34,99.71"/><polygon points="39.00,88.97 40.66,94.09 46.04,94.09 41.69,97.25 43.35,102.36 39.00,99.20 34.65,102.36 36.31,97.25 31.96,94.09 37.34,94.09"/><polygon points="23.63,73.60 25.29,78.71 30.66,78.71 26.32,81.87 27.98,86.99 23.63,83.83 19.28,86.99 20.94,81.87 16.59,78.71 21.97,78.71"/><polygon points="18.00,52.60 19.66,57.71 25.04,57.71 20.69,60.87 22.35,65.99 18.00,62.83 13.65,65.99 15.31,60.87 10.96,57.71 16.34,57.71"/><polygon points="23.63,31.60 25.29,36.71 30.66,36.71 26.32,39.87 27.98,44.99 23.63,41.83 19.28,44.99 20.94,39.87 16.59,36.71 21.97,36.71"/><polygon points="39.00,16.23 40.66,21.34 46.04,21.34 41.69,24.50 43.35,29.61 39.00,26.45 34.65,29.61 36.31,24.50 31.96,21.34 37.34,21.34"/></svg>';

const searchIcon =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>';

const chevron =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M9 7h8v8"/></svg>';

/* Enty comes in two limb colours. The manual draws the limbs in Stabilní černá;
   on a navy cap black limbs simply disappear, and white is the sanctioned
   exception for a dark ground. The cap's own tone picks the variant, so nobody
   has to remember. */
const DARK_TONES = new Set(["navy", "soft", "photo-hire"]);
const mascotFile = (face, tone) => {
  const onDark = DARK_TONES.has(tone);
  if (face === "wave") return onDark ? "/assets/decor/mascot-wave.svg" : "/assets/decor/mascot-wave-ink.svg";
  return onDark ? `/assets/decor/mascot-${face}-light.svg` : `/assets/decor/mascot-${face}.svg`;
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
/**
 * The moving backdrop behind the hero.
 *
 * A real clip is better than four stills and this takes one the moment there is
 * one to take: put hero.webm and/or hero.mp4 in assets/decor and the build
 * switches to <video>, keeping the first still as the poster so the banner is
 * never empty while the file downloads. With no clip on disk it renders the
 * stills, which crossfade on an eight-second beat.
 *
 * The video is muted, inline and looping, because those three together are what
 * lets a browser autoplay it at all — a clip with sound would simply be blocked
 * and the hero would sit frozen on the poster.
 */
const HERO_STILLS = ["standup", "meeting", "screenwork", "accounting", "onsite", "keyboard"];
function heroFilm() {
  const clips = ["webm", "mp4"]
    .filter((ext) => existsSync(resolve(root, "assets/decor", `hero.${ext}`)));
  if (clips.length) {
    return `<video class="hero-film hero-film--clip" autoplay muted loop playsinline
      preload="metadata" poster="/assets/decor/${HERO_STILLS[0]}.webp" aria-hidden="true">
${clips.map((ext) => `      <source src="/assets/decor/hero.${ext}" type="video/${ext}">`).join("\n")}
    </video>`;
  }
  return `<div class="hero-film" aria-hidden="true">
${HERO_STILLS
  .map((f, i) => `      <img src="/assets/decor/${f}.webp" alt="" loading="eager"${i ? ' fetchpriority="low"' : ""}>`)
  .join("\n")}
    </div>`;
}

function key({
  span, rows, tone = "white", legend, eyebrow, title, size, sub, meta, stat, statLabel,
  bullets, flow, go, href, photo, alt, mascot, pill, mark = true, tag, quiet, wide, extra,
  tint,
}) {
  const style = `grid-column:span ${span}${rows ? `;grid-row:span ${rows}` : ""}`;
  const sizeClass = size === "xl" ? " key-title--xl" : size === "big" ? " key-title--big" : size === "sm" ? " key-title--sm" : "";
  /* A figure that is a phrase rather than a number cannot run at stat size
     without wrapping into a wall, so it steps down a notch. */
  const statClass = stat && stat.length > 9 ? " key-stat--sm" : "";
  const Tag = href ? "a" : "div";
  return `      <${Tag} class="key key--${tone}${photo ? " key--photo" : ""}${tint ? " key--tinted" : ""}${quiet ? " key--quiet" : ""}${wide ? " key--wide" : ""}"${href ? ` href="${href}"` : ""} style="${style}">
        ${photo ? `<img class="key-bg" src="${photo}" alt="${e(alt || "")}" loading="lazy">` : ""}
        ${tint ? `<img class="key-tint" src="${tint}" alt="" loading="lazy">` : ""}
        ${mascot ? `<img class="key-mascot" src="${mascotFile(mascot, tone)}" alt="" loading="lazy">` : ""}
        <img class="key-mark" src="/assets/enter_symbol_color.svg" alt="" width="200" height="200">
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
        ${extra || ""}
        ${go ? `<span class="key-go">${e(go)}</span>` : ""}
      </${Tag}>`;
}

/**
 * The document flow, running.
 *
 * Five nodes and four wires. The dashes march, a packet crosses each wire in
 * turn, and each node lights as the packet reaches it — so the picture ticks
 * along instead of sitting there. The approval node is deliberately the one
 * that holds: it lights and waits, because that is what actually happens.
 *
 * Same idea as the Loop2030 diagram — a track with marching dashes and a pulse
 * travelling it — narrowed to the one flow chapter 04 is about. All CSS: no
 * script, no canvas, and it stops dead under prefers-reduced-motion.
 */
function flowViz(t) {
  const nodes = t.flowNodes.map((n, i) => `        <span class="fv-node" style="--i:${i}">
          <i class="fv-led"></i>
          <b>${e(n[0])}</b>
          <small>${e(n[1])}</small>
        </span>`);
  const wires = [0, 1, 2, 3].map((i) => `        <span class="fv-wire" style="--i:${i}"><i class="fv-packet"></i></span>`);
  const row = nodes.reduce((acc, n, i) => acc.concat(i ? [wires[i - 1], n] : [n]), []).join("\n");
  return `      <div class="key key--white viz" style="grid-column:span 5">
        <span class="key-eyebrow">${e(t.vizLabel)}</span>
        <div class="flowviz">
          <div class="fv-row">
${row}
          </div>
          <p class="fv-foot">${e(t.vizFoot)}</p>
        </div>
      </div>`;
}

/**
 * A reserved place for artwork we do not have yet. It is deliberately visible
 * rather than an empty cap: the brief for the photograph is printed on the tile
 * it will fill, so the shot list and the layout never drift apart.
 */
function slot({ span, rows, hint, brief }) {
  return `      <div class="key key--slot" style="grid-column:span ${span}${rows ? `;grid-row:span ${rows}` : ""}">
        <img class="slot-mascot" src="/assets/decor/mascot-blue.svg" alt="" loading="lazy">
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
  const v = voice[code];
  /* The voice layer wins wherever it defines something; the board chrome keeps
     the rest. */
  const t = { ...chrome[code], ...v.labels };
  const ch = (i) => v.chapters[i];
  const prefix = page.prefix;
  const at = (f) => `/${prefix}${f}`;

  const langs = order
    .map((x) => `<a class="${x === code ? "on" : ""}" href="${boardHref(x)}">${label[x]}</a>`)
    .join("");
  const rackIds = ["#build", "#results", "#process", "#integrations", "#team", "#start", "#start"];
  const rack = t.rack
    .map((l, i) => `      <a class="rack-key" href="${rackIds[i]}">${e(l)}</a>`)
    .join("\n");

  /* ---- 01 · what we build --------------------------------------------- */
  /* Turquoise leads as the primary, then two of the manual's own accents.
     Two greens with a navy between them read as one colour interrupted. */
  const disciplineTones = ["turquoise", "violet", "red"];
  /* automation · agents · custom-built — each opens the page that explains it */
  const DISCIPLINE_HREF = [
    (c) => sub(c, "automation.html"),
    (c) => sub(c, "agents.html"),
    (c) => sub(c, "team.html"),
  ];
  const build = chapter({
    id: "build", no: "01", hue: 0,
    kicker: ch(0).kicker, title: ch(0).title, ask: ch(0).ask,
    keys: [
      ...page.services.cards.map((card, i) =>
        key({
          span: 4, tone: disciplineTones[i],
          title: v.disciplines[i].title, size: "big", sub: v.disciplines[i].text,
          bullets: v.disciplines[i].list || card.bullets,
          mascot: i === 1 ? "wave" : undefined,
          go: card.link,
          /* card.href already carries the locale prefix for de and pl —
             wrapping it in at() produced /de/de/... */
          href: DISCIPLINE_HREF[i](code),
        })),
      key({
        span: 8, tone: "navy", eyebrow: t.reachEyebrow,
        title: t.reachTitle, size: "big", sub: t.reachSub,
        bullets: t.reachList, extra: euStars,
        go: t.reachGo,
        href: sub(code, "engagement.html"),
      }),
      key({
        span: 4, tone: "navy", eyebrow: t.teamGo.replace(" →", ""),
        title: t.reachTitle, size: "sm",
        photo: "/assets/decor/meeting.webp", alt: t.teamPhotoAlt, quiet: true,
        href: sub(code, "team.html"),
      }),
    ],
  });

  /* Board order matches beta2-routines.mjs. */
  const routineSlugs = ["invoices", "orders", "warehouse", "attendance",
    "timesheets", "mileage", "complaints", "time-off"];

  /* ---- 02 · where it starts -------------------------------------------
     Eight equal peers, so this grid gets the whole palette rather than one
     chapter accent: every routine has its own colour, and no two that touch —
     across or down the 4x2 grid — carry the same one. */
  /* The eight cards and the eight routine pages are two lists in two different
     orders, and index i in one is not index i in the other — the board has been
     linking the attendance card to the invoices page. Both the destination and
     the photograph are keyed off this map, in card order.

     Each tile carries a photograph of its own work, sunk into the colour far
     enough to read as texture rather than as a picture. Five of the eight have
     a literal match; the rest take the nearest human scene we have. */
  const routineCards = [
    { routine: 3, tint: "screenwork" },  // attendance — hours pulled off a screen
    { routine: 1, tint: "onsite" },      // orders — a delivery note in someone's hand
    { routine: 6, tint: "support" },     // complaints — the person who answers
    { routine: 2, tint: "warehouse" },   // warehouse
    { routine: 7, tint: "meeting" },     // time off — people round a table
    { routine: 5, tint: "keyboard" },    // mileage
    { routine: 0, tint: "accounting" },  // invoices
    { routine: 4, tint: "fieldwork" },   // timesheets
  ];

  const routineTones = [
    "turquoise", "violet", "yellow", "blue",
    "red", "navy", "turquoise", "violet",
  ];
  const solutions = chapter({
    id: "solutions", no: "02", hue: 1,
    kicker: ch(1).kicker, title: ch(1).title, ask: ch(1).ask,
    keys: [
      ...c.solutions.cards.map((card, i) =>
        key({
          span: 3, tone: routineTones[i],
          tint: `/assets/decor/${routineCards[i].tint}.webp`,
          title: card.title, size: "sm", sub: card.description,
          flow: [card.input, card.output], meta: card.proof,
          href: sub(code, `routines/${routinesByLocale[code][routineCards[i].routine].slug}.html`),
        })),
      key({
        span: 12, tone: "navy", title: c.solutions.cta, size: "big",
        mascot: "red", go: t.solutionsGo, href: "#start",
      }),
    ],
  });

  /* The people whose portraits the live team page already carries. */
  const faces = [
    ["milo", "Milo Brzák"], ["klesnarova", "Michaela Klesnárová"],
    ["hanigovsky", "Ondřej Hanigovský"], ["nedvidek", "Honza Nedvídek"],
    ["gaspar-nagy", "Gašpar Nagy"], ["adam-nagy", "Adam Nagy"],
    ["studio-1", "Jiří Čechal"], ["studio-2", "Vítek Sasin"],
  ];
  const FACE_DIMS = { milo: 440, klesnarova: 440, hanigovsky: 600, nedvidek: 600,
    "gaspar-nagy": 600, "adam-nagy": 600, "studio-1": 600, "studio-2": 600 };
  const faceRow = faces
    .map(([f, n]) => `          <img src="/assets/team/${f}.jpg" alt="${e(n)}" title="${e(n)}" width="${FACE_DIMS[f]}" height="${FACE_DIMS[f]}" loading="lazy">`)
    .join("\n");

  /* Clients already shown publicly on enterai.cz. Anyone not on that page
     stays off this one. */
  const clientLogos = [
    ["isotra", "Isotra"], ["gentec", "Gentec"], ["brgroup", "BR Group"],
    ["rsm", "RSM"], ["proact", "ProAct"], ["autoklastr", "Autoklastr"],
    ["bigboard", "BigBoard"],
  ];
  const logoWall = `      <div class="key key--navy logos" style="grid-column:span 12">
        <span class="key-eyebrow">${e(t.clientsLabel)}</span>
        <div class="logo-wall">
${clientLogos.map(([f, n]) => { const d = LOGO_DIMS[f]; return `          <img src="/assets/logos/${f}-white.png" alt="${e(n)}" width="${d[0]}" height="${d[1]}" loading="lazy">`; }).join("\n")}
        </div>
      </div>`;

  /* ---- 03 · what came out ---------------------------------------------
     The two the reader is most likely to recognise themselves in lead at half
     the board's width; four more follow at a quarter each. Every figure is the
     one published in the case study — nothing is rounded up here. */
  const cs = caseStudies[code];
  const pick = (id) => cs.cards.find((x) => x.id === id);
  const [lead, second, ...rest] = boardOrder.map(pick);
  /* The four smaller cases take the rest of the palette rather than alternating
     white and one accent — the row is four equal peers and it should look it. */
  const smallTones = ["yellow", "blue", "red", "violet"];

  const results = chapter({
    id: "results", no: "03", hue: 2,
    kicker: ch(2).kicker, title: ch(2).title, ask: ch(2).ask,
    keys: [
      key({
        span: 6, tone: "turquoise", eyebrow: lead.client,
        title: lead.title, size: "big", sub: lead.impact,
        meta: `${lead.industry} · ${lead.tech.join(" · ")} · ${cs.byLabel[lead.by]}`,
        href: sub(code, "cases.html") + "#manufacturing",
      }),
      key({
        span: 6, tone: "navy", eyebrow: second.client,
        stat: second.metric, statLabel: second.metricLabel,
        sub: second.impact,
        meta: `${second.industry} · ${second.tech.join(" · ")} · ${cs.byLabel[second.by]}`,
        mascot: "blue", href: sub(code, "cases.html") + "#energy",
      }),
      ...rest.map((card, i) =>
        key({
          span: 3, tone: smallTones[i],
          eyebrow: card.client, stat: card.metric, statLabel: card.metricLabel,
          title: card.title, size: "sm",
          meta: `${card.industry} · ${cs.byLabel[card.by]}`,
          href: card.id === "jt-investing" ? sub(code, "cases.html") + "#investment" : "#start",
        })),
      /* The house numbers sit on the team at work — the photograph runs quiet
         under a heavy scrim, there to prove the place is alive rather than to
         be looked at. */
      key({
        span: 7, tone: "navy", eyebrow: t.proofLabel,
        title: page.proof.map(([v, l]) => `${v} ${l}`).join(" · "),
        size: "big", sub: page.results.note,
        go: t.teamGo, href: sub(code, "team.html"),
        photo: "/assets/decor/standup.webp", alt: t.teamPhotoAlt, quiet: true,
      }),
      /* Next to the room, the faces in it. An empty placeholder beside a
         photograph of a workshop was the one spot on the board that looked
         unfinished rather than reserved. */
      `      <a class="key key--white faces" href="${sub(code, "team.html")}" style="grid-column:span 5">
        <span class="key-eyebrow">${e(t.facesLabel)}</span>
        <div class="face-wall">
${faceRow}
        </div>
        <span class="key-go">${e(t.teamGo)}</span>
      </a>`,
      logoWall,
    ],
  });

  /* ---- 04 · how it runs ------------------------------------------------ */
  const process = chapter({
    id: "process", no: "04", hue: 3,
    kicker: ch(3).kicker, title: ch(3).title, ask: ch(3).ask,
    keys: [
      /* Each stage carries a four-segment track with its own segment filled, so
         the row reads as one sequence rather than as four separate claims:
         solid behind you, filled where you are, outlined ahead. */
      ...v.stages.map((step, i) =>
        key({
          span: 3, tone: ["turquoise", "blue", "violet", "yellow"][i],
          eyebrow: `${t.stepLabel} ${i + 1}`, title: step.title, size: "sm", sub: step.text,
          meta: step.time || c.processTimings[i],
          extra: `<span class="track">${[0, 1, 2, 3]
            .map((j) => `<i class="${j < i ? "done" : j === i ? "on" : ""}"></i>`)
            .join("")}</span>`,
        })),
      key({
        span: 7, tone: "navy", eyebrow: c.implementation.kicker,
        title: c.implementation.title, size: "big", sub: c.implementation.intro,
        meta: c.implementation.flowLabel,
        go: t.processGo, href: sub(code, "automation.html"),
        photo: "/assets/decor/guy.webp", alt: t.processPhotoAlt,
      }),
      flowViz(t),
    ],
  });

  /* ---- 05 · what it plugs into ---------------------------------------- */
  const integrations = chapter({
    id: "integrations", no: "05", hue: 4,
    kicker: ch(4).kicker, title: ch(4).title, ask: ch(4).ask,
    keys: [
      ...page.integrations.groups.map(([name, items], i) =>
        key({
          span: 4, tone: i === 1 ? "turquoise" : i === 2 ? "accent" : "white",
          eyebrow: name, title: items.join(" · "), size: "sm",
        })),
      key({
        span: 5, tone: "navy", eyebrow: c.integrations.catalogLabel,
        title: c.integrations.proof, size: "big", mascot: "blue",
        go: t.systemsGo, href: sub(code, "integrations.html"),
      }),
      key({
        span: 7, tone: "white", eyebrow: page.integrations.kicker,
        title: page.integrations.intro, size: "sm",
        bullets: page.integrations.points, mascot: "wave",
      }),
    ],
  });

  /* ---- 06 · who carries it after -------------------------------------- */
  const operations = chapter({
    id: "operations", no: "06", hue: 5,
    kicker: ch(5).kicker, title: ch(5).title, ask: ch(5).ask,
    keys: [
      ...c.operations.cards.map((card, i) =>
        key({
          span: 4, tone: i === 0 ? "turquoise" : i === 1 ? "white" : "accent", eyebrow: card.tag,
          title: v.ops[i].title, sub: v.ops[i].text, meta: card.meta,
          go: i === 2 ? t.opsGo : undefined,
          href: i === 2
            ? (sub(code, "engagement.html"))
            : "#start",
        })),
    ],
  });

  /* ---- 07 · who is behind it ------------------------------------------ */
  const team = chapter({
    id: "team", no: "07", hue: 0,
    kicker: ch(6).kicker, title: ch(6).title, ask: ch(6).ask,
    keys: [
      key({
        span: 7, tone: "navy", eyebrow: page.team.kicker,
        title: page.team.stats.map(([v, l]) => `${v} ${l}`).join(" · "),
        size: "big", sub: page.team.intro,
        go: t.teamGo, href: sub(code, "team.html"),
        photo: "/assets/decor/standup.webp", alt: t.teamPhotoAlt,
      }),
      key({
        span: 5, tone: "turquoise", eyebrow: t.leadersEyebrow,
        title: page.team.leadershipTitle, size: "sm", sub: page.team.leadershipIntro,
        bullets: page.team.leaders.map((l) => `${l.name} — ${l.role}`),
        go: t.teamGo, href: sub(code, "team.html"), mascot: "red",
      }),
      ...page.team.leaders.map((l, i) =>
        key({
          span: 3, tone: "navy", photo: l.image, alt: l.name,
          eyebrow: l.role, title: l.name, size: "sm", sub: l.text,
          href: sub(code, "team.html"),
        })),
      key({
        span: 3, tone: "photo-hire", photo: "/assets/team/studio-1.jpg",
        pill: t.hiringPill, title: t.hiringTitle, size: "sm", sub: t.hiringSub,
        go: t.hiringGo, href: sub(code, "team.html"),
      }),
      /* The stand-up. A panorama, which is what a full-width cap wants — and the
         one picture that shows how a decision gets made here rather than what
         the office looks like. */
      key({
        span: 12, tone: "navy", eyebrow: t.standupEyebrow,
        title: t.standupTitle, size: "big", sub: t.standupSub,
        photo: "/assets/decor/standup.webp", alt: t.standupAlt, wide: true,
        go: t.processGo,
        href: sub(code, "automation.html"),
      }),
    ],
  });

  /* ---- 08 · your move -------------------------------------------------- */
  const start = `  <section class="chap" id="start" data-hue="1">
    <div class="chap-head">
      <span class="chap-no">08</span>
      <div>
        <span class="chap-kicker">${e(ch(7).kicker)}</span>
        <h2>${e(ch(7).title)}</h2>
        <p>${e(ch(7).ask)}</p>
      </div>
    </div>
    <div class="keys">
${key({ span: 4, tone: "white", eyebrow: c.calculator.kicker,
        title: c.calculator.title, size: "sm", sub: c.calculator.intro,
        go: t.roiGo, href: sub(code, "calculator.html") })}
${key({ span: 4, tone: "turquoise", eyebrow: t.selfEyebrow,
        title: t.selfTitle, size: "sm", sub: t.selfSub, mascot: "blue",
        go: t.selfGo, href: sub(code, "company-2030.html") })}
${key({ span: 4, tone: "navy", eyebrow: t.supportEyebrow,
        title: t.supportTitle, size: "sm", sub: t.supportSub,
        /* The subject sits in the right half of the frame and the text in the
           left, so this portrait takes the sideways scrim rather than the
           top-down one. */
        photo: "/assets/decor/support.webp", alt: t.supportAlt, wide: true,
        go: t.opsGo, href: sub(code, "engagement.html") })}
      <a class="key key--bubble" href="${bookingUrl}" target="_blank" rel="noopener" style="grid-column:span 8">
        <span class="key-legend">⏎</span>
        <span class="key-eyebrow">${e(page.contact.kicker)}</span>
        <span class="key-title key-title--big">${e(t.bubbleSay)}</span>
        <span class="bubble-by">
          <img src="/assets/decor/mascot-wave-ink.svg" alt="">
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
<meta name="robots" content="index,follow">
<title>${e(page.title)}</title>
<meta name="description" content="${e(page.description)}">
<meta name="theme-color" content="#17202E">
<link rel="canonical" href="${SITE}${boardHref(code)}">
${LOCALES.map((x) => `<link rel="alternate" hreflang="${x}" href="${SITE}${boardHref(x)}">`).join("\n")}
<link rel="alternate" hreflang="x-default" href="${SITE}${boardHref(ROOT_LOCALE)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="EnterIT">
<meta property="og:locale" content="${OG_LOCALE[code]}">
<meta property="og:title" content="${e(page.title)}">
<meta property="og:description" content="${e(page.description)}">
<meta property="og:url" content="${SITE}${boardHref(code)}">
<meta property="og:image" content="${SITE}${asset(OG_IMAGE(code))}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<script type="application/ld+json">${JSON.stringify({
  "@context": "https://schema.org", "@type": "Organization",
  name: "EnterIT", legalName: "AI Enter s.r.o.", url: SITE + "/",
  logo: SITE + "/assets/enter_logo_black.svg",
  email: "milo@enterit.cz", telephone: "+420608969263",
  address: { "@type": "PostalAddress", streetAddress: "Zahradní 2004/46d",
    addressLocality: "Bruntál", postalCode: "792 01", addressCountry: "CZ" },
})}<\/script>
<link rel="preload" href="/assets/fonts/GreycliffCF-Heavy.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/assets/fonts/FiraMono-Medium.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="${asset("/assets/keys.css")}">
<script defer src="${asset("/assets/analytics.js")}"><\/script>
</head>
<body>

<a class="skip" href="#main">${e(SKIP[code])}</a>
<header class="site-head">
  <a href="${boardHref(code)}" aria-label="${e(page.homeLabel)}">
    <img src="/assets/enter_logo_black.svg" alt="EnterIT" width="62" height="26">
  </a>
  <nav class="head-nav" aria-label="${e(page.mainNavLabel)}">
    <a href="#build">${e(page.nav.services)}</a>
    <a href="#results">${e(page.nav.results)}</a>
    <a href="#process">${e(page.nav.process)}</a>
    <a href="#integrations">${e(page.nav.integrations)}</a>
    <a href="#team">${e(page.nav.team)}</a>
  </nav>
  <span class="lang" role="group" aria-label="${e(LANG_ARIA[code])}">${langs}</span>
</header>

<main class="board" id="main">

  <div class="hero-bar" data-hue="0">
    ${heroFilm()}
    <span class="hero-wash"></span>
    <div class="hero-say">
      ${v.hero.eyebrow ? `<span class="hero-eyebrow">${e(v.hero.eyebrow)}</span>` : ""}
      <h1>${e(v.hero.h1)}</h1>
      <p>${e(v.hero.lead)}</p>
      <div class="hero-cta-row">
        <a class="btn btn--go" href="#start">${e(v.hero.ctaPrimary)}</a>
        <a class="btn btn--onnavy" href="${sub(code, "engagement.html")}">${e(v.hero.ctaSecondary)}</a>
      </div>
      <span class="hero-note">${e(v.hero.note)}</span>
    </div>
    <div class="hero-side">
      <span class="hero-side-label">${e(t.partnersLabel)}</span>
      <div class="hero-marks">
        <img src="/assets/logos/tdsynnex-destination-ai.png" alt="TD SYNNEX Destination AI" width="1300" height="460">
        <span class="hero-ms">
          <span class="sq"><i></i><i></i><i></i><i></i></span>
          <span class="hero-ms-name"><b>Microsoft</b><small>Solutions Partner</small></span>
        </span>
        <img src="/assets/logos/rsm-white.png" alt="RSM" width="1183" height="497">
      </div>
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
  <div class="foot-grid">
    <div class="foot-col foot-col--who">
      <img class="foot-mark" src="/assets/enter_logo_black.svg" alt="EnterIT" width="52" height="22">
      <p>${e(v.hero.h1)}</p>
      <p class="foot-reg">
        AI Enter s.r.o.<br>
        IČO 19086652 · DIČ CZ19086652<br>
        Zahradní 2004/46d<br>
        792 01 Bruntál, Czechia
      </p>
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(t.footAsk)}</span>
      <a href="mailto:milo@enterit.cz">milo@enterit.cz</a>
      <a href="tel:+420608969263">+420 608 969 263</a>
      <a href="${bookingUrl}" target="_blank" rel="noopener">${e(t.footBook)}</a>
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(page.mainNavLabel)}</span>
      <a href="#build">${e(page.nav.services)}</a>
      <a href="#results">${e(page.nav.results)}</a>
      <a href="#process">${e(page.nav.process)}</a>
      <a href="#integrations">${e(page.nav.integrations)}</a>
      <a href="${sub(code, "team.html")}">${e(page.nav.team)}</a>
    </div>
    <div class="foot-col">
      <span class="foot-h">${e(t.footGroup)}</span>
      <a href="https://www.enterai.cz" target="_blank" rel="noopener">EnterAI</a>
      <a href="${sub(code, "team.html")}">Enter Tech</a>
      <a href="${sub(code, "team.html")}">Enter Agents</a>
      <a href="${sub(code, "team.html")}">Enter Studio</a>
    </div>
  </div>
  <div class="foot-line">
    <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652 · DIČ CZ19086652 · Zahradní 2004/46d, 792 01 Bruntál</span>
    <span><a href="/gdpr.html">${e(page.footer.privacy)}</a> · <a href="/podminky.html">${e(page.footer.terms)}</a></span>
  </div>
</footer>


<script>
/* Colour is assigned per chapter, not per key, so a chapter reads as one family
   and neighbouring caps never fight. The whole set of chapter accents is then
   offset one step on each visit, which keeps the board alive without ever
   letting an accent take over a page it was not given. Turquoise leads the
   list, so it keeps the largest share of the board. */
(function(){
  var PALETTE = ["turquoise","blue","violet","red","yellow"];
  var offset = Math.floor(Math.random() * PALETTE.length);
  document.querySelectorAll(".chap[data-hue], .hero-bar[data-hue]").forEach(function(chap){
    var slot = (parseInt(chap.dataset.hue, 10) + offset) % PALETTE.length;
    PALETTE.forEach(function(name){ chap.classList.remove("ch--" + name); });
    chap.classList.add("ch--" + PALETTE[slot]);
  });
  /* The banner wears one of the real photographs, chosen per visit. It is
     desaturated and washed in the accent, so the color still leads and the
     picture reads as texture rather than as a stock hero. */
  var SHOTS = ["/assets/decor/standup.webp", "/assets/decor/meeting.webp", "/assets/decor/screenwork.webp"];
  var bg = document.querySelector(".hero-bg");
  if (bg) bg.src = SHOTS[Math.floor(Math.random() * SHOTS.length)];
})();
<\/script>
</body>
</html>
`;
}

writeAgents();
writeAutomation();
writeRoutines();
writeTeamAndIntegrations();
writeEngagement();
writeCases();
for (const code of order) {
  const target = resolve(root, outFile(code));
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, render(code), "utf8");
  console.log(`${outFile(code)}  (${code})`);
}
console.log("Beta2 board built.");
