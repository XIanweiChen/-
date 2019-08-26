# Vue 实例

### [组件化应用构建](https://cn.vuejs.org/v2/guide/#组件化应用构建)

```js
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li>{{todo.text}}</li>'
    })

    const vm = new Vue({ //new 出来的这个VUE对象就是vm
        el: '#app',
        data: { //这个data就是 M
            title: 'hello world',
            list: [
                { id: 0, text: '蔬菜' },
                { id: 1, text: '奶酪' },
                { id: 2, text: '随便其它什么人吃的东西' }
            ]
        }

    })
```

```js
        <ol>
        	<todo-item
        	v-for="item in list"
        	:todo='item'
        	:key="item.id"
        	></todo-item>
        </ol>
```

### [数据与方法](https://cn.vuejs.org/v2/guide/instance.html#数据与方法)

```js
// 我们的数据对象
var data = { a: 1 }

// 该对象被加入到一个 Vue 实例中
var vm = new Vue({
  data: data
})

// 获得这个实例上的属性
// 返回源数据中对应的字段
vm.a == data.a // => true

// 设置属性也会影响到原始数据
vm.a = 2
data.a // => 2

// ……反之亦然
data.a = 3
vm.a // => 3
```

#### **Tip:**

**值得注意的是只有当实例被创建时 `data` 中存在的属性才是响应式的,所以即使一个值开始它为空或不存在，那么还是需要设置一些初始值**

这里唯一的例外是使用 `Object.freeze()`，这会阻止修改现有的属性，也意味着响应系统无法再*追踪*变化。

#### **Object.freeze()** 

方法可以**冻结**一个对象。一个被冻结的对象再也不能被修改；冻结了一个对象则不能向这个对象添加新的属性，不能删除已有属性，不能修改该对象已有属性的可枚举性、可配置性、可写性，以及不能修改已有属性的值。此外，冻结一个对象后该对象的原型也不能被修改。`freeze()` 返回和传入的参数相同的对象。

```js
const obj = {
  prop: 42
};

Object.freeze(obj);

obj.prop = 33;
// Throws an error in strict mode

console.log(obj.prop);
// expected output: 42

```

#### `$`前缀的方法:

```js
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
```

### [实例生命周期钩子](https://cn.vuejs.org/v2/guide/instance.html#实例生命周期钩子)

不要在选项属性或回调上使用[箭头函数](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions)，比如 `created: () => console.log(this.a)` 或 `vm.$watch('a', newValue => this.myMethod())`。

因为箭头函数并没有 `this`，`this`会作为变量一直向上级词法作用域查找，直至找到为止

经常导致 `Uncaught TypeError: Cannot read property of undefined` 或 `Uncaught TypeError: this.myMethod is not a function` 之类的错误。

### [生命周期图示](https://cn.vuejs.org/v2/guide/instance.html#生命周期图示)![lifecycle](https://cn.vuejs.org/images/lifecycle.png)

# 模板语法



######  [v-once 指令](https://cn.vuejs.org/v2/api/#v-once)

你也能执行一次性地插值，当数据改变时，插值处的内容不会更新。但请留心这会影响到该节点上的其它数据绑定：

```js
<span v-once>这个将不会改变: {{ msg }}</span>
```



###### v-html:

双大括号会将数据解释为普通文本，而非 HTML 代码。为了输出真正的 HTML，你需要使用 `v-html`指令：

### [特性](https://cn.vuejs.org/v2/guide/syntax.html#特性)

