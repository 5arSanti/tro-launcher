import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Copy} from '../components/Copy';
import {Drift} from '../components/Drift';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {WORLD, appear, arriveT, atProgress, clampI, easeEnter, f, pathToDoor} from '../lib';

const speeds = [0.72, 1, 1.18, 0.84, 1.08];

const BEATS = [
  {at: 0, text: 'Entorno y pasajero inteligente', size: 56},
  {at: 4.0, text: 'Para lograrlo, el sistema se parte en dos.'},
  {at: 8.0, text: 'Por un lado, el entorno: toma la estación en Unity,'},
  {at: 13.0, text: 'quita lo que no se pisa y teje una malla NavMesh.'},
  {at: 18.0, text: 'Ahí vive cada puerta: dónde está, cuánta fila hay, cuántos caben.'},
  {at: 24.0, text: 'Por el otro, el pasajero inteligente: planea, cambia de estado'},
  {at: 29.0, text: 'y no todos corren igual. Cada uno trae su propia velocidad máxima.', color: COLOR.accent},
];

export const Escena04: React.FC = () => {
  const frame = useCurrentFrame();
  const two = appear(frame, f(4), 10);
  const env = appear(frame, f(8), 10);
  const line = clampI(frame, [f(8), f(10)], [0, 1], easeEnter);
  const mesh = clampI(frame, [f(10), f(18)], [0, 1], easeEnter);
  const pax = appear(frame, f(24), 10);
  const speedT = appear(frame, f(26), f(8));
  const passengers: Passenger[] = speeds.map((s, i) => {
    const t = Math.min(1, speedT * s);
    const p = atProgress(pathToDoor(((i % 5) + 1) as 1 | 2 | 3 | 4 | 5), arriveT(t));
    return {
      id: `v${i}`,
      x: t === 0 ? WORLD.landing.x : p.x,
      y: t === 0 ? WORLD.landing.y : p.y,
    };
  });

  return (
    <Stage>
      <SceneIndex n="04" />
      <Copy frame={frame} beats={BEATS} />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 250,
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          opacity: two,
        }}
      >
        <Block label="Entorno" sub="NavMesh" opacity={env} />
        <svg width={80} height={12}>
          <line x1={0} y1={6} x2={80 * line} y2={6} stroke={COLOR.text} strokeWidth={1} />
        </svg>
        <Block label="Pasajero" sub="ruta · estado · vmax" opacity={pax} />
      </div>
      <Drift frame={frame} toScale={1.08}>
        <PlatformPlan
          x={240}
          y={430}
          width={1440}
          tag="esquema"
          showNavMesh={mesh}
          passengers={speedT > 0 ? passengers : []}
        />
      </Drift>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 1008,
          fontFamily: FONT_MONO,
          fontSize: 16,
          color: COLOR.muted,
          letterSpacing: '0.04em',
          opacity: appear(frame, f(18), 10),
        }}
      >
        posición · fila · máximo
      </div>
    </Stage>
  );
};

const Block: React.FC<{label: string; sub: string; opacity: number}> = ({
  label,
  sub,
  opacity,
}) => (
  <div style={{opacity, minWidth: 220}}>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 32,
        fontWeight: 600,
        color: COLOR.text,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}
    >
      {label}
    </div>
    <div style={{marginTop: 6, fontFamily: FONT_MONO, fontSize: 16, color: COLOR.muted}}>
      {sub}
    </div>
  </div>
);
