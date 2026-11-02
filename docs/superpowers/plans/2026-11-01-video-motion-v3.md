# Video motion v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Remotion project in `video-v2/` into a 6:00 full-frame paper-and-signage explainer (10 scenes, 10800 frames) with kinetic hook lines, no camera hole, no audio.

**Architecture:** Keep geometry, A*, fitted S and TOPSIS in `src/lib/`. Swap the dark v2 skin for the approved paper palette. Drop `cameraRight`. Ten compositions `Escena01`–`Escena10` plus `Completo`. Verify with stills before encoding. Concatenate to `out/video-motion-v3.mp4`.

**Tech Stack:** Remotion 4, React 19, KaTeX, `@remotion/google-fonts` (Inter Tight 400/600, JetBrains Mono 400/500), ffmpeg / ffprobe.

**Skills while implementing:** `remotion-video` (stills → inspect → encode), `kinetic-typography` (mask reveal, word stagger), `motion-art-direction` (one enter ease, one camera ease, one hero per frame), `diagram-animation` / `chart-animation` for andén and small multiples.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-11-01-video-motion-v3-design.md`. Copy on screen is the **Pantalla** line of each block, not the VO.
- 1920×1080, 30 fps, H.264, yuv420p, muted, CRF 18, `--gl=angle`.
- Duration 360 s / 10800 frames. Scene seconds: 35, 20, 35, 35, 30, 35, 75, 35, 30, 30.
- Palette only: papel `#F4EFE6`, tinta `#1A1916`, muted `#6F6A62`, línea `#C9C2B6`, superficie `#E8E2D6`, acento `#E5481C`, frío `#2F5BFF`, valid `#1F7A52`.
- Enter `cubic-bezier(0.16, 1, 0.3, 1)` 14 frames. Camera `cubic-bezier(0.65, 0, 0.35, 1)` 30 frames. Passengers constant speed via `arriveT`. After each hook, ≥30 frames of stillness before other motion.
- Full frame. Do not clip at x=1280. Do not pass `cameraRight`.
- No glow, gradients, neon cards, decorative fullscreen grids, 3D, bounce/overshoot on type, `Math.random()`, `Date.now()`.
- TOPSIS in capitals. Decimal comma. Labels **esquema** / **ilustrativo** / **idea propia** where the spec says so. Do not invent numeric values; sample S/TOPSIS numbers stay ilustrativo.
- Do not mention LIRN, TORNS, TRO, or Sistema de Vigilancia.
- Do not recitar DoorManager, universidades, Chongqing, or área 0,198 m.
- Work in `video-v2/`. Leave existing `out/video-motion-v2.mp4` and v2 clips on disk.
- Do **not** git commit unless the user asks.
- Frame-driven only. `useCurrentFrame` + `interpolate` with clamp.

## File Map

| File | Responsibility |
| --- | --- |
| `video-v2/src/design/tokens.ts` | Paper palette, type sizes (hook 84), layout without camera hole, ENTER_F=14, HOLD_F=30 |
| `video-v2/src/components/Stage.tsx` | Full-frame paper stage, `SceneIndex`, `Note`, `Label`; no `cameraRight` |
| `video-v2/src/components/Hook.tsx` | Kinetic 6–12 word hook (mask + word stagger) |
| `video-v2/src/components/CameraPush.tsx` | One eased scale push per block, applied to the diagram only |
| `video-v2/src/lib/timing.ts` | Ten scenes + TOTAL_FRAMES === 10800 |
| `video-v2/src/Root.tsx` | Register Escena01–10 + Completo |
| `video-v2/src/scenes/Completo.tsx` | Series of ten |
| `video-v2/src/scenes/Escena01.tsx`–`Escena10.tsx` | One block each |
| `video-v2/src/scenes/Escena11.tsx` | Delete |
| `video-v2/scripts/expected-compositions.json` | Duration contract |
| `video-v2/scripts/check-compositions.sh` | Fail if ids/frames drift |
| `video-v2/scripts/stills-all.sh` | Start/mid/end stills for ten scenes |
| `video-v2/scripts/render-all.sh` | Ten MP4s + concat `video-motion-v3.mp4` + probe 360 s |
| `video-v2/package.json` | Description 6:00 / v3 |
| `video-v2/README.md` | Re-render instructions |

Reuse unchanged: `src/lib/{anim,platform,astar,formula,index}.ts`, `src/components/{MaskReveal,PlatformPlan,Formula}.tsx`, `src/design/fonts.ts`, `scripts/{probe-mp4,contact-sheet,render}.sh`.

**Interfaces (locked here, used by every later task):**

```ts
// tokens
COLOR.bg = '#F4EFE6'
COLOR.text = '#1A1916'
COLOR.muted = '#6F6A62'
COLOR.line = '#C9C2B6'
COLOR.surface = '#E8E2D6'
COLOR.accent = '#E5481C'
COLOR.cold = '#2F5BFF'
COLOR.valid = '#1F7A52'
TYPE.hook = 84
LAYOUT = {width:1920, height:1080, fps:30, marginX:96, marginY:80}
ENTER_F = 14
HOLD_F = 30
CAMERA_F = 30

// components
Stage({children}) // AbsoluteFill, background COLOR.bg, no clip
SceneIndex({n: string}) // mono, muted, top 36
Hook({text, frame, from?, size?, color?, width?})
CameraPush({frame, from, duration?, toScale?, origin?, children})
Note({children, left, top, opacity?})
Label({children, color?, size?, weight?, mono?, style?})

// timing
SCENES: readonly {id, seconds, frames, title}[]
f(seconds: number) => frames
TOTAL_FRAMES === 10800
```

Hook motion starts at `from` (default 0). Other motion in a scene must not start before `from + 14 + (wordCount-1)*3 + HOLD_F`. For a typical 6–8 word hook that is ≈ frame 60 (`f(2)`). Use `f(2)` as the default first motion beat unless the scene lists a later time.

---

### Task 1: Duration contract and paper foundation

**Files:**
- Create: `video-v2/scripts/expected-compositions.json`
- Create: `video-v2/scripts/check-compositions.sh`
- Create: `video-v2/src/components/Hook.tsx`
- Create: `video-v2/src/components/CameraPush.tsx`
- Modify: `video-v2/src/design/tokens.ts`
- Modify: `video-v2/src/components/Stage.tsx`
- Modify: `video-v2/src/lib/timing.ts`
- Modify: `video-v2/src/Root.tsx`
- Modify: `video-v2/src/scenes/Completo.tsx`
- Modify: `video-v2/package.json` (name/description only)
- Delete: `video-v2/src/scenes/Escena11.tsx`

**Interfaces:**
- Consumes: existing `easeEnter` / `easeMove` / `clampI` / `cameraT` from `src/lib/anim.ts`; `FONT_SANS` / `FONT_MONO`; `MaskReveal`.
- Produces: the locked interfaces in the File Map.

- [ ] **Step 1: Write the failing composition contract**

Create `video-v2/scripts/expected-compositions.json`:

```json
[
  {"id": "Escena01", "frames": 1050},
  {"id": "Escena02", "frames": 600},
  {"id": "Escena03", "frames": 1050},
  {"id": "Escena04", "frames": 1050},
  {"id": "Escena05", "frames": 900},
  {"id": "Escena06", "frames": 1050},
  {"id": "Escena07", "frames": 2250},
  {"id": "Escena08", "frames": 1050},
  {"id": "Escena09", "frames": 900},
  {"id": "Escena10", "frames": 900},
  {"id": "Completo", "frames": 10800}
]
```

