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
        height: 50px;
        line-height: 50px;
        color: #fff;
        font-size: 18px;
        display: flex;
        justify-content: space-between;
        p.left {
            margin-left: 20px;
            i.icon-zhuye {
                font-size: 30px;
                color: rgb(129, 216, 208);
                cursor: pointer;
                &:hover {
                     color: darkturquoise;
                 }
            }
        }
        p.right {
            cursor: pointer;
            margin-right: 20px;
            color: rgb(147, 240, 216);
            i.icon-out {
                font-size: 20px;
            }
            &:hover {
                 color: darkturquoise;
             }
        }
    }
    nav {
        float: left;
        display: inline-block;
        position: relative;
        color: #fff;
        margin-top: 220px;
        width: 100px;
        ul {
            padding-left: 0;
            list-style: none;
            li {
                width: 100px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                cursor: pointer;
                border-left: 3px solid transparent;
                transition: 1s;
                &:hover {
                     transition: 1s;
                     padding-left: 20px;
                     color: darkturquoise;
                 }
                i {
                    font-size: 18px;
                    margin-right: 10px;
                }
            }
            li.router-link-active {
                border-left: 3px solid darkturquoise;
                background: rgba(204, 204, 204, 0.5);
            }
        }
    }
    .content {
        margin-left: 100px;
    }
}
</style>
