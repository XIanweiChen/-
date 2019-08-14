### [文档](http://www.expressjs.com.cn/)

### tip

- **配置模版引擎和body-parser一定要在挂载路由之前！！！！！！！！！！！！！！**

  

### 静态资源服务 express.static

这是Express中的内置中间件功能。它提供静态文件，基于 [serve-static](http://www.expressjs.com.cn/en/resources/middleware/serve-static.html)。

可访问放在public文件夹里的静态资源

```js

app.use(express.static(path.join(__dirname, 'public')));
//可有第一个参数,则要在访问路径前多加一个/public
app.use('/public/',express.static(path.join(__dirname, 'public')));
```

### 模版引擎

#### EJS

配置：

```js
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
```

规范：

```ejs
<% if (user) { %>
  <h2><%= user.name %></h2>
<% } %>
```
使用：

```js
 res.render('index', { title: 'Exp1122ress' });
```



#### [art-template](http://aui.github.io/art-template/zh-cn/docs/syntax.html) 

##### 安装：

```bash
npm install --save art-template
npm install --save express-art-template
```
##### 语法：

```html
{{if user}}
  <h2>{{user.name}}</h2>
{{/if}}

<h2>{{title}}</h2>

{{each peoples}} 
<div>{{$value}}</div>
{{/each}}

{{include './header.art'}}  <!-- 子模版 -->
```

##### 模板继承

**标准语法**

```
{{extend './layout.art'}}
{{block 'head'}} ... {{/block}}
```

**原始语法**

```
<% extend('./layout.art') %>
<% block('head', function(){ %> ... <% }) %>
```

模板继承允许你构建一个包含你站点共同元素的基本模板“骨架”。范例：

```html
<!--layout.art-->
<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <title>{{block 'title'}}My Site{{/block}}</title>

    {{block 'head'}}
    <link rel="stylesheet" href="main.css">
    {{/block}}
</head>
<body>
    {{block 'content'}}{{/block}}
</body>
</html>
<!--index.art-->
{{extend './layout.art'}}

{{block 'title'}}{{title}}{{/block}}

{{block 'head'}}
    <link rel="stylesheet" href="custom.css">
{{/block}}

{{block 'content'}}
<p>This is just an awesome page.</p>
{{/block}}
```

渲染 index.art 后，将自动应用布局骨架。



##### 例子：

```js
var express = require('express');
var app = express();

// view engine setup
app.engine('art', require('express-art-template'));     //加载模版引擎，art后缀的文件用'express-art-template处理
app.set('view options', {
    debug: process.env.NODE_ENV !== 'production'
});
app.set('views', path.join(__dirname, 'views'));  //设置views的默认路径（视图默认存储路径）！！！！！！！
app.set('view engine', 'art');   //设置默认的模版引擎   名字需要跟上面的一致，可以随意取

// routes
app.get('/', function (req, res) {
    res.render('index.art', {
        user: {
            name: 'aui',
            tags: ['art', 'template', 'nodejs']
        }
    });
});
```

### 跨域

```js
//跨域
router.use(function(req, res, next) {
  //console.log(req);
  console.log(req.method);
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin,X-Requested-With,Content-Type,Accept,Authorization");
  res.header("cache-control", "no-cache");
  res.header("content-type", "application/json; charset=utf-8");
  res.header("ETag", '');
  //header头信息设置结束后，结束程序往下执行，返回
  if(req.method.toLocaleLowerCase() === 'options'){
      res.status(204);
      return res.json({});   //直接返回空数据，结束此次请求
  }else{
      next();
  }
});
```



### 处理POST请求

利用body-parser中间件

配置：

```javascript
var express = require('express')
var bodyParser = require('body-parser')

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

```

使用：

```js
router.post('/post',(req, res, next)=>{
  console.log(req.body)
  res.end(JSON.stringify(req.body, null, 2))
})
```



### app.use all 



### 配置独立路由

#### 原始办法：

```js
//app.js

var indexRouter = require('./routes/index');
var app = express();
indexRouter(app); //将app这个express实例传入router.js,使router.js能使用app
```

```js
//rounter.js

module.exports = function (app){   //导出这个function
  
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Exp11221ress' });
  });
  app.get('/info',function(req,res,next){
    const data = {
      name:'cxxw',
      age:20
    }
    res.setHeader('X-Foo', 'bars');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json(data)
  })
  //...
}
```

#### express提供的api

```js
//app.js

var indexRouter = require('./routes/index');
var app = express();
app.use('/', indexRouter);
```

```js
//rounter.js
var express = require('express');
var router = express.Router();   //express自带的路由函数

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Exp11221ress' });
});
router.get('/info',function(req,res,next){
  const data = {
    name:'cxxw',
    age:20
  }
  res.setHeader('X-Foo', 'bars');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(data)
})
//...


module.exports = router;  //最后导出router
```

### 模块化

天生的javascript不支持模块化：

- require
- exports
- Node.js 才有（CommonJS）

如果要在浏览器中向node一样模块化

- `<script>` 标签引入（但要考虑顺序问题）
- require.js (第三方库 AMD)
- sea.js (第三方库 CMD)

ECMAScript 官方发布 ES6 modules官方规范：

- 但大多都不支持（要用babel）

  详见笔记ES6（模块）



### package-lock.json

npm 5 以前是不会有 `package-lock.json` 这个文件的。（被开发者诟病，吐槽的问题）。

以前会自作多情的自动给你升级。

npm 5 以后才加入了这个文件。

当你安装包的时候，npm 都会生成或者更新 `package-lock.json` 这个文件。

- npm 5 以后的版本安装包不需要加 `--save` 参数，它会自动保存依赖信息

- 当你安装包的时候，会自动创建或者是更新 `package-lock.json` 这个文件

  `package-lock.json`这个文件会保存`node_modules`中所有包的信息（版本、下载地址）

- **这样的话重新 `npm install` 的时候速度就可以提升**

- 从文件来看，有一个`lock`称之为锁

  - 这个 `lock` 是用来锁定版本的
- 如果项目依赖了 `1.1.1` 版本
  - 如果你重新 install 其实会下载最新版本，而不是 1.1.1(^表示会不超过大版本号跟新到最新)
  - 我们的目的就是希望可以锁住 1.1.1 这个版本
  - **所以这个 `package-lock.json` 这个文件的另一个作用就是锁定版本号，防止自动升级新版**

### 错误文档

```js
if(err){
  reuturn res.status(200).json({
    err_code:1,   //自定义状态码，最后写成一个文档，做成规范化
    message:'账号已存在',  //前端不要用这个判断
	})
}

if(err){
  reuturn res.status(200).json({
    err_code:500,   //自定义状态码，最后写成一个文档，做成规范化
    message:'服务器繁忙',  //前端不要用这个判断
	})
}
```



### 表单同步提交与异步提交

**当表单同步提交，无论服务器响应什么，都会把响应结果覆盖当前页面解决：**

服务器重新render，并把上次递交的账号密码重新渲染：

```js
res.render('register.html',{
  form:body
})
```

ajax异步提交表单就不会这样

但是异步请求服务器的重定向是无效的



### 使用express-session

安装

```shell
npm install express-session
```

配置

```js
app.use(session({
  secret: 'keyboard cat', //配置加密字符串，在原有加密之上加上字符串再次加密
  resave: false,
  saveUninitialized: true  //true无论是否存储数据，都发你一个cookie
}))
```

使用：

```javascript
// 添加 Session 数据
req.session.foo = 'bar'

// 获取 Session 数据
req.session.foo

//删除
delete req.session.foo
```

###  中间件

> 参考文档：
>
> - [Writing middleware for use in Express apps](http://expressjs.com/en/guide/writing-middleware.html)
> - [Using middleware](http://expressjs.com/en/guide/using-middleware.html)

Express 的最大特色，也是最重要的一个设计，就是中间件。一个 Express 应用，就是由许许多多的中间件来完成的。

为了理解中间件，我们先来看一下我们现实生活中的自来水厂的净水流程。

![中间件](https://nodejs.lipengzhou.com/assets/img/water-middleware.171fda80.jpeg)

在上图中，自来水厂从获取水源到净化处理交给用户，中间经历了一系列的处理环节，我们称其中的每一个处理环节就是一个中间件。这样做的目的既提高了生产效率也保证了可维护性。

#### 中间件执行规则

- **按照代码顺序来进行，匹配到第一个后进入这个中间件，只有调用了next（）才继续往下**
- 无参数则匹配所有，有use参数则匹配开头，get等具体方法精准匹配（可用正则表达式）

#### 应用程序级别中间件

不关心请求路径：

```javascript
var app = express()

app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
})
```

限定请求路径：

```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

限定请求方法：

```typescript
app.get('/user/:name/:age', function (req, res, next) {
  console.log(req.params)  //  http://localhost:3001/user/cxw/22  -----> { name: 'cxw', age: '22' }
  res.send('USER')
})
```

多个处理函数：

```javascript
app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl)
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
})
```

多个路由处理函数：

```javascript
app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {
  res.send('User Info')
})

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
})
```

#### 处理错误的中间件

**next传参数直接到最后那个错误处理的中间件（err就是next函数传入的值）**

当传入4个参数时就是处理错误的中间件，放在所有的最下方 

```js
// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development(这里是在设置error模版的内容)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

