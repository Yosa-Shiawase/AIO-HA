/* ============================================================================
   AIO-HA INTERNATIONAL — SITE DATA (single source of truth)
   ----------------------------------------------------------------------------
   EDIT THIS FILE to change phone numbers, products, services, reviews,
   prices, hours or copy. Every page re-renders from here at load time.
   ============================================================================ */

window.AIOHA = (function () {
  "use strict";

  /* ---------- 1. BUSINESS CORE ------------------------------------------ */
  var PHONE_DISPLAY = "+91 92121 60801";
  var PHONE_TEL = "+919212160801";
  var PHONE_SHOP_DISPLAY = "+91 99901 50611";
  var WHATSAPP_NUMBER = "+919212160801"; // digits only, with country code

  var wa = function (message, utm) {
    var text = encodeURIComponent(message || "Namaste, I need a repair:");
    var src = utm || "website";
    return (
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + text +
      "&utm_source=" + src
    );
  };

  /* ---------- 1b. PRODUCT PHOTOGRAPHY (local files only) ----------------- */
  // Paths are site-root relative; renderers prefix window.AIOHA_ROOT so the
  // same data works from / and /pages/. Every frame must degrade to a styled
  // product-name plate if a photo is missing (see data-img onerror handler).
  var IMG = function (file) {
    return "assets/img/products/" + file;
  };
  var SHOP_PHOTOS = [
    // TODO(OWNER): save these two from your phone — the Google business photos
    // are bot-blocked. Until the files exist the frames show the shop name.
    { src: IMG("shop-front.jpg"), alt: "AIO-HA International shop front, Budh Vihar Phase 1, Delhi" },
    { src: IMG("interior-1.jpg"), alt: "Inside the AIO-HA International repair workshop and RO counter" }
  ];

  var BUSINESS = {
    name: "AIO-HA International",
    tagline: "Purity guaranteed. Think what you drink.",
    established: 2007,
    owner: "Pradeep Kumar Sharma",
    phoneDisplay: PHONE_DISPLAY,
    phoneShopDisplay: PHONE_SHOP_DISPLAY,
    phoneTel: PHONE_TEL,
    whatsappNumber: WHATSAPP_NUMBER,
    wa: wa,
    waRepair: wa("Namaste, I need a repair: ", "website"),
    waWholesale: wa(
      "Namaste, I want the wholesale price list for RO units, spares and filters.",
      "website"
    ),
    waAMC: wa(
      "Namaste, I want an AMC for my RO water purifier.",
      "website"
    ),
    address: {
      line1: "AIO-HA International",
      line2: "Budh Vihar, Phase-1, Mangal Bazar Road",
      line3: "Delhi – 110086 (Near Bharat Gas Agency)",
      locality: "Budh Vihar Phase 1",
      city: "New Delhi",
      pincode: "110086",
      geo: { lat: 28.7186, lng: 77.0872 }
    },
    hours: "Mon–Sat 10:00–20:00",
    hoursShort: "MON–SAT · 10–20",
    mapEmbed:
      "https://www.google.com/maps?q=Budh+Vihar+Phase-1,+Mangal+Bazar+Road,+Delhi-110086&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=AIO-HA+International+Budh+Vihar+Phase-1+Delhi-110086"
  };

  /* ---------- 2. NAVIGATION (multi-page + dropdown) ---------------------- */
  // type: "page" | "anchor" | "dropdown"
  var NAV = [
    {
      label: "HOME",
      type: "page",
      href: "index.html"
    },
    {
      label: "SERVICES",
      type: "dropdown",
      items: [
        {
          label: "Laptop & Computer Repair",
          mono: "(S01)",
          desc: "Chip-level, Dell · Lenovo · HP",
          href: "pages/laptops.html"
        },
        {
          label: "Printer Service",
          mono: "(S02)",
          desc: "Canon, HP — toner to head",
          href: "pages/printers.html"
        },
        {
          label: "RO Water Purifiers",
          mono: "(S03)",
          desc: "Sales · install · filter · AMC",
          href: "pages/ro-purifiers.html"
        },
        {
          label: "Water Softeners",
          mono: "(S04)",
          desc: "Hard-water cure, fitted right",
          href: "pages/water-softeners.html"
        },
        {
          label: "Chimneys & Appliances",
          mono: "(S05)",
          desc: "Kitchen stack, wholesale rates",
          href: "pages/chimneys.html"
        }
      ]
    },
    {
      label: "PRODUCTS",
      type: "dropdown",
      items: [
        {
          label: "OnyX Series",
          mono: "(P01)",
          desc: "Zinc-copper-alkaline, LCD",
          href: "pages/products-onyx.html"
        },
        {
          label: "XPRIA Series",
          mono: "(P02)",
          desc: "Storage purifiers, 3 finishes",
          href: "pages/products-xpria.html"
        },
        {
          label: "STARLINK Series",
          mono: "(P03)",
          desc: "Slimline, 4 colourways",
          href: "pages/products-starlink.html"
        },
        { divider: true },
        {
          label: "Wholesale Supply",
          mono: "(P00)",
          desc: "Trade pricing for dealers",
          href: "pages/wholesale.html"
        }
      ]
    },
    {
      label: "WORKSHOP",
      type: "page",
      href: "pages/workshop.html"
    },
    {
      label: "CONTACT",
      type: "page",
      href: "pages/contact.html"
    }
  ];

  /* ---------- 3. SERVICES (horizontal scroll on home) ------------------- */
  var SERVICES = [
    {
      index: "(01)",
      title: "LAPTOP & COMPUTER",
      hindi: "लैपटॉप",
      desc: "Dell, Lenovo, HP. Chip-level repair, screens, keyboards, batteries, OS. Same-day diagnostics.",
      href: "pages/laptops.html",
      art: "laptop"
    },
    {
      index: "(02)",
      title: "PRINTER SERVICE",
      hindi: "प्रिंटर",
      desc: "Canon, HP & more. Head cleaning, toner, drivers, paper-jam surgery.",
      href: "pages/printers.html",
      art: "printer"
    },
    {
      index: "(03)",
      title: "RO WATER PURIFIERS",
      hindi: "जल",
      desc: "Sales, installation, filter changes, full AMC. Every major brand + our own AIO-HA units.",
      href: "pages/ro-purifiers.html",
      art: "ro"
    },
    {
      index: "(04)",
      title: "WATER SOFTENERS",
      hindi: "मृदु",
      desc: "Hard-water solutions for homes & societies. Fitted right, priced fair.",
      href: "pages/water-softeners.html",
      art: "softener"
    },
    {
      index: "(05)",
      title: "CHIMNEYS & APPLIANCES",
      hindi: "रसोई",
      desc: "Kitchen chimneys & appliances at genuine wholesale rates.",
      href: "pages/chimneys.html",
      art: "chimney"
    },
    {
      index: "(06)",
      title: "WHOLESALE SUPPLY",
      hindi: "थोक",
      desc: "Dealer pricing on RO units, spares & filters. Ask for the trade list.",
      href: "pages/wholesale.html",
      art: "wholesale"
    }
  ];

  /* ---------- 4. COLOR LAB PRODUCTS (house brands) ---------------------- */
  var PRODUCTS = [
    {
      id: "onyx-blue",
      brand: "ONYX",
      name: "OnyX Mystic Blue",
      hindi: "नील",
      finish: "MYSTIC BLUE",
      type: "Zinc · Copper · Alkaline",
      spec: "LCD indicator · space-saving wall mount",
      img: IMG("onyx-mystic-blue.jpeg"),
      alt: "OnyX Mystic Blue RO water purifier",
      accent: "#1F6E7A",
      swatch: "#1F6E7A"
    },
    {
      id: "onyx-copper",
      brand: "ONYX",
      name: "OnyX Classy Copper",
      hindi: "तांब",
      finish: "CLASSY COPPER",
      type: "Zinc · Copper · Alkaline",
      spec: "LCD indicator · space-saving wall mount",
      img: IMG("onyx-classy-copper.png"),
      alt: "OnyX Classy Copper RO water purifier",
      accent: "#B4633A",
      swatch: "#B4633A"
    },
    {
      id: "xpria",
      brand: "XPRIA",
      name: "XPRIA Water Purifier",
      hindi: "शुद्ध",
      finish: "BLACK-SMOKE / BLUE / GREEN",
      type: "Storage purifier · multiple finishes",
      spec: "Electronic display · stainless tap",
      img: IMG("ro-black-copper-1.png"),
      alt: "XPRIA storage water purifier in black-copper finish",
      accent: "#0E5A40",
      swatch: "#0E5A40"
    },
    {
      id: "starlink-rose",
      brand: "STARLINK",
      name: "STARLINK Rose Gold",
      hindi: "गुल",
      finish: "ROSE GOLD (also Green · Purple · Cherry)",
      type: "Slimline RO · 24/36/48 W",
      spec: "419 × 241 × 568 mm · 12 kg",
      img: IMG("starlink-rose-gold.png"),
      alt: "STARLINK slimline RO water purifier in rose gold",
      accent: "#C4737F",
      swatch: "#C4737F"
    }
  ];

  /* ---------- 5. PROCESS STEPS ------------------------------------------ */
  var PROCESS = [
    {
      index: "01",
      title: "CALL OR WHATSAPP",
      desc: "Tell us the model and the symptom. A photo of the unit helps. We answer fast — average 45 minutes."
    },
    {
      index: "02",
      title: "FREE DIAGNOSIS QUOTE",
      desc: "Bring the machine or book a home visit. We diagnose first, quote second — no surprises on the bill."
    },
    {
      index: "03",
      title: "WE FIX IT",
      desc: "Or you don't pay. Genuine spares, bench-tested before the panel goes back on."
    },
    {
      index: "04",
      title: "90-DAY SERVICE WARRANTY",
      desc: "Every repair leaves with a written 90-day service warranty on the work done."
    }
  ];

  /* ---------- 6. STATS --------------------------------------------------- */
  var STATS = [
    { value: 18, suffix: "+", label: "YEARS ON THE BENCH" },
    { value: 10000, suffix: "+", label: "DEVICES SERVICED" },
    { value: 45, suffix: "-MIN", label: "AVG RESPONSE" },
    { value: 4.9, suffix: "★", label: "LOCAL RATING", decimals: 1 }
  ];

  /* ---------- 7. REVIEWS (placeholder — replace with real ones) --------- */
  // TODO(OWNER): swap these 8 cards for real customer names & reviews.
  var REVIEWS = [
    {
      quote: "Motherboard dead, two shops said buy a new laptop. AIO-HA changed one chip and it runs like day one. 90-day card on the wall, never needed it.",
      name: "ROHIT MALHOTRA",
      area: "ROHINI SEC-7",
      rating: 5
    },
    {
      quote: "They service my Canon every quarter. Toners at dealer rate, and the fellow explains what he did in plain language. Rare in this trade.",
      name: "S. CHADHA & SONS",
      area: "PITAMPURA",
      rating: 5
    },
    {
      quote: "RO install next morning after one WhatsApp. Tidy piping, no drips, and the filter-change reminder call came right on schedule.",
      name: "MEENA SHARMA",
      area: "BUDH VIHAR PH-1",
      rating: 5
    },
    {
      quote: "Bought the OnyX copper unit for the whole floor. Water tastes sweet, and the LCD tells you when service is due. Neighbour already ordered one.",
      name: "JATIN ARORA",
      area: "AVANTIKA",
      rating: 5
    },
    {
      quote: "Society softener fitted in a day. Our bathroom fittings finally stopped growing white crust. Fair price, honest work.",
      name: "R. K. GUPTA",
      area: "MANGOL PURI",
      rating: 4
    },
    {
      quote: "Chimney + hob bundle at wholesale price for our new kitchen. Fitted same week, they even masked the tiles before drilling.",
      name: "PRIYA NAGPAL",
      area: "SHALIMAR BAGH",
      rating: 5
    },
    {
      quote: "HP printer used to jam every third page. They fixed the roller and taught me the right paper trick. Two years, zero jams.",
      name: "DELHI TUTORIALS",
      area: "SARASWATI VIHAR",
      rating: 5
    },
    {
      quote: "I buy RO spares for my own shop from them. Rates are the best in the zone and stock is genuine. Deal stays on WhatsApp.",
      name: "A. P. TRADERS",
      area: "NAHARPUR",
      rating: 5
    }
  ];

  /* ---------- 8. MARQUEE / TICKER ---------------------------------------- */
  var MARQUEE =
    "LAPTOP REPAIR ✦ RO PURIFIERS ✦ PRINTERS ✦ WATER SOFTENERS ✦ CHIMNEYS ✦ WHOLESALE RATES ✦ ";

  /* ---------- 9. PAGE-LEVEL CONTENT MAPS --------------------------------- */
  // Each inner page merges its own PAGE copy with these shared defaults.
  var PAGE_DEFAULTS = {
    marquee: MARQUEE,
    hours: BUSINESS.hours
  };

  var PAGES = {
    laptops: {
      kicker: "(S01) — SERVICE DOSSIER",
      title: "CHIP-LEVEL LAPTOP REPAIR",
      ghost: "मरम्मत",
      lead:
        "Board-level work, not board replacement. Since 2007 our bench has re-soldered, re-balled and re-brought-back-to-life every major Dell, Lenovo and HP platform sold in North-West Delhi.",
      stats: [
        { k: "BENCH", v: "Dell · Lenovo · HP" },
        { k: "TURNAROUND", v: "Same-day diagnostics" },
        { k: "SPARES", v: "Genuine, bench-tested" }
      ],
      pageImg: IMG("ro-undercounter.jpg"),
      pageImgAlt: "Under-counter RO unit serviced by AIO-HA International",
      jobs: [
        ["Motherboard / chip-level", "Re-ball, re-solder, dead-short hunting on the bench — no blind board swaps."],
        ["Screens & hinges", "Panel replacement for every common fitment, hinge re-builds done properly."],
        ["Keyboards & batteries", "Genuine replacements, fitted, firmware-safe."],
        ["OS & data", "Windows setup, recovery, migration — your files kept intact."]
      ],
      photos: [
        { src: IMG("ro-undercounter.jpg"), alt: "Under-counter RO unit serviced by AIO-HA International" },
        { src: IMG("ro-white-king.jpg"), alt: "White RO purifier from the AIO-HA range" }
      ],
      crossLinks: [
        { href: "printers.html", label: "Printer service & toner" },
        { href: "ro-purifiers.html", label: "RO purifier sales & AMC" }
      ],
      wa: wa("Namaste, my laptop model is ______ and the problem is ______", "laptops")
    },
    printers: {
      kicker: "(S02) — SERVICE DOSSIER",
      title: "PRINTER SERVICE & SURGERY",
      ghost: "छपाई",
      lead:
        "Head cleans, roller rebuilds, toner at dealer rates and driver setups that actually stick. Canon, HP and the rest of the office stable — kept printing.",
      stats: [
        { k: "BRANDS", v: "Canon · HP & more" },
        { k: "VISITS", v: "Walk-in & on-site" },
        { k: "TONER", v: "Dealer-rate refills" }
      ],
      pageImg: IMG("prefilter-blue-trio.jpg"),
      pageImgAlt: "Trio of pre-filter housings — spares kept in stock",
      jobs: [
        ["Head cleaning & rebuild", "Blocked heads revived, not replaced — where the head allows."],
        ["Paper-jam surgery", "Rollers, sensors, pickup — the jam you've lived with for months."],
        ["Toner & spares", "Genuine toner and parts at wholesale/dealer rates."],
        ["Drivers & network", "Set up once, prints from every desk in the office."]
      ],
      photos: [
        { src: IMG("prefilter-blue-trio.jpg"), alt: "Trio of pre-filter housings — spares kept in stock" },
        { src: IMG("ro-undercounter.jpg"), alt: "Under-counter RO unit serviced by AIO-HA International" }
      ],
      crossLinks: [
        { href: "laptops.html", label: "Laptop & computer repair" },
        { href: "wholesale.html", label: "Wholesale spares & filters" }
      ],
      wa: wa("Namaste, my printer model is ______ and the problem is ______", "printers")
    },
    "ro-purifiers": {
      kicker: "(S03) — SERVICE DOSSIER",
      title: "RO WATER PURIFIERS",
      ghost: "जल",
      lead:
        "Sales, installation, filter changes and full annual maintenance — on every major brand, plus our own OnyX, XPRIA and STARLINK lines at wholesale prices. Purity guaranteed since 2007.",
      stats: [
        { k: "BRANDS", v: "All major + house lines" },
        { k: "AMC", v: "Scheduled filter plan" },
        { k: "PRICE", v: "Wholesale, printed" }
      ],
      jobs: [
        ["New sales & install", "Wall-mount or under-sink, tidy piping, pressure-tested before we leave."],
        ["Filter changes", "Sediment, pre-carbon, RO membrane, post-carbon, mineral — on schedule."],
        ["Full AMC", "A yearly plan with visit reminders — the tank never turns rusty again."],
        ["Repairs", "SMPS, pumps, valves, float switches — bench-tested, not guesswork."]
      ],
      wa: wa("Namaste, I need RO service / a new purifier. My area is ______", "ro-purifiers")
    },
    "water-softeners": {
      kicker: "(S04) — SERVICE DOSSIER",
      title: "WATER SOFTENERS",
      ghost: "मृदु",
      lead:
        "Delhi's hard water coats taps, kills geysers and turns hair to straw. We size, fit and maintain softeners for homes and whole societies — priced per the job, not the guess.",
      stats: [
        { k: "SCALE", v: "Flats to societies" },
        { k: "FIT", v: "Same-week install" },
        { k: "MEDIA", v: "Regenerated on plan" }
      ],
      pageImg: IMG("aioha-ocean.jpg"),
      pageImgAlt: "AIO-HA Ocean unit from the shop's own range",
      jobs: [
        ["Home units", "Sized to family & bathroom count, fitted at the inlet."],
        ["Society systems", "Multi-vessel setups with maintenance contracts."],
        ["Media re-charging", "Salt & resin service on schedule — most 'dead' softeners just need this."],
        ["Water testing", "Hardness measured before and after — you see the numbers."]
      ],
      wa: wa("Namaste, I want a water softener quote. My home/society is in ______", "water-softeners")
    },
    chimneys: {
      kicker: "(S05) — SERVICE DOSSIER",
      title: "CHIMNEYS & APPLIANCES",
      ghost: "रसोई",
      lead:
        "Kitchen chimneys, hobs and appliances at genuine wholesale rates — supplied, fitted and serviced. The baffle filters everyone else forgets? We clean those too.",
      stats: [
        { k: "RANGE", v: "60/90cm · auto-clean" },
        { k: "FIT", v: "Ducting done right" },
        { k: "PRICE", v: "Wholesale, printed" }
      ],
      pageImg: IMG("gas-hob-3burner.png"),
      pageImgAlt: "Three-burner gas hob from the AIO-HA appliance range",
      jobs: [
        ["Chimney sales", "Auto-clean, filterless and baffle models — all the current lines."],
        ["Installation", "Ducting routed properly — no sagging pipes, no recirculation smell."],
        ["Deep service", "Baffle & baffle-less deep clean, motor and PCB check."],
        ["Appliances", "Hobs, cooktops and small appliances at the same trade pricing."]
      ],
      photos: [
        { src: IMG("gas-hob-3burner.png"), alt: "Three-burner gas hob from the AIO-HA appliance range" },
        { src: IMG("aioha-ocean.jpg"), alt: "AIO-HA Ocean — unit from the shop's own range" }
      ],
      crossLinks: [
        { href: "water-softeners.html", label: "Water softeners" },
        { href: "wholesale.html", label: "Wholesale appliance pricing" }
      ],
      wa: wa("Namaste, I want a chimney/appliance quote for my kitchen", "chimneys")
    },
    wholesale: {
      kicker: "(P00) — TRADE DESK",
      title: "WHOLESALE SUPPLY",
      ghost: "थोक",
      lead:
        "Dealer pricing on RO units, spares, filters and appliances for shops, offices and fellow tradesmen across Delhi. Ask on WhatsApp for the current trade list — it moves with the market.",
      stats: [
        { k: "LEDGER", v: "Dealer rate card" },
        { k: "STOCK", v: "RO units · spares · filters" },
        { k: "TERMS", v: "WhatsApp the list" }
      ],
      pageImg: IMG("onyx-box-wholesale.png"),
      pageImgAlt: "OnyX RO purifiers in wholesale cartons",
      jobs: [
        ["RO units", "House lines (OnyX · XPRIA · STARLINK) + every major brand."],
        ["Spares", "SMPS, pumps, membranes, float valves — genuine stock."],
        ["Filters", "All stages, wholesale packs, shop-ready quantities."],
        ["Appliances", "Chimneys and kitchen appliances by the carton."]
      ],
      photos: [
        { src: IMG("onyx-box-wholesale.png"), alt: "OnyX RO purifiers in wholesale cartons" },
        { src: IMG("ro-max-white.png"), alt: "RO purifier models stocked at the AIO-HA wholesale counter" }
      ],
      crossLinks: [
        { href: "ro-purifiers.html", label: "RO purifier service & AMC" },
        { href: "chimneys.html", label: "Chimneys & appliances" }
      ],
      wa: BUSINESS.waWholesale
    },
    contact: {
      kicker: "(06) — CONTACT / JOB CARD",
      title: "TELL US WHAT'S BROKEN",
      ghost: "संपर्क",
      lead:
        "Walk in, call or WhatsApp. Diagnosis is free — you approve the quote before any work starts. Mon–Sat 10:00–20:00 at Budh Vihar Phase-1, near Bharat Gas Agency.",
      stats: [
        { k: "CALL", v: "+91 92121 60801" },
        { k: "SHOP №", v: "+91 99901 50611" },
        { k: "HOURS", v: "Mon–Sat 10–20" }
      ],
      pageImg: IMG("ro-max-white.png"),
      pageImgAlt: "RO purifier stocked at the AIO-HA counter",
      jobs: [
        ["WhatsApp or call", "+91 92121 60801 — a human answers, not a bot. Average response under 45 minutes in working hours."],
        ["Walk into the shop", "Budh Vihar Phase-1, Mangal Bazar Road, Delhi 110086 — near Bharat Gas Agency. Mon–Sat 10:00–20:00."],
        ["Free diagnosis", "Bring the machine or book a home visit. We diagnose first, quote second — you approve before any work starts."],
        ["90-day warranty", "Every repair leaves with a written 90-day service warranty on the work done. Job card, signed."],
        ["Dealer / wholesale desk", "Shops and tradesmen: ask for the trade rate list — RO units, spares, filters and appliances."]
      ],
      photos: [
        { src: IMG("ro-max-white.png"), alt: "RO water purifier on display at AIO-HA International, Budh Vihar" },
        { src: IMG("prefilter-blue-trio.jpg"), alt: "Genuine RO filters and spares stocked in shop" }
      ],
      crossLinks: [
        { href: "laptops.html", label: "Book a laptop repair" },
        { href: "ro-purifiers.html", label: "Book an RO service" }
      ],
      wa: wa("Namaste, I have a question for AIO-HA International", "contact")
    },
    workshop: {
      kicker: "EST. 2007 — THE WORKSHOP",
      title: "18 YEARS ON THE BENCH",
      ghost: "सेवा",
      lead:
        "One shop, one family, one standard since 2007. Pradeep Kumar Sharma runs AIO-HA International from Budh Vihar Phase-1 — half repair lab, half wholesale counter. The job card says what was done; the warranty says we stand behind it.",
      stats: [
        { k: "EST.", v: "2007" },
        { k: "OWNER", v: "Pradeep Kumar Sharma" },
        { k: "STANDARD", v: "Fix the cause" }
      ],
      pageImg: IMG("aioha-classic.png"),
      pageImgAlt: "AIO-HA Classic RO water purifier at the workshop",
      jobs: [
        ["Repair lab", "Chip-level benches for laptops, printers and RO electronics."],
        ["Wholesale counter", "RO units, filters, spares — the trade buys here."],
        ["Home service", "RO, softener and chimney installs across North-West Delhi."],
        ["AMC desk", "Scheduled filter & media plans for homes and offices."]
      ],
      wa: wa("Namaste, I have a question for AIO-HA International", "workshop")
    }
  };

  /* ---------- 9b. PRODUCT PAGES (house brands) --------------------------- */
  var PRODUCT_PAGES = {
    "products-onyx": {
      kicker: "(P01) — HOUSE BRAND",
      title: "ONYX SERIES",
      ghost: "नील",
      lead:
        "Zinc · Copper · Alkaline. Space-saving wall-mount systems with LCD indicators — AIO-HA's own line, sold at wholesale prices with fitting and a written service plan.",
      stats: [
        { k: "STAGES", v: "Zinc · Copper · Alkaline" },
        { k: "INDICATOR", v: "LCD display" },
        { k: "MOUNT", v: "Space-saving wall" }
      ],
      pageImg: IMG("onyx-classy-copper.png"),
      pageImgAlt: "OnyX Classy Copper wall-mount RO water purifier",
      photo: IMG("onyx-classy-copper.png"),
      photoAlt: "OnyX Classy Copper wall-mount RO water purifier",
      gallery: [
        { src: IMG("onyx-mystic-blue.jpeg"), alt: "OnyX Mystic Blue RO water purifier" },
        { src: IMG("onyx-box-wholesale.png"), alt: "OnyX RO purifier in its wholesale carton" }
      ],
      variants: ["onyx-blue", "onyx-copper"],
      crossLinks: [
        { href: "products-xpria.html", label: "XPRIA storage purifiers" },
        { href: "products-starlink.html", label: "STARLINK slimline series" }
      ],
      points: [
        ["LCD indicator", "Status at a glance — power, tank, service due."],
        ["Copper chamber", "The metal your grandmother insisted on, engineered in."],
        ["Alkaline stage", "pH balanced, taste that keeps the family drinking water."],
        ["Space-saving", "Slim wall profile — the counter stays yours."]
      ],
      wa: wa("Namaste, I want the OnyX purifier price list (Mystic Blue / Classy Copper)", "products-onyx")
    },
    "products-xpria": {
      kicker: "(P02) — HOUSE BRAND",
      title: "XPRIA SERIES",
      ghost: "शुद्ध",
      lead:
        "Storage purifiers in Black-Smoke, Black-Blue and Black-Green. Electronic display, stainless tap, and a body that shrugs off Delhi summers. Wholesale price, fitted by our own hands.",
      stats: [
        { k: "FINISHES", v: "Smoke · Blue · Green" },
        { k: "TAP", v: "Stainless steel" },
        { k: "DISPLAY", v: "Electronic" }
      ],
      pageImg: IMG("ro-black-copper-1.png"),
      pageImgAlt: "XPRIA storage water purifier in black-copper finish",
      photo: IMG("ro-black-copper-1.png"),
      photoAlt: "XPRIA storage water purifier in black-copper finish",
      gallery: [
        { src: IMG("ro-black-copper-2.png"), alt: "XPRIA water purifier, second angle" },
        { src: IMG("aioha-classic.png"), alt: "AIO-HA Classic RO water purifier with chrome tap" }
      ],
      variants: ["xpria"],
      crossLinks: [
        { href: "products-onyx.html", label: "OnyX zinc-copper-alkaline series" },
        { href: "ro-purifiers.html", label: "RO service, filters & AMC" }
      ],
      points: [
        ["Storage tank", "Water ready when the power is not."],
        ["Electronic display", "Clean, readable, service-honest."],
        ["Stainless tap", "No plastic drip, no yellowing."],
        ["Three finishes", "Match the kitchen, not the catalogue."]
      ],
      wa: wa("Namaste, I want the XPRIA purifier price list", "products-xpria")
    },
    "products-starlink": {
      kicker: "(P03) — HOUSE BRAND",
      title: "STARLINK SERIES",
      ghost: "गुल",
      lead:
        "Slimline RO in four colourways — Green, Purple, Rose Gold, Cherry. 24/36/48 W power draw, 12 kg on the wall, a mural that also purifies. Wholesale price, fitted by our own hands.",
      stats: [
        { k: "FINISHES", v: "Green · Purple · Rose Gold · Cherry" },
        { k: "POWER", v: "24 / 36 / 48 W" },
        { k: "BODY", v: "419 × 241 × 568 mm · 12 kg" }
      ],
      pageImg: IMG("starlink-rose-gold.png"),
      pageImgAlt: "STARLINK slimline RO water purifier in rose gold",
      photo: IMG("starlink-rose-gold.png"),
      photoAlt: "STARLINK slimline RO water purifier in rose gold",
      gallery: [
        { src: IMG("starlink-green.jpeg"), alt: "STARLINK slimline RO water purifier in green" },
        { src: IMG("ro-white-king.jpg"), alt: "Slim white RO water purifier on display" }
      ],
      variants: ["starlink-rose"],
      crossLinks: [
        { href: "products-onyx.html", label: "OnyX zinc-copper-alkaline series" },
        { href: "products-xpria.html", label: "XPRIA storage purifiers" }
      ],
      points: [
        ["Slimline body", "The narrowest wall footprint in our lineup."],
        ["Four colourways", "Rose Gold for the show kitchen, Cherry for the back one."],
        ["24–48 W", "Sipped power, not gulped."],
        ["Service-ready", "Filters swap in minutes on our AMC plan."]
      ],
      wa: wa("Namaste, I want the STARLINK purifier price list", "products-starlink")
    }
  };

  /* ---------- 10. FOOTER ------------------------------------------------- */
  var FOOTER = {
    barcode: "AIOHA-2007-DELHI-110086",
    line: "AIO-HA INTERNATIONAL — REPAIR LAB & WHOLESALE, BUDH VIHAR, NEW DELHI. EST. 2007."
  };

  /* ---------- EXPORT ------------------------------------------------------ */
  return {
    BUSINESS: BUSINESS,
    NAV: NAV,
    SERVICES: SERVICES,
    PRODUCTS: PRODUCTS,
    PROCESS: PROCESS,
    STATS: STATS,
    REVIEWS: REVIEWS,
    MARQUEE: MARQUEE,
    PAGES: PAGES,
    PRODUCT_PAGES: PRODUCT_PAGES,
    SHOP_PHOTOS: SHOP_PHOTOS,
    PAGE_DEFAULTS: PAGE_DEFAULTS,
    FOOTER: FOOTER,
    wa: wa
  };
})();
