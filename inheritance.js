// 继承：一个对象自身没有的属性，可以从其他对象"拿"过来，这就是继承
// 怎么让 car 继承 Toys 呢？
function Toys () {
  this.play = '玩具可以用来玩'
}
function Car () {
  this.color = 'red'
}

// 有以下两大类继承方式
// 1.构造函数式继承方式
// 2.非构造函数继承方式

/** 
 * 以下都是构造函数式继承方式
 */
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
console.log( Car.prototype.constructor ) // Toys
Car.prototype.constructor = Car
var car1 = new Car()
var car2 = new Car()
console.log( car1.play ) // 玩具可以用来玩
console.log( car2.play ) // 玩具可以用来玩

// 3.子类直接继承父类的prototype
function Toys () {
  this.play = '玩具可以用来玩'
}
Toys.prototype.species = '多种多样'
function Car () {
  this.color = 'red'
}
// 重写了子类Car的prototype，让子类Car和父类Toys都指向同一块内存空间，这就会带来一个问题：
// 当子类Car有跟父类Toys同样的属性时，后定义的会改掉之前定义的，如：Car.prototype.species = '五花八门'
Car.prototype = Toys.prototype
Car.prototype.constructor = Car
Car.prototype.size = 23
Car.prototype.species = '五花八门'
var car1 = new Car()
var car2 = new Car()
console.log( car1.species ) // 由 多种多样 变成了 五花八门
// 似乎疑问都在这里了：为什么car1.play是undefined呢？并且有这句跟没这句结果都一样：Car.prototype.constructor = Car
// 分析：最根本的原因：子类Car实例并没有跟父类构造函数Toys有任何的联系（没有建立通信的桥梁）
// 我们通过下面这张简易原型图就能得到上述结论：
// 1.缺点：（1）原型对象上（Car.prototype和Toys.prototpye）的属性容易被改写；
//        （2）子类没法继承父类构造函数里的属性
/**
 * （instance）              （constructor fn）                        （prototype）        （Toys.prototype和Car.prototype指向的数据源）
 *
 *                               .__proto__                                            
 *    ---------->---------->-------------->--------------->------------->----
 *    |                                                                     |    
 * new Toys()                                    .prototype=>  
 * toy1,toy2...   <=this          Toys                                Toys.prototype  ------->-------->----
 *                                               <=.constructor                                           |
 * 
 *                                                                                                        data
 *    
 * new Car()                                    .prototype=>                                              |
 * car1,car2...   <=this          Car                                 Car.prototype  ------->-------->----           
 *                                              <=.constructor               ^
 *    |                                                                      |
 *    ---------->---------->-------------->--------------->------------->----
 *                              .__proto__
 */                                     
console.log( car1.play ) // undefined
console.log( car1.size ) // 23

// 4.利用一个空函数实现继承
function Toys () {
  this.play = '玩具可以用来玩'  
}
// 第一个疑问：为什么要使用一个空函数呢？
// 分析：最主要的原因：避免操作其中一个原型对象（Car.prototype）会对另一个原型对象（Toys.prototyps）产生影响
// 如果不使用空函数，会跟上面第三种方法一样，出现原型改写的情况
var F = function() {}
// 这一句就是继承了父类元型的所有属性，考虑到原型改写的情况，因此加了这句：Car.prototype = new F()
// 因此：父类原型（Toys.prototype）的修改不会影响到子类原型（Car.prototype）
F.prototype = Toys.prototype
Car.prototype = new F()
Car.prototype.constructor = Car // 拨正constructor指向，避免原型混乱

Toys.prototype.species = '玩具多种多样'
function Car () {
  this.color = 'red'
}
Car.prototype.species = '车多种多样'
var car1 = new Car()
var car2 = new Car()

console.log( car1.color ) // red
console.log( car1.play )  // undefined，说明子类实例依旧没有跟父类构造函数建立联系
console.log( car1.species ) // 车多种多样。说明：因为自身有这个属性，所以没必要到父类（Toys）去取。

