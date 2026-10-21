# LIRN Process Fichas and BPMN Guides Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish the approved five LIRN processes as ISO fichas plus human BPMN modeling guides under `docs/procesos/`, with an assert that blocks invented claims and official diagrams.

**Architecture:** Documentation-only in the parent repo. One README map, one ficha and one BPMN guide per process, plus `scripts/assert-lirn-procesos.mjs` that grows with each process (TDD). No site, dashboard, or submodule changes. No BPMN XML, mermaid-as-official-diagram, or drawn figures.

**Tech Stack:** Markdown in Spanish. Node assert script (same pattern as `scripts/assert-infographic-prompt.mjs`). No new npm dependencies.

## Global Constraints

- Spec authority: `docs/lirn-agent-procesos.md` plus the map approved 2026-09-13.
- Exactly five processes. Codes, names, ISO types, and future owners are locked:

| Código | Nombre | Tipo ISO | Dueño futuro |
|--------|--------|----------|--------------|
| P-01 | Dirección estratégica de LIRN | Estratégico | Dirección |
| P-02 | Relación comercial y partes interesadas | Misional | Comercial |
| P-03 | Realización de TORNS (ingeniería y entrega) | Misional | Producto / Ingeniería |
| P-04 | Operación asistida al centro de control | Misional | Operación |
| P-05 | Evidencia, calidad y mejora | Apoyo | Calidad |

- Language: Spanish. ISO-lite (correct terms, short sentences). No marketing empty phrases. No “best-in-class”.
- LIRN is the firm; TORNS is the only product. Do not mix them.
- TORNS is an applied prototype, not a signed pilot and not operator-system integration.
- Live commercial channel: `/torns#contacto` → Google Sheets via Apps Script only if `VITE_CONTACT_ENDPOINT` exists. No fake success. No “comprar”. No fake demo. No invented CRM.
- Evidence: Transmilenio public problem as case/prototype; SITP controller interview (role only); survey 17 Aug 2026, n=20, team research. Not an operator result.
- Forbidden claims: clients, contracts, TransMilenio S.A. alliance, Metro/APCA as client, impact KPIs, testimonials, third-party logos, live operator occupancy, money saved, TRO / “Sistema de Vigilancia” / “Transport Route Optimization” in new deliverables.
- If a fact is not in the pack or PRODUCT.md, write `NO CONFIRMADO`. Do not invent it.
- Future owners only: Dirección, Comercial, Producto / Ingeniería, Operación, Calidad. Do not invent a current org chart with staffed gerencias.
- Team names (context only, not process owners): Johel Santiago Arias, Rebeca Pedrozo, Hanna Cerinza.
- Do **not** draw BPMN. No XML, no ` ```mermaid `, no `bpmn:definitions`. Guide only.
- Do not change `lirn-web-main`, `tro-frontend`, `tro-backend`, or YOLO code.
- Indicators must be measurable from landing, Sheets, prototype, or n=20. Delete any indicator that implies a signed client/pilot.

## File map

| File | Responsibility |
| --- | --- |
| `docs/procesos/README.md` | Approved map, interaction, pointer to pack, “no hay diagrama BPMN” |
| `docs/procesos/P-01-ficha.md` | ISO ficha P-01 |
| `docs/procesos/P-01-guia-bpmn.md` | BPMN modeling guide P-01 |
| `docs/procesos/P-02-ficha.md` | ISO ficha P-02 |
| `docs/procesos/P-02-guia-bpmn.md` | BPMN modeling guide P-02 |
| `docs/procesos/P-03-ficha.md` | ISO ficha P-03 |
| `docs/procesos/P-03-guia-bpmn.md` | BPMN modeling guide P-03 |
| `docs/procesos/P-04-ficha.md` | ISO ficha P-04 |
| `docs/procesos/P-04-guia-bpmn.md` | BPMN modeling guide P-04 |
| `docs/procesos/P-05-ficha.md` | ISO ficha P-05 |
| `docs/procesos/P-05-guia-bpmn.md` | BPMN modeling guide P-05 |
| `scripts/assert-lirn-procesos.mjs` | Contract: headings, required phrases, banned claims, no official BPMN |
| `docs/lirn-agent-procesos.md` | Pointer to published delivery after map approval |

---

### Task 1: Process map README and assert scaffold

**Files:**
- Create: `docs/procesos/README.md`
- Create: `scripts/assert-lirn-procesos.mjs`

**Interfaces:**
- Consumes: approved map in Global Constraints
- Produces: `node scripts/assert-lirn-procesos.mjs` PASS when README exists and matches the map; helper functions `readDoc`, `fail`, `assertNoBanned`, `assertNoOfficialBpmn`, `requireHeadings`, `assertPair` ready for later tasks. `assertPair` is defined but **not called** in this task.

- [ ] **Step 1: Write the failing assert**

Create `scripts/assert-lirn-procesos.mjs` exactly:

```js
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function fail(msg) {
  console.error("FAIL: " + msg);
  process.exit(1);
}

function readDoc(rel) {
  const p = join(root, rel);
  if (!existsSync(p)) fail("missing " + rel);
  return readFileSync(p, "utf8");
}

const BANNED = [
  "Sistema de Vigilancia",
  "Transport Route Optimization",
  "Train Routes Optimization System",
  "alianza con TransMilenio",
  "piloto firmado con",
  "cliente TransMilenio",
  "minutos ahorrados",
  "dinero ahorrado",
];

function assertNoBanned(text, label) {
  for (const item of BANNED) {
    if (text.includes(item)) fail(label + ": banned \"" + item + "\"");
  }
  const withoutTorns = text.replaceAll("TORNS", "");
  if (/(^|[^A-Za-z])TRO([^A-Za-z]|$)/.test(withoutTorns)) {
    fail(label + ": TRO identity");
  }
}

function assertNoOfficialBpmn(text, label) {
  if (
    text.includes("```mermaid") ||
    text.includes("<?xml") ||
    text.includes("bpmn:definitions")
  ) {
    fail(label + ": official BPMN/diagram present; only the guide is allowed");
  }
}

const FICHA_HEADINGS = [
  "## 1. Objetivo",
  "## 2. Alcance",
  "## 3. Partes interesadas",
  "## 4. Entradas",
  "## 5. Salidas",
  "## 6. Actividades PHVA",
  "## 7. Indicadores",
  "## 8. Riesgos y controles",
  "## 9. Recursos",
];

