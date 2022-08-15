<!-- 添加课程附件 -->
<template>
  <div class="AddAttachView">
    <Head>
      <template slot="title">
        <div id="title">添加课程附件</div>
      </template>
    </Head>
    <div class="box">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="value">
          <!-- <img :src="userInfo.avatar" alt="" /> -->
          <el-form-item label="附件">
            <el-button type="primary">上传附件</el-button>
            <span class="warn"
              ><i class="el-icon-warning"></i
              >支持zip,pdf,jpeg,jpg,gif,png,md,doc,txt,csv格式文件，上传附件大小不能超过10M。</span
            >
          </el-form-item>
        </div>
        <el-form-item label="附件名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="bottomBox">
        <div class="btns">
          <el-button type="primary">保存</el-button>
          <el-button>取消</el-button>
        </div>
      </div>
    </div>
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
      // 上传文件
      file: "",
      //课程id

      ruleForm: {
        name: "",
      },
      rules: {
        name: [{ required: true, message: "附件名不能为空", trigger: "blur" }],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 上传文件
    // http://1.14.239.98/backend/api/v1/course_attach
    sendFile: function (event) {
      let file = new FormData();
      file.append("file", event.target.files[0]);
      console.log(event);
    },

    // 打开文件
    getFile() {
      this.$refs.file.click();
    },
    // 获取文件
    handleFileUpload(event) {
      // 阻止发生默认行为
      event.preventDefault();
      let formData = new FormData();
      let file = this.$refs.file.files[0];
      formData.append("file", file);
      // console.log(formData.get('file'))
      this.onUpload(formData);
    },
    // 上传文件
    onUpload() {
      this.$request.post(`course_attach`, {
        file: "(二进制)",
        name: ali.png,
        course_id: 256,
      });
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
.AddAttachView {
  background-color: white;
  padding: 30px;
  padding-top: 10px !important;
  margin-bottom: 90px;
  border-radius: 15px;
  .box {
    padding-left: 100px;
    .value {
      position: relative;
      .warn {
        position: absolute;
        left: 110px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
      }
      .input-avatar {
        position: absolute;
        top: 0;
        left: 100px;
        opacity: 0;
        width: 100px;
        height: 45px;
        // background-color: yellow;
        // border-radius: 50%;
      }
    }

    /deep/.el-input {
      width: 370px !important;
    }
    /deep/ .el-input__inner {
      width: 370px !important;
    }
  }
  .bottom {
    float: left;
    height: 1px;
    width: 100%;
    .bottomBox {
      position: fixed;
      width: 100%;
      // width: 1000px;
      height: 80px;
      bottom: 0;
      right: 0;
      z-index: 2000;
      left: 200px;
      line-height: 80px;
      background-color: white;
      .btns {
        position: absolute;
        bottom: 0px;
        left: 30px;

        /deep/.el-button {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>