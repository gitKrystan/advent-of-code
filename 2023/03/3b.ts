/*

--- Part Two ---
The engineer finds the missing part and installs it in the engine! As the engine springs to life, you jump in the closest gondola, finally ready to ascend to the water source.

You don't seem to be going very fast, though. Maybe something is still wrong? Fortunately, the gondola has a phone labeled "help", so you pick it up and the engineer answers.

Before you can explain the situation, she suggests that you look out the window. There stands the engineer, holding a phone in one hand and waving with the other. You're going so slowly that you haven't even left the station. You exit the gondola.

The missing part wasn't the only issue - one of the gears in the engine is wrong. A gear is any * symbol that is adjacent to exactly two part numbers. Its gear ratio is the result of multiplying those two numbers together.

This time, you need to find the gear ratio of every gear and add them all up so that the engineer can figure out which gear needs to be replaced.

Consider the same engine schematic again:

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
In this schematic, there are two gears. The first is in the top left; it has part numbers 467 and 35, so its gear ratio is 16345. The second gear is in the lower right; its gear ratio is 451490. (The * adjacent to 617 is not a gear because it is only adjacent to one part number.) Adding up all of the gear ratios produces 467835.

What is the sum of all of the gear ratios in your engine schematic?

*/

const NUMBER_REGEXP = /\d+/g;
const GEAR_REGEXP = /\*/g;

function isAdjacentNumber(
  numberMatch: RegExpMatchArray,
  start: number,
  end: number,
) {
  if (typeof numberMatch.index !== 'number') {
    throw new Error(
      `expected numberMatch.index to be a number, was ${numberMatch.index}`,
    );
  }

  const numberStart = numberMatch.index;
  const numberEnd = numberMatch.index + numberMatch[0].length - 1;
  return (
    (numberStart >= start && numberStart <= end) ||
    (numberEnd >= start && numberEnd <= end) ||
    (numberStart <= start && numberEnd >= end)
  );
}

function totalCurrentLine(
  line: string,
  prev: string | undefined,
  next: string | undefined,
) {
  for (let gearMatch of line.matchAll(GEAR_REGEXP)) {
    if (typeof gearMatch.index !== 'number') {
      throw new Error(
        `expected gearMatch.index to be a number, was ${gearMatch.index} for string ${line}`,
      );
    }

    /*
    0123456
    ...*...
      ^^^
    123.123
    */
    const numberRangeStart = Math.max(gearMatch.index - 1, 0);
    const numberRangeEnd = Math.min(gearMatch.index + 1, line.length);

    let firstAdjacent = 0;
    let secondAdjacent = 0;

    for (let numberMatch of [
      ...line.matchAll(NUMBER_REGEXP),
      ...(prev?.matchAll(NUMBER_REGEXP) ?? []),
      ...(next?.matchAll(NUMBER_REGEXP) ?? []),
    ]) {
      if (isAdjacentNumber(numberMatch, numberRangeStart, numberRangeEnd)) {
        if (firstAdjacent === 0) {
          firstAdjacent = Number(numberMatch[0]);
        } else if (secondAdjacent === 0) {
          secondAdjacent = Number(numberMatch[0]);
        } else {
          return 0;
        }
      }
    }

    return firstAdjacent * secondAdjacent;
  }

  return 0;
}

function verifyLineExists(line: string | undefined): string {
  if (typeof line !== 'string') {
    throw new Error(`expected line to be a string, was ${line}`);
  }
  return line;
}

export default function solution(input: string): number {
  const lines = input.trim().split('\n');

  let total = 0;
  for (let i = 0; i < lines.length; i++) {
    total += totalCurrentLine(
      verifyLineExists(lines[i]),
      lines[i - 1],
      lines[i + 1],
    );
  }

  return total;
}
