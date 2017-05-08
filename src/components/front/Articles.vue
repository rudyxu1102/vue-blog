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
            <p v-show="!loadMore" class="noMore animated fadeIn">没有更多了</p>
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
        this.getAllArticles({value: '全部', page: 1})
        this.getAllTags()
    },
    computed: {
        ...mapGetters(['reducedArticles', 'allTags']),
        ...mapState(['curTag', 'loadMore', 'moreArticle', 'isLoading'])
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
        padding: 30px 200px 30px;
        .tags {
            .tagFlex {
                display: flex;
                flex-wrap: wrap;
                justify-content: flex-start;
                .activeBtn {
                    background: #ffc520;
                    transition:  1s;
                }
                button {
                    background: rgb(129, 216, 208);
                    color: #ffffff;
                    width: 100px;
                    margin: 0 20px 20px 0;
                }
            }
        }
        div#article {
            color: #fff;
            width: 100%;
            border-bottom: 2px solid rgb(129, 216, 208);
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
                margin-left: 10px;
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
            margin-top: 30px;
            text-align: center;
        }
    }
    .spinner {
        margin-top: 0;
        margin-bottom: 40px;
    }
}
</style>
