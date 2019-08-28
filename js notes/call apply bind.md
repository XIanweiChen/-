https://blog.csdn.net/YZ0826/article/details/80176169

### call

```js
        Function.prototype.call = function(thisArg,...args){
            if (typeof this !=='function') {
                throw new TypeError('Error')
            }
            thisArg = thisArg || window    //把运行的环境传进去（某个对象）
            thisArg.fn = this    //为此对象添加一个function(调用call的函数)
            let result 
            if(args.length!=0) {
                result = thisArg.fn(...args)
            } else {
                result = thisArg.fn()
            }
            delete thisArg.fn
            return result
        }
```

### apply

个人理解:   apply和call的原理类似，都是将运行的环境传进去，然后为此对象添加一个function(调用call的函数)，最后在这个对象上调用function

```js
    Function.prototype.apply = function(thisArg, args) {
        if (typeof this !== 'function') { 
            throw new TypeError('Error')
        }
        thisArg = thisArg || window
        thisArg.fn = this
        let result
        if(args) {
            result = thisArg.fn(...args)
        } else {
            result = thisArg.fn()
        }
        delete thisArg.fn
        return result
    }
```


### bind

```js
		Function.prototype.bind = function(context){
			let that = this;  //function fun
			let args = Array.prototype.slice.call(arguments,1);
			//arguments[0]为传入的环境对象,就是context
			// args为需要的参数
			let bound = function(){
        //这是一个闭包(就算外部函数执行完了,that,args也会保留)
				if(this instanceof bound){
					return that.apply(this,args.concat(Array.from(arguments)));
				}
				else{
					return that.apply(context,args.concat(Array.from(arguments)));
				}
			}
			// 维护原型关系
      if(this.prototype) {
        bound.prototype = this.prototype;  
      }
      return bound

		}
```

```js
//普通函数调用
    let obj = {
        a: 1,
    }

    function fun(b, c) {
        console.log(this.a, b + c)
    };

    fun('cxw', 'aaa')   //undefined "cxwaaa"  
    fun.bind(obj, 'cxw', 'aaa')()   //1 "cxwaaa"
```

```js
//构造函数调用
    function Test3(a, b) {
        this.a = a;
        this.b = b;
    }
    Test3.prototype.add = function() {
        console.log(this.a + this.b);
    }


    // 使用 bind
    var NewTest3 = Test3.bind(null, 3);
    var t2 = new NewTest3(4); //用了new，bound不再为window！！！！
    // t2.add(); // 7, this 指向 t2    如果没 bound.prototype = this.prototype;  t2就没有add()方法
```

#### bind多次绑定问题

```js
var func = function() {
  console.log(this.x)
}
var obj1 = { x: 1 }
var obj2 = { x: 2 }
var obj3 = { x: 3 }
var func3 = func
  .bind(obj1)
  .bind(obj2)
  .bind(obj3)
func3()
```

输出为1