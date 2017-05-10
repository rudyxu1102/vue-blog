<template>
    <div class="wrapper">
        <div class="statusLine">
            <p class="left">
                <router-link :to="{name: 'home'}" class="iconfont icon-zhuye" tag="i"></router-link>
                <span>{{time}}好，{{name}}</span>
            </p>
            <p class="right"  @click="logout">
                <i class="iconfont icon-out"></i>
                <span>登出</span>
            </p>
        </div>
        <nav>
            <ul>
                <router-link :to="{name: 'posts'}" tag="li"><i class="iconfont icon-biji-copy"></i>文章</router-link>
                <router-link :to="{name: 'search'}" tag="li"><i class="iconfont icon-search"></i>搜索</router-link>
                <router-link :to="{name: 'drafts'}" tag="li"><i class="iconfont icon-draft"></i>草稿</router-link>
                <router-link :to="{name: 'account'}" tag="li"><i class="iconfont icon-zhanghu"></i>账户</router-link>
            </ul>
        </nav>
        <transition mode="out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
            <router-view class="content"></router-view>
        </transition>
    </div>
</template>

<script>
import {mapMutations, mapState}       from 'vuex'
export default {
    computed: {
        ...mapState(['user']),
        time () {
            const hours = new Date().getHours()
            if (hours > 5 && hours < 12) {
                return '早上'
            } else if (hours > 12 && hours < 19) {
                return '下午'
            } else if (hours === 12) {
                return '中午'
            } else {
                return '晚上'
            }
        },
        name () {
            return localStorage.userName
        }
    },
    methods: {
        ...mapMutations(['unset_user']),
        logout () {
            this.unset_user()
            this.$router.go({name: 'login'})
        }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../assets/css/icon.scss';
.wrapper {
    .statusLine {
        background: transparent;
        width: 100%;
        height: 3.125rem;
        line-height: 3.125rem;
        color: #fff;
        font-size: 1.125rem;
        display: flex;
        justify-content: space-between;
        p.left {
            margin-left: 1.25rem;
            i.icon-zhuye {
                font-size: 1.875rem;
                color: rgb(129, 216, 208);
                cursor: pointer;
                &:hover {
                     color: darkturquoise;
                 }
            }
        }
        p.right {
            cursor: pointer;
            margin-right: 1.25rem;
            color: rgb(129, 216, 208);
            i.icon-out {
                font-size: 1.25rem;
            }
            &:hover {
                 color: rgb(129, 216, 208);
             }
        }
    }
    nav {
        float: left;
        display: inline-block;
        position: relative;
        color: #fff;
        margin-top: 13.75rem;
        width: 6.25rem;
        ul {
            padding-left: 0;
            list-style: none;
            li {
                width: 6.25rem;
                height: 2.5rem;
                line-height: 2.5rem;
                text-align: center;
                cursor: pointer;
                border-left: 0.1875rem solid transparent;
                transition: 1s;
                &:hover {
                     transition: 1s;
                     padding-left: 1.25rem;
                     color: darkturquoise;
                 }
                i {
                    font-size: 1.125rem;
                    margin-right: 0.625rem;
                }
            }
            li.router-link-active {
                border-left: 0.1875rem solid darkturquoise;
                background: rgba(204, 204, 204, 0.5);
            }
        }
    }
    .content {
        margin-left: 6.25rem;
    }
}
@media screen and (max-width: 440px) {
    .content {
        margin-left: 0 !important;
    }
    nav {
        float: none !important;
        margin-top: 1rem !important;
        width: 100% !important;
        ul {
            display: flex;
            justify-content: space-between;
            flex-wrap: nowrap;
            width: 100% !important;
            li:hover {
                padding-left: 0 !important;
            }
        }
    }
}
</style>
