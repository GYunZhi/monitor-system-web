import router from './router'
// import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
// import { Message } from 'element-ui'
// import { getItem } from '@/utils/auth' // 验权

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // if (getItem('smart-admin-token')) {
  //   if (to.name === 'login') {
  //     next({ name: 'home' })
  //     NProgress.done()
  //   } else {
  //     if (!store.state.user.isLogin) {
  //       store.dispatch('getUserInfo').then(resp => {
  //         next()
  //       }).catch(e => {
  //         Message.error('验证失败，请重新登录')
  //         next({ name: 'login' })
  //       })
  //     } else {
  //       next()
  //     }
  //   }
  // } else {
  //   if (to.meta.noLogin) {
  //     next()
  //   } else {
  //     next({ name: 'login' })
  //     NProgress.done()
  //   }
  // }
})

router.afterEach((route) => {
  NProgress.done() // 结束Progress
})
