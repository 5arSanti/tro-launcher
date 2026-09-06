import { readFileSync, existsSync } from "node:fs";

const path = new URL("../DESIGN.md", import.meta.url);
if (!existsSync(path)) {
  console.error("FAIL: DESIGN.md missing");
  process.exit(1);
}

const text = readFileSync(path, "utf8");
const required = [
  "## World",
  "## Voices",
  "## Color",
  "## Type",
  "## Wordmark",
  "## Endorsement",
  "## Mission justification",
  "--paper",
  "--civic",
  "--civic-strong",
  "--night",
  "Schibsted Grotesk",
  "by LIRN",
];

const missing = required.filter((item) => !text.includes(item));
if (missing.length) {
  console.error("FAIL: missing " + missing.join(", "));
  process.exit(1);
}
console.log("PASS: DESIGN.md has required sections");
