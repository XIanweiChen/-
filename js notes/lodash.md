### `_.debounce(func, [wait=0], [options={}])`

#### 参数

1. `func` *(Function)*: 要防抖动的函数。
2. `[wait=0]` *(number)*: 需要延迟的毫秒数。
3. `[options={}]` *(Object)*: 选项对象。
4. `[options.leading=false]` *(boolean)*: 指定在延迟开始前调用。
5. `[options.maxWait]` *(number)*: 设置 `func` 允许被延迟的最大值。
6. `[options.trailing=true]` *(boolean)*: 指定在延迟结束后调用。

#### 返回

*(Function)*: 返回新的 debounced（防抖动）函数。

### `_.times(n, [iteratee=_.identity])`

#### 参数

1. `n` *(number)*: 调用 `iteratee` 的次数。
2. `[iteratee=_.identity]` *(Function)*: 每次迭代调用的函数。

#### 返回

*(Array)*: 返回调用结果的数组。

```js
_.times(3, String);
// => ['0', '1', '2']
```

