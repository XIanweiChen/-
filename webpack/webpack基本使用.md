引用：

https://www.jianshu.com/p/2c781b389efa

https://www.jianshu.com/p/fe82a3107967



**output.publicpath**:在运行时对urls的引用加上publicpath(The value of the option is prefixed to every URL created by the runtime or loaders)

sourcemap:记录压缩前后的位置,当产生错误时直接定位到未压缩前的位置，将大大的方便我们调试。



### 1.1.webpack运行机制概述

初始化配置参数 -> 绑定事件钩子回调 -> 确定Entry逐一遍历 -> 使用loader编译文件 -> 输出文件

### 什么是webpack事件流？

- Webpack 就像一条生产线，要经过一系列处理流程后才能将源文件转换成输出结果

- 插件就像是一个插入到生产线中的一个功能，在特定的时机对生产线上的资源做处理

- Webpack 在运行过程中会广播事件，插件只需要监听它所关心的事件，就能加入到这条生产线中，去改变生产线的运作。

- webpack的事件流是通过 **Tapable** 实现的

  

### 1.2.2.webpack运行流程详解 

- 首先，webpack会读取你在命令行传入的配置以及项目里的 `webpack.config.js` 文件，初始化本次构建的配置参数，并且执行配置文件中的插件实例化语句，生成Compiler传入plugin的apply方法，为webpack事件流挂上自定义钩子。
- 接下来到了entryOption阶段，webpack开始读取配置的Entries，递归遍历所有的入口文件
- Webpack进入其中一个入口文件，开始compilation过程。先使用用户配置好的loader对文件内容进行编译（buildModule），我们可以从传入事件回调的compilation上拿到module的resource（资源路径）、loaders（经过的loaders）等信息；之后，再将编译好的文件内容使用acorn解析生成AST静态语法树（normalModuleLoader），分析文件的依赖关系逐个拉取依赖模块并重复上述过程，最后将所有模块中的 `require` 语法替换成 `__webpack_require__` 来模拟模块化操作。
- emit阶段，所有文件的编译及转化都已经完成，包含了最终输出的资源，我们可以在传入事件回调的 `compilation.assets` 上拿到所需数据，其中包括即将输出的资源、代码块Chunk等等信息。

### 1.2.3.什么是AST?

**抽象语法树（Abstract Syntax Tree，AST）**

是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

**转换成AST的目的就是将我们书写的字符串文件转换成计算机更容易识别的数据结构，这样更容易提取其中的关键信息**

### 2.2.4.loaders的执行顺序

我们的 use 里不只有一个loader，这些loader的执行顺序是**从后往前**的，你也可以把它理解为这个loaders数组的出栈过程。

### 2.编写自定义webpack loader

编写loader:

```js
const loaderUtils = require("loader-utils");

module.exports = function(content){
    const options = loaderUtils.getOptions(this);   //获取传入的option
    console.log(options,content)
    //对输入内容进行处理
   this.callback(null,content)  //返回的内容
}
```

配置自己的loader：

```js
{
  test: /\.txt$/,
    use: {
      loader: './loader/myLoader',
        options:{
          test:1
        }
    }

}
```

打包输出：

```js
/***/ "./src/a.txt":
/*!*******************!*\
  !*** ./src/a.txt ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("asdmlkasmdlkam\n\n//# sourceURL=webpack:///./src/a.txt?");
```



### 2.2.2.loader导出数据的形式

```js
this.callback(
  err: Error | null,
  content: string | Buffer,
  sourceMap?: SourceMap,
  meta?: any
);
```



`this.callback` 可以传入四个参数（其中后两个参数可以省略），他们分别是：

- error：Error | null，当loader出错时向外跑出一个Error
- content：String | Buffer，经过loader编译后需要导出的内容
- sourceMap：为方便调试生成的编译后内容的source map
- ast: 本次编译生成的AST静态语法树，之后执行的loader可以直接使用这个AST，可以省去重复生成AST的过程

### 2.2.5.loader缓存

webpack增量编译机制会观察每次编译时的变更文件，在默认情况下，webpack会对loader的执行结果进行缓存，这样能够大幅度提升构建速度

### 3.2.什么是webpack plugin

如果剖析webpack plugin的本质，它实际上和webpack loader一样简单，其实它只是一个带有apply方法的class。



#### `Plugin`和`Loader`的区别:

1. `Loader`：处理某种类型文件。
2.   `Plugin`：在打包的某一个时刻做一些事情。
3.   `webpack`源码中有很大一部分都是基于`Plugin`机制编写的。

#### `compiler` 钩子    [文档](https://www.webpackjs.com/api/compiler-hooks/)