Mustache 语法不能作用在 HTML 特性上，遇到这种情况应该使用 [v-bind 指令](https://cn.vuejs.org/v2/api/#v-bind)：

```js
<div v-bind:id="dynamicId"></div>
```

对于布尔特性 (它们只要存在就意味着值为 `true`)，`v-bind` 工作起来略有不同，在这个例子中：

```js
<button v-bind:disabled="isButtonDisabled">Button</button>
```

如果 `isButtonDisabled` 的值是 `null`、`undefined` 或 `false`，则 `disabled` 特性甚至不会被包含在渲染出来的 `<button>` 元素中。

### [使用 JavaScript 表达式](https://cn.vuejs.org/v2/guide/syntax.html#使用-JavaScript-表达式)

迄今为止，在我们的模板中，我们一直都只绑定简单的属性键值。但实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。

```js
{{ number + 1 }}

{{ ok ? 'YES' : 'NO' }}

{{ message.split('').reverse().join('') }}

<div v-bind:id="'list-' + id"></div>  !!!!
```

这些表达式会在所属 Vue 实例的数据作用域下作为 JavaScript 被解析。有个限制就是，每个绑定都只能包含**单个表达式**



### [动态参数](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)

从 2.6.0 开始，可以用方括号括起来的 JavaScript 表达式作为一个指令的参数：

```
<a v-bind:[attributeName]="url"> ... </a>
```

###### 对动态参数的值的约束:

特殊的 `null` 值可以被显性地用于移除绑定。

###### 对动态参数表达式的约束:

某些字符，例如**空格**和**引号**，放在 HTML 特性名里是无效的。同样，在 DOM 中使用模板时你需要**回避大写**键名

###### tip:浏览器会把特性名全部强制转为小写：

```js
<!-- 在 DOM 中使用模板时这段代码会被转换为 `v-bind:[someattr]` -->
<a v-bind:[someAttr]="value"> ... </a>
```





# 计算属性和侦听器

### [基础例子](https://cn.vuejs.org/v2/guide/computed.html#基础例子)

```js
    const vm = new Vue({ //new 出来的这个VUE对象就是vm
        el: '#app',
        data: { //这个data就是 M
            title: 'hello world',
        },
        computed:{
        	reverseMessage(){
        		return [...this.title].reverse().join('')
        	}
        }

    })
```

```html
    <div id='app'>
        <p>{{title}}</p>
        <p>{{reverseMessage}}</p>
    </div>
```

Tip:这里我们声明了一个计算属性 `reversedMessage`。我们提供的函数将用作属性 `vm.reversedMessage` 的 getter 函数

### [计算属性缓存 vs 方法](https://cn.vuejs.org/v2/guide/computed.html#计算属性缓存-vs-方法)

**计算属性:是基于它们的响应式依赖进行缓存的**。只在相关响应式依赖发生改变时它们才会重新求值。这就意味着只要 `title` 还没有发生改变，多次访问 `reversedMessage`计算属性会立即返回之前的计算结果，而不必再次执行函数。
这也同样意味着下面的计算属性将不再更新，因为 `Date.now()` 不是响应式依赖：

```js
computed: {
  now: function () {
    return Date.now()
  }
}
```



方法:相比之下，每当触发重新渲染时，调用方法将**总会**再次执行函数。

### [计算属性的 setter](https://cn.vuejs.org/v2/guide/computed.html#计算属性的-setter)

计算属性默认只有 getter ，不过在需要时你也可以提供一个 setter ：

```js
// ...
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
// ...
```

现在再运行 `vm.fullName = 'John Doe'` 时，setter 会被调用，`vm.firstName` 和 `vm.lastName`也会相应地被更新。

## [侦听器](https://cn.vuejs.org/v2/guide/computed.html#侦听器)

虽然计算属性在大多数情况下更合适，但有时也需要一个自定义的侦听器。这就是为什么 Vue 通过 `watch` 选项提供了一个更通用的方法，来响应数据的变化。当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。

```js
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  }
```

使用 `watch` 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态。这些都是计算属性无法做到的

除了 `watch` 选项之外，您还可以使用命令式的 [vm.$watch API](https://cn.vuejs.org/v2/api/#vm-watch)。

# Class 与 Style 绑定

## [绑定 HTML Class](https://cn.vuejs.org/v2/guide/class-and-style.html#绑定-HTML-Class)

### [对象语法](https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法)

**Tip:对象的话key是class 的名字,value是是否显示**

你可以在对象中传入更多属性来动态切换多个 class。此外，`v-bind:class` 指令也可以与普通的 class 属性共存。当有如下模板:

```js
<div
  class="static"
  v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

和如下 data：

```js
data: {
  isActive: true,
  hasError: false
}
```

结果渲染为：

```js
<div class="static active"></div>
```

------

绑定的数据对象不必内联定义在模板里：

```html
<div v-bind:class="classObject"></div>
```

```js
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

渲染的结果和上面一样。我们也可以在这里绑定一个返回对象的[计算属性](https://cn.vuejs.org/v2/guide/computed.html)。这是一个常用且强大的模式：

```js
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```

### [数组语法](https://cn.vuejs.org/v2/guide/class-and-style.html#数组语法)

**value是class的属性名**

我们可以把一个数组传给 `v-bind:class`，以应用一个 class 列表：

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

渲染为：

```html
<div class="active text-danger"></div>
```

------

以下两个效果相同(都是根据isActive判断active是否存在))

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

### [用在组件上](https://cn.vuejs.org/v2/guide/class-and-style.html#用在组件上)

当在一个自定义组件上使用 `class` 属性时，这些类将被添加到该组件的**根元素**上面。这个元素上已经存在的类不会被覆盖。

## [绑定内联样式](https://cn.vuejs.org/v2/guide/class-and-style.html#绑定内联样式)

### [对象语法](https://cn.vuejs.org/v2/guide/class-and-style.html#对象语法-1)

CSS 属性名可以用驼峰式 (camelCase) 或短横线分隔 (kebab-case，记得用引号括起来) 来命名：

**Tip：如果下面不是vue data中的属性的话也要夹引号**

```html
<p :style="{'font-size': '50px'}">title</p> 
```

直接绑定到一个样式对象通常更好，这会让模板更清晰:

```html
<div v-bind:style="styleObject"></div>
```

```js
data: {
  styleObject: {
    color: 'red',
    fontSize: '13px'
  }
}
```

同样的，对象语法常常结合返回对象的计算属性使用

### [数组语法](https://cn.vuejs.org/v2/guide/class-and-style.html#数组语法-1)

`v-bind:style` 的数组语法可以将多个样式对象应用到同一个元素上：

### [自动添加前缀](https://cn.vuejs.org/v2/guide/class-and-style.html#自动添加前缀)

当 `v-bind:style` 使用需要添加[浏览器引擎前缀](https://developer.mozilla.org/zh-CN/docs/Glossary/Vendor_Prefix)的 CSS 属性时，如 `transform`，Vue.js 会自动侦测并添加相应的前缀。

### [多重值⭐️](https://cn.vuejs.org/v2/guide/class-and-style.html#多重值)

> 2.3.0+

从 2.3.0 起你可以为 `style` 绑定中的属性提供一个包含多个值的数组，常用于提供多个带前缀的值，例如：

```html
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
```

这样写只会渲染数组中最后一个被浏览器支持的值。在本例中，如果浏览器支持不带浏览器前缀的 flexbox，那么就只会渲染 `display: flex`。

# 条件渲染

### [`v-if`](https://cn.vuejs.org/v2/guide/conditional.html#v-if)

基本:

```js
<h1 v-if="awesome">Vue is awesome!</h1>
<h1 v-else>Oh no 😢</h1>
```

#### 在 <template> 元素上使用 v-if 条件渲染分组

把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 `v-if`。

**最终的渲染结果将不包含 `<template>` 元素。**

```js
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>
```

### [`v-else`](https://cn.vuejs.org/v2/guide/conditional.html#v-else)

### [`v-else-if`](https://cn.vuejs.org/v2/guide/conditional.html#v-else-if)

类似于 `v-else`，`v-else-if` 也必须紧跟在带 `v-if` 或者 `v-else-if` 的元素之后

### [用 `key` 管理可复用的元素⭐️](https://cn.vuejs.org/v2/guide/conditional.html#用-key-管理可复用的元素)

**官网例子写的很好**

用key来表示是一个独立的元素

```js
<template v-if="loginType === 'username'">
  <label>Username</label>
  <input placeholder="Enter your username" key="username-input">
</template>
<template v-else>
  <label>Email</label>
  <input placeholder="Enter your email address" key="email-input">
</template>
```

## [`v-show`](https://cn.vuejs.org/v2/guide/conditional.html#v-show)

另一个用于根据条件展示元素的选项是 `v-show` 指令。用法大致一样：

**不同的是带有 `v-show` 的元素始终会被渲染并保留在 DOM 中。`v-show` 只是简单地切换元素的 CSS 属性 `display`。**

**!注意，`v-show` 不支持 `<template>` 元素，也不支持 `v-else`。**

## [`v-if` vs `v-show⭐️`](https://cn.vuejs.org/v2/guide/conditional.html#v-if-vs-v-show)

`v-if` 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

`v-if` 也是**惰性的**：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，`v-show` 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

**tip:一般来说，`v-if` 有更高的切换开销，而 `v-show` 有更高的初始渲染开销。因此，如果需要非常频繁地切换，则使用 `v-show` 较好；如果在运行时条件很少改变，则使用 `v-if` 较好。**

## [`v-if` 与 `v-for` 一起使用](https://cn.vuejs.org/v2/guide/conditional.html#v-if-与-v-for-一起使用)

**不推荐**同时使用 `v-if` 和 `v-for`

`v-for` 具有比 `v-if` 更高的优先级

当它们处于同一节点，`v-for` 的优先级比 `v-if` 更高，这意味着 `v-if` 将分别重复运行于每个 `v-for` 循环中。当你只想为*部分*项渲染节点时，这种优先级的机制会十分有用，如下：

```js
<li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo }}
</li>
```

# 列表渲染

## [用 `v-for` 把一个数组对应为一组元素](https://cn.vuejs.org/v2/guide/list.html#用-v-for-把一个数组对应为一组元素)

在 `v-for` 块中，我们可以访问所有父作用域的属性。`v-for` 还支持一个可选的第二个参数，即当前项的索引

```html
<ul id="example-2">
  <li v-for="(item, index) in items">
    {{ parentMessage }} - {{ index }} - {{ item.message }}
  </li>
</ul>
```

```js
var example2 = new Vue({
  el: '#example-2',
  data: {
    parentMessage: 'Parent',
    items: [
      { message: 'Foo' },
      { message: 'Bar' }
    ]
  }
})
```

## [在 `v-for` 里使用对象](https://cn.vuejs.org/v2/guide/list.html#在-v-for-里使用对象)

你也可以用 `v-for` 来遍历一个对象的属性。



附带三个参数 value, key, index

```js
<div v-for="(value, key, index) in object">
  {{ index }}. {{ key }}: {{ value }}
</div>
```

## [维护状态](https://cn.vuejs.org/v2/guide/list.html#维护状态)

如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，

这个默认的模式是高效的，但是**只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出**。

建议尽可能在使用 `v-for` 时提供 `key` attribute，除非遍历输出的 DOM 内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。

## [数组更新检测](https://cn.vuejs.org/v2/guide/list.html#数组更新检测)

### [注意事项❕](https://cn.vuejs.org/v2/guide/list.html#注意事项)

由于 JavaScript 的限制，Vue **不能**检测以下数组的变动：

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

举个例子：

```js
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的
vm.items.length = 2 // 不是响应性的
```

解决方法:
利用set和splice

```js
// Vue.set

Vue.set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)
```

## [对象变更检测注意事项](https://cn.vuejs.org/v2/guide/list.html#对象变更检测注意事项)

对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性。但是，可以使用 `Vue.set(object, propertyName, value)` 方法向嵌套对象添加响应式属性

```js
var vm = new Vue({
  data: {
    userProfile: {
      name: 'Anika'
    }
  }
})
```

你可以添加一个新的 `age` 属性到嵌套的 `userProfile` 对象：

```js
Vue.set(vm.userProfile, 'age', 27)
```

添加多个属性:

```js

vm.userProfile = Object.assign({}, vm.userProfile, {
  age: 27,
  favoriteColor: 'Vue Green'
})
```

# [事件处理](https://cn.vuejs.org/v2/guide/events.html)

Tips:

```html
 <div @click="alert('ctrl')">Do something</div>
```

错误 alert未定义

## [内联处理器中的方法⭐️](https://cn.vuejs.org/v2/guide/events.html#内联处理器中的方法)

带()的就是内联

```js
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```js
new Vue({
  el: '#example-3',
  methods: {
    say: function (message) {
      alert(message)
    }
  }
})
```

⭐️有时也需要在内联语句处理器中访问原始的 DOM 事件。可以用特殊变量 `$event` 把它传入方法：

```js
<button v-on:click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
```

```js
// ...
methods: {
  warn: function (message, event) {
    // 现在我们可以访问原生事件对象
    if (event) event.preventDefault()
    alert(message)
  }
}
```

## [事件修饰符](https://cn.vuejs.org/v2/guide/events.html#事件修饰符)

.stop 阻止冒泡

.prevent  阻止默认事件

.capture  使用捕获机制

.self   只有点击是自身元素才触发事件

.once 只触发一次



> 使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 `v-on:click.prevent.self` 会阻止**所有的点击**，而 `v-on:click.self.prevent` 只会阻止对元素自身的点击。

Vue 还对应 [`addEventListener` 中的 `passive` 选项](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters)提供了 `.passive` 修饰符。

```js
<!-- 滚动事件的默认行为 (即滚动行为) 将会立即触发 -->
<!-- 而不会等待 `onScroll` 完成  -->
<!-- 这其中包含 `event.preventDefault()` 的情况 -->
<div v-on:scroll.passive="onScroll">...</div>
```

passive: [Boolean](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Boolean)，设置为true时，表示 `listener` 永远不会调用 `preventDefault()`。

## [按键修饰符](https://cn.vuejs.org/v2/guide/events.html#按键修饰符)

在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符：

```js
<!-- 只有在 `key` 是 `Enter` 时调用 `vm.submit()` -->
<input v-on:keyup.enter="submit">  //实现enter提交表单
```

你可以直接将 [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) 暴露的任意有效按键名转换为 kebab-case 来作为修饰符。

```js
<input v-on:keyup.page-down="onPageDown">
```

在上述示例中，处理函数只会在 `$event.key` 等于 `PageDown` 时被调用。

### [`.exact` 修饰符](https://cn.vuejs.org/v2/guide/events.html#exact-修饰符)

精确批撇

```html
<!-- 没有任何系统修饰符被按下的时候才触发 -->
<button @click.exact="onClick">A</button>
```

### [鼠标按钮修饰符](https://cn.vuejs.org/v2/guide/events.html#鼠标按钮修饰符)

> 2.2.0 新增

- `.left`
- `.right`
- `.middle`

这些修饰符会限制处理函数仅响应特定的鼠标按钮。



## [为什么在 HTML 中监听事件?](https://cn.vuejs.org/v2/guide/events.html#为什么在-HTML-中监听事件)

使用 `v-on` 有几个好处：

1. 扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
2. 因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
3. 当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何清理它们。





# 表单输入绑定

## [基础用法](https://cn.vuejs.org/v2/guide/forms.html#基础用法)

> `v-model` 会忽略所有表单元素的 `value`、`checked`、`selected` 特性的初始值而总是将 Vue 实例的数据作为数据来源。你应该通过 JavaScript 在组件的 `data` 选项中声明初始值。

### [复选框](https://cn.vuejs.org/v2/guide/forms.html#复选框)

单个复选框，绑定到布尔值

多个复选框，绑定到同一个数组

## [修饰符](https://cn.vuejs.org/v2/guide/forms.html#修饰符)

### [`.lazy`](https://cn.vuejs.org/v2/guide/forms.html#lazy)

在默认情况下，`v-model` 在每次 `input` 事件触发后将输入框的值与数据进行同步 (除了[上述](https://cn.vuejs.org/v2/guide/forms.html#vmodel-ime-tip)输入法组合文字时)。你可以添加 `lazy` 修饰符，从而转变为使用 `change` 事件进行同步：

```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

### [`.number`](https://cn.vuejs.org/v2/guide/forms.html#number)

如果想自动将用户的输入值转为数值类型，可以给 `v-model` 添加 `number` 修饰符：

```html
<input v-model.number="age" type="number">
```

### [`.trim`](https://cn.vuejs.org/v2/guide/forms.html#trim)

如果要自动过滤用户输入的首尾空白字符，可以给 `v-model` 添加 `trim` 修饰符：

```html
<input v-model.trim="msg">
```



# 组件基础

### [`data` 必须是一个函数](https://cn.vuejs.org/v2/guide/components.html#data-必须是一个函数)

**一个组件的 data 选项必须是一个函数**，因此每个实例可以维护一份被返回对象的独立的拷贝

如果 Vue 没有这条规则，点击一个按钮就可能会像如下代码一样影响到*其它所有实例*

## [监听子组件事件](https://cn.vuejs.org/v2/guide/components.html#监听子组件事件)

自组件$emit提交事件

```js
<button v-on:click="$emit('enlarge-text')">
  Enlarge text
</button>
```

父组件响应事件

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += 0.1"
></blog-post>
```

### [使用事件抛出一个值⭐️⭐️](https://cn.vuejs.org/v2/guide/components.html#使用事件抛出一个值)

`$emit` 的第二个参数来提供值

```js
<button v-on:click="$emit('enlarge-text', 0.1)">
  Enlarge text
</button>
```

然后当在父级组件监听这个事件的时候，我们可以通过 `$event` 访问到被抛出的这个值：

```html
<blog-post
  ...
  v-on:enlarge-text="postFontSize += $event"
></blog-post>
```

或者，如果这个事件处理函数是一个方法：

```html
<blog-post
  ...
  v-on:enlarge-text="onEnlargeText"
></blog-post>
```

那么这个值将会作为第一个参数传入这个方法：

```js

methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

### [在组件上使用 `v-model`⭐️⭐️⭐️](https://cn.vuejs.org/v2/guide/components.html#在组件上使用-v-model)

自定义事件也可以用于创建支持 `v-model` 的自定义输入组件。记住：

```html
<input v-model="searchText">
```

等价于：

```html
<input
  v-bind:value="searchText"
  v-on:input="searchText = $event.target.value"
>
```

当用在组件上时，`v-model` 则会这样：

```html

<custom-input
  v-bind:value="searchText"
  v-on:input="searchText = $event"
></custom-input>
```

为了让它正常工作，这个组件内的 `<input>` 必须：

- 将其 `value` 特性绑定到一个名叫 `value` 的 prop 上
- 在其 `input` 事件被触发时，将新的值通过自定义的 `input` 事件抛出

写成代码之后是这样的：

```html
Vue.component('custom-input', {
  props: ['value'],
  template: `
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    >
  `
})
```

现在 `v-model` 就应该可以在这个组件上完美地工作起来了：

```html
<custom-input v-model="searchText"></custom-input>
```

## [动态组件](https://cn.vuejs.org/v2/guide/components.html#动态组件)

有的时候，在不同组件之间进行动态切换是非常有用的，比如在一个多标签的界面里

上述内容可以通过 Vue 的 `<component>` 元素加一个特殊的 `is` 特性来实现：

```html
<component v-bind:is="currentTabComponent"></component>
```

## [解析 DOM 模板时的注意事项](https://cn.vuejs.org/v2/guide/components.html#解析-DOM-模板时的注意事项)

有些 HTML 元素，诸如 `<ul>`、`<ol>`、`<table>` 和 `<select>`，对于哪些元素可以出现在其内部是有严格限制的。而有些元素，诸如 `<li>`、`<tr>` 和 `<option>`，只能出现在其它某些特定的元素内部。

这会导致我们使用这些有约束条件的元素时遇到一些问题。例如：

```html
<table>
  <blog-post-row></blog-post-row>
</table>
```

这个自定义组件 `<blog-post-row>` 会被作为无效的内容提升到外部，并导致最终渲染结果出错。幸好这个特殊的 `is` 特性给了我们一个变通的办法：

```html
<table>
  <tr is="blog-post-row"></tr>
</table>
```

需要注意的是**如果我们从以下来源使用模板的话，这条限制是不存在的**：

- 字符串 (例如：`template: '...'`)
- [单文件组件 (`.vue`)](https://cn.vuejs.org/v2/guide/single-file-components.html)
- [`<script type="text/x-template">`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Templates)

