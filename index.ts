import {
  solvePart1 as solveProblem1Part1,
  solvePart2 as solveProblem1Part2,
} from "./Problem 1/problem1";
import {
  solvePart1 as solveProblem2Part1,
  solvePart2 as solveProblem2Part2,
} from "./Problem 2/problem2";
import {
  solvePart1 as solveProblem3Part1,
  solvePart2 as solveProblem3Part2,
} from "./Problem 3/problem3";
import {
  solvePart1 as solveProblem4Part1,
  solvePart2 as solveProblem4Part2,
} from "./Problem 4/problem4";
import {
  solvePart1 as solveProblem5Part1,
  solvePart2 as solveProblem5Part2,
} from "./Problem 5/problem5";
import fs from "fs";
import path from "path";

const yargs = require("yargs");

const problemSolvers: {
  [problemNumber: number]: [
    (input: string) => unknown,
    (input: string) => unknown
  ];
} = {
  1: [solveProblem1Part1, solveProblem1Part2],
  2: [solveProblem2Part1, solveProblem2Part2],
  3: [solveProblem3Part1, solveProblem3Part2],
  4: [solveProblem4Part1, solveProblem4Part2],
  5: [solveProblem5Part1, solveProblem5Part2],
};

const argv = yargs
  .option("problem", {
    description: "The problem to solve",
    alias: "p",
    type: "number",
  })
  .option("input", {
    description: "The input file to use",
    alias: "i",
    type: "string",
  })
  .option("part", {
    description: "Which part of the problem to solve",
    type: "number",
    default: 1,
  })
  .help()
  .alias("help", "h").argv;

if (argv.problem && argv.input && problemSolvers[argv.problem]) {
  const file = path.join(__dirname, argv.input);
  const inputData: string = fs.readFileSync(file, "utf8");

  const solution = problemSolvers[argv.problem][argv.part - 1](inputData);
  console.log("The solution for this input is: " + solution);
} else {
  console.error("Can't find the problem or invalid inputs");
}
