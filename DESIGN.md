---
name: LIRN
description: Luxury editorial + minimalist corporate mobility house for LIRN and TORNS
colors:
  night: "#0B1220"
  night-soft: "#121A2B"
  paper: "#F7F5F0"
  ink: "#141820"
  mute: "#6B7280"
  mute-on-night: "#A8B0BD"
  champagne: "#C4A574"
  paper-pure: "#FFFFFF"
  ok: "#2F7D4A"
  warn: "#C4922A"
  fail: "#B33A32"
typography:
  display:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(2rem, 4.5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  display-hero-brand:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(3.5rem, 12vw, 7rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(2rem, 5.5vw, 3.75rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bodoni Moda, Times New Roman, serif"
    fontSize: "clamp(1.25rem, 2.4vw, 1.75rem)"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "-0.015em"
  body:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 300
    lineHeight: 1.55
  label:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.16em"
  nav:
    fontFamily: "Public Sans, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    letterSpacing: "0.08em"
rounded:
  none: "0"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  rail: "4.25rem"
  section-y: "clamp(4rem, 10vh, 7rem)"
  measure: "68ch"
  gap-actions: "1.25rem"
components:
  button-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.paper-pure}"
    textColor: "{colors.night}"
  button-nav-outline:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0.55rem 1rem"
  button-nav-outline-hover:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.night}"
  button-contact-pending:
    backgroundColor: "transparent"
    textColor: "{colors.mute-on-night}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.5rem"
  link-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.mute-on-night}"
---

# Design System: LIRN

## Overview

**Creative North Star: "Editorial de despacho cívico"**

LIRN’s commercial surface reads as an executive mobility house: deep navy cyclorama, warm off-white paper, Bodoni Moda editorial display, and Public Sans as the quiet UI voice. Sections alternate night / paper / night-soft like a printed dossier, not a SaaS dashboard. Photography is cinematic and full-bleed; champagne is a sparse signal, never a theme wash.

Primary system of record: `lirn-web-main` (LIRN home + `/torns`). The TORNS Operate dashboard in `tro-frontend` inherits the same token family (night, paper, ink, champagne) with operational status colors; it is a sibling skin, not a clone of the landing composition.

Rejected by the build and brand commitments: flat night network diagrams as hero, cyan/glow TRO, TransMilenio red as brand, glass/neon, generic consulting templates, and invented clients, metrics, or testimonials.

**Key Characteristics:**
- Luxury editorial + minimalist corporate on a night/paper rhythm
- Bodoni Moda display + Public Sans UI; sharp corners; hairline rules
- Champagne as scarce accent; paper-filled primary CTA (Hablemos)
- Full-bleed cinematic hero with dual gradients; no card chrome
- Same token family across LIRN site and TORNS Operate mode

## Colors

Neutrals carry architecture; champagne appears only as a discrete accent on first instruments, mission labels, and focus.

### Primary
- **Deep navy night** (`{colors.night}`): Default site soil, dark sections, footer, Operate console ground.
- **Night soft** (`{colors.night-soft}`): Mid-band sections and instrument cells — a step up from night without leaving the cyclorama.

### Secondary
- **Champagne** (`{colors.champagne}`): Sparse accent — first board cell, first instrument label, mission kicker tint, focus ring, selection wash, 404 links. Not a fill for large regions or primary buttons.

### Neutral
- **Paper** (`{colors.paper}`): Light section soil and primary button fill.
- **Ink** (`{colors.ink}`): Primary text on paper.
- **Mute / mute-on-night** (`{colors.mute}`, `{colors.mute-on-night}`): Secondary copy and nav links by ground.
- **Hairlines**: `color-mix` of paper ~18% on night, ink ~14% on paper — dividers, boards, product-band tops.

### Operate-only (TORNS dashboard)
- **Ok / warn / fail** (`{colors.ok}`, `{colors.warn}`, `{colors.fail}`): Operational status only — never brand accents on commercial pages.

**The Scarce Champagne Rule.** Champagne marks a first signal in a set (board, instrument triad, mission). It must stay rare: if removing it would not change hierarchy, it should not be there.

**The Night/Paper Rule.** Commercial pages alternate `section-dark`, `section-paper`, and `section-soft`. Do not flatten the whole site to one ground.

## Typography

**Display Font:** Bodoni Moda (with Times New Roman, serif)
**Body Font:** Public Sans (with sans-serif)
**Operate numerals:** `ui-monospace, "Fragment Mono", monospace` with tabular nums where counts matter

**Character:** High-contrast editorial serif for house and product names; light sans for lede and UI. Display never competes with a second decorative face.

