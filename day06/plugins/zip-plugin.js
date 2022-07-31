const zip = new require('jszip')()
const RawSource = require('webpack-sources').RawSource;
module.exports = class Zip {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('ZipPlugin', (compilation, callback) => {
      /* 
        获取资源
        打包
        将打包结果挂载到asset上
       */

      // console.log(compilation.assets)
      const zipFolder = zip.folder(this.options.fileName)
      for (let assetName in compilation.assets) {
        const source = compilation.assets[assetName].source()
        zipFolder.file(assetName, source)
      }
      zip.generateAsync({ type: 'nodebuffer'}).then(content => {
        compilation.assets[`${this.options.fileName}.zip`] = new RawSource(content)
        callback()
      })
    })
  }
}