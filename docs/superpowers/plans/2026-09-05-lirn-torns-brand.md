# LIRN / TORNS Brand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publicar la autoridad visual LIRN/TORNS, el sitio comercial en GitHub Pages y el restyle del dashboard, sin conversión ni prueba inventada.

**Architecture:** `DESIGN.md` y los prompts viven en `tro-launcher`. El sitio es un repo hermano (`lirn-web-main`, hoy vacío salvo LICENSE). El dashboard se restaura en el submódulo `tro-frontend`. Copy y tokens se importan desde módulos únicos. El QR no existe hasta que el usuario entregue la URL de `/torns`.

**Tech Stack:** React 19, Vite 7, React Router 7, TypeScript, CSS variables, Vitest + Testing Library en `lirn-web-main`, GitHub Pages.

## Global Constraints

- Idioma: español.
- Sin CTA de conversión (demo, contacto, comprar, newsletter).
- Sin clientes, pilotos, alianzas, testimonios ni cifras de impacto.
- Transmilenio es problema público, no cliente. Prohibido “implementado en TransMilenio”.
- Prohibido: `#00a8ff`, glow TRO, TransMilenio rojo, vidrio, neón, Inter / Space Grotesk / Outfit / IBM Plex como display.
- Prohibido reutilizar “TRO”, “Sistema de Vigilancia”, “Transport Route Optimization”.
- `by LIRN` es aval, nunca el mismo tamaño que TORNS.
- `{{TORNS_LANDING_URL}}` no se rellena con una URL de ejemplo. Sin URL real: no generar infografía ni pintar QR.
- Sitio comercial: no llama al backend TORNS.
- Dashboard: no tocar hooks, WebSockets ni APIs. No añadir login ni enlace de conversión.
- `lirn-web-main` y `tro-frontend` son submódulos: commit ahí, luego actualizar el puntero en `tro-launcher`.
- Vite `base` y `BrowserRouter` basename: `/lirn-web-main/` (GitHub Project Pages de `5arSanti/lirn-web-main`).

## File map

| File | Responsibility |
|---|---|
| `DESIGN.md` | Autoridad visual de la familia |
| `scripts/assert-design.mjs` | Comprueba secciones obligatorias de DESIGN.md |
| `docs/brand/lirn-wordmark-prompt.md` | Prompt A cerrado |
| `docs/brand/torns-infographic-prompt.md` | Prompt B con `{{TORNS_LANDING_URL}}` |
| `lirn-web-main/src/content/copy.ts` | Todos los textos aprobados |
| `lirn-web-main/src/content/site.ts` | `tornsLandingUrl: string \| null` |
| `lirn-web-main/src/styles/tokens.css` | Tokens LIRN (papel) y TORNS (consola) |
| `lirn-web-main/src/components/SiteNav.tsx` | Nav LIRN \| TORNS |
| `lirn-web-main/src/components/Wordmark.tsx` | Fallback texto si falta el PNG |
| `lirn-web-main/src/components/ByLirn.tsx` | Aval tipográfico |
| `lirn-web-main/src/pages/HomePage.tsx` | Home institucional |
| `lirn-web-main/src/pages/TornsPage.tsx` | Landing de producto |
| `lirn-web-main/src/pages/NotFoundPage.tsx` | 404 |
| `lirn-web-main/src/components/InfographicSlot.tsx` | Infografía solo si hay URL + asset |
| `lirn-web-main/.github/workflows/pages.yml` | Deploy Pages |
| `tro-frontend/src/styles/tokens.css` | Tokens TORNS para la app |
| `tro-frontend/src/components/layout/Navbar.tsx` | Identidad TORNS by LIRN |
| `tro-frontend/src/pages/HomePage.tsx` | Badge y título de identidad |
| `scripts/assert-no-legacy-brand.mjs` | Falla si queda TRO / vigilancia |

---

### Task 1: DESIGN.md

**Files:**
- Create: `DESIGN.md`
- Create: `scripts/assert-design.mjs`

**Interfaces:**
- Consumes: spec sección 3–4; misión/visión de `PRODUCT.md`
- Produces: tokens con estos nombres exactos, que Tasks 3 y 9 copian: `--paper`, `--graphite`, `--ink`, `--civic`, `--civic-strong`, `--line`, `--night`, `--night-panel`, `--ok`, `--warn`, `--fail`. Fuente UI: `Schibsted Grotesk`. Fuente tabular: `ui-monospace, "Fragment Mono", monospace`.

- [ ] **Step 1: Write the failing assertion script**

Create `scripts/assert-design.mjs`:

```js
import { readFileSync, existsSync } from "node:fs";

const path = new URL("../DESIGN.md", import.meta.url);
if (!existsSync(path)) {
  console.error("FAIL: DESIGN.md missing");
  process.exit(1);
}

const text = readFileSync(path, "utf8");
const required = [
  "## World",
  "## Voices",
  "## Color",
  "## Type",
  "## Wordmark",
  "## Endorsement",
  "## Mission justification",
  "--paper",
  "--civic",
  "--civic-strong",
  "--night",
  "Schibsted Grotesk",
  "by LIRN",
];

const missing = required.filter((item) => !text.includes(item));
if (missing.length) {
  console.error("FAIL: missing " + missing.join(", "));
  process.exit(1);
}
console.log("PASS: DESIGN.md has required sections");
```

- [ ] **Step 2: Run it to make sure it fails**

Run: `node scripts/assert-design.mjs`  
Expected: `FAIL: DESIGN.md missing` (exit 1)

- [ ] **Step 3: Write DESIGN.md**

Create `DESIGN.md`:

