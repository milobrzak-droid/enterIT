/**
 * beta2-copy.mjs — the board's own voice.
 *
 * The production content modules are written for the live site and are shared
 * with beta1, so they cannot be re-voiced without changing pages that are
 * already out there. This module is beta2's own layer: it overrides the copy
 * the reader actually reads first — the hero, every chapter head, the three
 * disciplines, the four stages, the three guarantees and every call to action.
 * Anything not overridden here still comes from the production modules, so the
 * eight routines, the integration groups and the team keep one source of truth.
 *
 * Voice, per the brand manual's tone of voice (section 9): friendly,
 * encouraging, human, optimistic — "Mluvíme lidsky. Dodáváme výsledky."
 * In practice, on an enterprise board, that means:
 *
 *   - say the thing the reader is actually worried about, in their words
 *   - one idea per sentence, and the sentence ends when the idea does
 *   - name what we do, not what we "enable" or "leverage"
 *   - confidence comes from specifics — a number, a system, a named person —
 *     never from adjectives about ourselves
 *   - it is fine to be warm; it is not fine to be vague
 */

export const voice = {
  cs: {
    hero: {
      h1: "Performance AI tým. Stavíme agenty a automatizace, které jedou v ostrém provozu.",
      lead: "Sofistikované automatizace, AI agenti a řešení na míru — postavené přímo do systémů, které už máte, a pak námi provozované. Ne pilot, ne demo. Přes 120 projektů v ostrém provozu, od vytěžování faktur po agentní vrstvu nad Business Central.",
      note: "120+ projektů v ostrém provozu · 60+ napojených systémů · 75 lidí pod jednou smlouvou",
    },
    chapters: [
      {
        kicker: "Co stavíme",
        title: "Postavíme to. A pak to s vámi provozujeme.",
        ask: "Máte proces, který stojí víc, než by měl. Zvládneme ho celý — od návrhu přes kód až po pondělní ráno v provozu. Tři disciplíny, jeden tým, jedno telefonní číslo.",
      },
      {
        kicker: "Hotová řešení",
        title: "Začněte tím, co vás štve nejvíc.",
        ask: "Nic z toho není raketová věda a většinu už jsme jednou postavili. Najděte svou rutinu a rovnou uvidíte, co do ní leze a co z ní vypadne ven.",
      },
      {
        kicker: "Dodaná práce",
        title: "Tohle běží. Dnes, u skutečných klientů.",
        ask: "Žádné sliby, jen systémy v ostrém provozu a čísla, která jsme naměřili. Jmenovité případovky dodal tým Enter Agents se souhlasem klienta; u anonymizovaných doložíme odpovídající referenci na schůzce.",
      },
      {
        kicker: "Jak pracujeme",
        title: "Nejdřív důkaz. Velké peníze až potom.",
        ask: "Nikdo u nás neplatí rok za experiment. Každá fáze má konec, výstup a rozhodnutí — a v každé z nich můžete říct dost.",
      },
      {
        kicker: "Integrace",
        title: "Nemusíte měnit nic z toho, co máte.",
        ask: "Váš stack zůstává, jak je. Napojíme se přes API, databázi nebo soubory — a když nic z toho není, tak i přes obrazovku. Zvládli jsme to u víc než 60 systémů, včetně pořádných veteránů.",
      },
      {
        kicker: "Provoz a záruky",
        title: "Po spuštění nezmizíme.",
        ask: "Tohle je ta část, kterou většina dodavatelů radši přeskočí: kdo drží službu v běhu, komu patří kód a co se stane, když se rozhodnete odejít. Máme to ve smlouvě, ne v prezentaci.",
      },
      {
        kicker: "Kdo jsme",
        title: "75 lidí, tři týmy, jedno jméno pod tím.",
        ask: "Není to síť externistů. Je to jedna firma, jedna smlouva a konkrétní člověk, který to zvedne, když v sedm ráno něco spadne.",
      },
      {
        kicker: "Váš krok",
        title: "Řekněte nám, co vás brzdí.",
        ask: "Můžete si to napřed spočítat sami, nebo se rovnou zeptat. Půl hodiny stačí na to, abychom vám na rovinu řekli, jestli se do toho vyplatí jít.",
      },
    ],
    disciplines: [
      { title: "Sofistikované automatizace", text: "Rutina, která dnes žere lidem hodiny, běží sama. Výjimky jdou na člověka — a přesně tam, kde je potřeba.",
        list: ["Doklady rovnou do ERP", "CRM a ERP v jednom rytmu", "Schvalování s auditní stopou"] },
      { title: "AI agenti v provozu", text: "Agent dostane cíl, hranice a nástroje a sám volí kroky. Citlivé věci schvaluje člověk a každý zásah je dohledatelný.",
        list: ["Vytěžování dokumentů a e-mailů", "Znalostní agenti, kteří citují zdroj", "Reporting nad ERP běžnou řečí"] },
      { title: "Řešení na míru", text: "Když krabicový software nestačí: vlastní aplikace, integrační a datová vrstva — a provoz, který za to ručí i po spuštění.",
        list: ["Vlastní aplikace a portály", "Integrace i na systémy bez API", "Provoz pod SLA s konkrétním vlastníkem"] },
    ],
    stages: [
      { title: "Najdeme, kde to opravdu drhne", text: "Zmapujeme objem práce, výjimky, data a to, co vás dnešní postup reálně stojí." },
      { title: "Spočítáme, jestli se to vyplatí", text: "Výchozí stav, očekávaná úspora, rizika a jasná podmínka, kdy je pilot úspěšný." },
      { title: "Postavíme pilot na ostrých datech", text: "Napojíme ho na skutečné systémy a přínos změříme na skutečné práci, ne na demu." },
      { title: "Převezmeme provoz", text: "Monitoring, bezpečnost, SLA i další rozvoj. Má to konkrétního vlastníka a ten se jmenuje." },
    ],
    ops: [
      { title: "Ručíme za běh", text: "Dostupnost, reakční doby, dohled 24/7, zálohy i aktualizace pod jedním SLA." },
      { title: "Kód a data jsou vaše", text: "Ve smlouvě je černé na bílém, komu patří kód, data i dokumentace — a jak proběhne předání, kdybychom skončili." },
      { title: "Bezpečnost řešíme v návrhu", text: "EU cloud nebo on-premise, šifrování, role, oprávnění a auditní stopa, kterou přečte i auditor." },
    ],
    labels: {
      stepLabel: "Fáze",
      proofLabel: "Firma ve třech číslech",
      leadersEyebrow: "Vedení",
      buildGo: "Tři disciplíny, jeden tým →",
      solutionsGo: "Všech osm rutin →",
      processGo: "Čtyři fáze detailně →",
      systemsGo: "Celý přehled systémů →",
      opsGo: "Podmínky a SLA →",
      teamGo: "Poznat celý tým →",
      roiGo: "Otevřít kalkulačku →",
      selfGo: "Zjistit svou úroveň →",
      reachGo: "Partnerství pro US →",
      hiringGo: "Volné pozice →",
      agentsGo: "Jak stavíme agenty →",
      selfEyebrow: "Firma 2030 · sebehodnocení",
      selfTitle: "Kde je vaše firma na cestě k agentnímu provozu?",
      selfSub: "Pět úrovní zralosti a jeden praktický krok, který vás posune na další.",
      reachEyebrow: "Za hranice Česka",
      reachTitle: "Evropský dodavatelský partner.",
      reachSub: "Americké konzultanty, Microsoft partnery a systémové integrátory obsluhujeme jako jejich engineering zázemí v Evropě.",
      hiringPill: "Hledáme lidi",
      hiringTitle: "Stavějte systémy, které opravdu naběhnou.",
      hiringSub: "Žádný hřbitov proof-of-conceptů. Dodáte to do provozu a pak to provozujete.",
      bubbleSay: "Řekněte nám proces, který vás brzdí. Řekneme vám na rovinu, jestli se ho vyplatí automatizovat.",
      startPress: "zmáčkni enter",
      artHint: "Sem přijde fotka",
    },
  },

  en: {
    hero: {
      h1: "A performance AI team. We build agents and automation that survive production.",
      lead: "Sophisticated automation, AI agents and custom-built solutions — put straight into the systems you already run, then operated by us. Not a pilot, not a demo. Over 120 projects live, from invoice extraction to an agent layer on top of Business Central.",
      note: "120+ projects in production · 60+ systems connected · 75 people under one contract",
    },
    chapters: [
      {
        kicker: "What we build",
        title: "We build it. Then we run it with you.",
        ask: "You have a process that costs more than it should. We can take the whole thing — design, code, and Monday morning in production. Three disciplines, one team, one phone number.",
      },
      {
        kicker: "Ready-made solutions",
        title: "Start with whatever annoys you most.",
        ask: "None of this is rocket science and we have built most of it before. Find your routine and you will see straight away what goes in and what comes back out.",
      },
      {
        kicker: "Delivered work",
        title: "This is running. Today, for real clients.",
        ask: "No promises — systems in production and numbers we measured. The named cases were delivered by our Enter Agents team with the client's consent; for the anonymised ones we bring the matching reference to the meeting.",
      },
      {
        kicker: "How we work",
        title: "Proof first. The big money later.",
        ask: "Nobody here pays for a year of experimenting. Every stage has an end, an output and a decision — and at every one of them you can say stop.",
      },
      {
        kicker: "Integrations",
        title: "You do not have to change a thing you already have.",
        ask: "Your stack stays as it is. We connect through the API, the database or the files — and where none of that exists, through the screen. We have done it with more than 60 systems, some of them proper veterans.",
      },
      {
        kicker: "Operations and guarantees",
        title: "We do not disappear at go-live.",
        ask: "This is the part most vendors would rather skip: who keeps the service running, who owns the code, and what happens if you decide to leave. It is in our contract, not in a slide.",
      },
      {
        kicker: "Who we are",
        title: "75 people, three teams, one name on it.",
        ask: "This is not a network of freelancers. It is one company, one contract, and a specific person who picks up when something falls over at seven in the morning.",
      },
      {
        kicker: "Your move",
        title: "Tell us what is slowing you down.",
        ask: "Size it yourself first, or just ask. Half an hour is enough for us to tell you straight whether this is worth doing at all.",
      },
    ],
    disciplines: [
      { title: "Sophisticated automation", text: "The routine that eats your people's hours runs itself. Exceptions go to a person, exactly where a person is needed.",
        list: ["Documents straight into the ERP", "CRM and ERP in step", "Approvals with an audit trail"] },
      { title: "AI agents in production", text: "An agent gets a goal, a boundary and a set of tools, and picks the steps itself. A human approves anything sensitive, and every action stays traceable.",
        list: ["Document and email extraction", "Knowledge agents that cite the source", "Plain-language reporting over the ERP"] },
      { title: "Custom-built solutions", text: "For where off-the-shelf software runs out: your own application, the integration and data layer under it, and operations that answer for it after launch.",
        list: ["Your own applications and portals", "Integration even where there is no API", "Operations under SLA, with a named owner"] },
    ],
    stages: [
      { title: "Find where it actually hurts", text: "We map the volume of work, the exceptions, the data, and what today's way of doing it really costs you." },
      { title: "Work out whether it pays", text: "Baseline, expected saving, risks, and a clear condition for calling the pilot a success." },
      { title: "Build the pilot on real data", text: "We connect it to the real systems and measure the benefit on real work, not on a demo." },
      { title: "Take over operations", text: "Monitoring, security, SLA and further development. It has a specific owner, and that owner has a name." },
    ],
    ops: [
      { title: "We answer for uptime", text: "Availability, response times, 24/7 monitoring, backups and updates, all under one SLA." },
      { title: "The code and the data are yours", text: "The contract says in plain words who owns the code, the data and the documentation — and how handover works if we ever stop." },
      { title: "Security is part of the design", text: "EU cloud or on-premise, encryption, roles, permissions, and an audit trail your auditor can actually read." },
    ],
    labels: {
      stepLabel: "Stage",
      proofLabel: "The house, in three numbers",
      leadersEyebrow: "Leadership",
      buildGo: "Three disciplines, one team →",
      solutionsGo: "All eight routines →",
      processGo: "The four stages in detail →",
      systemsGo: "The whole catalogue →",
      opsGo: "Terms and SLA →",
      teamGo: "Meet the whole team →",
      roiGo: "Open the calculator →",
      selfGo: "Find your level →",
      reachGo: "US partnership →",
      hiringGo: "Open roles →",
      agentsGo: "How we build agents →",
      selfEyebrow: "Firma 2030 · self-check",
      selfTitle: "Where is your company on the agentic road?",
      selfSub: "Five maturity levels, and the one practical step that moves you to the next.",
      reachEyebrow: "Beyond Czechia",
      reachTitle: "A European delivery partner.",
      reachSub: "US consultancies, Microsoft partners and systems integrators use us as their engineering bench in Europe.",
      hiringPill: "We are hiring",
      hiringTitle: "Build systems that actually go live.",
      hiringSub: "No proof-of-concept graveyard. You ship it to production and then you run it.",
      bubbleSay: "Tell us the process that is slowing your team down. We will tell you straight whether it is worth automating.",
      startPress: "press enter",
      artHint: "Photo goes here",
    },
  },

  de: {
    hero: {
      h1: "Ein Performance-KI-Team. Wir bauen Agenten und Automatisierung, die den Echtbetrieb überstehen.",
      lead: "Anspruchsvolle Automatisierung, KI-Agenten und maßgeschneiderte Lösungen — direkt in die Systeme gebaut, die Sie schon betreiben, und danach von uns betrieben. Kein Pilot, keine Demo. Über 120 Projekte im Echtbetrieb, von der Rechnungsextraktion bis zur Agentenschicht über Business Central.",
      note: "120+ Projekte im Echtbetrieb · 60+ angebundene Systeme · 75 Personen unter einem Vertrag",
    },
    chapters: [
      {
        kicker: "Was wir bauen",
        title: "Wir bauen es. Und betreiben es dann mit Ihnen.",
        ask: "Sie haben einen Prozess, der mehr kostet als nötig. Wir übernehmen ihn ganz — Entwurf, Code und der Montagmorgen im Betrieb. Drei Disziplinen, ein Team, eine Telefonnummer.",
      },
      {
        kicker: "Fertige Lösungen",
        title: "Fangen Sie mit dem an, was Sie am meisten stört.",
        ask: "Nichts davon ist Raketenwissenschaft, und das meiste haben wir schon gebaut. Finden Sie Ihre Routine, und Sie sehen sofort, was hineingeht und was herauskommt.",
      },
      {
        kicker: "Gelieferte Arbeit",
        title: "Das läuft. Heute, bei echten Kunden.",
        ask: "Keine Versprechen — Systeme im Echtbetrieb und Zahlen, die wir gemessen haben. Die namentlichen Fallstudien hat unser Team Enter Agents mit Zustimmung der Kunden geliefert; zu den anonymisierten bringen wir die passende Referenz zum Termin mit.",
      },
      {
        kicker: "So arbeiten wir",
        title: "Erst der Beweis. Das große Geld danach.",
        ask: "Bei uns zahlt niemand ein Jahr lang für ein Experiment. Jede Phase hat ein Ende, ein Ergebnis und eine Entscheidung — und in jeder können Sie Schluss sagen.",
      },
      {
        kicker: "Integrationen",
        title: "Sie müssen nichts ändern, was Sie schon haben.",
        ask: "Ihr Stack bleibt, wie er ist. Wir binden über API, Datenbank oder Dateien an — und wo es nichts davon gibt, über die Oberfläche. Bei über 60 Systemen hat das geklappt, darunter echte Veteranen.",
      },
      {
        kicker: "Betrieb und Garantien",
        title: "Nach dem Go-live verschwinden wir nicht.",
        ask: "Das ist der Teil, den die meisten Anbieter lieber überspringen: wer den Dienst am Laufen hält, wem der Code gehört und was passiert, wenn Sie gehen wollen. Bei uns steht das im Vertrag, nicht auf einer Folie.",
      },
      {
        kicker: "Wer wir sind",
        title: "75 Menschen, drei Teams, ein Name darunter.",
        ask: "Kein Netzwerk von Freelancern. Ein Unternehmen, ein Vertrag und eine konkrete Person, die abnimmt, wenn morgens um sieben etwas ausfällt.",
      },
      {
        kicker: "Ihr Zug",
        title: "Sagen Sie uns, was Sie ausbremst.",
        ask: "Rechnen Sie es zuerst selbst durch oder fragen Sie einfach. Eine halbe Stunde reicht, damit wir Ihnen offen sagen, ob sich das überhaupt lohnt.",
      },
    ],
    disciplines: [
      { title: "Anspruchsvolle Automatisierung", text: "Die Routine, die Ihren Leuten heute Stunden frisst, läuft von selbst. Ausnahmen gehen an einen Menschen — genau dort, wo einer gebraucht wird.",
        list: ["Belege direkt ins ERP", "CRM und ERP im Gleichtakt", "Freigaben mit Audit-Trail"] },
      { title: "KI-Agenten im Echtbetrieb", text: "Ein Agent bekommt ein Ziel, eine Grenze und Werkzeuge und wählt die Schritte selbst. Sensibles genehmigt ein Mensch, jede Aktion bleibt nachvollziehbar.",
        list: ["Dokumenten- und E-Mail-Extraktion", "Wissensagenten, die die Quelle nennen", "Reporting über das ERP in normaler Sprache"] },
      { title: "Maßgeschneiderte Lösungen", text: "Für den Punkt, an dem Standardsoftware endet: eigene Anwendung, die Integrations- und Datenschicht darunter, und ein Betrieb, der auch danach dafür haftet.",
        list: ["Eigene Anwendungen und Portale", "Integration auch ohne API", "Betrieb unter SLA, mit benanntem Eigentümer"] },
    ],
    stages: [
      { title: "Finden, wo es wirklich weh tut", text: "Wir erfassen Arbeitsvolumen, Ausnahmen, Daten und das, was der heutige Weg Sie tatsächlich kostet." },
      { title: "Ausrechnen, ob es sich lohnt", text: "Ausgangslage, erwartete Einsparung, Risiken und eine klare Bedingung, wann der Pilot erfolgreich ist." },
      { title: "Den Piloten auf echten Daten bauen", text: "Wir binden ihn an die echten Systeme an und messen den Nutzen an echter Arbeit, nicht an einer Demo." },
      { title: "Den Betrieb übernehmen", text: "Monitoring, Sicherheit, SLA und Weiterentwicklung. Es gibt einen konkreten Eigentümer, und der hat einen Namen." },
    ],
    ops: [
      { title: "Wir haften für den Betrieb", text: "Verfügbarkeit, Reaktionszeiten, Überwachung rund um die Uhr, Backups und Updates unter einem SLA." },
      { title: "Code und Daten gehören Ihnen", text: "Im Vertrag steht im Klartext, wem Code, Daten und Dokumentation gehören — und wie die Übergabe abläuft, falls wir aufhören." },
      { title: "Sicherheit gehört in den Entwurf", text: "EU-Cloud oder on-premise, Verschlüsselung, Rollen, Berechtigungen und ein Audit-Trail, den Ihr Prüfer wirklich lesen kann." },
    ],
    labels: {
      stepLabel: "Phase",
      proofLabel: "Das Haus in drei Zahlen",
      leadersEyebrow: "Führung",
      buildGo: "Drei Disziplinen, ein Team →",
      solutionsGo: "Alle acht Routinen →",
      processGo: "Die vier Phasen im Detail →",
      systemsGo: "Der ganze Katalog →",
      opsGo: "Bedingungen und SLA →",
      teamGo: "Das ganze Team →",
      roiGo: "Rechner öffnen →",
      selfGo: "Stufe ermitteln →",
      reachGo: "US-Partnerschaft →",
      hiringGo: "Offene Stellen →",
      agentsGo: "Wie wir Agenten bauen →",
      selfEyebrow: "Firma 2030 · Selbstcheck",
      selfTitle: "Wo steht Ihr Unternehmen auf dem Weg zum agentischen Betrieb?",
      selfSub: "Fünf Reifegrade und der eine praktische Schritt zur nächsten Stufe.",
      reachEyebrow: "Über Tschechien hinaus",
      reachTitle: "Ein europäischer Delivery-Partner.",
      reachSub: "US-Beratungen, Microsoft-Partner und Systemintegratoren nutzen uns als ihre Engineering-Bank in Europa.",
      hiringPill: "Wir stellen ein",
      hiringTitle: "Systeme bauen, die wirklich live gehen.",
      hiringSub: "Kein Proof-of-Concept-Friedhof. Sie liefern es in den Betrieb und betreiben es dann.",
      bubbleSay: "Nennen Sie uns den Prozess, der Ihr Team bremst. Wir sagen Ihnen offen, ob sich Automatisierung lohnt.",
      startPress: "Enter drücken",
      artHint: "Hier kommt ein Foto",
    },
  },

  pl: {
    hero: {
      h1: "Performance AI team. Budujemy agentów i automatyzacje, które wytrzymują produkcję.",
      lead: "Zaawansowane automatyzacje, agenci AI i rozwiązania szyte na miarę — wbudowane prosto w systemy, których już używacie, a potem utrzymywane przez nas. Nie pilot, nie demo. Ponad 120 projektów na produkcji, od ekstrakcji faktur po warstwę agentową nad Business Central.",
      note: "120+ projektów na produkcji · 60+ podłączonych systemów · 75 osób pod jedną umową",
    },
    chapters: [
      {
        kicker: "Co budujemy",
        title: "Zbudujemy to. A potem utrzymujemy razem z wami.",
        ask: "Macie proces, który kosztuje więcej, niż powinien. Weźmiemy go w całości — projekt, kod i poniedziałkowy poranek na produkcji. Trzy dyscypliny, jeden zespół, jeden numer telefonu.",
      },
      {
        kicker: "Gotowe rozwiązania",
        title: "Zacznijcie od tego, co najbardziej irytuje.",
        ask: "Nic z tego nie jest fizyką jądrową, a większość już kiedyś zbudowaliśmy. Znajdźcie swoją rutynę, a od razu zobaczycie, co do niej wchodzi i co z niej wychodzi.",
      },
      {
        kicker: "Dostarczona praca",
        title: "To działa. Dziś, u prawdziwych klientów.",
        ask: "Żadnych obietnic — systemy na produkcji i liczby, które zmierzyliśmy. Case studies z nazwy dostarczył nasz zespół Enter Agents za zgodą klientów; do zanonimizowanych przynosimy odpowiednią referencję na spotkanie.",
      },
      {
        kicker: "Jak pracujemy",
        title: "Najpierw dowód. Duże pieniądze później.",
        ask: "Nikt u nas nie płaci przez rok za eksperyment. Każdy etap ma koniec, wynik i decyzję — i na każdym możecie powiedzieć dość.",
      },
      {
        kicker: "Integracje",
        title: "Nie musicie zmieniać niczego, co już macie.",
        ask: "Wasz stack zostaje taki, jaki jest. Podłączymy się przez API, bazę albo pliki — a gdy nie ma nic z tego, przez ekran. Udało się to przy ponad 60 systemach, w tym prawdziwych weteranach.",
      },
      {
        kicker: "Utrzymanie i gwarancje",
        title: "Po wdrożeniu nie znikamy.",
        ask: "To ta część, którą większość dostawców woli pominąć: kto utrzymuje usługę, do kogo należy kod i co się stanie, gdy zdecydujecie się odejść. U nas jest to w umowie, nie na slajdzie.",
      },
      {
        kicker: "Kim jesteśmy",
        title: "75 osób, trzy zespoły, jedno nazwisko pod tym.",
        ask: "To nie sieć freelancerów. To jedna firma, jedna umowa i konkretna osoba, która odbierze, gdy o siódmej rano coś padnie.",
      },
      {
        kicker: "Wasz ruch",
        title: "Powiedzcie nam, co was spowalnia.",
        ask: "Policzcie to najpierw sami albo po prostu zapytajcie. Pół godziny wystarczy, żebyśmy powiedzieli wprost, czy w ogóle warto.",
      },
    ],
    disciplines: [
      { title: "Zaawansowane automatyzacje", text: "Rutyna, która dziś zjada waszym ludziom godziny, działa sama. Wyjątki idą do człowieka — dokładnie tam, gdzie jest potrzebny.",
        list: ["Dokumenty prosto do ERP", "CRM i ERP w jednym rytmie", "Zatwierdzanie ze ścieżką audytu"] },
      { title: "Agenci AI na produkcji", text: "Agent dostaje cel, granice i narzędzia i sam wybiera kroki. Wrażliwe rzeczy zatwierdza człowiek, a każde działanie zostaje prześledzone.",
        list: ["Ekstrakcja dokumentów i e-maili", "Agenci wiedzy, którzy cytują źródło", "Raportowanie nad ERP zwykłym językiem"] },
      { title: "Rozwiązania szyte na miarę", text: "Tam, gdzie kończy się pudełkowe oprogramowanie: własna aplikacja, warstwa integracji i danych pod nią, i utrzymanie, które odpowiada za to po starcie.",
        list: ["Własne aplikacje i portale", "Integracja nawet bez API", "Utrzymanie w SLA, z imiennym właścicielem"] },
    ],
    stages: [
      { title: "Znajdujemy, gdzie naprawdę boli", text: "Mapujemy wolumen pracy, wyjątki, dane i to, ile dzisiejszy sposób naprawdę was kosztuje." },
      { title: "Liczymy, czy się opłaca", text: "Punkt wyjścia, oczekiwana oszczędność, ryzyka i jasny warunek, kiedy pilot jest udany." },
      { title: "Budujemy pilota na prawdziwych danych", text: "Podłączamy go do prawdziwych systemów i mierzymy korzyść na prawdziwej pracy, nie na demie." },
      { title: "Przejmujemy utrzymanie", text: "Monitoring, bezpieczeństwo, SLA i dalszy rozwój. Ma to konkretnego właściciela, a ten właściciel ma imię." },
    ],
    ops: [
      { title: "Odpowiadamy za działanie", text: "Dostępność, czasy reakcji, nadzór 24/7, kopie zapasowe i aktualizacje w ramach jednego SLA." },
      { title: "Kod i dane są wasze", text: "W umowie stoi czarno na białym, do kogo należy kod, dane i dokumentacja — i jak wygląda przekazanie, gdybyśmy skończyli." },
      { title: "Bezpieczeństwo projektujemy od początku", text: "Chmura UE albo on-premise, szyfrowanie, role, uprawnienia i ścieżka audytu, którą audytor naprawdę przeczyta." },
    ],
    labels: {
      stepLabel: "Etap",
      proofLabel: "Firma w trzech liczbach",
      leadersEyebrow: "Kierownictwo",
      buildGo: "Trzy dyscypliny, jeden zespół →",
      solutionsGo: "Wszystkie osiem rutyn →",
      processGo: "Cztery etapy szczegółowo →",
      systemsGo: "Cały katalog →",
      opsGo: "Warunki i SLA →",
      teamGo: "Poznaj cały zespół →",
      roiGo: "Otwórz kalkulator →",
      selfGo: "Sprawdź swój poziom →",
      reachGo: "Partnerstwo dla USA →",
      hiringGo: "Otwarte role →",
      agentsGo: "Jak budujemy agentów →",
      selfEyebrow: "Firma 2030 · samoocena",
      selfTitle: "Gdzie jest Twoja firma na drodze do operacji agentowych?",
      selfSub: "Pięć poziomów dojrzałości i jeden praktyczny krok na wyższy.",
      reachEyebrow: "Poza Czechami",
      reachTitle: "Europejski partner wdrożeniowy.",
      reachSub: "Amerykańskie konsultingi, partnerzy Microsoftu i integratorzy korzystają z nas jako zaplecza inżynierskiego w Europie.",
      hiringPill: "Rekrutujemy",
      hiringTitle: "Buduj systemy, które naprawdę ruszają.",
      hiringSub: "Żadnego cmentarza proof-of-conceptów. Wdrażasz na produkcję i potem to utrzymujesz.",
      bubbleSay: "Powiedzcie nam, który proces was spowalnia. Powiemy wprost, czy warto go automatyzować.",
      startPress: "naciśnij enter",
      artHint: "Tu wejdzie zdjęcie",
    },
  },
};