### 中间件应用

#### [#](https://nodejs.lipengzhou.com/08-express.html#输出请求日志中间件)输出请求日志中间件

> 功能：实现为任何请求打印请求日志的功能。

`logger.js` 定义并导出一个中间件处理函数：

```javascript
module.exports = (req, res, next) => {
  console.log(`${req.method} -- ${req.path}`)
  next()
}
```

`app.js` 加载使用中间件处理函数：

```javascript
app.use(logger)
```

#### 统一处理静态资源中间件

> 功能：实现 express.static() 静态资源处理功能

`static.js` 定义并导出一个中间件处理函数：

```javascript
const fs = require('fs')
const path = require('path')

module.exports = function static(pathPrefix) {
  return function (req, res, next) {
    const filePath = path.join(pathPrefix, req.path)
    fs.readFile(filePath, (err, data) => {
      if (err) {
        // 继续往后匹配查找能处理该请求的中间件
        // 如果找不到，则 express 会默认发送 can not get xxx
        return next()
      }
      res.end(data)
    })
  }
}
```

`app.js` 加载并使用 static 中间件处理函数：

```javascript
// 不限定请求路径前缀
app.use(static('./public'))
app.use(static('./node_modules'))

// 限定请求路径前缀
app.use('/public', static('./public'))
app.use('/node_modules', static('./node_modules'))
```

