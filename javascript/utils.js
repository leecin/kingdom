/**
 * @description 判断数据的类型
 * @method typeof
 * @method instanceof
 * @method Object.prototype.toString.call()
 * @param  {any} args
 * @returns {any}
 */
function judgType (...args) {
  if (args.length <= 1) {
    let arg = args.pop()
    let type = typeof arg
    return arg !== arg ? NaN
            : type !== 'object' ? type
            : Object.prototype.toString.call(arg).split(' ').pop().split(']').shift().toLowerCase()
  }
  if (args.length === 2) {
    let left = args.shift()
    let right = args.pop()
    if (typeof left !== 'object' || typeof right !== 'function') return false
    return left instanceof right
  }
  return new ReferenceError('arguments numbers must be between 1 and 2')
}

/**
 * @description 浅拷贝
 * @abstract 将第一层的每一个属性对应的值拷贝
 * @method shallowCopy
 * @method Object.assign
 * @param {*} obj
 * @returns {object} ret
 */
function shallowCopy (obj) {
  if (typeof obj !== 'object') return obj
  let ret = {}
  for (let key in obj) {
    ret[key] = obj[key]
  }
  return ret
}

/**
 * @description 深拷贝
 * @method deepCopy 不可拷贝函数
 * @method JSON.stringify、JSON.parse 不可拷贝正则、函数、Symbol和undefined类型值(内部实现时已忽略)
 * @param {object} obj
 * @returns {object} ret
 */
function deepCopy (obj) {
  if (typeof obj !== 'object') return obj
  let ret = Array.isArray(obj) ? [] : {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      ret[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key]
    }
  }
  return ret
}

/**
 * @description 函数防抖
 * @abstract 在delay秒后触发事件，如果在delay内又触发了该事件，则重新计时
 * @param {function} fn
 * @param {number} delay
 * @todo timeout = setTimeout(fn.apply(context), delay) // x错误，fn没有防抖效果
 */
function debounce (fn, delay) {
  let timeout
  return function() {
    let context = this
    let args = arguments
    clearTimeout(timeout)
    timeout = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * @description 函数节流
 * @abstract 如果事件连续触发，在规定时间内，只执行一次
 * @param {*} fn 
 * @param {*} delay
 * @todo 如果没有闭包，previous始终为0；函数内部变量在运行结束就会被回收
 */
function throttle (fn, delay) {
  let previous = 0
  return function() {
    let context = this
    let now = Date.now()
    let args = arguments
    if (now - previous >= delay) {
      fn.apply(context, args)
      previous = now
    }
  }
}

function throttle2 (fn, delay) {
  let timeout = null
  return function() {
    let args = arguments
    let context = this
    if (!timeout) {
      timeout = setTimeout(function() {
        timeout = null
        fn.apply(context, args)
      }, delay)
    }
  }
}

/**
 * @description 判断数据类型，增强版typeof
 * @param {*} param
 */
function typeOf (param) {
  const toString = Object.prototype.toString
  const typesMap = {
    '[object Number]'   : 'number',
    '[object Boolean]'  : 'boolean',
    '[object String]'   : 'string',
    '[object Undefined]': 'undefined',
    '[object Null]'     : 'null',
    '[object Function]' : 'function',
    '[object RegExp]'   : 'regExp',
    '[object Date]'     : 'date',
    '[object Object]'   : 'object',
    '[object Array]'    : 'array',
  }
  return typesMap[toString.call(param)]
}

/**
 * @description 驼峰转短横线命名
 * @param {string} str 
 * @returns {string} str
 */
function camelCaseToHypen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * @description 短横线转驼峰命名
 * @param {*} str
 * @returns {string} str
 * @event TODO 正则好好学 刚开始完全匹配，而后才分组
 */
function hypenToCamelCase (str) {
  return str.replace(/-([a-z])/g, ($1, $2) => {
    return $2.toUpperCase()
  })
}

/**
 * @description 去掉多余空格，\uFEFF字节序标记（BOM）
 * @param {*} str
 */
function trim(str) {
  return (str || '').replace(/^[\s\uFEFF]+|[\S\uFEFF]+$/g, '')
}

/**
 * @description 首字母大写
 * @param {*} str 
 */
function firstUpperCase (str) {
  return str.toString()[0].toUpperCase() + str.toString().slice(1)
}

/**
 * @description 获取url查询参数
 * @param {*} str 
 */
function getSearchKeyValue (str) {
  const queryAry = str.split('&')
  const obj = {}
  queryAry.forEach(item => {
    const kv = item.split('=')
    obj[kv[0]] = kv[1]
  })
  return obj
}