# 第十二章 DOM2和DOM3
## 12.3 遍历
#### 12.3.1 NodeIterator
    root:想要作为搜索起点的树中的节点。
    whatToShow:表示要访问哪些节点的数字代码。
    filter:是一个NodeFilter对象,或者一个表示应接收还是拒绝某种特定节点的函数（可为null）
    entityReferenceExpansion:布尔值,表示是否要拓展实体引用.达个参数在HTML中没有用,因为其中的实体引用不能扩展。

* * *


    whatToShow 参数是一个位掩码,通过应用一或多个过滤器(filter)来确定要访问哪些节占参数的值以常量形式在NodeFilter 类型中定义,如下所示。
    NodeFilter.SHOW_ALL:显示所有类型的节点。
    NodeFilter.SHOW_ELEMENT:显示元素节点。
    NodeFilter.SHOW_ATTRIBUTE:显示特性节点。由于DOM结构原因,实际上不能使用这NodeFilter.SHOW_TEXT:显示文本节点。
    NodeFilter.SHOW_CDATA_SECTION:显示CDATA节点。对HTML页面没有用。
    NodeFilter.SHOW_ENTITY_REFERENCE:显示实体引用节点。对HTML页面没有用。口NodeFilter.SHOW_ENTITYE:显示实体节点。对HTML页面没有用。
    NodeFilter.SHOW_PROCESSING_INSTRUCTION:显示处理指令节点。对HTML页面口 NodeFilter.SHOW_COMMENT:显示注释节点。
    NodeFilter.SHOW_DOCUMENT:显示文档节点。
    NodeFilter.SHOW_DOCUMENT_TYPE:显示文档类型节点。
    NodeFilter.SHOW_DOCUMENT_FRAGMENT:显示文档片段节点。对HTML页面没有用D NodeFilter.SHOW NOTATION:显示符号节点


**除了NodeFilter.SHOW_ALL之外可以通过位操作符组合多个选项**

每个NodeFillter对象只有一个方法acceptNode（）
他是一个抽象类，不能直接创建实例

```javascript
	var nodeIterator = document.createNodeIterator(
	    document,
	    NodeFilter.SHOW_ELEMENT,
        function(node) {
	        return node.nodeName.toLowerCase() === 'div' ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
	    }
	);
	var pars = [];
	var currentNode;
	while ( currentNode = nodeIterator.nextNode()) {
	  pars.push(currentNode);
	}
```

NodeIterator有两个方法 nextNode（）  和previousNode（）
第一次调用nextNode（）会指向跟节点