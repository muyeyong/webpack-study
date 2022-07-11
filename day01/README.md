# webpack的基本使用
  ## entry

​	指定webpack打包的入口，可以是单入口也可以是多入口

```js
// 单入口
{
  entry: '/xxx/xx.js'
}
// 多入口
{
  entry: {
    index: '/xxx/xx.js',
    search: '/xxx/xx.js'
  }
}
```

 ## output

​	指定打包文件输出路径，需要指定文件名和路径，只能指定一个路径

```js
{
  output: {
    path: 'dist',
    filename: 'bundle.js' // 如果是多入口，可以使用[name].js
  }
}
```

  ## plugins

```js
{
  plugins: ['插件']
}
```

  ## loader

```js
module: {
  rules:[
    {
      test: '/\.jsx$/', // 匹配什么类型的文件
      use: '', // 使用对应的modiles解析
    }
	]
}
```

## mode

提供 production、none 和 development三个选项，使用不同的选项可以开启不同的优化

具体是什么优化？

  ## 不同文件的打包

webpack默认只支持js和json的打包

es6

​	babel-loader解析

​	@babel/core  @bable/preset-env

jsx

css

less、sass

图片、字体

  ## 热更新
  ## 文件后缀hash

hash

cintentHash

 ##  代码混淆(压缩)

