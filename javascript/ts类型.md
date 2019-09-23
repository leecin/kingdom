# TypeScript学习

## 声明的类型
- [ ] number
- [ ] boolean
- [ ] string
- [ ] undefined
- [ ] null
- [ ] object
- [ ] array
- [ ] tuple
- [ ] enum
- [ ] any
- [ ] void
- [ ] never


### 基础类型
- [x] number
- [x] boolean
- [x] string
```ts
let num: number = 23
let isDone: boolean = true
let name: string = 'leejing'
```

### 复合类型
- [x] object
- [x] array
- [x] tuple(元组)
- [x] enum(枚举)
```ts
declare function create(o: object | null): void
create(null)

// 数组中**只能**含有number类型
// 1. 元素类型[]
// 2. Array<元素类型>
let ary: number[] = [1, 2, 3]
let ary: Array<number> = [1, 2, 3]

// 元素类型必须**一一对应**
let tuple: [number, string]
tuple = [23, true] // true
tuple = [true, 23] // false

// 默认从0开始编号
// 通过下标取值：Color[0]
enum Color {green = 0, blue, red}
let c: Color = Color.green
```

### u/n类型
- [x] undefined
- [x] null
默认情况下，undefined和null类型是所有类型的子类型，即任何类型都可以赋值undefined和null
```ts
let u: undefined = undefined
let n: null = null
```

### Any类型
- [x] any
不确定的类型，可动态改变
```ts
let notSure: any = 23
notSure = 'hello'
```

### void类型
- [x] void
通常声明函数的返回值，表明函数没有返回值
当声明一个void类型值时，只能赋值undefined和null
```ts
function sayHello(): void {}
let v: void = undefined
let v: void = null
```

### never类型
- [x] never
返回never的函数必须存在无法达到的终点
没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。即使 any也不可以赋值给never
```ts
function error(msg: string): never {
  throw new Error(msg)
}
```

### 类型断言
- [x] <元素类型someValue>
- [x] someValue as 元素类型
当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
```ts
// someValue是string类型，而求得的值是number类型
let someValue: any = 'this is my car'
let strLength: number = (<string> someValue).length
let strLength: number = (someValue as string).length
```

---

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



