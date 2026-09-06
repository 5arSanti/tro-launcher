# LIRN vibrant corporate + TORNS microsite Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the luxury-editorial AI-default look with a vibrant corporate LIRN brochure and a denser blue TORNS product microsite (scroll-story), then restyle `tro-frontend` to the TORNS blue skin.

**Architecture:** Spec `docs/superpowers/specs/2026-09-05-lirn-corporate-vibrant-redesign.md`. Approach 2: shared sans/radii family; LIRN amber/navy brochure vs TORNS civic-blue microsite. Theme via `data-theme="lirn"|"torns"`. New `Esencia` and `ProductStory` components. Submodule commits in `lirn-web-main` / `tro-frontend`, then parent pointer updates.

**Tech Stack:** React 19, Vite 7, React Router 7, TypeScript, CSS variables, Vitest + Testing Library, GitHub Pages (`base` `/lirn-web-main/`).

## Global Constraints

- Spec authority: `docs/superpowers/specs/2026-09-05-lirn-corporate-vibrant-redesign.md`.
- Idioma: español. Preserve approved mission, vision, problem, solution, limit copy.
- CTA **Hablemos** allowed; no “comprar”, fake demo, or live contact submit until a real channel exists.
- No invented logos, metrics, testimonials, cases, team, or “22 años”-style stats.
- Transmilenio = public problem context, not client/pilot.
- Anti-reference: Bodoni, champagne, frosted glass brand, night network SVG hero, Inter / Space Grotesk / Outfit / IBM Plex / Plus Jakarta / DM Sans as display defaults.
- Type: one modern sans family for display + UI — **Manrope** (Google Fonts).
- LIRN accent: amber CTAs; coral only hover/rare. TORNS: civic blues ≈ `#1B4D73` / `#3D8EC4`.
- ProductStory UI is labeled synthetic demonstration, never real-client evidence.
- `by LIRN` is endorsement, never same visual weight as TORNS.
- `lirn-web-main` and `tro-frontend` are submodules: commit there, then update parent pointer.
- Vite `base` and `BrowserRouter` basename: `/lirn-web-main/`.
- Dashboard: restyle only; do not change hooks, WebSockets, or APIs.

## File map

| File | Responsibility |
|---|---|
| `PRODUCT.md` | Brand commitments for vibrant corporate + contact |
| `docs/superpowers/specs/2026-09-05-lirn-corporate-vibrant-redesign.md` | Spec (already approved) |
| `lirn-web-main/index.html` | Manrope + direction contract comment |
| `lirn-web-main/src/styles/tokens.css` | LIRN/TORNS CSS variables |
| `lirn-web-main/src/styles/site.css` | Brochure + microsite layout system |
| `lirn-web-main/src/content/copy.ts` | Slogan, esencia labels, story labels, signal line |
| `lirn-web-main/src/components/SiteNav.tsx` | Corporate nav + amber Hablemos |
| `lirn-web-main/src/components/Esencia.tsx` | Mission / vision / slogan panel |
| `lirn-web-main/src/components/Esencia.test.tsx` | Esencia tests |
| `lirn-web-main/src/components/ProductStory.tsx` | Three-act scroll/step story |
| `lirn-web-main/src/components/ProductStory.test.tsx` | ProductStory tests |
| `lirn-web-main/src/pages/HomePage.tsx` | LIRN brochure sections |
| `lirn-web-main/src/pages/TornsPage.tsx` | TORNS microsite |
| `lirn-web-main/src/pages/HomePage.test.tsx` | Home assertions |
| `lirn-web-main/src/pages/TornsPage.test.tsx` | TORNS + story assertions |
| `lirn-web-main/src/content/copy.test.ts` | Copy policy tests |
| `tro-frontend/src/styles/tokens.css` | TORNS blue Operate tokens |
| `tro-frontend/src/App.css` | Align `--metro-*` to civic blues |
| `tro-frontend/src/styles/navbar.css` | Blue skin chrome |
| `scripts/assert-torns-tokens.mjs` | Assert blues + no cyan; amber optional on commercial |
| `DESIGN.md` | Rewritten after ship via Impeccable documenter |

