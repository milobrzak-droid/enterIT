/**
 * build-beta2-engage.mjs — engagement, the 2030 self-check and the calculator,
 * in four languages.
 *
 * Engagement is the page an IT-company owner reads first and the one the old
 * site did not have at all. Everything still unconfirmed carries a marker in
 * every language rather than quietly becoming a confident sentence abroad.
 *
 * Company 2030 is the self-check. Its value is the honest read, so the levels
 * are written as the sentence you would actually hear in that company rather
 * than as a maturity label nobody recognises themselves in.
 *
 * The calculator is deliberately blunt. It runs entirely in the page, asks for
 * no email, and says on its face that it is an order of magnitude and not a
 * quote — a calculator that oversells is worse than no calculator. Its fields
 * come from the production content module, which is already translated.
 *
 * Copy: scripts/beta2-pages-copy.mjs
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { LOCALES, ROOT_LOCALE, boardHref, e, headLinks, key, need, page, pageHead, section, sub } from "./beta2-page.mjs";
import { pagesCopy } from "./beta2-pages-copy.mjs";
import { ui } from "./beta2-ui.mjs";
import { bookingUrl } from "./homepage-content.mjs";
import { restorationContent } from "./homepage-restoration-content.mjs";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");


/* ---------------------------------------------------------- Engagement -- */

