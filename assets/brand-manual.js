(function () {
  "use strict";

  var preference = window.matchMedia("(prefers-reduced-motion: reduce)");
  var canAnimate = typeof Element !== "undefined" && "animate" in Element.prototype;
  var activeAnimations = [];
  var easing = "cubic-bezier(0.16, 1, 0.3, 1)";

  function stopAnimations() {
    activeAnimations.splice(0).forEach(function (animation) {
      animation.cancel();
    });
    Array.prototype.forEach.call(document.querySelectorAll(".brand-motion-pending"), function (element) {
      element.classList.remove("brand-motion-pending");
    });
  }

  if (typeof preference.addEventListener === "function") {
    preference.addEventListener("change", function (event) {
      if (event.matches) stopAnimations();
    });
  }

  if (preference.matches || !canAnimate) return;

  function isInsideViewport(element) {
    var rect = element.getBoundingClientRect();
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return rect.bottom > 0 && rect.top < viewportHeight;
  }

  function shouldQuickReveal(entry) {
    var viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    return entry.boundingClientRect.bottom <= 0 || entry.boundingClientRect.top < viewportHeight * 0.42;
  }

  function duration(value, quick) {
    return quick ? Math.max(180, Math.round(value * 0.46)) : value;
  }

  function delay(value, quick) {
    return quick ? 0 : value;
  }

  function play(element, frames, options, ownerKey) {
    if (!element || preference.matches) return null;
    if (ownerKey && element[ownerKey]) element[ownerKey].cancel();
    var animation = element.animate(frames, {
      duration: options.duration,
      delay: options.delay || 0,
      easing: options.easing || easing,
      fill: "backwards"
    });
    activeAnimations.push(animation);
    if (ownerKey) element[ownerKey] = animation;

    function cleanUp() {
      activeAnimations = activeAnimations.filter(function (item) { return item !== animation; });
      if (ownerKey && element[ownerKey] === animation) element[ownerKey] = null;
    }

    animation.finished.then(function () {
      cleanUp();
      animation.cancel();
    }).catch(cleanUp);
    return animation;
  }

  function quickReveal(element) {
    return play(element, [
      { opacity: 0.72, transform: "translate3d(0, 6px, 0)" },
      { opacity: 1, transform: "translate3d(0, 0, 0)" }
    ], { duration: 240, delay: 0 }, "_brandEntrance");
  }

  function revealSupportingArt(element, quick) {
    if (!element || element.dataset.brandMotionDone === "true") return;
    element.dataset.brandMotionDone = "true";
    element.classList.remove("brand-motion-pending");
    if (quick) {
      quickReveal(element);
      return;
    }
    play(element, [
      { opacity: 0.08, transform: "translate3d(24px, 18px, 0) rotate(1deg)" },
      { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0)" }
    ], { duration: 780, delay: 0 }, "_brandSupportingArtEntrance");
  }

  function observeElements(elements, reveal, rootMargin) {
    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (element) { reveal(element, false); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return;
        reveal(entry.target, entry.isIntersecting ? shouldQuickReveal(entry) : true);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.01, rootMargin: rootMargin || "0px 0px 2% 0px" });

    elements.forEach(function (element) {
      if (isInsideViewport(element)) {
        element.dataset.brandMotionDone = "true";
        return;
      }
      element.classList.add("brand-motion-pending");
      observer.observe(element);
    });
  }

  observeElements(
    Array.prototype.slice.call(document.querySelectorAll(".contact-brand-art, .footer-enty")),
    revealSupportingArt,
    "0px 0px 18% 0px"
  );

  if (!document.body.matches("body.subpage.brand-manual")) return;

  function revealStoryArt(element, quick) {
    if (!element || element.dataset.brandMotionDone === "true") return;
    element.dataset.brandMotionDone = "true";
    element.classList.remove("brand-motion-pending");
    if (quick) {
      quickReveal(element);
      return;
    }
    var illustration = element.querySelector(".brand-story-art__illustration");
    var mascot = element.querySelector(".brand-story-art__mascot");
    play(illustration, [
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0 0 0)" }
    ], { duration: 680, delay: 0 }, "_brandStoryIllustration");
    play(mascot, [
      { opacity: 0.12, transform: "translate3d(16px, 12px, 0) rotate(2deg)" },
      { opacity: 1, transform: "translate3d(0, 0, 0) rotate(-0.7deg)" },
      { opacity: 1, transform: "translate3d(0, 0, 0) rotate(0)" }
    ], { duration: 640, delay: 170 }, "_brandStoryMascot");
  }

  function revealFlow(element, quick) {
    if (!element || element.dataset.brandMotionDone === "true") return;
    element.dataset.brandMotionDone = "true";
    element.classList.remove("brand-motion-pending");
    var rail = element.querySelector(":scope > .story-flow-rail");
    var items = Array.prototype.slice.call(element.children).filter(function (child) {
      return !child.matches(".story-flow-rail");
    });

    play(rail, [
      { transform: "scaleY(0)" },
      { transform: "scaleY(1)" }
    ], { duration: duration(700, quick), delay: 0 }, "_brandFlowRail");

    items.forEach(function (item, index) {
      var itemDelay = delay(index * 74, quick);
      play(item, [
        {
          opacity: quick ? 0.86 : 0.34,
          transform: "translate3d(" + (quick ? 0 : 10) + "px, " + (quick ? 4 : 7) + "px, 0)"
        },
        { opacity: 1, transform: "translate3d(0, 0, 0)" }
      ], { duration: duration(470, quick), delay: itemDelay }, "_brandFlowItem");
    });
  }

  observeElements(
    Array.prototype.slice.call(document.querySelectorAll(".brand-story-art")),
    revealStoryArt,
    "0px 0px 18% 0px"
  );
  observeElements(
    Array.prototype.slice.call(document.querySelectorAll(".rs-flow, .jp-walk, .f30-levels")),
    revealFlow,
    "0px 0px 18% 0px"
  );

  var collectionSelector = [
    ".rs-pains", ".rs-donts", ".rs-need", ".rs-badges", ".rs-stats", ".rs-faq",
    ".jp-blocks", ".jp-stack", ".f30-stats", ".eng-grid", ".cap-grid",
    ".proof-grid", ".team-grid", ".team-stats", ".tm-featured"
  ].join(",");
  var cueMap = new WeakMap();
  var cues = [];

  function addCue(element, type, index) {
    if (!element || cueMap.has(element)) return;
    var cue = { element: element, type: type, index: index || 0 };
    cueMap.set(element, cue);
    cues.push(element);
  }

  Array.prototype.forEach.call(
    document.querySelectorAll("main > .block:not(.rs-hero):not(.jp-hero):not(.f30-hero):not(.tym-hero):not(.legal-hero)"),
    function (block) {
      var wrap = block.querySelector(":scope > .wrap") || block.querySelector(".wrap");
      if (!wrap) return;
      Array.prototype.forEach.call(wrap.children, function (child, directIndex) {
        if (child.matches(".brand-story-art, .rs-flow, .jp-walk, .f30-levels")) return;
        if (child.matches(collectionSelector)) {
          addCue(child, "collection", directIndex);
          return;
        }
        addCue(child, child.matches(".h2") ? "heading" : "content", directIndex);
      });
    }
  );

  function revealCue(element, quick) {
    if (!element || element.dataset.brandMotionDone === "true") return;
    element.dataset.brandMotionDone = "true";
    element.classList.remove("brand-motion-pending");
    var cue = cueMap.get(element);
    if (!cue) return;
    if (quick) {
      quickReveal(element);
      return;
    }

    if (cue.type === "collection") {
      Array.prototype.forEach.call(element.children, function (item, index) {
        var horizontal = item.matches(".rs-pain, .rs-dont, .rs-need > li");
        play(item, [
          {
            opacity: 0.08,
            transform: horizontal
              ? "translate3d(" + (index % 2 ? 14 : -14) + "px, 0, 0)"
              : "translate3d(0, 18px, 0)"
          },
          { opacity: 1, transform: "translate3d(0, 0, 0)" }
        ], { duration: 620, delay: Math.min(index, 4) * 64 }, "_brandCollectionItem");
      });
      return;
    }

    if (cue.type === "heading") {
      play(element, [
        { opacity: 0.06, transform: "translate3d(0, 22px, 0)", filter: "blur(6px)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)", filter: "blur(0)" }
      ], { duration: 720, delay: 0 }, "_brandHeadingEntrance");
      return;
    }

    play(element, [
      { opacity: 0.12, transform: "translate3d(0, 16px, 0)" },
      { opacity: 1, transform: "translate3d(0, 0, 0)" }
    ], { duration: 580, delay: Math.min(cue.index, 2) * 48 }, "_brandContentEntrance");
  }

  observeElements(cues, revealCue, "0px 0px 18% 0px");
})();
