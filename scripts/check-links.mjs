/* Validates all local href/src references across built HTML resolve to files. */
import { readFileSync, existsSync } from "node:fs";
import { dirname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const { globSync } = await import("node:fs");

const files = globSync("pages/*.html", { cwd: root })
  .concat(globSync("*.html", { cwd: root }))
  .map((f) => join(root, f));

let bad = 0;
for (const file of files) {
  const html = readFileSync(file, "utf8");
  const refs = [...html.matchAll(/(?:href|src)="([^"#]+?)"/g)].map((m) => m[1]);
  for (const ref of refs) {
    if (/^(https?:|tel:|mailto:|data:)/.test(ref)) continue;
    const clean = ref.split("?")[0].split("#")[0];
    if (!clean) continue;
    const target = normalize(join(dirname(file), clean));
    if (!existsSync(target)) {
      console.log("BROKEN", file.replace(root + "/", ""), "->", ref);
      bad++;
    }
  }
}
console.log(bad ? bad + " broken refs" : "all local refs OK across " + files.length + " pages");
