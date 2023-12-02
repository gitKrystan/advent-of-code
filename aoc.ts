import chalk from 'chalk';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

type SolutionFunction = (input: string) => number;

function splitPart(input: string): [number: string, letter: string] {
  const normalized = input.padStart(3, '0');
  const regex = /^(\d{2})([A-Za-z])$/;
  const match = regex.exec(normalized);
  if (match) {
    return [match[1] as string, match[2] as string];
  }
  throw new Error(
    `Invalid part format. Expected <number><letter>. Found ${input}.`,
  );
}

async function runAocSolution(): Promise<void> {
  const args: string[] = process.argv.slice(2);

  // Check for the --help argument
  if (args.includes('--help')) {
    console.log('Usage: bun ./aoc <year> <part>');
    console.log('Example: bun ./aoc 2023 1a');
    console.log(
      'This script runs the Advent of Code solution for the given year and part.',
    );
    console.log(
      'Ensure your solution files have a default export function that takes the puzzle input string as an argument.',
    );
    return;
  }

  const [year, part] = args;

  if (!year || !part) {
    console.error(
      'Error: Missing arguments. Use --help for usage information.',
    );
    return;
  }

  try {
    console.log(
      `🎄🎄🎄 ${chalk.red('Running')} ${chalk.green('solution')} ${chalk.red(
        'for',
      )} ${chalk.green('Advent')} ${chalk.red('of')} ${chalk.green(
        'Code',
      )} ${chalk.red(year)} ${chalk.green('part')} ${chalk.red(
        part,
      )}${chalk.green('...')}`,
    );
    console.log('\n');

    const [partFolder] = splitPart(part);

    const module = (await import(
      fileURLToPath(
        new URL(`${year}/${partFolder}/${part}.js`, import.meta.url),
      )
    )) as { default: SolutionFunction };

    const solution: SolutionFunction = module.default;

    const input: string = fs.readFileSync(
      fileURLToPath(
        new URL(`${year}/${partFolder}/input.txt`, import.meta.url),
      ),
      { encoding: 'utf8' },
    );

    const result = solution(input);
    console.log(result);
    console.log('\n');
    console.log(
      `🎄🎄🎄 ${chalk.red('HO')} ${chalk.green('HO')} ${chalk.red('HO')}`,
    );
    console.log('\n');
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

await runAocSolution();
