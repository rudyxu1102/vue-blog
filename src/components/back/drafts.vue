<template>
    <div class="container">
        <p>所有草稿</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage"></article-content>
        <button class="addPost" @click="$router.push({name: 'editor'})"><span>添加草稿</span></button>
    </div>
</template>

<script>
import { mapState, mapActions } from 'pinia'
import { useArticleStore }      from '@/stores/article'
import { useDraftStore }        from '@/stores/draft'
import ArticleContent           from './component/ArticleContent.vue'
export default {
    created () {
        this.getAllDrafts({page: this.page, limit: 8})
    },
    data () {
        return {
            page: 1
        }
    },
    methods: {
        ...mapActions(useDraftStore, ['getAllDrafts']),
        nextPage () {
            this.page++
            this.getAllDrafts({page: this.page, limit: 8})
        },
        prePage () {
            if (!(this.page - 1)) {
                alert('已经到第一页咯')
            } else {
                this.page--
                this.getAllDrafts({page: this.page, limit: 8})
            }
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
.container {
    padding-top: 0.625rem;
    color: #ffffff;
    position: relative;
    P {
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
    .container {
        padding-top: 2rem !important;
        margin-bottom: 3rem;
        .addPost {
            position: absolute;
            bottom: -3rem;
        }
    }
}
</style>
