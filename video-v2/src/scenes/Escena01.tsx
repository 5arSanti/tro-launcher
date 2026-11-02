import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Copy} from '../components/Copy';
import {Drift} from '../components/Drift';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {appear, f, atProgress, arriveT, pathDownStairs, pathToDoor, WORLD} from '../lib';
import {COLOR, LAYOUT} from '../design/tokens';

const down = pathDownStairs();
const doors = [3, 2, 4, 5, 3] as const;

const BEATS = [
  {at: 0, text: '¿Por qué puerta subimos al metro?', size: 64, color: COLOR.accent},
  {at: 4.2, text: 'Bajan las escaleras, miran las puertas y eligen una.'},
  {at: 9.0, text: 'Sin hacer cuentas.'},
  {at: 11.2, text: '¿Por qué esa, y no la de al lado?', color: COLOR.accent},
  {at: 15.5, text: 'Justamente ese gesto, tan automático que casi no lo vemos,'},
  {at: 20.5, text: 'es lo que este artículo intenta simular.'},
  {at: 24.0, text: 'Soy Santiago Arias.'},
  {at: 26.2, text: 'Vengo a sustentar A Subway Station Platform Crowd Simulation System.'},
  {at: 31.0, text: 'Vale la pena: no se quedan en el modelo; lo contrastan con una estación de verdad.'},
];

const spawn = (i: number) => i * 18;

export const Escena01: React.FC = () => {
  const frame = useCurrentFrame();
  const passengers: Passenger[] = doors.map((id, i) => {
    const born = spawn(i);
    const tDown = appear(frame, born, f(5));
    const walk = appear(frame, born + f(6), f(8));
    const chosen = frame >= born + f(6);
    let p = WORLD.landing;
    if (tDown < 1 && !chosen) p = atProgress(down, arriveT(tDown));
    else if (chosen) p = atProgress(pathToDoor(id), arriveT(walk));
    return {
      id: `p${i}`,
      x: p.x,
      y: p.y,
      fill: id === 3 ? COLOR.accent : COLOR.text,
    };
  }).filter((_, i) => frame >= spawn(i));

  return (
    <Stage>
      <SceneIndex n="01" />
      <Copy frame={frame} beats={BEATS} />
      <Note left={LAYOUT.marginX} top={250}>
        esquema
      </Note>
      <Drift frame={frame} toScale={1.1} origin="42% 70%">
        <PlatformPlan
          x={LAYOUT.marginX}
          y={420}
          width={1728}
          tag="andén"
          highlightDoor={frame >= f(18) ? 3 : null}
          lookSweep={appear(frame, f(8), f(6)) * (1 - appear(frame, f(16), 10))}
          passengers={passengers}
        />
      </Drift>
    </Stage>
  );
};
