import { describe, expect, test } from '@jest/globals';
import solution from './3a';

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
  test('Finds a part number to right of symbol', () => {
    expect(solution('*123')).toBe(123);
  });

  test('Finds a part number to left of symbol', () => {
    expect(solution('456#')).toBe(456);
  });

  test('Finds a part number directly above symbol', () => {
    // prettier-ignore
    const one = [
      '......',
      '...123',
      '...*...',
    ];
    // prettier-ignore
    const two = [
      '......',
      '...123',
      '....*.',
    ];
    // prettier-ignore
    const three = [
      '......',
      '...123',
      '.....*',
    ];
    expect(solution(one.join('\n'))).toBe(123);
    expect(solution(two.join('\n'))).toBe(123);
    expect(solution(three.join('\n'))).toBe(123);
  });

  test('Finds a part number diagonally above symbol', () => {
    // prettier-ignore
    const one = [
      '......',
      '...123',
      '..*....',
    ];
    // prettier-ignore
    const two = [
      '......',
      '..123.',
      '.....*',
    ];
    expect(solution(one.join('\n'))).toBe(123);
    expect(solution(two.join('\n'))).toBe(123);
  });

  test('Finds a part number directly below symbol', () => {
    // prettier-ignore
    const one = [
      '...*..',
      '...123',
      '......',
    ];
    // prettier-ignore
    const two = [
      '....*.',
      '...123',
      '......',
    ];
    // prettier-ignore
    const three = [
      '.....*',
      '...123',
      '......',
    ];
    expect(solution(one.join('\n'))).toBe(123);
    expect(solution(two.join('\n'))).toBe(123);
    expect(solution(three.join('\n'))).toBe(123);
  });

  test('Finds a part number diagonally below symbol', () => {
    // prettier-ignore
    const one = [
      '..*...',
      '...123',
      '......',
    ];
    // prettier-ignore
    const two = [
      '.....*',
      '..123.',
      '......',
    ];
    expect(solution(one.join('\n'))).toBe(123);
    expect(solution(two.join('\n'))).toBe(123);
  });

  test('Does not have false positives', () => {
    // prettier-ignore
    const one = [
      '......',
      '...123',
      '......',
    ];
    // prettier-ignore
    const two = [
      '......',
      '...123',
      '......',
    ];
    // prettier-ignore
    const three = [
      '......',
      '...123',
      '......',
    ];
    expect(solution(one.join('\n'))).toBe(0);
    expect(solution(two.join('\n'))).toBe(0);
    expect(solution(three.join('\n'))).toBe(0);
  });

  test('Works for test input', () => {
    expect(solution(testInput)).toBe(4361);
  });
});
