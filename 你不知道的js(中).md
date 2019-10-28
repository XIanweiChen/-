- 字符串可以借用join,map但是不能借用reverse

- void 0 

- Infinity/ Infinity 是一个未定义操作，结果为 NaN。

- a + ""会对a调用valueOf()方法，然后通过ToString抽象 操作将返回值转换为字符串。而 String(a) 则是直接调用 ToString()

  ```js
     var a = {
           valueOf: function() { return 42; },
           toString: function() { return 4; }
       };
       a + "";         // "42"
       String( a );    // "4"
  ```

  

- == 允许在相等比较中进行强制类型转换，而 === 不允许

- == 两边的布尔值会被强制类型转换为数字。

- 因为根据规范a <= b被处理为b < a，然后将结果反转。

- 请务必记住，用 , 来连接一系列语句的时候，它的优先级最低，其他操作数的优先级都比它高。

- promise.all的完成数组结果与指定的顺序一致(与完成顺序无关)

- .then返回的是一个promise,值为上一个promise   return的值

- 



### typeof 处理 undeclared 变量的方式

```js
 var a;
typeof a; // "undefined"
typeof b; // "undefined"
```

**对于 undeclared(或者 not defined)变量，typeof 照样返回 "undefined"。请注意虽然 b 是 一个undeclared变量，但typeof b并没有报错。**

**这是因为typeof有一个特殊的安全防范机制,可通过 typeof 的安全防范机制(阻止报错)来检查 undeclared 变量**

### 依赖注入

将依赖通过参数 显式地传递到函数中

```js
     function doSomethingCool(FeatureXYZ) {
         var helper = FeatureXYZ ||
             function() { /*.. default feature ..*/ };
         var val = helper();
         // ..
}
```

### 数组也是对象

```js
var a = [ ];
a[0] = 1;
a["foobar"] = 2;

a.length; //1
a["foobar"]; //2
a.foobar; //2

```

**这里有个问题需要特别注意，如果字符串键值能够被强制类型转换为十进制数字的话，它 就会被当作数字索引来处理**

```js
var a = [ ];
a["13"] = 42;
a.length; // 14
```

### NaN

NaN是一个特殊值，它和自身不相等，是唯一一个非自反(自反，reflexive，即x === x不 成立)的值。而 NaN != NaN 为 true，很奇怪吧?

#### isNaN(..) 有一个严重的缺陷

```js
var a = 2 / "foo";
var b = "foo";
a; // NaN
b; "foo"
window.isNaN( a ); // true window.isNaN( b ); // true——晕!
```

很明显 "foo" 不是一个数字，但是它也不是 NaN。这个 bug 自 JavaScript 问世以来就一直存 在，至今已超过 19 年。

**尽量用Number.isNaN(..)**

### Object.is(..)

ES6 中新加入了一个工具方法 Object.is(..) 来判断两个值是否绝对相等，可以用来处理 上述所有的特殊情况:

```js
     var a = 2 / "foo";
     var b = -3 * 0;
     Object.is( a, NaN ); //true
     Object.is( b, -0 );  //true
			Object.is( b, 0 );   //false
```

#### 简单的 polyfill

```js

    if (!Object.is) {
        Object.is = function(v1, v2) {
            // 判断是否是-0
            if (v1 === 0 && v2 === 0) {
                return 1 / v1 === 1 / v2;
            }
            // 判断是否是NaN if (v1 !== v1) {
            return v2 !== v2;
        }
        // 其他情况
        return v1 === v2;
        };
    }
```

### 原生函数

常用的原生函数有:

- String()
- Number()
- Boolean()
- Array()
- Object()
- Function()
- RegExp()
- Date()
- Error()
- Symbol()——ES6 中新加入的!

### new String

```js
var a = new String( "abc" );
/*
String {"abc"}
0: "a"
1: "b"
2: "c"
length: 3
__proto__: String
[[PrimitiveValue]]: "abc"
*/

typeof a; // 是"object"，不是"String" 
a instanceof String; // true 
Object.prototype.toString.call( a ); // "[object String]"
```

### 内部属性 [[Class]]

所有 typeof 返回值为 "object" 的对象(如数组)都包含一个内部属性 [[Class]](我们可 以把它看作一个内部的分类，而非传统的面向对象意义上的类)。这个属性无法直接访问， 一般通过 Object.prototype.toString(..) 来查看。

```js
  Object.prototype.toString.call( [1,2,3] );
     // "[object Array]"
     Object.prototype.toString.call( /regex-literal/i );
     // "[object RegExp]"
```

### Date

如果调用 Date() 时不带 new 关键字，则会得到当前日期的字符串值

```js
Date() //"Tue Oct 22 2019 21:54:45 GMT+0800 (中国标准时间)" 
new Date() //Tue Oct 22 2019 21:54:55 GMT+0800 (中国标准时间)
 Date.now() //1571752434802
```

### toJSON() 

如果要对含有非法 JSON 值的对象做字符串化，或者对象中的某些值无法被序列化时，就 需要定义 toJSON() 方法来返回一个安全的 JSON 值。

