### 安装

```shell
npm i mongoose
```

### 'Hello word'

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const Cat = mongoose.model('Cat', { name: String });

const kitty = new Cat({ name: 'Zildjian' });
kitty.save().then(() => console.log('meow'));
```

### 初始设置

```js
const mongoose = require('mongoose');

//1.连接数据库

mongoose.connect('mongodb://localhost/test',{ useNewUrlParser: true });
//加入 { useNewUrlParser: true } 解决(node:14147) DeprecationWarning: current URL string parser is deprecated, and will be removed in a future version. To use the new parser, pass option { useNewUrlParser: true } to MongoClient.connect.

//2.设计文档结构（表结构）
const userSchema = new mongoose.Schema({
    userName:String,
    passWord:String
})

//3将文档模型发布
//此时的User就是一张表
const User = mongoose.model('User',userSchema); //传入大写字符串来表示表的名称，他会自动给转换成小写带s  这里：users


```

### 插入

```js
//添加数据
let admin = new User ({
    userName:'admin',
    passWord:'123'
})

admin.save((err,product)=>{
    if (err) return console.error(err);
    console.log(product)
})
```

### 查询数据

 [findOne()](http://www.mongoosejs.net/docs/api.html#model_Model.findOne) 是单个文档（只返回找到的第一个,有可能是 null ），[find()](http://www.mongoosejs.net/docs/api.html#model_Model.find) 是文档列表， [count()](http://www.mongoosejs.net/docs/api.html#model_Model.count) 是文档数量，[update()](http://www.mongoosejs.net/docs/api.html#model_Model.update) 是被修改的文档数量。

```js
//查询数据
User.find({userName:'admin'},(err,res)=>{
    if(err) return console.log(err)
    console.log(res)
})
```

### 删除数据

```js
//删除数据

User.deleteOne({userName:'admin'},(err,res)=>{  //删除一个
    if(err) return console.log(err)
    console.log(res)
})
User.deleteMany({userName:'admin'},(err,res)=>{//删除所有匹配的
    if(err) return console.log(err)
    console.log(res)
})
```

跟新数据

`findByIdAndUpdate(id, ...)`相当于`findOneAndUpdate({ _id: id }, ...)`。

```js
// 跟新数据

mongoose.set('useFindAndModify', false);
//解决(node:14074) DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-

User.findByIdAndUpdate('5d491c8cb40a8535c87e9585',{userName:'cxw阿斯顿1211'},(err,res)=>{
    if(err) return console.log(err)
    console.log(res)
})


User.findOneAndUpdate('5d491c8cb40a8535c87e9585',{userName:'cxw2'},(err,res)=>{
    if(err) return console.log(err)
    console.log(res)
})
```

