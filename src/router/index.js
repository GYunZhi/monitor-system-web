import Vue from 'vue'
import Router from 'vue-router'
import productRoutes from './modules/product'
import appRoutes from './modules/app'
import demoRoutes from './modules/demo'

const layout = () => import('@/pages/layout')
const login = () => import('@/pages/login/index')

Vue.use(Router)

const redirect = {
  path: '*',
  redirect: '/'
}

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/productList',
    component: layout,
    meta: {
      title: '后台管理系统'
    },
    children: [
      ...productRoutes,
      ...appRoutes,
      ...demoRoutes
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: login,
    meta: {
      title: '登录',
      noLogin: true
    }
  },
  redirect
]

export default new Router({
  routes
})