const GUIA_HEADINGS = [
  "## Carriles (pools / lanes)",
  "## Evento de inicio",
  "## Actividades (orden)",
  "## Decisiones (gateways)",
  "## Mensajes",
  "## Artefactos / data objects",
  "## Evento de fin",
  "## Qué no modelar",
  "## Instrucción al modelador",
];

function requireHeadings(text, headings, label) {
  for (const heading of headings) {
    if (!text.includes(heading)) fail(label + ": missing " + heading);
  }
}

function requirePhrases(text, phrases, label) {
  for (const phrase of phrases) {
    if (!text.includes(phrase)) fail(label + ": missing \"" + phrase + "\"");
  }
}

function assertPair(code, fichaPhrases, guiaPhrases) {
  const fichaRel = "docs/procesos/" + code + "-ficha.md";
  const guiaRel = "docs/procesos/" + code + "-guia-bpmn.md";
  const ficha = readDoc(fichaRel);
  const guia = readDoc(guiaRel);
  requireHeadings(ficha, FICHA_HEADINGS, fichaRel);
  requireHeadings(guia, GUIA_HEADINGS, guiaRel);
  requirePhrases(ficha, fichaPhrases, fichaRel);
  requirePhrases(guia, guiaPhrases, guiaRel);
  assertNoBanned(ficha, fichaRel);
  assertNoBanned(guia, guiaRel);
  assertNoOfficialBpmn(ficha, fichaRel);
  assertNoOfficialBpmn(guia, guiaRel);
  if (!ficha.includes("Excluye:")) fail(fichaRel + ": missing Excluye");
  if (!ficha.includes("NO CONFIRMADO") && !guia.includes("NO CONFIRMADO")) {
    fail(code + ": at least one NO CONFIRMADO required");
  }
}

const readme = readDoc("docs/procesos/README.md");
assertNoBanned(readme, "docs/procesos/README.md");
assertNoOfficialBpmn(readme, "docs/procesos/README.md");
requirePhrases(
  readme,
  [
    "P-01",
    "P-02",
    "P-03",
    "P-04",
    "P-05",
    "Dirección estratégica de LIRN",
    "Relación comercial y partes interesadas",
    "Realización de TORNS (ingeniería y entrega)",
    "Operación asistida al centro de control",
    "Evidencia, calidad y mejora",
    "Estratégico",
    "Misional",
    "Apoyo",
    "Dirección",
    "Comercial",
    "Producto / Ingeniería",
    "Operación",
    "Calidad",
    "/torns#contacto",
    "No hay diagrama BPMN",
    "docs/lirn-agent-procesos.md",
  ],
  "docs/procesos/README.md",
);

console.log("PASS: LIRN process docs contract");
```

- [ ] **Step 2: Run assert to verify it fails**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/README.md`

- [ ] **Step 3: Write README**

Create `docs/procesos/README.md` exactly:

```md
# Procesos LIRN (mapa aprobado)

Pack de contexto: [docs/lirn-agent-procesos.md](../lirn-agent-procesos.md).

Mapa aprobado el 13 de septiembre de 2026. Cubre cómo se dirige la firma y cómo se realiza, opera y comercializa TORNS. Un proceso estratégico, tres misionales, un apoyo.

**No hay diagrama BPMN** en este repositorio. Cada proceso tiene una ficha ISO y una guía para que un humano dibuje BPMN 2.0.

## Mapa

| Código | Proceso | Tipo ISO | Dueño futuro | Propósito |
|--------|---------|----------|--------------|-----------|
| P-01 | Dirección estratégica de LIRN | Estratégico | Dirección | Mantener un solo producto, misión/visión y el control de claims. |
| P-02 | Relación comercial y partes interesadas | Misional | Comercial | Recibir y calificar interés por el formulario TORNS; proponer sin fingir cliente/piloto. |
| P-03 | Realización de TORNS (ingeniería y entrega) | Misional | Producto / Ingeniería | Construir y entregar el prototipo: cámaras → YOLO → métricas → recomendación. |
| P-04 | Operación asistida al centro de control | Misional | Operación | Usar Inicio / Monitoreo / Cámaras / Optimización para ver demanda y oferta propuesta. |
| P-05 | Evidencia, calidad y mejora | Apoyo | Calidad | Conservar n=20 y no conformidades del prototipo; alimentar PHVA de P-01 y P-03. |

## Interacción

P-01 fija alcance y no-claims → P-02 captura demanda comercial → P-03 realiza el sistema → P-04 lo opera en el prototipo → P-05 verifica evidencia y no conformidades y las devuelve a P-01 y P-03. P-02 no usa CRM inventado. P-04 no modela despacho real del operador.

Canal comercial vivo: `/torns#contacto`.

## Archivos

| Código | Ficha | Guía BPMN |
|--------|-------|-----------|
| P-01 | [P-01-ficha.md](P-01-ficha.md) | [P-01-guia-bpmn.md](P-01-guia-bpmn.md) |
| P-02 | [P-02-ficha.md](P-02-ficha.md) | [P-02-guia-bpmn.md](P-02-guia-bpmn.md) |
| P-03 | [P-03-ficha.md](P-03-ficha.md) | [P-03-guia-bpmn.md](P-03-guia-bpmn.md) |
| P-04 | [P-04-ficha.md](P-04-ficha.md) | [P-04-guia-bpmn.md](P-04-guia-bpmn.md) |
| P-05 | [P-05-ficha.md](P-05-ficha.md) | [P-05-guia-bpmn.md](P-05-guia-bpmn.md) |
```

- [ ] **Step 4: Run assert to verify it passes**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/README.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add approved LIRN process map and process-doc assert.

EOF
)"
```

---

### Task 2: P-01 Dirección estratégica — ficha and BPMN guide

**Files:**
- Create: `docs/procesos/P-01-ficha.md`
- Create: `docs/procesos/P-01-guia-bpmn.md`
- Modify: `scripts/assert-lirn-procesos.mjs` (call `assertPair` for P-01 before `console.log`)

**Interfaces:**
- Consumes: `assertPair` from Task 1
- Produces: P-01 pair; assert requires phrases listed in Step 1 of this task

- [ ] **Step 1: Extend the assert (RED)**

Immediately before `console.log("PASS: LIRN process docs contract");` add:

