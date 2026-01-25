import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    headline: {},
    isLoading: false,
    loadMore: false,
    isSaving: false,
    moreArticle: true,
    noMore: false,
    dialog: {
      show: false,
      hasTwoBtn: false,
      info: 'hey',
      resolveFn: () => {},
      rejectFn: () => {}
    }
  }),

  actions: {
    // 设置页面标题
    setHeadline(headline) {
      this.headline = headline
    },

    // 切换保存状态
    toggleSaving(isSaving) {
      this.isSaving = isSaving
    },

    // 切换加载状态
    toggleLoading(isLoading) {
      this.isLoading = isLoading
    },

    // 切换加载更多状态
    toggleLoadMore(loadMore) {
      this.loadMore = loadMore
    },

    // 切换更多文章状态
    toggleMoreArticle(flag) {
      this.moreArticle = flag
    },

    // 切换无更多状态
    toggleNoMore(flag) {
      this.noMore = flag
    },

    // 设置对话框
    setDialog(payload) {
      this.dialog = payload
      this.dialog.resolveFn = payload.resolveFn || (() => {})
      this.dialog.rejectFn = payload.rejectFn || (() => {})
    }
  }
})
