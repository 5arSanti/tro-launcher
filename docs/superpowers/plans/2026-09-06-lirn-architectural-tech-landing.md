# Architectural Tech Corporate Landing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `lirn-web-main` as an Architectural Tech Corporate site: LIRN is the firm, `/torns` is the product plus the Transmilenio case study and team evidence.

**Architecture:** Two routes, one token system (black / white / `#00A8FF` activity). Static `copy.ts` and `evidence.ts`. Official logo files replace the typographic wordmark. Home is firm plus teaser. `/torns` holds problem, prototype frame, pipeline, interview, and the full n=20 survey. `tro-frontend` is out of scope.

**Tech Stack:** React 19, Vite 7, React Router 7, TypeScript, CSS variables, Vitest + Testing Library, GitHub Pages (`base` `/lirn-web-main/`).

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-09-06-lirn-architectural-tech-landing-design.md`.
- Language: Spanish. Mission and vision strings stay exact.
- CTA **Hablemos**. No comprar. No fake demo. No working send form until a channel exists.
- Transmilenio label: caso de estudio y prototipo aplicado. Not a signed pilot with the operator.
- Survey and interview: team research, 17 August 2026, n=20. Not an operator result.
- `#00A8FF` is activity only. It is not a page or hero fill.
- Official logos: do not distort or redraw. White on black. Black on white.
- Type: Manrope. No luxury serif. No amber / navy brochure skin.
- Home does not publish the interview, the survey, or the full Transmilenio paragraph.
- Home capability copy does not say YOLO or Transmilenio.
- `lirn-web-main` is a submodule. Commit there, then update the parent pointer.
- Vite `base` and `BrowserRouter` basename: `/lirn-web-main/`.
- Do not change `tro-frontend`. Do not relax `scripts/assert-torns-tokens.mjs` (dashboard still forbids `#00a8ff`).

## File map

| File | Responsibility |
| --- | --- |
| `lirn-web-main/src/content/copy.ts` | Brand and page voice |
| `lirn-web-main/src/content/copy.test.ts` | Mission, CTA, and claim policy |
| `lirn-web-main/src/content/evidence.ts` | Interview, 10 questions, conclusions, n=20 label |
| `lirn-web-main/src/content/evidence.test.ts` | Evidence contract |
| `lirn-web-main/src/styles/tokens.css` | Black, white, graphite, activity |
| `scripts/assert-lirn-tokens.mjs` | Commercial token contract |
| `lirn-web-main/src/components/BrandMark.tsx` | Official wordmark or icon |
| `lirn-web-main/src/components/BrandMark.test.tsx` | Fallback on image error |
| `lirn-web-main/src/components/SiteNav.tsx` | Nav with official mark |
| `lirn-web-main/src/components/SiteFooter.tsx` | Shared footer |
| `lirn-web-main/src/components/GeometryFrame.tsx` | Logo-language crop |
| `lirn-web-main/src/components/InterviewBlock.tsx` | Interview on `/torns` |
| `lirn-web-main/src/components/SurveyBlock.tsx` | Survey and bars on `/torns` |
| `lirn-web-main/src/pages/HomePage.tsx` | Firm narrative |
| `lirn-web-main/src/pages/TornsPage.tsx` | Product + case + evidence |
| `lirn-web-main/src/App.tsx` | Routes plus footer |
| `lirn-web-main/src/styles/site.css` | Band layout, cuts, motion |
| `lirn-web-main/index.html` | Direction comment |
| `PRODUCT.md` | Brand and evidence truth |
| `DESIGN.md` | Shipped visual system |
| Retired | `Esencia`, `ProductStory`, typographic `Wordmark` usage |

---

### Task 1: Copy contract

**Files:**
- Modify: `lirn-web-main/src/content/copy.ts`
- Modify: `lirn-web-main/src/content/copy.test.ts`

**Interfaces:**
- Consumes: approved mission, vision, and spec strings
- Produces: `copy` object (`as const`) with the keys listed in Step 3. Later pages read only these keys.

- [ ] **Step 1: Write the failing copy tests**

Replace `lirn-web-main/src/content/copy.test.ts` with:

```ts
import { describe, expect, it } from "vitest";
import { copy } from "./copy";

describe("copy", () => {
  it("publishes the approved mission and vision", () => {
    expect(copy.mission).toBe(
      "Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.",
    );
    expect(copy.vision).toBe(
      "Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.",
    );
  });

  it("positions LIRN with the locked hero and contact rules", () => {
    expect(copy.heroHeadline).toBe("La demanda no espera.");
    expect(copy.byLirn).toBe("by LIRN");
    expect(copy.ctaTalk).toBe("Hablemos");
    const blob = Object.values(copy).join(" ").toLowerCase();
    expect(blob).not.toMatch(/comprar|newsletter/);
    expect(blob).not.toMatch(/\bdemo\b/);
  });

  it("frames Transmilenio as an applied prototype, not a signed pilot", () => {
    expect(copy.caseFrame).toMatch(/caso de estudio/i);
    expect(copy.caseFrame).toMatch(/prototipo aplicado/i);
    expect(copy.caseNotPilot.toLowerCase()).toMatch(/no es un piloto firmado/);
    expect(copy.problemBody).toMatch(/Transmilenio/);
  });

  it("keeps home capability free of YOLO and of the Transmilenio paragraph", () => {
    const homeCaps = [
      copy.capMeasure,
      copy.capMeasureBody,
      copy.capSee,
      copy.capSeeBody,
      copy.capRecommend,
      copy.capRecommendBody,
    ].join(" ");
    expect(homeCaps).not.toMatch(/YOLO|Transmilenio/i);
  });
});
```

- [ ] **Step 2: Run the copy tests and confirm they fail**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: FAIL (`heroHeadline` is still the old slogan, or `caseFrame` is missing).

- [ ] **Step 3: Replace `copy.ts`**

