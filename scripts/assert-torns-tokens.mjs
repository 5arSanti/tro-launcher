import { readFileSync } from "node:fs";

const css = [
  "tro-frontend/src/App.css",
  "tro-frontend/src/styles/navbar.css",
  "tro-frontend/src/styles/dashboard.css",
].map((file) => readFileSync(file, "utf8")).join("\n");

if (css.includes("#00a8ff")) {
  console.error("FAIL: legacy cyan remains");
  process.exit(1);
}

if (!css.includes("#3d8ec4") && !css.includes("var(--metro-accent)")) {
  console.error("FAIL: civic-strong unused");
  process.exit(1);
}

console.log("PASS: TRO cyan removed");
