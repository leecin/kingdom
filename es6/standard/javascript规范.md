# javaScript编码规范

## let取代var
> 声明变量时，用let取代var，实现变量的块级作用域

`let`遵循先声明，后使用原则
`var`存在变量提升，有副作用
```ts
// bad
var num = 23

// good
let num = 23
```

## let和const取舍
> let, const都有块级作用域概念

`let`定义变量，即在程序运行时需要改变的量
`const`定义常量，全局环境的变量优先使用const定义。它有以下几个优点：
1. `const`表明该变量是不可改变的
2. `const`符合函数式编程思想--运算不改变值，只是新建值
3. JavaScript编译器会对`const`进行优化，会提高程序运行效率
```ts
// bad
var a = 1, b = 2

// good
const a = 1
const b = 2

// best，可能这种写法对js编译器更`友好`
const [a, b] = [1, 2]

// 另外，所有函数都应该设置为常量
const getUser = () => {}
```

## 字符串写法
1. 静态字符串一律用单引号或反引号，不适用双引号
2. 动态字符串一律使用反引号
```ts
// 静态字符串
const str = `good` // or const str = 'good'

// 动态字符串
const str = `hello${title}`
```

## 解构赋值
1. 数组成员赋值时，优先使用解构赋值
2. 函数参数是对象时，优先使用解构赋值
3. 函数返回多个值时，优先使用对象的解构赋值
```ts
// 数组解构赋值
const arr = [1, 2, 3]
const [a, b, c] = arr

// 函数解构赋值
function getUseInfo({ name, age }) {}

// 函数返回值解构赋值
function getUserInfo() {
  return { name, age, addr }
}
const {name, age} = getUserInfo()
```

## 对象写法
1. 单行定义的对象，最有一个成员不需要逗号结尾
2. 多行定义的对象，最后一个成员以逗号结尾
3. 对象尽量静态化，定义好之后不要随意新增属性，如需要，使用`Object.assign`
4. 使用`属性表达式`定义对象的动态属性
5. 对象的属性和方法，尽量采用简洁表达方式
```ts
// 单行定义对象
const a = {name: 'zs', age: 33}

// 多行定义对象
const b = {
  name: 'zs',
  age: 33,
}

// 对象新增属性
const o = {}
Object.assign(o, {x: 23})

// best to do
const o = {x: null}
o.x = 23

// 对象的动态属性（创建对象o时）
const o = {
  id: 23,
  name: 'hd',
  [getKey('level')]: 5
}

// 对象属性和方法简写
const o = {
  name,
  age: 23,
  getUser() {}
}
```

## 数组
1. 使用扩展运算符`...`拷贝数组
2. 使用`Array.from`将类数组转化成真正的数组
```ts
// 用扩展运算符拷贝数组
const arr = [1, 2, 3]
const copyArr = [...arr]

// 用Array.from转化类数组
const args = Array.from(arguments)
const divs = document.querySelectorAll('div')
const divNodes = Array.from(divs)
```

## 函数
1. 立即执行函数用箭头函数表示
2. 当使用匿名函数做参数时，尽量用箭头函数代替，因为简洁且绑定了`this`
3. 箭头函数取代`Function.prototype.bind`，不应使用`self/_this/that`绑定this
4. 函数体内不使用`arguments`，而是用rest运算符`...`代替
5. 所有配置项应该集中在一个对象里
6. 使用默认值语法为函数添加默认值
```ts
// 立即执行函数
(() => {
  ...
})()

// 匿名函数用箭头函数代替
[1, 2, 3].map(x => x * 2)

// 箭头函数取代`Function.prototype.bind`
const bindMethod = (...params) => method.apply(this, params)

// 函数体内使用rest运算符，不使用arguments
function concatAllTitle(...args) {
  return args.join('')
}

// 所有配置项集中于一个对象里
function divide(a, b, {option = true} = {}) {}

// 为函数添加默认值
function handlePage(opts = {}) {}
```

## Map结构
1. 只是模拟现实世界的实体对象时，用object
2. 只是需要`key:value`数据结构时，用Map结构
```ts
let map = new Map(arr)
for (let k in map.keys()) {}
for (let v in map.values()) {}
for (let kv in map.entries()) {}
```

## Class类
1. 总是用`class`取代`prototype`的操作
2. 使用`extends`实现继承
```ts
// 用class取代prototype
class Person {
  constructor(firstName, lastName) {
    this.fname = firstName
    this.lname = lastName
  }
  getFullName() {
    return this.fname + this.lname
  }
}

// 用extends实现继承
class xiaom extends Person {
  getFullName() {}
}
```

## 模块
1. 使用`import`取代`require`
2. 使用`export`取代`module.exports`
3. 如果模块只有一个输出，使用`export default`，`export default`不要与`export`同时使用
4. 不要在模块输入中使用通配符`*`
5. 模块输出的函数一律使用小写开头
6. 模块输出一个对象，默认使用大写字母开头
```ts
// import代替require
import { foo, bar } from './module1'

// 使用export取代module.export
impot React from 'react'
class Menu extends React.Component {
  return (
    <div>menu</div>
 )
}
export default Menu

// 模块只有一个输出
export default convert

// 不使用通配符
import myObject from 'module1'
// bad
import * as myObject from './module1'

// 输出函数首字母一律小写
function getProducts() {}
export default getProducts

// 模块输出对象
class Person {}
export default Person
```
