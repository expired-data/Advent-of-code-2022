import { sumList } from "../Problem 1/problem1";

type Rucksack = [string, string];

export const solvePart1 = (input: string): number => {
  const rucksacks: Rucksack[] = splitRucksacks(input);
  const sharedItems = rucksacks.map(sharedItem);

  return sumList(sharedItems.map(itemValue));
};

export const solvePart2 = (input: string): number => {
  const groups: [string, string, string][] = splitGroups(input);
  const badges = groups.map((group: [string, string, string]): string =>
    getBadge(...group)
  );

  return sumList(badges.map(itemValue));
};

export const splitRucksacks = (input: string): Rucksack[] => {
  return input
    .split(/\r?\n/)
    .map(
      (rucksack: string): Rucksack => [
        rucksack.slice(0, rucksack.length / 2),
        rucksack.slice(rucksack.length / 2),
      ]
    );
};

export const sharedItem = (rucksack: Rucksack): string =>
  [
    ...new Set(
      [...rucksack[0]].filter((item: string): boolean =>
        [...rucksack[1]].includes(item)
      )
    ),
  ].join("");

export const itemValue = (item: string): number => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const valueList = [...(alphabet + alphabet.toUpperCase())];

  return valueList.indexOf(item) + 1;
};

export const splitGroups = (input: string): [string, string, string][] => {
  const rucksacks = input.split(/\r?\n/);
  return rucksacks.reduce(
    (
      acc: [string, string, string][],
      rucksack: string,
      index: number
    ): [string, string, string][] => {
      if (index % 3 == 0) {
        acc[Math.floor(index / 3)] = [rucksack, "", ""];
      } else {
        acc[Math.floor(index / 3)][index % 3] = rucksack;
      }

      return acc;
    },
    []
  );
};

export const getBadge = (a: string, b: string, c: string): string =>
  sharedItem([a, sharedItem([b, c])]);
