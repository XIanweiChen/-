### [原文](https://developer.mozilla.org/zh-CN/docs/learn/JavaScript/异步/Async_await)

### async关键字

**它将任何函数转换为promise!!!!!** ⚠️

```js
async function hello() { return "Hello" };
hello();
Promise {<resolved>: "Hello"}
```

## 等待Promise.all()

`async / await`建立在[promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)之上，因此它与promises提供的所有功能兼容。

```js
let values = await Promise.all([coffee, tea, description]);
```

## async/await的缺陷⚠️

Async / await使您的代码看起来是同步的，并且在某种程度上它使它的行为更加同步。 `await`关键字阻止执行所有代码，直到promise完成，就像执行同步操作一样。它允许其他任务在此期间继续运行，但您自己的代码被阻止。

**有一种模式可以缓解这个问题 ––通过关闭所有promise进程将`Promise`对象存储在变量中，然后等待触发它们**



```js
    function timeoutPromise(interval) {
        return new Promise((resolve, reject) => {
            setTimeout(function() {
                // console.log(interval)
                resolve(interval);
            }, interval);
        });
    };
    // async function timeTest() {  //总共花时9秒多
    //     await timeoutPromise(4000);
    //     await timeoutPromise(2000);
    //     await timeoutPromise(3000);
    // }

// 有一种模式可以缓解这个问题 ––通过关闭所有promise进程将Promise对象存储在变量中，然后等待触发它们
    async function timeTest() {   //只需要4秒多
      const timeoutPromise1 = timeoutPromise(4000);
      const timeoutPromise2 = timeoutPromise(2000);
      const timeoutPromise3 = timeoutPromise(3000);

      console.log(await timeoutPromise1)
      console.log(await timeoutPromise2)
      console.log(await timeoutPromise3)
    }


    let startTime = Date.now();
    timeTest().then(() => {
        let finishTime = Date.now();
        let timeTaken = finishTime - startTime;
        alert("Time taken in milliseconds: " + timeTaken);
    })
```

## Async/await 的类方法

最后值得一提的是，我们可以在类/对象方法前面添加`async`，以使它们返回promises，并`await`它们内部的promises