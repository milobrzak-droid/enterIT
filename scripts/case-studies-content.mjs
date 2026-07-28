/**
 * case-studies-content.mjs — the delivered work, named.
 *
 * This module is deliberately separate from `homepage-restoration-content.mjs`.
 * That one feeds the live site and beta1; this one feeds beta2 only, so the
 * production pages do not change until the new case set is approved.
 *
 * Two kinds of entry live here and they are not mixed:
 *
 *   by: "enter"  — delivered by EnterIT's own engineering teams. The client is
 *                  anonymised, as on the live site.
 *   by: "qube"   — delivered by Enter Agents (SuperQube). These are published
 *                  under the client's own name on superqube.ai, so they are
 *                  named here too, with the delivering team credited on the card.
 *
 * Every figure below is taken from the published case study. The one exception
 * is marked `unverified: true` — the Business Central data platform, whose
 * headline is a fact about what was built rather than a measured outcome,
 * because no measured outcome has been handed over yet.
 *
 * Card fields:
 *   client       who it was for — a name for qube cases, a sector for enter ones
 *   industry     one word, shown next to the client
 *   metric       the headline figure; it runs large and alone on the cap
 *   metricLabel  what the figure counts
 *   title        the one-line description of the thing that was built
 *   impact       what changed, in one or two sentences
 *   tech         the stack, shown small
 */

const byLabel = {
  en: { enter: "EnterIT · in-house delivery", qube: "Enter Agents · SuperQube" },
  cs: { enter: "EnterIT · vlastní dodávka", qube: "Enter Agents · SuperQube" },
  de: { enter: "EnterIT · eigene Lieferung", qube: "Enter Agents · SuperQube" },
  pl: { enter: "EnterIT · własna realizacja", qube: "Enter Agents · SuperQube" },
};

