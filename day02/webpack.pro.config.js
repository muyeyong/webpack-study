const path = require('path')
const miniCssEtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinmizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js',
    search: './src/search.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].bundle.js',
    clean: true
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
      use:[
        miniCssEtractPlugin.loader, 
        'css-loader',
        'less-loader', 
        'postcss-loader'
        // {
        //   loader: 'postcss-loader',
        //   options: {
        //     postcssOptions: {
        //       plugins: [[
        //         'autoprefixer',
        //       ]]
        //     }
        //   }
        // }
      ]
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
  optimization: {
    minimizer: [
      new CssMinmizerPlugin()
    ]
  },
  plugins: [
    new miniCssEtractPlugin({
      filename: '[name]_[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: true,
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
  }),
  new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/search.html'),
      filename: 'search.html',
      chunks: ['search'],
      inject: true,
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
    }),
    // new CleanWebpackPlugin()
  ]
}