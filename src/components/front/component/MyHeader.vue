<template>
    <div id="nav">
        <div class="flexDiv">
            <div class="search">
                <input
                        type="text"
                        placeholder="搜索一下"
                        v-model="text"
                        @keydown.enter="search"
                />
                <i class="iconfont icon-search" @click="search"></i>
            </div>
            <nav>
                <ul class="catalog">
                    <router-link to="/home" tag="li">首页</router-link>
                    <router-link to="/articles" tag="li">博客</router-link>
                    <router-link to="/contact" tag="li">联系站长</router-link>
                    <router-link to="/about" tag="li">关于我</router-link>
                </ul>
            </nav>
        </div>
        <div class="container">
            <img src="../../../../static/sunset.jpg" alt="bgimage" class="bgImage"/>
            <div :class="headline.animation" id="title">
                {{headline.content}}
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
    data () {
        return {
            text: ''
        }
    },
    computed: mapState(['headline']),
    methods: {
        ...mapActions(['searchArticles']),
        search () {
            this.$router.push({name: 'SearchResult', params: {text: this.text}, hash: '#search'})
        }
    },
    watch: {
        $route () {
            this.text = ''
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#nav {
    position: relative;
    .flexDiv {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap-reverse;
        background: rgba(204, 204, 204, 0.5);
        width: 100%;
        .search {
            margin-top: 0.55rem;
            margin-left: 0.625rem;
            position: relative;
            width: calc(45%-0.625rem);
            input {
                color: #fff;
                outline: none;
                background: transparent;
                width: 15.625rem;
                height: 1.875rem;
                line-height: 1.875rem;
                border-radius: 1.25rem;
                font-size: 1.125rem;
                padding-left: 0.625rem;
                border: 0.125rem solid #cccccc;
            }
            .icon-search {
                cursor: pointer;
                font-size: 1.875rem;
                color: #ffffff;
                position: absolute;
                right: 0.5rem;
                top: 0.2rem;
            }
        }
        nav {
            width: 50%;
            height: 3.125rem;
            ul {
                color: white;
                display: flex;
                flex-wrap: nowrap;
                justify-content: space-around;
                list-style: none;
                width: 100%;
                li {
                    width: 7rem;
                    font-size: 1.125rem;
                    text-align: center;
                    margin-right: 1.2rem;
                    height: 2.9375rem;
                    line-height: 3.3125rem;
                    cursor: pointer;
                    border-bottom: 0.1875rem solid transparent;
                    &:hover {
                         border-bottom: 0.1875rem solid rgb(129, 216, 208);
                         transition: all 0.8s;
                     }
                    &.router-link-active {
                         border-bottom: 0.1875rem solid rgb(129, 216, 208);
                     }
                }
            }
        }
    }
    .container {
        overflow: hidden;
        width: 100%;
        height: 37.5rem;
    }
    .bgImage {
        display: block;
        width: 100%;
        height: 37.5rem;
        transform: perspective(62.5rem) translateZ(0);
        transition:  8s;
        &:hover {
             transform: perspective(62.5rem) translateZ(6.25rem);
             transition:  8s;
         }
    }
    #title {
        font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
        color: #fff;
        text-align: center;
        font-size: 3.125rem;
        width: 31.25rem;
        height: 3.125rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -0.625rem;
        margin-left: -15.625rem;
    }
}
@media screen and (max-width: 980px) {
    nav {
        width: 60% !important;
    }
}
@media screen and (max-width: 440px) {
    .container, .bgImage {
        height: 18rem !important;
    }
    #title {
        font-size: 2rem !important;
    }
    nav {
        width: 100% !important;
        ul {
            width: 100% !important;
            padding-left: 0 !important;
            li {
                font-size: 0.9rem !important;
                margin-right: 0 !important;
            }
        }
    }
    .search {
        z-index: 2;
        position: absolute !important;
        top: 3.2rem;
        left: 50%;
        margin-left: -8.125rem !important;
    }
}
</style>
