/* 
  将源码解析为ast
  分析依赖
  将ast转换为源码
 */

const babelParser = require('@babel/parser')
const { transformFromAst } = require('@babel/core')
const traverse = require('@babel/traverse').default
const fs = require('fs')

module.exports = {
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8')
    return babelParser.parse(source, {
      sourceType: 'module'
    })
  },
  getDependencis: (ast) => {
    const dependencis = []
    traverse(ast,  {
      ImportDeclaration: ({ node }) => {
        dependencis.push(node.source.value)
      },
    })
    return dependencis
  },
  transform: (ast) => {
    const { code } = transformFromAst(ast)
    return code
  }
}