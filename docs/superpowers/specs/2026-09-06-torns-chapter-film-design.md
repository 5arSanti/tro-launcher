# TORNS chapter film on `/torns`

Date: 2026-09-06  
Status: approved for planning  
Surface: `lirn-web-main` `/torns` only  
Visitor mode: Persuade  
Visual authority: Architectural Tech Corporate, refined — not replaced  
Parent spec: `docs/superpowers/specs/2026-09-06-lirn-architectural-tech-landing-design.md`

This spec raises the visual value of TORNS. The page stays a product story. It stops reading as a stack of flat bands. The grammar is a chapter film: one scroll-directed story, each chapter using the form that fits (photo cut, stage, quote, chart morph). It is not a pair of identical carousels. The iPhone 17 Pro page is a narrative reference, not a visual clone: no Buy, no product-object fetish, no glass luxury.

## Goal

A visitor on `/torns` first understands TORNS as a system for any mass-transit network with stations. Then the Transmilenio case occupies a full chapter: story first, then one survey question at a time with a chart that moves. The blue field is lighter and less opaque. Motion explains relationship, not decoration.

Success:

- The product explanation precedes the case and the problem.
- The four system acts and the case evidence share one language (Espera / Ve / Mide / Actúa).
- Each of the ten survey questions is a staged moment, not a row in a list.
- Survey values, interview answers, and the n=20 team-research label stay exact.
- No invented clients, signed pilots, live occupancy, or operator impact metrics.

## Decisions locked

| Topic | Choice |
| --- | --- |
| Approach | Chapter film (option 1) |
| Order | Product → System → Transmilenio case → Close |
| Case shape | One sequence: story (problem, frame, controller) then data (ten questions) |
| Dynamism | Mixed instruments inside chapters, not a two-carousel limit |
| System chapter | Act stage + pipeline track + prototype list + expected/real bridge |
| Case data | One question per moment; chart form follows the datum |
| Color | Lift TORNS blues; keep `#00A8FF` as energy; add `--torns-air` |
| Home LIRN | Untouched except the TORNS teaser, which inherits the new TORNS tokens |
| Dashboard | Out of cycle. `tro-frontend` cyan ban stays |
| Copy source | Existing `copy.ts` and `evidence.ts`. No new commercial claims |

## Anti-references

- Two identical carousels as the whole page
- A fake live dashboard or a morphing occupancy object that reads as operator telemetry
- Ten identical bar cards stacked in one band
- Particles, glow, parallax, or a generic fade-up on every block
- Cave-black TORNS (`#031422` / `#06263d` as the default field)
- TransMilenio S.A. as client, partner, or signed pilot
- Invented percentages, testimonials, or third-party logos
- Restyle of LIRN firm bands to TORNS blue
- Luxury glass / iPhone marketing chrome

## Page spine

Four chapters. Scroll directs. `ChapterRail` jumps to a chapter by hash. Wrap is forbidden.

### Chapter 1 — Product

Existing hero: TORNS name, by LIRN, headline, support, Hablemos, `torns-hero.jpg`. The case is not named here.

### Chapter 2 — System

Existing copy, new staging.

1. **Act stage.** Four acts in one frame: La estación no espera → La cámara ve → La demanda se cuenta → El control recibe. Photo files stay `image-2`, `image-5`, `image-6`, `image-7`. Advance by scroll or previous/next. Photo changes with a geometric cut (`--cut`), not a generic fade. Index `01–04` and title replace in place.

   Schematic on the side, honest, no invented %:

   | Act | Motion |
   | --- | --- |
   | Espera | Two bars labeled Demanda prevista / Demanda real. The real bar grows. Qualitative only. |
   | Ve | A camera node lights on the photo. |
   | Mide | Count marks appear. Label: detection, not an operator count. |
   | Actúa | The schematic becomes a frequency / capacity label, not a fake KPI. |

2. **Pipeline track.** The six steps (Observar → Optimizar) with existing bodies. Active step lights; body appears under it. Nodes ignite in order on enter. Desktop: scroll through the row. Mobile: horizontal track of the same steps.

3. **Prototype.** The four approved capabilities beside `image-3`. No SaaS cards.

4. **Bridge.** The expected / real contrast returns at full width and hands the page to Transmilenio: same graphic, new context.

This chapter contains no survey n, no interview, and no occupancy figures.

### Chapter 3 — Transmilenio

One piece. Story track, then data track. The team-research label is fixed on the chapter: investigación del equipo, 17 de agosto de 2026, n=20. Not an operator result. Not a signed pilot.

**Story track**

1. The approved Transmilenio problem paragraph at chapter scale, with a station photo. The expected / real contrast from the System chapter reappears with this public case named.
2. Case frame: caso de estudio y prototipo aplicado; no es un piloto firmado; same foundations for metro / BRT / tren.
3. Controller SITP. All eight interview turns, one at a time: question above, answer in display. Previous/next or scroll. Do not name the person. Do not restore a Q&A wall.

**Data track**

Ten moments. Each moment shows question index, title, existing analysis sentence, chart, and n=20. Changing question morphs the chart from the previous values to the new ones.

| Questions | Chart form |
| --- | --- |
| q5, q7 | Hero number that counts in. q5 is 65%. q7 hero is 25% (más de 6 h / mes). The 3-hour monthly average stays in the analysis sentence only; do not animate it as a percent. q7 stays labeled as a team estimate (declared duration × frequency). Do not draw q7 as a 100% bar. |
| q1, q3, q4, q6, q9 | Dual bars that grow and compare. |
| q2 | Two time-band peaks. Multiple-choice nature stays visible. |
| q8, q10 | Ranking that rises. |

