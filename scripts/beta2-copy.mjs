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
      h1: "Performance AI tým, který dodává do provozu.",
      lead: "Baví nás úlohy, které je potřeba rozlousknout — a rádi na nich pracujeme. Od komplexní agentní platformy po jednoho agenta: postavíme to do systémů, které už máte, a pak to provozujeme. Ne pilot, ne demo.",
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
        title: "Systémy, které se přizpůsobují lidem.",
        ask: "Tohle běží u klientů a dělá svou práci. Nikdo se kvůli tomu nemusel přeučovat na nový nástroj — systém se ohnul podle toho, jak lidé pracují, ne naopak. Čísla níž jsou naměřená z provozu; jmenovité případovky dodal tým Enter Agents se souhlasem klienta.",
      },
      {
        kicker: "Jak pracujeme",
        title: "Nejdřív důkaz. Velké peníze až potom.",
        ask: "První dvě fáze jsou otázka týdnů. Pilot je čtyři týdny až několik měsíců podle toho, kolik systémů a výjimek ten proces doopravdy má — a radši to řekneme dopředu než v půlce. Každá fáze má konec, výstup a rozhodnutí, takže v každé z nich můžete říct dost.",
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
      { title: "Najdeme, kde to opravdu drhne", text: "Zmapujeme objem práce, výjimky, data a to, co vás dnešní postup reálně stojí." , time: "1–2 týdny" },
      { title: "Spočítáme, jestli se to vyplatí", text: "Výchozí stav, očekávaná úspora, rizika a jasná podmínka, kdy je pilot úspěšný." , time: "2–3 týdny" },
      { title: "Postavíme pilot na ostrých datech", text: "Napojíme ho na skutečné systémy a přínos změříme na skutečné práci, ne na demu." , time: "4 týdny až několik měsíců" },
      { title: "Převezmeme provoz", text: "Monitoring, bezpečnost, SLA i další rozvoj. Má to konkrétního vlastníka a ten se jmenuje." , time: "průběžně, roky" },
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
      clientsLabel: "Vybraní klienti",
      partnersLabel: "Partneři",
      facesLabel: "Lidé, kteří to staví",
      teamGo: "Poznat celý tým →",
      roiGo: "Otevřít kalkulačku →",
      selfGo: "Zjistit svou úroveň →",
      reachGo: "Partnerství pro US →",
      hiringGo: "Volné pozice →",
      agentsGo: "Jak stavíme agenty →",
      selfEyebrow: "Firma 2030 · sebehodnocení",
      selfTitle: "Kde je vaše firma na cestě k agentnímu provozu?",
      selfSub: "Pět úrovní zralosti a jeden praktický krok, který vás posune na další.",
      reachEyebrow: "EU delivery partner",
      reachTitle: "Dodáváme kamkoli na světě. V evropské kvalitě.",
      reachSub: "Za námi stojí reference evropských enterprise firem i menších a středních podniků — a s obojím máme hluboké zkušenosti. Upřímně: baví nás to.",
      reachList: ["Tři týmy, každý na svou oblast", "Evropské standardy, evropská data", "Časové pásmo řešíme, ne omlouváme"],
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
      h1: "A performance AI team that ships to production.",
      lead: "We like the problems that have to be cracked, and we enjoy the work. From a complex agentic platform down to a single agent: built into the systems you already run, then operated by us. Not a pilot, not a demo.",
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
        title: "Systems that adapt to people.",
        ask: "This runs at our clients and does its job. Nobody had to relearn their work around a new tool — the system bent to the way people already work, not the other way round. The numbers below are measured in production; the named cases were delivered by our Enter Agents team with the client's consent.",
      },
      {
        kicker: "How we work",
        title: "Proof first. The big money later.",
        ask: "The first two stages are a matter of weeks. The pilot is four weeks to several months depending on how many systems and exception paths the process really has — and we would rather say that now than halfway through. Every stage has an end, an output and a decision, so at every one of them you can say stop.",
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
      { title: "Find where it actually hurts", text: "We map the volume of work, the exceptions, the data, and what today's way of doing it really costs you." , time: "1–2 weeks" },
      { title: "Work out whether it pays", text: "Baseline, expected saving, risks, and a clear condition for calling the pilot a success." , time: "2–3 weeks" },
      { title: "Build the pilot on real data", text: "We connect it to the real systems and measure the benefit on real work, not on a demo." , time: "4 weeks to several months" },
      { title: "Take over operations", text: "Monitoring, security, SLA and further development. It has a specific owner, and that owner has a name." , time: "ongoing, for years" },
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
      clientsLabel: "Selected clients",
      partnersLabel: "Partners",
      facesLabel: "The people who build it",
      teamGo: "Meet the whole team →",
      roiGo: "Open the calculator →",
      selfGo: "Find your level →",
      reachGo: "US partnership →",
      hiringGo: "Open roles →",
      agentsGo: "How we build agents →",
      selfEyebrow: "Firma 2030 · self-check",
      selfTitle: "Where is your company on the agentic road?",
      selfSub: "Five maturity levels, and the one practical step that moves you to the next.",
      reachEyebrow: "EU delivery partner",
      reachTitle: "We deliver anywhere in the world. At European quality.",
      reachSub: "Behind us are European enterprise references and small and mid-sized ones too — and we have deep experience with both. Honestly: we enjoy it.",
      reachList: ["Three teams, each for its own domain", "European standards, European data", "We solve the time zone rather than apologize for it"],
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
      h1: "Ein Performance-KI-Team, das in den Betrieb liefert.",
      lead: "Uns reizen die Aufgaben, die man erst knacken muss — und wir arbeiten gern daran. Von der komplexen Agentenplattform bis zum einzelnen Agenten: gebaut in die Systeme, die Sie schon betreiben, und danach von uns betrieben. Kein Pilot, keine Demo.",
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
        title: "Systeme, die sich den Menschen anpassen.",
        ask: "Das läuft bei unseren Kunden und tut seine Arbeit. Niemand musste sich auf ein neues Werkzeug umgewöhnen — das System hat sich danach gerichtet, wie die Leute ohnehin arbeiten, nicht umgekehrt. Die Zahlen unten sind im Betrieb gemessen; die namentlichen Fallstudien lieferte unser Team Enter Agents mit Zustimmung der Kunden.",
      },
      {
        kicker: "So arbeiten wir",
        title: "Erst der Beweis. Das große Geld danach.",
        ask: "Die ersten beiden Phasen sind eine Frage von Wochen. Der Pilot dauert vier Wochen bis mehrere Monate, je nachdem wie viele Systeme und Ausnahmen der Prozess wirklich hat — und das sagen wir lieber jetzt als auf halbem Weg. Jede Phase hat ein Ende, ein Ergebnis und eine Entscheidung, in jeder können Sie Schluss sagen.",
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
      { title: "Finden, wo es wirklich weh tut", text: "Wir erfassen Arbeitsvolumen, Ausnahmen, Daten und das, was der heutige Weg Sie tatsächlich kostet." , time: "1–2 Wochen" },
      { title: "Ausrechnen, ob es sich lohnt", text: "Ausgangslage, erwartete Einsparung, Risiken und eine klare Bedingung, wann der Pilot erfolgreich ist." , time: "2–3 Wochen" },
      { title: "Den Piloten auf echten Daten bauen", text: "Wir binden ihn an die echten Systeme an und messen den Nutzen an echter Arbeit, nicht an einer Demo." , time: "4 Wochen bis mehrere Monate" },
      { title: "Den Betrieb übernehmen", text: "Monitoring, Sicherheit, SLA und Weiterentwicklung. Es gibt einen konkreten Eigentümer, und der hat einen Namen." , time: "laufend, über Jahre" },
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
      clientsLabel: "Ausgewählte Kunden",
      partnersLabel: "Partner",
      facesLabel: "Die Menschen dahinter",
      teamGo: "Das ganze Team →",
      roiGo: "Rechner öffnen →",
      selfGo: "Stufe ermitteln →",
      reachGo: "US-Partnerschaft →",
      hiringGo: "Offene Stellen →",
      agentsGo: "Wie wir Agenten bauen →",
      selfEyebrow: "Firma 2030 · Selbstcheck",
      selfTitle: "Wo steht Ihr Unternehmen auf dem Weg zum agentischen Betrieb?",
      selfSub: "Fünf Reifegrade und der eine praktische Schritt zur nächsten Stufe.",
      reachEyebrow: "EU Delivery Partner",
      reachTitle: "Wir liefern überall auf der Welt. In europäischer Qualität.",
      reachSub: "Hinter uns stehen Referenzen europäischer Konzerne ebenso wie mittelständischer Unternehmen — mit beidem haben wir tiefe Erfahrung. Ehrlich gesagt: es macht uns Freude.",
      reachList: ["Drei Teams, jedes für sein Gebiet", "Europäische Standards, europäische Daten", "Die Zeitzone lösen wir, statt sie zu entschuldigen"],
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
      h1: "Performance AI team, który dowozi na produkcję.",
      lead: "Lubimy zadania, które trzeba rozgryźć — i chętnie przy nich pracujemy. Od złożonej platformy agentowej po pojedynczego agenta: wbudujemy to w systemy, których już używacie, a potem to utrzymujemy. Nie pilot, nie demo.",
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
        title: "Systemy, które dopasowują się do ludzi.",
        ask: "To działa u naszych klientów i robi swoje. Nikt nie musiał uczyć się od nowa pracy wokół nowego narzędzia — system nagiął się do tego, jak ludzie już pracują, a nie odwrotnie. Liczby poniżej są zmierzone na produkcji; case studies z nazwy dostarczył nasz zespół Enter Agents za zgodą klientów.",
      },
      {
        kicker: "Jak pracujemy",
        title: "Najpierw dowód. Duże pieniądze później.",
        ask: "Pierwsze dwa etapy to kwestia tygodni. Pilot trwa od czterech tygodni do kilku miesięcy, zależnie od tego, ile systemów i wyjątków proces naprawdę ma — i wolimy powiedzieć to teraz niż w połowie. Każdy etap ma koniec, wynik i decyzję, więc na każdym możecie powiedzieć dość.",
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
      { title: "Znajdujemy, gdzie naprawdę boli", text: "Mapujemy wolumen pracy, wyjątki, dane i to, ile dzisiejszy sposób naprawdę was kosztuje." , time: "1–2 tygodnie" },
      { title: "Liczymy, czy się opłaca", text: "Punkt wyjścia, oczekiwana oszczędność, ryzyka i jasny warunek, kiedy pilot jest udany." , time: "2–3 tygodnie" },
      { title: "Budujemy pilota na prawdziwych danych", text: "Podłączamy go do prawdziwych systemów i mierzymy korzyść na prawdziwej pracy, nie na demie." , time: "4 tygodnie do kilku miesięcy" },
      { title: "Przejmujemy utrzymanie", text: "Monitoring, bezpieczeństwo, SLA i dalszy rozwój. Ma to konkretnego właściciela, a ten właściciel ma imię." , time: "na bieżąco, latami" },
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
      clientsLabel: "Wybrani klienci",
      partnersLabel: "Partnerzy",
      facesLabel: "Ludzie, którzy to budują",
      teamGo: "Poznaj cały zespół →",
      roiGo: "Otwórz kalkulator →",
      selfGo: "Sprawdź swój poziom →",
      reachGo: "Partnerstwo dla USA →",
      hiringGo: "Otwarte role →",
      agentsGo: "Jak budujemy agentów →",
      selfEyebrow: "Firma 2030 · samoocena",
      selfTitle: "Gdzie jest Twoja firma na drodze do operacji agentowych?",
      selfSub: "Pięć poziomów dojrzałości i jeden praktyczny krok na wyższy.",
      reachEyebrow: "EU delivery partner",
      reachTitle: "Dostarczamy wszędzie na świecie. W europejskiej jakości.",
      reachSub: "Za nami stoją referencje europejskich firm enterprise i mniejszych oraz średnich przedsiębiorstw — z jednymi i drugimi mamy głębokie doświadczenie. Szczerze: sprawia nam to frajdę.",
      reachList: ["Trzy zespoły, każdy do swojej dziedziny", "Europejskie standardy, europejskie dane", "Strefę czasową rozwiązujemy, a nie tłumaczymy"],
      hiringPill: "Rekrutujemy",
      hiringTitle: "Buduj systemy, które naprawdę ruszają.",
      hiringSub: "Żadnego cmentarza proof-of-conceptów. Wdrażasz na produkcję i potem to utrzymujesz.",
      bubbleSay: "Powiedzcie nam, który proces was spowalnia. Powiemy wprost, czy warto go automatyzować.",
      startPress: "naciśnij enter",
      artHint: "Tu wejdzie zdjęcie",
    },
  },
};
