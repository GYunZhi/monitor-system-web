// 自动引入 plugins 中的插件
const requirePlugin = require.context('/', false, /.+\.js$/)

requirePlugin.keys().forEach(fileName => {
  requirePlugin(fileName)
})
