<template>
    <div>
        <a href="https://segmentfault.com/u/fatdong1" class="iconfont icon-iconsf"></a>
        <a class="iconfont icon-github" href="https://github.com/FatDong1"></a>
        <a href="http://www.facebook.com/fatdong1" class="iconfont icon-cion15"></a>
        <router-link :to="{name: 'login'}" tag="p" class="login">站长登录</router-link>
        <p>Copyright @ 2017 Powered by Vue. Designed by me</p>
    </div>
</template>

<script>
export default {}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .iconfont {
       font-size: 30px;
       color: #fff;
       margin-right: 10px;
    }
    .icon-github:hover {
             color: royalblue;
    }
    .icon-cion15 {
        font-size: 26px;
    }
    .icon-cion15:hover {
        color: deepskyblue;
    }
    .icon-iconsf:hover {
        color: green;
    }
    div {
        text-align: center;
        padding-top: 10px;
        line-height: 40px;
        width: 100%;
        background: rgba(55, 57, 65, 0.5);
    }
    p {
        text-align: center;
        color: #ffffff;
        font-size: 16px;
    }
    p.login {
        cursor: pointer;
        color: #fff;
    }
</style>
