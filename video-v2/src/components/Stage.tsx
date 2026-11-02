import React from "react";
import { AbsoluteFill } from "remotion";
import { LAYOUT } from "../design/tokens";
import { useTheme } from "../design/theme";
import { FONT_MONO, FONT_SANS } from "../design/fonts";

export const Stage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const C = useTheme();
  return (
    <AbsoluteFill style={{ backgroundColor: C.bg }}>{children}</AbsoluteFill>
  );
};

export const SceneIndex: React.FC<{ n: string }> = ({ n }) => {
  const C = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        left: LAYOUT.marginX,
        top: 36,
        fontFamily: FONT_MONO,
        fontSize: 16,
        color: C.muted,
        letterSpacing: "0.14em",
        fontWeight: 400,
      }}
    >
      {n}
    </div>
  );
};

export const Note: React.FC<{
  children: React.ReactNode;
  left: number;
  top: number;
  opacity?: number;
}> = ({ children, left, top, opacity = 1 }) => {
  const C = useTheme();
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        fontFamily: FONT_MONO,
        fontSize: 16,
        color: C.muted,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        opacity,
      }}
    >
      {children}
    </div>
  );
};

export const Label: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: 400 | 600;
  mono?: boolean;
  style?: React.CSSProperties;
}> = ({ children, color, size = 24, weight = 400, mono, style }) => {
  const C = useTheme();
  return (
    <span
      style={{
        fontFamily: mono ? FONT_MONO : FONT_SANS,
        fontSize: size,
        fontWeight: weight,
        color: color ?? C.text,
        lineHeight: 1.1,
        letterSpacing: mono ? 0 : "-0.02em",
        fontVariantNumeric: "tabular-nums",
        ...style,
      }}
    >
      {children}
    </span>
  );
};
