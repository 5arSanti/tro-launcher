# Guion 4 min y vista `/plan` Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar el guion canónico de 4:00 y una ruta `/plan` en `lirn-web-main` que lo reproduce a escena completa, con pausa, riel y proyección TO-BE, sin tocar el home ni `/torns` salvo el enlace de nav.

**Architecture:** `PLAN_BEATS` es la fuente única (texto, duraciones, códigos, `kind`). `usePlanPlayback` mueve el reloj. `PlanPage` arma riel, escena (`StageSlide` + `PlanStage`) y controles. Skin LIRN. Paleta TORNS solo como velo en la escena Producto.

**Tech Stack:** React 19, React Router 7, Vite 7, Motion, Vitest, Testing Library. Tokens en `lirn-web-main/src/styles/tokens.css`.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-24-lirn-plan-guion-vista-design.md`.
- LIRN es la firma. TORNS es el único producto. Equipo en esta vista: una persona, Johel Santiago Arias.
- No TRO, Sistema de Vigilancia, Transport Route Optimization, cliente firmado, alianza, KPI de impacto, testimonio, ni Azure/GCP como decisión tomada.
- TransMilenio y SITP solo como caso de estudio. Primer piloto pagado e integración: camino, no presente.
- Analogía única: planos de una obra. Sin guion largo (—).
- Mundo visual LIRN: negro/blanco, `#00A8FF` como señal, Manrope, botones rectos, fotos monocromas, logos oficiales sin distorsión. Sin partículas ni loops decorativos.
- `StageControls` de `/torns` no se modifica. Home y copy de `/torns` no se modifican salvo `navPlan`.
- `lirn-web-main/src/test/setup.ts` hace que `matchMedia("(prefers-reduced-motion: reduce)")` sea true. Los tests de página arrancan en pausa. El hook se prueba pasando `reducedMotion` explícito.
- Verificar por tarea con `npm test` en `lirn-web-main` (y `npm run build` al cerrar). Expected: exit 0.
- No `git commit` salvo que el usuario lo pida. Si un paso dice Commit y no lo pidió, saltarlo.
- Impeccable: heredar el mundo LIRN. No correr concept-seed. Antes de CSS/JSX visual, leer `DESIGN.md` y `reference/craft-floor.md` de la skill impeccable.

## File Map

| File | Responsibility |
| --- | --- |
| `lirn-web-main/src/content/plan.ts` | `PLAN_BEATS`, tipos, `beatIdFromHash`, `PLAN_TOTAL_MS` |
| `lirn-web-main/src/content/plan.test.ts` | Texto canónico, 240000 ms, códigos con nombre, claims prohibidos |
| `lirn-web-main/src/content/copy.ts` | `navPlan`, Reproducir/Pausa y etiquetas visuales cortas |
| `docs/presentations/lirn-plan-guion-4min.md` | Guion oral, mismo texto que `PLAN_BEATS` |
| `lirn-web-main/src/hooks/usePlanPlayback.ts` | Índice, playing, elapsed, goTo/pause/fin sin loop |
| `lirn-web-main/src/hooks/usePlanPlayback.test.ts` | Autoplay, salto, reduced motion, no loop |
| `lirn-web-main/src/components/PlanRail.tsx` | Siete capítulos |
| `lirn-web-main/src/components/PlanControls.tsx` | Anterior, Reproducir/Pausa, Siguiente, barra 4:00 |
| `lirn-web-main/src/components/PlanStage.tsx` | Visual por `kind` |
| `lirn-web-main/src/pages/PlanPage.tsx` | Escena activa, hash, teclado, live region |
| `lirn-web-main/src/pages/PlanPage.test.tsx` | Siete escenas, CTA, live region |
| `lirn-web-main/src/App.tsx` | Ruta `/plan` |
| `lirn-web-main/src/components/SiteNav.tsx` | Enlace Plan |
| `lirn-web-main/src/styles/site.css` | Bloque `.page-plan` |
| `docs/superpowers/specs/2026-11-24-lirn-plan-guion-vista-design.md` | Marcar Estado: aprobado |

**Interfaces (locked):**

```ts
export type PlanBeatId =
  | "firma"
  | "desajuste"
  | "producto"
  | "limite"
  | "planos"
  | "ruta"
  | "cierre";

export type PlanVisualKind = PlanBeatId;

export type PlanMargin = {
  code?: string;
  name: string;
};

export type PlanBeat = {
  id: PlanBeatId;
  title: string;
  railLabel: string;
  spoken: string;
  durationMs: number;
  codes: readonly PlanMargin[];
  kind: PlanVisualKind;
};

export const PLAN_TOTAL_MS = 240_000;
export const PLAN_BEATS: readonly PlanBeat[];
export function beatIdFromHash(hash: string): PlanBeatId | undefined;
export function formatPlanMargin(item: PlanMargin): string;

export function usePlanPlayback(
  beats: readonly PlanBeat[],
  options: { reducedMotion: boolean; initialId?: PlanBeatId },
): {
  index: number;
  beat: PlanBeat;
  direction: number;
  playing: boolean;
  sceneElapsedMs: number;
  totalElapsedMs: number;
  atStart: boolean;
  atEnd: boolean;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  goPrev: () => void;
  goNext: () => void;
  goTo: (id: PlanBeatId) => void;
};
```