Create `video-v2/scripts/check-compositions.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
out=$(npx remotion compositions --log=error)
python3 - "$out" <<'PY'
import json, re, sys
from pathlib import Path
out = sys.argv[1]
print(out)
expected = json.loads(Path("scripts/expected-compositions.json").read_text())
found = {}
for line in out.splitlines():
    m = re.search(r'(Escena\d+|Completo)\b.*?(\d+)\s*$', line)
    if not m:
        m = re.search(r'(Escena\d+|Completo)\s+\d+\s+\d+x\d+\s+(\d+)', line)
    if m:
        found[m.group(1)] = int(m.group(2))
missing = [e["id"] for e in expected if e["id"] not in found]
extra = [k for k in found if k not in {e["id"] for e in expected}]
bad = [f"{e['id']}: got {found.get(e['id'])} expected {e['frames']}"
       for e in expected if found.get(e["id"]) != e["frames"]]
if missing or extra or bad:
    print("FAIL compositions")
    if missing:
        print("  missing", missing)
    if extra:
        print("  extra", extra)
    for b in bad:
        print(" ", b)
    sys.exit(1)
print("PASS compositions", len(expected))
PY
```

If the regex misses Remotion's table, use the printed `out` to fix the regex so it still captures id + `durationInFrames`. Do not change the expected frames.

- [ ] **Step 2: Run the contract and confirm it fails**

Run from `video-v2/`:

```bash
chmod +x scripts/check-compositions.sh
bash scripts/check-compositions.sh
```

Expected: FAIL (Escena11 present and/or frames 1350/750/…/1500, Completo 15900).

- [ ] **Step 3: Tokens, Stage, Hook, CameraPush, timing, Root, Completo**

Replace `video-v2/src/design/tokens.ts` entirely:

```ts
export const COLOR = {
  bg: '#F4EFE6',
  surface: '#E8E2D6',
  line: '#C9C2B6',
  hair: '#C9C2B6',
  text: '#1A1916',
  muted: '#6F6A62',
  accent: '#E5481C',
  cold: '#2F5BFF',
  valid: '#1F7A52',
} as const;

export const TYPE = {
  hook: 84,
  title: 40,
  keyword: 84,
  label: 24,
  meta: 16,
  formula: 52,
} as const;

export const LAYOUT = {
  width: 1920,
  height: 1080,
  fps: 30,
  marginX: 96,
  marginY: 80,
  gutter: 24,
  cols: 12,
} as const;

export const ENTER_F = 14;
export const EXIT_F = 10;
export const CAMERA_F = 30;
export const HOLD_F = 30;
export const STAGGER_F = 3;
export const PASSENGER_R = 5.5;
```

Replace `video-v2/src/components/Stage.tsx` entirely (drop `cameraRight` and `SceneTitle`; keep `Note` and `Label`; add `SceneIndex`):

```tsx
import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';

export const Stage: React.FC<{children: React.ReactNode}> = ({children}) => (
  <AbsoluteFill style={{backgroundColor: COLOR.bg}}>{children}</AbsoluteFill>
);

export const SceneIndex: React.FC<{n: string}> = ({n}) => (
  <div
    style={{
      position: 'absolute',
      left: LAYOUT.marginX,
      top: 36,
      fontFamily: FONT_MONO,
      fontSize: 16,
      color: COLOR.muted,
      letterSpacing: '0.14em',
      fontWeight: 400,
    }}
  >
    {n}
  </div>
);

export const Note: React.FC<{
  children: React.ReactNode;
  left: number;
  top: number;
  opacity?: number;
}> = ({children, left, top, opacity = 1}) => (
  <div
    style={{
      position: 'absolute',
      left,
      top,
      fontFamily: FONT_MONO,
      fontSize: 16,
      color: COLOR.muted,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      opacity,
    }}
  >
    {children}
  </div>
);

export const Label: React.FC<{
  children: React.ReactNode;
  color?: string;
  size?: number;
  weight?: 400 | 600;
  mono?: boolean;
  style?: React.CSSProperties;
}> = ({children, color = COLOR.text, size = 24, weight = 400, mono, style}) => (
  <span
    style={{
      fontFamily: mono ? FONT_MONO : FONT_SANS,
      fontSize: size,
      fontWeight: weight,
      color,
      lineHeight: 1.1,
      letterSpacing: mono ? 0 : '-0.02em',
      fontVariantNumeric: 'tabular-nums',
      ...style,
    }}
  >
    {children}
  </span>
);
```

Create `video-v2/src/components/Hook.tsx`:

```tsx
import React from 'react';
import {MaskReveal} from './MaskReveal';
import {COLOR, LAYOUT, TYPE} from '../design/tokens';

export const Hook: React.FC<{
  text: string;
  frame: number;
  from?: number;
  size?: number;
  color?: string;
  width?: number;
  top?: number;
}> = ({
  text,
  frame,
  from = 0,
  size = TYPE.hook,
  color = COLOR.text,
  width = 1728,
  top = 72,
}) => {
  const words = text.split(' ');
  return (
    <div
      style={{
        position: 'absolute',
        left: LAYOUT.marginX,
        top,
        width,
        display: 'flex',
        flexWrap: 'wrap',
        columnGap: '0.28em',
        rowGap: 6,
        alignItems: 'flex-end',
      }}
    >
      {words.map((word, i) => (
        <MaskReveal
          key={`${i}-${word}`}
          text={word}
          frame={frame}
          from={from}
          delay={i * 3}
          duration={14}
          fontSize={size}
          color={color}
          weight={600}
        />
      ))}
    </div>
  );
};
```

Create `video-v2/src/components/CameraPush.tsx`:

```tsx
import React from 'react';
import {cameraT} from '../lib';

export const CameraPush: React.FC<{
  frame: number;
  from: number;
  duration?: number;
  toScale?: number;
  origin?: string;
  children: React.ReactNode;
}> = ({
  frame,
  from,
  duration = 30,
  toScale = 1.05,
  origin = '50% 58%',
  children,
}) => {
  const t = cameraT(frame, from, duration);
  const scale = 1 + (toScale - 1) * t;
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        transform: `scale(${scale})`,
        transformOrigin: origin,
      }}
    >
      {children}
    </div>
  );
};
```

Replace `video-v2/src/lib/timing.ts` entirely:

```ts
import {LAYOUT} from '../design/tokens';

export const FPS = LAYOUT.fps;

export const SCENES = [
  {id: 'Escena01', seconds: 35, frames: 1050, title: 'Gancho'},
  {id: 'Escena02', seconds: 20, frames: 600, title: 'El paper'},
  {id: 'Escena03', seconds: 35, frames: 1050, title: 'Problema'},
  {id: 'Escena04', seconds: 35, frames: 1050, title: 'Sistema'},
  {id: 'Escena05', seconds: 30, frames: 900, title: 'Estados'},
  {id: 'Escena06', seconds: 35, frames: 1050, title: 'A*'},
  {id: 'Escena07', seconds: 75, frames: 2250, title: 'Corazón'},
  {id: 'Escena08', seconds: 35, frames: 1050, title: 'Campo'},
  {id: 'Escena09', seconds: 30, frames: 900, title: 'Resultado'},
  {id: 'Escena10', seconds: 30, frames: 900, title: 'Cierre'},
] as const;

export const TOTAL_FRAMES = SCENES.reduce((n, s) => n + s.frames, 0);

if (TOTAL_FRAMES !== 10800) {
  throw new Error(`TOTAL_FRAMES ${TOTAL_FRAMES} !== 10800`);
}

export const f = (seconds: number) => Math.round(seconds * FPS);
```

Replace `video-v2/src/Root.tsx` entirely:

