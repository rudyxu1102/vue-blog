<template>
    <div class="tag_div" v-if="show">
        <input
                type="text"
                class="newInput"
                placeholder="标签"
                v-model="text"
                onfocus="this.placeholder=''"
                onblur="this.placeholder='标签'"
                @keydown.enter="addTag"
        />
        <i class="iconfont icon-shanchu1" @click="delTag"></i>
    </div>
</template>

<script>
export default {
    data () {
        return {
            show: true
        }
    },
    props: {
        text: String,
        tags: Array,
        index: Number
    },
    methods: {
        delTag () {
            this.tags.splice(this.index, 1)             // 通过操作数组来删除标签
        },
        addTag () {
            let currentIndex = this.index
            let currentValue = this.tags[currentIndex]
            let isOnly = true
            while (currentIndex) {
                if (currentValue.toLowerCase() === this.tags[currentIndex - 1].toLowerCase()) {  // 标签去重
                    alert('标签不能重复！')
                    isOnly = false
                    this.tags.splice(this.index, 1)
                    break
                } else {
                    currentIndex--
                }
            }
            if (isOnly) {
                this.tags.push('')      // 通过操作数组来增加空标签
                setTimeout(() => {
                    document.getElementsByClassName('newInput')[this.index + 1].focus()  // 新生成的空标签获得焦点
                }, 0)
            }
        }
    },
    computed: {
        text: {
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
    &:hover i{
         opacity: 1;
         transition: 1s;
     }
    .newInput {
        border: none;
        border-bottom: 2px solid rgb(129, 216, 208);
        outline: none;
        background: transparent;
        color: #ffffff;
        margin-bottom: 10px;
        margin-right: 5px;
        text-align: center;
        width: 100px;
        height: 30px;
        font-size: 16px;
    }
    i {
        position: absolute;
        right: 0;
        top: -5px;
        font-size: 16px;
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
</style>
