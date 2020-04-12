## 说明

vue-cli 4 脚手架

- vue: 2.6.11
- vue-cli: 4.2.0
- vue-router: 3.1.5
- typescript: 3.7.5

## 常用命令

建议使用 yarn

```
安装插件
yarn install

项目启动
yarn serve

项目打包
yarn build
```

## 目录结构

```
- src
    - api               // 接口管理目录
    - assets            // 图片资源目录
    - components        // 组件目录
    - config            // 配置文件目录
        - env.js        // 环境配置
    - router            // 路由
    - store             // Vuex管理目录
    - scss              // 公共样式目录
    - views             // 页面目录
```

## 推荐规范

### 格式化

```
格式化建议使用4个空格
```

## 组件文件夹结构

具体可参考[Vue 官方风格指南-组件](https://cn.vuejs.org/v2/style-guide/#%E7%BB%84%E4%BB%B6%E6%96%87%E4%BB%B6%E5%BC%BA%E7%83%88%E6%8E%A8%E8%8D%90)。

[Vue.js 组件编码规范](https://juejin.im/entry/592f7981fe88c200618abbf9)

### 全局通用组件

位于`src/components。`

注意与业务组件区分，全局通用组件更强调基础性。类似于一个 UI 框架里的各种 Input、Button、Tab，只是在此处是你自己封装的。

#### 建议风格

- 文件夹命名采用单词大写开头（PascalBase）风格；
- 一个文件夹代表一个组件；
- 组件使用 index.vue 导出；
- 在 JS/JSX/TS 中的组件名采用单词大写开头（PascalBase）风格；
- 模板中的组件名采用中横线连接（kebab-case）风格。

#### 示例

目录结构：

```
- src
  - components
    - Header
      - index.vue
    - Footer
      - index.vue
    - Pagination
      - index.vue
    - Table
      - index.vue
    - Tree
      - index.vue
    - Dropdown
      - index.vue
    - Sidebar
      - index.vue
    - Breadcrumb
      - index.vue
```

使用：

```
<svg-icon></svg-icon>

import SvgIcon from '@/components/SvgIcon'

export default {
  name: 'SvgIcon',
  // ...
}
```

### 页面

位于`src/views。`

#### 建议风格

- 页面文件夹命名采用 kebab-case 风格；
- 每个页面一个.vue 文件，但是多个页面可以在一个文件夹下；
- 如果此文件夹只有一个页面，那么该页面组件可用 index.vue 表示；
- ./components 目录最多拥有一层子目录（其实就是该业务组件需要再次进行分割）；
- ./components 目录的子目录命名使用 PascalBase 风格.

注意：页面分割的业务组件存在./components 目录下。

#### 示例

目录结构：

```
- views
  - home
    - index.vue
  - error-page
    - 404.vue
  - login
    - index.vue
  - personal-center
    - index.vue
    - components
      - Dropdown
        - Dropdown.vue
```

`src/components/` 与 `src/views/` 的区别：

`src/components/：`

- 主要是全局性的，或通用性很强的组件，具备良好的封装性；
- 一般不会涉及到具体的业务逻辑。

`src/views/：`

- 主要是业务性的页面组件，基本不具备通用性；
- 基本与路由一一对应（例如 /src/views/auth/login.vue 对应着路由 /auth/login）；
- 各功能模块（如 msg/）内部可分离出通用部分（如 \_components/、\_mixins/）。

若多个功能模块通用的，则建议移到全局，即 `src/components/`。

## 组件写作顺序

> 参考工作组内的最佳实践，给出建议如下

组件引用，mixins，filters 等放在`@Component`里面，放在首行，装饰器一定要放在顶部。

`class`内部的顺序：

- data
- @Prop
- @State
- @Getter
- @Action
- @Mutation
- @Watch
- 生命周期钩子
  - beforeCreate（按照生命周期钩子从上到下）
  - created
  - beforeMount
  - mounted
  - beforeUpdate
  - updated
  - activated
  - deactivated
  - beforeDestroy
  - destroyed
  - errorCaptured（最后一个生命周期钩子，这个用的较少）
- 路由钩子
  - beforeRouteEnter
  - beforeRouteUpdate
  - beforeRouteLeave
- computed
- methods

## 常见问题

1、如何把格式化的 4 个空格改成 2 个？

```
.editorconfig 中 indent_size = 2 即可
```

## 坑

### 引入部分第三方库的时候需要额外声明文件

比如说我想引入`vue-lazyload`,虽然已经在本地安装，但是 typescript 还是提示找不到模块。原因是 typescript 是从`node_modules/@types`目录下去找模块声明，有些库并没有提供 typescript 的声明文件，所以就需要自己去添加

解决办法：在`src/typings`目前下建一个`tools.d.ts`文件，声明这个模块即可

```javascript
declare module 'vue-awesome-swiper' {
  export const swiper: any
  export const swiperSlide: any
}

declare module 'vue-lazyload'
```

### 对 vuex 的支持不是很好

在 TypeScript 里面使用不了 mapState、mapGetters 等方法，只能一个变量一个变量的去引用，这个要麻烦不少。不过使用`vuex-class`库之后，写法上也还算简洁美观

```javascript
export default class modules extends Vue {
  @State login: boolean; // 对应this.$store.state.login
  @State headline: StoreState.headline[]; // 对应this.$store.state.headline

  private swiperOption: Object = {
    autoplay: true,
    loop: true,
    direction: "vertical"
  };

  logoClick(): void {
    alert("点我干嘛");
  }
}
```
