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

​	实现目标：

​		**将ES5转换成ES5语法**

​			通过babylon生成AST   @babel/parser

​			通过babel-core将AST生成源码

​		**可以分析模块间的依赖关系**

​			通过babel-traverse的 importDeclaration方法获取依赖属性  transformFromAstSync

​		**生成的JS在浏览器可运行**

​	问题：

​		es的模块化是静态的，不能在if else里面写	

