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

​	什么情况下开启：mode: production

​	代码删除原则

​			DCE（Dead Code Elimination）

​				代码不会被执行，不可到达

​				代码结果不会被用到

​				代码只会影响死变量(只写不读)

​	不支持CommonJS，支持ESM，CJS的require可以动态导入， ESM的import是静态的 ??

​	uglify阶段删除代码

​	代码不能有副作用，存在副作用不能被tree shaking

### Scope Hoisting

​	减少函数的作用域，webpack会把每个使用的function单独打包成一个闭包函数，scope hoisting可以将引用的function内联起来，减少闭包的数量，但是一个function被引用还是会被打包成一个单独的闭包

实践相互引用处理 a -> b, b -> a

### 代码分割和动态import

​	ejs： requore.ensure

​	es6: 需要babel plugin支持

​	jsonP 加载进来

### 在webpack使用ESlint

​	eslint-loader  --->  eslint-webpack-plugin

​	如果检查出错误，怎么快速修复

### Webpack打包组件和基础库

​	需要支持什么样的引用方式	

​	针对不同环境打包，压缩版 非压缩版

​	npm -S 实际需要用的 -D相反

### Webpack SSR打包

​	浏览器、 服务端(node)代码兼容

​	require('xxx.less') 没办法解析，样式不生效： 用webapck生成的模板

​		

### 优化构建命令行显示日志

​	webpack.config.js --> stus

​	friendly-errors-webpack-plugin

### 构建异常中断处理

