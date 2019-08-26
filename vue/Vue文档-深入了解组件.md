

# 组件注册

## [组件名](https://cn.vuejs.org/v2/guide/components-registration.html#组件名)

定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

## [全局注册](https://cn.vuejs.org/v2/guide/components-registration.html#全局注册)

```js
Vue.component('my-component-name', {
  // ... 选项 ...
})
```

这些组件是**全局注册的**。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (`new Vue`) 的模板中

## [局部注册](https://cn.vuejs.org/v2/guide/components-registration.html#局部注册)


在这些情况下，你可以通过一个普通的 JavaScript 对象来定义组件：

```js
var ComponentA = { /* ... */ }
var ComponentB = { /* ... */ }
var ComponentC = { /* ... */ }
```

然后在 `components` 选项中定义你想要使用的组件：

```js

new Vue({
  el: '#app',
  components: {
    'component-a': ComponentA,
    'component-b': ComponentB
  }
})
```

简写

```js
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  },
  // ...
}
```

注意在 ES2015+ 中，在对象中放一个类似 `ComponentA` 的变量名其实是 `ComponentA: ComponentA` 的缩写，即这个变量名同时是：

- 用在模板中的自定义元素的名称
- 包含了这个组件选项的变量名

### [基础组件的自动化全局注册 (不太懂)](https://cn.vuejs.org/v2/guide/components-registration.html#基础组件的自动化全局注册)