// 封装空函数继承，便于以后使用
/** 
 * c，子类
 * p，父类
 */
function extend (c, p) {
  var F = function() {}
  F.prototype = p.prototype
  c.prototype = new F()
  c.prototype.constructor = c
  // return new c() 可以内部直接返回子类（Car）的实例，也可以什么都不返回（主要看函数的功能性吧）
}
// 测验一下
function Toys () {
  this.play = '玩具可以用来玩'
}
Toys.prototype.species = '玩具多种多样'
function Car () {
  this.color = 'red'
}
extend (Car, Toys)
var car1 = new Car()
Car.prototype.species = '车多种多样'
console.log( car1.color ) // rred
console.log( car1.species ) // 车多种多样

// 5.拷贝继承
// 核心思想：将父类所有属性拷贝到子类中
// 用到的方法：in（会查找自身以及原型上的属性）
function Toys () {
  this.family = '玩具大家庭'
  this.species = '玩具多种多样'
}
Toys.prototype.nums = 1232
function Car () {
  this.color = 'red'
  this.name = '皮卡车'
}
var car = new Car()
var toy = new Toy()
for (var i in toy) {
  // 子类属性优先，避免父类（Toys）重写子类（Car）属性
  if (car[i]) continue
  car[i] = toy[i]
}
console.log( car ) // 包含自身和继承自父类的所有属性


/** 
 * 以下都是非构造函数式继承方式
 */
// 1.浅拷贝继承
// 以下要组成：中国律师，也就是lawyer类要继承country类，该怎么办呢？
// 思路：将country类的属性拷贝到lawyer类中
// 注意：对象中的值不能是引用类型，否则父类改变该属性值，子类也会受到影响，因为此时拷贝的是引用地址（指针）
var country = {
  nation: '中国',
  cities: ['桂林', '南京', '香港']
}
var lawyer = {
  type: '律师'
}
for (var i in country) {
  lawyer[i] = country[i]
}
console.log( lawyer ) // {nation: '中国', type: '律师'}，非常符合预期

// 引用类型的值就会发生改写
console.log( lawyer.cities ) // ['桂林', '南京', '香港']
lawyer.cities.push('厦门')
console.log( lawyer.cities ) // [ '桂林', '南京', '香港', '厦门' ]
console.log( country.cities ) // [ '桂林', '南京', '香港', '厦门' ]


// 2.object()继承
// 当然我们可以更优雅的处理这个问题
function object (o) {
  var F = function() {}
  // 为什么是F.prototype = o，额不是F.prototype = o.prototype呢？
  // 分析：因为o.prototype就是空对象
  F.prototype = o
  return new F()
}
var country = {
  nation: '中国'
}
var lawyer1 = object(country)
lawyer1.type = '律师'
console.log( lawyer1 ) // {type: '律师'}
console.log( lawyer1.nation ) // 中国，说明nation属性是从原型对象取得的

// 3.深拷贝继承
// TODO: 这个还没彻底搞明白
var Toys = {
  made: '中国',
  colors: ['red', 'black', 'yellow']
}
var Car = {
  color: 'red'
}
function deepCopy (p, c) {
  // 边界处理，如果子类没有传入，则忽略子类所有属性
  var c = c || {}
  for (var i in p) {
    // 需要判断是否是引用类型值
    if (typeof p[i] === 'object') {
      // 具体的引用类型是什么，数组？对象？函数？
      c[i] = (p[i].constructor === 'Array') ? [] : {}
      deepCopy (p[i], c[i])
    } else {
      c[i] = p[i]
    }
  }
  return c
}
Toys.colors = ['red', 'black']
var car1 = deepCopy(Toys)
console.log( car1 )
car1.colors.push('brown')
console.log( car1.colors )
console.log( Toys.colors )