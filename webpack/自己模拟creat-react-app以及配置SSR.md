

 [code]( /Users/ccc/Desktop/大学/大三上/web/html/webpack-demo/wp-create-react-app ) 



Tips:

里面的导入都是用到`const xxx = require('xxx')`

# 配置create-react-app

### 1.npm init 

`npm init `

### 2.安装webpack 

要安装最新版本或特定版本，请运行以下命令之一：

```bash
npm install --save-dev webpack
npm install --save-dev webpack@<version>
```

webpack 4+ 版本，你还需要安装 CLI：
`npm install --save-dev webpack-cli`

### 3.创建初始文件

src 目录下的index.html 和index.js（webpack默认，使用此名字可不用配置入口）
**到此为止，可直接用npx webpack打包**:

内容只为一行的`console.log('hello word')` 打包结果

https://www.jianshu.com/p/236466fc0033?tdsourcetag=s_pcqq_aiomsg

```js
//这一整个是一个立即执行函数
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) { //moduleId就是下面的 "./src/index.js"
/******/
/******/ 		// Check if module is in cache(判断是否有缓存)
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function  modules[moduleId]就是eval("console.log('hello word')\n\n//# sourceURL=webpack:///./src/index.js?");
  					//以下的.r,.d等方法会在某种情况下用到
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/														//module.exports = {}
/******/ 		// Flag the module as loaded(标记模块已加载)
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__) 即传入的参数对象
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache  缓存
/******/ 	__webpack_require__.c = installedModules;   
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {//判断exports对象是否存在name属性
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter }); //为exports对象定义一个访问器属性（name），定义为可枚举
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
 				  //这个代码其实是给exports定义了一个特殊的符号，查看浏览器是否支持ES2015的Symbol，如果支持，以Symbol符号给当前对象添加上一个独一无二的标志key为 Symbol.toStringTag，值为 "Module"。
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__. s= "./src/index.js");
/******/ })
/************************************************************************/  //下半部分传入的参数
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("console.log('hello word')\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });
```

**总结一下：其实webpack就是利用了nodejs讲源码进行了转义之后当做字符串放到了一个eval之中，然后自己创建了一个浏览器端的对象，并对这个对象进行层层处理让这个对象符合commonjs规范，最后根据规范调用编译好的字符串**

### 4 webpack配置

自己创建`webpack.config.js`文件
tip：
里面带s的都是数组，不带的是对象
module：是第三方 模块的匹配规则

⚠️常用：

1. entry
2. mode
3. output
4. module
5. plugins

```js
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  mode: 'production'
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
};
```





### 5.使用插件：

##### html-webpack-plugin：

作用：

- 自动生成html (也可以自己选用模版)
- This will generate a file `dist/index.html` containing the following
- `script` tags in the generated HTML.

安装:

```shell
npm i html-webpack-plugin -D
```

配置：

```js
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const htmlPlugin = new HtmlWebpackPlugin({
    template:path.join(__dirname,'public','index.html'), //源文件(不写默认生成)
    title:'index'
})
```



##### clean-webpack-plugin 

功能：

​	自动清理dist文件夹

配置:

```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //!!!!!!
 
const webpackConfig = {
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
    ],
};
 
module.exports = webpackConfig;
```



##### webpack-dev-server：

```bash
npm i webpack-dev-server -D
```



功能：

​	用于开发，打开服务，热跟新

配置:  可不加

```js
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000
  }
```

##### react-hot-loader

⚠️**必须最外层!!!**

能够不刷新页面就完成页面跟新(这样就不用在此请求数据)

使用:

1.在babel 的plugin中添加`react-hot-loader/babel`

```js
options: {
  presets: ['@babel/preset-env', "@babel/preset-react"],
    plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties',"react-hot-loader/babel"]
}
```

2.`index.js`中

```js
import { hot } from 'react-hot-loader/root';  //导入


//......

export default hot(MyRouter);  //一个高阶组件
```



### 6.创建脚本

```js
"start":"webpack-dev-server --open 'Google Chrome' --hot"
"build": "npx webpack"
```