```tsx
import React from 'react';
import {Composition} from 'remotion';
import {LAYOUT} from './design/tokens';
import {SCENES, TOTAL_FRAMES} from './lib/timing';
import {Completo} from './scenes/Completo';
import {Escena01} from './scenes/Escena01';
import {Escena02} from './scenes/Escena02';
import {Escena03} from './scenes/Escena03';
import {Escena04} from './scenes/Escena04';
import {Escena05} from './scenes/Escena05';
import {Escena06} from './scenes/Escena06';
import {Escena07} from './scenes/Escena07';
import {Escena08} from './scenes/Escena08';
import {Escena09} from './scenes/Escena09';
import {Escena10} from './scenes/Escena10';

const SC = [
  Escena01,
  Escena02,
  Escena03,
  Escena04,
  Escena05,
  Escena06,
  Escena07,
  Escena08,
  Escena09,
  Escena10,
];

export const Root: React.FC = () => (
  <>
    {SCENES.map((s, i) => (
      <Composition
        key={s.id}
        id={s.id}
        component={SC[i]}
        durationInFrames={s.frames}
        fps={LAYOUT.fps}
        width={LAYOUT.width}
        height={LAYOUT.height}
      />
    ))}
    <Composition
      id="Completo"
      component={Completo}
      durationInFrames={TOTAL_FRAMES}
      fps={LAYOUT.fps}
      width={LAYOUT.width}
      height={LAYOUT.height}
    />
  </>
);
```

Replace `video-v2/src/scenes/Completo.tsx` entirely:

```tsx
import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {SCENES} from '../lib/timing';
import {COLOR} from '../design/tokens';
import {Escena01} from './Escena01';
import {Escena02} from './Escena02';
import {Escena03} from './Escena03';
import {Escena04} from './Escena04';
import {Escena05} from './Escena05';
import {Escena06} from './Escena06';
import {Escena07} from './Escena07';
import {Escena08} from './Escena08';
import {Escena09} from './Escena09';
import {Escena10} from './Escena10';

const MAP = [
  Escena01,
  Escena02,
  Escena03,
  Escena04,
  Escena05,
  Escena06,
  Escena07,
  Escena08,
  Escena09,
  Escena10,
];

export const Completo: React.FC = () => (
  <AbsoluteFill style={{backgroundColor: COLOR.bg}}>
    <Series>
      {MAP.map((Comp, i) => (
        <Series.Sequence key={SCENES[i].id} durationInFrames={SCENES[i].frames}>
          <Comp />
        </Series.Sequence>
      ))}
    </Series>
  </AbsoluteFill>
);
```

Delete `video-v2/src/scenes/Escena11.tsx`.

Grep the repo under `video-v2/src` for `cameraRight`, `LAYOUT.cameraX`, `Escena11`, and `SceneTitle`. Remove every remaining reference.

Temporarily keep Escena01–10 compiling: each still imports `Stage` / `SceneTitle`. After Stage loses `SceneTitle`, those files will not typecheck until Tasks 2–5 rewrite them. To keep Task 1's composition check runnable, give each of Escena01–10 this stub until the real scene task replaces it (do not leave stubs after Task 5):

```tsx
import React from 'react';
import {Stage, SceneIndex} from '../components/Stage';
export const Escena0N: React.FC = () => (
  <Stage>
    <SceneIndex n="0N" />
  </Stage>
);
```

Apply that stub only if a scene file still imports `SceneTitle` or `cameraRight` after Stage changes. Prefer rewriting the scene in the same session if the following task is batched.

Update `video-v2/package.json` `name` to `video-motion-v3` and `description` to `Motion graphics 6:00 — Wang et al. ICCMS 2022, sin audio. Papel y señalética.`

- [ ] **Step 4: Re-run the composition contract**

```bash
bash scripts/check-compositions.sh
```

Expected: `PASS compositions 11` (10 escenas + Completo). If Remotion still lists Escena11, the file or an import remains — delete it.

- [ ] **Step 5: Still of Completo frame 0**

```bash
mkdir -p out/stills
npx remotion still Completo out/stills/v3-paper-bg.png --frame=0 --gl=angle
```

Expected: PNG 1920×1080, background `#F4EFE6` (cream, not `#111315`). Open the PNG and confirm no black stage.

---

### Task 2: Escena01 Gancho (35 s, 1050 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena01.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Note`, `Hook`, `CameraPush`, `PlatformPlan`, `pathDownStairs`, `pathToDoor`, `atProgress`, `arriveT`, `WORLD`, `appear`, `f`, `COLOR`, `LAYOUT`.
- Produces: composition `Escena01` duration 1050.

- [ ] **Step 1: Implement Escena01**

Replace `video-v2/src/scenes/Escena01.tsx`:

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Hook} from '../components/Hook';
import {CameraPush} from '../components/CameraPush';
import {PlatformPlan} from '../components/PlatformPlan';
import {appear, f, atProgress, arriveT, pathDownStairs, pathToDoor, WORLD} from '../lib';
import {COLOR, LAYOUT} from '../design/tokens';

const down = pathDownStairs();
const toDoor = pathToDoor(3);
const MOTION = f(2);

export const Escena01: React.FC = () => {
  const frame = useCurrentFrame();
  const tDown = appear(frame, MOTION, f(8));
  const looking = appear(frame, MOTION + f(8), f(6));
  const paused = frame >= MOTION + f(14) && frame < MOTION + f(16);
  const chosen = frame >= MOTION + f(16);
  const sweep = looking * (1 - appear(frame, MOTION + f(16), 14));
  const walk = chosen ? appear(frame, MOTION + f(16), f(10)) : 0;

  let p = WORLD.landing;
  if (tDown < 1 && !chosen) p = atProgress(down, arriveT(tDown));
  else if (chosen) p = atProgress(toDoor, arriveT(walk));

  return (
    <Stage>
      <SceneIndex n="01" />
      <Hook text="¿Por qué puerta subimos al metro?" frame={frame} />
      <Note left={LAYOUT.marginX} top={268}>
        esquema
      </Note>
      <CameraPush frame={frame} from={MOTION + f(16)} toScale={1.06} origin="42% 62%">
        <PlatformPlan
          x={LAYOUT.marginX}
          y={340}
          width={1728}
          tag="andén"
          highlightDoor={chosen ? 3 : null}
          lookSweep={sweep}
          passengers={[
            {
              id: 'p0',
              x: p.x,
              y: p.y,
              fill: chosen || paused ? COLOR.accent : COLOR.text,
            },
          ]}
        />
      </CameraPush>
    </Stage>
  );
};
```

- [ ] **Step 2: Stills and contact sheet**

```bash
mkdir -p out/stills
npx remotion still Escena01 out/stills/escena01-start.png --frame=0 --gl=angle
npx remotion still Escena01 out/stills/escena01-mid.png --frame=525 --gl=angle
npx remotion still Escena01 out/stills/escena01-end.png --frame=1049 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena01.png \
  out/stills/escena01-start.png out/stills/escena01-mid.png out/stills/escena01-end.png
```

Inspect: start = cream + hook rising, no black, no empty right third. Mid = passenger in motion or at landing. End = door 3 in accent, passenger at that door. Hook readable (6–12 words). Label `esquema`.

---

### Task 3: Escena02 El paper (20 s, 600 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena02.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Hook`, `MaskReveal`, `COLOR`, `LAYOUT`, `FONT_MONO`, `appear`, `f`.
- Produces: composition `Escena02` duration 600.

- [ ] **Step 1: Implement Escena02**

Replace `video-v2/src/scenes/Escena02.tsx`. Do **not** write Chongqing. Meta exactly `ICCMS 2022 · ACM · pp. 69–75`.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Hook} from '../components/Hook';
import {MaskReveal} from '../components/MaskReveal';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, f} from '../lib';

const LINES = ['A Subway Station Platform', 'Crowd Simulation System'];
const META = 'ICCMS 2022  ·  ACM  ·  pp. 69–75';
const AUTHORS = 'Xinyu Wang  ·  Hu Su  ·  Tianbao Zhou  ·  Xiyu Miao';

