import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Copy} from '../components/Copy';
import {PlatformPlan} from '../components/PlatformPlan';
import {Term, Tex} from '../components/Formula';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {SAMPLE_DOORS, WORLD, appear, comma, f, fittedS, holdAppear, topsis} from '../lib';

type TermId = 'ln' | 'sqrt' | 'invM' | 'K' | 'P' | 'min' | null;

const BEATS = [
  {at: 0, text: 'Y aquí viene, para mí, el corazón.', color: COLOR.accent},
  {at: 4.0, text: '¿Cómo se escoge la puerta?'},
  {at: 8.5, text: 'La elección depende de la gente alrededor, de la distancia y de si se ve.'},
  {at: 16.0, text: 'Si queda en un punto ciego, ni la consideramos.'},
  {at: 21.5, text: 'Con eso, probaron dos maneras.'},
  {at: 25.5, text: 'La primera es una fórmula: S junta el logaritmo de la fila,'},
  {at: 32.5, text: 'la raíz de la distancia y la gente alrededor,'},
  {at: 38.5, text: 'y lo multiplica por un K al azar, entre 0,8 y 1,2.'},
  {at: 45.0, text: 'Se elige la de S más bajo.', color: COLOR.accent},
  {at: 49.0, text: 'La segunda es TOPSIS: cada puerta se mide contra la ideal y contra la peor.'},
  {at: 58.5, text: 'Si se ve, vale 1; si no, 0,3.'},
  {at: 64.0, text: 'Al final, gana la de mejor puntaje.', color: COLOR.accent},
];

const termAt = (frame: number): TermId => {
  if (frame >= f(25.5) && frame < f(32.5)) return 'ln';
  if (frame >= f(32.5) && frame < f(35.5)) return 'sqrt';
  if (frame >= f(35.5) && frame < f(38.5)) return 'invM';
  if (frame >= f(38.5) && frame < f(45)) return 'K';
  if (frame >= f(45) && frame < f(49)) return 'min';
  return null;
};

