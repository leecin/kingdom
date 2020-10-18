# React的类组件

![react](./images/react_class_component.jpg 'react class component')

react类组件有哪些特点？
1. 有this上下文；
2. constructor及super调用（es6类）；
3. 事件绑定；

```js
import React from 'react';
class Welcome extends React.Component {}
```
上面代码定义了一个`Welcome类`，并继承至`React.Component类`。这其实就是我们写es6类继承的方式，仅此而已。

那`类组件`和`类`有什么关系？

```js
class Welcome extends React.Component {
  render() {
    return (
      <div>Welcome Class Component</div>
    );
  }
}
```
上面代码定义了一个Welcome类，并加入`render方法`，此时该类就是一个`类组件`了。那组件又是什么？

`组件就是对数据和方法的简单封装。`这里的数据可以理解为`描述UI的React元素或者称之为vdom`，还有一些决定UI状态的`state`，这里的方法就是完成`数据到UI转化`的方法。

## 一、this上下文
类组件内部的this，指向的就是该类组件的实例。即`this instanceof Welcome`会返回true。由于Welcome继承至React.Compnent这一基类，因此实例会拥有如`生命周期、render`等方法。


## 二、constructor和super
首先，在定义react类组件时，如果没有指定constructor，则babel在转换es6语法时会自动加上，如果是指定了constructor，则必须在其内`先执行super()，然后再读取this`，否则会出现this引用错误！这是因为在执行`super()`操作前，`this还没创建`。
通常地，在constructor内，会做一些组件状态的定义、事件绑定等初始化工作。

## 三、react事件绑定
共有3中方法：
1. 在constructor中通过bind绑定；
2. DOM结构上通过bind绑定；
3. 使用public class fields语法；


### 在constructor中绑定
```js
class Welcome extends React.Component {
  constructor(props) {
    super(props)
    this.click = this.click.bind(this);
  }

  click() {}

  render() {
    return <div onClick={this.click}>click me</div>;
  }
}
```
这种绑定事件的特点：
1. 一次绑定终生受用。constructor初始化只执行一次，之后就不再执行了；
2. 事件函数挂载在`React.Component`上，实例读取时有一次原型查找；


### DOM结构上通过bind绑定
```js
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }

  // 挂载在React.Component原型上
  click() {}

  render() {
    return <div onClick={this.click.bind(this)}>click me</div>;
  }
}
```
这种绑定事件的特点：
1. 每次state或props更新都要重新绑定；
2. 事件函数挂载在`React.Component`上，实例读取时有一次原型查找；


### 使用public class fields语法
```js
class Welcome extends React.Component {
  constructor(props) {
    super(props)
  }

  // public class fields语法
  click = () {}

  render() {
    return <div onClick={this.click}>click me</div>;
  }
}
```
这种绑定事件的特点：
1. 直接绑定在this对象上，无原型查找；
2. 不过此特性还在试验阶段，存在不确定性；



