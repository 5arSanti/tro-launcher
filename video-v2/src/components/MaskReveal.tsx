import React from 'react';
import {easeEnter, clampI} from '../lib/anim';
import {FONT_SANS} from '../design/fonts';
import {COLOR} from '../design/tokens';

export const MaskReveal: React.FC<{
  text: string;
  frame: number;
  from: number;
  duration?: number;
  fontSize?: number;
  color?: string;
  weight?: 400 | 600;
  mono?: boolean;
  fontFamily?: string;
  delay?: number;
}> = ({
  text,
  frame,
  from,
  duration = 12,
  fontSize = 40,
  color = COLOR.text,
  weight = 600,
  fontFamily = FONT_SANS,
  delay = 0,
}) => {
  const start = from + delay;
  const y = clampI(frame, [start, start + duration], [110, 0], easeEnter);
  const op = clampI(frame, [start, start + duration], [0, 1], easeEnter);
  return (
    <div
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        lineHeight: 1.1,
        height: fontSize * 1.1,
      }}
    >
      <div
        style={{
          transform: `translateY(${y}%)`,
          opacity: op,
          fontFamily,
          fontSize,
          fontWeight: weight,
          color,
          letterSpacing: '-0.035em',
          whiteSpace: 'nowrap',
        }}
      >
        {text}
      </div>
    </div>
  );
};

export const Keyword: React.FC<{
  text: string;
  frame: number;
  from: number;
  size?: number;
  color?: string;
  opacity?: number;
}> = ({text, frame, from, size = 88, color = COLOR.text, opacity}) => {
  const p = clampI(frame, [from, from + 18], [0, 1], easeEnter);
  return (
    <div
      style={{
        overflow: 'hidden',
        opacity: opacity ?? p,
      }}
    >
      <div
        style={{
          transform: `translateY(${(1 - p) * 110}%)`,
          fontFamily: FONT_SANS,
          fontSize: size,
          fontWeight: 600,
          color,
          lineHeight: 1.05,
          letterSpacing: '-0.04em',
        }}
      >
        {text}
      </div>
    </div>
  );
};
