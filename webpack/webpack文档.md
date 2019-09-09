# tree shaking

#### 1.在**webpack.config.js**加入配置选项

**webpack.config.js**

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
- }
+ },
+ mode: 'development',
+ optimization: {
+   usedExports: true
+ }
};
```

webpack会标记出哪些是用到的

加之前

```js
/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! exports provided: square, cube */

```

之后

```js
/***/ "./src/math.js":
/*!*********************!*\
  !*** ./src/math.js ***!
  \*********************/
/*! exports provided: square, cube */
/*! exports used: cube */
```



#### 2.将文件标记为 side-effect-free(无副作用)

 package.json:

```json
{
  "name": "your-project",
  "sideEffects": false
}
```

#### 3.压缩输出结果

通过 `import` 和 `export` 语法，我们已经找出需要删除的“未引用代码(dead code)”，然而，不仅仅是要找出，还要在 bundle 中删除它们

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
- mode: 'development',
- optimization: {
-   usedExports: true
- }
+ mode: 'production'
};
```

## 结论 

我们已经知道，想要使用 *tree shaking* 必须注意以下……

- 使用 ES2015 模块语法（即 `import` 和 `export`）。
- 确保没有 compiler 将 ES2015 模块语法转换为 CommonJS 模块（这也是流行的 Babel preset 中 @babel/preset-env 的默认行为 - 更多详细信息请查看 [文档](https://babel.docschina.org/docs/en/babel-preset-env#modules)）。
- 在项目 `package.json` 文件中，添加一个 "sideEffects" 属性。
- 通过将 `mode` 选项设置为 [`production`](https://webpack.docschina.org/concepts/mode/#mode-production)，启用 minification(代码压缩) 和 tree shaking

# 生产环境

## 配置

#### 1.安装 `webpack-merge`

```bash
npm install --save-dev webpack-merge
```

 `webpack-merge`能合并两个webpack配置文件

#### 2.配置webpack

**webpack.common.js**

```diff
+ const path = require('path');
+ const CleanWebpackPlugin = require('clean-webpack-plugin');
+ const HtmlWebpackPlugin = require('html-webpack-plugin');
+
+ module.exports = {
+   entry: {
+     app: './src/index.js'
+   },
+   plugins: [
+     new CleanWebpackPlugin(['dist']),
+     new HtmlWebpackPlugin({
+       title: 'Production'
+     })
+   ],
+   output: {
+     filename: '[name].bundle.js',
+     path: path.resolve(__dirname, 'dist')
+   }
+ };
```

**webpack.dev.js**

```diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'development',
+   devtool: 'inline-source-map',
+   devServer: {
+     contentBase: './dist'
+   }
+ });
```

**webpack.prod.js**

```diff
+ const merge = require('webpack-merge');
+ const common = require('./webpack.common.js');
+
+ module.exports = merge(common, {
+   mode: 'production',
+ });
```

#### 3.配置脚本

```diff
    "scripts": {
-     "start": "webpack-dev-server --open",
+     "start": "webpack-dev-server --open --config webpack.dev.js",
-     "build": "webpack"
+     "build": "webpack --config webpack.prod.js"
    },
```



## 指定 mode 

从 webpack v4 开始, 指定 [`mode`](https://webpack.docschina.org/concepts/mode/) 会自动地配置 [`DefinePlugin`](https://webpack.docschina.org/plugins/define-plugin)

**!!!!!无法**在构建脚本 `webpack.config.js` *中*访问



### DefinePlugin:

`DefinePlugin` 允许创建一个在**编译**时可以配置的全局常量

## 用法 

每个传进 `DefinePlugin` 的键值都是一个标志符或者多个用 `.` 连接起来的标志符。

- 如果这个值是一个字符串，它会被当作一个代码片段来使用。
- 如果这个值不是字符串，它会被转化为字符串(包括函数)。
- 如果这个值是一个对象，它所有的 key 会被同样的方式定义。
- 如果在一个 key 前面加了 `typeof`,它会被定义为 typeof 调用。

这些值会被内联进那些允许传一个代码压缩参数的代码中，从而减少冗余的条件判断。

```javascript
new webpack.DefinePlugin({
  PRODUCTION: JSON.stringify(true), //与直接true一样
  VERSION: JSON.stringify('5fa3b9'), //5fa3b9
  BROWSER_SUPPORTS_HTML5: true, //true
  TWO: '1+1',  //2
  'typeof window': JSON.stringify('object'),
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
});
```

## minification(压缩) 

设置 [`production mode`](https://webpack.docschina.org/concepts/mode/#mode-production) 配置后，webpack v4+ 会默认压缩你的代码。

生产环境下默认使用 [`TerserPlugin`](https://webpack.docschina.org/plugins/terser-webpack-plugin)

## source mapping(源码映射) 

**webpack.prod.js**

```diff
  const merge = require('webpack-merge');
  const common = require('./webpack.common.js');

  module.exports = merge(common, {
    mode: 'production',
+   devtool: 'source-map'
  });
```

## CLI 替代选项 

以上所述也可以通过命令行实现。例如，`--optimize-minimize` 标记将在幕后引用 `TerserPlugin`。和以上描述的 `DefinePlugin` 实例相同，`--define process.env.NODE_ENV="'production'"` 也会做同样的事情。而且，`webpack -p` 将自动地配置上述这两个标记，从而调用需要引入的插件。

虽然这种简短的方式很好，但通常我们建议只使用配置方式，因为在这两种方式中，配置方式能够更准确地理解现在正在做的事情。配置方式还为可以让你更加细微地控制这两个插件中的其他选项。

# [懒加载](https://webpack.docschina.org/guides/lazy-loading/)

**例子直接看官网**

只在第一次用到时导入一次

```js
The print.js module has loaded! See the network tab in dev tools...
5  Button Clicked: Here's "some text"!
```

# 缓存

## 提取引导模板(extracting boilerplate) 

为输入文件添加内容的hash

```diff
    output: {
-     filename: 'bundle.js',
+     filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    }
```



webpack 还提供了一个优化功能，可使用 [`optimization.runtimeChunk`](https://webpack.docschina.org/configuration/optimization/#optimization-runtimechunk) 选项将 runtime 代码拆分为一个单独的 chunk。将其设置为 `single` 来为所有 chunk 创建一个 runtime bundle：

```js
  var path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
-     runtimeChunk: 'single'
+     runtimeChunk: 'single',
+     splitChunks: {
+       cacheGroups: {
+         vendor: {
+           test: /[\\/]node_modules[\\/]/,
+           name: 'vendors',
+           chunks: 'all'
+         }
+       }
+     }
    }
  };
```

将第三方库(library)（例如 `lodash` 或 `react`）提取到单独的 `vendor` chunk 文件中，是比较推荐的做法，这是因为，它们很少像本地的源代码那样频繁修改



## 模块标识符(module identifier)

我们可以看到这三个文件的 hash 都变化了。这是因为每个 [`module.id`](https://webpack.docschina.org/api/module-variables#module-id-commonjs-) 会默认地基于解析顺序(resolve order)进行增量。也就是说，当解析顺序发生变化，ID 也会随之改变。因此，简要概括：

- `main` bundle 会随着自身的新增内容的修改，而发生变化。

- `vendor` bundle 会随着自身的 `module.id` 的变化，而发生变化。

  

用 [`HashedModuleIdsPlugin`](https://webpack.docschina.org/plugins/hashed-module-ids-plugin)，推荐用于生产环境构建：

```diff
  const path = require('path');
+ const webpack = require('webpack');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: './src/index.js',
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
        title: 'Caching'
      }),
+      new webpack.HashedModuleIdsPlugin()
    ],
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    }
  };
```

加了这个之后就只有main会变了 