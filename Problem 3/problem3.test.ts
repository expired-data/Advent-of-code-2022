import {
  splitRucksacks,
  sharedItem,
  itemValue,
  solvePart1,
  getBadge,
  splitGroups,
  solvePart2,
} from "./problem3";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("splitRucksacks", () => {
  test("can split a single rucksack", () => {
    expect(splitRucksacks("abcdefABCDEF")).toEqual([["abcdef", "ABCDEF"]]);
  });

  test("can split example rucksacks", () => {
    const rucksacks = splitRucksacks(exampleData);
    expect(rucksacks).toHaveLength(6);
    rucksacks.forEach((rucksack): void => {
      expect(rucksack[0].length).toEqual(rucksack[1].length);
      expect(rucksack.length).toBe(2);
    });
  });
});

describe("sharedItem", () => {
  test("sharedItem finds shared item in small rucksack", () => {
    expect(sharedItem(["ttgJtRGJ", "QctTZtZT"])).toBe("t");
  });

  test("sharedItem finds shared item in all example rucksacks", () => {
    const rucksacks = splitRucksacks(exampleData);
    const answers = ["p", "L", "P", "v", "t", "s"];
    rucksacks.forEach((rucksack, index): void => {
      expect(sharedItem(rucksack)).toBe(answers[index]);
    });
  });
});

describe("itemValue", () => {
  test("item value gives correct value for some random values", () => {
    expect(itemValue("p")).toBe(16);
    expect(itemValue("L")).toBe(38);
    expect(itemValue("P")).toBe(42);
    expect(itemValue("v")).toBe(22);
    expect(itemValue("t")).toBe(20);
    expect(itemValue("s")).toBe(19);
  });
});

describe("solvePart1", () => {
  test("solve part 1 correctly solves for example data", () => {
    expect(solvePart1(exampleData)).toBe(157);
  });
});

describe("getBadge", () => {
  test("get badge can get first badge from example data", () => {
    expect(
      getBadge(
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg"
      )
    ).toBe("r");
  });
});

describe("splitGroups", () => {
  test("can split example data", () => {
    expect(splitGroups(exampleData)).toEqual([
      [
        "vJrwpWtwJgWrhcsFMMfFFhFp",
        "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
        "PmmdzqPrVvPwwTWBwg",
      ],
      [
        "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
        "ttgJtRGJQctTZtZT",
        "CrZsJsPPZsGzwwsLwLmpwMDw",
      ],
    ]);
  });
});

describe("solvePart2", () => {
  test("solve part 2 correctly solves for example data", () => {
    expect(solvePart2(exampleData)).toBe(70);
  });
});
