<template>
    <div id="comment">
        <div class="newComment">
            <div class="headImg"><img :src="'../../../../static/' + imgName +'.jpg'"/></div>
            <textarea spellcheck="false" placeholder="说点什么吧..." v-model="content" id="reply" ref="textBox"></textarea>
            <input type="text" placeholder="称呼" v-model="name" class="name" ref="nameBox"/>
            <input type="text" placeholder="address" v-model="address"/>
            <button @click="summit" :disabled="summitFlag">
                <span>{{summitFlag ? '提交中...' : '发布评论'}}</span>
            </button>
        </div>
        <div class="allComments">
            <div class="summary">
                <p>评论数 {{comments.length}}</p>
                <p>
                   <span @click="getAllComments({id: $route.params.id})">最早 </span>|
                   <span @click="getAllComments({id: $route.params.id, sort: 'date'})">最新 </span>|
                   <span @click="getAllComments({id: $route.params.id, sort: 'like'})"> 最热</span>
                </p>
            </div>
            <div class="comments" v-for="(comment,index) in comments">
                <div id="info" :class="comment.imgName">
                    <p class="commentName">#{{index + 1}} <span>{{comment.name}}</span></p>
                    <p class="text">{{comment.content}}</p>
                    <div class="options">
                        <p class="commentDate">{{comment.date | toDate}}</p>
                        <a href="#comment" data-scroll>
                            <span @click="reply(comment.name)">
                                <i class="iconfont icon-huifu"></i>回复
                            </span>
                        </a>
                        <p @click="addLike(comment._id, index)">
                            <i class="iconfont icon-like" :class="{activeLike: likeArr.indexOf(index) !== -1}">
                            </i> {{comment.like}}
                        </p>
                    </div>
                    <img :src="'../../../../static/' + comment.imgName + '.jpg'"/>
                </div>
            </div>
            <p v-show="comments.length === 0" class="nocomment">哎，没人理我 :(</p>
        </div>
    </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
    data () {
        return {
            name: '',
            address: '',
            content: '',
            imgName: '',
            summitFlag: false
        }
    },
    created () {
        this.getAllComments({id: this.$route.params.id})
        if (localStorage.token && this.user.name) {
            this.imgName = 'me'
        } else {
            this.imgName = 'reviewer'
        }
    },
    computed: {
        ...mapState(['comments', 'user']),
        likeArr () {                            // 访问者点赞了哪些评论的数组
            if (localStorage.getItem(this.$route.params.id)) {
                const item = localStorage.getItem(this.$route.params.id)  // 初始化访问者的点赞情况
                return JSON.parse(item)
            }
            return []
        }
    },
    methods: {
        ...mapActions(['summitComment', 'getAllComments', 'updateLike']),
        summit () {
            const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
            if (!this.name || !this.content) {
                alert('还有选项没填(⊙o⊙)？')
                return
            } else if (!re.test(this.address)) {
                alert('请正确填写邮箱地址')
                return
            }
            this.summitFlag = true
            this.summitComment({
                imgName: this.imgName,
                name: this.name,
                content: this.content,
                address: this.address,
                articleId: this.$route.params.id,
                curPath: this.$route.fullPath
            }).then(() => {
                this.content = ''
                this.summitFlag = false
                this.getAllComments({id: this.$route.params.id})
            }).catch((res) => {
                alert(res.body)
                this.summitFlag = false
                this.name = ''
                this.$refs.nameBox.focus()
            })
        },
        reply (name) {
            this.content = '@' + name + ': '
            this.$refs.textBox.focus()
        },
        addLike (id, index) {
            const i = this.likeArr.indexOf(index)
            if (i === -1) {
                this.updateLike({id: id, option: 'add'}).then(() => {
                    this.likeArr.push(index)
                    this.getAllComments({id: this.$route.params.id})
                    localStorage[this.$route.params.id] = JSON.stringify(this.likeArr)  // 记录访问者的点赞情况
                }).catch((err) => {
                    console.log(err)
                })
            } else {
                this.updateLike({id: id, option: 'drop'}).then(() => {
                    this.likeArr.splice(i, 1)
                    this.getAllComments({id: this.$route.params.id})
                    localStorage[this.$route.params.id] = JSON.stringify(this.likeArr)  // 记录访问者的点赞情况
                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    },
    watch: {
        $route (to, from) {
            // #article是跳到另一篇文章，将评论框清空，#目录标题是锚点跳转，不清空评论框
            to.hash === '#article' ? this.content = '' : 0
            this.getAllComments({id: to.params.id})
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#comment {
    margin: 30px auto 10px;
    padding-top: 30px;
    text-align: left;
    .newComment {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 100%;
        .headImg {
            align-self: center;
            text-align: center;
            width: 200px;
            img {
                width: 100px;
                height: 100px;
                border: 2px solid #cccccc;
                border-radius: 10px;
            }
        }
        textarea {
            color: #ffffff;
            font-size: 18px;
            border: 2px solid darkturquoise;
            padding: 5px;
            border-radius: 10px;
            width: calc(100% - 214px);
            height: 200px;
            resize: none;
            background: transparent;
            outline: none;
            font-family: Georgia, "Times New Roman", "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
        }
        input {
            color: #ffffff;
            font-size: 18px;
            border: 2px solid darkturquoise;
            border-radius: 5px;
            outline: none;
            width: 200px;
            height: 25px;
            margin: 20px 10px 10px 0;
            padding-left: 5px;
            display: inline-block;
            background: transparent;
        }
        input.name {
            margin-left: 200px;
        }
        button {
            margin-top: 10px;
            float: right;
        }
    }
    .allComments {
        margin-top: 30px;
        .summary {
            display: flex;
            justify-content: space-between;
            background: rgba(245, 245, 245, 0.5);
            padding: 10px;
            border-radius:  5px;
            span {
                cursor: pointer;
                &:hover {
                    color: darkturquoise;
                 }
            }
        }
        .comments {
            position: relative;
            padding: 5px;
            margin-top: 10px;
            #info {
                width: calc(100%-100px);
                border: 2px solid rgba(245, 245, 245, 0.5);
                border-radius: 5px;
                padding: 10px;
                color: #ccc;
                .commentName {
                    font-size: 18px;
                    margin-bottom: 5px;
                    span {
                        color: darkturquoise;
                    }
                }
                .text {
                    margin-top: 10px;
                }
                .options {
                    text-align: right;
                    a {
                        color: white;
                        margin-right: 10px;
                        i.icon-huifu {
                            margin-right: 5px;
                        }
                        &:hover {
                            color: deepskyblue;
                         }
                    }
                    p {
                        display: inline-block;
                        margin-right: 5px;
                        cursor: pointer;
                        &:hover {
                             color: darkturquoise;
                         }
                    }
                }
                img {
                    width: 60px;
                    height: 60px;
                    position: absolute;
                    top: 50%;
                    margin-top: -30px;
                    border: 2px solid #cccccc;
                    border-radius: 5px;
                }
            }
        }
        .nocomment {
            margin: 20px auto;
            text-align: center;
        }
    }
}
.activeLike {
    color: #ffc520;
}
.reviewer {
    margin-left: 100px;
    img {
        left: 10px;
    }
    &:after {
         position: absolute;
         left: 88px;
         top: 50%;
         margin-top: -7px;
         content: '';
         width: 0;
         height: 0;
         border: 10px solid transparent;
         border-right-color: #000000;
     }
    &:before {
         position: absolute;
         left: 85px;
         top: 50%;
         margin-top: -7px;
         content: '';
         width: 0;
         height: 0;
         border: 10px solid transparent;
         border-right-color: rgba(245, 245, 245, 0.5);
     }
}
.me {
    margin-right: 100px;
    img {
        right: 10px;
    }
    &:after {
         position: absolute;
         right: 88px;
         top: 50%;
         margin-top: -8px;
         content: '';
         width: 0;
         height: 0;
         border: 10px solid transparent;
         border-left-color: #000000;
     }
    &:before {
         position: absolute;
         right: 85px;
         top: 50%;
         margin-top: -8px;
         content: '';
         width: 0;
         height: 0;
         border: 10px solid transparent;
         border-left-color: rgba(245, 245, 245, 0.5);
     }
}
</style>
