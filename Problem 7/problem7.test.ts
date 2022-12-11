import {
  applyCD,
  applyLS,
  Directory,
  File,
  solvePart1,
  solvePart2,
  splitCommands,
  TerminalState,
} from "./problem7";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("split commands", () => {
  test("can split examle commands", () => {
    expect(splitCommands(exampleData)).toMatchSnapshot();
  });
});

describe("cd", () => {
  test("can cd up a directory", () => {
    const testParent: Directory = {
      name: "foo",
      contents: [],
      parent: undefined,
    };

    const testChild: Directory = {
      name: "bar",
      contents: [],
      parent: testParent,
    };
    const testState: TerminalState = {
      location: testChild,
      directories: [testParent, testChild],
    };

    const resultantState = applyCD(testState, [".."]);

    expect(resultantState.location).toBe(testParent);
  });

  test("can cd into a directory", () => {
    const testParent: Directory = {
      name: "foo",
      contents: [],
      parent: undefined,
    };

    const testChild: Directory = {
      name: "bar",
      contents: [],
      parent: testParent,
    };

    testParent.contents.push(testChild);

    const testState: TerminalState = {
      location: testParent,
      directories: [testParent, testChild],
    };

    const resultantState = applyCD(testState, ["bar"]);

    expect(resultantState.location).toBe(testChild);
  });

  test("can cd to root directory", () => {
    const testParent: Directory = {
      name: "foo",
      contents: [],
      parent: undefined,
    };

    const testChild: Directory = {
      name: "bar",
      contents: [],
      parent: testParent,
    };

    testParent.contents.push(testChild);

    const testState: TerminalState = {
      location: testParent,
      directories: [testParent, testChild],
    };

    const resultantState = applyCD(testState, ["/"]);

    expect(resultantState.location?.name).toBe("/");
    expect(resultantState.directories).toHaveLength(3);
  });
});

describe("ls", () => {
  test("can ls and find some files and directories", () => {
    const testParent: Directory = {
      name: "foo",
      contents: [],
      parent: undefined,
    };

    const testState: TerminalState = {
      location: testParent,
      directories: [testParent],
    };

    const resultantState = applyLS(testState, [
      "dir bar",
      "dir chipsinH",
      "23948320498 yup",
    ]);

    expect(resultantState.directories).toHaveLength(3);
    expect(testParent.contents).toHaveLength(3);
    expect((testParent.contents?.find((f: File | Directory): boolean => f.name == 'yup') as File).size).toBe(23948320498)
  });
});

describe("solvePart1", () => { 
    test("can solve example problem", () => { 
        expect(solvePart1(exampleData)).toBe(95437)
    })
})


describe("solvePart2", () => { 
    test("can solve example problem", () => { 
        expect(solvePart2(exampleData)).toBe(24933642)
    })
})