# 深入理解React高阶组件

本篇文章主要围绕以下几个问题展开讨论：
1. HOC是什么？
2. HOC存在哪些问题？
3. HOC解决了什么问题？

# 一、HOC（Higher Order Component）是什么？
在react开发中，存在这样一种关系：`JSX => Element => Component`。
- JSX：描述UI应该呈现出它应有交互的样子（DOM结构、事件回调等）
- Element：元素描述了你在屏幕上看到的内容
- Component：具有独立作用域的可复用的代码段

一句话概括，就是`JSX`生成`Element`，`Elements`组成`Components`。

在讲`高阶组件`之前，我们先来看看什么是`高阶函数`？

## 高阶函数
入参为函数，返回一个函数的函数，这就是高阶函数。即高阶函数满足两个条件：
1. 入参是函数；
2. 返回值是函数；
``` js
function bar() {}

function foo(fn) {
  // ...other operations
  return fn;
}

var func = foo(bar);
```
上面代码，`foo`就是一个高阶函数。接受`bar`函数作为入参，并返回该函数。


## 高阶组件
HOC（High Order Component），高阶组件。顾名思义，高阶组件拥有高阶函数的特点，只不过其入参为组件不是函数。
``` js
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


# 高阶组件能够做什么？
1. 逻辑抽象，代码复用；
2. 操作state、props；
3. 渲染劫持；

概括以上几点，高阶组件主要应用在两个方面：
- 属性代理：高阶组件通过被包裹的组件操作props。
- 反向继承：高阶组件继承被包裹的组件。


## 属性代理（Props Proxy）
属性代理的作用：
1. 操作props
2. 通过ref获取组件实例
3. 抽象state

### 操作props
通过在新的组件渲染前，将新增的props添加到目标组件上，来达到操作目标组件props的目的。
``` js
// 高阶组件返回一个经过`处理`后的类组件
// 小提示：class 后面的变量名可以不写，即class extends React.Component {}，我这里统一写上，免得增加理解成本
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    render() {
      // 添加新的属性
      const newProps = {
        name: 'HOC(Dog)'
      }
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  }
}
```

### 通过ref获取组件实例
``` js
class Welcome extends React.Component {
  render() {
    return <div ref={this.props.getInst}>Welcome!</div>;
  }
}

function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    getInst(inst) {
      console.log(inst); // 组件实例/DOM对象
    }
    render() {
      return <WrappedComponent getInst={this.getInst.bind(this)} />;
    }
  }
}
```

## 抽象state
``` js
class Welcome extends React.Component {
  render() {
    return <div>Welcome!</div>;
  }
}
function ppHOC(WrappedComponent) {
  return class PP extends React.Component {
    construtor(props) {
      super(props);
      this.state = {
        count: 0
      };
      this.setCount = this.setCount.bind(this);
    }
    setCount() {
      this.setState((c) => c + 1);
    }
    render() {
      const props = {
        ...this.props,
        // 抽象state，让外部可以操作公共的state
        ppState: {
          count: this.state.count,
          setCount: this.setCount
        }
      };
      return <WrappedComponent {...props} />;
    }
  }
}
```


## 反向继承（Inheritance Inversion）
反向继承体现在继承与被继承的关系上。例如，按照正常的继承方式（正向继承，我胡编乱造的哈）假如是A继承B，那反向继承就是B继承A了。那反向继承有什么好处呢？

反向代理的作用：
1. 渲染劫持
2. 操作state

### 渲染劫持
通过获取被包裹组件render的virtual DOM，通过修改vdom的结构或者数据，进而来控制最终渲染的内容。
``` js
function iiHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      // 这里的super就是WrappedComponent组件原型，那么就可操纵其原型上的方法了，即render方法
      // 这里你想怎么操作vdom都可以，
      const vdom = super.render();
      return vdom;
    }
  }
}
```

### 操作state
由于II组件继承至WrappedComponent组件，因此内部的this指向当然是II组件实例了，即可以获取到WrappedComponent实例的属性。
``` js
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
}

function iiHOC(WrappedComponent) {
  return class II extends WrappedComponent {
    render() {
      // 这里可以操作this.state获取被包裹组件的state
      return <div>WrappedComponent's count: {this.state.count}</div>;
    }
  }
}
export default iiHOC(Welcome);
```
上面代码可以看出，借助js继承的强大威力，在高阶组件内就可以实现对被包裹组件state的操作。


# 小结
react的class组件，满满的this、原型和继承的概念，所以说，基础知识有多重要可见一斑了。不过好消息是，我最近这段时间也在整理并输出对应的文章，我们可以一起学习、探讨。

未完待续...





