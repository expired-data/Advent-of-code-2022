export type Instruction = [quantity: number, from: number, to: number]

export const parseStacks = (input: string): (string | undefined)[][] => {
  const rows = input.split(/\r?\n/);
  const r = new RegExp(/(\[(.)\])|(    )/g);
  return rows.map((row: string): string[] =>
    [...row.matchAll(r)].map((v: RegExpMatchArray): string => v[2])
  );
};

export const translateStacks = (
  stacks: (string | undefined)[][]
): string[][] => {
  return stacks.reduce<string[][]>(
    (acc: string[][], val: (string | undefined)[]): string[][] => {
        val.forEach((v: string | undefined, index: number) => { 
            if(v) {
                acc[index].push(v)
            }
        })

        return acc;
    },
    [...Array(stacks[0].length)].map(() => []) as string[][]
  );
};

export const parseInstructions = (input: string): Instruction[] => { 
    const instructions = [...input.matchAll(/move (\d+) from (\d+) to (\d+)/g)]

    return instructions.map((instruction: RegExpMatchArray): Instruction => instruction.slice(1,4).map(n => Number(n)) as Instruction)
}

export const apply = (stacks: string[][], instructions: Instruction[]): string[][] => { 
    return instructions.reduce((s: string[][], instruction: Instruction): string[][] => { 
        s[instruction[2] - 1].unshift(...s[instruction[1] - 1].splice(0, instruction[0]).reverse())
        return s;
    }, stacks)
}

export const solvePart1 = (input: string): string => solve(input, apply)

export const bulkMoveApply = (stacks: string[][], instructions: Instruction[]): string[][] => { 
    return instructions.reduce((s: string[][], instruction: Instruction): string[][] => { 
        s[instruction[2] - 1].unshift(...s[instruction[1] - 1].splice(0, instruction[0]))
        return s;
    }, stacks)
}

export const solvePart2 = (input: string): string => solve(input, bulkMoveApply)

const solve = (input: string, applyFn: (s: string[][], i: Instruction[]) => string[][]): string => { 
    const [stacks, instructions] = input.split(/\r?\n\r?\n/);

    //remove the index line from the stacks and parse
    const noIndex = stacks.slice(0, -1);
    const parsedStacks = parseStacks(noIndex);
    const translatedStacks = translateStacks(parsedStacks);
  
    const parsedInstructions = parseInstructions(instructions)
  
    const result = applyFn(translatedStacks, parsedInstructions)
  
    const tops = result.map((s: string[]) => s[0]).join('')
  
    return tops;
}