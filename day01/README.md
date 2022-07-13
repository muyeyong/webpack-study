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

​	需要在根目录的.bablerc文件类使用

```js
{
  "presets": [
      "@babel/preset-env" // 解析es6
  ]
}
```

jsx

​	.babelrc添加对react的解析

```js
{
  "presets": [
      "@babel/preset-react" // 解析react
  ]
}
```

css、less、sass解析

​	将css解析成commonjs对象，然后插入到js的head，需要使用 css-loader: 用于解析css 、style-loader: 通过style样式插入到head中(不是单独一个文件)。

他们之间存在顺序调用，从右向左

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['styale-loader', 'css-loader']
    }
  ]
}
```



![](https://s2.loli.net/2022/07/13/FLC13gJ6hVjHwrD.png)

图片、字体

​	使用file-loader解析

  ## 热更新
  ## 文件后缀hash

hash

cintentHash

 ##  代码混淆(压缩)

