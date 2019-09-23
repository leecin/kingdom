1. v-model底层及用法
（1）用在表单控件中
（2）用在自定义组件
底层就是：
```ts
v-bind:value
$emit('input', $event.target.value)
```

2. 一次性绑定多个属性和事件
（1）v-bind="$attrs"
（2）v-on="$listeners"


3. vue函数式组件
```ts
export default {
  name: 'todo',
  functional: true,
  props: {},
  render (h, context) {
    // h就是createElement，它返回的是一个节点描述对象createNodeDescription，我们把这中特殊的节点叫“虚拟DOM节点”
    // context就是实例的执行上下文，内部包含：slots, props, parent等
  }
}
```

4. vue插槽用法
（1）匿名插槽
（2）具名插槽
（3）作用于插槽
