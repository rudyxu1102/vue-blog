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
    .search {
        margin-right: -45px;
        input {
            width: 450px;
            margin: 20px auto 10px;
            height: 45px;
            font-size: 20px;
            border: 2px solid #ffc520;
            border-radius: 30px;
            outline: none;
            text-align: center;
            color: #ffffff;
            background: transparent;
        }
        i {
            position: relative;
            left: -55px;
            top: 9px;
            color: rgb(169, 169, 169);
            font-size: 40px;
            cursor: pointer;
            &:hover {
                 color: #ffc520;
             }
        }
    }
    .searchString {
        color: #fff;
        font-size: 20px;
        margin-bottom: 70px;
        input {
            outline: none;
            cursor: pointer;
            margin-right: 10px;
        }
        label {
            margin-right: 20px;
            cursor: pointer;
        }
    }
    p {
        border-bottom: 3px double #ffc520;
        width: 200px;
        font-size: 30px;
        margin:0 auto 40px;
        padding-bottom: 10px;
        color: #ffffff;
    }
}
</style>
