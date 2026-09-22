/* Headless DOM smoke test: boots site.js + home.js/page.js in jsdom. */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { JSDOM } = require(process.env.JSDOM_PATH || "jsdom");

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const REDUCED = process.argv.includes("--reduced");
const pageArgs = process.argv.slice(2).filter((a) => a !== "--reduced");
const pages = pageArgs.length
  ? pageArgs
  : ["index.html", "pages/laptops.html", "pages/printers.html", "pages/ro-purifiers.html", "pages/water-softeners.html", "pages/chimneys.html", "pages/wholesale.html", "pages/workshop.html", "pages/contact.html", "pages/products-onyx.html", "pages/products-xpria.html", "pages/products-starlink.html"];

const polyfills = `
  window.matchMedia = window.matchMedia || function (q) {
    return { matches: false, media: q, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} };
  };
  window.ResizeObserver = window.ResizeObserver || class { observe(){} unobserve(){} disconnect(){} };
  window.IntersectionObserver = window.IntersectionObserver || class { observe(){} unobserve(){} disconnect(){} };
  window.scrollTo = window.scrollTo || function(){};
  HTMLIFrameElement.prototype.__defineGetter__("contentWindow", function(){ return null; });
`;

const reducedPolyfill = `
  window.matchMedia = function (q) {
    return { matches: /prefers-reduced-motion/.test(q), media: q, addEventListener(){}, removeEventListener(){}, addListener(){}, removeListener(){} };
  };
  window.ResizeObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
  window.scrollTo = function(){};
`;

let failures = 0;

for (const rel of pages) {
  const html = readFileSync(join(root, rel), "utf8");
  const dom = new JSDOM(html, {
    url: "https://example.com/aio-ha/" + rel,
    runScripts: "outside-only",
    pretendToBeVisual: true
  });
  const { window } = dom;

  const errors = [];
  window.addEventListener("error", (e) => errors.push(e.message));
  window.eval(REDUCED ? reducedPolyfill : polyfills);

  const scripts = [
    "assets/vendor/gsap.min.js",
    "assets/vendor/ScrollTrigger.min.js",
    "assets/vendor/lenis.min.js",
    "assets/vendor/split-type.min.js",
    "assets/vendor/embla-carousel.min.js",
    "assets/js/data.js",
    "assets/js/site.js",
    rel === "index.html" ? "assets/js/home.js" : "assets/js/page.js"
  ];

  for (const src of scripts) {
    try {
      window.eval(readFileSync(join(root, src), "utf8"));
    } catch (e) {
      errors.push(src + ": " + e.message);
    }
  }

  /* fire boot */
  try {
    window.document.dispatchEvent(new window.Event("DOMContentLoaded", { bubbles: true }));
  } catch (e) {
    errors.push("DOMContentLoaded: " + e.message);
  }

  const doc = window.document;

  /* let the preloader timeline finish (gsap 0.5s + 0.95s reveal delay
     on inner pages) and settle reveals, then run structural checks */
  await new Promise((r) => setTimeout(r, 2600));

  const checks = {
    "header rendered": !!doc.querySelector(".header__in"),
    "brand link": !!doc.querySelector('.brand[href$="index.html"]'),
    "nav items": doc.querySelectorAll(".nav__item").length >= 5,
    "dropdowns": doc.querySelectorAll(".dropdown").length >= 2,
    "footer rendered": !!doc.querySelector(".footer__giant"),
    "clock node": !!doc.querySelector("[data-ist-clock]"),
    "wa links": doc.querySelectorAll('a[href*="wa.me"]').length >= 2
  };
  if (rel === "index.html") {
    checks["service panels"] = doc.querySelectorAll(".hspec__panel").length === 6;
    checks["process steps"] = doc.querySelectorAll(".process__step").length === 4;
    checks["review cards"] = doc.querySelectorAll(".review").length === 8;
    checks["color lab product"] = !!doc.querySelector("#labProduct .pframe, #labProduct svg");
    checks["lab steps"] = doc.querySelectorAll(".lab__step").length === 4;
    checks["shop photo frames"] = doc.querySelectorAll("#shopPhotos .pframe").length === 2;
  } else {
    checks["dossier title"] = (doc.querySelector(".dossier__title") || {}).textContent > "";
    checks["dossier meta"] = doc.querySelectorAll(".dossier__meta div").length >= 3;
    checks["job rows"] = doc.querySelectorAll(".job").length >= 3;
    checks["cta band"] = !!doc.querySelector(".ctaband");
  }

  const pageFail = errors.filter(Boolean);
  if (pageFail.length) failures += pageFail.length;
  const checkFail = Object.entries(checks).filter(([, v]) => !v);

  console.log("\n== " + rel + " ==");
  if (pageFail.length) console.log("  JS ERRORS:", pageFail.join(" | "));
  for (const [k, v] of Object.entries(checks)) console.log("  " + (v ? "✓" : "✗") + " " + k);
  if (checkFail.length) failures += checkFail.length;
}

console.log("\n" + (failures ? failures + " FAILURES" : "SMOKE TEST PASSED"));
process.exit(failures ? 1 : 0);
