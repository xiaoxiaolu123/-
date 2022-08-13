<!--新建录播课程 -->
<template>
  <div class="createCourse">
    <div class="top">
      <!-- 头部 -->
      <div class="headBox">
        <Head>
          <template slot="title">
            <div id="title">新建录播课程</div>
          </template>
        </Head>
      </div>
      <!-- 表单部分 -->
      <div class="body">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <div class="line1">
            <el-form-item label="所属分类" prop="region">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option
                  v-for="item in course"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <div class="btn" @click.stop="gotoManagementView">分类管理</div>
          </div>
          <div class="lin2">
            <el-form-item label="课程名称" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
          </div>
          <!-- 课程是否免费 -->
          <div class="lin3">
            <span class="title">课程免费</span>
            <el-switch v-model="value1"></el-switch>
            <span class="warn"
              ><i class="el-icon-warning"></i>打开后课程免费学习</span
            >
          </div>
          <!-- 课程价格 -->
          <div class="lin4" v-if="!value1">
            <el-form-item label="课程价格" prop="charge">
              <div class="input">
                <el-input
                  type="number"
                  placeholder="单位：元"
                  v-model="ruleForm.charge"
                ></el-input>
              </div>
              <span class="warn"
                ><i class="el-icon-warning"></i>最小单位“元”，不支持小数</span
              >
            </el-form-item>
          </div>
          <!-- 上传封面 -->
          <div class="lin5">
            <el-form-item prop="thumb" label="课程封面">
              <el-button @click.stop="sendImg">上传封面</el-button>
              <span class="warn"
                ><i class="el-icon-warning"></i
                >长宽比4:3，建议尺寸：400x300像素</span
              >
              <div class="imgBox" v-if="ruleForm.thumb">
                <img :src="ruleForm.thumb" alt="" />
              </div>
            </el-form-item>
          </div>
          <!-- 上架时间 -->
          <div class="lin6">
            <el-form-item label="上架时间" prop="published_at">
              <el-date-picker
                style="width: 300px"
                v-model="ruleForm.published_at"
                type="datetime"
                format="yyyy-MM-dd HH:mm"
                value-format="yyyy-MM-dd HH:mm"
                placeholder="请选择日期"
              >
              </el-date-picker>
              <span class="warn"
                ><i class="el-icon-warning"></i
                >上架时间越早，课程排序越靠后</span
              >
            </el-form-item>
          </div>
          <!-- 是否隐藏课程 -->
          <div class="lin3">
            <span class="title">隐藏课程</span>
            <el-switch v-model="value2"></el-switch>
            <span class="warn"
              ><i class="el-icon-warning"></i>打开后课程在前台将隐藏显示</span
            >
          </div>
          <!-- 简短介绍 -->
          <div class="lin7">
            <el-form-item prop="textarea" label="简单介绍">
              <el-input
                type="textarea"
                placeholder="请填写课程简单介绍"
                v-model="ruleForm.textarea"
                maxlength="150"
              >
              </el-input>
            </el-form-item>
          </div>
          <!-- 详情介绍 -->
          <div class="lin8">
            <el-form-item prop="original_desc" label="详情介绍">
              <div class="w-800px">
                <quill-editor
                  :height="400"
                  v-model="ruleForm.original_desc"
                ></quill-editor>
              </div>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
    <div class="bottom">
      <div class="bottomBox">
        <div class="btns">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >保存</el-button
          >
          <el-button @click="returnBack">取消</el-button>
        </div>
      </div>
    </div>
    <!-- 选择图片弹窗 -->
    <div class="mask">
      <SelectImg @childSendDate="getData" :sendState="state"></SelectImg>
    </div>
  </div>
</template>

