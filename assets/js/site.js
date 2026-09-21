/* ============================================================================
   AIO-HA — SITE SHELL
   Preloader · Lenis+GSAP core · cursor · magnetic · nav/footer render ·
   marquee · reveals · parallax · counters · Embla · job card · IST clock
   Requires (in order): gsap, ScrollTrigger, lenis, split-type, embla, data.js
   ========================================================================== */
(function () {
  "use strict";

  var D = window.AIOHA;
  if (!D) return;

  var doc = document.documentElement;
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TOUCH = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var IS_HOME = (document.body.dataset.page || "home") === "home";

  /* root-relative prefix so the same data.js works from / and /pages/ */
  var ROOT = window.location.pathname.indexOf("/pages/") > -1 ? "../" : "";
  window.AIOHA_ROOT = ROOT;

  doc.classList.remove("no-js");
  if (REDUCED) doc.classList.add("reduced");

  var qs = function (s, el) { return (el || document).querySelector(s); };
  var qsa = function (s, el) {
    return Array.prototype.slice.call((el || document).querySelectorAll(s));
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* ======================================================================
     0. SHARED SVG PARTS (used by home + inner pages)
     ====================================================================== */
  function purifierSVG() {
    return (
      '<svg viewBox="0 0 200 300" fill="none" role="img" aria-label="Water purifier line drawing">' +
        '<rect class="pbody" x="30" y="12" width="140" height="276" rx="6" opacity="0.92"/>' +
        '<path class="pline" d="M30 12 h140 v276 h-140 Z" fill="none" stroke-width="2"/>' +
        '<rect class="pline" x="58" y="40" width="84" height="34" rx="2" fill="var(--dark)" stroke-width="1.5"/>' +
        '<path d="M66 57 h20 M92 57 h26 M124 57 h10" stroke="var(--flux)" stroke-width="2"/>' +
        '<circle class="pline" cx="100" cy="130" r="26" fill="none" stroke-width="2"/>' +
        '<path d="M100 116 c10 8 10 20 0 28 c-10 -8 -10 -20 0 -28" stroke="var(--paper)" stroke-width="2"/>' +
        '<rect class="pline" x="86" y="196" width="28" height="60" rx="4" fill="var(--dark)" stroke-width="1.5"/>' +
        '<path d="M100 196 v60" stroke="var(--paper)" stroke-width="1.5"/>' +
        '<path d="M30 250 h140" stroke="var(--paper)" stroke-width="1" opacity="0.4"/>' +
      "</svg>"
    );
  }
  window.__purifierSVG = purifierSVG;

  /* ======================================================================
     1. RENDER NAV (desktop + drawer)
     ====================================================================== */
  function renderHeader() {
    var host = qs("#site-header");
    if (!host) return;
    var B = D.BUSINESS;
    var page = document.body.dataset.page || "home";

    var isActive = function (href) {
      if (href === "index.html") return page === "home";
      return href.indexOf("pages/" + page + ".html") > -1;
    };
    var R = function (href) { return ROOT + href; };

    var desktopItems = D.NAV.map(function (item) {
      if (item.type === "dropdown") {
        var sub = item.items.map(function (s) {
          if (s.divider) return '<li class="dropdown__divider" role="separator"></li>';
          return (
            '<li><a class="dropdown__item" href="' + R(s.href) + '">' +
              '<span class="dropdown__mono">' + esc(s.mono) + "</span>" +
              "<span><span class=\"dropdown__label\">" + esc(s.label) + "</span>" +
              '<span class="dropdown__desc">' + esc(s.desc) + "</span></span></a></li>"
          );
        }).join("");
        return (
          '<li class="nav__item" data-drop>' +
            '<button class="nav__link" type="button" aria-haspopup="true" aria-expanded="false">' +
              esc(item.label) + ' <span class="nav__caret">▾</span></button>' +
            '<ul class="dropdown">' + sub + "</ul></li>"
        );
      }
      var cur = isActive(item.href) ? ' aria-current="page"' : "";
      return '<li class="nav__item"><a class="nav__link" href="' + R(item.href) + '"' + cur + ">" + esc(item.label) + "</a></li>";
    }).join("");

    var drawerItems = D.NAV.map(function (item, i) {
      var num = String(i + 1).padStart(2, "0");
      if (item.type === "dropdown") {
        var sub = item.items.filter(function (s) { return !s.divider; }).map(function (s) {
          return (
            '<a href="' + R(s.href) + '"><strong>' + esc(s.label) + "</strong>" +
            '<span class="mono">' + esc(s.desc) + "</span></a>"
          );
        }).join("");
        return (
          '<li><button class="drawer__row" type="button" data-acc aria-expanded="false">' +
            "<span>" + esc(item.label) + '</span><span class="mono">' + num + " +</span></button>" +
            '<div class="drawer__sub">' + sub + "</div></li>"
        );
      }
      return (
        '<li><a class="drawer__row" href="' + R(item.href) + '"><span>' + esc(item.label) +
        '</span><span class="mono">' + num + "</span></a></li>"
      );
    }).join("");

    host.innerHTML =
      '<div class="header__in">' +
        '<a class="brand" href="' + ROOT + 'index.html" aria-label="AIO-HA International — home">' +
          '<svg class="brand__mark" viewBox="0 0 64 64" aria-hidden="true"><rect width="64" height="64" fill="none"/><g fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><path d="M12 41 C22 18, 44 14, 48 26 C50 33, 43 38, 38 35.5 C34 33.5, 35 28.5, 40 28"/><path d="M10 48 C24 41, 40 46, 54 38" stroke-width="2.6"/></g></svg>' +
          "<span><span class=\"brand__name\">AIO-HA<sup>®</sup></span>" +
          '<span class="brand__tag">PURITY GUARANTEED</span></span>' +
        "</a>" +
        '<nav class="nav" aria-label="Primary"><ul class="nav__list">' + desktopItems + "</ul></nav>" +
        '<a class="btn magnetic header__cta" href="' + B.waRepair + '" target="_blank" rel="noopener">' +
          '<span class="btn__fill"></span><span class="btn__txt">BOOK A REPAIR</span></a>' +
        '<button class="burger" type="button" aria-label="Open menu" aria-expanded="false">' +
          "<span></span><span></span><span></span></button>" +
      "</div>";

    /* drawer */
    var drawer = document.createElement("aside");
    drawer.className = "drawer";
    drawer.id = "drawer";
    drawer.setAttribute("aria-label", "Menu");
    drawer.innerHTML =
      '<ul class="drawer__list">' + drawerItems + "</ul>" +
      '<div class="drawer__foot">' +
        '<a class="mono" href="tel:' + B.phoneTel + '">CALL — ' + esc(B.phoneDisplay) + "</a>" +
        '<a class="mono" href="' + B.waRepair + '" target="_blank" rel="noopener">WHATSAPP — ' + esc(B.phoneDisplay) + "</a>" +
        '<span class="mono">' + esc(B.hours) + "</span>" +
      "</div>";
    host.parentNode.insertBefore(drawer, host.nextSibling);

    wireHeader(page);
  }

  function wireHeader(page) {
    var header = qs("#site-header");
    var burger = qs(".burger", header);
    var drawer = qs("#drawer");

    burger.addEventListener("click", function () {
      var open = drawer.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      if (window.__lenis) open ? window.__lenis.stop() : window.__lenis.start();
      document.body.style.overflow = open ? "hidden" : "";
    });

    qsa("[data-acc]", drawer).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var sub = btn.nextElementSibling;
        var open = sub.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        btn.querySelector(".mono").textContent = btn.querySelector(".mono").textContent.replace(/ [+\-]$/, open ? " –" : " +");
        qsa(".drawer__sub", drawer).forEach(function (s) {
          if (s !== sub) {
            s.classList.remove("is-open");
            s.previousElementSibling.setAttribute("aria-expanded", "false");
          }
        });
      });
    });

    qsa("a", drawer).forEach(function (a) {
      a.addEventListener("click", function () {
        drawer.classList.remove("is-open");
        burger.classList.remove("is-open");
        document.body.style.overflow = "";
        if (window.__lenis) window.__lenis.start();
      });
    });

    /* dropdown click/touch + keyboard */
    qsa("[data-drop]", header).forEach(function (li) {
      var btn = qs(".nav__link", li);
      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        var open = li.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", String(open));
        qsa("[data-drop]", header).forEach(function (o) {
          if (o !== li) {
            o.classList.remove("is-open");
            qs(".nav__link", o).setAttribute("aria-expanded", "false");
          }
        });
      });
    });
    document.addEventListener("click", function () {
      qsa("[data-drop].is-open", header).forEach(function (li) {
        li.classList.remove("is-open");
        qs(".nav__link", li).setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        qsa("[data-drop].is-open", header).forEach(function (li) {
          li.classList.remove("is-open");
          qs(".nav__link", li).setAttribute("aria-expanded", "false");
        });
        if (drawer.classList.contains("is-open")) burger.click();
      }
    });
  }

  /* ======================================================================
     2. RENDER FOOTER
     ====================================================================== */
  function renderFooter() {
    var host = qs("#site-footer");
    if (!host) return;
    var B = D.BUSINESS;
    host.innerHTML =
      '<hr class="cut"><span class="cut__note">CUT ALONG THE LINE</span>' +
      '<div class="wrap footer__grid">' +
        '<div class="footer__barcode"><div class="barcode" aria-hidden="true"></div>' +
        '<div class="barcode__num">' + esc(D.FOOTER.barcode) + "</div></div>" +
        '<div class="footer__clock">NEW DELHI — <b data-ist-clock>--:--:--</b> IST<br>' +
          '<a href="tel:' + B.phoneTel + '">' + esc(B.phoneDisplay) + "</a> · " +
          '<a href="' + B.waRepair + '" target="_blank" rel="noopener">WHATSAPP</a></div>' +
      "</div>" +
      '<div class="footer__giant" aria-hidden="true"><span>AIO-HA<span class="reg">®</span></span></div>' +
      '<div class="footer__minimarq"><div class="marquee__track" data-minimarq></div></div>' +
      '<div class="wrap footer__legal">' +
        "<span>© " + new Date().getFullYear() + " " + esc(B.name.toUpperCase()) + " — EST. " + B.established + "</span>" +
        "<span>" + esc(B.address.line2.toUpperCase()) + ", " + esc(B.address.line3.toUpperCase()) + "</span>" +
        "<span>PURITY GUARANTEED · THINK WHAT YOU DRINK</span>" +
      "</div>";

    /* mini marquee content */
    var mm = qs("[data-minimarq]", host);
    var chunk = '<div class="marquee__chunk">' + esc(D.MARQUEE).replace(/✦/g, '<span class="spark">✦</span>') + "</div>";
    mm.innerHTML = chunk + chunk;
  }

  /* ======================================================================
     3. RENDER SHARED SECTIONS (reviews, marquee band, stamps)
     ====================================================================== */
  function renderMarqueeBand() {
    var host = qs("#marquee-band");
    if (!host) return;
    var chunk = '<div class="marquee__chunk">' + esc(D.MARQUEE).replace(/✦/g, '<span class="spark">✦</span>') + "</div>";
    host.innerHTML = '<div class="marquee__track" data-marquee>' + chunk + chunk + "</div>";
  }

  function renderReviews() {
    var host = qs("#reviews-track");
    if (!host) return;
    host.innerHTML = D.REVIEWS.map(function (r) {
      var stars = "";
      for (var i = 0; i < 5; i++) stars += i < r.rating ? "★" : "☆";
      return (
        '<figure class="review" data-cursor="view">' +
          '<div class="review__mark" aria-hidden="true">“</div>' +
          "<blockquote class=\"review__quote\">" + esc(r.quote) + "</blockquote>" +
          '<figcaption class="review__who">' +
            '<span class="review__stars" aria-label="' + r.rating + ' of 5">' + stars + "</span>" +
            '<span class="review__name">' + esc(r.name) + "</span>" +
            '<span class="review__area">' + esc(r.area) + " · DELHI</span>" +
          "</figcaption>" +
          '<div class="review__barcode barcode" aria-hidden="true"></div>' +
        "</figure>"
      );
    }).join("");
  }

  /* ======================================================================
     4. PRELOADER
     ====================================================================== */
  function runPreloader(done) {
    var pre = qs("#preloader");
    if (!pre || REDUCED) {
      if (pre) pre.style.display = "none";
      done();
      return;
    }
    document.body.classList.add("is-loading");
    if (window.__lenis) window.__lenis.stop();

    var word = qs(".pw", pre);
    var count = qs("#preCount", pre);
    var bar = qs("#preBar", pre);
    var reg = qs(".preloader__reg", pre);
    var quick = !IS_HOME; // inner pages get a short wipe

    try {
      var split = new SplitType(word, { types: "chars" });
      qsa(".char", split.element).forEach(function (c, i) {
        setTimeout(function () { c.classList.add("is-in"); }, 80 + i * 60);
      });
    } catch (e) {
      word.style.opacity = "1";
    }
    if (reg) setTimeout(function () { reg.classList.add("is-in"); }, 420);

    var state = { v: 0 };
    var dur = quick ? 0.5 : 1.5;
    gsap.to(state, {
      v: 100,
      duration: dur,
      ease: "expo.inOut",
      onUpdate: function () {
        var v = Math.round(state.v);
        if (count) count.textContent = String(v).padStart(3, "0");
        if (bar) bar.style.transform = "scaleX(" + v / 100 + ")";
      },
      onComplete: function () {
        pre.classList.add("is-done");
        document.body.classList.remove("is-loading");
        if (window.__lenis) window.__lenis.start();
        setTimeout(function () { pre.remove(); done(); }, 950);
      }
    });
  }

  /* ======================================================================
     5. CORE MOTION (Lenis, ScrollTrigger, cursor, magnetic, progress)
     ====================================================================== */
  function initCore() {
    if (!REDUCED) {
      gsap.registerPlugin(ScrollTrigger);

      var lenis = new Lenis({ autoRaf: true, lerp: 0.1 });
      window.__lenis = lenis;
      lenis.on("scroll", ScrollTrigger.update);

      /* scroll progress hairline */
      var bar = qs(".progress__bar");
      if (bar) {
        gsap.to(bar, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 }
        });
      }

      /* header hide on scroll down */
      var header = qs("#site-header");
      var lastY = 0;
      lenis.on("scroll", function (e) {
        var y = e.animatedScroll || window.scrollY;
        if (!drawerOpen()) {
          header.classList.toggle("is-hidden", y > lastY && y > 140);
        }
        lastY = y;
      });
      function drawerOpen() {
        var d = qs("#drawer");
        return d && d.classList.contains("is-open");
      }

      /* custom cursor */
      if (!TOUCH) {
        var cur = document.createElement("div");
        cur.className = "cursor";
        cur.innerHTML =
          '<div class="cursor__ring"><span class="cursor__label">VIEW</span></div>' +
          '<div class="cursor__dot"></div>';
        document.body.appendChild(cur);

        var dx = gsap.quickTo(cur, "x", { duration: 0.12, ease: "power3" });
        var dy = gsap.quickTo(cur, "y", { duration: 0.12, ease: "power3" });
        var rx = gsap.quickTo(cur, "x", { duration: 0.45, ease: "power3" });
        var ry = gsap.quickTo(cur, "y", { duration: 0.45, ease: "power3" });
        window.addEventListener("mousemove", function (e) {
          dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
        }, { passive: true });

        document.addEventListener("mouseover", function (e) {
          var t = e.target;
          if (t.closest && t.closest("[data-cursor='view']")) {
            cur.classList.add("is-view"); cur.classList.remove("is-link");
          } else if (t.closest && t.closest("a, button, input, textarea, select, [data-cursor='link']")) {
            cur.classList.add("is-link"); cur.classList.remove("is-view");
          } else {
            cur.classList.remove("is-link", "is-view");
          }
        });
      }

      /* magnetic buttons */
      qsa(".magnetic").forEach(function (el) {
        var xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
        var yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
        el.addEventListener("mousemove", function (e) {
          var r = el.getBoundingClientRect();
          xTo((e.clientX - r.left - r.width / 2) * 0.25);
          yTo((e.clientY - r.top - r.height / 2) * 0.25);
        });
        el.addEventListener("mouseleave", function () {
          gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" });
        });
      });
    }

    /* ===== functional (non-motion) bits run in all modes ===== */
    renderClock();
    wireJobCard();
    wireWAButtons();
  }

  /* ======================================================================
     6. MARQUEE with scroll-velocity skew
     ====================================================================== */
  function initMarquees() {
    if (REDUCED) return;
    qsa("[data-marquee], [data-minimarq]").forEach(function (track) {
      var half = 0;
      var x = 0;
      var speed = track.hasAttribute("data-minimarq") ? 28 : 70;

      var measure = function () {
        half = track.scrollWidth / 2;
      };
      measure();
      window.addEventListener("resize", measure);

      var skew = 0;
      var tick = function (time, dt) {
        if (!half) measure();
        x = (x + (speed * dt) / 1000) % (half || 1);
        track.style.transform = "translateX(" + -x + "px) skewX(" + skew + "deg)";
      };
      gsap.ticker.add(tick);

      if (window.__lenis && !track.hasAttribute("data-minimarq")) {
        var target = 0;
        window.__lenis.on("scroll", function (e) {
          var v = gsap.utils.clamp(-60, 60, e.velocity || 0);
          target = v * 0.1; // ±6deg
        });
        gsap.ticker.add(function () {
          skew += (target - skew) * 0.08;
          target += (0 - target) * 0.05;
        });
      }
    });
  }

  /* ======================================================================
     7. REVEALS + PARALLAX + COUNTERS
     ====================================================================== */
  function initReveals() {
    if (REDUCED) return;

    qsa(".rv").forEach(function (el) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%", once: true }
      });
    });

    /* image parallax inside frames */
    qsa(".pframe img").forEach(function (img) {
      gsap.fromTo(img, { yPercent: -12 }, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: img.closest(".pframe"), start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    /* ghost devanagari drift */
    qsa(".ghost-dev").forEach(function (g) {
      gsap.fromTo(g, { yPercent: 12 }, {
        yPercent: -12,
        ease: "none",
        scrollTrigger: { trigger: g.parentElement, start: "top bottom", end: "bottom top", scrub: true }
      });
    });

    /* stat counters */
    qsa("[data-count]").forEach(function (el) {
      var end = parseFloat(el.dataset.count);
      var dec = parseInt(el.dataset.decimals || "0", 10);
      var suffix = el.dataset.suffix || "";
      var obj = { v: 0 };
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: function () {
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: function () {
              var val = dec ? obj.v.toFixed(dec) : Math.round(obj.v).toLocaleString("en-IN");
              el.textContent = val + suffix;
            }
          });
        }
      });
    });
  }

  /* ======================================================================
     8. REVIEWS — Embla
     ====================================================================== */
  function initEmbla() {
    var vp = qs(".reviews__viewport");
    if (!vp || typeof EmblaCarousel !== "function") return;
    var embla = EmblaCarousel(vp, {
      loop: true,
      align: "start",
      dragFree: false,
      containsScroll: false
    });
    vp.addEventListener("pointerdown", function () { vp.classList.add("is-dragging"); });
    window.addEventListener("pointerup", function () { vp.classList.remove("is-dragging"); });

    var prev = qs("[data-embla-prev]");
    var next = qs("[data-embla-next]");
    if (prev) prev.addEventListener("click", embla.scrollPrev);
    if (next) next.addEventListener("click", embla.scrollNext);
  }

  /* ======================================================================
     9. JOB CARD → wa.me deep link
     ====================================================================== */
  function wireJobCard() {
    var form = qs("#jobcard-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (id) {
        var el = qs("#" + id);
        return el ? el.value.trim() : "";
      };
      var msg =
        "JOB CARD №0001\n" +
        "----------------\n" +
        "DEVICE: " + (g("jc-device") || "—") + "\n" +
        "FAULT: " + (g("jc-fault") || "—") + "\n" +
        "NAME: " + (g("jc-name") || "—") + "\n" +
        "----------------\nSent from aio-ha website";
      window.open(D.wa(msg, "jobcard"), "_blank", "noopener");
    });
  }

  /* any <a data-wa="message"> builds a prefilled link */
  function wireWAButtons() {
    qsa("[data-wa]").forEach(function (a) {
      a.href = D.wa(a.dataset.wa, a.dataset.waSrc || document.body.dataset.page || "website");
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* ======================================================================
     10. IST CLOCK
     ====================================================================== */
  function renderClock() {
    var els = qsa("[data-ist-clock]");
    if (!els.length) return;
    var fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
    });
    var tick = function () {
      var t = fmt.format(new Date());
      els.forEach(function (el) { el.textContent = t; });
    };
    tick();
    setInterval(tick, 1000);
  }

  /* ======================================================================
     BOOT
     ====================================================================== */
  var booted = false;
  function boot() {
    if (booted) return;
    booted = true;
    renderHeader();
    renderFooter();
    renderMarqueeBand();
    renderReviews();
    wireWAButtons();
    initCore();

    var after = function () {
      if (window.__initHome) window.__initHome();
      if (window.__initPage) window.__initPage();
      initMarquees();
      initReveals();
      initEmbla();
      if (window.ScrollTrigger && !REDUCED) ScrollTrigger.refresh();
    };

    if (qs("#preloader")) {
      runPreloader(after);
    } else {
      after();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
