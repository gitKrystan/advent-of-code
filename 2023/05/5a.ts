/*

--- Part Two ---
Everyone will starve if you only plant such a small number of seeds. Re-reading the almanac, it looks like the seeds: line actually describes ranges of seed numbers.

The values on the initial seeds: line come in pairs. Within each pair, the first value is the start of the range and the second value is the length of the range. So, in the first line of the example above:

seeds: 79 14 55 13
This line describes two ranges of seed numbers to be planted in the garden. The first range starts with seed number 79 and contains 14 values: 79, 80, ..., 91, 92. The second range starts with seed number 55 and contains 13 values: 55, 56, ..., 66, 67.

Now, rather than considering four seed numbers, you need to consider a total of 27 seed numbers.

In the above example, the lowest location number can be obtained from seed number 82, which corresponds to soil 84, fertilizer 84, water 84, light 77, temperature 45, humidity 46, and location 46. So, the lowest location number is 46.

Consider all of the initial seed numbers listed in the ranges on the first line of the almanac. What is the lowest location number that corresponds to any of the initial seed numbers?

*/

const SECTION_DELIMITER = /\n{2,}/;
const SECTION_HEADER_DELIMITER = /:\s*/;

interface RangeInfo {
  sourceRange: [start: number, end: number];
  destinationRange: [start: number, end: number];
}

interface ConversionInfo {
  id: string;
  rangeInfos: RangeInfo[];
}

export function verifyExists<T>(value: T | null | undefined, id: string): T {
  if (value === null || value === undefined) {
    throw new Error(`Verify exists failed: ${id}`);
  }
  return value;
}

export function safeIndexAccess<T extends {}>(
  value: T[],
  index: number,
  id: string,
): T {
  return verifyExists(
    value[index],
    `safeIndexAccess failed: ${id}[${index}] for array ${value}`,
  );
}

function parseNumberArray(raw: string) {
  return raw.split(' ').map((numberString) => {
    const id = Number(numberString);
    if (Number.isNaN(id)) {
      throw new Error(`Cannot parse number: ${numberString}`);
    }
    return id;
  });
}

function parseSeedIds(rawSeeds: string[]): number[] {
  if (rawSeeds.length !== 2) {
    throw new Error(`Invalid seeds list:\n\t${rawSeeds.join('\n\t')}`);
  }

  const rawSeedIds = safeIndexAccess(rawSeeds, 1, 'rawSeeds');
  return parseNumberArray(rawSeedIds);
}

function parseRanges(rawRanges: string): RangeInfo {
  const rangeNumbers = parseNumberArray(rawRanges);

  const destRangeStart = safeIndexAccess(rangeNumbers, 0, 'rangeNumbers');
  const sourceRangeStart = safeIndexAccess(rangeNumbers, 1, 'rangeNumbers');
  const rangeLength = safeIndexAccess(rangeNumbers, 2, 'rangeNumbers');

  return {
    destinationRange: [destRangeStart, destRangeStart + rangeLength - 1],
    sourceRange: [sourceRangeStart, sourceRangeStart + rangeLength - 1],
  };
}

function parseConversion(rawConversion: string[]): ConversionInfo {
  if (rawConversion.length !== 2) {
    throw new Error(`Invalid conversion map:\n\t${rawConversion.join('\n\t')}`);
  }

  const rawConversionId = verifyExists(rawConversion[0], 'rawConversionId');
  const rawConversionRanges = verifyExists(
    rawConversion[1],
    'rawConversionRanges',
  );

  return {
    id: safeIndexAccess(rawConversionId.split(' '), 0, 'rawConversionId'),
    rangeInfos: rawConversionRanges.trim().split(/\n\s*/).map(parseRanges),
  };
}

function findRangeInfo(
  conversionInfo: ConversionInfo,
  currentId: number,
): RangeInfo | undefined {
  const range = conversionInfo.rangeInfos.find((rangeInfo) => {
    const [sourceStart, sourceEnd] = rangeInfo.sourceRange;
    return currentId >= sourceStart && currentId <= sourceEnd;
  });

  return range;
}

function calculateCurrentId(
  rangeInfo: RangeInfo,
  currentId: number,
  conversionInfo: ConversionInfo,
) {
  const offset = currentId - rangeInfo.sourceRange[0];
  const [destinationStart, destinationEnd] = rangeInfo.destinationRange;

  currentId = destinationStart + offset;
  if (currentId > destinationEnd) {
    throw new Error(
      `Conversion overflow:\n\tconversion: ${conversionInfo.id}\n\tcurrentId: ${currentId}`,
    );
  }
  return currentId;
}

function findLocation(seed: number, conversions: ConversionInfo[]): number {
  let currentId = seed;
  for (const conversionInfo of conversions) {
    const rangeInfo = findRangeInfo(conversionInfo, currentId);
    currentId =
      rangeInfo === undefined
        ? currentId
        : calculateCurrentId(rangeInfo, currentId, conversionInfo);
  }
  return currentId;
}

export default function solution(input: string): number {
  const sections = input
    .split(SECTION_DELIMITER)
    .map((section) => section.split(SECTION_HEADER_DELIMITER));

  if (sections.length !== 8) {
    throw new Error(`Invalid number of sections: ${sections.length}`);
  }

  const seeds = parseSeedIds(verifyExists(sections[0], 'rawSeeds'));
  const conversions = sections.slice(1).map(parseConversion);

  const locations = seeds.map((seed) => findLocation(seed, conversions));
  return Math.min(...locations);
}
