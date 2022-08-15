<!-- 添加课时 -->
<template>
  <div class="CreateVideoView">
    <Head>
      <template slot="title">
        <div class="title">添加课时</div>
      </template>
    </Head>
    <!-- 表单 -->
    <div class="tabBox">
      <el-tabs v-model="activeName">
        <el-tab-pane label="基础信息" name="first">
          <div class="box1">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <!-- 上传课时 -->
              <div class="line line1">
                <el-form-item label="上传视频" prop="sendVideo">
                  <el-button type="primary">上传视频</el-button>
                  <el-input v-model="ruleForm.sendVideo"></el-input>
                </el-form-item>
              </div>

              <!-- 课程名称 -->
              <div class="line line2">
                <el-form-item label="课时名称" prop="courseName">
                  <el-input
                    v-model="ruleForm.courseName"
                    placeholder="请输入课时名称"
                  ></el-input>
                </el-form-item>
              </div>
              <!-- 课时时长 -->
              <div class="line line3">
                <el-form-item label="课时时长" prop="duration">
                  <!-- 要隐藏的文本框 -->
                  <input class="hiddenText" v-model="ruleForm.duration" />

                  <el-input-number
                    v-model="num1"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                  时
                  <el-input-number
                    v-model="num2"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                  分
                  <el-input-number
                    v-model="num3"
                    @change="handleChange"
                    :min="1"
                    :max="10"
                    label="描述文字"
                  ></el-input-number>
                  秒
                  <span class="warn"
                    ><i class="el-icon-warning"></i
                    >请输入整数。小数排在前面，大数排在后面。</span
                  >
                  <!-- <el-input v-model="ruleForm.name" placeholder="请输入课时名称"></el-input> -->
                </el-form-item>
              </div>
              <!-- 所属章节 -->
              <div class="line line4">
                <el-form-item label="所属章节" prop="section">
                  <el-select
                    v-model="ruleForm.section"
                    placeholder="请选择章节"
                  >
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <!-- 上架时间 -->
              <div class="line lin5">
                <el-form-item label="上架时间" prop="product_at">
                  <div class="block">
                    <el-date-picker
                      v-model="ruleForm.product_at"
                      type="datetime"
                      placeholder="选择日期时间"
                    >
                    </el-date-picker>
                    <span class="warn"
                      ><i class="el-icon-warning"></i
                      >上架时间越早，课时排序越靠前</span
                    >
                  </div>
                </el-form-item>
              </div>
            </el-form>
          </div>
        </el-tab-pane>

        <el-tab-pane label="可选信息" name="second">
          <div class="box2">
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="禁止快进播放" prop="playSpeed">
                <el-switch v-model="ruleForm.playSpeed"></el-switch>
                <span class="warn"
                  ><i class="el-icon-warning"></i
                  >打开后学员学习此课时无法快进。</span
                >
              </el-form-item>
              <el-form-item label="隐藏课时" prop="hiddenCourse">
                <el-switch v-model="ruleForm.hiddenCourse"></el-switch>
                <span class="warn"
                  ><i class="el-icon-warning"></i
                  >打开后课时在前台将隐藏显示。</span
                >
              </el-form-item>
              <!-- 阿里云视频文件ID -->
              <el-form-item label="阿里云视频文件ID" prop="ALiVideo">
                <el-input v-model="ruleForm.ALiVideo"></el-input>
              </el-form-item>

              <el-form-item label="腾讯云视频文件ID" prop="TencentVideo">
                <el-input v-model="ruleForm.TencentVideo"></el-input>
              </el-form-item>

              <el-form-item label="视频URL" prop="videoURL">
                <el-input v-model="ruleForm.videoURL"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="bottomBox">
        <div class="btns">
          <el-button type="primary">保存</el-button>
          <el-button @click.stop="cancel">取消</el-button>
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
      // 默认高亮第一个标题导航
      activeName: "first",
      num1: 0,
      num2: 0,
      num3: 0,
      ruleForm: {
        // 上传视频
        sendVideo: "",
        // 课时名称
        courseName: "",
        // 课时时长
        duration: "",
        // 所属章节
        section: "",
        // 上架时间
        product_at: "",
        // 可选信息
        // 是否可快进播放
        playSpeed:"",
        // 是否隐藏课时
        hiddenCourse:"",
        // 阿里视频
        ALiVideo:"",
        // 腾讯视频
        TencentVideo:"",
        // 视频地址
        videoURL:"",
      },
      rules: {
        // 基础信息部分
        // 上传视频
        sendVideo: [{ required: true, message: "请上传视频", trigger: "blur" }],
        // 课时名称
        courseName: [
          { required: true, message: "视频名不能为空", trigger: "blur" },
        ],
        // 课时时长
        duration: [
          { required: true, message: "视频时长不能为空", trigger: "blur" },
        ],
        // 所属章节
        section: [{ required: true, message: "章节不能为空", trigger: "blur" }],
        // 上架时间
        product_at: [
          { required: true, message: "上架时间不能为空", trigger: "blur" },
        ],
        // 可选信息
        // 是否可快进播放
        playSpeed:"",
        // 是否隐藏课时
        hiddenCourse:"",
        // 阿里视频
        ALiVideo:"",
        // 腾讯视频
        TencentVideo:"",
        // 视频地址
        videoURL:"",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleChange(value) {
      console.log(value);
    },
    cancel: function () {
      this.$router.go(-1);
    },
    // 添加课时
    // http://1.14.239.98/backend/api/v1/video          // aliyun_video_id: null// ban_drag: 0// chapter_id: 28// charge: 99
    // course_id: "118"// duration: 3600// free_seconds: 3600// is_ban_sell: 1// is_show: 1// published_at: "2022-08-15 00:00:00"
    // short_description: null// tencent_video_id: null// title: "1"// url: null
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
<style  lang="less" scoped>
.CreateVideoView {
  min-width: 1180px;
  background-color: white;
  border-radius: 15px;
  overflow: hidden;
  padding: 20px 5px 20px 20px;
  padding-bottom: 0px !important;
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
      padding-left: 130px;
      width: 100%;
      .line {
        margin-bottom: 22px;
      }
      .line1 {
        /deep/ .el-input {
          display: none;
        }
      }
      .line2 {
        /deep/ .el-input {
          width: 300px !important;
        }
      }
      .line3 {
        .hiddenText {
          // background-color: hotpink;
          margin-top: 10px;
          // opacity: 0;
          height: 16px;
          width: 130px;
          // background-color: greenyellow;
          position: absolute;
          border: 0px !important;
          top: 0;
        }
        /deep/ .el-input-number {
          width: 130px !important;
          height: 32px !important;
          line-height: 32px !important;
        }
        /deep/ .el-input__inner {
          height: 32px !important;
          line-height: 32px !important;
        }
        /deep/ .el-form-item__content {
          line-height: 40px !important;
        }
        .warn {
          margin-left: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
      .lin5 {
        .warn {
          margin-left: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .box2 {
      height: 50px;
      width: 100%;
      background-color: greenyellow;
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