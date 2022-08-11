<!--  -->
<template>
    <div class="createmulticode">
        <div class="meedu-main-body">
            <div class="top">
                <div class="btn-back" @click="goBack">
                    <i class="el-icon-back"></i>
                    返回
                </div>
                <div class="line"></div>
                <div class="name">优惠码批量生成</div>
            </div>

            <div class="bottom">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="统一前缀" prop="prefix">
                        <el-input v-model="ruleForm.prefix" placeholder="前缀" style="margin-right: 20px;width:200px">
                        </el-input>
                    </el-form-item>

                    <el-form-item label="到期时间" required>
                        <el-col :span="11">
                            <el-form-item prop="expired_at">
                                <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.expired_at"
                                    style="margin-right: 20px;width: 200px;display: inline-block;"></el-date-picker>
                                <i class="el-icon-info"></i>
                                <span>该字段决定优惠码的有效期限，到了选定的时间就无法使用了。</span>
                            </el-form-item>
                        </el-col>
                    </el-form-item>


                    <el-form-item label="生产数量" prop="num">
                        <el-input v-model="ruleForm.num" placeholder="生产数量" type="number" style="margin-right: 20px;width:200px">
                        </el-input>
                        <i class="el-icon-info"></i>
                        <span>请输入整数。为防止系统卡顿导致生成失败，请勿输入超过1000的数字。</span>
                    </el-form-item>


                    <el-form-item label="面值" prop="money">
                        <template>
                            <el-input v-model="ruleForm.money" type="number" placeholder="面值"
                                style="width:200px;margin-right: 20px;">
                            </el-input>
                            <i class="el-icon-info"></i>
                            <span>请输入整数。不支持小数。可在收银台抵扣的金额。</span>
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

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            rules: {
                prefix: [
                    { required: true, message: '前缀不能为空', trigger: 'blur' },
                ],
                expired_at: [
                    { required: true, message: '到期日期不能为空', trigger: 'blur' },
                ],
                money: [
                    { required: true, message: '面值不能为空', trigger: 'blur' }
                ],
                num: [
                    { required: true, message: '生成数量不能为空', trigger: 'blur' }
                ]
            },
            ruleForm: {
                prefix: '',
                expired_at: "",
                money: '',
                num: '',
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

            this.ruleForm.expired_at =this.GMTToStr(this.ruleForm.expired_at);
            this.$request.post("/promoCode/generator", this.ruleForm).then((res) => {
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
.createmulticode {
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