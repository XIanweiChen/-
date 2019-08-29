https://www.jianshu.com/p/fb9eb7b6fec6

个人理解:

cookie:把用户的登录信息存在本地

session:把用户的登录信息存在服务器

token:

token里有签名，和用户标识，服务器会从token中取出用户标识，重新获取用户信息生成签名(**类似于经过服务器加密的**)。和token中的签名比较，来判断token是否有效。 重点是：服务器不保存token，但是保存有验证token的方法，让运算代替存储

