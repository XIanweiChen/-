#### 2.JSX **简介**：

##### 在 **JSX** **中嵌入表达式**

```javascript
const name = 'Josh Perez';
const element = <h1>Hello, {name}</h1>;
```

在 JSX 语法中，你可以在大括号内放置任何有效的 JavaScript 表达式

##### **JSX** **特定属性**

你可以通过使用引号，来将属性值指定为字符串字面量：

```javascript
const element = <div tabIndex="0"></div>;
```

也可以使用大括号，来在属性值中插入一个 JavaScript 表达式：

```javascript
const element = <img src={user.avatarUrl}></img>;
```

##### **JSX** **表示对象**

Babel 会把 JSX 转译成一个名为 React.createElement() 函数调用。

以下两种示例代码完全等效：

```javascript
const element = (
  <h1 className="greeting">
    Hello, world!
  </h1>
);
const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);
```



React.createElement() 会预先执行一些检查，以帮助你编写无错代码，但实际上它创建了一个这样的对象：

```javascript
// 注意：这是简化过的结构

const element = {
  type: 'h1',
  props: {
		 className: 'greeting',
    children: 'Hello, world!'
  }
};
```



#### 4.组件 & Props

##### 最简单的函数组件：

```javascript
function SayHi(props) {
  return <h1>hello {props.name}</h1>
}
```

##### ES6 的 class 来定义组件

```javascript
// 将函数组件转换成 class 组件:
// 通过以下五步将 Clock 的函数组件转成 class 组件：

// 创建一个同名的 ES6 class，并且继承于 React.Component。

// 添加一个空的 render() 方法。

// 将函数体移动到 render() 方法之中。

// 在 render() 方法中使用 this.props 替换 props。

// 删除剩余的空函数声明。
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() }
  }
  componentDidMount() {
    this.timeID = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }
  componentWillUnmount() {
    clearInterval(this.timeID);
  }
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```



##### **Props** **的只读性**

组件无论是使用函数声明还是通过 class 声明，都决不能修改自身的 props

#### 5.State & 生命周期

##### **正确地使用** **State**

- **不要直接修改** **State**

例如，此代码不会重新渲染组件：

```javascript
// Wrong
this.state.comment = 'Hello';
```



而是应该使用 `setState()`:

```javascript
// Correct
this.setState({comment: 'Hello'});
```

- **构造函数是唯一可以给** **this.state** 赋值的地方

- **State** **的更新会被合并**:

  当你调用 setState() 的时候，React 会把你提供的对象合并到当前的 state。你可以分别调用 setState() 来单独地更新它们

#### **6.事件处理**

React 元素的事件处理和 DOM 元素的很相似，但是有一点语法上的不同:

- React 事件的命名采用小驼峰式（camelCase），而不是纯小写。
- 使用 JSX 语法时你需要传入一个函数作为事件处理函数，而不是一个字符串。



例如，传统的 HTML：

```html
<button onclick="activateLasers()">
  Activate Lasers
</button>
```

在 React 中略微不同：

```html
<button onClick={activateLasers}>
  Activate Lasers
</button>
```

##### **向事件处理程序传递参数**

在循环中，通常我们会为事件处理函数传递额外的参数。例如，若 id 是你要删除那一行的 ID，以下两种方式都可以向事件处理函数传递参数：

```javascript
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
//上述两种方式是等价的，分别通过箭头函数和 Function.prototype.bind 来实现。
//在这两种情况下，React 的事件对象 e 会被作为第二个参数传递。
```

**如果通过箭头函数的方式，事件对象必须显式的进行传递，而通过 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。**


#### **与运算符** **&&**

```javascript
{unreadMessages.length > 0 && <h2> You have {unreadMessages.length} unread messages.</h2>
}
```

之所以能这样做，是因为在 JavaScript 中，true && expression 总是会返回 expression, 而 false && expression 总是会返回 false。

#### **8. 列表 & Key**

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

如果列表项目的顺序可能会变化，我们不建议使用索引来用作 key 值，因为这样做会导致性能变差，还可能引起组件状态的问题。

##### **用** **key** **提取组件**

元素的 key 只有放在就近的数组上下文中才有意义。

**一个好的经验法则是：在 map() 方法中的元素需要设置 key 属性。**

```javascript
function ChooseList(props) {
  let arr = [];
  for (let i = 0; i < props.num; i++) {
    arr.push(i);
  };
  const listItems = arr.map((numbers) =>
    <li key={numbers.toString()}>{numbers}</li>
  );
  console.log(listItems)
  return (
    <ul>{listItems}</ul>
  );
}
```

#### 10.状态提升

```javascript
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

const scaleNames = { //用于legend的显示（无大作用）
  c: 'Celsius',
  f: 'Fahrenheit'
}
//转换温度函数
function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);
  }
  handleChange(e){
    this.props.onTemperatureChange(e.target.value);  //onTemperatureChange通过父组件传入，用于向父组件传值
  }
  render(){
    return(
      <fieldset>
        <legend>Enter the temprature in {scaleNames[this.props.type]}</legend>
        <input value={this.props.temprature} onChange={this.handleChange.bind(this)}></input>
      </fieldset>
    )
  }
}
class Calculator extends React.Component {
  constructor(props){
    super(props);
    this.state = {temperature: '', scale: 'c'}; //scale记录上一次输入的是c还是f
  }
  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    //判读目前的温度是c还是f
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
    return (
      <div>
        <TemperatureInput temprature={celsius} onTemperatureChange={this.handleCelsiusChange.bind(this)} scale="c" />
        <TemperatureInput temprature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange.bind(this)} scale="f" />
        <BoilingVerdict celsius={celsius}/>
      </div>
    );
  }
}

```

