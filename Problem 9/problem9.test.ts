import { adjustTail, Position, RopeState, solvePart1 } from "./problem9";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("adjust tail", () => {
  test("adjusts correctly on top", () => {
    const state: RopeState = {
      head: [0, 0],
      tail: [0, 0],
      visitedPositions: [],
    };

    const resultantState = adjustTail(state);

    expect(resultantState.tail).toEqual([0, 0]);
    expect(resultantState.visitedPositions).toEqual([]);
  });

  test("adjusts correctly immediate sides", () => {
    const testCases: Position[] = [
      [0, 1],
      [1, 0],
      [-1, 0],
      [0, -1],
      [-1, -1], 
      [-1, 1], 
      [1, -1], 
      [1, 1]
    ];

    testCases.forEach((testCase: Position): void => {
      const state: RopeState = {
        head: [0, 0],
        tail: testCase,
        visitedPositions: [],
      };

      const resultantState = adjustTail(state);

      expect(resultantState.tail).toEqual(testCase);
      expect(resultantState.visitedPositions).toEqual([]);
    });
  });

  test("adjusts correctly long sides", () => {
    const testCases: [Position, Position][] = [
      [[0, 2],[0, 1]],
      [[2, 0],[1,0]],
      [[-2, 0],[-1, 0]],
      [[0, -2], [0, -1]]
    ];

    testCases.forEach((testCase: [Position, Position]): void => {
      const state: RopeState = {
        head: [0, 0],
        tail: testCase[0],
        visitedPositions: [testCase[0]],
      };

      const resultantState = adjustTail(state);

      expect(resultantState.tail).toEqual(testCase[1]);
      expect(resultantState.visitedPositions).toEqual([testCase[0], testCase[1]]);
    });
  });

  test("adjusts correctly diagonal moves", () => {
    const testCases: [Position, Position][] = [
      [[1, 2],[0, 1]]
    ];

    testCases.forEach((testCase: [Position, Position]): void => {
      const state: RopeState = {
        head: [0, 0],
        tail: testCase[0],
        visitedPositions: [testCase[0]],
      };

      const resultantState = adjustTail(state);

      expect(resultantState.tail).toEqual(testCase[1]);
      expect(resultantState.visitedPositions).toEqual([testCase[0], testCase[1]]);
    });
  });
});

describe("solve part 1", () => {
    test("solves example input", () => { 
        expect(solvePart1(exampleData)).toBe(13)
    })
})