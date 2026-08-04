/**
 * beta2-us-copy.mjs — the English board, written for a US buyer.
 *
 * This is the copy deck of 28 July 2026 transcribed into one place. It replaces
 * the eight-chapter English board with a fourteen-section argument built around
 * one correction: the old board never said that Enter builds websites and
 * platforms too, so a reader came away thinking "AI automation boutique" — about
 * half of what the company does, and not the half that keeps a client longest.
 *
 * Order: who we are -> the whole span -> why the span is an advantage -> proof
 * -> the cheap way in -> how it is bought -> who is accountable -> next step.
 *
 * Two conventions matter here:
 *
 *   needs: "..."   Anything the deck marked [OVĚŘIT] or [DOPLNIT]. It renders as
 *                  a visible marker on the page rather than quietly becoming a
 *                  claim. Nothing unverified is ever typeset as fact — including
 *                  client names that have no written consent for public use on a
 *                  page aimed at the US market.
 *
 *   Forbidden words, per the deck's editorial rules: leading provider,
 *   cutting-edge, innovative, seamless, world-class, state-of-the-art, synergy,
 *   leverage (as a verb), robust, holistic, empower, unlock, revolutionize.
 *   American spelling throughout.
 *
 * The Czech, German and Polish boards still build from beta2-copy.mjs on the
 * older eight-chapter structure. They are translated once this one is signed off,
 * not twice.
 */

/** A fact we do not have yet. Rendered visibly; never silently omitted. */
export const need = (what) => ({ __need: what });

