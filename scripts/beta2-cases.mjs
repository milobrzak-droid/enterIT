/**
 * beta2-cases.mjs — three case studies written to full depth, four languages.
 *
 * Everything factual here is either published (the energy and investment cases
 * ran publicly on superqube.ai with the client's consent before this site
 * anonymised the names) or confirmed by the owner (the manufacturing data
 * platform). Clients are described by typology, never by name — the named
 * reference, with a person you can call, comes to the meeting.
 *
 * What is deliberately NOT here: client quotes and baseline figures we do not
 * have. Each case carries a `quote: null` slot — when a real, attributable
 * quote exists it drops in and the renderer picks it up. Do not fill these
 * with drafted words: an invented quote is checkable with one phone call and
 * takes everything true down with it.
 */

export const casesByLocale = {
  en: {
    eyebrow: "Case studies",
    h1: "Three systems, described to the depth a buyer actually needs.",
    lead: "Scope, architecture, the human approval points and the measured outcome — for one engagement from each kind of work we do. Clients are described by type; the named reference comes to the meeting.",
    meta: "Manufacturing · Energy · Investment management",
    cta: "Discuss a similar system",
    problemLabel: "The situation",
    builtLabel: "What we built",
    runsLabel: "How it runs",
    outcomeLabel: "Measured outcome",
    statusLabel: "Status",
    ndaNote: "Specific figures for this engagement are under NDA. We bring the measured numbers, and the reference behind them, to the meeting.",
    backLabel: "All results →",
    photoAlt: {
      manufacturing: "A document open beside the ERP record it has to reach, on one screen.",
      energy: "Someone from the support team at a customer service portal, headset on.",
      investment: "Analysts and clients around one table, the figures on a laptop between them.",
    },
    cases: [
      {
        id: "manufacturing",
        client: "Manufacturing group", industry: "Manufacturing · ~600 people",
        title: "One governed data and agent layer over Business Central.",
        problem: "Orders, supplier documents, warehouse movements and production data lived in Business Central and around it — in mailboxes, spreadsheets and people's heads. Every report and every daily lookup started with someone reassembling the same numbers, and no two departments were sure they were looking at the same ones.",
        built: [
          "A governed data layer that reads from Business Central, validates against it and writes back safely — one set of numbers under everything.",
          "Document intake: incoming orders and supplier paperwork are extracted and matched to ERP records instead of being retyped.",
          "An agent layer on top for lookups, checks and reporting, working from the same governed data as the people do.",
        ],
        runs: "Writes into the ERP go through validation and defined approval points; every change lands in an audit trail. The people who owned the process still own it — the reassembly work is what disappeared.",
        outcome: null,
        status: "In production, operated under SLA.",
        quote: null,
      },
      {
        id: "energy",
        client: "Energy group", industry: "Energy services",
        title: "87% faster response to new enquiries, around the clock.",
        problem: "New enquiries arrived by chat, email and web forms into a team working business hours. Response times stretched with the queue, and the first qualified conversation often happened days after the first contact — long enough for a prospect to keep shopping.",
        built: [
          "One agent across chat, email and forms, answering from the company's own product database — with the source attached.",
          "Qualification built into the conversation: the agent gathers what sales actually needs before a meeting is worth booking.",
          "Calendar integration: a qualified enquiry leaves with a booked meeting, not a promise of a callback.",
        ],
        runs: "The agent answers what the product data supports and hands anything else to a person, with the full conversation attached. Sensitive commitments stay human.",
        outcome: [
          ["87%", "faster response to a new enquiry"],
          ["24/7", "coverage without growing the team"],
          ["+35%", "qualified meetings booked"],
        ],
        status: "In production.",
        quote: null,
      },
      {
        id: "investment",
        client: "Investment group", industry: "Finance · 100+ portfolio companies",
        title: "Portfolio intelligence over a hundred-plus companies.",
        problem: "Monthly reporting from more than a hundred portfolio companies arrived in a hundred formats. The analyst team spent its capacity collecting and normalising instead of analysing, and questions across the portfolio took days to answer.",
        built: [
          "Automated intake and normalisation of portfolio reporting into one queryable base.",
          "Agentic analysis on top: cross-portfolio questions answered in minutes, with the underlying figures traceable.",
          "Autonomous monitoring that flags deviations instead of waiting for someone to look.",
        ],
        runs: "Analysts direct the questions and own the conclusions; the agent does the collecting, normalising and first-pass analysis they used to lose their week to.",
        outcome: [
          ["10×", "analyst team productivity"],
          ["100+", "companies under one analytical layer"],
        ],
        status: "In production, scaling.",
        quote: null,
      },
    ],
  },

  cs: {
    eyebrow: "Případové studie",
    h1: "Tři systémy, popsané do hloubky, jakou kupující doopravdy potřebuje.",
    lead: "Rozsah, architektura, místa lidského schválení a změřený výsledek — po jedné zakázce z každého typu práce, kterou děláme. Klienty popisujeme typologicky; jmenovitou referenci přineseme na schůzku.",
    meta: "Výroba · Energetika · Správa investic",
    cta: "Probrat podobný systém",
    problemLabel: "Situace",
    builtLabel: "Co jsme postavili",
    runsLabel: "Jak to běží",
    outcomeLabel: "Změřený výsledek",
    statusLabel: "Stav",
    ndaNote: "Konkrétní čísla téhle zakázky jsou pod NDA. Naměřené hodnoty i referenci za nimi přineseme na schůzku.",
    backLabel: "Všechny výsledky →",
    photoAlt: {
      manufacturing: "Dokument otevřený vedle záznamu v ERP, do kterého se má dostat, na jedné obrazovce.",
      energy: "Člověk ze supportu u portálu zákaznické podpory, se sluchátky.",
      investment: "Analytici a klienti u jednoho stolu, čísla na notebooku mezi nimi.",
    },
    cases: [
      {
        id: "manufacturing",
        client: "Výrobní skupina", industry: "Výroba · ~600 lidí",
        title: "Jedna řízená datová a agentní vrstva nad Business Central.",
        problem: "Objednávky, dodavatelské dokumenty, skladové pohyby a výrobní data žily v Business Central a kolem něj — ve schránkách, tabulkách a hlavách lidí. Každý report a každé denní dohledávání začínalo tím, že někdo znovu skládal stejná čísla, a žádná dvě oddělení si nebyla jistá, že se dívají na ta samá.",
        built: [
          "Řízená datová vrstva, která z Business Central čte, ověřuje proti němu a bezpečně zapisuje zpět — jedna sada čísel pod vším.",
          "Příjem dokumentů: příchozí objednávky a dodavatelské papíry se vytěžují a párují na záznamy v ERP místo přepisování.",
          "Agentní vrstva navrchu pro dohledávání, kontroly a reporting — pracuje nad stejnými řízenými daty jako lidé.",
        ],
        runs: "Zápisy do ERP procházejí validací a definovanými schvalovacími body; každá změna končí v auditní stopě. Lidé, kterým proces patřil, ho vlastní dál — zmizela ta skládací práce.",
        outcome: null,
        status: "V produkci, provozováno pod SLA.",
        quote: null,
      },
      {
        id: "energy",
        client: "Energetická skupina", industry: "Energetické služby",
        title: "O 87 % rychlejší reakce na novou poptávku, nepřetržitě.",
        problem: "Nové poptávky přicházely chatem, e-mailem a formuláři do týmu, který pracoval v pracovní době. Reakční doba se natahovala s frontou a první kvalifikovaný rozhovor se často odehrál dny po prvním kontaktu — dost dlouho na to, aby zájemce hledal dál.",
        built: [
          "Jeden agent přes chat, e-mail i formuláře, odpovídá z produktové databáze firmy — a zdroj přikládá.",
          "Kvalifikace zabudovaná do konverzace: agent zjistí, co obchod skutečně potřebuje, než má smysl rezervovat schůzku.",
          "Napojení na kalendář: kvalifikovaná poptávka odchází s rezervovanou schůzkou, ne se slibem, že se ozveme.",
        ],
        runs: "Agent odpovídá na to, co produktová data unesou, a všechno ostatní předá člověku i s celou konverzací. Citlivé závazky zůstávají na lidech.",
        outcome: [
          ["87 %", "rychlejší reakce na novou poptávku"],
          ["24/7", "pokrytí bez navýšení týmu"],
          ["+35 %", "kvalifikovaných schůzek"],
        ],
        status: "V produkci.",
        quote: null,
      },
      {
        id: "investment",
        client: "Investiční skupina", industry: "Finance · 100+ firem v portfoliu",
        title: "Portfoliová inteligence nad více než stovkou firem.",
        problem: "Měsíční reporting od více než sta firem v portfoliu chodil ve stovce formátů. Analytický tým spotřebovával kapacitu sběrem a normalizací místo analýzy a odpověď na otázku napříč portfoliem trvala dny.",
        built: [
          "Automatizovaný příjem a normalizace portfoliového reportingu do jedné dotazovatelné báze.",
          "Agentní analýza navrchu: otázky napříč portfoliem zodpovězené v minutách, s dohledatelnými podklady.",
          "Autonomní monitoring, který hlásí odchylky, místo aby čekal, až se někdo podívá.",
        ],
        runs: "Analytici řídí otázky a vlastní závěry; agent dělá sběr, normalizaci a první průchod analýzy, na kterých dřív ztráceli týden.",
        outcome: [
          ["10×", "produktivita analytického týmu"],
          ["100+", "firem pod jednou analytickou vrstvou"],
        ],
        status: "V produkci, škáluje se.",
        quote: null,
      },
    ],
  },

  de: {
    eyebrow: "Fallstudien",
    h1: "Drei Systeme, beschrieben in der Tiefe, die ein Käufer wirklich braucht.",
    lead: "Umfang, Architektur, die menschlichen Freigabepunkte und das gemessene Ergebnis — je ein Auftrag aus jeder Art unserer Arbeit. Kunden beschreiben wir nach Typ; die namentliche Referenz bringen wir zum Termin mit.",
    meta: "Fertigung · Energie · Investment-Management",
    cta: "Ein ähnliches System besprechen",
    problemLabel: "Die Ausgangslage",
    builtLabel: "Was wir gebaut haben",
    runsLabel: "Wie es läuft",
    outcomeLabel: "Gemessenes Ergebnis",
    statusLabel: "Status",
    ndaNote: "Die konkreten Zahlen dieses Auftrags stehen unter NDA. Die gemessenen Werte und die Referenz dahinter bringen wir zum Termin mit.",
    backLabel: "Alle Ergebnisse →",
    photoAlt: {
      manufacturing: "Ein Dokument neben dem ERP-Datensatz, in den es gehört, auf einem Bildschirm.",
      energy: "Jemand aus dem Support am Kundenserviceportal, mit Headset.",
      investment: "Analysten und Kunden an einem Tisch, die Zahlen auf einem Laptop dazwischen.",
    },
    cases: [
      {
        id: "manufacturing",
        client: "Produktionsgruppe", industry: "Fertigung · ~600 Personen",
        title: "Eine kontrollierte Daten- und Agentenschicht über Business Central.",
        problem: "Bestellungen, Lieferantendokumente, Lagerbewegungen und Produktionsdaten lebten in Business Central und drumherum — in Postfächern, Tabellen und Köpfen. Jeder Report und jede tägliche Suche begann damit, dass jemand dieselben Zahlen neu zusammensetzte, und keine zwei Abteilungen waren sicher, auf dieselben zu schauen.",
        built: [
          "Eine kontrollierte Datenschicht, die aus Business Central liest, dagegen validiert und sicher zurückschreibt — ein Zahlenstand unter allem.",
          "Dokumenteneingang: eingehende Bestellungen und Lieferantenunterlagen werden ausgelesen und mit ERP-Datensätzen abgeglichen statt abgetippt.",
          "Darüber eine Agentenschicht für Suchen, Prüfungen und Reporting — auf denselben kontrollierten Daten wie die Menschen.",
        ],
        runs: "Schreibzugriffe ins ERP laufen durch Validierung und definierte Freigabepunkte; jede Änderung landet im Audit-Trail. Die Prozessverantwortlichen bleiben verantwortlich — verschwunden ist die Zusammensetzarbeit.",
        outcome: null,
        status: "Im Produktivbetrieb, betrieben unter SLA.",
        quote: null,
      },
      {
        id: "energy",
        client: "Energiekonzern", industry: "Energiedienstleistungen",
        title: "87 % schnellere Reaktion auf neue Anfragen, rund um die Uhr.",
        problem: "Neue Anfragen kamen per Chat, E-Mail und Webformular in ein Team mit Geschäftszeiten. Die Reaktionszeit wuchs mit der Warteschlange, und das erste qualifizierte Gespräch fand oft Tage nach dem Erstkontakt statt — lange genug, dass ein Interessent weitersucht.",
        built: [
          "Ein Agent über Chat, E-Mail und Formulare, der aus der Produktdatenbank des Unternehmens antwortet — mit Quellenangabe.",
          "Qualifizierung im Gespräch: Der Agent sammelt, was der Vertrieb wirklich braucht, bevor ein Termin sinnvoll ist.",
          "Kalenderanbindung: Eine qualifizierte Anfrage geht mit gebuchtem Termin, nicht mit einem Rückrufversprechen.",
        ],
        runs: "Der Agent beantwortet, was die Produktdaten tragen, und übergibt alles andere an einen Menschen — mit dem vollständigen Gesprächsverlauf. Sensible Zusagen bleiben menschlich.",
        outcome: [
          ["87 %", "schnellere Reaktion auf neue Anfragen"],
          ["24/7", "Abdeckung ohne Teamwachstum"],
          ["+35 %", "qualifizierte Termine"],
        ],
        status: "Im Produktivbetrieb.",
        quote: null,
      },
      {
        id: "investment",
        client: "Investmentgruppe", industry: "Finanzen · 100+ Portfoliounternehmen",
        title: "Portfolio-Intelligenz über mehr als hundert Unternehmen.",
        problem: "Das Monatsreporting von über hundert Portfoliounternehmen kam in hundert Formaten. Das Analystenteam verbrauchte seine Kapazität mit Sammeln und Normalisieren statt mit Analyse, und Fragen über das Portfolio hinweg dauerten Tage.",
        built: [
          "Automatisierter Eingang und Normalisierung des Portfolioreportings in eine abfragbare Basis.",
          "Agentische Analyse darüber: portfolioweite Fragen in Minuten beantwortet, mit nachvollziehbaren Zahlen.",
          "Autonomes Monitoring, das Abweichungen meldet, statt zu warten, bis jemand hinschaut.",
        ],
        runs: "Die Analysten steuern die Fragen und verantworten die Schlüsse; der Agent übernimmt Sammeln, Normalisieren und die erste Analyse, an denen früher die Woche hing.",
        outcome: [
          ["10×", "Produktivität des Analystenteams"],
          ["100+", "Unternehmen unter einer Analyseschicht"],
        ],
        status: "Im Produktivbetrieb, wird skaliert.",
        quote: null,
      },
    ],
  },

  pl: {
    eyebrow: "Case studies",
    h1: "Trzy systemy, opisane na głębokość, jakiej kupujący naprawdę potrzebuje.",
    lead: "Zakres, architektura, punkty ludzkiego zatwierdzania i zmierzony wynik — po jednym zleceniu z każdego rodzaju naszej pracy. Klientów opisujemy typologicznie; imienną referencję przynosimy na spotkanie.",
    meta: "Produkcja · Energetyka · Zarządzanie inwestycjami",
    cta: "Porozmawiajmy o podobnym systemie",
    problemLabel: "Sytuacja",
    builtLabel: "Co zbudowaliśmy",
    runsLabel: "Jak to działa",
    outcomeLabel: "Zmierzony wynik",
    statusLabel: "Status",
    ndaNote: "Konkretne liczby tego zlecenia są objęte NDA. Zmierzone wartości i stojącą za nimi referencję przynosimy na spotkanie.",
    backLabel: "Wszystkie wyniki →",
    photoAlt: {
      manufacturing: "Dokument otwarty obok rekordu w ERP, do którego ma trafić, na jednym ekranie.",
      energy: "Osoba ze wsparcia przy portalu obsługi klienta, w słuchawkach.",
      investment: "Analitycy i klienci przy jednym stole, liczby na laptopie między nimi.",
    },
    cases: [
      {
        id: "manufacturing",
        client: "Grupa produkcyjna", industry: "Produkcja · ~600 osób",
        title: "Jedna nadzorowana warstwa danych i agentów nad Business Central.",
        problem: "Zamówienia, dokumenty dostawców, ruchy magazynowe i dane produkcyjne żyły w Business Central i wokół niego — w skrzynkach, arkuszach i głowach ludzi. Każdy raport i każde codzienne wyszukiwanie zaczynało się od ponownego składania tych samych liczb, a żadne dwa działy nie były pewne, że patrzą na te same.",
        built: [
          "Nadzorowana warstwa danych, która czyta z Business Central, waliduje względem niego i bezpiecznie zapisuje z powrotem — jeden zestaw liczb pod wszystkim.",
          "Przyjmowanie dokumentów: przychodzące zamówienia i papiery dostawców są odczytywane i parowane z rekordami ERP zamiast przepisywania.",
          "Warstwa agentowa na górze do wyszukiwań, kontroli i raportowania — na tych samych nadzorowanych danych co ludzie.",
        ],
        runs: "Zapisy do ERP przechodzą walidację i zdefiniowane punkty zatwierdzania; każda zmiana ląduje w ścieżce audytu. Właściciele procesu dalej są właścicielami — zniknęła praca składania.",
        outcome: null,
        status: "Na produkcji, utrzymywane w ramach SLA.",
        quote: null,
      },
      {
        id: "energy",
        client: "Grupa energetyczna", industry: "Usługi energetyczne",
        title: "O 87% szybsza reakcja na nowe zapytania, całą dobę.",
        problem: "Nowe zapytania przychodziły czatem, e-mailem i formularzami do zespołu pracującego w godzinach biurowych. Czas reakcji rósł z kolejką, a pierwsza kwalifikowana rozmowa odbywała się często kilka dni po pierwszym kontakcie — wystarczająco długo, żeby zainteresowany szukał dalej.",
        built: [
          "Jeden agent przez czat, e-mail i formularze, odpowiadający z bazy produktowej firmy — z załączonym źródłem.",
          "Kwalifikacja wbudowana w rozmowę: agent zbiera to, czego sprzedaż naprawdę potrzebuje, zanim warto rezerwować spotkanie.",
          "Integracja z kalendarzem: kwalifikowane zapytanie wychodzi z zarezerwowanym spotkaniem, nie z obietnicą oddzwonienia.",
        ],
        runs: "Agent odpowiada na to, co unoszą dane produktowe, a resztę przekazuje człowiekowi — z całą rozmową. Wrażliwe zobowiązania zostają przy ludziach.",
        outcome: [
          ["87%", "szybsza reakcja na nowe zapytanie"],
          ["24/7", "pokrycie bez powiększania zespołu"],
          ["+35%", "kwalifikowanych spotkań"],
        ],
        status: "Na produkcji.",
        quote: null,
      },
      {
        id: "investment",
        client: "Grupa inwestycyjna", industry: "Finanse · 100+ spółek portfelowych",
        title: "Inteligencja portfelowa nad ponad setką spółek.",
        problem: "Miesięczny reporting od ponad stu spółek portfelowych przychodził w stu formatach. Zespół analityków zużywał moce na zbieranie i normalizację zamiast na analizę, a odpowiedź na pytanie w poprzek portfela zajmowała dni.",
        built: [
          "Zautomatyzowane przyjmowanie i normalizacja reportingu portfelowego do jednej przeszukiwalnej bazy.",
          "Analiza agentowa na górze: pytania w poprzek portfela z odpowiedzią w minutach, z policzalnymi podstawami.",
          "Autonomiczny monitoring, który zgłasza odchylenia, zamiast czekać, aż ktoś spojrzy.",
        ],
        runs: "Analitycy kierują pytaniami i są właścicielami wniosków; agent robi zbieranie, normalizację i pierwszy przebieg analizy, na których wcześniej schodził tydzień.",
        outcome: [
          ["10×", "produktywność zespołu analityków"],
          ["100+", "spółek pod jedną warstwą analityczną"],
        ],
        status: "Na produkcji, w fazie skalowania.",
        quote: null,
      },
    ],
  },
};
