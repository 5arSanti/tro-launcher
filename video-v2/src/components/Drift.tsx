import React from 'react';
import {useVideoConfig} from 'remotion';
import {clampI, easeMove} from '../lib';

export const Drift: React.FC<{
  frame: number;
  toScale?: number;
  panX?: number;
  origin?: string;
  children: React.ReactNode;
}> = ({frame, toScale = 1.08, panX = 0, origin = '50% 62%', children}) => {
  const {durationInFrames} = useVideoConfig();
  const t = clampI(frame, [0, durationInFrames], [0, 1], easeMove);
  const scale = 1 + (toScale - 1) * t;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `translateX(${panX * t}px) scale(${scale})`,
        transformOrigin: origin,
      }}
    >
      {children}
    </div>
  );
};
