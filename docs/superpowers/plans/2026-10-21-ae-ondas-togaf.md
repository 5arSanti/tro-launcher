# AE TOGAF Waves Scaffold Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install the TOGAF wave system: company register, five wave playbooks, and agent pointers, without writing the taller points or the unique informe.

**Architecture:** Documentation-only. A Node assert is the contract. The register holds locked facts. Each `ondas/M*/README.md` is a playbook for a later writing wave. `AGENTS.md` and the AE index point to the register and the Observado / Diseñado AS-IS / Objetivo TO-BE policy.

**Tech Stack:** Markdown and Node.js assert (no new dependencies).

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-10-21-ae-ondas-togaf-design.md`
- Do not write Punto 1–5 narratives or `informe/`
- Do not change `lirn-web-main`, `tro-frontend`, `tro-backend`, or YOLO code
- LIRN is the firm. TORNS is the only product
- Team: Johel Arias
- SAS Colombia, Bogotá, microempresa unipersonal
- No signed client, contract, or pilot
- Transmilenio is a case study, not a client
- Person count, not density
- Keep `node scripts/assert-ae-m0.mjs` passing (AE README still contains M0–M5 and `NO CONFIRMADO`)
- No em-dash connectors in AE workspace docs
- Do not invent a NIT or financial figures as Observado

## File map

| File | Responsibility |
| --- | --- |
| `scripts/assert-ae-ondas.mjs` | Contract for register, wave folders, policy tokens, no informe |
| `docs/ae-final-project/registro-empresa.md` | Locked coherence board (11 sections) |
| `docs/ae-final-project/ondas/M1-negocio/README.md` | M1 playbook |
| `docs/ae-final-project/ondas/M2-datos/README.md` | M2 playbook |
| `docs/ae-final-project/ondas/M3-aplicaciones/README.md` | M3 playbook |
| `docs/ae-final-project/ondas/M4-tecnologia/README.md` | M4 playbook |
| `docs/ae-final-project/ondas/M5-roadmap/README.md` | M5 playbook |
| `docs/ae-final-project/README.md` | Index: waves + fact policy |
| `AGENTS.md` | Pointer to register and fact policy |
| `.cursor/rules/ae-final-project.mdc` | Agents must use the register |

---

### Task 1: Waves assert contract

**Files:**
- Create: `scripts/assert-ae-ondas.mjs`

**Interfaces:**
- Consumes: nothing
- Produces: `node scripts/assert-ae-ondas.mjs` exits 1 until later tasks land files

- [ ] **Step 1: Write the failing assert**

Create `scripts/assert-ae-ondas.mjs` exactly:

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
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node scripts/assert-ae-ondas.mjs`

Expected: exit 1. Includes `missing docs/ae-final-project/registro-empresa.md`.

- [ ] **Step 3: Commit**

```bash
git add scripts/assert-ae-ondas.mjs
git commit -m "$(cat <<'EOF'
Add the failing assert for the TOGAF waves scaffold.

EOF
)"
```

---

### Task 2: Company register

**Files:**
- Create: `docs/ae-final-project/registro-empresa.md`

**Interfaces:**
- Consumes: locked facts from the waves spec
- Produces: 11-section register that later waves may append to, not rewrite

- [ ] **Step 1: Write the register**

Write `docs/ae-final-project/registro-empresa.md` exactly:

