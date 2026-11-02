import React from 'react';
import {MaskReveal} from './MaskReveal';
import {COLOR, LAYOUT, TYPE} from '../design/tokens';

export const Hook: React.FC<{
  text: string;
  frame: number;
  from?: number;
  size?: number;
  color?: string;
  width?: number;
  top?: number;
}> = ({
  text,
  frame,
  from = 0,
  size = TYPE.hook,
  color = COLOR.text,
  width = 1728,
  top = 72,
}) => {
  const words = text.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        left: LAYOUT.marginX,
        top,
        width,
        display: 'flex',
        flexWrap: 'wrap',
        fontSize: size,
        columnGap: '0.28em',
        rowGap: 4,
        alignItems: 'flex-end',
      }}
    >
      {words.map((word, i) => (
        <MaskReveal
          key={`${i}-${word}`}
          text={word}
          frame={frame}
          from={from}
          delay={i * 2}
          duration={10}
          fontSize={size}
          color={color}
          weight={600}
        />
      ))}
    </div>
  );
};
