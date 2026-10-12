/* Letsrunfaraway: header state, mobile nav, reveal-on-scroll. */
(function () {
  "use strict";

  /* Shadow under the header once the page moves. */
  var header = document.querySelector(".site-header");
  if (header) {
    var setStuck = function () {
      header.classList.toggle("is-stuck", window.scrollY > 8);
    };
    setStuck();
    window.addEventListener("scroll", setStuck, { passive: true });
  }

  /* Mobile navigation. */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* Fade sections in as they enter the viewport, matching the live site. */
  var targets = document.querySelectorAll(".reveal");
  if (!targets.length) return;

  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced || !("IntersectionObserver" in window)) {
    targets.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        /* Stagger siblings slightly so grids resolve in sequence. */
        var delay = Number(entry.target.dataset.revealDelay || 0);
        setTimeout(function () {
          entry.target.classList.add("is-visible");
        }, delay);
        io.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );

  targets.forEach(function (el) { io.observe(el); });
})();
