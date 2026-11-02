import {bundle} from '@remotion/bundler';
import {renderStill, selectComposition} from '@remotion/renderer';
import path from 'node:path';
import fs from 'node:fs';

const [, , id, ...frames] = process.argv;
const serveUrl = await bundle({entryPoint: path.resolve('src/index.ts')});
const composition = await selectComposition({serveUrl, id});
fs.mkdirSync('out/beats', {recursive: true});
for (const fr of frames) {
  const output = `out/beats/${id}-${String(fr).padStart(4, '0')}.png`;
  await renderStill({composition, serveUrl, output, frame: Number(fr), chromiumOptions: {gl: 'angle'}});
  console.log(output);
}
