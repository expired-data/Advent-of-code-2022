import {
  maxValue,
  sumList,
  sumInventory,
  solvePart1,
  solvePart2,
  topThree,
} from "./problem1";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("maxValue", () => {
  test("maxValue finds max value in a singleton list", () => {
    const list: number[] = [5];
    expect(maxValue(list)).toBe(5);
  });

  test("maxValue finds max value in a list with multiple elements", () => {
    const list: number[] = [5, 10, 7, 9, 1000, 2321, 1111];
    expect(maxValue(list)).toBe(2321);
  });
});

describe("sumList", () => {
  test("sumList can sum singleton lists", () => {
    const list: number[] = [7];
    expect(sumList(list)).toBe(7);
  });

  test("sumList can sum longer lists", () => {
    const list: number[] = [5, 10, 7, 9, 1000, 2321, 1111];
    expect(sumList(list)).toBe(4463);
  });
});

describe("sumInventory", () => {
  test("sumInventory can parse and sum a singleton inventory", () => {
    const inventory: string = "7";
    expect(sumInventory(inventory)).toBe(7);
  });

  test("sumInventory can parse and sum a longer inventory", () => {
    const inventory: string = `5
10
7
9
1000
2321
1111`;

    expect(sumInventory(inventory)).toBe(4463);
  });
});

describe("solvePart1", () => {
  test("solve can parse and solve for a singleton inventory", () => {
    const inventories: string = "7";
    expect(solvePart1(inventories)).toBe(7);
  });

  test("solve can parse and solve for multiple inventories", () => {
    expect(solvePart1(exampleData)).toBe(24000);
  });
});

describe("topThree", () => {
  test("returns all the values for a list of size three", () => {
    const values: number[] = [5, 90, 201];
    expect(topThree(values).sort()).toEqual([5, 90, 201].sort());
  });

  test("returns top three values from a long list of values", () => {
    const values: number[] = [5, 10, 7, 9, 1000, 2321, 1111];

    expect(topThree(values).sort()).toEqual([1000, 2321, 1111].sort());
  });
});

describe("solvePart2", () => {
  test("can solve for 3 inventories", () => {
    const inventories: string = `5
90
201`;
    expect(solvePart2(inventories)).toBe(296);
  });

  test("can solve for example data", () => {
    expect(solvePart2(exampleData)).toBe(45000);
  });
});