### Hierarchy
- **Display brand** (600, `clamp(3.5rem, 12vw, 7rem)`, lh 0.92): Hero LIRN word as lettering-scale type.
- **Headline** (500, `clamp(2rem, 5.5vw, 3.75rem)`, lh 1.05): Hero editorial line; keep measure short (~14ch).
- **Display** (500, `clamp(2rem, 4.5vw, 3.5rem)`, lh 1.08): Section titles.
- **Title** (500, mission/vision and instrument copy sizes): Editorial statements inside pairs and boards.
- **Body** (300, ~1.05rem, lh 1.55, max `{spacing.measure}`): Lede and prose.
- **Label / nav** (600–500, uppercase, wide tracking): Nav links, CTA caps, discrete board cells.

**The Two-Voice Rule.** Bodoni Moda owns brand, product mark, and section headlines. Public Sans owns navigation, buttons, labels, and body. Do not invert.

## Layout

Fixed transparent nav height `{spacing.rail}` over full-bleed hero. Horizontal rhythm from `{spacing.gutter}`. Sections use `{spacing.section-y}` vertical padding. Recurring grid: narrow label column (~0.35fr) + content (1fr) collapsing to one column below 52rem. Hero board and instrument triad: three equal cells separated by 1px hairline; stack on small screens. Body measure caps at `{spacing.measure}`.

**The First-Viewport Rule.** Hero contains brand, one headline, one support line, Hablemos + TORNS, and an optional discrete demand/estación/oferta board — not stats, trust bars, or card grids.

## Elevation & Depth

No drop shadows on the commercial system. Depth comes from photography, dual hero gradients (vertical night wash + horizontal side veil), tonal section shifts, and 1px hairline boards.

### Shadow Vocabulary
Operate dashboard may use restrained functional shadows for panels (`0 2px 4px` / `0 4px 8px` / `0 8px 16px` rgba black); commercial landings stay flat.

**The Flat Editorial Rule.** Landings: no ambient card lift. If a surface needs separation, use hairline or night/paper contrast — not blur or glow.

## Shapes

All interactive and structural corners are sharp (`{rounded.none}`). Boards and instrument rows are rectangles divided by 1px gutters, not rounded cards. Primary buttons and nav CTA are square-edged fills or strokes.

**The Sharp Edge Rule.** Do not introduce soft radii, pills, or floating rounded media cards on LIRN commercial surfaces.

## Components

### Buttons
- **Shape:** Sharp rectangle (`0` radius)
- **Primary:** Paper fill on night (or night-ink on paper contexts via same class), uppercase Public Sans ~0.85rem / 600, padding `0.85rem 1.5rem`; hover lifts 1px and goes pure white
- **Nav outline:** Transparent with paper stroke; hover inverts to paper fill / night text
- **Contact pending:** Outline only, mute text, non-interactive until a real channel exists
- **Quiet link:** Mute-on-night text; underline on hover — secondary path (e.g. TORNS)

### Cards / Containers
- **Not card chrome.** Use section grounds, hairline-top product bands, editorial lists with top borders, and 1px instrument/board grids.
- **Internal padding:** Instrument cells ~`1.5rem 1.25rem`; board cells ~`0.85rem 1rem`

### Inputs / Fields
- Commercial site has no form fields yet. When added: stroke hairline, sharp corners, champagne focus ring (`2px`, offset `3px`) matching `:focus-visible`.

### Navigation
- Fixed, transparent over hero; hairline bottom in paper ~12%. Brand in Bodoni Moda. Links uppercase Public Sans mute; active/hover to paper. Trailing outline CTA → Contacto.

### Signature: Demand board / instrument triad
- Three-cell hairline grid. First cell’s label may use champagne; others stay mute. Labels uppercase, tracked — a discrete instrument, not a metric strip with invented numbers.

### Endorsement
- TORNS product mark in Bodoni; `by LIRN` as small uppercase Public Sans mute beside or under the mark — never a second logo.

## Do's and Don'ts

### Do:
- **Do** keep Hablemos as the primary commercial CTA and TORNS as secondary navigation/product path.
- **Do** alternate night / paper / night-soft sections with hairline rules and cinematic photography.
- **Do** reuse night, paper, ink, champagne tokens in TORNS Operate so the family reads as one house.
- **Do** treat Transmilenio (or any operator) as public problem context — never as client proof.

### Don't:
- **Don't** use network/diagram SVG, cyan glow, or “red nocturna” flat maps as the hero idea.
- **Don't** invent clients, metrics, testimonials, trust logos, or fake demos.
- **Don't** flood screens with champagne or use status red/green as brand color on landings.
- **Don't** ship rounded cards, glassmorphism, neon, or Inter/Roboto/system display stacks as the house face.

## Mission justification

Public mission: Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.

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

Public vision: Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.
