/*

--- Part Two ---
Your calculation isn't quite right. It looks like some of the digits are
actually spelled out with letters:

one, two, three, four, five, six, seven, eight, and nine

also count as valid "digits".

Equipped with this new information, you now need to find the real first and last
digit on each line. For example:

two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen

In this example, the calibration values are 29, 83, 13, 24, 42, 14, and 76.
Adding these together produces 281.

*/

const DIGITS: Record<string, string | undefined> = {
  // NOTE: 0 does not appear in data set.
  '1': '1',
  one: '1',
  '2': '2',
  two: '2',
  '3': '3',
  three: '3',
  '4': '4',
  four: '4',
  '5': '5',
  five: '5',
  '6': '6',
  six: '6',
  '7': '7',
  seven: '7',
  '8': '8',
  eight: '8',
  '9': '9',
  nine: '9',
};

function toNumber(character: string | undefined): number | undefined {
  const number = Number(character);
  return Number.isNaN(number) ? undefined : number;
}

function findDigitAtEnd(input: string): string | undefined {
  let buffer = '';
  for (let index = input.length - 1; index >= 0; index--) {
    const character = input[index];
    buffer = character + buffer;
    const result = DIGITS[buffer];
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

function findFirstDigit(input: string): string {
  let buffer = '';
  for (const character of input) {
    buffer += character;

    const result = findDigitAtEnd(buffer);
    if (result !== undefined) {
      return result;
    }
  }
  throw new Error(`no digit found in string ${input}`);
}

function findDigitAtBeginning(input: string): string | undefined {
  let buffer = '';
  for (const character of input) {
    buffer += character;
    const result = DIGITS[buffer];
    if (result !== undefined) {
      return result;
    }
  }
  return undefined;
}

function findLastDigit(input: string): string {
  let buffer = '';
  for (let index = input.length - 1; index >= 0; index--) {
    const character = input[index];
    buffer = character + buffer;
    const result = findDigitAtBeginning(buffer);
    if (result !== undefined) {
      return result;
    }
  }
  throw new Error(`no digit found in string ${input}`);
}

function findSingleCalibrationValue(input: string): number {
  console.log(input);
  const digits = findFirstDigit(input) + findLastDigit(input);
  const number = toNumber(digits);
  if (number === undefined) {
    throw new Error(`no number found in string ${digits}`);
  }
  return number;
}

export default function findCalibrationValue(input: string): number {
  const lines = input.trim().split('\n');
  return lines.reduce((sum, line) => sum + findSingleCalibrationValue(line), 0);
}
