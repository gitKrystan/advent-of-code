import { describe, expect, test } from '@jest/globals';
import findCalibrationValue from './1a.js';

const testInput = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

describe('2023/1a', () => {
  test('it returns 12 for 1abc2', () => {
    expect(findCalibrationValue('1abc2')).toBe(12);
  });

  test('it returns 38 for pqr3stu8vwx', () => {
    expect(findCalibrationValue('pqr3stu8vwx')).toBe(38);
  });

  test('it returns 15 for a1b2c3d4e5f', () => {
    expect(findCalibrationValue('a1b2c3d4e5f')).toBe(15);
  });

  test('it returns 77 for treb7uchet', () => {
    expect(findCalibrationValue('treb7uchet')).toBe(77);
  });

  test('it calculates a multiline input', () => {
    expect(findCalibrationValue(testInput)).toBe(142);
  });
});
