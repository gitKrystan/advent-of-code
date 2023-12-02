import { describe, expect, test } from '@jest/globals';
import solution from './2b';

const testInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

describe('2023/2a', () => {
  test('Returns 48 for Game 1', () => {
    expect(
      solution('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'),
    ).toBe(48);
  });

  test('Returns 12 for Game 2', () => {
    expect(
      solution(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      ),
    ).toBe(12);
  });

  test('Returns 1560 for Game 3', () => {
    expect(
      solution(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      ),
    ).toBe(1560);
  });

  test('Returns 630 for Game 4', () => {
    expect(
      solution(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      ),
    ).toBe(630);
  });

  test('Returns 36 for Game 5', () => {
    expect(
      solution('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'),
    ).toBe(36);
  });

  test('Returns 2286 for test input', () => {
    expect(solution(testInput)).toBe(2286);
  });
});