```js
assertPair(
  "P-01",
  [
    "# Ficha P-01 Dirección estratégica de LIRN",
    "Tipo ISO: estratégico",
    "Dueño futuro: Dirección",
    "Suplente futuro: NO CONFIRMADO",
    "un solo producto",
    "misión",
    "visión",
    "PRODUCT.md",
    "lirn-web-main",
  ],
  [
    "# Guía BPMN P-01 Dirección estratégica de LIRN",
    "Notación: BPMN 2.0",
    "Dirección",
    "Calidad",
    "G1",
    "A1",
    "Integración con el operador",
    "Identidad TRO",
  ],
);
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/P-01-ficha.md`

- [ ] **Step 2: Write the ficha**

Create `docs/procesos/P-01-ficha.md` exactly:

```md
# Ficha P-01 Dirección estratégica de LIRN

Tipo ISO: estratégico
Dueño futuro: Dirección
Suplente futuro: NO CONFIRMADO

## 1. Objetivo

Mantener un solo producto (TORNS), la misión y la visión verbatim, y el control de claims públicos.

## 2. Alcance

Incluye:
- Revisión del alcance de TORNS como único producto.
- Custodia de misión y visión (texto aprobado, fuera de `/torns`).
- Control de claims en el sitio comercial (`lirn-web-main`).
- Decisión de no abrir otra línea de producto hasta que Dirección lo apruebe.

Excluye:
- Organigrama actual con gerencias ocupadas, plantilla o años de empresa.
- Afirmar cliente, contrato, piloto firmado o alianza.
- Operar el prototipo (eso es P-04) o construir el sistema (eso es P-03).

## 3. Partes interesadas

- Interna: Dirección; Comercial; Producto / Ingeniería; Calidad
- Externa: visitante del sitio LIRN/TORNS; academia. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| PRODUCT.md y misión/visión | Repositorio | `PRODUCT.md` |
| No conformidades de claims | P-05 | Registro de no conformidad |
| Copy del sitio | `lirn-web-main` | Páginas Home y `/torns` |
| Evidencia n=20 | P-05 | Encuesta 17 agosto 2026 |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Alcance de producto aprobado | P-02, P-03 | Acta de revisión / PRODUCT.md |
| Lista de claims prohibidos | Comercial, sitio | `docs/lirn-agent-procesos.md` y PRODUCT.md |
| Decisión de un solo producto | Toda la firma | PRODUCT.md |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Sistema / artefacto real |
|------|-----------|------------|--------------------------|
| Planear | Revisar PRODUCT.md, misión, visión y lista de no-claims | Dirección | `PRODUCT.md` |
| Hacer | Aprobar o rechazar copy y alcance de TORNS | Dirección | `lirn-web-main` |
| Verificar | Contrastar Home y `/torns` con claims prohibidos | Dirección, Calidad | Sitio comercial |
| Actuar | Corregir copy; abrir no conformidad si hay claim falso | Dirección, Calidad | P-05 |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Un solo producto ofertado | Sí/No en PRODUCT.md | `PRODUCT.md` | Sí | No es KPI de ventas |
| Claims prohibidos detectados | Conteo en revisión de copy | Sitio + revisión Dirección | 0 abiertos | Si implica cliente/piloto, es no conformidad |
| Revisiones de dirección | Conteo de actas | Acta | NO CONFIRMADO | No hay calendario publicado |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Mezclar LIRN y TORNS | Separación firma/producto en PRODUCT.md |
| Inventar organigrama o plantilla | Dueños = roles futuros; suplente NO CONFIRMADO |

## 9. Recursos

Personas: Dirección (dueño); Calidad (verificación de claims). Equipo hoy: tres personas; no hay gerencias ocupadas.
Infraestructura real: `PRODUCT.md`, `docs/lirn-agent-procesos.md`, `lirn-web-main`. No inventes ERP/ITSM.
```

- [ ] **Step 3: Write the BPMN guide**

Create `docs/procesos/P-01-guia-bpmn.md` exactly:

```md
# Guía BPMN P-01 Dirección estratégica de LIRN
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Dirección
- Calidad
- Sistema: sitio comercial `lirn-web-main`

## Evento de inicio

Revisión de dirección disparada por cambio de copy, cambio de alcance, o no conformidad de claims llegada desde P-05.

## Actividades (orden)

1. Revisar PRODUCT.md, misión y visión — lane: Dirección — tipo: tarea de usuario — ID: A1
2. Contrastar Home y `/torns` con la lista de claims prohibidos — lane: Dirección — tipo: tarea de usuario — ID: A2
3. Registrar no conformidad de claim — lane: Calidad — tipo: tarea de usuario — ID: A3
4. Corregir copy en el sitio — lane: Dirección — tipo: tarea de usuario — ID: A4
5. Confirmar alcance: un solo producto TORNS — lane: Dirección — tipo: tarea de usuario — ID: A5

## Decisiones (gateways)

| ID | Pregunta | Sí | No |
|----|----------|----|-----|
| G1 | ¿El copy afirma cliente, contrato, piloto firmado o alianza? | A3 → A4 | A5 |
| G2 | ¿Se propone un segundo producto? | Rechazar o diferir (A1) | A5 |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Calidad | Dirección | No conformidad de claim |
| Dirección | P-05 | Alcance corregido / claim cerrado |
| Dirección | P-02 y P-03 | Alcance de producto vigente |

## Artefactos / data objects

PRODUCT.md; lista de claims prohibidos; acta de revisión (si no existe, marcar NO CONFIRMADO el archivo físico).

## Evento de fin

Queda hecho: alcance y no-claims revisados. No queda hecho: piloto firmado, organigrama staffed, ni contrato.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Junta de accionistas o ISO certificado (NO CONFIRMADO)

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Tareas con los IDs A1…A5 y gateways G1…G2. Mantener el flujo feliz (copy limpio → A5) y un flujo de error por cada gateway. No añadir tareas “firmar contrato con el operador”.
```

- [ ] **Step 4: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/P-01-ficha.md docs/procesos/P-01-guia-bpmn.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add P-01 strategic direction ficha and BPMN guide.

