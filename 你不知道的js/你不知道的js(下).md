### typeof 所有可能情况

```js
 		 var a;
     typeof a; // "undefined"

     a = "hello world"; 
     typeof a; // "string"

     a=42;
     typeof a; // "number"

     a = true;
     typeof a; // "boolean"

     a = null;
     typeof a; // "object"--诡异，这是bug

     a = undefined;
     typeof a; // "undefined"

		 a = {b:'c'}
		 typeof a; //'object'

		 a = Symbol('a')
		 typeof a;  //'symbol'

		 a = ()=>{}
     typeof a; //'function'

```

### 默认参数

#### 传入undefined或不传入时才用默认参数

```js
function foo(x = 11, y = 31) {
    console.log( x + y );
}

foo( undefined, 6 );  //17
foo( null, 6 );		//16  null被强制转换为0

```





#### 默认参数不能引用自己

```js
var w = 1,
    z = 2;

function foo(x = w + 1, y = x + 1, z = z + 1) {
    console.log(x, y, z);
}
foo();
```
z + 1中的z发现z是一个此刻还没初始化的参数变量，所以它永远不会试图从外 层作用域寻找 z

ES6 引入了 TDZ，它防止变量在未初始化的状态下被访问。 因此，z + 1 默认值表达式会抛出一个 TDZReferenceError 错误



### Function. prototype

```js
function ajax(url, cb = function(){}) {
          // ..
      }
ajax( "http://some.url.1" );
```

Function. prototype本身就是一个没有操作的空函数。所以，这个声明可以是cb = Function. prototype，这样就省去了在线函数表达式的创建过程。

### 解构

#### 重复赋值

对象解构形式允许多次列出同一个源属性(持有值类型任意)

```js
var { a: X, a: Y } = { a: 1 };
X; // 1 
Y; // 1
```

这也意味着可以解构子对象 / 数组属性，同时捕获子对象 / 类的值本身

```js
var { a: { x: X, x: Y }, a } = { a: { x: 1 } }; //相当于{ x: X, x: Y } = {x:1};a = {x:1}
     X;  // 1
     Y;  // 1
     a;  // { x: 1 }
```

#### 解构赋值表达式

对象或者数组解构的赋值表达式的完成值是所有右侧对象 / 数组的值。考虑:

```js
var o = { a:1, b:2, c:3 },
         a, b, c, p;
p = { a, b, c } = o;
console.log( a, b, c );         // 1 2 3
p === o;                        // true
```

#### 默认值赋值

```js
function bar() {
  return {
    x: 4,
    y: 5,
    z: 6
  };
}
function foo() {
  return [1,2,3];
}

var [ a = 3, b = 6, c = 9, d = 12 ] = foo();
var { x = 5, y = 10, z = 15, w = 20 } = bar();
console.log( a, b, c, d );          // 1 2 3 12
console.log( x, y, z, w );          // 4 5 6 20
```

#### ...w 未赋值是[]

```js
 function f3([ x, y, ...z], ...w) {
         console.log( x, y, z, w );
}
f3( [] );                          // undefined undefined [] []
f3( [1,2,3,4], 5, 6 );             // 1 2 [3,4] [5,6]
```

#### 解构默认值+参数默认值

解构默认值和函数参数默认值 之间的差别

```js
function f6({ x = 10 } = {}, { y } = { y: 10 }) {
  console.log(x, y);
}
f6(); // 10 10
f6(undefined, undefined); // 10 10
f6({}, undefined); // 10 10
f6({}, {}); // 10 undefined
f6(undefined, {}); // 10 undefined
f6({ x: 2 }, { y: 3 }); //2 3
```

#### 嵌套默认:解构并重组

```js
  var defaults = {
    options: {
      remove: true,
      enable: false,
      instance: {}
    },
    log: {
      warn: true,
      error: true
    }
  };
  var config = {
    options: {
      remove: false,
      instance: null
    }
  };

  // 把defaults合并进config
  {
    // (带默认值赋值的)解构 
    let {
    options: {
      remove = defaults.options.remove,
        enable = defaults.options.enable,
        instance = defaults.options.instance
    } = {},
      log: {
        warn = defaults.log.warn,
          error = defaults.log.error
      } = {}
  } = config;
  // 重组 
  config = {
    options: { remove, enable, instance },
    log: { warn, error }
  };
  }
  
/*  
  如果存在config.options,则{
      remove = defaults.options.remove,
        enable = defaults.options.enable,
        instance = defaults.options.instance
    } = {
      remove: false,
      instance: null
    },否则就用默认值{}
*/
```

### function 有递归调用时不要用简洁方式

```js
    runSomething({
        something(x, y) {
            if (x > y) {
                return something(y, x);
            }
            return y - x;
        }
    });
```

是这段代码会崩溃

前面的 ES6 代码片段会被解释为:

```js
    runSomething({
        something: function(x, y) {
            if (x > y) {
                return something(y, x);
            }
            return y - x;
        }
    });
```

看 出我们依赖的第二个 something 是如何被省略了吗?换句话说，简洁方法意味着匿名函数 表达式。

### String.raw(..)

ES6 提供了一个内建函数可以用作字符串字面量标签:String.raw(..)。它就是传出strings 的原始版本:

```js

      console.log( `Hello\nWorld` );
      // Hello
      // World
      console.log( String.raw`Hello\nWorld` );
      // Hello\nWorld
      String.raw`Hello\nWorld`.length;
      // 12
```

