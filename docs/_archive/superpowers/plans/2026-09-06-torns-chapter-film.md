# TORNS Chapter Film Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild `/torns` as a product-first chapter film: System stages, then a Transmilenio case that tells the story and presents each survey question as a morphing chart, on a lighter TORNS blue.

**Architecture:** `TornsPage` orchestrates four hashed chapters. New stage units (`ActStage`, `PipelineTrack`, `QuoteStage`, `EvidenceStage`, `ValueChart`, `ChapterRail`) own one job each. Survey values stay in `evidence.ts`. Act tags live in a static map. Tokens lift; `#00A8FF` stays energy.

**Tech Stack:** React 19, Vite 7, React Router 7, TypeScript, CSS variables, Vitest + Testing Library. No chart library. No new dependencies.

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-09-06-torns-chapter-film-design.md`.
- Parent visual world: Architectural Tech Corporate. Refine `/torns`; do not replace LIRN black/white.
- Language: Spanish. Mission and vision strings stay exact.
- CTA **Hablemos**. No comprar. No fake demo. No working send form.
- Transmilenio: caso de estudio y prototipo aplicado. Not a signed pilot.
- Evidence: team research, 17 August 2026, n=20. Values in `evidence.ts` stay identical.
- q7 hero is 25% (más de 6 h / mes). The 3-hour average stays in analysis prose only. Do not draw q7 as a 100% bar.
- No invented occupancy, live telemetry, or operator impact metrics.
- `#00A8FF` is activity. LIRN pages still must not use it as a page fill.
- New CSS classes use a `torns-` prefix so `scripts/assert-lirn-tokens.mjs` already allows TORNS activity fills.
- Official logos: do not distort or redraw.
- Home does not publish the interview, the survey, or the full Transmilenio paragraph.
- `prefers-reduced-motion: reduce` shows final values and skips interpolation.
- `lirn-web-main` is a submodule. Commit site files there. Update the parent pointer on the last site task.
- Vite `base` and `BrowserRouter` basename: `/lirn-web-main/`.
- Do not change `tro-frontend`. Do not relax `scripts/assert-torns-tokens.mjs`.

## File map

| File | Responsibility |
| --- | --- |
| `lirn-web-main/src/content/copy.ts` | Existing voice plus stage chrome labels |
| `lirn-web-main/src/content/copy.test.ts` | Mission, CTA, case frame, new labels |
| `lirn-web-main/src/content/evidence.ts` | Interview, 10 questions, conclusions. Values unchanged |
| `lirn-web-main/src/content/surveyActs.ts` | Static q→act tag map and chart form |
| `lirn-web-main/src/content/surveyActs.test.ts` | Map contract |
| `lirn-web-main/src/styles/tokens.css` | Lifted TORNS blues + `--torns-air` |
| `scripts/assert-lirn-tokens.mjs` | Lock the lifted hexes; keep LIRN fill ban |
| `lirn-web-main/src/components/ValueChart.tsx` | Dual / hero / peaks / ranking |
| `lirn-web-main/src/components/ValueChart.test.tsx` | Final values and q7 ≠ 100% |
| `lirn-web-main/src/hooks/usePrefersReducedMotion.ts` | Reduced-motion flag |
| `lirn-web-main/src/components/ActStage.tsx` | Four product acts in one frame |
| `lirn-web-main/src/components/PipelineTrack.tsx` | Six steps that ignite |
| `lirn-web-main/src/components/QuoteStage.tsx` | One interview turn |
| `lirn-web-main/src/components/EvidenceStage.tsx` | One survey question + chart |
| `lirn-web-main/src/components/ChapterRail.tsx` | Product / Sistema / Caso / Cierre |
| `lirn-web-main/src/components/InterviewBlock.tsx` | Case chrome around `QuoteStage` |
| `lirn-web-main/src/components/SurveyBlock.tsx` | Case chrome around `EvidenceStage` |
| `lirn-web-main/src/pages/TornsPage.tsx` | Chapter order |
| `lirn-web-main/src/styles/site.css` | Stage layout and motion |
| `PRODUCT.md` / `DESIGN.md` | Lifted palette and chapter film |

---

### Task 1: Stage copy labels

**Files:**
- Modify: `lirn-web-main/src/content/copy.ts`
- Modify: `lirn-web-main/src/content/copy.test.ts`

**Interfaces:**
- Consumes: existing `copy` object
- Produces: `copy` also exports `chapterProduct`, `chapterSystem`, `chapterCase`, `chapterClose`, `questionProgress`, `controlPrev`, `controlNext`, `detectHint`, `actEspera`, `actVe`, `actMide`, `actActua`

- [ ] **Step 1: Write the failing label test**

Add this case to `lirn-web-main/src/content/copy.test.ts` (keep the existing four tests):

```ts
  it("names the TORNS chapter film chrome", () => {
    expect(copy.chapterProduct).toBe("Producto");
    expect(copy.chapterSystem).toBe("Sistema");
    expect(copy.chapterCase).toBe("Caso");
    expect(copy.chapterClose).toBe("Cierre");
    expect(copy.questionProgress).toBe("Pregunta {n} de 10");
    expect(copy.controlPrev).toBe("Anterior");
    expect(copy.controlNext).toBe("Siguiente");
    expect(copy.detectHint).toBe("Detección, no un conteo de operador.");
    expect(copy.actEspera).toBe("Espera");
    expect(copy.actVe).toBe("Ve");
    expect(copy.actMide).toBe("Mide");
    expect(copy.actActua).toBe("Actúa");
  });
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: FAIL — missing keys on `copy`.

- [ ] **Step 3: Add the keys**

Append these fields to `copy` in `lirn-web-main/src/content/copy.ts` before `notFound`. Do not change mission, vision, case, story, system, or evidence sentences.

```ts
  chapterProduct: "Producto",
  chapterSystem: "Sistema",
  chapterCase: "Caso",
  chapterClose: "Cierre",
  questionProgress: "Pregunta {n} de 10",
  controlPrev: "Anterior",
  controlNext: "Siguiente",
  detectHint: "Detección, no un conteo de operador.",
  actEspera: "Espera",
  actVe: "Ve",
  actMide: "Mide",
  actActua: "Actúa",
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/content/copy.test.ts`

Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/content/copy.ts src/content/copy.test.ts
git commit -m "Add TORNS chapter-film chrome labels."
```

---

