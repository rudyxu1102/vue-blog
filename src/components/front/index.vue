<template>
    <div id="wrapper">
        <my-header></my-header>
        <router-view class="content" v-show="!isLoading"></router-view>
        <spinner v-show="isLoading"></spinner>
        <transition name="huojian" enter-active-class="animated bounceIn" leave-active-class="animated fadeOut">
            <a href="#app" class="rocket" data-scroll><i class="iconfont icon-huojian" v-if="show"></i></a>
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
    font-size: 2.5rem;
    color: #C0CCDA;
    position: fixed;
    bottom: 1.25rem;
    right: 2.5rem;
    cursor: pointer;
    transition:  1s;
    &:hover {
         bottom: 1.875rem;
         color: #00ff7f;
         transition:  1s;
     }
}
.totop {
    bottom: 31.25rem;
    transition: 1s;
}
@media screen and (max-width: 440px) {
    .icon-huojian {
        right: 0.5rem;
    }
}
</style>
