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

mustExist("docs/ae-final-project/registro-empresa.md");
mustExist("docs/ae-final-project/ondas/M1-negocio/README.md");
mustExist("docs/ae-final-project/ondas/M2-datos/README.md");
mustExist("docs/ae-final-project/ondas/M3-aplicaciones/README.md");
mustExist("docs/ae-final-project/ondas/M4-tecnologia/README.md");
mustExist("docs/ae-final-project/ondas/M5-roadmap/README.md");
mustNotExist("docs/ae-final-project/informe");

const registerNeedles = [
  "Identidad legal y de mercado",
  "Equipo y organigrama",
  "Misión, visión, objetivos estratégicos",
  "Producto y oferta",
  "Clientes, segmentos y partes interesadas",
  "Procesos y capacidades",
  "Activos de información y datos",
  "Aplicaciones",
  "Tecnología",
  "Brechas y proyectos",
  "Glosario de términos bloqueados",
  "LIRN es la firma. TORNS es el único producto.",
  "Equipo actual: Johel Arias.",
  "TORNS es prototipo aplicado. No es piloto firmado.",
  "Transmilenio es caso de estudio, no cliente.",
  "Observado",
  "Diseñado AS-IS",
  "Objetivo TO-BE",
];

if (existsSync(join(root, "docs/ae-final-project/registro-empresa.md"))) {
  const text = read("docs/ae-final-project/registro-empresa.md");
  for (const needle of registerNeedles) {
    if (!text.includes(needle)) fail("registro missing " + needle);
  }
}

if (existsSync(join(root, "docs/ae-final-project/README.md"))) {
  const index = read("docs/ae-final-project/README.md");
  for (const token of ["Observado", "Diseñado AS-IS", "Objetivo TO-BE", "registro-empresa.md", "ondas/"]) {
    if (!index.includes(token)) fail("AE README missing " + token);
  }
}

if (existsSync(join(root, "AGENTS.md"))) {
  const agents = read("AGENTS.md");
  for (const token of ["registro-empresa.md", "Observado", "Diseñado AS-IS", "Objetivo TO-BE"]) {
    if (!agents.includes(token)) fail("AGENTS.md missing " + token);
  }
}

if (existsSync(join(root, "docs/ae-final-project"))) {
  const top = readdirSync(join(root, "docs/ae-final-project"));
  if (top.includes("informe")) fail("informe/ should not exist yet");
}

if (failures.length) {
  console.error("FAIL:\n" + failures.map((item) => "- " + item).join("\n"));
  process.exit(1);
}

console.log("PASS: AE TOGAF waves scaffold");
