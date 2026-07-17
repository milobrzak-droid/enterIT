(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-panel");
  var main = document.querySelector("main");
  var footer = document.querySelector(".site-footer");
  var languageMenus = Array.prototype.slice.call(document.querySelectorAll(".language-menu"));
  var lastFocused = null;

  function syncHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function focusableItems() {
    if (!panel) return [];
    return Array.prototype.slice
      .call(panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'))
      .filter(function (element) { return element.getClientRects().length > 0; });
  }

  function setBehind(inactive) {
    [main, footer].forEach(function (element) {
      if (!element) return;
      if (inactive) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
  }

  function syncLanguageState() {
    if (!header) return;
    header.classList.toggle(
      "language-active",
      languageMenus.some(function (menu) { return menu.open; }),
    );
  }

  function closeLanguageMenus(except, restoreFocus) {
    languageMenus.forEach(function (menu) {
      if (menu === except || !menu.open) return;
      menu.open = false;
      if (restoreFocus) {
        var summary = menu.querySelector("summary");
        if (summary) summary.focus();
      }
    });
    syncLanguageState();
  }

  function initLanguageMenus() {
    languageMenus.forEach(function (menu) {
      menu.addEventListener("toggle", function () {
        if (menu.open) {
          closeLanguageMenus(menu, false);
          if (toggle && toggle.getAttribute("aria-expanded") === "true") closeMobileMenu(false);
        }
        syncLanguageState();
      });
    });

    document.addEventListener("pointerdown", function (event) {
      if (!event.target.closest(".language-menu")) closeLanguageMenus(null, false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape") return;
      var openMenu = languageMenus.find(function (menu) { return menu.open; });
      if (!openMenu) return;
      event.preventDefault();
      closeLanguageMenus(null, true);
    });
  }

  function openMobileMenu() {
    if (!toggle || !panel) return;
    closeLanguageMenus(null, false);
    lastFocused = document.activeElement;
    panel.hidden = false;
    panel.removeAttribute("inert");
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", toggle.dataset.closeLabel || toggle.getAttribute("aria-label"));
    document.body.classList.add("menu-open");
    if (header) header.classList.add("menu-active");
    setBehind(true);
    var items = focusableItems();
    if (items.length) items[0].focus();
  }

  function closeMobileMenu(restoreFocus) {
    if (!toggle || !panel) return;
    panel.hidden = true;
    panel.setAttribute("inert", "");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", toggle.dataset.openLabel || toggle.getAttribute("aria-label"));
    document.body.classList.remove("menu-open");
    if (header) header.classList.remove("menu-active");
    setBehind(false);
    if (restoreFocus && lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function initMobileMenu() {
    if (!toggle || !panel) return;

    closeMobileMenu(false);
    toggle.addEventListener("click", function () {
      if (toggle.getAttribute("aria-expanded") === "true") closeMobileMenu(true);
      else openMobileMenu();
    });

    panel.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMobileMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu(true);
        return;
      }
      if (event.key !== "Tab") return;
      var items = focusableItems();
      if (!items.length) return;
      var first = items[0];
      var last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 920 && toggle.getAttribute("aria-expanded") === "true") {
        closeMobileMenu(false);
      }
    });
  }

  function initMotion() {
    var revealItems = Array.prototype.slice.call(document.querySelectorAll(".reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealItems.forEach(function (element) { element.classList.add("in"); });
      return;
    }

    var cardSelector = ".rs-pain, .rs-dont, .rs-badge, .jp-block, .jp-stack-item, .f30-stat, .cap-grid > .cap, .eng-card, .rs-faq-item, .proof";
    revealItems.forEach(function (element, index) {
      var variant = "";
      if (element.matches(".h1, .h2, .lead, .hero-sub, .eyebrow")) variant = "text";
      else if (element.matches(cardSelector)) variant = "card";
      else if (element.matches(".rs-flow-step, .jp-step, .f30-level")) variant = "step";
      else if (element.matches(".rs-stats, .proof-grid, .stack, .team-grid, .tm-featured, .rs-badges, .rs-sec-box")) variant = "scale";
      if (variant) element.setAttribute("data-motion-variant", variant);
    });

    document.querySelectorAll(".block").forEach(function (section) {
      Array.prototype.forEach.call(section.querySelectorAll(".reveal"), function (element, index) {
        element.style.setProperty("--reveal-index", Math.min(index, 6));
      });
    });
    document.documentElement.classList.add("motion-ready");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { document.documentElement.classList.add("is-loaded"); });
    });

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (element) { element.classList.add("in"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });

    revealItems.forEach(function (element) { observer.observe(element); });
  }

  function init() {
    syncHeader();
    initLanguageMenus();
    initMobileMenu();
    initMotion();
    window.addEventListener("scroll", syncHeader, { passive: true });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
