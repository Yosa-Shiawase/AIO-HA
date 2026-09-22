/* Generates pages/*.html from _template.html. Run: node scripts/build-pages.mjs */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const tpl = readFileSync(join(root, "pages", "_template.html"), "utf8");

const PAGES = [
  ["laptops", "Laptop Repair in Budh Vihar, Delhi — Chip-Level Service | AIO-HA International", "Chip-level laptop repair for Dell, Lenovo and HP in Budh Vihar Phase 1, Delhi. Motherboards, screens, keyboards, batteries, OS. Same-day diagnostics since 2007."],
  ["printers", "Printer Service in Budh Vihar, Delhi — Canon & HP Experts | AIO-HA International", "Canon and HP printer service in Budh Vihar Phase 1, Delhi. Head cleaning, paper-jam surgery, toner at dealer rates, driver setup. Since 2007."],
  ["ro-purifiers", "RO Repair & Sales in Budh Vihar, Delhi — All Brands + AMC | AIO-HA International", "RO water purifier sales, installation, filter changes and AMC in Budh Vihar Phase 1, Delhi. All major brands plus our own OnyX, XPRIA and STARLINK lines at wholesale prices."],
  ["water-softeners", "Water Softeners in Budh Vihar, Delhi — Homes & Societies | AIO-HA International", "Water softener sales, installation and media service in Budh Vihar Phase 1, Delhi. Hard-water solutions for homes and societies since 2007."],
  ["chimneys", "Kitchen Chimneys & Appliances at Wholesale Rates | AIO-HA International", "Kitchen chimney sales, installation and deep service at wholesale rates in Budh Vihar Phase 1, Delhi. Auto-clean, filterless and baffle models."],
  ["wholesale", "Wholesale RO Units, Spares & Filters — Dealer Pricing | AIO-HA International", "Dealer pricing on RO units, spares, filters and appliances for Delhi shops and tradesmen. OnyX, XPRIA, STARLINK and all major brands. Ask for the trade list."],
  ["contact", "Contact & Repair Job Card — AIO-HA International, Budh Vihar Phase 1, Delhi", "Visit or WhatsApp AIO-HA International at Budh Vihar Phase-1, Mangal Bazar Road, Delhi 110086. Free diagnosis, Mon–Sat 10:00–20:00, +91 92121 60801."],
  ["workshop", "The Workshop — AIO-HA International Since 2007", "One shop, one family, one standard since 2007. Pradeep Kumar Sharma's repair lab and wholesale counter in Budh Vihar Phase 1, New Delhi."],
  ["products-onyx", "OnyX Water Purifiers — Zinc · Copper · Alkaline | AIO-HA International", "OnyX Mystic Blue and Classy Copper RO purifiers — zinc, copper and alkaline stages with LCD indicator, at wholesale prices from AIO-HA International, Delhi."],
  ["products-xpria", "XPRIA Water Purifiers — Storage, Electronic Display | AIO-HA International", "XPRIA storage water purifiers in Black-Smoke, Black-Blue and Black-Green with electronic display and stainless tap — wholesale from AIO-HA International, Delhi."],
  ["products-starlink", "STARLINK Water Purifiers — Slimline RO in 4 Colours | AIO-HA International", "STARLINK slimline RO purifiers in Green, Purple, Rose Gold and Cherry — 24/36/48 W, 12 kg, wholesale prices from AIO-HA International, Delhi."]
];

const crumb = (key) =>
  key.startsWith("products-")
    ? "PRODUCTS / " + key.replace("products-", "").toUpperCase()
    : key === "workshop"
      ? "WORKSHOP"
      : key === "contact"
        ? "CONTACT"
        : "SERVICES / " + key.toUpperCase();

for (const [key, title, desc] of PAGES) {
  const html = tpl
    .replaceAll("__PAGE__", key)
    .replaceAll("__TITLE__", title)
    .replaceAll("__DESC__", desc)
    .replaceAll("__CRUMB__", crumb(key));
  writeFileSync(join(root, "pages", key + ".html"), html);
  console.log("built", "pages/" + key + ".html");
}
console.log("done:", PAGES.length, "pages");
