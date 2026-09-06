---
name: LIRN
description: Vibrant corporate brochure for LIRN and denser civic-blue TORNS microsite
colors:
  navy: "#0b1f3a"
  navy-deep: "#071526"
  paper: "#ffffff"
  ink: "#0f172a"
  mute: "#5b6575"
  amber: "#f59e0b"
  coral: "#e86b5a"
  civic: "#1b4d73"
  civic-strong: "#3d8ec4"
  surface-dark: "#0a1628"
  ok: "#2f7d4a"
  warn: "#c4922a"
  fail: "#b33a32"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3rem, 8vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  brand-lead:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1rem, 2vw, 1.35rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.12em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.75rem, 4vw, 2.5rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.05rem, 1.7vw, 1.25rem)"
    fontWeight: 500
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.88rem"
    fontWeight: 800
    letterSpacing: "-0.01em"
  nav:
    fontFamily: "Manrope, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    letterSpacing: "-0.01em"
rounded:
  cta: "999px"
  block: "clamp(1.5rem, 4vw, 3rem)"
  operate: "2px"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  rail: "4.5rem"
  section-y: "clamp(4rem, 9vw, 7.5rem)"
  section-y-torns: "clamp(3.25rem, 7vw, 5.5rem)"
  measure: "65ch"
  gap-actions: "0.75rem"
  container: "76rem"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    rounded: "{rounded.cta}"
    padding: "0.8rem 1.4rem"
    typography: "{typography.label}"
    height: "3rem"
  button-primary-hover:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.paper}"
    rounded: "{rounded.cta}"
    padding: "0.8rem 1.4rem"
  button-secondary-hover:
    textColor: "{colors.amber}"
  button-torns-primary:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.civic}"
    rounded: "{rounded.cta}"
    padding: "0.8rem 1.4rem"
  button-torns-primary-hover:
    backgroundColor: "{colors.civic-strong}"
    textColor: "{colors.surface-dark}"
  button-nav-cta:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    rounded: "{rounded.cta}"
    padding: "0.7rem 1.2rem"
  button-nav-cta-hover:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.paper}"
  card-esencia:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.navy}"
    rounded: "{rounded.block}"
    padding: "clamp(2.5rem, 6vw, 5rem)"
  card-product-story:
    backgroundColor: "{colors.civic}"
    textColor: "{colors.paper}"
    padding: "clamp(1.5rem, 4vw, 3rem)"
---

# Design System: LIRN

## Overview

**Creative North Star: "The Vibrant Corporate Brochure"**

LIRN and TORNS share one bold Manrope face and a language of solid color blocks, not luxury serif champagne or frosted glass. LIRN reads as an etraining-like commercial brochure: white nav, navy hero, amber CTAs, alternating paper / navy / tinted / coral bands. TORNS is the denser product microsite in civic blues, with a labeled synthetic ProductStory that shows ocupación → cámara → recomendación. The Operate skin in `tro-frontend` keeps the civic palette for control-room density and sharpens corners to 2px.

Depth comes from block contrast and a single amber ring on the LIRN hero, not from layered shadows or glass. Marketing CTAs are always pills; brochure copy stays sentence case.

**Key Characteristics:**
- One family: Manrope 400–800; display and CTA weight is 800
- Dual skins via `data-theme`: LIRN navy/amber/coral; TORNS civic `#1b4d73` / `#3d8ec4`
- Solid section fills; pill CTAs (`999px`); soft rounded Esencia shell
- LIRN first viewport: light nav, navy hero, amber brand lead + huge slogan, amber Hablemos + outline Ver TORNS
- TORNS denser scroll with ProductStory synthetic UI; Operate dashboard = same civic blues, sharper chrome

## Colors

Two endorsed skins on shared neutrals: LIRN leads with amber on navy; TORNS leads with civic blue on deep surface.

### Primary
- **LIRN Navy** (`{colors.navy}`): Hero, product band, footer family, default body chrome under `[data-theme="lirn"]`.
- **Amber CTA** (`{colors.amber}`): Primary marketing fills, hero brand lead, product mark, Esencia shell, decorative hero ring.

### Secondary
- **Civic Blue** (`{colors.civic}`): TORNS hero and capabilities band; ProductStory panel ground; Operate nav accents.
- **Civic Strong** (`{colors.civic-strong}`): TORNS accent, hover fill, capability list markers, limit band, synthetic UI highlights.

### Tertiary
- **Coral Emphasis** (`{colors.coral}`): LIRN CTA / nav-CTA hover; solid signal strip; full contact band; hero-route connector. Used as a loud block, not only as hover tint.
- **Operate status** (`{colors.ok}` / `{colors.warn}` / `{colors.fail}`): Dashboard health and alerts only.

### Neutral
- **Paper** (`{colors.paper}`): White brochure grounds, light nav, TORNS problem/infographic bands, TORNS primary CTA fill.
- **Ink** (`{colors.ink}`): Body text on paper.
- **Mute** (`{colors.mute}`): Context footnotes and secondary prose.
- **Navy Deep** (`{colors.navy-deep}`): Footer.
- **Surface Dark** (`{colors.surface-dark}`): TORNS page ground and close band (token `#0a1628` under `[data-theme="torns"]`).
- **Line**: `color-mix` ink or paper at low opacity for hairline borders — not a hard hex token.

### Named Rules
**The Dual Skin Rule.** LIRN accents are amber → coral. TORNS accents are civic → civic-strong. Do not paint amber CTAs on TORNS product chrome or civic fills on the LIRN brochure hero.

