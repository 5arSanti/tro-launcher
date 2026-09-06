# LIRN Architectural Tech Corporate landing

Date: 2026-09-06  
Status: approved for planning  
Surface: `lirn-web-main` only  
Visual authority: `docs/landing-instructions.md`  
Problem and evidence: `docs/torns-project-structure.md`  
Technical product truth: `PRODUCT.md` and `docs/torns-doc.md`. The site can state YOLO and cameras. Metro/APCA is not a client.

This spec replaces the 2026-09-05 vibrant-brochure direction for the commercial site. The dashboard (`tro-frontend`) stays on the prior skin until a later cycle.

## Goal

Rebuild the LIRN commercial site so that it speaks the language of the official logo: black and white structure, geometry, and `#00A8FF` as an activity signal.

LIRN is the firm. TORNS is the product. Transmilenio is the case study and the applied prototype, not a signed operator pilot.

Success:

- A visitor reads LIRN as a structured technology firm, not as a luxury brand or a generic startup.
- A visitor opens `/torns` and understands the product, the Transmilenio problem, and the team research.
- The visitor can start contact with **Hablemos**. The send channel stays reserved until the team publishes it.
- No invented clients, pilots, impact metrics, or third-party logos.

## Decisions locked

| Topic | Choice |
| --- | --- |
| Visual world | Architectural Tech Corporate from `docs/landing-instructions.md` |
| Problem text | Transmilenio paragraph from `docs/torns-project-structure.md` |
| Scope of TORNS | Same foundations work on any mass-transit system with stations |
| Transmilenio label | Case study and prototype applied to the Transmilenio problem. Not a signed pilot with the operator |
| Site voices | LIRN home = firm. `/torns` = product, purpose, and problem |
| Home depth | Firm chapters plus a short TORNS teaser. Full case and evidence live only on `/torns` |
| This cycle | `lirn-web-main` only. No dashboard restyle |
| Evidence density | Full survey (10 questions, charts, conclusions) plus almost the full SITP controller interview |
| Implementation approach | Two-route narrative rebuild. New tokens and sections. Keep React + Vite and current routes |
| Hero line (LIRN) | **La demanda no espera.** |
| CTA | Hablemos / Contacto. No comprar. No fake demo |

## Anti-references

- Gold, ornamental luxury, hotel or finance aesthetic
- Editorial serif as the main type
- Current amber / navy brochure skin
- Night-network SVG or particle heroes
- Frosted glass as brand
- SaaS feature cards
- Invented metrics, clients, testimonials, team, or years
- TransMilenio S.A. as client, partner, or signed pilot
- Metro de Bogotá / APCA as a commercial claim
- TRO, Sistema de Vigilancia, Transport Route Optimization
- `#00A8FF` as a page fill or hero wash

## Brand and product facts

Keep these strings exact:

- Mission: Hacer que el transporte masivo ajuste su oferta a la demanda real de cada estación, midiendo quién espera ahora y no solo lo que el horario predijo.
- Vision: Que cada estación de un sistema masivo opere con la demanda que ocurre, no con la que se supuso.
- LIRN: firm. The name joins Line and RN from TORNS.
- TORNS: product. Train Optimization Route and Navigation System. "Train" is the origin of the name, not a limit of the offer.
- Endorsed brand: TORNS has its own face. **by LIRN** is the manufacturer mark.
- Language: Spanish.

Prototype capabilities that the site can state:

- Video sources / cameras by station
- Live detection and count (YOLOv11)
- Frames and metrics on WebSocket
- Dispatch recommendations (frequency, capacity)

The current system is a functional prototype. It is not an integration with a live operator control room.

## Visual system

### Color

Structure is black and white in near-equal blocks. The page is not a dark theme with small cards.

| Role | Value | Use |
| --- | --- | --- |
| Black | `#000000` or near-black | Full sections, type on white |
| White | `#FFFFFF` or slightly warm white | Full sections, type on black |
| Graphite | soft gray | Metadata: indices, dates, n=20 |
| Activity | `#00A8FF` | Lines, nodes, chart bars, hover, live indicators |

