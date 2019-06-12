/** 
 * 考察知识点：
 * 1.原型与继承
 * 2.闭包
 * 3.apply用法
 * 4.this用法
 * 5.高阶函数（1.接受一个或多个函数作为输入，2.输出一个函数）
 */

// before函数就干三件事情：
// 1.返回一个匿名函数（闭包），作用就是保存执行环境this
// 2.执行其内部参数函数beforeFn
// 3.返回执行环境this
Function.prototype.before = function( beforeFn ) {
  var self = this
  return function() {
    beforeFn.apply( this, arguments )
    return self.apply( this, arguments ) // 返回fun函数，方便链式调用，因为after要用到fun对象
  }
}

// after函数就干三件事情
// 1.返回一个匿名函数（闭包），作用就是保存执行环境this
// 2.执行
// 3.
Function.prototype.after = function( afterFn ) {
  var self = this
  return function() {
    var ret = self.apply( this, arguments ) // 保证外部fun函数先于after函数执行
    afterFn.apply( this, arguments )
    return ret
  }
}

// 先查找内部是否有匹配的可执行函数，发现没有
// 查找fun原型对象，发现存在before、after可执行函数，则中断查找
function fun() {
  console.log(2)
}
var fun = fun.before(function() {
  console.log(1)
}).after(function() {
  console.log(3)
})
fun()