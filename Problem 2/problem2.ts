import { sumList } from "../Problem 1/problem1";

export enum Choice {
  "Rock" = 1,
  "Paper" = 2,
  "Scissors" = 3,
}

export enum Outcome {
  "Lose",
  "Draw",
  "Win",
}

export type Round = [Choice, Choice];

type ElfInput = "A" | "B" | "C";
type MyInput = "X" | "Y" | "Z";
type Input = ElfInput | MyInput;
type Decision = "X" | "Y" | "Z";

const solvePart1 = (input: string): number => {
  const rounds = parseRounds(input);
  return sumList(rounds.map(scoreRound));
};

const parseRounds = (input: string): Round[] => {
  const rounds = input.split(/\r?\n/).map((line: string): Round => {
    const [elfChoice, myChoice] = line.split(" ") as [Input, Input];

    const choiceMap: Record<Input, Choice> = {
      A: Choice.Rock,
      B: Choice.Paper,
      C: Choice.Scissors,
      X: Choice.Rock,
      Y: Choice.Paper,
      Z: Choice.Scissors,
    };

    return [choiceMap[elfChoice], choiceMap[myChoice]];
  });

  return rounds;
};

const scoreRound = (choices: Round): number => {
  const [, myChoice] = choices;
  const choiceScore: number = myChoice;

  const winScore: number = isDraw(choices) ? 3 : isMyWin(choices) ? 6 : 0;

  return choiceScore + winScore;
};

const isDraw = ([elfChoice, myChoice]: Round): boolean => elfChoice == myChoice;
const isMyWin = ([elfChoice, myChoice]: Round): boolean =>
  [1, -2].includes(myChoice - elfChoice);

const solvePart2 = (input: string): number => {
  const rounds = parseAndMakeChoiceForRounds(input);
  return sumList(rounds.map(scoreRound));
};

const parseAndMakeChoiceForRounds = (input: string): Round[] => {
  const rounds = input.split(/\r?\n/).map((line: string): Round => {
    const [elfInput, outcome] = line.split(" ") as [ElfInput, Decision];

    const choiceMap: Record<ElfInput, Choice> = {
      A: Choice.Rock,
      B: Choice.Paper,
      C: Choice.Scissors,
    };

    const outcomeMap: Record<Decision, Outcome> = {
      X: Outcome.Lose,
      Y: Outcome.Draw,
      Z: Outcome.Win,
    };

    const elfChoice = choiceMap[elfInput];
    return [elfChoice, myChoiceForDesired(elfChoice, outcomeMap[outcome])];
  });

  return rounds;
};

const myChoiceForDesired = (elfChoice: Choice, outcome: Outcome): Choice => {
  switch (outcome) {
    case Outcome.Draw:
      return elfChoice;
    case Outcome.Win:
      return (elfChoice % 3) + 1;
    case Outcome.Lose:
      return ((elfChoice + 1) % 3) + 1;
  }
};

export {
  isMyWin,
  isDraw,
  scoreRound,
  parseRounds,
  solvePart1,
  myChoiceForDesired,
  parseAndMakeChoiceForRounds,
  solvePart2,
};
