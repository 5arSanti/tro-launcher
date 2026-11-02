import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Stage } from "./Stage";
import { Narration, WIPE_F, type Beat } from "./Narration";
import { Rig } from "./Rig";
import { LineMap } from "./LineMap";
import { Wipe } from "./Wipe";
import { MaskReveal } from "./MaskReveal";
import { ThemeContext, themeOf, useTheme } from "../design/theme";
import { FONT_MONO } from "../design/fonts";
import { SCENES, appear } from "../lib";

const Badge: React.FC<{ n: number; frame: number }> = ({ n, frame }) => {
  const pop = appear(frame, 12, 12);
  const C = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        right: 96,
        top: 36,
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <MaskReveal
        text={SCENES[n - 1].title}
        frame={frame}
        from={16}
        duration={12}
        fontSize={22}
        color={C.text}
      />
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 22,
          background: C.accent,
          color: C.bg,
          fontFamily: FONT_MONO,
          fontSize: 16,
          fontWeight: 500,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${pop})`,
        }}
      >
        {String(n).padStart(2, "0")}
      </div>
    </div>
  );
};

export const SceneFrame: React.FC<{
  n: number;
  beats: Beat[];
  panel: React.ReactNode;
  exit?: boolean;
  children?: React.ReactNode;
}> = ({ n, beats, panel, exit = true, children }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const end = exit ? durationInFrames - WIPE_F : durationInFrames;
  return (
    <ThemeContext.Provider value={themeOf(n)}>
      <Stage>
        <Rig frame={frame} beats={beats}>
          {panel}
        </Rig>
        <Narration frame={frame} beats={beats} end={end} />
        <Badge n={n} frame={frame} />
        <LineMap n={n} frame={frame} />
        {children}
        <Wipe frame={frame} exit={exit} />
      </Stage>
    </ThemeContext.Provider>
  );
};
