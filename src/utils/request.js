import axios from 'axios'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/',
  timeout: 10000
})

// 请求拦截器 - 添加 JWT token
request.interceptors.request.use(
  config => {
    const token = window.localStorage.getItem('token')
    if (token) {
      config.headers.authorization = 'Bearer ' + token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 处理 401 状态码
request.interceptors.response.use(
  response => {
    return response
  },
  error => {
    if (error.response && error.response.status === 401) {
      // 清除用户信息并跳转登录页
      // 注意: 这里需要在路由配置后才能使用 router.push
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')

      // 跳转到登录页
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default request
