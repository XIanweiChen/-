#### tips： 

* react中，把key添加给map，foreach控制的元素
* JSX中 `class`要用`className`， `for` 要用 `forName`
* JSX中必须有一个根元素
* 组件首字母名称必须大写
* props是只读的 state是可读可写
* 直接修改state不会重新渲染组件 
* 只用setState改变才会触发页面跟新
* 因为 this.props 和 this.state 可能会异步更新，所以你不要依赖他们的值来更新下一个状态：要解决这个问题，可以让 setState() 接收一个函数而不是一个对象。这个函数用上一个 state 作为第一个参数，将此次更新被应用时的 props 做为第二个参数：
```JavaScript
this.setState((state, props) => ({
  counter: state.counter + props.increment
})); 
```
* 如果安装了某个包到node_modules中，则引入url可省略node_modules，直接从包名开始 

  ------



#### 模块与组件

模块：基于代码，可复用的代码抽离成模块
组件：基于UI，把可复用的UI抽离出来作为组件

#### 虚拟DOM
**虚拟DOM：用js来模拟DOM和BOM的嵌套关系（本质）**
**虚拟DOM的目的：DOM元素的高效更新**
一个网页的呈现过程：

    1.拿到html代码
    2.浏览器解析DOM结构，渲染DOM树
    3.把DOM树呈现到页面上
想要更新效率高 => 页面按需更新：
    获取新旧DOM树进行对比
    浏览器没提供DOM树的API，所以自己用js对象模拟DOM树
    

#### Diff算法 ⭐️

* tree diff：新旧两个DOM树对比，逐层对比的过程

  如下图所示，A节点及其子节点被整个移动到D节点下面去，由于`React`只会简单的考虑同级节点的位置变换，而对于不同层级的节点，只有创建和删除操作，所以当根节点发现A节点消失了，就会删除A节点及其子节点，当D发现多了一个子节点A，就会创建新的A作为其子节点。 

  ![](/Users/ccc/Desktop/20170926220454438.jpg)

  当出现节点跨层级移动时，并不会出现想象中的移动操作，而是会进行删除，重新创建的动作，这是一种很影响`React`性能的操作。因此官方也**<u>不建议进行DOM节点跨层级的操作</u>**。

* component diff:在每一层中，组件级别的对比

  * 如果是同一类型的组件，按照原策略继续比较 virtual DOM tree。
  * 如果不是，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点。
  * 对于同一类型的组件，有可能其 Virtual DOM 没有任何变化，如果能够确切的知道这点那可以节省大量的 diff 运算时间，因此 React 允许用户通过 shouldComponentUpdate() 来判断该组件是否需要进行 diff。 

* element diff:元素级别对比

  当节点处于同一层级时，React diff 提供了三种节点操作，分别为：**INSERT_MARKUP**（插入）、**MOVE_EXISTING**（移动）和 **REMOVE_NODE**（删除）。

  - **INSERT_MARKUP**，新的 component 类型不在老集合里， 即是全新的节点，需要对新节点执行插入操作。
  - **MOVE_EXISTING**，在老集合有新 component 类型，且 element 是可更新的类型，generateComponentChildren 已调用 receiveComponent，这种情况下 prevChild=nextChild，就需要做移动操作，可以复用以前的 DOM 节点。
  - **REMOVE_NODE**，老 component 类型，在新集合里也有，但对应的 element 不同则不能直接复用和更新，需要执行删除操作，或者老 component 不在新集合里的，也需要执行删除操作。

  **React 提出优化策略：允许开发者对同一层级的同组子节点，添加唯一 key 进行区分，虽然只是小小的改动，性能上却发生了翻天覆地的变化！**

![](/Users/ccc/Desktop/屏幕快照 2019-08-08 上午10.34.54.png)

（1）看着上图的 B，React先从新中取得B，然后判断旧中是否存在相同节点B，当发现存在节点B后，就去判断是否移动B。
 B在旧 中的index=1，它的lastIndex=0，**不满足 index < lastIndex 的条件，因此 B 不做移动操作。此时，一个操作是，lastIndex=(index,lastIndex)中的较大数=1.**

**注意：lastIndex有点像浮标，或者说是一个map的索引，一开始默认值是0，它会与map中的元素进行比较，比较完后，会改变自己的值的（取index和lastIndex的较大数）。**

（2）看着 A，A在旧的index=0，此时的lastIndex=1（因为先前与新的B比较过了），**满足index<lastIndex**，因此，对A进行移动操作，此时**lastIndex=max(index,lastIndex)=1**。

（3）看着D，同（1），不移动，由于D在旧的index=3，比较时，lastIndex=1，所以改变lastIndex=max(index,lastIndex)=3

（4）看着C，同（2），移动，C在旧的index=2，满足index<lastIndex（lastIndex=3），所以移动。

