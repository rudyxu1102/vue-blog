<template>
    <div id="nav">
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
            <ul>
                <router-link to="/home" tag="li">首页</router-link>
                <router-link to="/articles" tag="li">博客</router-link>
                <router-link to="/contact" tag="li">联系站长</router-link>
                <router-link to="/about" tag="li">关于我</router-link>
            </ul>
        </nav>
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
    .search {
        position: absolute;
        top: 5px;
        left: 10px;
        input {
            color: #fff;
            outline: none;
            background: transparent;
            width: 250px;
            height: 30px;
            line-height: 30px;
            border-radius: 20px;
            font-size: 18px;
            padding-left: 10px;
            border: 2px solid #cccccc;
        }
        .icon-search {
            cursor: pointer;
            font-size: 30px;
            color: #ffffff;
            position: relative;
            left: -40px;
            top: 5px;
            &:hover {
                 color: deepskyblue;
             }
        }
    }
    nav {
        width: 100%;
        height: 50px;
        background: rgba(204, 204, 204, 0.5);
    }
    ul {
        color: white;
        float: right;
        list-style: none;
        li {
            width: 100px;
            float: left;
            font-size: 18px;
            text-align: center;
            margin-right: 30px;
            height: 47px;
            line-height: 53px;
            cursor: pointer;
            border-bottom: 3px solid transparent;
            &:hover {
                 border-bottom: 3px solid hsl(357,57,50);
                 transition: all 0.8s;
             }
            &.router-link-active {
                 border-bottom: 3px solid hsl(357,57,50);
             }
        }
    }
    .container {
        overflow: hidden;
        width: 100%;
        height: 600px;
        border-bottom: 3px solid #cccccc;
    }
    .bgImage {
        display: block;
        width: 100%;
        height: 600px;
        transform: perspective(1000px) translateZ(0);
        transition:  8s;
    &:hover {
         transform: perspective(1000px) translateZ(100px);
         transition:  8s;
     }
    }
    #title {
        font-family: Georgia, "Microsoft YaHei", "微软雅黑",  STXihei, "华文细黑",  serif;
        color: #fff;
        text-align: center;
        font-size: 50px;
        width: 500px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -10px;
        margin-left: -250px;
    }
}
</style>
