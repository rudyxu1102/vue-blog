<template>
    <div class="wrapper">
        <p>所有文章</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage"></article-content>
        <router-link
                :to="{name: 'editor'}"
                class="addPost" tag="button"
        ><span>添加文章</span></router-link>
    </div>
</template>

<script>
import {mapActions, mapState}   from 'vuex'
import ArticleContent           from './component/ArticleContent'

export default {
    created () {
        this.getAllArticles({page: this.page, limit: 8})
    },
    data () {
        return {
            page: 1
        }
    },
    methods: {
        ...mapActions(['getAllArticles']),
        nextPage () {
            this.page++
            this.getAllArticles({page: this.page, limit: 8})
        },
        prePage () {
            this.page--
            this.getAllArticles({page: this.page, limit: 8})
        }
    },
    computed: {
        ...mapState(['articles'])
    },
    components: {
        ArticleContent
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    padding-top: 10px;
    height: 570px;
    color: #ffffff;
    p {
        border-bottom: 3px double rgb(129, 216, 208);
        width: 200px;
        font-size: 30px;
        margin:0 auto 40px;
        padding-bottom: 10px;
        text-align: center;
    }
    .addPost {
        position: fixed;
        bottom: 20px;
        right: 20px;
    }
}
</style>
