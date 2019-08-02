# NODE
1. node是运行在服务端的javascript环境，服务程序和浏览器程序最大的区别就是`没有安全限制`；
2. 服务器程序必须能够接收网络请求，读写文件，处理二进制内容；
3. 在编写义务逻辑代码时，`一律使用异步`编程方式，同步代码在执行期间，服务器会失去响应，因为javascript只有一个执行线程；
4. Node.js开发的目的就是为了用JavaScript编写Web服务器程序；
5. 低版本的node支持es6/7/8的特性少，高版本的node支持es6/7/8会更全面；
6. node内置的模块必须是通过：require命令导入；自己写的模块可以使用es6的import/export命令；
7. NodeJS的作者说，他创造NodeJS的目的是为了实现高性能Web服务器，他首先看重的是事件机制和异步IO模型的优越性，而不是JS；
8. require函数支持斜杠（/）或盘符（C:）开头的绝对路径，也支持./开头的相对路径；
9. 在Linux系统下，我们可以把JS文件当作shell脚本来运行，在shell脚本中，可以通过#!注释来指定当前脚本使用的解析器；
10. JS语言自身只有字符串数据类型，没有二进制数据类型，nodejs中提供Buffer构造函数处理二进制数据；
11. Buffer与字符串有一个重要区别。字符串是只读的，并且对字符串的任何修改得到的都是一个新字符串，原字符串保持不变；
12. 当内存中无法一次装下需要处理的数据时，或者一边读取一边处理更加高效时，我们就需要用到数据流；
13. nodejs中的编码方式有：utf-8，binary；
14. Js天生支持非阻塞: 回调函数=事件循环+回调队列，所有非阻塞的操作，返回的结果暂时在回调队列中等待，由事件循环，自动依次取回到主程序中恢复执行，回调队列在主程序之外存储回调函数，所以，不会干扰主程序执行


## node理解
普通服务器端应用: 虽然可实现每个请求独立线程/进程, 但如果一个请求中，包含多个阻塞IO操作(访问数据库，网络，读写硬盘文件)，该请求返回的时间就等于所有IO操作的时间总和——慢
Node服务器端应用: 不但每个请求是一个独立的线程，且，每个请求内的每个IO操作，都是非阻塞的。


## process.nextTick(callback)
process.nextTick会在下一次事件循环中执行，就是说没有其他事件程序在排队了，就会执行process.nextTick


## node标准回调函数
1. 回调函数的第一个参数必须是`error`对象
2. 回调函数的第二个参数是程序执行的返回结果
```ts
fs.readFile('hello.js', function(err, data) { ... })
```
程序正常执行时，error的结果为null，data为执行的结果；
程序执行错误时，error为包含的错误信息，data为undefined；
```ts
callback(function(err, data) {  ... })
```
在node中，通常判断的逻辑是这样的
```ts
if (error) {
  // 出错了
} else {
  // 正常
}
```

## node热更新
这些第三方工具都可以实现node热更新：supervisor，hotnode，forever，pm2等
首先，安装：`npm install supervisor -g`；
然后，启动node服务：`supervisor main.js`；
至此，每当文件有变动，服务会自动监听然后执行；


## node文件IO
1. 异步：fs.readFile，fs.writeFile
2. 同步：fs.readFileSync，fs.writeFileSync
在执行写入文件时，只关心写入的结果：正确还是错误，所以毁掉函数中只会有一个参数`error`对象；
如果写入的是String类型数据，encoding默认为`utf-8`，不指定encoding，默认为`utf-8`的编码类型；
同步`(Sync)标志`读写方式，没有回掉函数，它会将最后结果直接返回；
可移植操作系统接口（Portable Operating System Interface of UNIX，缩写为 POSIX ）
path.posix 和 path.win32，前者跨平台，后者只是win上；
异步文件IO
```ts
fs.writeFile([file/filePath]:String, encoding?:String, function(error) {  ... }): void
```
同步文件IO
```ts
var ret = fs.writeFileSync([file/filePath]:String, encoding?:String)
```

## node的文件目录遍历
采用递归算法遍历
1. readdirSync同步方式读取文件夹，返回一个文件列表的数组，通过遍历该数组内部所有文件
2. 通过`statSync`方法的`isDirectory`判断是否还是文件夹
```ts
var fs = require('fs')
var path = require('path')
function mapDir(dir, cb) {
  fs.readdirSync(dir).forEach(function(file) {
    var pathName = path.join(dir, file)
    if (fs.statSync(pathName).isDirectory()) {
      mapDir(pathName, cb)
    } else {
      cb(pathName)
    }
  })
}
mapDir('./test', function(path) {
  console.log(path)
})

```
我们来看看fs.stat和fs.statSync的区别
```ts
// 1.异步版：fs.stat(path,callback):
  path是一个表示路径的字符串,callback接收两个参数(err,stats),其中stats就是fs.stats的一个实例；
  
// 2.同步版：fs.statSync(path)
  只接收一个path变量，fs.statSync(path)其实是一个fs.stats的一个实例；

// 3.再来看fs.stats有以下方法:
  stats.isFile()
  stats.isDirectory()
  stats.isBlockDevice()
  stats.isCharacterDevice()
  stats.isSymbolicLink() (only valid with fs.lstat())
  stats.isFIFO()
  stats.isSocket()
```


## A电脑如何访问B电脑的服务器
1. B电脑在本地开启一个服务，B电脑的ip地址：172.17.151.182，端口号：5028
2. A电脑访问：http://172.17.151.182:5028


## devDependencies和dependencies
1. devDependencies里面的插件只用于开发环境，不用于生产环境；
2. dependencies是`需要发布`到生产环境的；


## node模块引入
1. 当模块的文件名是index.js，加载模块时可以使用模块所在目录的路径代替模块文件路径，以下两条语句等价。
```ts
var cat = require('/home/user/lib/cat'); // cat还是文件夹，而不是cat.*
var cat = require('/home/user/lib/cat/index');
```

## npm包管理
1. 安装包：npm install(i) 包名
2. 安装指定版本的包：npm install(i) 包名@version
3. `-g`表示全局安装；`-S`表示安装的包名会添加到dependencies中；`-D`表示安装的包名会添加到devDependencies中；

常见npm命令：
1. 使用`npm help <command>`可查看某条命令的详细帮助，例如`npm help install`；
2. 使用npm update <package>可以把当前目录下node_modules子目录里边的对应模块更新至最新版本；
3. 使用npm update <package> -g可以把全局安装的对应命令行程序更新至最新版；
4. 使用npm cache clear可以清空NPM本地缓存，用于对付使用相同版本号发布新版本代码的人；
5. 使用npm root -g查看全局安装的文件；
```ts
npm install axios
npm install axios@2.2.3
```

## Buffer、String之间相互转化
```ts
// buffer->string
buf.toString(encoding?:string)

// string->buffer
var buf = new Buffer()
buf.write(string) // 将制定字符写入buffer流
```

