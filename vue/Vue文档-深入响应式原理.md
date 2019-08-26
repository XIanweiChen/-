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