<template>
    <div class="wrapper" id="article" v-scroll-show>
        <div id="content"  v-scroll-show>
            <h1 class="title animated fadeIn">{{article.title}}</h1>
            <div class="appendInfo animated fadeIn">
                <time>
                    <i class="iconfont icon-shijian"></i>{{article.date | toDate}}
                </time>
                <span>
                    <i class="iconfont icon-label"></i>{{article.tags | toTag}}
                </span>
                <a class="commentCount" href="#comment" data-scroll>
                    <i class="iconfont icon-huifu"></i>{{article.comment_n}}
                </a>
            </div>
            <article-list class="list animated fadeIn"></article-list>
            <div class="content animated fadeIn" v-html="mdHtml"></div>
            <div class="indexes animated fadeIn">
                <div class="last animated fadeIn">
                    <router-link :to="{name: 'article', params: {id: articles[prePage].aid, index: prePage, page: $route.params.page}, hash: '#article'}"  v-if="articles[prePage]" tag="p" class="left">
                        <i class="iconfont icon-left"></i>{{articles[prePage].title}}</router-link>
                    <router-link :to="{name: 'article', params: {id: articles[nextPage].aid, index: nextPage, page: $route.params.page}, hash: '#article'}" v-if="articles[nextPage]" tag="p" class="right">
                        {{articles[nextPage].title}}<i class="iconfont icon-right"></i></router-link>
                </div>
            </div>
            <article-comment class="comment animated fadeIn"></article-comment>
        </div>
        <router-link :to="{name: 'articles'}" class="iconfont icon-fanhui" tag="i"></router-link>
    </div>
</template>

<script>
import marked                                       from 'marked'
import hljs                                         from 'highlight.js'
import {mapState, mapActions}                       from 'vuex'
import ArticleComment                               from './component/ArticleComment'
import ArticleList                                  from './component/ArticleList'

marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value
    },
    sanitize: true
})

const renderer = new marked.Renderer()
renderer.heading = function (text, level) {
    return '<a href="#' + text + '" class="hashTitle" data-scroll><h' + level +
            ' id="' + text + '">' + text + '</h' + level + '></a>'
}

export default {
    data () {
        return {
            prePage: 0,
            nextPage: 0,
            count: 0
        }
    },
    created () {
        this.getArticle(this.$route.params.id)
        this.initPage()
    },
    beforeRouteUpdate (to, from, next) {        // 从foo/1跳到foo/2组件会复用，不会再执行created钩子函数，可以在这里执行
        this.getArticle(to.params.id)
        if (to.params.index === 0) {
            this.prePage = -1
            this.nextPage = 1
        } else if (to.params.index === this.articles.length - 1) {
            this.prePage = to.params.index - 1
            this.getAllArticles({value: this.curTag, add: true, page: ++to.params.page})
            this.nextPage = to.params.index + 1
        } else if (to.hash && to.hash !== '#article') {   // 目录锚点跳转
            to.params.page = from.params.page
            to.params.index = from.params.index
            this.prePage = to.params.index - 1
            this.nextPage = parseInt(to.params.index) + 1
        } else {
            this.prePage = to.params.index - 1
            this.nextPage = parseInt(to.params.index) + 1
        }
        next()
    },
    computed: {
        ...mapState(['articles', 'curTag', 'article']),
        mdHtml () {
            return marked(this.article.content || '', { renderer: renderer })
        }
    },
    methods: {
        ...mapActions(['getArticle', 'getAllArticles']),
        mark: marked,
        initPage () {
            const index = this.$route.params.index - 0
            let page = this.$route.params.page - 0 || 1
            if (index === 0) {
                this.prePage = -1
                this.nextPage = 1
            } else if (index === this.articles.length - 1) {        // 加载更多文章
                this.prePage = index - 1
                this.getAllArticles({value: this.curTag, add: true, page: ++page})
                this.nextPage = index + 1
            } else {
                this.prePage = index - 1
                this.nextPage = index + 1
            }
        }
    },
    components: {
        ArticleComment,
        ArticleList
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    padding: 30px 250px 30px;
    color: #ffffff;
    text-align: right;
    position: relative;
    #content {
        min-height: 600px;
        .title, .appendInfo, .content, .indexes, .comment, .list {
            display: none;
        }
        h1 {
            text-align: center;
            margin-bottom: 20px;
        }
        .content {
            min-height: 500px;
            margin-top: 10px;
            text-align: left;
            font-size: 16px;
            white-space: pre-wrap;
            word-wrap: break-word;
        }
        .appendInfo {
            span {
                color: #fff;
                margin-left: 10px;
            }
            a.commentCount {
                color: #ffffff;
                cursor: pointer;
                margin-left: 10px;
                &:hover {
                     color: darkturquoise;
                 }
            }
            i {
                margin-right: 5px;
            }
            i.icon-shijian, i.icon-label {
                font-size: 20px;
            }
        }
        .indexes {
            margin-top: 50px;
            .last {
                color: #fff;
                font-size: 20px;
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                margin-top: 20px;
                i {
                    font-size: 18px;
                    color: #00ff7f;
                }
                i.icon-left {
                    margin-right: 10px;
                }
                i.icon-right {
                    margin-left: 10px;
                }
                p {
                    cursor: pointer;
                    color: #00ff7f;
                    display: inline-block;
                    padding: 0 10px;
                    transition: 1s;
                    &:hover {
                         color: darkturquoise;
                     }
                }
                p.left:hover {
                    transition:  1s;
                    padding-left: 0;
                }
                p.right:hover {
                    transition: 1s;
                    padding-right: 0;
                }
            }
        }
    }
    i.icon-fanhui {
        color: #C0CCDA;
        font-size: 30px;
        position: absolute;
        bottom: 20px;
        left: 20px;
        cursor: pointer;
        &:hover {
            color: darkturquoise;
         }
    }
}
</style>
