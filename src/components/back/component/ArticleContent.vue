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
        <tr v-for="article in articles" :key="article.aid">
            <td class="title" @click="$router.push({name: 'editor', query: {aid: article.aid}})">{{article.title}}</td>
            <td>{{$filters.toTag(article.tags)}}</td>
            <td>{{$filters.toDate(article.date)}}</td>
            <td>
                <i class="iconfont icon-biji-copy" @click="$router.push({name: 'editor', query: {aid: article.aid}})"></i>
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
import { mapState, mapActions } from 'pinia'
import { useArticleStore } from '@/stores/article'
import { useUiStore } from '@/stores/ui'

export default {
    data () {
        return {
            page: 1
        }
    },
    computed: {
        ...mapState(useArticleStore, ['articles']),
        ...mapState(useUiStore, ['dialog'])
    },
    methods: {
        ...mapActions(useArticleStore, ['delArticle']),
        ...mapActions(useUiStore, ['setDialog']),
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
            this.setDialog({
                info: '确认删除(⊙o⊙)？',
                hasTwoBtn: true,
                show: true
            })
            new Promise((resolve, reject) => {
                this.dialog.resolveFn = resolve
                this.dialog.rejectFn = reject
            }).then(() => {
                this.delArticle({aid: aid, page: this.page, route: this.$route})
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
table {
    border-left: 0.1875rem solid rgb(129, 216, 208);
    border-right: 0.1875rem solid rgb(129, 216, 208);
    margin: 0 auto;
    text-align: center;
    max-height: 25rem;
    min-width: 70%;
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
        height: 2.5rem;
        line-height: 1.875rem;
    }
    i {
        font-size: 1.25rem;
        margin-right: 0.625rem;
        color: rgb(129, 216, 208);
        cursor: pointer;
        &:hover {
            color: #ffc520;
        }
    }
    tfoot tr td:nth-child(1), tfoot tr td:nth-child(3) {
        cursor: pointer;
        &:hover {
            color: #ffc520;
        }
    }
}
.title {
    cursor: pointer;
    &:hover {
         color: #ffc520;
     }
}
</style>
