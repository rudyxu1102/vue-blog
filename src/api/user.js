import request from '@/utils/request'

// 用户登录
export const login = (payload) => {
  return request.post('/api/login', payload).then(res => res.data)
}

// 重置用户信息
export const resetUser = (payload) => {
  return request.post('/api/user', payload).then(res => res.data)
}
