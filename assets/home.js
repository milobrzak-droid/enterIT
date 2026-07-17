(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-panel");
  var main = document.getElementById("main-content");
  var footer = document.querySelector(".site-footer");
  var languageMenus = Array.prototype.slice.call(document.querySelectorAll(".language-menu"));
  var lastFocused = null;

  function syncHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 12);
  }

  function focusableItems() {
    if (!panel) return [];
    return Array.prototype.slice.call(
      panel.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (element) {
      return element.getClientRects().length > 0;
    });
  }

  function syncLanguageState() {
    if (!header) return;
    header.classList.toggle(
      "language-active",
      languageMenus.some(function (menu) { return menu.open; })
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
          if (toggle && toggle.getAttribute("aria-expanded") === "true") closeMenu(false);
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

  function initMotion() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    var root = document.documentElement;
    var heroItems = [
      document.querySelector(".hero h1"),
      document.querySelector(".hero__bottom"),
      document.querySelector(".proof-strip")
    ].filter(Boolean);

    heroItems.forEach(function (element, index) {
      element.setAttribute("data-hero-reveal", "");
      element.style.setProperty("--reveal-index", index);
    });

    document.querySelectorAll("main section, .partner-bar").forEach(function (section) {
      var candidates = section.querySelectorAll(
        ".partner-bar__inner, .section-kicker, .section-title, .section-intro, .service-card, .solution-card, .case-card, .implementation-panel, .implementation-step, .process-step, .integration-copy, .system-group, .operation-card, .team-copy, .team-portraits, .portrait, .resource-card, .calculator-form, .calculator-result, .contact-card"
      );
      Array.prototype.forEach.call(candidates, function (element, index) {
        if (element.hasAttribute("data-hero-reveal") || element.hasAttribute("data-reveal")) return;
        if (element.parentElement && element.parentElement.closest("[data-reveal]")) return;
        var variant = "";
        if (element.matches(".section-kicker, .section-title, .section-intro")) variant = "text";
        else if (element.matches(".service-card, .solution-card, .case-card, .implementation-step, .process-step, .system-group, .operation-card, .portrait, .resource-card")) variant = "card";
        else if (element.matches(".integration-copy, .team-copy")) variant = "left";
        else if (element.matches(".team-portraits")) variant = "right";
        else if (element.matches(".implementation-panel, .calculator-form, .calculator-result, .contact-card")) variant = "scale";
        element.setAttribute("data-reveal", variant);
        element.style.setProperty("--reveal-index", Math.min(index, 6));
      });
    });

    root.classList.add("motion-ready");
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { root.classList.add("is-loaded"); });
    });

    var revealItems = document.querySelectorAll("[data-reveal]");
    if (!("IntersectionObserver" in window)) {
      revealItems.forEach(function (element) { element.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -7% 0px" });

    revealItems.forEach(function (element) { observer.observe(element); });
  }

  function initIntegrationSearch() {
    var input = document.querySelector("[data-integration-search]");
    if (!input) return;

    var catalog = input.closest(".integration-catalog");
    if (!catalog) return;

    var groups = Array.prototype.slice.call(catalog.querySelectorAll(".system-group"));
    var empty = catalog.querySelector("[data-integration-empty]");
    var count = catalog.querySelector("[data-integration-count]");
    var pluralRules = typeof Intl.PluralRules === "function"
      ? new Intl.PluralRules(document.documentElement.lang || "en")
      : null;

    function normalize(value) {
      return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function matchesQuery(label, query) {
      if (!query) return true;

      var words = label.split(/[^a-z0-9]+/).filter(Boolean);
      var queryWords = query.split(/[^a-z0-9]+/).filter(Boolean);

      return queryWords.every(function (queryWord) {
        return words.some(function (word) {
          return word.indexOf(queryWord) === 0;
        }) || (queryWord.length >= 4 && label.indexOf(queryWord) !== -1);
      });
    }

    function filterSystems() {
      var query = normalize(input.value.trim());
      var visible = 0;

      groups.forEach(function (group) {
        var groupVisible = 0;
        var chips = Array.prototype.slice.call(group.querySelectorAll(".system-list span"));

        chips.forEach(function (chip) {
          var matches = matchesQuery(normalize(chip.textContent), query);
          chip.hidden = !matches;
          if (matches) groupVisible += 1;
        });

        group.hidden = groupVisible === 0;
        visible += groupVisible;
      });

      if (empty) empty.hidden = visible !== 0;
      if (count) {
        var category = pluralRules ? pluralRules.select(visible) : (visible === 1 ? "one" : "other");
        var dataKey = "count" + category.charAt(0).toUpperCase() + category.slice(1);
        var suffix = count.dataset[dataKey] || count.dataset.countOther || "";
        count.textContent = String(visible) + (suffix ? " " + suffix : "");
      }
    }

    input.addEventListener("input", filterSystems);
    filterSystems();
  }

  function initCalculator() {
    var calculator = document.querySelector("[data-calculator]");
    if (!calculator) return;

    var inputs = Array.prototype.slice.call(calculator.querySelectorAll("input[type='range'][data-calc-field]"));
    var money = calculator.querySelector("[data-calc-money]");
    var hours = calculator.querySelector("[data-calc-hours]");
    var fte = calculator.querySelector("[data-calc-fte]");
    var locale = calculator.dataset.locale || document.documentElement.lang || "en";
    var currency = calculator.dataset.currency || "EUR";
    var weeks = Number(calculator.dataset.weeks) || 46;
    var fteHours = Number(calculator.dataset.fteHours) || 1840;
    var numberFormat = new Intl.NumberFormat(locale, { maximumFractionDigits: 0 });
    var decimalFormat = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
    var currencyFormat = new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    });

    function field(name) {
      return inputs.find(function (input) { return input.dataset.calcField === name; });
    }

    function updateRange(input) {
      var min = Number(input.min) || 0;
      var max = Number(input.max) || 100;
      var progress = max === min ? 0 : ((Number(input.value) - min) / (max - min)) * 100;
      input.style.setProperty("--range-progress", progress + "%");

      var output = calculator.querySelector("[data-calc-output='" + input.dataset.calcField + "']");
      if (!output) return;
      var valueText = "";
      if (input.dataset.calcField === "rate") {
        valueText = currencyFormat.format(Number(input.value));
      } else {
        var suffix = input.dataset.suffix || "";
        var prefix = input.dataset.prefix || "";
        valueText = prefix + numberFormat.format(Number(input.value)) + suffix;
      }
      output.textContent = valueText;
      input.setAttribute("aria-valuetext", valueText);
    }

    function calculate() {
      inputs.forEach(updateRange);
      var people = Number(field("people").value);
      var routineHours = Number(field("hours").value);
      var hourlyRate = Number(field("rate").value);
      var share = Number(field("share").value) / 100;
      var savedHours = people * routineHours * share * weeks;

      if (money) money.textContent = currencyFormat.format(savedHours * hourlyRate);
      if (hours) hours.textContent = numberFormat.format(savedHours) + " h";
      if (fte) fte.textContent = decimalFormat.format(savedHours / fteHours) + "×";
    }

    inputs.forEach(function (input) { input.addEventListener("input", calculate); });
    calculate();
  }

  function setBehind(inactive) {
    [main, footer].forEach(function (element) {
      if (!element) return;
      if (inactive) element.setAttribute("inert", "");
      else element.removeAttribute("inert");
    });
  }

  function openMenu() {
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

  function closeMenu(restoreFocus) {
    if (!toggle || !panel) return;
    panel.hidden = true;
    panel.setAttribute("inert", "");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", toggle.dataset.openLabel || toggle.getAttribute("aria-label"));
    document.body.classList.remove("menu-open");
    if (header) header.classList.remove("menu-active");
    setBehind(false);
    if (restoreFocus && lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  syncHeader();
  initLanguageMenus();
  initMotion();
  initIntegrationSearch();
  initCalculator();
  window.addEventListener("scroll", syncHeader, { passive: true });

  if (!toggle || !panel) return;

  toggle.addEventListener("click", function () {
    if (toggle.getAttribute("aria-expanded") === "true") closeMenu(true);
    else openMenu();
  });

  panel.addEventListener("click", function (event) {
    var link = event.target.closest("a");
    if (link) closeMenu(false);
  });

  document.addEventListener("keydown", function (event) {
    if (toggle.getAttribute("aria-expanded") !== "true") return;
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu(true);
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
      closeMenu(false);
    }
  });
})();
