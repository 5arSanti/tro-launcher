import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Label} from '../components/Stage';
import {Copy} from '../components/Copy';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {
  WORLD,
  appear,
  arriveT,
  atProgress,
  clampI,
  easeMove,
  f,
  pathDownStairs,
  pathToDoor,
} from '../lib';

const N = 9;
const down = pathDownStairs();
const spawn = (i: number) => i * 16;
const doorOfB = (i: number) => ([3, 2, 4, 5, 3, 2, 4, 3, 5] as const)[i];

const BEATS = [
  {at: 0, text: 'Ruta fija vs. decide', size: 64},
  {at: 3.5, text: 'El problema se entiende de inmediato.'},
  {at: 7.5, text: 'En casi todos los simuladores, la gente del andén no decide:'},
  {at: 13.0, text: 'sigue una ruta ya dibujada, como fichas.'},
  {at: 17.5, text: 'En cambio, en la vida real uno mira la fila, la distancia y si alcanza a ver la puerta.'},
  {at: 25.5, text: 'Por eso, los autores quieren pasajeros virtuales que elijan solos,'},
  {at: 30.5, text: 'y que esas elecciones se parezcan a las nuestras.', color: COLOR.accent},
];

const posA = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawn(i)) / f(6));
  const path = [...down, ...pathToDoor(3).slice(1)];
  const queue = {x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18 - i * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

const posB = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawn(i)) / f(6));
  const id = doorOfB(i);
  const path = [...down, ...pathToDoor(id).slice(1)];
  const qIndex =
    [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((j) => j <= i && doorOfB(j) === id).length - 1;
  const queue = {x: WORLD.doors[id - 1].x, y: WORLD.doors[id - 1].y - 18 - qIndex * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

export const Escena03: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = clampI(frame, [f(28), f(35)], [0, 1], easeMove);
  const pa: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posA(frame, i);
    return {id: `a${i}`, x: p.x, y: p.y, fill: COLOR.text};
  }).filter((_, i) => frame >= spawn(i));
  const pb: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posB(frame, i);
    return {id: `b${i}`, x: p.x, y: p.y, fill: COLOR.text};
  }).filter((_, i) => frame >= spawn(i));
  const scale = 1 + zoom * 0.42;
  const shiftX = -zoom * 320;

  return (
    <Stage>
      <SceneIndex n="03" />
      <Copy frame={frame} beats={BEATS} />
      <div
        style={{
          transform: `translateX(${shiftX}px) scale(${scale})`,
          transformOrigin: '72% 78%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 300,
            opacity: appear(frame, f(3), 10),
          }}
        >
          <Label size={24} weight={600}>
            Ruta fija
          </Label>
        </div>
        <PlatformPlan
          x={LAYOUT.marginX}
          y={340}
          width={820}
          passengers={pa}
          highlightDoor={3}
          tag="esquema"
        />
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 300,
            opacity: appear(frame, f(7), 10),
          }}
        >
          <Label size={24} weight={600} color={COLOR.accent}>
            Decide
          </Label>
        </div>
        <PlatformPlan x={1000} y={340} width={820} passengers={pb} tag="esquema" />
      </div>
    </Stage>
  );
};