`formatPlanMargin`: si hay `code`, `CODE Name`; si no, solo `name`.

---

### Task 1: Contenido canónico `PLAN_BEATS` y chrome de copy

**Files:**
- Create: `lirn-web-main/src/content/plan.ts`
- Create: `lirn-web-main/src/content/plan.test.ts`
- Modify: `lirn-web-main/src/content/copy.ts`
- Modify: `lirn-web-main/src/content/copy.test.ts`
- Modify: `docs/superpowers/specs/2026-11-24-lirn-plan-guion-vista-design.md` (Estado: aprobado)

**Interfaces:**
- Consumes: nada.
- Produces: `PLAN_BEATS`, `PLAN_TOTAL_MS`, `beatIdFromHash`, `formatPlanMargin`, `copy.navPlan`, `copy.controlPlay`, `copy.controlPause` y etiquetas visuales listadas abajo.

- [ ] **Step 1: Write the failing test**

En `lirn-web-main/src/content/plan.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import {
  PLAN_BEATS,
  PLAN_TOTAL_MS,
  beatIdFromHash,
  formatPlanMargin,
} from "./plan";

const SPOKEN = {
  firma:
    "LIRN es una firma de movilidad. Todavía no está constituida. Hoy la conforma una sola persona, su fundador. Ofrece un único producto, TORNS. La misión es que el transporte masivo ajuste su oferta a quien espera ahora, y no solo a lo que el horario predijo. La visión es que cada estación opere con la demanda que ocurre, no con la que se supuso.",
  desajuste:
    "En un sistema masivo la oferta se fija por horario y por histórico. El andén, en cambio, cambia a cada minuto. Quien espera paga ese desajuste: vehículos llenos, estaciones desiguales, una espera que el horario no vio. TransMilenio y el SITP de Bogotá sirven aquí como caso de estudio, no como cliente. El mismo desajuste aparece en metro, BRT o tren.",
  producto:
    "TORNS toma el video de una estación, cuenta a las personas que esperan y, con ese número, recomienda al centro de control el tipo de vehículo y cuántas unidades despachar. Cuenta personas. No calcula densidad por metro cuadrado. La decisión de despacho sigue siendo humana. Eso es la herramienta en el terreno: medir y proponer. El edificio de la empresa viene después.",
  limite:
    "Conviene decir lo que no es. No es un piloto firmado. No hay clientes. No optimiza todas las rutas de la ciudad ni predice la demanda histórica. Cuenta personas y aplica una regla de despacho. Aun así, el prototipo existe y se puede consultar: el sitio, la página del producto y el código están publicados.",
  planos:
    "Para pasar de prototipo a empresa se usó arquitectura empresarial. El método es como los planos de una obra: primero se dibuja lo que existe, después lo que se quiere levantar, y al final el orden en que conviene construirlo. Hoy LIRN cabe en un computador y en una persona. Eso es el terreno, no el edificio.",
  ruta:
    "El cambio va en un orden. Primero la empresa tiene que existir y tratar bien los datos de las personas. Después puede medir con rigor y no perder el conteo al apagar. Luego puede cobrar por lo que mide. Solo al final tiene sentido conectarse con el control de un tercero. En el primer año: formalizar, abrir un canal honesto y respaldar lo crítico. Entre el primero y el tercero: video real de estación y un primer piloto pagado. Entre el tercero y el quinto: llevar la recomendación al operador.",
  cierre:
    "Al final, LIRN seguirá siendo una empresa pequeña, pero ya no debería depender de un solo computador ni de una sola persona. Cada paso se puede seguir desde el objetivo que lo motiva hasta el proyecto que lo cumple.",
} as const;

describe("PLAN_BEATS", () => {
  it("keeps seven timed scenes and the canonical spoken text", () => {
    expect(PLAN_BEATS.map((beat) => beat.id)).toEqual([
      "firma",
      "desajuste",
      "producto",
      "limite",
      "planos",
      "ruta",
      "cierre",
    ]);
    expect(PLAN_BEATS.map((beat) => beat.durationMs)).toEqual([
      28000, 32000, 42000, 28000, 38000, 52000, 20000,
    ]);
    expect(PLAN_BEATS.reduce((sum, beat) => sum + beat.durationMs, 0)).toBe(
      PLAN_TOTAL_MS,
    );
    expect(PLAN_TOTAL_MS).toBe(240000);
    for (const beat of PLAN_BEATS) {
      expect(beat.spoken).toBe(SPOKEN[beat.id]);
      expect(beat.kind).toBe(beat.id);
      expect(beat.codes.length).toBeGreaterThan(0);
      for (const item of beat.codes) {
        const label = formatPlanMargin(item);
        expect(label.length).toBeGreaterThan(3);
        if (item.code) {
          expect(label.startsWith(item.code)).toBe(true);
          expect(label).toContain(item.name);
        }
      }
    }
  });

  it("rejects forbidden commercial and identity claims", () => {
    const blob = PLAN_BEATS.map((beat) => beat.spoken).join(" ");
    const stripped = blob.replace(/No es un piloto firmado/g, "");
    expect(stripped).not.toMatch(/piloto firmado/);
    expect(blob).not.toMatch(
      /TRO\b|Sistema de Vigilancia|Transport Route Optimization/,
    );
    expect(blob).not.toMatch(/alianza|testimonio|\bAzure\b|\bGCP\b/);
    expect(blob).not.toMatch(/Rebeca|Hanna Cerinza/);
    expect(blob).toMatch(/caso de estudio/);
  });

  it("reads beat ids from hashes", () => {
    expect(beatIdFromHash("#ruta")).toBe("ruta");
    expect(beatIdFromHash("firma")).toBe("firma");
    expect(beatIdFromHash("#nope")).toBeUndefined();
  });
});
```