```markdown
# Design

## World

Red de estaciones. LIRN es el mapa (papel, día, empresa). TORNS es el estado en vivo de los nodos (consola, turno, producto). Misma tinta, distinta luz. Marca avalada.

## Voices

LIRN habla de ciudad y movilidad. TORNS habla al centro de control, preciso y operativo.

## Color

Estrategia: neutros como arquitectura; el azul de tinta cívica puede ocupar una región (banda, línea, bloque de producto), no un botón cian.

| Token | Value | Role |
|---|---|---|
| `--paper` | `#F3F4F2` | Suelo LIRN (papel frío, no crema) |
| `--graphite` | `#3A3F3C` | Texto secundario LIRN |
| `--ink` | `#141714` | Texto primario LIRN |
| `--civic` | `#1B4D73` | Tinta cívica (regiones LIRN) |
| `--civic-strong` | `#3D8EC4` | Tinta a más croma (TORNS) |
| `--line` | `#C5C9C4` | Filete de plano |
| `--night` | `#101410` | Suelo TORNS |
| `--night-panel` | `#181D1A` | Panel de consola |
| `--ok` | `#2F7D4A` | Operación, no marca |
| `--warn` | `#C4922A` | Operación, no marca |
| `--fail` | `#B33A32` | Operación, no marca |

Rechazado: `#00a8ff`, glow, TransMilenio rojo, vidrio, neón, Inter / Space Grotesk / Outfit / IBM Plex como display.

## Type

UI y títulos: Schibsted Grotesk (Google Fonts). Cifras TORNS: `ui-monospace, "Fragment Mono", monospace`, `font-variant-numeric: tabular-nums`. Radios: 0–2px. Filetes 1px.

## Wordmark

LIRN es lettering, no fuente: puntas, I = nodo, R/N pueden compartir trazo. Maestro: blanco. Tinta: `--ink` sobre `--paper`. Fallback de UI: el texto `LIRN` en Schibsted Grotesk 700 si falta el PNG.

## Endorsement

`by LIRN` a la derecha o debajo de TORNS. 30–40 % del tamaño de TORNS. Nunca un segundo logo.

## Mission justification

Frase pública: Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

| Pregunta | Respuesta |
|---|---|
| ¿Qué hacemos? | Medimos demanda en estación y la convertimos en decisión de oferta. |
| ¿Cuál es nuestro negocio? | Movilidad operativa para sistemas masivos con estaciones. |
| ¿A qué nos dedicamos? | A que frecuencia y capacidad sigan a quien está en el andén. |
| ¿Razón de ser? | Evitar que la oferta viva del promedio cuando la estación ya cambió. |
| ¿Público? | Centros de control y despacho. |
| ¿Ámbito? | Cualquier sistema con estaciones. Transmilenio es problema de referencia, no territorio comercial. |
| ¿Ventaja? | Demanda medida + recomendación al control. |
| ¿Diferencia? | No vendemos cámaras ni horarios fijos. Vendemos la estación como dato vivo. |

Visión pública: Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.
```

- [ ] **Step 4: Run the assertion**

Run: `node scripts/assert-design.mjs`  
Expected: `PASS: DESIGN.md has required sections`

- [ ] **Step 5: Commit**

```bash
git add DESIGN.md scripts/assert-design.mjs
git commit -m "Add LIRN and TORNS visual authority in DESIGN.md"
```

---

### Task 2: Copy module and Vite scaffold in `lirn-web-main`

**Files:**
- Create: `lirn-web-main/package.json`
- Create: `lirn-web-main/tsconfig.json`
- Create: `lirn-web-main/tsconfig.app.json`
- Create: `lirn-web-main/tsconfig.node.json`
- Create: `lirn-web-main/vite.config.ts`
- Create: `lirn-web-main/vitest.config.ts`
- Create: `lirn-web-main/index.html`
- Create: `lirn-web-main/src/main.tsx`
- Create: `lirn-web-main/src/vite-env.d.ts`
- Create: `lirn-web-main/src/content/copy.ts`
- Create: `lirn-web-main/src/content/site.ts`
- Test: `lirn-web-main/src/content/copy.test.ts`
- Test: `lirn-web-main/src/content/site.test.ts`

**Interfaces:**
- Consumes: textos de spec 3, 5, 7.2
- Produces: `copy` object and `tornsLandingUrl` exported below. Tasks 4–6 import these names only.

`copy` shape (do not rename keys):

```ts
export const copy = {
  lirnName: "LIRN",
  oficio: "Empresa de movilidad",
  mission: "Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.",
  vision: "Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.",
  tornsName: "TORNS",
  byLirn: "by LIRN",
  tornsOficio: "Demanda real en estación. Oferta ajustada al control.",
  productWhat: "Demanda medida en estación. Recomendación de oferta al centro de control.",
  whyTitle: "La oferta no sigue a la estación",
  whyBody: "En un sistema masivo, la frecuencia y la capacidad se fijan por horario e histórico. La estación cambia. Una se satura. Otra viaja vacía. Quien espera paga el desajuste.",
  whyFoot: "Contexto: congestión y desajuste de oferta en Transmilenio, Bogotá. Problema público. No es un piloto ni un cliente.",
  problemLabel: "PROBLEMA",
  solutionLabel: "SOLUCIÓN",
  solutionTitle: "TORNS mide la estación y recomienda la oferta",
  solutionBody: "Cámaras en estación. Conteo de demanda. Recomendación de frecuencia y capacidad al centro de control. El operador ve ocupación, no un promedio.",
  factOccupation: "Ve la ocupación.",
  factCamera: "Ve la cámara con detección.",
  factRecommend: "Recibe la recomendación.",
  limit: "Prototipo. No hay piloto firmado.",
  qrLegend: "Abrir la landing de TORNS",
  tornsByLirn: "TORNS by LIRN",
  close: "Cualquier sistema masivo con estaciones.",
  notFound: "Esta página no existe.",
  navLirn: "LIRN",
  navTorns: "TORNS",
} as const;

