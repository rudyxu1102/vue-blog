<template>
    <div class="container">
        <p>所有草稿</p>
        <article-content v-on:addPage="nextPage" v-on:dropPage="prePage"></article-content>
        <router-link
                :to="{name: 'editor'}"
                class="addPost" tag="button"
        ><span>添加草稿</span></router-link>
    </div>
</template>

<script>
import {mapActions, mapState}   from 'vuex'
import ArticleContent           from './component/ArticleContent'
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
        ...mapActions(['getAllDrafts']),
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
        ...mapState(['articles'])
    },
    components: {
        ArticleContent
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
    padding-top: 10px;
    height: 570px;
    color: #ffffff;
    P {
        border-bottom: 3px double #ffc520;
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
