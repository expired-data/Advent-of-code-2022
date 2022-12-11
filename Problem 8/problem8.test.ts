import { leftVisible, parseForest, solvePart1, solvePart2 } from "./problem8"
import fs from "fs";
import path from "path";

const file = path.join(__dirname, "./", "example-input.txt");
const exampleData: string = fs.readFileSync(file, "utf8");

describe("parseForest", () => { 
    test("can parse example forest", () => { 
        expect(parseForest(exampleData)).toMatchSnapshot()
    })
})

describe("solvePart1", () => { 
    test("can solve example forest", () => { 
        expect(solvePart1(exampleData)).toEqual(21)
    })
})

describe("leftVisible", () => { 
    test("can solve simple left visibility", () => { 
        expect(leftVisible([0,9,3,5,3])).toEqual([true, true, false, false ,false])
        expect(leftVisible([3,0,3,7,3])).toEqual([true, false, false, true, false])
    })
})

describe("solvePart2", () => { 
    test("can solve example forest", () => { 
        expect(solvePart2(exampleData)).toEqual(8)
    })
})