/*

--- Day 3: Gear Ratios ---
You and the Elf eventually reach a gondola lift station; he says the gondola lift will take you up to the water source, but this is as far as he can bring you. You go inside.

It doesn't take long to find the gondolas, but there seems to be a problem: they're not moving.

"Aaah!"

You turn around to see a slightly-greasy Elf with a wrench and a look of surprise. "Sorry, I wasn't expecting anyone! The gondola lift isn't working right now; it'll still be a while before I can fix it." You offer to help.

The engineer explains that an engine part seems to be missing from the engine, but nobody can figure out which one. If you can add up all the part numbers in the engine schematic, it should be easy to work out which part is missing.

The engine schematic (your puzzle input) consists of a visual representation of the engine. There are lots of numbers and symbols you don't really understand, but apparently any number adjacent to a symbol, even diagonally, is a "part number" and should be included in your sum. (Periods (.) do not count as a symbol.)

Here is an example engine schematic:

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
In this schematic, two numbers are not part numbers because they are not adjacent to a symbol: 114 (top right) and 58 (middle right). Every other number is adjacent to a symbol and so is a part number; their sum is 4361.

Of course, the actual engine schematic is much larger. What is the sum of all of the part numbers in the engine schematic?

*/

/*

[
  012345,
  012345,
  012345,
]

*/

const NUMBER_REGEXP = /\d+/g;
const SYMBOL_REGEXP = /[^.\d]/g;

function findSymbolIndices(line: string) {
  return [...line.matchAll(SYMBOL_REGEXP)].map((symbolMatch) => {
    const { index } = symbolMatch;
    if (typeof index !== 'number') {
      throw new Error(
        `expected symbolMatch.index to be a number, was ${symbolMatch.index}, for string ${line}`,
      );
    }
    return index;
  });
}

function hasAdjacentSymbol(
  line: number[] | undefined,
  firstPossibleSymbolIndex: number,
  lastPossibleSymbolIndex: number,
) {
  return line?.some(
    (i) => i >= firstPossibleSymbolIndex && i <= lastPossibleSymbolIndex,
  );
}

function totalCurrentLine(
  line: string,
  prevLineSymbolIndices: number[] | undefined,
  currLineSymbolIndices: number[] | undefined,
  nextLineSymbolIndices: number[] | undefined,
) {
  let lineTotal = 0;
  for (let numberMatch of line.matchAll(NUMBER_REGEXP)) {
    if (typeof numberMatch.index !== 'number') {
      throw new Error(
        `expected numberMatch.index to be a number, was ${numberMatch.index} for string ${line}`,
      );
    }

    const symbolRangeStart = Math.max(numberMatch.index - 1, 0);
    const symbolRangeEnd = Math.min(
      numberMatch.index + numberMatch[0].length,
      line.length,
    );

    if (
      hasAdjacentSymbol(
        prevLineSymbolIndices,
        symbolRangeStart,
        symbolRangeEnd,
      ) ||
      hasAdjacentSymbol(
        currLineSymbolIndices,
        symbolRangeStart,
        symbolRangeEnd,
      ) ||
      hasAdjacentSymbol(nextLineSymbolIndices, symbolRangeStart, symbolRangeEnd)
    ) {
      lineTotal += Number(numberMatch[0]);
    }
  }

  return lineTotal;
}

export default function solution(input: string): number {
  const lines = input.trim().split('\n');

  let total = 0;
  let prevLineSymbolIndices: number[] | undefined = undefined;
  let currLineSymbolIndices: number[] | undefined = undefined;
  let nextLineSymbolIndices: number[] | undefined = undefined;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (typeof line !== 'string') {
      throw new Error(`expected line to be a string, was ${line}`);
    }

    if (i === 0) {
      currLineSymbolIndices = findSymbolIndices(line);
    } else {
      if (currLineSymbolIndices === undefined) {
        throw new Error(
          `expected currLineSymbolIndices to be defined, was undefined for line ${line}`,
        );
      }
      prevLineSymbolIndices = currLineSymbolIndices;
      currLineSymbolIndices = nextLineSymbolIndices;
    }

    const nextLine = lines[i + 1];
    nextLineSymbolIndices = nextLine ? findSymbolIndices(nextLine) : undefined;

    total += totalCurrentLine(
      line,
      prevLineSymbolIndices,
      currLineSymbolIndices,
      nextLineSymbolIndices,
    );
  }

  return total;
}
