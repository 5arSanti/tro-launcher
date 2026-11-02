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
