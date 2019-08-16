#### 节点

```html
    <div id="root">
        <div id='2-1'>
            <div >
            	<p>hi</p>
            	<p>pp</p>
            </div>
        </div>
        <div id='2-2' >
            <p>hello1</p>
            <p>hello2</p>
        </div>
    </div>
```



```js
let root = document.getElementById('root')
//广度优先
    const width_first = (ndRoot) => {
        const queue = [ndRoot];  //先在队列加入根节点
        while (queue.length) {
            const node = queue.shift();//队列(FIFO)
            console.log(node);
            if (!node.children.length) {  //如果不存在子节点
                continue;
            }
            Array.from(node.children).forEach(x => queue.push(x));
        }
    };
//深度优先
    const deep_first = (ndRoot) => {
        let stack = [root];
        while(stack.length){
            let current = stack.pop();
            console.log(current);
            if(!current.children.length){
                continue
            }
            stack = stack.concat(Array.from(current.children))
            // Array.from(current.children).forEach(item=>stack.push(item))
        }
    };


```

