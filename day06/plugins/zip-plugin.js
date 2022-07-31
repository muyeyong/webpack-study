module.exports = class Zip {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    console.log('startup zipPlugin')
  }
}