### Task 2: Lifted TORNS tokens

**Files:**
- Modify: `lirn-web-main/src/styles/tokens.css`
- Modify: `scripts/assert-lirn-tokens.mjs`

**Interfaces:**
- Consumes: existing `--torns-deep`, `--torns-mid`, `--torns-panel`, `--activity`
- Produces: `--torns-deep: #0a3a5c`, `--torns-mid: #135a84`, `--torns-panel: #1c7aad`, `--torns-air: #e8f4fb`. `--activity` stays `#00a8ff`.

- [ ] **Step 1: Write the failing assert checks**

After the amber check in `scripts/assert-lirn-tokens.mjs`, add:

```js
if (!lower.includes("--torns-air") || !lower.includes("#e8f4fb")) {
  console.error("FAIL: --torns-air #e8f4fb missing");
  process.exit(1);
}

if (!lower.includes("#0a3a5c") || !lower.includes("#135a84") || !lower.includes("#1c7aad")) {
  console.error("FAIL: lifted TORNS deep/mid/panel missing");
  process.exit(1);
}

if (lower.includes("#031422") || lower.includes("#06263d")) {
  console.error("FAIL: cave TORNS blues remain");
  process.exit(1);
}
```

- [ ] **Step 2: Run the assert to verify it fails**

Run: `node scripts/assert-lirn-tokens.mjs`

Expected: FAIL — `--torns-air #e8f4fb missing` or lifted blues missing.

- [ ] **Step 3: Update tokens**

In `lirn-web-main/src/styles/tokens.css` replace the three TORNS lines and add air:

```css
  --torns-deep: #0a3a5c;
  --torns-mid: #135a84;
  --torns-panel: #1c7aad;
  --torns-air: #e8f4fb;
```

Do not change `--activity`, `--activity-ink`, `--black`, or `--white`.

- [ ] **Step 4: Run the assert and the dashboard assert**

Run:

```bash
node scripts/assert-lirn-tokens.mjs
node scripts/assert-torns-tokens.mjs
```

Expected: first prints `PASS: LIRN tokens are black/white with activity blue`. Second still PASSes. Do not edit the dashboard script if it fails for a reason other than this task — stop and report.

- [ ] **Step 5: Commit**

```bash
git add lirn-web-main/src/styles/tokens.css scripts/assert-lirn-tokens.mjs
git commit -m "Lift TORNS blues and lock --torns-air."
```

Commit the token file inside the submodule too if that repo tracks it:

```bash
cd lirn-web-main
git add src/styles/tokens.css
git commit -m "Lift TORNS blues and add --torns-air."
```

---

### Task 3: Survey act map and chart form

**Files:**
- Create: `lirn-web-main/src/content/surveyActs.ts`
- Create: `lirn-web-main/src/content/surveyActs.test.ts`

**Interfaces:**
- Consumes: `copy.actEspera`, `copy.actVe`, `copy.actMide`, `copy.actActua`; question ids `q1`–`q10`
- Produces:

```ts
export type ActTag = "Espera" | "Ve" | "Mide" | "Actúa";
export type ChartForm = "hero" | "dual" | "peaks" | "ranking";
export const SURVEY_ACT_TAGS: Record<string, ActTag>;
export function chartFormFor(id: string): ChartForm;
```

- [ ] **Step 1: Write the failing map tests**

Create `lirn-web-main/src/content/surveyActs.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { evidence } from "./evidence";
import { SURVEY_ACT_TAGS, chartFormFor } from "./surveyActs";

describe("surveyActs", () => {
  it("tags every survey question with a System act", () => {
    expect(SURVEY_ACT_TAGS).toEqual({
      q1: "Espera",
      q2: "Espera",
      q3: "Espera",
      q4: "Ve",
      q5: "Ve",
      q6: "Mide",
      q7: "Mide",
      q8: "Actúa",
      q9: "Mide",
      q10: "Actúa",
    });
    for (const question of evidence.questions) {
      expect(SURVEY_ACT_TAGS[question.id]).toBeDefined();
    }
  });

  it("picks the locked chart form per question", () => {
    expect(chartFormFor("q5")).toBe("hero");
    expect(chartFormFor("q7")).toBe("hero");
    expect(chartFormFor("q2")).toBe("peaks");
    expect(chartFormFor("q8")).toBe("ranking");
    expect(chartFormFor("q10")).toBe("ranking");
    expect(chartFormFor("q1")).toBe("dual");
    expect(chartFormFor("q3")).toBe("dual");
    expect(chartFormFor("q4")).toBe("dual");
    expect(chartFormFor("q6")).toBe("dual");
    expect(chartFormFor("q9")).toBe("dual");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/content/surveyActs.test.ts`

Expected: FAIL — cannot find module `./surveyActs`.

- [ ] **Step 3: Implement the map**

Create `lirn-web-main/src/content/surveyActs.ts`:

```ts
export type ActTag = "Espera" | "Ve" | "Mide" | "Actúa";
export type ChartForm = "hero" | "dual" | "peaks" | "ranking";

export const SURVEY_ACT_TAGS: Record<string, ActTag> = {
  q1: "Espera",
  q2: "Espera",
  q3: "Espera",
  q4: "Ve",
  q5: "Ve",
  q6: "Mide",
  q7: "Mide",
  q8: "Actúa",
  q9: "Mide",
  q10: "Actúa",
};

export function chartFormFor(id: string): ChartForm {
  if (id === "q5" || id === "q7") {
    return "hero";
  }
  if (id === "q2") {
    return "peaks";
  }
  if (id === "q8" || id === "q10") {
    return "ranking";
  }
  return "dual";
}
```

Do not import or edit `evidence.ts`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/content/surveyActs.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/content/surveyActs.ts src/content/surveyActs.test.ts
git commit -m "Map survey questions to System acts and chart forms."
```

---

### Task 4: ValueChart

**Files:**
- Create: `lirn-web-main/src/hooks/usePrefersReducedMotion.ts`
- Create: `lirn-web-main/src/components/ValueChart.tsx`
- Create: `lirn-web-main/src/components/ValueChart.test.tsx`

**Interfaces:**
- Consumes: `ChartForm` from `../content/surveyActs`; `evidence.questions[*].bars`
- Produces:

```ts
export type ChartBar = { label: string; value: number };

