普通

```js
try {
    tryCode - 尝试执行代码块
}
catch(err) {
    catchCode - 捕获错误的代码块
} 
finally {
    finallyCode - 无论 try / catch 结果如何都会执行的代码块
}
```

promise中使用

```js
                axios.get('http://XXXXXXX',{params:values}).then(res=>{
                    alert('发送成功')
                }).catch(err=>{
                    alert(`发送失败
                    ${err}`)
                }).finally(()=>{
                    this.setState({
                        loading:true
                    })
                })
```

