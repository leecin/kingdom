# 浅拷贝
```ts
function shallowCopy(obj) {
  if (typeof obj !== 'object') return;
}

```

# 深拷贝
1. 判断是否是对象类型
2. 区分是数组还是对象
3. 遍历对象中的每一项，除掉继承来的属性
4. 判断是否子元素也是对象类型，如果是接着递归
在执行之前四步之前需要知道：
- [x] Object.hasOwnProperty(property)，判断Object中是否含有`property`属性
- [x] for (let k in obj) {}，`in`操作会遍历继承（往对象的构造函数中添加的属性/方法）而来的属性
- [x] Object.keys(obj)，不会遍历继承而来的属性

```ts
function deepCopy(obj) {
  if (typeof obj !== 'object') return;
  let newObj = obj instanceof Array ? [] : {}
  for (let k in obj) {
    if (!Object.hasOwnProperty(k)) { // obj.hasOwnProperty(k)
      newObj[k] = typeof newObj[k] === 'object' ? deepCopy(newObj[k]) : obj[k]
    }
  }
  return newObj
}
```

## JSON.parse和JSON.stringify实现深拷贝
> 该方法不是万能的！在以下3个方面无能为力

- [x] 对象中包含正则表达式；`/^hello/`
- [x] 对象中包含函数：`function() {}`
- [x] 对象中包含undefined：`undefined`，在obj中会被忽略，在数组中会被转成null
```ts
function copyObj(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// 测试
var obj = {
  reg: /^(?:split|reverse)$/,
  fun: function() {},
  und: undefined,
  age: 23
}
var ret = copyObj(obj)
console.log(obj) // {rgex: /^\s*/g, u: undefined, fn: ƒ, desc: "去掉字符串左侧空白字符正则"}
console.log(ret) // { age: 23, reg: {} }
```
TODO：需要研究一下JSON.stringify底层实现，知道为什么有些情况下不能使用


---

# 防抖原理
> 不管事件触发多少次，我只在事件停止触发 n 秒后执行。
就是说这里需要考虑以下两种情况：
1.事件触发`n`秒后，在这`n`秒内不再触发，则`n`秒后立即执行
2.事件触发`n`秒后，在这`n`秒内又触发了事件，则以新触发事件的时间为准，在此时间`n`秒后执行

## 为什么使用防抖
> 解决浏览器性能问题
因为同一事件频繁触发，如果浏览器处理不过来，页面就会出现卡顿，影响用户体验，
所以性能优化对于前端来讲，至关重要。

## 如何实现防抖
1.基础实现
```js
function debounce(fn, delay) {
  var timeout
  return function() {
    console.log(this)
    clearTimeout(timeout) // 保证指定时间内只执行一次
    timeout = setTimeout(fn, delay)
  }
}
```
可以这样使用：1.传入待执行的函数，2.传入执行函数的延迟时间
```js
function fn() {
  console.log(this) // window对象
  console.log('执行了')
}
window.document.addEventListener('mousemove', debounce(fn, 500))
```
可以发现上面的this指向全局对象window，能否改变这个this的指向？
可能有些场景，我们并不希望this指向window

2.改变this指向
```js
function debounce(fn, delay) {
  var timeout
  var cxt = this
  return function() {
    clearTimeout(timeout)
    var fn = fn.apply(ctx)
    timeout = setTimeout(fn, delay)
  }
}
```








