import { solve as solveProblem1 } from './Problem 1/problem1'
import fs from 'fs'
import path from 'path'

const yargs = require('yargs');

const problemSolvers: {[problemNumber: number]: ((input: string) => unknown)} = { 
    1: solveProblem1
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
    .help().alias('help','h').argv;

if(argv.problem && argv.input && problemSolvers[argv.problem]) { 
    const file = path.join(__dirname, argv.input)
    const inputData: string = fs.readFileSync(file, "utf8")

    const solution = problemSolvers[argv.problem](inputData)
    console.log('The solution for this input is: ' + solution)
}