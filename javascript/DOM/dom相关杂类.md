# dom相关杂类
> dom操作在javascript中还是非常常见的，仅以此篇文档记录一下工作和学习中遇到的问题

## 如何知道是否有滚动条
兼顾主流浏览器和IE低版本浏览器
```ts
function hasScrollBar(dom) {
  return dom.scrollHeight > (window.innerHeight || document.documentElement.clientHeigtht);
}
```

## 获取浏览器滚动条宽度
主流浏览器的滚动条宽度
```ts
let scrollWidth = window.innerWidth - document.documentElement.clientWidth;
```


