<template>
    <div class="wrapper">
        <p>所有文章</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage"></article-content>
        <button class="addPost" @click="$router.push({name: 'editor'})"><span>添加文章</span></button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useArticleStore }      from '@/stores/article'
import ArticleContent           from './component/ArticleContent.vue'

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
        ...mapActions(useArticleStore, ['getAllArticles']),
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
        ...mapState(useArticleStore, ['articles'])
    },
    components: {
        ArticleContent
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    position: relative;
    padding-top: 0.625rem;
    /*height: 35.625rem;*/
    color: #ffffff;
    p {
        border-bottom: 0.1875rem double rgb(129, 216, 208);
        width: 12.5rem;
        font-size: 1.875rem;
        margin:0 auto 2.5rem;
        padding-bottom: 0.625rem;
        text-align: center;
    }
    .addPost {
        position: fixed;
        bottom: 1.25rem;
        right: 1.25rem;
    }
}
@media screen and (max-width: 440px) {
    .wrapper {
        padding-top: 2rem !important;
        margin-bottom: 4rem;
        .addPost {
            position: absolute !important;
            bottom: -3rem !important;
        }
    }
}
</style>
