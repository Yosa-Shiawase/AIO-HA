/* ============================================================================
   AIO-HA — INNER PAGE BUILDER
   Reads body[data-page] and renders the dossier from window.AIOHA.
   One template, per-page character via data + small layout switches.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.AIOHA;
  if (!D) return;

  var PAGE_KEY = document.body.dataset.page;
  var REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var qsa = function (s, el) {
    return Array.prototype.slice.call((el || document).querySelectorAll(s));
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };

  /* schematic line art per page key (injected into dossier hero) ---------- */
  var ART = {
    laptops:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><rect x="55" y="18" width="110" height="70" rx="2"/><path d="M40 100 H180 L170 88 H50 Z"/><path d="M62 26 H158 M62 34 H132" stroke="var(--copper)" stroke-width="1"/><rect x="132" y="52" width="24" height="16" stroke="var(--mask)"/></svg>',
    printers:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M50 66 h120 v34 a4 4 0 0 1 -4 4 H54 a4 4 0 0 1 -4 -4 Z"/><path d="M66 66 V30 h88 v36"/><rect x="78" y="84" width="64" height="8"/><circle cx="152" cy="80" r="3" stroke="var(--mask)"/><path d="M78 42 h64 M78 50 h40" stroke="var(--copper)" stroke-width="1"/></svg>',
    "ro-purifiers":
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M70 14 h80 v92 h-80 Z"/><path d="M70 44 h80 M96 44 v62"/><path d="M112 58 c8 0 8 10 0 10 c-8 0 -8 10 0 10" stroke="var(--mask)" stroke-width="1.5"/><circle cx="142" cy="58" r="4" stroke="var(--copper)"/><circle cx="142" cy="74" r="4" stroke="var(--copper)"/></svg>',
    "water-softeners":
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M84 14 h52 v92 h-52 Z"/><path d="M84 34 h52 M84 96 h52"/><circle cx="110" cy="58" r="12" stroke="var(--mask)"/><path d="M136 20 h30 M136 26 h22" stroke="var(--copper)" stroke-width="1"/></svg>',
    chimneys:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M60 34 h100 l-12 22 H72 Z"/><path d="M96 56 v14 M124 56 v14"/><rect x="76" y="70" width="68" height="26"/><path d="M110 22 v12 M110 16 l-4 6 h8 Z" stroke="var(--mask)" stroke-width="1.2"/></svg>',
    wholesale:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><rect x="42" y="46" width="40" height="40"/><rect x="90" y="34" width="40" height="52"/><rect x="138" y="46" width="40" height="40"/><path d="M42 66 H178" stroke="var(--copper)" stroke-width="1"/></svg>',
    workshop:
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M40 96 H180 M50 96 V56 h36 v40 M104 96 V40 h30 v56 M150 96 V66 h22 v30"/><path d="M58 66 h20 M114 52 h12" stroke="var(--mask)" stroke-width="1.2"/><path d="M160 52 l6 -8 6 8" stroke="var(--copper)" stroke-width="1.2"/></svg>',
    "products-onyx":
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><rect x="86" y="10" width="48" height="100" rx="4"/><path d="M86 30 h48" stroke="var(--copper)" stroke-width="1"/><rect x="94" y="38" width="32" height="12" stroke="var(--mask)"/><path d="M110 66 c7 5 7 14 0 19 c-7 -5 -7 -14 0 -19" stroke="var(--mask)" stroke-width="1.5"/></svg>',
    "products-xpria":
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><path d="M78 14 h64 v92 h-64 Z"/><path d="M78 38 h64 M96 38 v68" /><path d="M120 56 c8 0 8 12 0 12 c-8 0 -8 12 0 12" stroke="var(--mask)" stroke-width="1.5"/><circle cx="106" cy="62" r="3" stroke="var(--copper)"/><circle cx="106" cy="78" r="3" stroke="var(--copper)"/></svg>',
    "products-starlink":
      '<svg viewBox="0 0 220 120" fill="none" stroke="var(--ink)" stroke-width="1.5"><rect x="88" y="8" width="44" height="104" rx="3"/><rect x="96" y="16" width="28" height="10" stroke="var(--mask)"/><path d="M88 34 h44 M110 46 c8 6 8 16 0 22 c-8 -6 -8 -16 0 -22" stroke="var(--copper)" stroke-width="1.2"/></svg>'
  };

  function build() {
    var isProduct = PAGE_KEY.indexOf("products-") === 0;
    var page = isProduct ? D.PRODUCT_PAGES[PAGE_KEY] : D.PAGES[PAGE_KEY];
    if (!page) return;

    var B = D.BUSINESS;

    /* title/ghost/kicker into head of main */
    var ghostHost = document.querySelector(".dossier");
    var mount = document.getElementById("page-content");
    if (!ghostHost || !mount) return;

    ghostHost.querySelector(".dossier__ghost").textContent = page.ghost;
    ghostHost.querySelector(".dossier__kicker").textContent = page.kicker;
    ghostHost.querySelector(".dossier__title").textContent = page.title;
    ghostHost.querySelector(".dossier__lead").textContent = page.lead;

    var art = ghostHost.querySelector(".dossier__art");
    if (art && ART[PAGE_KEY]) art.innerHTML = ART[PAGE_KEY];

    var meta = ghostHost.querySelector(".dossier__meta");
    meta.innerHTML = page.stats
      .map(function (s) {
        return "<div><dt>" + esc(s.k) + "</dt><dd>" + esc(s.v) + "</dd></div>";
      })
      .join("");

    /* body: job list (services) or points (products) */
    var rows = page.jobs || page.points || [];
    var html = "";

    if (rows.length) {
      html += '<section class="sheet wrap"><h2 class="display sheet__title">' +
        (isProduct ? "WHAT YOU GET" : "WHAT WE DO HERE") + "</h2><dl class=\"jobs\">";
      rows.forEach(function (row, i) {
        html +=
          "<div class=\"job\"><dt>" + String(i + 1).padStart(2, "0") + "</dt>" +
          "<h3>" + esc(row[0]) + "</h3>" +
          "<dd>" + esc(row[1]) + "</dd></div>";
      });
      html += "</dl></section>";
    }

    /* product lineup on the RO page (three house lines) */
    if (PAGE_KEY === "ro-purifiers" && typeof window.__purifierSVG === "function") {
      html += '<section class="sheet sheet--alt"><div class="wrap">' +
        '<h2 class="display sheet__title">OUR OWN LINES — WHOLESALE</h2>' +
        '<div class="lineup">' +
        D.PRODUCTS.map(function (p) {
          return (
            '<article class="lineup__card">' +
              '<span class="lineup__brand">' + esc(p.brand) + " · " + esc(p.finish.split(" (")[0]) + "</span>" +
              '<h3 class="lineup__name">' + esc(p.name) + "</h3>" +
              '<span class="lineup__hindi">' + esc(p.hindi) + "</span>" +
              '<div class="lineup__art">' + window.__purifierSVG() + "</div>" +
              '<p class="lineup__spec"><span>TYPE — <b>' + esc(p.type) + "</b></span>" +
              "<span>SPEC — <b>" + esc(p.spec) + "</b></span></p>" +
              '<a class="btn magnetic lineup__cta" target="_blank" rel="noopener" href="' +
                D.wa("Namaste, I want the price of " + p.name, "lineup") + '">' +
                '<span class="btn__fill"></span><span class="btn__txt">ASK PRICE</span></a>' +
            "</article>"
          );
        }).join("") +
        "</div></div></section>";
    }

    /* product pages: variant strip rendered from PRODUCTS */
    if (isProduct && page.variants) {
      var items = D.PRODUCTS.filter(function (p) { return page.variants.indexOf(p.id) > -1; });
      if (items.length) {
        html += '<section class="sheet sheet--alt"><div class="wrap">' +
          '<h2 class="display sheet__title">THE FINISHES</h2><div class="lineup">' +
          items.map(function (p) {
            return (
              '<article class="lineup__card">' +
                '<span class="lineup__brand">' + esc(p.brand) + "</span>" +
                '<h3 class="lineup__name">' + esc(p.name) + "</h3>" +
                '<span class="lineup__hindi">' + esc(p.hindi) + "</span>" +
                '<div class="lineup__art">' + window.__purifierSVG() + "</div>" +
                '<p class="lineup__spec"><span>FINISH — <b>' + esc(p.finish) + "</b></span>" +
                "<span>TYPE — <b>" + esc(p.type) + "</b></span></p>" +
                '<a class="btn magnetic lineup__cta" target="_blank" rel="noopener" href="' +
                  D.wa("Namaste, I want the price of " + p.name, "finish") + '">' +
                  '<span class="btn__fill"></span><span class="btn__txt">ASK PRICE</span></a>' +
              "</article>"
            );
          }).join("") +
          "</div></div></section>";
      }
    }

    /* CTA band */
    html +=
      '<section class="ctaband"><div class="wrap ctaband__in">' +
        '<h2 class="display ctaband__title">Broken? Running? Either way — talk to the bench.</h2>' +
        '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
          '<a class="btn btn--lg magnetic" target="_blank" rel="noopener" href="' + page.wa + '">' +
            '<span class="btn__fill"></span><span class="btn__txt">WHATSAPP THE BENCH</span></a>' +
          '<a class="btn btn--lg btn--copper magnetic" href="tel:' + B.phoneTel + '">' +
            '<span class="btn__fill"></span><span class="btn__txt">CALL ' + esc(B.phoneDisplay) + "</span></a>" +
        "</div>" +
      "</div></section>";

    mount.innerHTML = html;
  }

  /* inner-page motion ------------------------------------------------------ */
  function motion() {
    if (REDUCED) return;

    /* dossier title rise (no mask on inner pages — fade+rise) */
    var title = document.querySelector(".dossier__title");
    if (title && window.SplitType && window.gsap) {
      var split = new SplitType(title, { types: "lines,words" });
      gsap.from(split.words, {
        opacity: 0,
        y: 28,
        duration: 0.7,
        ease: "expo.out",
        stagger: 0.04,
        delay: 0.2
      });
    }

    /* trace draw on the hero art */
    var art = document.querySelector(".dossier__art svg");
    if (art && window.gsap) {
      qsa("path, rect, circle", art).forEach(function (shape) {
        try {
          var len = shape.getTotalLength ? shape.getTotalLength() : 0;
          if (!len) return;
          gsap.set(shape, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(shape, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.out",
            stagger: 0.06,
            scrollTrigger: { trigger: art, start: "top 80%", once: true }
          });
        } catch (e) { /* skip */ }
      });
    }
  }

  window.__initPage = function () {
    build();
    motion();
  };
})();
