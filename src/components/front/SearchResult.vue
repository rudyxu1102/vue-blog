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
        <spinner v-show="loadMore"></spinner>
        <p v-show="!loadMore" class="noMore">没有搜索到更多</p>
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
        ...mapState(['loadMore', 'moreArticle', 'isLoading']),
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
    padding: 30px 200px 30px;
    div#article {
        color: #fff;
        width: 100%;
        border-bottom: 2px solid #00ff7f;
        h2 {
            margin-top: 30px;
            margin-bottom: 20px;
        }
        time {
            margin-top: 10px;
        }
        p {
            white-space: pre-wrap;
            word-wrap: break-word;
            margin-top: 30px;
            margin-bottom: 30px;
        }
        button {
            width: 140px;
            height: 40px;
            line-height: 40px;
            background: deepskyblue;
            margin-bottom: 20px;
            border-radius: 4px;
            margin-left: calc(100% - 140px);
        }
        .articleTag {
            margin-left: 20px;
            margin-bottom: 30px;
        }
        .commentNumber {
            margin-left: 10px;
            color: #ffffff;
            i {
                font-size: 18px;
                margin-right: 5px;
            }
        }
        i.icon-label, i.icon-shijian {
            color: #ffffff;
            font-size: 20px;
            margin-right: 5px;
        }
    }
    p.noMore {
        width: 100%;
        color: #ffffff;
        margin-top: 20px;
        text-align: center;
    }
}
</style>