En `copy.test.ts`, añadir:

```ts
it("names the plan film chrome", () => {
  expect(copy.navPlan).toBe("Plan");
  expect(copy.controlPlay).toBe("Reproducir");
  expect(copy.controlPause).toBe("Pausa");
  expect(copy.planOnePerson).toBe("Una persona. Un producto.");
  expect(copy.planHorario).toBe("horario");
  expect(copy.planWaiting).toBe("quien espera");
  expect(copy.planNodeCamera).toBe("cámara");
  expect(copy.planNodeCount).toBe("conteo");
  expect(copy.planNodeRecommend).toBe("recomendación");
  expect(copy.planGround).toBe("terreno");
  expect(copy.planBuilding).toBe("edificio");
  expect(copy.planHorizonShort).toBe("0–1 año");
  expect(copy.planHorizonMid).toBe("1–3 años");
  expect(copy.planHorizonLong).toBe("3–5 años");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/content/plan.test.ts src/content/copy.test.ts`

Expected: FAIL, `plan.ts` no existe y `copy.navPlan` es undefined.

- [ ] **Step 3: Write minimal implementation**

`plan.ts` exporta tipos, `PLAN_TOTAL_MS = 240_000`, `formatPlanMargin`, `beatIdFromHash` (`hash.replace(/^#/, "")` y busca en `PLAN_BEATS`), y `PLAN_BEATS` con:

| id | title | railLabel | durationMs | codes |
|----|-------|-----------|------------|-------|
| firma | Firma | Firma | 28000 | OE-01 Producto demostrable; OE-04 Demanda y oferta |
| desajuste | Desajuste | Desajuste | 32000 | name `Caso de estudio` (sin code) |
| producto | Qué hace | Producto | 42000 | CAP-04 Detección y conteo; CAP-05 Recomendación de despacho |
| limite | Qué no es | Límite | 28000 | name `Prototipo, no piloto` |
| planos | Planos | Planos | 38000 | name `ADM de TOGAF` |
| ruta | Cinco años | Ruta | 52000 | PY-01 Formalización legal; PY-03 Canal comercial; PY-07 Seguridad y respaldo; PY-04 Historial de conteos; PY-05 Video de estación; PY-08 Primer piloto pagado; PY-06 Integración con el centro de control |
| cierre | Cierre | Cierre | 20000 | code `OE-01 a OE-05`, name `Objetivos estratégicos` |

`spoken` y `kind` según la tabla SPOKEN / id. `as const` en el arreglo o `satisfies readonly PlanBeat[]`.

En `copy.ts` añadir, junto a `navEmpresa`:

```ts
  navPlan: "Plan",
  controlPlay: "Reproducir",
  controlPause: "Pausa",
  planOnePerson: "Una persona. Un producto.",
  planHorario: "horario",
  planWaiting: "quien espera",
  planNodeCamera: "cámara",
  planNodeCount: "conteo",
  planNodeRecommend: "recomendación",
  planLimitPilot: "No es un piloto firmado.",
  planLimitClients: "No hay clientes.",
  planLimitNetwork: "No es un optimizador de toda la red.",
  planGround: "terreno",
  planBuilding: "edificio",
  planHorizonShort: "0–1 año",
  planHorizonMid: "1–3 años",
  planHorizonLong: "3–5 años",
  planAria: "Plan de LIRN",
  planTimeLabel: "Tiempo del plan",
```

Marcar la spec `Estado: aprobado`.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/content/plan.test.ts src/content/copy.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Skip unless the user asked.

---

### Task 2: Markdown del guion

**Files:**
- Create: `docs/presentations/lirn-plan-guion-4min.md`

**Interfaces:**
- Consumes: textos `spoken` de Task 1.
- Produces: archivo de presentación con el mismo texto.

- [ ] **Step 1: Write the document**

