import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Copy} from '../components/Copy';
import {MaskReveal} from '../components/MaskReveal';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, f} from '../lib';

const LINES = ['A Subway Station Platform', 'Crowd Simulation System'];
const META = 'ICCMS 2022  ·  ACM  ·  pp. 69–75';
const AUTHORS = 'Xinyu Wang  ·  Hu Su  ·  Tianbao Zhou  ·  Xiyu Miao';

const BEATS = [
  {at: 0, text: 'Wang, Su, Zhou y Miao · ICCMS 2022', size: 56},
  {at: 5.0, text: 'El artículo lo firman Xinyu Wang, Hu Su, Tianbao Zhou y Xiyu Miao.'},
  {at: 11.0, text: 'Se presentó en ICCMS 2022 y lo publicó la ACM, páginas 69 a 75.'},
  {at: 16.0, text: 'Ahora bien, antes de entrar al método, conviene el problema.', color: COLOR.accent},
];

export const Escena02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <SceneIndex n="02" />
      <Copy frame={frame} beats={BEATS} />
      <div style={{position: 'absolute', left: LAYOUT.marginX, top: 280}}>
        {LINES.map((line, i) => (
          <div key={line}>
            <MaskReveal
              text={line}
              frame={frame}
              from={f(2)}
              delay={i * 8}
              duration={10}
              fontSize={52}
            />
          </div>
        ))}
        <div
          style={{
            marginTop: 28,
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLOR.muted,
            letterSpacing: '0.04em',
            opacity: appear(frame, f(3.5), 10),
          }}
        >
          {META}
        </div>
        <div
          style={{
            marginTop: 14,
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: COLOR.text,
            opacity: appear(frame, f(5), 10),
          }}
        >
          {AUTHORS}
        </div>
      </div>
    </Stage>
  );
};
