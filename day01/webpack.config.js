const path = require('path')
module.exports = {
  mode: 'production',
  watch: true,
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: 'babel-loader'
     },
     {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.less$/,
      use:['style-loader', 'css-loader','less-loader']
    },
    {
      test: /.(png|jpg|gif|jpeg)$/,
      use: 'file-loader'
    }
   ],
  }
}