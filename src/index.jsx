import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { init, skeleton, common, plugins, config } from '@alilc/lowcode-engine'
import Logo from './components/Logo'
import { registerPlugins } from './editor-init'

const Workbench = common.skeletonCabin.Workbench

// skeleton.add({
//   area: 'topArea',
//   type: 'Widget',
//   name: 'logo',
//   content: Logo,
//   contentProps: {
//     logo: 'https://img.alicdn.com/tfs/TB1_SocGkT2gK0jSZFkXXcIQFXa-66-66.png',
//     href: '/',
//   },
//   props: {
//     align: 'left',
//     width: 100,
//   },
// })

// init(document.getElementById('root'))

const EditorView = () => {
  const [hasPluginInited, setHasPluginInited] = useState(false)

  useEffect(() => {
    plugins.init().then(() => {
      setHasPluginInited(true)
    })
  }, [])

  return hasPluginInited && <Workbench />
}

async function main() {
  console.log('window loaded')

  config.setConfig({
    // designMode: 'live',
    locale: 'zh-CN',
    enableCondition: true,
    enableCanvasLock: true,
    // 默认绑定变量
    supportVariableGlobally: true,
    // simulatorUrl 在当 engine-core.js 同一个父路径下时是不需要配置的！！！
    // 这里因为用的是 alifd cdn，在不同 npm 包，engine-core.js 和 react-simulator-renderer.js 是不同路径
    simulatorUrl: [
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/css/react-simulator-renderer.css',
      'https://alifd.alicdn.com/npm/@alilc/lowcode-react-simulator-renderer@latest/dist/js/react-simulator-renderer.js',
    ],
  })

  await registerPlugins()

  ReactDOM.render(<EditorView />, document.getElementById('root'))
}

window.onload = main()
