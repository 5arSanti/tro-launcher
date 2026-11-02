import {loadFont as loadInter} from '@remotion/google-fonts/InterTight';
import {loadFont as loadMono} from '@remotion/google-fonts/JetBrainsMono';

export const FONT_SANS = loadInter('normal', {
  weights: ['400', '600'],
  subsets: ['latin', 'latin-ext'],
  ignoreTooManyRequestsWarning: true,
}).fontFamily;

export const FONT_MONO = loadMono('normal', {
  weights: ['400', '500'],
  subsets: ['latin', 'latin-ext'],
  ignoreTooManyRequestsWarning: true,
}).fontFamily;
