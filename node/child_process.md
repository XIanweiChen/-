https://www.jianshu.com/p/692d9d2e77a5





### `child_process.exec(command[, options][, callback])`



```js
const { exec } = require('child_process')

exec('ls ../', (error, stdout, stderr) => {
    console.log(error, stdout, stderr)
})


//null 'child_process 5.31\n' ''

```





如果调用此方法的 [`util.promisify()`](http://nodejs.cn/s/DGMNHh) 版本，则返回 `Promise`（会传入具有 `stdout` 和 `stderr` 属性的 `Object`）。 返回的 `ChildProcess` 实例会作为 `child` 属性附加到 `Promise`。 如果出现错误（包括导致退出码不为 0 的任何错误），则返回 reject 的 promise，并传入与回调中相同的 `error` 对象，但是还有两个额外的属性 `stdout` 和 `stderr`。

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function lsExample() {
  const { stdout, stderr } = await exec('ls');
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}
lsExample();
```





### `child_process.execFile(file[, args][, options][, callback])`



不会遇到cmd注入都问题！！！

```js
execFile('ls', ['. && pwd'], (...arg) => {  
    console.log(arg)  
})


/*
{ Error: Command failed: ls . && pwd
ls: . && pwd: No such file or directory

    at ChildProcess.exithandler (child_process.js:294:12)
    at ChildProcess.emit (events.js:198:13)
    at maybeClose (internal/child_process.js:982:16)
    at Socket.stream.socket.on (internal/child_process.js:389:11)
    at Socket.emit (events.js:198:13)
    at Pipe._handle.close (net.js:606:12) killed: false, code: 1, signal: null, cmd: 'ls . && pwd' } '-----' '' '-----' 'ls: . && pwd: No such file or directory\n'
    */
```





### `child_process.fork(modulePath[, args][, options])`



``child_process.fork()` 方法是 [`child_process.spawn()`](http://nodejs.cn/s/CKoDGf) 的特例，专门用于衍生新的 Node.js 进程。 与 [`child_process.spawn()`](http://nodejs.cn/s/CKoDGf) 一样返回 [`ChildProcess`](http://nodejs.cn/s/uALgct) 对象。 返回的 [`ChildProcess`](http://nodejs.cn/s/uALgct) 会内置额外的通信通道，允许消息在父进程和子进程之间来回传递。 详见 [`subprocess.send()`](http://nodejs.cn/s/Eggixm)。



Sup.js

```js
var child_process = require('child_process');

var child = child_process.fork('./sub.js');

child.on('message', function (m) {
    console.log('message from child: ' + JSON.stringify(m));
});

child.send({ from: 'parent' });
```



Sub.js

```js
process.on('message', function (m) {
    console.log('message from parent: ' + JSON.stringify(m));
});

process.send({ from: 'child' });
```



### `child_process.spawn(command[, args][, options])`