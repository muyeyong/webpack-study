// import { getAST } from './parser.js'
const path = require('path')
const { getAST, getDependencis } = require('./parser.js')

// console.log(getAST)
const ast = getAST(path.join(__dirname, '../src/index.js'))
const dependenceis = getDependencis(ast)
// console.log('dependenceis', dependenceis)
// console.log(ast)