export function ValueChart(props: {
  form: ChartForm;
  bars: readonly ChartBar[];
  previousBars?: readonly ChartBar[];
  reduceMotion?: boolean;
}): JSX.Element;
```

Each fill node has `data-value="{n}"` and `className="torns-chart-fill"`. Hero number has `data-hero="{n}"`.

- [ ] **Step 1: Write the failing chart tests**

Create `lirn-web-main/src/components/ValueChart.test.tsx`:

```ts
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { evidence } from "../content/evidence";
import { ValueChart } from "./ValueChart";

const q1 = evidence.questions[0];
const q5 = evidence.questions[4];
const q7 = evidence.questions[6];

it("sets dual-bar data-value to the evidence percentages", () => {
  const { container } = render(
    <ValueChart form="dual" bars={q1.bars} reduceMotion />,
  );
  const fills = container.querySelectorAll(".torns-chart-fill");
  expect(fills).toHaveLength(2);
  expect(fills[0]?.getAttribute("data-value")).toBe("50");
  expect(fills[1]?.getAttribute("data-value")).toBe("30");
  expect(screen.getByText("3 o más veces por semana")).toBeInTheDocument();
});

it("renders q5 as a 65 hero and q7 as a 25 hero, never 100", () => {
  const five = render(
    <ValueChart form="hero" bars={q5.bars} reduceMotion />,
  );
  expect(five.container.querySelector("[data-hero]")?.getAttribute("data-hero")).toBe(
    "65",
  );
  five.unmount();

  const seven = render(
    <ValueChart form="hero" bars={q7.bars} reduceMotion />,
  );
  expect(seven.container.querySelector("[data-hero]")?.getAttribute("data-hero")).toBe(
    "25",
  );
  expect(seven.container.querySelector('[data-value="100"]')).toBeNull();
  expect(seven.container.querySelector(".torns-chart-fill")?.getAttribute("data-value")).toBe(
    "25",
  );
});

it("uses previousBars only as the start, then lands on the new value", () => {
  const { container } = render(
    <ValueChart
      form="dual"
      bars={[{ label: "A", value: 80 }]}
      previousBars={[{ label: "A", value: 20 }]}
      reduceMotion
    />,
  );
  expect(container.querySelector(".torns-chart-fill")?.getAttribute("data-value")).toBe(
    "80",
  );
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/ValueChart.test.tsx`

Expected: FAIL — cannot find module `./ValueChart`.

- [ ] **Step 3: Implement the hook and the chart**

Create `lirn-web-main/src/hooks/usePrefersReducedMotion.ts`:

```ts
import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}
```

Create `lirn-web-main/src/components/ValueChart.tsx`:

```tsx
import { useEffect, useState } from "react";
import type { ChartForm } from "../content/surveyActs";

export type ChartBar = { label: string; value: number };

export function ValueChart({
  form,
  bars,
  previousBars,
  reduceMotion = false,
}: {
  form: ChartForm;
  bars: readonly ChartBar[];
  previousBars?: readonly ChartBar[];
  reduceMotion?: boolean;
}) {
  const initial = reduceMotion
    ? bars.map((bar) => bar.value)
    : (previousBars?.map((bar) => bar.value) ?? bars.map(() => 0));
  const [shown, setShown] = useState<number[]>(initial);

  useEffect(() => {
    if (reduceMotion) {
      setShown(bars.map((bar) => bar.value));
      return;
    }
    const frame = window.requestAnimationFrame(() => {
      setShown(bars.map((bar) => bar.value));
    });
    return () => window.cancelAnimationFrame(frame);
  }, [bars, reduceMotion]);

  if (form === "hero") {
    const bar = bars[0];
    if (!bar) {
      return <p className="torns-chart-fallback">{bars.length}</p>;
    }
    return (
      <div className="torns-chart torns-chart-hero">
        <p className="torns-chart-hero-number" data-hero={bar.value}>
          {bar.value}%
        </p>
        <p>{bar.label}</p>
        <div
          className="torns-chart-fill"
          data-value={bar.value}
          style={{ width: `${shown[0] ?? bar.value}%` }}
        />
      </div>
    );
  }

  return (
    <ul className={`torns-chart torns-chart-${form}`}>
      {bars.map((bar, index) => (
        <li key={bar.label}>
          <span>{bar.label}</span>
          <span>{bar.value}%</span>
          <div
            className="torns-chart-fill"
            data-value={bar.value}
            style={{ width: `${shown[index] ?? bar.value}%` }}
          />
        </li>
      ))}
    </ul>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/ValueChart.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/hooks/usePrefersReducedMotion.ts src/components/ValueChart.tsx src/components/ValueChart.test.tsx
git commit -m "Add ValueChart that lands on evidence percentages."
```

---

### Task 5: ActStage

**Files:**
- Create: `lirn-web-main/src/components/ActStage.tsx`
- Create: `lirn-web-main/src/components/ActStage.test.tsx`

**Interfaces:**
- Consumes: `copy.storyWaitTitle` / `storySeeTitle` / `storyMeasureTitle` / `storyActTitle` and bodies; `copy.problemExpected`, `copy.problemReal`, `copy.detectHint`, `copy.controlPrev`, `copy.controlNext`; `StationPhoto`; photos `image-2.jfif`, `image-5.jfif`, `image-6.jfif`, `image-7.jfif`
- Produces: `export function ActStage(): JSX.Element` — internal index `0..3`. Previous on 0 and next on 3 are no-ops (buttons disabled). Schematic has `data-act` of `espera|ve|mide|actua`. Qualitative bars have no `%` text.

- [ ] **Step 1: Write the failing act tests**

Create `lirn-web-main/src/components/ActStage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { ActStage } from "./ActStage";

it("starts on act 1 and advances without wrapping", async () => {
  const user = userEvent.setup();
  render(<ActStage />);

  expect(screen.getByText(copy.storyWaitTitle)).toBeInTheDocument();
  expect(screen.queryByText(copy.storyActTitle)).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlPrev })).toBeDisabled();

  await user.click(screen.getByRole("button", { name: copy.controlNext }));
  expect(screen.getByText(copy.storySeeTitle)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: copy.controlNext }));
  expect(screen.getByText(copy.storyMeasureTitle)).toBeInTheDocument();
  expect(screen.getByText(copy.detectHint)).toBeInTheDocument();

  await user.click(screen.getByRole("button", { name: copy.controlNext }));
  expect(screen.getByText(copy.storyActTitle)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlNext })).toBeDisabled();

  await user.click(screen.getByRole("button", { name: copy.controlNext }));
  expect(screen.getByText(copy.storyActTitle)).toBeInTheDocument();
});

