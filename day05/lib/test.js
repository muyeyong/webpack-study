// import { getAST } from './parser.js'
const path = require('path')
const { getAST } = require('./parser.js')

// console.log(getAST)
const ast = getAST(path.join(__dirname, '../src/index.js'))
console.log(ast)