```markdown
# Registro de Empresa LIRN

Tablero de coherencia del taller TOGAF. Un hecho bloqueado no se contradice en ondas posteriores.

Marcas: Observado | Diseñado AS-IS | Objetivo TO-BE.

## 1. Identidad legal y de mercado

| Hecho | Marca | Estado |
|-------|-------|--------|
| Razón social de trabajo: LIRN | Diseñado AS-IS | Bloqueado |
| Forma: Sociedad por Acciones Simplificada (SAS), Colombia | Diseñado AS-IS | Bloqueado |
| Sede: Bogotá | Diseñado AS-IS | Bloqueado |
| Tamaño: microempresa unipersonal | Observado (equipo) / Diseñado AS-IS (marco) | Bloqueado |
| Sector: software e ITS para movilidad y transporte masivo | Diseñado AS-IS | Bloqueado |
| NIT y matrícula mercantil | Pendiente de formalización | Brecha. No inventar número |
| Mercado: operadores B2B y B2G de sistemas masivos con estaciones | Diseñado AS-IS | Bloqueado |
| Datos personales: Ley 1581 de 2012 | Diseñado AS-IS | Bloqueado |

## 2. Equipo y organigrama

| Hecho | Marca | Estado |
|-------|-------|--------|
| Equipo actual: Johel Arias. | Observado | Bloqueado |
| Organigrama AS-IS: Dirección General, una persona | Diseñado AS-IS | Bloqueado |
| Vista funcional: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad | Diseñado AS-IS | Bloqueado |
| El fundador es responsable actual de las cinco áreas | Diseñado AS-IS | Bloqueado |
| Áreas ocupadas por gerencias distintas | Objetivo TO-BE | No afirmar como hoy |

## 3. Misión, visión, objetivos estratégicos

Misión (Observado, `PRODUCT.md`): Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

Visión (Observado, `PRODUCT.md`): Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.

Objetivos estratégicos (Diseñado AS-IS, bloqueados):

1. Convertir el prototipo TORNS en un producto demostrable y controlado para un centro de control.
2. Abrir un canal comercial honesto hacia operadores B2B y B2G, sin afirmar cliente.
3. Proteger datos personales y evidencia según Ley 1581 y el mapa de procesos.
4. Cerrar la brecha entre demanda medida y oferta recomendada como propuesta de valor única.
5. Preparar la firma para un primer piloto pagado en el horizonte TO-BE, no como hecho actual.

## 4. Producto y oferta

| Hecho | Marca | Estado |
|-------|-------|--------|
| LIRN es la firma. TORNS es el único producto. | Observado | Bloqueado |
| TORNS es prototipo aplicado. No es piloto firmado. | Observado | Bloqueado |
| Mecanismo: conteo de personas y recomendación de oferta | Observado | Bloqueado |
| El prototipo cuenta personas. No calcula densidad por área. | Observado | Bloqueado |
| Capacidades de tren del prototipo: 5, 10 y 15. Regla ⌈N/C⌉ y tren más pequeño suficiente. | Observado | Bloqueado |
| Producto listo para piloto pagado | Objetivo TO-BE | Brecha |

## 5. Clientes, segmentos y partes interesadas

| Hecho | Marca | Estado |
|-------|-------|--------|
| Clientes firmados: ninguno | Observado | Bloqueado |
| Transmilenio es caso de estudio, no cliente. | Observado | Bloqueado |
| Segmento objetivo: operadores de transporte masivo con estaciones | Diseñado AS-IS | Bloqueado |
| Fundador: influencia alta | Diseñado AS-IS | Bloqueado |
| Universidad Libre / academia del taller: influencia alta | Observado | Bloqueado |
| Visitantes del sitio y leads del formulario | Observado | Bloqueado |
| Operadores: interesados, no clientes | Diseñado AS-IS | Bloqueado |
| Proveedores técnicos: GitHub, Google, Roboflow | Observado | Bloqueado |

## 6. Procesos y capacidades

| Hecho | Marca | Estado |
|-------|-------|--------|
| Procesos: P-01 a P-05. | Observado | Bloqueado |
| P-01 estratégico. P-02, P-03 y P-04 misionales. P-05 apoyo. | Observado | Bloqueado |
| Capacidades presentes: dirección de producto único, captura de interés, detección y conteo, recomendación de oferta, evidencia | Observado / Diseñado AS-IS | Bloqueado |
| Capacidades ausentes: facturación, CRM, talento humano, inventario físico, despacho real del operador | Observado | Brecha |

## 7. Activos de información y datos

Se detalla en M2. Candidatos bloqueados como existencia:

| Activo | Clasificación | Marca |
|--------|---------------|-------|
| Leads del formulario | Datos personales, Ley 1581 | Observado |
| Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre). | Investigación, interno | Observado |
| Video y conteos del prototipo | Interno / puede incluir imagen de personas | Observado |
| Pesos del modelo | Reservado | Observado |
| Fichas y diagramas de proceso | Interno / publicado el diagrama Lucid | Observado |
| Código fuente | Interno | Observado |
| Facturación y contratos | No existen | Brecha |

## 8. Aplicaciones

Se detalla en M3. Superficies bloqueadas:

Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.

También observados: Google Sheets (contacto), GitHub, Lucidchart, SharePoint, correo.

CRM, ERP e identidad de operador: Objetivo TO-BE.

## 9. Tecnología

Se detalla en M4. AS-IS observado: estación de trabajo del fundador, Docker local, GitHub Pages, Git, pesos `.pt`, OpenCV (archivo / USB / RTSP). Sin granja GPU de producción.

## 10. Brechas y proyectos

Candidatos (no son portafolio cerrado; M5 decide):

- Formalización SAS (NIT y matrícula).
- Alinear la landing de tres nombres con el equipo actual.
- Persistencia de conteos y canal de leads distinto de una hoja suelta.
- Evaluación en estación del conteo.
- Respaldo, secretos y separación demo / laboratorio.
- Primer piloto pagado (solo TO-BE).

## 11. Glosario de términos bloqueados

- LIRN es la firma. TORNS es el único producto.
- Equipo actual: Johel Arias.
- TORNS es prototipo aplicado. No es piloto firmado.
- Transmilenio es caso de estudio, no cliente.
- El prototipo cuenta personas. No calcula densidad por área.
- Capacidades de tren del prototipo: 5, 10 y 15. Regla `⌈N/C⌉` y tren más pequeño suficiente.
- Procesos: P-01 a P-05.
- Superficies de software: `lirn-web-main`, `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`.
- Encuesta 17 de agosto de 2026, n=20. Entrevista a controlador SITP (rol, no nombre).
- Identidad TRO prohibida en entregables nuevos.
- Lead no es cliente.
- Observado no se presenta como Objetivo. Objetivo no se presenta como Observado.
```

