# AE Documentation Foundation (M0) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Leave the repo ready for spec-driven TOGAF work on LIRN/TORNS by archiving superseded docs, promoting process fichas, and adding AGENTS.md plus Cursor rules.

**Architecture:** Documentation-only. A Node assert script is the M0 contract. Canonical product facts stay in `PRODUCT.md`. The academic workspace is only `docs/ae-final-project/`. Superseded files move to `docs/_archive/`. No taller points and no unique informe are written.

**Tech Stack:** Markdown, Cursor `.mdc` rules, Node.js assert script (no new dependencies).

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-10-21-ae-documentacion-fundacion-design.md`
- Organization is LIRN. Product is TORNS. Do not mix them.
- TORNS is an applied prototype, not a signed pilot.
- Forbidden claims: clients, contracts, TransMilenio alliance, Metro/APCA as client, impact KPIs, TRO as current identity.
- Do not change `lirn-web-main`, `tro-frontend`, `tro-backend`, or `yolo-train-routes-optimization`.
- Do not create `docs/ae-final-project/informe/` or empty Punto 1–5 drafts.
- Archive by moving, never by deleting.
- Do not move `PRODUCT.md`, `DESIGN.md`, `docs/torns-project-structure.md`, `docs/presentations/torns-respuestas-ia-ml.md`, `docs/presentations/torns-core-guion-5min.md`, `docs/superpowers/specs/2026-10-07-torns-respuestas-ia-ml-design.md`, `docs/superpowers/specs/2026-09-19-torns-core-guion-5min-design.md`, or `docs/superpowers/specs/2026-10-21-ae-documentacion-fundacion-design.md`.
- Process source: `.worktrees/feat-lirn-procesos-fichas/docs/procesos/`.
- JPEG filenames keep their current names, including spaces.

## File map

| File | Responsibility |
| --- | --- |
| `scripts/assert-ae-m0.mjs` | Contract for the M0 tree, archive, rules, and forbidden informe stubs |
| `docs/_archive/README.md` | Declares archived files are not AE authority |
| `docs/ae-final-project/README.md` | SDD index: sources, milestones M0–M5, informe rules |
| `docs/ae-final-project/procesos/*` | Five fichas, five BPMN guides, map, JPEG images |
| `AGENTS.md` | Always-on identity and AE pointer |
| `.cursor/rules/lirn-torns-identity.mdc` | Always-on LIRN/TORNS claims |
| `.cursor/rules/ae-final-project.mdc` | AE workspace scope |
| `.cursor/rules/ae-togaf-redaccion.mdc` | TOGAF writing and citation rules |
| `README.md` | Short LIRN/TORNS launcher index |
| `docs/_archive/readme-tro.md` | Previous TRO README |

---

### Task 1: M0 assert contract

**Files:**
- Create: `scripts/assert-ae-m0.mjs`

**Interfaces:**
- Consumes: nothing
- Produces: `node scripts/assert-ae-m0.mjs` exits 1 until later tasks land the files it checks

- [ ] **Step 1: Write the failing assert**

Create `scripts/assert-ae-m0.mjs` exactly:

```js
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
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node scripts/assert-ae-m0.mjs`

Expected: exit 1. First failures include `missing AGENTS.md` and `missing docs/_archive/README.md`.

- [ ] **Step 3: Commit**

```bash
git add scripts/assert-ae-m0.mjs
git commit -m "$(cat <<'EOF'
Add the failing M0 assert for the AE documentation foundation.

EOF
)"
```

---

### Task 2: Archive superseded documentation

**Files:**
- Create: `docs/_archive/README.md`
- Create: `docs/_archive/readme-tro.md` (copy of current root README)
- Move: `docs/torns-doc.md` → `docs/_archive/torns-doc.md`
- Move: `docs/lirn-agent-procesos.md` → `docs/_archive/lirn-agent-procesos.md`
- Move: `docs/landing-instructions.md` → `docs/_archive/landing-instructions.md`
- Move: `docs/contact-apps-script.md` → `docs/_archive/contact-apps-script.md`
- Move: `docs/brand/` → `docs/_archive/brand/`
- Move: `docs/presentations/torns-landing-guion.md` → `docs/_archive/presentations/torns-landing-guion.md`
- Move specs: the five executed site specs listed below
- Move plans: the five matching plans plus `2026-09-13-lirn-procesos-fichas.md`

**Interfaces:**
- Consumes: current files at the origin paths
- Produces: archived copies under `docs/_archive/`; origin paths gone

- [ ] **Step 1: Create the archive index and destination folders**

```bash
mkdir -p docs/_archive/presentations docs/_archive/superpowers/specs docs/_archive/superpowers/plans
```

Write `docs/_archive/README.md` exactly:

```markdown
# Archivo documental

Estos archivos no son autoridad para el taller de Arquitectura Empresarial ni para claims de producto.

La autoridad vigente está en `PRODUCT.md` y en `docs/ae-final-project/README.md`.

Se conservan como historial. No se citan en el informe único.
```

- [ ] **Step 2: Copy the current root README into the archive, then move superseded docs**

```bash
cp README.md docs/_archive/readme-tro.md

git mv docs/torns-doc.md docs/_archive/torns-doc.md
git mv docs/lirn-agent-procesos.md docs/_archive/lirn-agent-procesos.md
git mv docs/landing-instructions.md docs/_archive/landing-instructions.md
git mv docs/contact-apps-script.md docs/_archive/contact-apps-script.md
git mv docs/brand docs/_archive/brand
git mv docs/presentations/torns-landing-guion.md docs/_archive/presentations/torns-landing-guion.md

git mv docs/superpowers/specs/2026-09-05-lirn-torns-brand-design.md docs/_archive/superpowers/specs/2026-09-05-lirn-torns-brand-design.md
git mv docs/superpowers/specs/2026-09-05-lirn-corporate-vibrant-redesign.md docs/_archive/superpowers/specs/2026-09-05-lirn-corporate-vibrant-redesign.md
git mv docs/superpowers/specs/2026-09-06-lirn-architectural-tech-landing-design.md docs/_archive/superpowers/specs/2026-09-06-lirn-architectural-tech-landing-design.md
git mv docs/superpowers/specs/2026-09-06-torns-chapter-film-design.md docs/_archive/superpowers/specs/2026-09-06-torns-chapter-film-design.md
git mv docs/superpowers/specs/2026-09-07-torns-harmony-team-contact-design.md docs/_archive/superpowers/specs/2026-09-07-torns-harmony-team-contact-design.md

git mv docs/superpowers/plans/2026-09-05-lirn-torns-brand.md docs/_archive/superpowers/plans/2026-09-05-lirn-torns-brand.md
git mv docs/superpowers/plans/2026-09-05-lirn-corporate-vibrant-redesign.md docs/_archive/superpowers/plans/2026-09-05-lirn-corporate-vibrant-redesign.md
git mv docs/superpowers/plans/2026-09-06-lirn-architectural-tech-landing.md docs/_archive/superpowers/plans/2026-09-06-lirn-architectural-tech-landing.md
git mv docs/superpowers/plans/2026-09-06-torns-chapter-film.md docs/_archive/superpowers/plans/2026-09-06-torns-chapter-film.md
git mv docs/superpowers/plans/2026-09-07-torns-harmony-team-contact.md docs/_archive/superpowers/plans/2026-09-07-torns-harmony-team-contact.md
git mv docs/superpowers/plans/2026-09-13-lirn-procesos-fichas.md docs/_archive/superpowers/plans/2026-09-13-lirn-procesos-fichas.md
```

If `git mv` fails because a file is untracked, use `mv` for that file only. Do not move the two IA/guion specs or this M0 spec.

- [ ] **Step 3: Confirm canonical sources stayed**

Run:

```bash
test -f PRODUCT.md && test -f docs/torns-project-structure.md && test -f docs/presentations/torns-respuestas-ia-ml.md && test -f docs/presentations/torns-core-guion-5min.md && test ! -f docs/torns-doc.md && test -f docs/_archive/torns-doc.md && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add docs/_archive
git commit -m "$(cat <<'EOF'
Archive superseded LIRN and TORNS docs that are not AE authority.

EOF
)"
```

---

### Task 3: Promote process fichas and BPMN images

**Files:**
- Create: `docs/ae-final-project/procesos/` (fichas, guides, README, `imagenes/`)
- Move: five JPEGs from `docs/ae-final-project/docs/` to `docs/ae-final-project/procesos/imagenes/`

**Interfaces:**
- Consumes: `.worktrees/feat-lirn-procesos-fichas/docs/procesos/*.md` and the five JPEGs already in `docs/ae-final-project/docs/`
- Produces: the process tree defined in the spec

- [ ] **Step 1: Copy fichas and guides, then move images**

```bash
mkdir -p docs/ae-final-project/procesos/imagenes
cp .worktrees/feat-lirn-procesos-fichas/docs/procesos/P-0*-ficha.md \
   .worktrees/feat-lirn-procesos-fichas/docs/procesos/P-0*-guia-bpmn.md \
   docs/ae-final-project/procesos/
mv "docs/ae-final-project/docs/1. Proceso 1 - Apoyo Estrategico.jpeg" \
   "docs/ae-final-project/docs/2. Proceso 2 - Misional.jpeg" \
   "docs/ae-final-project/docs/3. Proceso 3 - Misional.jpeg" \
   "docs/ae-final-project/docs/4. Proceso 4 - Misional.jpeg" \
   "docs/ae-final-project/docs/5. Proceso 5 - Apoyo.jpeg" \
   docs/ae-final-project/procesos/imagenes/
```

Do not rewrite ficha bodies. Do not redraw diagrams.

- [ ] **Step 2: Write the process map README**

Write `docs/ae-final-project/procesos/README.md` exactly:

```markdown
# Procesos LIRN

Mapa aprobado el 13 de septiembre de 2026. Cubre cómo se dirige la firma y cómo se realiza, comercializa y acompaña el uso del producto TORNS. Un proceso estratégico, tres misionales, un apoyo.

Las fichas ISO y las guías BPMN son la fuente escrita. Las imágenes de esta carpeta son los diagramas BPMN publicados para el taller. El documento Lucid vigente es un entregable publicado: [procesos de empresa LIRN](https://lucid.app/lucidchart/4bc5f4f1-c350-40a4-b752-63eb17d2cb77/edit).

## Mapa

| Código | Proceso | Tipo ISO | Dueño futuro | Propósito |
|--------|---------|----------|--------------|-----------|
| P-01 | Dirección estratégica de LIRN | Estratégico | Dirección | Mantener un solo producto, misión y visión, y el control de claims. |
| P-02 | Relación comercial y partes interesadas | Misional | Comercial | Recibir y calificar interés por el canal público de contacto. |
| P-03 | Realización del producto TORNS | Misional | Producto | Entregar la medición de demanda en estación y la oferta propuesta al centro de control. |
| P-04 | Acompañamiento al uso del prototipo | Misional | Operación | Mostrar demanda medida y oferta propuesta sin afirmar operación en vivo del operador. |
| P-05 | Evidencia, calidad y mejora | Apoyo | Calidad | Conservar evidencia autorizada y gestionar no conformidades. |

## Interacción

P-01 fija alcance y no-claims. P-02 captura interés comercial. P-03 realiza el producto. P-04 acompaña el uso del prototipo. P-05 devuelve evidencia y no conformidades a P-01 y P-03.

## Archivos

| Código | Ficha | Guía | Imagen |
|--------|-------|------|--------|
| P-01 | [P-01-ficha.md](P-01-ficha.md) | [P-01-guia-bpmn.md](P-01-guia-bpmn.md) | [Proceso 1](imagenes/1.%20Proceso%201%20-%20Apoyo%20Estrategico.jpeg) |
| P-02 | [P-02-ficha.md](P-02-ficha.md) | [P-02-guia-bpmn.md](P-02-guia-bpmn.md) | [Proceso 2](imagenes/2.%20Proceso%202%20-%20Misional.jpeg) |
| P-03 | [P-03-ficha.md](P-03-ficha.md) | [P-03-guia-bpmn.md](P-03-guia-bpmn.md) | [Proceso 3](imagenes/3.%20Proceso%203%20-%20Misional.jpeg) |
| P-04 | [P-04-ficha.md](P-04-ficha.md) | [P-04-guia-bpmn.md](P-04-guia-bpmn.md) | [Proceso 4](imagenes/4.%20Proceso%204%20-%20Misional.jpeg) |
| P-05 | [P-05-ficha.md](P-05-ficha.md) | [P-05-guia-bpmn.md](P-05-guia-bpmn.md) | [Proceso 5](imagenes/5.%20Proceso%205%20-%20Apoyo.jpeg) |
```

- [ ] **Step 3: Confirm the process tree**

Run:

```bash
test -f docs/ae-final-project/procesos/P-01-ficha.md && test -f "docs/ae-final-project/procesos/imagenes/1. Proceso 1 - Apoyo Estrategico.jpeg" && test ! -f "docs/ae-final-project/docs/1. Proceso 1 - Apoyo Estrategico.jpeg" && test -f docs/ae-final-project/docs/definicion-taller-final.md && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add docs/ae-final-project/procesos docs/ae-final-project/docs
git commit -m "$(cat <<'EOF'
Promote LIRN process fichas and BPMN images into the AE workspace.

EOF
)"
```

---

### Task 4: AE workspace index

**Files:**
- Create: `docs/ae-final-project/README.md`

**Interfaces:**
- Consumes: milestone table and canonical-source table from the spec
- Produces: SDD index that later hitos must follow

- [ ] **Step 1: Write the AE README**

Write `docs/ae-final-project/README.md` exactly:

```markdown
# Taller de Arquitectura Empresarial: LIRN y TORNS

LIRN es la firma. TORNS es el único producto. TORNS es un prototipo aplicado. No es un piloto firmado. Transmilenio es el caso de estudio, no un cliente.

Este árbol es el único espacio de trabajo del taller TOGAF. El informe único se redactará más adelante en `informe/plan-transformacion-empresarial.md`. Esa ruta no se crea en M0.

## Fuentes canónicas

Estas rutas son autoridad para agentes. No se copian ni se citan como archivos en el informe único.

| Fuente | Qué autoriza |
|--------|----------------|
| `PRODUCT.md` | Misión, visión, separación LIRN/TORNS, capacidades del prototipo y claims prohibidos |
| `DESIGN.md` | Identidad visual. No es fuente de arquitectura empresarial |
| `docs/ae-final-project/docs/definicion-taller-final.md` | Enunciado y estructura de la entrega |
| `docs/ae-final-project/procesos/` | Mapa, fichas, guías e imágenes BPMN de P-01 a P-05 |
| `docs/torns-project-structure.md` | Descubrimiento, entrevista SITP y encuesta n=20 |
| `docs/presentations/torns-respuestas-ia-ml.md` | Inferencia y datos reales de visión |
| `docs/presentations/torns-core-guion-5min.md` | Principios del núcleo técnico |
| Código de `tro-backend`, `tro-frontend`, `lirn-web-main` y YOLO | AS-IS de aplicaciones y tecnología |

Si un hecho no está en esta tabla, se escribe `NO CONFIRMADO`.

## Hitos

| Hito | Punto del taller | Resultado |
|------|------------------|-----------|
| M0 | Fundación | Árbol, archivo, AGENTS.md y rules |
| M1 | Punto 1. Arquitectura de Negocio | Organización, misión y visión, organigrama de roles futuros, activos, mapa BPM, capacidades, partes interesadas y AS-IS |
| M2 | Punto 2. Arquitectura de Datos | Inventario, modelo, flujo y problemas de información |
| M3 | Punto 3. Arquitectura de Aplicaciones | Inventario, integraciones, problemas y propuesta de interoperabilidad |
| M4 | Punto 4. Arquitectura Tecnológica | Inventario, diagrama, riesgos y propuesta |
| M5 | Punto 5 y entrega | TO-BE, brechas, portafolio, priorización, hoja de ruta, indicadores, informe único y pregunta final |

Cada hito M1 a M5 requiere spec y plan propios antes de redactar.

## Informe único (reservado)

1. Portada
2. Introducción
3. Descripción de la organización
4. Arquitectura de Negocio
5. Arquitectura de Datos
6. Arquitectura de Aplicaciones
7. Arquitectura Tecnológica
8. Roadmap de Transformación
9. Conclusiones
10. Recomendaciones
11. Bibliografía
12. Pregunta final de análisis

Citas del informe: nombre del entregable y URL. Nunca una ruta `.md` del repositorio.

## Claims prohibidos

Clientes, contratos, alianzas, piloto firmado, KPIs de impacto comercial y la identidad TRO.
```

- [ ] **Step 2: Confirm required tokens**

Run:

```bash
rg -n "M0|M1|M2|M3|M4|M5|NO CONFIRMADO" docs/ae-final-project/README.md
```

Expected: matches for every token.

- [ ] **Step 3: Commit**

```bash
git add docs/ae-final-project/README.md
git commit -m "$(cat <<'EOF'
Add the AE workspace index with canonical sources and milestones.

EOF
)"
```

---

### Task 5: AGENTS.md and Cursor rules

**Files:**
- Create: `AGENTS.md`
- Create: `.cursor/rules/lirn-torns-identity.mdc`
- Create: `.cursor/rules/ae-final-project.mdc`
- Create: `.cursor/rules/ae-togaf-redaccion.mdc`

**Interfaces:**
- Consumes: identity and writing rules from the spec
- Produces: always-on identity plus two AE-scoped rules

- [ ] **Step 1: Write AGENTS.md**

Write `AGENTS.md` exactly:

```markdown
# AGENTS

## Identidad

LIRN es la firma. TORNS es el único producto. No se mezclan.

TORNS es un prototipo aplicado de medición de demanda en estación y recomendación de oferta. No es un piloto firmado. Transmilenio es caso de estudio, no cliente.

## Claims prohibidos

No afirmar clientes, contratos, alianzas, piloto firmado, KPIs de impacto, testimonios ni la identidad TRO.

## Equipo y roles

Equipo actual: Johel Santiago Arias, Rebeca Pedrozo, Hanna Cerinza.

Dueños de proceso: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad. Son roles futuros. No inventar un organigrama actual con gerencias ocupadas.

## Autoridad

Leer `PRODUCT.md` antes de afirmar un hecho de producto.

El taller TOGAF vive en `docs/ae-final-project/README.md`.

## Trabajo de arquitectura empresarial

Leer el spec del hito antes de redactar. Contrastar con el código cuando el texto describa el prototipo. Si el hecho no está en las fuentes canónicas, escribir `NO CONFIRMADO`.
```

- [ ] **Step 2: Write the three rules**

Write `.cursor/rules/lirn-torns-identity.mdc` exactly:

```markdown
---
description: Separar LIRN y TORNS. Prohibir claims inventados.
alwaysApply: true
---

# Identidad LIRN y TORNS

LIRN es la firma. TORNS es el único producto.

No afirmar cliente, contrato, piloto firmado, alianza ni organigrama actual con gerencias ocupadas.

No usar TRO, Sistema de Vigilancia ni Transport Route Optimization en entregables nuevos.

Hechos de producto: `PRODUCT.md`. Hecho ausente: `NO CONFIRMADO`.
```

Write `.cursor/rules/ae-final-project.mdc` exactly:

```markdown
---
description: El taller TOGAF vive solo en docs/ae-final-project.
globs: docs/ae-final-project/**
alwaysApply: false
---

# Espacio AE

Trabajar solo en `docs/ae-final-project/`.

Seguir `docs/ae-final-project/README.md` y el enunciado del taller.

No crear el informe único ni borradores de los puntos 1 a 5 durante M0.

Al redactar M1 a M5, contrastar con código y con las fuentes canónicas. Hecho ausente: `NO CONFIRMADO`.
```

Write `.cursor/rules/ae-togaf-redaccion.mdc` exactly:

```markdown
---
description: Redacción TOGAF formal para el taller AE.
globs: docs/ae-final-project/**
alwaysApply: false
---

# Redacción TOGAF

Usar vocabulario TOGAF: AS-IS, TO-BE, capacidades de negocio, partes interesadas, datos, aplicaciones, tecnología, brechas, portafolio y hoja de ruta.

Tono formal y empresarial. El lector es un decisor o evaluador de negocio.

El informe único no menciona rutas de repositorio ni archivos `.md`.

Citar entregables por nombre y URL.

Frases cortas. Sin marketing vacío. Sin raya como conector.
```

- [ ] **Step 3: Confirm the four files exist**

Run:

```bash
test -f AGENTS.md && test -f .cursor/rules/lirn-torns-identity.mdc && test -f .cursor/rules/ae-final-project.mdc && test -f .cursor/rules/ae-togaf-redaccion.mdc && echo OK
```

Expected: `OK`

- [ ] **Step 4: Commit**

```bash
git add AGENTS.md .cursor/rules
git commit -m "$(cat <<'EOF'
Add AGENTS.md and Cursor rules for LIRN identity and TOGAF writing.

EOF
)"
```

---

### Task 6: Root README as LIRN launcher index

**Files:**
- Modify: `README.md` (replace entire file)

**Interfaces:**
- Consumes: `docs/_archive/readme-tro.md` already saved in Task 2
- Produces: short root index that names LIRN and points to the AE README

- [ ] **Step 1: Replace the root README**

Write `README.md` exactly:

```markdown
# LIRN / TORNS

LIRN es una firma de movilidad. TORNS es su único producto: un prototipo que mide la demanda en estación y recomienda oferta al centro de control.

## Producto

- Hechos de producto: [PRODUCT.md](PRODUCT.md)
- Identidad visual: [DESIGN.md](DESIGN.md)

## Prototipo

- Sitio comercial: `lirn-web-main`
- Aplicación operativa: `tro-frontend`
- API y detección: `tro-backend`
- Entrenamiento de visión: `yolo-train-routes-optimization`

## Taller de Arquitectura Empresarial

Índice y hitos: [docs/ae-final-project/README.md](docs/ae-final-project/README.md)

## Gestión del equipo

[Documentación compartida en SharePoint](https://unilibrebog-my.sharepoint.com/:f:/g/personal/johels-ariasb_unilibre_edu_co/IgCuRW-UlYeYQoEApT1fHPAYAXikoZaWWGJgzJoFa5vS-8Q?e=ZhIlv0)
```

- [ ] **Step 2: Confirm TRO title is gone**

Run:

```bash
rg -n "Sistema TRO" README.md; test $? -eq 1 && rg -n "LIRN" README.md && rg -n "docs/ae-final-project/README.md" README.md && echo OK
```

Expected: no `Sistema TRO` match, then `OK`.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "$(cat <<'EOF'
Replace the TRO root README with a LIRN and TORNS index.

EOF
)"
```

---

### Task 7: Verify M0 and close the spec

**Files:**
- Modify: `docs/superpowers/specs/2026-10-21-ae-documentacion-fundacion-design.md` (status line only)

**Interfaces:**
- Consumes: all files produced by Tasks 1–6
- Produces: `node scripts/assert-ae-m0.mjs` PASS

- [ ] **Step 1: Run the M0 assert**

Run: `node scripts/assert-ae-m0.mjs`

Expected: `PASS: AE M0 foundation`

If it fails, fix only the missing contract item. Do not write Punto 1–5 or the informe.

- [ ] **Step 2: Confirm there is no informe stub**

Run:

```bash
test ! -e docs/ae-final-project/informe && echo OK
```

Expected: `OK`

- [ ] **Step 3: Mark the spec approved**

In `docs/superpowers/specs/2026-10-21-ae-documentacion-fundacion-design.md`, change:

```markdown
Estado: pendiente de revisión del usuario
```

to:

```markdown
Estado: aprobado (M0 listo para ejecutar / ejecutado)
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-10-21-ae-documentacion-fundacion-design.md
git commit -m "$(cat <<'EOF'
Verify the AE M0 foundation and mark the spec approved.

EOF
)"
```
