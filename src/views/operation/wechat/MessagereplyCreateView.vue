<!-- 新建自动回复 -->
<template>
  <div class="create">
    <div class="meedu-main-body">
      <div class="top">
        <div class="btn-back" @click="goBack">
          <i class="el-icon-back"></i>
          返回
        </div>
        <div class="line"></div>
        <div class="name">编辑VIP</div>
      </div>

      <div class="bottom">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="信息类型" prop="name">
            <el-select v-model="ruleForm.type" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.type"
                :label="item.label"
                :value="item.type"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="触发关键字" v-if="ruleForm.type == 'text'">
            <el-input
              style="width: 220px; margin-right: 20px"
              v-model="ruleForm.rule"
              placeholder="请输入触发关键字"
              size="normal"
            >
            </el-input>
            <i class="el-icon-info"></i>
            <span style="color: rgba(0, 0, 0, 0.5)">支持正则表达式</span>
          </el-form-item>

          <el-form-item
            label="信息类型"
            prop="name"
            v-if="ruleForm.type != 'text'"
          >
            <el-select v-model="ruleForm.event_type" placeholder="请选择">
              <el-option
                v-for="item in eventOptions"
                :key="item.event_type"
                :label="item.label"
                :value="item.event_type"
              >
              </el-option>
            </el-select>
          </el-form-item>
              <el-form-item label="事件Key" v-if="ruleForm.type != 'text'">
            <el-input
              style="width: 400px; margin-right: 20px"
              v-model="ruleForm.event_key"
              placeholder="请输入触发关键字"
              size="normal"
            >
            </el-input>
          </el-form-item>

          <el-form-item label="回复内容" prop="reply_content">
            <el-input
              type="textarea"
              v-model="ruleForm.reply_content"
              placeholder="请输入回复内容"
              style="width: 400px; min-height: 33px; height: 120px"
              :autosize="{ minRows: 5, maxRows: 10 }"
            >
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="bottom-menus-box">
        <el-button type="primary" size="default" @click="save">保存</el-button>
        <el-button size="default" @click="cancel">取消</el-button>
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
    return {
      options: [
        {
          type: "text",
          label: "文本消息",
        },
        {
          type: "subscribe",
          label: "事件",
        },
      ],
      eventOptions: [
        {
          event_type: "subscribe",
          label: "用户关注",
        },
        {
          event_type: "CLICK",
          label: "自定义菜单事件",
        },
      ],
      
      rules: {
        name: [{ required: true, trigger: "blur" }],
        reply_content: [
          { required: true, message: "回复内容不能为空" },
        ]
      },
      keyword: "",
      ruleForm: {
        event_type: "",
      event_key:'',
      reply_content:'',
      rule:'',
      type: "text",

      },
      
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
    cancel:function(){
        this.$router.go(-1);
    },
    save:function(){
        this.$request.post('mpWechatMessageReply',this.ruleForm).then(()=>{
            this.$router.push('/operate/message')
        })
    }
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
<style  lang='less' scoped>
.create {
  .meedu-main-body {
    width: 100%;
    height: auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 90px;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    min-width: 1180px;

    .top {
      display: flex;
      align-items: center;
      width: 100%;
      height: auto;
      margin-bottom: 30px;

      .btn-back {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        cursor: pointer;
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

    .bottom-menus-box {
      position: fixed;
      bottom: 0;
      left: 200px;
      right: 0;
      z-index: 2000;
      box-sizing: border-box;
      padding-top: 20px;
      padding-bottom: 20px;
      padding-left: 20px;
      background-color: #fff;
      display: flex;
      box-shadow: 0 -2px 4px 0 hsl(0deg 0% 40% / 5%);
    }
  }
}
</style>