---

### Task 1: Product truth + token assert alignment

**Files:**
- Modify: `PRODUCT.md`
- Modify: `scripts/assert-torns-tokens.mjs`
- Test: run `node scripts/assert-torns-tokens.mjs` from repo root (will be updated in later tasks for amber; this task only unlocks civic blue + no cyan)

**Interfaces:**
- Consumes: approved spec decisions
- Produces: PRODUCT.md brand commitments that later UI tasks must not contradict

- [ ] **Step 1: Update Brand Commitments in PRODUCT.md**

Replace the luxury-editorial / champagne commitments with:

```markdown
## Brand Commitments

- LIRN and TORNS remain endorsed brands. TORNS has its own face; “by LIRN” is manufacturer mark.
- Visual direction (2026-09-05 redesign): vibrant corporate brochure language (bold sans, solid blocks, rounded CTAs) adapted from the etraining reference structure — not a purple/orange clone, not luxury serif/champagne editorial.
- LIRN skin: navy/charcoal + amber CTAs; coral only on hover / rare emphasis.
- TORNS skin + `tro-frontend`: civic blues (~`#1B4D73` / `#3D8EC4`); denser product microsite with labeled synthetic ProductStory.
- Anti-reference: Bodoni/champagne cluster, night network SVG as hero, frosted glass as brand, TRO cyan/glow.
- CTA Hablemos / Contacto allowed. No comprar, fake demo, invented logos/metrics/testimonials/cases/team.
- Spanish. Do not reuse TRO / Sistema de Vigilancia / Transport Route Optimization.
```

Also ensure Product Purpose still allows contact CTA (already present).

- [ ] **Step 2: Align assert script for civic blues**

`scripts/assert-torns-tokens.mjs` must:

```js
import { readFileSync } from "node:fs";

const css = [
  "tro-frontend/src/App.css",
  "tro-frontend/src/styles/navbar.css",
  "tro-frontend/src/styles/dashboard.css",
  "tro-frontend/src/styles/tokens.css",
].map((file) => readFileSync(file, "utf8")).join("\n");

if (css.includes("#00a8ff")) {
  console.error("FAIL: legacy cyan remains");
  process.exit(1);
}

if (!css.includes("#3d8ec4") && !css.includes("#1b4d73") && !css.includes("var(--metro-accent)")) {
  console.error("FAIL: civic blue unused");
  process.exit(1);
}

console.log("PASS: TRO cyan removed; civic blue present");
```

- [ ] **Step 3: Commit (parent repo)**

```bash
git add PRODUCT.md scripts/assert-torns-tokens.mjs
git commit -m "Align PRODUCT and token assert with vibrant corporate redesign."
```

---

### Task 2: Tokens, fonts, and direction contract

**Files:**
- Modify: `lirn-web-main/index.html`
- Modify: `lirn-web-main/src/styles/tokens.css`
- Modify: `lirn-web-main/src/styles/site.css` (base resets only in this task if needed; full layout in Task 4–5)
- Test: `cd lirn-web-main && npm run build` (typecheck/build must succeed)

**Interfaces:**
- Consumes: Manrope + amber/coral/navy + TORNS blues from spec
- Produces: CSS variables `--navy`, `--amber`, `--coral`, `--civic`, `--civic-strong`, `--paper`, `--ink`, `--font`, `--radius-cta`, theme hooks `[data-theme="lirn"]` / `[data-theme="torns"]`

- [ ] **Step 1: Swap fonts + direction contract in index.html**

Use Manrope only. Replace the body HTML comment with:

```html
<!--
  THESIS: LIRN is a vibrant corporate mobility house; TORNS is a denser blue product microsite — not luxury serif champagne, not a flat TORNS page.
  OWN-WORLD: Bold Manrope, navy/amber (coral hover) for LIRN; civic blues for TORNS; solid blocks; rounded CTAs; etraining-like section rhythm.
  STORY: Believe LIRN, understand TORNS, start Hablemos; TORNS scroll-story shows ocupación→cámara→recomendación as labeled synthetic UI.
  FIRST VIEWPORT (LIRN): White/light nav, navy hero, short lead + large slogan, amber Hablemos + outline Ver TORNS.
  FORM: Vibrant corporate brochure + TORNS microsite · spec 2026-09-05-lirn-corporate-vibrant-redesign · approach 2.
  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->
