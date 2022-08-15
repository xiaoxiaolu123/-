<!-- 添加管理员 -->
<template>
    <div class="box">
        <FanHui :msg="'添加管理员'"></FanHui>
        <!-- <div> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色" prop="">
                <el-select v-model="value1" multiple placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.display_name"> </el-option>
                </el-select>
                <el-link type="primary" @click.stop="RoleManagement">角色管理</el-link>
            </el-form-item>
            <el-form-item label="姓名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="mailbox">
                <el-input v-model="ruleForm.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <div class="denIu"><span>禁止登录</span> <el-switch v-model="ruleForm.is_ban_login" active-color="#409eff" inactive-color="#dcdfe6"> </el-switch></div>
            <div class="bottom-form">
                <el-form-item>
                    <el-button type="primary" :plain="true" @click.stop="handleSubmit">保存</el-button>
                    <el-button @click.stop="Cancel">取消</el-button>
                </el-form-item>
            </div>
        </el-form>
        <!-- </div> -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FanHui from "@/components/FanHui.vue";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        FanHui,
    },
    data() {
        //这里存放数据
        return {
            value: false,
            ruleForm: {
                username: "",
                password: "",
                password_confirmation: "",
                mailbox: "",
                is_ban_login: "1",
                delivery: false,
                type: [],
                resource: "",
                desc: "",
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: "姓名不能为空",
                        trigger: "blur",
                    },
                ],
                password: [
                    {
                        required: true,
                        message: "密码不能为空",
                        trigger: "blur",
                    },
                ],
                mailbox: [
                    {
                        required: true,
                        message: "邮箱不能为空",
                        trigger: "blur",
                    },
                ],
            },
            options: [],
            value1: [],
            value2: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合

    methods: {
      async  handleSubmit() {
          let re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{12,25}$/;
            // 获取form表单，调用校验方法
           await  this.$request
                .post("administrator", {
                    email: this.ruleForm.mailbox,
                    is_ban_login: this.ruleForm.is_ban_login,
                    name: this.ruleForm.username,
                    password: this.ruleForm.password,
                    password_confirmation: this.ruleForm.password_confirmation,
                    role_id: this.ruleForm.options,
                })
                .then((res) => {
                    // console.log(res);
                    if (res.status == 0) {
                        // 本地存token
                        // localStorage.setItem("admin-token", res.data.token);
                        this.$router.push({
                            name: "system-administrator",
                        });
                    } else if (res.status == 500) {
                        // this.getCaptcha();
                        this.$message.error(res.message);
                       
                    } else {
                        return false;
                    }
                });
        },

        RoleManagement() {
            this.$router.push({
                path: "/system/adminroles",
            });
        },
        Cancel() {
            this.$router.push({
                path: "/system/system-administrator",
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                } else {
                    // console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        async getParameters(params) {
            let arr = await this.$request.get("administrator/create", { params }).then((res) => {
                // console.log(JSON.parse(JSON.stringify(res.data)));
                // console.log(res.data);
                this.options = res.data.roles;
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getParameters();
    },
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
.box {
    width: 100%;
    height: auto;
    float: left;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 90px;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    min-width: 1180px;
    .denIu {
        margin-left: 30px;
        margin-top: 30px;
        font-size: 16px;
        span {
            padding-right: 15px;
            clear: #606266;
        }
    }
    /deep/.el-form.demo-ruleForm {
        margin-left: 120px;
        font-size: 16px;
        margin-bottom: 30px;
    }
    /deep/.el-input__inner {
        width: 350px;
        height: 45px;
    }
    /deep/.el-link--inner {
        margin-left: 18px;
        font-size: 17px;
    }
    /deep/.el-form-item__label {
        font-size: 16px;
    }
    .bottom-form {
        position: fixed;
        bottom: 0;
        height: 95px;
        left: 200px;
        right: 0;
        z-index: 2000;
        box-sizing: border-box;
        padding-top: 28px;
        padding-bottom: 20px;
        padding-left: 0px;
        background-color: #fff;
        display: flex;
        box-shadow: 0 -2px 4px 0 hsl(0deg 0% 40% / 5%);
        /deep/.el-form-item {
            // padding-left: 30px;
            margin-left: -80px;
        }
        /deep/.el-button {
            font-weight: 400;
            height: 45px;
            width: 80px;
            font-size: 16px;
            margin-right: 20px;
        }
    }
}
</style>
