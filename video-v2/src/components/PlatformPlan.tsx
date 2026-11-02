import React from "react";
import { useTheme } from "../design/theme";
import { FONT_MONO } from "../design/fonts";
import { NAV_MESH, WORLD, type Door, type Pt } from "../lib/platform";
import { SEARCH, cellCenter, type Expansion } from "../lib/astar";

export type Passenger = {
  id: string;
  x: number;
  y: number;
  fill?: string;
  r?: number;
};

type Props = {
  x: number;
  y: number;
  width: number;
  passengers?: Passenger[];
  highlightDoor?: number | null;
  dimHidden?: number;
  showDoors?: boolean;
  showStairs?: boolean;
  showNavMesh?: number;
  sightline?: number;
  grid?: number;
  expansionsUntil?: number;
  pathProgress?: number;
  lookSweep?: number;
  doorMeta?: boolean;
  tag?: string;
  capsule?: { x: number; y: number; r: number; opacity: number };
  overlay?: React.ReactNode;
};

const H = (width: number) => (width * WORLD.h) / WORLD.w;
const sx = (n: number, width: number) => (n / WORLD.w) * width;
const sy = (n: number, width: number) => (n / WORLD.h) * H(width);

export const PlatformPlan: React.FC<Props> = ({
  x,
  y,
  width,
  passengers = [],
  highlightDoor = null,
  dimHidden = 1,
  showDoors = true,
  showStairs = true,
  showNavMesh = 0,
  sightline = 0,
  grid = 0,
  expansionsUntil = -1,
  pathProgress = 0,
  lookSweep = 0,
  doorMeta = false,
  tag,
  capsule,
  overlay,
}) => {
  const C = useTheme();
  const height = H(width);
  const X = (n: number) => sx(n, width);
  const Y = (n: number) => sy(n, width);

  return (
    <div style={{ position: "absolute", left: x, top: y, width, height }}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <rect
          x={X(28)}
          y={Y(28)}
          width={X(944)}
          height={Y(288)}
          fill={C.surface}
          stroke={C.line}
          strokeWidth={1}
        />
        <line
          x1={X(28)}
          y1={Y(WORLD.trainY)}
          x2={X(972)}
          y2={Y(WORLD.trainY)}
          stroke={C.text}
          strokeWidth={2}
        />
        {showNavMesh > 0
          ? NAV_MESH.map((poly, i) => {
              const drawn = Math.max(
                0,
                Math.min(1, showNavMesh * 2.4 - i * 0.35),
              );
              const d =
                poly
                  .map((p, k) => `${k === 0 ? "M" : "L"} ${X(p.x)} ${Y(p.y)}`)
                  .join(" ") + " Z";
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke={C.muted}
                  strokeWidth={1.25}
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - drawn}
                />
              );
            })
          : null}
        {grid > 0
          ? Array.from({ length: SEARCH.cols }, (_, c) =>
              Array.from({ length: SEARCH.rows }, (_, r) => {
                const walk = SEARCH.walkable[r][c];
                if (!walk) return null;
                const p = cellCenter({ c, r });
                const cw = width / SEARCH.cols;
                const ch = height / SEARCH.rows;
                return (
                  <rect
                    key={`${c}-${r}`}
                    x={X(p.x) - cw / 2}
                    y={Y(p.y) - ch / 2}
                    width={cw}
                    height={ch}
                    fill="none"
                    stroke={C.line}
                    strokeWidth={1}
                    opacity={0.28 * grid}
                  />
                );
              }),
            )
          : null}
        {expansionsUntil >= 0
          ? SEARCH.expansions
              .slice(0, expansionsUntil + 1)
              .map((e: Expansion, i) => {
                const p = cellCenter(e.cell);
                const cw = width / SEARCH.cols;
                const ch = height / SEARCH.rows;
                const open = e.kind === "open";
                return (
                  <rect
                    key={`e${i}`}
                    x={X(p.x) - cw / 2 + 1}
                    y={Y(p.y) - ch / 2 + 1}
                    width={Math.max(1, cw - 2)}
                    height={Math.max(1, ch - 2)}
                    fill={open ? C.cold : C.line}
                    opacity={open ? 0.45 : 0.22}
                  />
                );
              })
          : null}
        {pathProgress > 0
          ? (() => {
              const pts = SEARCH.path.map((c) => cellCenter(c));
              const d = pts
                .map((p, i) => `${i === 0 ? "M" : "L"} ${X(p.x)} ${Y(p.y)}`)
                .join(" ");
              const approx = 1200;
              return (
                <path
                  d={d}
                  fill="none"
                  stroke={C.accent}
                  strokeWidth={2.5}
                  strokeDasharray={approx}
                  strokeDashoffset={approx * (1 - pathProgress)}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              );
            })()
          : null}
        {showStairs ? (
          <g>
            <rect
              x={X(WORLD.stairs.x)}
              y={Y(WORLD.stairs.y)}
              width={X(WORLD.stairs.w)}
              height={Y(WORLD.stairs.h)}
              fill={C.bg}
              stroke={C.line}
              strokeWidth={1}
            />
            {Array.from({ length: 7 }, (_, i) => (
              <line
                key={i}
                x1={X(WORLD.stairs.x)}
                x2={X(WORLD.stairs.x + WORLD.stairs.w)}
                y1={Y(WORLD.stairs.y + 18 + i * 18)}
                y2={Y(WORLD.stairs.y + 18 + i * 18)}
                stroke={C.line}
                strokeWidth={1}
              />
            ))}
          </g>
        ) : null}
        {sightline > 0
          ? (() => {
              const a = WORLD.landing;
              const b = WORLD.doors[0];
              const cut = {
                x: WORLD.stairs.x + 4,
                y: WORLD.stairs.y + WORLD.stairs.h,
              };
              return (
                <g opacity={sightline}>
                  <line
                    x1={X(a.x)}
                    y1={Y(a.y)}
                    x2={X(cut.x)}
                    y2={Y(cut.y)}
                    stroke={C.muted}
                    strokeWidth={1}
                  />
                  <line
                    x1={X(cut.x)}
                    y1={Y(cut.y)}
                    x2={X(b.x)}
                    y2={Y(b.y - 10)}
                    stroke={C.muted}
                    strokeWidth={1}
                    strokeDasharray="6 6"
                    opacity={0.45}
                  />
                </g>
              );
            })()
          : null}
        {lookSweep > 0
          ? WORLD.doors.map((d, i) => {
              const a = WORLD.landing;
              const local = Math.max(0, Math.min(1, lookSweep * 5 - i));
              return (
                <line
                  key={`sweep-${d.id}`}
                  x1={X(a.x)}
                  y1={Y(a.y)}
                  x2={X(d.x)}
                  y2={Y(d.y - 16)}
                  stroke={C.muted}
                  strokeWidth={1}
                  opacity={0.18 * local}
                />
              );
            })
          : null}
        {showDoors
          ? WORLD.doors.map((d) => (
              <DoorMark
                key={d.id}
                door={d}
                X={X}
                Y={Y}
                active={highlightDoor === d.id}
                dim={d.hidden ? dimHidden : 1}
                meta={doorMeta}
              />
            ))
          : null}
        {capsule ? (
          <circle
            cx={X(capsule.x)}
            cy={Y(capsule.y)}
            r={(capsule.r / WORLD.w) * width}
            fill="none"
            stroke={C.accent}
            strokeWidth={1.5}
            opacity={capsule.opacity}
          />
        ) : null}
        {passengers.map((p) => (
          <circle
            key={p.id}
            cx={X(p.x)}
            cy={Y(p.y)}
            r={p.r ?? Math.max(5, (11 * width) / 1400)}
            fill={p.fill ?? C.text}
          />
        ))}
      </svg>
      {tag ? (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: -28,
            fontFamily: FONT_MONO,
            fontSize: 16,
            color: C.muted,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </div>
      ) : null}
      {overlay}
    </div>
  );
};

const DoorMark: React.FC<{
  door: Door;
  X: (n: number) => number;
  Y: (n: number) => number;
  active: boolean;
  dim: number;
  meta: boolean;
}> = ({ door, X, Y, active, dim, meta }) => {
  const C = useTheme();
  return (
    <g opacity={dim}>
      <line
        x1={X(door.x)}
        y1={Y(door.y - 18)}
        x2={X(door.x)}
        y2={Y(door.y + 4)}
        stroke={active ? C.accent : C.text}
        strokeWidth={active ? 3 : 2}
      />
      <text
        x={X(door.x)}
        y={Y(door.y - 24)}
        textAnchor="middle"
        fill={active ? C.accent : C.muted}
        fontFamily={FONT_MONO}
        fontSize={16}
      >
        {door.id}
      </text>
      {null}
    </g>
  );
};

export const worldToPx = (
  p: Pt,
  box: { x: number; y: number; width: number },
): Pt => {
  const height = H(box.width);
  return {
    x: box.x + (p.x / WORLD.w) * box.width,
    y: box.y + (p.y / WORLD.h) * height,
  };
};
