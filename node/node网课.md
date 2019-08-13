### Node.js是什么

- Node.js® is a JavaScript runtime built on [Chrome's V8 JavaScript engine](https://v8.dev/).

node.js是js运行时环境，可以解析执行javascript代码，，使其脱离浏览器运行

- 事件驱动，非阻塞IO模型



### 创建node服务基本格式

```javascript
//1.引用http模块
let http = require('http');
//2.创建服务
let server = http.createServer()
//3.处理事件
server.on('request',(req,res)=>{
	res.write('hello ')
	res.end('world')  //必须有end
})
//4.设置端口
server.listen(4000,()=>{
	console.log('server is running...')
})
```

读取文件demo

```js
let http =require('http');
let fs = require('fs');

let server = http.createServer();
server.on('request',(req,res)=>{
	// res.end('works')
	let url = req.url;
	console.log(url)
	fs.readFile(('.'+url),(err,data)=>{
		if(err){
			res.setHeader('content-type','text/plain;charset=utf-8');
			res.end('文件不存在')
		}
		else{
			res.setHeader('content-type','text/plain;charset=utf-8');
			res.end(data)
		}
	})
})	

server.listen(4000,()=>{
	console.log('server is running ...')
})
```



### IP和端口

```js
console.log(res.socket.remoteAddress,res.socket.remotePort)
```

### 设置头部

```js
  res.setHeader('Content-Type', 'text/html;charset=utf-8');  //charset 中文（服务器默认用utf-8，浏览器默认用gbk会乱码）
 	//res.setHeader('Content-Type', 'text/plain;charset=utf-8');  //普通文本
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
```



- 模块导入的相对路径`./`不能省略（文件读取可以）
- `/`开头表示当前文件所处磁盘的根目录





### path 模块 

#### path.resolve([...paths])将路径或路径片段的序列解析为绝对路径。

原理就跟你在命令行按顺序输cd差不多

```js
const path = require('path');
console.log(path.resolve()) //   Users/ccc/Desktop/大学/大三上/web/html/node
console.log(path.resolve('cxw','name'))  // /Users/ccc/Desktop/大学/大三上/web/html/node/cxw/name
console.log(path.resolve('/cxw','/name')) // /name
console.log(path.resolve('/cxw','./name')) //  /cxw/name
```

#### path.join([...paths])

`path.join()` 方法使用平台特定的分隔符作为定界符将所有给定的 `path` 片段连接在一起，然后规范化生成的路径。

```js
path.join('/foo', '/bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'

path.join('foo', {}, 'bar');
// 抛出 'TypeError: Path must be a string. Received {}'


//__dirname获取当前目录
path.join(__dirname, 'views')   ///Users/ccc/Desktop/大学/大三上/web/html/node/views
```

#### path.basename 获取文件名

```js
path.basename('desktop/asd/sad.js')				   //  sad.js
path.basename('desktop/asd/sad.js','.js')   //   sad
```

#### path.dirname  获取目录名

```js
path.dirname('desktop/asd/sad.js')					 //  desktop/asd
path.basename('desktop/asd/sad.js')				   //  sad.js
path.basename('desktop/asd/sad.js','.js')   //   sad
```

#### path.extname  获取后缀名

```js
path.extname('desktop/asd/sad.js')
```

#### path.parse 

```js
path.parse('/desktop/asd/sad.js')
/*
{ root: '/',
  dir: 'desktop/asd',
  base: 'sad.js',
  ext: '.js',
  name: 'sad' }
  */
```

### node中的其他成员

```js
//文件的绝对路径（操作文件的相对路径相对于执行node命令的位置，所以用绝对路径可以解决这一问题）
__dirname   

__filename
```

#### tips：模块中的路径标识是相对于当前文件模块的，不受node所处命令影响

`require('./b')`



### json-server

安装

```shell
npm install -g json-server
```

启动

创建一个 `db.json` 文件储存信息

```bash
json-server --watch db.json
```

