import { defineStore } from 'pinia'
import { useArticleStore } from './article'
import { useUiStore } from './ui'
import * as draftApi from '@/api/draft'

export const useDraftStore = defineStore('draft', {
  state: () => ({
    draft: {},
    drafts: {}
  }),

  actions: {
    // 保存草稿
    async saveDraft(aid) {
      const articleStore = useArticleStore()
      const uiStore = useUiStore()

      try {
        if (aid) {
          await draftApi.updateDraft(aid, articleStore.article)
        } else {
          await draftApi.saveDraft(articleStore.article)
        }
        uiStore.toggleSaving(true)
        return true
      } catch (err) {
        alert('保存失败')
        console.log(err)
        throw err
      }
    },

    // 获取所有草稿
    async getAllDrafts(payload) {
      const articleStore = useArticleStore()
      try {
        const articles = await draftApi.getAllDrafts(payload)
        articleStore.setAllArticles(articles)
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
})