```ts
export const copy = {
  lirnName: "LIRN",
  tornsName: "TORNS",
  byLirn: "by LIRN",
  oficio: "Empresa de movilidad",
  mission:
    "Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.",
  vision:
    "Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.",
  heroHeadline: "La demanda no espera.",
  heroSupport:
    "LIRN hace que el transporte masivo responda a lo que ocurre en estación.",
  ctaTalk: "Hablemos",
  verTorns: "Ver TORNS",
  navLirn: "LIRN",
  navTorns: "TORNS",
  navEmpresa: "Empresa",
  navContacto: "Contacto",
  companyTitle: "Quiénes somos",
  companyBody:
    "LIRN es una firma de movilidad. Un producto. Sistemas masivos con estaciones.",
  purposeTitle: "Propósito",
  capabilityTitle: "Capacidad",
  capMeasure: "Medir",
  capMeasureBody:
    "Quién espera ahora en la estación, no solo lo que el horario predijo.",
  capSee: "Ver",
  capSeeBody: "Ocupación que ocurre, visible para quien decide la oferta.",
  capRecommend: "Recomendar",
  capRecommendBody: "Frecuencia y capacidad propuestas al centro de control.",
  teaserTitle: "TORNS",
  teaserBody: "La oferta no sigue a la demanda real en estación.",
  contactTitle: "Hablemos del sistema que opera.",
  contactBody:
    "Cuéntenos el sistema masivo y el rol de control. Publicaremos el canal de contacto cuando esté listo.",
  contactNote: "Canal de envío pendiente de publicar.",
  footerBlurb: "Firma de movilidad. Producto TORNS.",
  tornsHeadline: "Demanda real en estación. Recomendación al control.",
  tornsSupport:
    "TORNS mide la demanda en estación y propone oferta al centro de control.",
  problemTitle: "El problema",
  problemBody:
    "En Bogotá, los usuarios del transporte público se enfrentan diariamente a estaciones y trenes con diferentes niveles de congestión. En algunos momentos, la cantidad de pasajeros supera la capacidad disponible, generando largas esperas y viajes incómodos. Esto ocurre porque la cantidad y frecuencia del Transmilenio no siempre se ajusta a la demanda real de pasajeros en cada momento. Esta situación afecta directamente la experiencia de los usuarios y dificulta que puedan llegar a sus destinos de manera rápida y cómoda.",
  problemExpected: "Demanda prevista",
  problemReal: "Demanda real",
  caseFrame:
    "Caso de estudio y prototipo aplicado al problema de Transmilenio.",
  caseNotPilot: "No es un piloto firmado con el operador.",
  caseScope: "Los mismos fundamentos aplican a metro, BRT o tren.",
  systemTitle: "Cómo funciona",
  systemSteps: [
    "Observar",
    "Detectar",
    "Medir",
    "Analizar",
    "Recomendar",
    "Optimizar",
  ],
  capabilitiesTitle: "El prototipo",
  cap1: "Fuentes de video por estación",
  cap2: "Detección y conteo en vivo (YOLOv11)",
  cap3: "Frames y métricas por WebSocket",
  cap4: "Recomendación de despacho",
  discoveryTitle: "Descubrimiento",
  validationTitle: "Validación",
  close: "Cualquier sistema masivo con estaciones.",
  notFound: "Esta página no existe.",
  qrLegend: "Abrir la landing de TORNS",
} as const;
```

- [ ] **Step 4: Run the copy tests and confirm they pass**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: PASS.

Home and TORNS page tests will fail until later tasks rewrite them. Do not "fix" those tests by restoring old copy keys.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/content/copy.ts src/content/copy.test.ts
git commit -m "$(cat <<'EOF'
Lock Architectural Tech copy for LIRN and TORNS.

EOF
)"
```

---

### Task 2: Evidence module

**Files:**
- Create: `lirn-web-main/src/content/evidence.ts`
- Create: `lirn-web-main/src/content/evidence.test.ts`

**Interfaces:**
- Consumes: `docs/torns-project-structure.md` facts
- Produces:

```ts
export type InterviewTurn = {
  question: string;
  answer: string;
};

export type SurveyBar = {
  label: string;
  value: number;
};

export type SurveyQuestion = {
  id: string;
  title: string;
  context: string;
  analysis: string;
  bars: readonly SurveyBar[];
};

export const evidence: {
  label: string;
  date: string;
  n: number;
  interviewRole: string;
  turns: readonly InterviewTurn[];
  questions: readonly SurveyQuestion[];
  conclusions: string;
};
```

- [ ] **Step 1: Write the failing evidence tests**

```ts
import { describe, expect, it } from "vitest";
import { evidence } from "./evidence";

describe("evidence", () => {
  it("labels the instrument as team research with n=20", () => {
    expect(evidence.n).toBe(20);
    expect(evidence.date).toBe("2026-08-17");
    expect(evidence.label.toLowerCase()).toMatch(/investigación del equipo/);
    expect(evidence.label).toMatch(/n=20/);
    expect(evidence.label.toLowerCase()).toMatch(/no es resultado de un operador/);
  });

  it("keeps the SITP interview without naming a person", () => {
    expect(evidence.interviewRole).toBe("Controlador SITP");
    expect(evidence.turns.length).toBe(8);
    const blob = JSON.stringify(evidence).toLowerCase();
    expect(blob).not.toMatch(/universidad libre|estudiantes/);
    expect(blob).toMatch(/tp 19/);
  });

  it("publishes ten survey questions and the written conclusions", () => {
    expect(evidence.questions).toHaveLength(10);
    expect(evidence.questions[3]?.id).toBe("q4");
    expect(evidence.conclusions).toMatch(/80%/);
    expect(evidence.questions[6]?.analysis.toLowerCase()).toMatch(/estimaci/);
  });
});
```

- [ ] **Step 2: Run the evidence tests and confirm they fail**

Run: `cd lirn-web-main && npm test -- src/content/evidence.test.ts`

Expected: FAIL (`evidence` is not defined).

- [ ] **Step 3: Write `evidence.ts`**

```ts
export type InterviewTurn = {
  question: string;
  answer: string;
};

export type SurveyBar = {
  label: string;
  value: number;
};

export type SurveyQuestion = {
  id: string;
  title: string;
  context: string;
  analysis: string;
  bars: readonly SurveyBar[];
};

