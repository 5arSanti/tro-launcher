import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {Label} from '../components/Stage';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR} from '../design/tokens';
import {WORLD, arriveT, atProgress, f, pathDownStairs, pathToDoor, steps} from '../lib';

const N = 9;
const down = pathDownStairs();
const doorOfB = (i: number) => ([3, 2, 4, 5, 3, 2, 4, 3, 5] as const)[i];

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', text: 'Ruta fija {vs.} decide'},
  {at: 3.5, layout: 'top', text: 'El problema se entiende {de inmediato}.'},
  {at: 7.5, layout: 'bottom', text: 'En casi todos los simuladores, la gente del andén {no decide}:', place: {x: 60, y: 60, s: 1.25}},
  {at: 13.0, layout: 'right', text: 'sigue una ruta ya dibujada, {como fichas}.', place: {x: 96, y: 200, s: 1.2}},
  {at: 17.5, layout: 'left', text: 'En cambio, en la vida real uno mira {la fila}, {la distancia} y si alcanza a ver la puerta.', place: {x: -147, y: 54, s: 1.37}},
  {at: 25.5, layout: 'top', text: 'Por eso, los autores quieren pasajeros virtuales que {elijan solos},'},
  {at: 30.5, layout: 'hero', text: 'y que esas elecciones se parezcan {a las nuestras}.'},
];

const spawnA = (i: number) => f(7.5) + i * 16;
const spawnB = (i: number) => f(17.5) + i * 16;

const posA = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawnA(i)) / f(4.5));
  const path = [...down, ...pathToDoor(3).slice(1)];
  const queue = {x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18 - i * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

const posB = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawnB(i)) / f(4.5));
  const id = doorOfB(i);
  const path = [...down, ...pathToDoor(id).slice(1)];
  const qIndex = [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((j) => j <= i && doorOfB(j) === id).length - 1;
  const queue = {x: WORLD.doors[id - 1].x, y: WORLD.doors[id - 1].y - 18 - qIndex * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

export const Escena03: React.FC = () => {
  const frame = useCurrentFrame();
  const dimA = steps(frame, [[0, 1], [f(17.5), 0.06], [f(25.5), 1]]);
  const dimB = steps(frame, [[0, 1], [f(7.5), 0.06], [f(17.5), 1]]);
  const pa: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posA(frame, i);
    return {id: `a${i}`, x: p.x, y: p.y};
  }).filter((_, i) => frame >= spawnA(i));
  const pb: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posB(frame, i);
    return {id: `b${i}`, x: p.x, y: p.y, fill: COLOR.accent};
  }).filter((_, i) => frame >= spawnB(i));

  return (
    <SceneFrame
      n={3}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          <div style={{position: 'absolute', left: 0, top: 150, opacity: dimA}}>
            <Label size={30} weight={600}>Ruta fija</Label>
          </div>
          <div style={{opacity: dimA}}>
            <PlatformPlan x={0} y={230} width={690} passengers={pa} highlightDoor={3} tag="esquema" />
          </div>
          <div style={{position: 'absolute', left: 750, top: 150, opacity: dimB}}>
            <Label size={30} weight={600} color={COLOR.accent}>Decide</Label>
          </div>
          <div style={{opacity: dimB}}>
            <PlatformPlan x={750} y={230} width={690} passengers={pb} tag="esquema" />
          </div>
        </div>
      }
    />
  );
};
