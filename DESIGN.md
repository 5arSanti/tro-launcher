---
name: LIRN
description: Architectural Tech Corporate commercial site for LIRN and TORNS
colors:
  black: "#000000"
  white: "#ffffff"
  graphite: "#6b7280"
  activity: "#00A8FF"
  torns-deep: "#031422"
  torns-mid: "#06263d"
  torns-panel: "#0a3350"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    lineHeight: 1.65
shape:
  ctaRadius: 0
  geometryCut: "12%"
spacing:
  gutter: "clamp(1.25rem, 4vw, 4rem)"
  band: "clamp(4rem, 10vw, 8rem)"
  measure: "65ch"
---

# Design System: LIRN

## Direction

LIRN and TORNS use an Architectural Tech Corporate system. LIRN is a
black-and-white firm with a stronger activity-blue tertiary. Mission and
vision occupy two distinct cards. The official wordmark leads the hero at
display size. The home panel that introduces TORNS uses the TORNS palette
so the jump into `/torns` is continuous.

`/torns` is the product story: problem, Transmilenio case, four acts from
station to dispatch, pipeline, prototype facts, interview, and survey.
Its grounds alternate deep blue, mid blue, and white.

## Color

- **Black** is the primary dark ground and dark control fill.
- **White** is the primary light ground and dark-ground text.
- **Graphite** is reserved for labels, notes, and secondary information.
- **Activity blue** (`#00A8FF`) is the tertiary signal on LIRN (lines, nodes,
  cuts, hovers) and the energy color on TORNS.
- **TORNS deep / mid / panel** are product grounds. White is a TORNS
  surface too (problem, story, interview, close). The LIRN home teaser
  may use the TORNS palette because it introduces the product.

Do not paint other LIRN firm sections with a full activity-blue fill. Do not
reintroduce the retired amber, navy, coral, or marketing civic-blue skin.

`tro-frontend` is outside this commercial-site redesign and remains on its
civic-blue Operate skin. Its existing token assertion remains unchanged.

## Typography

Manrope is the only family. Display and hero text use weight 800, line-height
`0.98`, and tracking `-0.04em`. Body copy uses a maximum measure of `65ch` and
line-height `1.65`. Labels are small, uppercase, and tracked.

## Layout

Sections are black or white full-width bands with responsive vertical padding.
The hero is a two-column split between the message and real station
photography. It collapses to one column on narrow screens.

Long evidence is treated as editorial information, not as floating cards:
interview turns use ruled rows and the survey uses a sharp two-column matrix.
The six-stage product pipeline is a horizontal row on desktop and collapses
progressively on smaller screens.

## Shape and imagery

Buttons and calls to action are sharp rectangles with no pill radius. The
official logo geometry supplies the clipped lower-right corner for photography.
Photography is monochrome so the activity color remains a signal instead of
decoration.

Do not distort, redraw, recolor, or replace the official logo assets.

## Interaction

Links transition their text color over `160ms` with the shared easing curve.
Hover and focus use activity blue. Survey bars reveal once from zero width and
respect reduced-motion preferences. No particles, decorative glows, or ambient
motion are part of this system.

## Components

- **Navigation:** fixed white bar, black official wordmark, compact links, sharp
  black-on-white contact CTA.
- **Primary CTA:** white on black bands; black on white bands.
- **Secondary CTA:** transparent with a white border on black.
- **Geometry frame:** clipped lower-right corner using `--cut`.
- **Evidence:** graphite labels, ruled interview rows, activity-blue survey bars.
- **Footer:** black band with the official icon, firm name, product line, and
  TORNS link.

## Rules

1. LIRN structure is black and white, with activity blue as a tertiary signal.
2. TORNS structure is deep blue, mid blue, and white. `#00A8FF` is energy.
3. Keep buttons square and content hierarchy typographic.
4. Preserve real evidence labels and do not imply a signed operator pilot.
5. Keep the commercial site distinct from the civic-blue `tro-frontend` UI.
