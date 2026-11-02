import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {PlatformPlan} from '../components/PlatformPlan';
import {COLOR} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {
  WORLD,
  appear,
  arriveT,
  atProgress,
  clampI,
  easeEnter,
  f,
  pathDownStairs,
  pathToDoor,
  steps,
} from '../lib';

const STATES = [
  {es: 'Baja', en: 'DownStair', at: 12.0},
  {es: 'Busca', en: 'FindDoor', at: 16.0},
  {es: 'Hace fila', en: 'QueueUp', at: 20.0},
  {es: 'Sube', en: 'GetCar', at: 24.0},
];
const COL = 360;

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', text: 'Baja, busca, {hace fila}, sube'},
  {at: 4.0, layout: 'right', text: 'Ese pasajero, con todo, {no improvisa}.'},
  {at: 8.0, layout: 'top', text: 'Siempre está en uno de {cuatro estados}.'},
  {at: 12.0, layout: 'bottom', size: 72, text: 'Primero {baja}.'},
  {at: 16.0, layout: 'bottom', size: 72, text: 'Luego {busca puerta}.'},
  {at: 20.0, layout: 'bottom', size: 72, text: 'Después {hace fila}.'},
  {at: 24.0, layout: 'bottom', size: 72, text: 'Por último, cuando llega el tren, {se sube}.'},
  {at: 27.5, layout: 'left', size: 50, text: 'En cuanto se cumple la condición, {cambia el estado} y cambia la animación.'},
];

export const Escena05: React.FC = () => {
  const frame = useCurrentFrame();
  const active = STATES.reduce((acc, s, i) => (frame >= f(s.at) ? i : acc), 0);
  const slide = steps(frame, STATES.map((s, i) => [f(s.at), i * COL] as [number, number]), 12);
  const barOn = appear(frame, f(12), 10);
  const downT = clampI(frame, [f(12), f(16)], [0, 1], easeEnter);
  const findT = clampI(frame, [f(16), f(20)], [0, 1], easeEnter);
  const queueT = clampI(frame, [f(20), f(24)], [0, 1], easeEnter);
  const boardT = clampI(frame, [f(24), f(27)], [0, 1], easeEnter);

  let p = atProgress(pathDownStairs(), 0);
  if (frame < f(16)) p = atProgress(pathDownStairs(), arriveT(downT));
  else if (frame < f(20)) p = atProgress(pathToDoor(3), arriveT(findT * 0.75));
  else if (frame < f(24)) {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y - queueT * 4};
  } else {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y + boardT * 22};
  }

  return (
    <SceneFrame
      n={5}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          <div style={{position: 'absolute', left: 0, top: 0, display: 'flex'}}>
            {STATES.map((s, i) => {
              const on = appear(frame, f(8) + i * 4, 10);
              const isActive = frame >= f(12) && i === active;
              return (
                <div key={s.en} style={{width: COL, opacity: on, transform: `translateY(${(1 - on) * 20}px)`}}>
                  <div
                    style={{
                      fontFamily: FONT_SANS,
                      fontSize: 40,
                      fontWeight: 600,
                      letterSpacing: '-0.03em',
                      color: isActive ? COLOR.accent : COLOR.text,
                    }}
                  >
                    {s.es}
                  </div>
                  <div style={{fontFamily: FONT_MONO, fontSize: 18, color: COLOR.muted, marginTop: 6}}>{s.en}</div>
                </div>
              );
            })}
          </div>
          <div
            style={{
              position: 'absolute',
              left: slide,
              top: 92,
              width: COL - 60,
              height: 6,
              background: COLOR.accent,
              transform: `scaleX(${barOn})`,
              transformOrigin: '0 50%',
            }}
          />
          <PlatformPlan
            x={0}
            y={150}
            width={1440}
            tag="esquema"
            highlightDoor={frame >= f(16) ? 3 : null}
            passengers={[{id: 'fsm', x: p.x, y: p.y, fill: COLOR.accent}]}
          />
        </div>
      }
    />
  );
};