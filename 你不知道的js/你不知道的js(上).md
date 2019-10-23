### try catch 模拟 let

```js
{
		let a = 2;
  	console.log( a ); // 2
}
console.log( a ); // ReferenceError

```



```js
try{throw 2;}catch(a){ 
  console.log( a ); // 2
}
console.log( a ); // ReferenceError
```





### 使用 string(字面量)以外的其他值作为属性名会被转换成字符串

myObject调用了toString,所以是[object Object]

```js
var myObject = { };
myObject[true] = "foo";
myObject[3] = "bar"; 
myObject[myObject] = "baz";

myObject["true"], // "foo"
myObject["3"], // "bar"
myObject["[object Object]"] // "baz" 
```

### configurable:false 还会禁止删除这个属性

```js

var myObject = { 
  a:2
     };
myObject.a; // 2
delete myObject.a; myObject.a; // undefined
     Object.defineProperty( myObject, "a", {
          value: 2,
					writable: true, 
       		configurable: false, 
       		enumerable: true
} );
myObject.a; // 2 delete myObject.a; 
myObject.a; // 2
```

### 3.3.6不变性

#### 禁止扩展

如果你想禁止一个对象添加新属性并且保留已有属性，可以使用 Object.prevent Extensions(..):



```js
     var myObject = {a:2};
     Object.preventExtensions( myObject );
     myObject.b = 3;
     myObject.b; // undefined
```

在非严格模式下，创建属性 b 会静默失败。在严格模式下，将会抛出 TypeError 错误。

#### 密封

Object.seal(..) 会创建一个“密封”的对象，这个方法实际上会在一个现有对象上调用Object.preventExtensions(..) **并把所有现有属性标记为 configurable:false。**

所以，密封之后不仅不能添加新属性，也不能重新配置或者删除任何现有属性(虽然可以 修改属性的值)。

#### 冻结

Object.freeze(..) 会创建一个冻结对象，这个方法实际上会在一个现有对象上调用Object.seal(..) 并把所有“数据访问”**属性标记为 writable:false**，这样就无法修改它们 的值。

这个方法是你可以应用在对象上的级别最高的不可变性，它会禁止对于对象本身及其任意 直接属性的修改(不过就像我们之前说过的，这个对象引用的其他对象是不受影响的)。

你可以“深度冻结”一个对象，具体方法为，首先在这个对象上调用 Object.freeze(..)， 然后遍历它引用的所有对象并在这些对象上调用 Object.freeze(..)。但是一定要小心，因 为这样做有可能会在无意中冻结其他(共享)对象。

### in操作符

看起来 in 操作符可以检查容器内是否有某个值，但是它实际上检查的是某 个属性名是否存在。对于数组来说这个区别非常重要，4 in [2, 4, 6]的结 果并不是你期待的 True，因为 [2, 4, 6] 这个数组中包含的属性名是 0、1、2，没有 4

### for..of 

for..of 循环首先会向被访问对象请求一个迭代器对象，然后通过调用迭代器对象的next() 方法来遍历所有返回值。

数组有内置的 @@iterator，因此 for..of 可以直接应用在数组上。我们使用内置的 @@ iterator 来手动遍历数组，看看它是怎么工作的:

```js
**var** myArray = [ 1, 2, 3 ];
**var** it = myArray[Symbol.iterator]();

it.next(); // *{ value:1, done:false }*
it.next(); // *{ value:2, done:false }*
it.next(); // *{ value:3, done:false }*
it.next(); // *{ done:true }*
```



### 隐式屏蔽

```js
    var anotherObject = {
        a: 2
    };
    var myObject = Object.create(anotherObject);
    anotherObject.a; // 2
    myObject.a; // 2
    console.log(anotherObject.hasOwnProperty("a")); // true
    console.log(myObject.hasOwnProperty("a")); // false
    myObject.a++; // 隐式屏蔽!  ++ 操作相当于 myObject.a = myObject.a + 1。
    console.log(anotherObject.a); // 2
    console.log(myObject.a); // 3
    console.log(myObject.hasOwnProperty("a")); // true
```

### Super

```js
class P {
foo() { console.log( "P.foo" ); }
}
class C extends P { foo() {
super(); }
}
var c1 = new C(); c1.foo(); // "P.foo"
var D = {
foo: function() { console.log( "D.foo" ); }
};
var E = {
foo: C.prototype.foo
};
// 把E委托到D Object.setPrototypeOf( E, D );
E.foo(); // "P.foo"
```

> 如果你认为 super 会动态绑定(非常合理!)，那你可能期望 super() 会自动识别出 E 委托了 D，所以 E.foo() 中的 super() 应该调用 D.foo()。
>
> 但事实并不是这样。出于性能考虑，super 并不像 this 一样是晚绑定(late bound，或者说 动态绑定)的，它在 [[HomeObject]].[[Prototype]] 上，[[HomeObject]] 会在创建时静态 绑定。

**在本例中，super() 会调用 P.foo()，因为方法的 [[HomeObject]] 仍然是 C，C.[[Prototype]]是 P。**

确实可以手动修改 super 绑定，使用 toMethod(..) 绑定或重新绑定方法的 [[HomeObject]](就像设置对象的 [[Prototype]] 一样!)就可以解决本例的问题:

```js
var D = {
foo: function() { console.log( "D.foo" ); }
  };
// 把E委托到 D
var E = Object.create( D );
// 手动把 foo 的 [[HomeObject]] 绑定到 E，E.[[Prototype]] 是 D，所以 super() 是 D.foo()
E.foo = C.prototype.foo.toMethod( E, "foo" );
E.foo(); // "D.foo"
```

> toMethod(..) 会复制方法并把 homeObject 当作第一个参数(也就是我们传入 的 E)，第二个参数(可选)是新方法的名称(默认是原方法名)。

**个人理解:super调用的是调用它的函数的prototype上的同名函数**

### [[prototype]]的个人理解

