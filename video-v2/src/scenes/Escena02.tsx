import React from "react";
import { useCurrentFrame } from "remotion";
import { SceneFrame } from "../components/SceneFrame";
import { type Beat } from "../components/Narration";
import { MaskReveal } from "../components/MaskReveal";
import { themeOf } from "../design/theme";
import { FONT_MONO } from "../design/fonts";
import { appear, clampI, easeEnter, easeMove, f } from "../lib";

const C = themeOf(2);

const AUTHORS = ["Xinyu Wang", "Hu Su", "Tianbao Zhou", "Xiyu Miao"];

const BEATS: Beat[] = [
  { at: 0, layout: "hero", text: "Wang, Su, Zhou y Miao · {ICCMS 2022}" },
  {
    at: 5.0,
    layout: "bottom",
    text: "El artículo lo firman {Xinyu Wang, Hu Su, Tianbao Zhou y Xiyu Miao}.",
  },
  {
    at: 11.0,
    layout: "right",
    text: "Se presentó en {ICCMS 2022} y lo publicó la ACM, páginas 69 a 75.",
  },
  {
    at: 16.0,
    layout: "top",
    text: "Ahora bien, antes de entrar al método, conviene {el problema}.",
    place: { x: 240, y: 330, s: 0.9, o: 0.35 },
  },
];

export const Escena02: React.FC = () => {
  const frame = useCurrentFrame();
  const bar = clampI(frame, [f(4.6), f(5.8)], [0, 1], easeMove);
  const line = clampI(frame, [f(5.2), f(7.4)], [0, 1], easeEnter);
  return (
    <SceneFrame
      n={2}
      beats={BEATS}
      panel={
        <div style={{ position: "absolute", inset: 0 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 14,
              height: 640,
              background: C.accent,
              transform: `scaleY(${bar})`,
              transformOrigin: "50% 0",
            }}
          />
          <div style={{ position: "absolute", left: 64, top: 40 }}>
            <div>
              <MaskReveal
                text="A Subway Station Platform"
                frame={frame}
                from={f(5.2)}
                duration={12}
                fontSize={76}
              />
            </div>
            <div>
              <MaskReveal
                text="Crowd Simulation System"
                frame={frame}
                from={f(5.2)}
                delay={6}
                duration={12}
                fontSize={76}
              />
            </div>
            <div
              style={{
                marginTop: 28,
                fontFamily: FONT_MONO,
                fontSize: 26,
                color: C.muted,
                letterSpacing: "0.04em",
                opacity: appear(frame, f(11), 10),
              }}
            >
              ICCMS 2022 · ACM · pp. 69–75
            </div>
          </div>
          <svg
            width={1440}
            height={200}
            style={{ position: "absolute", left: 0, top: 400 }}
          >
            <line
              x1={64}
              y1={60}
              x2={64 + 1312 * line}
              y2={60}
              stroke={C.text}
              strokeWidth={4}
            />
            {AUTHORS.map((a, i) => {
              const x = 64 + 60 + i * 400;
              const on = appear(frame, f(5.6) + i * 9, 10);
              return (
                <g key={a} opacity={on}>
                  <circle
                    cx={x}
                    cy={60}
                    r={6 + 6 * on}
                    fill={C.bg}
                    stroke={C.accent}
                    strokeWidth={4}
                  />
                  <text
                    x={x}
                    y={118}
                    textAnchor="middle"
                    fontFamily={FONT_MONO}
                    fontSize={26}
                    fill={C.text}
                  >
                    {a}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      }
    />
  );
};