- [ ] **Step 2: Confirm the eleven headings and locked keys**

Run:

```bash
rg -n "Identidad legal y de mercado|Glosario de términos bloqueados|Equipo actual: Johel Arias.|Observado" docs/ae-final-project/registro-empresa.md
```

Expected: matches for those strings.

- [ ] **Step 3: Commit**

```bash
git add docs/ae-final-project/registro-empresa.md
git commit -m "$(cat <<'EOF'
Add the LIRN company register with locked AS-IS and TO-BE facts.

EOF
)"
```

---

### Task 3: Wave playbooks

**Files:**
- Create: `docs/ae-final-project/ondas/M1-negocio/README.md`
- Create: `docs/ae-final-project/ondas/M2-datos/README.md`
- Create: `docs/ae-final-project/ondas/M3-aplicaciones/README.md`
- Create: `docs/ae-final-project/ondas/M4-tecnologia/README.md`
- Create: `docs/ae-final-project/ondas/M5-roadmap/README.md`

**Interfaces:**
- Consumes: register keys
- Produces: playbooks only. No Punto 1–5 bodies

- [ ] **Step 1: Write the five playbooks**

Write `docs/ae-final-project/ondas/M1-negocio/README.md` exactly:

```markdown
# Onda M1. Arquitectura de Negocio

Estado: playbook. No redactar el Punto 1 en esta carpeta hasta tener spec y plan de M1.

Leer antes: `docs/ae-final-project/registro-empresa.md` y el enunciado del taller.

## Entregables de la onda (cuando se ejecute)

1. Descripción de la organización
2. Misión, visión y objetivos estratégicos
3. Organigrama AS-IS y vista funcional
4. Activos de información clasificados (mínimo 5)
5. Mapa de procesos P-01 a P-05
6. Mapa de capacidades (presentes y ausentes)
7. Partes interesadas con influencia
8. Documento Arquitectura de Negocio AS-IS
9. Justificación: SAS unipersonal, organigrama sin gerencias ocupadas, mercado sin cliente

## Bloqueo al cerrar

Actualizar secciones 1 a 6 y 11 del registro. Añadir candidatos de brecha en la sección 10. No contradecir claves del glosario.
```

