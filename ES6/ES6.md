

#### var let const
`1.var `: 

- `var`声明可以在包含它的函数，模块，命名空间或全局作用域内部任何位置被访问
- function scope
  `2.const and let `: 

1. block scope 
2. 不可重复申明 
3. 可代替立即执行函数:

```javascript
{
  let a = 2;
  console.log(a)
}
```



```javascript
console.log(color)
var color = 'yellow'
```
var存在变量提升，所以结果为undefined
    

```javascript
console.log(color)
let color = 'yellow'
```
let 和 const 存在临时性死区，结果为ReferenceError


#### 箭头函数
```javascript
// 隐式返回(去掉括号，写在一行)
const greet =name=>name;

// 箭头函数中的this在定义的时候就被指定（指向父级的作用域），而且在以后也不会改变
var xich = {
    name:"xich",
    hobby:["singing","dancing","rap"],
    showHobbies:function(){
this.hobby.map((hobby)=>{                        
    console.log(`${this.name} loves ${hobby}`);
     })
    }
};
xich.showHobbies()
```

#### 标签模版（tagged template string）



```JavaScript
	function hightlight(strings,...values){ //string是字符串  values是变量
		console.log(strings,values)
		const hightlighted = values.map(value =>`<span class="hightlight">${value}</span>`);//先把变量高亮
		
    
    //方法1
		// let str = '';
		// strings.forEach((string,i)=>str +=`${string}${hightlighted[i]||''}`)
		// return str

		//方法2
		return strings.reduce((pre,curr,i)=>`${pre}${curr}${hightlighted[i]||''}`,'')
		//tips： reduce()加了第二个参数则将其作为第一项，index从0开始
	}
	const user  = 'mary',
		topic = 'learn to use markdown',
		// 如果以变量开头或结尾，则strings会多一个""
		sentence = hightlight`${user} has commmented on your topic ${topic}`;
	document.body.innerHTML = sentence; 
```
#### 新增字符串函数

```javascript
	const id = "1e324",
		fan = "I love you";

		//startsWith();
		console.log(id.startsWith('1'))
		console.log(id.startsWith('e',1))  //从0开始
		//endsWith();
		console.log(id.endsWith("e",2)) //从1开始
		//includes();
		console.log(id.includes("32"))
		//repeat();
		console.log(fan.repeat(3))
```


```javascript
		//依靠repeat对齐输出
		function padder(str,length = 20){
			return `${' '.repeat(Math.max(length - str.length,0))}${str}`
		}
		console.log(padder(id));
		console.log(padder(fan));
```
#### 对象解构

```javascript
	const Tom = {
		name:'Tom',
		age:25,
		family:{
			father:'Norah',
			mother:'Richard',
			brother:'Howard'
		}
	}

	//对象结解构
	const {name,age} = Tom;

	//如果想提前声明变量
	let name1 = '';
	({name:name1} = Tom);

	// 1.可嵌套
	const {mother,brother} = Tom.family;

	// 2.如果命名已被占用
	const father = ""
	const {father:f,sister = 'have no sister'} = Tom.family; //3.可设置默认值 sisiter
```
#### 数组解构（destructing-array）

```javascript
		let number = ["one",'two','three','for']

		const [one,,three] = number; //one='one' ,three='three'
		const [a,...rest] = number; //...rest 只能放在最后一位 

		let language = ['js','python'];
		const [a1,a2,a3 = 'java'] = language;  //可存在默认值

		//方便交换
		let x = 1;
		let y = 2;
		[x,y] = [y,x];
```

#### 数组新方法

###### 静态方法

1. Array.from(arrayLike[, mapFn[, thisArg]])：

   1. 可转换aruguments等数组
   2. 参数2自带map 

2. Array.of()：

   `const a = Array.of(1); //a=[1]`

###### 实例方法

```javascript
		const inventory = [
		{name:'apples',quanlity:2},
		{name:'bananas',quanlity:0},
		{name:'cherries',quanlity:5}
		]; 

		//.find()  三个参数item,index,array 只返回找到的第一个
		const bananas = inventory.find(fruit=>fruit.name ==='bananas');
		console.log(bananas); 

		//.findIndex()
		const bananasIndex = inventory.findIndex(fruit=>fruit.name ==='bananas');
		console.log(bananasIndex); //1

		//.some() 短路执行
		//.every() 短路执行
```

