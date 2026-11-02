import React from "react";
import { useVideoConfig } from "remotion";
import { useTheme } from "../design/theme";
import { FONT_MONO } from "../design/fonts";
import { SCENES, appear } from "../lib";

const X0 = 96;
const X1 = 1824;
const Y = 1040;
const step = (X1 - X0) / (SCENES.length - 1);

export const LineMap: React.FC<{ n: number; frame: number }> = ({
  n,
  frame,
}) => {
  const { durationInFrames } = useVideoConfig();
  const C = useTheme();
  const p = Math.min(1, frame / durationInFrames);
  const cur = n - 1;
  const trainX = X0 + (cur + (n < SCENES.length ? p : 0)) * step;
  const on = appear(frame, 10, 14);
  const ring = appear(frame, 14, 14);
  return (
    <svg
      width={1920}
      height={80}
      style={{ position: "absolute", left: 0, top: Y - 40, opacity: on }}
    >
      <line x1={X0} y1={40} x2={X1} y2={40} stroke={C.line} strokeWidth={2} />
      <line
        x1={X0}
        y1={40}
        x2={trainX}
        y2={40}
        stroke={C.text}
        strokeWidth={3}
      />
      {SCENES.map((s, i) => {
        const x = X0 + i * step;
        const past = i < cur;
        const now = i === cur;
        return (
          <g key={s.id}>
            <circle
              cx={x}
              cy={40}
              r={now ? 6 + 4 * ring : past ? 5 : 4}
              fill={now ? C.bg : past ? C.text : C.bg}
              stroke={now ? C.accent : past ? C.text : C.line}
              strokeWidth={now ? 3 : 2}
            />
            {now ? (
              <text
                x={x}
                y={20}
                textAnchor={
                  i === 0 ? "start" : i === SCENES.length - 1 ? "end" : "middle"
                }
                fill={C.text}
                fontFamily={FONT_MONO}
                fontSize={14}
                letterSpacing="0.1em"
                opacity={ring}
              >
                {`${String(n).padStart(2, "0")} · ${s.title.toUpperCase()}`}
              </text>
            ) : null}
          </g>
        );
      })}
      <rect
        x={trainX - 12}
        y={36}
        width={24}
        height={8}
        rx={4}
        fill={C.accent}
      />
    </svg>
  );
};