到此为止，基本可以正常开发了

接下来要导入react相关的

### 7.配置react

安装：

```js
npm i react react-dom
```

导入：

```js
import React from 'react';
import ReactDom from 'react-dom';

ReactDom.render('hello world',document.getElementById('root'))
```

此时已经可以显示hello world



### 7.安装loader

#### 使用jsx（安装babal-loader）

```bash
npm install babel-loader  @babel/core @babel/preset-env  @babel/preset-react
npm i @babel/plugin-proposal-object-rest-spread @babel/plugin-transform-runtime @babel/plugin-proposal-class-properties
```

配置：

```js
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            }
        ]
    }
```

#### 加载css

```js
npm install --save-dev style-loader css-loader
```



```js
{
  test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
}
```

#### 加载图片

```js
npm install --save-dev file-loader
```

```js
{
  test: /\.(png|svg|jpg|gif)$/,
    use: [
      'file-loader'
    ]
}
```



至此基本上可以向create-react-app一样使用了





### 总体的webpack.config.js:

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const htmlPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'public', 'index.html'), //源文件
    title: 'index'
})

module.exports = {
    mode: 'development',
    plugins: [htmlPlugin],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', "@babel/preset-react"],
                        plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    resolve:{
        extensions:['.js','jsx'],
        alias:{
            '@':path.join(__dirname,'./src'),
        }
    }

}

```



# Server Side Render

https://www.jianshu.com/p/5cbc3349819f

https://segmentfault.com/a/1190000018672269



1. 写一个serverApp.js文件将首屏模块导出

   ```js
   import React from 'react'
   import App from './App'
   
   export default <App />
   ```

2. 配置`webpack.client.config.js`(用于打包客户端应用,不用变)和`webpack.server.config.js`文件

   `webpack.server.config.js`有较大修改

   ```js
   const path = require('path');
   
   
   module.exports = {
       mode: 'development',
       target:'node',  //用于node环境
       entry:path.join(__dirname,'src/serverApp.js'),
       output:{
           libraryTarget:'commonjs2', //!!!!!!!千万不能少
           filename:'serverApp.js',   
           publicPath:'/static/'
       },
       
       module: {
           rules: [
               {
                   test: /\.js$/,
                   exclude: /(node_modules|bower_components)/,
                   use: {
                       loader: 'babel-loader',
                       options: {
                           presets: ['@babel/preset-env', "@babel/preset-react"],
                           plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/plugin-transform-runtime', '@babel/plugin-proposal-class-properties']
                       }
                   }
               },
               {
                   test: /\.css$/,
                   use: [
                       'isomorphic-style-loader',
                       'css-loader',
                   ]
               },
               {
                   test: /\.(png|svg|jpg|gif)$/,
                   use: [
                       'file-loader'
                   ]
               }
           ]
       },
   
   
   }
   
   ```

3. 打包

   ```json
    "build": "NODE_ENV=development webpack --config webpack.client.config.js &&webpack --config webpack.server.config.js",
   ```

   

4. 写服务器(用express)

   ```js
   const express = require('express')
   const path = require('path')
   const fs = require('fs')
   const content = require('../dist/serverApp.js').default  //引用组件内容 !!!!.default 
   const ReactDOMServer = require('react-dom/server');
   const template = ReactDOMServer.renderToString(content)  //react内置函数奖组件转成字符串
   const html = fs.readFileSync(path.join(__dirname,'../dist/index.html'),'utf-8')  //获取html模版
   const newHtml = html.replace('<!-- app -->',template)   //替换内容
   console.log(newHtml)
   const app = express()
   
   app.use('/static',express.static(path.join(__dirname,'../dist')))
   
   app.get('/',function(req,res){   
       res.send(newHtml)//返回结果
   })
   
   
   
   app.listen(5000)
   ```

   

5. 修改`index.js  `

   ```diff
   +ReactDom.hydrate(<Router />,document.getElementById('root'))
   -ReactDom.render(<Router />,document.getElementById('root'))
   ```

   原因:

   如果你在已有服务端渲染标记的节点上调用 [`ReactDOM.hydrate()`](https://zh-hans.reactjs.org/docs/react-dom.html#hydrate) 方法，React 将会保留该节点且只进行事件处理绑定，从而让你有一个非常高性能的首次加载体验。

6. 分别打包client和server,运行服务

## ⚠️⚠️⚠️问题



#### `target:'node'`失效

要加 libraryTarget:'commonjs2',

```js
    output:{
        libraryTarget:'commonjs2',//!!!!!!!千万不能少
        filename:'serverApp.js',   
        publicPath:'/static/'
    },
