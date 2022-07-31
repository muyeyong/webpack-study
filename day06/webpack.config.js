const path = require('path')
const ZipPlugin = require('./plugins/zip-plugin.js')

module.exports ={
  entry: path.join(__dirname, './src/index.js'),
  output:{
    filename: 'main.js',
    path: path.join(__dirname, './dist')
  },
  mode: 'development',
  plugins: [
    new ZipPlugin({
      fileName: 'test'
    })
  ]
}