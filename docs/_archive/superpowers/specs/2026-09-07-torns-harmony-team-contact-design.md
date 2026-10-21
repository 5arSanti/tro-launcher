# TORNS visual harmony: team, spacing, contact, presentation script

**Date:** 2026-09-07  
**Status:** Approved for planning (brainstorm)  
**Scope:** Commercial site `lirn-web-main` — `/torns` primarily; Home contact stays reserved  
**Out of scope:** `tro-frontend`, mission/vision on TORNS, team photos/roles/bios, redesign of the chapter-film narrative, fake metrics/clients

## Problem

TORNS needs a visual-harmony pass and four additions:

1. A brief **Quiénes somos** (LIRN + three named teammates) early in the page.
2. **Title and section spacing** fixes (e.g. “Cómo funciona” glued after the station story stage).
3. A real **contact form** that writes rows to Google Sheets via Apps Script.
4. A short **spoken presentation script** (~6–8 min) covering each section and the UX/UI foundations in conversational product language.

## Locked decisions

| Topic | Decision |
|-------|----------|
| Approach | Harmony pass on the existing chapter film (not a full re-chapter) |
| Team presentation | Names only: Johel Santiago Arias, Rebeca Pedrozo, Hanna Cerinza — no roles, bios, or photos |
| LIRN on TORNS | Brief firm blurb (Home “Quiénes somos” tone); no mission/vision duplication |
| Section order | Producto → Quiénes somos → Sistema → Problema → Caso → Descubrimiento → Validación → Cierre → Contacto |
| Cierre vs Contacto | Two separate end blocks (Cierre then Contacto) |
| Form fields | nombre*, email*, organizacion (optional), mensaje* |
| Form backend | Google Apps Script `doPost` → Sheet tab `Contactos` |
| Endpoint config | `VITE_CONTACT_ENDPOINT` in env; `.env.example` documents the key; no hardcoded production URL in git |
| Home contact | Remains reserved; live channel lives on `/torns#contacto` |
| Presentation script | Single markdown ~6–8 min, conversational, product-first; UX/UI foundations woven in (not a separate annex) |
| Script path | `docs/presentations/torns-landing-guion.md` |
| Apps Script ops doc | `docs/contact-apps-script.md` (snippet + setup steps already validated in brainstorm) |

## Page architecture

### New order on `/torns`

1. **Producto** (`#producto`) — existing hero  
2. **Quiénes somos** (`#empresa`) — new  
3. **Sistema** (`#sistema`) — existing; spacing fixes inside  
4. **Problema** (`#problema`) — existing  
5. **Caso** (`#caso`) — existing  
6. **Descubrimiento** — existing (off-rail)  
7. **Validación** — existing (off-rail)  
8. **Cierre** (`#cierre`) — existing phrase + link to LIRN  
9. **Contacto** (`#contacto`) — new form  

### ChapterRail

Add anchors for **Empresa** (`#empresa`) and **Contacto** (`#contacto`). Keep Producto, Sistema, Problema, Caso, Cierre. Discovery and validation stay off-rail.

### Quiénes somos content rules

- One short LIRN presentation (reuse / adapt Home company lede: firma de movilidad; un producto; sistemas masivos con estaciones).
- Three names in a quiet typographic row or list — not heavy cards.
- Band: white or `--torns-air` so it reads as firm breath after the dark/photo hero and before Sistema.
- Do not publish mission, vision, invented years, or “students” framing.

### Principle

On TORNS, LIRN is the **manufacturer** of the product (brief), not a second full firm homepage.

## Visual rhythm (spacing)

### Root cause

`.display` uses `margin-block: 0`. Sistema only adds margin after `.display + .torns-act-stage` / `.display + .torns-pipeline`. There is **no** rule for `.torns-act-stage + .display`, so “Cómo funciona” sits tight under ActStage.

### Design

- Introduce a shared rhythm token, e.g. `--torns-block-gap: clamp(2.5rem, 6vw, 4.5rem)`.
- Explicit gaps:
  - after ActStage → “Cómo funciona”
  - after pipeline → “El prototipo”
  - any non-first `.display` in a TORNS band gets top margin when it follows another block
- Review section `padding-block` so consecutive bands do not feel cramped.
- Contacto band must contrast with Cierre (adjacent but visually distinct acts).

Palette stays the civic TORNS set (`torns-deep` / mid / panel / air); this pass is breathing and hierarchy, not a recolor.

## Contact form

### UI

