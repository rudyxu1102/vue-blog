<template>
    <div class="account">
        <p class="icon"><i class="iconfont icon-icon69"></i></p>
        <div>
            <input type="text" placeholder="请输入新的用户名" v-model="name" />
            <i class="iconfont icon-zhanghu"></i>
        </div>
        <div>
            <input type="password" placeholder="请输入你的密码" v-model="password"/>
            <i class="iconfont icon-yuechi"></i>
        </div>
        <div>
            <input type="password" placeholder="请再次输入你的密码" v-model="repassword"/>
            <i class="iconfont icon-yuechi"></i>
        </div>
        <transition name="fade" enter-active-class="animated zoomInLeft"><p v-if="show">{{msg}}</p></transition>
        <button @click="reset"><span>确认修改</span></button>
    </div>
</template>

<script>
import {_debounce}                  from '../../lib/utils.js'
import {mapActions, mapState}       from 'vuex'
export default {
    data () {
        return {
            msg: 'haha',
            name: '',
            password: '',
            repassword: '',
            show: false
        }
    },
    computed: {
        ...mapState(['user'])
    },
    methods: {
        ...mapActions(['resetUser']),
        checkName () {
            if (this.name.length > 5) {
                this.msg = '请输入合适长度的用户名'
            }
        },
        reset () {
            if (this.repassword === this.password) {
                this.resetUser({id: this.user.id, name: this.name, password: this.password})
            }
        }
    },
    watch: {
        name: _debounce(function () {
            if (this.name.length > 5) {
                this.msg = '请输入合适长度的用户名'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500),
        password: _debounce(function () {
            if (this.password.length < 6) {
                this.msg = '请输入长度大于6位的密码'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500),
        repassword: _debounce(function () {
            if (this.repassword !== this.password) {
                this.msg = '请输入相同的密码'
                this.show = true
            } else {
                this.msg = ''
                this.show = false
            }
        }, 500)
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .account {
        position: relative;
        margin: 80px auto 0;
        width: calc(100% - 100px);
        height: 400px;
        p.icon {
            width: calc(100% - 100px);
            text-align: center;
            margin: 0 auto 100px;
            .icon-icon69 {
                font-size: 60px;
                color:  darkturquoise;
            }
        }
        div {
            width: 300px;
            margin: 0 auto;
            position: relative;
            i {
                color: deepskyblue;
                font-size: 30px;
                display: block;
                position: absolute;
                top: 0;
                left: 20px;
                transition:  0.5s;
            }
        }
        input {
            width: 200px;
            height: 30px;
            display: block;
            margin-top: 40px;
            margin-bottom: 20px;
            margin-left: 70px;
            outline: none;
            border: none;
            border-bottom: 3px solid #fc8c84;
            background: transparent;
            color: #fff;
            font-size: 16px;
            padding-left: 10px;
            &:focus + i {
                 color: #ffc520;
             }
        }
        button {
            width: 200px;
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -80px;
        }
    }
    p{
        text-align: center;
        height: 16px;
        color: royalblue;
    }
    /*#btn_place {*/
        /*width: 100%;*/
        /*position: absolute;*/
        /*bottom: -45px;*/
        /*button {*/
            /*margin-top: 0;*/
        /*}*/
    /*}*/
    /*.button_1 {*/
        /*margin-left: 30px;*/
        /*margin-right: 40px;*/
    /*}*/
    .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
