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
