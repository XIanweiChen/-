### 相似之处

React 和 Vue 有许多相似之处，它们都有：

- 使用 Virtual DOM
- 提供了响应式 (Reactive) 和组件化 (Composable) 的视图组件。
- 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
- 支持props父子组件通讯,数据驱动(补) 



### [运行时性能](https://cn.vuejs.org/v2/guide/comparison.html#运行时性能)

在 Vue 应用中，组件的依赖是在渲染过程中自动追踪的，所以系统能精确知晓哪个组件确实需要被重渲染。你可以理解为每一个组件都已经自动获得了 `shouldComponentUpdate`，并且没有上述的子树问题限制。

Vue 的这个特点使得开发者不再需要考虑此类优化，从而能够更好地专注于应用本身。

### [HTML & CSS](https://cn.vuejs.org/v2/guide/comparison.html#HTML-amp-CSS)

#### JSX vs Templates

在 React 中，所有的组件的渲染功能都依靠 JSX。JSX 是使用 XML 语法编写 JavaScript 的一种语法糖。

使用 JSX 的渲染函数有下面这些优势：

- 你可以使用完整的编程语言 JavaScript 功能来构建你的视图页面,可以使用临时变量、JS 自带的流程控制、以及直接引用当前 JS 作用域中的值等等。



事实上 Vue 也提供了[渲染函数](https://cn.vuejs.org/v2/guide/render-function.html)，甚至[支持 JSX](https://cn.vuejs.org/v2/guide/render-function.html#JSX)。然而，我们默认推荐的还是模板。任何合乎规范的 HTML 都是合法的 Vue 模板，这也带来了一些特有的优势:
-  简单,易迁移

#### 组件作用域内的 CSS

react css模块化利用通过 CSS-in-JS 的方案

而在vue中只需要一个<style scoped>

最后，Vue 的单文件组件里的样式设置是非常灵活的。通过 [vue-loader](https://github.com/vuejs/vue-loader)，你可以使用任意预处理器、后处理器，甚至深度集成 [CSS Modules](https://vue-loader.vuejs.org/en/features/css-modules.html)——全部都在 `<style>` 标签内。

### [原生渲染](https://cn.vuejs.org/v2/guide/comparison.html#原生渲染)

React Native

Weex

### 其他不同(补)

- vue数据双向绑定,react单项流通
- react 只能setState,vue能直接改

### 数据双向绑定和单项数据流的优缺点?



所有数据只有一份，组件数据只有唯一的入口和出口，使得程序更直观更容易理解，有利于应用的可维护性



无论数据改变，或是用户操作，都能带来互相的变动，自动更新。适用于项目细节

*无需进行和单向数据绑定的那些CRUD*,方便

但不容易管理,debugger麻烦