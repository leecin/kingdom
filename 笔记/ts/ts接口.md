# TypeScript学习之接口

### 接口初探
```ts
// content是传入内容的接口(即入参作为其属性)
// 真正匹配的内容是接口对应的参数类型
function hello(content: {name: string}): string {
  return 'hello' + content.name
}
hello({name:'lj'})
```

### 接口实例
- 接口类型匹配时忽略key的先后顺序，如下面的：name, age等
- 可以理解为接口就是对象（对象没有先后顺序之分）
```ts
// 定义参数类型
interface Content {
  name: string,
  age: number
}
function hello(content: Content): string {
  // 注意：使用conetent获取接口值
  return 'hello' + content.name
}
hello({name:'lj'}) // ok
hello({age:23, name:'lj'}) // ok
```

### 接口可选属性
- [x] 语法：property?

1. age, addr为可选参数
2. 指定了hello返回值的各项参数类型
```ts
interface Content {
  name: string,
  age?: number,
  addr?: string
}
function hello(content: Content): {name: string, age: number} {
  return 'hello' + content.name + ',' + content.age
}
hello({name:'lj', age:23})
```

### 只读属性
- [x] readonly property
> 定义好的值，在将来不能被改变
> 作为属性用readonly，作为变量用const
```ts
interface Content {
  readonly name: string,
  readonly age: number
}
```