```markdown
# Guion oral: Plan de LIRN

Duración máxima: **4 minutos**.  
Tono: formal, directo, una sola voz. Analogía: planos de una obra.  
Uso: defensa oral y lectura en `/plan`. Los códigos del taller no se dicen.

| Escena | Reloj | Riel |
|--------|-------|------|
| Firma | 0:00–0:28 | Firma |
| Desajuste | 0:28–1:00 | Desajuste |
| Qué hace | 1:00–1:42 | Producto |
| Qué no es | 1:42–2:10 | Límite |
| Planos | 2:10–2:48 | Planos |
| Cinco años | 2:48–3:40 | Ruta |
| Cierre | 3:40–4:00 | Cierre |

## 1. Firma (0:00–0:28)

[pegar spoken de firma]

Margen: OE-01 Producto demostrable; OE-04 Demanda y oferta.

## 2. Desajuste (0:28–1:00)

[pegar spoken de desajuste]

Margen: Caso de estudio.

## 3. Qué hace (1:00–1:42)

[pegar spoken de producto]

Margen: CAP-04 Detección y conteo; CAP-05 Recomendación de despacho.

## 4. Qué no es (1:42–2:10)

[pegar spoken de limite]

Margen: Prototipo, no piloto.

## 5. Planos (2:10–2:48)

[pegar spoken de planos]

Margen: ADM de TOGAF.

## 6. Cinco años (2:48–3:40)

[pegar spoken de ruta]

Margen: PY-01 Formalización legal; PY-03 Canal comercial; PY-07 Seguridad y respaldo; PY-04 Historial de conteos; PY-05 Video de estación; PY-08 Primer piloto pagado; PY-06 Integración con el centro de control.

## 7. Cierre (3:40–4:00)

[pegar spoken de cierre]

Margen: OE-01 a OE-05 Objetivos estratégicos.
```

Sustituir cada `[pegar…]` por el string exacto de `PLAN_BEATS`. Sin em dash.

- [ ] **Step 2: Confirm the spoken blocks match plan.ts**

Run:

```bash
python3 - <<'PY'
from pathlib import Path
import re
md = Path("docs/presentations/lirn-plan-guion-4min.md").read_text(encoding="utf-8")
src = Path("lirn-web-main/src/content/plan.ts").read_text(encoding="utf-8")
spoken = re.findall(r'spoken:\s*"([^"]+)"', src)
assert len(spoken) == 7, spoken
for text in spoken:
    assert text in md, text[:80]
print("ok", len(spoken))
PY
```

Expected: `ok 7`.

- [ ] **Step 3: Commit**

Skip unless the user asked.

---

### Task 3: `usePlanPlayback`

**Files:**
- Create: `lirn-web-main/src/hooks/usePlanPlayback.ts`
- Create: `lirn-web-main/src/hooks/usePlanPlayback.test.ts`

**Interfaces:**
- Consumes: `PLAN_BEATS`, `PlanBeat`, `PlanBeatId` de Task 1.
- Produces: `usePlanPlayback` con la firma locked.

- [ ] **Step 1: Write the failing test**

```ts
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PLAN_BEATS } from "../content/plan";
import { usePlanPlayback } from "./usePlanPlayback";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("usePlanPlayback", () => {
  it("autoplays from firma and advances after durationMs", () => {
    const { result } = renderHook(() =>
      usePlanPlayback(PLAN_BEATS, { reducedMotion: false }),
    );
    expect(result.current.beat.id).toBe("firma");
    expect(result.current.playing).toBe(true);
    act(() => {
      vi.advanceTimersByTime(27999);
    });
    expect(result.current.beat.id).toBe("firma");
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current.beat.id).toBe("desajuste");
    expect(result.current.playing).toBe(true);
    expect(result.current.direction).toBe(1);
  });

  it("pauses on goTo and does not loop after the last beat", () => {
    const { result } = renderHook(() =>
      usePlanPlayback(PLAN_BEATS, { reducedMotion: false }),
    );
    act(() => {
      result.current.goTo("cierre");
    });
    expect(result.current.playing).toBe(false);
    expect(result.current.beat.id).toBe("cierre");
    act(() => {
      result.current.play();
    });
    act(() => {
      vi.advanceTimersByTime(20000);
    });
    expect(result.current.beat.id).toBe("cierre");
    expect(result.current.playing).toBe(false);
    expect(result.current.sceneElapsedMs).toBe(20000);
  });

  it("starts paused on a non-firma hash and when motion is reduced", () => {
    const hashed = renderHook(() =>
      usePlanPlayback(PLAN_BEATS, {
        reducedMotion: false,
        initialId: "ruta",
      }),
    );
    expect(hashed.result.current.beat.id).toBe("ruta");
    expect(hashed.result.current.playing).toBe(false);

    const reduced = renderHook(() =>
      usePlanPlayback(PLAN_BEATS, { reducedMotion: true }),
    );
    expect(reduced.result.current.playing).toBe(false);
    expect(reduced.result.current.beat.id).toBe("firma");
  });

  it("goNext and goPrev pause and keep bounds", () => {
    const { result } = renderHook(() =>
      usePlanPlayback(PLAN_BEATS, { reducedMotion: true }),
    );
    act(() => {
      result.current.goPrev();
    });
    expect(result.current.index).toBe(0);
    act(() => {
      result.current.goNext();
    });
    expect(result.current.beat.id).toBe("desajuste");
    expect(result.current.playing).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/hooks/usePlanPlayback.test.ts`

Expected: FAIL, módulo no existe.

