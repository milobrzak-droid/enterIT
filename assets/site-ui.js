(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-panel");
  var main = document.querySelector("main");
  var footer = document.querySelector(".site-footer");
  var languageMenus = Array.prototype.slice.call(document.querySelectorAll(".language-menu"));
  var lastFocused = null;
  var panelCloseTimer = 0;
  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function initHeaderState() {
    if (!header) return;

    if (!("IntersectionObserver" in window)) {
      var ticking = false;
      function syncHeader() {
        header.classList.toggle("scrolled", window.scrollY > 12);
        ticking = false;
      }
      syncHeader();
      window.addEventListener("scroll", function () {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(syncHeader);
      }, { passive: true });
      return;
    }

    var sentinel = document.createElement("span");
    sentinel.className = "header-sentinel";
    sentinel.setAttribute("aria-hidden", "true");
    document.body.insertBefore(sentinel, document.body.firstChild);
    new IntersectionObserver(function (entries) {
      header.classList.toggle("scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
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
    window.clearTimeout(panelCloseTimer);
    closeLanguageMenus(null, false);
    lastFocused = document.activeElement;
    panel.hidden = false;
    panel.dataset.state = "opening";
    panel.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", toggle.dataset.closeLabel || toggle.getAttribute("aria-label"));
    document.body.classList.add("menu-open");
    if (header) header.classList.add("menu-active");
    setBehind(true);
    requestAnimationFrame(function () {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      panel.dataset.state = "open";
      panel.removeAttribute("inert");
      var items = focusableItems();
      if (items.length) items[0].focus();
    });
  }

  function finishMobileMenuClose() {
    if (!panel || panel.dataset.state === "open") return;
    panel.hidden = true;
    panel.dataset.state = "closed";
  }

  function closeMobileMenu(restoreFocus) {
    if (!toggle || !panel) return;
    window.clearTimeout(panelCloseTimer);
    panel.dataset.state = "closing";
    panel.setAttribute("inert", "");
    panel.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", toggle.dataset.openLabel || toggle.getAttribute("aria-label"));
    document.body.classList.remove("menu-open");
    if (header) header.classList.remove("menu-active");
    setBehind(false);
    panelCloseTimer = window.setTimeout(finishMobileMenuClose, reducedMotion ? 130 : 300);
    if (restoreFocus && lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function initMobileMenu() {
    if (!toggle || !panel) return;

    panel.dataset.state = "closed";
    panel.addEventListener("transitionend", function (event) {
      if (event.propertyName === "opacity" && panel.dataset.state === "closing") finishMobileMenuClose();
    });
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
    var motionRoot = document.documentElement;
    var observer = null;
    var activeAnimations = [];
    var reconcileFrame = 0;
    var onMotionScroll = null;
    var easing = "cubic-bezier(0.23, 1, 0.32, 1)";

    function clearWatchdog() {
      if (window.__enterITSubpageMotionWatchdog) {
        window.clearTimeout(window.__enterITSubpageMotionWatchdog);
        window.__enterITSubpageMotionWatchdog = null;
      }
    }

    function removeActiveAnimation(animation) {
      var index = activeAnimations.indexOf(animation);
      if (index !== -1) activeAnimations.splice(index, 1);
    }

    function releaseAnimation(animation) {
      removeActiveAnimation(animation);
      try { animation.cancel(); } catch (_error) {}
    }

    function finalize(element, animation) {
      if (!element) return;
      element.dataset.motionState = "done";
      if (!animation) return;
      window.requestAnimationFrame(function () { releaseAnimation(animation); });
    }

    function failOpen() {
      if (observer) observer.disconnect();
      if (reconcileFrame) window.cancelAnimationFrame(reconcileFrame);
      if (onMotionScroll) window.removeEventListener("scroll", onMotionScroll);
      activeAnimations.slice().forEach(function (animation) {
        try { animation.cancel(); } catch (_error) {}
      });
      activeAnimations.length = 0;
      motionRoot.classList.remove("subpage-motion");
      clearWatchdog();
    }

    if (
      reducedMotion ||
      !("IntersectionObserver" in window) ||
      typeof Element === "undefined" ||
      !("animate" in Element.prototype) ||
      !motionRoot.classList.contains("subpage-motion")
    ) {
      failOpen();
      return;
    }

    function play(element, variant, index) {
      if (!element || element.dataset.motionState === "running" || element.dataset.motionState === "done") return;
      element.dataset.motionState = "running";

      var delay = Math.min(index || 0, 7) * 46;
      var duration = 620;
      var frames = [
        { opacity: 0.32, transform: "translateY(16px)" },
        { opacity: 1, transform: "translateY(0)" }
      ];

      if (variant === "hero-title") {
        duration = 840;
        delay = 60;
        frames = [
          { opacity: 0.01, transform: "translateY(24px)", clipPath: "inset(0 0 23% 0)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }
        ];
      } else if (variant === "hero-body") {
        duration = 660;
        delay = 150 + Math.min(index || 0, 5) * 55;
        frames[0] = { opacity: 0.12, transform: "translateY(17px)" };
      } else if (variant === "heading") {
        duration = 720;
        frames = [
          { opacity: 0.28, transform: "translateY(18px)", clipPath: "inset(0 0 18% 0)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }
        ];
      } else if (variant === "rule") {
        duration = 760;
        frames = [
          { opacity: 0.5, clipPath: "inset(0 100% 0 0)" },
          { opacity: 1, clipPath: "inset(0 0 0 0)" }
        ];
      } else if (variant === "left" || variant === "right") {
        duration = 700;
        frames[0] = {
          opacity: 0.3,
          transform: "translateX(" + (variant === "left" ? "-20px" : "20px") + ")"
        };
        frames[1] = { opacity: 1, transform: "translateX(0)" };
      } else if (variant === "panel") {
        duration = 740;
        frames = [
          { opacity: 0.42, transform: "translateY(10px)", clipPath: "inset(0 0 0 9%)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0)" }
        ];
      } else if (variant === "contact") {
        duration = 780;
        frames = [
          { opacity: 0.48, transform: "translateY(10px)", clipPath: "inset(0 12% 0 0 round 16px)" },
          { opacity: 1, transform: "translateY(0)", clipPath: "inset(0 0 0 0 round 16px)" }
        ];
      }

      try {
        var animation = element.animate(frames, {
          duration: duration,
          delay: delay,
          easing: easing,
          fill: "both"
        });
        activeAnimations.push(animation);
        animation.finished.then(
          function () { finalize(element, animation); },
          function () { finalize(element, animation); }
        );
      } catch (_error) {
        finalize(element, null);
      }
    }

    function playGroup(element) {
      Array.prototype.forEach.call(element.children, function (child, index) {
        play(child, "item", index);
      });
    }

    try {
      var cues = [];
      var seen = [];
      function addCues(selector, variant, include) {
        Array.prototype.forEach.call(document.querySelectorAll(selector), function (element) {
          if (seen.indexOf(element) !== -1 || (include && !include(element))) return;
          seen.push(element);
          cues.push({ element: element, variant: variant, resolved: false });
        });
      }

      function outsideContactCard(element) {
        return !element.closest(".cta-card");
      }

      function withoutNestedTeamGrid(element) {
        return !element.matches(".team-group") || !element.querySelector(".team-grid");
      }

      addCues(".block:not(.rs-hero):not(.jp-hero):not(.f30-hero):not(.tym-hero):not(.legal-hero) .h2", "heading", outsideContactCard);
      addCues(".block:not(.rs-hero):not(.jp-hero):not(.f30-hero):not(.tym-hero):not(.legal-hero) .lead", "item", outsideContactCard);
      addCues(".rs-pains, .rs-donts, .rs-flow, .rs-need, .rs-badges, .rs-stats, .rs-faq, .jp-blocks, .jp-stack, .jp-walk, .f30-stats, .f30-levels, .eng-grid, .cap-grid, .proof-grid, .team-grid", "group");
      addCues(".rs-sec-box, .rs-case, .jp-callout, .f30-quote, .stack, .team-group", "panel", withoutNestedTeamGrid);
      addCues(".cta-card", "contact");

      function cueFor(element) {
        for (var index = 0; index < cues.length; index += 1) {
          if (cues[index].element === element) return cues[index];
        }
        return null;
      }

      function playCue(cue) {
        if (!cue) return;
        if (cue.variant === "group") playGroup(cue.element);
        else play(cue.element, cue.variant, 0);
      }

      function finalizeCue(cue) {
        if (cue.variant === "group") {
          Array.prototype.forEach.call(cue.element.children, function (child) { finalize(child, null); });
        } else {
          finalize(cue.element, null);
        }
      }

      function stopReconciliationWhenSettled() {
        var hasActiveCue = cues.some(function (cue) {
          return !cue.resolved && !cue.element.closest("details:not([open])");
        });
        if (hasActiveCue) return;
        if (reconcileFrame) {
          window.cancelAnimationFrame(reconcileFrame);
          reconcileFrame = 0;
        }
        if (onMotionScroll) {
          window.removeEventListener("scroll", onMotionScroll);
          onMotionScroll = null;
        }
      }

      function resolveCue(cue, shouldPlay) {
        if (!cue || cue.resolved) return;
        cue.resolved = true;
        observer.unobserve(cue.element);
        if (shouldPlay) playCue(cue);
        else finalizeCue(cue);
        stopReconciliationWhenSettled();
      }

      observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          resolveCue(cueFor(entry.target), true);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });

      function runReconciliation() {
        reconcileFrame = 0;
        var currentEntryBottom = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.94;
        var currentMeasurements = cues
          .filter(function (cue) { return !cue.resolved; })
          .map(function (cue) {
            return {
              cue: cue,
              rect: cue.element.getBoundingClientRect(),
              insideClosedDetails: Boolean(cue.element.closest("details:not([open])"))
            };
          });

        currentMeasurements.forEach(function (measurement) {
          if (measurement.insideClosedDetails) return;
          if (measurement.rect.bottom <= 0) resolveCue(measurement.cue, false);
          else if (measurement.rect.top < currentEntryBottom && measurement.rect.bottom > 0) resolveCue(measurement.cue, true);
        });
        stopReconciliationWhenSettled();
      }

      function scheduleReconciliation() {
        if (!reconcileFrame) reconcileFrame = window.requestAnimationFrame(runReconciliation);
      }

      function ensureReconciliation() {
        if (onMotionScroll) return;
        onMotionScroll = scheduleReconciliation;
        window.addEventListener("scroll", onMotionScroll, { passive: true });
      }

      var measurements = cues.map(function (cue) {
        return {
          cue: cue,
          rect: cue.element.getBoundingClientRect(),
          insideClosedDetails: Boolean(cue.element.closest("details:not([open])"))
        };
      });
      var entryBottom = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.94;
      var passed = [];
      var immediate = [];
      var pending = [];

      measurements.forEach(function (measurement) {
        var rect = measurement.rect;
        if (measurement.insideClosedDetails || (rect.width === 0 && rect.height === 0)) {
          pending.push(measurement.cue);
        } else if (rect.bottom <= 0) {
          passed.push(measurement.cue);
        } else if (rect.top < entryBottom && rect.bottom > 0) {
          immediate.push(measurement.cue);
        } else {
          pending.push(measurement.cue);
        }
      });

      pending.forEach(function (cue) { observer.observe(cue.element); });
      ensureReconciliation();
      clearWatchdog();

      var nav = document.querySelector(".nav-shell");
      var hero = document.querySelector(".rs-hero, .jp-hero, .f30-hero, .tym-hero, .legal-hero");
      var heroTitle = hero && hero.querySelector(".h1");
      if (nav) play(nav, "hero-body", 0);
      play(heroTitle, "hero-title", 0);
      if (hero) {
        var heroWrap = hero.querySelector(".wrap");
        if (heroWrap) {
          Array.prototype.forEach.call(heroWrap.children, function (child, index) {
            if (child !== heroTitle) play(child, "hero-body", index);
          });
        }
      }

      passed.forEach(function (cue) { resolveCue(cue, false); });
      immediate.forEach(function (cue) { resolveCue(cue, true); });
      stopReconciliationWhenSettled();
    } catch (_error) {
      failOpen();
    }
  }

  function init() {
    initHeaderState();
    initLanguageMenus();
    initMobileMenu();
    if (!document.body.classList.contains("brand-manual")) initMotion();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