Write `docs/ae-final-project/ondas/M2-datos/README.md` exactly:

```markdown
# Onda M2. Arquitectura de Datos

Estado: playbook. No redactar el Punto 2 hasta tener spec y plan de M2.

Leer antes: registro (secciones 1 a 7) y `AGENTS.md` (flujo de inferencia).

## Entregables de la onda (cuando se ejecute)

1. Inventario de datos (leads, producto, proveedores, facturación como brecha, empleado, contratos como brecha, estación, cámara, conteo, tren, despacho, evidencia)
2. Modelo de datos (relaciones)
3. Flujo de información (origen y destino)
4. Problemas de información
5. Actualizar sección 7 del registro
```

Write `docs/ae-final-project/ondas/M3-aplicaciones/README.md` exactly:

```markdown
# Onda M3. Arquitectura de Aplicaciones

Estado: playbook. No redactar el Punto 3 hasta tener spec y plan de M3.

Leer antes: registro y mapa técnico de `AGENTS.md`.

## Entregables de la onda (cuando se ejecute)

1. Inventario de aplicaciones y área usuaria
2. Mapa de integraciones
3. Problemas (Sheets como CRM, sin auth, stream acoplado)
4. Propuesta de interoperabilidad TO-BE
5. Actualizar sección 8 del registro
```

Write `docs/ae-final-project/ondas/M4-tecnologia/README.md` exactly:

```markdown
# Onda M4. Arquitectura Tecnológica

Estado: playbook. No redactar el Punto 4 hasta tener spec y plan de M4.

Leer antes: registro sección 9 y código de `tro-backend`.

## Entregables de la onda (cuando se ejecute)

1. Inventario tecnológico
2. Diagrama tecnológico
3. Riesgos (persona única, respaldo, recall 0,55, dependencia GitHub/Google)
4. Propuesta tecnológica TO-BE
5. Actualizar sección 9 del registro
```

Write `docs/ae-final-project/ondas/M5-roadmap/README.md` exactly:

```markdown
# Onda M5. Roadmap e informe único

Estado: playbook. No crear `informe/` ni redactar el Punto 5 hasta tener spec y plan de M5.

Leer antes: registro completo y entregables de M1 a M4.

## Entregables de la onda (cuando se ejecute)

1. Arquitectura de Negocio TO-BE
2. Análisis de brechas
3. Portafolio de proyectos
4. Matriz de priorización
5. Hoja de ruta 0-1, 1-3 y 3-5 años
6. Indicadores de éxito (sin fingir impacto actual)
7. Informe único y pregunta final
8. Cerrar sección 10 del registro
```

- [ ] **Step 2: Confirm the five playbooks exist**

Run:

```bash
test -f docs/ae-final-project/ondas/M1-negocio/README.md && test -f docs/ae-final-project/ondas/M5-roadmap/README.md && test ! -e docs/ae-final-project/informe && echo OK
```

Expected: `OK`

- [ ] **Step 3: Commit**

```bash
git add docs/ae-final-project/ondas
git commit -m "$(cat <<'EOF'
Add TOGAF wave playbooks for M1 through M5.

EOF
)"
```

---

