import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {COLOR} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, clampI, easeEnter, f} from '../lib';

type Kind = 'fit' | 0 | 1 | 2;

const PANELS = [
  {w: '0,4 / 0,4 / 0,2', valid: true},
  {w: '0,2 / 0,6 / 0,2', valid: false},
  {w: '0,6 / 0,2 / 0,2', valid: false},
];

const even = (t: number, i: number) => 0.18 + t * 0.52 + i * 0.012;
const match = (t: number, i: number) => 0.06 + t * [0.1, 0.38, 0.58, 0.44, 0.3][i];
const crowd = (t: number, i: number) => 0.08 + t * [0.18, 0.72, 0.8, 0.28, 0.16][i];
const far = (t: number, i: number) => 0.08 + t * [0.12, 0.22, 0.2, 0.48, 0.7][i];

const series = (kind: Kind, door: number, t: number) =>
  kind === 'fit' ? even(t, door) : kind === 0 ? match(t, door) : kind === 1 ? crowd(t, door) : far(t, door);

const pathOf = (kind: Kind, door: number, w: number, h: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    pts.push(`${i === 0 ? 'M' : 'L'} ${16 + t * (w - 32)} ${h - 16 - series(kind, door, t) * (h - 40)}`);
  }
  return pts.join(' ');
};

const Chart: React.FC<{
  kind: Kind;
  w: number;
  h: number;
  draw: number;
  hotDoor: number | null;
  hotColor: string;
  stroke: number;
}> = ({kind, w, h, draw, hotDoor, hotColor, stroke}) => (
  <svg width={w} height={h}>
    <line x1={16} y1={h - 16} x2={w - 16} y2={h - 16} stroke={COLOR.line} strokeWidth={2} />
    <line x1={16} y1={16} x2={16} y2={h - 16} stroke={COLOR.line} strokeWidth={2} />
    {[0, 1, 2, 3, 4].map((d) => (
      <path
        key={d}
        d={pathOf(kind, d, w, h)}
        fill="none"
        stroke={d === hotDoor ? hotColor : COLOR.text}
        strokeWidth={d === hotDoor ? stroke * 2 : stroke}
        opacity={d === hotDoor ? 1 : 0.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - draw}
      />
    ))}
  </svg>
);

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', hot: COLOR.valid, text: '{0,4 · 0,4 · 0,2}, lo más parecido'},
  {at: 5.0, layout: 'left', text: '¿Qué encontraron? Con la fórmula, la gente se reparte {demasiado pareja}.'},
  {at: 10.5, layout: 'right', text: 'Sin embargo, el método {no castiga} a la puerta que no se ve.'},
  {at: 15.0, layout: 'top', text: 'Con TOPSIS, en cambio, probaron {tres juegos de pesos}.'},
  {at: 18.5, layout: 'bottom', hot: COLOR.valid, text: 'El que más se pareció a lo real fue {0,4 distancia, 0,4 fila y 0,2 visibilidad}.'},
  {at: 24.0, layout: 'hero', size: 76, text: 'Dicho de otro modo: si hay mucha cola, caminamos más lejos; y la puerta que no vemos, aunque esté cerca, {no existe}.'},
];

export const Escena09: React.FC = () => {
  const frame = useCurrentFrame();
  const big = appear(frame, f(5), 12) * (1 - appear(frame, f(15), 12));
  const drawBig = clampI(frame, [f(5.5), f(10)], [0, 1], easeEnter);
  const hidden = appear(frame, f(10.5), 10);
  const three = appear(frame, f(15.2), 12);
  const pick = appear(frame, f(18.5), 12);

  return (
    <SceneFrame
      n={9}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          <div style={{position: 'absolute', left: 0, top: 0, fontFamily: FONT_MONO, fontSize: 18, color: COLOR.muted, letterSpacing: '0.08em', textTransform: 'uppercase'}}>
            ilustrativo · 0–240 s · cada línea es una puerta
          </div>
          {big > 0 ? (
            <div style={{position: 'absolute', left: 0, top: 50, opacity: big}}>
              <div style={{fontFamily: FONT_MONO, fontSize: 26, color: COLOR.text, marginBottom: 8}}>
                Fórmula: reparte parejo
                <span style={{color: COLOR.accent, opacity: hidden}}>  ·  puerta 1 oculta, igual que las demás</span>
              </div>
              <Chart kind="fit" w={1440} h={540} draw={drawBig} hotDoor={hidden > 0.3 ? 0 : null} hotColor={COLOR.accent} stroke={2} />
            </div>
          ) : null}
          {three > 0 ? (
            <div style={{position: 'absolute', left: 0, top: 80, display: 'flex', gap: 40, opacity: three}}>
              {PANELS.map((p, idx) => {
                const enter = appear(frame, f(15.2) + idx * 6, 12);
                const dim = pick > 0 && !p.valid ? 1 - 0.6 * pick : 1;
                return (
                  <div
                    key={p.w}
                    style={{
                      width: 453,
                      opacity: dim * enter,
                      transform: `translateY(${(1 - enter) * 40}px) scale(${p.valid ? 1 + 0.06 * pick : 1})`,
                      transformOrigin: '50% 100%',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: FONT_MONO,
                        fontSize: 26,
                        fontWeight: 500,
                        color: p.valid && pick > 0.3 ? COLOR.valid : COLOR.muted,
                        marginBottom: 10,
                      }}
                    >
                      {p.w}
                    </div>
                    <Chart
                      kind={idx as 0 | 1 | 2}
                      w={453}
                      h={400}
                      draw={clampI(frame, [f(15.5) + idx * 6, f(18) + idx * 6], [0, 1], easeEnter)}
                      hotDoor={p.valid ? 0 : null}
                      hotColor={COLOR.valid}
                      stroke={1.5}
                    />
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      }
    />
  );
};