`#00A8FF` is a signal. It is not a background for heroes or pages.

This cycle updates `PRODUCT.md` and `DESIGN.md`. The prior ban on TRO cyan ends. The new rule limits `#00A8FF` to activity.

### Logo

Four official files in `lirn-web-main/public/logos/`. Do not distort or redraw them in CSS.

| File | Use |
| --- | --- |
| `LIRN-v1 - white.jfif` | Full wordmark on dark |
| `LIRN-v1 - black.jfif` | Full wordmark on light |
| `LIRN-v2 - white.jfif` | Icon on dark |
| `LIRN-v2 - black.jfif` | Icon on light |

Wordmark (v1) in nav and heroes. Icon (v2) as the compact mark. White on black. Black on white.

Extract logo geometry for the site: diagonal cuts, modules, negative space. Use that geometry for image masks, separators, and hover. The official mark stays an image.

### Type

One disciplined sans (Manrope or Inter). Large editorial headlines. Small uppercase labels. The wordmark already has personality. UI type must not copy the letterforms.

### Photography

Use existing files in `lirn-web-main/public/images/` (`image-1.jfif` … `image-7.jfif`, `lirn-hero.jpg`, `torns-hero.jpg`). Crop with geometric masks. Do not add generic stock. Do not rely on photography alone.

### Motion

Geometric reveals, drawn lines, scroll type, survey counters. Motion must read as a system.

Do not use particle fields, bounce, decorative 3D, or generic startup loops.

## Information architecture

### Home (`/`) — the firm

1. **Hero.** Official wordmark. Line: **La demanda no espera.** Support: LIRN makes mass transit respond to what occurs in the station. CTAs: Hablemos and Ver TORNS.
2. **Company.** Who we are: mobility firm. One product. Systems with stations.
3. **Purpose.** Mission and vision as brand statements, not small paragraphs.
4. **Capability.** Three editorial ideas: measure, see, recommend. No YOLO. No Transmilenio.
5. **TORNS teaser.** One visual cut. One sentence on the offer / demand mismatch. Link to `/torns`.
6. **Contact.** Hablemos. The send channel is not published. The block reserves the space.

The home does not include the interview, the survey, or the full Transmilenio case.

### TORNS (`/torns`) — the product

1. **Hero.** TORNS by LIRN. Purpose: real demand in the station, then a recommendation to control.
2. **Problem.** The Transmilenio paragraph from `docs/torns-project-structure.md`. Contrast: expected demand vs real demand.
3. **Frame.** Label: caso de estudio y prototipo aplicado al problema de Transmilenio. One line: this is not a signed pilot with the operator. The same foundations apply to metro, BRT, or rail.
4. **System.** Observe → detect → measure → analyze → recommend → optimize. State only prototype facts: cameras, YOLOv11, WebSocket, dispatch recommendations.
5. **Discovery.** Almost the full SITP controller interview. Radio codes are operational evidence, not brand decoration.
6. **Validation.** All 10 survey questions, charts, and the written conclusions. Always visible: team research, 17 August 2026, n=20, not an operator result.
7. **Close.** Any mass-transit system with stations. CTA Hablemos.

Nav on both pages: LIRN, TORNS, Contacto, Hablemos. Footer states the firm and the product. 404 stays.

## Components

Each unit has one job.

| Unit | Job | Depends on |
| --- | --- | --- |
| `tokens.css` | Black, white, graphite, activity blue | none |
| `SiteChrome` | Nav and footer. Official wordmark or icon by background | `/public/logos` |
| `HomePage` | Firm narrative plus teaser | `copy.ts`, chrome |
| `TornsPage` | Product, case, evidence | `copy.ts`, `evidence.ts` |
| `copy.ts` | Brand voice, mission, vision, hero, prototype frame | none |
| `evidence.ts` | Interview, 10 questions, conclusions, n=20 label | `docs/torns-project-structure.md` |
| `Geometry` | Cuts, masks, separators | tokens |
| `InterviewBlock` | Interview on `/torns` only | `evidence.ts` |
| `SurveyBlock` | Survey and charts on `/torns` only | `evidence.ts` |

