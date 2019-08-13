# 第十章 DOM
## 10.1 层次节点

1. 文档节点是每个文档的根节点
2. 文档节点只有一个子节点（HTML元素，也称未文档元素）
3. 每个文档只能有一个文档元素
4. html 页面中文档元素始终是<html>元，而在xml中可能是任何元素

#### 10.1.1 Node类型

1. js中所有节点类型都继承自Node类型，因此所有节点类型都共享着相同的基本方法
2. 每个节点都拥有的属性
    1. nodeType：12种，大部分是1
    2. childNodes：
        1. 保存着一个Nodelist对象（类数组，不是Array实例）一般用[]访问，也可用 .item()
        2. 可使用Array.prototype.slice()方法将其转化成数组
    3. parentNode:指向文档树中的父节点:
        1. firstChild 和 lastChild返回childNodes中Nodelist的第一个和最后一个
        2. nextSibling 和 previousSibling
        3. haschildNodes()
    4. ownerDocuments:指向整个文档的文档节点


###### 3.操作节点
1.appendChild():
    
    1.向childNodes列表的末尾添加一个节点（若该节点已存在，则将其村原来的位置转移到新位置）
    2.返回值为加入的节点
    3.参数：插入的节点

2.insertBefore():
    
    参数1：插入的节点
    参数2:作为参照的节点

3.replaceChild():
    
    参数1：插入的节点
    参数2:要替换的节点

4.removeChild():
    被移除的节点仍归文档所有，只不过在文档中没有了自己的位置

###### 4.其他方法
1.cloneNode()：
    
    参数：true 表示深复制（复制节点即整个字节点树）
    潜复制（只复制节点）
    无父节点
2.normalize()：

    处理文档树中的文本节点：
    1.删除空文本节点
    2. 两个相邻的文本节点并成一个

#### 10.1.2 Document类型
document对象是HTMLDocument（继承自Document类型）的一个实例，表示整个HTML页面

* * *

