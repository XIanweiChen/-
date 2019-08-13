### Node.js模块系统

#### module.exports导出(只能导出一个)

```js
let a = 1;
module.exports = a
```

引用

```js
let a = require('./test.js')
```



#### exports.b = b导出(可导出多个)

```js
let b = 2;
exports.b = b
```

引用

```js
let b = require('./test.js').b   
// let {b} = require('./test.js')
```

### node获取CLI参数：

```js
const arg = process.argv
```