import React from 'react';
import katex from 'katex';
import {COLOR} from '../design/tokens';

export const Tex: React.FC<{
  tex: string;
  color?: string;
  fontSize?: number;
  opacity?: number;
}> = ({tex, color = COLOR.text, fontSize = 52, opacity = 1}) => {
  const html = katex.renderToString(tex, {
    throwOnError: false,
    displayMode: false,
    strict: 'ignore',
  });
  return (
    <span
      style={{
        color,
        fontSize,
        opacity,
        lineHeight: 1.15,
        display: 'inline-block',
      }}
      dangerouslySetInnerHTML={{__html: html}}
    />
  );
};

export const Term: React.FC<{
  tex: string;
  active: boolean;
  seen: boolean;
  fontSize?: number;
}> = ({tex, active, seen, fontSize = 52}) => (
  <Tex
    tex={tex}
    fontSize={fontSize}
    color={active ? COLOR.accent : COLOR.text}
    opacity={active ? 1 : seen ? 0.55 : 0.22}
  />
);
