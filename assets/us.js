(() => {
  const root = document.documentElement;
  const page = document.querySelector(".us-page");

  if (!page || !("animate" in Element.prototype)) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const running = new Set();
  const revealed = new WeakSet();
  let observer;

  const easing = "cubic-bezier(0.22, 1, 0.36, 1)";

  function remember(animation) {
    running.add(animation);
    animation.finished
      .catch(() => {})
      .finally(() => running.delete(animation));
    return animation;
  }

  function clearMotion() {
    observer?.disconnect();
    running.forEach((animation) => animation.cancel());
    running.clear();
    page
      .querySelectorAll(".us-reveal-pending")
      .forEach((element) => element.classList.remove("us-reveal-pending"));
  }

  function siblingOrder(element) {
    const siblings = Array.from(
      element.parentElement?.querySelectorAll(":scope > [data-us-reveal]") || [],
    );
    return Math.min(Math.max(siblings.indexOf(element), 0), 5);
  }

  function reveal(element) {
    if (revealed.has(element)) return;
    revealed.add(element);
    element.classList.remove("us-reveal-pending");

    if (reducedMotion.matches) return;

    const type = element.dataset.usReveal;
    const delay = siblingOrder(element) * 65;
    let frames = [
      { opacity: 0, transform: "translate3d(0, 24px, 0)" },
      { opacity: 1, transform: "translate3d(0, 0, 0)" },
    ];
    let duration = 720;

    if (type === "rail" || type === "row") {
      frames = [
        { opacity: 0, transform: "translate3d(-18px, 0, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ];
      duration = 680;
    } else if (type === "feature" || type === "case") {
      frames = [
        { opacity: 0, transform: "translate3d(0, 30px, 0)" },
        { opacity: 1, transform: "translate3d(0, 0, 0)" },
      ];
      duration = 820;
    } else if (type === "photo") {
      frames = [
        {
          opacity: 0,
          transform: "translate3d(0, 28px, 0)",
          clipPath: "inset(0 0 18% 0 round 24px 24px 24px 4px)",
        },
        {
          opacity: 1,
          transform: "translate3d(0, 0, 0)",
          clipPath: "inset(0 0 0 0 round 24px 24px 24px 4px)",
        },
      ];
      duration = 920;
    }

    const animation = remember(
      element.animate(frames, {
        duration,
        delay,
        easing,
        fill: "backwards",
      }),
    );
    animation.finished.catch(() => {}).then(() => animation.cancel());
  }

  function prepareScrollReveals() {
    const elements = Array.from(page.querySelectorAll("[data-us-reveal]"));

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      elements.forEach(reveal);
      return;
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting && entry.boundingClientRect.bottom > 0) return;
          observer.unobserve(entry.target);
          if (entry.isIntersecting) {
            reveal(entry.target);
            return;
          }

          revealed.add(entry.target);
          entry.target.classList.remove("us-reveal-pending");
        });
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.08,
      },
    );

    elements.forEach((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.94 && rect.bottom > 0) {
        reveal(element);
        return;
      }

      element.classList.add("us-reveal-pending");
      observer.observe(element);
    });
  }

  function animateHero() {
    const elements = Array.from(page.querySelectorAll("[data-us-hero]"));
    if (reducedMotion.matches) return;

    elements.forEach((element, index) => {
      const isVisual = element.classList.contains("us-hero__visual");
      const frames = isVisual
        ? [
            {
              opacity: 0,
              transform: "translate3d(32px, 10px, 0) rotate(2deg)",
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0) rotate(0deg)",
            },
          ]
        : [
            {
              opacity: 0,
              transform: "translate3d(0, 18px, 0)",
            },
            {
              opacity: 1,
              transform: "translate3d(0, 0, 0)",
            },
          ];

      const animation = remember(
        element.animate(frames, {
          duration: isVisual ? 900 : 720,
          delay: 80 + index * 85,
          easing,
          fill: "backwards",
        }),
      );
      animation.finished.catch(() => {}).then(() => animation.cancel());
    });
  }

  function start() {
    root.classList.add("us-motion-ready");
    prepareScrollReveals();
    requestAnimationFrame(animateHero);
  }

  const fontsReady = document.fonts?.ready || Promise.resolve();
  fontsReady.then(start).catch(start);

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) clearMotion();
  });
})();