**The Solid Block Rule.** Sections earn contrast from full-bleed fills (navy, paper, amber, coral, civic), not from cards-in-cards or frosted overlays.

## Typography

**Display Font:** Manrope (sans-serif fallback)
**Body Font:** Manrope (sans-serif fallback)

**Character:** One confident grotesque at high weight for slogans and CTAs; mid weight for ledes. No second display serif.

### Hierarchy
- **Headline** (800, `clamp(3rem, 8vw, 6rem)`, lh 0.98): LIRN hero slogan; short measure (~11ch).
- **TORNS brand** (800, `clamp(3.5rem, 11vw, 7.5rem)`): Product name as hero-scale wordmark with small “by LIRN”.
- **Display** (800, `clamp(2.25rem, 5vw, 4.5rem)`): Section titles on alternating grounds.
- **Brand lead** (800, tracked `0.12em`): LIRN name above the hero slogan — brand signal, not a generic section eyebrow.
- **Body** (500, `clamp(1.05rem, 1.7vw, 1.25rem)`, lh ~1.65): Lede and prose to ~65ch.
- **Label / CTA** (800, ~0.88rem, slight negative tracking): Pill buttons and nav CTA; sentence case.
- **Nav** (700): Light-nav links; coral on hover/active.

### Named Rules
**The One Face Rule.** Marketing and microsite type is Manrope only. Do not reintroduce Bodoni, champagne pairing, or Public Sans as the house face.

**The Sentence-Case CTA Rule.** Buttons and nav links stay sentence case (`Hablemos`, `Ver TORNS`). Do not uppercase marketing CTAs.

## Layout

Brochure rhythm: sticky light nav (`--rail` 4.5rem), full-bleed section bands, content capped near 76rem, gutters `clamp(1.25rem, 4vw, 4rem)`. LIRN section padding is taller (`clamp(4rem, 9vw, 7.5rem)`); TORNS is denser (`clamp(3.25rem, 7vw, 5.5rem)`). Two-column `section-grid` collapses to one column below 52rem. Hero route labels hide below 52rem; LIRN hero min-height softens below 36rem.

## Elevation & Depth

Mostly flat. Depth is tonal block stacking plus one signature amber ring behind the LIRN hero. ProductStory panels use flat civic fills and thin civic-strong borders, not soft drop shadows. Operate dashboard may keep utility shadows for ops chrome; marketing surfaces do not lead with shadow hierarchy.

### Named Rules
**The Flat Brochure Rule.** Prefer solid fills and borders over ambient shadow stacks on LIRN/TORNS marketing pages.

## Shapes

- **Pill CTAs** (`{rounded.cta}` / `999px`): All marketing primary/secondary/nav CTAs.
- **Soft block** (`{rounded.block}`): Esencia amber shell.
- **Hero ring**: Large circular amber stroke anchored bottom-right on the LIRN navy hero.
- **Operate sharp** (`{rounded.operate}` / `2px`): Dashboard nav items, panels, and chips — density over brochure softness.
- Hairline dividers via `--line` mixes; capability list uses small civic-strong squares as end markers.

## Components

### Buttons
- **Shape:** Full pill (`999px`); min-height 3rem; padding ~0.8rem 1.4rem; weight 800.
- **Primary (LIRN):** Amber fill, navy text → coral fill, paper text on hover.
- **Secondary (LIRN hero):** Transparent with light border → amber border/text on hover.
- **Primary (TORNS):** Paper fill, civic text → civic-strong fill on hover.
- **Nav CTA:** Same amber→coral pill language as primary, slightly tighter padding.

### Cards / Containers
- **Esencia:** Soft-rounded amber block on paper shell; navy type; primary inside flips to navy fill.
- **ProductStory panel:** Civic rectangle, thin civic-strong border, synthetic visuals (occupation bar, camera grid, recommendation rail). Always labeled as synthetic UI.
- **Signal / contact / limit:** Full-bleed solid strips (coral or civic-strong) — not card chrome.

### Navigation
- **Marketing:** White bar, navy wordmark (800), ink links (700), amber pill Hablemos; coral for hover/active text and CTA hover.
- **Operate:** Night-panel bar, civic-strong active/hover borders, 2px corners, denser item padding.

### ProductStory (signature)
Three-step tablist (ocupación / cámara / recomendación) beside a civic synthetic panel. Panel copy is large Manrope; chrome labels may track uppercase inside the instrument only. Include the synthetic disclaimer; never present figures as live customer metrics.

## Do's and Don'ts

### Do:
- **Do** switch skins with `data-theme="lirn"` / `data-theme="torns"` and keep accent tokens on `--accent` / `--accent-hover`.
- **Do** use Manrope 800 for slogans, product marks, and CTAs; keep body at 500.
- **Do** alternate solid brochure bands and pill CTAs; keep Operate corners at 2px.
- **Do** treat coral as LIRN’s loud emphasis (hover + signal + contact), and civic-strong as TORNS’s loud emphasis.

### Don't:
- **Don't** revive Bodoni, champagne, warm paper `#F7F5F0`, or square uppercase editorial CTAs.
- **Don't** use frosted glass, night-network SVG heroes, or TRO cyan/glow as brand materials.
- **Don't** put amber marketing CTAs on TORNS product sections or civic fills on the LIRN hero CTA pair.
- **Don't** invent metrics, testimonials, client logos, or “live” ProductStory numbers — keep the synthetic label.
