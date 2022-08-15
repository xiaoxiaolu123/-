<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="编辑学员标签">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">编辑学员标签</div>
        </div>

        <div class="float-left">
            <el-form ref="form" :model="form" :rules="rules" label-width="200px">
                <el-form-item label="标签名" prop="name">
                    <el-input v-model="form.name" class="w-200"></el-input>
                </el-form-item>
            </el-form>
        </div>

        <!-- 保存   取消 -->
        <div class="bottom-menus">
            <div class="bottom-menus-box">
                <el-button type="primary" class="save" @click.stop="formValidate">保存</el-button>
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
            form: {
                name: null,
            },

            rules: {
                name: [
                    {
                        required: true,
                        message: "请输入标签名",
                        trigger: "blur",
                    },
                ],
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
                .get("http://1.14.239.98/backend/api/v1/member/tag/" + this.id, {
                    params: {},
                })
                .then((res) => {
                    this.form = res.data;
                });
        },

        formValidate() {
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    this.preservation();
                }
            });
        },

        // 保存
        preservation() {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .put("http://1.14.239.98/backend/api/v1/member/tag/" + this.id, {
                    name: this.form.name,
                })
                .then(() => {
                    this.$message.success("保存成功");

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
        console.log(this.id);

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
}
</style>
