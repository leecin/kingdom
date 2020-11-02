# Vue3组合式API
- setup(props, context) `{`
  - 定义响应式数据
    - reactive
    - ref
    - toRef
  - onBeforeMount
  - onMounted
  - onBeforeUpdate
  - onUpdated
  - onBeforeUmmount
  - onUnmounted
  - onErrorCaptured
  - onRenderTracked
  - onRenderTriggered
  - provide/inject
  - getCurrentInstance：只能在setup顶层或者生命钩子中使用
  - 返回一个对象或render函数：`return {...} 或 return () => h()`
- `}`

## setup中的props、context
前提条件：必须声明props接收的参数及类型，否则获取不到props
``` js
export default {
  name: 'Todolist',
  // ！！必须声明接收的参数及类型
  props: {
    todoThing: String
  },
  setup(props, context) {...}
}
```

## setup中的生命周期
setup的出现直接干掉了`beforeCreate`和`created`两个钩子函数。