- [ ] **Step 3: Write minimal implementation**

Reglas:

- `initialId` válido fija el índice inicial; si falta, `0`.
- `playing` inicial: `!reducedMotion && beat.id === "firma"` (el beat inicial, no el primero del array si `initialId` es otro).
- Avance con `window.setTimeout` por `durationMs - sceneElapsedMs` mientras `playing`.
- Al disparar: si `index === last`, `playing = false` y `sceneElapsedMs = durationMs`; si no, `index + 1`, `direction = 1`, `sceneElapsedMs = 0`.
- Intervalo de 100 ms mientras `playing` para subir `sceneElapsedMs` (clamp al `durationMs`).
- `totalElapsedMs` = suma de `durationMs` de beats anteriores + `sceneElapsedMs`.
- `goTo`, `goPrev`, `goNext`: `playing = false`, `sceneElapsedMs = 0`, `direction` 1 o -1.
- `play` / `pause` / `toggle` no cambian el índice.
- `goPrev` en 0 y `goNext` en last no cambian índice.

No usar `requestAnimationFrame` (rompe fake timers).

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/hooks/usePlanPlayback.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

Skip unless the user asked.

---

### Task 4: Riel y controles

**Files:**
- Create: `lirn-web-main/src/components/PlanRail.tsx`
- Create: `lirn-web-main/src/components/PlanControls.tsx`
- Create: `lirn-web-main/src/components/PlanRail.test.tsx`
- Create: `lirn-web-main/src/components/PlanControls.test.tsx`

**Interfaces:**
- Consumes: `PLAN_BEATS`, `PlanBeatId`, `copy`, `PLAN_TOTAL_MS`.
- Produces: `PlanRail`, `PlanControls`.

- [ ] **Step 1: Write the failing tests**

`PlanRail.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { PLAN_BEATS } from "../content/plan";
import { PlanRail } from "./PlanRail";

it("lists seven chapters and reports the current beat", async () => {
  const onSelect = vi.fn();
  const user = userEvent.setup();
  render(
    <PlanRail
      beats={PLAN_BEATS}
      currentId="producto"
      onSelect={onSelect}
    />,
  );
  const nav = screen.getByRole("navigation", { name: "Plan de LIRN" });
  expect(nav.querySelectorAll("a")).toHaveLength(7);
  expect(screen.getByRole("link", { name: "Ruta" })).toHaveAttribute(
    "href",
    "#ruta",
  );
  await user.click(screen.getByRole("link", { name: "Límite" }));
  expect(onSelect).toHaveBeenCalledWith("limite");
});
```

`PlanControls.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { copy } from "../content/copy";
import { PlanControls } from "./PlanControls";

it("exposes play, pause, skip, and a 4:00 progress bar", async () => {
  const user = userEvent.setup();
  const onPrev = vi.fn();
  const onNext = vi.fn();
  const onToggle = vi.fn();
  const { rerender } = render(
    <PlanControls
      playing={false}
      atStart
      atEnd={false}
      totalElapsedMs={0}
      totalMs={240000}
      onPrev={onPrev}
      onNext={onNext}
      onToggle={onToggle}
    />,
  );
  expect(screen.getByRole("progressbar", { name: copy.planTimeLabel })).toHaveAttribute(
    "aria-valuemax",
    "240",
  );
  await user.click(screen.getByRole("button", { name: copy.controlPlay }));
  expect(onToggle).toHaveBeenCalledOnce();
  rerender(
    <PlanControls
      playing
      atStart={false}
      atEnd={false}
      totalElapsedMs={120000}
      totalMs={240000}
      onPrev={onPrev}
      onNext={onNext}
      onToggle={onToggle}
    />,
  );
  expect(screen.getByRole("button", { name: copy.controlPause })).toBeInTheDocument();
  expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "120");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/PlanRail.test.tsx src/components/PlanControls.test.tsx`

Expected: FAIL.

- [ ] **Step 3: Write minimal implementation**

`PlanRail`: `nav.plan-rail` `aria-label={copy.planAria}`. Un `<a href={`#${beat.id}`}>` por beat. `aria-current="true"` y clase `is-current` si `currentId === beat.id`. `onClick` previene el default y llama `onSelect(beat.id)` (el hash lo escribe `PlanPage`).

`PlanControls`: tres botones (Anterior, Reproducir o Pausa, Siguiente) con `aria-disabled` en extremos como `StageControls`. Progress: `role="progressbar"`, `aria-valuemin={0}`, `aria-valuemax={Math.round(totalMs/1000)}`, `aria-valuenow={Math.round(totalElapsedMs/1000)}`, `aria-label={copy.planTimeLabel}`. El fill visual usa `width: ${(totalElapsedMs / totalMs) * 100}%`. No tocar `StageControls.tsx`.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/PlanRail.test.tsx src/components/PlanControls.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

Skip unless the user asked.

---

### Task 5: `PlanStage` y CSS LIRN

**Files:**
- Create: `lirn-web-main/src/components/PlanStage.tsx`
- Create: `lirn-web-main/src/components/PlanStage.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css` (añadir bloque al final, no reescribir `/torns`)

