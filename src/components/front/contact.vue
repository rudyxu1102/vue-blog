<template>
    <div class="contact" v-scroll-show>
        <a href="#callMe" class="animated bounceIn" data-scroll>
            <p class="headline" id="callMe">Contact me</p>
        </a>
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
    padding: 0 1rem 2rem;
    p {
        display: none;
        width: 17.5rem;
    }
    .email {
        display: none;
        width: 40%;
        margin: 3.125rem auto 0;
        input {
            color: #ffffff;
            font-size: 1.125rem;
            border: 0.125rem solid rgb(129, 216, 208);
            width: 70%;
            height: 1.5625rem;
            margin-bottom: 1.25rem;
            display: block;
            background: transparent;
        }
        textarea {
            color: #ffffff;
            font-size: 1.125rem;
            border: 0.125rem solid rgb(129, 216, 208);
            width: 100%;
            height: 15rem;
            resize: none;
            background: transparent;
            font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
        }
        .sendEmail {
            width: 6.25rem;
            margin-top: 0.625rem;
            margin-left: calc(100% - 6.25rem);
        }
    }
}
p.headline {
    padding-top: 4.375rem;
    margin: 0 auto 1.25rem;
    text-align: center;
    color: #fff;
    font-size: 2.5rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.3125rem double rgb(129, 216, 208);
}
@media screen and (max-width: 440px) {
    .headline, .email {
        display: block !important;
    }
    .email {
        width: 100% !important;
    }
}
</style>
