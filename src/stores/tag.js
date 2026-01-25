import { defineStore } from 'pinia'
import * as tagApi from '@/api/tag'

export const useTagStore = defineStore('tag', {
  state: () => ({
    tags: [],
    curTag: ''
  }),

  getters: {
    // 所有标签（包含"全部"选项）
    allTags: (state) => {
      const tags = [...state.tags]
      if (tags[0] !== '全部') {
        tags.unshift('全部')
      }
      return tags
    }
  },

  actions: {
    // 设置标签列表
    setTags(tags) {
      this.tags = tags
    },

    // 设置当前标签
    setCurTag(tag) {
      this.curTag = tag
    },

    // 获取所有标签
    async getAllTags() {
      try {
        const tags = await tagApi.getAllTags()
        this.setTags(tags)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
})
