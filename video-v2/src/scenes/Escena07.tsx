import React from 'react';
import {useCurrentFrame} from 'remotion';
import {SceneFrame} from '../components/SceneFrame';
import {type Beat} from '../components/Narration';
import {Note} from '../components/Stage';
import {PlatformPlan} from '../components/PlatformPlan';
import {Term, Tex} from '../components/Formula';
import {COLOR} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {SAMPLE_DOORS, WORLD, appear, comma, f, fittedS, holdAppear, topsis} from '../lib';

type TermId = 'ln' | 'sqrt' | 'invM' | 'K' | 'min' | null;

const PY = 150;
const PW = 1440;
const PH = (PW * WORLD.h) / WORLD.w;
const px = (x: number) => (x / WORLD.w) * PW;

const BEATS: Beat[] = [
  {at: 0, layout: 'hero', text: 'Y aquí viene, para mí, {el corazón}.'},
  {at: 4.0, layout: 'hero', text: '¿Cómo se escoge {la puerta}?'},
  {at: 8.5, layout: 'left', text: 'La elección depende de {la gente alrededor}, de {la distancia} y de {si se ve}.'},
  {at: 16.0, layout: 'bottom', text: 'Si queda en un {punto ciego}, ni la consideramos.', place: {x: 337, y: -380, s: 1.5, o: 1}},
  {at: 21.5, layout: 'hero', text: 'Con eso, probaron {dos maneras}.'},
  {at: 25.5, layout: 'bottom', text: 'La primera es {una fórmula}: S junta el logaritmo de la fila,'},
  {at: 32.5, layout: 'bottom', text: 'la raíz de {la distancia} y {la gente alrededor},'},
  {at: 38.5, layout: 'right', text: 'y lo multiplica por {un K al azar}, entre 0,8 y 1,2.'},
  {at: 45.0, layout: 'top', text: 'Se elige la de {S más bajo}.'},
  {at: 49.0, layout: 'hero', text: 'La segunda es {TOPSIS}:'},
  {at: 51.5, layout: 'bottom', text: 'cada puerta se mide contra {la ideal} y contra {la peor}.'},
  {at: 58.5, layout: 'right', text: 'Si se ve, vale {1}; si no, {0,3}.'},
  {at: 64.0, layout: 'top', text: 'Al final, gana la de {mejor puntaje}.'},
];

const termAt = (frame: number): TermId => {
  if (frame >= f(25.5) && frame < f(32.5)) return 'ln';
  if (frame >= f(32.5) && frame < f(35.5)) return 'sqrt';
  if (frame >= f(35.5) && frame < f(38.5)) return 'invM';
  if (frame >= f(38.5) && frame < f(45)) return 'K';
  if (frame >= f(45) && frame < f(49)) return 'min';
  return null;
};

const Scores: React.FC<{values: string[]; hot: number | null; opacity: number}> = ({
  values,
  hot,
  opacity,
}) => (
  <div style={{position: 'absolute', left: 0, top: PY + PH + 4, width: PW, height: 30, opacity}}>
    {WORLD.doors.map((d, i) => (
      <div
        key={d.id}
        style={{
          position: 'absolute',
          left: px(d.x) - 60,
          width: 120,
          textAlign: 'center',
          fontFamily: FONT_MONO,
          fontSize: 24,
          fontWeight: 500,
          color: hot === d.id ? COLOR.accent : COLOR.muted,
        }}
      >
        {values[i]}
      </div>
    ))}
  </div>
);

