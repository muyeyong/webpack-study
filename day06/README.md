## loader 实践

### loader执行顺序及链式调用

​	loader实质上是一个javascript代码块，可以使用`webpack-cli`实现一个loader

#### 执行顺序

​	loader的执行顺序是从右到左

​	函数组合的两种方式：

​		unix中的pipline：从左到右执行

​		Compose(webapck采用)： compose = (f, g)  => (...args) => f(g(...args))

#### 链式调用	

​	`b-loader` 执行的结果会传递到`a-loader`

```js
{
  module: {
    rules: [
      {
        test: '/\.js$/',
        use: [
          'a-loader',
          'b-loader'
        ]
      }
    ]
  }
}
```

### 使用loader-runner 高效进行loader测试

​	使用[loader-runner](https://www.npmjs.com/package/loader-runner)可以不使用webpack就可以对loader进行测试开发，loader-runner提供了一个wenapck环境

​	没有提供this.emitFile方法？

### 复杂的loader开发场景

#### 获取options参数

​	[loader-utils](https://www.npmjs.com/package/loader-utils)的*getOptions*获取

#### 异步处理

​	`this.async(data)`来处理异步结果

```js
fs.readFile('/sec/index.js', 'utf-8', (err, data) => {
  err? this.callBaclk(err) : this.async(data)
})
```



#### 错误处理 & 返回结果

​	`this.callBack(err, data, ...)`可以处理错误和返回结果(返回结果也可以使用return)，返回结果可以是多个

#### 文件输出

​	`this.emitFile(url, content)`

### 开发一个雪碧图loader

​	使用[spritesmith](https://www.npmjs.com/package/spritesmith)对图片进行合成，匹配css中background: url(xxx.png__sprite)，然后进行替换url，还需要调整图片位置

### 插件基本介绍

​	需要提供apply方法，传入compiler，可以利用compiler.hook监听不同周期进行相应的处理

​	



