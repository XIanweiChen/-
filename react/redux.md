### areducer

reducer是一个function,state储存对象,action是传入的动作

```js
//counterReducer
const counterReducer = (state = { count: 1, name: 'cxw' }, action) => {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state
    }

}

export default counterReducer
```

```js
//nameReducer
const nameReducer = (state = {}, action) => {
    switch (action.type) {
        case 'set':
            return {
                ...state,
                info: action.payload
            }
        default:
            return state
    }
}

export default nameReducer;
```

#### **合并reduce**

combineReducers

```js
//rootReducer
import { combineReducers} from 'redux';

import counterReducer from './counterReducer';
import nameReducer from './nameReducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    name: nameReducer
})

export default rootReducer
```



### action

```js
//countAction
export const ADD = {
    type: 'add',
    payload: { num: 1 }
}
```

```js
//nameAction
import axios from 'axios';

export const getName = async (dispatch)=>{
   let {data:result} = await axios({
    url: "https://jsonplaceholder.typicode.com/posts",
    type: 'post'
		})
   dispatch({
       type:'set',
       payload:result
   })
}
```

### store

**createStore, compose, applyMiddleware**

```js

import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  //用于加载异步的中间件

import rootReducer from './reducers/rootReducer'

const store = createStore(rootReducer,
    compose(
  	applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())  //整个storage
)
export default store;
```





### 单文件的简单使用

```js
//redux
import { createStore } from 'redux';

const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        count: state.count + 1
      }
    case 'sub':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}
const add = {
  type: 'add',
}

const store = createStore(counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

console.log(store.getState())
store.dispatch(add)
```



### 在react中使用

具体的看demo1

```js
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App'

const rootElement = document.getElementById('root')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
```

```js
import { connect } from 'react-redux'
import { increment, decrement, reset } from './actionCreators'

// const Counter = ...

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    counter: state.counter
  }
}

const mapDispatchToProps = { increment, decrement, reset }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)   //Counter的props会被传入一个dispatch函数
```

