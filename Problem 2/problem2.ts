import { sumList } from "../Problem 1/problem1";

export enum Choice {
  "Rock" = 1,
  "Paper" = 2,
  "Scissors" = 3,
}

export type Round = [Choice, Choice];

type Input = "A" | "B" | "C" | "X" | "Y" | "Z";

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

export { isMyWin, isDraw, scoreRound, parseRounds, solvePart1 };