export const Escena02: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <Stage>
      <SceneIndex n="02" />
      <Hook text="Wang, Su, Zhou y Miao · ICCMS 2022" frame={frame} size={64} />
      <div style={{position: 'absolute', left: LAYOUT.marginX, top: 320}}>
        {LINES.map((line, i) => (
          <MaskReveal
            key={line}
            text={line}
            frame={frame}
            from={f(2)}
            delay={i * 12}
            duration={14}
            fontSize={52}
          />
        ))}
        <div
          style={{
            marginTop: 36,
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLOR.muted,
            letterSpacing: '0.04em',
            opacity: appear(frame, f(4), 14),
          }}
        >
          {META}
        </div>
        <div
          style={{
            marginTop: 18,
            fontFamily: FONT_MONO,
            fontSize: 18,
            color: COLOR.text,
            opacity: appear(frame, f(6), 14),
          }}
        >
          {AUTHORS}
        </div>
      </div>
    </Stage>
  );
};
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena02 out/stills/escena02-start.png --frame=0 --gl=angle
npx remotion still Escena02 out/stills/escena02-mid.png --frame=300 --gl=angle
npx remotion still Escena02 out/stills/escena02-end.png --frame=599 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena02.png \
  out/stills/escena02-start.png out/stills/escena02-mid.png out/stills/escena02-end.png
```

Inspect: authors and `pp. 69–75` visible by mid. No Chongqing. Full-frame cream. No camera hole.

---

### Task 4: Escena03 Problema (35 s, 1050 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena03.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Hook`, `Label`, `PlatformPlan`, passenger helpers, `clampI`, `easeMove`.
- Produces: composition `Escena03` duration 1050.

- [ ] **Step 1: Implement Escena03**

Two andenes, full width. A piles on door 3. B spreads. Camera zoom toward B at the end (`easeMove`, frames `f(31)`–`f(35)`).

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Label} from '../components/Stage';
import {Hook} from '../components/Hook';
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
const spawn = (i: number) => f(2) + i * 22;
const doorOfB = (i: number) => ([3, 2, 4, 5, 3, 2, 4, 3, 5] as const)[i];

const posA = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawn(i)) / f(7));
  const path = [...down, ...pathToDoor(3).slice(1)];
  const queue = {x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18 - i * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

const posB = (frame: number, i: number) => {
  const t = Math.min(1, Math.max(0, frame - spawn(i)) / f(7));
  const id = doorOfB(i);
  const path = [...down, ...pathToDoor(id).slice(1)];
  const qIndex =
    [0, 1, 2, 3, 4, 5, 6, 7, 8].filter((j) => j <= i && doorOfB(j) === id).length - 1;
  const queue = {x: WORLD.doors[id - 1].x, y: WORLD.doors[id - 1].y - 18 - qIndex * 16};
  return t >= 1 ? queue : atProgress(path, arriveT(t));
};

export const Escena03: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = clampI(frame, [f(31), f(35)], [0, 1], easeMove);
  const pa: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posA(frame, i);
    return {id: `a${i}`, x: p.x, y: p.y, fill: COLOR.text};
  }).filter((_, i) => frame >= spawn(i));
  const pb: Passenger[] = Array.from({length: N}, (_, i) => {
    const p = posB(frame, i);
    return {id: `b${i}`, x: p.x, y: p.y, fill: COLOR.text};
  }).filter((_, i) => frame >= spawn(i));
  const scale = 1 + zoom * 0.38;
  const shiftX = -zoom * 280;

  return (
    <Stage>
      <SceneIndex n="03" />
      <Hook text="Ruta fija vs. decide" frame={frame} />
      <div
        style={{
          transform: `translateX(${shiftX}px) scale(${scale})`,
          transformOrigin: '72% 70%',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 280,
            opacity: appear(frame, f(2), 14),
          }}
        >
          <Label size={24} weight={600}>
            Ruta fija
          </Label>
        </div>
        <PlatformPlan
          x={LAYOUT.marginX}
          y={320}
          width={820}
          passengers={pa}
          highlightDoor={3}
          tag="esquema"
        />
        <div
          style={{
            position: 'absolute',
            left: 1000,
            top: 280,
            opacity: appear(frame, f(8), 14),
          }}
        >
          <Label size={24} weight={600} color={COLOR.accent}>
            Decide
          </Label>
        </div>
        <PlatformPlan x={1000} y={320} width={820} passengers={pb} tag="esquema" />
      </div>
    </Stage>
  );
};
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena03 out/stills/escena03-start.png --frame=0 --gl=angle
npx remotion still Escena03 out/stills/escena03-mid.png --frame=525 --gl=angle
npx remotion still Escena03 out/stills/escena03-end.png --frame=1049 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena03.png \
  out/stills/escena03-start.png out/stills/escena03-mid.png out/stills/escena03-end.png
```

Inspect: two platforms; A queued on one door; B spread; end frame zoomed toward B. Both tagged esquema.

---

### Task 5: Escena04 Sistema (35 s, 1050 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena04.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Hook`, `PlatformPlan`, `appear`, `clampI`, `easeEnter`, `pathToDoor`.
- Produces: composition `Escena04` duration 1050.

- [ ] **Step 1: Implement Escena04**

Two labels linked by a draw-on line. NavMesh stroke. Passengers at different speeds. No `DoorManager` string. Caption under the andén: `posición · fila · máximo`.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Hook} from '../components/Hook';
import {CameraPush} from '../components/CameraPush';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {WORLD, appear, arriveT, atProgress, clampI, easeEnter, f, pathToDoor} from '../lib';

const speeds = [0.72, 1, 1.18, 0.84, 1.08];

export const Escena04: React.FC = () => {
  const frame = useCurrentFrame();
  const two = appear(frame, f(2), 14);
  const env = appear(frame, f(4), 14);
  const line = clampI(frame, [f(5), f(7)], [0, 1], easeEnter);
  const mesh = clampI(frame, [f(10), f(16)], [0, 1], easeEnter);
  const pax = appear(frame, f(18), 14);
  const speedT = appear(frame, f(22), f(8));
  const passengers: Passenger[] = speeds.map((s, i) => {
    const t = Math.min(1, speedT * s);
    const p = atProgress(pathToDoor(((i % 5) + 1) as 1 | 2 | 3 | 4 | 5), arriveT(t));
    return {
      id: `v${i}`,
      x: t === 0 ? WORLD.landing.x : p.x,
      y: t === 0 ? WORLD.landing.y : p.y,
    };
  });

  return (
    <Stage>
      <SceneIndex n="04" />
      <Hook text="Entorno y pasajero inteligente" frame={frame} size={72} />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 268,
          display: 'flex',
          alignItems: 'center',
          gap: 28,
          opacity: two,
        }}
      >
        <Block label="Entorno" sub="NavMesh" opacity={env} />
        <svg width={80} height={12}>
          <line x1={0} y1={6} x2={80 * line} y2={6} stroke={COLOR.text} strokeWidth={1} />
        </svg>
        <Block label="Pasajero" sub="ruta · estado · vmax" opacity={pax} />
      </div>
      <CameraPush frame={frame} from={f(22)}>
        <PlatformPlan
          x={240}
          y={400}
          width={1440}
          tag="esquema"
          showNavMesh={mesh}
          passengers={speedT > 0 ? passengers : []}
        />
      </CameraPush>
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 1008,
          fontFamily: FONT_MONO,
          fontSize: 16,
          color: COLOR.muted,
          letterSpacing: '0.04em',
          opacity: appear(frame, f(12), 14),
        }}
      >
        posición · fila · máximo
      </div>
    </Stage>
  );
};

const Block: React.FC<{label: string; sub: string; opacity: number}> = ({
  label,
  sub,
  opacity,
}) => (
  <div style={{opacity, minWidth: 220}}>
    <div
      style={{
        fontFamily: FONT_SANS,
        fontSize: 40,
        fontWeight: 600,
        color: COLOR.text,
        letterSpacing: '-0.03em',
        lineHeight: 1.1,
      }}
    >
      {label}
    </div>
    <div style={{marginTop: 8, fontFamily: FONT_MONO, fontSize: 16, color: COLOR.muted}}>
      {sub}
    </div>
  </div>
);
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena04 out/stills/escena04-start.png --frame=0 --gl=angle
npx remotion still Escena04 out/stills/escena04-mid.png --frame=525 --gl=angle
npx remotion still Escena04 out/stills/escena04-end.png --frame=1049 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena04.png \
  out/stills/escena04-start.png out/stills/escena04-mid.png out/stills/escena04-end.png
