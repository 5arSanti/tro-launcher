import React from "react";
import { useVideoConfig } from "remotion";
import { clampI, easeMove } from "../lib";
import { beatStart, type Beat, type Layout, type Place } from "./Narration";

export const PANEL = { w: 1440, h: 640 };

export const PLACE: Record<Layout, Place> = {
  hero: { x: 240, y: 250, s: 1.08, o: 0.13 },
  top: { x: 240, y: 290, s: 1, o: 1 },
  bottom: { x: 326, y: 110, s: 0.88, o: 1 },
  left: { x: 860, y: 300, s: 0.66, o: 1 },
  right: { x: 96, y: 300, s: 0.66, o: 1 },
};

const placeOf = (b: Beat): Place => ({
  ...PLACE[b.layout ?? "top"],
  ...b.place,
});

export const Rig: React.FC<{
  frame: number;
  beats: Beat[];
  children: React.ReactNode;
}> = ({ frame, beats, children }) => {
  const { durationInFrames } = useVideoConfig();
  const keys = beats.map((b) => ({ start: beatStart(b) - 6, p: placeOf(b) }));
  const k = keys.reduce((acc, key, i) => (frame >= key.start ? i : acc), 0);
  const from = k > 0 ? keys[k - 1].p : keys[0].p;
  const to = keys[k].p;
  const t = clampI(
    frame,
    [keys[k].start, keys[k].start + 30],
    [0, 1],
    easeMove,
  );
  const lerp = (a: number, b: number) => a + (b - a) * t;
  const drift = 1 + 0.025 * (frame / durationInFrames);
  const s = lerp(from.s, to.s) * drift;
  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: PANEL.w,
        height: PANEL.h,
        transform: `translate(${lerp(from.x, to.x)}px, ${lerp(from.y, to.y)}px) scale(${s})`,
        transformOrigin: "0 0",
        opacity: lerp(from.o, to.o),
      }}
    >
      {children}
    </div>
  );
};
