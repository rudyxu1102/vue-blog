<template>
    <div id="contact">
        <a href="#about_me" class="title animated bounceIn">
            <p class="headline" id="about_me">About me</p>
        </a>
        <div class="info animated tada">
            <img src="../../../static/me.jpg" alt="me"/>
            <div class="wraper">
                <p class="left">邮箱:</p><p class="right">xuhaodong66@gmail.com</p>
                <p class="left">QQ:</p><p class="right">3552116732</p>
                <p class="left">学校:</p><p class="right">广州大学大三在校生</p>
                <p class="left">在线简历:</p><a class="right" href="https://job.xuhaodong.cn">job.xuhaodong.cn</a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    created () {
        this.set_headline({
            content: '关于我',
            animation: 'animated bounce'
        })
    },
    methods: mapMutations(['set_headline'])
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#contact {
    min-height: 30rem;
    padding: 0 1rem 5rem;
    background: rgba(55, 57, 65, 0.2);
    .title {
        p.headline {
            width: 13rem;
        }
    }
    .info {
        position: relative;
        width: 55%;
        margin: 6.875rem auto 0;
        padding-bottom: 2rem;
        border: 0.1875rem solid rgb(129, 216, 208);
        transition: all 2s;
        &:hover {
             background: rgb(0, 194, 169);
             transition: all 2s;
         }
        img {
            width: 9.375rem;
            height: 9.375rem;
            border: 0.1875rem solid #cccccc;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            margin-left: -4.6875rem;
            margin-top: -4.6875rem;
        }
        div.wraper {
            margin-top: 8.125rem;
            padding-left: 2rem;
            p {
                display: inline-block;
                font-size: 1.25rem;
                color: #fff;
                margin-bottom: 1.5625rem;
            }
            .left {
                width: 30%;
            }
            .right {
                width: 50%;
            }
        }
    }
}
p.headline {
    padding-top: 4.375rem;
    margin: 0 auto 1.25rem;
    text-align: center;
    color: #fff;
    font-size: 2rem;
    padding-bottom: 1.25rem;
    border-bottom: 0.3125rem double rgb(129, 216, 208);
}
@media screen and (max-width: 440px) {
    /*.title, .info {*/
        /*display: block !important;*/
    /*}*/
    .info {
        width: 100% !important;
    }
    .wraper {
        padding-left: 1rem !important;
        p {
            display: block !important;
        }
        p.left {
            color: rgb(129, 216, 208) !important;
        }
        p.right {
            width: 100% !important;
        }
    }
}
</style>
