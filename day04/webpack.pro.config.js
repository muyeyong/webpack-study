const path = require('path')
const miniCssEtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinmizerPlugin = require('css-minimizer-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const ESlintPlugin = require('eslint-webpack-plugin')
const glob = require('glob')
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

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
      chunks: ['vendor','common', pageName],
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
      new CssMinmizerPlugin(),
      new TerserPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        commonGroup: {
          chunks: 'all',
          minSize: 0,
          minRemainingSize: 0,
          minChunks: 2,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          name: 'common',
          test(module) {
            const path = require('path');
            return  module.resource && module.resource.includes(`${path.sep}src${path.sep}common${path.sep}`)
          },
        },
        vendor: {
          test: /(react|react-dom)/ ,
          name: 'vendor',
          chunks: 'all',
        },
      }
    }
  },
  plugins: [
    new miniCssEtractPlugin({
      filename: '[name]_[contenthash].css'
    }),
    new ESlintPlugin({
      fix: true
    }),
    // new CleanWebpackPlugin(), // output.clean = true
    ...HtmlWebpackPluginArray
  ]
}