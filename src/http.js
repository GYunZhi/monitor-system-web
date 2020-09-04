/* eslint-disable */
import axios from 'axios'
import { getItem, removeItem } from '@/utils/auth'
import router from '@/router'

// 使用自定义配置 创建一个 axios 实例
const instance = axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'If-Modified-Since': 'Thu, 01 Jun 1970 00:00:00 GMT', // 避免 IE10 返回 304
    'shouldIntercept': true // 若为 false,则不拦截在自己的请求里处理
  }
})

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  const token = getItem('smart-admin-token')
  if (!config.headers.Authorization && token) {
    config.headers.Authorization = 'Bearer' + token.access_token
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  if (response.request.responseType === 'blob') {
    return response
  } else {
    return response && response.data && response.data.data
  }
}, error => {
  if (error.response && error.response.status === 401) {
    removeItem('smart-admin-token')
    router.push({ name: 'login' })
  }

  if (error.response && error.response.data && error.response.data.msg) {
    return Promise.reject(error.response.data)
  } else {
    return Promise.reject({ msg: '服务器开小差了，请稍后再试哦~' })
  }
})

export default instance
