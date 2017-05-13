<template>
    <div class="wrapper">
        <div class="title">
            <input type="text" placeholder="文章标题" onfocus="this.placeholder=''" onblur="this.placeholder='文章标题'" v-model="title"/>
        </div>
        <div id="tags">
            <tag-input
                    v-for="(item, index) in tags"
                    :tags="tags"
                    :index="index"
                    :key="index"
            ></tag-input>
        </div>
        <div class="info">
            <div class="right">
                <p @click="isMarked = true" :class="{active: isMarked}">原文</p>
                <p @click="isMarked = false" :class="{active: !isMarked}">预览</p>
            </div>
            <textarea
                    id="editor" spellcheck="false"
                    v-if="isMarked" v-model="mdContent"
                    @keydown.once.ctrl.13="saveDraft($route.query.aid)"
                    v-focus
            ></textarea>
            <div class="preview animated fadeIn" v-if="!isMarked" v-html="mdHtml" tabIndex="1" v-focus></div>
        </div>
        <button class="publish" @click="saveArticle($route.query.aid)"><span>发布文章</span></button>
        <button class="draft" @click="saveDraft($route.query.aid)"><span>存为草稿</span></button>
    </div>
</template>

<script>
import marked                                   from 'marked'
import hljs                                     from 'highlight.js'
import {mapMutations, mapActions, mapState}     from 'vuex'
import TagInput                                 from './component/TagInput'

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
            isMarked: true,
            firstUpdate: true,
            isChange: false,
            mdHtml: ''
        }
    },
    directives: {
        focus: {
            inserted: (el) => {
                el.focus()
            }
        }
    },
    created () {
        const aid = this.$route.query.aid
        this.isSaving_toggle(false)
        if (aid) {
            return this.getArticle(aid)
        }
        this.set_article({
            content: '',
            title: '',
            tags: ['']
        })
    },
    mounted () {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode === 40 && e.ctrlKey) {                //  ctrl + ↓ 切换
                this.isMarked = !this.isMarked
            }
        })
    },
    updated () {
    // 因为切换预览模式，也会触发数据更新，所以不用beforeUpdate, 而用watch监听数据变化
        if (this.firstUpdate) {
            this.isChange = false
        }
        this.firstUpdate = false
    },
    computed: {
        ...mapState(['article', 'isSaving', 'dialog']),
        mdContent: {
            get () {
                this.mdHtml = marked(this.article.content || '', { renderer: renderer })
                return this.article.content
            },
            set (value) { this.update_post_content(value) }
        },
        title: {
            get () { return this.article.title || '' },
            set (value) { this.update_post_title(value) }
        },
        tags () {
            return this.article.tags
        }
    },
    methods: {
        ...mapMutations(['set_article', 'update_post_content', 'update_post_title', 'update_post_tags', 'isSaving_toggle', 'set_dialog']),
        ...mapActions(['saveArticle', 'getArticle', 'saveDraft'])
    },
    components: {
        TagInput
    },
    watch: {
        title () {
            this.isChange = true
        },
        tags () {
            this.isChange = true
        },
        mdContent () {
            this.isChange = true
            setTimeout(() => {                                  // 按下tab键后重新获得焦点
                document.getElementById('editor').focus()
            }, 0)
        }
    },
    beforeRouteLeave (to, from, next) {
        if (this.isChange && !this.isSaving) {
            this.set_dialog({
                info: '还没保存，确认离开(⊙o⊙)？',
                hasTwoBtn: true,
                show: true
            })
            new Promise((resolve, reject) => {
                this.dialog.resolveFn = resolve
                this.dialog.rejectFn = reject
            }).then(
                () => { next() },
                () => { next(false) }
            ).catch((err) => {
                console.log(err)
            })
        } else {
            next()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    position: relative;
    padding: 0 3.125rem 0;
    input {
        border: none;
        border-bottom: 0.125rem solid rgb(129, 216, 208);
        outline: none;
        background: transparent;
        color: #ffffff;
        margin-bottom: 0.625rem;
        text-align: center;
    }
    .title input {
        width: 100%;
        height: 3.125rem;
        font-size: 1.875rem;
    }
    #tags {
        input {
            width: 6.25rem;
            height: 1.875rem;
            font-size: 1rem;
            margin-right: 0.125rem;
        }
    }
    .info {
        border: 0.125rem solid rgb(129, 216, 208);
        position: relative;
        height: 29.375rem;
        .right {
            color: #ffffff;
            position: absolute;
            right: -0.125rem;
            top: -2rem;
            border-top: 0.125rem solid rgb(129, 216, 208);
            border-right: 0.125rem solid rgb(129, 216, 208);
            border-left: 0.125rem solid rgb(129, 216, 208);
            p {
                float: left;
                width: 5rem;
                height: 1.875rem;
                line-height: 1.875rem;
                text-align: center;
                cursor: pointer;
            }
            p:nth-child(1) {
                border-right: 0.125rem solid rgb(129, 216, 208);
            }
        }
        #editor {
            width: 100%;
            height: 29.375rem;
            border: none;
            background: transparent;
            resize: none;
            outline: none;
            font-size: 1rem;
            overflow-y: auto;
            white-space: pre-wrap;
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            color: #E5E9F2;
        }
        .preview {
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            display: block;
            height: 26.875rem;
            color: #ffffff;
            font-size: 1rem;
            overflow-y: auto;
            padding: 1.25rem 1.25rem;
            white-space: pre-wrap;
            word-wrap: break-word;
            outline: none;
            border: none;
        }
    }
}
.publish {
    width: 6.25rem;
    position: fixed;
    left: 1rem;
    bottom: 32.5rem;
    background: rgb(129, 216, 208);
    color: #000;
}
.draft {
    width: 6.25rem;
    position: fixed;
    left: 1rem;
    bottom: 2.5rem;
    background: rgb(129, 216, 208);
    color: #000;
}
.active {
    background: rgb(129, 216, 208);
    color: #111111;
}
@media screen and (max-width: 440px) {
    .wrapper {
        padding-left: 1rem !important;
        padding-right: 1rem !important;
        margin-bottom: 5rem;
    }
    .publish {
        position: absolute !important;
        bottom: -3rem !important;
        left: 1rem !important;
    }
    .draft {
        position: absolute !important;
        left: calc(100% - 7.25rem) !important;
        bottom: -3rem !important;
    }
    #tags {
        width: 13.7rem !important;
    }
    .icon-zengjia {
        margin-left: -1rem !important;
    }
}
</style>
