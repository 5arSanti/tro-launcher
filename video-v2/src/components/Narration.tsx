import React from 'react';
import {COLOR} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {clampI, easeEnter, easeExit, f} from '../lib';

export type Layout = 'hero' | 'top' | 'bottom' | 'left' | 'right';

export type Place = {x: number; y: number; s: number; o: number};

export type Beat = {
  at: number;
  text: string;
  layout?: Layout;
  size?: number;
  color?: string;
  hot?: string;
  tag?: string;
  place?: Partial<Place>;
};

export const WIPE_F = 16;

export const beatStart = (b: Beat) => Math.max(f(b.at), WIPE_F - 4);

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  size: number;
  center: boolean;
  dx: number;
  dy: number;
};

const BOX: Record<Layout, Box> = {
  hero: {left: 96, top: 60, width: 1728, height: 920, size: 104, center: true, dx: 0, dy: 0},
  top: {left: 96, top: 112, width: 1480, height: 150, size: 50, center: false, dx: 0, dy: -24},
  bottom: {left: 96, top: 770, width: 1728, height: 220, size: 48, center: false, dx: 0, dy: 24},
  left: {left: 96, top: 150, width: 700, height: 780, size: 58, center: false, dx: -64, dy: 0},
  right: {left: 1110, top: 150, width: 714, height: 780, size: 58, center: false, dx: 64, dy: 0},
};

type Token = {w: string; em: boolean; emEnd: boolean};

const tokenize = (text: string): Token[] => {
  const out: Token[] = [];
  let em = false;
  for (const raw of text.split(' ')) {
    let w = raw;
    if (w.startsWith('{')) {
      em = true;
      w = w.slice(1);
    }
    const closes = w.includes('}');
    w = w.replace('}', '');
    out.push({w, em, emEnd: em && closes});
    if (closes) em = false;
  }
  return out;
};

const Word: React.FC<{
  t: Token;
  i: number;
  frame: number;
  start: number;
  end: number;
  size: number;
  base: string;
  hot: string;
  stagger: number;
}> = ({t, i, frame, start, end, size, base, hot, stagger}) => {
  const s = start + i * stagger;
  const inP = clampI(frame, [s, s + 12], [0, 1], easeEnter);
  const e = end - 10 + Math.min(i, 2);
  const outP = clampI(frame, [e, e + 8], [0, 1], easeExit);
  const bar = clampI(frame, [s + 10, s + 24], [0, 1], easeEnter) * (1 - outP);
  return (
    <span style={{position: 'relative', display: 'inline-block'}}>
      <span
        style={{
          display: 'inline-block',
          overflow: 'hidden',
          height: size * 1.22,
          verticalAlign: 'bottom',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            transform: `translateY(${(1 - inP) * 105 - outP * 105}%)`,
            fontFamily: FONT_SANS,
            fontWeight: 600,
            fontSize: size,
            lineHeight: 1.18,
            letterSpacing: '-0.035em',
            color: t.em ? hot : base,
            whiteSpace: 'nowrap',
          }}
        >
          {t.w}
        </span>
      </span>
      {t.em ? (
        <span
          style={{
            position: 'absolute',
            left: 0,
            bottom: size * 0.05,
            height: Math.max(4, size * 0.07),
            width: t.emEnd ? '100%' : 'calc(100% + 0.26em)',
            background: hot,
            transform: `scaleX(${bar})`,
            transformOrigin: '0 50%',
          }}
        />
      ) : null}
    </span>
  );
};

export const Narration: React.FC<{frame: number; beats: Beat[]; end: number}> = ({
  frame,
  beats,
  end,
}) => {
  const idx = beats.reduce((acc, b, i) => (frame >= beatStart(b) ? i : acc), 0);
  const b = beats[idx];
  const start = beatStart(b);
  const stop = idx + 1 < beats.length ? beatStart(beats[idx + 1]) : end;
  const layout = b.layout ?? 'top';
  const box = BOX[layout];
  const size = b.size ?? box.size;
  const base = b.color ?? COLOR.text;
  const hot = b.hot ?? (base === COLOR.text ? COLOR.accent : COLOR.text);
  const toks = tokenize(b.text);
  const p = clampI(frame, [start, start + 28], [0, 1], easeEnter);
  const hero = layout === 'hero';
  const scale = hero ? 1.07 - 0.07 * p : 1;
  const tagOp =
    clampI(frame, [start, start + 10], [0, 1], easeEnter) *
    (1 - clampI(frame, [stop - 10, stop - 2], [0, 1], easeExit));

  return (
    <div
      key={`${idx}-${b.at}`}
      style={{
        position: 'absolute',
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: box.height > 200 ? 'center' : 'flex-start',
        alignItems: box.center ? 'center' : 'flex-start',
        transform: `translate(${box.dx * (1 - p)}px, ${box.dy * (1 - p)}px) scale(${scale})`,
        transformOrigin: box.center ? '50% 50%' : '0 50%',
      }}
    >
      {b.tag ? (
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: 16,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: COLOR.muted,
            marginBottom: 14,
            opacity: tagOp,
          }}
        >
          {b.tag}
        </div>
      ) : null}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: box.center ? 'center' : 'flex-start',
          fontSize: size,
          columnGap: '0.26em',
          rowGap: size * 0.02,
          width: '100%',
        }}
      >
        {toks.map((t, i) => (
          <Word
            key={`${i}-${t.w}`}
            t={t}
            i={i}
            frame={frame}
            start={start}
            end={stop}
            size={size}
            base={base}
            hot={hot}
            stagger={hero ? 3 : 2}
          />
        ))}
      </div>
    </div>
  );
};
