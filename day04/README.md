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

### 体积分析

