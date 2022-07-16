可以用 vw，vh方案，加上PostCSS 中的 postcss-px-to-viewport 再结合 flex布局。

## webpack 进阶

### 自动清理构建产物

​	可以使用`clean-webpack-plugin`，webpack5 可以直接使用 [output.clean](https://webpack.docschina.org/configuration/output/#outputclean)

​	思考：

​		开发环境使用热更新是不是不需要自动清理了

### 补全css3前缀

​		`postCSS`是使用javascript转换css的工具，有别于sass、less等预处理器，`postCss`针对的是css的后续处理，` autoprefixer`可以为css增加前缀，需要配合`.browerslistrc`(设置需要兼容的浏览器版本)使用，`postCss`还可以用`postcss.config.js`进行配置。

```js
module:{
  rules: {
    test: '/\.less$/',
    use: [
      ...
       {
      test: /\.less$/,
      use:[
        miniCssEtractPlugin.loader, 
        'css-loader',
        'less-loader', 
        'postcss-loader' // 使用了postcss.config.js
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
      ...
    ]
  }
}
// postcss.config.js，放在根目录就好
    module.exports = {
  plugins: [
    [
      'autoprefixer', // 配合 .browerslistrc使用
      {
        // 其他选项
      },
    ],
  ],
};
  
// .browerslistrc
  last 2 version 
	> 1% 
	IE 10
```



​	https://webpack.docschina.org/loaders/postcss-loader/

### 移动端适配

### 静态资源内联

### 多页面应用打包

### sourcemap

### 提取公共资源

### Tree Shaking

### Scope Hoisting

### 代码分割和动态import

### 在webpack使用ESlint

### Webpack打包组件和基础库

### Webpack SSR打包

### 优化构建命令行显示日志

### 构建异常中断处理

