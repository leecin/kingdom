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

## 原型链式继承
``` js
// 1.定义一个Animal类，并在该类的原型上添加一个eat方法
function Animal(color, gender) {
  this.color = color;
  this.gender = gender;
}
Animal.prototype.eat = function() {
  console.log('eating apples');
};

// 2.如果Cat的实例想用上面的eat方法该怎么办呢？
// 最先想到的肯定是自己定义一个eat方法，自己动手丰裕足食，但是这不是最好的办法，能不能“借用”Animal类的？那怎么“借用”？
function Cat() {}

// 3.“借用”Animal类的eat方法，本质是通过prototype这个一桥梁
// 将Cat和Animal搭建起了联系，我(Cat)没有的，可以问好朋友(Animal)借，以达到资源共享的目的，避免资源的浪费（共享单车就是一个资源共享的好例子）
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

Cat.prototype.constructor = Cat;

var cat = new Cat();
cat.eat(); // eating apples
```
该继承的缺点是：
1. 只能继承父类的prototype上的属性，不能继承父类实例上的属性；
2. 每个子实例都被迫的继承父类的prototype上所有的属性；


