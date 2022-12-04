import { parseNumberRange, pairsToNumberRange, parsePairs, wholelyContains, completelyOverlaps, solvePart1, leftOverlaps, overlaps, solvePart2 } from './problem4'
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("parseNumberRange", () => { 
    test("parseNumberRange can parse single digit ranges", () => { 
        expect(parseNumberRange("2-4")).toEqual([2,4])
        expect(parseNumberRange("6-9")).toEqual([6,9])
    })

    test("parseNumberRange can parse multi digit ranges", () => {
        expect(parseNumberRange("13989-34895489")).toEqual([13989, 34895489])
        expect(parseNumberRange("9998-9999")).toEqual([9998, 9999])
    })
})

describe("pairsToNumberRange", () => { 
    test("can find number ranges from pairs", () => { 
        expect(pairsToNumberRange("2-4,6-8")).toEqual([[2,4],[6,8]])
        expect(pairsToNumberRange("13989-34895489,9998-9999")).toEqual([[13989, 34895489],[9998, 9999]])
    })
})

describe("parsePairs", () => {
    test("can parse example input", () => { 
        expect(parsePairs(exampleData)).toMatchSnapshot()
    })
})

describe("wholelyContains", () => { 
    test("can solve simple case", () =>{  
        expect(wholelyContains([4,9],[5,7])).toBe(true)
        expect(wholelyContains([4,9],[6,10])).toBe(false)
    })

    test("can solve cases where ranges end/start together", () => { 
        expect(wholelyContains([2,4], [2,3])).toBe(true)
        expect(wholelyContains([2,7],[5,7])).toBe(true)
        expect(wholelyContains([5,9],[5,9])).toBe(true)
        expect(wholelyContains([2,6], [1,6])).toBe(false)
        expect(wholelyContains([1,9], [1,10])).toBe(false)
    })

    test("case where right is completely outside left", () => { 
        expect(wholelyContains([4,9], [100,122])).toBe(false)
    })
})

describe("completelyOverlaps", () => {
    test("works for some sample cases", () => { 
        expect(completelyOverlaps([2,6], [1,6])).toBe(true)
        expect(completelyOverlaps([1,9], [1,10])).toBe(true)
        expect(completelyOverlaps([5,9],[5,9])).toBe(true)
        expect(wholelyContains([4,9], [100,122])).toBe(false)
        expect(wholelyContains([4,9],[6,10])).toBe(false)
    })
})

describe("solvePart1", () => { 
    test("can solve example data", () => { 
        expect(solvePart1(exampleData)).toBe(2)
    })
})

describe("leftOverlaps", () => { 
    test("can solve simple case", () =>{  
        expect(leftOverlaps([4,9],[5,7])).toBe(true)
        expect(leftOverlaps([4,9],[6,10])).toBe(true)
        expect(leftOverlaps([4,9], [100,122])).toBe(false)
    })

    test("can solve cases where ranges end/start together", () => { 
        expect(leftOverlaps([2,4], [2,3])).toBe(true)
        expect(leftOverlaps([2,7],[5,7])).toBe(true)
        expect(leftOverlaps([5,9],[5,9])).toBe(true)
        expect(leftOverlaps([2,6], [1,6])).toBe(false)
        expect(leftOverlaps([1,9], [1,10])).toBe(true)
    })
})

describe("overlaps", () => {
    test("works for some sample cases", () => { 
        expect(overlaps([2,6], [1,6])).toBe(true)
        expect(overlaps([1,9], [1,10])).toBe(true)
        expect(overlaps([5,9],[5,9])).toBe(true)
        expect(overlaps([4,9], [100,122])).toBe(false)
        expect(overlaps([4,9],[6,10])).toBe(true)
    })
})

describe("solvePart2", () => { 
    test("can solve example data", () => { 
        expect(solvePart2(exampleData)).toBe(4)
    })
})