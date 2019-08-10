# vue常见问题

## Do not use built-in or reserved HTML elements as component id
不要使用已有的或保留的元素名称作为组件的id，比如自定义一个叫做`menu`的组件，此时就会报这个错误！
我们可以变通一下：将创建的组件命名为`cmenu`，这就不会有这个问题，并且以`c`作开头，很显然这表示一个组件

## <template> cannot be keyed
template是虚拟DOM节点，编译后不会添加到真实DOM结构中，所以无法添加key属性