export const evidence = {
  label:
    "Investigación del equipo. 17 de agosto de 2026. n=20. No es resultado de un operador.",
  date: "2026-08-17",
  n: 20,
  interviewRole: "Controlador SITP",
  turns: [
    {
      question:
        "¿Cuál es la parte más difícil cuando hay un exceso de pasajeros y deben ajustar la operación rápidamente?",
      answer:
        "Lo más difícil es que la comunicación es muy manual. Dependemos totalmente del radio y de que nos reporten la TP 19 (ocupación de la estación o plataforma). Mientras el operador del bus nos avisa y nosotros tomamos decisiones, la estación ya colapsó.",
    },
    {
      question: "¿Me puede contar sobre la última vez que le pasó?",
      answer:
        "Ayer en la tarde. Tuvimos un TQ 04 (móvil bloqueado en la vía) en la troncal. Eso generó un efecto dominó: las estaciones se llenaron y los buses que venían atrás se retrasaron.",
    },
    {
      question: "¿Por qué fue tan difícil para usted?",
      answer:
        "Porque no tenemos un sistema predictivo. Nos toca enviar códigos por radio a los demás conductores, TP 69 o TP 70, casi a ciegas, para nivelar la flota.",
    },
    {
      question: "¿Qué ha hecho para resolver este problema?",
      answer:
        "Maniobras manuales según los manuales de contingencia. A veces un bus vacío hace TP 59 o TP 56 para evacuar a la gente acumulada.",
    },
    {
      question: "¿Qué no le ha gustado de las soluciones que ha probado?",
      answer:
        "Es un proceso muy reactivo. El TP 29 se hace cuando el problema ya ocurrió. Faltan herramientas que digan dónde se va a necesitar el bus antes de que la estación se llene.",
    },
    {
      question: "¿Cuánto ha gastado en resolver este problema de asignación ineficiente?",
      answer:
        "Perdemos horas hombre coordinando por radio. Si no cumplimos tiempos o despachos, el ente gestor aplica multas operativas.",
    },
    {
      question: "¿Con qué frecuencia ocurre la congestión imprevista?",
      answer:
        "Diariamente. En cada hora pico hay alguna contingencia, desde un TQ 02 hasta accidentes que obligan a improvisar.",
    },
    {
      question: "¿Dónde se vive la operación real?",
      answer:
        "En los patios operativos cerca de Salitre El Greco, más que en las oficinas administrativas.",
    },
  ] satisfies InterviewTurn[],
  questions: [
    {
      id: "q1",
      title: "Frecuencia de uso",
      context: "Caracteriza a quién respondió.",
      analysis:
        "El 50% (10 personas) usa el sistema 3 o más veces por semana y el 30% lo hace a diario.",
      bars: [
        { label: "3 o más veces por semana", value: 50 },
        { label: "A diario", value: 30 },
      ],
    },
    {
      id: "q2",
      title: "Franjas horarias",
      context: "Opción múltiple. Momento del viaje.",
      analysis:
        "El 80% viaja entre 4:00 y 7:30 p.m. y el 60% entre 6:00 y 8:30 a.m.",
      bars: [
        { label: "16:00–19:30", value: 80 },
        { label: "06:00–08:30", value: 60 },
      ],
    },
    {
      id: "q3",
      title: "Hora fija de llegada",
      context: "Qué tanto duele un retraso.",
      analysis:
        "El 80% tiene hora de llegada y en el 35% llegar tarde tiene consecuencias reales.",
      bars: [
        { label: "Tiene hora de llegada", value: 80 },
        { label: "Consecuencia real si llega tarde", value: 35 },
      ],
    },
    {
      id: "q4",
      title: "Recencia del problema",
      context: "Si el problema es actual.",
      analysis:
        "El 55% dejó pasar vehículos llenos en los últimos 7 días y el 80% dentro del último mes.",
      bars: [
        { label: "Últimos 7 días", value: 55 },
        { label: "Último mes", value: 80 },
      ],
    },
    {
      id: "q5",
      title: "Frecuencia del problema",
      context: "Cuántas veces se repite.",
      analysis: "Al 65% le pasa varias veces por semana.",
      bars: [{ label: "Varias veces por semana", value: 65 }],
    },
    {
      id: "q6",
      title: "Tiempo adicional por evento",
      context: "Magnitud de una ocurrencia.",
      analysis:
        "El 70% pierde 15 minutos o más y el 35% más de media hora por un solo evento.",
      bars: [
        { label: "15 minutos o más", value: 70 },
        { label: "Más de 30 minutos", value: 35 },
      ],
    },
    {
      id: "q7",
      title: "Tiempo estimado al mes",
      context:
        "Estimación del equipo: duración declarada × frecuencia declarada.",
      analysis:
        "El promedio da 3 horas al mes por persona. Un 25% supera las 6 horas mensuales. Esta cifra es una estimación, no una medición de operador.",
      bars: [
        { label: "Promedio ~3 h / mes", value: 100 },
        { label: "Más de 6 h / mes", value: 25 },
      ],
    },
    {
      id: "q8",
      title: "Estrategias actuales",
      context: "Cómo resuelve hoy la gente.",
      analysis:
        "El 75% sale más temprano, el 30% paga taxi o app, y el 25% no hace nada y aguanta.",
      bars: [
        { label: "Sale más temprano", value: 75 },
        { label: "Paga taxi o app", value: 30 },
        { label: "Aguanta", value: 25 },
      ],
    },
    {
      id: "q9",
      title: "Gasto en alternativas",
      context: "Costo económico el mes pasado.",
      analysis:
        "El 90% gastó algo el mes pasado y el 65% gastó $50.000 o más.",
      bars: [
        { label: "Gastó algo", value: 90 },
        { label: "$50.000 o más", value: 65 },
      ],
    },
    {
      id: "q10",
      title: "Cómo nombran el problema",
      context: "Afirmación con la que se identifican, más texto libre.",
      analysis:
        "El 40% señala el desbalance oferta/demanda, el 25% el estrés y el 20% la puntualidad. En texto libre, aglomeración aparece en 5 respuestas y el trancón en 4 (14 textos, 6 en blanco).",
      bars: [
        { label: "Oferta vs demanda", value: 40 },
        { label: "Estrés", value: 25 },
        { label: "Puntualidad", value: 20 },
      ],
    },
  ] satisfies SurveyQuestion[],
  conclusions:
    "Los resultados validan el problema en existencia (80% el último mes), recurrencia (65% varias veces por semana) y costo (más de 3 horas y sobrecostos de $50.000 o más para la mayoría). Investigación del equipo. n=20.",
} as const;
```

- [ ] **Step 4: Run the evidence tests and confirm they pass**

Run: `cd lirn-web-main && npm test -- src/content/evidence.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/content/evidence.ts src/content/evidence.test.ts
git commit -m "$(cat <<'EOF'
Add labeled Transmilenio research evidence for /torns.

