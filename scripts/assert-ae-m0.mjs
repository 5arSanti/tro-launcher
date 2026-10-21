import { existsSync, readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(msg) {
  failures.push(msg);
}

function mustExist(rel) {
  if (!existsSync(join(root, rel))) fail("missing " + rel);
}

function mustNotExist(rel) {
  if (existsSync(join(root, rel))) fail("should not exist " + rel);
}

function read(rel) {
  return readFileSync(join(root, rel), "utf8");
}

mustExist("AGENTS.md");
mustExist(".cursor/rules/lirn-torns-identity.mdc");
mustExist(".cursor/rules/ae-final-project.mdc");
mustExist(".cursor/rules/ae-togaf-redaccion.mdc");
mustExist("docs/ae-final-project/README.md");
mustExist("docs/ae-final-project/docs/definicion-taller-final.md");
mustExist("docs/ae-final-project/procesos/README.md");
mustExist("docs/_archive/README.md");
mustExist("docs/_archive/readme-tro.md");
mustExist("docs/_archive/torns-doc.md");
mustExist("docs/_archive/lirn-agent-procesos.md");
mustExist("PRODUCT.md");
mustExist("docs/torns-project-structure.md");
mustExist("docs/presentations/torns-respuestas-ia-ml.md");
mustExist("docs/presentations/torns-core-guion-5min.md");

for (const code of ["P-01", "P-02", "P-03", "P-04", "P-05"]) {
  mustExist(`docs/ae-final-project/procesos/${code}-ficha.md`);
  mustExist(`docs/ae-final-project/procesos/${code}-guia-bpmn.md`);
}

const images = [
  "1. Proceso 1 - Apoyo Estrategico.jpeg",
  "2. Proceso 2 - Misional.jpeg",
  "3. Proceso 3 - Misional.jpeg",
  "4. Proceso 4 - Misional.jpeg",
  "5. Proceso 5 - Apoyo.jpeg",
];
for (const name of images) {
  mustExist(join("docs/ae-final-project/procesos/imagenes", name));
  mustNotExist(join("docs/ae-final-project/docs", name));
}

mustNotExist("docs/torns-doc.md");
mustNotExist("docs/lirn-agent-procesos.md");
mustNotExist("docs/landing-instructions.md");
mustNotExist("docs/contact-apps-script.md");
mustNotExist("docs/presentations/torns-landing-guion.md");
mustNotExist("docs/ae-final-project/informe");
mustNotExist("docs/brand/lirn-wordmark-prompt.md");
mustNotExist("docs/superpowers/plans/2026-09-13-lirn-procesos-fichas.md");

if (existsSync(join(root, "docs/ae-final-project"))) {
  const top = readdirSync(join(root, "docs/ae-final-project"));
  if (top.includes("informe")) fail("informe/ should not exist yet");
}

if (existsSync(join(root, "README.md"))) {
  const readme = read("README.md");
  if (readme.includes("# Sistema TRO")) fail("root README still uses Sistema TRO");
  if (!readme.includes("LIRN")) fail("root README must name LIRN");
  if (!readme.includes("docs/ae-final-project/README.md")) {
    fail("root README must point to the AE index");
  }
}

if (existsSync(join(root, "docs/ae-final-project/README.md"))) {
  const index = read("docs/ae-final-project/README.md");
  for (const token of ["M0", "M1", "M2", "M3", "M4", "M5", "NO CONFIRMADO"]) {
    if (!index.includes(token)) fail("AE README missing " + token);
  }
}

if (existsSync(join(root, "AGENTS.md"))) {
  const agents = read("AGENTS.md");
  if (!agents.includes("LIRN")) fail("AGENTS.md must name LIRN");
  if (!agents.includes("TORNS")) fail("AGENTS.md must name TORNS");
  if (!agents.includes("NO CONFIRMADO")) fail("AGENTS.md must require NO CONFIRMADO");
}

if (existsSync(join(root, ".cursor/rules/ae-togaf-redaccion.mdc"))) {
  const rule = read(".cursor/rules/ae-togaf-redaccion.mdc");
  if (!rule.includes("TOGAF")) fail("redaccion rule must mention TOGAF");
  if (!rule.includes(".md")) fail("redaccion rule must forbid md citations in the informe");
}

if (failures.length) {
  console.error("FAIL:\n" + failures.map((item) => "- " + item).join("\n"));
  process.exit(1);
}

console.log("PASS: AE M0 foundation");
