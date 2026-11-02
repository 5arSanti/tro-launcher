import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {WORLD, appear, arriveT, atProgress, f, pathDownStairs, pathToDoor} from '../lib';

const FACTS = [
  {t: 5.0, k: 'Línea 6 · Chengdu'},
  {t: 11.5, k: 'tren ≈ 4 min'},
  {t: 17.5, k: '5 puertas'},
];
const INTERVAL = f(0.7);
const spawn0 = f(28.5);
const PY = 150;
const PH = (1440 * WORLD.h) / WORLD.w;

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', text: 'Xingye North Street, {5:00 p. m.}'},
  {at: 5.0, layout: 'left', size: 52, text: 'Para comprobarlo, se fueron a campo: {Xingye North Street}, línea 6 de Chengdu, las cinco de la tarde.'},
  {at: 11.5, layout: 'right', text: 'En ese momento pasaba {un tren cada cuatro minutos}, más o menos,'},
  {at: 17.5, layout: 'bottom', text: 'y contaron las {cinco puertas} más cercanas a la escalera.'},
  {at: 23.5, layout: 'bottom', size: 64, text: 'La uno, además, queda atrás: {no se ve}.', place: {x: 337, y: -380, s: 1.5, o: 1}},
  {at: 28.5, layout: 'top', text: 'Luego, en la simulación, generaron un pasajero {cada 0,7 segundos}, igual que allá.'},
];

export const Escena08: React.FC = () => {
  const frame = useCurrentFrame();
  const n = frame >= spawn0 ? Math.floor((frame - spawn0) / INTERVAL) + 1 : 0;
  const count = Math.min(14, n);
  const sight = appear(frame, f(23.5), 12);
  const plate = appear(frame, f(5), 12);
  const passengers: Passenger[] = Array.from({length: count}, (_, i) => {
    const born = spawn0 + i * INTERVAL;
    const t = Math.min(1, Math.max(0, frame - born) / f(4));
    const door = ([3, 2, 4, 5, 3, 2, 4, 3, 5, 2, 4, 3, 2, 4] as const)[i];
    const path = [...pathDownStairs(), ...pathToDoor(door).slice(1)];
    const p = atProgress(path, arriveT(t));
    return {id: `s${i}`, x: p.x, y: p.y, fill: i === count - 1 ? COLOR.accent : COLOR.text};
  });

  return (
    <SceneFrame
      n={8}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              display: 'flex',
              alignItems: 'center',
              gap: 24,
              opacity: plate,
              transform: `translateY(${(1 - plate) * 24}px)`,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                background: COLOR.accent,
                color: COLOR.bg,
                fontFamily: FONT_SANS,
                fontWeight: 600,
                fontSize: 44,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              6
            </div>
            <div>
              <div style={{fontFamily: FONT_SANS, fontWeight: 600, fontSize: 44, letterSpacing: '-0.03em', color: COLOR.text}}>
                Xingye North Street
              </div>
              <div style={{display: 'flex', gap: 28, marginTop: 4}}>
                {FACTS.map((row) => (
                  <div
                    key={row.k}
                    style={{
                      fontFamily: FONT_MONO,
                      fontSize: 22,
                      color: COLOR.muted,
                      opacity: appear(frame, f(row.t), 10),
                    }}
                  >
                    {row.k}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <PlatformPlan
            x={0}
            y={PY}
            width={1440}
            tag="esquema"
            highlightDoor={frame >= f(23.5) && frame < f(28.5) ? 1 : null}
            dimHidden={sight > 0.2 ? 0.3 : 1}
            sightline={sight}
            doorMeta
            passengers={passengers}
          />
          {frame >= spawn0 ? (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: PY + PH + 6,
                fontFamily: FONT_MONO,
                fontSize: 26,
                color: COLOR.text,
              }}
            >
              cada 0,7 s · <span style={{color: COLOR.accent}}>{count}</span>
            </div>
          ) : null}
        </div>
      }
    />
  );
};
