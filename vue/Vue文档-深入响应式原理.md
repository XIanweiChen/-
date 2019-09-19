## [如何追踪变化](https://cn.vuejs.org/v2/guide/reactivity.html#如何追踪变化)

当你把一个普通的 JavaScript 对象传入 Vue 实例作为 `data` 选项，Vue 将遍历此对象所有的属性，并使用 [`Object.defineProperty`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 把这些属性全部转为 [getter/setter](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects#定义_getters_与_setters)。

每个组件实例都对应一个 **watcher** 实例，它会在组件渲染的过程中把“接触”过的数据属性记录为依赖。之后当依赖项的 setter 触发时，会通知 watcher，从而使它关联的组件重新渲染。![data](https://cn.vuejs.org/images/data.png)



## [检测变化的注意事项](https://cn.vuejs.org/v2/guide/reactivity.html#检测变化的注意事项)

由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，所以属性必须在 `data` 对象上存在才能让 Vue 将它转换为响应式的

之前已经在[列表渲染](https://cn.vuejs.org/v2/guide/list.html#注意事项)中讲过

## [声明响应式属性](https://cn.vuejs.org/v2/guide/reactivity.html#声明响应式属性)

**由于 Vue 不允许动态添加根级响应式属性!**，所以你必须在初始化实例前声明所有根级响应式属性，哪怕只是一个空值

## [异步更新队列](https://cn.vuejs.org/v2/guide/reactivity.html#异步更新队列)

Vue 在更新 DOM 时是**异步**执行的,只要侦听到数据变化，Vue 将开启一个**队列**，并缓冲在同一事件循环中发生的所有数据变更。如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。然后，在下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作

例子直接看原文,挺简单的

就是说`this.$nextTick`这个funtion,支持callback和promise



------

https://www.jianshu.com/p/bb5d1bede3ea

## [以下内容来自网络](https://juejin.im/post/5b80e60de51d4557b85fc8fc)

getter的方法主要用来进行依赖收集。setter方法会在对象被修改的时候触发（不存在添加属性的情况，添加属性请用Vue.set），这时候setter会通知闭包中的Dep，Dep中有一些订阅了这个对象改变的Watcher观察者对象，Dep会通知Watcher对象更新视图。

分析proxy(vm, `_data`, key)这行代码，将data上的属性挂载到vm上，再来看proxy方法的定义：

```js
 export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}
```

proxy通过defineProperty实现了代理，**把`target[sourceKey][key]`的读写变成了对target[key]的读写**。这就能解释刚才提出第二个的问题：为什么在mounted过程中能通过this.message打印出data中定义的message？

## template是如何编译成render function的？

Vue提供了两个版本，一个是Runtime+Compiler版本的，一个是Runtime only版本的。Runtime+Compiler是包含编译代码的，可以把编译过程放在运行时来做。而Runtime only是不包含编译代码的，所以需要借助webpack的vue-loader来把模版编译成render函数。

在实际开发当中，我们通常在组件中采用的是编写template模版。那template是如何编译的呢？来看一下编译的入口，定义在src/compiler/index.js中：

```js
 export const createCompiler = createCompilerCreator(function baseCompile (
  template: string,
  options: CompilerOptions
): CompiledResult {
  const ast = parse(template.trim(), options)
  if (options.optimize !== false) {
    optimize(ast, options)
  }
  const code = generate(ast, options)
  return {
    ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
})

```

编译主要有三个过程：

1.解析模版字符串生成AST

- AST（在计算机科学中，抽象语法树（abstract syntax tree或者缩写为AST），或者语法树（syntax tree），是源代码的抽象语法结构的树状表现形式，这里特指编程语言的源代码。）

```js
 const ast = parse(template.trim(), options)
```

parse 会用正则等方式解析 template模板中的指令、class、style等数据，形成AST树。AST是一种用Javascript对象的形式来描述整个模版，整个parse的过程就是利用正则表达式来顺序地解析模版，当解析到开始标签，闭合标签，文本的时候会分别对应执行响应的回调函数，从而达到构造AST树的目的。

举个例子：

```js
<div :class="c" class="demo" v-if="isShow">
    <span v-for="item in sz">{{item}}</span>
</div>
```

经过一系列的正则解析，会得到的AST如下：

```js
 {
    /* 标签属性的map，记录了标签上属性 */
    'attrsMap': {
        ':class': 'c',
        'class': 'demo',
        'v-if': 'isShow'
    },
    /* 解析得到的:class */
    'classBinding': 'c',
    /* 标签属性v-if */
    'if': 'isShow',
    /* v-if的条件 */
    'ifConditions': [
        {
            'exp': 'isShow'
        }
    ],
    /* 标签属性class */
    'staticClass': 'demo',
    /* 标签的tag */
    'tag': 'div',
    /* 子标签数组 */
    'children': [
        {
            'attrsMap': {
                'v-for': "item in sz"
            },
            /* for循环的参数 */
            'alias': "item",
            /* for循环的对象 */
            'for': 'sz',
            /* for循环是否已经被处理的标记位 */
            'forProcessed': true,
            'tag': 'span',
            'children': [
                {
                    /* 表达式，_s是一个转字符串的函数 */
                    'expression': '_s(item)',
                    'text': '{{item}}'
                }
            ]
        }
    ]
}
```

当构造完AST之后，下面就是优化这颗AST树。

2.optimize：优化AST语法树

```js
 optimize(ast, options)
```

为什么此处会有优化过程？我们知道Vue是数据驱动，是响应式的，但是template模版中并不是所有的数据都是响应式的，也有许多数据是初始化渲染之后就不会有变化的，那么这部分数据对应的DOM也不会发生变化。后面有一个 update 更新界面的过程，在这当中会有一个 patch 的过程， diff 算法会直接跳过静态节点，从而减少了比较的过程，优化了 patch 的性能。

来看下optimize这部分代码的定义，在src/compiler/optimize.js中：

```js
 export function optimize (root: ?ASTElement, options: CompilerOptions) {
  if (!root) return
  isStaticKey = genStaticKeysCached(options.staticKeys || '')
  isPlatformReservedTag = options.isReservedTag || no
  // first pass: mark all non-static nodes.
  markStatic(root)
  // second pass: mark static roots.
  markStaticRoots(root, false)
}

```

我们可以看到，optimize实际上就做了2件事情，一个是调用markStatic()来标记静态节点，另一个是调用markStaticRoots()来标记静态根节点。

3.codegen：将优化后的AST树转换成可执行的代码。

```js
 const code = generate(ast, options)
```

template模版经历过parse->optimize->codegen三个过程之后，就可以d得到render function函数了。









每当调用set时,就加入到dep  的数组中去,[调用]()

