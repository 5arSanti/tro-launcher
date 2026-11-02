import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { type Beat } from "../components/Narration";
import { PlatformPlan } from "../components/PlatformPlan";
import { themeOf } from "../design/theme";
import { FONT_MONO } from "../design/fonts";
import {
  WORLD,
  appear,
  arriveT,
  atProgress,
  clampI,
  easeLinear,
  f,
} from "../lib";

const C = themeOf(10);

const BEATS: Beat[] = [
  { at: 0, layout: "hero", text: "Validar · {idea propia}" },
  {
    at: 4.0,
    layout: "top",
    text: "En suma, el paper entrega {un sistema completo}: A*, colisionador, elección contrastada con la calle,",
  },
  {
    at: 11.5,
    layout: "left",
    size: 52,
    text: "y, aun así, una limitación honesta: los pasajeros {van sueltos}, sin ir de a dos, sin fuerzas sociales.",
  },
  {
    at: 17.5,
    layout: "hero",
    size: 84,
    text: "Lo más relevante que me queda: una simulación vale lo que vale {su validación}.",
  },
  {
    at: 22.5,
    layout: "bottom",
    tag: "idea propia",
    text: "Por último, como idea propia —no está en el artículo—, esto sirve para pensar {TransMilenio o el metro de Bogotá}.",
  },
  { at: 27.5, layout: "hero", size: 140, text: "{Gracias}." },
];

const LONERS = [
  { x: 120, y: 20, vx: 1.4 },
  { x: 360, y: 60, vx: 0.9 },
  { x: 60, y: 100, vx: 1.15 },
  { x: 560, y: 40, vx: 0.8 },
  { x: 760, y: 90, vx: 1.05 },
];

export const Escena10: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const social = appear(frame, f(11.5), 10);
  const pair = appear(frame, f(14), 10);
  const fade = clampI(
    frame,
    [f(28.8), durationInFrames - 1],
    [0, 1],
    easeLinear,
  );
  const board = appear(frame, f(4), f(4));
  const p = atProgress(
    [
      { x: WORLD.landing.x, y: WORLD.landing.y },
      { x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18 },
    ],
    arriveT(board),
  );

  return (
    <SceneFrame
      n={10}
      beats={BEATS}
      exit={false}
      panel={
        <div style={{ position: "absolute", inset: 0 }}>
          <svg
            width={1440}
            height={140}
            style={{ position: "absolute", left: 0, top: 0, opacity: social }}
          >
            {LONERS.map((pt, i) => {
              const x = (pt.x + Math.max(0, frame - f(11.5)) * pt.vx) % 1440;
              return (
                <circle key={i} cx={x} cy={20 + pt.y} r={9} fill={C.text} />
              );
            })}
            {pair > 0 ? (
              <g opacity={pair}>
                {(() => {
                  const x = 200 + (frame - f(14)) * 1.1;
                  return (
                    <>
                      <line
                        x1={x}
                        y1={70}
                        x2={x + 30}
                        y2={70}
                        stroke={C.accent}
                        strokeWidth={2}
                      />
                      <circle cx={x} cy={70} r={9} fill={C.accent} />
                      <circle cx={x + 30} cy={70} r={9} fill={C.accent} />
                      <text
                        x={x + 50}
                        y={76}
                        fill={C.accent}
                        fontFamily={FONT_MONO}
                        fontSize={18}
                      >
                        de a dos · no modelado
                      </text>
                    </>
                  );
                })()}
              </g>
            ) : null}
          </svg>
          <PlatformPlan
            x={0}
            y={150}
            width={1440}
            tag="esquema"
            highlightDoor={3}
            passengers={[{ id: "end", x: p.x, y: p.y, fill: C.accent }]}
          />
        </div>
      }
    >
      <AbsoluteFill style={{ backgroundColor: C.bg, opacity: fade }} />
    </SceneFrame>
  );
};
