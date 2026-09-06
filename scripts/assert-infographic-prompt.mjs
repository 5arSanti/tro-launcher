import { readFileSync } from "node:fs";
const text = readFileSync(new URL("../docs/brand/torns-infographic-prompt.md", import.meta.url), "utf8");
const required = [
  "{{TORNS_LANDING_URL}}",
  "TORNS",
  "by LIRN",
  "Demanda real en estación. Oferta ajustada al control.",
  "PROBLEMA",
  "La oferta no sigue a la estación",
  "SOLUCIÓN",
  "TORNS mide la estación y recomienda la oferta",
  "Ve la ocupación.",
  "Prototipo. No hay piloto firmado.",
  "Abrir la landing de TORNS",
  "Cualquier sistema masivo con estaciones.",
];
const missing = required.filter((item) => !text.includes(item));
if (missing.length) {
  console.error("FAIL: " + missing.join(" | "));
  process.exit(1);
}
if (text.includes("https://")) {
  console.error("FAIL: prompt contains a real URL");
  process.exit(1);
}
console.log("PASS: infographic prompt template");