```

此时打包出来的`serverApp`会以`module.exports`开头,才能用于node

```js
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
```



#### 打包的js文件404

修改server.js引入静态资源

```js
app.use('/static',express.static(path.join(__dirname,'../dist')))
```

注意⚠️:这里要加`'/static'`,否则会直接路由到你客户端打包好的index文件(因为他也在dist中)

但加了`'/static'`会导致文件再次找不到,此时要配置webpack config文件

注意⚠️:两个webpack config文件都要配置

```js
    output:{
        publicPath:'/static/'
    }
```

因为`webpack.client.config.js`为了找到main.js文件,`webpack.server.config.js`为了找到组件中使用的图片等静态资源

#### css失效

在`webpack.server.config.js`修改css 文件的loader

```js
            {
                test: /\.css$/,
                use: [
                    'isomorphic-style-loader',
                    'css-loader',
                ]
            }
```



## 配置开发环境

在开发的时候一般用devServer开发客户端,所以要配置server端也可以动态的随带代码热跟新

所以要配置配置开发环境

### 先给`server.js`加上NODE_ENV=development

#### cross-env 

在linux和windows中都可以设置`NODE_ENV=development `

#### 改变脚本:

```json
"server": "cross-env NODE_ENV=development node server/server.js"
```

### 判断当前开发环境

```js
const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
	//......
}else{
    const devStatic = require('./util/dev-static')  //获取开发环境时的配置
    devStatic(app)
}
```

### 编写`dev-static.js`

```js

const axios = require('axios')
const path = require('path')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const proxy = require('http-proxy-middleware')

const serverConfig = require('../../webpack.server.config')  //获取webpack-serber的配置文件

const getTemplate = () => {   //获取html模版
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:3000/static/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

let serverBoundle = null
const Module = module.constructor //获取module的构造函数
const mfs = new MemoryFs     //读取内存中的模块,api和fs相同
const serverCompiler = webpack(serverConfig)   //创建一个webpack,webpack不仅能在cli中用,还能在代码中用
serverCompiler.outputFileSystem = mfs  //把bundle写在内存中
serverCompiler.watch({}, (err, stats) => { //{}表示不加配置,stats是类似你在terminal用webpack输出的那些打包信息
    stats = stats.toJson()
    stats.errors.forEach(err => Console.log(err))
    stats.warnings.forEach(warn => console.log(warn))

    const bundlePath = path.join( //从config中获取bundle的输出路径
        serverConfig.output.path,
        serverConfig.output.filename
    )

    const bundle = mfs.readFileSync(bundlePath,'utf-8') //!!!! utf-8
    const m = new Module()
    
    //为什么要进行一下这一步?
    //bundle是string的代码,不能通过ReactDomServer.renderToString
    //所以要先通过module编译导出才能变成Symbol(react.element)
    m._compile(bundle,'serverApp.js') //!!!!一定要加serverApp.js  把bundle重新编译成一个模块导出
    serverBoundle = m.exports.default
    console.log(serverBoundle)
})

module.exports = function (app) {
    //因为静态资源(js,svg等)都在内存中无法设置static,所以只能通过代理的方式获取
    app.use('/static/',proxy({
        target:'http://localhost:3000'
    }))
    
    app.use(function (req, res) {
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBoundle)
            const newHtml = template.replace('<!-- app -->', content)   //替换内容
            res.send(newHtml)
        })
    })
}