**Interfaces:**
- Consumes: `PlanBeat`, `copy`, `BrandMark`, `ByLirn`, `StationPhoto`, `usePrefersReducedMotion`.
- Produces: `PlanStage({ beat: PlanBeat })`.

- [ ] **Step 1: Write the failing test**

```ts
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { PLAN_BEATS } from "../content/plan";
import { copy } from "../content/copy";
import { PlanStage } from "./PlanStage";

function beat(id: (typeof PLAN_BEATS)[number]["id"]) {
  return PLAN_BEATS.find((item) => item.id === id)!;
}

it("renders the firma wordmark line and the seven visual kinds", () => {
  const { rerender } = render(<PlanStage beat={beat("firma")} />);
  expect(screen.getByText(copy.planOnePerson)).toBeInTheDocument();
  expect(screen.getByText(beat("firma").spoken)).toBeInTheDocument();
  expect(screen.getByText("OE-01 Producto demostrable")).toBeInTheDocument();

  rerender(<PlanStage beat={beat("desajuste")} />);
  expect(screen.getByText(copy.planHorario)).toBeInTheDocument();
  expect(screen.getByText(copy.planWaiting)).toBeInTheDocument();

  rerender(<PlanStage beat={beat("producto")} />);
  expect(screen.getByText(copy.planNodeCamera)).toBeInTheDocument();
  expect(screen.getByText(copy.byLirn)).toBeInTheDocument();

  rerender(<PlanStage beat={beat("limite")} />);
  expect(screen.getByText(copy.planLimitNetwork)).toBeInTheDocument();

  rerender(<PlanStage beat={beat("planos")} />);
  expect(screen.getByText(copy.planGround)).toBeInTheDocument();
  expect(screen.getByText(copy.planBuilding)).toBeInTheDocument();

  rerender(<PlanStage beat={beat("ruta")} />);
  expect(screen.getByText(copy.planHorizonShort)).toBeInTheDocument();
  expect(screen.getByText("PY-08 Primer piloto pagado")).toBeInTheDocument();

  rerender(<PlanStage beat={beat("cierre")} />);
  expect(screen.getByRole("link", { name: copy.verTorns })).toHaveAttribute(
    "href",
    "/torns",
  );
  expect(screen.getByRole("link", { name: copy.ctaTalk })).toHaveAttribute(
    "href",
    "/torns#contacto",
  );
});
```

`PlanStage` de cierre usa `Link` de react-router: envolver con `MemoryRouter` en el test.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/PlanStage.test.tsx`

Expected: FAIL.

- [ ] **Step 3: Implement visuals and CSS**

Leer `DESIGN.md` y craft-floor. No nueva identidad.

`PlanStage` layout común:

- aside `.plan-codes`: lista de `formatPlanMargin(code)`.
- `.plan-copy`: `h2.display` = `beat.title`; `p.prose` = `beat.spoken` con `aria-live="polite"` (una sola copia en el DOM).
- `.plan-visual` según `beat.kind`.

Por `kind`:

1. `firma`: `BrandMark` wordmark `on="dark"` `className="mark-display"`; icon watermark decorative; `p.plan-support` = `copy.planOnePerson`.
2. `desajuste`: `StationPhoto file="image-1.jfif"`; columnas `copy.planHorario` y `copy.planWaiting`; span `.plan-signal-line` `aria-hidden`.
3. `producto`: clase `plan-visual is-product` (velo TORNS). Endoso icon + `copy.tornsName` + `ByLirn`. Ol de tres nodos cámara / conteo / recomendación, todos `is-active` (estado final de la escena; el stagger visual es CSS/Motion de entrada, no un sub-índice).
4. `limite`: tres `article.plan-card` con `planLimitPilot`, `planLimitClients`, `planLimitNetwork`.
5. `planos`: `.plan-blueprint` con capa `.is-ground` (`copy.planGround`) y `.is-building` (`copy.planBuilding`). Rejilla CSS, no canvas.
6. `ruta`: ol de tres horizontes 0–1 / 1–3 / 3–5. Lista de códigos de `beat.codes` junto a la línea. Tramo activo: el tercero no se marca especial (la escena es el panorama); los tres `is-active` en reduced motion; con motion, fill CSS de `.plan-horizon-fill`.
7. `cierre`: wordmark otra vez; CTAs `Link` `btn-primary` a `/torns` y `btn-secondary` a `/torns#contacto`.

Motion: `motion` con `duration: 0.38`, `ease: [0.22, 1, 0.36, 1]`, opacity + x corto + blur 4px al entrar. Si `usePrefersReducedMotion()`, render estático.

CSS (append en `site.css`):

