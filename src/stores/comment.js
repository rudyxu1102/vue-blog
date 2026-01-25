import { defineStore } from 'pinia'
import * as commentApi from '@/api/comment'

export const useCommentStore = defineStore('comment', {
  state: () => ({
    comments: []
  }),

  actions: {
    // 设置评论列表
    setComments(comments) {
      this.comments = comments
    },

    // 提交评论
    async submitComment(payload) {
      try {
        return await commentApi.submitComment(payload)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 获取所有评论
    async getAllComments(payload) {
      try {
        const comments = await commentApi.getAllComments(payload)
        this.setComments(comments)
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 更新点赞
    async updateLike(payload) {
      try {
        await commentApi.updateLike(payload)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
})