```js
	//自己实现find与findIndex
	Array.prototype.myfind = function(callback){
		for(let i =0;i<this.length;i++){
			if(callback(this[i],i)){
				return this[i]
			}
		}
	}
	Array.prototype.myfindIndex = function(callback){
		console.log(this)
		for(let i =0;i<this.length;i++){
			if(callback(this[i],i)){
				return i
			}
		}
	}
	const bananas2 = inventory.myfind(fruit=>fruit.name ==='bananas');
	const bananasIndex2 = inventory.myfindIndex(fruit=>fruit.name ==='bananas');
```
###### 除此之外常用的方法:

1. [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

2. [Array.prototype.reverse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

3. [ Array.prototype.includes()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

4. [Array.prototype.flat() ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)  return A new array with the sub-array elements concatenated into it.

#### 剩余参数

 ```javascript
function fn(a,...arg){
			console.log(arg)
}
fn(1,2,3,4) //arg=[2,3,4]
 ```



#### 扩展运算符

```javascript
		//所有可遍历的都可用... 扩展
		const a = [...'fdsjkfhj'];
		console.log(a);  //["f", "d", "s", "j", "k", "f", "h", "j"]

		const youngers = ['c11','c22','c33'];
		const olders = ['x11','x22','xx33'];
		//合并数组
		const member = [...youngers,...olders]
		console.log(member);

		//深复制 
		const current1 = [...member];
		const current2 = member.concat();
```

#### 扩展运算符练习

```html
<div class="heading">boxster</div>
```

```JavaScript
//未每一个字母包含一个<span>
const heading = document.querySelector(".heading");
heading.innerHTML = wrapWithSpan(heading.textContent);  //<span>b</span><span>o</span><span>x</span><span>s</span><span>t</span><span>e</span><span>r</span>
function wrapWithSpan(word){
	return [...word].map(letter =>`<span>${letter}</span>`).join('')
}
```
#### 对象字面量的扩展

```JavaScript
let name = 'cxw';
let age = '21';

const me = {
  name,  //属性名和所指向的变量名相同可简写
  age,
  say(){  //funciton简写
    return `my name is ${this.name},${age} year's old.`
  }
}
```

```javascript
//计算属性
let id = 0;
const userID = {
	[`user-${id++}`]:id,
	[`user-${id++}`]:id,
	[`user-${id++}`]:id,
}
```
```javascript
//计算属性 将两个array组合成一个object
const key = ['name','age','birthday'];
const value = ['cxw',22,'1998-10']

const cxw = {
	[key.shift()]:value.shift(),
	[key.shift()]:value.shift(),
	[key.shift()]:value.shift(),
}
```
#### Promise

```javascript
const report = [
	{name:'grit',job:'driver'},
	{name:'hovard',job:'writer'},
	{name:'kitty',job:'coder'}
]
const salaryTable = [
{job:'driver',salary:4000},
{job:'writer',salary:5000},
{job:'coder',salary:9000},
]

function getJob(name){
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{
			let repo = report.find(p=>p.name ==name)
			if (repo) {
				resolve(repo.job)
			}else{
				reject(Error('people not find')) //加Error 才会在报错的时候显示在这一行
			}
		},2000)
	})
}
function getSalary(repo){
	return new Promise((resolve,reject)=>{
		let salary = salaryTable.find(item=>item.job == repo);
		if(salary){
			resolve(salary.salary)
		}
		else{
			reject(Error('job not find')) //加Error 才会在报错的时候显示在这一行
		}
	})
}

getJob('kitt').then(
		repo=>{
			return getSalary(repo)
		}
	).then(salary=>{
		console.log(salary)
	}).catch(err =>{console.error(err)})
```
* * *

```javascript
let tasks = []
	for (var i=0;i<5;i++){
		((i)=>{ //立即执行函数 为了传入的值为当时的i
			tasks.push(
				new Promise((resolve)=>{
					setTimeout(()=>{
						console.log(new Date(),i);
						resolve(i);
					},i*1000)
				})
			)
		})(i);
	}