export const caseStudies = {
  en: {
    kicker: "Delivered work",
    title: "Systems that are running right now.",
    intro: "Each of these is live. The named ones were delivered by Enter Agents and are published with the client's consent; the anonymised ones come from our own enterprise teams and we bring the matching reference to the meeting.",
    allGo: "All case studies →",
    byLabel: byLabel.en,
    cards: [
      {
        id: "bc-data-platform", by: "enter", unverified: true,
        client: "Manufacturing group", industry: "Manufacturing · ~600 people",
        metric: "One data layer", metricLabel: "over Business Central, warehouse and DMS",
        title: "A data platform on top of Business Central.",
        impact: "Orders, documents, stock and production data stopped living in three places. One governed layer reads them, validates them against the ERP and writes back — so reporting, agents and everyday lookups all draw on the same verified numbers instead of three versions of them.",
        tech: ["Business Central", "Data platform", "Power BI", "Agent layer"],
      },
      {
        id: "energy-service-agent", by: "qube",
        client: "Lama Energy Group", industry: "Energy",
        metric: "+87%", metricLabel: "faster response to an incoming enquiry",
        title: "An agentic customer desk that never closes.",
        impact: "An agent handles the whole pre-contact phase across chat, e-mail and forms: it answers from the product database, qualifies the enquiry against set criteria and books the meeting in a human's calendar. Coverage went to 24/7 with no extra headcount, and qualified meetings rose 35%.",
        tech: ["Agents", "CRM", "Calendar API", "NLP"],
      },
      {
        id: "jt-investing", by: "qube",
        client: "J&T Investing", industry: "Finance",
        metric: "10×", metricLabel: "analyst team productivity",
        title: "Autonomous portfolio intelligence over 100+ companies.",
        impact: "A network of specialised agents watches thousands of sources around the clock, separates signal from noise and delivers a morning briefing. A research report that took weeks now takes three to five minutes, and nothing market-critical goes unnoticed.",
        tech: ["Agent network", "Vector DB", "LLM", "Data pipelines"],
      },
      {
        id: "orel-re", by: "qube",
        client: "OREL RE", industry: "Hospitality · real estate",
        metric: "85%", metricLabel: "faster project approvals",
        title: "Approvals and invoices, routed by agents.",
        impact: "Approvals went from three to four weeks down to three to five days, and invoice matching from eight to ten hours a week down to fifteen minutes. Leadership sees OPEX and CAPEX live instead of weeks after close.",
        tech: ["Agents", "OCR", "BI dashboards", "Multi-currency"],
      },
      {
        id: "ladeo", by: "qube",
        client: "Ladeo Lukavec", industry: "Waste management",
        metric: "30 min → 5 s", metricLabel: "to find a regulatory answer",
        title: "A regulatory expert the whole team can ask.",
        impact: "Hundreds of pages of regulation became a knowledge base anyone can question in plain language. Expertise stopped sitting with two senior people, and there has been no compliance incident since go-live.",
        tech: ["Knowledge base", "NLP", "Document ingest"],
      },
      {
        id: "stavbyday", by: "qube",
        client: "StavbyDay", industry: "Construction",
        metric: "80%", metricLabel: "less administrative work",
        title: "From paper and Excel to one source of truth.",
        impact: "Sixty hours a week of retyping between systems became a single database with automated workflows. The business grew 40% without adding an administrator, and data-entry errors fell by 93%.",
        tech: ["Custom database", "Process automation", "API integrations"],
      },
      {
        id: "eurepol", by: "qube",
        client: "EUREPOL", industry: "Agriculture",
        metric: "73%", metricLabel: "less time spent looking for information",
        title: "A virtual executive team for a farm run remotely.",
        impact: "Maintenance scheduling, compliance documents and daily lookups are handled by a set of connected agents. The owner runs the operation from anywhere, and no machine has failed for a missed service.",
        tech: ["Agent ecosystem", "Document understanding", "Predictive maintenance"],
      },
      {
        id: "social-media", by: "qube",
        client: "Boutique marketing agency", industry: "Marketing",
        metric: "3×", metricLabel: "clients served by the same team",
        title: "An AI social media manager behind the strategists.",
        impact: "Comment monitoring, sentiment analysis and weekly reporting moved to an agent, so senior strategists went back to creative work. Analysis time fell 67% and engagement rose 41%.",
        tech: ["Agents", "Sentiment analysis", "Reporting"],
      },
      {
        id: "slevomat", by: "qube",
        client: "Slevomat", industry: "E-commerce · enablement",
        metric: "90%", metricLabel: "of trained managers now use AI daily",
        title: "An AI ambassador programme, not another training course.",
        impact: "A three-month programme across strategy, tooling and change management left the organisation self-sufficient: full coverage of AI expertise in every team and five working prototypes deployed.",
        tech: ["Enablement", "Prototyping", "Change management"],
      },
      {
        id: "metals-trading", by: "enter",
        client: "Metals trading", industry: "Trade · 82 people",
        metric: "3 months", metricLabel: "payback",
        title: "Routine operational steps handed to Copilot and n8n.",
        impact: "Selected routine steps run on their own and hand the exceptions to people. Roughly 1,420 hours and CZK 710k saved each year.",
        tech: ["Copilot", "n8n"],
      },
      {
        id: "construction-group", by: "enter",
        client: "Construction group", industry: "Construction",
        metric: "180 h / month", metricLabel: "returned to the team",
        title: "An internal application with APIs and Power BI.",
        impact: "Retyping and scattered data gave way to one shared view of every contract, returning roughly 180 hours a month.",
        tech: ["Application", "API", "Power BI"],
      },
    ],
  },

  cs: {
    kicker: "Dodaná práce",
    title: "Systémy, které běží právě teď.",
    intro: "Každý z nich je v ostrém provozu. Jmenovité případovky dodal tým Enter Agents a jsou zveřejněné se souhlasem klienta; anonymizované pocházejí z našich enterprise týmů a odpovídající referenci doložíme na schůzce.",
    allGo: "Všechny případovky →",
    byLabel: byLabel.cs,
    cards: [
      {
        id: "bc-data-platform", by: "enter", unverified: true,
        client: "Výrobní skupina", industry: "Výroba · ~600 lidí",
        metric: "Jedna datová vrstva", metricLabel: "nad Business Central, skladem a DMS",
        title: "Datová platforma nad Business Central.",
        impact: "Objednávky, doklady, sklad a výrobní data přestala žít na třech místech. Jedna řízená vrstva je čte, ověřuje proti ERP a zapisuje zpět — reporting, agenti i běžné dohledávání tak pracují se stejnými ověřenými čísly, ne se třemi verzemi.",
        tech: ["Business Central", "Datová platforma", "Power BI", "Agentní vrstva"],
      },
      {
        id: "energy-service-agent", by: "qube",
        client: "Lama Energy Group", industry: "Energetika",
        metric: "+87 %", metricLabel: "rychlejší reakce na příchozí poptávku",
        title: "Agentní zákaznická péče, která nikdy nezavírá.",
        impact: "Agent obslouží celou fázi před kontaktem — chat, e-mail i formuláře. Odpovídá z produktové databáze, kvalifikuje poptávku podle nastavených kritérií a rezervuje schůzku do kalendáře konkrétního člověka. Pokrytí je nepřetržité bez posílení týmu a kvalifikovaných schůzek přibylo 35 %.",
        tech: ["Agenti", "CRM", "Calendar API", "NLP"],
      },
      {
        id: "jt-investing", by: "qube",
        client: "J&T Investing", industry: "Finance",
        metric: "10×", metricLabel: "produktivita analytického týmu",
        title: "Autonomní portfoliová inteligence nad 100+ firmami.",
        impact: "Síť specializovaných agentů sleduje tisíce zdrojů nepřetržitě, odděluje signál od šumu a ráno dodá briefing. Rešerše, která trvala týdny, je hotová za tři až pět minut a nic zásadního neproklouzne.",
        tech: ["Síť agentů", "Vektorová DB", "LLM", "Datové pipeline"],
      },
      {
        id: "orel-re", by: "qube",
        client: "OREL RE", industry: "Hotelnictví · nemovitosti",
        metric: "85 %", metricLabel: "rychlejší schvalování projektů",
        title: "Schvalování a faktury řízené agenty.",
        impact: "Schvalování kleslo ze tří až čtyř týdnů na tři až pět dní, párování faktur z osmi až deseti hodin týdně na patnáct minut. Vedení vidí OPEX i CAPEX živě, ne týdny po uzávěrce.",
        tech: ["Agenti", "OCR", "BI dashboardy", "Více měn"],
      },
      {
        id: "ladeo", by: "qube",
        client: "Ladeo Lukavec", industry: "Odpadové hospodářství",
        metric: "30 min → 5 s", metricLabel: "než tým najde odpověď v předpisech",
        title: "Regulační expert, kterého se může zeptat kdokoli.",
        impact: "Stovky stran předpisů se staly znalostní bází, na kterou se dá ptát běžnou řečí. Expertiza přestala viset na dvou seniorních lidech a od nasazení nedošlo k žádnému compliance incidentu.",
        tech: ["Znalostní báze", "NLP", "Zpracování dokumentů"],
      },
      {
        id: "stavbyday", by: "qube",
        client: "StavbyDay", industry: "Stavebnictví",
        metric: "80 %", metricLabel: "méně administrativy",
        title: "Z papíru a Excelu na jeden zdroj pravdy.",
        impact: "Šedesát hodin týdně přepisování mezi systémy nahradila jedna databáze s automatizovanými toky. Firma vyrostla o 40 % bez přijetí administrativy a chybovost při zadávání dat klesla o 93 %.",
        tech: ["Vlastní databáze", "Automatizace procesů", "API integrace"],
      },
      {
        id: "eurepol", by: "qube",
        client: "EUREPOL", industry: "Zemědělství",
        metric: "73 %", metricLabel: "méně času stráveného hledáním informací",
        title: "Virtuální výkonný tým pro provoz řízený na dálku.",
        impact: "Plánování údržby, compliance dokumenty i každodenní dotazy obsluhuje soustava propojených agentů. Majitel řídí provoz odkudkoli a žádný stroj neselhal kvůli zmeškanému servisu.",
        tech: ["Ekosystém agentů", "Porozumění dokumentům", "Prediktivní údržba"],
      },
      {
        id: "social-media", by: "qube",
        client: "Butiková marketingová agentura", industry: "Marketing",
        metric: "3×", metricLabel: "více klientů se stejným týmem",
        title: "AI social media manager za zády stratégů.",
        impact: "Hlídání komentářů, analýza sentimentu a týdenní reporting přešly na agenta, takže se senior stratégové vrátili ke kreativní práci. Čas na analýzu klesl o 67 % a engagement vzrostl o 41 %.",
        tech: ["Agenti", "Analýza sentimentu", "Reporting"],
      },
      {
        id: "slevomat", by: "qube",
        client: "Slevomat", industry: "E-commerce · adopce",
        metric: "90 %", metricLabel: "vyškolených manažerů používá AI denně",
        title: "Program AI ambasadorů, ne další školení.",
        impact: "Tříměsíční program přes strategii, nástroje a řízení změny nechal firmu soběstačnou: AI expertiza pokrytá v každém týmu a pět funkčních prototypů v provozu.",
        tech: ["Adopce", "Prototypy", "Řízení změny"],
      },
      {
        id: "metals-trading", by: "enter",
        client: "Obchod s kovy", industry: "Obchod · 82 lidí",
        metric: "3 měsíce", metricLabel: "návratnost",
        title: "Rutinní provozní kroky převzaly Copilot a n8n.",
        impact: "Vybrané rutinní kroky běží samy a výjimky předávají lidem. Přibližně 1 420 hodin a 710 tisíc Kč ušetřených ročně.",
        tech: ["Copilot", "n8n"],
      },
      {
        id: "construction-group", by: "enter",
        client: "Stavební skupina", industry: "Stavebnictví",
        metric: "180 h / měsíc", metricLabel: "vráceno týmu",
        title: "Interní aplikace s API a Power BI.",
        impact: "Přepisování a roztroušená data vystřídal jeden společný přehled zakázek, který týmu vrací přibližně 180 hodin měsíčně.",
        tech: ["Aplikace", "API", "Power BI"],
      },
    ],
  },

  de: {
    kicker: "Gelieferte Arbeit",
    title: "Systeme, die gerade jetzt laufen.",
    intro: "Jedes davon ist im Echtbetrieb. Die namentlichen Fallstudien hat das Team Enter Agents geliefert; sie sind mit Zustimmung der Kunden veröffentlicht. Die anonymisierten stammen aus unseren Enterprise-Teams, die passende Referenz bringen wir zum Termin mit.",
    allGo: "Alle Fallstudien →",
    byLabel: byLabel.de,
    cards: [
      {
        id: "bc-data-platform", by: "enter", unverified: true,
        client: "Produktionsgruppe", industry: "Fertigung · ~600 Personen",
        metric: "Eine Datenschicht", metricLabel: "über Business Central, Lager und DMS",
        title: "Eine Datenplattform auf Business Central.",
        impact: "Aufträge, Belege, Lager- und Produktionsdaten lebten nicht mehr an drei Orten. Eine gesteuerte Schicht liest sie, prüft sie gegen das ERP und schreibt zurück — Reporting, Agenten und die tägliche Suche arbeiten mit denselben geprüften Zahlen statt mit drei Versionen davon.",
        tech: ["Business Central", "Datenplattform", "Power BI", "Agentenschicht"],
      },
      {
        id: "energy-service-agent", by: "qube",
        client: "Lama Energy Group", industry: "Energie",
        metric: "+87 %", metricLabel: "schnellere Reaktion auf eine Anfrage",
        title: "Ein agentischer Kundendesk, der nie schließt.",
        impact: "Ein Agent übernimmt die gesamte Phase vor dem Kontakt — Chat, E-Mail und Formulare. Er antwortet aus der Produktdatenbank, qualifiziert die Anfrage nach festen Kriterien und bucht den Termin im Kalender eines Menschen. Rund um die Uhr, ohne zusätzliches Personal, mit 35 % mehr qualifizierten Terminen.",
        tech: ["Agenten", "CRM", "Calendar API", "NLP"],
      },
      {
        id: "jt-investing", by: "qube",
        client: "J&T Investing", industry: "Finanzen",
        metric: "10×", metricLabel: "Produktivität des Analystenteams",
        title: "Autonome Portfolio-Intelligenz über 100+ Unternehmen.",
        impact: "Ein Netz spezialisierter Agenten beobachtet rund um die Uhr Tausende Quellen, trennt Signal von Rauschen und liefert morgens ein Briefing. Eine Recherche, die Wochen dauerte, ist in drei bis fünf Minuten fertig.",
        tech: ["Agentennetz", "Vektor-DB", "LLM", "Daten-Pipelines"],
      },
      {
        id: "orel-re", by: "qube",
        client: "OREL RE", industry: "Hotellerie · Immobilien",
        metric: "85 %", metricLabel: "schnellere Projektfreigaben",
        title: "Freigaben und Rechnungen, von Agenten gesteuert.",
        impact: "Freigaben sanken von drei bis vier Wochen auf drei bis fünf Tage, der Rechnungsabgleich von acht bis zehn Stunden pro Woche auf fünfzehn Minuten. Die Leitung sieht OPEX und CAPEX live.",
        tech: ["Agenten", "OCR", "BI-Dashboards", "Mehrwährung"],
      },
      {
        id: "ladeo", by: "qube",
        client: "Ladeo Lukavec", industry: "Abfallwirtschaft",
        metric: "30 Min → 5 Sek", metricLabel: "bis zur Antwort aus den Vorschriften",
        title: "Ein Regulierungsexperte, den jeder fragen kann.",
        impact: "Hunderte Seiten Vorschriften wurden zu einer Wissensbasis, die man in normaler Sprache befragt. Das Wissen hängt nicht mehr an zwei erfahrenen Personen, und seit dem Go-live gab es keinen Compliance-Vorfall.",
        tech: ["Wissensbasis", "NLP", "Dokumentenverarbeitung"],
      },
      {
        id: "stavbyday", by: "qube",
        client: "StavbyDay", industry: "Bauwesen",
        metric: "80 %", metricLabel: "weniger Verwaltungsarbeit",
        title: "Von Papier und Excel zu einer Quelle der Wahrheit.",
        impact: "Sechzig Stunden Abtippen pro Woche wurden zu einer Datenbank mit automatisierten Abläufen. Das Geschäft wuchs um 40 % ohne zusätzliche Verwaltung, Eingabefehler sanken um 93 %.",
        tech: ["Eigene Datenbank", "Prozessautomatisierung", "API-Integrationen"],
      },
      {
        id: "eurepol", by: "qube",
        client: "EUREPOL", industry: "Landwirtschaft",
        metric: "73 %", metricLabel: "weniger Zeit für die Suche nach Informationen",
        title: "Ein virtuelles Führungsteam für einen fernbetriebenen Hof.",
        impact: "Wartungsplanung, Compliance-Dokumente und tägliche Abfragen übernimmt ein Verbund von Agenten. Der Betrieb wird von überall geführt, keine Maschine fiel wegen versäumter Wartung aus.",
        tech: ["Agenten-Ökosystem", "Dokumentenverständnis", "Vorausschauende Wartung"],
      },
      {
        id: "social-media", by: "qube",
        client: "Boutique-Marketingagentur", industry: "Marketing",
        metric: "3×", metricLabel: "Kunden mit demselben Team",
        title: "Ein KI-Social-Media-Manager hinter den Strategen.",
        impact: "Kommentarüberwachung, Sentiment-Analyse und Wochenreporting gingen an einen Agenten, die Strategen kehrten zur kreativen Arbeit zurück. Analysezeit −67 %, Engagement +41 %.",
        tech: ["Agenten", "Sentiment-Analyse", "Reporting"],
      },
      {
        id: "slevomat", by: "qube",
        client: "Slevomat", industry: "E-Commerce · Enablement",
        metric: "90 %", metricLabel: "der geschulten Führungskräfte nutzen KI täglich",
        title: "Ein KI-Botschafterprogramm statt einer weiteren Schulung.",
        impact: "Ein dreimonatiges Programm aus Strategie, Werkzeugen und Change-Management machte die Organisation selbstständig: KI-Kompetenz in jedem Team und fünf laufende Prototypen.",
        tech: ["Enablement", "Prototyping", "Change-Management"],
      },
      {
        id: "metals-trading", by: "enter",
        client: "Metallhandel", industry: "Handel · 82 Personen",
        metric: "3 Monate", metricLabel: "Amortisation",
        title: "Routineschritte übernahmen Copilot und n8n.",
        impact: "Ausgewählte Routineschritte laufen selbstständig und geben Ausnahmen an Menschen weiter. Rund 1 420 Stunden und 710 Tsd. CZK jährlich gespart.",
        tech: ["Copilot", "n8n"],
      },
      {
        id: "construction-group", by: "enter",
        client: "Baugruppe", industry: "Bauwesen",
        metric: "180 Std / Monat", metricLabel: "an das Team zurückgegeben",
        title: "Eine interne Anwendung mit APIs und Power BI.",
        impact: "Abtippen und verstreute Daten wichen einer gemeinsamen Sicht auf alle Aufträge — rund 180 Stunden im Monat zurück.",
        tech: ["Anwendung", "API", "Power BI"],
      },
    ],
  },

  pl: {
    kicker: "Dostarczona praca",
    title: "Systemy, które działają właśnie teraz.",
    intro: "Każdy z nich jest na produkcji. Case studies z nazwy dostarczył zespół Enter Agents i są publikowane za zgodą klientów; zanonimizowane pochodzą z naszych zespołów enterprise, a odpowiednią referencję przynosimy na spotkanie.",
    allGo: "Wszystkie case studies →",
    byLabel: byLabel.pl,
    cards: [
      {
        id: "bc-data-platform", by: "enter", unverified: true,
        client: "Grupa produkcyjna", industry: "Produkcja · ~600 osób",
        metric: "Jedna warstwa danych", metricLabel: "nad Business Central, magazynem i DMS",
        title: "Platforma danych na Business Central.",
        impact: "Zamówienia, dokumenty, magazyn i dane produkcyjne przestały żyć w trzech miejscach. Jedna zarządzana warstwa je czyta, weryfikuje wobec ERP i zapisuje z powrotem — raportowanie, agenci i codzienne wyszukiwanie korzystają z tych samych zweryfikowanych liczb.",
        tech: ["Business Central", "Platforma danych", "Power BI", "Warstwa agentowa"],
      },
      {
        id: "energy-service-agent", by: "qube",
        client: "Lama Energy Group", industry: "Energetyka",
        metric: "+87 %", metricLabel: "szybsza reakcja na zapytanie",
        title: "Agentowa obsługa klienta, która nigdy się nie zamyka.",
        impact: "Agent obsługuje całą fazę przed kontaktem — czat, e-mail i formularze. Odpowiada z bazy produktowej, kwalifikuje zapytanie według ustalonych kryteriów i rezerwuje spotkanie w kalendarzu konkretnej osoby. Praca całodobowa bez zwiększania zespołu, 35 % więcej kwalifikowanych spotkań.",
        tech: ["Agenci", "CRM", "Calendar API", "NLP"],
      },
      {
        id: "jt-investing", by: "qube",
        client: "J&T Investing", industry: "Finanse",
        metric: "10×", metricLabel: "produktywność zespołu analityków",
        title: "Autonomiczna inteligencja portfela nad 100+ spółkami.",
        impact: "Sieć wyspecjalizowanych agentów obserwuje tysiące źródeł całodobowo, oddziela sygnał od szumu i rano dostarcza briefing. Analiza, która zajmowała tygodnie, powstaje w trzy do pięciu minut.",
        tech: ["Sieć agentów", "Baza wektorowa", "LLM", "Pipeline'y danych"],
      },
      {
        id: "orel-re", by: "qube",
        client: "OREL RE", industry: "Hotelarstwo · nieruchomości",
        metric: "85 %", metricLabel: "szybsze zatwierdzanie projektów",
        title: "Zatwierdzenia i faktury sterowane przez agentów.",
        impact: "Zatwierdzanie spadło z trzech–czterech tygodni do trzech–pięciu dni, dopasowywanie faktur z ośmiu–dziesięciu godzin tygodniowo do piętnastu minut. Zarząd widzi OPEX i CAPEX na żywo.",
        tech: ["Agenci", "OCR", "Dashboardy BI", "Wiele walut"],
      },
      {
        id: "ladeo", by: "qube",
        client: "Ladeo Lukavec", industry: "Gospodarka odpadami",
        metric: "30 min → 5 s", metricLabel: "do znalezienia odpowiedzi w przepisach",
        title: "Ekspert regulacyjny, którego może zapytać każdy.",
        impact: "Setki stron przepisów stały się bazą wiedzy, o którą pyta się zwykłym językiem. Wiedza przestała wisieć na dwóch seniorach, a od wdrożenia nie było żadnego incydentu compliance.",
        tech: ["Baza wiedzy", "NLP", "Przetwarzanie dokumentów"],
      },
      {
        id: "stavbyday", by: "qube",
        client: "StavbyDay", industry: "Budownictwo",
        metric: "80 %", metricLabel: "mniej pracy administracyjnej",
        title: "Z papieru i Excela do jednego źródła prawdy.",
        impact: "Sześćdziesiąt godzin tygodniowo przepisywania między systemami zastąpiła jedna baza z automatycznymi przepływami. Firma urosła o 40 % bez zatrudniania administracji, a błędy wprowadzania danych spadły o 93 %.",
        tech: ["Własna baza", "Automatyzacja procesów", "Integracje API"],
      },
      {
        id: "eurepol", by: "qube",
        client: "EUREPOL", industry: "Rolnictwo",
        metric: "73 %", metricLabel: "mniej czasu na szukanie informacji",
        title: "Wirtualny zespół zarządzający dla gospodarstwa prowadzonego zdalnie.",
        impact: "Planowanie serwisów, dokumenty compliance i codzienne pytania obsługuje zestaw połączonych agentów. Właściciel prowadzi operację z dowolnego miejsca, żadna maszyna nie zawiodła przez pominięty serwis.",
        tech: ["Ekosystem agentów", "Rozumienie dokumentów", "Serwis predykcyjny"],
      },
      {
        id: "social-media", by: "qube",
        client: "Butikowa agencja marketingowa", industry: "Marketing",
        metric: "3×", metricLabel: "więcej klientów przy tym samym zespole",
        title: "AI social media manager za plecami strategów.",
        impact: "Monitoring komentarzy, analiza sentymentu i raportowanie tygodniowe przeszły na agenta, więc stratedzy wrócili do pracy kreatywnej. Czas analizy −67 %, zaangażowanie +41 %.",
        tech: ["Agenci", "Analiza sentymentu", "Raportowanie"],
      },
      {
        id: "slevomat", by: "qube",
        client: "Slevomat", industry: "E-commerce · adopcja",
        metric: "90 %", metricLabel: "przeszkolonych menedżerów używa AI codziennie",
        title: "Program ambasadorów AI, a nie kolejne szkolenie.",
        impact: "Trzymiesięczny program obejmujący strategię, narzędzia i zarządzanie zmianą zostawił organizację samodzielną: kompetencje AI w każdym zespole i pięć działających prototypów.",
        tech: ["Adopcja", "Prototypy", "Zarządzanie zmianą"],
      },
      {
        id: "metals-trading", by: "enter",
        client: "Handel metalami", industry: "Handel · 82 osoby",
        metric: "3 miesiące", metricLabel: "zwrot z inwestycji",
        title: "Rutynowe kroki operacyjne przejęły Copilot i n8n.",
        impact: "Wybrane rutynowe kroki działają same i przekazują wyjątki ludziom. Około 1 420 godzin i 710 tys. CZK oszczędności rocznie.",
        tech: ["Copilot", "n8n"],
      },
      {
        id: "construction-group", by: "enter",
        client: "Grupa budowlana", industry: "Budownictwo",
        metric: "180 h / miesiąc", metricLabel: "zwrócone zespołowi",
        title: "Wewnętrzna aplikacja z API i Power BI.",
        impact: "Przepisywanie i rozproszone dane zastąpił jeden wspólny widok zleceń, zwracający około 180 godzin miesięcznie.",
        tech: ["Aplikacja", "API", "Power BI"],
      },
    ],
  },
};

/** The six that carry the board; the rest wait for a dedicated references page. */
export const boardOrder = [
  "bc-data-platform",
  "energy-service-agent",
  "jt-investing",
  "orel-re",
  "ladeo",
  "stavbyday",
];
