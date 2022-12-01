const solvePart1 = (input: string): number => { 
    const inventories: string[] = input.split(/\r?\n\r?\n/);    
    const inventorySums: number[] = inventories.map(sumInventory);

    return maxValue(inventorySums);
}

const sumInventory = (inventory: string): number => { 
    const calorieValues: number[] = inventory.split(/\r?\n/).map((valString: string): number => Number.parseInt(valString));

    return sumList(calorieValues)
}

const sumList = (nums: number[]): number => nums.reduce((prev: number, cur: number): number => prev + cur);

const maxValue = (values: number[]): number => values.sort((a,b) => b - a)[0]


const solvePart2 = (input: string): number => {
    const inventories: string[] = input.split(/\r?\n\r?\n/);   
    const inventorySums: number[] = inventories.map(sumInventory);

    return sumList(topThree(inventorySums))
} 

const topThree = (values: number[]): number[] => values.sort((a,b) => b - a).slice(0, 3)

export { solvePart1, solvePart2, sumInventory, sumList, maxValue, topThree }