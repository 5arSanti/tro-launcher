import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {WORLD, appear, arriveT, atProgress, clampI, easeEnter, f, pathToDoor, steps} from '../lib';

const speeds = [0.62, 1, 1.22, 0.8, 1.1];
const PY = 150;
const sx = (x: number) => (x / WORLD.w) * 1440;
const sy = (y: number) => PY + (y / WORLD.h) * ((1440 * WORLD.h) / WORLD.w);

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', text: 'Entorno y {pasajero inteligente}'},
  {at: 4.0, layout: 'top', text: 'Para lograrlo, el sistema se parte {en dos}.'},
  {at: 8.0, layout: 'left', text: 'Por un lado, {el entorno}: toma la estación en Unity,'},
  {at: 13.0, layout: 'right', text: 'quita lo que no se pisa y teje una malla {NavMesh} de polígonos convexos.'},
  {at: 18.0, layout: 'bottom', text: 'Ahí vive cada puerta: {dónde está}, {cuánta fila hay}, {cuántos caben}.'},
  {at: 24.0, layout: 'left', text: 'Por el otro, {el pasajero inteligente}: planea, cambia de estado y no todos corren igual.'},
  {at: 29.0, layout: 'top', text: 'De hecho, cada uno trae, por ejemplo, {su propia velocidad máxima}.'},
];

export const Escena04: React.FC = () => {
  const frame = useCurrentFrame();
  const env = appear(frame, f(8), 10);
  const pax = appear(frame, f(24), 10);
  const link = clampI(frame, [f(24), f(25.5)], [0, 1], easeEnter);
  const mesh = clampI(frame, [f(13), f(17)], [0, 1], easeEnter);
  const speedT = appear(frame, f(26), f(7));
  const envHot = steps(frame, [[0, 0], [f(8), 1], [f(24), 0]]);
  const passengers: Passenger[] = speeds.map((s, i) => {
    const t = Math.min(1, speedT * s);
    const p = atProgress(pathToDoor(((i % 5) + 1) as 1 | 2 | 3 | 4 | 5), arriveT(t));
    return {
      id: `v${i}`,
      x: t === 0 ? WORLD.landing.x : p.x,
      y: t === 0 ? WORLD.landing.y : p.y,
      fill: i === 2 ? COLOR.accent : COLOR.text,
    };
  });

  return (
    <SceneFrame
      n={4}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          <div style={{position: 'absolute', left: 0, top: 0, display: 'flex', alignItems: 'center', gap: 32}}>
            <Block label="Entorno" sub="NavMesh · puertas" opacity={env} hot={envHot} />
            <svg width={120} height={12}>
              <line x1={0} y1={6} x2={120 * link} y2={6} stroke={COLOR.text} strokeWidth={3} />
            </svg>
            <Block label="Pasajero" sub="ruta · estado · vmax" opacity={pax} hot={1 - envHot} />
          </div>
          <PlatformPlan
            x={0}
            y={PY}
            width={1440}
            tag="esquema"
            showNavMesh={mesh}
            passengers={speedT > 0 ? passengers : []}
          />
          <svg width={1440} height={640} style={{position: 'absolute', left: 0, top: 0}}>
            {WORLD.doors.map((d, i) => {
              const on = appear(frame, f(18) + i * 5, 10) * (1 - appear(frame, f(24), 10));
              return (
                <circle
                  key={d.id}
                  cx={sx(d.x)}
                  cy={sy(d.y - 8)}
                  r={10 + 18 * on}
                  fill="none"
                  stroke={COLOR.accent}
                  strokeWidth={3}
                  opacity={on}
                />
              );
            })}
          </svg>
        </div>
      }
    />
  );
};

const Block: React.FC<{label: string; sub: string; opacity: number; hot: number}> = ({
  label,
  sub,
  opacity,
  hot,
}) => (
  <div style={{opacity, minWidth: 240}}>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 48,
        fontWeight: 600,
        color: hot > 0.5 ? COLOR.accent : COLOR.text,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}
    >
      {label}
    </div>
    <div style={{marginTop: 6, fontFamily: FONT_MONO, fontSize: 18, color: COLOR.muted}}>{sub}</div>
  </div>
);
