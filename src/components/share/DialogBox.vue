<template>
<div class="dialog">
    <div class="center">
        <i class="iconfont icon-icon13" @click="close"></i>
        <p><span>{{dialog.info}}</span></p>
        <div class="choice">
        <button class="sure" @click="confirm">确定</button>
        <button class="cancel" v-if="dialog.hasTwoBtn" @click="cancel">取消</button>
        </div>
    </div>
</div>
</template>

<script>
import {mapState, mapMutations}   from 'vuex'
export default {
    computed: {
        ...mapState(['dialog'])
    },
    methods: {
        ...mapMutations(['set_dialog']),
        close () {
            this.set_dialog({
                info: '',
                show: false
            })
        },
        confirm () {
            this.dialog.show = false
            this.dialog.resolveFn()
        },
        cancel () {
            this.dialog.show = false
            this.dialog.rejectFn()
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.dialog {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(2, 2, 2, 0.8);
    div.center {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 30%;
        height: 35%;
        overflow: auto;
        margin: auto;
        background: #C0CCDA;
        border-radius: 0.5rem;
        i {
            position: absolute;
            top: 1rem;
            right: 1rem;
            color: #fc8c84;
            font-size: 1rem;
            cursor: pointer;
            &:hover {
                color: darkturquoise;
             }
        }
        p {
            height: calc(100% - 4rem);
            width: calc(100% - 2rem);
            text-align: center;
            display: table;
            padding: 0 1rem;
            span {
                display: table-cell;
                vertical-align: middle;
            }
        }
    }
}
.choice {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
    color: #00193a;
    width: 100%;
    .sure {
        width: 30%;
        padding: 0 1rem;
        &:hover {
             color: #ffffff;
         }
    }
    .cancel {
        width: 30%;
        background: #fc8c84;
        padding: 0 1rem;
        &:hover {
             color: #ffffff;
         }
    }
}
button {
    margin-top: 0;
}
@media screen and (max-width: 440px) {
    .center {
        width: 90% !important;
        height: 35% !important;
    }
}
</style>