export const tornsLandingUrl: string | null = null;
```

- [ ] **Step 1: Write failing copy tests**

Create `lirn-web-main/src/content/copy.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { copy } from "./copy";

describe("copy", () => {
  it("publishes the approved mission and vision", () => {
    expect(copy.mission).toContain("demanda real de cada estación");
    expect(copy.vision).toContain("la demanda que ocurre");
  });

  it("endorses TORNS without a conversion CTA", () => {
    expect(copy.byLirn).toBe("by LIRN");
    const blob = Object.values(copy).join(" ");
    expect(blob.toLowerCase()).not.toMatch(/comprar|demo|contáct|newsletter/);
  });
});
```

Create `lirn-web-main/src/content/site.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { tornsLandingUrl } from "./site";

describe("site", () => {
  it("does not invent a landing URL", () => {
    expect(tornsLandingUrl).toBeNull();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

From `lirn-web-main` after writing `package.json` + vitest config (next step if missing):  
`npx vitest run src/content/copy.test.ts`  
Expected: FAIL cannot find module `./copy`

- [ ] **Step 3: Write scaffold and modules**

`lirn-web-main/package.json`:

```json
{
  "name": "lirn-web-main",
  "private": true,
  "version": "0.0.1",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.9.6"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.0",
    "@types/react": "^19.2.2",
    "@types/react-dom": "^19.2.2",
    "@vitejs/plugin-react": "^5.1.0",
    "jsdom": "^27.0.0",
    "typescript": "~5.9.3",
    "vite": "^7.2.2",
    "vitest": "^3.2.4"
  }
}
```

`lirn-web-main/vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/lirn-web-main/",
});
```

`lirn-web-main/vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.ts",
  },
});
```

`lirn-web-main/src/test/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

`lirn-web-main/src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

`lirn-web-main/index.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>LIRN</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap" rel="stylesheet" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

`lirn-web-main/src/main.tsx`:

```tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/tokens.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Copy `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` from `tro-frontend` (same compiler options).

Write `src/content/copy.ts` and `src/content/site.ts` with the interfaces above (`site.ts` exports only `tornsLandingUrl`).

Leave `src/App.tsx` as a one-line placeholder that returns `null` until Task 3 — tests in this task do not render App.

- [ ] **Step 4: Install and run tests**

```bash
cd lirn-web-main
npm install
npm test
```

Expected: PASS (2 files).

- [ ] **Step 5: Commit in the submodule, then update the parent**

```bash
cd lirn-web-main
git add -A
git commit -m "Scaffold LIRN site with locked copy and empty landing URL"
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at the copy scaffold"
```

---

### Task 3: Tokens, nav, wordmark fallback

**Files:**
- Create: `lirn-web-main/src/styles/tokens.css`
- Create: `lirn-web-main/src/styles/site.css`
- Create: `lirn-web-main/src/App.tsx`
- Create: `lirn-web-main/src/components/SiteNav.tsx`
- Create: `lirn-web-main/src/components/Wordmark.tsx`
- Create: `lirn-web-main/src/components/ByLirn.tsx`
- Test: `lirn-web-main/src/components/Wordmark.test.tsx`

**Interfaces:**
- Consumes: `copy.lirnName`, `copy.tornsName`, `copy.byLirn`, `copy.navLirn`, `copy.navTorns`
- Produces: `<Wordmark name={"LIRN" \| "TORNS"} />` — if `/lirn-wordmark.png` (LIRN) or `/torns-mark.png` (TORNS) 404s, render the name as text. `<ByLirn />` renders `copy.byLirn`. `<SiteNav />` links to `/` and `/torns` with `NavLink`.

- [ ] **Step 1: Write the failing Wordmark test**

```tsx
import { render, screen } from "@testing-library/react";
import { Wordmark } from "./Wordmark";

it("falls back to the letter name when the image errors", () => {
  render(<Wordmark name="LIRN" />);
  const img = screen.getByRole("img", { name: "LIRN" });
  img.dispatchEvent(new Event("error"));
  expect(screen.getByText("LIRN")).toBeInTheDocument();
});
```

- [ ] **Step 2: Run it to verify it fails**

`cd lirn-web-main && npx vitest run src/components/Wordmark.test.tsx`  
Expected: FAIL Wordmark not defined

- [ ] **Step 3: Implement tokens and chrome**

`src/styles/tokens.css` — values copied from DESIGN.md:

```css
:root {
  --paper: #f3f4f2;
  --graphite: #3a3f3c;
  --ink: #141714;
  --civic: #1b4d73;
  --civic-strong: #3d8ec4;
  --line: #c5c9c4;
  --night: #101410;
  --night-panel: #181d1a;
  --ok: #2f7d4a;
  --warn: #c4922a;
  --fail: #b33a32;
  --font: "Schibsted Grotesk", sans-serif;
  --font-num: ui-monospace, "Fragment Mono", monospace;
}

html, body, #root { min-height: 100%; }
body {
  margin: 0;
  font-family: var(--font);
  background: var(--paper);
  color: var(--ink);
}

[data-theme="torns"] {
  background: var(--night);
  color: #eef1ec;
}
```

`Wordmark.tsx`:

```tsx
import { useState } from "react";

const SRC: Record<"LIRN" | "TORNS", string> = {
  LIRN: `${import.meta.env.BASE_URL}lirn-wordmark.png`,
  TORNS: `${import.meta.env.BASE_URL}torns-mark.png`,
};

export function Wordmark({ name }: { name: "LIRN" | "TORNS" }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="wordmark-text">{name}</span>;
  return (
    <img
      className="wordmark-img"
      src={SRC[name]}
      alt={name}
      onError={() => setFailed(true)}
    />
  );
}
```

`ByLirn.tsx`:

```tsx
import { copy } from "../content/copy";

export function ByLirn() {
  return <span className="by-lirn">{copy.byLirn}</span>;
}
```

`SiteNav.tsx`:

```tsx
import { NavLink } from "react-router-dom";
import { copy } from "../content/copy";

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Principal">
      <NavLink to="/" end>{copy.navLirn}</NavLink>
      <NavLink to="/torns">{copy.navTorns}</NavLink>
    </nav>
  );
}
```

`App.tsx`:

```tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SiteNav } from "./components/SiteNav";
import { HomePage } from "./pages/HomePage";
import { TornsPage } from "./pages/TornsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles/site.css";

export function App() {
  return (
    <BrowserRouter basename="/lirn-web-main">
      <SiteNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/torns" element={<TornsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
```

For this task only, if Home/Torns/NotFound do not exist yet, create each as `export function HomePage() { return <main />; }` (and the same for the other two) so App typechecks. Task 4–6 replace those stubs.

`site.css`: nav in a row, 1px `--line` bottom, links `--ink`, active link `--civic`. `.by-lirn` font-size 40% of the adjacent TORNS heading (use `em` on a wrapper). Radius 0. No box-shadow glow. No `#00a8ff`.

- [ ] **Step 4: Run Wordmark test**

`npx vitest run src/components/Wordmark.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add -A
git commit -m "Add LIRN tokens, nav, and wordmark fallback"
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at chrome tokens"
```

---

### Task 4: Home page

**Files:**
- Modify: `lirn-web-main/src/pages/HomePage.tsx`
- Modify: `lirn-web-main/src/styles/site.css`
- Test: `lirn-web-main/src/pages/HomePage.test.tsx`

**Interfaces:**
- Consumes: `copy.mission`, `copy.vision`, `copy.oficio`, `copy.productWhat`, `copy.whyTitle`, `copy.whyBody`, `copy.whyFoot`, `Wordmark`, `ByLirn`
- Produces: sections in this order: firma, misión/visión, producto (link to `/torns`), por qué, cierre. No form, no button labeled contact/demo/comprar.

- [ ] **Step 1: Write the failing page test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import { copy } from "../content/copy";

it("states mission, vision, and TORNS as the product", () => {
  render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>,
  );
  expect(screen.getByText(copy.mission)).toBeInTheDocument();
  expect(screen.getByText(copy.vision)).toBeInTheDocument();
  expect(screen.getByText(copy.byLirn)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: copy.navTorns })).toHaveAttribute(
    "href",
    "/torns",
  );
  expect(screen.queryByRole("button")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run it to verify it fails**

`npx vitest run src/pages/HomePage.test.tsx`  
Expected: FAIL (mission text missing)

- [ ] **Step 3: Implement HomePage**

```tsx
import { Link } from "react-router-dom";
import { ByLirn } from "../components/ByLirn";
import { Wordmark } from "../components/Wordmark";
import { copy } from "../content/copy";

export function HomePage() {
  return (
    <main className="page page-lirn" data-theme="lirn">
      <header className="block-firma">
        <Wordmark name="LIRN" />
        <p>{copy.oficio}</p>
      </header>
      <section className="block-mv">
        <h1>Misión</h1>
        <p>{copy.mission}</p>
        <h2>Visión</h2>
        <p>{copy.vision}</p>
      </section>
      <section className="block-product" style={{ background: "var(--civic)", color: "#f3f4f2" }}>
        <div className="product-name">
          <Wordmark name="TORNS" />
          <ByLirn />
        </div>
        <p>{copy.productWhat}</p>
        <Link to="/torns">{copy.navTorns}</Link>
      </section>
      <section className="block-why">
        <h2>{copy.whyTitle}</h2>
        <p>{copy.whyBody}</p>
        <p className="foot">{copy.whyFoot}</p>
      </section>
      <footer className="block-close">
        <Wordmark name="LIRN" />
      </footer>
    </main>
  );
}
```

Layout: paper ground, generous margins (pliego). Product block is the civic region (full-bleed band). No gradient hero. No cards with shadow.

- [ ] **Step 4: Run the test**

`npx vitest run src/pages/HomePage.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add -A
git commit -m "Add LIRN institutional home"
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at the home page"
```

---

### Task 5: TORNS landing and infographic slot

**Files:**
- Modify: `lirn-web-main/src/pages/TornsPage.tsx`
- Create: `lirn-web-main/src/components/InfographicSlot.tsx`
- Test: `lirn-web-main/src/pages/TornsPage.test.tsx`
- Test: `lirn-web-main/src/components/InfographicSlot.test.tsx`

**Interfaces:**
- Consumes: `copy.*` solution/problem keys; `tornsLandingUrl`
- Produces: `InfographicSlot()` returns `null` when `tornsLandingUrl === null` OR when `/torns-infographic.png` errors. Never renders a QR. Never renders `{{TORNS_LANDING_URL}}`.

- [ ] **Step 1: Write failing tests**

`TornsPage.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { TornsPage } from "./TornsPage";
import { copy } from "../content/copy";

it("speaks as TORNS by LIRN with the approved problem and limit", () => {
  render(
    <MemoryRouter>
      <TornsPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(copy.tornsOficio)).toBeInTheDocument();
  expect(screen.getByText(copy.byLirn)).toBeInTheDocument();
  expect(screen.getByText(copy.whyTitle)).toBeInTheDocument();
  expect(screen.getByText(copy.solutionTitle)).toBeInTheDocument();
  expect(screen.getByText(copy.factOccupation)).toBeInTheDocument();
  expect(screen.getByText(copy.limit)).toBeInTheDocument();
  expect(screen.queryByText(copy.mission)).not.toBeInTheDocument();
  expect(screen.queryByAltText(copy.qrLegend)).not.toBeInTheDocument();
});
```

`InfographicSlot.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { InfographicSlot } from "./InfographicSlot";

it("renders nothing while the landing URL is null", () => {
  const { container } = render(<InfographicSlot />);
  expect(container).toBeEmptyDOMElement();
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run tests to verify they fail**

`npx vitest run src/pages/TornsPage.test.tsx src/components/InfographicSlot.test.tsx`  
Expected: FAIL

- [ ] **Step 3: Implement**

`InfographicSlot.tsx`:

```tsx
import { useState } from "react";
import { copy } from "../content/copy";
import { tornsLandingUrl } from "../content/site";

export function InfographicSlot() {
  const [failed, setFailed] = useState(false);
  if (tornsLandingUrl === null || failed) return null;
  return (
    <figure className="infographic">
      <img
        src={`${import.meta.env.BASE_URL}torns-infographic.png`}
        alt={copy.qrLegend}
        onError={() => setFailed(true)}
      />
    </figure>
  );
}
```

`TornsPage.tsx`:

```tsx
import { ByLirn } from "../components/ByLirn";
import { InfographicSlot } from "../components/InfographicSlot";
import { Wordmark } from "../components/Wordmark";
import { copy } from "../content/copy";

export function TornsPage() {
  return (
    <main className="page page-torns" data-theme="torns">
      <header>
        <div className="product-name">
          <Wordmark name="TORNS" />
          <ByLirn />
        </div>
        <p>{copy.tornsOficio}</p>
      </header>
      <section>
        <p className="kicker">{copy.problemLabel}</p>
        <h1>{copy.whyTitle}</h1>
        <p>{copy.whyBody}</p>
        <p className="foot">{copy.whyFoot}</p>
      </section>
      <section>
        <p className="kicker">{copy.solutionLabel}</p>
        <h2>{copy.solutionTitle}</h2>
        <p>{copy.solutionBody}</p>
        <ul>
          <li>{copy.factOccupation}</li>
          <li>{copy.factCamera}</li>
          <li>{copy.factRecommend}</li>
        </ul>
      </section>
      <InfographicSlot />
      <p className="limit">{copy.limit}</p>
      <p className="close">{copy.close}</p>
    </main>
  );
}
```

Night theme, denser type, tabular nums on any figures. Civic-strong only on kickers and the product name. No stack words (YOLO, FastAPI, WebSocket).

- [ ] **Step 4: Run tests**

`npx vitest run src/pages/TornsPage.test.tsx src/components/InfographicSlot.test.tsx`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
cd lirn-web-main
git add -A
git commit -m "Add TORNS landing without a placeholder QR"
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at the TORNS landing"
```

---

### Task 6: 404 and GitHub Pages

**Files:**
- Modify: `lirn-web-main/src/pages/NotFoundPage.tsx`
- Create: `lirn-web-main/.github/workflows/pages.yml`
- Create: `lirn-web-main/scripts/copy-404.mjs`
- Test: `lirn-web-main/src/pages/NotFoundPage.test.tsx`

**Interfaces:**
- Consumes: `copy.notFound`, `copy.navLirn`, `copy.navTorns`
- Produces: 404 copy exactly `Esta página no existe.` Links to `/` and `/torns`. Workflow publishes `dist` to GitHub Pages.

- [ ] **Step 1: Write the failing 404 test**

```tsx
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { NotFoundPage } from "./NotFoundPage";
import { copy } from "../content/copy";

it("names the miss and points home and product", () => {
  render(
    <MemoryRouter>
      <NotFoundPage />
    </MemoryRouter>,
  );
  expect(screen.getByText(copy.notFound)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: copy.navLirn })).toHaveAttribute("href", "/");
  expect(screen.getByRole("link", { name: copy.navTorns })).toHaveAttribute("href", "/torns");
});
```

- [ ] **Step 2: Run it to verify it fails**

`npx vitest run src/pages/NotFoundPage.test.tsx`  
Expected: FAIL

- [ ] **Step 3: Implement 404, copy-404, workflow**

`NotFoundPage.tsx`:

```tsx
import { Link } from "react-router-dom";
import { copy } from "../content/copy";

export function NotFoundPage() {
  return (
    <main className="page page-lirn">
      <h1>{copy.notFound}</h1>
      <p>
        <Link to="/">{copy.navLirn}</Link>
        {" · "}
        <Link to="/torns">{copy.navTorns}</Link>
      </p>
    </main>
  );
}
```

`scripts/copy-404.mjs`:

```js
import { copyFileSync } from "node:fs";
copyFileSync("dist/index.html", "dist/404.html");
```

Add to `package.json` scripts: `"build": "tsc -b && vite build && node scripts/copy-404.mjs"`

`.github/workflows/pages.yml`:

```yaml
name: pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    environment:
      name: github-pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm test
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
      - uses: actions/deploy-pages@v4
```

Enable Pages (GitHub Actions) on `5arSanti/lirn-web-main` after first push. Expected public URL shape: `https://5arsanti.github.io/lirn-web-main/` and `https://5arsanti.github.io/lirn-web-main/torns`. Do not write that URL into `site.ts`.

- [ ] **Step 4: Test locally**

```bash
cd lirn-web-main
npx vitest run src/pages/NotFoundPage.test.tsx
npm test
npm run build
```

Expected: tests PASS; `dist/404.html` exists; `dist/index.html` references `/lirn-web-main/`.

- [ ] **Step 5: Commit and push the submodule**

```bash
cd lirn-web-main
git add -A
git commit -m "Deploy LIRN site to GitHub Pages with SPA 404"
git push -u origin HEAD
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at the Pages workflow"
```

Stop. Ask the user for the live `/torns` URL. Do not invent it.

---

### Task 7: Wordmark prompt (Prompt A)

**Files:**
- Create: `docs/brand/lirn-wordmark-prompt.md`
- Create: `lirn-web-main/public/lirn-wordmark.svg` (fallback if no raster)

**Interfaces:**
- Consumes: DESIGN.md wordmark rules
- Produces: prompt file ready to paste into an image generator. SVG fallback ships so the site never depends on a failed PNG.

- [ ] **Step 1: Write a check that the prompt file forbids banned motifs**

Create `scripts/assert-wordmark-prompt.mjs`:

```js
import { readFileSync } from "node:fs";
const text = readFileSync(new URL("../docs/brand/lirn-wordmark-prompt.md", import.meta.url), "utf8");
for (const needle of ["LIRN", "white", "punto", "nodo", "no isotipo", "no glow"]) {
  if (!text.toLowerCase().includes(needle.toLowerCase()) && !text.includes(needle)) {
    console.error("FAIL: prompt missing " + needle);
    process.exit(1);
  }
}
console.log("PASS: wordmark prompt");
```

- [ ] **Step 2: Run it to verify it fails**

`node scripts/assert-wordmark-prompt.mjs`  
Expected: FAIL (file missing)

- [ ] **Step 3: Write the prompt and SVG fallback**

`docs/brand/lirn-wordmark-prompt.md` — full prompt:

```markdown
# Prompt A — Wordmark LIRN

Create a single logotype. The mark IS the four letters L I R N. No other icon.

Style: custom lettering, not a typed font. Minimal, elegant, civic-corporate. Sharp pointed terminals. The I is a station node (a short vertical or a point on a line). R and N may share a stroke or touch like two transit lines meeting. Flat ink. White letters. Background pure black or transparent. Centered. High resolution, crop-ready.

Forbidden (no isotipo): separate pictogram, metro roundel, train, bus, chip, eye, app circle, glow (no glow), gradient, color, editorial serif, slogan, the words by LIRN inside the mark, card mockup, 3D, chrome. The I is a nodo (punto on a line).

Optional second frame: identical geometry in near-black ink on white.
```

`lirn-web-main/public/lirn-wordmark.svg` — four letters LIRN in white (`#FFFFFF`) on transparent, Schibsted-like geometric cuts, viewBox `0 0 320 80`. This is the shipping fallback. If an image generator is available in-session, generate the raster into `lirn-web-main/public/lirn-wordmark.png` using this prompt and keep the SVG as backup. Do not block the task on generation.

- [ ] **Step 4: Run the assertion**

`node scripts/assert-wordmark-prompt.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add docs/brand/lirn-wordmark-prompt.md scripts/assert-wordmark-prompt.mjs
git commit -m "Add the LIRN wordmark generation prompt"
cd lirn-web-main
git add public/lirn-wordmark.svg
git commit -m "Ship SVG fallback for the LIRN wordmark"
cd ..
git add lirn-web-main
git commit -m "Point lirn-web-main at the wordmark fallback"
```

---

### Task 8: Infographic prompt template (do not generate)

**Files:**
- Create: `docs/brand/torns-infographic-prompt.md`
- Create: `scripts/assert-infographic-prompt.mjs`

**Interfaces:**
- Consumes: spec 7.2 texts verbatim; `{{TORNS_LANDING_URL}}`
- Produces: a prompt that still contains the literal string `{{TORNS_LANDING_URL}}`. A later session substitutes it after the user sends the Pages URL. This task does not create `torns-infographic.png` and does not change `tornsLandingUrl`.

- [ ] **Step 1: Write the failing assertion**

```js
import { readFileSync } from "node:fs";
const text = readFileSync(new URL("../docs/brand/torns-infographic-prompt.md", import.meta.url), "utf8");
const required = [
  "{{TORNS_LANDING_URL}}",
  "TORNS",
  "by LIRN",
  "Demanda real en estación. Oferta ajustada al control.",
  "PROBLEMA",
  "La oferta no sigue a la estación",
  "SOLUCIÓN",
  "TORNS mide la estación y recomienda la oferta",
  "Ve la ocupación.",
  "Prototipo. No hay piloto firmado.",
  "Abrir la landing de TORNS",
  "Cualquier sistema masivo con estaciones.",
];
const missing = required.filter((item) => !text.includes(item));
if (missing.length) {
  console.error("FAIL: " + missing.join(" | "));
  process.exit(1);
}
if (text.includes("https://")) {
  console.error("FAIL: prompt contains a real URL");
  process.exit(1);
}
console.log("PASS: infographic prompt template");
```

- [ ] **Step 2: Run it to verify it fails**

`node scripts/assert-infographic-prompt.mjs`  
Expected: FAIL

- [ ] **Step 3: Write the prompt file**

`docs/brand/torns-infographic-prompt.md`:

```markdown
# Prompt B — Infografía TORNS by LIRN

Do not run this prompt until `{{TORNS_LANDING_URL}}` is replaced by the user-supplied GitHub Pages URL for `/torns`.

Create one horizontal poster, 1920×1080, 16:9. Dark console ground (#101410). Civic ink #3D8EC4 for live nodes. Graphite lines. Tabular figures. Flat, plan-drawing, no glow, no cyan #00a8ff, no TransMilenio logo, no stock photo, no YOLO/FastAPI/WebSocket diagram.

Header, full width:
- TORNS (large)
- by LIRN (30–40% of TORNS size)
- Demanda real en estación. Oferta ajustada al control.

Left half, PROBLEM:
- Label: PROBLEMA
- Title: La oferta no sigue a la estación
- Body: En un sistema masivo, la frecuencia y la capacidad se fijan por horario e histórico. La estación cambia. Una se satura. Otra viaja vacía. Quien espera paga el desajuste.
- Foot: Contexto: congestión y desajuste de oferta en Transmilenio, Bogotá. Problema público. No es un piloto ni un cliente.
- Image: two station nodes, one packed, one empty, a clock/schedule that does not move.

Right half, SOLUTION:
- Label: SOLUCIÓN
- Title: TORNS mide la estación y recomienda la oferta
- Body: Cámaras en estación. Conteo de demanda. Recomendación de frecuencia y capacidad al centro de control. El operador ve ocupación, no un promedio.
- Facts: Ve la ocupación. / Ve la cámara con detección. / Recibe la recomendación.
- Limit: Prototipo. No hay piloto firmado.
- Image: the same map with one active civic-ink node, a tabular demand figure, a short arrow to a control/dispatch block.

Footer:
- QR code whose destination is exactly {{TORNS_LANDING_URL}} (the TORNS landing, not the LIRN home). High contrast, large modules, quiet zone. Light plate behind the QR if needed.
- Legend: Abrir la landing de TORNS
- Signature: TORNS by LIRN
- Close: Cualquier sistema masivo con estaciones.

Forbidden: “Implementado en TransMilenio”, percentages, testimonials, stack, TRO, vigilancia, contact, buy.
```

- [ ] **Step 4: Run the assertion**

`node scripts/assert-infographic-prompt.mjs`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add docs/brand/torns-infographic-prompt.md scripts/assert-infographic-prompt.mjs
git commit -m "Add the TORNS infographic prompt with an unresolved URL token"
```

---

### Task 9: Dashboard identity chrome

**Files:**
- Create: `tro-frontend/src/styles/tokens.css`
- Modify: `tro-frontend/src/main.tsx` (import tokens)
- Modify: `tro-frontend/src/App.css` (`:root` metro tokens)
- Modify: `tro-frontend/src/styles/navbar.css`
- Modify: `tro-frontend/src/components/layout/Navbar.tsx`
- Modify: `tro-frontend/index.html` (title + font + lang)
- Create: `scripts/assert-no-legacy-brand.mjs`

**Interfaces:**
- Consumes: DESIGN.md TORNS tokens (`--night`, `--civic-strong`, `--ok`, `--fail`)
- Produces: Navbar texts `TORNS`, `by LIRN`, `Centro de control`. Nav labels stay Inicio / Monitoreo / Cámaras / Optimización.

- [ ] **Step 1: Write the failing legacy-brand assertion**

```js
import { readFileSync } from "node:fs";

const files = [
  "tro-frontend/src/components/layout/Navbar.tsx",
  "tro-frontend/src/pages/HomePage.tsx",
  "tro-frontend/index.html",
];
const banned = ["TRO SYSTEM", ">TRO<", "Sistema de Vigilancia", "Transport Route Optimization"];
let hits = [];
for (const file of files) {
  const text = readFileSync(file, "utf8");
  for (const needle of banned) {
    if (text.includes(needle)) hits.push(`${file}: ${needle}`);
  }
}
if (hits.length) {
  console.error("FAIL:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("PASS: no legacy brand strings");
```

- [ ] **Step 2: Run it to verify it fails**

`node scripts/assert-no-legacy-brand.mjs`  
Expected: FAIL on Navbar and HomePage

- [ ] **Step 3: Replace identity and tokens**

`tro-frontend/src/styles/tokens.css` — same token table as DESIGN.md.

In `App.css` replace the `:root` metro block with:

```css
:root {
  --metro-primary: #1b4d73;
  --metro-secondary: #143a57;
  --metro-accent: #3d8ec4;
  --metro-success: #2f7d4a;
  --metro-warning: #c4922a;
  --metro-danger: #b33a32;
  --metro-dark: #101410;
  --metro-gray: #181d1a;
  --metro-light: #f3f4f2;
  --metro-border: #c5c9c4;
}
```

Remove `linear-gradient` glows that use `#00a8ff`. Navbar and app backgrounds: `--night` / `--night-panel`. Font: Schibsted Grotesk. Radius 2px. No box-shadow glow on `.nav-item.active`.

`Navbar.tsx` brand block:

```tsx
<div className="navbar-brand">
  <div className="brand-logo">TORNS</div>
  <div className="brand-text">
    <span className="brand-title">Centro de control</span>
    <span className="brand-subtitle">by LIRN</span>
  </div>
</div>
```

`index.html`: `lang="es"`, `<title>TORNS</title>`, same Google Fonts link as the site.

`main.tsx`: `import "./styles/tokens.css"` before `App`.

- [ ] **Step 4: Run the assertion**

`node scripts/assert-no-legacy-brand.mjs`  
Expected: FAIL until Task 10 edits HomePage, or edit HomePage badge/title in this step too:

```tsx
<div className="hero-badge">TORNS</div>
<h1>Demanda y despacho</h1>
```

Leave the four feature paragraphs as they are (copy rewrite is out of scope except identity). Then re-run: Expected PASS.

- [ ] **Step 5: Commit**

```bash
cd tro-frontend
git add src/styles/tokens.css src/main.tsx src/App.css src/styles/navbar.css src/components/layout/Navbar.tsx src/pages/HomePage.tsx index.html
git commit -m "Replace TRO chrome with TORNS by LIRN"
cd ..
git add tro-frontend scripts/assert-no-legacy-brand.mjs
git commit -m "Point tro-frontend at TORNS identity chrome"
```

---

### Task 10: Dashboard visual restyle

**Files:**
- Modify: `tro-frontend/src/styles/dashboard.css`
- Modify: `tro-frontend/src/styles/monitoring.css`
- Modify: `tro-frontend/src/styles/monitoring-layout.css`
- Modify: `tro-frontend/src/styles/cameras.css`
- Modify: `tro-frontend/src/styles/routing.css`
- Modify: `tro-frontend/src/App.css` (remaining gradients)

**Interfaces:**
- Consumes: tokens from Task 9. No new routes. No new copy keys.
- Produces: four routes keep their DOM structure; visual hierarchy matches spec §6 (estación = nodo; cifra pesa; despacho es ancla).

- [ ] **Step 1: Write a style assertion**

Create `scripts/assert-torns-tokens.mjs`:

```js
import { readFileSync } from "node:fs";
const css = [
  "tro-frontend/src/App.css",
  "tro-frontend/src/styles/navbar.css",
  "tro-frontend/src/styles/dashboard.css",
].map((f) => readFileSync(f, "utf8")).join("\n");
if (css.includes("#00a8ff")) {
  console.error("FAIL: legacy cyan remains");
  process.exit(1);
}
if (!css.includes("#3d8ec4") && !css.includes("var(--metro-accent)")) {
  console.error("FAIL: civic-strong unused");
  process.exit(1);
}
console.log("PASS: TRO cyan removed");
```

- [ ] **Step 2: Run it**

`node scripts/assert-torns-tokens.mjs`  
Expected: FAIL if `#00a8ff` still in dashboard.css (it will, until you edit).

- [ ] **Step 3: Restyle the four sheets**

Rules to apply in each file (do not restructure JSX):

- Replace every `#00a8ff` and `rgba(0, 168, 255, …)` with `var(--metro-accent)` / `rgba(61, 142, 196, 0.15)`.
- Replace navy gradients `#0f1419`, `#1a1f2e`, `#252b3b` with `var(--metro-dark)` and `var(--metro-gray)`.
- `border-radius` > 4px → `2px`.
- Delete `box-shadow` glows (`0 0 12px rgba(0, 168, 255…)`).
- Dashboard hero: left filete `4px solid var(--metro-accent)`, no `::before` rainbow.
- Monitoring: person count `.stat-value.prominent` at least `2rem`, `font-variant-numeric: tabular-nums`, `font-family: var(--font-num)` (add `--font-num` to tokens.css if not already).
- Routing: `.dispatch` / action panel `border-color: var(--metro-accent)`.
- Cameras: cards as nodes — 1px `--metro-border`, no lift shadow.

Do not add a link to lirn-web-main.

- [ ] **Step 4: Run assertions and a typecheck**

```bash
node scripts/assert-no-legacy-brand.mjs
node scripts/assert-torns-tokens.mjs
cd tro-frontend && npm run build
```

Expected: PASS / build success.

- [ ] **Step 5: Commit**

```bash
cd tro-frontend
git add src/styles src/App.css
git commit -m "Restyle TORNS dashboard onto civic ink and night ground"
cd ..
git add tro-frontend scripts/assert-torns-tokens.mjs
git commit -m "Point tro-frontend at the TORNS restyle"
```

---

### Task 11: After the user sends `{{TORNS_LANDING_URL}}` (blocked)

Do not start this task until the user pastes the live `/torns` URL.

**Files:**
- Modify: `docs/brand/torns-infographic-prompt.md` (replace the token once)
- Modify: `lirn-web-main/src/content/site.ts` (`tornsLandingUrl` becomes that string)
- Create: `lirn-web-main/public/torns-infographic.png` (generate or SVG redraw)
- Modify: `lirn-web-main/src/content/site.test.ts` (expect the real URL, still no `https://example`)

**Interfaces:**
- Consumes: user-supplied URL, Prompt B
- Produces: infographic asset served on `/torns`; QR in the asset points only at that URL.

- [ ] **Step 1: Substitute and generate**

Replace every `{{TORNS_LANDING_URL}}` in `docs/brand/torns-infographic-prompt.md` with the user URL. Generate the poster (or draw SVG with an embedded QR library / a QR PNG). Save as `lirn-web-main/public/torns-infographic.png`. Set `export const tornsLandingUrl = "<user url>"`. Update the site test to expect that string and to still forbid `example.com`.

- [ ] **Step 2: Verify**

`cd lirn-web-main && npm test && npm run build`  
Open `/torns`: the infographic is visible. Decode the QR: it equals the user URL, not `/`.

- [ ] **Step 3: Commit**

```bash
cd lirn-web-main
git add public/torns-infographic.png src/content/site.ts src/content/site.test.ts
git commit -m "Attach the TORNS infographic to the live landing URL"
cd ..
git add lirn-web-main docs/brand/torns-infographic-prompt.md
git commit -m "Record the resolved TORNS landing URL in the infographic prompt"
```

---

## Self-review

**Spec coverage**

| Spec | Task |
|---|---|
| DESIGN.md autoridad | 1 |
| Misión justificación en DESIGN.md | 1 |
| Sitio React + Vite, `/` y `/torns` | 2–5 |
| Textos home y landing | 4–5, `copy.ts` |
| Sin conversión, sin QR falso | 2, 5, 8, 11 |
| 404 | 6 |
| GitHub Pages + base path | 2, 6 |
| Prompt A + fallback | 7 |
| Prompt B + placeholder | 8 |
| Dashboard restyle + identidad | 9–10 |
| Infografía tras URL | 11 (blocked) |
| Fuera de alcance (APIs, login, stack) | Constraints + Tasks 5, 10 |

**Placeholders:** `{{TORNS_LANDING_URL}}` is a real token in Task 8, asserted present, asserted not replaced by `https://`. Task 11 is gated on the user.

**Types:** `tornsLandingUrl: string | null`, `Wordmark` name `"LIRN" | "TORNS"`, `copy` keys listed in Task 2 — later tasks use those keys only.
