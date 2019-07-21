# 面向对象之`概念`
- 对象
- 实例
- 构造函数
- new

## 对象(object)
我们可以从两个方面理解对象：
1. 对象是一个实物的抽象
2. 对象是一个容器，内部封装了属性和方法

属性是对象的状态，方法是对象的行为（为了完成某项任务）
```ts
属性：人有肤色
方法：人要吃喝
```

## 实例(instance)
`类`就是对象的模版，对象就是`类`的实例。也即在`类`的概念中，对象就是实例，实例就是对象
另外，在C、C++、java中都有`类`的概念，但在js中，我们用`构造函数`和`原型链`来模拟`类`
```ts
public class Person {}
Person p = new Person()
```

## 构造函数(constructor)
构造函数就是对象的`模版`，专门用来生成实例对象
也可以理解为`构造函数`就是一个普通函数，不过它有其特别之处
```ts
function Person() {
  this.name = 'lijing';
}
var p1 = new Person()
```
构造函数特点
- 内部使用`this`关键字，代表所要生成的实例对象
- 生成对象时，必须使用`new`命令
- 通常，约定构造函数`首字母大写`

## new命令
- new基本用法
`new`的作用，执行构造函数，并返回创建的实例对象
`构造函数`也是函数，因此在调用时可以传递参数
`new`本身可以执行构造函数，因此构造函数名后可以不带括号`()`
```ts
var Person = function(name, age) {
  this.name = name
  this.age = age
}
var p1 = new Person() // var p1 = new Person
```
- **new实现原理**
  1. 创建一个空对象，作为将要返回的实例对象
  2. 将这个空对象的原型，指向构造函数的`prototype`属性
  3. 将这个空对象赋值给函数内部的`this`关键字
  4. 开始执行构造函数内部的代码(默认返回`this`对象)

也就是说，构造函数内部，this指的是一个新生成的空对象，所有针对`this`的操作，都会发生在这个空对象上
构造函数的目的，就是操作一个空对象（即`this`对象），将其“构造”为需要的样子
补充一点，用`new`调用构造函数默认返回`this`关键字，而用`new`调用普通函数默认返回`空对象`，直接调用普通函数默认返回`undefined`
```ts
var person = function() {
  this.name = 'lj'
}
var p1 = person() // {name:'lj'}
var p2 = new person() // undefined
```

如果`return`一个对象，则返回的实例对象的`this`指向该对象，反之不会影响`this`指向
```ts
// return一个对象
var Person = function() {
  this.name = 'lj'
  return {
    name: 'lxl'
  }
}
var p1 = new Person() // {name:'lxl'}

// return基本类型
var Person = function() {
  this.name = 'lj'
  return 23
}
(new Person()) = 23 // false
```
- 实现一个new操作
```ts
function New() {
  // arguments转成数组
  var args = [].slice.call(arguments)
  var construtor = args.shift()
  // 创建一个指向构造函数prototype的对象
  var obj = Object.create(construtor.prototype)
  var ret = construtor.apply(obj, args)
  return (typeof ret === 'object' && ret != null) ? ret : {}
}
var p1 = New(Person, 'lj', 23)
```
- new.target返回构造函数名

通过new.target判断函数是否使用new命令调用
```ts
function Person() {
  if (new.target !== Person) {
    throw new Error('请使用new调用')
  }
}
```

## Object.reate()创建实例对象
```ts
var obj = {
  name: 'lj',
  age: 23,
  eat: function() {
    console.log('吃东西')
  }
}
// obj是p1的模板，p1继承了obj的属性和方法
var p1 = Object.create(obj)
```