it("keeps the expected/real schematic qualitative", () => {
  const { container } = render(<ActStage />);
  expect(container.querySelector("[data-act='espera']")).not.toBeNull();
  expect(screen.getByText(copy.problemExpected)).toBeInTheDocument();
  expect(screen.getByText(copy.problemReal)).toBeInTheDocument();
  expect(container.querySelector("[data-act='espera']")?.textContent).not.toMatch(/%/);
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/ActStage.test.tsx`

Expected: FAIL — cannot find module `./ActStage`.

- [ ] **Step 3: Implement ActStage**

Create `lirn-web-main/src/components/ActStage.tsx`:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";
import { StationPhoto } from "./StationPhoto";

const ACTS = [
  {
    id: "espera",
    title: copy.storyWaitTitle,
    body: copy.storyWaitBody,
    file: "image-2.jfif",
  },
  {
    id: "ve",
    title: copy.storySeeTitle,
    body: copy.storySeeBody,
    file: "image-5.jfif",
  },
  {
    id: "mide",
    title: copy.storyMeasureTitle,
    body: copy.storyMeasureBody,
    file: "image-6.jfif",
  },
  {
    id: "actua",
    title: copy.storyActTitle,
    body: copy.storyActBody,
    file: "image-7.jfif",
  },
] as const;

export function ActStage() {
  const [index, setIndex] = useState(0);
  const act = ACTS[index] ?? ACTS[0];

  return (
    <div className="torns-act-stage">
      <StationPhoto file={act.file} className="torns-act-photo" />
      <div className="torns-act-copy">
        <p className="torns-act-index">0{index + 1}</p>
        <h3>{act.title}</h3>
        <p>{act.body}</p>
        <div className="torns-act-scheme" data-act={act.id}>
          {act.id === "espera" ? (
            <>
              <p>{copy.problemExpected}</p>
              <span className="torns-qual-bar" data-qual="expected" />
              <p className="contrast-real">{copy.problemReal}</p>
              <span className="torns-qual-bar" data-qual="real" />
            </>
          ) : null}
          {act.id === "ve" ? <span className="signal-node" aria-hidden="true" /> : null}
          {act.id === "mide" ? <p>{copy.detectHint}</p> : null}
          {act.id === "actua" ? (
            <p>
              {copy.capRecommend}: {copy.capRecommendBody}
            </p>
          ) : null}
        </div>
        <div className="torns-stage-controls">
          <button
            type="button"
            className="btn-secondary"
            disabled={index === 0}
            onClick={() => setIndex((current) => Math.max(0, current - 1))}
          >
            {copy.controlPrev}
          </button>
          <button
            type="button"
            className="btn-secondary"
            disabled={index === ACTS.length - 1}
            onClick={() => setIndex((current) => Math.min(ACTS.length - 1, current + 1))}
          >
            {copy.controlNext}
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/ActStage.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/components/ActStage.tsx src/components/ActStage.test.tsx
git commit -m "Stage the four TORNS acts in one frame."
```

---

### Task 6: PipelineTrack

**Files:**
- Create: `lirn-web-main/src/components/PipelineTrack.tsx`
- Create: `lirn-web-main/src/components/PipelineTrack.test.tsx`

**Interfaces:**
- Consumes: `copy.systemSteps`, `copy.systemStepBodies`, `copy.controlPrev`, `copy.controlNext`
- Produces: `export function PipelineTrack(): JSX.Element`. Active step has `aria-current="step"`. Body of the active step is visible. Starts at step 0. No wrap.

- [ ] **Step 1: Write the failing pipeline tests**

Create `lirn-web-main/src/components/PipelineTrack.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { PipelineTrack } from "./PipelineTrack";

it("ignites the first step and moves without wrapping", async () => {
  const user = userEvent.setup();
  render(<PipelineTrack />);

  expect(screen.getByText(copy.systemSteps[0])).toBeInTheDocument();
  expect(screen.getByText(copy.systemStepBodies[0])).toBeInTheDocument();
  expect(screen.getByRole("listitem", { current: "step" })).toHaveTextContent(
    copy.systemSteps[0],
  );

  await user.click(screen.getByRole("button", { name: copy.controlNext }));
  expect(screen.getByText(copy.systemStepBodies[1])).toBeInTheDocument();

  for (let i = 0; i < 5; i += 1) {
    await user.click(screen.getByRole("button", { name: copy.controlNext }));
  }
  expect(screen.getByText(copy.systemStepBodies[5])).toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlNext })).toBeDisabled();
});
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `cd lirn-web-main && npm test -- src/components/PipelineTrack.test.tsx`

Expected: FAIL — cannot find module `./PipelineTrack`.

- [ ] **Step 3: Implement PipelineTrack**

Create `lirn-web-main/src/components/PipelineTrack.tsx`:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";

export function PipelineTrack() {
  const [index, setIndex] = useState(0);
  const last = copy.systemSteps.length - 1;

  return (
    <div className="torns-pipeline">
      <ol className="pipeline">
        {copy.systemSteps.map((step, stepIndex) => (
          <li
            key={step}
            aria-current={stepIndex === index ? "step" : undefined}
          >
            <span className="signal-node" aria-hidden="true" />
            <strong>{step}</strong>
            {stepIndex === index ? <p>{copy.systemStepBodies[stepIndex]}</p> : null}
          </li>
        ))}
      </ol>
      <div className="torns-stage-controls">
        <button
          type="button"
          className="btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          {copy.controlPrev}
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={index === last}
          onClick={() => setIndex((current) => Math.min(last, current + 1))}
        >
          {copy.controlNext}
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `cd lirn-web-main && npm test -- src/components/PipelineTrack.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/components/PipelineTrack.tsx src/components/PipelineTrack.test.tsx
git commit -m "Add a stepped TORNS pipeline track."
```

---

### Task 7: QuoteStage inside InterviewBlock

**Files:**
- Create: `lirn-web-main/src/components/QuoteStage.tsx`
- Create: `lirn-web-main/src/components/QuoteStage.test.tsx`
- Modify: `lirn-web-main/src/components/InterviewBlock.tsx`
- Modify: `lirn-web-main/src/components/InterviewBlock.test.tsx`

**Interfaces:**
- Consumes: `evidence.turns`, `copy.controlPrev`, `copy.controlNext`
- Produces: `export function QuoteStage(): JSX.Element`. One turn at a time. Starts at 0. No wrap. `InterviewBlock` keeps the discovery heading, `evidence.label`, and `evidence.interviewRole`, then renders `QuoteStage`. Deletes the `interview-list` wall.

- [ ] **Step 1: Write the failing quote tests**

Create `lirn-web-main/src/components/QuoteStage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { QuoteStage } from "./QuoteStage";

it("shows one controller turn and reaches all eight", async () => {
  const user = userEvent.setup();
  render(<QuoteStage />);

  expect(screen.getByText(evidence.turns[0].question)).toBeInTheDocument();
  expect(screen.getByText(evidence.turns[0].answer)).toBeInTheDocument();
  expect(screen.queryByText(evidence.turns[7].question)).not.toBeInTheDocument();

  for (let i = 0; i < 7; i += 1) {
    await user.click(screen.getByRole("button", { name: copy.controlNext }));
  }
  expect(screen.getByText(evidence.turns[7].question)).toBeInTheDocument();
  expect(screen.getByText(evidence.turns[7].answer)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlNext })).toBeDisabled();
});
```

Replace `lirn-web-main/src/components/InterviewBlock.test.tsx` with:

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
  expect(screen.queryByText(evidence.turns[7].question)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd lirn-web-main && npm test -- src/components/QuoteStage.test.tsx src/components/InterviewBlock.test.tsx`

