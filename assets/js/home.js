/* ============================================================================
   AIO-HA — HOME PAGE MOTION
   hero chars + trace draw · pinned horizontal services · Color Lab · process
   Loaded by index.html after site.js. Guarded by window.__initHome.
   ========================================================================== */
(function () {
  "use strict";

  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- schematic service art (line drawings) ---------------------- */
  var ART = {
    laptop:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<rect x="55" y="18" width="110" height="70" rx="2" class="draw"/>' +
      '<path d="M40 100 H180 L170 88 H50 Z" class="draw"/>' +
      '<path d="M62 26 H158 M62 34 H132" stroke="var(--copper)" stroke-width="1"/>' +
      '<rect x="132" y="52" width="24" height="16" stroke="var(--mask)" />' +
      '<path d="M70 60 l6 -8 6 8 M96 60 v-10 M104 50 v10 M112 50 c6 0 6 10 0 10" stroke="var(--ink55, #8a7f70)"/></svg>',
    printer:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<path d="M50 66 h120 v34 a4 4 0 0 1 -4 4 H54 a4 4 0 0 1 -4 -4 Z" class="draw"/>' +
      '<path d="M66 66 V30 h88 v36" class="draw"/>' +
      '<rect x="78" y="84" width="64" height="8" class="draw"/>' +
      '<circle cx="152" cy="80" r="3" stroke="var(--mask)"/>' +
      '<path d="M78 42 h64 M78 50 h40" stroke="var(--copper)" stroke-width="1"/></svg>',
    ro:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<path d="M70 14 h80 v92 h-80 Z" class="draw"/>' +
      '<path d="M70 44 h80 M96 44 v62" class="draw"/>' +
      '<path d="M112 58 c8 0 8 10 0 10 c-8 0 -8 10 0 10" stroke="var(--mask)" stroke-width="1.5"/>' +
      '<circle cx="142" cy="58" r="4" stroke="var(--copper)"/><circle cx="142" cy="74" r="4" stroke="var(--copper)"/>' +
      '<path d="M78 24 h40" stroke="var(--copper)" stroke-width="1"/></svg>',
    softener:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<path d="M84 14 h52 v92 h-52 Z" class="draw"/>' +
      '<path d="M84 34 h52 M84 96 h52" class="draw"/>' +
      '<circle cx="110" cy="58" r="12" stroke="var(--mask)"/>' +
      '<path d="M110 46 v-8 M136 20 h30 M136 26 h22" stroke="var(--copper)" stroke-width="1"/>' +
      '<path d="M60 20 h-18 M60 26 h-10" stroke="var(--copper)" stroke-width="1"/></svg>',
    chimney:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<path d="M60 34 h100 l-12 22 H72 Z" class="draw"/>' +
      '<path d="M96 56 v14 M124 56 v14" class="draw"/>' +
      '<rect x="76" y="70" width="68" height="26" class="draw"/>' +
      '<path d="M78 84 h64" stroke="var(--copper)" stroke-width="1"/>' +
      '<path d="M110 22 v12 M110 16 l-4 6 h8 Z" stroke="var(--mask)" stroke-width="1.2"/></svg>',
    wholesale:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5">' +
      '<rect x="42" y="46" width="40" height="40" class="draw"/>' +
      '<rect x="90" y="34" width="40" height="52" class="draw"/>' +
      '<rect x="138" y="46" width="40" height="40" class="draw"/>' +
      '<path d="M42 66 H178" stroke="var(--copper)" stroke-width="1"/>' +
      '<path d="M50 56 h24 M98 44 h24 M146 56 h24" stroke="var(--mask)" stroke-width="1.2"/></svg>'
  };

  function renderServices() {
    var track = document.getElementById("hspecTrack");
    if (!track) return;
    var D = window.AIOHA;
    track.innerHTML = D.SERVICES.map(function (s) {
      return (
        '<a class="hspec__panel" href="' + s.href + '" data-cursor="view">' +
          '<div class="hspec__top"><span class="hspec__index">' + s.index + "</span>" +
          '<span class="hspec__hindi">' + s.hindi + "</span></div>" +
          '<h3 class="hspec__title">' + s.title + "</h3>" +
          '<p class="hspec__desc">' + s.desc + "</p>" +
          '<div class="hspec__art">' + ART[s.art] + "</div>" +
          '<span class="hspec__go">OPEN DOSSIER →</span>' +
        "</a>"
      );
    }).join("");
  }

  function renderProcess() {
    var host = document.getElementById("processSteps");
    if (!host) return;
    var D = window.AIOHA;
    var svg = host.querySelector("svg");
    var frag = document.createDocumentFragment();
    D.PROCESS.forEach(function (p) {
      var el = document.createElement("article");
      el.className = "process__step";
      el.innerHTML =
        '<span class="process__node" aria-hidden="true"></span>' +
        '<span class="process__num">STEP ' + p.index + "</span>" +
        '<h3 class="process__h">' + p.title + "</h3>" +
        '<p class="process__p">' + p.desc + "</p>";
      frag.appendChild(el);
    });
    host.insertBefore(frag, svg);
  }

  /* ======================================================================
     HERO
     ====================================================================== */
  function heroIntro() {
    var title = document.getElementById("heroTitle");
    if (!title || REDUCED) return;

    var split = new SplitType(title, { types: "lines,words,chars" });
    var chars = title.querySelectorAll(".char");

    gsap.set(chars, { yPercent: 115 });
    gsap.to(chars, {
      yPercent: 0,
      duration: 0.9,
      ease: "expo.out",
      stagger: 0.05,
      delay: 0.15
    });

    /* copper circuit trace draws itself, node pulses near FIX. */
    var trace = document.getElementById("heroTrace");
    var node = document.getElementById("heroNode");
    if (trace) {
      var paths = trace.querySelectorAll("path");
      paths.forEach(function (p) {
        var len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      var tl = gsap.timeline({ delay: 0.9 });
      tl.to(paths[0], { strokeDashoffset: 0, duration: 1.6, ease: "power2.inOut" });
      if (paths[1]) tl.to(paths[1], { strokeDashoffset: 0, duration: 0.9, ease: "power2.out" }, "-=0.4");
      if (node) {
        tl.from(node, { attr: { r: 0 }, duration: 0.4, ease: "back.out(3)" }, "-=0.2")
          .to(node, {
            attr: { r: 10 },
            opacity: 0.2,
            duration: 1.2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
          });
      }
    }
  }

  /* ======================================================================
     SERVICES — pinned horizontal scroll
     ====================================================================== */
  function initHorizontalServices() {
    var section = document.querySelector(".hspec");
    var track = document.getElementById("hspecTrack");
    if (!section || !track) return;

    if (REDUCED || window.innerWidth <= 900) return; // stacked CSS handles mobile

    var getScroll = function () {
      return Math.max(1, track.scrollWidth - window.innerWidth + 120);
    };
    var bar = document.getElementById("hspecBar");

    gsap.to(track, {
      x: function () { return -getScroll(); },
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: function () { return "+=" + getScroll(); },
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        onUpdate: function (self) {
          if (bar) bar.style.transform = "scaleX(" + self.progress + ")";
        }
      }
    });
  }

  /* ======================================================================
     COLOR LAB — pinned recolor sequence
     ====================================================================== */
  function initColorLab() {
    var D = window.AIOHA;
    var section = document.querySelector(".lab");
    if (!section || !D) return;

    var frame = document.getElementById("labFrame");
    var product = document.getElementById("labProduct");
    var brand = document.getElementById("labBrand");
    var name = document.getElementById("labName");
    var index = document.getElementById("labIndex");
    var finish = document.getElementById("labFinish");
    var type = document.getElementById("labType");
    var specLine = document.getElementById("labSpecLine");
    var steps = document.getElementById("labSteps");
    var swatches = document.getElementById("labSwatches");
    var cta = document.getElementById("labCta");
    var wipe = document.getElementById("labWipe");

    if (!product) return;
    product.innerHTML = window.__purifierSVG();

    var current = -1;

    function setStep(i, animate) {
      if (i === current) return;
      var prev = current;
      current = i;
      var p = D.PRODUCTS[i];

      brand.textContent = p.brand;
      name.textContent = p.hindi + " — " + p.name;
      index.textContent = String(i + 1).padStart(2, "0") + " / " + String(D.PRODUCTS.length).padStart(2, "0");
      finish.innerHTML = "FINISH — <b>" + p.finish + "</b>";
      type.innerHTML = "TYPE — <b>" + p.type + "</b>";
      specLine.innerHTML = "SPEC — <b>" + p.spec + "</b>";
      cta.href = D.wa("Namaste, I want the wholesale price of " + p.name + " (" + p.type + ")", "colorlab");

      qsa(".lab__step", steps).forEach(function (b, bi) {
        b.classList.toggle("is-active", bi === i);
        b.classList.toggle("is-done", bi < i);
      });
      qsa(".lab__swatch", swatches).forEach(function (b, bi) {
        b.classList.toggle("is-active", bi === i);
      });

      if (REDUCED || !animate || prev === -1) {
        apply(p, 0);
        return;
      }

      /* clip-path wipe + live accent morph */
      var tl = gsap.timeline();
      tl.to(wipe, { scaleY: 1, duration: 0.34, ease: "power2.in" })
        .add(function () { apply(p, 0.8); })
        .to(wipe, { scaleY: 0, transformOrigin: "bottom", duration: 0.46, ease: "power3.out" });
    }

    function apply(p, dur) {
      if (dur) {
        gsap.to(document.documentElement, { "--accent": p.accent, duration: dur, ease: "power2.out" });
      } else {
        gsap.set(document.documentElement, { "--accent": p.accent });
      }
      var body = product.querySelector(".pbody");
      if (body) {
        if (dur) gsap.to(body, { attr: { fill: p.accent }, duration: dur, ease: "power2.out" });
        else body.setAttribute("fill", p.accent);
      }
    }

    if (steps) {
      steps.innerHTML = D.PRODUCTS.map(function (_, i) {
        return '<button class="lab__step" role="tab" aria-label="Step ' + (i + 1) + '"><i></i></button>';
      }).join("");
      qsa(".lab__step", steps).forEach(function (b, i) {
        b.addEventListener("click", function () { setStep(i, true); });
      });
    }
    if (swatches) {
      swatches.innerHTML = D.PRODUCTS.map(function (p, i) {
        return '<button class="lab__swatch" style="background:' + p.swatch + '" aria-label="' + p.name + '"></button>';
      }).join("");
      qsa(".lab__swatch", swatches).forEach(function (b, i) {
        b.addEventListener("click", function () { setStep(i, true); });
      });
    }

    setStep(0, false);

    if (REDUCED) {
      qsa(".lab__step, .lab__swatch").forEach(function (b) { b.style.pointerEvents = "auto"; });
      return;
    }

    /* scroll-driven: 4 steps across the pinned section */
    ScrollTrigger.create({
      trigger: section,
      start: "top top",
      end: "+=" + window.innerHeight * 1.6,
      pin: true,
      scrub: false,
      anticipatePin: 1,
      onUpdate: function (self) {
        var idx = Math.min(D.PRODUCTS.length - 1, Math.floor(self.progress * D.PRODUCTS.length * 0.999));
        if (idx !== current) setStep(idx, true);
      },
      onLeaveBack: function () {
        setStep(0, false);
      }
    });
  }

  function qsa(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }

  /* ======================================================================
     PROCESS — trace scrub + step reveals
     ====================================================================== */
  function initProcess() {
    var host = document.getElementById("processSteps");
    if (!host || REDUCED) return;

    var trace = document.getElementById("processTrace");
    if (trace && trace.getTotalLength) {
      var len = trace.getTotalLength();
      gsap.set(trace, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(trace, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: host,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 0.6
        }
      });
    }

    qsa(".process__step", host).forEach(function (step) {
      gsap.from(step, {
        opacity: 0,
        y: 36,
        duration: 0.8,
        ease: "expo.out",
        scrollTrigger: { trigger: step, start: "top 82%", once: true }
      });
    });
  }

  /* ======================================================================
     MANIFESTO — line scrub reading-highlight
     ====================================================================== */
  function initManifesto() {
    var el = document.getElementById("manifestoText");
    if (!el || REDUCED) return;
    var split = new SplitType(el, { types: "lines" });
    split.lines.forEach(function (line) {
      gsap.fromTo(line, { opacity: 0.15 }, {
        opacity: 1,
        ease: "none",
        scrollTrigger: {
          trigger: line,
          start: "top 82%",
          end: "top 45%",
          scrub: true
        }
      });
    });
  }

  /* ======================================================================
     BOOT (called by site.js after preloader)
     ====================================================================== */
  window.__initHome = function () {
    renderServices();
    renderProcess();
    /* Color Lab renders its static step-0 state even with reduced motion */
    initColorLab();
    if (REDUCED) {
      /* static fallback: first product colour, no scroll motion */
      document.documentElement.style.setProperty("--accent", window.AIOHA.PRODUCTS[0].accent);
      return;
    }
    heroIntro();
    initHorizontalServices();
    initProcess();
    initManifesto();
  };
})();
