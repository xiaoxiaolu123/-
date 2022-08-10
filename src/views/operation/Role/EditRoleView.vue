<!--  -->
<template>
    <div class="editrole">
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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="VIP名" prop="name">
                        <el-input v-model="ruleForm.name" placeholder="VIP名" style="width:200px"></el-input>
                    </el-form-item>

                    <el-form-item label="天数" prop="days">
                        <template>
                            <el-input v-model="ruleForm.expire_days" placeholder="天数" type="number"
                                style="width:200px;margin-right: 20px;">
                            </el-input>
                            <i class="el-icon-info"></i>
                            <span>决定用户购买VIP之后可享受的天数。</span>
                        </template>
                    </el-form-item>

                    <el-form-item label="价格" prop="price">
                        <template>
                            <el-input v-model="ruleForm.charge" type="number" placeholder="价格"
                                style="width:200px;margin-right: 20px;">
                            </el-input>
                            <i class="el-icon-info"></i>
                            <span>请输入整数</span>
                        </template>
                    </el-form-item>

                    <el-form-item label="显示" prop="delivery">
                        <el-switch v-model="ruleForm.is_show" style="margin-right: 20px;"></el-switch>
                        <i class="el-icon-info"></i>
                        <span>控制用户否能够看到并购买该VIP</span>
                    </el-form-item>

                    <el-form-item label="描述" prop="desc">
                        <el-input type="textarea" v-model="ruleForm.description"
                            style="width:400px;min-height: 33px;height: 120px;" :autosize="{ minRows: 5, maxRows: 10 }">
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
            id: '',
            rules: {
                name: [
                    { required: true, message: 'VIP名不能为空', trigger: 'blur' },
                ],
                days: [
                    { required: true, message: '天数不能为空', trigger: 'blur' },
                ]
            },
            ruleForm: {}
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
        save: function () {
            this.ruleForm.is_show = this.ruleForm.is_show ? 1 : 0;
            this.$request.put("/role/" + this.id, this.ruleForm).then((res) => {
                if (res.status == 0) {
                    this.$router.go(-1);
                }
            })
        },
        cancel: function () {
            this.$router.go(-1);
        }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    async created() {
        this.id = this.$route.query.id
        let res = await this.$request.get('role/' + this.id);
        this.ruleForm = res.data;
        this.ruleForm.is_show = this.ruleForm.is_show == 1 ? true : false;
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
.editrole {
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