```css
.page-plan {
  background: var(--black);
  color: var(--white);
  min-height: 100dvh;
}

.plan-rail {
  position: sticky;
  top: 4.5rem;
  z-index: 3;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  padding: 0.75rem var(--gutter);
  background: color-mix(in srgb, var(--black) 88%, transparent);
  border-bottom: 1px solid var(--line);
}

.plan-rail a {
  color: var(--graphite);
  text-decoration: none;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.plan-rail a.is-current,
.plan-rail a:hover,
.plan-rail a:focus-visible {
  color: var(--activity);
}

.plan-frame {
  display: grid;
  grid-template-rows: 1fr auto;
  min-height: calc(100dvh - 4.5rem - 3rem);
}

.plan-stage {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(16rem, 0.85fr);
  gap: clamp(1.5rem, 4vw, 4rem);
  padding: clamp(1.5rem, 4vw, 3rem) var(--gutter) 1.5rem;
  align-items: center;
}

.plan-copy .prose {
  max-width: 65ch;
}

.plan-codes {
  margin: 0 0 1rem;
  padding: 0;
  list-style: none;
  color: var(--graphite);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
}

.plan-visual.is-product {
  background: linear-gradient(
    135deg,
    color-mix(in srgb, var(--torns-deep) 42%, transparent),
    color-mix(in srgb, var(--torns-mid) 22%, transparent)
  );
}

.plan-signal-line {
  display: block;
  height: 2px;
  background: var(--activity);
  transform: rotate(-8deg);
}

.plan-controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem var(--gutter) 1.5rem;
}

.plan-progress {
  flex: 1 1 12rem;
  height: 2px;
  background: var(--line);
}

.plan-progress-fill {
  height: 100%;
  background: var(--activity);
  transition: width 100ms linear;
}

@media (max-width: 72rem) {
  .plan-stage {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .plan-progress-fill {
    transition: none;
  }
}
```

Añadir reglas de nodos, tarjetas, blueprint (rejilla `repeating-linear-gradient` al 8% blanco) y timeline. Botones del plan: `btn-secondary` sobre negro. CTA cierre: primary blanco, secondary borde blanco.

No recolorir logos. Foto solo vía `StationPhoto`.

- [ ] **Step 4: Run test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/PlanStage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

Skip unless the user asked.

---

### Task 6: `PlanPage`, ruta y nav

**Files:**
- Create: `lirn-web-main/src/pages/PlanPage.tsx`
- Create: `lirn-web-main/src/pages/PlanPage.test.tsx`
- Modify: `lirn-web-main/src/App.tsx`
- Modify: `lirn-web-main/src/components/SiteNav.tsx`
- Modify: `lirn-web-main/src/components/SiteNav.test.tsx`
- Modify: `lirn-web-main/src/App.test.tsx` (ruta `/plan` existe)

**Interfaces:**
- Consumes: hook Task 3, riel/controles Task 4, `PlanStage` Task 5, `StageSlide`, `beatIdFromHash`.
- Produces: página `/plan` enlazada en nav.

- [ ] **Step 1: Write the failing tests**

`PlanPage.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { PLAN_BEATS } from "../content/plan";
import { copy } from "../content/copy";
import { PlanPage } from "./PlanPage";

it("plays the seven scenes by hand and keeps closing CTAs", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={["/plan"]}>
      <PlanPage />
    </MemoryRouter>,
  );
  expect(screen.getByRole("main")).toHaveAccessibleName(copy.planAria);
  expect(screen.getByText(PLAN_BEATS[0].spoken)).toBeInTheDocument();
  expect(screen.getByText(PLAN_BEATS[0].spoken)).toHaveAttribute(
    "aria-live",
    "polite",
  );
  for (let i = 0; i < 6; i += 1) {
    await user.click(screen.getByRole("button", { name: copy.controlNext }));
  }
  expect(screen.getByText(PLAN_BEATS[6].spoken)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: copy.verTorns })).toHaveAttribute(
    "href",
    "/torns",
  );
  expect(screen.getByRole("link", { name: copy.ctaTalk })).toHaveAttribute(
    "href",
    "/torns#contacto",
  );
});

it("lands on a hashed scene paused", () => {
  render(
    <MemoryRouter initialEntries={["/plan#ruta"]}>
      <PlanPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(PLAN_BEATS[5].spoken)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlPlay })).toBeInTheDocument();
});
```

Ampliar `SiteNav.test.tsx`:

```ts
  const links = screen.getAllByRole("link").map((el) => el.getAttribute("href"));
  expect(screen.getByRole("link", { name: copy.navEmpresa })).toHaveAttribute(
    "href",
    "/#empresa",
  );
  expect(screen.getByRole("link", { name: copy.navPlan })).toHaveAttribute(
    "href",
    "/plan",
  );
  expect(links.indexOf("/#empresa")).toBeLessThan(links.indexOf("/plan"));
  expect(links.indexOf("/plan")).toBeLessThan(links.indexOf("/torns"));
```

En `App.test.tsx` añadir un caso que renderiza `/lirn-web-main/plan` y ve `copy.planAria`.

