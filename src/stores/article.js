import { defineStore } from 'pinia'
import { useUiStore } from './ui'
import * as articleApi from '@/api/article'
import marked from 'marked'

// 辅助函数
const beginLoading = (uiStore, add) => {
  add ? uiStore.toggleLoadMore(true) : uiStore.toggleLoading(true)
  return Date.now()
}

const endLoading = (uiStore, startTime, toggle) => {
  const leftTime = 500 - (Date.now() - startTime)
  setTimeout(() => {
    toggle === 'loadMore' ? uiStore.toggleLoadMore(false) : uiStore.toggleLoading(false)
  }, leftTime > 0 ? leftTime : 0)
}

// marked renderer 配置
const unescapeHTML = (a) => {
  a = '' + a
  return a.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, '"')
}

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
  return '<a href="#' + text + '" class="hashTitle" data-scroll><h' + level +
    ' id="' + text + '">' + text + '</h' + level + '></a>'
}

export const useArticleStore = defineStore('article', {
  state: () => ({
    article: {},
    articles: []
  }),

  getters: {
    // 处理文章摘要
    reducedArticles: (state) => {
      const articles = state.articles.map(article => {
        let newArticle = {}
        for (let i in article) { newArticle[i] = article[i] }
        newArticle.content = marked(article.content || '').replace(/<[^>]*>/g, '').slice(0, 200) + '......'
        return newArticle
      })
      return articles
    },

    // 生成文章目录
    articleList: (state) => {
      const strHtml = unescapeHTML(marked(state.article.content || '', { renderer: renderer }))
      if (strHtml) {
        const Re = /<h(\d) id="(.*?)">/g
        let arr = Re.exec(strHtml)
        let list = []
        let index = 0
        if (!arr) return []

        const sizeTop = arr[1]
        list.push({
          level: 1,
          size: sizeTop,
          content: arr[2]
        })
        while ((arr = Re.exec(strHtml)) !== null) {
          var level
          if (arr[1] > list[index].size) {
            level = list[index].level + 1
          } else if (arr[1] === list[index].size) {
            level = list[index].level
          } else if (arr[1] < list[index].size) {
            let i = index
            while (i--) {
              if (arr[1] === list[i].size) {
                level = list[i].level
                break
              }
            }
          }
          list.push({
            level: level,
            size: arr[1],
            content: arr[2]
          })
          index = index + 1
        }
        return list
      }
      return []
    }
  },

  actions: {
    // 更新文章标题
    updatePostTitle(title) {
      this.article.title = title
    },

    // 更新文章内容
    updatePostContent(content) {
      this.article.content = content
    },

    // 设置当前文章
    setArticle(article) {
      this.article = article
    },

    // 设置所有文章
    setAllArticles(articles) {
      this.articles = articles
    },

    // 添加文章
    addArticles(articles) {
      this.articles = this.articles.concat(articles)
    },

    // 保存文章
    async saveArticle(aid) {
      const uiStore = useUiStore()
      try {
        uiStore.toggleSaving(false)
        if (aid) {
          await articleApi.updateArticle(aid, this.article)
        } else {
          await articleApi.saveArticle(this.article)
        }
        uiStore.toggleSaving(true)
        return true
      } catch (err) {
        alert('保存失败')
        console.log(err)
        throw err
      }
    },

    // 获取所有文章
    async getAllArticles(payload) {
      const uiStore = useUiStore()
      uiStore.toggleMoreArticle(true)
      const startTime = beginLoading(uiStore, payload.add)

      if (payload.value) {
        uiStore.toggleLoading(false)
      }

      try {
        const articles = await articleApi.getAllArticles(payload)

        if (articles.length === 0) {
          uiStore.toggleMoreArticle(false)
          uiStore.toggleNoMore(true)
        } else {
          uiStore.toggleNoMore(false)
        }

        if (payload.add) {
          this.addArticles(articles)
          endLoading(uiStore, startTime, 'loadMore')
        } else {
          this.setAllArticles(articles)
          endLoading(uiStore, startTime, 'loading')
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 获取单篇文章
    async getArticle(aid) {
      const uiStore = useUiStore()
      const startTime = beginLoading(uiStore, false)

      document.title = '加载中...'

      try {
        const article = await articleApi.getArticleById(aid)
        this.setArticle(article)
        uiStore.setHeadline({ content: this.article.title, animation: 'animated rotateIn' })
        document.title = this.article.title
        endLoading(uiStore, startTime, 'loading')
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 删除文章
    async delArticle(payload) {
      try {
        await articleApi.deleteArticle(payload.aid)

        if (payload.route.name === 'posts') {
          await this.getAllArticles({ page: payload.page, limit: 8 })
        }
        if (payload.route.name === 'search') {
          // 删除后跳转由组件处理
        }
      } catch (err) {
        console.log(err)
        throw err
      }
    },

    // 搜索文章
    async searchArticles(payload) {
      const uiStore = useUiStore()
      document.title = '搜索中...'
      uiStore.toggleMoreArticle(true)
      const startTime = beginLoading(uiStore, payload.add)

      try {
        const articles = await articleApi.searchArticles(payload)

        if (articles.length === 0) {
          uiStore.toggleMoreArticle(false)
          uiStore.toggleNoMore(true)
        } else {
          uiStore.toggleNoMore(false)
        }

        if (payload.add) {
          this.addArticles(articles)
          endLoading(uiStore, startTime, 'loadMore')
        } else {
          this.setAllArticles(articles)
          endLoading(uiStore, startTime, 'loading')
        }

        document.title = '搜索成功'
      } catch (err) {
        console.log(err)
        throw err
      }
    }
  }
})
