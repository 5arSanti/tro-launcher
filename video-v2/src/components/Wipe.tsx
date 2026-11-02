import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLOR} from '../design/tokens';
import {clampI, easeMove} from '../lib';

export const Wipe: React.FC<{frame: number; enter?: boolean; exit?: boolean}> = ({
  frame,
  enter = true,
  exit = true,
}) => {
  const {durationInFrames: d} = useVideoConfig();
  const accentIn = enter ? clampI(frame, [0, 14], [0, -100], easeMove) : -100;
  const inkIn = enter ? clampI(frame, [3, 17], [0, -100], easeMove) : -100;
  const inkOut = exit ? clampI(frame, [d - 17, d - 3], [100, 0], easeMove) : 100;
  const accentOut = exit ? clampI(frame, [d - 15, d - 1], [100, 0], easeMove) : 100;
  const ink = frame < d / 2 ? inkIn : inkOut;
  const accent = frame < d / 2 ? accentIn : accentOut;
  return (
    <>
      <AbsoluteFill style={{background: COLOR.text, transform: `translateX(${ink}%)`}} />
      <AbsoluteFill style={{background: COLOR.accent, transform: `translateX(${accent}%)`}} />
    </>
  );
};