```
##### Promise.all
```javascript
Promise.all(tasks).then((e) => {
  //Promise.all(iterable) 方法返回一个 Promise 实例，此实例在 iterable 参数内所有的 promise 都“完成（resolved）”或参数中不包含 promise 时回调完成（resolve）；如果参数中  promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果。
	console.log(e)
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000); 
});
```
##### Promise.race
```javascript
Promise.race(tasks).then((e) => {  //Promise.race(iterable) 方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。
	console.log(e)
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000);   
});
```

#### Symbol

**不能用for in 遍历symbol,可作为私有属性在对象内部使用**



```javascript
const classRoom = {  //解决class中命名冲突
	[Symbol('lili')]:{grade:50},
	[Symbol('lili')]:{grade:60}
}
const syms = Object.getOwnPropertySymbols(classRoom).map(sym=>  //只有此方法能便利Symbol属性
	{
		// 注意⚠️所用的symbol都不相等
		console.log(sym);
		console.log(classRoom[sym])
		return classRoom[sym]     
	})
console.log(syms)
```

#### class类

```javascript
	let info ='info'
	class User{
		constructor(name,email){
			this.name = name
			this.email = email
		}
		//不能加，
		[info](){//可用计算属性
			console.log(`my name is ${this.name},my email is ${this.email}`)
		}

		static info ='user' //静态属性，只能通过User对象访问！！！！
		static description(){   //静态方法，只能通过User对象访问！！！！
			console.log('a user ')
		}

		set github(value){
			this.gitHubName = value;
		}
		get github(){
			return `https://github.com/${this.gitHubName}`
		}
	}
	const user1 = new User('cxw','sagskjagf@qq.com');
	user1.info();
	user1.github = 'chenxianwei'
	console.log(user1.github)
```
extends

```javascript
	class movieList extends Array{
		constructor(type,...item){
			super(...item);
			this.type = type;
		}

		add(obj){
			this.push(obj) //可继承array的push方法
		}

		sortByScore(limit=10){
			return this.sort((a,b)=>(a.score>b.score)?1:-1).slice(0,limit);
			// return this.sort((a,b)=>b.score-a.score).slice(0,limit);
		}
	}

	const list1 = new movieList('action movie',
		{name:'spyderman1',year:2009,score:8.1},
		{name:'spyderman2',year:2011,score:7.1},
		{name:'spyderman3',year:2014,score:8.8},)
	list1.add({name:'spyderman4',year:2016,score:8.6})
	console.log(list1);
	console.table(list1.sortByScore())
```

#### 模块

- 默认导出(只能导出一个)

  export default xxx
    ```javascript
  //module.js
  export default const name ='cxw';
    ```

    ```javascript
  //app.js
  import name from 'module.js'   //可任意命名
    ```

- 命名导出(能导出多个)

  ```javascript
  //module.js
  export const name ='cxw';
  export const age = 21;
  ```

  ```javascript
  //app.js
  import {name as nm,age} from 'module.js'   //要加大括号（不是解构，是一种导入多语法），名字要相同
  				//可利用as重命名
  ```

#### 遍历器

为数组写一个遍历器

```javascript
		Array.prototype.itetator = function(){
			let i = 0;
			let items = this  //!!!!!!!!!!!!!
			// console.log(this)	
			return {
				next(){
					// console.log(this)
					const done = i>=items.length;
					const value = done?undefined:items[i++];
					return{
						value,
						done
					}
				}
			}
		}
		//利用箭头函数
		Array.prototype.itetator2 = function(){
			let i = 0;
			// 不需要 let items = this  	
			return { //返回一个对象，有next方法
				next:()=>{
					// console.log(this)
					const done = i>=this.length;
					const value = done?undefined:this[i++];
					return{
						value,
						done
					}
				}
			}
		}
		const ary = ['red','blue','pink'];
		const ite = ary.itetator2();
```
```javascript
		//使用
		// ite.next()
		// {value: "red", done: false}
		// ite.next()
		// {value: "blue", done: false}
		// ite.next()
		// {value: "pink", done: false}
		// ite.next()
		// {value: undefined, done: true}
```
#### generator
```javascript
			function* colorlist(){
				yield 'red';
				yield 'blue';
				yield 'yellow';
			}
			const color = colorlist();
			console.log(color);    //其实是一个迭代器 有next方法 colorlist {<suspended>}
								  					 //迭代完成后colorlist {<closed>}
