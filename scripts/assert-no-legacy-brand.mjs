import { readFileSync } from "node:fs";

const files = [
  "tro-frontend/src/components/layout/Navbar.tsx",
  "tro-frontend/src/pages/HomePage.tsx",
  "tro-frontend/index.html",
];
const banned = [
  "TRO SYSTEM",
  ">TRO<",
  "Sistema de Vigilancia",
  "Transport Route Optimization",
];
const hits = [];

for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const needle of banned) {
    if (text.includes(needle)) hits.push(`${file}: ${needle}`);
  }
}

if (hits.length) {
  console.error("FAIL:\n" + hits.join("\n"));
  process.exit(1);
}

console.log("PASS: no legacy brand strings");
