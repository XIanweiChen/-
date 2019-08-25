## react-router

> **官网**：https://reacttraining.com/react-router/

**安装:** `npm install react-router-dom`

导入:

```js
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
```

路由默认是不精确匹配，加上`exact`变成精确匹配
`<Route path="/users/" component={Users} exact />`

可加:匹配`:name`
`<Route path="/users/:name" component={Users} exact />`

可使用`Redirect`重定向

```javascript
<Redirect from="/" to="/index" />
```

匹配项通过props传入：

```JavaScript
function Users(props) {
  console.log(props.match.params)
  return <h2>Users</h2>;
}
```

### basic

```js
function BasicExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/topics">Topics</Link>
          </li>
        </ul>

        <hr />

        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
      </div>
    </Router>
  );
}
```

### URL Parameters
匹配
```js
<Route path="/:id" component={Child} />
```
获取
```js
function Child({ match }) {
  return (
    <div>
      <h3>ID: {match.params.id}</h3>
    </div>
  );
}
```

### Preventing Transitions

应用场景:你在填表单时

```js
<Prompt
    when={isBlocking}   		//当isBlocking 为 true时
    message={location =>    //会跳出提示是否要进行页面跳转
             `Are you sure you want to go to ${location.pathname}`
    }
/>
```



### No Match (404)

利用 `<Switch>`标签设置404的匹配
A `<Switch>` renders the first child `<Route>` that matches. A `<Route>` with no path always matches

```javascript
    <Switch>
      <Route path="/" exact component={Home} />
      <Redirect from="/old-match" to="/will-match" />
      <Route path="/will-match" component={WillMatch} />
      <Route component={NoMatch} />  //如果以上页面都没有匹配 则最后一个匹配404页面
    </Switch>
```

