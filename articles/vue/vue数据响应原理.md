# Vue数据响应原理探究

![city](./images/th.jpg)

本文主要通过探究Vue 2.x和Vue 3.0实现数据响应系统的差异。我们都知道Vue 2.x采用的是`ES5的Object.defineProperty`实现数据响应的，而Vue 3.0对数据响应系统进行了重写，采用了`ES6的Proxy`。那这两者有何差异呢？

## Object.defineProperty
### 一、方法的使用
查看一下[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)，用一句话总结就是：Object.defineProperty会作用一个对象，在该对象上定义一个新的属性或者修改现有的属性，最后返回该对象。先看一段代码，了解该方法是干嘛用的，通过代码概括它有哪些特点。

``` js
var obj = {};
Object.defineProperty(obj, 'name', {});

obj.name; // undefined
obj.name = 'xiao';
obj.name; // undefined

for(var k in obj) {
  console.log(k); // undefined
}
Object.keys(obj); // []
JSON.stringify(obj); // "{}"
```
从上面测试的代码可以看出，如果不设置descriptor对象，默认该对象内的**所有为boolean类型的值都为false，非boolean类型的都为undefined**。即：
``` js
{
  configurable: false,
  enumberable: false,
  writable: false,
  value: undefined,
  set: undefined,
  get: undefined
}
```
- **configurable**：决定该对象的属性描述对象是否可被修改、对象的属性是否可被`delete`、`Reflect.deleteProperty`等方法删除。
- **enumerable**：决定该对象的属性是否可被`for..in`、`Object.keys`、`JSON.stringify`获取
- **writable**：决定该对象的属性是否可被修改。
- **value**：对象属性的值。
- **set**：属性的`setter函数`。当属性值被修改时会触发该方法，并传入一个新值作为参数，
同时内部可以获取this对象，函数的返回值会作为属性的新值。
- **get**：属性的`getter函数`。当读取属性值时会触发该方法，同时内部可以获取this对象。

### 二、使用注意事项
- 错误示例一：指定了`value`，又指定了`get/set访问器`。此时会报错：`Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
  at Function.defineProperty`。意思是：非法的描述符。不能同时指定访问器和值或可写属性。解决办法：`value`和`get/set访问器`只能二选一。
``` js
var obj = {};

Object.defineProperty(obj, 'name', {
  // 这里既然指定了value，就表明obj对象的name属性就是xiaoming了，
  // 且这里没有指明writable，默认为false，所以会跟get/set职责冲突了，
  // 即使这里设置`writable: true`也同样报错！这是为什么？
  value: 'xiaoming',
  get() { },
  set(newVal) { }
});
```
- 错误示例二：对象属性存取出现死循环。解决办法：用一个新的变量保存存取值。
``` js
var obj = {};
// var value = 'xiaoming';

Object.defineProperty(obj, 'name', {
  // 当读取obj.name时，又会触发get方法，
  // get方法内又去读取obj.name，又会触发get方法，循环往复...
  // set方法里的操作同理。
  get() { return obj.name; },
  set(newVal) { obj.name = newVal; }
});
```

了解了Object.defineProperty的大致用法后，来看看Vue 2.x是如何使用它来完成数据响应式系统的。

## 简易的响应式系统
核心点：
- 视图更新函数。更新DOM。
- 数据响应函数。内部使用Object.defineProperty创建一个响应式对象，检测对象的每个属性的存取操作，然后通知视图更新函数进行DOM更新。
- Vue类。测试该数据的响应式系统。

### 视图更新函数
主要职责就是处理视图的更新，更新DOM。
``` js
function renderView() {
  console.log('view is udpated');
}
```

### 数据响应函数
主要职责就是给对象的属性添加`getter函数`、`setter函数`，便于知晓和控制对象属性的变化，然后去做一些事情（比如：`视图更新`、`依赖收集`等）。
``` js
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      return val;
    },
    set: function reactiveSetter(newVal) {
      // newVal !== newVal && val !== val: for NaN scenario
      if (newVal === val || (newVal !== newVal && val !== val)) {
        return;
      }
      renderView();
    }
  });
}
```

### 对象观察函数
主要职责就是给数据对象的每一个属性添加响应式操作。
``` js
function observe(value) {
  if (!value || typeof value !== 'object') {
    return;
  }
  Object.keys(value).forEach((key) => {
    // 这里需要判断对象属性的子属性为对象的情况，
    // 递归给每一个属性添加getter、setter函数
    // ⚠注意：Object.defineProperty对数组的push/pop、length等操作无感
    if (typeof value[key] === 'object') {
      observe(value[key]);
      return;
    }
    defineReactive(vale, key, value[key]);
  });
}
```

### Vue类
Vue类初始化时，就将该配置对象的data对象进行observe，以达到`数据变化，视图更新`的目的。
``` js
class Vue {
  constructor(options) {
    this._data = options.data;
    observe(this._data);
  }
}

const vm = new Vue({
  data: {
    name: 'xiaoming',
    age: 18
  }
});

vm._data.age = 20; // view is udpated

// 剥开vm._data，看看内部是什么！很明显，age和name都分别有了各自的get、set函数
{
  age: 12
  name: "xiaoming"
  get age: ƒ ()
  set age: ƒ (newVal)
  get name: ƒ ()
  set name: ƒ (newVal)
  __proto__: Object
}
```

## 总结
Object.defineProperty的特点：
1. 它的最大威力在于可以知道对象属性的存取行为；
2. 不能处理数组的更新，比如对数组执行`push、pop`等操作，视图无感；而在vue源码内部，它是单独对数组的更新进行了处理的；
3. 当要处理的`data数据`很多（`key-value`很多）、层级嵌套很深时，对于性能来说会是一个问题；

