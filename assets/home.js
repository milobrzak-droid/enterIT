(function () {
  "use strict";

  var header = document.getElementById("site-header");
  var toggle = document.getElementById("menu-toggle");
  var panel = document.getElementById("mobile-panel");
  var main = document.getElementById("main-content");
  var footer = document.querySelector(".site-footer");
  var languageMenus = Array.prototype.slice.call(document.querySelectorAll(".language-menu"));
  var lastFocused = null;
  var panelCloseTimer = 0;
  var motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
  var reducedMotion = motionPreference.matches;
  var rootStyles = window.getComputedStyle(document.documentElement);
  var activeAnimations = [];
  var stopCountUps = function () {};

  function cssValue(name, fallback) {
    return rootStyles.getPropertyValue(name).trim() || fallback;
  }

  function cssDuration(name, fallback) {
    var value = cssValue(name, fallback + "ms");
    if (value.slice(-2) === "ms") return Number(value.slice(0, -2)) || fallback;
    if (value.slice(-1) === "s") return (Number(value.slice(0, -1)) || (fallback / 1000)) * 1000;
    return Number(value) || fallback;
  }

  var motion = {
    easeOut: cssValue("--ease-premium", "cubic-bezier(0.16, 1, 0.3, 1)"),
    fast: cssDuration("--motion-fast", 140),
    ui: cssDuration("--motion-ui", 220),
    stagger: cssDuration("--motion-stagger", 46)
  };

  function forgetAnimation(animation) {
    var index = activeAnimations.indexOf(animation);
    if (index !== -1) activeAnimations.splice(index, 1);
  }

  function cssAnimationFallback(element, frames, options) {
    var first = frames[0] || {};
    var last = frames[frames.length - 1] || {};
    var computed = window.getComputedStyle(element);
    var baseOpacity = computed.opacity || "1";
    var baseTransform = computed.transform === "none" ? "none" : computed.transform;
    var baseFilter = computed.filter === "none" ? "none" : computed.filter;
    var className = element._homeMotionFallbackToggle
      ? "home-motion-fallback-a"
      : "home-motion-fallback-b";
    var variables = {
      "--home-motion-duration": options.duration + "ms",
      "--home-motion-delay": (options.delay || 0) + "ms",
      "--home-motion-easing": options.easing || motion.easeOut,
      "--home-motion-properties": [
        "opacity",
        Object.prototype.hasOwnProperty.call(first, "transform") || Object.prototype.hasOwnProperty.call(last, "transform") ? "transform" : "",
        Object.prototype.hasOwnProperty.call(first, "filter") || Object.prototype.hasOwnProperty.call(last, "filter") ? "filter" : ""
      ].filter(Boolean).join(", "),
      "--home-motion-from-opacity": Object.prototype.hasOwnProperty.call(first, "opacity") ? first.opacity : baseOpacity,
      "--home-motion-to-opacity": Object.prototype.hasOwnProperty.call(last, "opacity") ? last.opacity : baseOpacity,
      "--home-motion-from-transform": Object.prototype.hasOwnProperty.call(first, "transform") ? first.transform : baseTransform,
      "--home-motion-to-transform": Object.prototype.hasOwnProperty.call(last, "transform") ? last.transform : baseTransform,
      "--home-motion-from-filter": Object.prototype.hasOwnProperty.call(first, "filter") ? first.filter : baseFilter,
      "--home-motion-to-filter": Object.prototype.hasOwnProperty.call(last, "filter") ? last.filter : baseFilter
    };
    var finishTimer = 0;
    var settled = false;
    var resolveFinished;
    var rejectFinished;
    var finished = new Promise(function (resolve, reject) {
      resolveFinished = resolve;
      rejectFinished = reject;
    });

    function cleanFallback() {
      window.clearTimeout(finishTimer);
      element.removeEventListener("animationend", onAnimationEnd);
      element.classList.remove(className);
      Object.keys(variables).forEach(function (name) { element.style.removeProperty(name); });
    }

    function finish() {
      if (settled) return;
      settled = true;
      resolveFinished();
    }

    function onAnimationEnd(event) {
      if (event.target !== element || event.animationName !== className) return;
      finish();
    }

    var controller = {
      finished: finished,
      cancel: function () {
        cleanFallback();
        if (!settled) {
          settled = true;
          rejectFinished(new Error("Animation canceled"));
        }
      }
    };

    element._homeMotionFallbackToggle = !element._homeMotionFallbackToggle;
    Object.keys(variables).forEach(function (name) { element.style.setProperty(name, variables[name]); });
    element.addEventListener("animationend", onAnimationEnd);
    element.classList.add(className);
    finishTimer = window.setTimeout(finish, (options.delay || 0) + options.duration + 80);

    return controller;
  }

  function playMotion(element, frames, options, ownerKey) {
    if (!element || reducedMotion) return null;
    if (ownerKey && element[ownerKey]) element[ownerKey].cancel();

    var animation = typeof element.animate === "function"
      ? element.animate(frames, {
        duration: options.duration,
        delay: options.delay || 0,
        easing: options.easing || motion.easeOut,
        fill: "backwards"
      })
      : cssAnimationFallback(element, frames, options);
    activeAnimations.push(animation);
    if (ownerKey) element[ownerKey] = animation;

    function cleanUp() {
      forgetAnimation(animation);
      if (ownerKey && element[ownerKey] === animation) element[ownerKey] = null;
    }

    animation.finished.then(function () {
      cleanUp();
      animation.cancel();
    }).catch(cleanUp);
    return animation;
  }

  function cancelActiveAnimations() {
    activeAnimations.slice().forEach(function (animation) { animation.cancel(); });
    activeAnimations.length = 0;
    Array.prototype.forEach.call(document.querySelectorAll(".home-motion-pending"), function (element) {
      element.classList.remove("home-motion-pending");
    });
  }

  function finalOpacity(element) {
    var value = Number(window.getComputedStyle(element).opacity);
    return isFinite(value) ? value : 1;
  }

  function visualState(element) {
    var computed = window.getComputedStyle(element);
    return {
      opacity: computed.opacity || "1",
      transform: computed.transform === "none" ? "none" : computed.transform,
      filter: computed.filter === "none" ? "none" : computed.filter
    };
  }

  function revealTransform(element, transform, duration, delay, opacity) {
    if (!element) return null;
    return playMotion(element, [
      { opacity: typeof opacity === "number" ? opacity : 0.28, transform: transform },
      { opacity: finalOpacity(element), transform: "none" }
    ], { duration: duration, delay: delay || 0 }, "_homeEntranceAnimation");
  }

  function revealOpacity(element, duration, delay, opacity) {
    if (!element) return null;
    return playMotion(element, [
      { opacity: typeof opacity === "number" ? opacity : 0.28 },
      { opacity: finalOpacity(element) }
    ], { duration: duration, delay: delay || 0 }, "_homeEntranceAnimation");
  }

  function desktopDelay(index) {
    if (!window.matchMedia("(min-width: 921px)").matches) return 0;
    return Math.min(index * motion.stagger, 138);
  }

  function onMotionPreferenceChange(event) {
    reducedMotion = event.matches;
    if (reducedMotion) {
      cancelActiveAnimations();
      stopCountUps();
    }
  }

  if (typeof motionPreference.addEventListener === "function") {
    motionPreference.addEventListener("change", onMotionPreferenceChange);
  } else if (typeof motionPreference.addListener === "function") {
    motionPreference.addListener(onMotionPreferenceChange);
  }

  function initHeaderState() {
    if (!header) return;

    if (!("IntersectionObserver" in window)) {
      header.classList.add("scrolled");
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

  function processRouteState(grid) {
    if (!grid) return null;
    var route = grid.querySelector(".process-route");
    var mascot = grid.querySelector(".process-route__mascot");
    if (!route || !mascot) return null;
    var mobile = window.matchMedia("(max-width: 1120px)").matches;
    var distance = mobile
      ? Math.max(0, route.clientHeight - mascot.offsetHeight)
      : Math.max(0, route.clientWidth - mascot.offsetWidth);
    return {
      mobile: mobile,
      mascot: mascot,
      transform: mobile
        ? "translate3d(0, " + distance + "px, 0) rotate(0)"
        : "translate3d(" + distance + "px, 0, 0) rotate(0)"
    };
  }

  function settleProcessRoute(grid) {
    var state = processRouteState(grid);
    if (state) state.mascot.style.transform = state.transform;
    return state;
  }

  function initMotion() {
    var processGrids = Array.prototype.slice.call(document.querySelectorAll(".process-grid"));
    processGrids.forEach(settleProcessRoute);
    if (reducedMotion) return;

    if (!("IntersectionObserver" in window)) return;

    function isInsideViewport(element) {
      var rect = element.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return rect.bottom > 0 && rect.top < viewportHeight;
    }

    function shouldQuickReveal(entry) {
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      return entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top < viewportHeight * 0.42;
    }

    function cueDuration(value, quick) {
      return quick ? Math.max(180, Math.round(value * 0.46)) : value;
    }

    function cueDelay(value, quick) {
      return quick ? 0 : value;
    }

    function quickReveal(element) {
      return revealTransform(element, "translate3d(0, 4px, 0)", 190, 0, 0.86);
    }

    function playChildren(container, selector, horizontal, quick) {
      var children = Array.prototype.slice.call(container.querySelectorAll(selector));
      children.forEach(function (child, index) {
        if (quick) {
          quickReveal(child);
          return;
        }
        var direction = horizontal && index % 2 ? 16 : horizontal ? -16 : 18;
        var transform = horizontal
          ? "translate3d(" + direction + "px, 0, 0)"
          : "translate3d(0, " + direction + "px, 0)";
        revealTransform(child, transform, 500, desktopDelay(index), 0.24);
      });
    }

    function revealCue(element, quick) {
      if (!element || element.dataset.homeMotionDone === "true") return;
      element.dataset.homeMotionDone = "true";
      element.classList.remove("home-motion-pending");

      if (element.matches(".section-head")) {
        if (quick) {
          quickReveal(element);
          return;
        }
        var kicker = element.querySelector(".section-kicker");
        var title = element.querySelector(".section-title");
        var intro = element.querySelector(".section-intro");
        var processMascot = element.querySelector(".process-head__mascot");
        revealTransform(kicker, "translate3d(0, 8px, 0)", 400, 0, 0.32);
        revealTransform(title, "translate3d(0, 14px, 0)", 520, 25, 0.24);
        revealTransform(intro, "translate3d(0, 10px, 0)", 440, 80, 0.32);
        playMotion(processMascot, [
          { opacity: 0.18, transform: "translate3d(18px, 12px, 0) rotate(2deg)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) rotate(-1deg)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0)" }
        ], { duration: 680, delay: 120, easing: motion.easeOut }, "_homeProcessHeaderMascotEntrance");
        return;
      }

      if (element.matches(".brand-illustration")) {
        var illustration = element.querySelector(".brand-illustration__scene");
        var illustrationMascot = element.querySelector(".brand-illustration__mascot");
        if (quick) {
          quickReveal(element);
          return;
        }
        if (illustration) {
          playMotion(illustration, [
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0 0 0)" }
          ], { duration: 680, delay: 0, easing: motion.easeOut }, "_homeIllustrationEntrance");
        }
        if (illustrationMascot) {
          playMotion(illustrationMascot, [
            { opacity: 0.12, transform: "translate3d(18px, 12px, 0) rotate(2deg)" },
            { opacity: finalOpacity(illustrationMascot), transform: "translate3d(0, 0, 0) rotate(0)" }
          ], { duration: 620, delay: 170, easing: motion.easeOut }, "_homeIllustrationMascotEntrance");
        }
        return;
      }

      if (element.matches(".service-card")) {
        if (quick) {
          quickReveal(element);
          return;
        }
        var serviceParts = Array.prototype.slice.call(element.children);
        serviceParts.forEach(function (part, index) {
          revealTransform(part, "translate3d(" + (index === 0 ? -12 : 0) + "px, " + (index === 0 ? 0 : 8) + "px, 0)", 480, desktopDelay(index), 0.28);
        });
        return;
      }

      if (element.matches(".solution-card")) {
        var solutionIndex = Array.prototype.indexOf.call(element.parentElement.children, element);
        playMotion(element, [
          {
            opacity: quick ? 0.86 : 0.72,
            transform: "translate3d(0, " + (quick ? 4 : 14) + "px, 0)",
            clipPath: quick ? "inset(0 0 0 0)" : "inset(0 0 8% 0)"
          },
          {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
            clipPath: "inset(0 0 0 0)"
          }
        ], {
          duration: cueDuration(520, quick),
          delay: cueDelay(desktopDelay(solutionIndex % 2), quick),
          easing: motion.easeOut
        }, "_homeEntranceAnimation");
        if (!quick) {
          var solutionInput = element.querySelector(".solution-card__input");
          var solutionArrow = element.querySelector(".solution-card__arrow");
          var solutionOutput = element.querySelector(".solution-card__output");
          var solutionProof = element.querySelector(".solution-card__proof");
          revealOpacity(solutionInput, 320, 90, 0.46);
          playMotion(solutionArrow, [
            { opacity: 0.3, transform: "scaleX(0.25)" },
            { opacity: 1, transform: "scaleX(1)" }
          ], { duration: 300, delay: 150, easing: motion.easeOut }, "_homeFlowArrowEntrance");
          revealTransform(solutionOutput, "translate3d(9px, 0, 0)", 380, 210, 0.2);
          revealTransform(solutionProof, "translate3d(0, 7px, 0)", 400, 285, 0.24);
        }
        return;
      }

      if (element.matches(".case-card")) {
        var metric = element.querySelector("strong");
        var metricRule = element.querySelector(".case-card__metric-rule");
        if (quick) {
          quickReveal(element);
          return;
        }
        revealTransform(element, "translate3d(0, 18px, 0)", 560, 0, 0.18);
        revealTransform(metric, "translate3d(0, 0.24em, 0)", 660, 0, 0.18);
        Array.prototype.forEach.call(
          element.querySelectorAll(".case-card__detail, .case-card__impact, .case-card__technology"),
          function (detail, index) {
            revealTransform(detail, "translate3d(0, 9px, 0)", 440, 90 + (index * 58), 0.24);
          }
        );
        playMotion(metricRule, [
          { transform: "scaleX(0)" },
          { transform: "scaleX(1)" }
        ], { duration: 440, delay: 150, easing: motion.easeOut }, "_homeMetricRuleEntrance");
        return;
      }

      if (element.matches(".implementation-panel__top")) {
        if (quick) quickReveal(element);
        else revealTransform(element, "translate3d(0, 10px, 0)", 440, 0, 0.34);
        return;
      }

      if (element.matches(".implementation-flow")) {
        var implementationSteps = Array.prototype.slice.call(element.querySelectorAll(".implementation-step"));
        var verticalConnectors = window.matchMedia("(max-width: 1120px)").matches;
        implementationSteps.forEach(function (step, index) {
          var implementationDelay = cueDelay(index * 92, quick);
          revealTransform(
            step,
            quick ? "translate3d(0, 4px, 0)" : (verticalConnectors ? "translate3d(0, 12px, 0)" : "translate3d(-14px, 0, 0)"),
            cueDuration(500, quick),
            implementationDelay,
            quick ? 0.86 : 0.3
          );
          var connector = step.querySelector(".implementation-connector");
          if (connector) {
            playMotion(connector, [
              { transform: verticalConnectors ? "scaleY(0)" : "scaleX(0)" },
              { transform: verticalConnectors ? "scaleY(1)" : "scaleX(1)" }
            ], {
              duration: cueDuration(360, quick),
              delay: cueDelay(index * 92 + 170, quick),
              easing: motion.easeOut
            }, "_homeConnectorEntrance");
          }
          var humanMascot = step.querySelector(".implementation-mascot");
          if (humanMascot) {
            playMotion(humanMascot, [
              { opacity: quick ? 0.82 : 0.16, transform: "translate3d(0, " + (quick ? 4 : 14) + "px, 0) rotate(1.5deg)" },
              { opacity: 1, transform: "translate3d(0, 0, 0) rotate(-0.8deg)" },
              { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0)" }
            ], {
              duration: cueDuration(620, quick),
              delay: cueDelay(index * 92 + 210, quick),
              easing: motion.easeOut
            }, "_homeHumanMascotEntrance");
          }
        });
        return;
      }

      if (element.matches(".implementation-outcomes")) {
        playChildren(element, ".implementation-outcome", false, quick);
        return;
      }

      if (element.matches(".implementation-note")) {
        if (quick) quickReveal(element);
        else revealOpacity(element, 400, 0, 0.4);
        return;
      }

      if (element.matches(".process-grid")) {
        var processState = settleProcessRoute(element);
        var processMobile = processState ? processState.mobile : window.matchMedia("(max-width: 620px)").matches;
        var processRoute = element.querySelector(".process-route");
        var processFill = element.querySelector(".process-route__fill");
        var processMascot = element.querySelector(".process-route__mascot");
        var processSteps = Array.prototype.slice.call(element.querySelectorAll(".process-step"));
        if (processFill) {
          playMotion(processFill, [
            { transform: processMobile ? "scaleY(0)" : "scaleX(0)" },
            { transform: processMobile ? "scaleY(1)" : "scaleX(1)" }
          ], { duration: cueDuration(780, quick), delay: 0, easing: motion.easeOut }, "_homeProcessFillEntrance");
        }
        if (processRoute && processMascot && processState) {
          playMotion(processMascot, [
            { opacity: quick ? 0.82 : 0.35, transform: "translate3d(0, 0, 0) rotate(-2deg)" },
            { opacity: 1, transform: processState.transform }
          ], { duration: cueDuration(860, quick), delay: 0, easing: motion.easeOut }, "_homeProcessMascotEntrance");
        }
        processSteps.forEach(function (step, index) {
          var stepDelay = cueDelay(index * 105, quick);
          var timing = step.querySelector(".process-step__timing");
          var heading = step.querySelector("h3");
          var copy = step.querySelector("p");
          revealOpacity(timing, cueDuration(360, quick), stepDelay, quick ? 0.86 : 0.38);
          revealTransform(heading, "translate3d(0, " + (quick ? 4 : 9) + "px, 0)", cueDuration(460, quick), stepDelay + cueDelay(45, quick), quick ? 0.86 : 0.34);
          revealTransform(copy, "translate3d(0, " + (quick ? 4 : 8) + "px, 0)", cueDuration(440, quick), stepDelay + cueDelay(95, quick), quick ? 0.88 : 0.4);
        });
        return;
      }

      if (element.matches(".integration-mascot")) {
        playMotion(element, [
          { opacity: quick ? 0.84 : 0.14, transform: "translate3d(" + (quick ? -4 : -16) + "px, 0, 0) rotate(-1deg)" },
          { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0)" }
        ], { duration: cueDuration(620, quick), delay: 0, easing: motion.easeOut }, "_homeIntegrationMascotEntrance");
        return;
      }

      if (element.matches(".team-photo")) {
        if (quick) {
          quickReveal(element);
          return;
        }
        playMotion(element, [
          { opacity: 0.18, transform: "translate3d(18px, 0, 0)", clipPath: "inset(0 12% 0 0)" },
          { opacity: 1, transform: "translate3d(0, 0, 0)", clipPath: "inset(0 0 0 0)" }
        ], { duration: 720, delay: 0, easing: motion.easeOut }, "_homeTeamPhotoEntrance");
        return;
      }

      if (element.matches(".leadership-head")) {
        var leadershipTitle = element.querySelector("h3");
        var leadershipIntro = element.querySelector("p");
        revealTransform(leadershipTitle, "translate3d(0, " + (quick ? 4 : 12) + "px, 0)", cueDuration(520, quick), 0, quick ? 0.86 : 0.2);
        revealTransform(leadershipIntro, "translate3d(0, " + (quick ? 4 : 9) + "px, 0)", cueDuration(440, quick), cueDelay(70, quick), quick ? 0.88 : 0.3);
        return;
      }

      if (element.matches(".leader-card")) {
        var leaderIndex = Array.prototype.indexOf.call(element.parentElement.children, element);
        revealTransform(element, "translate3d(0, " + (quick ? 4 : 16) + "px, 0)", cueDuration(540, quick), cueDelay(desktopDelay(leaderIndex), quick), quick ? 0.86 : 0.22);
        return;
      }

      if (element.matches(".footer-main")) {
        playChildren(element, ":scope > *", false, quick);
        return;
      }

      if (quick) {
        quickReveal(element);
        return;
      }

      var parent = element.parentElement;
      var siblings = parent ? Array.prototype.filter.call(parent.children, function (child) {
        return child.matches(element.tagName.toLowerCase() + "." + Array.prototype.join.call(element.classList, "."));
      }) : [];
      var index = Math.max(0, siblings.indexOf(element));
      if (element.matches(".case-card")) index = index % 2;
      if (element.matches(".service-card, .operation-card, .resource-card")) index = 0;
      var horizontal = element.matches(".integration-copy, .team-copy, .calculator-form, .integration-catalog, .calculator-result");
      var direction = horizontal
        ? (element.matches(".integration-catalog, .calculator-result") ? 16 : -16)
        : 18;
      var transform = horizontal
        ? "translate3d(" + direction + "px, 0, 0)"
        : "translate3d(0, " + direction + "px, 0)";
      revealTransform(element, transform, 520, desktopDelay(index), 0.26);
    }

    var cues = Array.prototype.slice.call(document.querySelectorAll([
      ".partner-bar__inner",
      ".proof-item",
      ".section-head",
      ".brand-illustration",
      ".service-card",
      ".solution-card",
      ".case-card",
      ".implementation-panel__top",
      ".implementation-flow",
      ".implementation-outcomes",
      ".implementation-note",
      ".process-grid",
      ".integration-copy",
      ".integration-mascot",
      ".integration-catalog",
      ".operation-card",
      ".team-copy",
      ".team-photo",
      ".leadership-head",
      ".leader-card",
      ".resource-card",
      ".calculator-form",
      ".calculator-result",
      ".footer-main",
      ".footer-bottom"
    ].join(",")));

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return;
        revealCue(entry.target, entry.isIntersecting ? shouldQuickReveal(entry) : true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px 18% 0px" });

    cues.forEach(function (element) {
      if (isInsideViewport(element)) {
        element.dataset.homeMotionDone = "true";
        return;
      }
      element.classList.add("home-motion-pending");
      observer.observe(element);
    });
  }

  function initCountUps() {
    if (reducedMotion || !("IntersectionObserver" in window)) return;

    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-count-up]"));
    var prepared = [];
    var active = [];
    var countFrame = 0;
    var lastCountPaint = 0;
    var countObserver;
    var numberPattern = /\d+(?:[ \u00A0\u202F.,]\d+)*/g;

    function parseNumber(raw) {
      var compact = raw.replace(/[ \u00A0\u202F]/g, "");
      var punctuation = compact.match(/[.,]/g) || [];
      var grouping = "";
      var decimal = "";
      var precision = 0;
      var normalized = compact;

      if (punctuation.length) {
        var lastDot = compact.lastIndexOf(".");
        var lastComma = compact.lastIndexOf(",");
        var lastIndex = Math.max(lastDot, lastComma);
        var lastCharacter = compact.charAt(lastIndex);
        var trailing = compact.slice(lastIndex + 1);
        var groupingPattern = new RegExp("^\\d{1,3}(?:\\" + lastCharacter + "\\d{3})+$");

        if (trailing.length === 3 && groupingPattern.test(compact)) {
          grouping = lastCharacter;
          normalized = compact.split(lastCharacter).join("");
        } else {
          decimal = lastCharacter;
          precision = trailing.length;
          normalized = compact.slice(0, lastIndex).replace(/[.,]/g, "") + "." + trailing;
        }
      } else {
        var grouped = raw.match(/[ \u00A0\u202F]/);
        if (grouped) grouping = grouped[0];
      }

      var value = Number(normalized);
      if (!isFinite(value)) return null;
      return {
        raw: raw,
        value: value,
        grouping: grouping,
        decimal: decimal,
        precision: precision
      };
    }

    function parseMetric(source) {
      var fragments = [];
      var numbers = [];
      var match;
      var cursor = 0;
      numberPattern.lastIndex = 0;

      while ((match = numberPattern.exec(source))) {
        if (match.index > cursor) {
          fragments.push({ type: "literal", value: source.slice(cursor, match.index) });
        }
        var parsedNumber = parseNumber(match[0]);
        if (!parsedNumber) return null;
        parsedNumber.type = "number";
        parsedNumber.numberIndex = numbers.length;
        parsedNumber.start = match.index;
        parsedNumber.end = numberPattern.lastIndex;
        fragments.push(parsedNumber);
        numbers.push(parsedNumber);
        cursor = numberPattern.lastIndex;
      }
      if (cursor < source.length) fragments.push({ type: "literal", value: source.slice(cursor) });
      if (!numbers.length || numbers.length > 2) return null;

      var leading = source.slice(0, numbers[0].start);
      if (numbers.length === 1 && /[<>≤≥]/.test(leading) && numbers[0].value <= 1) return null;

      var mode = "single";
      if (numbers.length === 2) {
        var relation = source.slice(numbers[0].end, numbers[1].start);
        if (relation.indexOf("→") !== -1) mode = "arrow";
        else if (/[–-]/.test(relation)) mode = "range";
        else return null;
      }

      return { source: source, fragments: fragments, numbers: numbers, mode: mode };
    }

    function groupInteger(value, separator) {
      if (!separator) return value;
      return value.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    }

    function formatNumber(value, metadata) {
      var rounded = metadata.precision
        ? value.toFixed(metadata.precision)
        : String(Math.round(value));
      var parts = rounded.split(".");
      var integer = groupInteger(parts[0], metadata.grouping);
      if (!metadata.precision) return integer;
      return integer + (metadata.decimal || ".") + parts[1];
    }

    function renderMetric(metric, progress) {
      if (progress >= 1) return metric.source;
      var output = metric.fragments.map(function (fragment) {
        if (fragment.type === "literal") return fragment.value;
        var target = fragment.value;
        var value = target * progress;
        if (metric.mode === "arrow") {
          if (fragment.numberIndex === 0) return fragment.raw;
          value = metric.numbers[0].value + ((target - metric.numbers[0].value) * progress);
        }
        return formatNumber(value, fragment);
      }).join("");
      return output.replace(/^([ \u00A0\u202F]*)−(?=0(?:\D|$))/, "$1");
    }

    function complete(item) {
      if (!item || item.completed) return;
      item.completed = true;
      item.visual.textContent = item.metric.source;
      item.lastOutput = item.metric.source;
    }

    function restore(item) {
      if (!item || item.restored) return;
      item.restored = true;
      item.completed = true;
      item.element.textContent = item.metric.source;
    }

    function durationFor(element) {
      if (element.closest(".solution-card")) return 850;
      if (element.closest(".case-card")) return 900;
      return 1000;
    }

    function siblingIndex(element) {
      var container = element.closest(
        ".proof-strip, .solution-grid, .case-grid, .implementation-outcomes, .team-stats"
      );
      if (!container) return 0;
      return Array.prototype.indexOf.call(container.querySelectorAll("[data-count-up]"), element);
    }

    function delayFor(element) {
      var index = Math.max(0, siblingIndex(element));
      if (element.closest(".proof-strip")) return 260 + (index * 70);
      return Math.min(index * 65, 130);
    }

    function runCounters(time) {
      countFrame = 0;
      if (lastCountPaint && time - lastCountPaint < 16) {
        countFrame = requestAnimationFrame(runCounters);
        return;
      }
      lastCountPaint = time;
      var remaining = [];

      active.forEach(function (item) {
        if (time < item.startTime) {
          remaining.push(item);
          return;
        }
        var progress = Math.min(1, (time - item.startTime) / item.duration);
        var eased = 1 - Math.pow(1 - progress, 4);
        var output = renderMetric(item.metric, eased);
        if (output !== item.lastOutput) {
          item.visual.textContent = output;
          item.lastOutput = output;
        }
        if (progress >= 1) complete(item);
        else remaining.push(item);
      });

      active = remaining;
      if (active.length) countFrame = requestAnimationFrame(runCounters);
    }

    function start(item) {
      if (item.started || item.restored) return;
      item.started = true;
      item.visual.textContent = renderMetric(item.metric, 0);
      item.lastOutput = item.visual.textContent;
      item.startTime = performance.now() + item.delay;
      active.push(item);
      if (!countFrame) countFrame = requestAnimationFrame(runCounters);
    }

    countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return;
        var item = prepared.find(function (candidate) { return candidate.element === entry.target; });
        if (!item) return;
        if (entry.isIntersecting) start(item);
        else complete(item);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });

    elements.forEach(function (element) {
      var source = element.textContent;
      var metric = parseMetric(source);
      if (
        !metric ||
        metric.mode !== "single" ||
        /[~≈<>≤≥→–]/.test(source) ||
        /^\s*[-−]/.test(source) ||
        metric.numbers[0].value <= 1
      ) return;

      var initialRect = element.getBoundingClientRect();
      var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (initialRect.bottom > 0 && initialRect.top < viewportHeight * 1.02) return;

      var stack = document.createElement("span");
      var sourceLayer = document.createElement("span");
      var visual = document.createElement("span");
      stack.className = "count-stack";
      sourceLayer.className = "count-source";
      visual.className = "count-visual";
      sourceLayer.textContent = source;
      visual.textContent = renderMetric(metric, 0);
      visual.setAttribute("aria-hidden", "true");
      stack.appendChild(sourceLayer);
      stack.appendChild(visual);
      element.textContent = "";
      element.appendChild(stack);

      var item = {
        element: element,
        metric: metric,
        visual: visual,
        duration: durationFor(element),
        delay: delayFor(element),
        lastOutput: visual.textContent,
        startTime: 0,
        started: false,
        completed: false,
        restored: false
      };
      prepared.push(item);
      countObserver.observe(element);
    });

    stopCountUps = function () {
      if (countFrame) cancelAnimationFrame(countFrame);
      countFrame = 0;
      lastCountPaint = 0;
      active.length = 0;
      if (countObserver) countObserver.disconnect();
      prepared.forEach(restore);
    };
  }

  function initIntegrationSearch() {
    var input = document.querySelector("[data-integration-search]");
    if (!input) return;

    var catalog = input.closest(".integration-catalog");
    if (!catalog) return;

    var groups = Array.prototype.slice.call(catalog.querySelectorAll(".system-group"));
    var empty = catalog.querySelector("[data-integration-empty]");
    var count = catalog.querySelector("[data-integration-count]");
    var filterFrame = 0;
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

    function filterSystems(animateChanges) {
      var query = normalize(input.value.trim());
      var visible = 0;
      var before = new Map();

      if (animateChanges && !reducedMotion) {
        groups.forEach(function (group) {
          Array.prototype.forEach.call(group.querySelectorAll(".system-list span"), function (chip) {
            if (!group.hidden && !chip.hidden && chip.getClientRects().length) {
              before.set(chip, {
                rect: chip.getBoundingClientRect(),
                opacity: window.getComputedStyle(chip).opacity
              });
            }
          });
        });
      }

      groups.forEach(function (group) {
        Array.prototype.forEach.call(group.querySelectorAll(".system-list span"), function (chip) {
          if (chip._homeFilterAnimation) chip._homeFilterAnimation.cancel();
          if (chip._homeEntranceAnimation) chip._homeEntranceAnimation.cancel();
        });
      });

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

      if (!animateChanges || reducedMotion) return;

      var movements = [];
      groups.forEach(function (group) {
        if (group.hidden) return;
        Array.prototype.forEach.call(group.querySelectorAll(".system-list span:not([hidden])"), function (chip) {
          var previous = before.get(chip);
          var rect = chip.getBoundingClientRect();
          var deltaX = previous ? previous.rect.left - rect.left : 0;
          var deltaY = previous ? previous.rect.top - rect.top : 0;
          var startOpacity = previous ? Number(previous.opacity) : 0.35;
          if (previous && Math.abs(deltaX) < 0.5 && Math.abs(deltaY) < 0.5 && startOpacity >= 0.99) return;
          movements.push({
            chip: chip,
            frames: [
              {
                opacity: isFinite(startOpacity) ? startOpacity : 1,
                transform: previous
                  ? "translate(" + deltaX + "px, " + deltaY + "px)"
                  : "scale(.985)"
              },
              { opacity: 1, transform: "none" }
            ]
          });
        });
      });

      movements.forEach(function (movement) {
        playMotion(movement.chip, movement.frames, { duration: motion.ui }, "_homeFilterAnimation");
      });

      if (count) {
        var countOpacity = count._homeCountAnimation ? window.getComputedStyle(count).opacity : 0.45;
        playMotion(count, [
          { opacity: countOpacity },
          { opacity: 1 }
        ], { duration: motion.fast }, "_homeCountAnimation");
      }
    }

    input.addEventListener("input", function () {
      if (filterFrame) cancelAnimationFrame(filterFrame);
      filterFrame = requestAnimationFrame(function () {
        filterFrame = 0;
        filterSystems(true);
      });
    });
    filterSystems(false);
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

    inputs.forEach(function (input) {
      input.addEventListener("input", calculate);
    });
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

  function finishMenuClose() {
    if (!panel || panel.dataset.state === "open") return;
    panel.hidden = true;
    panel.dataset.state = "closed";
  }

  function closeMenu(restoreFocus) {
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
    panelCloseTimer = window.setTimeout(finishMenuClose, reducedMotion ? 130 : 300);
    if (restoreFocus && lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  initHeaderState();
  initLanguageMenus();
  initMotion();
  initCountUps();
  initIntegrationSearch();
  initCalculator();

  var processRouteResizeFrame = 0;
  window.addEventListener("resize", function () {
    window.cancelAnimationFrame(processRouteResizeFrame);
    processRouteResizeFrame = window.requestAnimationFrame(function () {
      Array.prototype.forEach.call(document.querySelectorAll(".process-grid"), settleProcessRoute);
    });
  });

  if (!toggle || !panel) return;

  panel.dataset.state = "closed";
  panel.addEventListener("transitionend", function (event) {
    if (event.propertyName === "opacity" && panel.dataset.state === "closing") finishMenuClose();
  });

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
