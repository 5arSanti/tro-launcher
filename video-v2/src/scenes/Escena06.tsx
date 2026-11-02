import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Copy} from '../components/Copy';
import {Drift} from '../components/Drift';
import {PlatformPlan} from '../components/PlatformPlan';
import {Term, Tex} from '../components/Formula';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {SEARCH, WORLD, appear, clampI, f} from '../lib';

const BEATS = [
  {at: 0, text: 'Para moverse, usa A*: el camino más barato dentro de la malla.'},
  {at: 6.0, text: 'La fórmula es f(n) igual a g(n) más h(n).'},
  {at: 11.0, text: 'g es lo que ya costó; h, lo que estima que falta.'},
  {at: 17.0, text: 'Así, siempre gana el punto con f más bajo.', color: COLOR.accent},
  {at: 22.0, text: 'Además, para no atravesarse, cada uno lleva un colisionador'},
  {at: 27.5, text: 'cápsula de 0,25 metros de radio.'},
];

export const Escena06: React.FC = () => {
  const frame = useCurrentFrame();
  const grid = appear(frame, f(1), 10);
  const expandStart = f(3);
  const expandN = Math.min(
    SEARCH.expansions.length - 1,
    Math.floor(clampI(frame, [expandStart, f(16)], [0, SEARCH.expansions.length - 1])),
  );
  const pathT = clampI(frame, [f(14), f(20)], [0, 1]);
  const fOn = frame >= f(6) && frame < f(11);
  const gOn = frame >= f(11) && frame < f(14);
  const hOn = frame >= f(14) && frame < f(22);
  const rad = appear(frame, f(27), 10);

  return (
    <Stage>
      <SceneIndex n="06" />
      <Copy frame={frame} beats={BEATS} size={44} />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 250,
          display: 'flex',
          alignItems: 'baseline',
          gap: 14,
          opacity: appear(frame, f(6), 10),
        }}
      >
        <Term tex="f(n)" active={fOn} seen={frame >= f(6)} fontSize={56} />
        <Tex tex="=" fontSize={56} color={COLOR.muted} />
        <Term tex="g(n)" active={gOn} seen={frame >= f(11)} fontSize={56} />
        <Tex tex="+" fontSize={56} color={COLOR.muted} />
        <Term tex="h(n)" active={hOn} seen={frame >= f(14)} fontSize={56} />
      </div>
      <Drift frame={frame} toScale={1.1}>
        <PlatformPlan
          x={240}
          y={380}
          width={1440}
          tag="esquema"
          grid={grid}
          expansionsUntil={frame >= expandStart ? expandN : -1}
          pathProgress={pathT}
          highlightDoor={pathT > 0.6 ? 3 : null}
          passengers={[{id: 'a', x: WORLD.landing.x, y: WORLD.landing.y, fill: COLOR.text}]}
          capsule={rad > 0 ? {x: WORLD.landing.x, y: WORLD.landing.y, r: 36, opacity: rad} : undefined}
        />
      </Drift>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 1008,
          fontFamily: FONT_MONO,
          fontSize: 22,
          color: rad > 0 ? COLOR.accent : COLOR.muted,
          opacity: rad,
        }}
      >
        r = 0,25 m
      </div>
    </Stage>
  );
};
