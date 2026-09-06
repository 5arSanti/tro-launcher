import { readFileSync } from "node:fs";

const css = readFileSync("lirn-web-main/src/styles/tokens.css", "utf8");
const lower = css.toLowerCase();

if (!lower.includes("--black") || !lower.includes("#000000")) {
  console.error("FAIL: --black / #000000 missing");
  process.exit(1);
}

if (!lower.includes("--white") || !lower.includes("#ffffff")) {
  console.error("FAIL: --white / #ffffff missing");
  process.exit(1);
}

if (!lower.includes("--activity") || !lower.includes("#00a8ff")) {
  console.error("FAIL: --activity #00A8FF missing");
  process.exit(1);
}

if (lower.includes("--amber") || lower.includes("#f59e0b")) {
  console.error("FAIL: brochure amber remains");
  process.exit(1);
}

if (/--bg\s*:\s*var\(--activity\)/.test(lower) || /background:\s*#00a8ff/.test(lower)) {
  console.error("FAIL: activity blue used as fill");
  process.exit(1);
}

console.log("PASS: LIRN tokens are black/white with activity blue");
