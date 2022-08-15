<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="积分变动">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">积分变动</div>
        </div>

        <div class="form-box border-top-left-radius">
            <el-form ref="form" :rules="rules" :model="form" label-width="200px">
                <el-form-item prop="credit1">
                    <span slot="label">
                        <span class="span-box">
                            <span>变动额度</span>
                            <i class="el-icon-question ml-5"></i>
                        </span>
                    </span>
                    <el-input class="w-200" v-model="form.credit1"></el-input>
                </el-form-item>

                <el-form-item label="变动说明" prop="remark">
                    <el-input type="textarea" v-model="form.remark" class="w-300"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <!-- 确认   取消 -->
        <div class="bottom-menus">
            <div class="bottom-menus-box">
                <el-button type="primary" class="save" @click.stop="formValidate">确认</el-button>
                <el-button type="default" class="ml-24" @click.stop="goBack">取消</el-button>
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
            id: null,
            user: null,

            rules: {
                credit1: [
                    {
                        required: true,
                        message: "请输入变动额度",
                        trigger: "blur",
                    },
                ],
                remark: [
                    {
                        required: true,
                        message: "请输入变动说明",
                        trigger: "blur",
                    },
                ],
            },

            form: {
                credit1: null,
                remark: null,
            },

            loading: false,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // 返回上一页
        goBack: function () {
            // window.history.go(-1)
            // 表示返回上一页
            this.$router.go(-1);
        },

        //获取学员数据
        getUser() {
            this.$request
                .get("http://1.14.239.98/backend/api/v1/member/" + this.id, {
                    params: {},
                })
                .then((res) => {
                    this.user = res.data;
                });
        },

        formValidate() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.submitModification();
                }
            });
        },

        // 提交修改后的学员信息
        submitModification() {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .post("http://1.14.239.98/backend/api/v1/member/credit1/change", {
                    credit1: this.form.credit1,
                    remark: this.form.remark,
                    user_id: this.id,
                })
                .then(() => {
                    this.$message.success("提交成功");
                    this.loading = false;

                    // 表示返回上一页
                    this.$router.go(-1);
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.message);
                });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.id = this.$route.params.id;

        this.getUser();
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
.meedu-main-body {
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
    .back-bar-box {
        width: 100%;
        height: auto;
        float: left;
        display: flex;
        align-items: center;
        // 返回
        .btn-back {
            font-size: 14px;
            font-weight: 400;
            color: #333;
            cursor: pointer;
        }
        // 分割线
        .line {
            width: 1px;
            height: 14px;
            background-color: #d8d8d8;
            margin-right: 15px;
            margin-left: 15px;
        }
        // 标题
        .name {
            font-size: 14px;
            font-weight: 600;
            color: #333;
        }
    }

    .float-left {
        width: 100%;
        height: auto;
        float: left;
    }
    .bg-white {
        background-color: #fff;
    }
    .br-15 {
        border-radius: 15px;
    }
    .p-30 {
        box-sizing: border-box;
        padding: 30px;
    }
    .w-200 {
        width: 200px;
    }
    .w-300 {
        width: 300px;
    }
}
</style>
