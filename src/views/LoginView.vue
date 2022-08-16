<!--  -->
<template>
  <div class="login-container">
    <div class="login-container-left"></div>
    <div class="login-container-right">
      <div class="left-form">
        <h3 class="title">登录后台</h3>
        <el-form :model="form" ref="form" :rules="rules" label-width="0px" :inline="false" size="normal">
          <el-form-item prop="username">
            <el-input placeholder="请输入管理员账号" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入账户密码" v-model="form.password" show-password></el-input>
          </el-form-item>
          <el-form-item prop="captcha">
            <div class="flex">
              <div class="captcha">
                <el-input placeholder="请输入图形验证码" v-model="form.captcha"></el-input>
              </div>
              <div class="captcha-img" @click.stop="refreshCaptcha">
                <img :src="captcha.img" alt="" />
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.stop="handleSubmit">立即登录</el-button>
          </el-form-item>
        </el-form>
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
      form: {
        username: "",
        password: "",
        captcha: "",
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入用户密码",
            trigger: "blur",
          },
        ],
        captcha: [
          {
            validator: function (rule, value, callback) {
              if (!value) {
                callback(new Error("请输入验证码！"));
              } else {
                // 校验通过
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      },
      captcha: {
        img: "",
        key: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSubmit: function () {
      // 获取form表单，调用校验方法
      this.$refs["form"].validate((valid) => {
        if (valid) {
          this.$request
            .post("login", {
              image_captcha: this.form.captcha,
              image_key: this.captcha.key,
              password: this.form.password,
              username: this.form.username,
            })
            .then((res) => {
              // console.log(res);
              if (res.status == 0) {
                // 本地存token
                localStorage.setItem("admin-token", res.data.token);
                this.$router.push({
                  name: "DashboardHome",
                });
              } else if (res.status == 1) {
                this.getCaptcha();
                this.$message.error(res.message);
              }
            });
        } else {
          return false;
        }
      });
    },
    refreshCaptcha: function () {
      this.getCaptcha();
    },
    getCaptcha() {
      this.$request("captcha/image").then((res) => {
        this.captcha = res.data;
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCaptcha()
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  lang='less' scoped>
.login-container {
  width: 1000px;
  height: 600px;
  background: #fff;
  box-shadow: 20px 20px 100px 0 rgb(85 102 119 / 10%);
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: hidden;

  .login-container-left {
    width: 471px;
    height: 100%;
    background: url(../assets/login/loginleft_banner.png) no-repeat;
    background-size: 100% 100%;
    box-sizing: border-box;
  }

  .login-container-right {
    width: 529px;
    height: 100%;

    .left-form {
      margin-left: 0;
      padding: 0 35px 0 49px;
      background: #fff;

      .title {
        width: auto;
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #000;
        line-height: 24px;
        margin-top: 65px;
        margin-bottom: 80px;
      }

      .flex {
        display: flex;

        .captcha {
          width: 250px;

          /deep/.el-input__inner {
            width: 250px;
            height: 48px;
            border-radius: 4px;
            border: 1px solid #e5e5e5;
          }
        }

        .captcha-img {
          width: 120px;
          height: 48px;
          margin-left: 10px;
          cursor: pointer;

          img {
            width: 120px;
            height: 48px;
          }
        }
      }

      /deep/ .el-icon-view {
        margin-left: -160px;
      }

      /deep/.el-input__inner {
        width: 380px;
        height: 48px;
        border-radius: 4px;
        border: 1px solid #e5e5e5;
      }

      /deep/.el-input__inner:focus {
        border: 1px solid #3ca7fa;
      }

      .el-button--primary {
        width: 380px !important;
        height: 48px;
        background: #3ca7fa;
        border-color: #3ca7fa !important;
        border-radius: 4px;
        margin-top: 30px;
        font-size: 16px !important;
        font-weight: 400 !important;
      }

      .el-form-item {
        margin-bottom: 50px !important;
      }
    }
  }
}
</style>