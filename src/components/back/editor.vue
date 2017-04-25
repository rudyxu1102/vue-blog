<template>
    <div class="wrapper">
        <div class="title">
            <input type="text" placeholder="文章标题" onfocus="this.placeholder=''" onblur="this.placeholder='文章标题'" v-model="title"/>
        </div>
        <div id="tags">
            <tag-input
                    v-for="(item, index) in tags"
                    :text="item" :tags="tags"
                    :index="index"
                    :key="index"
            ></tag-input>
            <i class="iconfont icon-zengjia" id="add" @click="addInput"></i>
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
    updated () {                            // 因为切换预览模式，也会触发数据更新，所以不用beforeUpdate, 而用watch监听数据变化
        if (this.firstUpdate) {
            this.isChange = false
        }
        this.firstUpdate = false
    },
    computed: {
        ...mapState(['article', 'isSaving']),
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
        addInput () {
            this.tags.push('')
        },
        ...mapMutations(['set_article', 'update_post_content', 'update_post_title', 'update_post_tags', 'isSaving_toggle']),
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
            let toLeave = confirm('还没保存，确认离开？')
            toLeave ? next() : next(false)
        } else {
            next()
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    padding: 0 50px 0;
    input {
        border: none;
        border-bottom: 2px solid #ffc520;
        outline: none;
        background: transparent;
        color: #ffffff;
        margin-bottom: 10px;
        text-align: center;
    }
    .title input {
        width: 100%;
        height: 50px;
        font-size: 30px;
    }
    #tags {
        input {
            width: 100px;
            height: 30px;
            font-size: 16px;
            margin-right: 2px;
        }
        .icon-zengjia {
            margin-left: 5px;
            font-size: 16px;
            color: #ffc520;
            cursor: pointer;
            &:hover {
                 color: darkturquoise;
                 font-weight: bolder;
             }
        }
    }
    .info {
        border: 2px solid #ffc520;
        position: relative;
        height: 470px;
        .right {
            color: #ffffff;
            position: absolute;
            right: -2px;
            top: -32px;
            border-top: 2px solid #ffc520;
            border-right: 2px solid #ffc520;
            border-left: 2px solid #ffc520;
            p {
                float: left;
                width: 80px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                cursor: pointer;
            }
            p:nth-child(1) {
                border-right: 2px solid #ffc520;
            }
        }
        #editor {
            width: 100%;
            height: 470px;
            border: none;
            background: transparent;
            resize: none;
            outline: none;
            font-size: 16px;
            overflow-y: auto;
            white-space: pre-wrap;
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            color: #E5E9F2;
        }
        .preview {
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            display: block;
            height: 430px;
            color: #ffffff;
            font-size: 16px;
            overflow-y: auto;
            padding: 20px 20px;
            white-space: pre-wrap;
            word-wrap: break-word;
            outline: none;
            border: none;
        }
    }
}
.publish {
    width: 100px;
    position: fixed;
    left: 0;
    top: 50px;
}
.draft {
    width: 100px;
    position: fixed;
    left: 0;
    bottom: 40px;
}
.active {
    background: #ffc520;
    color: #111111;
}
</style>
