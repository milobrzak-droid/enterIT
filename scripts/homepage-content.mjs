export const bookingUrl =
  "https://outlook.office.com/bookwithme/user/c700d45aa87c4813b97dbf561b86bf1e@enterai.cz?anonymous&ismsaljsauthenabled&ep=plink";

export const localeOrder = ["cs", "en", "de", "pl"];

export const locales = {
  cs: {
    file: "index.html",
    lang: "cs",
    ogLocale: "cs_CZ",
    canonical: "https://enterit.cz/",
    homeHref: "/",
    prefix: "",
    title: "AI automatizace a agenti s měřitelným ROI | EnterIT",
    description:
      "75 vývojářů staví a provozuje AI agenty, automatizace a integrace do ERP. Úsporu času i návratnost měříme na vašich datech od prvního pilota.",
    skip: "Přejít na obsah",
    mainNavLabel: "Hlavní navigace",
    mobileNavLabel: "Mobilní navigace",
    languageLabel: "Jazyk",
    menuOpen: "Otevřít menu",
    menuClose: "Zavřít menu",
    homeLabel: "EnterIT — domů",
    nav: {
      services: "Co stavíme",
      results: "Výsledky",
      process: "Jak pracujeme",
      integrations: "Integrace",
      team: "Tým",
      contact: "Probrat projekt",
    },
    hero: {
      title: "Automatizace, která vaší firmě",
      highlight: "vrací čas.",
      lead:
        "Navrhneme, postavíme a budeme provozovat AI agenty, integrace i interní systémy. Začínáme konkrétním procesem a přínos měříme na vašich datech.",
      primary: "Probrat váš proces",
      secondary: "Ukázat výsledky",
    },
    proof: [
      ["75", "specialistů pod jednou střechou"],
      ["120+", "dokončených projektů"],
      ["4–8 týdnů", "od pilotu k nasazení do provozu"],
    ],
    partnerLabel: "Technologičtí partneři",
    services: {
      kicker: "Od procesu k běžícímu řešení",
      title: "Technologie musí odvést práci. Ne jen vypadat chytře.",
      intro:
        "Spojujeme byznys, vývoj a provoz. Výsledkem je řešení napojené na vaše systémy, s jasným vlastníkem a měřitelným dopadem.",
      cards: [
        {
          title: "AI agenti pro reálný provoz",
          text:
            "Agenti pracují s dokumenty, e-maily i firemními znalostmi. Výjimky předají člověku a každý krok zůstává dohledatelný.",
          bullets: ["Faktury a objednávky", "Zákaznická a interní podpora", "Dokumenty a firemní znalosti"],
          link: "Jak stavíme AI agenty",
          href: "jak-stavime-agenty.html",
        },
        {
          title: "Automatizace a integrace",
          text:
            "Propojíme ERP, CRM, sklad, e-shop a e-mail do jednoho spolehlivého toku. Včetně starších systémů bez moderního API.",
          bullets: ["ERP, CRM a WMS integrace", "Schvalování a reporting", "Starší systémy a API vrstvy"],
          link: "Jak stavíme automatizace",
          href: "jak-stavime-automatizace.html",
        },
        {
          title: "Software a data na míru",
          text:
            "Stavíme interní aplikace, datové platformy a cloudová řešení tam, kde hotový produkt nestačí vašemu procesu.",
          bullets: ["Interní aplikace a portály", "Datové platformy a BI", "Cloud, DevOps a provoz pod SLA"],
          link: "Poznat celý tým",
          href: "tym.html",
        },
      ],
      railLabel: "Nejčastější řešení",
      solutionLinks: [
        ["Faktury", "reseni-faktury.html"],
        ["Objednávky", "reseni-objednavky.html"],
        ["Reklamace", "reseni-reklamace.html"],
        ["Sklad bez papíru", "reseni-sklad-bez-papiru.html"],
        ["Pracovní výkazy", "reseni-pracovni-vykazy.html"],
      ],
    },
    results: {
      kicker: "Vybrané výsledky z provozu",
      title: "Méně slibů. Více času pro lidi.",
      intro:
        "Ukázky jsou anonymizovány. Na schůzce doložíme relevantní reference a vysvětlíme, jak jsme výsledky měřili.",
      cases: [
        {
          context: "Výroba · přibližně 600 lidí",
          metric: "~40 h / týden",
          text: "Vytěžování dokladů do Business Central s kontrolou, schvalováním a auditní stopou.",
          tech: ["AI agenti", "Business Central"],
        },
        {
          context: "Obchod s kovy · 82 lidí",
          metric: "1 420 h / rok",
          text: "Čas ušetřený automatizací opakovaných procesů. Návratnost projektu za tři měsíce.",
          tech: ["Copilot", "n8n"],
        },
        {
          context: "Stavební skupina",
          metric: "180 h / měsíc",
          text: "Interní systém sjednotil přehled zakázek a odstranil ruční sestavování reportů.",
          tech: ["Custom software", "Power BI"],
        },
      ],
      note: "Čísla vycházejí z provozních dat konkrétních projektů.",
      link: "Probrat podobný případ",
    },
    process: {
      kicker: "Jak pracujeme",
      title: "První přínos doložíme dříve, než začneme škálovat.",
      intro:
        "Každá etapa má jasný výstup, rozhodovací bod a odpovědnost. Neprodáváme nekonečný experiment.",
      steps: [
        ["Najdeme správný proces", "Zmapujeme objem práce, výjimky, data a skutečnou cenu dnešního postupu."],
        ["Připravíme business case", "Stanovíme výchozí stav, očekávanou úsporu, rizika a podmínky úspěšného pilotu."],
        ["Dodáme pilot", "Řešení napojíme na reálné systémy a jeho přínos ověříme na reálných datech."],
        ["Převezmeme provoz", "Monitoring, bezpečnost, SLA a další rozvoj mají konkrétního vlastníka."],
      ],
      agentsLink: "Detailně: jak stavíme agenty",
      automationLink: "Detailně: jak stavíme automatizace",
    },
    integrations: {
      kicker: "Integrace a bezpečnost",
      title: "Zapadne do vašich systémů. Ne naopak.",
      intro:
        "Data čteme, ověřujeme a zapisujeme tam, kde už pracujete. Řešení může běžet v evropském cloudu i ve vašem prostředí.",
      points: [
        "Napojení přes API, databázi, soubory i uživatelské rozhraní",
        "Schválení člověkem u citlivých kroků a úplná auditní stopa",
        "Monitoring, role, oprávnění a provozní odpovědnost od prvního dne",
      ],
      groups: [
        ["ERP a finance", ["SAP", "Business Central", "Helios", "Pohoda"]],
        ["CRM a obchod", ["Salesforce", "HubSpot", "Raynet", "Shopify", "Shoptet"]],
        ["Data a AI", ["Microsoft 365", "Power BI", "Claude", "Copilot", "n8n", "Make"]],
      ],
    },
    team: {
      kicker: "Jeden partner od návrhu po provoz",
      title: "75 specialistů. Tři týmy. Jedna odpovědnost.",
      intro:
        "Architektura, vývoj AI, produkt, infrastruktura a dlouhodobý provoz jsou pod jednou střechou.",
      stats: [["45", "enterprise"], ["25", "AI a agenti"], ["5", "produktové studio"]],
      link: "Poznat celý tým",
    },
    contact: {
      kicker: "První krok zabere 30 minut",
      title: "Ukažte nám proces, který vás brzdí.",
      text: "Společně určíme, jestli dává smysl automatizace, integrace nebo změna systému — a co má smysl ověřit jako první.",
      primary: "Rezervovat 30 minut",
      secondary: "Napsat e-mail",
    },
    footer: {
      headline: "Račte vstoupit do světa automatizací. Nemusíte klepat. Stačí kliknout.",
      contactHeading: "Máte dotaz?",
      menuHeading: "Menu",
      solutionsHeading: "Řešení",
      socialHeading: "Zůstaňte v obraze",
      solutions: [
        ["Faktury do účetnictví", "reseni-faktury.html"],
        ["Objednávky z e-mailů", "reseni-objednavky.html"],
        ["Reklamace", "reseni-reklamace.html"],
        ["Sklad bez papírů", "reseni-sklad-bez-papiru.html"],
        ["Evidence docházky", "reseni-dochazka.html"],
        ["Schvalování dovolených", "reseni-dovolene.html"],
        ["Kniha jízd", "reseni-kniha-jizd.html"],
        ["Pracovní výkazy", "reseni-pracovni-vykazy.html"],
      ],
      privacy: "Ochrana osobních údajů",
      terms: "Všeobecné obchodní podmínky",
    },
  },

  en: {
    file: "en.html",
    lang: "en",
    ogLocale: "en_US",
    canonical: "https://enterit.cz/en.html",
    homeHref: "/en.html",
    prefix: "en/",
    title: "AI Automation & Agents with Measurable ROI | EnterIT",
    description:
      "75 engineers build and operate AI agents, automation and ERP integrations. We prove time savings and ROI on your data, from pilot to 24/7 production.",
    skip: "Skip to content",
    mainNavLabel: "Main navigation",
    mobileNavLabel: "Mobile navigation",
    languageLabel: "Language",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    homeLabel: "EnterIT — home",
    nav: {
      services: "What we build",
      results: "Results",
      process: "How we work",
      integrations: "Integrations",
      team: "Team",
      contact: "Discuss a project",
    },
    hero: {
      title: "Automation that gives your team",
      highlight: "time back.",
      lead:
        "We design, build and operate AI agents, integrations and internal systems. We start with one real process and measure the impact using your data.",
      primary: "Discuss your process",
      secondary: "See the results",
    },
    proof: [
      ["75", "specialists under one roof"],
      ["120+", "projects delivered"],
      ["4–8 weeks", "from pilot to production"],
    ],
    partnerLabel: "Technology partners",
    services: {
      kicker: "From process to production",
      title: "Technology should do the work. Not just look clever.",
      intro:
        "We bring business, engineering and operations together. The result is integrated into your systems, has a clear owner and delivers measurable impact.",
      cards: [
        {
          title: "AI agents for real operations",
          text:
            "Agents work with documents, e-mails and company knowledge. They hand off exceptions to people and keep every step auditable.",
          bullets: ["Invoices and orders", "Customer and internal support", "Documents and company knowledge"],
          link: "How we build AI agents",
          href: "en/jak-stavime-agenty.html",
        },
        {
          title: "Automation and integration",
          text:
            "We connect ERP, CRM, warehouse, e-commerce and e-mail into one reliable flow — including legacy systems without a modern API.",
          bullets: ["ERP, CRM and WMS integration", "Approvals and reporting", "Legacy systems and API layers"],
          link: "How we build automation",
          href: "en/jak-stavime-automatizace.html",
        },
        {
          title: "Custom software and data",
          text:
            "We build internal apps, data platforms and cloud solutions when off-the-shelf software does not fit your process.",
          bullets: ["Internal apps and portals", "Data platforms and BI", "Cloud, DevOps and SLA operations"],
          link: "Meet the full team",
          href: "en/tym.html",
        },
      ],
      railLabel: "Common solutions",
      solutionLinks: [
        ["Invoices", "en/reseni-faktury.html"],
        ["Orders", "en/reseni-objednavky.html"],
        ["Complaints", "en/reseni-reklamace.html"],
        ["Paperless warehouse", "en/reseni-sklad-bez-papiru.html"],
        ["Timesheets", "en/reseni-pracovni-vykazy.html"],
      ],
    },
    results: {
      kicker: "Selected operational results",
      title: "Fewer promises. More time back.",
      intro:
        "Examples are anonymised. In a meeting, we will share relevant references and explain exactly how the results were measured.",
      cases: [
        {
          context: "Manufacturing · around 600 people",
          metric: "~40 h / week",
          text: "Document extraction into Business Central with validation, approval and a complete audit trail.",
          tech: ["AI agents", "Business Central"],
        },
        {
          context: "Metals trading · 82 people",
          metric: "1,420 h / year",
          text: "Time saved by automating repetitive processes. The project paid for itself in three months.",
          tech: ["Copilot", "n8n"],
        },
        {
          context: "Construction group",
          metric: "180 h / month",
          text: "An internal system created a unified view of projects and eliminated manual report compilation.",
          tech: ["Custom software", "Power BI"],
        },
      ],
      note: "Figures are based on operational data from the respective projects.",
      link: "Discuss a similar case",
    },
    process: {
      kicker: "How we work",
      title: "We prove value before we scale.",
      intro:
        "Every stage has a clear output, decision point and owner. We do not sell an endless experiment.",
      steps: [
        ["Find the right process", "We map workload, exceptions, data and the real cost of the current way of working."],
        ["Build the business case", "We define the baseline, expected savings, risks and success criteria for the pilot."],
        ["Deliver the pilot", "We connect the solution to real systems and measure its impact using real data."],
        ["Run it in production", "Monitoring, security, SLA and continued development have one accountable owner."],
      ],
      agentsLink: "In detail: how we build agents",
      automationLink: "In detail: how we build automation",
    },
    integrations: {
      kicker: "Integration and security",
      title: "It fits your systems. Not the other way around.",
      intro:
        "We read, validate and write data where your people already work. The solution can run in an EU cloud or in your environment.",
      points: [
        "Integration through APIs, databases, files or the user interface",
        "Human approval for sensitive steps and a complete audit trail",
        "Monitoring, roles, permissions and operational ownership from day one",
      ],
      groups: [
        ["ERP and finance", ["SAP", "Business Central", "Helios", "Pohoda"]],
        ["CRM and sales", ["Salesforce", "HubSpot", "Raynet", "Shopify", "Shoptet"]],
        ["Data and AI", ["Microsoft 365", "Power BI", "Claude", "Copilot", "n8n", "Make"]],
      ],
    },
    team: {
      kicker: "One partner from design to operations",
      title: "75 specialists. Three teams. One responsibility.",
      intro:
        "Architecture, AI engineering, product, infrastructure and long-term operations all sit under one roof.",
      stats: [["45", "enterprise"], ["25", "AI and agents"], ["5", "product studio"]],
      link: "Meet the full team",
    },
    contact: {
      kicker: "The first step takes 30 minutes",
      title: "Show us the process holding you back.",
      text: "Together we will decide whether automation, integration or a system change makes sense — and what is worth proving first.",
      primary: "Book a 30-minute call",
      secondary: "Send an e-mail",
    },
    footer: {
      headline: "Ready to put automation to work? Let’s start with one click.",
      contactHeading: "Got a question?",
      menuHeading: "Menu",
      solutionsHeading: "Solutions",
      socialHeading: "Stay in the loop",
      solutions: [
        ["Invoices into accounting", "reseni-faktury.html"],
        ["Orders from e-mails", "reseni-objednavky.html"],
        ["Complaints", "reseni-reklamace.html"],
        ["Paperless warehouse", "reseni-sklad-bez-papiru.html"],
        ["Attendance tracking", "reseni-dochazka.html"],
        ["Leave approvals", "reseni-dovolene.html"],
        ["Logbook", "reseni-kniha-jizd.html"],
        ["Work timesheets", "reseni-pracovni-vykazy.html"],
      ],
      privacy: "Privacy policy",
      terms: "Terms and conditions",
    },
  },

  de: {
    file: "de.html",
    lang: "de",
    ogLocale: "de_DE",
    canonical: "https://enterit.cz/de.html",
    homeHref: "/de.html",
    prefix: "de/",
    title: "KI-Automatisierung & Agenten mit messbarem ROI | EnterIT",
    description:
      "75 Entwickler bauen und betreiben KI-Agenten, Automatisierung und ERP-Integrationen. Zeitgewinn und ROI belegen wir mit Ihren Daten – vom Pilot bis 24/7.",
    skip: "Zum Inhalt springen",
    mainNavLabel: "Hauptnavigation",
    mobileNavLabel: "Mobile Navigation",
    languageLabel: "Sprache",
    menuOpen: "Menü öffnen",
    menuClose: "Menü schließen",
    homeLabel: "EnterIT — Startseite",
    nav: {
      services: "Was wir bauen",
      results: "Ergebnisse",
      process: "So arbeiten wir",
      integrations: "Integrationen",
      team: "Team",
      contact: "Projekt besprechen",
    },
    hero: {
      title: "Automatisierung, die Ihrem Team",
      highlight: "Zeit zurückgibt.",
      lead:
        "Wir konzipieren, entwickeln und betreiben KI-Agenten, Integrationen und interne Systeme. Wir starten mit einem konkreten Prozess und messen den Nutzen anhand Ihrer Daten.",
      primary: "Ihren Prozess besprechen",
      secondary: "Ergebnisse ansehen",
    },
    proof: [
      ["75", "Spezialisten unter einem Dach"],
      ["120+", "abgeschlossene Projekte"],
      ["4–8 Wochen", "vom Pilotprojekt bis zum Produktivbetrieb"],
    ],
    partnerLabel: "Technologiepartner",
    services: {
      kicker: "Vom Prozess zum produktiven Betrieb",
      title: "Technologie soll Arbeit erledigen. Nicht nur klug aussehen.",
      intro:
        "Wir verbinden Business, Engineering und Betrieb. Das Ergebnis ist in Ihre Systeme integriert, hat einen klaren Verantwortlichen und liefert messbaren Nutzen.",
      cards: [
        {
          title: "KI-Agenten für den realen Betrieb",
          text:
            "Agenten arbeiten mit Dokumenten, E-Mails und Unternehmenswissen. Ausnahmen übergeben sie an Mitarbeitende; jeder Schritt bleibt nachvollziehbar.",
          bullets: ["Rechnungen und Bestellungen", "Kunden- und interner Support", "Dokumente und Unternehmenswissen"],
          link: "So bauen wir KI-Agenten",
          href: "de/jak-stavime-agenty.html",
        },
        {
          title: "Automatisierung und Integration",
          text:
            "Wir verbinden ERP, CRM, Lager, E-Commerce und E-Mail zu einem verlässlichen Ablauf — einschließlich älterer Systeme ohne moderne API.",
          bullets: ["ERP-, CRM- und WMS-Integration", "Freigaben und Reporting", "Altsysteme und API-Schichten"],
          link: "So bauen wir Automatisierungen",
          href: "de/jak-stavime-automatizace.html",
        },
        {
          title: "Individuelle Software und Datenlösungen",
          text:
            "Wir entwickeln interne Anwendungen, Datenplattformen und Cloud-Lösungen, wenn Standardsoftware nicht zu Ihrem Prozess passt.",
          bullets: ["Interne Anwendungen und Portale", "Datenplattformen und BI", "Cloud, DevOps und SLA-Betrieb"],
          link: "Das ganze Team kennenlernen",
          href: "de/tym.html",
        },
      ],
      railLabel: "Häufige Lösungen",
      solutionLinks: [
        ["Rechnungen", "de/reseni-faktury.html"],
        ["Bestellungen", "de/reseni-objednavky.html"],
        ["Reklamationen", "de/reseni-reklamace.html"],
        ["Papierloses Lager", "de/reseni-sklad-bez-papiru.html"],
        ["Arbeitsberichte", "de/reseni-pracovni-vykazy.html"],
      ],
    },
    results: {
      kicker: "Ausgewählte Ergebnisse im Betrieb",
      title: "Weniger Versprechen. Mehr gewonnene Zeit.",
      intro:
        "Die Beispiele sind anonymisiert. Im Gespräch zeigen wir passende Referenzen und erläutern, wie die Ergebnisse gemessen wurden.",
      cases: [
        {
          context: "Produktion · rund 600 Mitarbeitende",
          metric: "~40 Std. / Woche",
          text: "Dokumentenerfassung in Business Central mit Prüfung, Freigabe und vollständigem Audit-Trail.",
          tech: ["KI-Agenten", "Business Central"],
        },
        {
          context: "Metallhandel · 82 Mitarbeitende",
          metric: "1.420 Std. / Jahr",
          text: "Zeitersparnis durch automatisierte Routineprozesse. Amortisation des Projekts in drei Monaten.",
          tech: ["Copilot", "n8n"],
        },
        {
          context: "Unternehmensgruppe im Bauwesen",
          metric: "180 Std. / Monat",
          text: "Ein internes System schuf eine einheitliche Projektübersicht und ersetzte manuell erstellte Berichte.",
          tech: ["Individualsoftware", "Power BI"],
        },
      ],
      note: "Die Zahlen stammen aus Betriebsdaten der jeweiligen Projekte.",
      link: "Einen ähnlichen Fall besprechen",
    },
    process: {
      kicker: "So arbeiten wir",
      title: "Wir belegen den ersten Nutzen, bevor wir skalieren.",
      intro:
        "Jede Phase hat ein klares Ergebnis, einen Entscheidungspunkt und einen Verantwortlichen. Wir verkaufen kein endloses Experiment.",
      steps: [
        ["Den richtigen Prozess finden", "Wir erfassen Arbeitsvolumen, Ausnahmen, Daten und die tatsächlichen Kosten des heutigen Ablaufs."],
        ["Business Case erstellen", "Wir definieren Baseline, erwartete Einsparungen, Risiken und Erfolgskriterien für das Pilotprojekt."],
        ["Pilotprojekt liefern", "Wir verbinden die Lösung mit realen Systemen und belegen ihren Nutzen anhand realer Daten."],
        ["Betrieb verantworten", "Monitoring, Sicherheit, SLA und Weiterentwicklung haben einen klaren Verantwortlichen."],
      ],
      agentsLink: "Im Detail: So bauen wir Agenten",
      automationLink: "Im Detail: So bauen wir Automatisierungen",
    },
    integrations: {
      kicker: "Integration und Sicherheit",
      title: "Passt in Ihre Systeme. Nicht umgekehrt.",
      intro:
        "Wir lesen, prüfen und schreiben Daten dort, wo Ihre Mitarbeitenden bereits arbeiten. Die Lösung läuft in einer EU-Cloud oder in Ihrer Umgebung.",
      points: [
        "Anbindung über APIs, Datenbanken, Dateien oder die Benutzeroberfläche",
        "Freigabe durch einen Menschen bei sensiblen Schritten und ein vollständiger Audit-Trail",
        "Monitoring, Rollen, Berechtigungen und Betriebsverantwortung ab Tag eins",
      ],
      groups: [
        ["ERP und Finanzen", ["SAP", "Business Central", "Helios", "Pohoda"]],
        ["CRM und Vertrieb", ["Salesforce", "HubSpot", "Raynet", "Shopify", "Shoptet"]],
        ["Daten und KI", ["Microsoft 365", "Power BI", "Claude", "Copilot", "n8n", "Make"]],
      ],
    },
    team: {
      kicker: "Ein Partner von der Konzeption bis zum Betrieb",
      title: "75 Spezialisten. Drei Teams. Eine Verantwortung.",
      intro:
        "Architektur, KI-Engineering, Produkt, Infrastruktur und langfristiger Betrieb kommen aus einer Hand.",
      stats: [["45", "Enterprise"], ["25", "KI und Agenten"], ["5", "Product Studio"]],
      link: "Das ganze Team kennenlernen",
    },
    contact: {
      kicker: "Der erste Schritt dauert 30 Minuten",
      title: "Zeigen Sie uns den Prozess, der Sie ausbremst.",
      text: "Gemeinsam klären wir, ob Automatisierung, Integration oder ein Systemwechsel sinnvoll ist — und was zuerst belegt werden sollte.",
      primary: "30 Minuten buchen",
      secondary: "E-Mail senden",
    },
    footer: {
      headline: "Bereit für Automatisierung im Produktivbetrieb?",
      contactHeading: "Haben Sie eine Frage?",
      menuHeading: "Menü",
      solutionsHeading: "Lösungen",
      socialHeading: "Bleiben Sie auf dem Laufenden",
      solutions: [
        ["Rechnungen in die Buchhaltung", "reseni-faktury.html"],
        ["Bestellungen aus E-Mails", "reseni-objednavky.html"],
        ["Reklamationen", "reseni-reklamace.html"],
        ["Lager ohne Papier", "reseni-sklad-bez-papiru.html"],
        ["Anwesenheitserfassung", "reseni-dochazka.html"],
        ["Urlaubsfreigabe", "reseni-dovolene.html"],
        ["Fahrtenbuch", "reseni-kniha-jizd.html"],
        ["Arbeitsnachweise", "reseni-pracovni-vykazy.html"],
      ],
      privacy: "Datenschutz",
      terms: "Allgemeine Geschäftsbedingungen",
    },
  },

  pl: {
    file: "pl.html",
    lang: "pl",
    ogLocale: "pl_PL",
    canonical: "https://enterit.cz/pl.html",
    homeHref: "/pl.html",
    prefix: "pl/",
    title: "Automatyzacja AI i agenci z mierzalnym ROI | EnterIT",
    description:
      "75 specjalistów tworzy i utrzymuje agentów AI, automatyzacje i integracje ERP. Oszczędność czasu i ROI potwierdzamy na Państwa danych od pilota.",
    skip: "Przejdź do treści",
    mainNavLabel: "Główna nawigacja",
    mobileNavLabel: "Nawigacja mobilna",
    languageLabel: "Język",
    menuOpen: "Otwórz menu",
    menuClose: "Zamknij menu",
    homeLabel: "EnterIT — strona główna",
    nav: {
      services: "Co budujemy",
      results: "Wyniki",
      process: "Jak pracujemy",
      integrations: "Integracje",
      team: "Zespół",
      contact: "Porozmawiajmy o projekcie",
    },
    hero: {
      title: "Automatyzacja, która oddaje zespołowi",
      highlight: "czas.",
      lead:
        "Projektujemy, budujemy i utrzymujemy agentów AI, integracje oraz systemy wewnętrzne. Zaczynamy od konkretnego procesu i mierzymy efekt na Państwa danych.",
      primary: "Porozmawiajmy o Państwa procesie",
      secondary: "Zobacz wyniki",
    },
    proof: [
      ["75", "specjalistów pod jednym dachem"],
      ["120+", "zrealizowanych projektów"],
      ["4–8 tygodni", "od pilotażu do wdrożenia produkcyjnego"],
    ],
    partnerLabel: "Partnerzy technologiczni",
    services: {
      kicker: "Od procesu do działającego rozwiązania",
      title: "Technologia ma wykonywać pracę. Nie tylko dobrze wyglądać.",
      intro:
        "Łączymy biznes, inżynierię i utrzymanie. Rozwiązanie jest zintegrowane z Państwa systemami, ma jasno określonego właściciela i przynosi mierzalne efekty.",
      cards: [
        {
          title: "Agenci AI do realnej pracy",
          text:
            "Agenci pracują z dokumentami, e-mailami i wiedzą firmy. Wyjątki przekazują ludziom, a każdy krok można audytować.",
          bullets: ["Faktury i zamówienia", "Obsługa klienta i wsparcie wewnętrzne", "Dokumenty i wiedza firmowa"],
          link: "Jak budujemy agentów AI",
          href: "pl/jak-stavime-agenty.html",
        },
        {
          title: "Automatyzacja i integracja",
          text:
            "Łączymy ERP, CRM, magazyn, e-commerce i e-mail w jeden niezawodny przepływ — także starsze systemy bez nowoczesnego API.",
          bullets: ["Integracje ERP, CRM i WMS", "Akceptacje i raportowanie", "Systemy legacy i warstwy API"],
          link: "Jak budujemy automatyzacje",
          href: "pl/jak-stavime-automatizace.html",
        },
        {
          title: "Dedykowane oprogramowanie i dane",
          text:
            "Budujemy aplikacje wewnętrzne, platformy danych i rozwiązania chmurowe, gdy gotowy produkt nie pasuje do procesu.",
          bullets: ["Aplikacje i portale wewnętrzne", "Platformy danych i BI", "Chmura, DevOps i utrzymanie zgodne z SLA"],
          link: "Poznaj cały zespół",
          href: "pl/tym.html",
        },
      ],
      railLabel: "Najczęstsze rozwiązania",
      solutionLinks: [
        ["Faktury", "pl/reseni-faktury.html"],
        ["Zamówienia", "pl/reseni-objednavky.html"],
        ["Reklamacje", "pl/reseni-reklamace.html"],
        ["Magazyn bez papieru", "pl/reseni-sklad-bez-papiru.html"],
        ["Karty pracy", "pl/reseni-pracovni-vykazy.html"],
      ],
    },
    results: {
      kicker: "Wybrane wyniki wdrożeń",
      title: "Mniej obietnic. Więcej odzyskanego czasu.",
      intro:
        "Przykłady są zanonimizowane. Podczas rozmowy pokażemy odpowiednie referencje i wyjaśnimy, jak mierzono wyniki.",
      cases: [
        {
          context: "Produkcja · około 600 osób",
          metric: "~40 h / tydzień",
          text: "Automatyczne pozyskiwanie danych z dokumentów do Business Central z kontrolą, akceptacją i pełną ścieżką audytu.",
          tech: ["Agenci AI", "Business Central"],
        },
        {
          context: "Handel metalami · 82 osoby",
          metric: "1 420 h / rok",
          text: "Czas oszczędzony dzięki automatyzacji rutynowych procesów. Zwrot z inwestycji w ciągu trzech miesięcy.",
          tech: ["Copilot", "n8n"],
        },
        {
          context: "Grupa budowlana",
          metric: "180 h / miesiąc",
          text: "System wewnętrzny zapewnił spójny wgląd w projekty i wyeliminował ręczne tworzenie raportów.",
          tech: ["Dedykowany system", "Power BI"],
        },
      ],
      note: "Liczby pochodzą z danych operacyjnych poszczególnych projektów.",
      link: "Porozmawiajmy o podobnym przypadku",
    },
    process: {
      kicker: "Jak pracujemy",
      title: "Pokazujemy pierwsze efekty, zanim zaczniemy skalować.",
      intro:
        "Każdy etap ma jasny rezultat, punkt decyzyjny i właściciela. Nie sprzedajemy niekończącego się eksperymentu.",
      steps: [
        ["Znajdujemy właściwy proces", "Określamy nakład pracy, wyjątki, dane i rzeczywisty koszt obecnego sposobu działania."],
        ["Tworzymy uzasadnienie biznesowe", "Określamy punkt wyjścia, oczekiwane oszczędności, ryzyka i kryteria sukcesu pilotażu."],
        ["Realizujemy pilotaż", "Łączymy rozwiązanie z systemami produkcyjnymi i mierzymy jego efekty na rzeczywistych danych."],
        ["Bierzemy odpowiedzialność za utrzymanie", "Monitoring, bezpieczeństwo, SLA i rozwój mają konkretnego właściciela."],
      ],
      agentsLink: "Szczegółowo: jak budujemy agentów",
      automationLink: "Szczegółowo: jak budujemy automatyzacje",
    },
    integrations: {
      kicker: "Integracja i bezpieczeństwo",
      title: "Dopasowuje się do Państwa systemów. Nie odwrotnie.",
      intro:
        "Odczytujemy, sprawdzamy i zapisujemy dane tam, gdzie zespół już pracuje. Rozwiązanie może działać w chmurze UE lub w Państwa środowisku.",
      points: [
        "Integracja przez API, bazy danych, pliki lub interfejs użytkownika",
        "Akceptacja przez człowieka przy wrażliwych krokach i pełna ścieżka audytu",
        "Monitoring, role, uprawnienia i odpowiedzialność operacyjna od pierwszego dnia",
      ],
      groups: [
        ["ERP i finanse", ["SAP", "Business Central", "Helios", "Pohoda"]],
        ["CRM i sprzedaż", ["Salesforce", "HubSpot", "Raynet", "Shopify", "Shoptet"]],
        ["Dane i AI", ["Microsoft 365", "Power BI", "Claude", "Copilot", "n8n", "Make"]],
      ],
    },
    team: {
      kicker: "Jeden partner od projektu po utrzymanie",
      title: "75 specjalistów. Trzy zespoły. Jedna odpowiedzialność.",
      intro:
        "Architektura, inżynieria AI, produkt, infrastruktura i długoterminowe utrzymanie są w jednym miejscu.",
      stats: [["45", "enterprise"], ["25", "AI i agenci"], ["5", "studio produktowe"]],
      link: "Poznaj cały zespół",
    },
    contact: {
      kicker: "Pierwszy krok zajmuje 30 minut",
      title: "Porozmawiajmy o procesie, który Państwa spowalnia.",
      text: "Wspólnie ustalimy, czy warto zastosować automatyzację, integrację lub zmianę systemu — i co najpierw potwierdzić.",
      primary: "Umówmy 30-minutową rozmowę",
      secondary: "Wyślij e-mail",
    },
    footer: {
      headline: "Czas wejść do świata automatyzacji. Wystarczy jeden klik.",
      contactHeading: "Pytania?",
      menuHeading: "Menu",
      solutionsHeading: "Rozwiązania",
      socialHeading: "Bądź na bieżąco",
      solutions: [
        ["Faktury do księgowości", "reseni-faktury.html"],
        ["Zamówienia z e-maili", "reseni-objednavky.html"],
        ["Reklamacje", "reseni-reklamace.html"],
        ["Magazyn bez papierów", "reseni-sklad-bez-papiru.html"],
        ["Ewidencja obecności", "reseni-dochazka.html"],
        ["Zatwierdzanie urlopów", "reseni-dovolene.html"],
        ["Ewidencja przejazdów", "reseni-kniha-jizd.html"],
        ["Karty pracy", "reseni-pracovni-vykazy.html"],
      ],
      privacy: "Polityka prywatności",
      terms: "Ogólne warunki handlowe",
    },
  },
};
