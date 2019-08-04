# Class类
传统模式下，是通过`构造函数`定义一个`类`。在es6中，
`类`，作为对象的模板。通过`class`关键字，定义类。
```ts
// 传统方式
function Person() {}

// es6方式
class Person {}
```

## es6的class特点
1. `类`里面有一个`constructor`方法，其内部的this指向类的实例
2. 定义`类`时，不需要`function`关键字，方法名之间不需要逗号分隔
3. 类的数据类型是函数，类本身指向构造函数
4. 调用类时，只能通过`new`关键字
5. 类的所有方法都定义在类的`prototype`属性上
6. 类内部的方法都是不可枚举的，与es5行为不一致
```ts
class Person {
  constructor(name) {
    // this默认指向`类`实例对象
    this.name = name
  }

  // 定义类方法，不需要`function`关键字，且方法前后不需要逗号
  toString() {}
}

// 类的数据类型是函数
typeof Person // "function"

// 用new调用类，直接调用报错
var p1 = new Person()
var p2 = Person() // 报错

// 类所有方法定义在prototype上
// 实例为什么能够调到类中的方法？原因在于prototype吧
class Point {
  construtor() {}
  toString() {}
  getValue() {}
}
// 等价于
Point.prototype = {
  constructor() {}
  toString() {}
  getValue() {}
}

// 类内部方法不可枚举
Object.keys(Point.prototype) // []
Object.getOwnPropertyNames(Point.prototype) // ["construtor", "toString", "getValue"]
```

## constructor方法
1. 通过`new`关键字调用类时，默认执行constructor构造函数，
2. 如果类中没有明确声明`constructor`，一个空的constructor会被默认添加。
```ts
class Person {}
// 等同于
class Person {
  // constructor内部默认返回指向实例的this
  // 也可以自定义返回的this，比如：return Object.create(null)
  constructor() {}
}
```

## Class的实例
1. 通过`new`关键字调用类后返回的对象就是该类的一个实例
2. 实例的属性除非显示定义在其本身（即定义在`this`对象上），否则都是定义在原型（`prototype`）上
3. 所有实例共享一个原型对象
4. 可以通过实例的`__proto__`属性或者`Object.getPrototypeOf`方法给类添加属性和方法，添加的属性或方法在所有实例中都可以访问（`需谨慎`）
```ts
class Person {
  constructor(name) {
    // this指向类的实例
    this.name = name
  }

  toString() {
    return `hello ${this.name}`
  }
}

// 类的实例
var p1 = new Person('zs')

// 实例属性和原型属性
p1.hasOwnProperty('name') // true
p1.hasOwnProperty('toString') // false
p1.__proto__.hasOwnProperty('toString') // true

// 实例共享原型对象
var p2 = new Person('sunquan')
p1.__proto__ === p2.__proto__ // true

// 给类添加属性/方法
p1.__proto__.sayHello = function() {}
// 或者
var P = Object.getPrototypeOf(Person)
P.prototype.sayHello = function() {}
```

## Class的存(setter)/取(getter)值函数
1. 存值函数：set
2. 取值函数：get
3. 存取值函数是定义在描述对象上的：`Object.getOwnPropertyDescriptor(prototype, target)`
```ts
class Person {
  get prop() {
    return 'getter'
  }
  set prop(value) {
    console.log(`setter: ${value}`)
  }
}
var p = new Person()
p.name = 'zhangsan' // setter: zhangsan
p.name // getter

// 存取值函数定义在描述对象上
var descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'prop')
'get' in descriptor // true
'set' in descriptor // true
```

## Class的属性表达式
属性是动态时，属性表达式此时就很有用
```ts
var method = 'getFullName'
class Person {
  constructor() {}

  [method]() {}
}
```