Expected: FAIL — QuoteStage missing; InterviewBlock still shows turn 7 in the list.

- [ ] **Step 3: Implement QuoteStage and slim InterviewBlock**

Create `lirn-web-main/src/components/QuoteStage.tsx`:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";

export function QuoteStage() {
  const [index, setIndex] = useState(0);
  const last = evidence.turns.length - 1;
  const turn = evidence.turns[index] ?? evidence.turns[0];

  return (
    <div className="torns-quote-stage">
      <p className="interview-q">{turn.question}</p>
      <p className="interview-a">{turn.answer}</p>
      <div className="torns-stage-controls">
        <button
          type="button"
          className="btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          {copy.controlPrev}
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={index === last}
          onClick={() => setIndex((current) => Math.min(last, current + 1))}
        >
          {copy.controlNext}
        </button>
      </div>
    </div>
  );
}
```

Replace `lirn-web-main/src/components/InterviewBlock.tsx` with:

```tsx
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { QuoteStage } from "./QuoteStage";

export function InterviewBlock() {
  return (
    <section className="band torns-discovery" aria-labelledby="discovery-title">
      <h2 id="discovery-title" className="display">
        {copy.discoveryTitle}
      </h2>
      <p className="evidence-label">{evidence.label}</p>
      <p className="lede">{evidence.interviewRole}</p>
      <QuoteStage />
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd lirn-web-main && npm test -- src/components/QuoteStage.test.tsx src/components/InterviewBlock.test.tsx`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/components/QuoteStage.tsx src/components/QuoteStage.test.tsx src/components/InterviewBlock.tsx src/components/InterviewBlock.test.tsx
git commit -m "Stage the SITP interview one turn at a time."
```

---

### Task 8: EvidenceStage inside SurveyBlock

**Files:**
- Create: `lirn-web-main/src/components/EvidenceStage.tsx`
- Create: `lirn-web-main/src/components/EvidenceStage.test.tsx`
- Modify: `lirn-web-main/src/components/SurveyBlock.tsx`
- Modify: `lirn-web-main/src/components/SurveyBlock.test.tsx`

**Interfaces:**
- Consumes: `evidence.questions`, `evidence.label`, `evidence.n`, `SURVEY_ACT_TAGS`, `chartFormFor`, `ValueChart`, `copy.questionProgress`, `copy.controlPrev`, `copy.controlNext`, `usePrefersReducedMotion`
- Produces: `export function EvidenceStage(): JSX.Element`. Starts at q1. Progress text is `Pregunta 1 de 10` through `Pregunta 10 de 10`. Act tag visible. Chart morphs via `previousBars`. `SurveyBlock` keeps the validation heading, label, `EvidenceStage`, and conclusions. Deletes the ten-card list.

- [ ] **Step 1: Write the failing evidence-stage tests**

Create `lirn-web-main/src/components/EvidenceStage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { EvidenceStage } from "./EvidenceStage";

it("stages one question, tags the act, and reaches all ten", async () => {
  const user = userEvent.setup();
  render(<EvidenceStage />);

  expect(screen.getByText("Pregunta 1 de 10")).toBeInTheDocument();
  expect(screen.getByText(copy.actEspera)).toBeInTheDocument();
  expect(screen.getByText(evidence.questions[0].title)).toBeInTheDocument();
  expect(screen.getByText(evidence.questions[0].analysis)).toBeInTheDocument();
  expect(screen.getByText(`n=${evidence.n}`)).toBeInTheDocument();
  expect(screen.queryByText(evidence.questions[9].title)).not.toBeInTheDocument();

  for (let i = 0; i < 9; i += 1) {
    await user.click(screen.getByRole("button", { name: copy.controlNext }));
  }
  expect(screen.getByText("Pregunta 10 de 10")).toBeInTheDocument();
  expect(screen.getByText(evidence.questions[9].title)).toBeInTheDocument();
  expect(screen.getByText(copy.actActua)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: copy.controlNext })).toBeDisabled();
});
```

Replace `lirn-web-main/src/components/SurveyBlock.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { SurveyBlock } from "./SurveyBlock";

it("renders the n=20 label, staged questions, charts, and conclusions", async () => {
  const user = userEvent.setup();
  render(<SurveyBlock />);
  expect(screen.getAllByText(evidence.label).length).toBeGreaterThan(0);
  expect(screen.getByText(evidence.questions[0].title)).toBeInTheDocument();
  expect(screen.getByText(evidence.conclusions)).toBeInTheDocument();
  expect(document.querySelectorAll(".torns-chart-fill").length).toBeGreaterThan(0);

  for (let i = 0; i < 6; i += 1) {
    await user.click(screen.getByRole("button", { name: copy.controlNext }));
  }
  expect(screen.getByText(evidence.questions[6].title)).toBeInTheDocument();
  expect(document.querySelector('[data-hero="25"]')).not.toBeNull();
  expect(document.querySelector('[data-value="100"]')).toBeNull();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd lirn-web-main && npm test -- src/components/EvidenceStage.test.tsx src/components/SurveyBlock.test.tsx`

Expected: FAIL — EvidenceStage missing; SurveyBlock still lists all titles and `.survey-bar-fill`.

- [ ] **Step 3: Implement EvidenceStage and slim SurveyBlock**

Create `lirn-web-main/src/components/EvidenceStage.tsx`:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { SURVEY_ACT_TAGS, chartFormFor } from "../content/surveyActs";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { ValueChart } from "./ValueChart";

export function EvidenceStage() {
  const [index, setIndex] = useState(0);
  const reduceMotion = usePrefersReducedMotion();
  const last = evidence.questions.length - 1;
  const question = evidence.questions[index] ?? evidence.questions[0];
  const previous = index > 0 ? evidence.questions[index - 1] : undefined;
  const progress = copy.questionProgress.replace("{n}", String(index + 1));

  return (
    <div className="torns-evidence-stage">
      <p className="meta">{progress}</p>
      <p className="torns-act-tag">{SURVEY_ACT_TAGS[question.id]}</p>
      <h3>{question.title}</h3>
      <p className="meta">{question.context}</p>
      <p className="prose">{question.analysis}</p>
      <p className="evidence-label">n={evidence.n}</p>
      <ValueChart
        form={chartFormFor(question.id)}
        bars={question.bars}
        previousBars={previous?.bars}
        reduceMotion={reduceMotion}
      />
      <div className="torns-stage-controls">
        <button
          type="button"
          className="btn-secondary"
          disabled={index === 0}
          onClick={() => setIndex((current) => Math.max(0, current - 1))}
        >
          {copy.controlPrev}
        </button>
        <button
          type="button"
          className="btn-secondary"
          disabled={index === last}
          onClick={() => setIndex((current) => Math.min(last, current + 1))}
        >
          {copy.controlNext}
        </button>
      </div>
    </div>
  );
}
```

Replace `lirn-web-main/src/components/SurveyBlock.tsx` with:

```tsx
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { EvidenceStage } from "./EvidenceStage";

export function SurveyBlock() {
  return (
    <section className="band torns-validation" aria-labelledby="validation-title">
      <h2 id="validation-title" className="display">
        {copy.validationTitle}
      </h2>
      <p className="evidence-label">{evidence.label}</p>
      <EvidenceStage />
      <p className="prose">{evidence.conclusions}</p>
    </section>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run: `cd lirn-web-main && npm test -- src/components/EvidenceStage.test.tsx src/components/SurveyBlock.test.tsx src/content/evidence.test.ts`

Expected: PASS. Evidence values unchanged.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/components/EvidenceStage.tsx src/components/EvidenceStage.test.tsx src/components/SurveyBlock.tsx src/components/SurveyBlock.test.tsx
git commit -m "Stage each survey question with a morphing chart."
```

---

### Task 9: ChapterRail and TornsPage assembly

**Files:**
- Create: `lirn-web-main/src/components/ChapterRail.tsx`
- Create: `lirn-web-main/src/components/ChapterRail.test.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css`

**Interfaces:**
- Consumes: all stage units; existing hero, problem, case, prototype, close copy and photos
- Produces: four chapter ids `producto`, `sistema`, `caso`, `cierre`. Order: Product → System (acts, pipeline, prototype, expected/real bridge) → Transmilenio (problem, frame, interview, survey) → Close. `ChapterRail` is a nav of four in-page links.

- [ ] **Step 1: Write the failing rail and page tests**

Create `lirn-web-main/src/components/ChapterRail.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { ChapterRail } from "./ChapterRail";

it("links the four TORNS chapters", () => {
  render(<ChapterRail />);
  expect(screen.getByRole("link", { name: copy.chapterProduct })).toHaveAttribute(
    "href",
    "#producto",
  );
  expect(screen.getByRole("link", { name: copy.chapterSystem })).toHaveAttribute(
    "href",
    "#sistema",
  );
  expect(screen.getByRole("link", { name: copy.chapterCase })).toHaveAttribute(
    "href",
    "#caso",
  );
  expect(screen.getByRole("link", { name: copy.chapterClose })).toHaveAttribute(
    "href",
    "#cierre",
  );
});
```

Replace `lirn-web-main/src/pages/TornsPage.test.tsx` with:

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { copy } from "../content/copy";
import { evidence } from "../content/evidence";
import { TornsPage } from "./TornsPage";

it("explains the product first, then the Transmilenio case and evidence", async () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <TornsPage />
    </MemoryRouter>,
  );

  const root = document.querySelector(".page-torns");
  expect(root).not.toBeNull();
  const html = root?.innerHTML ?? "";
  expect(html.indexOf('id="producto"')).toBeLessThan(html.indexOf('id="sistema"'));
  expect(html.indexOf('id="sistema"')).toBeLessThan(html.indexOf('id="caso"'));
  expect(html.indexOf(copy.storyWaitTitle)).toBeLessThan(html.indexOf(copy.problemBody));
  expect(html.indexOf(copy.problemBody)).toBeLessThan(html.indexOf(evidence.interviewRole));

  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    copy.tornsHeadline,
  );
  expect(screen.getByText(copy.byLirn)).toBeInTheDocument();
  expect(screen.getByText(copy.storyWaitTitle)).toBeInTheDocument();
  expect(screen.queryByText(copy.storyActTitle)).not.toBeInTheDocument();
  expect(screen.getByText(copy.problemBody)).toBeInTheDocument();
  expect(screen.getByText(copy.caseFrame)).toBeInTheDocument();
  expect(screen.getByText(copy.caseNotPilot)).toBeInTheDocument();
  expect(screen.getByText(copy.caseScope)).toBeInTheDocument();
  for (const step of copy.systemSteps) {
    expect(screen.getByText(step)).toBeInTheDocument();
  }
  expect(screen.getByText(copy.cap2)).toBeInTheDocument();
  expect(screen.getAllByText(evidence.label).length).toBeGreaterThan(0);
  expect(screen.getByText(evidence.interviewRole)).toBeInTheDocument();
  expect(screen.getByText(evidence.turns[0].question)).toBeInTheDocument();
  expect(screen.getByText(evidence.questions[0].title)).toBeInTheDocument();
  expect(screen.getByText(evidence.conclusions)).toBeInTheDocument();
  expect(screen.getByText(copy.close)).toBeInTheDocument();
  expect(screen.queryByText(copy.mission)).not.toBeInTheDocument();

  const systemNext = screen.getAllByRole("button", { name: copy.controlNext })[0];
  await user.click(systemNext);
  expect(screen.getByText(copy.storySeeTitle)).toBeInTheDocument();
});
```

- [ ] **Step 2: Run the tests to verify they fail**

Run: `cd lirn-web-main && npm test -- src/components/ChapterRail.test.tsx src/pages/TornsPage.test.tsx`

Expected: FAIL — ChapterRail missing; page still lists all four acts and puts the problem before the story.

- [ ] **Step 3: Implement the rail, the page, and the CSS**

Create `lirn-web-main/src/components/ChapterRail.tsx`:

```tsx
import { copy } from "../content/copy";

const CHAPTERS = [
  { id: "producto", label: copy.chapterProduct },
  { id: "sistema", label: copy.chapterSystem },
  { id: "caso", label: copy.chapterCase },
  { id: "cierre", label: copy.chapterClose },
] as const;

export function ChapterRail() {
  return (
    <nav className="torns-chapter-rail" aria-label={copy.tornsName}>
      {CHAPTERS.map((chapter) => (
        <a key={chapter.id} href={`#${chapter.id}`}>
          {chapter.label}
        </a>
      ))}
    </nav>
  );
}
```

Replace `lirn-web-main/src/pages/TornsPage.tsx` with:

```tsx
import { Link } from "react-router-dom";
import { ActStage } from "../components/ActStage";
import { BrandMark } from "../components/BrandMark";
import { ByLirn } from "../components/ByLirn";
import { ChapterRail } from "../components/ChapterRail";
import { InterviewBlock } from "../components/InterviewBlock";
import { PipelineTrack } from "../components/PipelineTrack";
import { StationPhoto } from "../components/StationPhoto";
import { SurveyBlock } from "../components/SurveyBlock";
import { copy } from "../content/copy";

