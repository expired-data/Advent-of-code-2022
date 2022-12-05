import {
  parseStacks,
  translateStacks,
  parseInstructions,
  apply,
  Instruction,
  solvePart1,
  bulkMoveApply,
  solvePart2,
} from "./problem5";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("parseStacks", () => {
  test("can parse full stacks", () => {
    expect(parseStacks("[Z] [M] [P]")).toEqual([["Z", "M", "P"]]);
  });

  test("can parse partly empty stacks", () => {
    expect(parseStacks("[N] [C]    ")).toEqual([["N", "C", undefined]]);
  });

  test("can parse all but one empty stacks", () => {
    expect(parseStacks("[D]        ")).toEqual([["D", undefined, undefined]]);
  });

  test("can parse input stacks", () => {
    const stacks = exampleData.split(/\r?\n/).slice(0, 3).join("\n");

    expect(parseStacks(stacks)).toEqual([
      [undefined, "D", undefined],
      ["N", "C", undefined],
      ["Z", "M", "P"],
    ]);
  });
});

describe("translateStacks", () => {
  test("can translate example stacks", () => {
    const exampleStacks = [
      [undefined, "D", undefined],
      ["N", "C", undefined],
      ["Z", "M", "P"],
    ];

    expect(translateStacks(exampleStacks)).toEqual([["N", "Z"], ["D", "C", "M"], ["P"]]);
  });
});

describe("parseInstructions", () => {
  test("can parse example instructions", () => {
    const instructions = exampleData.split(/\r?\n\r?\n/)[1];

    expect(parseInstructions(instructions)).toMatchSnapshot();
  });
});

describe("apply", () => {
  test("can solve example problem", () => {
    const stack = [["N", "Z"], ["D", "C", "M"], ["P"]];
    const instructions = [
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ] as Instruction[];

    expect(apply(stack, instructions)).toEqual([
      ["C"],
      ["M"],
      ["Z", "N", "D", "P"],
    ]);
  });
});

describe("solvePart1", () => { 
    test("can solve example", () => { 
        expect(solvePart1(exampleData)).toBe("CMZ")
    })
})

describe("bulkMoveApply", () => { 
    test("can solve example", () => { 
        const stack = [["N", "Z"], ["D", "C", "M"], ["P"]];
        const instructions = [
          [1, 2, 1],
          [3, 1, 3],
          [2, 2, 1],
          [1, 1, 2],
        ] as Instruction[];
    
        expect(bulkMoveApply(stack, instructions)).toEqual([
          ["M"],
          ["C"],
          ["D", "N", "Z", "P"],
        ]);
    })
})

describe("solvePart2", () => { 
    test("can solve example", () => { 
        expect(solvePart2(exampleData)).toBe("MCD")
    })
})