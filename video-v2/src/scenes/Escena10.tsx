import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Copy} from '../components/Copy';
import {PlatformPlan} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {appear, arriveT, atProgress, clampI, easeLinear, f, WORLD} from '../lib';

const BEATS = [
  {at: 0, text: 'Validar · idea propia', size: 64, color: COLOR.accent},
  {at: 4.0, text: 'En suma, el paper entrega un sistema completo: A*, colisionador, elección contrastada con la calle.'},
  {at: 11.5, text: 'Y, aun así, una limitación honesta: los pasajeros van sueltos, sin ir de a dos.'},
  {at: 17.5, text: 'Lo más relevante: una simulación vale lo que vale su validación.', color: COLOR.accent},
  {at: 22.5, text: 'Como idea propia —no está en el artículo—, esto sirve para pensar TransMilenio o el metro de Bogotá.'},
  {at: 27.5, text: 'Gracias.', size: 72},
];

export const Escena10: React.FC = () => {
  const frame = useCurrentFrame();
  const social = appear(frame, f(11.5), 10);
  const pair = appear(frame, f(14), 10);
  const fade = clampI(frame, [f(28.2), 899], [0, 1], easeLinear);
  const board = appear(frame, f(18), f(4));
  const p = atProgress(
    [
      {x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18},
      {x: WORLD.doors[2].x, y: WORLD.doors[2].y + 16},
    ],
    arriveT(board),
  );
  const loners = [
    {x: 180, y: 0, vx: 1.4},
    {x: 320, y: 30, vx: 0.9},
    {x: 80, y: 50, vx: 1.15},
    {x: 420, y: 10, vx: 0.8},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: COLOR.bg}}>
      <Stage>
        <SceneIndex n="10" />
        <Copy frame={frame} beats={BEATS} size={42} />
        <Note left={LAYOUT.marginX} top={250}>
          idea propia
        </Note>
        <svg
          width={1728}
          height={160}
          style={{position: 'absolute', left: LAYOUT.marginX, top: 300, opacity: social}}
        >
          {loners.map((pt, i) => {
            const x = pt.x + (((frame - f(11.5)) * pt.vx) % 900);
            return <circle key={i} cx={x} cy={50 + pt.y} r={6} fill={COLOR.text} />;
          })}
          {pair > 0
            ? (() => {
                const x = 200 + (frame - f(14)) * 1.1;
                return (
                  <g opacity={pair}>
                    <circle cx={x} cy={120} r={6} fill={COLOR.accent} />
                    <circle cx={x + 22} cy={120} r={6} fill={COLOR.accent} />
                    <line x1={x} y1={120} x2={x + 22} y2={120} stroke={COLOR.accent} strokeWidth={1} />
                  </g>
                );
              })()
            : null}
        </svg>
        <PlatformPlan
          x={LAYOUT.marginX}
          y={560}
          width={900}
          tag="esquema"
          highlightDoor={3}
          passengers={[{id: 'end', x: p.x, y: p.y, fill: COLOR.accent}]}
        />
      </Stage>
      <AbsoluteFill style={{backgroundColor: COLOR.bg, opacity: fade, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