Retire `Esencia` and `ProductStory`. Replace the typographic `Wordmark` with official logo files.

Pages assemble sections. Pages do not store survey data.

## Data flow

All content is static. There is no API in this cycle.

- Brand strings live in `copy.ts`.
- Research artifacts live in `evidence.ts`.
- Images and logos live in `/public`.
- Hablemos does not send a message until a channel exists.

Survey numbers that must appear (from the team instrument, n=20, 17 August 2026):

1. Frequency of use: 50% three or more times per week. 30% daily.
2. Time bands: 80% 16:00–19:30. 60% 06:00–08:30.
3. Fixed arrival: 80% have a required arrival. 35% face a real cost if late.
4. Recency: 55% skipped full vehicles in the last 7 days. 80% in the last month.
5. Frequency of the problem: 65% several times per week.
6. Extra time per event: 70% lose 15 minutes or more. 35% lose more than 30 minutes.
7. Time per month: average about 3 hours. 25% more than 6 hours. Label the monthly figure as an estimate from declared duration × frequency.
8. Current strategies: 75% leave earlier. 30% pay taxi or an app. 25% do nothing and endure.
9. Spend: 90% spent something last month. 65% spent COP 50.000 or more.
10. How they name the problem: 40% offer/demand imbalance. 25% stress. 20% punctuality.

Open answers: crowding and inability to board (5). Traffic jam (4). 14 free-text replies. 6 people did not answer.

Conclusions stay as written in `docs/torns-project-structure.md`, with the n=20 label next to them.

Interview: keep the controller answers on radio dependence, TP 19, TQ 04, lack of a predictive system, TP 69 / TP 70, manual contingency, fines from the managing entity, and daily peak contingencies. Do not name the person. Do name the role: controlador SITP. Omit the classroom greeting. The public page does not say that the authors are students. The method line is enough: team research with a SITP controller.

## Errors and empty states

- Unknown routes use the current 404.
- Contact shows a visible block and does not fake a working form.
- If an image is missing, show `alt` text and an empty geometric frame. Do not invent a photo.
- No UI state says "piloto firmado", "cliente TransMilenio", or "alianza".

## Tests

- Mission and vision strings stay exact.
- `/torns` includes the case-study frame and the "not a signed pilot" line.
- Evidence shows the n=20 team-research label.
- Tokens: black and white are structural. `#00A8FF` exists only on accent variables.
- Update `scripts/assert-torns-tokens.mjs` so that activity blue is legal and page-fill blue is not.
- Home and `/torns` render the required headings.
- Official logo files resolve.
- Remove tests for `Esencia` and `ProductStory`.

## Out of scope

- `tro-frontend` restyle
- Backend, YOLO module, or camera install
- A real send channel (mailto, form, or chat) until the team delivers it
- A product line beyond TORNS
- English locale
- Metro / APCA as the public case

## Files this cycle will change

- `lirn-web-main/src/pages/HomePage.tsx`
- `lirn-web-main/src/pages/TornsPage.tsx`
- `lirn-web-main/src/components/SiteNav.tsx` and footer chrome
- `lirn-web-main/src/content/copy.ts`
- `lirn-web-main/src/styles/tokens.css` and `site.css`
- New: `evidence.ts`, `Geometry`, `InterviewBlock`, `SurveyBlock`
- Remove or stop using: `Esencia.tsx`, `ProductStory.tsx`, typographic `Wordmark`
- `PRODUCT.md` and `DESIGN.md` (palette and Transmilenio label)
- Token assert script and page tests

Assets already in repo: `lirn-web-main/public/logos/` and `lirn-web-main/public/images/`.