EOF
)"
```

---

### Task 3: Product truth and commercial token assert

**Files:**
- Modify: `PRODUCT.md` (Brand Commitments, Evidence on Hand, Principle 2)
- Create: `scripts/assert-lirn-tokens.mjs`

**Interfaces:**
- Consumes: spec palette and Transmilenio label
- Produces: product rules later UI must not contradict. Assert script reads `lirn-web-main/src/styles/tokens.css`.

- [ ] **Step 1: Write the assert script so it fails on current tokens**

```js
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
```

- [ ] **Step 2: Run the assert and confirm it fails**

Run: `node scripts/assert-lirn-tokens.mjs`

Expected: FAIL (`--black` missing or amber still present).

- [ ] **Step 3: Update PRODUCT.md**

Replace **Brand Commitments** with:

```markdown
## Brand Commitments

- LIRN and TORNS remain endorsed brands. TORNS has its own face; “by LIRN” is manufacturer mark.
- Visual direction (2026-09-06): Architectural Tech Corporate on the commercial site. Black and white structure. `#00A8FF` is an activity signal only. Official LIRN logo files. Logo geometry for cuts and masks. Not luxury serif. Not the amber/navy brochure.
- `tro-frontend` stays on the 2026-09-05 civic-blue Operate skin until a later cycle. Dashboard still forbids TRO cyan fills.
- CTA Hablemos / Contacto allowed. No comprar, fake demo, invented logos, impact metrics, testimonials, or third-party clients.
- Spanish. Do not reuse TRO / Sistema de Vigilancia / Transport Route Optimization.
```

Replace **Evidence on Hand** with:

```markdown
## Evidence on Hand

**Autorizado en `/torns`:** el párrafo de problema de Transmilenio; la etiqueta “caso de estudio y prototipo aplicado”; la entrevista al controlador SITP; la encuesta del 17 de agosto de 2026 (n=20), siempre con la leyenda de investigación del equipo. No es resultado de un operador. No es piloto firmado.

**Autorizado como contexto de producto:** capacidades del prototipo (cámaras, YOLOv11, WebSocket, recomendaciones).

**No autorizado:** clientes, contratos, piloto firmado, alianza con TransMilenio S.A., Metro/APCA como cliente, métricas de impacto comercial, testimonios, logos de terceros.
```

Replace Principle 2 with:

```markdown
2. LIRN vende un producto para cualquier sistema masivo con estaciones. Transmilenio es el caso de estudio y el prototipo aplicado, no un cliente ni un piloto firmado.
```

- [ ] **Step 4: Do not change tokens yet. Leave the assert red.**

The assert turns green in Task 4.

- [ ] **Step 5: Commit in the parent repo**

```bash
git add PRODUCT.md scripts/assert-lirn-tokens.mjs
git commit -m "$(cat <<'EOF'
Record Architectural Tech product truth and token assert.

EOF
)"
```

---

### Task 4: Tokens

**Files:**
- Modify: `lirn-web-main/src/styles/tokens.css`

**Interfaces:**
- Consumes: assert rules from Task 3
- Produces: `--black`, `--white`, `--graphite`, `--activity`, `--font`, `--cut`, `--ease`. Pages use `.band-black` and `.band-white` in later CSS.

- [ ] **Step 1: Run the assert (still red)**

Run: `node scripts/assert-lirn-tokens.mjs`

Expected: FAIL.

- [ ] **Step 2: Replace `lirn-web-main/src/styles/tokens.css`**

```css
:root {
  --black: #000000;
  --white: #ffffff;
  --graphite: #6b7280;
  --activity: #00a8ff;
  --font: "Manrope", sans-serif;
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --cut: 12%;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --line: color-mix(in srgb, var(--white) 16%, transparent);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  color-scheme: dark;
  scroll-behavior: smooth;
}

html,
body,
#root {
  min-height: 100%;
}

