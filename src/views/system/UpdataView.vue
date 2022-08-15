<template>
    <div class="box">
    <FanHui :msg="'编辑管理员角色'"></FanHui>
<!-- <div> -->
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 

  <el-form-item label="角色名" prop="username">
    <el-input v-model="ruleForm.display_name"></el-input>
  </el-form-item>
 <el-form-item label="描述" prop="describe">
    <el-input v-model="ruleForm.description"></el-input>
  </el-form-item>
   <div class="block">
                <span class="demonstration">权限</span>
                <el-cascader :options="options" :props="props" clearable></el-cascader>
            </div>
 <div class="bottom-form">
    <el-form-item>
    <el-button type="primary" @click.stop="getDetail">保存</el-button>
    <el-button @click="resetForm">取消</el-button>
  </el-form-item>
 </div>
   
</el-form>
<!-- </div> -->
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import FanHui from '@/components/FanHui.vue';
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
                // username: "",
                // slug: "",
                // describe: "",
                // permissions:[],
                // is_ban_login: "1",
                // delivery: false,
                // type: [],
                // resource: "",
                // desc: "",
            },
            rules: {
               username: [
                    {
                        required: true,
                        message: "角色名不能为空",
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
            options: [],
     props: { multiple: true },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      resetForm(){
       this.$router.push({
                        path: "/system/adminroles",
                    });
      },
        RoleManagement() {
            this.$router.push({
                path: "/system/adminroles",
            });
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
        getDetail() {
      this.$request
                .put(`administrator_role/${this.$route.query.id}`, {
                    display_name: this.ruleForm.display_name,
                    description: this.ruleForm.description,
               id:this.ruleForm.id,
               permission_ids:this.ruleForm.permission_ids,
                  
                })
                .then(() => {
                    if (this.ruleForm.display_name.length == 0 || this.ruleForm.description == 0) {
                        this.$message.error(data.message);
                        return;
                    }
                    this.$message({
                        type: "success",
                        message: "编辑成功",
                    });
                    this.$router.push({
                        path: "/system/adminroles",
                    });
                })
                .catch((e) => {
                    this.$message.error("编辑失败");
                });
    },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
        this.getParameters();
  let arr = await this.$request.get(`administrator_role/${this.$route.query.id}`);
        this.ruleForm = arr.data;
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
   
    /deep/.el-cascader > .el-input--suffix > .el-input__inner {
        width: 1100px;
        margin-left: 16px;
    }
    /deep/.el-cascader__tags{
        padding-left: 22px;
}
}
</style>