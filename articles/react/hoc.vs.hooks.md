# HOC Component vs Hooks Component

本篇文章主要围绕以下几个问题展开讨论：
1. HOC是什么？
2. HOC存在哪些问题？解决了什么问题？
3. Hooks是什么？
4. Hooks解决了什么问题？

## 一、HOC是什么？
在讲`高阶组件`之前，我们先来看看什么是`高阶函数`？

**高阶函数**

入参为函数，返回一个函数的函数，这就是高阶函数。即高阶函数满足两个条件：
1. 入参是函数；
2. 返回值是函数；

```js
function bar() {}

function foo(fn) {
  // ...other operations
  return fn;
}

var func = foo(bar);
```
上面代码，`foo`就是一个高阶函数。接受`bar`函数作为入参，并返回该函数。

**高阶组件**

HOC（High Order Component），高阶组件。顾名思义，高阶组件拥有高阶函数的特点，只不过其入参为组件不是函数。
```js
function Dog(props) {
  console.log(Dog.displayName);
  this.props = props;
}

function Animal(Component) {
  // 在返回Component前，可以对其做一些事情
  Component.displayName = 'HOC(Dog)';
  return Component;
}

Animal(Dog)({/* some properties */});
```
上面代码，定义了`Animal`和`Dog`两个函数，在调用`Animal函数`时将Dog函数作为入参传入，并在`Animal`内部返回该函数，这其实就是一个高级组件了。`Animal`返回的函数又可以继续接受其他的入参，比如这里的`props`，`Dog函数`接受到`props参数`后，就可以对其进行使用了。让我们来看看在react中HOC的应用吧。

HOC在react中的应用分为两类：
- 属性代理：高阶组件通过被包裹的组件操作props。
- 反向继承：高阶组件继承被包裹的组件。
在定义高阶组件时，我们约定这种格式：`With + Component`。其实，在redux中connect就是一个高阶组件。

一、属性代理
```js
class Dog extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props); // { name:'With Dog' }
  }
  render() {
    return <div>name：{this.props.name}</div>;
  }
}

// WithDog就是一个高阶组件
function WithDog(WrappedComponent) {
  return class extends React.Component {
    render() {
      // 给被包裹的组件添加其他属性，故名曰：属性代理
      // 在这个例子中，WrappedComponent就是Dog
      return <WrappedComponent name="With Dog" />;
    }
  }
}

export default WithDog(Dog);
```
属性代理的目的就是给被包裹组件处理props的空间。

二、反向代理
```js
class Dog extends React.Component {
  render() {
    return <div>Dog</div>
  }
}

function WithDog(WrappedComponent) {
  return class extends WrappedComponent {
    render() {
      // 将Dog的render拿来这里调用
      return super.render();
    }
  }
}

export default WithDog(Dog);
```








