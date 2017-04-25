<template>
  <div id="app">
    <fire-canvas></fire-canvas>
    <router-view></router-view>
  </div>
</template>

<script>
import FireCanvas   from './components/share/FireCanvas'
import spinner      from './components/share/spinner'
import {mapState}   from 'vuex'
import smoothScroll from 'smooth-scroll'

export default {
    created () {
        smoothScroll.init()
    },
    mounted () {
        document.addEventListener('visibilitychange', this.changeTitle, false)
    },
    components: {
        FireCanvas,
        spinner
    },
    computed: {
        ...mapState(['isLoading'])
    },
    methods: {
        changeTitle () {            // 切换标签页后，改变title
            if (document.hidden) {
                document.title = '去吧，皮卡丘！'
            } else {
                document.title = '欢迎回来'
            }
        }
    }
}
</script>

<style>
    #app {
        margin: 0;
        padding: 0;
        overflow: hidden;
        height: 100%;
        width: 100%;
    }
</style>
