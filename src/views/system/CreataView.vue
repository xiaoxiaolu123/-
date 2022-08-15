<!--  -->
<template>
    <div class="box">
        <FanHui :msg="'添加管理员角色'"></FanHui>
        <!-- <div> -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="角色名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="Slug" prop="slug">
                <el-input v-model="ruleForm.slug"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="describe">
                <el-input v-model="ruleForm.describe"></el-input>
            </el-form-item>
            <div class="block">
                <span class="demonstration">权限</span>
                <el-cascader :options="options" :props="props" clearable></el-cascader>
            </div>
            <div class="bottom-form">
                <el-form-item>
                    <el-button type="primary" @click.stop="UploadForm">保存</el-button>
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
            props: { multiple: true },//正确
            ruleForm: {
                username: "",
                slug: "",
                describe: "",
                permissions:[],
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
                        message: "角色名不能为空",
                        trigger: "blur",
                    },
                ],
                slug: [
                    {
                        required: true,
                        message: "Slug不能为空",
                        trigger: "blur",
                    },
                ],
                describe: [
                    {
                        required: true,
                        message: "描述不能为空",
                        trigger: "blur",
                    },
                ],
            },

            props: { multiple: true },
            options: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合

    methods: {
        UploadForm: function(){
this.$request.post('administrator_role',{
description: this.ruleForm.describe,
display_name: this.ruleForm.username,
permission_ids: this.ruleForm.permissions,
slug: this.ruleForm.slug,
}).then((res)=>{
    if(res.status==0){
        this.$router.push({
            name:'adminroles',
        });
    }else if(res.status==500){
        this.$message.error(res.message);

    }else{
        return false;
    }
})
        },
        async getParameters(params) {
            let res = await this.$request.get("administrator_role/create", { params });
            // console.log(JSON.parse(JSON.stringify(res.data)));
            // console.log(res.data);
            // this.options.push(res.data.permissions);
            this.label = res.data.permissions;
            let arr = [];
            let temp = 1;
            console.log("res.data.permissions===>", res.data.permissions);
            for (let item in res.data.permissions) {
                temp++;
                // console.log(item);
                // arr.push({
                //     value: temp,
                //     label: item,
                //     children: [],
                // });
                let children = [];
                res.data.permissions[item].forEach((element, index) => {
                    children.push({ value: element.id, label: element.display_name });
                }),
                    this.options.push({
                        value: temp,
                        label: item,
                        children,
                    });
            }
            console.log("this.options===>", this.options);
        },
        RoleManagement() {
            this.$router.push({
                path: "/system/adminroles",
            });
        },
        Cancel() {
            this.$router.push({
                path: "/system/adminroles",
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    alert("submit!");
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
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
    /deep/.demonstration {
        margin-left: 53px;
    }
    /deep/.el-cascader {
    }
    /deep/.el-cascader > .el-input--suffix > .el-input__inner {
        width: 1180px;
        margin-left: 16px;
    }
    /deep/.el-cascader__tags{
        padding-left: 22px;
}
}
</style>
