class Compile {
  constructor(el, vm) {
    this.$el = this.isElementNode(el) ? el : document.querySelector(el)
    const fragment = this.fragmentNode(this.$el)

    // 编译模板
    this.compile(fragment)

    // 追加子节点
    this.$el.appendChild(fragment)
  }
  isElementNode(el) {
    return el.nodeType === 1
  }
  fragmentNode(el) {
    const f = document.createDocumentFragment();
    let firstChild
    while(firstChild = el.firstChild) {
      f.appendChild(firstChild)
    }
    return f
  }
  compile(f) {
    const childNodes = [...f.childNodes]
    childNodes.forEach(child => {
      if (this.isElementNode(child)) {
        console.log('元素节点', child)
      } else {
        console.log('文本节点', child)
      }
      if (child.childNodes && child.childNodes.length) {
        this.compile(child)
      }
    })
  }
}

class MVue {
  constructor(options) {
    this.$el = options.el
    this.$data = options.data
    this.$options = options
    if (this.$el) {
      // 有存在根元素节点
      new Compile(this.$el, this)
    }
  }
}