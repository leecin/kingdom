# JavaScript的this、原型和继承

本篇文章围绕以下几个点展开描述：
1. this是什么？怎么用？
2. 原型及原型链是什么？他们之间有什么关系？
3. 如何实现继承？

## this是什么？
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
上面代码可以看出，有`class`的地方必定会涉及`原型`、`继承`、`原型链`等概念，我们粗略的来捋一捋上面的原型之间的关系。

开始是`Welcome extends React.Component`，可以得出：`Welcome --> React.Component`（-->表示指向），然后`II extends WrappedComponent`，可以得出：`II --> Welcome`（WrappedComponent就是Welcome），所以整个原型链：`II --> Welcome --> React.Component`。