EOF
)"
```

---

### Task 3: P-02 Relación comercial — ficha and BPMN guide

**Files:**
- Create: `docs/procesos/P-02-ficha.md`
- Create: `docs/procesos/P-02-guia-bpmn.md`
- Modify: `scripts/assert-lirn-procesos.mjs`

**Interfaces:**
- Consumes: `assertPair` from Task 1
- Produces: P-02 pair

- [ ] **Step 1: Extend the assert (RED)**

After the P-01 `assertPair` call, add:

```js
assertPair(
  "P-02",
  [
    "# Ficha P-02 Relación comercial y partes interesadas",
    "Tipo ISO: misional",
    "Dueño futuro: Comercial",
    "/torns#contacto",
    "VITE_CONTACT_ENDPOINT",
    "Contactos",
    "Hablemos",
  ],
  [
    "# Guía BPMN P-02 Relación comercial y partes interesadas",
    "VITE_CONTACT_ENDPOINT",
    "G1",
    "Sheets",
    "no éxito falso",
    "CRM",
  ],
);
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/P-02-ficha.md`

- [ ] **Step 2: Write the ficha**

Create `docs/procesos/P-02-ficha.md` exactly:

```md
# Ficha P-02 Relación comercial y partes interesadas

Tipo ISO: misional
Dueño futuro: Comercial
Suplente futuro: Dirección

## 1. Objetivo

Recibir y calificar interés comercial por TORNS a través de `/torns#contacto`, sin fingir cliente ni piloto.

## 2. Alcance

Incluye:
- Formulario vivo en `/torns#contacto` (nombre, email, organización opcional, mensaje).
- Envío a Google Sheets (pestaña Contactos) si existe `VITE_CONTACT_ENDPOINT`.
- CTA Hablemos / Contacto. Calificación manual del interés.
- Propuesta o respuesta alineada al alcance de P-01.

Excluye:
- CRM, pipeline de ventas o ranking de leads inventados.
- “Comprar”, demo falsa, o éxito de envío si el endpoint no está configurado.
- Afirmar que el visitante es cliente o que hay piloto firmado.
- Home `#contacto` como canal operativo (queda reservado).

## 3. Partes interesadas

- Interna: Comercial; Dirección
- Externa: visitante del sitio TORNS (decisor u operador de sistema masivo; academia como lector secundario). No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Ficha de contacto | Visitante en `/torns#contacto` | POST JSON (`nombre`, `email`, `organizacion`, `mensaje`, `origen: torns`) |
| Alcance y no-claims | P-01 | PRODUCT.md |
| Estado del endpoint | Entorno de build | `VITE_CONTACT_ENDPOINT` |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Fila de contacto | Comercial | Google Sheet Contactos |
| Error visible sin éxito falso | Visitante | UI del formulario |
| Respuesta o propuesta | Visitante | Correo u otro canal — NO CONFIRMADO el medio fijo |
| Demanda calificada | P-03 (si pide el prototipo) | Nota de Comercial |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Sistema / artefacto real |
|------|-----------|------------|--------------------------|
| Planear | Confirmar campos y copy del formulario; no “comprar” | Comercial, Dirección | `lirn-web-main`, `docs/contact-apps-script.md` |
| Hacer | Recibir POST; append a Sheets si hay endpoint | Sistema; Comercial lee | Apps Script + Sheet Contactos |
| Verificar | Revisar filas; contrastar mensaje con no-claims | Comercial | Sheet Contactos |
| Actuar | Responder sin afirmar piloto; escalar a P-01 si el copy del canal se desvía | Comercial | Correo / P-01 |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Solicitudes recibidas | Conteo de filas en Contactos | Google Sheets | NO CONFIRMADO | No es conversión de cliente |
| Envíos bloqueados por endpoint ausente | Conteo de estado “canal no configurado” | UI / logs de formulario | NO CONFIRMADO | No fingir envío |
| Respuestas emitidas | Conteo manual | Buzón — NO CONFIRMADO herramienta | NO CONFIRMADO | Sin CRM |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Canal de contacto sin endpoint | Estado “canal no configurado”; no fingir envío |
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Inventar CRM o SLA de respuesta | Indicadores en NO CONFIRMADO; sin herramienta extra |

## 9. Recursos

Personas: Comercial (dueño); Dirección (suplente y no-claims).
Infraestructura real: `lirn-web-main` (`/torns#contacto`), Apps Script, Google Sheets Contactos. No inventes ERP/ITSM ni CRM.
```

- [ ] **Step 3: Write the BPMN guide**

Create `docs/procesos/P-02-guia-bpmn.md` exactly:

```md
# Guía BPMN P-02 Relación comercial y partes interesadas
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Visitante
- Comercial
- Sistema: landing TORNS (`/torns#contacto`)
- Sistema: Apps Script / Google Sheets

## Evento de inicio

El visitante envía el formulario en `/torns#contacto` (nombre, email, mensaje obligatorios).

## Actividades (orden)

1. Validar campos en el cliente — lane: landing TORNS — tipo: tarea de servicio — ID: A1
2. Comprobar `VITE_CONTACT_ENDPOINT` — lane: landing TORNS — tipo: tarea de servicio — ID: A2
3. POST JSON (`text/plain`) con `origen: torns` — lane: landing TORNS — tipo: tarea de servicio — ID: A3
4. Append fila en Contactos — lane: Apps Script / Sheets — tipo: tarea de servicio — ID: A4
5. Mostrar error sin éxito falso — lane: landing TORNS — tipo: tarea de servicio — ID: A5
6. Leer ficha y calificar interés — lane: Comercial — tipo: tarea de usuario — ID: A6
7. Responder sin afirmar cliente/piloto — lane: Comercial — tipo: tarea de usuario — ID: A7

## Decisiones (gateways)

| ID | Pregunta | Sí | No |
|----|----------|----|-----|
| G1 | ¿`VITE_CONTACT_ENDPOINT` configurado? | A3 | A5 (estado error, no éxito falso) |
| G2 | ¿Campos válidos (nombre, email, mensaje)? | G1 | A5 |
| G3 | ¿El mensaje pide algo fuera de alcance (piloto firmado, alianza)? | Escalar a P-01; responder con alcance real | A7 |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| Visitante | landing TORNS | Ficha de contacto |
| landing TORNS | Apps Script | JSON de contacto |
| Apps Script | Sheet Contactos | Fila timestamp + campos |
| Comercial | Visitante | Respuesta o propuesta (medio NO CONFIRMADO) |
| Comercial | P-01 | Desvío de claims o pedido fuera de alcance |

