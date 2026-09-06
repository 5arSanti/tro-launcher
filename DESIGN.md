---
name: LIRN
description: Architectural Tech Corporate commercial site for LIRN and TORNS
colors:
  black: "#000000"
  white: "#ffffff"
  graphite: "#6b7280"
  activity: "#00A8FF"
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

LIRN and TORNS use an Architectural Tech Corporate system. Black and white
full-width bands create the structure. Official LIRN marks, hard edges, dense
Manrope display type, and clipped photography connect the site to infrastructure
and station operations.

The home presents LIRN as the firm and points to TORNS. `/torns` presents the
product, the Transmilenio applied prototype, the system pipeline, and the
team's research evidence.

## Color

- **Black** is the primary dark ground and dark control fill.
- **White** is the primary light ground and dark-ground text.
- **Graphite** is reserved for labels, notes, and secondary information.
- **Activity blue** (`#00A8FF`) is activity only: links on hover, measured
  values, focus rings, selection, pipeline markers, and survey bars.

Never use activity blue as a page, hero, section, card, or navigation fill.
Do not reintroduce the retired amber, navy, coral, or marketing civic-blue skin.

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

1. Use only black and white for structural fills.
2. Use `#00A8FF` only when something is active, measured, focused, or hovered.
3. Keep buttons square and content hierarchy typographic.
4. Preserve real evidence labels and do not imply a signed operator pilot.
5. Keep the commercial site distinct from the civic-blue `tro-frontend` UI.