**diff的不足与待优化的地方**

![](/Users/ccc/Desktop/屏幕快照 2019-08-08 上午10.36.36.png)

**理想情况是只移动D，不移动A,B,C。因此，在开发过程中，尽量减少类似将最后一个节点移动到列表首部的操作，当节点数量过大或更新操作过于频繁时，会影响React的渲染性能。**

#### React.createElement
参数4是其子节点
```javascript
const myH1 = React.createElement('h1',{id:'myH1'},' 这是一个h1');
const myDiv = React.createElement('div',{id:'myDiv'},' 这是一个DIV',myH1);

```



#### 导入省略后缀名
```javascript
resolve:{
    extensions:['.js','jsx'],
    alias:{
        '@':path.join(__dirname,'./src')
    }
}
```
**@绝对路径可以极大方便路径导入代码的粘贴**

#### 两种组件创建方法对比
>class 创建的组件有自己的 生命周期函数 和 私有数据 **（无状态组件）**
>
>function 创建的组件只有props 没有 生命周期函数 和 私有数据 **（有状态组件）**

* props是只读的，外界传入
* state是可读可写 组件私有（如ajax获取）


#### JSX中使用style
`<h1 style={{color:"red"}}>{this.state.text}</h1>`

#### css模块化
**h1这种默认标签不会被模块化！！！**


**1.在自己配置webpack的项目中**
```JavaScript
{
    test: /\.css$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules:{
            localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        },
      }
    ]
  }
```

**2.在create-react-app中**
**其实他为你规定的很好.css的不模块化，.module.css的才模块化，很方便**
把css文件前缀为.module.css
源码：

```javascript
const cssModuleRegex = /\.module\.css$/;
{
  test: cssModuleRegex,
  use: getStyleLoaders({
    importLoaders: 1,
    sourceMap: isEnvProduction && shouldUseSourceMap,
    modules: true,   //模块化
    getLocalIdent: getCSSModuleLocalIdent,
  }),
}
```

然后：
`import style from './App.module.css';`
使用：
`className = {style.xxx}`

如果想要设为全局
```css
:global(.test){
    color: brown;
}
```


#### 为react安装babel [参考](https://segmentfault.com/a/1190000016458913)

**7.x到8.x差很多 有坑！！！！**

`webpack.config.js:`
```javascript
  {
    test: /\.js$/,
    exclude: /(node_modules|bower_components)/,
    use: ['babel-loader']
  } 
```


`package.json:`
```json
  "devDependencies": {
    "@babel/core": "^7.5.5",
    "@babel/plugin-proposal-class-properties": "^7.5.5",
    "@babel/plugin-transform-runtime": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.6",
    "css-loader": "^3.1.0",
    "file-loader": "^4.1.0",
    "html-webpack-plugin": "^3.2.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "style-loader": "^0.23.1",
    "webpack": "^4.36.1",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.7.2"
  },
  "dependencies": {
    "@babel/runtime": "^7.5.5"
  }
```

`.babelrc:`
```json
{
    "presets": ["@babel/preset-env", "@babel/preset-react"],
    "plugins": [
        "@babel/plugin-proposal-object-rest-spread",
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
    ]
}
```

@babel/plugin-proposal-class-properties好像装了这个才能用class


#### constructor()

* 在 React 组件挂载之前，会调用它的构造函数。
* 在为 React.Component 子类实现构造函数时，应在其他语句之前前调用 super(props)。否则，this.props 在构造函数中可能会出现未定义的 bug。

在 React 中，构造函数仅用于以下两种情况：

* 通过给 this.state 赋值对象来初始化内部 state。
* 为事件处理函数绑定实例

**tips:只能在构造函数中直接为 this.state 赋值。如需在其他方法中赋值，你应使用 this.setState() 替代**

#### 生命周期函数详解

![](/Users/ccc/Desktop/屏幕快照 2019-07-22 下午4.35.15.png)

```javascript
import React from 'react';
export default class Counter extends React.Component{
    static defaultProps = {
        initCount:0
    }

    state={
        count:this.props.initCount
    }
    add(){
        // this.setState({
        //     count:this.state.count+1
        // },()=>{
        //     console.log(this.state.count)
        // })

        this.setState((prevState) =>{ //如果跟新state依赖前一个state的值，最好使用这种方式
            return {
                count:prevState.count+1
            }
        });
    }
    componentWillMount(){//此时state,defaultProps,function 都可以被访问

    }
    render(){
        //在return之前虚拟DOM仍未创建
        return (
            <div>
                <h1>这是一个计数器</h1>
                <input type="button" onClick={this.add.bind(this)}  value="+1"/>
            </div>
        )
        //在return之后虚拟DOM创建好了，但仍未挂载
    }
    componentDidMount(){//已经挂载，有可见的DOM元素
        console.log(document.getElementById('myh3'));  //此时可操作DOM元素
    }

    //当执行完componentDidMount就进入运行中当状态
    // ----------------------------------------------------------

    shouldComponentUpdate(nextProps,nextState){ //可传入下一个已更新当props和state
        console.log(this.state.count,'---',nextState.count);
        return nextState.count%2 === 0 ? true:false;  //实现双数跟新
    }

    componentWillUpdate(nextProps, nextState){
        //此时DOM节点中的元素都是旧的
    }

    //调用render（）函数

    componentDidUpdate(prevProps, prevState, snapshot){
        console.log(this.refs.h3.innerHTML)
    }
}
```