Each data moment carries one System-act tag: Espera, Ve, Mide, or Actúa. Implement the table below as a static map next to `EvidenceStage`. Do not invent new evidence values.

| Question | Act tag |
| --- | --- |
| q1, q2, q3 | Espera |
| q4, q5 | Ve |
| q6, q7, q9 | Mide |
| q8, q10 | Actúa |

Controls: “Pregunta N de 10”, previous/next, keyboard, swipe on mobile. No wrap at the ends.

Chapter close: the existing conclusions paragraph. No new figures.

### Chapter 4 — Close

Existing close: official mark, “Cualquier sistema masivo con estaciones.”, Hablemos. No new data.

## Color

Lift the TORNS field. Do not change LIRN black/white structure. `#00A8FF` remains activity. The home TORNS teaser inherits these tokens.

| Token | From | To | Use |
| --- | --- | --- | --- |
| `--torns-deep` | `#031422` | `#0a3a5c` | Hero and dark tracks |
| `--torns-mid` | `#06263d` | `#135a84` | Active act, survey slide, panels |
| `--torns-panel` | `#0a3350` | `#1c7aad` | Raised surface, chart, active pipeline |
| `--torns-air` | — | `#e8f4fb` | Light System bands and the bridge |
| `--activity` | `#00A8FF` | unchanged | Lines, nodes, bar fill, focus |
| `--activity-ink` | `#006da8` | unchanged | Text and focus on light grounds |
| White | — | unchanged | Type on deep; rest between chapters |

Photos carry less dark overlay so the blue is visible and the image is not a veil. Update `DESIGN.md` and the TORNS brand line in `PRODUCT.md` to this scale during implementation.

`scripts/assert-lirn-tokens.mjs` still forbids activity as a LIRN page fill. TORNS designated classes may use activity fills. `scripts/assert-torns-tokens.mjs` on `tro-frontend` does not change.

## Motion

One authored material set:

1. Geometric photo cut between acts and between interview turns (about 400 ms, `--ease`).
2. Data travel: bars and hero numbers interpolate from the previous value to the next (400–700 ms). This is the focal moment.
3. Pipeline nodes ignite in a short chain.

No particles, glow, parallax, or per-section fade-up.

`prefers-reduced-motion: reduce` jumps to the target act or question, shows final values, and skips interpolation and node chains.

If a chart cannot mount, render title, percentage text, and analysis. Do not show a fake demo spinner.

## Components

`TornsPage` orchestrates chapters. It does not become a single megacomponent.

| Unit | Job | Depends on |
| --- | --- | --- |
| `ChapterRail` | Product / Sistema / Caso / Cierre index and jump | route, hash |
| `ActStage` | Four acts: clipped photo, copy, mutating schematic | `copy` + station photos |
| `PipelineTrack` | Six steps that ignite | `copy.systemSteps` |
| `QuoteStage` | One interview turn | `evidence.turns` |
| `EvidenceStage` | One survey question plus morphing chart | `evidence.questions` |
| `ValueChart` | Dual bar, hero number, peaks, or ranking | `evidence` values only |

Reuse `BrandMark`, `StationPhoto`, `SiteNav`, `SiteFooter`, `ByLirn`.

`InterviewBlock` and `SurveyBlock` stop being static lists. Their content moves into `QuoteStage` and `EvidenceStage`. Delete the old list markup once the stages ship.

Data stays in `evidence.ts` and `copy.ts`. Stages do not invent numbers. q7 remains an estimate. n=20 and the research label are required props, not decoration.

Home still must not publish the interview, the survey, or the full Transmilenio paragraph.

## States and errors

- Entering System starts on act 1. Entering the interview starts on turn 1. Entering the data track starts on q1.
- Previous on the first item and next on the last item do nothing.
- Focus remains visible (`--activity` on dark, `--activity-ink` on air/white).
- Missing photo: empty geometric frame and `alt`. No stock placeholder.
- Unknown routes keep the current 404.
- Contact remains reserved. No fake form.
- No UI state says “piloto firmado”, “cliente TransMilenio”, or “alianza”.

## Tests

- Mission and vision strings stay exact (home).
- `/torns` still contains the case-study frame and the “not a signed pilot” line.
- Evidence still shows the n=20 team-research label.
- All ten survey analyses and all eight interview turns remain reachable.
- `ValueChart` final width or number matches `value`.
- q7 is not drawn as a 100% bar and keeps the estimate label.
- Token assert: LIRN has no activity page fill; TORNS designated classes may.
- `prefers-reduced-motion` path has no interpolation.
- Official logo files still resolve.
- Site build and existing copy/evidence tests stay green.
- Dashboard token assert is unchanged.

## Out of scope

- `tro-frontend` restyle
- Backend, YOLO module, or camera install
- A real send channel until the team delivers it
- New photography
- New mission or vision wording
- English locale
- A product line beyond TORNS
- Cloning Apple chrome or a persistent fake-live station object

## Files this cycle will change

- `lirn-web-main/src/pages/TornsPage.tsx`
- `lirn-web-main/src/components/` — add the stage units above; retire list-only interview/survey markup
- `lirn-web-main/src/styles/tokens.css` and `site.css`
- `lirn-web-main/src/content/copy.ts` only if a stage label is missing (act tags, “Pregunta N de 10”). No rewrite of approved product sentences
- `lirn-web-main/src/content/evidence.ts` values stay identical. Act tags live in a static map, not in mutated survey numbers
- Tests next to copy, evidence, and charts
- `PRODUCT.md` and `DESIGN.md` (TORNS palette and `/torns` chapter film)
- `scripts/assert-lirn-tokens.mjs` only if new TORNS fill classes must be allowlisted

Assets already in repo: `lirn-web-main/public/logos/` and `lirn-web-main/public/images/`.