body {
  margin: 0;
  font-family: var(--font);
  background: var(--black);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

::selection {
  background: var(--activity);
  color: var(--black);
}

:focus-visible {
  outline: 2px solid var(--activity);
  outline-offset: 3px;
}

a {
  color: inherit;
}

img {
  max-width: 100%;
  display: block;
}
```

Do not set `background: #00a8ff` on `body` or `:root`.

- [ ] **Step 3: Run the assert and confirm it passes**

Run: `node scripts/assert-lirn-tokens.mjs`

Expected: `PASS: LIRN tokens are black/white with activity blue`

Also run: `node scripts/assert-torns-tokens.mjs`

Expected: still PASS (dashboard unchanged).

- [ ] **Step 4: Commit in the submodule**

```bash
cd lirn-web-main
git add src/styles/tokens.css
git commit -m "$(cat <<'EOF'
Switch commercial tokens to black, white, and activity blue.

EOF
)"
```

---

### Task 5: Official mark and chrome

**Files:**
- Create: `lirn-web-main/src/components/BrandMark.tsx`
- Create: `lirn-web-main/src/components/BrandMark.test.tsx`
- Create: `lirn-web-main/src/components/SiteFooter.tsx`
- Create: `lirn-web-main/src/components/SiteNav.test.tsx`
- Modify: `lirn-web-main/src/components/SiteNav.tsx`
- Modify: `lirn-web-main/src/App.tsx`

**Interfaces:**
- Consumes: `copy.navLirn`, `copy.ctaTalk`, `copy.footerBlurb`, files in `public/logos/`
- Produces:

```ts
export function BrandMark(props: {
  variant: "wordmark" | "icon";
  on: "dark" | "light";
}): JSX.Element;

export function SiteNav(): JSX.Element;
export function SiteFooter(): JSX.Element;
```

Logo files (do not rename):

- `LIRN-v1 - white.jfif` / `LIRN-v1 - black.jfif` (wordmark)
- `LIRN-v2 - white.jfif` / `LIRN-v2 - black.jfif` (icon)

- [ ] **Step 1: Write failing BrandMark and nav tests**

`BrandMark.test.tsx`:

```tsx
import { act, render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { BrandMark } from "./BrandMark";

it("falls back to LIRN when the official mark errors", () => {
  render(<BrandMark variant="wordmark" on="dark" />);
  const img = screen.getByRole("img", { name: "LIRN" });
  act(() => {
    img.dispatchEvent(new Event("error"));
  });
  expect(screen.getByText("LIRN")).toBeInTheDocument();
});
```

`SiteNav.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { SiteNav } from "./SiteNav";

it("links firm, product, and reserved contact", () => {
  render(
    <MemoryRouter>
      <SiteNav />
    </MemoryRouter>,
  );
  expect(screen.getByRole("link", { name: "LIRN" })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: copy.navTorns })).toHaveAttribute(
    "href",
    "/torns",
  );
  expect(screen.getByRole("link", { name: copy.ctaTalk })).toHaveAttribute(
    "href",
    "/#contacto",
  );
});
```

- [ ] **Step 2: Run the new tests and confirm they fail**

Run: `cd lirn-web-main && npm test -- src/components/BrandMark.test.tsx src/components/SiteNav.test.tsx`

Expected: FAIL (`BrandMark` is not defined).

- [ ] **Step 3: Implement BrandMark, nav, footer, and App footer**

`BrandMark.tsx`:

```tsx
import { useState } from "react";

const FILES = {
  wordmark: {
    dark: "LIRN-v1 - white.jfif",
    light: "LIRN-v1 - black.jfif",
  },
  icon: {
    dark: "LIRN-v2 - white.jfif",
    light: "LIRN-v2 - black.jfif",
  },
} as const;

export function BrandMark({
  variant,
  on,
}: {
  variant: "wordmark" | "icon";
  on: "dark" | "light";
}) {
  const [failed, setFailed] = useState(false);
  const src = `${import.meta.env.BASE_URL}logos/${encodeURIComponent(FILES[variant][on])}`;

  if (failed) return <span className="brand-mark-fallback">LIRN</span>;

  return (
    <img
      className={`brand-mark brand-mark-${variant}`}
      src={src}
      alt="LIRN"
      onError={() => setFailed(true)}
    />
  );
}
```

`SiteNav.tsx`:

```tsx
import { Link } from "react-router-dom";
import { copy } from "../content/copy";
import { BrandMark } from "./BrandMark";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Principal">
      <Link to="/" className="site-nav-brand" aria-label="LIRN">
        <BrandMark variant="wordmark" on="light" />
      </Link>
      <div className="site-nav-links">
        <Link to="/#empresa">{copy.navEmpresa}</Link>
        <Link to="/torns">{copy.navTorns}</Link>
        <Link to="/#contacto">{copy.navContacto}</Link>
        <Link className="site-nav-cta" to="/#contacto">
          {copy.ctaTalk}
        </Link>
      </div>
    </nav>
  );
}
```

`SiteFooter.tsx`:

```tsx
import { Link } from "react-router-dom";
import { copy } from "../content/copy";
import { BrandMark } from "./BrandMark";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <BrandMark variant="icon" on="dark" />
      <strong>{copy.lirnName}</strong>
      <p>{copy.footerBlurb}</p>
      <Link to="/torns">{copy.verTorns}</Link>
    </footer>
  );
}
```

`App.tsx` — keep routes, add footer after `Routes`:

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteFooter } from "./components/SiteFooter";
import { SiteNav } from "./components/SiteNav";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { TornsPage } from "./pages/TornsPage";
import "./styles/site.css";

export function App() {
  return (
    <BrowserRouter basename="/lirn-web-main/">
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/torns" element={<TornsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </BrowserRouter>
  );
}
```

- [ ] **Step 4: Run the chrome tests and confirm they pass**

Run: `cd lirn-web-main && npm test -- src/components/BrandMark.test.tsx src/components/SiteNav.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/components/BrandMark.tsx src/components/BrandMark.test.tsx \
  src/components/SiteNav.tsx src/components/SiteNav.test.tsx \
  src/components/SiteFooter.tsx src/App.tsx
git commit -m "$(cat <<'EOF'
Use official LIRN marks in nav and shared footer.

EOF
)"
```

---

### Task 6: Home page (firm + teaser)

**Files:**
- Modify: `lirn-web-main/src/pages/HomePage.test.tsx`
- Modify: `lirn-web-main/src/pages/HomePage.tsx`
- Create: `lirn-web-main/src/components/GeometryFrame.tsx`

**Interfaces:**
- Consumes: `copy` keys from Task 1. `BrandMark`. `GeometryFrame`.
- Produces: home sections Hero, Company (`#empresa`), Purpose, Capability, TORNS teaser, Contact (`#contacto`). No footer inside the page (App owns it). No `problemBody`. No `evidence`.

```ts
export function GeometryFrame(props: {
  children: React.ReactNode;
  className?: string;
}): JSX.Element;
```

- [ ] **Step 1: Rewrite the home test so it fails on the current page**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { HomePage } from "./HomePage";

it("speaks as the firm and teasers TORNS without the case file", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    copy.heroHeadline,
  );
  expect(screen.getByText(copy.mission)).toBeInTheDocument();
  expect(screen.getByText(copy.vision)).toBeInTheDocument();
  expect(screen.getByText(copy.companyBody)).toBeInTheDocument();
  expect(screen.getByText(copy.capMeasure)).toBeInTheDocument();
  expect(screen.getByText(copy.teaserBody)).toBeInTheDocument();
  expect(screen.getByText(copy.contactNote)).toBeInTheDocument();
  expect(screen.queryByText(copy.problemBody)).not.toBeInTheDocument();
  expect(screen.queryByText(copy.caseFrame)).not.toBeInTheDocument();
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
  expect(
    screen.getAllByRole("link", { name: copy.verTorns })[0],
  ).toHaveAttribute("href", "/torns");
});
```

- [ ] **Step 2: Run the home test and confirm it fails**

Run: `cd lirn-web-main && npm test -- src/pages/HomePage.test.tsx`

Expected: FAIL (old hero / esencia / problem section).

- [ ] **Step 3: Implement GeometryFrame and HomePage**

`GeometryFrame.tsx`:

```tsx
export function GeometryFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={["geometry-frame", className].filter(Boolean).join(" ")}>{children}</div>;
}
```

`HomePage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { BrandMark } from "../components/BrandMark";
import { GeometryFrame } from "../components/GeometryFrame";
import { copy } from "../content/copy";

