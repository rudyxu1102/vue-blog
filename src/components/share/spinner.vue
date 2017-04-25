<template>
    <div class="loading">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
</template>

<script>

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .loading{
        width: 150px;
        height: 15px;
        margin: 40px auto 40px;
    }
    .loading span{
        display: inline-block;
        width: 15px;
        height: 100%;
        margin-right: 5px;
        border-radius: 50%;
        background: #00ff7f;
        -webkit-animation: load 1.04s ease infinite;
    }
    .loading span:last-child{
        margin-right: 0;
    }
    @-webkit-keyframes load{
        0%{
            opacity: 1;
        }
        100%{
            opacity: 0;
        }
    }
    .loading span:nth-child(1){
        -webkit-animation-delay:0.13s;
    }
    .loading span:nth-child(2){
        -webkit-animation-delay:0.26s;
    }
    .loading span:nth-child(3){
        -webkit-animation-delay:0.39s;
    }
    .loading span:nth-child(4){
        -webkit-animation-delay:0.52s;
    }
    .loading span:nth-child(5){
        -webkit-animation-delay:0.65s;
    }
</style>