export const Escena07: React.FC = () => {
  const frame = useCurrentFrame();
  const around = holdAppear(frame, f(8.5), f(21));
  const dist = holdAppear(frame, f(8.5), f(21));
  const vis = holdAppear(frame, f(16), f(75));
  const formulaAct = frame >= f(25.5) && frame < f(49);
  const topsisAct = frame >= f(49);
  const kShow = frame >= f(38.5) && formulaAct;
  const K = kShow ? 1 + 0.2 * Math.sin(frame / 16) : 1;
  const scores = SAMPLE_DOORS.map((d) => ({id: d.id, s: fittedS(d.P, d.L, d.M, 1)}));
  const minId = scores.reduce((a, b) => (b.s < a.s ? b : a)).id;
  const trows = topsis(SAMPLE_DOORS);
  const best = trows.reduce((a, b) => (b.Si > a.Si ? b : a));
  const minOn = frame >= f(45);
  const winOn = appear(frame, f(64), 10);
  const active = termAt(frame);

  return (
    <Stage>
      <SceneIndex n="07" />
      <Copy frame={frame} beats={BEATS} size={44} />
      <Note left={LAYOUT.marginX} top={250}>
        ilustrativo
      </Note>

      {formulaAct ? (
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 280,
            opacity: appear(frame, f(25.5), 10),
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
          }}
        >
          <Tex tex="S =" fontSize={44} />
          <Tex tex="(" fontSize={44} color={COLOR.muted} />
          <Term tex="10\ln(P+e)" active={active === 'ln' || active === 'P'} seen={frame >= f(25.5)} />
          <Tex tex="+" fontSize={44} color={COLOR.muted} />
          <Term tex="\sqrt{L}" active={active === 'sqrt'} seen={frame >= f(32.5)} />
          <Term tex="\cdot 1/M" active={active === 'invM'} seen={frame >= f(35.5)} />
          <Tex tex=")" fontSize={44} color={COLOR.muted} />
          <Tex tex="\cdot" fontSize={44} color={COLOR.muted} />
          <Term tex="K" active={active === 'K'} seen={frame >= f(38.5)} />
        </div>
      ) : null}

      {kShow ? (
        <div style={{position: 'absolute', left: LAYOUT.marginX, top: 350, width: 420}}>
          <div style={{fontFamily: FONT_MONO, fontSize: 16, color: COLOR.muted, marginBottom: 10}}>
            K ∈ [0,8 ; 1,2]
          </div>
          <div style={{position: 'relative', height: 18}}>
            <div style={{height: 1, background: COLOR.line, marginTop: 8}} />
            <div
              style={{
                position: 'absolute',
                left: `${((K - 0.8) / 0.4) * 100}%`,
                top: 2,
                width: 10,
                height: 10,
                background: COLOR.accent,
                transform: 'translateX(-5px)',
              }}
            />
          </div>
        </div>
      ) : null}

      {topsisAct ? (
        <div style={{position: 'absolute', left: LAYOUT.marginX, top: 280, opacity: appear(frame, f(50), 10)}}>
          <Tex tex={'S_i = D_i^- / (D_i^- + D_i^+)'} fontSize={36} color={COLOR.muted} />
        </div>
      ) : null}

      <PlatformPlan
        x={240}
        y={500}
        width={1440}
        tag="esquema"
        highlightDoor={minOn && formulaAct ? minId : winOn > 0.4 ? best.id : null}
        dimHidden={vis > 0.2 ? 0.3 : 1}
        sightline={vis}
        passengers={[
          {id: 'dec', x: WORLD.landing.x, y: WORLD.landing.y, fill: COLOR.text},
          ...(around > 0.2
            ? [
                {id: 'm0', x: WORLD.doors[2].x - 18, y: 248, fill: COLOR.text},
                {id: 'm1', x: WORLD.doors[2].x + 18, y: 248, fill: COLOR.text},
                {id: 'm2', x: WORLD.doors[2].x, y: 232, fill: COLOR.text},
              ]
            : []),
        ]}
      />

      {dist > 0.05 && formulaAct ? (
        <svg
          style={{position: 'absolute', left: 240, top: 500, width: 1440, height: 460, pointerEvents: 'none'}}
          viewBox="0 0 1000 320"
        >
          <line
            x1={WORLD.landing.x}
            y1={WORLD.landing.y}
            x2={WORLD.doors[4].x}
            y2={WORLD.doors[4].y - 16}
            stroke={COLOR.muted}
            strokeWidth={1}
            opacity={dist}
          />
        </svg>
      ) : null}

      {formulaAct && frame >= f(45) ? (
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 1000,
            width: 1440,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 40px',
            opacity: appear(frame, f(45), 10),
          }}
        >
          {scores.map((s) => (
            <div
              key={s.id}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                color: minOn && s.id === minId ? COLOR.accent : COLOR.muted,
                width: 200,
                textAlign: 'center',
              }}
            >
              {comma(s.s)}
            </div>
          ))}
        </div>
      ) : null}

      {topsisAct ? (
        <svg
          style={{position: 'absolute', left: 240, top: 500, width: 1440, height: 460, pointerEvents: 'none'}}
          viewBox="0 0 1000 320"
        >
          <circle cx={820} cy={58} r={5} fill={COLOR.accent} opacity={appear(frame, f(50), 10)} />
          <circle cx={900} cy={58} r={5} fill={COLOR.cold} opacity={appear(frame, f(52), 10)} />
          <text x={832} y={52} fill={COLOR.accent} fontSize={12} opacity={appear(frame, f(50), 10)}>
            ideal
          </text>
          <text x={912} y={52} fill={COLOR.cold} fontSize={12} opacity={appear(frame, f(52), 10)}>
            peor
          </text>
          {WORLD.doors.map((d) => (
            <g key={d.id} opacity={appear(frame, f(54), 10)}>
              <line x1={d.x} y1={d.y - 20} x2={820} y2={58} stroke={COLOR.line} strokeWidth={1} />
            </g>
          ))}
        </svg>
      ) : null}

      {topsisAct ? (
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 1000,
            width: 1440,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 40px',
            opacity: appear(frame, f(54), 10),
          }}
        >
          {trows.map((r) => (
            <div
              key={r.id}
              style={{
                fontFamily: FONT_MONO,
                fontSize: 18,
                color: winOn > 0.3 && r.id === best.id ? COLOR.accent : COLOR.muted,
                width: 200,
                textAlign: 'center',
              }}
            >
              {comma(r.Si, 2)}
            </div>
          ))}
        </div>
      ) : null}

      {topsisAct ? (
        <div
          style={{
            position: 'absolute',
            left: 720,
            top: 340,
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLOR.text,
            opacity: appear(frame, f(58.5), 10),
          }}
        >
          visible = 1
          <span style={{color: COLOR.muted}}>  ·  </span>
          no visible = 0,3
        </div>
      ) : null}
    </Stage>
  );
};
