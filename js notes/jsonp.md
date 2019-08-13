### JSONP [参考](https://segmentfault.com/a/1190000015597029?utm_source=tag-newest)

#### 原理

在HTML标签里，一些标签比如script、img这样的获取资源的标签是没有跨域限制的

#### 实现

原理:

**客户端使用一个script标签请求服务器资源，服务器直接返回一个可执行的js脚本，脚本的内容为客户端中的回调函数+结果`callback(result)`，客户端收到那个脚本后就执行，调用获取到异步资源后调用resolve改变promise状态，得到结果**

服务端：

```js
const express  = require('express');

const app = express();

app.get('/',(req,res,next)=>{
    console.log(req.query,req.url)
    let result = JSON.stringify(req.query)    
    res.send(`${req.query.cb}(${result})`) //req.query.cb为客户端中回调函数的名称
	
})

app.listen(4000)
```



客户端：

```js
    <script>
        /**
         * JSONP请求工具
         * @param url 请求的地址
         * @param data 请求的参数
         * @returns {Promise<any>}
         */
        const request = ({ url, data }) => {
            return new Promise((resolve, reject) => {
                // 处理传参成xx=yy&aa=bb的形式
                const handleData = (data) => {
                    const keys = Object.keys(data)
                    const keysLen = keys.length
                    return keys.reduce((pre, cur, index) => {
                        const value = data[cur]
                        const flag = index !== keysLen - 1 ? '&' : ''  //判断是否是最后一个
                        return `${pre}${cur}=${value}${flag}`
                    }, '')
                }
                // 动态创建script标签
                const script = document.createElement('script')
                // 接口返回的数据获取
                window.jsonpCb = (res) => {  //这里一定要是全局的函数，让服务器返回的脚本调用
                    document.body.removeChild(script)
                    delete window.jsonpCb
                    resolve(res)
                }
                script.src = `${url}?${handleData(data)}&cb=jsonpCb`
                document.body.appendChild(script)
            })
        }
        // 使用方式
        request({
            url: 'http://localhost:4000/',
            data: {
                // 传参
                name: 'cxw',
                age: '22'
            }
        }).then(res => {
            console.log('res:', res)
        })
    </script>
```



