/* Recompress oversized images in assets/img/products to ≤300KB (in place).
   Run: bun scripts/img-compress.mjs  (needs the dev-only `sharp` dependency) */
import sharp from "sharp";
import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const dir = new URL("../assets/img/products/", import.meta.url).pathname;

const META = {
  "aioha-classic.png": "AIO-HA Classic RO water purifier with chrome tap",
  "onyx-box-wholesale.png": "OnyX RO purifier in retail box, wholesale carton",
  "starlink-rose-gold.png": "STARLINK slimline RO purifier in rose gold finish",
};

for (const name of readdirSync(dir)) {
  if (!META[name]) continue;
  const p = join(dir, name);
  const kb = Math.round(statSync(p).size / 1024);
  if (kb <= 300) continue;
  const img = sharp(p);
  const meta = await img.metadata();
  const buf =
    name.endsWith(".png")
      ? await img.png({ compressionLevel: 9, palette: true, effort: 10 }).toBuffer()
      : await img.jpeg({ quality: 82, mozjpeg: true }).toBuffer();
  let out = buf;
  if (out.length > 300 * 1024) {
    const q = Math.max(60, Math.floor(82 * (280 / (out.length / 1024))));
    out = await sharp(p).jpeg({ quality: q, mozjpeg: true }).toBuffer();
    const jp = p.replace(/\.png$/i, ".jpg");
    await sharp(out).toFile(jp);
    console.log(`${name} ${kb}KB -> JPEG ${Math.round(out.length / 1024)}KB (renamed ${jp.split("/").pop()})`);
    continue;
  }
  await sharp(out).toFile(p);
  console.log(`${name} ${kb}KB -> ${Math.round(out.length / 1024)}KB (${meta.width}x${meta.height})`);
}
console.log("done");
