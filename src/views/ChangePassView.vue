<!--  -->
<template>
  <div class="changePass">
    <div class="meedu-main-body">
      <div class="bottom">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item>
            <span class="span">原密码</span>
            <el-form-item prop="old_password">
              <el-input
                type="password"
                style="width: 400px"
                v-model="ruleForm.old_password"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <span class="span">新密码</span>
            <el-form-item prop="new_password">
              <el-input
                type="password"
                style="width: 400px"
                v-model="ruleForm.new_password"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item > 
            <span class="span">确定新密码</span>
            <el-form-item prop="new_password_confirmation">
              <el-input
                type="password"
                style="width: 400px"
                v-model="ruleForm.new_password_confirmation"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </el-form-item>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="default" @click="save"
              >保存</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopVue from "@/components/Top.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: { TopVue },
  data() {
    //这里存放数据
    return {
      rules: {
        old_password: [{ required: true, message: "请输入原密码", trigger: "blur" }],
        new_password: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        new_password_confirmation: [
          { required: true, message: "请再输入一次新密码", trigger: "blur" },
        ],
       
      },
      ruleForm: {
        code: "",
        expired_at: "",
        invited_user_reward: "",
        use_times: "",
      },
      GMTToStr(time) {
        let date = new Date(time);
        let Str =
          date.getFullYear() +
          "-" +
          (date.getMonth() + 1) +
          "-" +
          date.getDate() +
          " " +
          date.getHours() +
          ":" +
          date.getMinutes() +
          ":" +
          date.getSeconds();
        return Str;
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    
    save: function () {

      this.$request.put("/administrator/password", this.ruleForm).then((res) => {
        if (res.status == 0) {
            this.$message.success('成功')
          this.$router.push("/");
        } else {
          this.$message.error(res.message);
        }
      });
    },
    cancel: function () {
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
<style>
.span::before{
 content: '*';
 color: red;
 margin-right: 5px;
}
</style>
<style  lang='less' scoped>
.changePass {
    
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