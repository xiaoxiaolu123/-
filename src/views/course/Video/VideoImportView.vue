<!-- 视频导入页面 -->
<template>
  <div class="VideoImportView">
    <Head>
      <template slot="title">
        <div id="title">课时批量导入</div>
      </template>
    </Head>
    <div class="content">
     
      <div class="left">
        <div class="xlsx" >
          <el-button type="primary">导入表格</el-button>
        </div>
      </div>
      <div class="right" @click.stop="downLoad">下载[课时批量导入模板]</div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from "@/components/ReturnBackHead.vue";
import XLSX from "xlsx";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //这里存放数据
    return {
      line:3,
      informationdata:[null,null,null,null,null,null,null,1000,"2021-12-30 18:00:00","","",30]
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
 
    // 下载链接方法
    downLoad: function () {
      let url =
        // window.location.protocol +
        // "//" +
        // window.location.host +
        // window.location.pathname +
        // "template/试题批量导入模板.xlsx";
        "http://admin.xiaomage.tech/template/试题批量导入模板.xlsx";
      window.open(url);
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
<style lang="less"  scoped>
.VideoImportView {
  padding-top: 10px;
  padding-bottom: 30px;
  padding-left: 30px;
  border-radius: 15px;
  background-color: white;
  .content {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 30px 100px;
    // background-color: yellowgreen;
    .input-file {
      display: none;
    }
    .left {
      margin-right: 30px;
    }
    .right {
      cursor: pointer;
      font-weight: 400;
      font-size: 14px;
      color: #66b1ff;
    }
  }
}
</style>