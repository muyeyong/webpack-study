const path = require('path')
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static:[path.join(__dirname, 'dist')],
    compress: true,
    hot: false,
    port: 9000,
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
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
}