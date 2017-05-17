<template>
    <div class="articleContent">
        <div id="articles">
            <div class="tags animated fadeIn">
                <div class="tagFlex">
                    <button
                            v-for="(tag, index) in allTags"
                            v-bind:class="{activeBtn: selectIndex === index}"
                            v-on:click="switchTag({value: tag, page: 1}, index, tag)"
                            >
                        <span>{{tag}}</span>
                    </button>
                </div>
            </div>
            <div v-for="(article, index) in reducedArticles" id="article" class="animated fadeIn">
                <h2>{{article.title}}</h2>
                <time><i class="iconfont icon-shijian"></i>{{article.date | toDate}}</time>
                <span class="articleTag"><i class="iconfont icon-label"></i>{{article.tags | toTag}}</span>
                <span class="commentNumber"><i class="iconfont icon-huifu"></i>{{article.comment_n}}</span>
                <p>{{article.content}}</p>
                <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: page}, hash: '#article'}" tag="button" exact>
                    <span>Continue reading</span>
                </router-link>
            </div>
            <p v-if="!loadMore" v-show="!noMore" class="noMore animated fadeIn">下拉加载更多</p>
            <p v-if="noMore" class="noMore animated fadeIn">已经到底了，别扯了</p>
        </div>
        <spinner v-show="loadMore" class="spinner"></spinner>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters, mapState}     from 'vuex'
import spinner                                              from '../share/spinner'

export default {
    data () {
        return {
            selectIndex: 0,
            page: 1
        }
    },
    created () {
        this.set_headline({
            content: '文章见解',
            animation: 'animated flipInY'
        })
        this.getAllArticles({page: 1})
        this.getAllTags()
    },
    computed: {
        ...mapGetters(['reducedArticles', 'allTags']),
        ...mapState(['curTag', 'loadMore', 'moreArticle', 'isLoading', 'noMore'])
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    beforeRouteLeave (to, from, next) {
        window.removeEventListener('scroll', this.handleScroll)
        next()
    },
    methods: {
        ...mapMutations(['set_headline', 'set_curtag', 'moreArticle_toggle']),
        ...mapActions(['getAllArticles', 'getAllTags', 'searchArticles']),
        switchTag (payload, index, tag) {
            this.getAllArticles(payload)
            this.selectIndex = index
            this.set_curtag(tag)
        },
        handleScroll () {
            if (!this.isLoading && this.$route.name === 'articles') {
                const body = document.body
                const totalHeight = body.scrollHeight
                const scrollTop = body.scrollTop
                const clientHeight = window.innerHeight
                if (totalHeight - scrollTop - clientHeight === 0 && this.moreArticle) {
                    this.getAllArticles({value: this.curTag, add: true, page: ++this.page})
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
.articleContent {
    #articles {
        padding: 1.875rem 12.5rem 0;
        .tags {
            .tagFlex {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                .activeBtn {
                    background: #ffc520;
                    color: #ffffff;
                    transition:  1s;
                }
                button {
                    transition:  1s;
                    padding-left: 1rem;
                    padding-right: 0.2rem;
                    text-align: center;
                    background: rgb(129, 216, 208);
                    color: #00193a;
                    margin: 0 1.25rem 1.25rem 0;
                }
            }
        }
        div#article {
            color: #fff;
            width: 100%;
            border-bottom: 0.125rem solid rgb(129, 216, 208);
            h2 {
                color: rgb(129, 216, 208);
                margin-top: 1.875rem;
                margin-bottom: 1.25rem;
            }
            time {
                margin-top: 0.625rem;
                margin-right: 0.625rem;
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
                margin-bottom: 1.25rem;
                border-radius: 0.25rem;
                margin-left: calc(100% - 8.75rem);
            }
            .articleTag {
                margin-bottom: 1.875rem;
                margin-right: 0.625rem;
            }
            .commentNumber {
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
            height: 1.5rem;
            line-height: 1.5rem;
            color: #ffffff;
            margin-top: 1.875rem;
            margin-bottom: 1.875rem;
            text-align: center;
        }
    }
}
@media screen and (max-width: 440px) {
    #articles {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
    }
}
</style>
