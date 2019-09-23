# Http
HTTP协议是Hyper Text Transfer Protocol（超文本传输协议）的缩写,是用于从万维网（WWW:World Wide Web ）服务器传输超文本到本地浏览器的传送协议
HTTP是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）

得到：
1. http是`万维网服务器`与`客户端`(比如：`浏览器，POS机`等)之间，是基于TCP/IP来传递数据的`通信协议`。
2. http默认端口号是80，https默认端口号是443。
3. http有3个特点：
  - [x] 无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
  - [x] 媒体资源类型独立：只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型
  - [x] 无状态：缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

CGI（Common Gateway Interface）是http服务器与你的本地程序“交流”的工具，该程序是运行在网络服务器上的，CGI使得浏览器有交互的功能。
![http理解](../images/http.gif)


## http请求结构
1. 请求行：GET /data/index.html HTTP/1.1
2. 请求头部：accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3
  - [X] 大多数请求头并不是必需的，对于POST请求来说 Content-Length必须出现。另外`HTTP 1.1默认进行持久连接`
  - [x] Cookie：客户端通过这个头可以向服务器带数据，这是最重要的请求头信息之一
3. 空行：回车(CR)换行(LF)
  - [x] 它的作用是通过一个空行，告诉服务器请求头部到此为止
4. 请求数据
  - [x] 若方法字段是GET，则此项为空，没有数据
  - [x] 若方法字段是POST,则通常来说此处放置的就是要提交的数据：user=admin&password=123456，使用&来连接各个字段


## http响应结构
1. 响应行：HTTP/1.1 200 OK
  - [x] 100~199：表示成功接收请求
  - [x] 200~299：表示成功接收请求并处理完整个过程
  - [x] 300~399：为完成请求，细化请求。302(你请求我，我让你找别人)；307/304(我不给你资源，你自己找缓存)
  - [x] 400~499：客户端请求错误。404(请求资源找不到)；403(服务器拒绝访问，没有权限)
  - [x] 500~599：服务端出现错误。
2. 响应头
  - [x] Date：可以用setDateHeader来设置这个头以避免转换时间格式的麻烦
  - [x] Expires：告诉浏览器把回送的资源缓存多长时间，-1或0则是不缓存

3. 响应体
  - [x] 服务端返回什么数据，客户端就接收什么数据

### 浏览器禁止缓存
1. Expires：-1或0
2. Cache-Control：no-cache
3. Pragma：no-cache


## http请求方法
1. GET，获取资源
2. POST，提交表单数据/下载资源
3. PUT，更新内容
4. DELETE，删除内容
5. PATCH，局部更新内容
6. TRACE，测试或诊断请求
7. HEAD，获取请求头信息
8. CONNECT，HTTP/1.1预留做代理服务器

## Axios请求
1. get请求绑定参数，形如：`getProduct?state=1&pageNum=2`
```ts
axios.get('/getProduct', { params: queryParams }).then()
```

2. post请求绑定参数，形如：`{name:leejing, age:23}`
```ts
axios.post('/updaateProductInfo', { data: postData }).then()
```