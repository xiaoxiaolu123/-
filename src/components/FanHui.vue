<!--  -->
<template>

        <div class="back-bar-box mb-30">
            <div class="btn-back" @click.stop="goBackk"><i class="el-icon-back"></i> 返回</div>
            <div class="line"></div>
            <div class="name" v-text="msg"></div>
        </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    name:'FanHui',
    props:['msg'],
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
//这里存放数据
return {

};
},
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
goBackk:function(){
    this.$router.go(-1)
}
},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style lang='less' scoped>
 .back-bar-box.mb-30 {
    display: flex;
    align-items: center;
  .btn-back {
      font-size: 14px;
    font-weight: 400;
    color: #333;
    cursor: pointer;
    i.el-icon-back {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    }
  }
.btn-back:hover{
    color: #66b1ff;
}
  .line {
width: 1px;
    height: 14px;
    background-color: #d8d8d8;
    margin-right: 15px;
    margin-left: 15px;
  }

  .name {
font-size: 14px;
    font-weight: 600;
    color: #333;
}
  }

</style>