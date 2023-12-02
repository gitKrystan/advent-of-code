import { describe, expect, test } from '@jest/globals';
import findCalibrationValue from './1b';

const testInput1 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

const testInput2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
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

  test('it returns 29 for two1nine', () => {
    expect(findCalibrationValue('two1nine')).toBe(29);
  });

  test('it returns 83 for eightwothree', () => {
    expect(findCalibrationValue('eightwothree')).toBe(83);
  });

  test('it returns 13 for abcone2threexyz', () => {
    expect(findCalibrationValue('abcone2threexyz')).toBe(13);
  });

  test('it returns 24 for xtwone3four', () => {
    expect(findCalibrationValue('xtwone3four')).toBe(24);
  });

  test('it returns 42 for 4nineeightseven2', () => {
    expect(findCalibrationValue('4nineeightseven2')).toBe(42);
  });

  test('it returns 14 for zoneight234', () => {
    expect(findCalibrationValue('zoneight234')).toBe(14);
  });

  test('it returns 76 for 7pqrstsixteen', () => {
    expect(findCalibrationValue('7pqrstsixteen')).toBe(76);
  });

  test('it calculates a multiline input 1', () => {
    expect(findCalibrationValue(testInput1)).toBe(142);
  });

  test('it calculates a multiline input 2', () => {
    expect(findCalibrationValue(testInput2)).toBe(281);
  });
});
