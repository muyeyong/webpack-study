## Webpack打包原理

### webapck启动分析

​	npm script 实际是运行什么命令

​	webpack 与 webpack cli

​		引用流程

​		问题：

​			他们具体负责那一块的

### webpack cli 源码分析

​	流程：

​			对配置文件以及命令行参数进行转换生成最终的options和output options，使用options实例化webpack对象

进行构建

### Tapable插件架构与hook设计



### 编写简单的webpack

​	AST(抽象语法树)应用： 模板引擎; es6 ===> es5、TS ==> JS等

es的模块化是静态的，不能在if else里面写