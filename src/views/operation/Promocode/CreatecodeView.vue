<!--  -->
<template>
    <div class="createcode">
        <div class="meedu-main-body">
            <top-vue title="添加优惠码"></top-vue>

            <div class="bottom">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="优惠码" prop="code">
                        <el-input v-model="ruleForm.code" placeholder="优惠码" style="margin-right: 20px;width:200px">
                        </el-input>
                        <i class="el-icon-info"></i>
                        <span>请勿使用大写U或者小写u开头</span>
                    </el-form-item>

                    <el-form-item label="到期时间" required>
                        <el-col :span="11">
                            <el-form-item prop="date1">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.expired_at"
                                    style="margin-right: 20px;width: 200px;display: inline-block;"></el-date-picker>
                                <i class="el-icon-info"></i>
                                <span>过期时间到了之后优惠码便无法使用了。</span>
                            </el-form-item>

                        </el-col>
                    </el-form-item>

                    <el-form-item label="面值" prop="invited_user_reward">
                        <template>
                            <el-input v-model="ruleForm.invited_user_reward" type="number" placeholder="面值"
                                style="width:200px;margin-right: 20px;">
                            </el-input>
                            <i class="el-icon-info"></i>
                            <span>请输入整数。不支持小数。可在收银台抵扣的金额。</span>
                        </template>
                    </el-form-item>

                    <el-form-item label="可使用次数" prop="use_times">
                        <template>
                            <el-input v-model="ruleForm.use_times" type="number" placeholder="可使用次数"
                                style="width:200px;margin-right: 20px;">
                            </el-input>
                            <i class="el-icon-info"></i>
                            <span>请输入整数。0意味着不限制。</span>
                        </template>
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
import TopVue from '@/components/Top.vue';
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {TopVue },
    data() {
        //这里存放数据
        return {
            rules: {
                code: [
                    { required: true, message: '优惠码不能为空', trigger: 'blur' },
                ],
                expired_at: [
                    { required: true, message: '天数不能为空', trigger: 'blur' },
                ],
                invited_user_reward: [
                    { required: true, message: '面值不能为空', trigger: 'blur' }
                ],
                use_times: [
                    { required: true, message: '次数不能为空', trigger: 'blur' }
                ]
            },
            ruleForm: {
                code: '',
                expired_at: "",
                invited_user_reward: '',
                use_times: '',
            },
            GMTToStr(time) {
                let date = new Date(time)
                let Str = date.getFullYear() + '-' +
                    (date.getMonth() + 1) + '-' +
                    date.getDate() + ' ' +
                    date.getHours() + ':' +
                    date.getMinutes() + ':' +
                    date.getSeconds()
                return Str
            }

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
            console.log(this.GMTToStr(this.ruleForm.expired_at))

            this.ruleForm.expired_at =this.GMTToStr(this.ruleForm.expired_at);
            this.$request.post("/promoCode", this.ruleForm).then((res) => {
                if (res.status == 0) {
                    this.$router.go(-1);
                } else {
                    this.$message.error(res.message);
                }
            })
        },
        cancel: function () {
            this.$router.go(-1);
        }
    },

    //生命周期 - 创建完成（可以访问当前this实例）
    created() { },
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
.createcode {
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