## Artefactos / data objects

Formulario contacto; fila Sheet Contactos; copy Hablemos / Contacto. No objeto CRM.

## Evento de fin

Queda hecho: interés registrado o error honesto. No queda hecho: cliente, contrato, pago, ni entrada en un CRM.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- CRM, scoring de leads, o “demo en vivo del operador”
- Éxito de envío cuando G1 = No

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Tareas con los IDs A1…A7 y gateways G1…G3. Mantener el flujo feliz (endpoint + campos ok → Sheets → A6 → A7) y un flujo de error por cada gateway. No añadir tareas “firmar contrato con el operador” ni “alta en CRM”.
```

- [ ] **Step 4: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/P-02-ficha.md docs/procesos/P-02-guia-bpmn.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add P-02 commercial relationship ficha and BPMN guide.

EOF
)"
```

---

### Task 4: P-03 Realización de TORNS — ficha and BPMN guide

**Files:**
- Create: `docs/procesos/P-03-ficha.md`
- Create: `docs/procesos/P-03-guia-bpmn.md`
- Modify: `scripts/assert-lirn-procesos.mjs`

**Interfaces:**
- Consumes: `assertPair` from Task 1
- Produces: P-03 pair

- [ ] **Step 1: Extend the assert (RED)**

After the P-02 `assertPair` call, add:

```js
assertPair(
  "P-03",
  [
    "# Ficha P-03 Realización de TORNS (ingeniería y entrega)",
    "Tipo ISO: misional",
    "Dueño futuro: Producto / Ingeniería",
    "YOLOv11",
    "tro-frontend",
    "tro-backend",
    "WebSocket",
    "prototipo",
  ],
  [
    "# Guía BPMN P-03 Realización de TORNS (ingeniería y entrega)",
    "YOLO",
    "recomendación",
    "instalación física",
    "G1",
  ],
);
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/P-03-ficha.md`

- [ ] **Step 2: Write the ficha**

Create `docs/procesos/P-03-ficha.md` exactly:

```md
# Ficha P-03 Realización de TORNS (ingeniería y entrega)

Tipo ISO: misional
Dueño futuro: Producto / Ingeniería
Suplente futuro: Operación

## 1. Objetivo

Construir y entregar el prototipo TORNS: cámaras → detección → métricas → recomendación de oferta.

## 2. Alcance

Incluye:
- Fuentes de video / cámaras del prototipo.
- Detección y conteo (YOLOv11) y streaming de frames y métricas por WebSocket.
- Motor que propone frecuencia, capacidad o asignación al centro de control (prototipo).
- Entrega en `tro-frontend`, `tro-backend` (FastAPI) y `yolo-train-routes-optimization`.

Excluye:
- Instalación física de cámaras en campo del operador.
- Integración con el control real de un operador.
- Piloto firmado, SLA de cliente, o métricas de impacto comercial.
- Identidad TRO / vigilancia en entregables nuevos (sustituir por LIRN / TORNS cuando se toque copy).

## 3. Partes interesadas

- Interna: Producto / Ingeniería; Operación; Calidad
- Externa: centro de control como usuario previsto del prototipo; academia. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Alcance de producto | P-01 | PRODUCT.md |
| Demanda calificada (si existe) | P-02 | Nota Comercial — puede ser vacía |
| Captura / video de estación (laboratorio) | Prototipo YOLO | Fuente de video |
| No conformidad técnica | P-05 | Registro NC |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Incremento del prototipo | P-04 | `tro-frontend`, `tro-backend`, YOLO |
| Métricas de conteo | Dashboard | WebSocket |
| Recomendación de oferta | Vista Optimización | Panel de despacho del prototipo |
| Health check | Operación / Calidad | Versión, entorno, online/offline |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Sistema / artefacto real |
|------|-----------|------------|--------------------------|
| Planear | Definir incremento: cámara, conteo o recomendación | Producto / Ingeniería | PRODUCT.md, repos del prototipo |
| Hacer | Implementar detección YOLO, API y vistas | Producto / Ingeniería | YOLO, FastAPI, `tro-frontend` |
| Verificar | Health check; conteo visible; recomendación presente | Producto / Ingeniería, Calidad | Health + dashboard |
| Actuar | Corregir fallos; registrar NC si el prototipo afirma ocupación “del operador” | Producto / Ingeniería, Calidad | P-05 |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Health check del prototipo | online / offline | Backend health | online en entorno de demo del equipo | No es uptime de un operador |
| Cámaras listadas | Conteo en vista Cámaras | `tro-frontend` | NO CONFIRMADO número fijo | Prototipo, no campo |
| Recomendación disponible | Sí/No en Optimización | `tro-frontend` | Sí en el prototipo | No “minutos ahorrados” |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Confundir conteo de laboratorio con ocupación en vivo del operador | Copy de prototipo; NC a P-05 |
| Instalar cámaras en campo sin acuerdo | Fuera de alcance; no modelar |

## 9. Recursos

Personas: Producto / Ingeniería (dueño); Operación (suplente de uso).
Infraestructura real: `tro-frontend`, `tro-backend`, `yolo-train-routes-optimization`. No inventes ERP/ITSM.
```

- [ ] **Step 3: Write the BPMN guide**

Create `docs/procesos/P-03-guia-bpmn.md` exactly:

