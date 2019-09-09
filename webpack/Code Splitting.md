# [Code Splitting](https://webpack.docschina.org/guides/code-splitting/)

There are three general approaches to code splitting available:

- Entry Points: Manually split code using [`entry`](https://webpack.js.org/configuration/entry-context) configuration.
- Prevent Duplication: Use the [`SplitChunksPlugin`](https://webpack.js.org/plugins/split-chunks-plugin/) to dedupe and split chunks.
- Dynamic Imports: Split code via inline function calls within modules.

### 1&2

webpack.config.js

```js
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        message: './src/message.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[new CleanWebpackPlugin() ],
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    }
}
```

index.js

```js
import _ from 'lodash'
import './word'
console.log('index')
```

message.js

```js
import _ from 'lodash'
import './word'
console.log('message')
```

```bash
chenxianweideMacBook-Pro:my-webpack knj$ webpack
Hash: 94dbe13fa8be3ba086be
Version: webpack 4.35.0
Time: 361ms
Built at: 2019-09-06 11:00:28 AM
                   Asset      Size                 Chunks             Chunk Names
                index.js  7.36 KiB                  index  [emitted]  index
              message.js  7.38 KiB                message  [emitted]  message
vendors~index~message.js   548 KiB  vendors~index~message  [emitted]  vendors~index~message
Entrypoint index = vendors~index~message.js index.js
Entrypoint message = vendors~index~message.js message.js
[../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/global.js] (webpack)/buildin/global.js 472 bytes {vendors~index~message} [built]
[../../../../../../../../../usr/local/lib/node_modules/webpack/buildin/module.js] (webpack)/buildin/module.js 497 bytes {vendors~index~message} [built]
[./src/index.js] 59 bytes {index} [built]
[./src/message.js] 61 bytes {message} [built]
[./src/word.js] 28 bytes {index} {message} [built]
    + 1 hidden module
```



![image-20190906110015058](/Users/ccc/Library/Application Support/typora-user-images/image-20190906110015058.png)

把共同的模块提取出来放在了`vendors~index~message.js`中

### 3.动态导入(dynamic imports) 

```js
const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].js',
        chunkFilename: '[name].bundle.js',   //name为导入的包名
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[new CleanWebpackPlugin() ],
}
```

```js

  function getComponent() {
//注意当调用 ES6 模块的 import() 方法（引入模块）时，必须指向模块的 .default 值，因为它才是 promise 被处理后返回的实际的 module 对象。
    
    return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
      var element = document.createElement('div');
 
      element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
      return element;
 
    }).catch(error => 'An error occurred while loading the component');
  }

  getComponent().then(component => {
    document.body.appendChild(component);
  })
```

### 预取/预加载模块(prefetch/preload module)

在声明 import 时，使用下面这些内置指令，可以让 webpack 输出 "resource hint(资源提示)"，来告知浏览器：

- prefetch(预取)：将来某些导航下可能需要的资源
- preload(预加载)：当前导航下可能需要资源

**LoginButton.js**

```js
//...
import(/* webpackPrefetch: true */ 'LoginModal');
```

这会生成 `<link rel="prefetch" href="login-modal-chunk.js">` 并追加到页面头部，指示着浏览器在闲置时间预取 `login-modal-chunk.js` 文件。

与 prefetch 指令相比，preload 指令有许多不同之处：

- preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。
- preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。
- preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。
- 浏览器支持程度不同。

