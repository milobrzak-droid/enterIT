/**
 * beta2-routines.mjs — the eight ready-made routines, one entry each.
 *
 * These are the cheapest way into a relationship with us, so the pages are
 * written to be decided on rather than admired. Every entry answers the same
 * five questions in the same order, because a buyer comparing two of them
 * should not have to hunt:
 *
 *   pain    where the time actually goes today
 *   flow    the steps, with the human review points named
 *   never   what the system will not do on its own — the trust section
 *   need    what we need from you, kept deliberately short
 *   expect  timeline and effect
 *   faq     the objections people actually raise, answered plainly
 *
 * Content is carried over from the live Czech and English pages rather than
 * reinvented: those numbers are already published and already true. The voice
 * is the board's, and the spelling is American.
 *
 * `proof` is only present where a real engagement backs the claim. Where it is
 * absent, the page says nothing rather than implying something.
 */

import { cs } from "./beta2-routines-cs.mjs";
import { de } from "./beta2-routines-de.mjs";
import { pl } from "./beta2-routines-pl.mjs";

const en = [
  {
    slug: "invoices",
    tag: "Invoices",
    h1: "Invoices that post themselves into accounting.",
    lead: "The agent extracts each invoice, matches it to the purchase order and routes it for approval. Nobody re-keys anything.",
    stat: "~30 h", statLabel: "a month back to the accounting team",
    flowIn: "Invoice arrives as PDF", flowOut: "Posted, with an error rate under 1%",
    pain: [
      "Accountants re-key lines from PDFs and scans into the ERP — slow work, and every digit is a chance to be wrong.",
      "Matching means searching email, spreadsheets and binders for the order and the delivery note.",
      "Missing invoices and corrections all surface at month end, at once.",
    ],
    flow: [
      ["Invoice arrives", "By email, supplier portal or scan. We connect to whichever you already use."],
      ["Extraction", "Supplier, VAT ID, amounts, dates and line items pulled out and structured."],
      ["Order match", "Amounts and quantities checked against the purchase order or delivery note in the ERP."],
      ["Coding suggestion", "History proposes the account code and cost center — as a suggestion, not a decision."],
      ["Human approval", "The owner sees the invoice and the proposed match side by side, in one place."],
      ["Posting", "After approval it posts, with an error rate under 1%."],
      ["Exceptions", "Missing orders, mismatches and new suppliers always go to a person."],
    ],
    never: [
      "It does not pay an invoice. A person always initiates and confirms payment.",
      "It does not add a new supplier to the system without approval.",
      "It does not decide a disputed amount or a mismatch — those go for approval, every time.",
    ],
    need: [
      "API or account access to your ERP or accounting system.",
      "Whatever channel invoices arrive on today: inbox, supplier portal, shared folder.",
      "A few dozen historical invoices, so matching and coding have something to learn from.",
    ],
    expect: [["3–5 weeks", "to deployment"], ["<1%", "error rate"], ["~30 h/mo", "back to accounting"], ["ROI in the pilot", "measured on your data"]],
    proof: "At an 82-person metals trader, the invoicing work and other agents returned about 1,420 hours a year. The program paid back in three months.",
    faq: [
      ["Does it work with Pohoda, Helios, K2 or Money S5?", "Yes, and with the common international systems. If yours is something else, ask — it will most likely work too."],
      ["What if the invoice is a phone photo, or barely legible?", "It copes with poor scans. Where it is not sure, it does not guess the line — it sends the invoice to a person."],
      ["Do we have to change how invoices reach us?", "No. We connect to the inbox, portal or folder you already use."],
      ["Who approves?", "Always the person responsible for purchasing. The agent prepares everything; it neither approves nor pays."],
      ["What happens to an invoice it cannot match?", "It is flagged as an exception and handed to the accountant. Nothing passes through unnoticed."],
    ],
  },
  {
    slug: "orders",
    tag: "Orders",
    h1: "Turn an email into an order without re-keying it.",
    lead: "The agent reads order emails in whatever format they arrive, creates the order in your system and confirms receipt to the customer.",
    stat: "~25 h", statLabel: "a month back to the sales team",
    flowIn: "Order arrives in any format", flowOut: "Created and confirmed in the ERP",
    pain: [
      "Sales re-key lines from PDFs, spreadsheets and plain text into the ERP or the online store.",
      "Every customer writes an order differently, which makes handling slow and quantities and prices easy to get wrong.",
      "At peak times orders queue up and confirmations go out late.",
    ],
    flow: [
      ["Email arrives", "PDF attachment, spreadsheet, or just text in the body."],
      ["Extraction", "Items, quantities, requested date and delivery address."],
      ["Availability and price", "Checked against current stock and pricing in the ERP or store."],
      ["Order created", "The customer is matched in the CRM and the order lands in the right system."],
      ["Confirmation", "Items, prices and expected delivery go back to the customer automatically."],
      ["Human review", "Unknown items, price mismatches and new customers always go to sales."],
    ],
    never: [
      "It does not create a new customer or a price-list exception without a salesperson's approval.",
      "It does not send a binding confirmation when it is not certain the item matches the price list.",
      "It does not decide discounts or unusual terms. Those always go to a person.",
    ],
    need: [
      "Access to the ERP, CRM or online store where orders are created.",
      "A handful of typical order emails from your main customers.",
      "Current prices and a view of stock availability.",
    ],
    expect: [["4–6 weeks", "to deployment"], ["0", "manual re-keys"], ["~25 h/mo", "back to sales"], ["ROI in the pilot", "measured on your data"]],
    faq: [
      ["Does it handle a PDF, or a scanned letter?", "Yes — a PDF attachment, a scan, or plain text in the body of the email."],
      ["What if the customer writes free text?", "It works from content, not format, so every customer can keep writing the way they always have. Where it is not sure, it does not guess; it passes the line to a salesperson."],
      ["Do we have to standardize the format across customers?", "No. It adapts to what your customers already send."],
      ["What happens when it does not recognize an item?", "It is flagged as an exception and reviewed by a salesperson. The order is not created unverified."],
      ["Does it work with Shopify, Shoptet or WooCommerce?", "Yes, alongside the ERP and CRM systems you already run."],
    ],
  },
  {
    slug: "warehouse",
    tag: "Warehouse",
    h1: "Photograph the packing slip. The goods book themselves in.",
    lead: "Someone photographs the delivery note; the agent extracts it, matches it to the order and books the goods in.",
    stat: "~20 h", statLabel: "a month back to the warehouse",
    flowIn: "Packing slip on paper", flowOut: "Goods received and matched",
    pain: [
      "Hours or days pass before a receipt reaches the system, which makes stock figures unreliable exactly when someone needs them.",
      "Re-keying introduces quantity and code errors.",
      "Differences between what was ordered and what arrived surface after the driver has left.",
    ],
    flow: [
      ["Photograph", "Taken in a mobile app, or simply emailed to a dedicated address."],
      ["Extraction", "Supplier, items, quantities and batch numbers."],
      ["Order match", "Delivered items and quantities checked against the order."],
      ["Goods receipt", "The ERP is updated and the receipt note prepared."],
      ["Immediate exceptions", "Missing, extra, damaged or unclear items go to the buyer while the driver is still there."],
    ],
    never: [
      "It does not book in goods that do not match the order without the buyer confirming.",
      "It does not raise a damage claim with the supplier.",
      "It does not create new stock items without approval.",
    ],
    need: [
      "The API of your ERP or WMS.",
      "An ordinary mobile phone in the warehouse. Nothing special.",
      "The goods master list.",
    ],
    expect: [["4–6 weeks", "to deployment"], ["within minutes", "stock is current"], ["~20 h/mo", "back to the warehouse"], ["0", "paper documents"]],
    faq: [
      ["Only some of our goods carry barcodes.", "That is fine. It works from the text of the delivery note; barcodes are not required."],
      ["Does it work for dispatch too?", "Yes — issue notes, sub-warehouses, stocktakes, same principle. We start with goods receipt because that is where it hurts most."],
    ],
  },
  {
    slug: "attendance",
    tag: "Attendance",
    h1: "No more adding up hours from terminals and spreadsheets at month end.",
    lead: "The agent combines time clocks, spreadsheets and leave records, checks the shifts and prepares payroll input.",
    stat: "~15 h", statLabel: "a month back to the payroll clerk",
    flowIn: "Time-clock exports plus Excel", flowOut: "Hours summarized, payroll-ready",
    pain: [
      "Attendance is split across terminals, a manager's spreadsheet and paper leave slips.",
      "Month end means chasing gaps and calculating overtime and bonuses by hand.",
      "Errors only surface after payroll has run.",
    ],
    flow: [
      ["Continuous collection", "Attendance, managers' files and approved leave, gathered as they happen."],
      ["Daily checks", "Missing clock-ins, shift mismatches and unapproved overtime flagged the same day."],
      ["Calculation", "Overtime, bonuses, holidays and compensation, following your rules and the applicable labor law."],
      ["Payroll input", "Prepared in the format your payroll system expects."],
      ["Manager approval", "Departments approve in one click. Unexplained discrepancies and rule changes go to a person."],
    ],
    never: [
      "It does not change payroll rules or rates without HR signing off.",
      "It does not approve overtime on a manager's behalf.",
      "It does not set up new shift models without asking.",
    ],
    need: [
      "Access to attendance data — the system, the terminals, or honestly just the spreadsheets.",
      "Your shift models and bonus rules.",
      "The import format for payroll.",
    ],
    expect: [["3–5 weeks", "to deployment"], ["daily", "errors caught"], ["~15 h/mo", "back to payroll"], ["3 → 1", "places attendance lives"]],
    faq: [
      ["We run three shifts and a lot of exceptions.", "That is precisely why it pays. We set the rules once and they get applied the same way every month."],
      ["Will it replace our attendance system?", "No. It connects it to everything else. The terminals stay."],
    ],
  },
  {
    slug: "timesheets",
    tag: "Timesheets",
    h1: "Field timesheets, collected, approved and ready to invoice.",
    lead: "The agent collects timesheets, matches each entry to the right job, and prepares both the invoicing and the payroll input.",
    stat: "~12 h", statLabel: "a month back to the back office",
    flowIn: "Field reports on paper and in messages", flowOut: "Approved and ready to bill",
    pain: [
      "Paper and spreadsheet timesheets get re-keyed by the office.",
      "Month-end billing is reconstructed from memory and message threads.",
      "Billable hours that were never written down are invisible lost revenue.",
    ],
    flow: [
      ["Voice entry", "The technician dictates hours, job, activity and materials — twenty seconds on the drive home."],
      ["Structure", "Each entry matched to the correct job."],
      ["Checks", "Attendance, stock issues and missing entries verified against each other."],
      ["Manager approval", "The daily overview takes one click."],
      ["Billing and payroll", "Job, payroll and margin outputs prepared. Discrepancies go to the manager."],
    ],
    never: [
      "It does not approve a technician's own timesheet. That always goes to the manager.",
      "It does not bill a customer without the manager's approval.",
      "It does not create new jobs on its own.",
    ],
    need: [
      "A list of jobs, from the ERP or from a spreadsheet.",
      "The technicians' own phones.",
      "Your billing rules — rates, what is inside a flat fee and what is on top.",
    ],
    expect: [["4–6 weeks", "to deployment"], ["fewer", "forgotten hours"], ["~12 h/mo", "back to the office"], ["direct", "impact on revenue"]],
    proof: "A construction group removed manual timesheet entry entirely and got roughly 180 hours a month back.",
    faq: [
      ["Our crews will not type anything into a phone.", "Which is exactly why it is voice. Anyone can dictate for twenty seconds."],
      ["We bill both flat rates and hourly.", "Rules per job. It knows what is inside the flat rate and what goes on top."],
    ],
  },
  {
    slug: "mileage",
    tag: "Mileage log",
    h1: "Fuel stops and routes turn themselves into a finished log.",
    lead: "The agent builds the mileage log from GPS, fuel cards and calendars, and keeps an eye on inspections, service and insurance.",
    stat: "~10 h", statLabel: "a month back to the fleet manager",
    flowIn: "Fuel receipts and route data", flowOut: "Mileage log plus service alerts",
    pain: [
      "Month-end logs get reconstructed from memory.",
      "Inspections, service and insurance are easy to miss in a spreadsheet.",
      "Classifying trips by hand costs time and carries tax risk.",
    ],
    flow: [
      ["Collection", "GPS, fuel-card transactions and driver calendars."],
      ["Trip assembly", "Route, purpose, and the private-or-business classification."],
      ["Discrepancy checks", "Fueling off-route, unusual consumption, trips that are missing."],
      ["Deadline tracking", "Inspections, service, insurance and road tolls flagged early rather than late."],
      ["Output", "Accounting-ready records. Unclear trips and suspicious transactions go to a person."],
    ],
    never: [
      "It does not decide whether an unclear trip was private or business. It asks the driver.",
      "It does not edit or delete records retroactively without approval.",
      "It does not handle insurance claims. It watches the deadlines and warns you.",
    ],
    need: [
      "Access to the GPS or fleet system — or at minimum the fuel cards.",
      "A list of vehicles and drivers.",
      "Your rule for telling private and business trips apart.",
    ],
    expect: [["3–4 weeks", "to deployment"], ["continuously", "not after the fact"], ["~10 h/mo", "back to the fleet manager"], ["automatic", "inspection and service watch"]],
    faq: [
      ["We do not have GPS units.", "It works from fuel cards and calendars, with drivers topping it up once a week."],
      ["Private trips?", "The driver marks them with one tap and they stay separated for tax."],
    ],
  },
  {
    slug: "complaints",
    tag: "Complaints",
    h1: "Never lose track of a customer complaint again.",
    lead: "The agent logs every complaint — email, phone or web — tracks the deadline and keeps the customer updated.",
    stat: "0", statLabel: "missed statutory deadlines",
    flowIn: "Complaint lost in an inbox", flowOut: "Logged, assigned and tracked",
    pain: [
      "Complaints are split across email, spreadsheets and people's memory.",
      "The statutory deadline is tracked by hand, which works until the week somebody is on leave.",
      "A customer who calls to ask cannot be told the status immediately.",
    ],
    flow: [
      ["Capture", "Customer, product, fault, proof of purchase and photos, extracted from whatever came in."],
      ["Case opened", "A reference number in the ERP or CRM; the customer gets a confirmation and a date."],
      ["Assignment", "Routed to the right handler by product and fault type."],
      ["Deadline control", "The handler is reminded five days out, the manager two days out."],
      ["Updates and decision", "Status updates go out automatically. A person always accepts or rejects the claim."],
    ],
    never: [
      "It never decides whether to accept or reject a complaint.",
      "It does not close a case without the handler confirming.",
      "It does not send the customer a final position without approval.",
    ],
    need: [
      "A complaints inbox or form.",
      "Somewhere for the cases to live: ERP, CRM, helpdesk, or a simple register.",
      "Your complaints rules and deadlines.",
    ],
    expect: [["3–5 weeks", "to deployment"], ["0", "missed deadlines"], ["within minutes", "customer gets a reply"], ["faster", "resolution overall"]],
    faq: [
      ["We take complaints by phone too.", "The operator dictates into a short form and the agent does the rest. We can transcribe the calls instead, if you would rather."],
      ["Who decides whether to accept a claim?", "Always your own person. The agent administers; it does not decide."],
    ],
  },
  {
    slug: "time-off",
    tag: "Time off",
    h1: "Requests, approvals and balances in one place.",
    lead: "People request time off in Teams, managers approve in one click, and balances update themselves.",
    stat: "2–4 weeks", statLabel: "the fastest deployment we offer",
    flowIn: "Paper slips and follow-up emails", flowOut: "Request, approval and balance in one place",
    pain: [
      "Paper forms and emails leave no consistent record.",
      "HR, managers and employees are each looking at a different balance.",
      "Clashes inside a team surface too late to do anything about.",
    ],
    flow: [
      ["Request", "Through Teams, email or phone — whichever people already use."],
      ["Automatic checks", "Balance, team clashes and minimum staffing, all checked before it reaches anyone."],
      ["Manager approval", "One click, next to the team calendar."],
      ["Record", "Attendance, calendar and payroll input all update together."],
      ["Balance alerts", "It flags unused leave. Approval stays with the manager, always."],
    ],
    never: [
      "It does not approve a request on its own, even when it matches every rule.",
      "It does not rewrite the history of leave already approved.",
      "It does not decide exceptions that fall outside the rules.",
    ],
    need: [
      "Microsoft 365 or Google Workspace.",
      "Current balances — an export from payroll is enough.",
      "Your approval hierarchy.",
    ],
    expect: [["2–4 weeks", "to deployment"], ["real time", "overview for HR"], ["fastest", "of the eight"], ["0", "paper slips"]],
    faq: [
      ["We also have sick days, home office and time off in lieu.", "Every type of absence, one process."],
      ["Does it work without Teams?", "Yes — email, or a simple web app."],
    ],
  },
];

/* Czech is not a translation of the English so much as a return to the
   original — these pages were written in Czech first. Slugs differ per language
   because a Czech reader should not be sent to /routines/invoices.html. */
export const routinesByLocale = { en, cs, de, pl };

/** Kept for callers that only ever wanted the English set. */
export const routines = en;

/** One colour per routine, in the order they appear on the board. */
export const routineTones = [
  "turquoise", "violet", "yellow", "blue",
  "red", "navy", "turquoise", "violet",
];
