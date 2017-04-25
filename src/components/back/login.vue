<template>
    <div class="wrapper">
        <i class="iconfont icon-icon69"></i>
        <div>
            <input type="text" placeholder="请输入你的账号" v-model="name"/>
            <i class="iconfont icon-zhanghu"></i>
        </div>
        <div>
            <input type="password" placeholder="请输入你的密码" v-model="password" @keydown.enter="confirm(name, password)"/>
            <i class="iconfont icon-yuechi"></i>
        </div>
        <p>{{info}}</p>
        <button @click="confirm(name, password)"><span>登录</span></button>
    </div>
</template>

<script>
import {mapActions, mapMutations}       from 'vuex'
export default {
    data () {
        return {
            name: '',
            password: '',
            info: ''
        }
    },
    methods: {
        ...mapActions(['login']),
        ...mapMutations(['set_user']),
        confirm (name, password) {
            this.login({name: name, password: password}).then((res) => {
                this.info = '正在登录中...'
                this.set_user(res.data)
                this.$router.push({name: 'posts'})
            }).catch((err) => {
                console.log(err)
                this.info = '登录失败， 请重新登录'
            })
        }
    },
    watch: {
        name () {
            this.info = ''
        },
        password () {
            this.info = ''
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.wrapper {
    width: 500px;
    margin: 130px auto;
    text-align: center;
    position: relative;
    .icon-icon69 {
        font-size: 60px;
        color: darkturquoise;
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
        padding-left: 0;
        margin-top: 20px;
        position: relative;
        left: 20px;
        text-align: center;
    }
}

p {
    color: #ffffff;
    width: 100%;
    height: 20px;
}
</style>
