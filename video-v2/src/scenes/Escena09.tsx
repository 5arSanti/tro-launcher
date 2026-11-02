import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Copy} from '../components/Copy';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, clampI, easeEnter, f} from '../lib';

type Panel = {
  w: string;
  accent: boolean;
};

const PANELS: Panel[] = [
  {w: '0,4 / 0,4 / 0,2', accent: true},
  {w: '0,2 / 0,6 / 0,2', accent: false},
  {w: '0,6 / 0,2 / 0,2', accent: false},
];

const even = (t: number, i: number) => 0.18 + t * 0.52 + i * 0.012;
const match = (t: number, i: number) => {
  if (i === 0) return 0.06 + t * 0.1;
  const rise = [0, 0.38, 0.58, 0.44, 0.3][i];
  return 0.08 + t * rise;
};
const crowd = (t: number, i: number) => {
  const rise = [0.18, 0.72, 0.8, 0.28, 0.16][i];
  return 0.08 + t * rise;
};
const far = (t: number, i: number) => {
  const rise = [0.12, 0.22, 0.2, 0.48, 0.7][i];
  return 0.08 + t * rise;
};

const series = (kind: 'fit' | 0 | 1 | 2, door: number, t: number) => {
  if (kind === 'fit') return even(t, door);
  if (kind === 0) return match(t, door);
  if (kind === 1) return crowd(t, door);
  return far(t, door);
};

const pathOf = (kind: 'fit' | 0 | 1 | 2, door: number) => {
  const pts: string[] = [];
  for (let i = 0; i <= 24; i++) {
    const t = i / 24;
    const x = 16 + t * 488;
    const y = 200 - series(kind, door, t) * 168;
    pts.push(`${i === 0 ? 'M' : 'L'} ${x} ${y}`);
  }
  return pts.join(' ');
};

const BEATS = [
  {at: 0, text: '0,4 · 0,4 · 0,2, lo más parecido', size: 56, color: COLOR.valid},
  {at: 5.0, text: '¿Qué encontraron? Con la fórmula, la gente se reparte demasiado pareja.'},
  {at: 11.5, text: 'Sin embargo, el método no castiga a la puerta que no se ve.'},
  {at: 17.5, text: 'Con TOPSIS, el que más se pareció a lo real fue 0,4 distancia, 0,4 fila y 0,2 visibilidad.'},
  {at: 24.5, text: 'Si hay mucha cola, caminamos más lejos; y la puerta que no vemos, no existe.', color: COLOR.accent},
];

export const Escena09: React.FC = () => {
  const frame = useCurrentFrame();
  const fitOn = appear(frame, f(5), 10);
  const hiddenFail = appear(frame, f(11.5), 10);
  const three = appear(frame, f(17.5), 10);
  const draw = clampI(frame, [f(6), f(16)], [0, 1], easeEnter);
  const pick = appear(frame, f(17.5), 10);
  const len = 420;

  return (
    <Stage>
      <SceneIndex n="09" />
      <Copy frame={frame} beats={BEATS} size={42} />
      <Note left={LAYOUT.marginX} top={250}>
        ilustrativo · 0–240 s
      </Note>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 280,
          fontFamily: FONT_MONO,
          fontSize: 16,
          color: COLOR.muted,
          opacity: fitOn * (1 - three * 0.85),
        }}
      >
        Fórmula: reparte parejo
      </div>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 308,
          fontFamily: FONT_MONO,
          fontSize: 16,
          color: COLOR.muted,
          opacity: hiddenFail * (1 - three * 0.85),
        }}
      >
        falla en la puerta oculta
      </div>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 400,
          display: 'flex',
          gap: 36,
          opacity: three,
        }}
      >
        {PANELS.map((p, idx) => {
          const dim = pick > 0 && !p.accent ? 0.4 : 1;
          const kind = idx as 0 | 1 | 2;
          return (
            <div key={p.w} style={{opacity: dim, width: 520}}>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: 16,
                  color: p.accent && pick > 0.3 ? COLOR.valid : COLOR.muted,
                  marginBottom: 12,
                }}
              >
                {p.w}
              </div>
              <svg width={520} height={220}>
                <line x1={16} y1={200} x2={504} y2={200} stroke={COLOR.line} strokeWidth={1} />
                <line x1={16} y1={16} x2={16} y2={200} stroke={COLOR.line} strokeWidth={1} />
                {[0, 1, 2, 3, 4].map((d) => (
                  <path
                    key={d}
                    d={pathOf(kind, d)}
                    fill="none"
                    stroke={p.accent && d === 0 ? COLOR.valid : COLOR.text}
                    strokeWidth={d === 0 && p.accent ? 2 : 1}
                    opacity={d === 0 && p.accent ? 1 : 0.55}
                    strokeDasharray={len}
                    strokeDashoffset={len * (1 - draw)}
                  />
                ))}
              </svg>
            </div>
          );
        })}
      </div>
    </Stage>
  );
};
