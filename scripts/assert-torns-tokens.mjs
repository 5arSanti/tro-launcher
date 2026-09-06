import { readFileSync } from "node:fs";

const css = [
  "tro-frontend/src/App.css",
  "tro-frontend/src/styles/navbar.css",
  "tro-frontend/src/styles/dashboard.css",
  "tro-frontend/src/styles/tokens.css",
].map((file) => readFileSync(file, "utf8")).join("\n");

if (css.includes("#00a8ff")) {
  console.error("FAIL: legacy cyan remains");
  process.exit(1);
}

if (!css.includes("#c4a574") && !css.includes("var(--metro-accent)") && !css.includes("var(--champagne)")) {
  console.error("FAIL: champagne accent unused");
  process.exit(1);
}

console.log("PASS: TRO cyan removed; editorial accent present");
