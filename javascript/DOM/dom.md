# DOM节点
1. 在所有查找节点方法中，如果没有找到基本上都是返回`null`

## 节点类型
1. 元素节点(Element，1-`ELEMENT_NODE`)：`<body>`
2. 属性节点(Attribute，2-`NODE_ATTRIBUTE_NODE`)：`class="active"`
3. 文本节点(Text，3=`NODE_TEXT_NODE`)：`<p>文本</p>`
4. 注释节点(Comment，8-`COMMENT_NODE`)：`<!--注释-->`
5. 文档节点(Document，9-`DOCUMENT_NODE`)：`document`
6. 文档片段(DocumentFragment，11-`DOCUMENT_FRAGMENT_NODE`)：`documentFragment`
7. 文档类型节点(DocumentType，10-`DOCUMENT_TYPE_NODE`)：`<!DOCTYPE>`
元素节点属性和值对应关系：`nodeType - value(ELEMENT_NODE)`
```ts
document.nodeType === Node.DOCUMENT_NODE // true
```

## 节点层级关系
1. 父子节点(parentNode)：`直接`的上级节点
2. 子节点(childNodes)：`直接`的下级节点
  - [x] firstChild
  - [x] lastChild
3. 兄弟节点(sibling)：拥有`同一父节点`的节点
  - [x] previousSibling
  - [x] nextSibling

## 节点属性和方法
以下所有的属性和方法都是定义在Node的原型对象上，所以获取到页面上的节点实例后，就可以使用它原型上的属性和方法
- [x] 属性

1. Node.prototype.nodeType（例如：`document.nodeType`的值是9）
```ts
文档节点（document）：9，对应常量Node.DOCUMENT_NODE
元素节点（element）：1，对应常量Node.ELEMENT_NODE
属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
文本节点（text）：3，对应常量Node.TEXT_NODE
文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
注释节点（Comment）：8，对应常量Node.COMMENT_NODE
```

2. Node.prototype.nodeName（例如：`<p></p>`，会返回大写的`P`）
```ts
文档节点（document）：#document
元素节点（element）：大写的标签名
属性节点（attr）：属性的名称
文本节点（text）：#text
文档片断节点（DocumentFragment）：#document-fragment
文档类型节点（DocumentType）：文档的类型
注释节点（Comment）：#comment
```

3. Node.prototype.nodeValue（只有`文本`、`注释`和`属性`节点有这个值）
```ts
// <div id="d1">hello world</div>
var div = document.getElementById('d1');
div.nodeValue // null
div.firstChild.nodeValue // "hello world"
```

4. Node.prototype.textContent（返回`当前节点`和它的`所有后代节点`的文本内容）
- [x] 自动忽略当前节点内部的 HTML 标签，返回所有文本内容
- [x] 对HTML自动转义（也就是保留了`>`，`<`号），适合用于用户提供的内容
```ts
// 把span标签里的内容也提取了
<div id="divA">This is <span>some</span> text</div>
document.getElementById('divA').textContent // this is some text
// 读取整个文档内容
document.documentElement.textContent
```

5. Node.prototype.baseURI（表示当前网页的绝对路径）
浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读
```ts
document.baseURI // http://www.example.com/index.html
```

6. Node.prototype.ownerDocument（返回当前节点所在的顶层文档对象）

7. Node.prototype.nextSibling（当前节点后面的第一个同级节点）
可以用`nextSibling`遍历所有子节点
```ts
// HTML结构如下
<div id="d1">hello</div><div class="d2">world</div>
var d1 = document.getElementById('d1')
var d2 = document.getElementById('d2')
d1.nextSibling = d2 // true

// 遍历所有子节点
var el = document.getElementById('div1').firstChild;
while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}
```

8. Node.prototype.previousSibling（返回当前节点前面的、距离最近的一个同级节点）
用法同nextSibling

9. Node.prototype.parentNode
常用parentNode来删除子节点
- [x] 父节点只可能是以下三种类型：
1. 元素节点
2. 文档节点
3. 文档片段节点

10. Node.prototype.parentElement（返回当前节点是元素节点类型的父元素节点）
父节点只有这三种类型：
1. 元素节点
2. 文档节点
3. 文档片段节点

11. Node.prototype.firstChild，Node.prototype.lastChild
1. firstChild属性，返回当前节点的第一个子节点
2. lastChild属性，返回当前节点的最后一个子节点


12. Node.prototype.childNodes（返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点）
1. 可以用`for`循环遍历
2. 可以用`forEach`循环遍历
```ts
var children = document.getElementById('ul').childNodes;
```

13. Node.prototype.isConnected（返回一个布尔值，表示当前节点是否在文档之中）
```ts
var test = document.createElement('p');
test.isConnected // false

document.body.appendChild(test);
test.isConnected // true
```

2. 方法
1. Node.prototype.appendChild()（接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点）
```ts
var p = document.createElement('p')
document.body.appendChild(p)
```

2. Node.prototype.hasChildNodes()（返回一个布尔值，表示当前节点是否有子节点）
```ts
// 移除掉第一个子节点
var div = document.getElementById('div')
if (div.hasChildNodes()) {
  div.removeChild(div.childNodes[0])
}
```
判断一个节点有没有子节点，有以下三种方法：
1. node.hasChildNodes()
2. node.firstChild !== null
3. node.childNodes && node.childNodes.length > 0

3. Node.prototype.cloneNode()（克隆节点，接收布尔值：true克隆其子节点；false仅克隆节点）
1. 克隆节点会拷贝该节点所有属性，但是不包括已添加的事件监听器
2. 该方法返回的节点不在文档中
```ts
var cloneUl = document.getElementById('ul').clone(true)
```

4. Node.prototype.insertBefore()（将某个节点插入父节点内部的指定位置）
```ts
// 将新节点newNode插入到指定节点前面(referenceNode)，
var insertNode = parentNode.insertBefore(newNode, referenceNode)
```


Node.prototype.removeChild()
Node.prototype.replaceChild()
Node.prototype.contains()
Node.prototype.compareDocumentPosition()
Node.prototype.isEqualNode()，Node.prototype.isSameNode()
Node.prototype.normalize()
Node.prototype.getRootNode()


