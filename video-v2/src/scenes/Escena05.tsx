import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Copy} from '../components/Copy';
import {Drift} from '../components/Drift';
import {PlatformPlan} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
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
} from '../lib';

const STATES = [
  {es: 'Baja', en: 'DownStair', at: 12.0},
  {es: 'Busca', en: 'FindDoor', at: 16.0},
  {es: 'Hace fila', en: 'QueueUp', at: 20.0},
  {es: 'Sube', en: 'GetCar', at: 24.0},
];

const BEATS = [
  {at: 0, text: 'Baja, busca, hace fila, sube', size: 56},
  {at: 4.0, text: 'Ese pasajero, con todo, no improvisa.'},
  {at: 8.0, text: 'Siempre está en uno de cuatro estados.'},
  {at: 12.0, text: 'Primero baja.', color: COLOR.accent},
  {at: 16.0, text: 'Luego busca puerta.', color: COLOR.accent},
  {at: 20.0, text: 'Después hace fila.', color: COLOR.accent},
  {at: 24.0, text: 'Por último, cuando llega el tren, se sube.', color: COLOR.accent},
  {at: 27.5, text: 'En cuanto se cumple la condición, cambia el estado y cambia la animación.'},
];

export const Escena05: React.FC = () => {
  const frame = useCurrentFrame();
  const active = STATES.reduce((acc, s, i) => (frame >= f(s.at) ? i : acc), 0);
  const downT = clampI(frame, [f(12), f(16)], [0, 1], easeEnter);
  const findT = clampI(frame, [f(16), f(20)], [0, 1], easeEnter);
  const queueT = clampI(frame, [f(20), f(24)], [0, 1], easeEnter);
  const boardT = clampI(frame, [f(24), f(28)], [0, 1], easeEnter);

  let p = WORLD.landing;
  if (active === 0) p = atProgress(pathDownStairs(), arriveT(downT));
  else if (active === 1) p = atProgress(pathToDoor(3), arriveT(findT * 0.7));
  else if (active === 2) {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y - queueT * 4};
  } else {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y + boardT * 22};
  }

  return (
    <Stage>
      <SceneIndex n="05" />
      <Copy frame={frame} beats={BEATS} />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 250,
          display: 'flex',
          width: 1728,
        }}
      >
        {STATES.map((s, i) => {
          const on = appear(frame, f(s.at), 10);
          const isActive = i === active && frame >= f(s.at);
          const edge =
            i < 3
              ? clampI(frame, [f(STATES[i + 1].at) - 8, f(STATES[i + 1].at)], [0, 1], easeEnter)
              : 0;
          return (
            <div
              key={s.en}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                opacity: Math.max(on, appear(frame, f(8), 10)),
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 24,
                    fontWeight: 600,
                    color: isActive ? COLOR.accent : COLOR.text,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.es}
                </div>
                <div style={{fontFamily: FONT_MONO, fontSize: 16, color: COLOR.muted, marginTop: 6}}>
                  {s.en}
                </div>
              </div>
              {i < 3 ? (
                <svg width={48} height={12} style={{margin: '0 12px', flex: '0 0 48px'}}>
                  <line x1={0} y1={6} x2={48 * edge} y2={6} stroke={COLOR.line} strokeWidth={1} />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
      <Drift frame={frame} toScale={1.08}>
        <PlatformPlan
          x={240}
          y={460}
          width={1440}
          tag="esquema"
          highlightDoor={active >= 1 ? 3 : null}
          passengers={[{id: 'fsm', x: p.x, y: p.y, fill: COLOR.accent}]}
        />
      </Drift>
    </Stage>
  );
};
