# AIO-HA INTERNATIONAL — SCHEMATIC Website

Official marketing site for **AIO-HA International** (Budh Vihar Phase-1, New Delhi — est. 2007).
Laptop, printer & RO repair + wholesale water systems.

Design concept: **SCHEMATIC (Paper & PCB)** — flat ink on schematic paper, PCB-green + copper,
stamps, barcodes, job cards, Devanagari ghost type. No gradients, no glow, no stock layouts.

---

## RUN IT

Zero build step. Any static server works:

```bash
cd aio-ha
npm run dev          # python http.server on :4173
# or: npx serve .
```

Open `http://localhost:4173`.

## STRUCTURE

```
aio-ha/
├── index.html                  # landing (all sections)
├── pages/                      # 10 dossier pages (multi-page + dropdown targets)
│   ├── _template.html          # ← page template (edit with care)
│   ├── laptops.html            # S01
│   ├── printers.html           # S02
│   ├── ro-purifiers.html       # S03 (+ product lineup)
│   ├── water-softeners.html    # S04
│   ├── chimneys.html           # S05
│   ├── wholesale.html          # S06 / P00 trade desk
│   ├── products-onyx.html      # P01
│   ├── products-xpria.html     # P02
│   ├── products-starlink.html  # P03
│   └── workshop.html           # about / since 2007
├── assets/
│   ├── css/main.css            # design system (all tokens in :root)
│   ├── js/
│   │   ├── data.js             # ★ EDIT CONTENT HERE ★
│   │   ├── site.js             # shell: nav, footer, preloader, cursor, motion core
│   │   ├── home.js             # landing scroll animations
│   │   └── page.js             # inner-page template builder
│   └── vendor/                 # gsap, ScrollTrigger, lenis, split-type, embla (vendored, offline)
└── scripts/build-pages.mjs     # regenerate pages/*.html after editing _template.html
```

---

## HOW TO EDIT (no coding knowledge needed for most of it)

### ★ Everything lives in `assets/js/data.js`

| I want to change…            | Edit in `data.js`                     |
| ---------------------------- | ------------------------------------- |
| Phone / WhatsApp numbers     | `PHONE_DISPLAY`, `WHATSAPP_NUMBER` (top of file) |
| Address, hours, map          | `BUSINESS.address`, `BUSINESS.hours`  |
| Services & their copy        | `SERVICES` array                      |
| **Products & colours**       | `PRODUCTS` array (Color Lab + lineups read this) |
| Service/product page copy    | `PAGES` / `PRODUCT_PAGES` objects     |
| Customer reviews             | `REVIEWS` array (TODO: replace placeholders with real ones) |
| Stats (years, devices…)      | `STATS` array                         |
| Menu items / dropdowns       | `NAV` array                           |
| Marquee text                 | `MARQUEE` string                      |

### Add a new product (shows up everywhere automatically)

1. Open `assets/js/data.js`.
2. Add an object to `PRODUCTS`:

```js
{
  id: "onyx-green",                 // unique
  brand: "ONYX",
  name: "OnyX Forest Green",
  hindi: "हरा",
  finish: "FOREST GREEN",
  type: "Zinc · Copper · Alkaline",
  spec: "LCD indicator · wall mount",
  accent: "#3A6B35",                // ← the whole site recolors to this in the Color Lab
  swatch: "#3A6B35"
}
```

3. Done — Color Lab, the RO page lineup and product pages pick it up automatically.

### Add a brand-new page

1. Add copy to `PAGES` (service) or `PRODUCT_PAGES` (product) in `data.js`.
2. Add a `["key", "Title", "meta description"]` row in `scripts/build-pages.mjs`.
3. Run `node scripts/build-pages.mjs`.
4. Add the link to `NAV` in `data.js`.

### Replace placeholder reviews

Search `data.js` for `TODO(OWNER)` — the 8 review cards are realistic placeholders.
Replace names/areas/quotes with real customers (ask permission!). Cards, barcode and
rotation are automatic.

### Change colours / fonts

All tokens are CSS variables at the top of `assets/css/main.css` (`--paper`, `--ink`,
`--mask`, `--copper`, `--flux`, `--dark`). The Color Lab morphs `--accent` live — that's
why every button/link consumes `var(--accent)`.

---

## TECH

- Static HTML/CSS/JS — no framework, no backend, hosts anywhere.
- Lenis smooth scroll + GSAP ScrollTrigger (pinned horizontal services, Color Lab
  scroll-morph, process trace scrub, magnetic buttons, custom cursor).
- SplitType char/line reveals; Embla draggable reviews; prefers-reduced-motion fully
  respected (static page).
- All CTAs deep-link to WhatsApp (`wa.me`) with prefilled messages + `?utm_source=`.
- LocalBusiness JSON-LD on the landing page; per-page SEO titles/descriptions.

## NOTES

- Reviews are placeholders — replace before going loud (see above).
- Photos: the design is intentionally illustration/typography-led. Drop real product
  photos into `assets/img/` and swap the lineups in `page.js` when available.