```

Inspect: NavMesh drawn by mid; passengers at different positions by end; no DoorManager; tag esquema.

---

### Task 6: Escena05 Estados (30 s, 900 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena05.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Hook`, `PlatformPlan`, state times below.
- Produces: composition `Escena05` duration 900.

- [ ] **Step 1: Implement Escena05**

Four nodes. Active node uses `COLOR.accent`. English names in mono: `DownStair`, `FindDoor`, `QueueUp`, `GetCar`. Passenger synced. State times (local seconds): DownStair 2.0, FindDoor 8.0, QueueUp 14.0, GetCar 20.0.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {Hook} from '../components/Hook';
import {PlatformPlan} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO, FONT_SANS} from '../design/fonts';
import {
  WORLD,
  appear,
  arriveT,
  atProgress,
  clampI,
  easeEnter,
  f,
  pathDownStairs,
  pathToDoor,
} from '../lib';

const STATES = [
  {es: 'Baja', en: 'DownStair', at: 2.0},
  {es: 'Busca', en: 'FindDoor', at: 8.0},
  {es: 'Hace fila', en: 'QueueUp', at: 14.0},
  {es: 'Sube', en: 'GetCar', at: 20.0},
];

export const Escena05: React.FC = () => {
  const frame = useCurrentFrame();
  const active = STATES.reduce((acc, s, i) => (frame >= f(s.at) ? i : acc), 0);
  const downT = clampI(frame, [f(2), f(8)], [0, 1], easeEnter);
  const findT = clampI(frame, [f(8), f(14)], [0, 1], easeEnter);
  const queueT = clampI(frame, [f(14), f(20)], [0, 1], easeEnter);
  const boardT = clampI(frame, [f(20), f(26)], [0, 1], easeEnter);

  let p = WORLD.landing;
  if (active === 0) p = atProgress(pathDownStairs(), arriveT(downT));
  else if (active === 1) p = atProgress(pathToDoor(3), arriveT(findT * 0.7));
  else if (active === 2) {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y - queueT * 4};
  } else {
    const q = atProgress(pathToDoor(3), 1);
    p = {x: q.x, y: q.y + boardT * 22};
  }

  return (
    <Stage>
      <SceneIndex n="05" />
      <Hook text="Baja, busca, hace fila, sube" frame={frame} size={72} />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 268,
          display: 'flex',
          width: 1728,
        }}
      >
        {STATES.map((s, i) => {
          const on = appear(frame, f(s.at), 14);
          const isActive = i === active && frame >= f(s.at);
          const edge =
            i < 3
              ? clampI(frame, [f(STATES[i + 1].at) - 10, f(STATES[i + 1].at)], [0, 1], easeEnter)
              : 0;
          return (
            <div
              key={s.en}
              style={{display: 'flex', alignItems: 'center', flex: 1, opacity: Math.max(on, i === 0 ? 1 : 0)}}
            >
              <div>
                <div
                  style={{
                    fontFamily: FONT_SANS,
                    fontSize: 24,
                    fontWeight: 600,
                    color: isActive ? COLOR.accent : COLOR.text,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {s.es}
                </div>
                <div style={{fontFamily: FONT_MONO, fontSize: 16, color: COLOR.muted, marginTop: 6}}>
                  {s.en}
                </div>
              </div>
              {i < 3 ? (
                <svg width={48} height={12} style={{margin: '0 12px', flex: '0 0 48px'}}>
                  <line x1={0} y1={6} x2={48 * edge} y2={6} stroke={COLOR.line} strokeWidth={1} />
                </svg>
              ) : null}
            </div>
          );
        })}
      </div>
      <PlatformPlan
        x={240}
        y={430}
        width={1440}
        tag="esquema"
        highlightDoor={active >= 1 ? 3 : null}
        passengers={[{id: 'fsm', x: p.x, y: p.y, fill: COLOR.accent}]}
      />
    </Stage>
  );
};
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena05 out/stills/escena05-start.png --frame=0 --gl=angle
npx remotion still Escena05 out/stills/escena05-mid.png --frame=450 --gl=angle
npx remotion still Escena05 out/stills/escena05-end.png --frame=899 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena05.png \
  out/stills/escena05-start.png out/stills/escena05-mid.png out/stills/escena05-end.png
```

Inspect: four EN labels present; one accent node at a time; passenger at stairs / door / queue / boarding across the three frames.

---

### Task 7: Escena06 A* (35 s, 1050 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena06.tsx`

**Interfaces:**
- Consumes: `SEARCH`, `Term`, `Tex`, `PlatformPlan`, `Hook` (or formula as the hook — formula is the on-screen phrase).
- Produces: composition `Escena06` duration 1050.

- [ ] **Step 1: Implement Escena06**

On-screen hook is the formula via `Term`/`Tex`, not a second sentence. Open nodes `COLOR.cold`, path `COLOR.accent`. Then `r = 0,25 m` (comma). Camera push onto the capsule.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex} from '../components/Stage';
import {CameraPush} from '../components/CameraPush';
import {PlatformPlan} from '../components/PlatformPlan';
import {Term, Tex} from '../components/Formula';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {SEARCH, WORLD, appear, clampI, f} from '../lib';

