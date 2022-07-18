const path = require('path')
const miniCssEtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinmizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const glob = require('glob')

const setMPA = () => {
  let entry = {}
  let HtmlWebpackPluginArray = []
  const page = glob.sync(path.join(__dirname + '/src/page/*/index.js'))
  page.forEach(entryFile => {
    const match = entryFile.match(/src\/page\/(.*)\/index.js$/)
    const pageName = match[1]
    entry[pageName] = entryFile
    HtmlWebpackPluginArray.push( 
      new HtmlWebpackPlugin({
      template: path.join(__dirname, `/src/page/${pageName}/index.html`),
      filename: `${pageName}.html`,
      chunks: [ pageName],
      inject: true,
      minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false
      }
    }))
  })
  return { entry, HtmlWebpackPluginArray }
}

const {entry, HtmlWebpackPluginArray} = setMPA()

module.exports = {
  mode: 'production',
  entry,
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
    new CleanWebpackPlugin(),
    ...HtmlWebpackPluginArray
  ]
}