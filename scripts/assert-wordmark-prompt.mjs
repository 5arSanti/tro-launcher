import { readFileSync } from "node:fs";
const text = readFileSync(new URL("../docs/brand/lirn-wordmark-prompt.md", import.meta.url), "utf8");
for (const needle of ["LIRN", "white", "punto", "nodo", "no isotipo", "no glow"]) {
  if (!text.toLowerCase().includes(needle.toLowerCase()) && !text.includes(needle)) {
    console.error("FAIL: prompt missing " + needle);
    process.exit(1);
  }
}
console.log("PASS: wordmark prompt");
