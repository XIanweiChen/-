# 第八章 BOM
## 8.1 window对象
    在浏览器中，window对象就是JavaScript访问浏览器窗口的一个借口，有事ECMAScript规定的Global对象
#### 8.1.1 全局作用域
    全局作用域中声明的变量，函数都会变成window对象的属性和方法。

定义在全局变量和window对象上直接定义属性的不同：
    
    全局变量不能通过delete操作符删除（原因：configurable为false）

#### 8.1.2 窗口关系及框架（感觉不常用）
1.如果页面中办函一个框架，则每个框架都有自己的window对象。并保存在frames集合中
2.每个window对象都有一个name属性，其中包含框架名称 
 top.frames[0]

    top：始终指向最高（最外）层的框架
    parent：始终指向当前框架的直接上层
    self：始终指向window


​    
#### 8.1.3 窗口位置
```javascript
	var leftPos = (typeof window.screenLeft == "number")?window.screenLeft : window.screenX;
	var topPos = (typeof window.screentop == "number")?window.screentop : window.screenY;
```


​        
​    window.moveTo()
​    window.moveBy()

#### 8.1.4 窗口大小
表示该容器视图区的大小（减去边框宽度）
    
```javascript
  innerWidth
  innerHeight
```
返回浏览器本身尺寸
    
```javascript
outerWidth
outerHeight
document.documentElement.clientWidth
document.documentElement.clientHeight
```

body的宽高

```javascript
document.body.clientHeight
document.body.clientWidth
```


​    
window.resizeTo()
window.resizeBy()


#### 8.1.5 导航和打开窗口
window.open()
    
    参数1：要加载的url
    餐数2：窗口目标
    餐数3：一个特性字符串
    餐数4：一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值


​    
​    var wd = window.open("http://www.baidu.com","","height=400,width=400,top=10,left=10,resizable=yes");
​    wd.resizeTo(1500,1500);
​    wd.close();
​    

    console.log(wd.opener)   //指向打开它的原始窗口对象  
    wd.opener = null //切断连接，不可恢复


​    
#### 8.1.6 间歇调用和超时调用
超时调用：

    setTimeout():
    参数1：要执行的代码
    参数2:毫秒表示的时间
    返回值：数值ID  可用于取消 clearTimeout()
**经过该事件后代码不一定执行（JS是单线程解析器），只有当前队列时空的才会立即执行 ！！ ！！ ！！**

间歇调用:

    setTimeInterval():
    参数1：要执行的代码
    参数2:毫秒表示的时间
    返回值：数值ID  可用于取消 clearTimeInterval()


​    
 要设置取消的边界，不然会一直执行
 推荐用超时调用代替间歇调用（原因：最后一个间歇调用可能会在前一个间歇调用结束之前启动）

#### 8.1.7 系统对话框
alert()

    无返回值 undefined
confirm()

    点击确定返回true，关闭或取消返回false
propmt()

    参数1:标题
    参数2:类似placeholder（可选）
    点击确定返回输入的值，关闭或取消返回null

## 8.2 location对象

protocal hostname port pathname search hash

host href

#### 8.2.1 查询字符串参数

```javascript
function getQueryStringArgs(){
		var qs = (location.search.length > 0 ? location.search.substring(1) : "");
		args = [];
		items = (qs.length ? qs.split("&"):[]);
		[item,name,value] = [null,null,null];

		for(i = 0;i<items.length;i++){
			item = items[i].split("=");
			name = item[0];
			value = item[1];
			if (name.length) {
				args[name] = value;
			}
		}
		return args

	}
```

#### 8.2.2 位置操作
###### 1.location.assign（）
以下相同
    location.assign("https://www.baidu.com/")
    location="https://www.baidu.com/"
   （常用） location.href = "https://www.baidu.com/"

###### 2.location.replace（）

    浏览器不会在历史记录中生成新记录，在调用replace（）方法后，用户不能回到前一个页面

###### 2.location.reload（）
    如果上次请求以来并没有变过，页面就会从浏览器缓存中重新加载。如果要强制从服务器重新加载，需要传入true参数


​    
## 8.2 navigator对象

## 8.3 screen对象

## 8.3 history对象
hisotry.go() 
    接收一个参数，+前 -向后
    如果是网址则跳到最近包含此网站的页面（不论向前向后）
    
hisotry.back() 向前一页
hisotry.forward()   向后一页