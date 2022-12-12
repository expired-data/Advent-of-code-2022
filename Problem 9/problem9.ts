export type Position = [x: number, y: number];

type Direction = "U" | "D" | "L" | "R";

export interface RopeState {
  head: Position;
  tail: Position;
  visitedPositions: Position[];
}

export const adjustTail = (state: RopeState): RopeState => {
  const { head, tail } = state;

  if (Math.abs(head[0] - tail[0]) <= 1 && Math.abs(head[1] - tail[1]) <= 1) {
    return state;
  }

  state.tail = [
    Math.sign(head[0] - tail[0]) + tail[0],
    Math.sign(head[1] - tail[1]) + tail[1],
  ];

  if(state.visitedPositions.find((position: Position): boolean => position[0] === state.tail[0] && position[1] === state.tail[1]) === undefined)  { 
    state.visitedPositions.push(state.tail);
  }

  return state;
};

export const parseMoves = (input: string): [Direction, number][] => { 
    return input.split(/\r?\n/).map((val: string): [Direction, number] => val.split(' ') as [Direction, number])
}

export const solvePart1 = (input: string): number => { 
    const moves = parseMoves(input); 
    const initState: RopeState = { 
        head: [0,0], 
        tail: [0,0],
        visitedPositions: [[0,0]]
    }

    const finalState = moves.reduce((state: RopeState, [direction, amount]): RopeState => applyMove(state, direction, amount), initState)

    return finalState.visitedPositions.length;
}

export const applyMove = (
  state: RopeState,
  direction: Direction,
  amount: number
): RopeState => {
  if (amount === 0) {
    return state;
  }

  switch (direction) {
    case "U":
      state.head = [state.head[0], state.head[1] + 1];
      break;
    case "D":
      state.head = [state.head[0], state.head[1] - 1];
      break;
    case "L":
      state.head = [state.head[0] - 1, state.head[1]];
      break;
    case "R":
      state.head = [state.head[0] + 1, state.head[1]];
      break;
  }

  return applyMove(adjustTail(state), direction, amount - 1)
};

export const solvePart2 = () => {} 