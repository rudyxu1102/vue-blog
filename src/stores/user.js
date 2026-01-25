import { defineStore } from 'pinia'
import * as userApi from '@/api/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {}
  }),

  actions: {
    // 设置用户信息
    setUser(user) {
      localStorage.setItem('token', user.token)
      localStorage.setItem('userName', user.name)
      this.user = user
    },

    // 清除用户信息
    unsetUser() {
      localStorage.removeItem('token')
      localStorage.removeItem('userName')
      this.user = {}
    },

    // 登录
    async login(payload) {
      try {
        return await userApi.login(payload)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 重置用户信息
    async resetUser(payload) {
      try {
        await userApi.resetUser(payload)
        this.unsetUser()
        return true
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
})
