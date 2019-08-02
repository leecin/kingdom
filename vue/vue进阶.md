# vue进阶学习
> vue任重而道远。。。

## v-model实操
v-model其实就是：`v-bind:value="val"`和`input或change事件`的语法糖
v-model主要用在以下2个地方：
1. 表单控件上(radio, input等)
2. 组件上
```ts
// 父组件
<fullscreen v-model="isFullscreen" style="margin-right: 10px;"/>
`!!注意：这里接收的可是value，而不是isFullscreen
props: {
  value: Boolean
}
`
document.addEventListener('fullscreenchange', () => {
  this.$emit('input', !this.value)
  this.$emti('change', !this.value)
})
```


## vue-cli3.0配置
开启vue服务命令：`vue-cli-service serve`。
该命令会配置在`package.json`的`scripts对象`中，当执行该命令时，会到全局安装@vue/cli时的目录（C:\Users\lijing\AppData\Roaming\npm\node_modules\@vue\cli_tmp）下执行对应脚本文件来开启服务。
该命令的配置方式有2种：
1. 直接在package.json中的scripts对象中配置参数：`vue-cli-service serve --open`；
2. 你也可以使用 vue.config.js 里的 devServer 字段配置开发服务器
```ts
"scripts": {
  "dev": "vue-cli-service serve",
  "build": "vue-cli-service build"
}

用法：vue-cli-service serve [options] [entry]
选项：
  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 (默认值：development)
  --host    指定 host (默认值：0.0.0.0)
  --port    指定 port (默认值：8080)
  --https   使用 https (默认值：false)
```

## vue.config.js配置
当用vue-cli3.0构建工具创建项目时，我们只需要配置这一个文件就可以了，其他的配置(默认配置，vue已经帮我们做好了)
```ts
module.exports = {
  publicPath: '/',


  // css 配置
  css: {
    module: true,
    loadOptions: {
      less: {
        // 向所有的 less 样式传入共享的全局变量
        // ~路径符，允许vue将 variables.less 当作一个模块处理
        data: `@import "~@/variables.less"` 
      }
    }
  }
}
```

## Css module
1. 如何使用 css module？
定义style的module属性，当加上该属性时，表明该style是一个css模块对象，暴露为：$style 的计算属性。
另外，它也会添加到vue实例(this)当中，所以也可以这样访问：this.$style.red。不过它只是一个基于文件名和类名生成的标识符而已。
```css
<style module>
  .red {
    color: red;
  }
</style>
```
在模板template中，我们可以通过 $style.red 取得red的class定义。
```html
<div :class="$style.red">
  red div text.
</div>
```
2. css module自定义避免重名
一个.vue文件里也可以多一个style，用module区分开就行。
```css
<style module="user">
  .red { color: red; }
</style>

<style module="product">
  .red { color: red; }
</style>
```