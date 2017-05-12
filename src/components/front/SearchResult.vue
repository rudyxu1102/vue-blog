<template>
    <div id="search">
        <div v-for="(article, index) in reducedArticles" id="article">
            <h2>{{article.title}}</h2>
            <time><i class="iconfont icon-shijian"></i>{{article.date | toDate}}</time>
            <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tags | toTag}}</span>
            <span class="commentNumber"><i class="iconfont icon-huifu"></i>{{article.comment_n}}</span>
            <p>{{article.content}}</p>
            <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" tag="button" exact>
                <span>Continue reading</span>
            </router-link>
        </div>
        <spinner v-show="loadMore" class="loading"></spinner>
        <p v-if="!loadMore" v-show="!noMore" class="noMore animated fadeIn">下拉加载更多</p>
        <p v-if="noMore" class="noMore animated fadeIn">没啦没啦，别扯了</p>
    </div>
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters}     from 'vuex'
import spinner                                              from '../share/spinner'

export default {
    data () {
        return {
            page: 1
        }
    },
    created () {
        this.searchArticles({key: 'title', value: this.$route.params.text})
        this.set_headline({
            content: '搜索结果',
            animation: 'animated rotateIn'
        })
    },
    beforeRouteUpdate (to, from, next) {
        if (to.params.text) {
            this.searchArticles({key: 'title', value: to.params.text})
        }
        next()
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener('scroll', this.handleScroll)
        next()
    },
    computed: {
        ...mapState(['loadMore', 'moreArticle', 'isLoading', 'noMore']),
        ...mapGetters(['reducedArticles'])
    },
    methods: {
        ...mapActions(['searchArticles']),
        ...mapMutations(['set_headline']),
        handleScroll () {
            if (!this.isLoading && this.$route.name === 'SearchResult') {
                const body = document.body
                const totalHeight = body.scrollHeight
                const scrollTop = body.scrollTop
                const clientHeight = window.innerHeight
                if (totalHeight - scrollTop - clientHeight === 0 && this.moreArticle) {
                    this.searchArticles({key: 'title', value: this.$route.params.text, add: true, page: ++this.page})
                }
                if (!this.moreArticle) {
                    this.page = 1
                }
            }
        }
    },
    components: {
        spinner
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#search {
    padding: 0 12.5rem 0;
    div#article {
        color: #fff;
        width: 100%;
        border-bottom: 0.125rem solid rgb(129, 216, 208);
        h2 {
            margin-top: 1.875rem;
            margin-bottom: 1.25rem;
        }
        time {
            margin-top: 0.625rem;
        }
        p {
            white-space: pre-wrap;
            word-wrap: break-word;
            margin-top: 1.875rem;
            margin-bottom: 1.875rem;
        }
        button {
            width: 8.75rem;
            height: 2.5rem;
            line-height: 2.5rem;
            background: rgb(129, 216, 208);
            margin-bottom: 1.25rem;
            border-radius: 0.25rem;
            margin-left: calc(100% - 8.75rem);
        }
        .articleTag {
            margin-left: 1.25rem;
            margin-bottom: 1.875rem;
        }
        .commentNumber {
            margin-left: 0.625rem;
            color: #ffffff;
            i {
                font-size: 1.125rem;
                margin-right: 0.3125rem;
            }
        }
        i.icon-label, i.icon-shijian {
            color: #ffffff;
            font-size: 1.25rem;
            margin-right: 0.3125rem;
        }
    }
    p.noMore {
        width: 100%;
        color: #ffffff;
        margin-top: 1.875rem;
        margin-bottom: 1.875rem;
        text-align: center;
    }
}
@media screen and (max-width: 440px) {
    #search {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }
}
</style>
