import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'
import mutations from './mutations.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: {},
        headline: {},
        isLoading: false,
        moreArticle: true,
        loadMore: false,
        isSaving: false,
        noMore: false,
        tags: [],
        curTag: '',
        article: {},
        articles: [],
        draft: {},
        drafts: {},
        comments: []
    },
    getters,
    actions,
    mutations
})
export default store
