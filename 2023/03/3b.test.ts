import { describe, expect, test } from '@jest/globals';
import solution from './3b';

const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`;

describe('2023/3a', () => {
  test('Finds gear ratio for parts on one line', () => {
    expect(solution('123*123')).toBe(15_129);
  });

  test('Finds gear ratio for gears between parts on separate lines', () => {
    // prettier-ignore
    const one = [
      '...123',
      '..*...',
      '...123',
    ];
    // prettier-ignore
    const two = [
      '...123',
      '...*..',
      '...123',
    ];
    // prettier-ignore
    const three = [
      '..123.',
      '...*..',
      '..123.',
    ];
    // prettier-ignore
    const four = [
      '.123..',
      '...*..',
      '.123..',
    ];
    // prettier-ignore
    const five = [
      '.123..',
      '....*.',
      '.123..',
    ];
    expect(solution(one.join('\n'))).toBe(15_129);
    expect(solution(two.join('\n'))).toBe(15_129);
    expect(solution(three.join('\n'))).toBe(15_129);
    expect(solution(four.join('\n'))).toBe(15_129);
    expect(solution(five.join('\n'))).toBe(15_129);
  });

  test('Does not have false positives', () => {
    // prettier-ignore
    const one = [
      '...123',
      '..*...',
      '......',
    ];
    // prettier-ignore
    const two = [
      '...123',
      '..*123',
      '...123',
    ];
    expect(solution(one.join('\n'))).toBe(0);
    expect(solution(two.join('\n'))).toBe(0);
  });

  test('Finds first gear', () => {
    // prettier-ignore
    const one = [
      '467..114..',
      '...*......',
      '..35..633.',
    ];
    expect(solution(one.join('\n'))).toBe(16345);
  });

  test('Finds second gear', () => {
    // prettier-ignore
    const two = [
      '......755.',
      '...$.*....',
      '.664.598..',
    ];
    expect(solution(two.join('\n'))).toBe(451490);
  });

  test('Finds gear ratio for really long number', () => {
    // prettier-ignore
    const two = [
      '......755.',
      '.....*....',
      '..0000598.',
    ];
    expect(solution(two.join('\n'))).toBe(451490);
  });

  test('Finds multiple gears on same line', () => {
    // prettier-ignore
    const two = [
      '12....12..',
      '.*.....*..',
      '..3.....3.',
    ];
    expect(solution(two.join('\n'))).toBe(72);
  });

  test('Zero cancels other gear ratio', () => {
    // prettier-ignore
    const one = [
      '...123',
      '..*...',
      '.0....',
    ];
    expect(solution(one.join('\n'))).toBe(0);
  });

  test('Works for test input', () => {
    expect(solution(testInput)).toBe(467_835);
  });
});
