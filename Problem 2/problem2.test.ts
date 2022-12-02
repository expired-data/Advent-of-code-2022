import {
  isMyWin,
  isDraw,
  scoreRound,
  parseRounds,
  solvePart1,
  Choice,
  Round,
  parseAndMakeChoiceForRounds,
  solvePart2,
  myChoiceForDesired,
  Outcome,
} from "./problem2";
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

const allChoices = [Choice.Rock, Choice.Paper, Choice.Scissors];
const allPairs: Round[] = allChoices.flatMap((choice: Choice): Round[] =>
  allChoices.map((choice2: Choice): Round => [choice, choice2])
);

const allOutcomes = [Outcome.Lose, Outcome.Draw, Outcome.Win];
const allOutcomePairs: [Choice, Outcome][] = allOutcomes.flatMap(
  (outcome: Outcome): [Choice, Outcome][] =>
    allChoices.map((choice: Choice): [Choice, Outcome] => [choice, outcome])
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

describe("myChoiceForDesired", () => {
  test("gets correct choice for each of the desired outcomes", () => {
    allOutcomePairs.forEach(([choice, outcome]: [Choice, Outcome]): void => {
      const myChoice = myChoiceForDesired(choice, outcome);

      switch (outcome) {
        case Outcome.Lose:
          expect(isDraw([choice, myChoice])).toBe(false);
          expect(isMyWin([choice, myChoice])).toBe(false);
          break;
        case Outcome.Draw:
          expect(isDraw([choice, myChoice])).toBe(true);
          break;
        case Outcome.Win:
          expect(isMyWin([choice, myChoice])).toBe(true);
          break;
      }
    });
  });
});

describe("parseAndMakeChoiceForRounds", () => {
  test("can parse and make choice for example rounds", () => {
    expect(parseAndMakeChoiceForRounds(exampleData)).toEqual([
      [Choice.Rock, Choice.Rock],
      [Choice.Paper, Choice.Rock],
      [Choice.Scissors, Choice.Rock],
    ]);
  });
});

describe("solvePart2", () => {
  test("can solve for example rounds", () => {
    expect(solvePart2(exampleData)).toBe(12);
  });
});
