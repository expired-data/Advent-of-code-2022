import { isConstructSignatureDeclaration } from "typescript";
import { sumList } from "../Problem 1/problem1";

export interface Directory {
  name: string;
  contents: (Directory | File)[];
  parent: Directory | undefined;
}

export interface File {
  name: string;
  parent: Directory;
  size: number;
}

export interface TerminalState {
  directories: Directory[];
  location: Directory | undefined;
}

export const solvePart1 = (input: string): number => {
  const commands: string[] = splitCommands(input);
  const resultantState: TerminalState = commands.reduce(
    (structure: TerminalState, command: string): TerminalState =>
      applyCommand(command, structure),
    { directories: [], location: undefined } as TerminalState
  );
  const directorySums = sumDirectories(resultantState.directories); 

  return sumList(directorySums.filter(([,sum]): boolean => sum <= 100000).map(([, sum]): number => sum))
};

export const splitCommands = (input: string): string[] => {
  return input.slice(2).split(/\r?\n\$ /);
};

export const applyCommand = (
  command: string,
  state: TerminalState
): TerminalState => {
  const [commandToExecute, ...output] = command.split(/\r?\n/);
  const [commandName, ...args] = commandToExecute.split(" ");
  switch (commandName) {
    case "cd":
      return applyCD(state, args);
    case "ls": 
        return applyLS(state, output); 
    default: 
        return state; 
  }
};

export const applyCD = (
  state: TerminalState,
  args: string[]
): TerminalState => {
  if (args[0] == "..") {
    state.location = state.location?.parent;
  } else if (args[0] == "/") {
    const root =
      state.directories.find(
        (directory: Directory): boolean => directory.name == "/"
      ) ||
      state.directories[
        state.directories.push({ contents: [], name: "/", parent: undefined }) -
          1
      ];
    state.location = root;
  } else {
    const dir = state.location?.contents.find(
      (directory: Directory | File): boolean => directory.name == args[0]
    );
    state.location = dir as Directory;
  }

  return state;
};

export const applyLS = (
  state: TerminalState,
  output: string[]
): TerminalState =>
  output.reduce(
    (stateAcc: TerminalState, outputLine: string): TerminalState => {
      const [left, right] = outputLine.split(" ");
      if (
        left == "dir" &&
        stateAcc.location?.contents.find(
          (directory: Directory | File): boolean => directory.name == right
        ) === undefined
      ) {
        const newDir: Directory = {
            name: right,
            parent: stateAcc.location,
            contents: [],
          }
        stateAcc.location?.contents.push(newDir);
        stateAcc.directories.push(newDir);
      } else if (
        stateAcc.location?.contents.find(
          (file: Directory | File): boolean => file.name == right
        ) === undefined
      ) {
        stateAcc.location?.contents.push({
          name: right,
          size: parseInt(left),
          parent: state.location,
        } as File);
      }

      return stateAcc;
    },
    state
  );


  export const sumDirectories = (directoryList: Directory[]): [Directory, number][] => directoryList.map(sumDirectory)

  export const sumDirectory = (directory: Directory): [Directory, number] => { 
    return [directory, directory.contents.reduce((sum: number, content: Directory | File): number => { 
        if('size' in content) { 
            return sum + content.size; 
        }

        return sum + sumDirectory(content)[1]
    }, 0)]
  }

  export const solvePart2 = (input: string) => {
    const commands: string[] = splitCommands(input);
    const resultantState: TerminalState = commands.reduce(
      (structure: TerminalState, command: string): TerminalState =>
        applyCommand(command, structure),
      { directories: [], location: undefined } as TerminalState
    );
    const directorySums = sumDirectories(resultantState.directories); 
    const requiredSpace = (directorySums.find(([dir,]): boolean => dir.name === '/') as [Directory, number])[1] - 40000000

    return directorySums.filter(([,sum]): boolean => sum >= requiredSpace).map(([,sum]): number => sum).sort((a, b) => a - b)[0]
   }