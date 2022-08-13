<!-- 头部部分 -->
<template>
  <div class="headBox">
    <div class="left">
      <slot name="Left">
       
      </slot>
    </div>
    <div class="right">
      <slot name="Right">
      
       </slot>
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
    return {
       input: ''
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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
.headBox {
  height:40px;
  width: 100%;
  // position:absolute;
  // background-color: wheat;
  box-sizing: border-box;
  vertical-align: middle;
  .left {
    float: left;
    height: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    flex-wrap: wrap;
    box-sizing: border-box;
  }

  .left > * {
    height:100%;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-self: center;
  }
  .left > * {
    span {
      margin-top: 5px;
      display: flex;
      height: 32px;
      justify-content: center;
      align-items: center;
      margin-left: 20px;
      border-left: 2px solid #ccc;
      padding-left: 10px;
  
      img {
        display: block;
        height: 32px;
        margin-right: 10px;
      }
    }
  }
  .right {
    float: right;
    // background-color: yellow;
    height: 100%;
    display: flex;
    justify-self: center;
    align-items: center;
    flex-wrap:nowrap;
    box-sizing: border-box;
    // background-color: yellow;
  }
}

</style>