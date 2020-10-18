# 我对es6的class的理解

![es6](./images/es6bg.jpg 'es6封面图')

es6的class是用来创建一个基于原型继承的类。class方式实现的继承本质就是es5实现继承的`语法糖`。

```js
class Animal {}
```

上面代码通过es6的class定义了一个Animal类，通过babel转化得到如下实现形式：

```js
// 判断一个对象是否是某个构造函数的实例
var _instanceof = function(left, right) {
  if (
    right != null &&
    typeof Symbol != 'undefined' &&
    right[Symbol.hasInstance]
  ) {
    return right[Symbol.hasInstance](left);
  } else {
    return left instanceof right;
  }
};

// 校验调用类（函数）的 方式
var _classCallCheck = function(instance, Constrctor) {
  if (!_instanceof(instance, Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
};

var Animal = function Animal() {
  /** 
   * 如果这里不是new的方式调用Animal，则this执行window，那么
   * 这个this肯定不是Animal的实例，直接抛出类型错误！
   */
  _classCallCheck(this, Animal);
};
```
从上面的代码可以看出，class定义类的实现是定义一个Animal函数，然后在函数内部检查调用Animal函数的方式，如果不是`new`的方式调用，则抛出异常！

从上面可以得出几点结论：
1. 调用class的方式必须是`new Class()`；
2. 如果构造函数存在`Symbol.hasInstance`方法，可以用它来判断某个对象`（如：this）`是否是某个构造函数`（如：Animal.constructor）`的实例；
3. `instance instanceof Constrctor`等价于`Constructor[Symbol.hasInstance](instance)`，判断构造函数的某个实例；







