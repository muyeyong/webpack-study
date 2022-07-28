const babelParser = require('@babel/parser')
// const path = require('path')
const fs = require('fs')

module.exports = {
  getAST: (path) => {
    const source = fs.readFileSync(path, 'utf-8')
    return babelParser.parse(source, {
      sourceType: 'module'
    })
  }
}