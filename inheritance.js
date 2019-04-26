// 继承：一个对象自身没有的属性，可以从其他对象"拿"过来，这就是继承
// 怎么让 car 继承 Toys 呢？
function Toys () {
  this.play = '玩具可以用来玩'
}
function Car () {
  this.color = 'red'
}

// 1.构造函数继承
// 核心思想是：用子实例继承父类的属性
function Toys () {
  this.play = '玩具可以用来玩'
}
function Car () {
  // 分析：因为通过 new 关键字调用构造函数时，此时 this 是指向创建出来的实例对象
  // 然后通过 apply 将父类的执行上下文变成了子类的执行上下文，父类构造函数中的 this 指向子类，也就是 play 属性变成了 Car 子类的了
  Toys.apply(this)
  this.color = 'red'
}
var car1 = new Car()
var car2 = new Car()
console.log( car1.play ) // 玩具可以用来玩
console.log( car2.play ) // 玩具可以用来玩
console.log( car1.__proto__ === Car.prototype ) // true，说明，原型对象并没有发生变化
console.log( car2.__proto__ === Car.prototype )

// 2.prototype模式
// 核心思想是：当子类没有所要的属性时，它能够顺着原型链去找
function Toys () {
  this.play = '玩具可以用来玩'
}
function Car () {
  this.color = 'red'
}
// 分析：以下这句相当于删除了Car.prototype上所有的属性，然后指向父类实例
// 为什么是 new Toys() 而不是 Toys()呢？
// 很重要的原因：因为 new 创建出来的实例，默认会返回 this 对象！！而构造函数并不会。
// 那 new 到底干了啥？以至于他会对结果产生如此影响
/** 模拟简易版 new 实现：4步
 * 1.新建一个对象
 * 2.将新建对象的__proto__指向构造函数的prototype
 * 3.执行构造函数，将this指向新建对象
 * 4.返回新建对象
 * function New (obj) {
 *    var o = {} // 这个更好：var o = Object.create(null)，每new 一次就开辟新的内存空间
 *    o.__proto__ = obj.prototype // 建立原型连接，确保 o 能够享受到 obj 原型上的属性
 *    obj.call(o) // 将 obj 中的执行上下文变成 o，即 o 拥有构造函数里所有的属性
 *    return o // 提供外部使用
 * }
 */
// 那 Car.prototype.constructor = Car 又有啥用呢？
// 分析：其实就是矫正 constructor 的指向，如果没有这句，Car.prototye.constructor 就会指向 Toys。
Car.prototype = new Toys()
Car.prototype.constructor = Car
var car1 = new Car()
var car2 = new Car()
console.log( car1.play ) // 玩具可以用来玩
console.log( car2.play ) // 玩具可以用来玩