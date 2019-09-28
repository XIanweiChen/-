# [curl](http://www.ruanyifeng.com/blog/2019/09/curl-reference.html)

## **-A User-Agent**

`-A`参数指定客户端的用户代理标头，即`User-Agent`。curl 的默认用户代理字符串是`curl/[version]`。

## **-b **Cookie

`-b`参数用来向服务器发送 Cookie。

## **-d** 发送 POST 请求的数据体

`-d`参数用于发送 POST 请求的数据体。

使用`-d`参数以后，HTTP 请求会自动加上标头`Content-Type : application/x-www-form-urlencoded`。并且会自动将请求转为 POST 方法，因此可以省略`-X POST`。

`-d`参数可以读取本地文本文件的数据，向服务器发送。

> ```bash
> $ curl -d '@data.txt' https://google.com/login
> ```

## **-e **Referer

`-e`参数用来设置 HTTP 的标头`Referer`，表示请求的来源。

## **-G** 参数用来构造 URL 的查询字符串

`-G`参数用来构造 URL 的查询字符串。

> ```bash
> $ curl -G -d 'q=kitties' -d 'count=20' https://google.com/search
> ```

上面命令会发出一个 GET 请求，实际请求的 URL 为`https://google.com/search?q=kitties&count=20`。如果省略`--G`，会发出一个 POST 请求。

## **-H** 请求头

`-H`参数添加 HTTP 请求的标头。

## **-i **参数打印出服务器回应的 HTTP 标头

`-i`参数打印出服务器回应的 HTTP 标头。

## **-o**

`-o`参数将服务器的回应保存成文件，等同于`wget`命令。

> ```bash
> $ curl -o example.html https://www.example.com
> ```

上面命令将`www.example.com`保存成`example.html`。

## **-O**

`-O`参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。

> ```bash
> $ curl -O https://www.example.com/foo/bar.html
> ```

上面命令将服务器回应保存成文件，文件名为`bar.html`。

## **-s**

`-s`参数将不输出错误和进度信息。