- [ ] **Step 2: Run test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/pages/PlanPage.test.tsx src/components/SiteNav.test.tsx src/App.test.tsx`

Expected: FAIL (ruta y PlanPage ausentes).

- [ ] **Step 3: Implement page, route, nav, keyboard, hash**

`PlanPage`:

```tsx
export function PlanPage() {
  const reduce = usePrefersReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();
  const initialId = beatIdFromHash(location.hash);
  const playback = usePlanPlayback(PLAN_BEATS, {
    reducedMotion: reduce,
    initialId,
  });

  useEffect(() => {
    const fromHash = beatIdFromHash(location.hash);
    if (fromHash && fromHash !== playback.beat.id) {
      playback.goTo(fromHash);
    }
  }, [location.hash]);

  useEffect(() => {
    if (location.hash !== `#${playback.beat.id}`) {
      navigate(`#${playback.beat.id}`, { replace: true });
    }
  }, [playback.beat.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        playback.goNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        playback.goPrev();
      } else if (event.key === " ") {
        if (tag === "A" || (tag === "BUTTON" && target?.getAttribute("aria-label") !== copy.controlPlay && target?.textContent !== copy.controlPlay && target?.textContent !== copy.controlPause)) {
          return;
        }
        event.preventDefault();
        playback.toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playback.goNext, playback.goPrev, playback.toggle]);
  // ...
}
```

Markup:

```tsx
<main className="page page-plan" aria-label={copy.planAria}>
  <PlanRail beats={PLAN_BEATS} currentId={playback.beat.id} onSelect={playback.goTo} />
  <div className="plan-frame">
    <StageSlide id={playback.beat.id} direction={playback.direction} className="plan-stage">
      <PlanStage beat={playback.beat} />
    </StageSlide>
    <PlanControls ... />
  </div>
</main>
```

El `aria-live` no debe duplicar de forma visible el párrafo: `.plan-live` con `position: absolute; width: 1px; height: 1px; overflow: hidden; clip` (sr-only). El párrafo visible sigue en `PlanStage`.

`App.tsx`: `<Route path="/plan" element={<PlanPage />} />` entre `/` y `/torns`.

`SiteNav`: `{!torns && <Link to="/plan" className={plan ? "active" : undefined}>{copy.navPlan}</Link>}` no: el enlace Plan siempre visible, también desde TORNS. Orden: Empresa, Plan, TORNS, Contacto. `plan` pathname includes `"plan"` para `active`. Wordmark sigue `on={torns ? "dark" : "light"}` (Plan usa skin LIRN, nav blanca).

No cambiar `SiteSkin`.

- [ ] **Step 4: Run tests**

Run: `cd lirn-web-main && npm test`

Expected: PASS, incluidos `HomePage.test.tsx` y `TornsPage.test.tsx` sin cambios de copy.

- [ ] **Step 5: Commit**

Skip unless the user asked.

---

### Task 7: Build, claims finales y verificación en navegador

**Files:**
- Modify only if tests o CSS de viewport estrecho fallan: `lirn-web-main/src/styles/site.css`, `PlanPage.tsx`

**Interfaces:**
- Consumes: Tasks 1–6.
- Produces: `/plan` usable en desktop y móvil.

- [x] **Step 1: Full unit suite and production build**

Run: `cd lirn-web-main && npm test && npm run build`

Expected: exit 0. El JS bundle no necesita el markdown.

- [x] **Step 2: Browser pass (desktop y ~390px)**

Arrancar `npm run dev` en `lirn-web-main`. Abrir `/plan` (basename `/lirn-web-main/plan`).

Comprobar:

1. Autoplay: si el SO no pide reduced motion, avanza sola; Pausa congela; Reproducir sigue.
2. Riel y flechas pausan y cambian escena. Espacio pausa/reanuda.
3. `/plan#cierre` aterriza en Cierre, en pausa, con Ver TORNS y Hablemos.
4. Nav: Empresa, Plan, TORNS, Contacto. Home y `/torns` intactos.
5. Firma y Cierre muestran wordmark oficial. Producto tiene velo TORNS, el resto negro/blanco.
6. Códigos al margen con nombre. Texto = guion. Sin partículas.
7. Viewport estrecho: riel wrap, texto 65ch, controles usables, foto recortada.
8. Reduced motion (emulación DevTools): sin autoplay, cambio instantáneo.

Si un defecto de layout aparece, corregirlo en `.page-plan` y re-correr `npm test`.

- [x] **Step 3: Commit**

Skip unless the user asked. Omitido: no se pidió.

---

## Self-review

| Spec | Task |
|------|------|
| Guion canónico 4:00 y códigos al margen | 1, 2 |
| `PLAN_BEATS` fuente única, 240000 ms | 1 |
| Markdown `docs/presentations/lirn-plan-guion-4min.md` | 2 |
| Autoplay, pausa, riel, hash, reduced motion, no loop | 3, 6 |
| `/plan`, nav Plan, skin LIRN | 6 |
| Siete composiciones visuales | 5 |
| PlanControls, no tocar StageControls | 4 |
| Claims prohibidos / una persona | 1 tests |
| CTA cierre `/torns` y `/torns#contacto` | 5, 6 |
| Pruebas de página, hook, nav | 3, 4, 5, 6 |
| Browser desktop + estrecho | 7 |
| Sin audio, sin concept-seed, sin cambiar home/`/torns` | Constraints + 6 |

Tipos alineados: `PlanBeatId`, `goTo(id)`, `formatPlanMargin`, `copy.navPlan` / `controlPlay` / `controlPause` / `planAria` / `planTimeLabel`.
