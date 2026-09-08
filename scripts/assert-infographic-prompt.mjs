import { readFileSync } from "node:fs";

const text = readFileSync(
  new URL("../docs/brand/torns-infographic-prompt.md", import.meta.url),
  "utf8",
);

const required = [
  "https://5arsanti.github.io/lirn-web-main/torns",
  "TORNS",
  "by LIRN",
  "EL PROYECTO",
  "MANUAL DE MARCA",
  "#0b4f78",
  "#00A8FF",
  "#f3f9fd",
  "Manrope",
  "radio 0",
  "clip geométrico",
  "Capítulo-film",
  "n=20",
  "No es un piloto firmado",
  "Abrir la landing de TORNS",
  "teoría del color",
  "UX/UI",
  "Cualquier sistema masivo con estaciones.",
  "5arsanti",
];

const missing = required.filter((item) => !text.includes(item));
if (missing.length) {
  console.error("FAIL: " + missing.join(" | "));
  process.exit(1);
}

if (text.includes("{{TORNS_LANDING_URL}}")) {
  console.error("FAIL: placeholder still present; use the public Pages URL");
  process.exit(1);
}

if (/Sarsanti/i.test(text) && !text.includes("5arsanti")) {
  console.error("FAIL: QR host must be 5arsanti");
  process.exit(1);
}

const body = text.split("## Prohibido")[0] ?? text;
const banned = [
  "Implementado en TransMilenio",
  "$50.000",
  "Train Routes Optimization System",
];
const hit = banned.filter((item) => body.includes(item));
if (hit.length) {
  console.error("FAIL: banned claims present: " + hit.join(" | "));
  process.exit(1);
}

console.log("PASS: infographic prompt v2 (brand + intro + UX)");
