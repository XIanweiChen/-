

### MVC与MVVM

#### MVC 后端

- Model层:只负责操作数据库(CURD)
- View层:展示的页面
- Controller层:封装了具体的业务操作逻辑,只负责处理业务

#### MVVM 前端

- M:保存的整个单页面的数据
- VM:调度者,分割了M和V,每当V层想要获取后端的数据要靠VM中转
- V:每个页面的html结构

![](/Users/ccc/Desktop/屏幕快照 2019-08-14 下午3.00.03.png)

### vue中MVVM的对应关系

```js
<!DOCTYPE html>
<html>
<head>
	<title></title>
	<script src="./vue.js"></script>
</head>
<body>
	<!-- 这里的html代码就是V -->
	<div id='app'>
		<p>{{title}}</p>
	</div>

	<script type="text/javascript">
		const vm = new Vue({   //new 出来的这个VUE对象就是vm
			el:'#app',
			data:{   //这个data就是 M
				title:'hello world'
			}

		})
	</script>

</body>
</html>
```

### [v-cloak](https://cn.vuejs.org/v2/api/#v-cloak)

这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

```css
[v-cloak] {
  display: none;
}
```

```js
<div v-cloak>
  {{ message }}
</div>
```

### v-text

v-text没有闪烁问题

但会覆盖元素中原本的内容

### v-html

渲染html内容