```md
# Guía BPMN P-03 Realización de TORNS (ingeniería y entrega)
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Producto / Ingeniería
- Sistema: YOLO (`yolo-train-routes-optimization`)
- Sistema: `tro-backend`
- Sistema: `tro-frontend`

## Evento de inicio

Necesidad de un incremento del prototipo (nueva fuente de video, mejora de conteo, o mejora de recomendación), o NC técnica desde P-05.

## Actividades (orden)

1. Acotar incremento contra PRODUCT.md — lane: Producto / Ingeniería — tipo: tarea de usuario — ID: A1
2. Configurar o leer fuente de video — lane: YOLO — tipo: tarea de servicio — ID: A2
3. Detectar y contar (YOLOv11) — lane: YOLO — tipo: tarea de servicio — ID: A3
4. Publicar frames y métricas por WebSocket — lane: `tro-backend` — tipo: tarea de servicio — ID: A4
5. Calcular recomendación de oferta (prototipo) — lane: `tro-backend` — tipo: tarea de servicio — ID: A5
6. Exponer Inicio / Monitoreo / Cámaras / Optimización — lane: `tro-frontend` — tipo: tarea de servicio — ID: A6
7. Verificar health check — lane: Producto / Ingeniería — tipo: tarea de usuario — ID: A7

## Decisiones (gateways)

| ID | Pregunta | Sí | No |
|----|----------|----|-----|
| G1 | ¿Health check online? | Entregar incremento a P-04 | Corregir; si persiste, NC a P-05 |
| G2 | ¿El incremento exige instalación física en campo del operador? | Rechazar (fuera de alcance) | A2 |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| YOLO | `tro-backend` | Frames y conteo |
| `tro-backend` | `tro-frontend` | WebSocket métricas y recomendación |
| Producto / Ingeniería | P-04 | Incremento entregado |
| Producto / Ingeniería | P-05 | NC técnica o claim de “ocupación del operador” |

## Artefactos / data objects

Captura de cámara del prototipo; métricas de conteo; recomendación; health check. No contrato de operador.

## Evento de fin

Queda hecho: incremento del prototipo verificable. No queda hecho: integración con el operador, instalación en campo, ni piloto firmado.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Despliegue de cámaras en estaciones reales del operador
- KPI de impacto al usuario

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Tareas con los IDs A1…A7 y gateways G1…G2. Mantener el flujo feliz (laboratorio → YOLO → backend → frontend → health ok) y un flujo de error por cada gateway. No añadir tareas “firmar contrato con el operador” ni “instalar cámara en Transmilenio”.
```

- [ ] **Step 4: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/P-03-ficha.md docs/procesos/P-03-guia-bpmn.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add P-03 TORNS realization ficha and BPMN guide.

EOF
)"
```

---

### Task 5: P-04 Operación asistida — ficha and BPMN guide

**Files:**
- Create: `docs/procesos/P-04-ficha.md`
- Create: `docs/procesos/P-04-guia-bpmn.md`
- Modify: `scripts/assert-lirn-procesos.mjs`

**Interfaces:**
- Consumes: `assertPair` from Task 1
- Produces: P-04 pair

- [ ] **Step 1: Extend the assert (RED)**

After the P-03 `assertPair` call, add:

```js
assertPair(
  "P-04",
  [
    "# Ficha P-04 Operación asistida al centro de control",
    "Tipo ISO: misional",
    "Dueño futuro: Operación",
    "Inicio",
    "Monitoreo",
    "Cámaras",
    "Optimización",
    "despacho real",
  ],
  [
    "# Guía BPMN P-04 Operación asistida al centro de control",
    "Inicio",
    "Monitoreo",
    "Cámaras",
    "Optimización",
    "sistemas del operador",
    "G1",
  ],
);
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/P-04-ficha.md`

- [ ] **Step 2: Write the ficha**

Create `docs/procesos/P-04-ficha.md` exactly:

```md
# Ficha P-04 Operación asistida al centro de control

Tipo ISO: misional
Dueño futuro: Operación
Suplente futuro: Producto / Ingeniería

## 1. Objetivo

Usar el prototipo TORNS (Inicio, Monitoreo, Cámaras, Optimización) para ver demanda medida y oferta propuesta.

## 2. Alcance

Incluye:
- Uso asistido de las cuatro vistas del prototipo en `tro-frontend`.
- Lectura de ocupación/conteo de laboratorio y de la recomendación de frecuencia, capacidad o asignación.
- Health check visible (versión, entorno, online/offline).

Excluye:
- Despacho real hacia sistemas del operador.
- Integración con el control de Transmilenio, Metro u otro operador.
- Afirmar ocupación “en vivo del operador”.
- Instalación de cámaras en campo.

## 3. Partes interesadas

- Interna: Operación; Producto / Ingeniería
- Externa: centro de control como usuario previsto. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Incremento entregado | P-03 | Prototipo desplegado en entorno del equipo |
| Frames y métricas | WebSocket / backend | Sesión del dashboard |
| Recomendación | Vista Optimización | Panel de despacho del prototipo |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Lectura de demanda y oferta propuesta | Operación | Observación en dashboard — sin log de operador |
| Hallazgo de uso o fallo | P-03, P-05 | NC o nota — herramienta de ticket NO CONFIRMADO |
| Decisión de oferta en el operador | — | Fuera de alcance |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Sistema / artefacto real |
|------|-----------|------------|--------------------------|
| Planear | Abrir el prototipo y comprobar health | Operación | `tro-frontend` |
| Hacer | Recorrer Inicio, Monitoreo, Cámaras y Optimización | Operación | `tro-frontend` |
| Verificar | Contrastar conteo visible vs recomendación mostrada | Operación | Dashboard |
| Actuar | Reportar fallo o claim indebido (“ocupación del operador”) | Operación, Calidad | P-03 / P-05 |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Vistas del prototipo disponibles | 4/4 (Inicio, Monitoreo, Cámaras, Optimización) | `tro-frontend` | 4/4 | No es uso de un operador |
| Sesiones de uso | Conteo | Analytics — NO CONFIRMADO | NO CONFIRMADO | No hay analítica publicada |
| Recomendaciones aplicadas en campo | — | — | — | Eliminado: implicaría piloto |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Modelar despacho real del operador | Alcance: solo lectura del prototipo |
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Tomar el conteo de laboratorio como ocupación en vivo | Copy + NC a P-05 |

## 9. Recursos

Personas: Operación (dueño); Producto / Ingeniería (suplente).
Infraestructura real: `tro-frontend`, `tro-backend`, YOLO. No inventes ERP/ITSM ni consola del operador.
```

- [ ] **Step 3: Write the BPMN guide**

Create `docs/procesos/P-04-guia-bpmn.md` exactly:

```md
# Guía BPMN P-04 Operación asistida al centro de control
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Operación
- Sistema: dashboard TORNS (`tro-frontend`)
- Sistema: `tro-backend`

## Evento de inicio

La persona de Operación abre el prototipo para ver demanda y oferta propuesta (entorno del equipo, no turno de un operador cliente).

## Actividades (orden)

