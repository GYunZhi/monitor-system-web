## 后台管理系统

## git 配置

```bash
# 统一使用LF作为结尾标识符
git config --global core.autocrlf false
```

## 统一使用[Yarn](https://yarnpkg.com/en/docs/cli/)包管理工具

```bash
# 安装
npm install yarn -g
# 设置镜像
yarn config set registry https://registry.npm.taobao.org --global
yarn config set disturl https://npm.taobao.org/dist --global
```

## node-sass 安装失败

安装依赖的过程中可能会遇到 node-sass 安装失败问题

```bash
# 第一步 配置 node-sass 的二进制包镜像地址：
yarn config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/

# 第二步 重新安装 node-sass 依赖
yarn add node-sass@xxx -D
```

## 运行项目

``` bash
# 安装项目依赖
yarn

# 运行项目
yarn run dev

# 打包部署
yarn run build
```


## 分支说明

- master 用于发生产
- develop 开发分支
- 若要执行任务或是修复 bug, 我们从 develop 拉取一个分支来编写我们的代码，若执行完成再合并至 develop 分支

## docker 部署

1. 本地刷新依赖，打包 `yarn && yarn run build`

2. 在项目根目录下构建镜像并推送到镜像库

   ```bash
   # 开发环境
   docker build -t 192.168.2.244:5000/smart/vue_admin_template:dev .
   docker push 192.168.2.244:5000/smart/vue_admin_template:dev
   
   # 生产环境
   docker build -t 192.168.2.244:5000/smart/vue_admin_template .
   docker push 192.168.2.244:5000/smart/vue_admin_template
   ```

3. 登录 Rancher 更新服务

   ```bash
   地址：http://192.168.2.244:8080
   用户名：work
   密码：work@123
   ```

## 页面模板

```javascript
// 项目中 template.vue
<template>
  <!-- page-name：页面名称，如应用管理 app-mag -->
  <div class="page-name">
    <c-breadcrumb :router-list="routerList"></c-breadcrumb>
    <div class="container">
      页面内容
    </div>
  </div>
</template>

<script>
import CBreadcrumb from 'components/layout/breadcrumb'
export default {
  name: 'page-name',
  data () {
    return {
      routerList: [
        {
          routeName: 'home',
          title: '首页'
        },
        {
          routeName: 'appList',
          title: '应用列表'
        }
      ]
    }
  },
  components: {
    CBreadcrumb
  }
}
</script>

<style lang="scss" scoped>

</style>

```

## 结合 DOClever Mock 数据开发

http://localhost:8090 是前端项目的地址

http://192.168.2.244:9026/mock/5cf22deff8a8e955c2cb2624  这个是 mock server 的地址

5cf22deff8a8e955c2cb2624 是我们项目在 DOClever 中的项目 ID

 如果在 DOClever 中接口状态处于“开发中”，就走 http://192.168.2.244:9026/mock/5cf22deff8a8e955c2cb2624 这个mock地址

 如果是“开发完成”，就走我们真实的地址，因为 http://localhost:8090 我们在项目里代理了真实地址所以可以直接写。

 net.js 放在 mock 目录下

node net.js http://192.168.2.244:9026/mock/5df03ab5d20847152e3ef0e7 http://localhost:8090

## Git 提交规范

使用当前较为主流的 [AngularJS 的 commit 规范](https://gist.github.com/stephenparish/9941e89d80e2bc58a153)

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer

```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```

其中，Header 是必需的，Body 和 Footer 可以省略

### Header

Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）

#### type

用来标识 commit 的类型，总共有以下 7 个标识：

- feat：新功能（feature）
- fix：修补 bug
- docs：文档发生修改 (documentation)
- style：不影响代码运行的更改（空格，格式，缺少分号等）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：添加或修改测试用例
- chore：除上述之外的修改

#### scope

用来标识改动所影响的范围，视项目而定

#### subject

改动的简短描述，不超过 50 字符长度

### Body

本次 commit 的详细描述

### Footer

主要用于两种情况：

- 重大的不兼容改动: 用于给出改动说明及解决方案。
- 关联 issues: 用于关闭相应 issues

## 编码规范

### vue 文件

- components 和 pages 两个文件夹分别对应『组件』和『页面』；

- 『组件』文件名加前缀『C』，首字母大写，采用驼峰式命名；

- 『页面』文件名采用中划线命名；

- components 放置的都是全局公用的一些组件，如上传组件，富文本编辑器等；

- 一些页面级的组件建议还是放在各自views文件下，方便管理。

  ![](http://jty-common.oss-cn-beijing.aliyuncs.com/nrsc/156743499388684264752?1567406221424)

### HTML

- 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法
- 嵌套元素应当换行并且缩进一次（即两个空格）

### CSS

#### 语法

- 用两个空格来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法
- 为选择器分组时，将单独的选择器单独放在一行
- 为了代码的易读性，在每个声明块的左花括号前添加一个空格
- 声明块的右花括号应当单独成行
- 每条声明语句的 : 后应该插入一个空格
- 对于以逗号分隔的属性值，每个逗号后面都应该插入一个空格（例如，box-shadow）
- 十六进制值应该全部小写，例如，#fff

```css
/* Bad CSS */
.selector, .selector-secondary, .selector[type=text] {
  padding:15px;
  margin:0px 0px 15px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

/* Good CSS */
.selector,
.selector-secondary,
.selector[type="text"] {
  padding: 15px;
  margin-bottom: 15px;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #ccc, inset 0 1px 0 #fff;
}
```

#### 声明顺序

相关的属性声明应当归为一组，并按照下面的顺序排列：

1. Positioning
2. Box model
3. Typographic
4. Visual

由于定位（positioning）可以从正常的文档流中移除元素，并且还能覆盖盒模型（box model）相关的样式，因此排在首位。盒模型排在第二位，因为它决定了组件的尺寸和位置。

其他属性只是影响组件的内部（inside）或者是不影响前两组属性，因此排在后面

#### class 命名

- class 名称中只能出现小写字符和破折号（dashe）（不是下划线，也不是驼峰命名法）。破折号应当用于相关 class 的命名（类似于命名空间）（例如，.btn 和 .btn-danger）
- 基于最近的父 class 或基本（base） class 作为新 class 的前缀

## 推荐编辑器

这里推荐一个编辑器：

- [VS Code](https://code.visualstudio.com/)，微软出品的开源编辑器，插件丰富，性能优异

### VS Code 相关插件

- vutur （Vue 语法高亮）
- eslint   (对js进行与法检查和提示)
- beautify （代码格式化 包括：javascript, json, sass, html）
- auto close tag （自动闭合HTML/XML标签）
- gitlens（方便查看git提交信息和版本回退）

## 相关文档

- [PM2](http://pm2.keymetrics.io/)，Node.js 进程管理
- [vue](https://cn.vuejs.org/v2/guide/)，构建数据驱动的 web 界面的渐进式框架
- [vue-router](https://router.vuejs.org/zh-cn/)，vue 路由管理
- [vue-loader](https://vue-loader.vuejs.org/en/)，「.vue」文件加载器
- [Vuex](https://vuex.vuejs.org/zh-cn/)，vue 状态管理
- [scss](https://www.sass.hk)，CSS 预处理语言
- [axios](https://github.com/mzabriskie/axios)，ajax 库
- [element-ui](http://element.eleme.io/#/zh-CN/component/installation)，UI 框架
- [ECMAScript 6](http://es6.ruanyifeng.com/)，JavaScript 语言的下一代标准
- [webpack](http://webpack.github.io/)，前端打包工具

