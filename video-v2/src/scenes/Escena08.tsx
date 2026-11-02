import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Copy} from '../components/Copy';
import {Drift} from '../components/Drift';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, arriveT, atProgress, f, pathDownStairs, pathToDoor} from '../lib';

const FACTS = [
  {t: 5.0, k: 'Línea 6'},
  {t: 8.0, k: 'tren ≈ 4 min'},
  {t: 18.0, k: '5 puertas'},
];
const INTERVAL = f(0.7);
const spawn0 = f(29);

const BEATS = [
  {at: 0, text: 'Xingye North Street, 5:00 p. m.', size: 56},
  {at: 5.0, text: 'Para comprobarlo, se fueron a campo: línea 6 de Chengdu.'},
  {at: 11.5, text: 'Pasaba un tren cada cuatro minutos, más o menos,'},
  {at: 17.5, text: 'y contaron las cinco puertas más cercanas a la escalera.'},
  {at: 23.5, text: 'La uno, además, queda atrás: no se ve.', color: COLOR.accent},
  {at: 28.5, text: 'Luego, en la simulación, generaron un pasajero cada 0,7 segundos.'},
];

export const Escena08: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - spawn0) / INTERVAL) + (frame >= spawn0 ? 1 : 0));
  const count = Math.min(12, n);
  const sight = appear(frame, f(23.5), 10);
  const passengers: Passenger[] = Array.from({length: count}, (_, i) => {
    const born = spawn0 + i * INTERVAL;
    const t = Math.min(1, Math.max(0, frame - born) / f(4));
    const door = ([3, 2, 4, 5, 3, 2, 4, 3, 5, 2, 4, 3] as const)[i];
    const path = [...pathDownStairs(), ...pathToDoor(door).slice(1)];
    const p = atProgress(path, arriveT(t));
    return {id: `s${i}`, x: p.x, y: p.y};
  });

  return (
    <Stage>
      <SceneIndex n="08" />
      <Copy frame={frame} beats={BEATS} />
      <Note left={LAYOUT.marginX} top={250}>
        esquema
      </Note>
      <div style={{position: 'absolute', left: LAYOUT.marginX, top: 280}}>
        {FACTS.map((row) => (
          <div
            key={row.k}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              color: COLOR.text,
              marginTop: 8,
              opacity: appear(frame, f(row.t), 10),
            }}
          >
            {row.k}
          </div>
        ))}
      </div>
      <Drift frame={frame} toScale={1.08} origin="70% 60%">
        <PlatformPlan
          x={480}
          y={460}
          width={1280}
          highlightDoor={null}
          dimHidden={sight > 0.2 ? 0.3 : 1}
          sightline={sight}
          passengers={passengers}
        />
      </Drift>
      {frame >= spawn0 ? (
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 1008,
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLOR.text,
          }}
        >
          {`cada 0,7 s   ${count}`}
        </div>
      ) : null}
    </Stage>
  );
};