const CAPABILITIES = [copy.cap1, copy.cap2, copy.cap3, copy.cap4];

export function TornsPage() {
  return (
    <main className="page page-torns">
      <ChapterRail />
      <section id="producto" className="hero-torns" aria-labelledby="torns-title">
        <div className="hero-torns-copy">
          <p className="endorsement">
            <BrandMark variant="icon" on="dark" className="mark-endorsement" />
            <span className="hero-brand">
              {copy.tornsName}
              <ByLirn />
            </span>
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
        <StationPhoto file="torns-hero.jpg" className="hero-torns-photo" />
      </section>

      <section id="sistema" className="torns-system torns-on-air" aria-labelledby="story-title">
        <h2 id="story-title" className="display">
          {copy.storyTitle}
        </h2>
        <ActStage />
        <h2 className="display">{copy.systemTitle}</h2>
        <PipelineTrack />
        <div className="system-grid">
          <div>
            <h3>{copy.capabilitiesTitle}</h3>
            <ul className="proto-list">
              {CAPABILITIES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <StationPhoto file="image-3.jfif" className="system-photo" />
        </div>
        <div className="torns-bridge contrast">
          <p>{copy.problemExpected}</p>
          <p className="contrast-real">{copy.problemReal}</p>
        </div>
      </section>

      <section id="caso" className="torns-case" aria-labelledby="problem-title">
        <div className="torns-case-story">
          <StationPhoto file="image-4.jfif" className="problem-photo" />
          <div className="problem-copy">
            <h2 id="problem-title" className="display">
              {copy.problemTitle}
            </h2>
            <p className="prose">{copy.problemBody}</p>
            <div className="contrast">
              <p>{copy.problemExpected}</p>
              <p className="contrast-real">{copy.problemReal}</p>
            </div>
          </div>
          <div className="case-copy">
            <h3 className="display">{copy.caseFrame}</h3>
            <p className="lede">{copy.caseNotPilot}</p>
            <p className="prose">{copy.caseScope}</p>
          </div>
          <StationPhoto file="image-1.jfif" className="case-photo" />
        </div>
        <InterviewBlock />
        <SurveyBlock />
      </section>

      <section id="cierre" className="torns-close torns-on-white">
        <BrandMark variant="wordmark" on="light" className="mark-close" />
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

Append these rules to `lirn-web-main/src/styles/site.css` (do not remove LIRN rules). New selectors stay `torns-` prefixed:

```css
.torns-on-air {
  background: var(--torns-air);
  color: var(--black);
}

.torns-on-air .prose,
.torns-on-air .pipeline li p,
.torns-on-air .torns-act-copy p {
  color: color-mix(in srgb, var(--black) 78%, transparent);
}

.torns-chapter-rail {
  position: sticky;
  top: 4.5rem;
  z-index: 3;
  display: flex;
  gap: 1.25rem;
  padding: 0.75rem var(--gutter);
  background: color-mix(in srgb, var(--torns-deep) 92%, transparent);
}

.torns-chapter-rail a {
  color: var(--white);
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.torns-chapter-rail a:hover,
.torns-chapter-rail a:focus-visible {
  color: var(--activity);
}

.torns-act-stage,
.torns-case-story {
  display: grid;
  grid-template-columns: minmax(16rem, 1fr) minmax(16rem, 1fr);
  gap: clamp(2rem, 6vw, 4rem);
  align-items: center;
}

.torns-act-photo {
  height: 22rem;
  transition: clip-path 400ms var(--ease);
}

.torns-qual-bar {
  display: block;
  height: 6px;
  margin: 0.4rem 0 1rem;
  background: var(--activity);
}

.torns-qual-bar[data-qual="expected"] {
  width: 42%;
  opacity: 0.45;
}

.torns-qual-bar[data-qual="real"] {
  width: 88%;
}

.torns-stage-controls {
  display: flex;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.torns-chart {
  display: grid;
  gap: 1rem;
  margin: 1.5rem 0 0;
  padding: 0;
  list-style: none;
}

.torns-chart-fill {
  height: 6px;
  background: var(--activity);
  transition: width 500ms var(--ease);
}

.torns-chart-hero-number {
  margin: 0;
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 800;
  letter-spacing: -0.05em;
  line-height: 0.9;
}

.torns-act-tag,
.torns-act-index {
  margin: 0;
  color: var(--activity-ink);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.page-torns .hero-torns-photo img,
.page-torns .problem-photo img,
.page-torns .case-photo img,
.page-torns .system-photo img,
.page-torns .torns-act-photo img {
  filter: none;
}

@media (prefers-reduced-motion: reduce) {
  .torns-chart-fill,
  .torns-act-photo,
  .signal-node {
    transition: none;
    animation: none;
  }
}

@media (max-width: 52rem) {
  .torns-act-stage,
  .torns-case-story {
    grid-template-columns: 1fr;
  }

  .torns-pipeline .pipeline {
    display: flex;
    overflow-x: auto;
  }

  .torns-pipeline .pipeline li {
    min-width: 10rem;
  }
}
```

Also add `.torns-system.torns-on-air` so the system chapter is not forced to `--torns-deep` by the existing `.torns-system` rule. After the existing `.torns-system` background rule, the later `.torns-on-air` rule must win — keep `.torns-on-air` after `.torns-system` in the file.

- [ ] **Step 4: Run page tests, full site tests, and token asserts**

Run:

```bash
cd lirn-web-main && npm test
cd .. && node scripts/assert-lirn-tokens.mjs && node scripts/assert-torns-tokens.mjs
cd lirn-web-main && npm run build
```

Expected: all site tests PASS, both asserts PASS, build PASS.

If `assert-lirn-tokens.mjs` fails because a new activity fill is not under a `torns-` selector, rename that selector so it includes `torns-`. Do not relax the LIRN fill ban.

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add src/components/ChapterRail.tsx src/components/ChapterRail.test.tsx src/pages/TornsPage.tsx src/pages/TornsPage.test.tsx src/styles/site.css
git commit -m "Assemble /torns as a product-first chapter film."
```

Then in the parent repo:

```bash
git add lirn-web-main
git commit -m "Point lirn-web-main at the TORNS chapter film."
```

---

### Task 10: Product and design truth

**Files:**
- Modify: `PRODUCT.md`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: locked token hexes and the chapter-film spine
- Produces: PRODUCT brand line and DESIGN color/direction/interaction updated to the lifted palette and `/torns` chapter film. No new product claims.

- [ ] **Step 1: Confirm the site tests still pass before editing docs**

Run: `cd lirn-web-main && npm test`

Expected: PASS. This task does not add a product-claim test; it records the world already shipped.

- [ ] **Step 2: Update PRODUCT.md brand line**

Replace the visual-direction bullet in `PRODUCT.md` with:

```md
- Visual direction (2026-09-06): Architectural Tech Corporate. LIRN is black/white with a stronger `#00A8FF` tertiary (grid, cuts, mission card, hovers). The home TORNS panel uses the TORNS palette. TORNS `/torns` is a chapter film: product, then system stages, then the Transmilenio case. Grounds use `#0a3a5c`, `#135a84`, `#1c7aad`, `#e8f4fb`, and white. Official LIRN marks stay prominent. Not luxury serif. Not the amber/navy brochure.
```

- [ ] **Step 3: Update DESIGN.md**

In the frontmatter, replace the TORNS colors and add air:

```yaml
  torns-deep: "#0a3a5c"
  torns-mid: "#135a84"
  torns-panel: "#1c7aad"
  torns-air: "#e8f4fb"
```

Replace the Direction paragraph about `/torns` with:

```md
`/torns` is a chapter film. Product first, then the system (four acts, pipeline,
prototype, expected/real bridge), then the Transmilenio case (problem, frame,
controller turns, one survey question at a time), then close. Grounds use the
lifted TORNS blues, air, and white.
```

In Color, replace the TORNS deep/mid/panel bullet with:

```md
- **TORNS deep / mid / panel / air** (`#0a3a5c`, `#135a84`, `#1c7aad`,
  `#e8f4fb`) are product grounds. White remains a TORNS surface. The LIRN
  home teaser may use the TORNS palette because it introduces the product.
```

In Interaction, replace the survey-bar sentence with:

```md
Survey charts interpolate from the previous question's values to the next
(400–700 ms) and respect reduced-motion preferences. Photo cuts between acts
and interview turns use the logo geometry (`--cut`). Pipeline nodes ignite
in a short chain. No particles, decorative glows, or ambient motion.
```

In Layout, replace the long-evidence sentence with:

```md
Long evidence is staged: one interview turn and one survey question at a
time, with a morphing chart. The six-stage pipeline is a track with one
active step.
```

In Rules, keep rule 1. Replace rule 2 with:

```md
2. TORNS structure is lifted deep / mid / panel / air / white. `#00A8FF` is energy.
```

- [ ] **Step 4: Re-run asserts so docs and tokens still agree**

Run:

```bash
node scripts/assert-lirn-tokens.mjs
node scripts/assert-torns-tokens.mjs
```

Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add PRODUCT.md DESIGN.md
git commit -m "Record the TORNS chapter-film palette and page spine."
```

---

## Self-review

**Spec coverage**

| Spec requirement | Task |
| --- | --- |
| Product → System → Case → Close | 9 |
| ChapterRail hash jump | 9 |
| Act stage + qualitative schematic | 5 |
| Pipeline ignition | 6 |
| Prototype list + image-3 | 9 |
| Expected/real bridge | 9 |
| Transmilenio story then data | 9 |
| Eight interview turns, one at a time | 7 |
| Ten survey moments, morphing charts | 4, 8 |
| Chart forms hero/dual/peaks/ranking | 3, 4, 8 |
| q7 = 25%, estimate in prose | 4, 8 |
| Act tags static map | 3, 8 |
| Lifted blues + air | 2, 10 |
| Home teaser inherits tokens | 2 (no HomePage edit) |
| Reduced motion | 4, 8, 9 |
| n=20 label, not a signed pilot | 7, 8, 9 |
| Mission/vision untouched | 1, 10 |
| Dashboard / cyan ban untouched | 2, 9 |
| No fake live occupancy object | 5 (qualitative only) |

**Placeholder scan:** no TBD, no “add tests later”, no “similar to Task N”.

**Type consistency:** `ChartForm` and `ActTag` originate in Task 3. `ValueChart` consumes `ChartForm` and `ChartBar`. `EvidenceStage` calls `chartFormFor` and `SURVEY_ACT_TAGS`. Control labels come from Task 1 `copy` keys.
