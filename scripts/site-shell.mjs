export const languageNames = {
  cs: "Čeština",
  en: "English",
  de: "Deutsch",
  pl: "Polski",
};

export const languageCodes = {
  cs: "CZ",
  en: "EN",
  de: "DE",
  pl: "PL",
};

export const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export const arrow = `<svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10h13M11 5l5 5-5 5"/></svg>`;

export function languageMenu({ current, label, links, order }) {
  const options = order
    .map((code) => {
      const currentAttribute = code === current ? ' aria-current="page"' : "";
      return `<li><a class="language-menu__option" href="${escapeHtml(links[code])}" lang="${code}" hreflang="${code}"${currentAttribute}><span>${languageNames[code]}</span><small aria-hidden="true">${languageCodes[code]}</small></a></li>`;
    })
    .join("");

  return `<details class="language-menu">
  <summary class="language-menu__trigger"><span class="sr-only">${escapeHtml(label)}: ${languageNames[current]}</span><span class="language-menu__current" aria-hidden="true">${languageCodes[current]}</span><svg class="language-menu__chevron" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m4 6 4 4 4-4"/></svg></summary>
  <ul class="language-menu__popover">${options}</ul>
</details>`;
}

const emailIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`;
const phoneIcon = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/></svg>`;

function footerSocialLinks() {
  return `<div class="social-links">
    <a href="https://www.facebook.com/profile.php?id=61579684083040" target="_blank" rel="noopener" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z"/></svg></a>
    <a href="https://www.instagram.com/enterco/" target="_blank" rel="noopener" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a>
    <a href="https://www.linkedin.com/company/enterin/" target="_blank" rel="noopener" aria-label="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21H9z"/></svg></a>
  </div>`;
}

export function siteFooter(page) {
  const solutionLinks = page.footer.solutions
    .map(([label, href]) => `<a href="/${page.prefix}${escapeHtml(href)}">${escapeHtml(label)}</a>`)
    .join("");

  return `<footer class="site-footer">
  <div class="shell">
    <div class="footer-intro">
      <a class="footer-brand" href="${escapeHtml(page.homeHref)}" aria-label="${escapeHtml(page.homeLabel)}">
        <img src="/assets/enter_logo_white.svg" alt="EnterIT" width="477" height="200" loading="lazy" decoding="async">
      </a>
      <h2 class="footer-statement">${escapeHtml(page.footer.headline)}</h2>
    </div>
    <div class="footer-main">
      <section class="footer-contact" aria-labelledby="footer-contact-heading">
        <h2 class="footer-heading" id="footer-contact-heading">${escapeHtml(page.footer.contactHeading)}</h2>
        <div class="footer-contact-links">
          <a href="mailto:milo@enterit.cz">${emailIcon}<span>milo@enterit.cz</span></a>
          <a href="tel:+420608969263">${phoneIcon}<span>+420 608 969 263</span></a>
        </div>
        <address class="footer-address"><strong>AI Enter s.r.o.</strong><span>IČO 19086652 · DIČ CZ19086652</span><span>Zahradní 2004/46d</span><span>792 01 Bruntál, Czechia</span></address>
      </section>
      <nav class="footer-column" aria-labelledby="footer-menu-heading">
        <h2 class="footer-heading" id="footer-menu-heading">${escapeHtml(page.footer.menuHeading)}</h2>
        <div class="footer-links">
          <a href="${escapeHtml(page.homeHref)}#services">${escapeHtml(page.nav.services)}</a>
          <a href="${escapeHtml(page.homeHref)}#results">${escapeHtml(page.nav.results)}</a>
          <a href="${escapeHtml(page.homeHref)}#process">${escapeHtml(page.nav.process)}</a>
          <a href="${escapeHtml(page.homeHref)}#integrations">${escapeHtml(page.nav.integrations)}</a>
          <a href="/${page.prefix}tym.html">${escapeHtml(page.nav.team)}</a>
          <a href="https://enterai.cz/" target="_blank" rel="noopener">EnterAI</a>
        </div>
      </nav>
      <nav class="footer-column footer-solutions" aria-labelledby="footer-solutions-heading">
        <h2 class="footer-heading" id="footer-solutions-heading">${escapeHtml(page.footer.solutionsHeading)}</h2>
        <div class="footer-links">${solutionLinks}</div>
      </nav>
      <div class="footer-social">
        <h2 class="footer-heading">${escapeHtml(page.footer.socialHeading)}</h2>
        ${footerSocialLinks()}
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 EnterIT · AI Enter s.r.o. · IČO 19086652 · DIČ CZ19086652 · Zahradní 2004/46d, 792 01 Bruntál</span>
      <span class="footer-legal"><a href="/${page.prefix}gdpr.html">${escapeHtml(page.footer.privacy)}</a><a href="/${page.prefix}podminky.html">${escapeHtml(page.footer.terms)}</a></span>
    </div>
  </div>
</footer>`;
}
