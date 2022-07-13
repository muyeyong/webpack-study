const path = require('path')
const miniCssEtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].bundle.js',
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
      use: [miniCssEtractPlugin.loader, 'css-loader']
    },
    {
      test: /\.less$/,
      use:[miniCssEtractPlugin.loader, 'css-loader','less-loader']
    },
    {
      test: /.(png|jpg|gif|jpeg)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name]_[contenthash].[ext]'
          }
        }
      ]
    }
   ],
  },
  plugins: [
    new miniCssEtractPlugin({
      filename: '[name]_[contenthash].css'
    })
  ]
}