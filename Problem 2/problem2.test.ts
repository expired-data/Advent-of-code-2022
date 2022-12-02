import {
  isMyWin,
  isDraw,
  scoreRound,
  parseRounds,
  solvePart1,
  Choice,
  Round,
} from "./problem2";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

const allChoices = [Choice.Rock, Choice.Paper, Choice.Scissors];
const allPairs: Round[] = allChoices.flatMap((choice: Choice): Round[] =>
  allChoices.map((choice2: Choice): Round => [choice, choice2])
);

describe("isMyWin", () => {
  test("should win 3 times across allPairs", () => {
    const rounds = allPairs.filter((round: Round): boolean => isMyWin(round));

    expect(rounds.length).toBe(3);
  });
});

describe("isDraw", () => {
  test("should draw only when left and right are equal", () => {
    allPairs.forEach(([elfChoice, myChoice]: Round): void => {
      if (elfChoice == myChoice) {
        expect(isDraw([elfChoice, myChoice])).toBe(true);
      } else {
        expect(isDraw([elfChoice, myChoice])).toBe(false);
      }
    });
  });
});

describe("scoreRound", () => {
  test("round scores are valid for all values", () => {
    const roundScores = allPairs.map((round: Round): number =>
      scoreRound(round)
    );

    expect(roundScores).toMatchSnapshot();
  });
});

describe("parseRounds", () => {
  test("can parse example rounds", () => {
    expect(parseRounds(exampleData)).toEqual([
      [Choice.Rock, Choice.Paper],
      [Choice.Paper, Choice.Rock],
      [Choice.Scissors, Choice.Scissors],
    ]);
  });
});

describe("solvePart1", () => {
  test("can solve example rounds", () => {
    expect(solvePart1(exampleData)).toBe(15);
  });
});