幸好如果你使用了 webpack (或在内部使用了 webpack 的 [Vue CLI 3+](https://github.com/vuejs/vue-cli))，那么就可以使用 `require.context` 只全局注册这些非常通用的基础组件。这里有一份可以让你在应用入口文件 (比如 `src/main.js`) 中全局导入基础组件的示例代码：

```js
import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  // 其组件目录的相对路径
  './components',
  // 是否查询其子目录
  false,
  // 匹配基础组件文件名的正则表达式
  /Base[A-Z]\w+\.(vue|js)$/
)

requireComponent.keys().forEach(fileName => {
  // 获取组件配置
  const componentConfig = requireComponent(fileName)

  // 获取组件的 PascalCase 命名
  const componentName = upperFirst(
    camelCase(
      // 获取和目录深度无关的文件名
      fileName
        .split('/')
        .pop()
        .replace(/\.\w+$/, '')  //'比如./components/mainpage/BaseAbotton.vue'==>BaseAbotton
    )
  )

  // 全局注册组件
  Vue.component(
    componentName,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
```

记住**全局注册的行为必须在根 Vue 实例 (通过 new Vue) 创建之前发生**。[这里](https://github.com/chrisvfritz/vue-enterprise-boilerplate/blob/master/src/components/_globals.js)有一个真实项目情景下的示例。

## [Prop 的大小写 (camelCase vs kebab-case) ❕](https://cn.vuejs.org/v2/guide/components-props.html#Prop-的大小写-camelCase-vs-kebab-case)

HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：

```js

Vue.component('blog-post', {
  // 在 JavaScript 中是 camelCase 的
  props: ['postTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})

```

```html
<!-- 在 HTML 中是 kebab-case 的 -->
<blog-post post-title="hello!"></blog-post>
```



**重申一次，如果你使用字符串模板，那么这个限制就不存在了。** ???

## [Prop 类型](https://cn.vuejs.org/v2/guide/components-props.html#Prop-类型)

**tip:不加bind的通通一string类型传入**

到这里，我们只看到了以字符串数组形式列出的 prop：

```js
props: ['title', 'likes', 'isPublished', 'commentIds', 'author']
```

但是，通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型：

```js
props: {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```

### [传入一个布尔值⭐️](https://cn.vuejs.org/v2/guide/components-props.html#传入一个布尔值)

```html
<!-- 包含该 prop 没有值的情况在内，都意味着 `true`。-->
<blog-post is-published></blog-post>

<!-- 即便 `false` 是静态的，我们仍然需要 `v-bind` 来告诉 Vue -->
<!-- 这是一个 JavaScript 表达式而不是一个字符串。 否则false会以stirng 的类型传入 !!!!!!!!!!!!!!-->
<blog-post v-bind:is-published="false"></blog-post>

<!-- 用一个变量进行动态赋值。-->
<blog-post v-bind:is-published="post.isPublished"></blog-post>
```

### [传入一个对象](https://cn.vuejs.org/v2/guide/components-props.html#传入一个对象)

也需要加bind,否则会以stirng 的类型传入

### [传入一个对象的所有属性](https://cn.vuejs.org/v2/guide/components-props.html#传入一个对象的所有属性)

如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 `v-bind` (取代 `v-bind:prop-name`)。例如，对于一个给定的对象 `post`：

```js
post: {
  id: 1,
  title: 'My Journey with Vue'
}
```

下面的模板：

```html
<blog-post v-bind="post"></blog-post>
```

等价于：

```html
<blog-post
  v-bind:id="post.id"
  v-bind:title="post.title"
></blog-post>
```

## [单向数据流](https://cn.vuejs.org/v2/guide/components-props.html#单向数据流)

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**,这样会防止从子组件意外改变父级组件的状态

**不**应该在一个子组件内部改变 prop

这里有两种常见的试图改变一个 prop 的情形：

1. **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。**在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

   ```js
   props: ['initialCounter'],
   data: function () {
     return {
       counter: this.initialCounter
     }
   }
   ```

2. **这个 prop 以一种原始的值传入且需要进行转换。**在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

   ```js
   props: ['size'],
   computed: {
     normalizedSize: function () {
       return this.size.trim().toLowerCase()
     }
   }
   ```

## [Prop 验证](https://cn.vuejs.org/v2/guide/components-props.html#Prop-验证)

```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].indexOf(value) !== -1
      }
    }
  }
})
```

### [ 类型检查](https://cn.vuejs.org/v2/guide/components-props.html#类型检查)

`type` 可以是下列原生构造函数中的一个：

- `String`
- `Number`
- `Boolean`
- `Array`
- `Object`
- `Date`
- `Function`
- `Symbol`

额外的，`type` 还可以是一个自定义的构造函数，并且通过 `instanceof` 来进行检查确认。例如，给定下列现成的构造函数：

```js
function Person (firstName, lastName) {
  this.firstName = firstName
  this.lastName = lastName
}
```

你可以使用：

```js
Vue.component('blog-post', {
  props: {
    author: Person
  }
})
```

来验证 `author` prop 的值是否是通过 `new Person` 创建的。

## [非 Prop 的特性](https://cn.vuejs.org/v2/guide/components-props.html#非-Prop-的特性)

```html
<bootstrap-date-input data-date-picker="activated"></bootstrap-date-input>
```

然后这个 `data-date-picker="activated"` 特性就会自动添加到 `<bootstrap-date-input>` 的**根**元素上。

### [替换/合并已有的特性](https://cn.vuejs.org/v2/guide/components-props.html#替换-合并已有的特性)

`class` 和 `style` 特性会稍微智能一些，即两边的值会被合并起来

其他会被替换

### [禁用特性继承❕](https://cn.vuejs.org/v2/guide/components-props.html#禁用特性继承)

如果你**不**希望组件的根元素继承特性，你可以在组件的选项中设置 `inheritAttrs: false`。例如：

```
Vue.component('my-component', {
  inheritAttrs: false,
  // ...
})
```

这尤其适合配合实例的 `$attrs` 属性使用，该属性包含了传递给一个组件的特性名和特性值，例如：

```js
//包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建高级别的组件时非常有用。

<component-a :required='true' placeholder:'Enter your username'></component-a>


此时$attrs为:
{
  required: true,
  placeholder: 'Enter your username'
}
```

有了 `inheritAttrs: false` 和 `$attrs`，你就可以手动决定这些特性会被赋予哪个元素。在撰写[基础组件](https://cn.vuejs.org/v2/style-guide/#基础组件名-强烈推荐)的时候是常会用到的：

```

Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `
})
```

> 注意 `inheritAttrs: false` 选项**不会**影响 `style` 和 `class` 的绑定。



# 自定义事件

## [事件名](https://cn.vuejs.org/v2/guide/components-custom-events.html#事件名)

我们推荐你**始终使用 kebab-case 的事件名**

## [自定义组件的 `v-model`](https://cn.vuejs.org/v2/guide/components-custom-events.html#自定义组件的-v-model)

> 2.2.0+ 新增

一个组件上的 `v-model` 默认会利用名为 `value` 的 prop 和名为 `input` 的事件，但是像单选框、复选框等类型的输入控件可能会将 `value` 特性用于[不同的目的](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox#Value)。`model` 选项可以用来避免这样的冲突：

```js

Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})
```

现在在这个组件上使用 `v-model` 的时候：

```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```

这里的 `lovingVue` 的值将会传入这个名为 `checked` 的 prop。同时当 `<base-checkbox>` 触发一个 `change` 事件并附带一个新的值的时候，这个 `lovingVue` 的属性将会被更新。

注意你仍然需要在组件的 `props` 选项里声明 `checked` 这个 prop。



## [将原生事件绑定到组件❓](https://cn.vuejs.org/v2/guide/components-custom-events.html#将原生事件绑定到组件)

你可能有很多次想要在一个组件的根元素上直接监听一个原生事件。这时，你可以使用 `v-on` 的 `.native` 修饰符：

```
<base-input v-on:focus.native="onFocus"></base-input>
```

------

$listeners` 属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：

