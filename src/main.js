import Vue from 'vue'

// 引入第三方插件
import './plugins'

import mixins from './mixins'

// 自定义主题
import '../element-variables.scss'

import App from './App'
import router from './router'
import store from './store'
import http from './http'
import i18n from '@/locale'
import 'normalize.css/normalize.css'
import './permission'

// 全局mixin
Vue.mixin(mixins)

Vue.prototype.$http = http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
