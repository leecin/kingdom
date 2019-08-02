# Mongodb
> MongoDB的数据存储在磁盘上，而不是在内存中，所以在启动MongoDB服务时需要指定数据存储的位置；
如果不指定会默认存储在`当前盘符的/data/db`目录下, 如果没有该目录，需要以管理员身份预先创建好目录

## 启动服务和连接服务
1. 使用默认路径：Mongodb所在的盘符/data/db
先要配置系统环境变量：环境变量 -> 系统环境变量 -> 编辑PATH -> 粘贴Mongodb安装的bin目录：`C:\Program Files\MongoDB\Server\4.0\bin;`，
然后执行`mongod`：cmd -> mongod

2. 显式指定数据库路径
执行命令：`mongod --dbpath=D\data\db`

3. 安装服务
执行命令：`mongod --dbpath=D:\data\db --logappend --logpath=D:\data\log.txt --install`
以后启动服务只需要执行：`net start MongoDB`或者`net start mongodb`


## mongodb核心概念
- [x] mongodb核心概念
1. 文档(Document)：简单理解，就是一条条数据(BSON格式，类似JSON：{ "name": "xiaoli", "age": 23 })
2. 集合(Collections)：简单理解，就是所有文档组合在一块，就是一个集合
3. 数据库(Database)：一个或多个集合构成一个数据库

- [x] mongoose核心概念
3. 模型(Models)：由 Schema 发布生成的模型，具有抽象属性和`操作数据库的能力`
4. 实体(Entity)：由 Model 创建的实体，他的操作会影响数据库，`有操作数据库的能力`
5. Schema：一种以文件形式存储的数据库模型骨架，`没有操作数据库的能力`


## mongodb使用细节
1. MongoDB没有提供创建数据库的语法，只有在插入集合时，数据库才开始建立。



## mongoose
> 用mongoose中的方法操控你的Model数据
1. 首先在mongoose里，一切始于Schema
2. 将Schema编译成Model，这个Model就是我们构造Document的class，简单理解：一个Document就是一条数据
3. 通过new这个class就能得到操作该Model的实例
4. 将该Model实例保存到Mongodb数据库中
```ts
// 1. 创建一个schema
const userSchema = mongoose.Schema({
  name: String,
  age: Number
});

// 2. 将Schema编译成Model，
// 注意：这里编译成的Model是一个class，因此我们用大写字母开头，与js里的class保持一致
const User = mongoose.model('User', userSchema);

// 3. 创建Model实例
const king = new User({
  name: 'mzlq',
  age: 23
});

// 4. 保存到Mongodb数据库中
// 注意：所有Mongodb方法的回掉方法中的第一个参数是error对象，其次是Model实例对象
king.save((err, king) => {
  if (err) return console.log(err);
  console.log('king model saved');
});

// 4.1 也可以使用promise的then方法链式调用
king.save().then(king => {
  console.log('king model saved');
}).catch(err => {
  console.log(err);
});
```
