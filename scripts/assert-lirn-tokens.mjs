import { readFileSync } from "node:fs";

const tokenCss = readFileSync("lirn-web-main/src/styles/tokens.css", "utf8");
const siteCss = readFileSync("lirn-web-main/src/styles/site.css", "utf8");
const lower = tokenCss.toLowerCase();

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

if (!lower.includes("--torns-air") || !lower.includes("#e8f4fb")) {
  console.error("FAIL: --torns-air #e8f4fb missing");
  process.exit(1);
}

if (!lower.includes("#0a3a5c") || !lower.includes("#135a84") || !lower.includes("#1c7aad")) {
  console.error("FAIL: lifted TORNS deep/mid/panel missing");
  process.exit(1);
}

if (lower.includes("#031422") || lower.includes("#06263d")) {
  console.error("FAIL: cave TORNS blues remain");
  process.exit(1);
}

const css = `${tokenCss}\n${siteCss}`.toLowerCase();
const rulePattern = /([^{}]+)\{([^{}]*)\}/g;

for (const match of css.matchAll(rulePattern)) {
  const selector = match[1]?.trim() ?? "";
  const declarations = match[2] ?? "";
  const tornsSurface =
    selector.includes("page-torns") ||
    selector.includes("data-skin=\"torns\"") ||
    selector.includes("hero-torns") ||
    selector.includes("torns-");
  const isAllowedSignal =
    tornsSurface ||
    selector.includes(".survey-bar-fill") ||
    selector.includes("::selection") ||
    selector.includes(".signal-node") ||
    selector.includes(".signal-field");
  const usesActivityFill =
    /background(?:-color)?\s*:\s*(?:#00a8ff|var\(--activity\))/.test(
      declarations,
    );

  if (!isAllowedSignal && usesActivityFill) {
    console.error(`FAIL: activity blue used as fill by ${selector}`);
    process.exit(1);
  }
}

console.log("PASS: LIRN tokens are black/white with activity blue");