1. Comprobar health check — lane: Operación — tipo: tarea de usuario — ID: A1
2. Ver Inicio — lane: dashboard — tipo: tarea de usuario — ID: A2
3. Ver Monitoreo (conteo / ocupación de laboratorio) — lane: dashboard — tipo: tarea de usuario — ID: A3
4. Ver Cámaras — lane: dashboard — tipo: tarea de usuario — ID: A4
5. Ver Optimización (recomendación) — lane: dashboard — tipo: tarea de usuario — ID: A5
6. Reportar hallazgo o NC — lane: Operación — tipo: tarea de usuario — ID: A6

## Decisiones (gateways)

| ID | Pregunta | Sí | No |
|----|----------|----|-----|
| G1 | ¿Health check online? | A2 | A6 hacia P-03 |
| G2 | ¿Hay recomendación visible en Optimización? | Fin de lectura | A6 hacia P-03 |
| G3 | ¿El copy afirma ocupación en vivo del operador? | A6 hacia P-05 | Continuar lectura |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| `tro-backend` | dashboard | Métricas y recomendación |
| Operación | P-03 | Fallo de vista o health |
| Operación | P-05 | Claim indebido de ocupación en vivo |
| Operación | sistemas del operador | Prohibido: no hay mensaje |

## Artefactos / data objects

Vistas Inicio / Monitoreo / Cámaras / Optimización; health check; recomendación del prototipo. No orden de despacho del operador.

## Evento de fin

Queda hecho: lectura asistida del prototipo. No queda hecho: despacho ejecutado en el operador, ni integración con sus sistemas.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Envío de la recomendación a un sistema de despacho real
- Turno operativo de TransMilenio S.A.

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Tareas con los IDs A1…A6 y gateways G1…G3. Mantener el flujo feliz (health ok → cuatro vistas) y un flujo de error por cada gateway. No añadir tareas “firmar contrato con el operador” ni “enviar despacho al control real”.
```

- [ ] **Step 4: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/P-04-ficha.md docs/procesos/P-04-guia-bpmn.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add P-04 assisted operations ficha and BPMN guide.

EOF
)"
```

---

### Task 6: P-05 Evidencia, calidad y mejora — ficha and BPMN guide

**Files:**
- Create: `docs/procesos/P-05-ficha.md`
- Create: `docs/procesos/P-05-guia-bpmn.md`
- Modify: `scripts/assert-lirn-procesos.mjs`

**Interfaces:**
- Consumes: `assertPair` from Task 1
- Produces: P-05 pair

- [ ] **Step 1: Extend the assert (RED)**

After the P-04 `assertPair` call, add:

```js
assertPair(
  "P-05",
  [
    "# Ficha P-05 Evidencia, calidad y mejora",
    "Tipo ISO: apoyo",
    "Dueño futuro: Calidad",
    "n=20",
    "17 agosto 2026",
    "no conformidad",
    "PHVA",
  ],
  [
    "# Guía BPMN P-05 Evidencia, calidad y mejora",
    "n=20",
    "no conformidad",
    "P-01",
    "P-03",
    "G1",
  ],
);
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `missing docs/procesos/P-05-ficha.md`

- [ ] **Step 2: Write the ficha**

Create `docs/procesos/P-05-ficha.md` exactly:

```md
# Ficha P-05 Evidencia, calidad y mejora

Tipo ISO: apoyo
Dueño futuro: Calidad
Suplente futuro: Dirección

## 1. Objetivo

Conservar la evidencia autorizada (n=20 y prototipo) y gestionar no conformidades para alimentar el PHVA de P-01 y P-03.

## 2. Alcance

Incluye:
- Custodia de la encuesta 17 agosto 2026, n=20, investigación del equipo (no resultado de un operador).
- Entrevista a controlador SITP (rol, no nombre personal).
- Etiqueta “caso de estudio y prototipo aplicado”; Transmilenio como problema público, no piloto.
- Registro y cierre de no conformidades del prototipo y de claims.

Excluye:
- KPI de “minutos ahorrados al usuario” u otras métricas de impacto inventadas.
- Certificación ISO 9001 emitida (NO CONFIRMADO).
- Sistema de tickets / ITSM inventado.
- Tratar n=20 como estudio de un operador.

## 3. Partes interesadas

- Interna: Calidad; Dirección; Producto / Ingeniería
- Externa: academia; visitante que lee la evidencia en `/torns`. No nombrar operadores como clientes.

## 4. Entradas

| Entrada | Origen | Registro |
|---------|--------|----------|
| Encuesta n=20 | Equipo, 17 agosto 2026 | Dataset / resumen en landing |
| Entrevista controlador SITP | Equipo | Nota de rol, sin nombre personal |
| Hallazgo de copy o prototipo | P-01, P-03, P-04 | Descripción del hallazgo |
| Health / fallo técnico | P-03, P-04 | Observación |

## 5. Salidas

| Salida | Destino | Registro |
|--------|---------|----------|
| Evidencia vigente (n=20, caso no piloto) | P-01, sitio `/torns` | Copy autorizado |
| No conformidad abierta/cerrada | P-01 y/o P-03 | Registro NC (archivo: NO CONFIRMADO plantilla) |
| Lección de mejora | P-01, P-03 | Acta o nota |

## 6. Actividades PHVA

| Fase | Actividad | Rol futuro | Sistema / artefacto real |
|------|-----------|------------|--------------------------|
| Planear | Listar evidencia autorizada vs prohibida | Calidad, Dirección | PRODUCT.md, pack de procesos |
| Hacer | Registrar NC; conservar n=20 y rol SITP | Calidad | Registro NC; `/torns` |
| Verificar | Comprobar que la landing no convierte n=20 en resultado de operador | Calidad | `lirn-web-main` |
| Actuar | Devolver NC a P-01 (claims) o P-03 (prototipo) | Calidad | P-01, P-03 |

## 7. Indicadores

| Indicador | Fórmula | Fuente real | Meta | Nota |
|-----------|---------|-------------|------|------|
| Evidencia n=20 presente | Sí/No con fecha 17 agosto 2026 | Landing `/torns` + PRODUCT.md | Sí | Investigación del equipo |
| NC abiertas | Conteo | Registro NC | NO CONFIRMADO meta numérica | Sin ITSM |
| Claims de impacto inventados | Conteo (debe ser 0) | Revisión de copy | 0 | Eliminar KPI de minutos ahorrados |

## 8. Riesgos y controles

