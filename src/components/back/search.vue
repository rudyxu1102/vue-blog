<template>
    <div class="container">
        <div class="search">
            <input
                    type="text" v-model="text"
                    :placeholder="tip" onfocus="this.placeholder=''"
                    @keydown.enter="searchArticles({key: picked, value: text, page: page})"
            />
            <i class="iconfont icon-search" @click="searchArticles({key: picked, value: text, page: page})"></i>
        </div>
        <div class="searchString">
            搜索匹配：
            <label for="title"><input type="radio" value="title" id="title" v-model="picked"/>标题</label>
            <label for="tags"><input type="radio" value="tags" id="tags" v-model="picked"/>标签</label>
            <label for="date"><input type="radio" value="date" id="date" v-model="picked"/>日期</label>
        </div>
        <p>搜索结果</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage"></article-content>
    </div>
</template>

<script>
import ArticleContent                   from './component/ArticleContent'
import {mapActions, mapMutations}       from 'vuex'
export default {
    data () {
        return {
            picked: 'title',
            text: '',
            page: 1
        }
    },
    created () {
        this.set_all_articles({})
    },
    computed: {
        tip () {
            if (this.picked === 'title') return '请输入标题的部分内容'
            if (this.picked === 'tags') return '请输入完整的标签，多个标签空格隔开'
            if (this.picked === 'date') return '检索格式： 2017-04-01'
        }
    },
    methods: {
        ...mapActions(['searchArticles']),
        ...mapMutations(['set_all_articles']),
        nextPage () {
            this.page++
            this.searchArticles({key: this.picked, value: this.text, page: this.page})
        },
        prePage () {
            if (!(this.page - 1)) {
                alert('已经到第一页咯')
            } else {
                this.page--
                this.searchArticles({key: this.picked, value: this.text, page: this.page})
            }
        }
    },
    components: {
        ArticleContent
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
    text-align: center;
    padding-bottom: 2rem;
    .search {
        margin-right: -2.8125rem;
        input {
            width: 28.125rem;
            margin: 1.25rem auto 0.625rem;
            height: 2.8125rem;
            font-size: 1.25rem;
            border: 0.125rem solid rgb(129, 216, 208);
            border-radius: 1.875rem;
            outline: none;
            text-align: center;
            color: #ffffff;
            background: transparent;
        }
        i {
            position: relative;
            left: -3.4375rem;
            top: 0.5625rem;
            color: rgb(169, 169, 169);
            font-size: 2.5rem;
            cursor: pointer;
            &:hover {
                 color: rgb(129, 216, 208);
             }
        }
    }
    .searchString {
        color: #fff;
        font-size: 1.25rem;
        margin-bottom: 4.375rem;
        input {
            outline: none;
            cursor: pointer;
            margin-right: 0.625rem;
        }
        label {
            margin-right: 1.25rem;
            cursor: pointer;
        }
    }
    p {
        border-bottom: 0.1875rem double rgb(129, 216, 208);
        width: 12.5rem;
        font-size: 1.875rem;
        margin:0 auto 2.5rem;
        padding-bottom: 0.625rem;
        color: #ffffff;
    }
}
@media screen and (max-width: 440px) {
    .search {
        input {
            width: 80% !important;
        }
    }
}
</style>
