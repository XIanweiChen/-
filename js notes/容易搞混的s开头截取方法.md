#### `join`和 `split`

```js
		let strAry = ['as','asd','sdg','nkvlsdnv'];

		//join和 split
		let joinStr  = strAry.join(',');     //Array.prototype.join()
		let splitStr = joinStr.split(',');   // str.split([separator[, limit]])
```

### String:

  参数1：开始位置  参数2：结束位置（不包含):

#### `slice`:

所有负值加上字符长度

#### `substring`:

所有负值全变成0

####  ` subStr`：

   参数1：开始位置  参数2：字符长度
  当传入负数:
    参数1加上字符长度，参数2变成0

### Array:

#### ` slice（）`：

返回起始于结位置之间的值
**不会影响原数组的值**
**[ )类型**
可传入负数（-1表示最后一）
                                                                                

```javascript
	var color =  ["red", "yellow", "red", "pink", "blue"]；
	var color2 = color.slice(1);   //["yellow", "red", "pink", "blue"];
  var color2 = color.slice(1,4);   // ["yellow", "red", "pink"];
```

#### `splice（）`：

**3种功能:**
删除（**splice（0,2）**）
插入（**splice（2,0,"red"）**）
替换（**splice（2,1,"red","blue"）**）

**返回值：返回被删除的元素组成的数组**
**！！会影响原数组的值**

```
参数1：起始位置
参数2：删除的个数
参数3以后：要加入的值
```

#### 