# Lodash学习
> 每日一个lodash，处理数据不用愁。

## _.isObject
> 判断一个参数是否是对象

1. 还能这样创建函数：new Function('console.log(23)')
2. 这些也都是对象：new Date()，new String('')
```ts
function isObject(val) {
  return val != null && (typeof val == 'function' || typeof val == 'object');
}
```

### 引申正则
> 1. 捕获性分组(`(匹配模式)`)；2. 非捕获性分组(`(?:匹配模式)`)；

1.捕获性分组
特点：分组匹配的结果是存储在RegExp中的，可以通过RegExp.$1,RegExp.$2...来取得相应的分组匹配结果
2.非捕获性分组（`/(?:hello)/`）
特点：不会创建匹配引用，因此执行效率高；
```ts
// 捕获性分组
var reg = /(hello)/

// 非捕获性分组
var reg = /^(?:replace|split)$/
```

## _.isObjectLike
> 类对象就是，值不会null，并且typeof为object

```ts
function isObjectLike(val) {
  return val != null && typeof val == 'object';
}
```

## _.compact
> 创建一个新数组，包含原数组中非假值元素

1. 循环判断给定数组的每一个元素的boolean值是否为真，为真则添加到临时数组中，最后返回
```ts
function compact(arr) {
  let ary = [];
  arr.forEach((item, idx, arr) => {
    if (Boolean(item)) {
      ary.push(item);
    }
  })
  return ary;
}
```

## 原生slice实现
用法：`arr.slice(?start, ?end)`，这里面需要考虑这几点：
1. start，end是否存在
2. start，end存在时的正负值情况
start要跟length比较；然后end要跟length比较；最后start跟end比较；
tips：可以用来拷贝数组；
```ts
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;
  
  // 比较的时候，一定只有一个是定量，另一个是变量；如果两个都是变量，没法比较
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  // 创建新数组，将指定范围内元素添加到新数组中
  // Array(2) => [empty x 2]
  var result = Array(length);
  while(++index < length) {
    result[index] = array[index + start];
  }
  return result;
}
```

## _.concat
> 创建一个新数组，将arr跟任何数组或数字相连在一起
```ts

```


