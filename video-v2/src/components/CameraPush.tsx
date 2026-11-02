import React from 'react';
import {cameraT} from '../lib';

export const CameraPush: React.FC<{
  frame: number;
  from: number;
  duration?: number;
  toScale?: number;
  origin?: string;
  children: React.ReactNode;
}> = ({
  frame,
  from,
  duration = 30,
  toScale = 1.05,
  origin = '50% 58%',
  children,
}) => {
  const t = cameraT(frame, from, duration);
  const scale = 1 + (toScale - 1) * t;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${scale})`,
        transformOrigin: origin,
      }}
    >
      {children}
    </div>
  );
};
