<template>
  <div id="app">
    <fire-canvas class="fire"></fire-canvas>
    <router-view></router-view>
    <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <dialog-box v-if="dialog.show"></dialog-box>
    </transition>
  </div>
</template>

<script>
import FireCanvas   from './components/share/FireCanvas'
import spinner      from './components/share/spinner'
import DialogBox    from './components/share/DialogBox'
import {mapState}   from 'vuex'

export default {
    mounted () {
        document.addEventListener('visibilitychange', this.changeTitle, false)
    },
    components: {
        FireCanvas,
        spinner,
        DialogBox
    },
    computed: {
        ...mapState(['isLoading', 'dialog'])
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
        min-height: 100%;
        width: 100%;
    }
    @media screen and (max-width: 440px) {
        .fire {
            display: none;
        }
        #app {
            background: #000;
        }
    }
</style>
