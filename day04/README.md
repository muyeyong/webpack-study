## webapck构建优化

### 使用webpack内置的stats

```js
// 在package.json中使用 stats，可以生成一个json文件
{
  "scripts": {
    "build:stats": "webapck --env production --json > stats.json"
  }
}
```

​	缺点：

​		颗粒度比较粗，不能分析出具体那一部分导致体积大、速度慢

### 速度分析

​	使用[speed-measure-webpack-plugin](https://www.npmjs.com/package/speed-measure-webpack-plugin)，进行速度分析

![](https://s2.loli.net/2022/07/25/4I7sHGChoStnQWg.png)

​	问题：

​			mini-css-extract-plugin报错： https://github.com/stephencookdev/speed-measure-webpack-plugin/issues/167#issuecomment-976836861

### 体积分析

​	使用[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)

### 使用高版本Webpack 和 nodejs

​	高版本优化好点

### 多进程/多实例构建

​	使用 [thread-loader](https://webpack.docschina.org/loaders/thread-loader/#root)

​	![](https://s2.loli.net/2022/07/26/jgLPd3QqmlJsyv1.png)

### 多进程压缩代码

​	使用[TerserWebpackPlungin](https://webpack.docschina.org/plugins/terser-webpack-plugin/#parallel)，之前也用来做代码压缩，默认打开多进程压缩，通过**[`parallel`](https://webpack.docschina.org/plugins/terser-webpack-plugin/#parallel)**配置，默认为true

![](https://s2.loli.net/2022/07/26/dfXptVe5xzvSaNF.png)

速度上还是有提升的。

### 预编译资源模块

​	https://webpack.docschina.org/plugins/dll-plugin#root

​	一些基础库可以提前处理完或者使用缓存，这就是怎么处理变或不变的东西

​	DllPlugin 和 DllReferencePlugin

​	webapck5已经不需要使用了，很多优化很大程度都是用时间换空间或空间换时间，不变量怎么处理、加载最小需要的

### 利用缓存提高二次构建的效率



### 缩小构建目标

​	指定那些目录不需要编译

​	重新指定打包的查找目录

### 擦除无用的CSS

​	使用[purgecss-webpack-plugin](https://www.npmjs.com/package/purgecss-webpack-plugin)，虽然去除了没有使用的css，但打包时间变长了

### 图片压缩

​	使用[image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader)



### 动态Polyfill

​	使用[polyfill-service](https://github.com/Financial-Times/polyfill-service)，通过识别`User-Agent`来识别浏览器，根据不同的浏览器返回需要的polyfill，需要注意的是需要设计兜底方案，如果polyfill返回出错，需要返回全部的polyfill



### 待解决

​	assets来替换rules file-loader、url-loader

​	