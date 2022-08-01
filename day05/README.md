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

参考： https://juejin.cn/post/7031546400034947108

### Tapable插件架构与hook设计

​		`tapable`中的事件可以分为同步和异步两种执行方式，`sync`同步，`async`异步，同步的钩子`tab`是唯一的注册方法，通过`call`触发同步钩子执行。异步的钩子可以通过`tap tapAsync tapPromise`三种方式来注册，同时可以通过对应的`call callAsync promise`三中方式来触发对应的注册函数。

​	问题：

​		webpack中的plugin也是使用tapable实现在不同阶段执行对应的代码，webpack都有哪些阶段，找一个复杂点的plugin看下怎样实现的·。。

​	参考： https://juejin.cn/post/7040982789650382855	

### 编写简单的webpack

​	AST(抽象语法树)应用： 模板引擎; es6 ===> es5、TS ==> JS等

​	**实现目标：**

​		**将ES5转换成ES5语法**

​			通过babylon生成AST   @babel/parser

​			通过babel-core将AST生成源码

​		**可以分析模块间的依赖关系*

​			通过babel-traverse的 importDeclaration方法获取依赖属性  transformFromAstSync

​		**生成的JS在浏览器可运行**

​	**过程：**

​		教程里面其实只是利用ast分析模块之间的依赖关系，最后执行还是源码，跟webpack还是不一样

​		分析webpack打包结果

​	**问题：**

* es的模块化是静态的，不能在if else里面写	

*  `@babel/preset-env`和`babel-preset-env`的区别

​		[这里面](https://www.jiangruitao.com/babel/babel-preset-env/)提到两者只是在不同版本的不同称呼 `在Babel6时代，这个预设名字是 babel-preset-env，在Babel7之后，改成@babel/preset-env。; Babel7 为了区分之前的版本，所有的包名都改成了 @babel/... 格式`

​			

