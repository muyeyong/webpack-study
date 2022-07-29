/* 
  实际上实现打包
  调用parser.js 
 */
const { getAST, getDependencis, transform } = require('./parser.js')
const path = require('path')
const fs = require('fs')
module.exports = class Compiler{
  constructor(props) {
    const { entry, output } = props
    this.modules = []
    this.entry = entry
    this.output = output
  }
  run() {
    // 通入口分析依赖关系
    const entryModules = this.buildModule(this.entry, true)
    this.modules.push(entryModules)
    entryModules.dependencis.forEach(dependence => {
      this.modules.push(this.buildModule(dependence))
    })
    this.emitFile()
  }
  buildModule(fileName, isEntry) {
    let ast = null
    if (isEntry) {
      ast = getAST(fileName)
    } else {
      ast = getAST(path.join(process.cwd(), '../src', fileName))
    }
    return {
      fileName,
      dependencis: getDependencis(ast),
      code: transform(ast)
    }
  }
  emitFile() {
    /* 
      通过this.modules 构建可以执行的文件，类似webpack
     */
    const module = this.modules.reduce((str, module) => {
      return str += `'${module.fileName}': function(require, module, exports){${module.code}} , `
    }, '')
    // const bundle = `(function(module){
    //   const require = function(fileName) {
    //     const fn = module[fileName]
    //     const module = { exports: {} }
    //     fn(require, module, module.exports)
    //     return module.exports
    //   } 
    //   require('${this.entry}')
    // })({${module}})`
    const bundle = `
    (function(modules) {
        function require(fileName) {
            const fn = modules[fileName];

            const module = { exports : {} };

            fn(require, module, module.exports);

            return module.exports;
        }

        require('${this.entry}');
    })({${module}})
`;

    fs.writeFileSync(path.join(this.output.path, this.output.fileName), bundle, 'utf-8')
  }
}