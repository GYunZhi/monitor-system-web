// import { Message } from 'element-ui'
import {
  getItem,
  setItem,
  removeItem
} from '@/utils/auth'
import router from '@/router'
import http from '@/http'

let tokenStr = getItem('smart-admin-token')

const state = {
  token: tokenStr,
  userInfo: null,
  isLogin: false,
  permissions: [],
  platformAccount: []
}

const mutations = {
  SET_TOKEN (state, token) {
    state.token = token
  },
  SET_USERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  SET_ISLOGIN (state, isLogin) {
    state.isLogin = isLogin
  },
  // 权限列表
  SET_PERMISSIONS (state, permissions) {
    state.permissions = permissions
  },
  // 平台用户列表platformAccount
  SET_PLATFORM_ACCOUNT (state, platformAccount) {
    state.platformAccount = platformAccount
  }
}

const actions = {
  // 登录拿到 token，并把 token 存到 localStorage 中
  login ({ commit }, userInfo) {
    // return http.post('/oauth/token', userInfo).then(resp => {
    //   let curTime = new Date().getTime()
    //   let expireTime = curTime + resp.data.expires_in * 1000
    //   resp.data.expireTime = expireTime
    //   let token = resp.data
    //   setItem('smart-admin-token', token)
    //   commit('SET_TOKEN', token)
    //   return 'success'
    // }).catch(e => {
    //   console.log(e)
    //   if (!e.response.data.access_token) {
    //     Message.warning('账号密码错误')
    //   }
    //   return 'failed'
    // })
    return new Promise((resolve, reject) => {
      resolve('success')
    })
  },
  setUserToken ({ commit }, token) {
    setItem('smart-admin-token', token)
    commit('SET_TOKEN', token)
  },
  // 获取当前用户信息
  getUserInfo ({ commit }, shouldIntercept = true) {
    return http.get('/api/account', {
      headers: {
        'shouldIntercept': shouldIntercept
      }
    }).then(resp => {
      commit('SET_USERINFO', resp.data)
      commit('SET_ISLOGIN', true)
    }).catch(e => {
      removeItem('smart-admin-token')
      console.log(e)
    })
  },
  // 退出登录
  logout ({ commit, state }) {
    // return http.get('/exit').then(resp => {
    //   commit('SET_TOKEN', {})
    //   commit('SET_USERINFO', null)
    //   removeItem('cur-douyin')
    //   removeItem('smart-admin-token')
    //   commit('SET_ISLOGIN', false)
    //   router.push({ path: '/login' })
    // }).catch(e => {
    //   Message.warning(e.response.data.message)
    // })
    router.push({ path: '/login' })
  },
  // 权限列表
  fetchPermissions ({ commit, state }) {
    return http.get('/api/permission/list').then((resp) => {
      commit('SET_PERMISSIONS', resp.data)
      return resp.data
    })
  },
  // 平台用户
  fetchPlatformAccount ({ commit, state }) {
    return http.get('/api/account/platform/list').then((resp) => {
      commit('SET_PLATFORM_ACCOUNT', resp.data)
    })
  }
}

export default {
  state,
  actions,
  mutations
}