- Section `#contacto` on TORNS only.
- Fields: nombre*, email*, organizacion (optional), mensaje*.
- States: idle → submitting → success / error (Spanish copy).
- Primary submit control labeled **Enviar** (not the reserved “Hablemos” stub).
- Respect `prefers-reduced-motion` on feedback motion.

### Client → Apps Script

- `POST` body JSON sent as `Content-Type: text/plain;charset=utf-8` to avoid Apps Script CORS/preflight friction.
- Payload: `{ nombre, email, organizacion, mensaje, origen: "torns" }`.
- Client validates required fields + simple email shape; script re-validates.
- If `VITE_CONTACT_ENDPOINT` is missing: show a clear configuration error; **never** fake success.

### Sheet schema

Tab `Contactos`, header row:

`timestamp | nombre | email | organizacion | mensaje | origen`

### Ops

Document the Apps Script source and deploy steps in `docs/contact-apps-script.md`. Operator pastes script into the spreadsheet project, deploys as Web App (execute as me; access anyone), copies `/exec` URL into local env.

### Nav / footer

Live contact target is **`/torns#contacto`**. Home `#contacto` stays the reserved note without a working form. SiteNav / SiteFooter “Hablemos” and Contacto links that currently go to `/#contacto` update to `/torns#contacto`. On the TORNS page itself, in-page `#contacto` is enough.

## Presentation script

Deliverable: `docs/presentations/torns-landing-guion.md`

Spoken outline (~6–8 minutes):

1. Opening — what TORNS is; “by LIRN”  
2. Quiénes somos — brief firm + three names  
3. Sistema / cómo funciona — station → dispatch  
4. Problem + Transmilenio case (prototype, not signed pilot)  
5. Discovery + validation (interview + n=20 evidence label)  
6. Close + contact  
7. Design thread woven through (not a bolted appendix): white/blue bands, Manrope, geometric cut, one-at-a-time stages, morphing charts, title air — natural language, product presentation oriented  

Hard truth constraints in the script mirror PRODUCT evidence rules (no invented clients, metrics, signed pilot, or operator results).

## Components and files (implementation map)

| Unit | Responsibility |
|------|----------------|
| `TeamSection` (or inline block) | LIRN lede + three names from `copy.ts` |
| `ContactForm` | Local state, validation, fetch to endpoint |
| `TornsPage` | Insert team after hero; contact after close; Reveal wrappers |
| `ChapterRail` | Empresa + Contacto links |
| `SiteNav` / `SiteFooter` | Point contact CTA to `/torns#contacto` where appropriate |
| `copy.ts` | Team names, contact labels, success/error strings |
| `site.css` / `tokens.css` | `--torns-block-gap`, stage→title gaps, team + form layout |
| `.env.example` | `VITE_CONTACT_ENDPOINT=` |
| `docs/contact-apps-script.md` | Script + setup |
| `docs/presentations/torns-landing-guion.md` | Spoken script |
| `PRODUCT.md` / `DESIGN.md` | Contact channel live on TORNS; team names authorized on product page |

## Error handling

| Case | Behavior |
|------|----------|
| Empty required field | Inline validation; no request |
| Invalid email | Inline validation; no request |
| Missing env endpoint | Error state: canal no configurado |
| Network / non-OK / `{ ok: false }` | Error state: reintentar; do not clear message unnecessarily |
| Success `{ ok: true }` | Success state; optional field clear |

## Testing

- TORNS shows Quiénes somos with the three exact names; mission/vision still absent on `/torns`.
- ChapterRail includes Empresa and Contacto.
- ContactForm: validation; success with mocked `fetch`; error when endpoint unset.
- Nav/footer contact target updated as specified.
- No regression: case-not-pilot, evidence label, Home still without interview/survey.
- Presentation markdown: **no automated test** (docs-only deliverable).

## Anti-goals

- Do not invent roles, bios, photos, years, or testimonials for the team.
- Do not put a working form on Home in this pass.
- Do not claim Transmilenio signed pilot or operator-owned survey results.
- Do not hardcode the Apps Script URL into the repository.
- Do not restyle `tro-frontend`.

## Success criteria

- Visitor can meet the firm briefly and the three names early on `/torns`.
- “Cómo funciona” (and peer titles) breathe; sections no longer collide.
- A real submission lands a row in Google Sheets when the endpoint is configured.
- Presenter has a ~6–8 min conversational script that walks the landing and explains design foundations without breaking product truth.