```

**应用**

```javascript
   		//应用：控制ajax流
   		function getRequest(url){
   			axios.get(url).then(res=>{
				user.next(res.data);  //执行下一步并把值赋给上一步
   			})
   		}

   		function* step2(){
	   		console.log('第一步')
	   		const user =  yield getRequest('https://api.github.com/users');
	   		console.log(user)

	   		console.log('第二步')
	   		const firstUser =  yield getRequest(`https://api.github.com/users/${user[0].login}`);
	   		console.log(firstUser)

	   		console.log('第三步')
	   		const followers =  yield getRequest(firstUser.followers_url);
	   		console.log(followers)
   		}

   		const user = step2();
   		user.next();//启动
```
```javascript
   		//利用then 结果同上
   		axios.get('https://api.github.com/users')
   		.then(res=>res.data)
   		.then(res=>axios.get(`https://api.github.com/users/${res[0].login}`))
   		.then(res=>axios.get(res.data.followers_url))
   		.then(res=>console.log(res.data))
```
```javascript
   		//结果同上 个人感觉用async 和 await比较多
   		async function readDate(){
   			let {date:user} = await axios.get('https://api.github.com/users');
   			let {date:firstUser}  = await axios.get(`https://api.github.com/users/${user[0].login}`);
   			let followers = await axios.get getRequest(firstUser.followers_url);
   			console.log(user,firstUser,followers);
   		}
```

#### Proxy


```javascript
		const a = {}
		const phoneHandler = {
			set(target,key,value){  //被代理的对象数据 a ，key值，=的值
				target[key] = value.match(/[0-9]/g).join('')
			},
			get(target,key){
				return target[key].replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3')
			}
		};
		const phoneNumber = new Proxy(a,phoneHandler)
```
```javascript
//自己乱写的数据双向绑定
var target = {
	name:"cxw"
};
function handle(){
	person.name = document.getElementById('input').value;
	console.log(1)
}

var person = new Proxy(target, {
  get: function(target, property,proxy) {
  	// console.log('取值啦')
  },
  set:function(target,property,value,proxy){
    // console.log('赋值啦');
    target[property] = value;
 	document.getElementById("input").value= value;
 	document.getElementById("p").innerText= value;

  }
});
```
#### set

```javascript
	const color = new Set(); //不能用索引获取值，自动去重
	color.add('red');   //add添加元素  自动去重
	color.add(5);
	color.add("5");
	console.log(color)

  console.log(color.has(5))  //true   //判断是否存在
  color.size  // 3 长度
  color.delete(5)  //true   删除

	color.clear()  //删全部

```

##### 遍历

1.forEach

2.for  of

3.`color.keys() `or  `color.values()`   返回一个遍历器

##### 数组去重:

```js
let ary = [1,3,1,2,3,1,2,4,1,8]
let newAry = [...new Set(ary)]
console.log(ary,newAry)
```

#### WeakSet

##### 与set区别

- 元素只能是对象
- 不能用for of
- 没有clear()

##### 解决内存泄漏

有点奇怪 这里

```js
let lily = {name:'lily',age:20}
let weakAry = new WeakSet([lily])
console.log(weakAry)
lily = null 
console.log(weakAry)
```



### Map

**key可以是任意类型**

```js
let myMap = new Map([['name',1]])
```

set

get

Size

Has

clear

delete

forEach

##### 应用:

存储关于某个对象的信息

```html
<!DOCTYPE html>
<html>
	<head>
		<meta charset='utf-8'>
		
		
	</head>
	<body>
		<button>🌹</button>
		<button>🐟</button>
		<button>✈️</button>
		<button>😊</button>
		<button>💗</button>
		

		<script type="text/javascript">
			let button = document.querySelectorAll('button');
			let btMap = new Map()
			button.forEach(item=>{
				btMap.set(item,0);
				item.addEventListener('click',function(){
					console.log(this)
					let count = btMap.get(item);
					btMap.set(this,count+1) 
					console.log(btMap)
				})
			})
		</script>
	</body>
</html>
```



### WeakMap

**自动垃圾回收**

不同:

- 没有size
- 不能循环
- 没clear
- key必须是对象