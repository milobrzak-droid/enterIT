/**
 * rebase-verze1.mjs — makes the archived site work from under /verze1.
 *
 * The old site was generated to live at the domain root, so every internal link
 * it writes is root-absolute. Once it moved to /verze1 those links all pointed
 * into the new site instead of the archive. This rewrites them.
 *
 * /assets stays shared — both sites use the same fonts, icons and brand CSS, and
 * duplicating them would mean two copies drifting apart. /beta and /beta2 are
 * left alone because they are their own things, not part of the archive.
 *
 * Canonicals, hreflang alternates and the sitemap link are removed outright: all
 * three claim URLs the new site now owns, and an archive marked noindex must not
 * be telling search engines it is the canonical version of anything.
 *
 * Run it after regenerating anything into verze1/, or the archive quietly starts
 * linking to the live site again.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { globSync } from "node:fs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SHARED = ["assets/", "beta/", "beta2/", "favicon.ico", "verze1/"];

export function rebaseVerze1() {
  const files = globSync("verze1/**/*.html", { cwd: root }).map((f) => resolve(root, f));
  let changed = 0;
  for (const file of files) {
    const before = readFileSync(file, "utf8");
    let s = before
      .replace(/\n\s*<link rel="canonical"[^>]*>/g, "")
      .replace(/\n\s*<link rel="alternate"[^>]*>/g, "")
      .replace(/\n\s*<link rel="sitemap"[^>]*>/g, "")
      .replace('<meta name="robots" content="index,follow">',
               '<meta name="robots" content="noindex,nofollow">')
      .replace(/\b(href|src)="(\/[^"]*)"/g, (all, attr, path) =>
        SHARED.some((p) => path.slice(1).startsWith(p)) ? all : `${attr}="/verze1${path}"`);
    if (s !== before) { writeFileSync(file, s, "utf8"); changed += 1; }
  }
  console.log(`verze1: ${files.length} pages, ${changed} rebased`);
}

if (import.meta.url === `file://${process.argv[1]}`) rebaseVerze1();
