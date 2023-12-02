import { describe, expect, test } from '@jest/globals';
import solution from './2a';

const testInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`;

describe('2023/2a', () => {
  test('Returns 1 for Game 1', () => {
    expect(
      solution('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green'),
    ).toBe(1);
  });

  test('Returns 2 for Game 2', () => {
    expect(
      solution(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      ),
    ).toBe(2);
  });

  test('Returns 0 for Game 3', () => {
    expect(
      solution(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      ),
    ).toBe(0);
  });

  test('Returns 0 for Game 4', () => {
    expect(
      solution(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      ),
    ).toBe(0);
  });

  test('Returns 5 for Game 5', () => {
    expect(
      solution('Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green'),
    ).toBe(5);
  });

  test('Returns 8 for test input', () => {
    expect(solution(testInput)).toBe(8);
  });
});