```

Google Fonts link:

```html
<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
```

- [ ] **Step 2: Rewrite tokens.css**

```css
:root,
[data-theme="lirn"] {
  --navy: #0b1f3a;
  --navy-deep: #071526;
  --paper: #ffffff;
  --ink: #0f172a;
  --mute: #5b6575;
  --amber: #f59e0b;
  --coral: #e86b5a;
  --line: color-mix(in srgb, #0f172a 12%, transparent);
  --font: "Manrope", sans-serif;
  --radius-cta: 999px;
  --gutter: clamp(1.25rem, 4vw, 4rem);
  --rail: 4.5rem;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --accent: var(--amber);
  --accent-hover: var(--coral);
  --surface-dark: var(--navy);
}

[data-theme="torns"] {
  --navy: #0b1f3a;
  --navy-deep: #071526;
  --paper: #ffffff;
  --ink: #0f172a;
  --mute: #5b6575;
  --civic: #1b4d73;
  --civic-strong: #3d8ec4;
  --amber: #f59e0b;
  --coral: #e86b5a;
  --line: color-mix(in srgb, #e8eef6 18%, transparent);
  --font: "Manrope", sans-serif;
  --radius-cta: 999px;
  --accent: var(--civic-strong);
  --accent-hover: color-mix(in srgb, var(--civic-strong) 70%, white);
  --surface-dark: #0a1628;
}
```

Keep body/html base rules using `--font`, `--navy` background default for dark sections.

- [ ] **Step 3: Build**

```bash
cd lirn-web-main && npm run build
```

Expected: success; `dist/index.html` contains seed/thesis lines.

- [ ] **Step 4: Commit in submodule**

```bash
cd lirn-web-main
git add index.html src/styles/tokens.css
git commit -m "Introduce Manrope tokens and vibrant corporate direction contract."
```

---

### Task 3: Copy modules for brochure + story

**Files:**
- Modify: `lirn-web-main/src/content/copy.ts`
- Modify: `lirn-web-main/src/content/copy.test.ts`
- Test: `cd lirn-web-main && npx vitest run src/content/copy.test.ts`

**Interfaces:**
- Consumes: approved mission/vision strings (unchanged)
- Produces: `copy.slogan`, `copy.heroLead`, `copy.signalLine`, `copy.esenciaTitle`, `copy.whoTitle`, `copy.storyOccupation`, `copy.storyCamera`, `copy.storyRecommend`, `copy.syntheticNote`, existing CTA keys

- [ ] **Step 1: Write failing copy expectations**

In `copy.test.ts`:

```ts
it("publishes slogan and forbids buy/demo newsletter", () => {
  expect(copy.slogan).toContain("estación");
  expect(copy.ctaTalk).toBe("Hablemos");
  const blob = Object.values(copy).join(" ").toLowerCase();
  expect(blob).not.toMatch(/comprar|newsletter/);
  expect(blob).not.toMatch(/\bdemo\b/);
});

it("labels product story as synthetic", () => {
  expect(copy.syntheticNote.toLowerCase()).toMatch(/sintét|demostraci/);
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
cd lirn-web-main && npx vitest run src/content/copy.test.ts
```

- [ ] **Step 3: Extend copy.ts**

Keep all existing approved keys. Add at least:

```ts
  slogan: "Oferta que responde a la estación.",
  heroLead: "Empresa de movilidad",
  signalLine: "1 producto · sistemas masivos con estaciones",
  esenciaTitle: "Nuestra esencia",
  whoTitle: "Quiénes somos",
  whoBody:
    "LIRN es una empresa de movilidad. Ofrecemos TORNS para medir demanda real en estación y recomendar oferta al centro de control.",
  verTorns: "Ver TORNS",
  storyTitle: "Cómo opera TORNS",
  storyOccupation: "Ve la ocupación.",
  storyCamera: "Ve la cámara con detección.",
  storyRecommend: "Recibe la recomendación.",
  syntheticNote: "Demostración sintética del producto. No es un piloto ni un cliente.",
```

Keep `mission`, `vision`, `whyTitle`, `whyBody`, `whyFoot`, `solutionTitle`, `solutionBody`, `limit`, `ctaTalk`, `byLirn`, facts, etc.

- [ ] **Step 4: Run tests — expect PASS**

```bash
cd lirn-web-main && npx vitest run src/content/copy.test.ts
```

- [ ] **Step 5: Commit submodule**

```bash
cd lirn-web-main
git add src/content/copy.ts src/content/copy.test.ts
git commit -m "Add brochure and ProductStory copy keys."
```

---

### Task 4: Esencia component (TDD)

**Files:**
- Create: `lirn-web-main/src/components/Esencia.tsx`
- Create: `lirn-web-main/src/components/Esencia.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css` (`.esencia` panel styles)

**Interfaces:**
- Consumes: `copy.esenciaTitle`, `copy.mission`, `copy.vision`, `copy.slogan`, optional `href` string
- Produces: `<Esencia href?: string />` rendering title, slogan, mission, vision, and optional “Conoce más” link

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import { Esencia } from "./Esencia";
import { copy } from "../content/copy";

it("shows essence title, slogan, mission, and vision", () => {
  render(
    <MemoryRouter>
      <Esencia href="/torns" />
    </MemoryRouter>,
  );
  expect(screen.getByText(copy.esenciaTitle)).toBeInTheDocument();
  expect(screen.getByText(copy.slogan)).toBeInTheDocument();
  expect(screen.getByText(copy.mission)).toBeInTheDocument();
  expect(screen.getByText(copy.vision)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /conoce más/i })).toHaveAttribute(
    "href",
    "/torns",
  );
});
```

- [ ] **Step 2: Run — expect FAIL**

```bash
cd lirn-web-main && npx vitest run src/components/Esencia.test.tsx
```

- [ ] **Step 3: Implement Esencia.tsx + amber panel CSS**

```tsx
import { Link } from "react-router-dom";
import { copy } from "../content/copy";

export function Esencia({ href }: { href?: string }) {
  return (
    <section className="esencia" aria-labelledby="esencia-title">
      <h2 id="esencia-title">{copy.esenciaTitle}</h2>
      <p className="esencia-slogan">{copy.slogan}</p>
      <div className="esencia-grid">
        <div>
          <h3>Misión</h3>
          <p>{copy.mission}</p>
        </div>
        <div>
          <h3>Visión</h3>
          <p>{copy.vision}</p>
        </div>
      </div>
      {href ? (
        <Link className="btn-primary" to={href}>
          Conoce más →
        </Link>
      ) : null}
    </section>
  );
}
```

CSS: large amber (or amber-gradient) rounded panel on paper section; white text; two-column misión/visión on desktop.

- [ ] **Step 4: Run — expect PASS**

```bash
cd lirn-web-main && npx vitest run src/components/Esencia.test.tsx
```

- [ ] **Step 5: Commit submodule**

```bash
cd lirn-web-main
git add src/components/Esencia.tsx src/components/Esencia.test.tsx src/styles/site.css
git commit -m "Add Esencia panel for mission, vision, and slogan."
```

---

### Task 5: ProductStory component (TDD)

**Files:**
- Create: `lirn-web-main/src/components/ProductStory.tsx`
- Create: `lirn-web-main/src/components/ProductStory.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css`

**Interfaces:**
- Consumes: `copy.storyTitle`, `copy.storyOccupation`, `copy.storyCamera`, `copy.storyRecommend`, `copy.syntheticNote`
- Produces: `<ProductStory />` with three acts; active act via click; `aria-current` on active step; synthetic note visible

- [ ] **Step 1: Failing test**

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { ProductStory } from "./ProductStory";
import { copy } from "../content/copy";

it("walks three synthetic acts", async () => {
  const user = userEvent.setup();
  render(<ProductStory />);
  expect(screen.getByText(copy.storyTitle)).toBeInTheDocument();
  expect(screen.getByText(copy.syntheticNote)).toBeInTheDocument();
  expect(screen.getByText(copy.storyOccupation)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /cámara|02/i }));
  expect(screen.getByText(copy.storyCamera)).toBeInTheDocument();
  await user.click(screen.getByRole("button", { name: /recomend|03/i }));
  expect(screen.getByText(copy.storyRecommend)).toBeInTheDocument();
});
```

If `@testing-library/user-event` is missing, add it as a devDependency in this task before Step 2.

- [ ] **Step 2: Run — expect FAIL**

```bash
cd lirn-web-main && npx vitest run src/components/ProductStory.test.tsx
```

- [ ] **Step 3: Implement ProductStory**

Minimal structure:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";

const ACTS = [
  { id: "occupation", label: "01 Ocupación", body: () => copy.storyOccupation, panel: "occupation" },
  { id: "camera", label: "02 Cámara", body: () => copy.storyCamera, panel: "camera" },
  { id: "recommend", label: "03 Recomendación", body: () => copy.storyRecommend, panel: "recommend" },
] as const;

export function ProductStory() {
  const [active, setActive] = useState(0);
  const act = ACTS[active];
  return (
    <section id="producto-vivo" className="product-story" data-theme="torns">
      <h2>{copy.storyTitle}</h2>
      <p className="synthetic-note">{copy.syntheticNote}</p>
      <div className="product-story-steps" role="tablist">
        {ACTS.map((a, i) => (
          <button
            key={a.id}
            type="button"
            role="tab"
            aria-selected={i === active}
            aria-current={i === active ? "step" : undefined}
            onClick={() => setActive(i)}
          >
            {a.label}
          </button>
        ))}
      </div>
      <div className={`product-story-panel is-${act.panel}`} role="tabpanel">
        <p>{act.body()}</p>
        {/* Synthetic UI chrome: meters / frame / dispatch card — CSS-only, labeled */}
      </div>
    </section>
  );
}
```

Add CSS for blue panels, fake occupancy bar, fake camera frame, fake recommendation card. Include `scroll-margin` on `#producto-vivo`. Optional: IntersectionObserver to sync active step on scroll — nice-to-have; clickable steps are required.

- [ ] **Step 4: Run — expect PASS**

```bash
cd lirn-web-main && npx vitest run src/components/ProductStory.test.tsx
```

- [ ] **Step 5: Commit submodule**

```bash
cd lirn-web-main
git add src/components/ProductStory.tsx src/components/ProductStory.test.tsx src/styles/site.css package.json package-lock.json
git commit -m "Add TORNS ProductStory with three synthetic acts."
```

---

### Task 6: Rebuild SiteNav + HomePage brochure

**Files:**
- Modify: `lirn-web-main/src/components/SiteNav.tsx`
- Modify: `lirn-web-main/src/pages/HomePage.tsx`
- Modify: `lirn-web-main/src/pages/HomePage.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css`
- Test: `cd lirn-web-main && npx vitest run src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `Esencia`, `copy.*`, tokens
- Produces: LIRN home matching spec section order; `data-theme="lirn"` on `<main>`

- [ ] **Step 1: Update HomePage test**

Keep mission/vision/`by Lirn`/TORNS link assertions. Add:

```ts
expect(screen.getByText(copy.slogan)).toBeInTheDocument();
expect(screen.getByText(copy.esenciaTitle)).toBeInTheDocument();
expect(screen.getByText(copy.signalLine)).toBeInTheDocument();
expect(screen.getAllByRole("link", { name: copy.ctaTalk }).length).toBeGreaterThan(0);
expect(screen.queryByRole("button")).not.toBeInTheDocument(); // CTAs are links
```

- [ ] **Step 2: Run — expect FAIL** (missing sections)

```bash
cd lirn-web-main && npx vitest run src/pages/HomePage.test.tsx
```

- [ ] **Step 3: Implement SiteNav + HomePage + brochure CSS**

SiteNav: light bar on LIRN (white), links Empresa (`/#empresa` via `Link` hash), TORNS, Hablemos (`/#contacto`). Amber pill CTA.

HomePage sections in order: hero (navy, slogan, Hablemos + Ver TORNS) → signal → `<Esencia href="/torns" />` → quiénes somos → producto TORNS → problema → contacto (pending note, no fake submit) → footer.

Remove NetworkDiagram from Home. Remove Bodoni-era classes.

- [ ] **Step 4: Run page tests + full suite subset**

```bash
cd lirn-web-main && npx vitest run src/pages/HomePage.test.tsx src/components/Esencia.test.tsx
```

Expected: PASS

- [ ] **Step 5: Commit submodule**

```bash
cd lirn-web-main
git add src/components/SiteNav.tsx src/pages/HomePage.tsx src/pages/HomePage.test.tsx src/styles/site.css
git commit -m "Rebuild LIRN home as vibrant corporate brochure."
```

---

### Task 7: Rebuild TornsPage microsite

**Files:**
- Modify: `lirn-web-main/src/pages/TornsPage.tsx`
- Modify: `lirn-web-main/src/pages/TornsPage.test.tsx`
- Modify: `lirn-web-main/src/styles/site.css`
- Test: `cd lirn-web-main && npx vitest run src/pages/TornsPage.test.tsx`

**Interfaces:**
- Consumes: `ProductStory`, `InfographicSlot`, `ByLirn`, `copy.*`
- Produces: `/torns` with `data-theme="torns"`; hero → problem → ProductStory → capabilities → limit → close → infographic slot

- [ ] **Step 1: Extend TornsPage test**

Keep existing assertions. Add:

```ts
expect(screen.getByText(copy.storyTitle)).toBeInTheDocument();
expect(screen.getByText(copy.syntheticNote)).toBeInTheDocument();
expect(screen.getByRole("button", { name: /01|ocupación/i })).toBeInTheDocument();
```

- [ ] **Step 2: Run — expect FAIL**

```bash
cd lirn-web-main && npx vitest run src/pages/TornsPage.test.tsx
```

- [ ] **Step 3: Implement denser blue microsite page**

Wire `ProductStory`. Civic blue hero (solid or photographic with blue overlay — if reusing photos, retint via CSS overlay; do not keep champagne editorial styling). Capabilities list from `cap1`–`cap4`. Limit + close + Hablemos link to `/?#contacto` or `/#contacto` via React Router `Link`.

- [ ] **Step 4: Full lirn-web-main test + build**

```bash
cd lirn-web-main && npm test && npm run build
```

Expected:  all tests PASS; build OK; contract comment in `dist/index.html`.

- [ ] **Step 5: Commit submodule**

```bash
cd lirn-web-main
git add src/pages/TornsPage.tsx src/pages/TornsPage.test.tsx src/styles/site.css
git commit -m "Rebuild TORNS microsite with ProductStory."
```

---

### Task 8: tro-frontend TORNS blue Operate skin

**Files:**
- Modify: `tro-frontend/src/styles/tokens.css`
- Modify: `tro-frontend/src/App.css` (`--metro-*`)
- Modify: `tro-frontend/src/styles/navbar.css`
- Modify: `tro-frontend/src/styles/dashboard.css` (accent borders to civic blue; no champagne)
- Test: `node scripts/assert-torns-tokens.mjs` from repo root

**Interfaces:**
- Consumes: civic blue tokens
- Produces: Operate UI without amber LIRN brochure accents; no `#00a8ff`

- [ ] **Step 1: Set tokens to civic blues**

```css
:root {
  --paper: #f3f4f2;
  --graphite: #3a4250;
  --ink: #141820;
  --civic: #1b4d73;
  --civic-strong: #3d8ec4;
  --line: #c5c8ce;
  --night: #0b1f3a;
  --night-panel: #12263f;
  --ok: #2f7d4a;
  --warn: #c4922a;
  --fail: #b33a32;
  --font-num: ui-monospace, "Fragment Mono", monospace;
}
```

Align `--metro-primary/#1b4d73`, `--metro-accent/#3d8ec4`, `--metro-dark/#0b1f3a`, `--metro-gray/#12263f`.

Navbar logo: civic border/background, not champagne.

- [ ] **Step 2: Run assert**

```bash
cd /home/personal/Projects/tro-launcher && node scripts/assert-torns-tokens.mjs
```

Expected: `PASS: TRO cyan removed; civic blue present`

- [ ] **Step 3: Commit submodule + parent pointer prep**

```bash
cd tro-frontend
git add src/styles/tokens.css src/App.css src/styles/navbar.css src/styles/dashboard.css
git commit -m "Restyle Operate UI to TORNS civic blue skin."
```

---

### Task 9: Parent pointers, review screenshots, DESIGN.md

**Files:**
- Modify: parent gitlinks for `lirn-web-main`, `tro-frontend`
- Create/update: `.impeccable/review/desktop.png`, `mobile.png`, `desktop-torns.png`, story act crops if useful
- Modify: `DESIGN.md` via Impeccable documenter after visual ship
- Test: `cd lirn-web-main && npm test && npm run build`; preview screenshots

**Interfaces:**
- Consumes: shipped landings
- Produces: parent commits + DESIGN.md matching Manrope/amber/blue world

- [ ] **Step 1: Update parent submodule pointers**

```bash
cd /home/personal/Projects/tro-launcher
git add lirn-web-main tro-frontend PRODUCT.md scripts/assert-torns-tokens.mjs
git commit -m "Point submodules at vibrant corporate LIRN and blue TORNS skins."
```

- [ ] **Step 2: Preview + screenshots**

```bash
cd lirn-web-main && npm run build && npm run preview -- --host 127.0.0.1 --port 4173
# separate shell:
npx playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4173/lirn-web-main/ .impeccable/review/desktop.png
npx playwright screenshot --viewport-size=390,844 http://127.0.0.1:4173/lirn-web-main/ .impeccable/review/mobile.png
npx playwright screenshot --viewport-size=1440,900 http://127.0.0.1:4173/lirn-web-main/torns .impeccable/review/desktop-torns.png
```

- [ ] **Step 3: Detector + finish handoff**

```bash
node /home/personal/.cursor/skills/impeccable/scripts/detect.mjs --json lirn-web-main/src/pages/HomePage.tsx lirn-web-main/src/pages/TornsPage.tsx lirn-web-main/src/styles/site.css
```

Then spawn impeccable-finish-reviewer with screenshots + direction contract; apply fix disposition once; spawn impeccable-documenter to replace `DESIGN.md`.

- [ ] **Step 4: Commit DESIGN.md on parent**

```bash
git add DESIGN.md .impeccable/design.json
git commit -m "Document vibrant corporate design system from shipped landings."
```

---

## Spec coverage check

| Spec requirement | Task |
|---|---|
| Vibrant corporate / etraining language | 2, 4, 6 |
| LIRN amber + coral hover | 2, 6 |
| TORNS civic blues + microsite density | 2, 5, 7 |
| Esencia mission/vision/slogan | 3, 4, 6 |
| ProductStory Occupación→Cámara→Recomendación | 5, 7 |
| Honest signal / no fake metrics | 3, 6 |
| Contact Hablemos, no fake submit | 6, 7 |
| tro-frontend blue Operate | 8 |
| Anti-slop / DESIGN.md refresh | 1, 2, 9 |

## Placeholder scan

No TBD/TODO steps. Exact paths, commands, and code included.
