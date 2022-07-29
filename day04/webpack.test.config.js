const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require('glob');

const setMPA = () => {
  const entry = {};
  const HtmlWebpackPluginArray = [];
  const page = glob.sync(path.join(`${__dirname}/src/page/*/index.jsx`));
  page.forEach((entryFile) => {
    const match = entryFile.match(/src\/page\/(.*)\/index.jsx$/);
    const pageName = match[1];
    entry[pageName] = entryFile;
    HtmlWebpackPluginArray.push(
      new HtmlWebpackPlugin({
        template: path.join(__dirname, `/src/page/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: ['vendor', 'common', pageName],
        inject: true,
        // minify: {
        //   html5: true,
        //   collapseWhitespace: true,
        //   preserveLineBreaks: false,
        //   minifyCSS: true,
        //   minifyJS: true,
        //   removeComments: false,
        // },
      }),
    );
  });
  return { entry, HtmlWebpackPluginArray };
};

// const { entry, HtmlWebpackPluginArray } = setMPA();
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/test.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  // devtool: 'cheap-module-source-map',
  optimization: {
    // usedExports: true,
    // // minimize: true,
    // splitChunks: {
    //   chunks: 'all',
    //   minSize: 20000,
    //   minRemainingSize: 0,
    //   minChunks: 1,
    //   maxAsyncRequests: 30,
    //   maxInitialRequests: 30,
    //   enforceSizeThreshold: 50000,
    //   cacheGroups: {
    //     commons: {
    //       test: /(react|react-dom)/,
    //       name: 'vendor',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },
  module: {
    // rules: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     exclude: /node_modules/,
    //     use: 'babel-loader',
    //   },
    //   {
    //     test: /\.css$/,
    //     use: ['style-loader', 'css-loader'],
    //   },
    //   {
    //     test: /\.less$/,
    //     use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader'],
    //   },
    //   {
    //     test: /.(png|jpg|gif|jpeg)$/,
    //     use: 'file-loader',
    //   },
    // ],
  },
  // plugins: [
  //   ...HtmlWebpackPluginArray,
  // ],
};
