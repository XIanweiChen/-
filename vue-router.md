# 最最基本的如何使用

#### 1.首先创建一个router.js文件

```js
import  VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld.vue'

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
const A = { render:h=>h('div','A') }
const B = { render:h=>h('div','B') }
const Foo = { render:h=>h('div','Foo') }

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes=[
    {path:'/',component:HelloWorld},  //组件可导入
    {path:'/A',component:A}, 					//也可在当前页面定义
    {path:'/B',component:B},
    { path: '/foo', component: Foo },
]


const router = new VueRouter({  //创建VueRouter对象
    routes,
})

export default router;   //导出
```

#### 2.配置到vue中

**如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)**

```js
import Vue from 'vue'
import App from './App.vue'
import  VueRouter from 'vue-router';

import router from './router'
Vue.config.productionTip = false

Vue.use(VueRouter)   //!!!!!

new Vue({
  render: h => h(App),
  router   //!!!!!!
}).$mount('#app')

```

#### 3.配置app.vue

```vue
<template>
  <div id="app">
    <router-view></router-view>  <!-- 把匹配到的路由组件放这里  -->
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

```



# 动态路由匹配

```js
const User = {
  template: '<div>User {{ $route.params.id }}</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
```

除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query` (如果 URL 中有查询参数)、`$route.hash` 等等

## 响应路由参数的变化

复用组件时，想对路由参数的变化作出响应的话，你可以简单地 watch (监测变化) `$route` 对象：

```js
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```

或者使用 2.2 中引入的 `beforeRouteUpdate` [导航守卫](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html)：

```js
const User = {
  template: '...',
  beforeRouteUpdate (to, from, next) {
    // react to route changes...
    // don't forget to call next()
  }
}
```

## 捕获所有路由或 404 Not found 路由

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

当使用一个*通配符*时，`$route.params` 内会自动添加一个名为 `pathMatch` 参数。它包含了 URL 通过*通配符*被匹配的部分：

```js
// 给出一个路由 { path: '/user-*' }
this.$router.push('/user-admin')
this.$route.params.pathMatch // 'admin'
// 给出一个路由 { path: '*' }
this.$router.push('/non-existing')
this.$route.params.pathMatch // '/non-existing'
```

# 嵌套路由

**路由设置**

```js
const routes = [
    { path: '/', component: HelloWorld },
    { path: '/A', component: A },
    { path: '/B', component: B },
    { path: '/foo', component: Foo },
    {      //关键:children
        path: '/user/:id', component: user, children: [
            // UserHome will be rendered inside User's <router-view>
            // when /user/:id is matched
            { path: '', component: A },

            // UserProfile will be rendered inside User's <router-view>
            // when /user/:id/profile is matched
            { path: 'B', component: B },

        ]
    },
]
```

**user组件**

```js
<template>
  <div class="user">
    <h2>User {{ $route.params.id }}</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>
```

