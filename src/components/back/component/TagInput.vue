<template>
    <div class="tag_div" v-if="show">
        <input
                type="text"
                class="newInput"
                placeholder="标签"
                v-model="tagContent"
                onfocus="this.placeholder=''"
                @blur="isRepeated"
                @keydown.enter="addTag"
        />
        <i class="iconfont icon-shanchu1" @click="delTag"></i>
        <i class="iconfont icon-zengjia" @click="addTag" v-if="index === tags.length - 1"></i>
    </div>
</template>

<script>
import {mapMutations}       from 'vuex'
export default {
    data () {
        return {
            show: true
        }
    },
    props: {
        tags: Array,
        index: Number
    },
    methods: {
        ...mapMutations(['set_dialog']),
        delTag () {
            this.tags.splice(this.index, 1)             // 通过操作数组来删除标签
            console.log(this.tags)
        },
        addTag () {
            this.tags.push('')      // 通过操作数组来增加空标签
            setTimeout(() => {
                document.getElementsByClassName('newInput')[this.index + 1].focus()  // 新生成的空标签获得焦点
            }, 0)
        },
        isRepeated () {
            let currentIndex = this.index
            let currentValue = this.tags[currentIndex]
            while (currentIndex) {
                if (currentValue.toLowerCase() === this.tags[currentIndex - 1].toLowerCase()) {  // 标签去重
                    this.set_dialog({
                        info: '傻了吧，标签不能重复',
                        hasTwoBtn: false,
                        show: true
                    })
                    this.tags.splice(this.index, 1, '')
                    break
                } else {
                    currentIndex--
                }
            }
        }
    },
    computed: {
        tagContent: {
            get () {
                return this.tags[this.index]        // 获取标签数组元素值
            },
            set (value) {
                this.tags[this.index] = value.trim()    // 改变标签数组
            }
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.tag_div {
    position: relative;
    display: inline-block;
    &:hover i.icon-shanchu1{
         opacity: 1;
         transition: 1s;
     }
    .newInput {
        border: none;
        border-bottom: 0.125rem solid rgb(129, 216, 208);
        outline: none;
        background: transparent;
        color: #ffffff;
        margin-bottom: 0.625rem;
        margin-right: 0.3125rem;
        text-align: center;
        width: 6.25rem;
        height: 1.875rem;
        font-size: 1rem;
    }
    i.icon-shanchu1 {
        position: absolute;
        right: 0;
        top: -0.3125rem;
        font-size: 1rem;
        color: #ffc520;
        cursor: pointer;
        opacity: 0;
        transition: 1s;
        &:hover {
             color: darkturquoise;
             font-weight: bolder;
         }
    }
}
.icon-zengjia {
    position: absolute;
    right: -1rem;
    top: 0.4rem;
    font-size: 1rem;
    color: rgb(129, 216, 208);
    cursor: pointer;
    &:hover {
         color: darkturquoise;
         font-weight: bolder;
     }
}
</style>
