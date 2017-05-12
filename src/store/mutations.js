export default {
    // login
    set_user: (state, user) => {
        localStorage.setItem('token', user.token)
        localStorage.setItem('userName', user.name)
        state.user = user
    },
    unset_user: (state) => {
        localStorage.removeItem('token')
        localStorage.removeItem('userName')
        state.user = {}
    },
    // 设置页面标题
    set_headline: (state, headline) => {
        state.headline = headline
    },
    isSaving_toggle: (state, isSaving) => {
        state.isSaving = isSaving
    },
    isLoading_toggle: (state, isLoading) => {
        state.isLoading = isLoading
    },
    loadMore_toggle: (state, loadMore) => {
        state.loadMore = loadMore
    },
    moreArticle_toggle: (state, flag) => {
        state.moreArticle = flag
    },
    noMore_toggle: (state, flag) => {
        state.noMore = flag
    },
    // tags
    set_tags: (state, tags) => {
        state.tags = tags
    },
    set_curtag: (state, tag) => {
        state.curTag = tag
    },
    // article
    update_post_title: (state, title) => {
        state.article.title = title
    },
    update_post_content: (state, content) => {
        state.article.content = content
    },
    set_article: (state, article) => {
        state.article = article
    },
    set_all_articles: (state, articles) => {
        state.articles = articles
    },
    add_articles: (state, articles) => {
        state.articles = state.articles.concat(articles)
    },
    // comment
    set_comments: (state, comments) => {
        state.comments = comments
    },
    // 对话框
    set_dialog: (state, payload) => {
        state.dialog = payload
        state.dialog.resolveFn = () => {}
        state.dialog.rejectFn = () => {}
    }
}
