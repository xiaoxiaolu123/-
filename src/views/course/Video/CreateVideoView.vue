<!-- 添加课时 -->
<template>
  <div class="CreateVideoView">
    <Head>
      <template slot="title">
        <div class="title">添加课时</div>
      </template>
    </Head>
    <div class="tabBox">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">
          <div class="box1">
            <div class="line1">
                <span class="name">上传课时</span>
                <el-button type="primary">主要按钮</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置管理" name="second">可选信息</el-tab-pane>
      </el-tabs>
    </div>
    <div class=""></div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from "@/components/ReturnBackHead.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //这里存放数据
    return {
      activeName: "first",
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
<style  lang="less" scoped>
.CreateVideoView {
  min-width: 1180px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  padding: 20px 5px 20px 20px;
  .tabBox {
    margin-bottom: 30px;
    margin-top: 30px;
    // background-color: yellow;
    /deep/ .el-tabs__header {
      margin: auto;
      width: 152px;
      height: 40px;
      margin-bottom: 30px;
    }
    .box1 {
      background-color: yellow;
      height: 200px;
      width: 100%;
    }
  }

}
</style>