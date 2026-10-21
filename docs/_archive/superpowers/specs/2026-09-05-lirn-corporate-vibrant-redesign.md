# LIRN corporate vibrant + TORNS microsite redesign

Date: 2026-09-05  
Status: approved for planning  
Surfaces: `lirn-web-main` (Persuade), `tro-frontend` (Operate restyle)  
Reference structure/language: [sig-etraining landing](https://5arsanti.github.io/sig-etraining-landing-page/) — adapted, not cloned

## Goal

Replace the current luxury-editorial look (Bodoni, champagne, glass, flat TORNS page), which reads as AI-default, with a **vibrant corporate** system:

- **LIRN** = corporate brochure in the etraining visual language (bold sans, solid color blocks, rounded CTAs).
- **TORNS** = denser **product microsite** in civic blues, with an interactive scroll-story.
- Same type radii and section grammar so they stay one family; skins diverge on purpose (approach **2**).

Success: a visitor believes LIRN is a real mobility company, understands TORNS as the offerable product, can start contact (**Hablemos**), and experiences TORNS as a living product story — without invented proof.

## Decisions locked

| Topic | Choice |
| --- | --- |
| Reference use | **B** — structure + visual language (blocks, bold sans, rounded CTAs), not purple/orange clone |
| LIRN color pair | **B** — charcoal/navy + warm accent |
| Warm accent | **C** — amber on CTAs; coral only on hover / rare emphasis |
| TORNS dynamism | **B** — scroll-story (ocupación → cámara → recomendación) with labeled synthetic UI |
| Architecture | **2** — LIRN brochure / TORNS microsite |

## Anti-references

- Bodoni / editorial serif + champagne luxury cluster
- Night network SVG as hero essence
- Frosted glass nav as brand statement
- Fake metrics, logos, testimonials, case studies, team, or “22 años”-style invented stats
- Treating Transmilenio as client/pilot
- Cyan/glow TRO legacy on dashboard

## Visual identity

### Shared (family)

- Modern **sans** for display and UI (one family, bold hierarchy — no luxury serif).
- Rounded CTAs; solid color fields; high contrast between dark and light sections.
- Endorsed brand: TORNS has its own face; **by LIRN** remains manufacturer mark.
- Language: Spanish; approved mission, vision, problem, solution, limit copy preserved.

### LIRN skin

- Ground: deep navy / charcoal.
- Accent: **amber** (primary CTAs, esencia panel, key highlights).
- Secondary: **coral** only for hover / rare emphasis.
- Paper/white sections for breathing room (etraining rhythm).

### TORNS skin

- Civic blues (prior palette orientation: roughly `#1B4D73` / `#3D8EC4` and neighbors).
- Same type and button radii as LIRN.
- Higher information density; product panels over brochure whitespace.
- `tro-frontend` Operate UI inherits TORNS blue skin, not LIRN amber.

## LIRN home structure

1. Nav — LIRN | Empresa | TORNS | Hablemos (amber)
2. Hero — navy field; short lead + large slogan; CTAs Hablemos + Ver TORNS
3. Short signal — white band with a **true** line only (e.g. one product · systems with stations); never invented years/metrics
4. Nuestra esencia — large amber panel: mission + vision + slogan; link deeper
5. Quiénes somos — navy block: mobility company statement
6. Producto — TORNS by LIRN as sole product line; link to microsite
7. Problema — public Transmilenio context + disclaimer
8. Contacto — Hablemos; send channel pending until provided
9. Footer

Slogan default (unless copy is later replaced by the team): **Oferta que responde a la estación.**

## TORNS microsite structure (`/torns`)

1. Product hero — TORNS + by LIRN; oficio; CTAs to contact + story anchor
2. Problem — approved why copy + disclaimer
3. **Scroll-story (core)** — three acts, labeled synthetic UI (not real-client evidence):
   - 01 Ocupación
   - 02 Cámara / detección
   - 03 Recomendación al control  
   Advance via scroll and/or clickable steps; motion must explain the mechanism
4. Capabilities — only confirmed prototype abilities
5. Limit — prototype; no signed pilot
6. Close — any mass system with stations + Hablemos
7. Infographic slot — when Pages URL / asset exists

## Architecture and scope

| Area | Work |
| --- | --- |
| `lirn-web-main` | Replace tokens, type, Home, `/torns`; add Esencia + ProductStory components; theme via `data-theme` |
| `tro-frontend` | Restyle Operate chrome/tokens to TORNS blues; keep routes and data behavior |
| Docs | Update `PRODUCT.md` brand commitments; replace `DESIGN.md` after build (Impeccable documenter) |

### Components

- Theme tokens: LIRN vs TORNS
- Esencia block (mission / vision / slogan)
- ProductStory (three synthetic acts)
- Contact: navigational CTA; no fake live submit until channel exists

### Testing

- Keep / extend Vitest copy and route assertions
- Token asserts: amber present for LIRN commercial; civic blues for TORNS/dashboard; no legacy `#00a8ff`
- Screenshot review: LIRN desktop/mobile; TORNS desktop/mobile including story acts

## Out of scope

- Inventing contact email/form backend
- Completing QR/infographic before public `/torns` URL
- Rewriting operational dashboard copy beyond identity
- New products beyond TORNS

## Implementation notes for planning

- Treat current editorial CSS/assets as anti-reference; rebuild section system rather than polish Bodoni/champagne.
- ProductStory UI must be visually rich enough to kill “flat TORNS” without claiming real deployments.
- Approach 2 allows TORNS to feel almost separate; do not dilute it back into a thin LIRN clone with blue accents only.