function renderEngagement(code) {
  const C = pagesCopy[code].engagement;
  const U = ui[code];

  const models = section({
    id: "models", no: "01", hue: 0,
    kicker: C.modelsKicker, h2: C.modelsH2, ask: C.modelsAsk,
    keys: [
      ...C.models.map(([title, subText], i) =>
        key({
          span: 3, tone: ["turquoise", "blue", "violet", "white"][i], title, size: "sm", sub: subText,
        })),
      /* The four models are a commercial abstraction; this is what all four
         actually look like on the day. Text sits left, so it takes the
         sideways scrim. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/meeting.webp", alt: C.photoAlt,
        title: C.photoTitle, size: "big", sub: C.photoSub,
      }),
    ],
  });

  const money = section({
    id: "money", no: "02", hue: 1,
    kicker: C.moneyKicker, h2: C.moneyH2,
    keys: [
      key({ span: 8, tone: "white", body: C.moneyBody }),
      key({
        span: 4, tone: "turquoise", mascot: "wave",
        title: C.calcTitle, size: "sm", sub: C.calcSub,
        go: C.calcGo, href: sub(code, "calculator.html"),
      }),
    ],
  });

  const guarantees = section({
    id: "guarantees", no: "03", hue: 2,
    kicker: C.safeKicker, h2: C.safeH2, ask: C.safeAsk,
    keys: C.safe.map(([tag, title, subText, needText], i) =>
      key({
        span: 4, tone: ["turquoise", "white", "blue"][i],
        eyebrow: tag, title, size: "sm", sub: subText,
        needs: needText ? need(needText) : undefined, needsLabel: U.needsLabel,
      })),
  });

  const far = section({
    id: "far", no: "04", hue: 3,
    kicker: C.farKicker, h2: C.farH2,
    raw: `      <div class="key key--white panel" style="grid-column:span 12">
${C.far.map(([q, a, needText]) => `        <div class="qa"><b>${e(q)}</b><p>${e(a)}</p>${
      needText ? `<span class="needs"><b>${e(U.needsLabel)}</b>${e(needText)}</span>` : ""
    }</div>`).join("\n")}
      </div>`,
  });

  const limits = section({
    id: "limits", no: "05", hue: 4,
    kicker: C.limitsKicker, h2: C.limitsH2, ask: C.limitsAsk,
    keys: [key({ span: 12, tone: "navy", body: C.limits, mascot: "red" })],
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "engagement.html")),
    body: [
      pageHead({ code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta, cta: C.cta, bookingUrl }),
      models, money, guarantees, far, limits,
    ].join("\n\n"),
  });
}

/* -------------------------------------------------------- Company 2030 -- */

function render2030(code) {
  const C = pagesCopy[code].c2030;
  const U = ui[code];

  const pace = section({
    id: "pace", no: "01", hue: 0,
    kicker: C.paceKicker, h2: C.paceH2, ask: C.paceAsk,
    keys: [
      ...C.pace.map(([stat, statLabel, meta, src], i) =>
        key({
          span: 4, tone: ["turquoise", "white", "blue"][i], stat, statLabel,
          extra: `<p class="key-meta"><a class="src" href="${src}" target="_blank" rel="noopener">${e(meta)} ↗</a></p>`,
        })),
      /* The self-check is about where a company stands, so it closes on the
         picture of a company working out exactly that. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/standup.webp", alt: C.paceCloseAlt,
        title: C.paceCloseTitle, size: "big", sub: C.paceCloseSub,
      }),
    ],
  });

  const ladder = section({
    id: "levels", no: "02", hue: 1,
    kicker: C.levelsKicker, h2: C.levelsH2, ask: C.levelsAsk,
    keys: C.levels.map(([title, body, tell, step], i) =>
      key({
        span: i === 4 ? 12 : 3,
        tone: i === 4 ? "turquoise" : ["white", "blue", "violet", "yellow"][i], title, size: "sm", sub: body,
        rule: tell, meta: `${C.stepLabel} — ${step}`,
      })),
  });

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "company-2030.html")),
    body: [
      pageHead({ code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead, meta: C.meta, cta: C.cta, bookingUrl }),
      pace, ladder,
    ].join("\n\n"),
  });
}

/* ---------------------------------------------------------- Calculator -- */

function renderCalculator(code) {
  const C = pagesCopy[code].calc;
  const U = ui[code];
  const calc = restorationContent[code].calculator;
  const f = calc.fields;

  const field = (id, x) => `        <label class="calc-field" for="c-${id}">
          <span class="calc-label">${e(x.label)}<b id="c-${id}-out">${x.defaultValue}</b></span>
          <input id="c-${id}" type="range" min="${x.min}" max="${x.max}" step="${x.step}" value="${x.defaultValue}">
          <span class="calc-hint">${e(x.hint)}</span>
        </label>`;

  const calcSection = section({
    id: "calc", no: "01", hue: 0,
    kicker: C.calcKicker, h2: C.calcH2, ask: C.calcAsk,
    raw: `      <div class="key key--white calc" style="grid-column:span 7">
${field("people", f.people)}
${field("hours", f.hours)}
${field("rate", f.rate)}
${field("share", f.share)}
      </div>
      <div class="key key--turquoise calc-out" style="grid-column:span 5">
        <span class="key-eyebrow">${e(calc.results.annualSavings)}</span>
        <span class="calc-big" id="c-out-money">—</span>
        <span class="key-meta">${e(calc.results.annualSavingsHint)}</span>
        <div class="strip strip--in">
          <span class="stat"><b id="c-out-hours">—</b>${e(calc.results.hoursSaved)}</span>
          <span class="stat"><b id="c-out-fte">—</b>${e(calc.results.fteFreed)}</span>
        </div>
        <p class="key-meta key-meta--rule">${e(calc.disclaimer)}</p>
        <a class="key-go" href="${bookingUrl}" target="_blank" rel="noopener">${e(calc.results.cta)} →</a>
      </div>`,
  });

  const after = section({
    id: "after", no: "02", hue: 1,
    kicker: C.afterKicker, h2: C.afterH2,
    keys: [
      key({ span: 8, tone: "navy", body: C.afterBody, mascot: "blue" }),
      key({
        span: 4, tone: "turquoise", title: C.stagesTitle, size: "sm",
        sub: C.stagesSub, go: C.stagesGo, href: `${boardHref(code)}#process`,
      }),
      /* The figure above is an order of magnitude for one person's week. This is
         what that week looks like. */
      key({
        span: 12, tone: "navy", wide: true,
        photo: "/assets/decor/accounting.webp", alt: C.afterPhotoAlt,
        eyebrow: C.afterKicker, title: C.afterPhotoTitle, size: "sm",
      }),
    ],
  });

  /* Runs in the page, sends nothing anywhere. The rounding is deliberately
     coarse: this is an order of magnitude, and a figure like 47,318 would imply
     a precision the four inputs cannot support. */
  const script = `
<script>
(function(){
  var ids = ["people","hours","rate","share"];
  var els = {};
  ids.forEach(function(id){
    els[id] = document.getElementById("c-" + id);
    els[id].addEventListener("input", run);
  });
  /* Namespaced: the sliders already own c-hours, and an id collision here once
     silently pointed the result at the input. */
  var money = document.getElementById("c-out-money");
  var hoursOut = document.getElementById("c-out-hours");
  var fteOut = document.getElementById("c-out-fte");
  var fmt = new Intl.NumberFormat("${calc.currency.locale}", {
    style: "currency", currency: "${calc.currency.code}", maximumFractionDigits: 0
  });
  function round(n){
    if (n >= 100000) return Math.round(n / 10000) * 10000;
    if (n >= 10000) return Math.round(n / 1000) * 1000;
    return Math.round(n / 100) * 100;
  }
  function run(){
    var v = {};
    ids.forEach(function(id){
      v[id] = parseFloat(els[id].value);
      document.getElementById("c-" + id + "-out").textContent =
        id === "share" ? v[id] + "%" : id === "rate" ? "${calc.currency.symbol}" + v[id] : v[id];
    });
    var hours = v.people * v.hours * ${calc.weeksPerYear} * (v.share / 100);
    money.textContent = fmt.format(round(hours * v.rate));
    hoursOut.textContent = Math.round(hours / 10) * 10;
    fteOut.textContent = (hours / ${calc.fteHoursPerYear}).toFixed(1);
  }
  run();
})();
<\/script>`;

  return page({
    code, ui: U, title: C.seoTitle, description: C.seoDesc, bookingUrl,
    ...headLinks(code, (x) => sub(x, "calculator.html")),
    body: [
      pageHead({
        code, ui: U, eyebrow: C.eyebrow, h1: C.h1, lead: C.lead,
        meta: `${C.metaA} ${calc.weeksPerYear} ${C.metaB} ${calc.fteHoursPerYear} ${C.metaC}`,
        bookingUrl,
      }),
      calcSection, after,
    ].join("\n\n") + script,
  });
}

export function writeEngagement() {
  for (const code of LOCALES) {
    const dir = code === ROOT_LOCALE ? root : resolve(root, code);
    mkdirSync(dir, { recursive: true });
    writeFileSync(resolve(dir, "engagement.html"), renderEngagement(code), "utf8");
    writeFileSync(resolve(dir, "company-2030.html"), render2030(code), "utf8");
    writeFileSync(resolve(dir, "calculator.html"), renderCalculator(code), "utf8");
  }
  console.log("**/engagement.html, company-2030.html, calculator.html  (4 languages)");
}
