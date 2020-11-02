# Vue和React的区别

![vue VS react](./images/vue_react.png)

## 一、数据流不同
**Vue：**
- 双向数据绑定
``` js
        props        v-model
`Parent  ====>  Child  <====>  DOM`
```

**React：**
- 单向数据流
``` js
        props         state
`Parent  ====>  Child  ====>  DOM`
```

## 二、组件通信不同
**Vue：**
1. props
2. event
3. provide/inject
``` js
          provide/inject
  -----------------------------
  |                           |
  |     props                 |
  |     ====>                 |
`Parent         Child  ...  Child`
        <====
        event
```
看几个实际的例子加深以下印象
``` html
<!-- Parent.vue -->
<template>
  <div>
    <h1>parent title is: {{ title }}</h1>
  </div>
</template>

<!-- Child.vue -->
<template>
  <div>
    <h1>Child title is: {{ title }}</h1>
  </div>
</template>
```

``` html
<!-- Props传值 -->
<template>
  <Parent>
    <Child :title="xxx"></Child>
  </Parent>
</template>

<!-- 
  event传值，
  注：$propertyName表示实例的属性
-->
<template>
  <Parent v-on:change-title="title = $event">
    <button v-on:click="$emit('change-title', 'Vue3')">Change Title</button>
  </Parent>
</template>
```


**React：**
1. props
2. callback
3. context

``` js
          context
  -------------------------
  |                       |
  |    props              |
  |     ====>             |
`Parent        Child  ... Child`
        <====
       callback
```

## 三、模板渲染方式不同
**Vue：**
- 通过扩展HTML语法进行渲染。更底层的说，是通过指令集来实现js和HTML分离的。

**React：**
- 通过JSX渲染模板。底层是通过原生js实现常见的语法，比如插值，条件、循环等。

还有一点区别就是react的`render函数支持闭包`的，因此可以import进来的组件可以直接丢到render中渲染，而vue中模板的状态是挂在`this对象`上的，因此import进来的组件需要写在components里，完成组件实例的挂载。

## 四、监听数据变化的实现原理不同
**Vue：**

vue通过getter、setter以及一些函数的劫持完成数据的响应式，能够精确的知道数据的变化，不需要特别的优化就能有很好的性能。

**React：**

react默认通过`比较引用的不同`进行渲染的。如果不进行（PureComponent/shouldComponentUpdate）优化，可能出现大量不必要的重新渲染。

`最根本的区别是vue使用的是可变数据，而react强调数据不可变性。`

## 五、Mixins、HOC组合功能
**Vue：**

在vue中，通过mixins组合不同功能。他不能通过HOC的方式实现是因为vue的组件是一个被包装过的函数，在创建实例时隐式做了模板的编译、props的接收等。

**React：**

在react中，通过HOC（高阶组件）组合不同功能。早起的react也是使用mixins，但后来放弃该特性的原因是，react官方觉得mixins这种方式对组件侵入性太强，会导致很多问题。



