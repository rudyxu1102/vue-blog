<template>
    <table>
        <thead>
        <tr>
            <th>标题</th>
            <th>标签</th>
            <th>日期</th>
            <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="article in articles">
            <td>{{article.title}}</td>
            <td>{{article.tags | toTag}}</td>
            <td>{{article.date | toDate}}</td>
            <td>
                <router-link :to="{name: 'editor', query: {aid: article.aid}}" class="iconfont icon-biji-copy" tag="i"></router-link>
                <i class="iconfont icon-shanchu" @click="deleteConfirm(article.aid)"></i>
            </td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
            <td @click="prePage">上一页</td>
            <td colspan="2">第 {{page}} 页</td>
            <td @click="nextPage">下一页</td>
        </tr>
        </tfoot>
    </table>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            page: 1
        }
    },
    methods: {
        ...mapActions(['delArticle']),
        nextPage () {
            this.page++
            this.$emit('addPage')   // 传递给父组件
        },
        prePage () {
            if (!(this.page - 1)) {
                alert('已经到第一页咯')
            } else {
                this.page--
                this.$emit('dropPage') // 传递给父组件
            }
        },
        deleteConfirm (aid) {
            let toDelete = confirm('确认删除？')       // confirm提示框
            if (toDelete === true) {
                this.delArticle({aid: aid, page: this.page, route: this.$route})
            } else {
                // 取消删除
            }
        }
    },
    computed: {
        ...mapState(['articles'])
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
table {
    border-left: 3px solid #ffc520;
    border-right: 3px solid #ffc520;
    width: 900px;
    margin: 0 auto;
    text-align: center;
    th, td {
        width: 25%;
    }
    thead, tfoot {
        color: darkturquoise;
    }
    tbody {
        color: #ffffff;
    }
    tr {
        height: 40px;
        line-height: 30px;
    }
    i {
        font-size: 20px;
        margin-right: 10px;
        color: #ffc520;
        cursor: pointer;
        &:hover {
            color: darkturquoise;
        }
    }
    tfoot tr td:nth-child(1), tfoot tr td:nth-child(3) {
        cursor: pointer;
        &:hover {
            color: #ffc520;
        }
    }
}
</style>