export const us = {
  /* ---- 00 · Hero ------------------------------------------------------ */
  hero: {
    eyebrow: "Prague · Bruntál · working with teams in the US",
    h1: "One engineering team for everything between your website and your ERP.",
    lead: "Enter is an engineering organization of 75 engineers in three teams. We build websites and digital products, automate the work your people do by hand, put AI agents into live operations, and build the platforms and enterprise systems underneath. Then we run all of it under an SLA.",
    primary: "Book a 30-minute call",
    secondary: "See what is running today",
    stats: [
      ["75", "engineers, three teams"],
      ["120+", "projects delivered", need("confirm the count before launch")],
      ["60+", "systems integrated", need("confirm the count before launch")],
      ["8", "years of enterprise delivery", need("confirm founding year")],
    ],
    badges: "Microsoft Solutions Partner · TD SYNNEX Destination AI",
    badgesNeed: need("confirm both partner statuses are current at launch date"),
  },

  /* ---- 01 · The short version ----------------------------------------- */
  short: {
    no: "01", eyebrow: "The short version",
    h2: "If you read one section, read this one.",
    body: [
      "Most companies end up with three or four suppliers: one for the website, one for automation, one for AI, one for the ERP integration. Nobody owns the whole picture, and the seams between them are where projects die.",
      "Enter is built the other way around. 75 engineers in three teams — enterprise systems, AI and agents, and product and web — under one roof, one delivery process, and one contract. A single engagement can start with a marketing site and end with an agent that reads purchase orders and writes them straight into Business Central, without changing suppliers halfway through.",
      "We start every engagement by measuring what the current process actually costs. We build a pilot on your real data before anyone signs off on a large budget. And we do not hand over a repository and disappear — deployment, monitoring, security and continued development stay with a named owner on our side.",
      "If you run an IT company yourself: yes, we also work as an extension of another engineering team. That model is described in section 10.",
    ],
  },

  /* ---- 02 · What we build --------------------------------------------- */
  build: {
    no: "02", eyebrow: "What we build",
    h2: "Five disciplines. One delivery organization.",
    intro: "These are not packages. They are the five kinds of work our engineers actually do, ordered from the quickest to the most involved. Most clients start in one and expand into others over time.",
    close: "Not sure which discipline you need? Most conversations start with one process that visibly hurts.",
    closeGo: "Tell us what it is →",
    cards: [
      {
        n: "02.1", title: "Websites and digital products",
        strap: "The public face and the products you sell.",
        body: "Marketing sites, campaign pages, e-commerce front ends, client portals and customer-facing web apps. We take a product from an MVP to something that survives real traffic — design, front end, back end, analytics, and the content workflow behind it so your marketing team is not blocked on a developer.",
        outputs: [
          "Corporate and product websites",
          "Headless CMS setups",
          "E-commerce front ends on Shopify, Shoptet and WooCommerce",
          "Customer and partner portals",
          "Web and mobile apps from MVP to scale",
          "Design systems and component libraries",
        ],
        who: "Enter Studio, our product team, with additional design and front-end capacity from Enter Tech on larger builds.",
        note: "Already working with someone else? We are happy to take only the parts your current agency cannot cover — the integration layer, the data behind the site, or the AI features on top of it.",
      },
      {
        n: "02.2", title: "Automation",
        strap: "The routine work your people should not be doing.",
        body: "Automation is a fixed track. Predictable input, defined rules, reliable output, and an exception queue for anything that does not fit. It is the cheapest, fastest and lowest-risk thing on this page, and it is where most companies should start — not because it is impressive, but because it pays for itself in months and lets both sides test the working relationship before anything larger is on the table.",
        body2: "We work in five layers: transactional (moving and syncing data between systems), knowledge (answers buried in documents), reporting (data from the ERP in plain language), communication (recurring questions handled around the clock), and monitoring (deadlines and deviations that raise an alert instead of surfacing too late).",
        outputs: [
          "Orders and invoices extracted from email and PDFs into the ERP",
          "CRM ↔ ERP synchronization",
          "Document approval flows with a full audit trail",
          "Scheduled reconciliations and alerting",
          "Timesheet, attendance and expense collection",
        ],
        who: "Tools: n8n, Make, Power Automate, Zapier, Copilot Studio, plus custom services where a no-code tool would become the bottleneck.",
        note: "Typical payback: 3 to 12 months, measured against a baseline we establish before we build anything.",
      },
      {
        n: "02.3", title: "AI agents in production",
        strap: "Judgment, not just execution.",
        body: "An agent is not a chatbot and it is not a bigger automation. Automation follows a fixed track. An agent is given a goal, a set of boundaries and a set of tools, and it decides which steps to take — which is exactly why it needs a different kind of engineering around it.",
        body2: "Every agent we ship has eight things defined before a line of code is written: its role and its explicit non-role, its inputs and outputs, its guardrails, the tools it is allowed to touch, its memory and retrieval sources, the human approval points, the metrics it is measured on, and its governance model. The agent recommends and prepares. A person approves anything sensitive. Every action stays auditable.",
        kinds: [
          ["Extraction agents", "read PDFs, drawings, invoices and contracts and return structured data."],
          ["Email agents", "pull order lines out of free-form messages and create the corresponding ERP records."],
          ["Knowledge agents", "answer questions from your own documentation and always cite the source document — they do not answer from memory."],
          ["Process agents", "turn meeting notes and tickets into tasks, owners and escalations."],
          ["Reporting agents", "answer plain-language questions against the ERP or the data warehouse."],
          ["Communication agents", "handle web, WhatsApp and inbox traffic around the clock and hand off to a human cleanly."],
        ],
        never: "What an agent never does: it does not send anything outside the company without approval, it does not delete data, and it does not make financial decisions. Your data is not used to train a model for anyone else — contractually, on our side and on the model vendor's.",
        who: "Models: Claude, GPT and Gemini in your own cloud tenant — or Llama and Mistral running on your infrastructure when data is not allowed to leave the building.",
      },
      {
        n: "02.4", title: "Data and platforms",
        strap: "The layer everything else stands on.",
        body: "Automation and agents are only as good as the data underneath them. When a company has the same customer in four systems and three spellings, no amount of AI fixes it. This is the band where we build the foundation: data platforms, warehouses, internal tooling, integration layers and the reporting that finally gives one number instead of five.",
        body2: "It is also where the most durable work happens. A platform we built for a construction group returned roughly 180 hours a month to the team and replaced a scattered set of spreadsheets with a single view of every project.",
        outputs: [
          "Data warehouses and lakehouses",
          "Power BI and reporting layers",
          "Internal platforms and admin tooling",
          "Document platforms with extraction, validation and archiving",
          "Master data cleanup and deduplication",
          "APIs and integration layers between systems that were never meant to talk",
        ],
      },
      {
        n: "02.5", title: "Enterprise systems and integration",
        strap: "Where off-the-shelf software runs out.",
        body: "Custom internal applications, ERP and CRM integration, WMS and logistics flows, legacy modernization, and the architecture and DevOps around all of it. This is our largest team and our oldest practice — the work that gets measured in years, not sprints.",
        body2: "Enterprise clients are not named here. Their contracts do not allow it, and we would rather show the work than the logos — the cases in section 04 are named because those clients agreed to it in writing.",
        outputs: [
          "Custom internal applications and portals",
          "SAP, Dynamics 365, Business Central, Helios, K2 and Abra integration",
          "Legacy system modernization and gradual replacement",
          "Cloud migration and DevOps",
          "Architecture reviews and second opinions",
          "Long-term maintenance under SLA",
        ],
      },
    ],
  },

  /* ---- 03 · Why the range matters -------------------------------------- */
  range: {
    no: "03", eyebrow: "Why the range matters",
    h2: "A supplier that only owns one discipline will always blame another one.",
    body: [
      "The reason we cover all five is not ambition. It is that the failures we get called in to fix almost always live in the gaps between suppliers — the agent that cannot reach the ERP, the portal nobody integrated, the dashboard fed by data nobody cleaned.",
      "One organization across the whole span means one architecture decision instead of three negotiations, one security model instead of three, one escalation path when something breaks at 2 a.m., and one team that already knows your systems when you want to add the next thing.",
      "It also means we can start small honestly. We do not have to sell you a platform to justify a team, because the team is already there working on four other things.",
    ],
  },

  /* ---- 04 · Proof ------------------------------------------------------- */
  proof: {
    no: "04", eyebrow: "Delivered work",
    h2: "This is running in production. Today.",
    intro: "Numbers below come from operational data on live systems, not from projections. Where a client is not named, it is because the contract says so.",
    go: "Talk through a comparable case →",
    cases: [
      {
        client: "Manufacturing group", context: "Manufacturing · about 600 people",
        metric: "One data layer", metricLabel: "over Business Central, warehouse and DMS",
        problem: "Orders, documents, stock and production data lived in three places, and every report meant reconciling three versions of the same number.",
        built: "A governed data platform on top of Business Central. It reads from the ERP, the warehouse and the document store, validates against the ERP, and writes back — so reporting, agents and everyday lookups all draw on the same verified data.",
        result: need("measured outcome for this engagement — hours, error rate or cycle time"),
        tech: "Business Central · Data platform · Power BI · Agent layer",
      },
      {
        client: "Energy group", context: "Energy services",
        metric: "+87%", metricLabel: "faster response to an incoming inquiry",
        problem: "Leads were lost to response time rather than to price. Follow-up took hours or days, and coverage stopped at the end of the business day.",
        built: "An agent that handles the entire pre-contact phase across chat, email and web forms: it answers from the product database, qualifies the inquiry against set criteria, and books the meeting directly in a salesperson's calendar.",
        result: "Response time down 87%, qualified meetings up 35%, and round-the-clock coverage with no additional headcount.",
        tech: "Agents · CRM · Calendar API · NLP", by: "Enter Agents",
      },
      {
        client: "Investment group", context: "Investment management · 100+ portfolio companies",
        metric: "10×", metricLabel: "output from the same analyst team",
        problem: "Monitoring more than a hundred portfolio companies by hand did not scale. Market-critical events were caught late and research reports took weeks.",
        built: "A network of specialized agents running as continuous research infrastructure: scanning agents watch thousands of sources, analytical agents separate signal from noise, and reporting agents deliver a morning briefing.",
        result: "Research reports in three to five minutes instead of weeks, continuous coverage of the full portfolio, and roughly ten times the output from the same headcount.",
        tech: "Agent network · Vector database · LLM · Data pipelines", by: "Enter Agents",
        resultNeed: need("be ready to substantiate the 10x figure — a US buyer will ask how it was derived"),
      },
      {
        client: "Hospitality and real-estate group", context: "Hospitality and real estate · properties in Prague, Switzerland and Italy",
        metric: "85%", metricLabel: "faster project approvals",
        problem: "Project approvals took three to four weeks across multiple stakeholders, invoice-to-project matching took eight to ten hours a week, and leadership saw budget figures weeks after period close.",
        built: "An agent-driven project and facility management platform: submissions route themselves to the right stakeholders by type, value and location, agents process and categorize invoices into the accounting system, and dashboards show budget status live.",
        result: "Approvals down from three to four weeks to three to five days, invoice work down from eight to ten hours a week to fifteen minutes, and OPEX and CAPEX visible in real time.",
        tech: "Agents · OCR · BI dashboards · Multi-currency accounting", by: "Enter Agents",
      },
      {
        client: "Waste management operator", context: "Waste management · one of the most heavily regulated sectors",
        metric: "30 min → 5 s", metricLabel: "to find a regulatory answer",
        problem: "Staff spent more than thirty minutes searching hundreds of pages of regulation, the knowledge sat with two senior people, and interpretation varied across the team.",
        built: "A knowledge agent over the digitized regulatory library and operating manuals. It answers in plain language, understands the sector's terminology, and flags documents before they expire rather than after.",
        result: "Search time down from thirty minutes to under five seconds, a thirty percent lighter administrative load, and no compliance incident since go-live.",
        tech: "Knowledge base · NLP · Document ingest", by: "Enter Agents",
      },
      {
        client: "Construction services firm", context: "Construction services",
        metric: "80%", metricLabel: "less administrative work",
        problem: "Sixty hours a week went into re-keying data between systems. Records lived across spreadsheets and paper, and admin capacity was the ceiling on growth.",
        built: "One central database as the source of truth, automated workflows connecting the systems, automatic work-order assignment, document processing for invoices and costs, and live performance reporting.",
        result: "Administrative load down 80%, the business up 40% without hiring an administrator, project starts 62% faster, and data-entry errors down 93%.",
        tech: "Custom database · Process automation · API integrations", by: "Enter Agents",
      },
      {
        client: "Engineering firm", context: "Production planning in Helios",
        metric: "70–120 items", metricLabel: "processed weekly, without re-keying",
        problem: "A single process engineer manually entered 70 to 120 items a week — 15 to 25 assemblies — from PDF drawings into Helios.",
        built: "Before quoting, we audited ten real drawings to establish what could be read reliably. The agent now reads title blocks and parts lists, finds similar existing items, and builds the component structure with process steps and time standards. Complex dimensions that require judgment stay with the process engineer by design.",
        result: "The process engineer reviews and decides instead of typing.",
        resultNeed: need("hours returned on this engagement"),
        tech: "Helios API · PDF, DWG and DXF parsing · OCR · staged rollout",
      },
      {
        client: "Metals trading company", context: "Trade · 82 people",
        metric: "3 months", metricLabel: "to payback",
        problem: "Repetitive operational steps were consuming thousands of hours a year across a team of 82.",
        built: "Copilot and n8n took over the defined routine steps and now route anything unusual to a person.",
        result: "About 1,420 hours returned and roughly USD 30,000 (CZK 710,000) in cost avoided per year.",
        tech: "Copilot · n8n",
      },
    ],
    alsoLabel: "Also running in production",
    also: [
      ["Agricultural business", "agriculture — a virtual executive team for a farm run remotely, 73% less time spent looking for information"],
      ["E-commerce platform", "e-commerce — an AI ambassador program; 90% of trained managers now use AI daily"],
      ["Boutique marketing agency", "marketing — an AI social media manager; three times the clients with the same team"],
      ["Construction group", "construction — an internal application with an API layer and Power BI; roughly 180 hours a month returned"],
    ],
    alsoNote: "Every named client above agreed in writing to be named. Our enterprise engagements are covered by contracts that do not allow it, so they are described without names rather than hinted at.",
  },

  /* ---- 05 · The easy way in --------------------------------------------- */
  start: {
    no: "05", eyebrow: "The easy way in",
    h2: "Eight processes we have already solved more than once.",
    intro: "These are not products and there is no license fee. They are patterns we have built enough times to quote quickly and deploy in weeks rather than quarters. Most clients use one of them to find out what working with us is like before committing to anything larger.",
    foot: "Hour figures are typical outcomes from comparable deployments, not a promise. We establish your own baseline in stage one and measure against that.",
    go: "Do not see your process? We build to fit. →",
    rows: [
      ["Invoices into accounting", "Invoice arrives as PDF", "Extracted, matched to the PO, routed for approval", "~30 hrs/month, error rate under 1%"],
      ["Orders from email", "Order arrives in any format", "Created and confirmed in the ERP", "~25 hrs/month"],
      ["Paperless warehouse", "Packing slip on paper", "Photograph it; goods received and matched", "~20 hrs/month"],
      ["Attendance tracking", "Time-clock exports plus Excel", "Hours summarized, payroll-ready", "~15 hrs/month"],
      ["Timesheets", "Field reports on paper and in messages", "Collected, approved, ready to invoice", "~12 hrs/month, fewer billing errors"],
      ["Mileage log", "Fuel receipts and route data", "Mileage log plus inspection and service alerts", "~10 hrs/month"],
      ["Complaints", "Complaint lost in an inbox", "Logged, assigned and tracked automatically", "Faster resolution, fewer escalations"],
      ["Time-off requests", "Paper slips and follow-up emails", "Request, approval and balance in one place", "Real-time view for managers and HR"],
    ],
  },

  /* ---- 06 · How we work -------------------------------------------------- */
  work: {
    no: "06", eyebrow: "How we work",
    h2: "Proof first. Budget second.",
    intro: "Four stages. Each one ends with a deliverable, a decision point and a clear owner. You can stop after any of them, and the work up to that point is yours.",
    links: ["How we build agents →", "How we build automation →"],
    stages: [
      {
        time: "1 to 2 weeks", title: "Find where it actually hurts",
        body: "We map volume, exceptions, data quality and what the current process genuinely costs — including the part nobody counts, which is senior people doing junior work.",
        get: "A written process map and a baseline number.",
      },
      {
        time: "2 to 3 weeks", title: "Find out whether it pays",
        body: "Expected savings, implementation cost, risks, and the conditions under which the pilot counts as a success. If the numbers do not work, we say so here. It has happened, and it is cheaper for both of us than finding out in month six.",
        get: "A business case with an explicit go / no-go recommendation.",
      },
      {
        time: "1 to 2 weeks", title: "Build the pilot on real data",
        body: "Connected to your live systems, running on your actual documents and edge cases — not a sanitized demo set.",
        get: "A working pilot and measured results against the stage-one baseline.",
      },
      {
        time: "ongoing", title: "Take over operations",
        body: "Monitoring, security, SLA and continued development, with a named owner on our side.",
        get: "A running system and someone to call.",
      },
    ],
  },

  /* ---- 07 · Who does the work -------------------------------------------- */
  team: {
    no: "07", eyebrow: "Who does the work",
    h2: "75 engineers. Three teams. One name on the contract.",
    intro: "Not a network of freelancers assembled per project. Three permanent teams that have worked together long enough to hand work across the boundary without dropping it.",
    close: "Every area has a named owner. You always know who decides and who is accountable for the outcome.",
    go: "Meet the whole team →",
    teams: [
      {
        name: "Enter Tech", size: "45 people",
        body: "Large systems, architecture, custom development, integrations, legacy modernization, DevOps and infrastructure. The team behind our longest-running engagements.",
        people: ["Adam Nagy — CIO, Enter Tech", "Gašpar Nagy — Founder, Enter Tech"],
      },
      {
        name: "Enter Agents", size: "25 people",
        body: "AI agents and custom LLM systems deployed into live operations, with forward-deployed engineers who sit with your process owners rather than working from a specification document.",
        people: ["Honza Nedvídek — CEO, Enter Agents", "Ondřej Hanigovský — CTO, Enter Agents"],
      },
      {
        name: "Enter Studio", size: "5 people",
        body: "Product, web and mobile development from MVP to scale — websites, portals and the customer-facing layer on top of what the other two teams build. Design and front-end capacity is shared with Enter Tech on larger engagements.",
        people: ["Jiří Čechal — Head of Development, Enter Studio"],
      },
    ],
    groupLabel: "Across all three teams",
    group: [
      { name: "Milo Brzák", role: "CEO", image: "/assets/team/milo.jpg", body: "Has trained more than 800 people across over a hundred companies. Owns strategy, product and methodology." },
      { name: "Michaela Klesnárová", role: "Analytics", image: "/assets/team/klesnarova.jpg", body: "Nearly two decades in enterprise C-level roles. Owns client delivery and production operations across all three teams.", need: need("confirm the two-decades figure") },
    ],
    titlesNote: "Titles above are team-level. Enter Agents and Enter Tech each have their own CEO and founder; Enter Group has one.",
  },

  /* ---- 08 · Integrations -------------------------------------------------- */
  stack: {
    no: "08", eyebrow: "Integrations",
    h2: "You do not have to replace anything you already run.",
    intro: "We have integrated 60+ systems, including legacy software with no modern API. Where there is no API, we go through the database, the file system, or the user interface — in that order of preference.",
    principles: [
      "Integration via API, database, files or UI automation, whichever the system actually supports.",
      "Human approval on sensitive steps, with a complete audit trail on everything.",
      "Monitoring, roles and permissions defined on day one, not retrofitted after go-live.",
    ],
    catalogLabel: "44 systems documented",
    catalogNote: "Forty-four are documented in the public catalog. The rest are client-specific or legacy systems we are not free to name.",
    go: "Search the full catalog →",
    groups: [
      ["ERP and finance", "SAP · Dynamics 365 · Business Central · Helios · K2 · Abra · Money S5 · Pohoda · Oracle NetSuite · Byznys · Karat"],
      ["CRM and sales", "Salesforce · HubSpot · Dynamics CRM · Pipedrive · Raynet · Zoho · Anabix"],
      ["E-commerce", "Shopify · Shoptet · WooCommerce · PrestaShop · Magento · Upgates"],
      ["Collaboration and data", "Microsoft 365 · Teams · Outlook · SharePoint · Slack · WhatsApp Business · Google Workspace · Power BI"],
      ["Automation", "n8n · Make · Zapier · Power Automate · Power Apps"],
      ["AI models", "OpenAI · Anthropic Claude · Google Gemini · Azure OpenAI · Mistral · Llama · Microsoft Copilot"],
    ],
  },

  /* ---- 09 · How you are protected ----------------------------------------- */
  safe: {
    no: "09", eyebrow: "How you are protected",
    h2: "We plan the ending at the beginning.",
    go: "See the full terms →",
    cards: [
      {
        tag: "SLA and operations", title: "We are accountable for keeping it running",
        body: "Availability targets, response times, monitoring, backups and updates under a single SLA. Named owner, defined escalation path.",
        need: need("confirm whether monitoring is 24/7 or 24/5 before this goes live"),
      },
      {
        tag: "Ownership and exit", title: "You know who owns the code before we write it",
        body: "The contract states who owns the code, the data and the documentation, and defines the handover procedure if the relationship ends. Standard position: you own the code and the data outright, and we deliver a documented handover package on request — no lock-in clauses, no proprietary runtime you cannot leave.",
        need: need("confirm the standard position really is client-owns-everything; if not, this paragraph gets rewritten"),
      },
      {
        tag: "Security and governance", title: "Security is designed in, not bolted on",
        body: "EU cloud or fully on-premises. Encryption in transit and at rest, role-based access, and a complete audit trail. GDPR and the EU AI Act are addressed at design time. Under our contract and our model-vendor terms, your data is not used to train models for anyone else.",
        need: need("check the training-data wording against the OpenAI / Anthropic / Microsoft agreements, and add SOC 2 or ISO 27001 status — a US enterprise compliance team asks this first"),
      },
    ],
  },

  /* ---- 10 · Commercial models --------------------------------------------- */
  engage: {
    no: "10", eyebrow: "Commercial models",
    h2: "Four ways to work with us.",
    intro: "Pick the one that matches how much of the problem you want to hand over.",
    foot: "We do not publish a price list, because for custom work an honest range is too wide to be useful and a narrow one is a guess. What we can tell you up front: the smallest possible first commitment is the discovery phase, it is fixed-fee, and it ends with a document you own whether or not you build with us. Typical time to a working pilot after that is 4 to 7 weeks.",
    cards: [
      {
        title: "Fixed-scope build",
        body: "A defined deliverable with a fixed price and a fixed date. Best for the eight recurring patterns in section 05 and for anything where the specification is genuinely stable.",
      },
      {
        title: "Discovery and business case",
        body: "Stages one and two on their own, at a fixed fee agreed before it starts. You get a process map, a measured baseline and a documented business case — yours to keep, with no obligation to build with us. If you do go ahead, it is credited against the build.",
      },
      {
        title: "Dedicated team",
        body: "A named team of engineers working as an extension of yours, billed monthly. Common when the client is an IT company that needs specific capability — agents, integrations, data engineering — without hiring for it. You direct the work; we handle staffing, continuity and quality.",
      },
      {
        title: "Run and evolve",
        body: "We take operational ownership of what is already built, yours or ours, under an SLA with a monthly retainer covering monitoring, support and a defined development capacity.",
      },
    ],
  },

  /* ---- 11 · Across the Atlantic -------------------------------------------- */
  atlantic: {
    no: "11", eyebrow: "Across the Atlantic",
    h2: "The practical questions, answered up front.",
    items: [
      {
        q: "Time zone",
        a: "We work on Central European Time, six hours ahead of New York and nine ahead of San Francisco. Our standard day overlaps with the US East Coast until around 11:00 a.m. Eastern, and we hold a fixed late-afternoon window in Prague for West Coast calls. Delivery teams work asynchronously by default — a written status lands in your inbox before your day starts.",
        need: need("confirm the West Coast call window, and that delivery can carry the written-status-before-your-day commitment"),
      },
      {
        q: "Contracting and invoicing",
        a: "Contracts in English, invoicing in USD, payment by wire.",
        need: need("governing law, accepted payment methods, and whether a US entity exists or is planned"),
      },
      {
        q: "Where your data lives",
        a: "For European clients we stand on Azure, so the data stays inside Europe and GDPR is a design decision rather than a discussion. Your own tenant, your own servers, or EU-region Azure — decided before we build. For a US engagement, hosting follows from the consulting phase rather than leading it: we work out what you already run and where we can genuinely help, and the answer to this question falls out of that.",
      },
      {
        q: "Language",
        a: "All delivery documentation, code comments and client communication in English by default.",
      },
    ],
  },

  /* ---- 12 · Boundaries ------------------------------------------------------ */
  limits: {
    no: "12", eyebrow: "Boundaries",
    h2: "Things we will turn down.",
    items: [
      "We do not take on a build without measuring the baseline first. Without it there is no way to tell later whether it worked, and we are not interested in that argument in month nine.",
      "We do not sell proofs of concept that have no path into production. If a process cannot realistically go live, we will say so in stage two rather than bill for a pilot.",
      "We do not put an agent in front of a decision that should stay with a person — pricing, credit, hiring, anything with legal exposure. The agent prepares the case; a human signs it.",
      "We do resell Microsoft licensing where we implement it. We disclose the margin, and it does not drive our architecture recommendations — if the right answer is a competitor's product or no product at all, that is what the business case will say.",
    ],
  },

  /* ---- 13 · Your move --------------------------------------------------------- */
  next: {
    no: "13", eyebrow: "Your move",
    h2: "Tell us what is slowing you down.",
    intro: "Thirty minutes is enough to establish the goal, the systems involved, the real risks and the right first step. You will leave the call with a recommendation even if it is that you should not build anything yet.",
    primary: "Book 30 minutes",
    secondary: "Send a description instead",
    tools: [
      { title: "Savings calculator", body: "Four inputs, an order-of-magnitude estimate of what routine work costs you today. Deliberately rough; we verify it properly in stage one.", go: "Run the numbers →", href: "/beta2/calculator.html" },
      { title: "Company 2030 self-check", body: "Five maturity levels and the specific next move for each. Ten questions, no email required.", go: "Find your level →", href: "/beta2/company-2030.html" },
    ],
    contact: [
      "Milo Brzák, Founder & CEO",
      "milo@enterai.cz · +420 608 969 263",
      "AI Enter s.r.o. · Zahradní 2004/46d, 792 01 Bruntál, Czechia · Reg. No. 19086652",
    ],
  },

  /* ---- Chrome ---------------------------------------------------------------- */
  nav: [
    ["What we build", "#build"],
    ["Work", "#proof"],
    ["How we work", "#work"],
    ["Team", "#team"],
    ["Engagement", "#engage"],
    ["Integrations", "#stack"],
  ],
  navCta: "Book a call",
  seo: {
    title: "Enterprise Software, AI Agents & Automation | EnterIT",
    description: "75 engineers building websites, automation, AI agents, data platforms and enterprise systems — and running them in production under an SLA.",
    og: "One engineering team for everything between your website and your ERP",
  },
  needLabel: "Needs data",
};
