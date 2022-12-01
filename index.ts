import { solvePart1 as solveProblem1Part1, solvePart2 as solveProblem1Part2 } from './Problem 1/problem1'
import fs from 'fs'
import path from 'path'

const yargs = require('yargs');

const problemSolvers: {[problemNumber: number]: [((input: string) => unknown), ((input: string) => unknown)]} = { 
    1: [solveProblem1Part1, solveProblem1Part2] 
}

const argv = yargs.option('problem', { 
        description: 'The problem to solve', 
        alias: 'p', 
        type: 'number'
    }).
    option('input', {
        description: 'The input file to use',
        alias: 'i',
        type: 'string'
    })
    .option('part', { 
        description: 'Which part of the problem to solve', 
        type: 'number',
        default: 0
    })
    .help().alias('help','h').argv;

if(argv.problem && argv.input && problemSolvers[argv.problem]) { 
    const file = path.join(__dirname, argv.input)
    const inputData: string = fs.readFileSync(file, "utf8")

    const solution = problemSolvers[argv.problem][argv.part](inputData)
    console.log('The solution for this input is: ' + solution)
}