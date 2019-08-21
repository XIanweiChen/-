### 核心包:

`npm i faker json-server`

### 辅助包:

`npm i lodash`

### 文件目录:

```
mock
 |___faker-data.js
 |___middlewares.js
 |___router.json
```

#### faker-data.js:

```js
const faker = require('faker');
const _ = require('lodash');


module.exports = function(){
    faker.locale = "zh_CN"
    return {
        nameList:{
            type: 0,
            msg: null,
            data:{
                list:_.times(10,n=>({
                    id: faker.random.number(),
                    uuid: faker.random.uuid(),
                    word: faker.lorem.word(),
                    words: faker.lorem.words(),
                    date: faker.date.past(),
                    date2: faker.date.past(),
                    ip: faker.internet.ip(),
                    boolean: faker.random.boolean(),
                    boolean2: faker.random.boolean(),
                    number: faker.random.number(),
                    number2: faker.random.number(),
                    paragraph: faker.lorem.paragraph(),
                    paragraphs: faker.lorem.paragraphs(),
                    pageNo: _.random(1, 10),
                }))
            }
        },
        success:{
            type:0,
            message:'success',
            data:null

        }
    }
}
```

#### middlewares.js 

中间件,显示内容,便于调试

```js
module.exports = (request, response, next) => {
	console.log('-------------------------------');
	console.log(`----------new ${request.method} request----------`);
	console.log('-------------------------------');
	console.log('params:', request.params);
	console.log('query:', request.query);
	console.log('body:', request.body);
    console.log('headers:', request.headers);
    //把post请求转换成get
	if (request.method === 'POST') {
		request.method = 'GET';
		request.query = request.body;
	}

	//处理ie8下的文件上传
	if ((request.headers['content-type']||'').startsWith('multipart/form-data')) {
		response.header('content-type', 'text/html');
	}
	next();
};
```

#### router.json

```json
{
    "/myApp/getNameList.do":"/nameList",
    "/myApp/success.do":"/success"
}
```





### 配置脚本

```json
"mock": "json-server --port 4002 -d 500 --middlewares mock/middlewares.js --routes mock/router.json --watch mock/faker-data.js"
```

