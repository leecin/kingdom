// [1,2,3,4,5].some((item, index, ary) => {
//   console.log(item)
//   if (item === 2) {
//     ary.shift()
//   }
// })

// if (true || !Array.prototype.forEach) {
//   Array.prototype.forEach1 = function(cb, thisArg) {
//     var t, k

//     // 调用forEach1的实例
//     if (this == null) {
//       throw new Error('this is null or undefined')
//     }
//     var O = Object(this) // 将基本类型转成包装对象，统一成对象
//     var len = O.length >>> 0
//     if (typeof cb !== 'function') {
//       throw new TypeError(cb + 'is not a function')
//     }
//     console.log(arguments)
//     if (arguments.length > 1) {
//       t = thisArg
//     }
//     k = 0
//     console.log(len)
//     while(k < len) {
//       var kVal
//       if (k in O) {
//         kVal = O[k]
//         cb.call(t, kVal, k, O)
//       }
//       k++
//     }
//   }
//   var a = [1,23,3]
//   a.forEach1(item => {
//     console.log(item)
//   })
// } 

if (true || !Array.prototype.forEach) {
  Array.prototype.forEach1 = function(callback, thisArg) {
    // 保存this变量和key
    var t, len, o;
    if (typeof this !== 'object') {
      throw new Error('this is not an object type');
    }

    // 确保是数组，这个this是调用forEach的对象
    o = Object(this)
    len = o.length

    // callback是否是函数
    if (typeof callback !== 'function') {
      throw new TypeError(callback + 'is not a function');
    }

    // 是否传入了this，如果传入this，则替换原来的
    // 注意如果是箭头函数，则默认忽略
    if (arguments.length > 1) {
      t = thisArg
    }

    var k = 0
    while(k < len) {
      // key必须为索引
      if (k in o) {
        callback.call(o, o[k], k, t)
      }
      k++
    }
  }
  var a = [1,23,3]
  (23).forEach1((item, idx, ary) => {
    console.log(item, idx, ary)
  }, null)
}