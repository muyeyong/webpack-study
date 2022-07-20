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

​	两种方案：

​		px2rem-loader/ postcss-pxtorem + lib-flexible

![](https://s2.loli.net/2022/07/17/l9YkLu1TFZnHqVK.png)

```js
// postcss.config.js
module.exports = {
  plugins: [
    ['autoprefixer'],
    [
      'postcss-pxtorem',
        {
        rootValue: 75,
        minPixelValue: 2,
        propList: ['*'],
      }
    ]
  ],
};
```

​		上面的操作就可以将px转换成rem，还需要做的是设置根元素(html)的font-size

​			lib-flexible实现： 使用cdn引入 or 资源内联

```js
// 资源内联 
<script  type="text/javascript">
<%= require('raw-loader!babel-loader!../node_modules/lib-flexible/flexible.js').default %>
  </script>

// 自定义脚本
 <script type="text/javascript">
    window.addEventListener('resize', () => {
      const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
       document.querySelector('html').style.fontSize = deviceWidth / 7.5 + 'px'
    })
  </script> 
// cdn
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/lib-flexible@0.3.2/flexible.js"></script>
```

​		解决手机端的1px

postcss-px-to-viewport

​	https://www.cnblogs.com/zhangnan35/p/12682925.html

​	将px转换成vh vw，推荐使用

​	

### 静态资源内联

​	https://webpack.docschina.org/guides/asset-modules/

js、html内联

​	raw-loader

​	如果引用的脚本使用了es6的语法，需要使用babel-loader转义

```js
// 最新版的 raw-loader 可以这样用：
<%= require('raw-loader?esModule=false!./static/js/flexible.js') %> 或
<%= require('raw-loader!./static/js/flexible.js').default %>
```

css内联

​	style-loader / html-inline-css-webpack-plugin

### 多页面应用打包

​	多页应用的优势：

​		页面解耦

​		SEO更好

​	实现：

​		使用`glob`读取指定的文件夹，将里面的文件当成一个入口，实现entry 和 htmlWebpackPlugin批量生成

```js
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
```



​	遇到的问题：

![](https://s2.loli.net/2022/07/18/oydIG1O4wNkhEnq.png)

### sourceMap

​	为什么需要sourceMap?

​		实际上运行的代码跟原始代码存在差异，比如进行了压缩、转义，sourceMap就能起到一个连接作用，将实际运行的代码跟源码对应起来。在webpack通过`devTool`控制sourceMap的生成。

| 值         | 作用                                 |
| ---------- | ------------------------------------ |
| eval       | 使用eval包裹代码                     |
| source map | 产生.map文件                         |
| cheap      | 不包含列信息                         |
| inline     | 将.map嵌入bundle，不单独生成.map文件 |
| module     | 包含loader的source map               |

上面的5个值可以相互组合

https://webpack.docschina.org/configuration/devtool/#root

### 提取公共资源

​	可以抽离基础包和被引用次数多的模块

https://webpack.docschina.org/plugins/split-chunks-plugin#root

使用SplitChunksPlugin	

```js
optimization: {
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
```

`cacheGroups`里面有两个缓存组，可以打包出两个bundle，注意`test`的内容，第一个是筛选路径包含`/src/comon`的文件，第二个是筛选`react | react-dom`

![](https://s2.loli.net/2022/07/20/Pgzfue7Y4E5JcSF.png)

​	问题：

​		使用`HtmlWebpackPlugin`的chunks限制引入的chunck，就算不把chunk的名字加入到chunks也是引用，就是说chunks不能限制chunk的引用。

### Tree Shaking

​	什么情况下开启：mode: production

​	过程： 先标记 ---> 剔除(terser, 压缩的代码才会剔除)

​	代码删除原则

​			DCE（Dead Code Elimination）

​				代码不会被执行，不可到达

​				代码结果不会被用到

​				代码只会影响死变量(只写不读)

​	不支持CommonJS，支持ESM，CJS的require可以动态导入， ESM的import是静态的 ??

​	uglify阶段删除代码

​	代码不能有副作用，存在副作用不能被tree shaking

​	需要注意的地方：

​		使用ES2015模板语法(import 和 export)

​		确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细		信息请参阅[文档](https://babeljs.io/docs/en/babel-preset-env#modules) ，**@babel/preset-env: ^7.18.6 ，没有这个问题**

​		在项目的 `package.json` 文件中，添加 `"sideEffects"` 属性

实践：

​	将`webpack.pro.config.js`中的mode设置为none，如果是production是开启tree shaking![](https://s2.loli.net/2022/07/20/VQiypsY3qWj1AmL.png)

![](https://s2.loli.net/2022/07/20/uImenQTtLRKzSqX.png)

使用tree shaking

![](https://s2.loli.net/2022/07/20/uwLFcAWQglt84Ua.png)

​	是不是注意使用了tree shaking的结果是被压缩的，最开始没有使用压缩，然后tree shaking死活不生效，查了资料说要压缩代码，但这个还没结束，我在optimization使用了css的压缩，webpack5自带的[js压缩](https://webpack.docschina.org/plugins/terser-webpack-plugin/)没有生效，需要显示声明才有效

```js
 optimization: {
    minimizer: [
      new CssMinmizerPlugin(),
      new TerserPlugin()
    ]
 }
```



### Scope Hoisting

​	分析出模块之间的依赖关系，尽可能将打散的模块合并到一个函数中，前提是不能造成代码冗余，作用域提升。

​	减少函数的作用域，webpack会把每个使用的function单独打包成一个闭包函数，scope hoisting可以将引用的function内联起来，减少闭包的数量，但是一个function被引用还是会被打包成一个单独的闭包

​	需要分析出模块之间的关系，需要使用ES6模块语句

​	参考：https://juejin.cn/post/6850418110983241741

### 代码分割和动态import

​	ejs： requore.ensure

​	es6: 需要babel plugin支持

​	jsonp 加载进来

​	实践：

​		

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

