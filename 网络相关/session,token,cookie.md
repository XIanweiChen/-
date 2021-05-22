https://www.jianshu.com/p/fb9eb7b6fec6

### 个人理解:

cookie:把用户的登录信息存在本地

session:把用户的登录信息存在服务器

token:

token里有签名，和用户标识，服务器会从token中取出用户标识，重新获取用户信息生成签名(**类似于经过服务器加密的**)。和token中的签名比较，来判断token是否有效。 重点是：服务器不保存token，但是保存有验证token的方法，让运算代替存储





### [实现思路](https://www.jianshu.com/p/32e6eb23147f)

在前后端完全分离的情况下，Vue项目中实现token验证大致思路如下：

1、第一次登录的时候，前端调后端的登陆接口，发送用户名和密码

2、后端收到请求，验证用户名和密码，验证成功，就给前端返回一个token

3、前端拿到token，将token存储到localStorage和vuex中，并跳转路由页面

4、前端每次跳转路由，就判断 localStroage 中有无 token ，没有就跳转到登录页面，有则跳转到对应路由页面

5、每次调后端接口，都要在请求头中加token

6、后端判断请求头中有无token，有token，就拿到token并验证token，验证成功就返回数据，验证失败（例如：token过期）就返回401，请求头中没有token也返回401

7、如果前端拿到状态码为401，就清除token信息并跳转到登录页面 

调取登录接口成功，会在回调函数中将token存储到localStorage和vuex中