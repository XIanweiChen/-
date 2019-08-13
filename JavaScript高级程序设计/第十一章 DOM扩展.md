# 第十一章 DOM扩展
## 11.1 选择API
#### 11.1.1 querySelector()方法
    返回与该模式匹配的第一个元素，没有就返回null
#### 11.1.2 querySelectorAll()方法
    返回所有匹配的元素
    返回NodeList实例（不管匹配到多少元素/是否匹配到）
#### 11.1.3 matchesSelector()方法
    如果调用元素与该选择符匹配，返回true
    不同浏览器的函数不同  


## 11.2 元素遍历 ⭐️
Element Traversal API为DOM元素添加了以下5个属性：

    1.childElementCount:返回子元素(不包括文本节点和注释)的个数。
    2.firstElementChild:指向第一个子元素;firstChild的元素版。
    3.lastElementChild:指向最后一个子元素;lastChild的元素版。
    4.previousElementSibling:指向前一个同辈元素;previoussibling的元素版。
    5.nextElementSibling:指向后一个同辈元素;nextsibling 的元素版。
**利用这些元素不必担心空白文本节点**


## 11.3 HTML5

#### 11.3.1 与类相关的扩充
1.getElementsByClassName()

    可传入多个类名，先后顺序无所谓
    返回Nodelist
2 ClassList属性
    add
    contains
    remove
    toggle
    
#### 11.3.2 焦点管理 ？
document.activeElement：

    获取当前的焦点元素
获得焦点的方式：
    
    页面加载，用户输入（通常通过tab键）和代码中调用focus（）
document.hasFocus()
    确定文档是否获得焦点
    
一个div用了focus（）无效？？？
#### 11.3.3 HTMLDocument的变化
HTML5扩展了HTMLDocument

1.readyState属性

    document.readyState:
        loading
        complete
2.兼容模式

    document.compatMode
        标注模式："CSS1Compat"
        混在模式：“BackCompat”

3.head属性
    document.head
    兼容方法:
    
        var head = document.head || document.getElementsByTagName("head")

#### 11.3.4 字符集属性
1. document.charset
2. document.defaultcharset

#### 11.3.5 自定义数据属性
HTML5规定可以为元素添加非标准的属性，但要添加前缀data-

可通过直接添加：

    <div id="tx" data-l1="我要水平垂直居中…………">我要水平垂直居中…………</div>

**可通过dataset访问，修改，添加**
#### 11.3.6 插入标记
    解决给文档插入大量新HTML标记的麻烦的问题
###### 1.innerHTML属性
读模式：返回调用元素的所有字节点（包括元素，注释和文本节点）对应的HTML标记
写模式：innerHTML的值会被解析为DOM子树，替换调用元素原来的所有节点

* * *
大多数浏览器中通过innerHTML插入<script>元素不会执行其中的脚本

    tx.innerHTML = "<input type=\"hidden\"><script defer>alert('hi');<\/script>";
**隐藏<input>不会影响页面的布局（首选）**

 ###### 2.outerHTML属性
**返回调用他的元素及其所有字节点的HTML标签**

 ###### 3.insertAdjacentHTML()方法
参数1:
    <!-- beforebegin -->
    <p>
    <!-- afterbegin -->
    foo
    <!-- beforeend -->
    </p>
    <!-- afterend -->
    
参数2:element节点

​    

 ###### 4.性能与内存问题
    调用上述方法时最好手工删除要被替换的所有事件处理程序和JS对象属性

#### 11.3.7 scrollIntoView()
默认true：让调用元素与视口顶部平齐
false：元素尽可能全部出现在视口中

## 11.4 专有扩展
#### 11.4.1 文档模式
    document.documentMode  好像只有IE有用
#### 11.4.2 children
    (HTMLCollection)只包含是元素的字节点
#### 11.4.3 contains()
    接收一个参数，即要检测的节点

compareDocumentPosition():
    1  无关（给定节点不在当前文档中）
    2  居前
    4   居后
    5   包含
    16  被包含
#### 11.4.4 插入文本
###### 1.innerText
    读：按照由深到浅将子文档树的所有文本拼接起啦
    写：删除所有节点，将其替换
    innerText||textContent
###### 1.outerText