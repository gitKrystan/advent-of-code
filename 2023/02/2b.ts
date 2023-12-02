/*

--- Part Two ---
The Elf says they've stopped producing snow because they aren't getting any water! He isn't sure why the water stopped; however, he can show you how to get to the water source to check it out for yourself. It's just up ahead!

As you continue your walk, the Elf poses a second question: in each game you played, what is the fewest number of cubes of each color that could have been in the bag to make the game possible?

Again consider the example games from earlier:

Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
In game 1, the game could have been played with as few as 4 red, 2 green, and 6 blue cubes. If any color had even one fewer cube, the game would have been impossible.
Game 2 could have been played with a minimum of 1 red, 3 green, and 4 blue cubes.
Game 3 must have been played with at least 20 red, 13 green, and 6 blue cubes.
Game 4 required at least 14 red, 3 green, and 15 blue cubes.
Game 5 needed no fewer than 6 red, 3 green, and 2 blue cubes in the bag.
The power of a set of cubes is equal to the numbers of red, green, and blue cubes multiplied together. The power of the minimum set of cubes in game 1 is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up these five powers produces the sum 2286.

For each game, find the minimum set of cubes that must have been present. What is the sum of the power of these sets?

*/

type Color = 'red' | 'green' | 'blue';

function isColor(value: string | undefined): value is Color {
  return ['red', 'green', 'blue'].includes(value as Color);
}

function analyzeGame(input: string): number {
  const match = /^Game (?<gameId>\d+): (?<gameData>.+)$/.exec(input);
  if (!match?.groups) {
    throw new Error(`no Game ID found for ${input}`);
  }
  const { gameId, gameData } = match.groups;

  if (gameId === undefined || gameData === undefined) {
    throw new Error(`game unparsable:\n\t${input}`);
  }

  const counts = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const sets = gameData.split('; ');
  for (const set of sets) {
    const parts = set.split(', ');

    for (const part of parts) {
      const [count, color] = part.split(' ');
      if (!isColor(color)) {
        throw new Error(`unknown color: ${color} in ${part}`);
      }
      if (!count) {
        throw new Error(`unknown count: ${count} in ${part}`);
      }
      const currentMax = counts[color];
      if (Number(count) > currentMax) {
        counts[color] = Number(count);
      }
    }
  }

  return counts['red'] * counts['green'] * counts['blue'];
}

export default function solution(input: string): number {
  const games = input.trim().split('\n');
  return games.reduce((sum, game) => sum + analyzeGame(game), 0);
}