export const Escena07: React.FC = () => {
  const frame = useCurrentFrame();
  const around = holdAppear(frame, f(8.5), f(25.5));
  const dist = holdAppear(frame, f(8.5), f(25.5));
  const vis = appear(frame, f(16), 12);
  const formulaAct = frame >= f(25.5) && frame < f(49);
  const topsisAct = frame >= f(49);
  const kShow = frame >= f(38.5) && formulaAct;
  const K = kShow ? 1 + 0.2 * Math.sin(frame / 16) : 1;
  const scores = SAMPLE_DOORS.map((d) => fittedS(d.P, d.L, d.M, K));
  const minId = SAMPLE_DOORS[scores.indexOf(Math.min(...scores))].id;
  const trows = topsis(SAMPLE_DOORS);
  const best = trows.reduce((a, b) => (b.Si > a.Si ? b : a));
  const minOn = frame >= f(45);
  const winOn = appear(frame, f(64), 10);
  const active = termAt(frame);
  const lineOn = appear(frame, f(51.5), 14);

  return (
    <SceneFrame
      n={7}
      beats={BEATS}
      panel={
        <div style={{position: 'absolute', inset: 0}}>
          {formulaAct ? (
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                opacity: appear(frame, f(25.5), 10),
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
              }}
            >
              <Tex tex="S =" fontSize={60} />
              <Tex tex="(" fontSize={60} color={COLOR.muted} />
              <Term tex="10\ln(P+e)" active={active === 'ln'} seen fontSize={60} />
              <Tex tex="+" fontSize={60} color={COLOR.muted} />
              <Term tex="\sqrt{L}" active={active === 'sqrt'} seen={frame >= f(32.5)} fontSize={60} />
              <Term tex="\cdot 1/M" active={active === 'invM'} seen={frame >= f(35.5)} fontSize={60} />
              <Tex tex=")" fontSize={60} color={COLOR.muted} />
              <Tex tex="\cdot" fontSize={60} color={COLOR.muted} />
              <Term tex="K" active={active === 'K'} seen={frame >= f(38.5)} fontSize={60} />
            </div>
          ) : null}

          {kShow ? (
            <div style={{position: 'absolute', left: 900, top: 100, width: 520, opacity: appear(frame, f(38.5), 10)}}>
              <div style={{fontFamily: FONT_MONO, fontSize: 22, color: COLOR.text, marginBottom: 10}}>
                {`K ∈ [0,8 ; 1,2]   K = ${comma(K, 2)}`}
              </div>
              <div style={{position: 'relative', height: 20}}>
                <div style={{height: 2, background: COLOR.line, marginTop: 9}} />
                <div
                  style={{
                    position: 'absolute',
                    left: `${((K - 0.8) / 0.4) * 100}%`,
                    top: 0,
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: COLOR.accent,
                    transform: 'translateX(-10px)',
                  }}
                />
              </div>
            </div>
          ) : null}

          {topsisAct ? (
            <div style={{position: 'absolute', left: 0, top: 0, opacity: appear(frame, f(49), 10)}}>
              <Tex tex={'S_i = D_i^- / (D_i^- + D_i^+)'} fontSize={56} />
            </div>
          ) : null}

          {frame >= f(58.5) ? (
            <div
              style={{
                position: 'absolute',
                left: 860,
                top: 20,
                fontFamily: FONT_MONO,
                fontSize: 30,
                color: COLOR.text,
                opacity: appear(frame, f(58.5), 10),
              }}
            >
              visible = 1<span style={{color: COLOR.muted}}> · </span>
              <span style={{color: COLOR.accent}}>no visible = 0,3</span>
            </div>
          ) : null}

          <PlatformPlan
            x={0}
            y={PY}
            width={PW}
            tag="esquema · ilustrativo"
            highlightDoor={
              minOn && formulaAct ? minId : winOn > 0.4 ? best.id : frame >= f(16) && frame < f(21.5) ? 1 : null
            }
            dimHidden={vis > 0.2 ? 0.3 : 1}
            sightline={vis}
            passengers={[
              {id: 'dec', x: WORLD.landing.x, y: WORLD.landing.y, fill: COLOR.accent},
              ...(around > 0.2
                ? [
                    {id: 'm0', x: WORLD.doors[2].x - 18, y: 248},
                    {id: 'm1', x: WORLD.doors[2].x + 18, y: 248},
                    {id: 'm2', x: WORLD.doors[2].x, y: 232},
                    {id: 'm3', x: WORLD.doors[2].x, y: 270},
                  ]
                : []),
            ]}
          />

          <svg
            style={{position: 'absolute', left: 0, top: PY, width: PW, height: PH, pointerEvents: 'none'}}
            viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
          >
            <line
              x1={WORLD.landing.x}
              y1={WORLD.landing.y}
              x2={WORLD.doors[4].x}
              y2={WORLD.doors[4].y - 16}
              stroke={COLOR.text}
              strokeWidth={1.5}
              strokeDasharray="4 4"
              opacity={dist}
            />
            {topsisAct ? (
              <g opacity={lineOn}>
                <circle cx={760} cy={70} r={7} fill={COLOR.accent} />
                <circle cx={900} cy={70} r={7} fill={COLOR.cold} />
                <text x={760} y={52} textAnchor="middle" fill={COLOR.accent} fontSize={16} fontFamily={FONT_MONO}>
                  ideal
                </text>
                <text x={900} y={52} textAnchor="middle" fill={COLOR.cold} fontSize={16} fontFamily={FONT_MONO}>
                  peor
                </text>
                {WORLD.doors.map((d) => (
                  <g key={d.id}>
                    <line x1={d.x} y1={d.y - 20} x2={760} y2={70} stroke={COLOR.accent} strokeWidth={1} opacity={0.5} />
                    <line x1={d.x} y1={d.y - 20} x2={900} y2={70} stroke={COLOR.cold} strokeWidth={1} opacity={0.35} />
                  </g>
                ))}
              </g>
            ) : null}
          </svg>

          {formulaAct && minOn ? (
            <Scores values={scores.map((s) => comma(s))} hot={minId} opacity={appear(frame, f(45), 10)} />
          ) : null}
          {topsisAct ? (
            <Scores
              values={trows.map((r) => comma(r.Si, 2))}
              hot={winOn > 0.3 ? best.id : null}
              opacity={appear(frame, f(54), 10)}
            />
          ) : null}
        </div>
      }
    >
      {frame >= f(25.5) ? (
        <Note left={96} top={44} opacity={appear(frame, f(25.5), 10)}>
          números de ejemplo · ilustrativo
        </Note>
      ) : null}
    </SceneFrame>
  );
};