`Compiler` 模块是 `webpack` 的支柱引擎，它通过 [CLI](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.webpackjs.com%2Fapi%2Fcli) 或 [Node API](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.webpackjs.com%2Fapi%2Fnode) 传递的所有选项，创建出一个 `compilation` 实例。它扩展(`extend`)自 `Tapable` 类，以便注册和调用插件。大多数面向用户的插件首，会先在 `Compiler`上注册。
作者：nimw链接：https://www.jianshu.com/p/fe82a3107967来源：简书简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。

#### `compilation` 钩子  

`Compilation` 模块会被 `Compiler` 用来创建新的编译（或新的构建）。`compilation` 实例能够访问所有的模块和它们的依赖（大部分是循环依赖）。它会对应用程序的依赖图中所有模块进行字面上的编译(literal compilation)。在编译阶段，模块会被加载(loaded)、封存(sealed)、优化(optimized)、分块(chunked)、哈希(hashed)和重新创建(restored)。

`Compilation` 类扩展(extend)自 `Tapable`，并提供了以下生命周期钩子。可以按照 compiler 钩子的相同方式，调用 tap：

```js
compilation.hooks.someHook.tap(...)
```

和 `compiler` 用法相同，取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和 `tapPromise`。

#### 相关钩子

 以下生命周期钩子函数，是由 `compiler` 暴露，可以通过如下方式访问：
 `compiler.hooks.someHook.tap(...)`
 取决于不同的钩子类型，也可以在某些钩子上访问 `tapAsync` 和`tapPromise`。
 (1) `AsyncSeriesHook`表示异步的钩子，使用`tapAsync` 或`tapPromise`监听。
 (2) `SyncHook`表示同步的钩子，使用`tap`监听。

|   钩子    |       类型        |                           执行时机                           |        参数         |
| :-------: | :---------------: | :----------------------------------------------------------: | :-----------------: |
| `compile` |    `SyncHook`     | 一个新的编译(`compilation`)创建之后，钩入(`hook into`) `compiler`。 | `compilationParams` |
|  `emit`   | `AsyncSeriesHook` |                生成资源到 `output` 目录之前。                |    `compilation`    |
|  `done`   |    `SyncHook`     |                  编译(`compilation`)完成。                   |       `stats`       |
|    ...    |        ...        |                             ...                              |         ...         |

#### 编写自己的plugin

```js
class myPlugin {
    constructor(options){
        //用户自定义配置
        this.options = options
        console.log(this.options)
    }
    apply(compiler) {
        console.log("This is my first plugin.")
    }
}

module.exports = myPlugin
```

配置

```js
plugins:[new myPlugin('ndnaisd')]
```



##### 使用compiler的plugin

```js
class CopyRightWebpackPlugin {
  constructor(options) {
    //console.log(options) 
  }

  apply(compiler) {
    //compile为同步的钩子，使用tap监听
    compiler.hooks.compile.tap('CopyRightWebpackPlugin', (compilationParams) => {
      console.log('compile');
    })

    //emit为异步的钩子，使用tapAsync或tapPromise监听
    compiler.hooks.emit.tapAsync('CopyRightWebpackPlugin', (compilation, cb) => {
      compilation.assets['copyright.txt'] = {
        source: function () {
          return 'copyright by cxw'
        },
        size: function () {
          return 22
        }
      }
      cb()
    })
  }
}

module.exports = CopyRightWebpackPlugin
```





### 六. 总结

1.  `webpack`和`grunt`和`gulp`有什么不同？
    `webpack`是一个模块打包器，他可以递归的打包项目中的所有模块，最终生成几个打包后的文件。他和其他的工具最大的不同在于他支持`code-splitting`、模块化(`AMD`、`ES Module`、`CommonJS`)、全局分析。
2. 什么是`module`，什么是`chunk`，什么是`bundle`？
    `module`是开发中的单个模块。
    `chunk`是指`webpack`在进行模块的依赖分析的时候，分割出来的代码块。
    `bundle`是由`webpack`打包出来的文件。
3. 什么是`Loader`，什么是`Plugin`？
    `Loader`是用来告诉`webpack`如何转化处理某一类型的文件，并且引入到打包出的文件中。
    `Plugin`是用来自定义`webpack`打包过程的方式，一个插件是含有
    `apply`方法的一个对象，通过这个方法可以参与到`webpack`打包的整个生命周期。
4.  `webpack-dev-server`和`http`服务器(例如：`nginx`)有什么区别？
    `webpack-dev-server`使用内存来存储`webpack`开发环境下的打包文件，并且可以使用模块热更新。