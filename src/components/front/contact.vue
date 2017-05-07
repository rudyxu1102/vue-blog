<template>
    <div class="contact" v-scroll-show>
        <p class="headline animated bounceIn">Contact me</p>
        <div class="email animated fadeIn">
            <input type="text" placeholder=" 邮件主题" v-model="subject"/>
            <input type="text" placeholder=" 邮箱" v-model="address"/>
            <textarea placeholder=" 来唠唠嗑呗" spellcheck="false" v-model="content"></textarea>
            <button class="sendEmail" @click="send" :disabled="sendFlag">
                <span>{{sendFlag ? '发送中...' : '确认'}}</span>
            </button>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapActions} from 'vuex'
export default {
    data () {
        return {
            subject: '',
            address: '',
            content: '',
            sendFlag: false
        }
    },
    created () {
        this.set_headline({
            content: '联系站长',
            animation: 'animated rotateIn'
        })
    },
    methods: {
        ...mapMutations(['set_headline']),
        ...mapActions(['sendMail']),
        send () {
            const re = /^[\w_-]+@[\w_-]+\.[\w\\.]+$/
            if (!this.subject || !this.content) {
                alert('还有选项没填(⊙o⊙)？')
                return
            } else if (!re.test(this.address)) {
                alert('请正确填写邮箱地址')
                return
            }
            this.sendFlag = true
            this.sendMail({
                subject: this.subject,
                address: this.address,
                content: this.content
            }).then(() => {
                this.subject = ''
                this.content = ''
                this.address = ''
                this.sendFlag = false
            }).catch(() => {
                this.sendFlag = false
                alert('sorry, 邮件发送失败，请重新发送')
            })
        }
    }

}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.contact {
    background: rgba(55, 57, 65, 0.2);
    min-height: 700px;
    p {
        display: none;
        width: 280px;
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