| Riesgo | Control |
|--------|---------|
| Afirmar piloto o cliente | Texto de alcance + revisión Dirección |
| Inflar n=20 como estudio de operador | Leyenda de investigación del equipo |
| Inventar KPI de impacto | Prohibido en indicadores; NC si aparece en copy |

## 9. Recursos

Personas: Calidad (dueño); Dirección (suplente).
Infraestructura real: PRODUCT.md, `lirn-web-main`, prototipo. Registro NC: formato NO CONFIRMADO. No inventes ERP/ITSM.
```

- [ ] **Step 3: Write the BPMN guide**

Create `docs/procesos/P-05-guia-bpmn.md` exactly:

```md
# Guía BPMN P-05 Evidencia, calidad y mejora
Notación: BPMN 2.0. El modelador humano dibuja; tú no.

## Carriles (pools / lanes)

- Calidad
- Dirección
- Producto / Ingeniería
- Sistema: sitio `/torns` (evidencia publicada)

## Evento de inicio

Nueva evidencia a custodiar, hallazgo de copy, o no conformidad del prototipo (desde P-01, P-03 o P-04).

## Actividades (orden)

1. Clasificar el hallazgo (claim vs prototipo vs evidencia) — lane: Calidad — tipo: tarea de usuario — ID: A1
2. Conservar n=20 y leyenda de investigación del equipo — lane: Calidad — tipo: tarea de usuario — ID: A2
3. Abrir no conformidad — lane: Calidad — tipo: tarea de usuario — ID: A3
4. Corregir claim público — lane: Dirección — tipo: tarea de usuario — ID: A4
5. Corregir prototipo — lane: Producto / Ingeniería — tipo: tarea de usuario — ID: A5
6. Verificar landing: caso de estudio, no piloto; n=20 no es resultado de operador — lane: Calidad — tipo: tarea de usuario — ID: A6
7. Cerrar NC o dejar abierta — lane: Calidad — tipo: tarea de usuario — ID: A7

## Decisiones (gateways)

| ID | Pregunta | Sí | No |
|----|----------|----|-----|
| G1 | ¿Afecta claims públicos? | A3 → A4 (P-01) | G2 |
| G2 | ¿Afecta el prototipo? | A3 → A5 (P-03) | A2 / A6 |
| G3 | ¿El texto afirma piloto firmado o impacto inventado? | A3 → A4 | A7 |

## Mensajes

| De | A | Contenido |
|----|---|-----------|
| P-04 / P-03 / P-01 | Calidad | Hallazgo |
| Calidad | Dirección | NC de claim |
| Calidad | Producto / Ingeniería | NC de prototipo |
| Calidad | sitio `/torns` | Evidencia autorizada (n=20, caso no piloto) |

## Artefactos / data objects

Etiqueta n=20; entrevista rol SITP; registro no conformidad; captura de cámara del prototipo (si la NC es técnica). Plantilla de NC: NO CONFIRMADO.

## Evento de fin

Queda hecho: evidencia custodiada y NC encaminada. No queda hecho: ISO certificado, KPI de minutos ahorrados, ni estudio de un operador.

## Qué no modelar

- Integración con el operador de Transmilenio / Metro
- Compra, pago, SLA de cliente firmado
- Departamentos que no estén en la tabla de roles futuros
- Identidad TRO / vigilancia
- Auditoría de certificación ISO (NO CONFIRMADO)
- Tablero de impacto al pasajero

## Instrucción al modelador

Dibujar un proceso colaborativo con los carriles de arriba. Tareas con los IDs A1…A7 y gateways G1…G3. Mantener el flujo feliz (evidencia ok → A6 → A7) y un flujo de error por cada gateway. No añadir tareas “firmar contrato con el operador” ni “calcular minutos ahorrados”.
```

- [ ] **Step 4: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 5: Commit**

```bash
git add docs/procesos/P-05-ficha.md docs/procesos/P-05-guia-bpmn.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Add P-05 evidence and quality ficha and BPMN guide.

EOF
)"
```

---

### Task 7: Pack pointer to published procesos

**Files:**
- Modify: `docs/lirn-agent-procesos.md` (append after the protocol section)
- Modify: `scripts/assert-lirn-procesos.mjs` (assert the pointer)

**Interfaces:**
- Consumes: `docs/procesos/README.md` from Task 1
- Produces: pack points to published fichas; assert covers the pointer

- [ ] **Step 1: Extend the assert (RED)**

After all `assertPair` calls, add:

```js
const pack = readDoc("docs/lirn-agent-procesos.md");
requirePhrases(
  pack,
  [
    "docs/procesos/README.md",
    "Mapa aprobado",
    "No hay diagramas BPMN en el repositorio",
  ],
  "docs/lirn-agent-procesos.md",
);
assertNoBanned(pack, "docs/lirn-agent-procesos.md");
```

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: FAIL with `docs/lirn-agent-procesos.md: missing "docs/procesos/README.md"`

- [ ] **Step 2: Append the pointer**

At the end of `docs/lirn-agent-procesos.md`, after the last protocol line, append:

```md

---

## Entrega (mapa aprobado)

Mapa aprobado el 13 de septiembre de 2026. Fichas y guías BPMN: [docs/procesos/README.md](procesos/README.md).

No hay diagramas BPMN en el repositorio. Si piden el diagrama, entregar o refinar la guía.
```

Do not change Capas 1–3. Do not rewrite the hypothesis table.

- [ ] **Step 3: Run assert GREEN**

Run: `node scripts/assert-lirn-procesos.mjs`

Expected: `PASS: LIRN process docs contract`

- [ ] **Step 4: Commit**

```bash
git add docs/lirn-agent-procesos.md scripts/assert-lirn-procesos.mjs
git commit -m "$(cat <<'EOF'
Point the LIRN process pack at the published fichas.

EOF
)"
```

---

## Self-review (author)

1. **Spec coverage:** Map (Task 1 README) · five fichas (Tasks 2–6) · five BPMN guides (Tasks 2–6) · no official BPMN (assert) · `NO CONFIRMADO` (assertPair) · forbidden claims (assert) · pack protocol pointer (Task 7). No site/dashboard work.
2. **Placeholder scan:** no TBD/TODO in deliverable files; metas use `NO CONFIRMADO` where no fact exists.
3. **Type consistency:** codes P-01…P-05, file names `P-0X-ficha.md` / `P-0X-guia-bpmn.md`, `assertPair("P-0X", …)` match.
