import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import findCalibrationValue from './1a.js';

const input = fs.readFileSync(
  fileURLToPath(new URL('input.txt', import.meta.url)),
  { encoding: 'utf8' },
);
const result = findCalibrationValue(input);
console.log(result);
