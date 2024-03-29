const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');
const ESlintPlugin = require('eslint-webpack-plugin');

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPluginArray = [];
  const page = glob.sync(path.join(`${__dirname}/src/page/*/index.js`));
  page.forEach((entryFile) => {
    const match = entryFile.match(/src\/page\/(.*)\/index.js$/);
    const pageName = match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPluginArray.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `/src/page/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendor', pageName],
        inject: true,
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    );
  });
  return { entry, HtmlWebpackPluginArray };
};

const { entry, HtmlWebpackPluginArray } = setMPA();
module.exports = {
  mode: 'development',
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  devServer: {
    static: [path.join(__dirname, 'dist')],
    compress: true,
    hot: false,
    port: 9000,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        commons: {
          test: /(react|react-dom)/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
      },
      {
        test: /.(png|jpg|gif|jpeg)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ESlintPlugin({
      fix: true,
    }),
    ...HtmlWebpackPluginArray,
  ],
};
