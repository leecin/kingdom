# [Vue复习]之Template(HTML)部分
先来看一段vue的`template语法`吧。里面包括各种指令和数据绑定的写法。
``` html
<template>
  <div id="app" v-for="(item, index) in todoList">
    <p v-on:click="chooseOne" v-show="index">
      Message: {{item.todo}}
    </p>
  </div>
</template>
```
## 模板语法
1. 数据绑定：`{{ message }}`，即双大括号语法。并且该值与数据对象上`( data() => ({...}) )`的值进行了绑定。

## 指令集
1. v-for
2. v-if/v-else
3. v-show
4. v-once
5. v-html
6. v-text
7. v-bind
8. v-on
9. v-model
10. v-pre
11. v-slot

**v-for**
- 作用：遍历列表
``` html
<!-- 
  todos: { todo: '', time: '' }，为对象
  item为值，key为键，index为索引
-->
<div v-for="(item, key, index) in todos">
  {{ item }}
</div>

<!-- 
  todos：[{ todo: '', time: '' }]，为数组
  item为值，index为索引
-->
<div v-for="(item, index) in todos">
  {{ item }}
</div>
```

**v-if**
- 作用：条件渲染。
``` html
<template v-if="expression">xxx</template>
<div v-if="expression">xxx</div>
```

**v-show**
- 作用：条件渲染，相当于切换CSS的display属性。
``` html
<template v-show="expression">xxx</template>
<div v-show="expression">xxx</div>
```

**v-once**
- 作用：只渲染一次，后续数据变动也不会更新。
``` html
<div v-once>only once.</div>
```

**v-html**
- 作用：更新元素的innerHTML。
<!-- 更新div元素的innerHTML -->
``` html
<div v-html="'<h1>Vue3</h1>'">这里的内容被忽略了</div>
```

**v-text**
- 作用：更新元素的textContent。
``` html
<!-- 
  更新div元素的textContent
  v-text内的内容原封不动的输出，相当于<div>{{ text }}</div>
-->
<div v-text="'<div>hello<p>vue3</p></div>'">
  这里的内容被忽略了
</div>
```

**v-bind**
- 作用：给元素绑定属性。简写：`:attribute`。
``` html
<div v-bind:title="this is vue">Vue</div>
<!-- 等价于 -->
<div :title="this is vue">Vue</div>
```

**v-on**
- 作用：给元素绑定事件。简写：`@eventName`。
``` html
<div v-on:click="clickMe">click me</div>
<!-- 等价于 -->
<div @click="clickMe">click me</div>
```

**v-model**
- 作用：数据双向绑定。默认采用value和input事件。
``` html
<input v-model="message" />
<!-- 等价于 -->
<input
  v-bind:value="message"
  v-on:input="$emit('input', message = $event.target.value)"
/>

<!-- 
  value和input被占用，
  比如：checkbox的value表示它的值，checked的表示是否选中
-->
Vue.component('checkbox-input, {
  model: {
    prop: 'checked',
    event: 'change'
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.value)"
    />
  `
})
```

**v-slot**
- 作用：作为模板内容的一个入口。组件/内容复用的一种方式。

插槽类别有：
1. 匿名插槽
2. 具名插槽
3. 作用域插槽
``` html
<base-header>Directives</base-header>
<!-- base-header组件内部实现： -->
<div>
  <h1>Vue3文档</h1>
  <!-- slot这块内容被替换为Directives -->
  <slot></slot>

  <!-- 具名插槽 -->
  <slot name="footer"></slot>

  <!-- 作用域插槽，其中user为插槽的prop -->
  <slot v-bind:user="user">
    {{ user.lastName }}
  </slot>
</div>
```


