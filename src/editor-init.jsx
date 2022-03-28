import { plugins, project, material } from '@alilc/lowcode-engine'
import { filterPackages } from '@alilc/lowcode-plugin-inject'
import ComponentsPane from '@alilc/lowcode-plugin-components-pane'

// 其他的一些插件
// import ManualPlugin from '@alilc/lowcode-plugin-manual'
// import Inject, { injectAssets } from '@alilc/lowcode-plugin-inject'
// import SchemaPlugin from '@alilc/lowcode-plugin-schema'
// import SimulatorResizer from '@alilc/lowcode-plugin-simulator-select'
// import CodeEditor from '@alilc/lowcode-plugin-code-editor'

import assets from './assets.json'
import schema from './schema.json'

async function saveSchema() {
  const packages = await filterPackages(material.getAssets().packages)
  const projectShema = project.exportSchema()
  console.log('保存文档', { packages, projectShema })
}

export async function registerPlugins() {
  // 初始化编辑器
  const editorInit = (ctx) => {
    return {
      name: 'editor-init',
      async init() {
        const { material, project } = ctx
        // 加载相关的依赖
        // 必须的。否则无法编辑，无法选择组件
        material.setAssets(assets)

        // 加载 schema
        // 目前使用本地默认的一个 文档 schema，业务中应该通过接口获取相应的数据
        // 必须的。否则内容区域无法编辑
        project.openDocument(schema)
      },
    }
  }
  editorInit.pluginName = 'editorInit'
  await plugins.register(editorInit)

  // 左侧工具
  // 用于选择组件
  // 注册组件面板
  const UIComponetPluginRegistry = (ctx) => {
    return {
      name: 'UIComponetPluginRegistry',
      async init() {
        const { skeleton } = ctx

        const componentsPane = skeleton.add({
          area: 'leftArea',
          type: 'PanelDock',
          name: 'componentsPane',
          content: ComponentsPane,
          contentProps: {},
          props: {
            align: 'top',
            icon: 'zujianku',
            description: '组件库',
          },
        })
        componentsPane?.disable?.()
        project.onSimulatorRendererReady(() => {
          componentsPane?.enable?.()
        })
      },
    }
  }

  UIComponetPluginRegistry.pluginName = 'UIComponetPluginRegistry'
  await plugins.register(UIComponetPluginRegistry)

  // 顶部工具
  // 保存等操作
  const operationPluginRegistry = (ctx) => {
    return {
      name: 'operation-plugin',
      async init() {
        const { skeleton } = ctx

        skeleton.add({
          name: 'saveSample',
          area: 'topArea',
          type: 'Widget',
          props: {
            align: 'right',
          },
          content: <button onClick={saveSchema}>保存</button>,
        })
      },
    }
  }

  operationPluginRegistry.pluginName = 'operationPluginRegistry'
  await plugins.register(operationPluginRegistry)

  // await plugins.register(ManualPlugin)
  // await plugins.register(Inject)

  // 左侧工具
  // 用于查看当前文档的 schema
  // SchemaPlugin.pluginName = 'SchemaPlugin'
  // await plugins.register(SchemaPlugin)

  // 顶部工具
  // 用于切换或修改页面的宽度
  // 需要安装 `sass` `yarn add sass`
  // SimulatorResizer.pluginName = 'SimulatorResizer'
  // plugins.register(SimulatorResizer)

  // 目前还不知道有什么作用
  // 但是如果开启则会报错
  // CodeEditor.pluginName = 'CodeEditor'
  // await plugins.register(CodeEditor)
}
