export const solvePart1 = (input: string): number => solve(input, 4) 

export const solvePart2 = (input: string): number => solve(input, 14)

export const solve = (input: string, distinctLength: number): number => { 
    let nonRecurring: string[] = [];
    let index = 0;

    for (; index < input.length && (new Set(nonRecurring)).size < distinctLength; index++) {
        if (nonRecurring.length == distinctLength) {
            nonRecurring.pop()
        }
        nonRecurring.unshift(input.charAt(index));
    }

    return index;
}