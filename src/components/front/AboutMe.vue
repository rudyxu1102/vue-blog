<template>
    <div id="contact" v-scroll-show>
        <p class="headline animated bounceIn">About me</p>
        <div class="info animated tada">
            <img src="../../../static/me.jpg" alt="me"/>
            <div>
                <p>邮箱:          xuhaodong66@gmail.com</p>
                <p>QQ:            3552116732</p>
                <p>学校:          广州大学大三在校生</p>
                <p>求职意向:    2017暑假前端实习</p>
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
    height: 700px;
    background: rgba(55, 57, 65, 0.2);
    p.headline {
        display: none;
        width: 280px;
    }
    .info {
        display: none;
        position: relative;
        width: 700px;
        height: 400px;
        margin: 110px auto 0;
        border: 3px solid rgb(0, 194, 169);
        transition: all 2s;
        &:hover {
             background: rgb(0, 194, 169);
             transition: all 2s;
         }
        img {
            width: 150px;
            height: 150px;
            border: 3px solid #cccccc;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            margin-left: -75px;
            margin-top: -75px;
            transform: rotateZ(0deg);
            transition: all 3s;
            &:hover {
                 transform: rotateZ(360deg);
                 transition: all 3s;
             }
        }
        div {
            margin-top: 130px;
            p {
                font-size: 20px;
                color: #fff;
                width: 300px;
                margin: 0 auto 25px;
                white-space: pre;
                a {
                    outline: none;
                    border: none;
                    margin-left: 30px;
                    font-size: 30px;
                    color: #fff;
                    &:hover {
                         color: royalblue;
                     }
                }
            }
        }
    }
}
p.headline {
    padding-top: 70px;
    margin: 0 auto 20px;
    text-align: center;
    color: #fff;
    font-size: 40px;
    padding-bottom: 20px;
    border-bottom: 5px double rgb(0, 194, 169);
}
</style>
