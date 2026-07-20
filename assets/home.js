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
    easeSoft: cssValue("--ease-premium-soft", "cubic-bezier(0.25, 1, 0.5, 1)"),
    fast: cssDuration("--motion-fast", 140),
    ui: cssDuration("--motion-ui", 220),
    section: cssDuration("--motion-section", 640),
    focus: cssDuration("--motion-focus", 560),
    content: cssDuration("--motion-content", 440),
    hero: cssDuration("--motion-hero", 720),
    stagger: cssDuration("--motion-stagger", 46),
    maxBlur: window.matchMedia("(max-width: 620px)").matches ? 4 : 8
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

  function blurredFilter(baseFilter, amount) {
    if (!amount) return baseFilter;
    var blur = "blur(" + Math.min(amount, motion.maxBlur) + "px)";
    return baseFilter === "none" ? blur : baseFilter + " " + blur;
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

  function revealSoft(element, transform, blur, duration, delay, opacity) {
    if (!element) return null;
    var end = visualState(element);
    return playMotion(element, [
      {
        opacity: typeof opacity === "number" ? opacity : 0.12,
        transform: transform || end.transform,
        filter: blurredFilter(end.filter, blur)
      },
      {
        opacity: end.opacity,
        transform: end.transform,
        filter: end.filter
      }
    ], {
      duration: duration,
      delay: delay || 0,
      easing: motion.easeOut
    }, "_homeEntranceAnimation");
  }

  function revealFocus(element, blur, duration, delay, opacity) {
    if (!element) return null;
    var end = visualState(element);
    return playMotion(element, [
      {
        opacity: typeof opacity === "number" ? opacity : 0.16,
        transform: end.transform,
        filter: blurredFilter(end.filter, blur)
      },
      {
        opacity: end.opacity,
        transform: end.transform,
        filter: end.filter
      }
    ], {
      duration: duration,
      delay: delay || 0,
      easing: motion.easeSoft
    }, "_homeEntranceAnimation");
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
      document.documentElement.classList.remove("home-view-motion", "home-fallback-motion");
      Array.prototype.forEach.call(document.querySelectorAll(".home-motion-target"), function (element) {
        element.classList.remove(
          "home-motion-target",
          "home-fallback-in-view"
        );
      });
      Array.prototype.forEach.call(document.querySelectorAll(".home-focus-pending, .home-focus-visible"), function (element) {
        element.classList.remove("home-focus-pending", "home-focus-visible");
      });
      Array.prototype.forEach.call(document.querySelectorAll(".home-motion-pending"), function (element) {
        element.classList.remove("home-motion-pending");
      });
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

  function initMotion() {
    if (!reducedMotion) {
      [".brand", ".desktop-nav", ".nav-actions"].forEach(function (selector, index) {
        revealSoft(
          document.querySelector(".nav-shell > " + selector),
          "translateY(-3px)",
          2,
          motion.ui,
          index * 28,
          0.55
        );
      });

      revealSoft(document.querySelector(".hero h1"), "translateY(40px)", 8, 780, 0, 0.001);
      revealSoft(document.querySelector(".hero__lead"), "translateX(-30px)", 4, 620, 100, 0.08);
      revealSoft(document.querySelector(".hero__actions"), "translateX(30px)", 2, 520, 180, 0.08);
      Array.prototype.forEach.call(document.querySelectorAll(".proof-item"), function (item, index) {
        revealSoft(item, "translateY(22px)", 3, 540, 260 + (index * 70), 0.08);
      });
    }

    var supportsViewMotion = !reducedMotion && typeof window.CSS !== "undefined" &&
      typeof window.CSS.supports === "function" &&
      window.CSS.supports("animation-timeline: view()") &&
      window.CSS.supports("animation-range: entry 0% cover 35%");

    document.documentElement.classList.toggle("home-view-motion", supportsViewMotion);
    document.documentElement.classList.toggle(
      "home-fallback-motion",
      !reducedMotion && !supportsViewMotion && "IntersectionObserver" in window
    );

    if (reducedMotion || !("IntersectionObserver" in window)) return;

    var scrollSelectors = [
      ".partner-bar__inner",
      ".section-head .section-kicker",
      ".section-head .section-title",
      ".section-head .section-intro",
      ".service-card",
      ".solution-card",
      ".case-card",
      ".implementation-step",
      ".implementation-outcome",
      ".process-step",
      ".integration-copy",
      ".integration-catalog",
      ".system-group",
      ".operation-card",
      ".team-copy",
      ".portrait",
      ".resource-card",
      ".calculator-form",
      ".calculator-result",
      ".contact-card",
      ".footer-intro",
      ".footer-main > *",
      ".footer-bottom"
    ];
    if (supportsViewMotion) {
      var focusTargets = document.querySelectorAll([
        ".section-title",
        ".solution-card h3",
        ".case-card > strong",
        ".implementation-outcome > strong",
        ".team-stat > strong",
        ".calculator-result__money",
        ".contact-card h2",
        ".footer-statement"
      ].join(","));
      var focusObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("home-focus-visible");
          focusObserver.unobserve(entry.target);
        });
      }, { threshold: 0.01, rootMargin: "0px 0px -8% 0px" });

      Array.prototype.forEach.call(focusTargets, function (target) {
        target.classList.add("home-focus-pending");
        target.addEventListener("transitionend", function cleanFocus(event) {
          if (event.propertyName !== "filter") return;
          target.removeEventListener("transitionend", cleanFocus);
          target.classList.remove("home-focus-pending", "home-focus-visible");
        });
        focusObserver.observe(target);
      });
      return;
    }

    var fallbackObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("home-fallback-in-view", entry.isIntersecting);
      });
    }, { threshold: 0, rootMargin: "0px" });

    var fallbackTargets = Array.prototype.slice.call(
      document.querySelectorAll(scrollSelectors.join(","))
    );
    var viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    var initiallyVisible = fallbackTargets.map(function (target) {
      var rect = target.getBoundingClientRect();
      return rect.bottom > 0 && rect.right > 0 && rect.top < viewportHeight && rect.left < viewportWidth;
    });

    fallbackTargets.forEach(function (target, index) {
      if (initiallyVisible[index]) {
        target.classList.add("home-motion-target", "home-fallback-in-view");
      } else {
        target.classList.add("home-motion-target");
      }
    });
    fallbackTargets.forEach(function (target) {
      fallbackObserver.observe(target);
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
      if (element.closest(".case-card")) return 1150;
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
      if (lastCountPaint && time - lastCountPaint < 32) {
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
      item.startTime = performance.now() + item.delay;
      active.push(item);
      if (!countFrame) countFrame = requestAnimationFrame(runCounters);
    }

    countObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var item = prepared.find(function (candidate) { return candidate.element === entry.target; });
        if (!item) return;
        start(item);
        countObserver.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: "0px" });

    elements.forEach(function (element) {
      var source = element.textContent;
      var metric = parseMetric(source);
      if (!metric) return;

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
