# [React]Hooks用法总结

> `Hook是react16.8的新增特性`。

## Hook诞生的动机
- 组件间状态复用难
- 复杂而庞大的组件不易维护
- 难理解的class类

## 常用的Hook有哪些
1. useState
2. useEffect
3. useLayoutEffect
4. useRef
5. useContext
6. useReducer
7. useMemo
8. useCallback
9. useImperativeHandle

### useState用法
useState定义组件的状态，其语法主要有两种表现形式：
1. `const [state, setState] = useState(initialState)`
2. `const [state, setState] = useState(() => initialState)`

这两种写法的区别在于：以回调函数的形式，可以在该函数内处理一些初始化的state，而直接传入的方式只能放在useState外部处理好再传给它，除此之外无任何区别。并且两者都是只在初始渲染组件时调用，之后的更新不会再执行。