```js
{
  focus: function (event) { /* ... */ }
  input: function (value) { /* ... */ },
}
```

有了这个 `$listeners` 属性，你就可以配合 `v-on="$listeners"` 将所有的事件监听器指向这个组件的某个特定的子元素。对于类似 `<input>` 的你希望它也可以配合 `v-model` 工作的组件来说，为这些监听器创建一个类似下述 `inputListeners` 的计算属性通常是非常有用的：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  computed: {
    inputListeners: function () {
      var vm = this
      // `Object.assign` 将所有的对象合并为一个新对象
      return Object.assign({},
        // 我们从父级添加所有的监听器
        this.$listeners,
        // 然后我们添加自定义监听器，
        // 或覆写一些监听器的行为
        {
          // 这里确保组件配合 `v-model` 的工作
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
      )
    }
  },
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
        v-bind:value="value"
        v-on="inputListeners"
      >
    </label>
  `
})
```

现在 `<base-input>` 组件是一个**完全透明的包裹器**了，也就是说它可以完全像一个普通的 `<input>` 元素一样使用了：所有跟它相同的特性和监听器的都可以工作。



## [`.sync` 修饰符❓](https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-修饰符)





# 插槽

## [插槽内容](https://cn.vuejs.org/v2/guide/components-slots.html#插槽内容)

当组件渲染的时候，`<slot></slot>` 将会被替换为“Your Profile”。插槽内可以包含任何模板代码，包括 HTML,甚至其它的组件

## [编译作用域](https://cn.vuejs.org/v2/guide/components-slots.html#编译作用域)

当你想在一个插槽中使用数据时，例如：

```html
<navigation-link url="/profile">
  Logged in as {{ user.name }}
</navigation-link>
```

该插槽跟模板的其它地方一样可以访问相同的实例属性 (也就是相同的“作用域”)，而**不能**访问 `<navigation-link>` 的作用域。例如 `url` 是访问不到的



> Tip :父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

## [后备内容](https://cn.vuejs.org/v2/guide/components-slots.html#后备内容)

```html
 <slot>Submit</slot>  <!--设置默认值-->
```

## [具名插槽](https://cn.vuejs.org/v2/guide/components-slots.html#具名插槽)

模版:

```vue
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <slot></slot>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
export default {
  name: "TestSlot"

};
</script>

<style scoped>
header{
    color: green;
}
main{
    color:pink;
}
footer{
    color: blueviolet;
}
</style>
```

使用

```html
    <TestSlot>
      <template v-slot:header>
        <h1>Here might be a page title</h1>
      </template>
      <p>A paragraph for the main content.</p>
      <p>And another one.</p>
      <template v-slot:footer>
        <p>Here's some contact info</p>
      </template>
    </TestSlot>
```





**tips:一个不带 `name` 的 `<slot>` 出口会带有隐含的名字“default”**

## [作用域插槽](https://cn.vuejs.org/v2/guide/components-slots.html#作用域插槽)

让插槽内容能够访问子组件中才有的数据

1.在子组件slot上绑定 `:user='user'`:

```vue
<template>
  <span>
    <slot :user='user'>{{user.lastname}}</slot> 
  </span>
</template>

<script>
export default {
  name: "TestScopeSlot",
  data() {
    return {
      user: {
        firstname: "chen",
        lastname: "xianwei"
      }
    };
  },
  created() {
    console.log(this.user);
  }
};
</script>


```

2.父组件使用时加 ` v-slot:default="slotProps"`  

slotProps为任意取的名字   default需和子组件里的相同

```html
    <TestScopeSlot >
        <template v-slot:default="slotProps">
         {{ slotProps.user.firstname }}
        </template>
    </TestScopeSlot>
```

在上述情况下，当被提供的内容*只有*默认插槽时，组件的标签才可以被当作插槽的模板来使用。这样我们就可以把 `v-slot` 直接用在组件上

```html
<current-user v-slot="slotProps">
  {{ slotProps.user.firstname }}
</current-user>
```

**注意默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确**

**只要出现多个插槽，请始终为*所有的*插槽使用完整的基于 `<template>` 的语法**

### [解构插槽 Prop](https://cn.vuejs.org/v2/guide/components-slots.html#解构插槽-Prop)

作用域插槽的内部工作原理是将你的插槽内容包括在一个传入单个参数的函数里：

这意味着 `v-slot` 的值实际上可以是任何能够作为函数定义中的参数的 JavaScript 表达式。

```html
    <TestScopeSlot >
        <template v-slot:default="{user}">
         {{ user.firstname }}
        </template>
    </TestScopeSlot>
```

你甚至可以定义后备内容，用于插槽 prop 是 undefined 的情形：

```html
<current-user v-slot="{ user = { firstName: 'Guest' } }">
  {{ user.firstName }}
</current-user>
```

## [动态插槽名](https://cn.vuejs.org/v2/guide/components-slots.html#动态插槽名)

> 2.6.0 新增

[动态指令参数](https://cn.vuejs.org/v2/guide/syntax.html#动态参数)也可以用在 `v-slot` 上，来定义动态的插槽名：

```html

<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

## [具名插槽的缩写](https://cn.vuejs.org/v2/guide/components-slots.html#具名插槽的缩写)

例如 `v-slot:header` 可以被重写为 `#header`

然而，和其它指令一样，该缩写只在其有参数的时候才可用。



# 动态组件 & 异步组件

## [在动态组件上使用 `keep-alive`](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#在动态组件上使用-keep-alive)

```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentTabComponent"></component>
</keep-alive>
```

你可以在[这个 fiddle](https://jsfiddle.net/chrisvfritz/Lp20op9o/) 查阅到完整的实示例代码。

> 注意这个 `<keep-alive>` 要求被切换到的组件都有自己的名字，不论是通过组件的 `name`选项还是局部/全局注册。

## [异步组件](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#异步组件)

1.在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块

```js
Vue.component('async-example', function (resolve, reject) {
  setTimeout(function () {
    // 向 `resolve` 回调传递组件定义
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
})
```

2.一个推荐的做法是将异步组件和 [webpack 的 code-splitting 功能](https://webpack.js.org/guides/code-splitting/)一起配合使用：

```js
Vue.component('async-webpack-example', function (resolve) {
  // 这个特殊的 `require` 语法将会告诉 webpack
  // 自动将你的构建代码切割成多个包，这些包
  // 会通过 Ajax 请求加载
  require(['./my-async-component'], resolve)
})
```

3.你也可以在工厂函数中返回一个 `Promise`

```js
Vue.component(
  'async-webpack-example',
  // 这个 `import` 函数会返回一个 `Promise` 对象。
  () => import('./my-async-component')
)
```

4.当使用[局部注册](https://cn.vuejs.org/v2/guide/components-registration.html#局部注册)的时候，你也可以直接提供一个返回 `Promise` 的函数：

```js
new Vue({
  // ...
  components: {
    'my-component': () => import('./my-async-component')
  }
})
```

### [处理加载状态](https://cn.vuejs.org/v2/guide/components-dynamic-async.html#处理加载状态)

```js
const AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

使用:

```js
  components: {
    HelloWorld:AsyncComponent
  }
```



# 处理边界情况

## [访问元素 & 组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问元素-amp-组件)

### [访问根实例 `$root`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问根实例)

在每个 `new Vue` 实例的子组件中，其根实例可以通过 `$root` 属性进行访问

### [访问父级组件实例 `$parent`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问父级组件实例)

和 `$root` 类似，`$parent` 属性可以用来从一个子组件访问父组件的实例。它提供了一种机会，可以在后期随时触达父级组件，以替代将数据以 prop 的方式传入子组件的方式

### [访问子组件实例或子元素 `$refs`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#访问子组件实例或子元素)

尽管存在 prop 和事件，有的时候你仍可能需要在 JavaScript 里直接访问一个子组件。为了达到这个目的，你可以通过 `ref` 特性为这个子组件赋予一个 ID 引用。例如：

```html
<base-input ref="usernameInput"></base-input>
```

现在在你已经定义了这个 `ref` 的组件里，你可以使用：

```html
this.$refs.usernameInput
```

在父组件中给子组件加ref可以获取子组件的vue实例,然后调用子组件的方法



> `$refs` 只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 `$refs`。



### [依赖注入⭐️](https://cn.vuejs.org/v2/guide/components-edge-cases.html#依赖注入)

`provide` 选项允许我们指定我们想要**提供**给后代组件的数据/方法。在这个例子中，就是 `<google-map>` 内部的 `getMap` 方法：

```js
provide: function () {
  return {
    getMap: this.getMap
  }
}
```

然后在任何后代组件里，我们都可以使用 `inject` 选项来接收指定的我们想要添加在这个实例上的属性：

```js
inject: ['getMap']
```

你可以把依赖注入看作一部分“大范围有效的 prop”，除了：

- 祖先组件不需要知道哪些后代组件使用它提供的属性
- 后代组件不需要知道被注入的属性来自哪里

**所提供的属性是非响应式的!**

## [程序化的事件侦听器 ☁️](https://cn.vuejs.org/v2/guide/components-edge-cases.html#程序化的事件侦听器)

现在，你已经知道了 `$emit` 的用法，它可以被 `v-on` 侦听，但是 Vue 实例同时在其事件接口中提供了其它的方法。我们可以：

- 通过 `$on(eventName, eventHandler)` 侦听一个事件
- 通过 `$once(eventName, eventHandler)` 一次性侦听一个事件
- 通过 `$off(eventName, eventHandler)` 停止侦听一个事件

我甚至可以让多个输入框元素同时使用不同的 Pikaday，每个新的实例都程序化地在后期清理它自己：

```js

mounted: function () {
  this.attachDatepicker('startDateInput')
  this.attachDatepicker('endDateInput')
},
methods: {
  attachDatepicker: function (refName) {
    var picker = new Pikaday({
      field: this.$refs[refName],
      format: 'YYYY-MM-DD'
    })

    this.$once('hook:beforeDestroy', function () {
      picker.destroy()
    })
  }
}
```

## [循环引用](https://cn.vuejs.org/v2/guide/components-edge-cases.html#循环引用)

### [递归组件](https://cn.vuejs.org/v2/guide/components-edge-cases.html#递归组件)

组件是可以在它们自己的模板中调用自身的。不过它们只能通过 `name` 选项来做这件事：

```js
name: 'unique-name-of-my-component'
```

当你使用 `Vue.component` 全局注册一个组件时，这个全局的 ID 会自动设置为该组件的 `name` 选项。

### [组件之间的循环引用❕](https://cn.vuejs.org/v2/guide/components-edge-cases.html#组件之间的循环引用)

看原文

## [模板定义的替代品](https://cn.vuejs.org/v2/guide/components-edge-cases.html#模板定义的替代品)

### [内联模板](https://cn.vuejs.org/v2/guide/components-edge-cases.html#内联模板)

感觉没什么用啊

### [X-Template](https://cn.vuejs.org/v2/guide/components-edge-cases.html#X-Template)

另一个定义模板的方式是在一个 `<script>` 元素中，并为其带上 `text/x-template` 的类型，然后通过一个 id 将模板引用过去。例如：

```html
<script type="text/x-template" id="hello-world-template">
  <p>Hello hello hello</p>
</script>
```

```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```



## [控制更新](https://cn.vuejs.org/v2/guide/components-edge-cases.html#控制更新)

### [强制更新 `$forceUpdate`](https://cn.vuejs.org/v2/guide/components-edge-cases.html#强制更新)

### [通过 `v-once` 创建低开销的静态组件  ❕](https://cn.vuejs.org/v2/guide/components-edge-cases.html#通过-v-once-创建低开销的静态组件)

渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了**大量**静态内容。在这种情况下，你可以在根元素上添加 `v-once` 特性以确保这些内容只计算一次然后缓存起来，就像这样：

```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```