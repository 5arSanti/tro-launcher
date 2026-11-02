import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { type Beat } from "../components/Narration";
import { PlatformPlan, type Passenger } from "../components/PlatformPlan";
import {
  appear,
  f,
  atProgress,
  arriveT,
  pathDownStairs,
  pathToDoor,
  WORLD,
} from "../lib";
import { themeOf } from "../design/theme";

const C = themeOf(1);

const down = pathDownStairs();
const doors = [3, 2, 4, 5, 3, 2] as const;

const BEATS: Beat[] = [
  { at: 0, layout: "hero", text: "¿Por qué puerta {subimos} al metro?" },
  {
    at: 4.2,
    layout: "left",
    text: "Bajan las escaleras, miran las puertas y {eligen una}.",
  },
  { at: 9.0, layout: "hero", text: "Sin hacer {cuentas}." },
  { at: 11.2, layout: "right", text: "¿Por qué {esa}, y no la de al lado?" },
  {
    at: 15.5,
    layout: "top",
    text: "Justamente ese gesto, tan automático que casi no lo vemos,",
  },
  {
    at: 20.5,
    layout: "top",
    text: "es lo que este artículo intenta {simular}.",
    place: { x: 120, y: 260, s: 1.18 },
  },
  { at: 24.0, layout: "hero", text: "Soy {Santiago Arias}," },
  {
    at: 26.2,
    layout: "bottom",
    text: "y vengo a sustentar {«A Subway Station Platform Crowd Simulation System»}.",
  },
  { at: 30.5, layout: "left", text: "Desde ya, mi postura: {vale la pena}," },
  {
    at: 32.3,
    layout: "right",
    text: "porque no se quedan en el modelo; lo contrastan con {una estación de verdad}.",
  },
];

export const Escena01: React.FC = () => {
  const frame = useCurrentFrame();
  const t0 = f(4.2);
  const passengers: Passenger[] = doors
    .map((id, i) => {
      const born = t0 + i * 20;
      const tDown = appear(frame, born, f(4));
      const chosen = frame >= born + f(4.6);
      const walk = chosen ? appear(frame, born + f(4.6), f(6)) : 0;
      let p = WORLD.landing;
      if (!chosen) p = atProgress(down, arriveT(tDown));
      else p = atProgress(pathToDoor(id), arriveT(walk));
      return { id: `p${i}`, x: p.x, y: p.y, fill: i === 0 ? C.accent : C.text };
    })
    .filter((_, i) => frame >= t0 + i * 20);

  return (
    <SceneFrame
      n={1}
      beats={BEATS}
      panel={
        <PlatformPlan
          x={0}
          y={150}
          width={1440}
          tag="esquema · andén"
          highlightDoor={frame >= f(11.2) ? 3 : null}
          lookSweep={
            appear(frame, f(7), f(3)) * (1 - appear(frame, f(11.2), 10))
          }
          passengers={passengers}
        />
      }
    />
  );
};
