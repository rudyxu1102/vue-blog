<template>
    <div id="wrapper">
        <my-header></my-header>
        <router-view class="content" v-show="!isLoading"></router-view>
        <spinner v-show="isLoading"></spinner>
        <transition name="huojian" enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
            <a href="#app" data-scroll><i class="iconfont icon-huojian" v-if="show"></i></a>
        </transition>
        <my-footer></my-footer>
    </div>
</template>

<script>
import MyHeader         from './component/MyHeader'
import MyFooter         from './component/MyFooter'
import spinner          from '../share/spinner'
import {mapState}       from 'vuex'

export default {
    data () {
        return {
            show: false
        }
    },
    mounted () {
        window.addEventListener('scroll', this.handleScroll)
    },
    computed: {
        ...mapState(['isLoading'])
    },
    methods: {
        handleScroll () {
            this.show = window.scrollY > 400
        }
    },
    components: {
        MyHeader,
        MyFooter,
        spinner
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/icon.scss';
#wrapper {
    margin: 0 auto;
}
h1 {
    color: white;
    text-align: center;
}
.icon-huojian {
    font-size: 40px;
    color: #C0CCDA;
    position: fixed;
    bottom: 20px;
    right: 40px;
    cursor: pointer;
    transition:  1s;
    &:hover {
         bottom: 30px;
         color: #00ff7f;
         transition:  1s;
     }
}
.totop {
    bottom: 500px;
    transition: 1s;
}
</style>
