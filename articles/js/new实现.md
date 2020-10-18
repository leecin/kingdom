# new运算符实现

![new运算符](./images/new.jpg);

从[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)上，我们知道：

- `new运算符`的作用：定义对象类型或构造函数内置对象的实例。

- `new运算符`的语法：`new Constructor([arguments])`，其中`Constructor`是一个具有对象实例的类或者函数，arguments参数是可选的。

```js
function Dog() {
  // 这里的this指向的就是Dog的实例
  this.name = 'lucky';
  this.color = 'black';
}

// 此时的dog就是undefined
// 因为：Dog函数在没有指定return时，默认返回的就是undefined
var dog = Dog();

// 此时dogInst就拥有了name，color等属性
// 说明：new运算符对this做了"手脚"，使得dogInst拥有了name、color属性
var dogInst = new Dog();
```

那这里的`new Dog()`背后到底做了哪些工作？不过从上面的例子可以知道：
- 构造函数的调用方式影响着最后的结果；
- `new`调用方式改变了`this`的指向`（apply、call、bind）`；


我们通过模拟`new`的行为自己实现一个`New运算符`，以此来分析`new运算符`内部到底做了什么：

```js
function Dog(name) {
  this.name = name;
  // ...other properties
}

function New(Ctor) {
  // 第一步，创建新对象
  // 注意：arguments为类数组，需要借用Array实例上的slice方法
  // es6中，我们可以使用spread syntax（...iterableObj）处理arguments对象
  var o = Object.create(null);

  // 第二步，新对象继承构造函数原型上的所有属性
  o.__proto__ = Ctor.prototype;

  var args = Array.prototype.slice.call(arguments, 1);

  // 第三步，执行构造函数，将所有属性添加到新建的对象上
  var res = Ctor.apply(o, args);

  // 第四步，判断执行构造函数的方式，返回对应结果
  return Object.prototype.toString.call(res) === '[object Object]' ? res : o;
}

var dogInst = New(Dog, 'lucky');
```

## 总结
创建`new运算符`的四个步骤：
1. 新建一个对象`（无原型的Object.create(null)）`。目的是保存`new`出来的实例的所有属性；
2. 将构造函数的原型赋值给新创建的对象的原型。目的是将构造函数原型上的属性继承下来；
3. 调用构造函数，并将内部`this`指向新建的对象。目的是让构造函数内的属性全部转交到该对象上，而要使得`this`指向改变，方法有三：`apply、call、bind`；
4. 判断构造函数调用的方式，如果是`new`的调用方式，则返回经过加工后的新对象，如果是普通调用方式，则直接返回构造函数调用时的返回值；

> 曾经看似很难的问题，都经不起时间的认真推敲。所以还是需要多多思考