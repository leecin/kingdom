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

## Class表达式
跟函数一样，类也可以采用表达式的写法，不过在使用类名时需要注意：
1. 该类名(如下`Me`)，只能在class内部使用，外部使用会报错
2. 如果类的内部不需要使用类名(`Me`)，则可以省略不写
3. 用class的表达式写法，可以写出立即执行的class
```ts
const myClass = class Me {
  getClassName() {
    return Me.name
  }
}
var inst = new Me()

// Me只能在class内部使用
inst.getClassName() // Me
Me.name // Reference Error: Me is not defined

// 内部不使用类名，可以省略
const myClass = class {}

// 立即执行的class表达式
var person = new class {
  constructor(name) {
    this.name = name
  }

  sayName() {
    return `hello ${this.name}`
  }
}('zhangsan')

// 注意：person此时是实例，可不是类，类名已经省略了
person.sayName() // zhangsan
```

## Class在使用时注意事项
1. 类和模块内部默认是严格模式(如：`this指向undefined`)，es6已经帮我们做好了严格模式的环境
2. 类不存在变量提升，原因：子类必须在父类之后声明，这样才能实现正常继承
3. 类也有name的属性
4. 类中仍然可以使用generator函数(函数前有`*`)
5. 类方法中的`this`，默认指向类的实例
```ts
// foo.js
'use strict'; // 模块中默认就是严格模式，所以这条语句可以省略不写

// 类不存在变量提升
new Person() // ReferenceError
class Person {}

// 类也有name属性
class Person {}
Person.name // Person

// 类中可以使用generator函数
class Person {
  constructor(...args) {
    this.arg = args
  }
  * [Symbol.iterator]() {
    for (var arg of this.args) {
      yield arg
    }
  }
}
// iterator类型天然部署了for...of遍历方法
for (var x of new Person('name', 'age')) {}

// this指向
class Person {
  constructor() {}
  sayName(name) {
    return name
  }
  printName() {
    this.sayName('zhangsan')
  }
}
var p = new Person()
var {printName} = p
printName() // TypeError: cannot read property 'sayName' of undefined
```

## class解决this指向
1. 在class内部的constructor函数中绑定this
2. 使用箭头函数(总是指向定义时所在的对象)
3. 使用`proxy`，在获取方法时自动绑定this
```ts
class Person {
  constructor() {
    // 1. 内部绑定this
    this.printName = this.printName.bind(this)

    // 2. 使用箭头函数
    this.printName = () => {  ... }
  }
}
```

## Class的静态方法
> 类相当于实例的原型，所有类中定义的方法都会被实例继承。

1. 类中的静态方法，只能类本身去调用，实例调用时会报错
2. 类中静态方法包含的this，`默认指向类，而不是实例`
3. 父类静态方法会被子类继承
4. 静态方法也可以在super对象上调用
5. 静态方法(`有static关键字`)和实例方法(`没有static关键字`)可以重名
```ts
class Person {
  static getName() {}
  static getThis() {
    return this === Person
  }
}
// 类的实例调用方法，报错
var p = new Person()
p.getName() // p.getName is not a function

// 静态方法this指向类，而不是实例
Person.getThis() // true

// 子类继承父类静态方法
class Xiaom extends Person {
  static sayHello() {
    return 'hello'
  }
}
Xiaom.sayHello() // hello

// 静态方法在super对象上调用
class Foo {
  static classMethod() {
    return 'hello'
  }
}

class Bar extends Foo {
  static classMethod() {
    return super.classMethod() + 'too'
  }
}
Bar.classMethod() // hello too
```

## Class实例属性可定义在类的顶层
```ts
// 传统写法
class Person {
  constructor() {
    this.name = 'zhangsan'
  }
  getName() {
    return this.name
  }
}

// 实例属性定义在class顶层
// 这种写法比较直观：一眼看出这个类有哪些`实例属性`
class Person {
  // 这些都是实例属性，跟实例的方法位于同层级，因此不需要在前面添加`this`
  name = 'zhangsan'
  getName() {
    return this.name
  }
}
```