import Vue      from 'vue'
import router   from '../router'

const beginLoading = (commit, add) => {
    add ? commit('loadMore_toggle', true) : commit('isLoading_toggle', true)
    return Date.now()
}

const endLoading = (commit, startTime, toggle) => {
    const leftTime = 500 - (Date.now() - startTime)
    leftTime > 0 ? setTimeout(commit(toggle, false), leftTime) : commit(toggle, false)
}

export default {
    login ({commit}, payload) {
        return Vue.http.post('/api/login', payload).catch((err) => { console.log(err) })
    },
    resetUser ({commit}, payload) {
        return Vue.http.post('/api/user', payload)
            .then(() => {
                commit('unset_user')
                router.go({name: 'login'})
            }).catch((err) => { console.log(err) })
    },
    //  article的http请求
    saveArticle ({state, commit}, aid) {
        commit('isSaving_toggle', false)
        if (aid) {
            return Vue.http.patch('/api/article/' + aid, state.article)
                .then(() => {
                    commit('isSaving_toggle', true)
                    router.push({name: 'posts'})
                }, () => { alert('保存失败') }).catch((err) => { console.log(err) })
        } else {
            return Vue.http.post('/api/article', state.article)
                .then(() => {
                    commit('isSaving_toggle', true)
                    router.push({name: 'posts'})
                }, () => { alert('保存失败') }).catch((err) => { console.log(err) })
        }
    },
    getAllArticles ({commit}, payload) {
        commit('moreArticle_toggle', true)
        const startTime = beginLoading(commit, payload.add)
        if (payload.value) {
            commit('isLoading_toggle', false)
        }
        return Vue.http.get('/api/articles', {params: {payload}})
            .then(response => response.json())
            .then(articles => {
                if (articles.length === 0) {
                    commit('moreArticle_toggle', false)
                    commit('noMore_toggle', true)
                } else {
                    commit('noMore_toggle', false)
                }
                if (payload.add) {
                    commit('add_articles', articles)
                    endLoading(commit, startTime, 'loadMore_toggle')
                } else {
                    commit('set_all_articles', articles)
                    endLoading(commit, startTime, 'isLoading_toggle')
                }
            }).catch((err) => { console.log(err) })
    },
    getArticle ({commit, state}, aid) {
        const startTime = beginLoading(commit, false)
        if (router.currentRoute.hash) {
            commit('isLoading_toggle', false)
        }
        document.title = '加载中...'
        return Vue.http.get('/api/article/' + aid)
            .then(response => {
                commit('set_article', response.data)
                commit('set_headline', {content: state.article.title, animation: 'animated rotateIn'})
                document.title = state.article.title
                endLoading(commit, startTime, 'isLoading_toggle')
            }).catch((err) => { console.log(err) })
    },
    delArticle ({dispatch}, payload) {
        return Vue.http.delete('/api/article/' + payload.aid)
            .then(() => {
                if (payload.route.name === 'posts') dispatch('getAllArticles', {page: payload.page, limit: 8})
                if (payload.route.name === 'drafts') dispatch('getAllDrafts', {page: payload.page, limit: 8})
                if (payload.route.name === 'search') router.push({name: 'posts'})
            }).catch((err) => { console.log(err) })
    },
    // draft的http请求
    saveDraft ({state, commit}, aid) {
    // 可能要改saveArticle
        if (aid) {
            return Vue.http.patch('/api/draft/' + aid, state.article)
                .then(() => {
                    commit('isSaving_toggle', true)
                    router.push({name: 'drafts'})
                }, () => { alert('保存失败') }).catch((err) => { console.log(err) })
        } else {
            return Vue.http.post('/api/draft', state.article)
                .then(() => {
                    commit('isSaving_toggle', true)
                    router.push({name: 'drafts'})
                }, () => { alert('保存失败') }).catch((err) => { console.log(err) })
        }
    },
    getAllDrafts ({commit}, payload) {
        return Vue.http.get('/api/drafts', {params: {payload}})
            .then(response => response.json())
            .then(articles => {
                commit('set_all_articles', articles)
            }).catch((err) => { console.log(err) })
    },
    // search
    searchArticles ({commit}, payload) {
        document.title = '搜索中...'
        commit('moreArticle_toggle', true)
        const startTime = beginLoading(commit, payload.add)
        return Vue.http.get('/api/someArticles', {params: {payload}})
            .then(response => response.json())
            .then(articles => {
                if (articles.length === 0) {
                    commit('moreArticle_toggle', false)
                    commit('noMore_toggle', true)
                } else {
                    commit('noMore_toggle', false)
                }
                if (payload.add) {
                    commit('add_articles', articles)
                    endLoading(commit, startTime, 'loadMore_toggle')
                } else {
                    commit('set_all_articles', articles)
                    endLoading(commit, startTime, 'isLoading_toggle')
                }
                document.title = '搜索成功'
            }).catch((err) => { console.log(err) })
    },
    // tags
    getAllTags ({commit}) {
        return Vue.http.get('/api/tags')
            .then(response => {
                commit('set_tags', response.data)
            }).catch((err) => { console.log(err) })
    },
    // email
    sendMail ({commit}, payload) {
        return Vue.http.post('/api/mail', payload).catch((err) => { console.log(err) })
    },
    // comment
    summitComment ({commit}, payload) {
        return Vue.http.post('/api/comment', payload)
    },
    getAllComments ({commit}, payload) {
        return Vue.http.get('/api/comments', {params: {payload}})
                .then(response => response.json())
                .then(comments => {
                    commit('set_comments', comments)
                }).catch((err) => { console.log(err) })
    },
    updateLike ({commit}, payload) {
        return Vue.http.patch('/api/comments/' + payload.id, {option: payload.option})
                .catch((err) => { console.log(err) })
    }
}
