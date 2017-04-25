<template>
    <div class="container">
        <section class="newBlog" v-scroll-show>
            <a href="#lastPost" class="title animated bounceIn" data-scroll>
                <p class="headline" id="lastPost">最近更新</p>
            </a>
            <div class="posts animated fadeIn">
                <div class="flex">
                    <div v-for="(article, index) in reducedArticles">
                        <time>{{article.date | toDate}}</time>
                        <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}" tag="p" exact class="title_1">{{article.title}}</router-link>
                        <p class="content">{{article.content}}</p>
                        <router-link :to="{name: 'article', params: {id: article.aid, index: index, page: 1}, hash: '#article'}" tag="button" exact><span>Read More</span></router-link>
                    </div>
                </div>
            </div>
        </section>
        <section class="contact" v-scroll-show>
            <a href="#contactMe" class="title animated bounceIn" data-scroll>
                <p class="headline" id="contactMe">Contact me</p>
            </a>
            <div class="email animated fadeIn">
                <input type="text" placeholder=" 邮件主题" v-model="subject"/>
                <input type="text" placeholder=" 邮箱" v-model="address"/>
                <textarea placeholder=" 来唠唠嗑呗" spellcheck="false" v-model="content"></textarea>
                <button class="sendEmail" @click="send"><span>确认</span></button>
            </div>
        </section>
    </div>
</template>

<script>
import {mapMutations, mapActions, mapGetters}   from 'vuex'

export default {
    data () {
        return {
            subject: '',
            address: '',
            content: ''
        }
    },
    created () {
        this.set_headline({
            content: 'Welcome to my blog',
            animation: 'animated bounceIn'
        })
        this.getAllArticles({page: 1, limit: 3})
    },
    computed: {
        ...mapGetters(['reducedArticles'])
    },
    methods: {
        ...mapMutations(['set_headline']),
        ...mapActions(['getAllArticles', 'sendMail']),
        send () {
            const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
            if (!this.subject || !this.content) {
                alert('还有选项没填(⊙o⊙)？')
                return
            } else if (!re.test(this.address)) {
                alert('请正确填写邮箱地址')
                return
            }
            this.sendMail({subject: this.subject, address: this.address, content: this.content})
                .then(() => {
                    this.subject = ''
                    this.content = ''
                    this.address = ''
                    alert('邮件发送成功')
                }).catch(() => { alert('sorry, 邮件发送失败，请重新发送') })
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.container {
    background: rgba(55, 57, 65, 0.2);
    .newBlog {
        min-height: 700px;
        .title {
            color: white;
            display: none;
            margin-bottom: 60px;
            p {
                padding-top: 45px;
                width: 250px;
            }
        }
        .posts {
            display: none;
            padding-bottom: 80px;
            .flex {
                color: #fff;
                display: flex;
                flex-wrap: wrap;
                margin: 0 100px 0;
                justify-content: space-between;
                div {
                    width: 270px;
                    border: 3px solid #cccccc;
                    padding: 0 30px 20px;
                    margin-bottom: 20px;
                    time {
                        border-bottom: 2px dashed #ffc520;
                        width: 100%;
                        height: 60px;
                        display: block;
                        font-size: 20px;
                        line-height: 60px;
                    }
                    p:nth-child(2) {
                        margin-top: 20px;
                        font-size: 30px;
                        font-weight: bold;
                        &:hover {
                             color: rgb(0, 194, 169);
                             cursor: pointer;
                         }
                    }
                    p:nth-child(3) {
                        margin-top: 30px;
                    }
                }
            }
        }
    }
    .contact {
        background: rgba(55, 57, 65, 0.2);
        height: 700px;
        .title {
            color: white;
            display: none;
            margin-bottom: 60px;
            p {
                padding-top: 45px;
                width: 250px;
            }
        }
        .email {
            display: none;
            width: 500px;
            margin: 50px auto 0;
            input {
                color: #ffffff;
                font-size: 18px;
                border: 2px solid #00ff7f;
                width: 300px;
                height: 25px;
                margin-bottom: 20px;
                display: block;
                background: transparent;
            }
            textarea {
                color: #ffffff;
                font-size: 18px;
                border: 2px solid #00ff7f;
                width: 500px;
                height: 300px;
                resize: none;
                background: transparent;
                font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
            }
            .sendEmail {
                width: 100px;
                margin-top: 10px;
                margin-left: calc(100% - 100px);
            }
        }
    }
}
p.headline {
    padding-top: 70px;
    margin: 0 auto 20px;
    text-align: center;
    color: #fff;
    font-size: 40px;
    padding-bottom: 20px;
    border-bottom: 5px double rgb(0, 194, 169);
}

</style>
