/**
 * beta2-ui.mjs — the chrome every beta2 subpage wears, in four languages.
 *
 * Navigation, the way back, the footer, and the handful of labels that recur on
 * every page. Page content lives with its own builder; this is only the frame,
 * so a new subpage inherits a working header and footer in all four languages
 * without touching anything.
 *
 * `needsLabel` is here too, because the marker for a fact we do not have must
 * be legible to whoever is reading that language — an unverified claim stays
 * unverified in translation.
 */
export const ui = {
  en: {
    back: "Back to the overview",
    navLabel: "Sections",
    nav: {
      build: "What we build", work: "Results", how: "How we work",
      team: "Team", engagement: "Engagement", integrations: "Integrations",
    },
    bookShort: "Book a call",
    footClaim: "Enterprise AI and software engineering, built for production.",
    privacy: "Privacy",
    terms: "Terms",
    footAsk: "Got a question?",
    footBook: "Book 30 minutes",
    footGroup: "Enter Group",
    overview: "Overview",
    czechia: "Czechia",
    needsLabel: "Needs data",
    readTime: (n) => `About a ${n}-minute read`,
  },
  cs: {
    back: "Zpět na přehled",
    navLabel: "Sekce",
    nav: {
      build: "Co stavíme", work: "Výsledky", how: "Jak pracujeme",
      team: "Tým", engagement: "Spolupráce", integrations: "Integrace",
    },
    bookShort: "Rezervovat hovor",
    footClaim: "Podnikové AI a software od návrhu po provoz.",
    privacy: "Ochrana osobních údajů",
    terms: "Obchodní podmínky",
    footAsk: "Máte dotaz?",
    footBook: "Rezervovat 30 minut",
    footGroup: "Enter Group",
    overview: "Přehled",
    czechia: "Česko",
    needsLabel: "Chybí data",
    readTime: (n) => `Čtení na ${n} minut`,
  },
  de: {
    back: "Zurück zur Übersicht",
    navLabel: "Abschnitte",
    nav: {
      build: "Was wir bauen", work: "Ergebnisse", how: "So arbeiten wir",
      team: "Team", engagement: "Zusammenarbeit", integrations: "Integrationen",
    },
    bookShort: "Termin buchen",
    footClaim: "Enterprise-Software und KI — von der Architektur bis zum Betrieb.",
    privacy: "Datenschutz",
    terms: "AGB",
    footAsk: "Eine Frage?",
    footBook: "30 Minuten buchen",
    footGroup: "Enter Group",
    overview: "Übersicht",
    czechia: "Tschechien",
    needsLabel: "Daten fehlen",
    readTime: (n) => `Lesezeit ${n} Minuten`,
  },
  pl: {
    back: "Wróć do przeglądu",
    navLabel: "Sekcje",
    nav: {
      build: "Co budujemy", work: "Wyniki", how: "Jak pracujemy",
      team: "Zespół", engagement: "Współpraca", integrations: "Integracje",
    },
    bookShort: "Zarezerwuj rozmowę",
    footClaim: "Oprogramowanie enterprise i AI — od architektury po utrzymanie.",
    privacy: "Prywatność",
    terms: "Regulamin",
    footAsk: "Masz pytanie?",
    footBook: "Zarezerwuj 30 minut",
    footGroup: "Enter Group",
    overview: "Przegląd",
    czechia: "Czechy",
    needsLabel: "Brak danych",
    readTime: (n) => `Czytanie ${n} minut`,
  },
};
