<!-- 返回头部组件 -->
<template>
  <div class="head">
    <div class="left">
      <div class="back" @click="returnBack">
        <i class="el-icon-back"></i>返回
      </div>
      <div class="bar"></div>
      <div class="line">
        <slot name="title"> 要被替换的标题 </slot>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {};
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    returnBack: function () {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.head {
  // width: 100%;
  width: calc(100%-60px);
  height: 50px;
  line-height: 50px;
  background-color: white;
  .left {
    height: 100%;
    width: 200px;
    display: flex;
    justify-items: center;
    align-items: center;
    .back {
      font-size: 14px;
      cursor: pointer;
    }
    .back:hover {
      color: #409eff;
    }
    .bar {
      width: 1px;
      height: 14px;
      background-color: #d8d8d8;
      margin-right: 15px;
      margin-left: 15px;
    }
    .line {
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
      margin-right: 15px;
      // margin-left: 15px;
      font-weight: bold;
      font-size: 14px;
    }
  }
}
</style>