/** 
 * 对象三大原则：1.封装、2.多态、3.继承
 * 封装：简单的封装，就是将属性（方法也是属性）封装到某个对象中
 */

// 假设 toy 就是一个对象（一个玩具），它会有颜色、尺寸等特性，
// 我们将属性都封装到这个对象中，如下：
var toy = {}
toy.color = 'black',
toy.size = 23

// 那问题来了，如果你是工厂老板，你要生产多个类似这样的玩具，你会怎么做？
var toy1 = {}
toy1.color = 'red',
toy1.size = 23

var toy2 = {}
toy2.color = 'gray',
toy2.size = 32

// 有没有发现，如果量非常大的情况下，这样做是不是效率太低了。那有没有什么更好的办法呢？
// 当然是有的。细心观察，你会发现：他们都很类似，都有color、size，只不过具体的特征（值）不同而已
// 因此，我们可以采用函数，解决重复创建问题
function factory (color, size) {
  return {
    color: color,
    size: size
  }
}
var toy1 = factory('pink', 26)
var toy1 = factory('yellow', 36)

// 但是，toy1和toy2之间并没有存在任何联系（人，是处在一个复杂的关系网中，人和人之间没有联系那怎么能行？）
// 能否让他们之间建立某种联系呢？答案是：有的
// 通过构造函数模式，让实例间建立联系，所谓构造函数，其实就是一个普通函数，但是内部使用了this变量。
// 区分构造函数与普通函数：
// 1.内部是否使用this关键字
// 2.外部是否通过new关键字调用
// 当使用new执行构造函数时，会生成实例对象，并且内部的this变量会绑定在实例对象上
function Factory (color, size) {
  this.color = color
  this.size = size
}
var toy1 = new Factory('pink', 26)
var toy2 = new Factory('yellow', 36)
console.log( toy1.constructor === toy2.constructor ) // true，说明实例之间通过constructor建立了联系

// 但是问题又来了：如果他们都拥有一个run的功能，则代码如下：
// 你会发现，这个run功能是每一个实例都有的，这样每个实例都保存一份run，其实这样没必要，且浪费内存
function Factory (color, size) {
  this.color = color
  this.size = size
  this.run = function() {
    console.log('running')
  }
}
var toy1 = new Factory('pink', 26)
var toy2 = new Factory('yellow', 36)
console.log( toy1.run === toy2.run ) // false，说明两个实例对象是相互独立的，通过constructor属性跟构造函数建立联系

// 既然run函数，实例都要用，我们可以这样处理：
function Factory (color, size) {
  this.color = color
  this.size = size
}
Factory.prototype.run = function() {
  console.log('running')
}
var toy1 = new Factory('pink', 26)
var toy2 = new Factory('yellow', 36)
console.log( toy1.run === toy2.run ) // true，说明两个实例都没有run函数，他们都是继承至构造函数的原型对象上的run函数

// 怎么知道实例的原型对象是谁呢？别急，这就来
// 1.constructor.prototye.isPrototypeOf(instance)
// 2.instance1 instanceof constructor
function Factory (color, size) {
  this.color = color
  this.size = size
}
Factory.prototype.eyes = 'brown'
Object.prototype.book = 'javascript'
var toy1 = new Factory('black', 23)
var toy2 = new Factory('yellow', 33)
console.log( Factory.prototype.isPrototypeOf(toy1) ) // true
console.log( Factory.prototype.isPrototypeOf(toy2) ) // true
console.log( toy1 instanceof Factory ) // true
console.log( toy2 instanceof Factory ) // true
console.log( toy1.hasOwnProperty('eyes') ) // false，说明eyes属性并不是toy1实例本身的
console.log( 'eyes' in toy1 ) // true，说明in运算符查找的属性并不局限于toy1实例本身的，还包括整条原型链上的

