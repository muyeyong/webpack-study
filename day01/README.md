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

## 文件监听

启动是时候命令行加上 --watch or 在配置里面添加 watch: true

调用nodejs fs模块检测文件内容有没有改变

```
{
	watch: true;
	watchOptions: {
		ingore: /node_modules/, // 不监听的文件
		aggregateTimeout: 300, // 检查到变化后多久执行重新打包
		poll: 1000, // 隔多久检查
	}
}
```



  ## 热更新

​	HMR: hot module replacement ---> bundle server

​	WDS: webpack dev server ---> HMR server 、HRM Runtime

HMR 和 WDS配和使用： WDS提供链接访问资源的方法，HMR 实现了热更新的功能，检测到文件变化，就可以更新

HMR 与 watch的区别

​	存放位置不一样： HMR输出的文件放在内存中

​	不需要刷新浏览器

HMR的原理

​	HMR server 服务端监听变化，通过ws将变化传给客服端(浏览器) HRM Runtime

​	



  ## 文件后缀hash

hash

cintentHash

 ##  代码混淆(压缩)

