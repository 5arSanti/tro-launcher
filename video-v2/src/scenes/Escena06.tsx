import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { type Beat } from "../components/Narration";
import { PlatformPlan } from "../components/PlatformPlan";
import { Term, Tex } from "../components/Formula";
import { themeOf } from "../design/theme";
import { SEARCH, WORLD, appear, clampI, f } from "../lib";

const C = themeOf(6);

const BEATS: Beat[] = [
  { at: 0, layout: "hero", text: "{f(n)} = g(n) + h(n)" },
  {
    at: 4.0,
    layout: "left",
    text: "Para moverse, usa {A*}: el camino más barato dentro de la malla.",
  },
  {
    at: 8.0,
    layout: "bottom",
    text: "La fórmula es {f(n)} igual a g(n) más h(n):",
  },
  {
    at: 11.0,
    layout: "bottom",
    text: "{g} es lo que ya costó; {h}, lo que estima que falta.",
  },
  {
    at: 17.0,
    layout: "right",
    text: "Así, siempre gana el punto con {f más bajo}.",
  },
  {
    at: 22.0,
    layout: "left",
    text: "Además, para no atravesarse, cada uno lleva un {colisionador cápsula}",
  },
  {
    at: 27.5,
    layout: "bottom",
    size: 80,
    text: "de {0,25 metros} de radio.",
    place: { x: -118, y: -230, s: 1.6, o: 1 },
  },
];

export const Escena06: React.FC = () => {
  const frame = useCurrentFrame();
  const grid = appear(frame, f(4), 10);
  const expandStart = f(4.5);
  const expandN = Math.min(
    SEARCH.expansions.length - 1,
    Math.floor(
      clampI(frame, [expandStart, f(16)], [0, SEARCH.expansions.length - 1]),
    ),
  );
  const pathT = clampI(frame, [f(17), f(20)], [0, 1]);
  const fOn = frame >= f(8) && frame < f(11);
  const gOn = frame >= f(11) && frame < f(14);
  const hOn = frame >= f(14) && frame < f(17);
  const rad = appear(frame, f(22), 12);

  return (
    <SceneFrame
      n={6}
      beats={BEATS}
      panel={
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              opacity: appear(frame, f(8), 12),
            }}
          >
            <Term tex="f(n)" active={fOn} seen={frame >= f(8)} fontSize={72} />
            <Tex tex="=" fontSize={72} color={C.muted} />
            <Term tex="g(n)" active={gOn} seen={frame >= f(11)} fontSize={72} />
            <Tex tex="+" fontSize={72} color={C.muted} />
            <Term tex="h(n)" active={hOn} seen={frame >= f(14)} fontSize={72} />
          </div>
          <PlatformPlan
            x={0}
            y={150}
            width={1440}
            tag="esquema"
            grid={grid}
            expansionsUntil={frame >= expandStart ? expandN : -1}
            pathProgress={pathT}
            highlightDoor={pathT > 0.6 ? 3 : null}
            passengers={[
              { id: "a", x: WORLD.landing.x, y: WORLD.landing.y, fill: C.text },
            ]}
            capsule={
              rad > 0
                ? {
                    x: WORLD.landing.x,
                    y: WORLD.landing.y,
                    r: 10 + 26 * rad,
                    opacity: rad,
                  }
                : undefined
            }
          />
        </div>
      }
    />
  );
};
