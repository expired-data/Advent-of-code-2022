import { solvePart1, solvePart2 } from "./problem6"

describe("solve part 1", () => { 
    test("can solve for example inputs", () => { 
        const examples = ["bvwbjplbgvbhsrlpgdmjqwftvncz", "nppdvjthqldpwncqszvftbrmjlhg", "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"]
        const solutions = [5,6,10,11]

        examples.forEach((example: string, index: number): void => { 
            expect(solvePart1(example)).toBe(solutions[index])
        })
    })
})


describe("solve part 2", () => { 
    test("can solve for example inputs", () => { 
        const examples = ["mjqjpqmgbljsphdztnvjfqwrcgsmlb", "bvwbjplbgvbhsrlpgdmjqwftvncz", "nppdvjthqldpwncqszvftbrmjlhg", "nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg", "zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"]
        const solutions = [19,23,23,29,26]

        examples.forEach((example: string, index: number): void => { 
            expect(solvePart2(example)).toBe(solutions[index])
        })
    })
})