Document节点具有以下特征：

    1.  nodeType的值为9
    2.  nodeName 的值为"#document"
    3.  nodeValue的值为null
    4.  parentNode的值为null
    5.  ownerDocument 的值为null
    6.  其子节点可能是一个DocumentType（最多一个),Element(最多一个），processingInstruction或Comment

* * *

###### 1.文档的子节点
<html>

    document.documentElement
<body>

    document.body
<!DOCTYPE>

    document.doctype

###### 2.文档信息

1.document.title
    
    可通过修改此属性改变页面标题
2.document.URL
    
    完整的URL
3.document.domain
    
    获取域名，可通过将每个页面的document.domain设置相同的值麦克写页面皆可以互相访问对方包含的JavaScript对象了    
    完整的URL
4.document.referrer

    连接到当前页面的那个页面的URL


​    
###### 3.查找元素

1.getElementById()
2.getElementsByTagName()
    
    1.返回一个NodeList，在HTML文档中是HTMLCollection对象（与NodeList十分相似）
    2.此方法有一个namedItem（）的方法，可通过name特性获取集合中发项(也可通过[ ])
3.getElementsByName()   HTMLDocument独有

    1.返回一个NodeList
    2.namedItem（）只会取得第一项

###### 4.特殊集合 
    1.document.anchors   包含文档所有带那么特性的<a>元素
    2.document.forms 包含文档所有<form>元素
    3.document.images 包含文档所有<images>元素
    4.document.links  包含文档中带href的<a>元素

###### 5.DOM一致性检测
    document.implementation.hasFeature()
    最好除了检测hasFeature之外，同时能力检测
###### 6.文档写入
    write（）：原样写入
    writeln（）：在字符串末尾加上\n
    open()和close()分别用于打开和关闭网页的输出流
**1.如果在文档加载结束后在调用document.write（）输出的内容将会重写整个页面
2. 可动态包含外部资源，如js脚本**
  
#### 10.1.3 Element类型
Element节点具有一下特征：
    
    1.nodeType的值为1
    2.nodeName的值为元素的标签名
    3.nodeValue的值为null
    4.parentNode可能是Document 或Element
    5.其字节点可能是Element，Text，Comment，ProcessingInstruction，CDATASection或EntityReference

**1.要访问元素的标签名可用nodeName或tagName
2.由于标签可能大写，最好用toLowerCase转换后在比较**

###### 1.HTML元素
HTMLElement类型直接继承自Element并添加了一些属性

每个HTML元素都存在一下标准属性：
    1.id
    2.title：有关元素的附加说明
    3.lang
    4.dir ：语言的方向 ltr   rtl
    5.className
###### 2.取得特性
**getAttribute()**
此函数与属性的值返回的值不一样：
    1.style
    2.onclick
###### 3.设置特性
**getAttribute()**
div.setAttribute("id","someid")
**removeAttribute()**
彻底删除元素的特性
###### 4.attributes属性
Element类型是使用attributes属性的唯一一个DOM节点

    NamedNodeMap {0: id, 1: style, id: id, style: style, length: 2}
    tx.attributes["id"].nodeName
    tx.attributes["id"].nodeValue

###### 5.创建元素
    document.createElement()
###### 6.元素的字节点
如有空格可能会有多余的text字节点

    function doSomethingToElement(element){
    		for(var i = 0,len  = element.childNodes.length;i<len;i++){
    			if(element.childNodes[i].nodeType == 1){
    				//do something
    				console.log(element.childNodes[i]);
    			}
    		}
    	}


​        

* * *
元素也支持getElementsByTagName()


#### 10.1.4 Text类型

* nodeType 的值为3;
* nodeName的值为"#text";
* nodeValue 的值为节点所包含的文本;
* parentNode是一个Element;
* 不支持(没有)子节点。
**可以通过 nodeValue 属性或 data 属性访问 Text 节点中包含的文本**

* appendData(text):将text添加到节点的末尾。
* deleteData(offset,count):从offset指定的位置开始删除 count个字符。insertData(offset,text):在offset指定的位置插人 text。
* replaceData(offset,count,text):用text替换从offset指定的位置开始到。count为止处的文本。
* splitText(offset):从offset指定的位置将当前文本节点分成两个文本节点。
*  substringData(offset,count):提取从offset指定的位置开始到 offset+coout为止

**文本节点还有一个length属性**


###### 1.创建文本节点
    document.createTextNode()
###### 2.规范文本节点
    normailzie（）
    删除空文本节点，合并相邻文本节点
 ###### 3.分割文本节点
    spliteText（）    参数：分割的职位（int）
    常用的DOM解析技术


​    
​    
#### 10.1.5 Comment类型（注释）

* nodeType:8
* nodeName："#commmet"
* nodeValue:注释的内容
* parentNode：可能是Document或Elem
* 不支持(没有)子节点

**document.createComment()**
浏览器不会识别位于</html>标签后的注释

#### 10.1.6 CDATASection类型

* nodeType 的值为4;
* nodeName 的值为"#cdata-section";
* nodeValue 的值是CDATA区域中的内容;
* parentNode 可能是 Document 或Element;
* 不支持(没有)子节点。
**CDATA区域只会出现在XML 文档中,因此多数浏览器都会把CDATA区域错逞地解板为或Element**

#### 10.1.7 DocumentType类型

* nodeType 时值为10;
* nodeName 的值为 doctype 的名称;
* nodeValue 的值为null;
* parentNode是 Document;
* 口不支持(没有)子节点。

#### 10.1.8 DocumentFragment类型 （文档片段）
* nodeType 的值为11;
* nnodeName 的值为"#document-fragment";
* nodeValue 的值为 null;
* parentNode 的值为null;
* 子节点可以是 Element,ProcessingInstruction,Comment,Text,CDATASection或EntityReference

**可作为一个仓库来使用，先向文档片段添加代码，在添加到节点中**

#### 10.1.9 Attr类型
从技术角度讲,特性就是存在于元素的**attributes**属性中的节点 

* nodeType 的值为2;
* nodeName的值是特性的名称;
* nodeValue 的值是特性的值;
* parentNode 的值为null;
* 在HTML中不支持(没有)子节点;
* ~~在XML中子节点可以是Text或EntityReference~~

尽管它们也是节点,但特性却不被认为是DOM 文档树的一部分

Attr对象有三个属性：

    1.name ：特性名称
    2.value：特性的值
    3.specified：布尔值，用于区别特性实在代码中指定的，还是默认的


​    
## 10.1 DOM操作技术
#### 10.2.1 动态脚本
1.指定外部脚本

```javascript
	function loadScript(url){
		var script = document.createElement("script");
		script.type = "text/javascript";
		script.src=url;
		document.body.appendChild(script);
	}
```
2.行内式方式

```javascript
	function loadScriptString(code){
		var script = document.createElement("script");
		script.type = "text/javascript";
		try{
			script.appendChild(document.createTextNode(code));
		}
		catch{
			script.text = code;
		}
		document.body.appendChild(script);	
	}
```
#### 10.2.2 动态样式

```javascript
	function loadStyles(url){
		var link = document.createElement("link");
		link.rel = "stylesheet";
		link.type = "text/css";
		link.href = url;
		document.head.appendChild(link);

	}

	function loadStyleString(css){
		var style = document.createElement("style");
		style.type = "text/css";
		try{
			style.appendChild(document.createTextNode(css));
		}
		catch(ex){
			style.styleSheet.cssText = css;
		}
		document.head.appendChild(style);

	}
```

#### 10.2.3 操作表格

```javascript
	var table  = document.createElement("table");
	table.border = 1;
	table.width = "100%";
	table.style = "text-align:center;";

	table.insertRow(0);
	table.rows[0].insertCell(0);
	table.rows[0].cells[0].appendChild(document.createTextNode("cell 1,1"));
	table.rows[0].insertCell(1);
	table.rows[0].cells[1].appendChild(document.createTextNode("cell 1,2"));    	

	table.insertRow(1);
	table.rows[1].insertCell(0);
	table.rows[1].cells[0].appendChild(document.createTextNode("cell 2,1"));
	table.rows[1].insertCell(1);
	table.rows[1].cells[1].appendChild(document.createTextNode("cell 2,2"));
	document.body.appendChild(table)        
```

#### 10.2.4 使用NodeList

NodeList ,NameNodeMap,HTMLCollection都是动态的
（做到过的那道面试题）
如果要迭代一个NodeList，最好使用length属性初始哈一个变量，再进行比较