### Task 4: Point the AE index and agents at the register

**Files:**
- Modify: `docs/ae-final-project/README.md`
- Modify: `AGENTS.md`
- Modify: `.cursor/rules/ae-final-project.mdc`

**Interfaces:**
- Consumes: register path and fact-policy names
- Produces: tokens required by `assert-ae-ondas.mjs` and still required by `assert-ae-m0.mjs`

- [ ] **Step 1: Update the AE README**

Replace the file with this exact content:

```markdown
# Taller de Arquitectura Empresarial: LIRN y TORNS

LIRN es la firma. TORNS es el único producto. TORNS es un prototipo aplicado. No es un piloto firmado. Transmilenio es el caso de estudio, no un cliente.

Este árbol es el único espacio de trabajo del taller TOGAF. El informe único se redactará más adelante en `informe/plan-transformacion-empresarial.md`. Esa ruta no se crea hasta M5.

## Fuente de coherencia

El tablero de hechos es `registro-empresa.md`. Las playbooks viven en `ondas/`.

Cada afirmación usa una marca: Observado, Diseñado AS-IS u Objetivo TO-BE. Un Objetivo no se afirma como hecho de hoy.

`AGENTS.md` es la fuente de verdad del launcher. El registro es la fuente de verdad de la empresa diseñada para el taller.

## Fuentes canónicas

Estas rutas son autoridad para agentes. No se copian ni se citan como archivos en el informe único.

| Fuente | Qué autoriza |
|--------|----------------|
| `AGENTS.md` | Identidad, equipo (Johel Arias), mapa técnico AS-IS y forma de trabajo |
| `docs/ae-final-project/registro-empresa.md` | Hechos bloqueados de empresa |
| `PRODUCT.md` | Misión, visión, separación LIRN/TORNS, capacidades del prototipo y claims prohibidos |
| `DESIGN.md` | Identidad visual. No es fuente de arquitectura empresarial |
| `docs/ae-final-project/docs/definicion-taller-final.md` | Enunciado y estructura de la entrega |
| `docs/ae-final-project/procesos/` | Mapa, fichas, guías e imágenes BPMN de P-01 a P-05 |
| `docs/torns-project-structure.md` | Descubrimiento, entrevista SITP y encuesta n=20 |
| `docs/presentations/torns-respuestas-ia-ml.md` | Inferencia y datos reales de visión |
| `docs/presentations/torns-core-guion-5min.md` | Principios del núcleo técnico |
| Código de `tro-backend`, `tro-frontend`, `lirn-web-main` y YOLO | AS-IS de aplicaciones y tecnología |

Si un hecho no está en esta tabla ni en el registro, se escribe `NO CONFIRMADO`.

## Ondas

| Hito | Punto del taller | Playbook | Resultado |
|------|------------------|----------|-----------|
| M0 | Fundación | Hecho | Árbol, archivo, AGENTS.md y rules |
| M1 | Punto 1. Arquitectura de Negocio | `ondas/M1-negocio/` | Organización, misión y visión, organigrama, activos, mapa BPM, capacidades, partes interesadas y AS-IS |
| M2 | Punto 2. Arquitectura de Datos | `ondas/M2-datos/` | Inventario, modelo, flujo y problemas de información |
| M3 | Punto 3. Arquitectura de Aplicaciones | `ondas/M3-aplicaciones/` | Inventario, integraciones, problemas y propuesta de interoperabilidad |
| M4 | Punto 4. Arquitectura Tecnológica | `ondas/M4-tecnologia/` | Inventario, diagrama, riesgos y propuesta |
| M5 | Punto 5 y entrega | `ondas/M5-roadmap/` | TO-BE, brechas, portafolio, priorización, hoja de ruta, indicadores, informe único y pregunta final |

Cada hito M1 a M5 requiere spec y plan propios antes de redactar. Al cerrar, se actualiza el registro. Lo bloqueado no se contradice.

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

- [ ] **Step 2: Update AGENTS.md**

In `AGENTS.md`, replace the section `## Taller de Arquitectura Empresarial` with:

```markdown
## Taller de Arquitectura Empresarial

Espacio único: `docs/ae-final-project/`. Índice: `docs/ae-final-project/README.md`. Enunciado: `docs/ae-final-project/docs/definicion-taller-final.md`.

Tablero de empresa: `docs/ae-final-project/registro-empresa.md`.

Marcas de hecho: Observado, Diseñado AS-IS, Objetivo TO-BE. Un Objetivo no se afirma como hoy. Si el hecho no está en este archivo ni en el registro, escribir `NO CONFIRMADO`.

Hitos: M0 fundación (hecho). M1 negocio. M2 datos. M3 aplicaciones. M4 tecnología. M5 roadmap e informe único.

Cada hito M1 a M5 requiere spec y plan antes de redactar. El informe no cita archivos `.md`. Cita entregables por nombre y URL. Tono formal TOGAF, orientado a un decisor de negocio.

Procesos de empresa: `docs/ae-final-project/procesos/` (P-01 a P-05).
```

In the fuentes table, add this row after the AGENTS row:

```markdown
| `docs/ae-final-project/registro-empresa.md` | Hechos bloqueados de empresa para el taller |
```

- [ ] **Step 3: Update the AE workspace rule**

Replace `.cursor/rules/ae-final-project.mdc` with:

```markdown
---
description: El taller TOGAF vive solo en docs/ae-final-project.
globs: docs/ae-final-project/**
alwaysApply: false
---

# Espacio AE

Trabajar solo en `docs/ae-final-project/`.

Leer `registro-empresa.md` antes de redactar. Marcas: Observado, Diseñado AS-IS, Objetivo TO-BE.

Seguir `docs/ae-final-project/README.md` y las playbooks en `ondas/`.

No crear el informe único ni redactar los puntos 1 a 5 fuera de su onda.

Al redactar, contrastar con código y con el registro. Hecho ausente: `NO CONFIRMADO`.
```

- [ ] **Step 4: Confirm both asserts still have their tokens**

Run:

```bash
rg -n "NO CONFIRMADO|Observado|registro-empresa.md|ondas/" docs/ae-final-project/README.md AGENTS.md
```

Expected: both files mention those tokens.

- [ ] **Step 5: Commit**

```bash
git add docs/ae-final-project/README.md AGENTS.md .cursor/rules/ae-final-project.mdc
git commit -m "$(cat <<'EOF'
Point agents and the AE index at the company register and wave policy.

EOF
)"
```

---

### Task 5: Verify scaffold and close the spec

**Files:**
- Modify: `docs/superpowers/specs/2026-10-21-ae-ondas-togaf-design.md` (status line only)

**Interfaces:**
- Consumes: files from Tasks 1–4
- Produces: both asserts PASS

- [ ] **Step 1: Run both asserts**

Run:

```bash
node scripts/assert-ae-m0.mjs && node scripts/assert-ae-ondas.mjs
```

Expected:

```
PASS: AE M0 foundation
PASS: AE TOGAF waves scaffold
```

If either fails, fix only the missing contract item. Do not write Punto 1–5.

- [ ] **Step 2: Confirm there is no informe**

Run:

```bash
test ! -e docs/ae-final-project/informe && echo OK
```

Expected: `OK`

- [ ] **Step 3: Mark the spec approved**

In `docs/superpowers/specs/2026-10-21-ae-ondas-togaf-design.md`, change:

```markdown
Estado: pendiente de revisión del usuario
```

to:

```markdown
Estado: aprobado (scaffold de ondas listo para ejecutar / ejecutado)
```

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-10-21-ae-ondas-togaf-design.md
git commit -m "$(cat <<'EOF'
Verify the TOGAF waves scaffold and mark the spec approved.

EOF
)"
```
