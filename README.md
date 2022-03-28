1. 通过 `create-react-app` 创建新的 react 项目

```bash
npx create-react-app my-lowcode-editor
cd my-lowcode-editor
```

2. 通过 cdn 的方式引入依赖包

> [demo](https://github.com/alibaba/lowcode-demo/blob/main/public/index.ejs) 中使用的依赖

`public/index.html`

```html
<head>
  <link rel="icon" href="//img.alicdn.com/imgextra/i2/O1CN01lNWGJi1xflgRfSgbk_!!6000000006471-55-tps-22-26.svg" />
  <link href="./css/index.css" rel="stylesheet" />
  <!-- 低代码引擎的页面主题样式，可以替换为 theme-lowcode-dark -->
  <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/variables.css" rel="stylesheet" />
  <link href="https://alifd.alicdn.com/npm/@alifd/theme-lowcode-light@0.2.1/dist/next.var.min.css" rel="stylesheet" />
  <!-- 低代码引擎的页面框架样式 -->
  <link rel="stylesheet" href="https://alifd.alicdn.com/npm/@alilc/lowcode-engine@1.0.1/dist/css/engine-core.css" />
  <!-- 低代码引擎官方扩展的样式 -->
  <link rel="stylesheet" href="https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@1.0.2/dist/css/engine-ext.css" />

  <!-- React，可替换为 production 包 -->
  <script src="https://g.alicdn.com/code/lib/react/16.13.1/umd/react.production.min.js"></script>
  <!-- React DOM，可替换为 production 包 -->
  <script src="https://g.alicdn.com/code/lib/react-dom/16.13.1/umd/react-dom.production.min.js"></script>
  <!-- React 向下兼容，预防物料层的依赖 -->
  <script src="https://g.alicdn.com/code/lib/prop-types/15.7.2/prop-types.js"></script>
  <script src="https://g.alicdn.com/platform/c/react15-polyfill/0.0.1/dist/index.js"></script>
  <!-- lodash，低代码编辑器的依赖 -->
  <script src="https://g.alicdn.com/platform/c/lodash/4.6.1/lodash.min.js"></script>
  <!-- 日期处理包，Fusion Next 的依赖 -->
  <script src="https://g.alicdn.com/mylib/moment/2.24.0/min/moment.min.js"></script>
  <!-- Fusion Next 的主包，低代码编辑器的依赖 -->
  <script src="https://g.alicdn.com/code/lib/alifd__next/1.23.24/next.min.js"></script>
  <!-- 低代码引擎的主包 -->
  <script crossorigin="anonymous" src="https://alifd.alicdn.com/npm/@alilc/lowcode-engine@1.0.3/dist/js/engine-core.js"></script>
  <!-- 低代码引擎官方扩展的主包 -->
  <script crossorigin="anonymous" src="https://alifd.alicdn.com/npm/@alilc/lowcode-engine-ext@1.0.3/dist/js/engine-ext.js"></script>
</head>
```

3. 安装 craco，并配置
   > 参考[demo](https://github.com/alibaba/lowcode-demo/blob/main/build.json#L10)中的配置

```
yarn add @craco/craco -D
```

新建 `/craco.config.js`

```js
module.exports = {
  // 注意 craco@6.x 版本的写法
  webpack: {
    configure(webpackConfig) {
      // 这些包在 index.html 中通过 cdn 的方式引入了
      webpackConfig.externals = {
        react: 'var window.React',
        'react-dom': 'var window.ReactDOM',
        'prop-types': 'var window.PropTypes',
        '@alifd/next': 'var window.Next',
        '@alilc/lowcode-engine': 'var window.AliLowCodeEngine',
        '@alilc/lowcode-editor-core': 'var window.AliLowCodeEngine.common.editorCabin',
        '@alilc/lowcode-editor-skeleton': 'var window.AliLowCodeEngine.common.skeletonCabin',
        '@alilc/lowcode-designer': 'var window.AliLowCodeEngine.common.designerCabin',
        '@alilc/lowcode-engine-ext': 'var window.AliLowCodeEngineExt',
        '@ali/lowcode-engine': 'var window.AliLowCodeEngine',
        moment: 'var window.moment',
        lodash: 'var window._',
      }

      return webpackConfig
    },
  },
}
```

4. 安装类型依赖

由于相关的基础依赖都在 html 中引入，在开发期间获取不到依赖包的类型提示，所以需要在开发模式下安装相关的类型包。

```bash
yarn add @alilc/lowcode-engine @alilc/lowcode-engine-ext @alilc/lowcode-types @types/events @types/react @types/react-dom @types/streamsaver -D
```

然后项目原来的依赖包 **建议删除掉**。
因为 `@alilc/lowcode-engine` 这个包依赖了 react，并且它是通过 cdn 访问的，因此在上述的配置中设置了 `react: 'var window.React'`。而项目安装的 `react, react-dom` 版本可能不同，为了避免一些奇怪的问题，把项目自带安装的依赖删除，使用 cdn 引入的。

```
yarn remove react react-dom
```

5. 安装生产模式下编辑器的依赖
   > 参考 [demo](https://github.com/alibaba/lowcode-demo/blob/main/package.json#L18)

把相关的依赖配置复制粘贴到 `package.json`，然后执行 `yarn` 即可自动安装。
