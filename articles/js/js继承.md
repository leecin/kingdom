# [JavaScript]聊聊js里的继承
> js的继承在整个js中是相当重要的，各种开源库的源码里都能找到继承的踪影，因此必须熟练掌握！

## JavaScript里的六种继承方式
- 原型链式继承
- 构造函数式继承
- 组合式继承（原型链+构造函数）
- 原型式继承
- 寄生式继承
- 组合寄生式继承

首先需要明确一点的就是，为什么会有继承这个概念？`最根本的原因就是我们不想写重复的代码`，那如何“偷懒”？继承这个概念应运而生了。接下来就一个个举例来看看，这六种继承方式都有什么特点，各自的优缺点在哪？

## 定义构造函数
``` js
// 定义基类
function Animal(name, age) {
  this.name = name;
  this.age = age;
}

// 定义小明
function Cat() {}

// 定义小红
function Dog() {}
```


## 一、原型链式继承
核心：通过构造函数的`prorotype`属性实现继承。
``` js
// 在该类的原型对象上添加一个eat方法
Animal.prototype.eat = function() {
  console.log('eating apples');
};

// 作用：将Animal的eat方法给到Cat使用
Cat.prototype = Animal.prototype;
/*
  console.dir(Cat)
  {
    ...
    prototype:
      eat: f(),
      constructor: f Animal()
      __proto__: Object
    __proto__: f(),
    ...
  }
*/

// 从上面打印的结果看出，此时Cat类的constructor还是Animal
// 所以要修正constructor的指向
Cat.prototype.constructor = Cat;

var cat = new Cat();
cat.eat(); // eating apples
```
该继承的缺点是：
1. 只能继承父类的prototype上的属性，不能继承父类实例上的属性；
2. 每个子实例都被迫的继承父类的prototype上所有的属性；


## 二、构造函数式继承
核心：通过在`子类中调用父类`实现继承。
``` js
function Animal(name, age) {
  this.name = name;
  this.age = age;
}
Animal.prototype.eat = function() {
  console.log('eating');
};

function Cat(name, age) {
  // 通过将父类属性追加到子类实例上实现继承
  Animal.call(this, name, age);
}

var cat = new Cat('柯基', 2);
console.log(cat.eat, cat.name, cat.age); // undefined 柯基 2
```

## 三、组合式继承（原型链+构造函数）
核心：通过在子类中调用父类构造函数实现父类属性(`如下1`)的继承；通过原型链将父类原型上的属性添加到子类实例上，实现继承父类实例和原型上的属性(`如下2`)的目的。
``` js
function Animal(name, age) {
  this.name = name;
  this.age = age;
};
Animal.prototype.eat = function() {}

function Cat(name, age) {
  // 1.继承父类实例属性
  Animal.call(this, name, age);
}

// 2.继承父类原型的属性
Cat.prototype = Animal.prototype;
Cat.prototype.constructor = Cat;

var cat = new Cat('小黄', 3);
console.log(cat.eat, cat.name, cat.age); // f() {} 小黄 3
```

## 四、原型式继承
核心：`借用新的创建的构造函数`，将被继承的类的所有属性添加到新创建的类上。

``` js
// 这个就类似于Obejct.create(Ctor, options)方法实现的继承
function inherit(Ctor, options) {
  function F() {};
  // F要继承Ctor所有的属性，包括原型上的
  // new是实例是上的，实例也会去原型对象上找
  F.prototype = new Ctor(options);
  return new F();
}

// Animal中可以通过arguments获取到传入的参数：{ name: '小刚', age: 3 }
function Animal() {
  this.name = '小柯基';
  this.age = 2;
}
Animal.prototype.eat = function() {};

var cat = inherit(Animal, { name: '小刚', age: 3 });
console.dir(cat);
```

## 五、寄生式继承
核心：通过将创建新对象的方法寄生到真正实现继承的方法内。
``` js
function newObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function createObj(obj) {
  // newObject就是寄生的体现
  var clone = newObject(obj);
  // 在得到的已经继承至父类的对象上添加私有的属性
  clone.eat = function() {}
  return clone;
}

function Animal() {
  this.name = '柯基';
  this.age = 2;
}

var cat = createObj(new Animal());
console.dir(cat);
```


## 六、组合寄生式继承
核心：通过借用构造函数来继承属性，通过原型链的混合形式来继承方法。
``` js
function newObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
// 核心实现
function inheritPrototype(subType, superType) {
  var prototype = newObject(superType.prototype);
  prototype.constructor = subType;
  subType.prototype = prototype;
}

function SuperType() {
  this.name = '柯基';
}
SuperType.prototype.eat = function() {};

function SubType(name) {
  SuperType.call(this, name);
}

inheritPrototype(SubType, SuperType);

SubType.prototype.wow = function() {}

console.log(new SubType())
console.log(new SuperType())
```