#### 绑定this
事件的function未绑定this，this是undefined
若想绑定this：
1.把这个function改成箭头函数（有点问题？？）
2.bind:

1.     在构造函数中绑定
2.     在onClick中绑定

3.在onClick中用箭头函数

箭头函数内外this一致？？


**tips：**
```javascript
hdclick=()=>{
    this.setState({
        msg:'dasdasd'
    });
}
```

```html
<button onClick={this.hdclick('asd')}>{this.state.msg}</button>
```
在解析`this.hdclick('asd')`这个时`react`会调用这个函数，然后`hdclick（）`跟新`state`，跟新`state`之后又重新`render`，然后又调用`this.hdclick('asd')`，所以导致以下错误
```
Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
```
改成this.hdclick就可解决，onClick只能传function


#### context

例子：
```JavaScript
import React from 'react';
// Context 可以让我们无须明确地传遍每一个组件，就能将值深入传递进组件树。
// 为当前的 theme 创建一个 context（“light”为默认值）。
const ThemeContext = React.createContext('light');

export default class App extends React.Component {
    render() {
        // 使用一个 Provider 来将当前的 theme 传递给以下的组件树。
        // 无论多深，任何组件都能读取这个值。
        // 在这个例子中，我们将 “dark” 作为当前的值传递下去。
        return (
            <ThemeContext.Provider value="dark">  //
                <Toolbar />
            </ThemeContext.Provider>
        );
    }
}

// 中间的组件再也不必指明往下传递 theme 了。
function Toolbar(props) {
    return (
        <div>
                <ThemedButton />
        </div>
    );
}

class ThemedButton extends React.Component {
    // 指定 contextType 读取当前的 theme context。
    // React 会往上找到最近的 theme Provider，然后使用它的值。
    // 在这个例子中，当前的 theme 值为 “dark”。

    static contextType = ThemeContext;  //@1
    render() {
        console.log(this.context)
        return (
            <div>
                {/*显示方法1 */}
                 <button theme={this.context}></button> 
                 {/*显示方法2 */}
                <ThemeContext.Consumer>
                    {a=><p>{a}</p>}
                </ThemeContext.Consumer>
            </div>
               
        );
    }
}
// ThemedButton.contextType = ThemeContext; //@2
```


**总结：**

1.创建一个context:
` const ThemeContext = React.createContext('light');`

2.在想要使用context 的组件中初始化context **(声明一个contextType的静态属性 固定名称**
   ` static contextType = ThemeContext;` 
   or
   `ThemedButton.contextType = ThemeContext;`
3.使用context
    

**显示方法1 : this.context** 
` <button theme={this.context}></button> `
**显示方法2 :  XXX.Consumer**
```javascript
<ThemeContext.Consumer>
    {value=><p>{value}</p>}
</ThemeContext.Consumer>
```

#### react-router

> **官网**：https://reacttraining.com/react-router/

**安装:** `npm install react-router-dom`

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

#### electron
使用 JavaScript, HTML 和 CSS 构建跨平台的桌面应用

VScode竟然是用electron开发的
`帮助->切换开发人员工具`   会跳出类似chrome的开发者界面

震惊！！！！！

#### create-react-app暴露webpack配置文件

```javascript
npm run eject
```

若出现问题:

```JavaScript
git init
git add .
git commit -m 'Saving before ejecting'
```

我的mac电脑只能在桌面建的文件夹才能成功，很奇怪

#### antd按需导入
比全部导入打包减了50kb
```JavaScript

plugins: [
  ["import",{libraryName: 'antd',libraryDirectory: 'es',style: 'css',}], //就是加这行
  [
    require.resolve('babel-plugin-named-asset-import'),
    {
      loaderMap: {
        svg: {
          ReactComponent: '@svgr/webpack?-svgo,+ref![path]',
        },
      },
    },
  ],
],
```

#### 在react中使用AntMotion（其实就是让其可以解析less文件）

```javascript
{
  test: /\.less$/,
    use: [{
      loader: "style-loader"
    }, {
      loader: "css-loader"
    }, {
      loader: "less-loader", 
      options: {
        javascriptEnabled: true,
        modifyVars: { '@primary-color': '#1DA57A' },
      }
    }]
}
```