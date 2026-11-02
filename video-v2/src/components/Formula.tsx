import React from "react";
import katex from "katex";
import { useTheme } from "../design/theme";

export const Tex: React.FC<{
  tex: string;
  color?: string;
  fontSize?: number;
  opacity?: number;
}> = ({ tex, color, fontSize = 52, opacity = 1 }) => {
  const C = useTheme();
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: false,
    strict: "ignore",
  });
  return (
    <span
      style={{
        color: color ?? C.text,
        fontSize,
        opacity,
        lineHeight: 1.15,
        display: "inline-block",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export const Term: React.FC<{
  tex: string;
  active: boolean;
  seen: boolean;
  fontSize?: number;
}> = ({ tex, active, seen, fontSize = 52 }) => {
  const C = useTheme();
  return (
    <Tex
      tex={tex}
      fontSize={fontSize}
      color={active ? C.accent : C.text}
      opacity={active ? 1 : seen ? 0.55 : 0.22}
    />
  );
};