```

serverBoundle = require(bundlePath).default; //!!!!!!!!!!!!!!!!!!直接require不就行了   教程有问题

### ⚠️⚠️⚠️难点/注意点

- ⚠️获取html,js的时候要注意,debServer的代码都是存在内存中(未写入磁盘):

  要通过`memory-fs`读取

  `http-proxy-middleware`代理获取静态资源

- ⚠️⚠️服务端渲染使用客户端的react-hot-loader的时候不能使用nodemon(他会导致服务区重启,从而导致`0443dff5d0f9ff2ee22a.hot-update.json`的读取timeout)活着配置nodemon(见下面nodemon配置)

- ⚠️webpack不仅能在cli中用,还能在代码中用

- ⚠️

  ```js
    //不能直接 serverBoundle = require(bundlePath).default; 
    //bundlePath =  /Users/ccc/Desktop/大学/大三上/web/html/webpack-demo/server-side-render/dist/serverApp.js
    //由于在内存中获取不到
  ```

  

- ⚠️用`module.constructor`重新编译mfs读取到的string文件,然后再  `serverBoundle = m.exports.default`,效果相当于`serverBoundle =  require('xxxxx')`

  ```js
  const Module = module.constructor //获取module的构造函数
  const bundle = mfs.readFileSync(bundlePath,'utf-8') //!!!! utf-8
  const m = new Module()
  m._compile(bundle,'serverApp.js') //!!!!一定要加serverApp.js  把bundle重新编译成一个模块导出
  serverBoundle = m.exports.default
  ```

  

## 使用eslint

在webpack中加载rules的最前面

`enforce: 'pre'`表示必须先通过这个下面的loader才会执行

```js
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      },
       
```

安装插件

```bash
npm i babel-eslint eslint-config-airbnb eslint-config-standard eslint-loader eslint-plugin-import eslint-plugin-node eslint-plugin-promise eslint-plugin-standard eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-import -D 
```

快速检查:

```json
"lint": "eslint --ext .js src/"
```



快速修复

```bash
eslint [filename or dirname] --fix
```

## husky

Git hooks made easy

Husky can prevent bad `git commit`, `git push` and more 🐶 *woof!*

安装:

```bash
npm install husky --save-dev
```

```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```



## webpack-merge

使用方法:见`webpack文档/生产环境/配置`

### ⚠️⚠️⚠️普通merge的问题

`common`

```js
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ]
      }
```

`server`

```js
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader', 'css-loader',
        ]
      }
```

合并后还是没变!!!!

```js
      {
        test: /\.css$/,
        use: [
          'style-loader', 'css-loader',
        ]
      }
```

**解决办法:**

使用`merge.smart`

webpack-merge tries to be smart about merging loaders when merge.smart is used. Loaders with matching tests will be merged into a single loader value.

```js
//output
{ test: /\.css$/,
  use: [ 'style-loader', 'isomorphic-style-loader', 'css-loader' ]
}
```

## nodemon

配置:

`nodemon.json:`

```json
{
  "ignore": [
    ".git",
    "node_modules/**/node_modules",
    ".eslint",
    "src",
    "client"
  ],
  "env": {
    "NODE_ENV": "development"
  },
  "verbose": true,
  "ext": "js"
}

```



## mobx

**首先要使babel支持`decorator`**

安装依赖：

```bat
npm install --save-dev @babel/plugin-proposal-decorators
npm install --save-dev babel-plugin-transform-decorators-legacy
```

更改`package.json`文件中的babel配置

```js
"babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-proposal-class-properties",
        {
          "loose": true
        }
      ]
    ]
  },
```

安装mobx

```bash
npm i mobx mobx-react 
```

创建`app-state.js`

```js
import {
  observable, computed, autorun, action,
} from 'mobx'


export class Appstate {
  @observable count = 0

  @observable name = 'cxw'

  @computed get msg() {
    return `${this.name}${this.count}`
  }

  @action add() {
    this.count += 1
  }
}

const appState = new Appstate()

autorun(() => {
  // console.log(appState.msg)
})


setInterval(() => {
  appState.add()
}, 1000)


export default appState

```

