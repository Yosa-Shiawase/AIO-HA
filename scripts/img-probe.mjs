/* Probe intrinsic dimensions of PNG/JPEG files (no deps). */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(new URL("..", import.meta.url).pathname);

function pngSize(buf) {
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}
function jpegSize(buf) {
  let off = 2;
  while (off < buf.length - 9) {
    if (buf[off] !== 0xff) { off++; continue; }
    const marker = buf[off + 1];
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(off + 5), w: buf.readUInt16BE(off + 7) };
    }
    const len = buf.readUInt16BE(off + 2);
    off += 2 + len;
  }
  return null;
}

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else if (/\.(png|jpe?g|webp|gif)$/i.test(name)) out.push(p);
  }
  return out;
}

for (const file of walk(join(root, "assets/img"))) {
  const buf = readFileSync(file);
  let dims = null;
  if (/\.png$/i.test(file)) dims = pngSize(buf);
  else if (/\.jpe?g$/i.test(file)) dims = jpegSize(buf);
  const kb = Math.round(buf.length / 1024);
  const rel = relative(root, file);
  console.log(
    `${dims ? `${dims.w}x${dims.h}` : "??x??"}  ${String(kb).padStart(5)}KB  ${dims && dims.w > 1200 ? "TOO-WIDE " : ""}${kb > 300 ? "OVER-300KB " : ""}${rel}`
  );
}