export function HomePage() {
  return (
    <main className="page page-lirn">
      <section className="band band-black hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <BrandMark variant="wordmark" on="dark" />
          <h1 id="home-title" className="hero-headline">
            {copy.heroHeadline}
          </h1>
          <p className="hero-support">{copy.heroSupport}</p>
          <div className="hero-actions">
            <a className="btn-primary" href="#contacto">
              {copy.ctaTalk}
            </a>
            <Link className="btn-secondary" to="/torns">
              {copy.verTorns}
            </Link>
          </div>
        </div>
        <GeometryFrame className="hero-photo">
          <img
            src={`${import.meta.env.BASE_URL}images/lirn-hero.jpg`}
            alt=""
            width={1920}
            height={1080}
          />
        </GeometryFrame>
      </section>

      <section id="empresa" className="band band-white">
        <p className="meta">01</p>
        <h2 className="display">{copy.companyTitle}</h2>
        <p className="lede">{copy.companyBody}</p>
      </section>

      <section className="band band-black" aria-labelledby="purpose-title">
        <p className="meta">02</p>
        <h2 id="purpose-title" className="display">
          {copy.purposeTitle}
        </h2>
        <blockquote>
          <p>{copy.mission}</p>
        </blockquote>
        <blockquote>
          <p>{copy.vision}</p>
        </blockquote>
      </section>

      <section className="band band-white" aria-labelledby="cap-title">
        <p className="meta">03</p>
        <h2 id="cap-title" className="display">
          {copy.capabilityTitle}
        </h2>
        <ol className="cap-list">
          <li>
            <strong>{copy.capMeasure}</strong>
            <p>{copy.capMeasureBody}</p>
          </li>
          <li>
            <strong>{copy.capSee}</strong>
            <p>{copy.capSeeBody}</p>
          </li>
          <li>
            <strong>{copy.capRecommend}</strong>
            <p>{copy.capRecommendBody}</p>
          </li>
        </ol>
      </section>

      <section className="band band-black teaser">
        <p className="meta">04</p>
        <h2 className="display">{copy.teaserTitle}</h2>
        <p className="lede">{copy.teaserBody}</p>
        <Link className="btn-primary" to="/torns">
          {copy.verTorns}
        </Link>
      </section>

      <section id="contacto" className="band band-white">
        <h2 className="display">{copy.contactTitle}</h2>
        <p className="prose">{copy.contactBody}</p>
        <p className="contact-note">{copy.contactNote}</p>
        <span className="contact-pending" aria-disabled="true">
          {copy.ctaTalk}
        </span>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the home test and confirm it passes**

Run: `cd lirn-web-main && npm test -- src/pages/HomePage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/pages/HomePage.tsx src/pages/HomePage.test.tsx \
  src/components/GeometryFrame.tsx
git commit -m "$(cat <<'EOF'
Rebuild the LIRN home as firm narrative plus TORNS teaser.

EOF
)"
```

---

### Task 7: Interview and survey blocks

**Files:**
- Create: `lirn-web-main/src/components/InterviewBlock.tsx`
- Create: `lirn-web-main/src/components/InterviewBlock.test.tsx`
- Create: `lirn-web-main/src/components/SurveyBlock.tsx`
- Create: `lirn-web-main/src/components/SurveyBlock.test.tsx`

**Interfaces:**
- Consumes: `evidence` from Task 2, `copy.discoveryTitle`, `copy.validationTitle`
- Produces:

```ts
export function InterviewBlock(): JSX.Element;
export function SurveyBlock(): JSX.Element;
```

Bars use `style={{ width: `${bar.value}%` }}` and class `survey-bar-fill` (color comes from `--activity` in CSS later).

- [ ] **Step 1: Write failing block tests**

`InterviewBlock.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { evidence } from "../content/evidence";
import { InterviewBlock } from "./InterviewBlock";

it("renders the controller interview with the research label", () => {
  render(<InterviewBlock />);
  expect(screen.getByText(evidence.interviewRole)).toBeInTheDocument();
  expect(screen.getByText(evidence.turns[0].question)).toBeInTheDocument();
  expect(screen.getByText(evidence.label)).toBeInTheDocument();
});
```

`SurveyBlock.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { evidence } from "../content/evidence";
import { SurveyBlock } from "./SurveyBlock";

it("renders ten questions, charts, conclusions, and the n=20 label", () => {
  render(<SurveyBlock />);
  expect(screen.getAllByText(evidence.label).length).toBeGreaterThan(0);
  for (const question of evidence.questions) {
    expect(screen.getByText(question.title)).toBeInTheDocument();
  }
  expect(screen.getByText(evidence.conclusions)).toBeInTheDocument();
  expect(document.querySelectorAll(".survey-bar-fill").length).toBeGreaterThan(9);
});
```

- [ ] **Step 2: Run the block tests and confirm they fail**

Run: `cd lirn-web-main && npm test -- src/components/InterviewBlock.test.tsx src/components/SurveyBlock.test.tsx`

Expected: FAIL (modules missing).

- [ ] **Step 3: Implement the blocks**

`InterviewBlock.tsx`:

```tsx
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";

export function InterviewBlock() {
  return (
    <section className="band band-white" aria-labelledby="discovery-title">
      <p className="meta">05</p>
      <h2 id="discovery-title" className="display">
        {copy.discoveryTitle}
      </h2>
      <p className="evidence-label">{evidence.label}</p>
      <p className="lede">{evidence.interviewRole}</p>
      <ol className="interview-list">
        {evidence.turns.map((turn) => (
          <li key={turn.question}>
            <p className="interview-q">{turn.question}</p>
            <p className="interview-a">{turn.answer}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

`SurveyBlock.tsx`:

```tsx
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";

export function SurveyBlock() {
  return (
    <section className="band band-black" aria-labelledby="validation-title">
      <p className="meta">06</p>
      <h2 id="validation-title" className="display">
        {copy.validationTitle}
      </h2>
      <p className="evidence-label">{evidence.label}</p>
      <ol className="survey-list">
        {evidence.questions.map((question) => (
          <li key={question.id} className="survey-item">
            <h3>{question.title}</h3>
            <p className="meta">{question.context}</p>
            <p className="prose">{question.analysis}</p>
            <ul className="survey-bars">
              {question.bars.map((bar) => (
                <li key={bar.label}>
                  <span>{bar.label}</span>
                  <span>{bar.value}%</span>
                  <div
                    className="survey-bar-fill"
                    style={{ width: `${bar.value}%` }}
                  />
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      <p className="prose">{evidence.conclusions}</p>
    </section>
  );
}
```

- [ ] **Step 4: Run the block tests and confirm they pass**

Run: `cd lirn-web-main && npm test -- src/components/InterviewBlock.test.tsx src/components/SurveyBlock.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/components/InterviewBlock.tsx src/components/InterviewBlock.test.tsx \
  src/components/SurveyBlock.tsx src/components/SurveyBlock.test.tsx
git commit -m "$(cat <<'EOF'
Add interview and full survey blocks for TORNS.

EOF
)"
```

---

### Task 8: TORNS page

**Files:**
- Modify: `lirn-web-main/src/pages/TornsPage.test.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.tsx`

**Interfaces:**
- Consumes: `copy`, `InterviewBlock`, `SurveyBlock`, `GeometryFrame`, `ByLirn`
- Produces: `/torns` sections Hero, Problem, Frame, System, Discovery, Validation, Close. No mission. No ProductStory. No InfographicSlot.

- [ ] **Step 1: Rewrite the TORNS test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { TornsPage } from "./TornsPage";

it("explains the product, the Transmilenio case, and the team evidence", () => {
  render(
    <MemoryRouter>
      <TornsPage />
    </MemoryRouter>,
  );

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    copy.tornsHeadline,
  );
  expect(screen.getByText(copy.byLirn)).toBeInTheDocument();
  expect(screen.getByText(copy.problemBody)).toBeInTheDocument();
  expect(screen.getByText(copy.problemExpected)).toBeInTheDocument();
  expect(screen.getByText(copy.problemReal)).toBeInTheDocument();
  expect(screen.getByText(copy.caseFrame)).toBeInTheDocument();
  expect(screen.getByText(copy.caseNotPilot)).toBeInTheDocument();
  expect(screen.getByText(copy.caseScope)).toBeInTheDocument();
  for (const step of copy.systemSteps) {
    expect(screen.getByText(step)).toBeInTheDocument();
  }
  expect(screen.getByText(copy.cap2)).toBeInTheDocument();
  expect(screen.getAllByText(evidence.label).length).toBeGreaterThan(0);
  expect(screen.getByText(evidence.interviewRole)).toBeInTheDocument();
  expect(screen.getByText(evidence.conclusions)).toBeInTheDocument();
  expect(screen.getByText(copy.close)).toBeInTheDocument();
  expect(screen.queryByText(copy.mission)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the TORNS test and confirm it fails**

Run: `cd lirn-web-main && npm test -- src/pages/TornsPage.test.tsx`

Expected: FAIL (old ProductStory page).

- [ ] **Step 3: Replace `TornsPage.tsx`**

```tsx
import { Link } from "react-router-dom";
import { ByLirn } from "../components/ByLirn";
import { GeometryFrame } from "../components/GeometryFrame";
import { InterviewBlock } from "../components/InterviewBlock";
import { SurveyBlock } from "../components/SurveyBlock";
import { copy } from "../content/copy";

const CAPABILITIES = [copy.cap1, copy.cap2, copy.cap3, copy.cap4];

export function TornsPage() {
  return (
    <main className="page page-torns">
      <section className="band band-black hero" aria-labelledby="torns-title">
        <GeometryFrame className="hero-photo">
          <img
            src={`${import.meta.env.BASE_URL}images/torns-hero.jpg`}
            alt=""
            width={1920}
            height={1080}
          />
        </GeometryFrame>
        <div className="hero-copy">
          <p className="hero-brand">
            {copy.tornsName}
            <ByLirn />
          </p>
          <h1 id="torns-title" className="hero-headline">
            {copy.tornsHeadline}
          </h1>
          <p className="hero-support">{copy.tornsSupport}</p>
          <Link
            className="btn-primary"
            to={{ pathname: "/", hash: "contacto" }}
          >
            {copy.ctaTalk}
          </Link>
        </div>
      </section>

      <section className="band band-white">
        <p className="meta">01</p>
        <h2 className="display">{copy.problemTitle}</h2>
        <p className="prose">{copy.problemBody}</p>
        <div className="contrast">
          <p>{copy.problemExpected}</p>
          <p className="contrast-real">{copy.problemReal}</p>
        </div>
      </section>

      <section className="band band-black">
        <p className="meta">02</p>
        <h2 className="display">{copy.caseFrame}</h2>
        <p className="lede">{copy.caseNotPilot}</p>
        <p className="prose">{copy.caseScope}</p>
      </section>

      <section className="band band-white">
        <p className="meta">03</p>
        <h2 className="display">{copy.systemTitle}</h2>
        <ol className="pipeline">
          {copy.systemSteps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <h3>{copy.capabilitiesTitle}</h3>
        <ul>
          {CAPABILITIES.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <InterviewBlock />
      <SurveyBlock />

      <section className="band band-white">
        <h2 className="display">{copy.close}</h2>
        <Link
          className="btn-primary"
          to={{ pathname: "/", hash: "contacto" }}
        >
          {copy.ctaTalk}
        </Link>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run the TORNS test and confirm it passes**

Run: `cd lirn-web-main && npm test -- src/pages/TornsPage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit in the submodule**

```bash
cd lirn-web-main
git add src/pages/TornsPage.tsx src/pages/TornsPage.test.tsx
git commit -m "$(cat <<'EOF'
Rebuild /torns as product, Transmilenio case, and evidence.

EOF
)"
```

---

### Task 9: Retire brochure skin and write the CSS

**Files:**
- Delete: `lirn-web-main/src/components/Esencia.tsx`
- Delete: `lirn-web-main/src/components/Esencia.test.tsx`
- Delete: `lirn-web-main/src/components/ProductStory.tsx`
- Delete: `lirn-web-main/src/components/ProductStory.test.tsx`
- Keep `Wordmark.tsx` only if something still imports it. After this task, no page may import `Wordmark`, `Esencia`, or `ProductStory`. If unused, delete `Wordmark.tsx` and `Wordmark.test.tsx`.
- Modify: `lirn-web-main/src/styles/site.css`
- Modify: `lirn-web-main/index.html` (direction comment)
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: class names already used by Home, TORNS, chrome, and blocks
- Produces: black/white bands, sharp CTAs, geometry clip, activity-colored bars and hovers

- [ ] **Step 1: Delete retired components and their tests**

Remove the files listed above. Grep the submodule for `Esencia`, `ProductStory`, `esenciaTitle`, `syntheticNote`. There must be zero hits in `src/`.

- [ ] **Step 2: Run the full test suite (expect CSS-independent tests to pass)**

Run: `cd lirn-web-main && npm test`

Expected: PASS for copy, evidence, chrome, home, TORNS, interview, survey. FAIL only if a deleted import remains.

- [ ] **Step 3: Replace brochure rules in `site.css`**

Keep the file as one stylesheet. Remove navy/amber/coral/civic and pill radii. Required rules:

```css
.band {
  padding: clamp(4rem, 10vw, 8rem) var(--gutter);
}

.band-black {
  background: var(--black);
  color: var(--white);
}

.band-white {
  background: var(--white);
  color: var(--black);
}

.meta,
.evidence-label {
  color: var(--graphite);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}

.display,
.hero-headline {
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 0.98;
}

.hero-headline {
  font-size: clamp(2.8rem, 8vw, 6rem);
}

.btn-primary,
.btn-secondary,
.site-nav-cta {
  border-radius: 0;
  display: inline-flex;
  padding: 0.85rem 1.4rem;
  text-decoration: none;
}

.btn-primary,
.site-nav-cta {
  background: var(--white);
  color: var(--black);
}

.band-white .btn-primary {
  background: var(--black);
  color: var(--white);
}

.btn-primary:hover,
.site-nav-cta:hover,
.btn-secondary:hover {
  color: var(--activity);
}

.geometry-frame {
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--cut)), calc(100% - var(--cut)) 100%, 0 100%);
}

.survey-bar-fill {
  height: 2px;
  background: var(--activity);
}

.contrast-real {
  color: var(--activity);
}

.site-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem var(--gutter);
  background: var(--white);
  color: var(--black);
}

.brand-mark-wordmark {
  height: 1.4rem;
  width: auto;
}

.brand-mark-icon {
  height: 2rem;
  width: auto;
}

.pipeline,
.cap-list,
.interview-list,
.survey-list {
  list-style: none;
  padding: 0;
}
```

Add layout for hero split, pipeline row, interview spacing, and footer. Motion: `transition: color 160ms var(--ease)` on links. Optional `animation` on `.survey-bar-fill` from width 0 to the inline width. No particles. No pill buttons. No `#00A8FF` page background.

- [ ] **Step 4: Update `index.html` comment**

```html
    <!--
      THESIS: LIRN is an Architectural Tech Corporate firm. TORNS is the product and the Transmilenio applied prototype.
      OWN-WORLD: Official logo geometry. Black/white bands. #00A8FF activity only. Manrope. Real station photography.
      STORY: Home = identity, purpose, vision, capability, TORNS teaser. /torns = problem, frame, system, interview, survey.
      FIRST VIEWPORT (LIRN): Black hero, official wordmark, “La demanda no espera.”, Hablemos + Ver TORNS.
      FORM: spec 2026-09-06-lirn-architectural-tech-landing-design · two-route rebuild.
    -->
```

- [ ] **Step 5: Rewrite `DESIGN.md` frontmatter and color notes**

Set:

```yaml
name: LIRN
description: Architectural Tech Corporate commercial site for LIRN and TORNS
colors:
  black: "#000000"
  white: "#ffffff"
  graphite: "#6b7280"
  activity: "#00A8FF"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
```

State that `#00A8FF` is activity only. State that `tro-frontend` is still civic blue.

- [ ] **Step 6: Run tests and both asserts**

Run:

```bash
cd lirn-web-main && npm test && npm run build
cd ..
node scripts/assert-lirn-tokens.mjs
node scripts/assert-torns-tokens.mjs
```

Expected: all PASS.

- [ ] **Step 7: Commit submodule, then parent**

```bash
cd lirn-web-main
git add -A
git commit -m "$(cat <<'EOF'
Apply Architectural Tech layout and retire the brochure skin.

EOF
)"
cd ..
git add lirn-web-main DESIGN.md
git commit -m "$(cat <<'EOF'
Point lirn-web-main at the Architectural Tech landing.

EOF
)"
```

---

## Self-review

**Spec coverage**

| Spec section | Task |
| --- | --- |
| Two routes, voices, teaser-only home | 6, 8 |
| Exact mission / vision / hero | 1, 6 |
| Transmilenio paragraph + case frame + not signed pilot | 1, 8 |
| Generic foundations (metro / BRT / tren) | 1, 8 |
| Prototype pipeline and YOLO/WebSocket facts | 1, 8 |
| Full interview (8 turns) + n=20 label, no student greeting | 2, 7 |
| Full 10-question survey + estimate label on monthly hours | 2, 7 |
| Official logos, no distort | 5 |
| Black / white / activity tokens | 3, 4, 9 |
| Reserved Hablemos, no fake form | 6 |
| 404 unchanged | (existing `NotFoundPage`) |
| PRODUCT / DESIGN | 3, 9 |
| Out of scope dashboard | Global constraint + unchanged `assert-torns-tokens.mjs` |
| Retire Esencia / ProductStory | 9 |

**Placeholder scan:** none. Types `InterviewTurn`, `SurveyQuestion`, `BrandMark` props match across tasks.

**Type consistency:** `copy.systemSteps` is a readonly array. `evidence.questions` has `id` `q1`–`q10`. `BrandMark` `on` is `"dark" | "light"`.