<script>
import QuillEditor from "@/components/quill-editor";
import Head from "@/components/ReturnBackHead.vue";
import SelectImg from "@/components/SelectImg.vue";
import { mapState } from "vuex";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
    QuillEditor,
    SelectImg,
  },
  data() {
    //这里存放数据
    return {
      // 是否免费按钮
      value1: false,
      // // 免费状态隐藏价格
      // price:0,
      // 课程隐藏按钮
      value2: false,
      //   设置价格
      num: 1,
      // 1 开
      is_free: 0,
      // 1 关
      is_show: 0,
      // 存储数据
      ruleForm: {
        // 所属分类
        region: "",
        // 课程名
        name: "",
        // 价格
        charge: null,
        // 封面
        thumb: "",
        // 上架时间
        published_at: null,
        // 简介
        textarea: "",
        // 详细介绍
        original_desc: null,
      },
      rules: {
        // 提示框
        // 课程情况
        region: [
          {
            required: true,
            message: "",
            trigger: "blur",
          },
        ],
        // 课程名
        name: [{ required: true, message: "课程名不能为空", trigger: "blur" }],
        // 课程价格
        charge: [
          {
            required: true,
            message: "价格不能为空",
            trigger: "blur",
          },
        ],
        // 上传封面
        thumb: [
          {
            required: true,
            message: "请上传课程封面",
            trigger: "blur",
          },
        ],
        // 上架时间
        published_at: [
          {
            required: true,
            message: "上架时间不能为空",
            trigger: "blur",
          },
        ],
        // 简短介绍
        textarea: [
          {
            required: true,
            message: "简短介绍不能为空",
            trigger: "blur",
          },
        ],
        // 详细介绍
        original_desc: [
          {
            required: true,
          },
        ],
        // 自定义的获取到数据
        // courseInfo: {},
      },
      // 课程数据
      course: {},
      // 子组件获取的图片
      img: "",
      // 图片选择弹窗状态
      state: false,
      // 子组件传过来的数据
      childDate: {},
    };
  },
  //监听属性 类似于data概念
  computed: {
    // vuex数据
    // ...mapState({
    //   // 下拉框信息
    //   course: (state) => {
    //     let info = state.course.courseInfo.categories;
    //     // console.log(state.course.courseInfo.categories);
    //     return info;
    //   },
    // }),
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.value1 == true) {
            this.is_free = 1;
            this.ruleForm.charge = 0;
          } else {
            this.is_free = 0;
          }
          if (this.value2 == true) {
            this.is_show = 0;
          } else {
            this.is_show = 1;
          }
          this.$request
            .post(`course`, {
              category_id: this.ruleForm.region,
              title: this.ruleForm.name,
              charge: this.ruleForm.charge,
              description: null,
              is_free: this.is_free,
              is_show: this.is_show,
              original_desc: this.ruleForm.original_desc,
              published_at: this.ruleForm.published_at,
              render_desc: this.ruleForm.original_desc,
              short_description: this.ruleForm.textarea,
              thumb: this.ruleForm.thumb,
              user_count: null,
            })
            .then((res) => {
              this.open();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    // 返回
    returnBack: function () {
      this.$router.go(-1);
    },
    // 跳转管理分类页面
    gotoManagementView: function () {
      this.$router.push({ path: "category/index" });
    },
    // 接收子组件数据（state  和 图片id）
    getData: function (data) {
      this.childDate = data;
      this.state = this.childDate.childSate;
      this.ruleForm.thumb = this.childDate.imgUrl;
      console.log(this.ruleForm.thumb);
    },
    // 上传图片
    sendImg: function () {
      this.$nextTick(() => {
        this.state = !this.state;
        // console.log(this.state);
      });
    },
    // 弹窗确定
     open() {
        this.$confirm('新建录播课成功，请在课程中添加课时排课吧！', {
          confirmButtonText: '立即排课',
          cancelButtonText: '暂不排课',
        }).then(() => {

          this.$router.push({
            path:"video/index"
          })
        }).catch(() => {
         console.log(2222)
        })     
      },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    await this.$request.get(`course/create`).then((res) => {
      let categories = res.data.categories;
      let box = [];
      for (let i = 0; i < categories.length; i++) {
        if (categories[i].children.length > 0) {
          box.push(categories[i]);
          let children = categories[i].children;
          for (let j = 0; j < children.length; j++) {
            children[j].name = "|----" + children[j].name;
            box.push(children[j]);
          }
        } else {
          box.push(categories[i]);
        }
      }
      this.course = box;
    });

    // this.getCourse();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    // this.show();
  },
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
.createCourse::after {
  content: "";
  display: block;
  clear: both;
}
.createCourse {
  width: 100%;
  overflow: hidden;
  position: relative;
  // background-color: blueviolet;
  .top::after {
    content: "";
    display: block;
    clear: both;
  }
  .top {
    overflow: hidden;
    // margin: 20px 5px 20px 20px;
    width: 100%;
    height: auto;
    float: left;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 110px;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    min-width: 1180px;
    .head {
      width: 100%;
      height: 50px;
      background-color: white;
      .left {
        float: left;
        line-height: 100%;
        .back {
          float: left;
          font-size: 14px;
        }
        .line {
          float: left;
          display: block;
          width: 2px;
          height: 14px;
          background-color: #d8d8d8;
          margin-right: 15px;
          margin-left: 15px;
        }
        .title {
          font-weight: bold;
        }
      }
    }
    .body {
      overflow: hidden;
      // position: relative;
      width: 100%;
      height: auto;
      float: left;
      padding-left: 100px;
      .warn {
        color: rgba(0, 0, 0, 0.5);
        font-size: 14px;
      }
      .line1 {
        width: 480px;
        position: relative;
        /deep/ .el-select {
          width: 300px;
          height: 40px;
          position: absolute;
          left: 10px;
          // background-color: red;
        }
        .btn {
          position: absolute;
          height: 40px;
          line-height: 40px;
          color: #409eff;
          right: 0px;
          top: 0px;
        }
        .btn:hover {
          border-bottom: 1px solid #409eff;
        }
      }
      .lin2 {
        width: 450px;
        /deep/ .el-input {
          width: 300px;
          height: 40px;
          position: absolute;
          left: 10px;
          // background-color: red;
        }
        .lin3 {
          width: 200px;
        }
      }
      .lin3::after {
        content: "";
        display: block;
        clear: both;
      }
      .lin3 {
        margin-bottom: 30px;
        display: flex;
        // background-color: violet;
        .title {
          margin-right: 25px;
          margin-left: 30px;
        }
        /deep/ .el-switch {
          margin-right: 10px;
        }
        .warn {
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .lin4 {
        display: flex;
        flex-wrap: nowrap;
        .input {
          width: 200px;
        }
        /deep/ .el-input {
          width: 200px;
          .el-input-number {
            position: absolute;
            left: 10px;
          }
        }
        /deep/ .el-form-item__content {
          width: 390px;
        }
        .warn {
          position: absolute;
          top: 0px;
          right: 0px;
        }
      }
      // 上传封面
      .lin5 {
        // background-color: royalblue;
        position: relative;
        .el-form-item {
          // background-color: saddlebrown;
          position: relative;
          .el-button {
            position: absolute;
            left: 0px;
          }
          .warn {
            position: absolute;
            left: 110px;
          }
          .imgBox {
            // background-color: yellow;
            width: 200px;
            height: 150px;
            margin-top: 60px;
            margin-left: 0px;
            margin-bottom: 0px;
            img {
              width: 200px;
              height: 150px;
            }
          }
        }
      }
      // 上架时间
      .lin6 {
        position: relative;
        /deep/ .el-form-item {
          // background-color: saddlebrown;
          position: relative;
        }
        /deep/.el-date-editor.el-input,
        .el-date-editor.el-input__inner {
          // background-color: yellow;
          position: absolute;
          left: 0px;
        }
        .warn {
          position: absolute;
          left: 310px;
        }
      }
      .lin7 {
        /deep/ .el-form-item {
          .shortIntroduce {
            height: 96px;
            width: 800px;
          }
        }
        /deep/ .el-textarea {
          position: relative;
          height: 96px !important;
          width: 100%;
        }
        /deep/ .el-textarea__inner {
          height: 100%;
        }
      }
    }
  }
  .bottom::after {
    content: "";
    display: block;
    clear: both;
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
  .mask {
    // display: none;
  }
}
</style>