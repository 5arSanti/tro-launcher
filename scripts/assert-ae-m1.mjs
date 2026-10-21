import { existsSync, readFileSync } from "node:fs";
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

const m1Files = [
  "docs/ae-final-project/ondas/M1-negocio/README.md",
  "docs/ae-final-project/ondas/M1-negocio/01-organizacion-y-estrategia.md",
  "docs/ae-final-project/ondas/M1-negocio/02-organigrama-y-stakeholders.md",
  "docs/ae-final-project/ondas/M1-negocio/03-activos-procesos-capacidades.md",
  "docs/ae-final-project/ondas/M1-negocio/04-arquitectura-negocio-as-is.md",
];

for (const rel of m1Files) {
  mustExist(rel);
}

mustNotExist("docs/ae-final-project/informe");

const fileNeedles = {
  "docs/ae-final-project/ondas/M1-negocio/01-organizacion-y-estrategia.md": [
    "LIRN",
    "TORNS",
    "Sociedad por Acciones Simplificada",
    "Bogotá",
    "Johel Arias",
    "Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.",
    "Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.",
    "Observado",
    "Diseñado AS-IS",
    "Objetivo TO-BE",
    "Transmilenio es caso de estudio, no cliente",
  ],
  "docs/ae-final-project/ondas/M1-negocio/02-organigrama-y-stakeholders.md": [
    "Johel Arias",
    "Dirección General",
    "Comercial",
    "Producto",
    "Operación",
    "Calidad",
    "mermaid",
    "Influencia",
    "Universidad Libre",
    "SITP",
    "Observado",
    "Diseñado AS-IS",
    "Objetivo TO-BE",
  ],
  "docs/ae-final-project/ondas/M1-negocio/03-activos-procesos-capacidades.md": [
    "Ley 1581 de 2012",
    "P-01",
    "P-02",
    "P-03",
    "P-04",
    "P-05",
    "17 de agosto de 2026",
    "n=20",
    "my_model.pt",
    "https://lucid.app/lucidchart/4bc5f4f1-c350-40a4-b752-63eb17d2cb77/edit",
    "Ventas",
    "Atención",
    "Gestión financiera",
    "Gestión de inventarios",
    "Gestión de talento humano",
    "Brecha",
  ],
  "docs/ae-final-project/ondas/M1-negocio/04-arquitectura-negocio-as-is.md": [
    "Arquitectura de Negocio (AS-IS)",
    "lirn-web-main",
    "tro-frontend",
    "tro-backend",
    "yolo-train-routes-optimization",
    "person_count",
    "⌈N/C⌉",
    "P-01",
    "P-05",
    "Observado",
    "Diseñado AS-IS",
    "Objetivo TO-BE",
  ],
};

for (const [rel, needles] of Object.entries(fileNeedles)) {
  if (!existsSync(join(root, rel))) continue;
  const text = read(rel);
  for (const needle of needles) {
    if (!text.includes(needle)) {
      fail(rel + " missing token: " + needle);
    }
  }
}

for (const rel of m1Files) {
  if (!existsSync(join(root, rel))) continue;
  const text = read(rel);
  if (text.includes("—") || text.includes("–")) {
    fail(rel + " contains forbidden dash connector (— or –)");
  }
  if (
    text.includes("Sistema de Vigilancia") ||
    text.includes("Transport Route Optimization")
  ) {
    fail(rel + " contains forbidden legacy TRO identity");
  }
}

if (failures.length) {
  console.error("FAIL:\n" + failures.map((item) => "- " + item).join("\n"));
  process.exit(1);
}

console.log("PASS: AE M1 Arquitectura de Negocio");
