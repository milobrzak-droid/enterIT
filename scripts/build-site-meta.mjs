/**
 * build-site-meta.mjs — sitemap.xml, robots.txt and the redirect table.
 *
 * All three describe the same set of URLs, so they are generated from one list
 * rather than maintained in three places that drift.
 *
 * The redirects matter more than usual here: the old site had sixty-one indexed
 * URLs and every one of them changed when the new site took the root. Without a
 * 301 for each, every ranking and every inbound link lands on a 404. The map
 * below is the whole of that translation, and anything not in it — a page the
 * old site had and the new one does not — goes to the archive under /verze1 so
 * it still resolves rather than disappearing.
 */
import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES, ROOT_LOCALE, SITE, boardHref, sub } from "./beta2-page.mjs";
import { routinesByLocale } from "./beta2-routines.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/** Every page the new site publishes, most important first. */
export function urls() {
  const out = [];
  for (const code of LOCALES) {
    out.push({ loc: boardHref(code), priority: code === ROOT_LOCALE ? "1.0" : "0.9" });
    for (const f of ["agents.html", "automation.html", "team.html", "integrations.html",
                     "engagement.html", "company-2030.html", "calculator.html"]) {
      out.push({ loc: sub(code, f), priority: "0.8" });
    }
    for (const r of routinesByLocale[code]) {
      out.push({ loc: sub(code, `routines/${r.slug}.html`), priority: "0.7" });
    }
  }
  out.push({ loc: "/gdpr.html", priority: "0.3" }, { loc: "/podminky.html", priority: "0.3" });
  return out;
}

/* The old site's URLs, in the language they were written in, mapped onto the
   page that now says the same thing. The old Czech pages sat at the root and
   the other languages under /en /de /pl, which is the shape the new site kept —
   so most of this is a filename change rather than a move. */
const OLD_TO_NEW = {
  "tym.html": "team.html",
  "firma-2030.html": "company-2030.html",
  "jak-stavime-agenty.html": "agents.html",
  "jak-stavime-automatizace.html": "automation.html",
  "reseni-faktury.html": ["invoices", "faktury", "rechnungen", "faktury"],
  "reseni-objednavky.html": ["orders", "objednavky", "bestellungen", "zamowienia"],
  "reseni-sklad-bez-papiru.html": ["warehouse", "sklad", "lager", "magazyn"],
  "reseni-dochazka.html": ["attendance", "dochazka", "zeiterfassung", "ewidencja-czasu"],
  "reseni-pracovni-vykazy.html": ["timesheets", "vykazy", "stundenzettel", "karty-pracy"],
  "reseni-kniha-jizd.html": ["mileage", "kniha-jizd", "fahrtenbuch", "ewidencja-przebiegu"],
  "reseni-reklamace.html": ["complaints", "reklamace", "reklamationen", "reklamacje"],
  "reseni-dovolene.html": ["time-off", "dovolene", "urlaub", "urlopy"],
};
const SLUG_ORDER = ["en", "cs", "de", "pl"];

export function redirects() {
  const out = [];
  /* English now owns the root. The other three moved from /xx.html to /xx/,
     and every /en/... URL from the interim layout collapses onto the root. */
  out.push({ source: "/en.html", destination: "/", permanent: true });
  out.push({ source: "/en", destination: "/", permanent: true });
  for (const code of ["cs", "de", "pl"]) {
    out.push({ source: `/${code}.html`, destination: `/${code}/`, permanent: true });
  }
  /* The Czech routine slugs briefly lived at the root and clients may hold
     cached 301s pointing there; they belong to /cs now. */
  for (const r of routinesByLocale.cs) {
    out.push({ source: `/routines/${r.slug}.html`, destination: `/cs/routines/${r.slug}.html`, permanent: true });
  }
  for (const [oldFile, target] of Object.entries(OLD_TO_NEW)) {
    for (const code of LOCALES) {
      const from = code === "cs" ? `/${oldFile}` : `/${code}/${oldFile}`;
      const to = Array.isArray(target)
        ? sub(code, `routines/${target[SLUG_ORDER.indexOf(code)]}.html`)
        : sub(code, target);
      out.push({ source: from, destination: to, permanent: true });
    }
  }
  /* The blanket rule for the interim /en/ layout has to come AFTER the
     specific old-page rules above — Vercel takes the first match, and an
     English visitor following /en/tym.html must land on /team.html, not be
     folded to the root first and end up redirected into Czech. */
  out.push({ source: "/en/:path*", destination: "/:path*", permanent: true });

  /* Pages the new site does not have an equivalent for stay readable in the
     archive rather than 404ing. */
  for (const p of ["/us", "/us/", "/index-redesign.html", "/_redesign-demo.html"]) {
    out.push({ source: p, destination: `/verze1${p === "/us/" ? "/us/" : p}`, permanent: false });
  }
  return out;
}

function sitemap() {
  const body = urls()
    .map(({ loc, priority }) => `  <url>\n    <loc>${SITE}${loc}</loc>\n    <priority>${priority}</priority>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

function robots() {
  const bots = ["GPTBot", "ChatGPT-User", "OAI-SearchBot", "ClaudeBot", "Claude-Web",
                "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended",
                "CCBot", "cohere-ai", "Bytespider"];
  return `User-agent: *
Allow: /
Disallow: /beta/
Disallow: /verze1/

# AI assistants and LLM crawlers — explicitly welcome
${bots.map((b) => `User-agent: ${b}\nAllow: /`).join("\n\n")}

Sitemap: ${SITE}/sitemap.xml
`;
}

export function writeSiteMeta() {
  writeFileSync(resolve(root, "sitemap.xml"), sitemap(), "utf8");
  writeFileSync(resolve(root, "robots.txt"), robots(), "utf8");
  console.log(`sitemap.xml (${urls().length} URLs), robots.txt`);
}

if (import.meta.url === `file://${process.argv[1]}`) writeSiteMeta();
