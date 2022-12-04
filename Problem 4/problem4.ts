type NumberRange = [start: number, end: number] 

export const parseNumberRange = (input: string): NumberRange => { 
    return (input.split('-')).map((n: string): number => parseInt(n)) as NumberRange
}

export const pairsToNumberRange = (input: string): [NumberRange, NumberRange] => { 
    return input.split(',').map(parseNumberRange) as [NumberRange, NumberRange]
}

export const parsePairs = (input: string): [NumberRange, NumberRange][] => { 
    return input.split(/\r?\n/).map(pairsToNumberRange)
}

export const completelyOverlaps = (left: NumberRange, right: NumberRange): boolean => { 
    return wholelyContains(left, right) || wholelyContains(right, left)
}

export const wholelyContains = (a: NumberRange, b: NumberRange): boolean => a[0] <= b[0] && a[1] >= b[1]

export const solvePart1 = (input: string): number => { 
    const pairs: [NumberRange, NumberRange][] = parsePairs(input)

    return pairs.filter(([left, right]: [NumberRange, NumberRange]): boolean => completelyOverlaps(left, right)).length
}

export const overlaps = (left: NumberRange, right: NumberRange): boolean => {
    return leftOverlaps(left, right) || leftOverlaps(right, left)
}

export const leftOverlaps = (a: NumberRange, b: NumberRange): boolean => { 
    return a[0] <= b[0] && a[1] >= b[0]
}

export const solvePart2 = (input: string): number => { 
    const pairs: [NumberRange, NumberRange][] = parsePairs(input)

    return pairs.filter(([left, right]: [NumberRange, NumberRange]): boolean => overlaps(left, right)).length
}