```js
    var o = {};
    var a = {
        b: 42,
        c: o,
        d: function() {}
    };
    // 在a中创建一个循环引用 
    o.e = a;
    // 循环引用在这里会产生错误 //
    JSON.stringify(a);
    // 自定义的JSON序列化 
    a.toJSON = function() {
        // 序列化仅包含b
        return { b: this.b };
    };
    JSON.stringify(a); // "{"b":42}"
```

### 假值

以下这些是假值:

- undefined
- null
- false
- +0、-0 和 NaN
- ""

### ~ 的妙用

~即-(x+1) 操作

```js
if (~a.indexOf( "lo" )) { // 找到匹配!
}
```

~~可取整(忽略小数位)

```js
~49.1 //-50
~~49.1 //49
```

### 布尔值隐式强制类型转换

(1)if (..)语句中的条件判断表达式。
(2)for ( .. ; .. ; .. )语句中的条件判断表达式(第二个)。
(3) while (..) 和 do..while(..) 循环中的条件判断表达式。
(4)? :中的条件判断表达式。
(5) 逻辑运算符 ||(逻辑或)和 &&(逻辑与)左边的操作数(作为条件判断表达式)。

### TDZ

(Temporal Dead Zone，暂时性死区)

有意思的是，对未声明变量使用 typeof 不会产生错误(参见第 1 章)，但在 TDZ 中却会报错:

```js
      {
          typeof a;   // undefined
          typeof b;   // ReferenceError! (TDZ)
          let b;
      }
```

### swich

匹配到10 就一直执行,case4没匹配也执行,直到break

```js
    var a = 10;
    switch (a) {
        case 10:
            console.log(10);
        case 4:
            console.log("4");
        default:
            console.log("default");
        case 2:
            console.log("2");
        case 3:
            console.log("3");
            break;
    }

/*
nibuzhidaodejs.html:134 4
nibuzhidaodejs.html:136 default
nibuzhidaodejs.html:138 2
nibuzhidaodejs.html:141 3
*/

```

### 超时来取消事件

```js

    function timeoutify(fn, delay) {
        var intv = setTimeout(function() {
            intv = null;
            fn(new Error("Timeout!"));
        }, delay);
        return function() { // 还没有超时?
            if (intv) {
                clearTimeout(intv);
                fn.apply(this, arguments);
            }
        };
    }

    // 使用"error-first 风格" 回调设计
		function foo(err,data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data);
    }
    }
    ajax("http://some.url.1", timeoutify(foo, 500));
```



###  Promise会自动展开thenable 值

如果向 Promise.resolve(..) 传递了一个非 Promise 的 thenable 值，前者就会试图展开这个值，而且展开过程会持续到提取出一个具体的非类 Promise 的最终值:

```js
var p1 = Promise.resolve( 42 );
var p2 = Promise.resolve( p1 );
p1 === p2; // true
```

### 决议(resolve)   or    完成(fulfill)

Promise.resolve(..) 会将传入的真正 Promise 直接返回，对传 入的 thenable 则会展开

```js
var rejectedTh = {
    then: function(resolved, rejected) {
        rejected("Oops");
    }
};
var rejectedPr = Promise.resolve(rejectedTh);
```
**虽然这里resolve了rejectedTh,但最终的结果是reject,所以用决议(resolve)命名函数比较好,而不是完成(fulfill)**

### Function.apply.bind

```js
    function spread(fn) {
        return Function.apply.bind(fn, null);
    }
    function fn(x,y){
    	console.log(x,y)
    }

    let sprd = spread(fn) //1 2
```

解释:

```js
Function.apply.bind(fn, null);
可看作 let apl = Function.apply
apl.bind(fn,null) //就是把apl内部的this指向里fn
```

### generator 生成器

```js
var a = 1;
var b = 2;

function* foo() {
    a++;
    yield 22;
    b = b * a;
    a = (yield b) + 3;
}
let it = foo();

let t1 = it.next() //a = 2 在yield 22停住
let t2 = it.next() //a = 2  b = 4 在yield b停住  
let t3 = it.next(1) //此时a = 1+3 ,迭代结束
// t1.value:22
// t2.value:4
// t3.value:undefined 
```
#### 可以直接用for of 遍历生成器产生的迭代器

```js
for(let i of foo())console.log(i)   //这里必须是foo() !!!!!!!!!!
// 22
// 4
// undefined 
```

#### 停止生成器

```js

    function* something() {
        try {
            var nextVal;
            while (true) {
                if (nextVal === undefined) {
                    nextVal = 1;
                } else {
                    nextVal = (3 * nextVal) + 6;
                }
                yield nextVal;
            }
        }
        // 如果有需要在这里放清理的函数
        finally {
            console.log("cleaning up!");
        }
    }

    //1. 直接break
    for (let i of something()) {
        console.log(i)
        if (i > 500) {
            break
        }
    }
    //2. it.return(..) 之后，它会立即终止生成器，这当然会运行 finally 语句
    let it = something()
    for (let i of it) {
        console.log(i)
        if (i > 500) {
           console.log(it.return( "stop" ).value)
        }
    }
```

####  it.return  不会执行任何代码,直接返回

```js

    function* foo() {
        a++;
        yield 22;
        b = b * a;
        a = (yield b) + 3;
    }
    it.next()//{value: 22, done: false}
    it.return(321312)//{value: 321312, done: true}
		//此时b = b * a 未执行,b还是2
```