export const Escena06: React.FC = () => {
  const frame = useCurrentFrame();
  const grid = appear(frame, f(2), 14);
  const expandStart = f(4);
  const expandN = Math.min(
    SEARCH.expansions.length - 1,
    Math.floor(clampI(frame, [expandStart, f(16)], [0, SEARCH.expansions.length - 1])),
  );
  const pathT = clampI(frame, [f(16), f(20)], [0, 1]);
  const fOn = frame >= f(2) && frame < f(8);
  const gOn = frame >= f(8) && frame < f(14);
  const hOn = frame >= f(14) && frame < f(22);
  const rad = appear(frame, f(24), 14);

  return (
    <Stage>
      <SceneIndex n="06" />
      <div
        style={{
          position: 'absolute',
          left: LAYOUT.marginX,
          top: 72,
          display: 'flex',
          alignItems: 'baseline',
          gap: 14,
          opacity: appear(frame, 0, 14),
        }}
      >
        <Term tex="f(n)" active={fOn} seen={frame >= 0} fontSize={84} />
        <Tex tex="=" fontSize={84} color={COLOR.muted} />
        <Term tex="g(n)" active={gOn} seen={frame >= f(8)} fontSize={84} />
        <Tex tex="+" fontSize={84} color={COLOR.muted} />
        <Term tex="h(n)" active={hOn} seen={frame >= f(14)} fontSize={84} />
      </div>
      <CameraPush frame={frame} from={f(24)} toScale={1.12} origin="50% 58%">
        <PlatformPlan
          x={240}
          y={320}
          width={1440}
          tag="esquema"
          grid={grid}
          expansionsUntil={frame >= expandStart ? expandN : -1}
          pathProgress={pathT}
          highlightDoor={pathT > 0.6 ? 3 : null}
          passengers={[{id: 'a', x: WORLD.landing.x, y: WORLD.landing.y, fill: COLOR.text}]}
          capsule={rad > 0 ? {x: WORLD.landing.x, y: WORLD.landing.y, r: 36, opacity: rad} : undefined}
        />
      </CameraPush>
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
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena06 out/stills/escena06-start.png --frame=0 --gl=angle
npx remotion still Escena06 out/stills/escena06-mid.png --frame=525 --gl=angle
npx remotion still Escena06 out/stills/escena06-end.png --frame=1049 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena06.png \
  out/stills/escena06-start.png out/stills/escena06-mid.png out/stills/escena06-end.png
```

Inspect: formula at hook size; open cells blue; path orange; end shows `r = 0,25 m` (comma, not 0.25). Grid is the A* search grid, not a decorative fullscreen background.

---

### Task 8: Escena07 Corazón (75 s, 2250 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena07.tsx`

**Interfaces:**
- Consumes: `fittedS`, `topsis`, `SAMPLE_DOORS`, `comma`, `Term`, `Tex`, `Hook`, `PlatformPlan`.
- Produces: composition `Escena07` duration 2250.

- [ ] **Step 1: Implement Escena07**

Three sequential hooks, only one visible at a time:

| Local s | Hook |
| --- | --- |
| 0–18 | Cómo se escoge la puerta |
| 18–48 | S, la más baja gana |
| 48–75 | TOPSIS |

Visual beats: around `f(4)`, distance `f(8)`, vis `f(12)` with door 1 dimmed; formula terms ln `f(22)`, sqrt `f(26)`, 1/M `f(29)`, K `f(32)` with slider `[0,8 ; 1,2]`; scores `f(40)`; min `f(44)`; TOPSIS `f(48)`; vis 1 / 0,3 at `f(58)`; winner `f(68)`. Sample numbers: ilustrativo. K motion via `Math.sin(frame / 16)` (deterministic). Do not use `Math.random()`.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Hook} from '../components/Hook';
import {PlatformPlan} from '../components/PlatformPlan';
import {Term, Tex} from '../components/Formula';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {SAMPLE_DOORS, WORLD, appear, comma, f, fittedS, holdAppear, topsis} from '../lib';

type TermId = 'ln' | 'sqrt' | 'invM' | 'K' | 'P' | 'min' | null;

const termAt = (frame: number): TermId => {
  if (frame >= f(22) && frame < f(26)) return 'ln';
  if (frame >= f(26) && frame < f(29)) return 'sqrt';
  if (frame >= f(29) && frame < f(32)) return 'invM';
  if (frame >= f(32) && frame < f(40)) return 'K';
  if (frame >= f(40) && frame < f(44)) return 'P';
  if (frame >= f(44) && frame < f(48)) return 'min';
  return null;
};

export const Escena07: React.FC = () => {
  const frame = useCurrentFrame();
  const around = holdAppear(frame, f(4), f(17));
  const dist = holdAppear(frame, f(8), f(17));
  const vis = holdAppear(frame, f(12), f(75));
  const formulaAct = frame >= f(18) && frame < f(48);
  const topsisAct = frame >= f(48);
  const kShow = frame >= f(32) && formulaAct;
  const K = kShow ? 1 + 0.2 * Math.sin(frame / 16) : 1;
  const scores = SAMPLE_DOORS.map((d) => ({id: d.id, s: fittedS(d.P, d.L, d.M, 1)}));
  const minId = scores.reduce((a, b) => (b.s < a.s ? b : a)).id;
  const trows = topsis(SAMPLE_DOORS);
  const best = trows.reduce((a, b) => (b.Si > a.Si ? b : a));
  const minOn = frame >= f(44);
  const winOn = appear(frame, f(68), 14);
  const active = termAt(frame);

  return (
    <Stage>
      <SceneIndex n="07" />
      {frame < f(18) ? <Hook text="Cómo se escoge la puerta" frame={frame} size={72} /> : null}
      {formulaAct ? <Hook text="S, la más baja gana" frame={frame} from={f(18)} size={72} /> : null}
      {topsisAct ? <Hook text="TOPSIS" frame={frame} from={f(48)} size={96} /> : null}
      <Note left={LAYOUT.marginX} top={268}>
        ilustrativo
      </Note>

      {formulaAct ? (
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 300,
            opacity: appear(frame, f(18), 14),
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
          }}
        >
          <Tex tex="S =" fontSize={52} />
          <Tex tex="(" fontSize={52} color={COLOR.muted} />
          <Term tex="10\ln(P+e)" active={active === 'ln' || active === 'P'} seen={frame >= f(22)} />
          <Tex tex="+" fontSize={52} color={COLOR.muted} />
          <Term tex="\sqrt{L}" active={active === 'sqrt'} seen={frame >= f(26)} />
          <Term tex="\cdot 1/M" active={active === 'invM'} seen={frame >= f(29)} />
          <Tex tex=")" fontSize={52} color={COLOR.muted} />
          <Tex tex="\cdot" fontSize={52} color={COLOR.muted} />
          <Term tex="K" active={active === 'K'} seen={frame >= f(32)} />
        </div>
      ) : null}

      {kShow ? (
        <div style={{position: 'absolute', left: LAYOUT.marginX, top: 380, width: 420}}>
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
        <div style={{position: 'absolute', left: LAYOUT.marginX, top: 300, opacity: appear(frame, f(52), 14)}}>
          <Tex tex={'S_i = D_i^- / (D_i^- + D_i^+)'} fontSize={36} color={COLOR.muted} />
        </div>
      ) : null}

      <PlatformPlan
        x={240}
        y={460}
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
          style={{position: 'absolute', left: 240, top: 460, width: 1440, height: 460, pointerEvents: 'none'}}
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

      {formulaAct && frame >= f(40) ? (
        <div
          style={{
            position: 'absolute',
            left: 240,
            top: 1000,
            width: 1440,
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 40px',
            opacity: appear(frame, f(40), 14),
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
          style={{position: 'absolute', left: 240, top: 460, width: 1440, height: 460, pointerEvents: 'none'}}
          viewBox="0 0 1000 320"
        >
          <circle cx={820} cy={58} r={5} fill={COLOR.accent} opacity={appear(frame, f(52), 14)} />
          <circle cx={900} cy={58} r={5} fill={COLOR.cold} opacity={appear(frame, f(54), 14)} />
          <text x={832} y={52} fill={COLOR.accent} fontSize={12} opacity={appear(frame, f(52), 14)}>
            ideal
          </text>
          <text x={912} y={52} fill={COLOR.cold} fontSize={12} opacity={appear(frame, f(54), 14)}>
            peor
          </text>
          {WORLD.doors.map((d) => (
            <g key={d.id} opacity={appear(frame, f(56), 14)}>
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
            opacity: appear(frame, f(56), 14),
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
            top: 360,
            fontFamily: FONT_MONO,
            fontSize: 22,
            color: COLOR.text,
            opacity: appear(frame, f(58), 14),
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
```

- [ ] **Step 2: Stills at hook changes, not only mid**

```bash
npx remotion still Escena07 out/stills/escena07-start.png --frame=0 --gl=angle
npx remotion still Escena07 out/stills/escena07-s.png --frame=900 --gl=angle
npx remotion still Escena07 out/stills/escena07-topsis.png --frame=1600 --gl=angle
npx remotion still Escena07 out/stills/escena07-end.png --frame=2249 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena07.png \
  out/stills/escena07-start.png out/stills/escena07-s.png out/stills/escena07-topsis.png
```

Inspect: frame 0 hook 1; frame 900 formula + `ilustrativo` + comma in K range; frame 1600 word `TOPSIS` in capitals; door 1 dimmed; no invented article figures presented as real.

---

### Task 9: Escena08 Campo (35 s, 1050 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena08.tsx`

**Interfaces:**
- Consumes: `Stage`, `SceneIndex`, `Hook`, `Note`, `PlatformPlan`, spawn every `f(0.7)`.
- Produces: composition `Escena08` duration 1050.

- [ ] **Step 1: Implement Escena08**

Full frame (this scene used to leave a camera hole — do not). Facts: Xingye North Street, Línea 6, 5:00 p. m., tren ≈ 4 min, 5 puertas. Sightline cut on door 1. Spawn every 0,7 s from `f(24)`.

```tsx
import React from 'react';
import {useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Hook} from '../components/Hook';
import {PlatformPlan, type Passenger} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_MONO} from '../design/fonts';
import {appear, arriveT, atProgress, f, pathDownStairs, pathToDoor} from '../lib';

const FACTS = [
  {t: 2.0, k: 'Línea 6'},
  {t: 6.0, k: 'tren ≈ 4 min'},
  {t: 10.0, k: '5 puertas'},
];
const INTERVAL = f(0.7);
const spawn0 = f(24);

export const Escena08: React.FC = () => {
  const frame = useCurrentFrame();
  const n = Math.max(0, Math.floor((frame - spawn0) / INTERVAL) + (frame >= spawn0 ? 1 : 0));
  const count = Math.min(12, n);
  const sight = appear(frame, f(16), 14);
  const passengers: Passenger[] = Array.from({length: count}, (_, i) => {
    const born = spawn0 + i * INTERVAL;
    const t = Math.min(1, Math.max(0, frame - born) / f(4.5));
    const door = ([3, 2, 4, 5, 3, 2, 4, 3, 5, 2, 4, 3] as const)[i];
    const path = [...pathDownStairs(), ...pathToDoor(door).slice(1)];
    const p = atProgress(path, arriveT(t));
    return {id: `s${i}`, x: p.x, y: p.y};
  });

  return (
    <Stage>
      <SceneIndex n="08" />
      <Hook text="Xingye North Street, 5:00 p. m." frame={frame} size={64} />
      <Note left={LAYOUT.marginX} top={268}>
        esquema
      </Note>
      <div style={{position: 'absolute', left: LAYOUT.marginX, top: 300}}>
        {FACTS.map((row) => (
          <div
            key={row.k}
            style={{
              fontFamily: FONT_MONO,
              fontSize: 22,
              color: COLOR.text,
              marginTop: 8,
              opacity: appear(frame, f(row.t), 14),
            }}
          >
            {row.k}
          </div>
        ))}
      </div>
      <PlatformPlan
        x={480}
        y={430}
        width={1280}
        highlightDoor={null}
        dimHidden={sight > 0.2 ? 0.3 : 1}
        sightline={sight}
        passengers={passengers}
      />
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
```

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena08 out/stills/escena08-start.png --frame=0 --gl=angle
npx remotion still Escena08 out/stills/escena08-mid.png --frame=525 --gl=angle
npx remotion still Escena08 out/stills/escena08-end.png --frame=1049 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena08.png \
  out/stills/escena08-start.png out/stills/escena08-mid.png out/stills/escena08-end.png
```

Inspect: content uses the right third (passengers or andén past x=1280). Sightline on door 1 by mid. `0,7` with comma. Full cream background.

---

### Task 10: Escena09 Resultado (30 s, 900 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena09.tsx`

**Interfaces:**
- Consumes: existing illustrative series helpers (copy into the file; do not import article numbers).
- Produces: composition `Escena09` duration 900.

- [ ] **Step 1: Implement Escena09**

Three small multiples. Weights `0,4 / 0,4 / 0,2` (accent panel, `COLOR.valid` after pick), `0,2 / 0,6 / 0,2`, `0,6 / 0,2 / 0,2`. Axis note `ilustrativo · 0–240 s`. Draw-on paths. Highlight the first panel at `f(22)`.

Keep the `even` / `match` / `crowd` / `far` / `series` / `pathOf` functions from the current `Escena09.tsx` unchanged (they are illustrative shapes, not article data). Only change timing, hook, layout, and colors via tokens.

Replace the component body timings:

- `fitOn = appear(frame, f(2), 14)`
- `hiddenFail = appear(frame, f(8), 14)`
- `three = appear(frame, f(12), 14)`
- `draw = clampI(frame, [f(13), f(22)], [0, 1], easeEnter)`
- `pick = appear(frame, f(22), 14)`

Hook: `0,4 · 0,4 · 0,2, lo más parecido`. SceneIndex `09`. Do not use `SceneTitle`. Panel width ~520, gap 36, top 320 so they fit under the hook.

- [ ] **Step 2: Stills**

```bash
npx remotion still Escena09 out/stills/escena09-start.png --frame=0 --gl=angle
npx remotion still Escena09 out/stills/escena09-mid.png --frame=450 --gl=angle
npx remotion still Escena09 out/stills/escena09-end.png --frame=899 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena09.png \
  out/stills/escena09-start.png out/stills/escena09-mid.png out/stills/escena09-end.png
```

Inspect: three charts by end; first weight label `#1F7A52`; note `ilustrativo`; commas in 0,4.

---

### Task 11: Escena10 Cierre (30 s, 900 f)

**Files:**
- Modify: `video-v2/src/scenes/Escena10.tsx`
- Delete leftover: confirm `Escena11.tsx` is gone.

**Interfaces:**
- Consumes: `Stage`, `Hook`, `PlatformPlan`, `AbsoluteFill` fade overlay.
- Produces: composition `Escena10` duration 900. Last frame 899 overlay opacity 1, fill `#F4EFE6`.

- [ ] **Step 1: Implement Escena10**

Loners then a linked pair. Hook `Validar · idea propia`. Small andén. Fade to paper from `f(26)` through frame 899 with `easeLinear`. TransMilenio / Bogotá are VO only — on screen the words are **Validar** and **idea propia**, never a city skyline.

```tsx
import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Stage, SceneIndex, Note} from '../components/Stage';
import {Hook} from '../components/Hook';
import {PlatformPlan} from '../components/PlatformPlan';
import {COLOR, LAYOUT} from '../design/tokens';
import {FONT_SANS} from '../design/fonts';
import {appear, arriveT, atProgress, clampI, easeLinear, f, WORLD} from '../lib';

export const Escena10: React.FC = () => {
  const frame = useCurrentFrame();
  const social = appear(frame, f(8), 14);
  const pair = appear(frame, f(14), 14);
  const thanks = appear(frame, f(22), 14);
  const fade = clampI(frame, [f(26), 899], [0, 1], easeLinear);
  const board = appear(frame, f(18), f(4));
  const p = atProgress(
    [
      {x: WORLD.doors[2].x, y: WORLD.doors[2].y - 18},
      {x: WORLD.doors[2].x, y: WORLD.doors[2].y + 16},
    ],
    arriveT(board),
  );
  const loners = [
    {x: 180, y: 0, vx: 1.1},
    {x: 320, y: 30, vx: 0.7},
    {x: 80, y: 50, vx: 0.95},
    {x: 420, y: 10, vx: 0.6},
  ];

  return (
    <AbsoluteFill style={{backgroundColor: COLOR.bg}}>
      <Stage>
        <SceneIndex n="10" />
        <Hook text="Validar · idea propia" frame={frame} />
        <Note left={LAYOUT.marginX} top={268}>
          idea propia
        </Note>
        <svg
          width={1728}
          height={180}
          style={{position: 'absolute', left: LAYOUT.marginX, top: 320, opacity: social}}
        >
          {loners.map((pt, i) => {
            const x = pt.x + (((frame - f(8)) * pt.vx) % 900);
            return <circle key={i} cx={x} cy={60 + pt.y} r={6} fill={COLOR.text} />;
          })}
          {pair > 0
            ? (() => {
                const x = 200 + (frame - f(14)) * 0.85;
                return (
                  <g opacity={pair}>
                    <circle cx={x} cy={140} r={6} fill={COLOR.accent} />
                    <circle cx={x + 22} cy={140} r={6} fill={COLOR.accent} />
                    <line x1={x} y1={140} x2={x + 22} y2={140} stroke={COLOR.accent} strokeWidth={1} />
                  </g>
                );
              })()
            : null}
        </svg>
        <PlatformPlan
          x={LAYOUT.marginX}
          y={540}
          width={900}
          tag="esquema"
          highlightDoor={3}
          passengers={[{id: 'end', x: p.x, y: p.y, fill: COLOR.accent}]}
        />
        <div
          style={{
            position: 'absolute',
            left: LAYOUT.marginX,
            top: 1000,
            fontFamily: FONT_SANS,
            fontSize: 40,
            fontWeight: 600,
            color: COLOR.text,
            opacity: thanks,
            letterSpacing: '-0.03em',
          }}
        >
          Gracias
        </div>
      </Stage>
      <AbsoluteFill style={{backgroundColor: COLOR.bg, opacity: fade, pointerEvents: 'none'}} />
    </AbsoluteFill>
  );
};
```

- [ ] **Step 2: Stills, including last frame**

```bash
npx remotion still Escena10 out/stills/escena10-start.png --frame=0 --gl=angle
npx remotion still Escena10 out/stills/escena10-mid.png --frame=450 --gl=angle
npx remotion still Escena10 out/stills/escena10-end.png --frame=899 --gl=angle
bash scripts/contact-sheet.sh out/contact-sheet-escena10.png \
  out/stills/escena10-start.png out/stills/escena10-mid.png out/stills/escena10-end.png
python3 - <<'PY'
from pathlib import Path
png = Path('out/stills/escena10-end.png')
# sanity: file exists and is not tiny
assert png.exists() and png.stat().st_size > 1000, png
print('end still ok', png.stat().st_size)
PY
```

Inspect: start hook; mid loners + pair; **frame 899 is solid paper `#F4EFE6`** (no leftover type). Label `idea propia` visible before the fade.

---

### Task 12: Scripts, README, encode, probe

**Files:**
- Modify: `video-v2/scripts/stills-all.sh`
- Modify: `video-v2/scripts/render-all.sh`
- Modify: `video-v2/README.md`
- Modify: `video-v2/package.json` scripts (`stills:07` frames 0 / 1125 / 2249)
- Produce: `out/escena01.mp4`…`out/escena10.mp4`, `out/video-motion-v3.mp4`, contact sheets

**Interfaces:**
- Consumes: compositions from Task 1; scene implementations from Tasks 2–11.
- Produces: 360 s H.264 silent MP4.

- [ ] **Step 1: Update stills-all.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out/stills

declare -A FRAMES=(
  [Escena01]=1050 [Escena02]=600 [Escena03]=1050 [Escena04]=1050
  [Escena05]=900 [Escena06]=1050 [Escena07]=2250 [Escena08]=1050
  [Escena09]=900 [Escena10]=900
)

n=1
for id in Escena01 Escena02 Escena03 Escena04 Escena05 Escena06 Escena07 Escena08 Escena09 Escena10; do
  dur=${FRAMES[$id]}
  last=$((dur - 1))
  mid=$((dur / 2))
  nn=$(printf '%02d' $n)
  npx remotion still "$id" "out/stills/escena${nn}-start.png" --frame=0 --gl=angle
  npx remotion still "$id" "out/stills/escena${nn}-mid.png" --frame="$mid" --gl=angle
  npx remotion still "$id" "out/stills/escena${nn}-end.png" --frame="$last" --gl=angle
  bash scripts/contact-sheet.sh "out/contact-sheet-escena${nn}.png" \
    "out/stills/escena${nn}-start.png" \
    "out/stills/escena${nn}-mid.png" \
    "out/stills/escena${nn}-end.png"
  n=$((n + 1))
done
```

- [ ] **Step 2: Update render-all.sh**

```bash
#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p out

SECS=(35 20 35 35 30 35 75 35 30 30)
n=1
for id in Escena01 Escena02 Escena03 Escena04 Escena05 Escena06 Escena07 Escena08 Escena09 Escena10; do
  nn=$(printf '%02d' $n)
  sec=${SECS[$((n - 1))]}
  out="out/escena${nn}.mp4"
  echo "=== render $id → $out (${sec}s) ==="
  npx remotion render "$id" "$out" \
    --codec=h264 --pixel-format=yuv420p --muted --crf=18 --gl=angle
  bash scripts/probe-mp4.sh "$out" 1920x1080 30 "$sec"
  n=$((n + 1))
done

list=out/concat.txt
: > "$list"
for nn in 01 02 03 04 05 06 07 08 09 10; do
  echo "file 'escena${nn}.mp4'" >> "$list"
done
ffmpeg -y -hide_banner -loglevel error -f concat -safe 0 -i "$list" -c copy out/video-motion-v3.mp4
bash scripts/probe-mp4.sh out/video-motion-v3.mp4 1920x1080 30 360
echo "DONE"
```

- [ ] **Step 3: Rewrite README**

Replace `video-v2/README.md` with this exact content (no nested fences):

    # Video motion v3 — Wang et al., ICCMS 2022

    Fondo animado (sin audio) de 6:00 para la sustentación. Papel y
    señalética, cuadro completo. Santiago graba voz y cámara aparte.

    ## Requisitos

    - Node 18+
    - ffmpeg / ffprobe
    - ~4 GB libres para Chromium de Remotion

    npm install

    ## Vista previa

    npm run studio

    ## Contrato de duraciones

    bash scripts/check-compositions.sh

    Escenas (s): 35, 20, 35, 35, 30, 35, 75, 35, 30, 30. Total: 360 s.

    ## Stills y render

    bash scripts/stills-all.sh
    bash scripts/render-all.sh

    Salidas en `out/`: `escena01.mp4` … `escena10.mp4`, `video-motion-v3.mp4`.

    Dirección: `docs/superpowers/specs/2026-11-01-video-motion-v3-design.md`.
    Números con coma decimal. Lo ilustrativo va rotulado. Sin audio.

Strip the four-space indent when writing the file so headings start at column 0.

- [ ] **Step 4: Stills of all ten, then encode**

Do not encode until contact sheets of 01–10 exist from this task or from Tasks 2–11.

```bash
bash scripts/check-compositions.sh
bash scripts/stills-all.sh
bash scripts/render-all.sh
```

Expected: every `probe-mp4.sh` prints `PASS`. Final:

```
PASS out/video-motion-v3.mp4
```

duration 360 s ± 0.08, 1920×1080, h264, yuv420p, 30 fps, 0 audio streams.

- [ ] **Step 5: Visual audit against the spec**

Open `out/contact-sheet-escena01.png` … `10.png` and `out/stills/escena10-end.png`. Fail the task if any of these is true:

- Background is dark (`#111315`) or a scene still has an empty right third.
- A hook is a paragraph (>12 words) or missing.
- `TOPSIS` appears in lowercase. A decimal uses `.` instead of `,`.
- Charts or S scores lack `ilustrativo`. Andén lacks `esquema` where the spec asked.
- Last frame of escena 10 is not paper.
- `Escena11` still exists or Completo is not 10800 frames.
- Glow, gradient fills, bounce on type, or DoorManager / Chongqing copy.

Grep before finishing:

```bash
rg -n "cameraRight|cameraX|Escena11|Chongqing|DoorManager|#111315" src scripts package.json
```

Expected: no matches in `src/` (package-lock may still mention old names; leave it).

---

## Self-review (plan vs spec)

| Spec item | Task |
| --- | --- |
| 6:00 / 10800 f / ten blocks | 1, 12 |
| Full frame, no camera hole | 1 (Stage), 9 (escena 08 was the old hole) |
| Paper palette + type | 1 |
| Enter / camera eases, 1 s hold after hook | 1 tokens + each scene `f(2)` |
| Hooks 01–10 exact phrases | 2–11 |
| A*, S, TOPSIS, 0,25 m, 0,7 s, 0,4/0,4/0,2, Xingye, idea propia | 7, 8, 9, 10, 11 |
| Fade last frame paper | 11 |
| Stills then MP4, probe 360 s | 12 |
| No LIRN/TORNS, no glow, no invented figures | Global + grep in 12 |
