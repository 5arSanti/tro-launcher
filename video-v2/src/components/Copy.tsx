import React from 'react';
import {Hook} from './Hook';
import {COLOR, TYPE} from '../design/tokens';
import {f} from '../lib';

export type Beat = {
  at: number;
  text: string;
  size?: number;
  color?: string;
};

export const Copy: React.FC<{
  frame: number;
  beats: Beat[];
  top?: number;
  size?: number;
  width?: number;
}> = ({frame, beats, top = 56, size = TYPE.copy, width = 1728}) => {
  const idx = beats.reduce((acc, b, i) => (frame >= f(b.at) ? i : acc), 0);
  const beat = beats[idx];
  if (!beat) return null;
  return (
    <Hook
      key={beat.at}
      text={beat.text}
      frame={frame}
      from={f(beat.at)}
      size={beat.size ?? size}
      color={beat.color ?? COLOR.text}
      width={width}
      top={top}
    />
  );
};
