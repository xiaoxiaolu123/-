<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="user-main-body">
            <div class="float-left bg-white br-15 p-30">
                <div class="back-bar-box mb-30" title="实名信息">
                    <div class="btn-back" @click.stop="goBack">
                        <i class="el-icon-back"></i>
                        返回
                    </div>
                    <div class="line"></div>
                    <div class="name">实名信息</div>
                </div>

                <div class="panel-info-box">
                    <div class="panel-info-item">真实姓名：</div>
                    <div class="panel-info-item">性别：</div>
                    <div class="panel-info-item">年龄：</div>
                    <div class="panel-info-item">生日：</div>
                    <div class="panel-info-item">职业：</div>
                    <div class="panel-info-item">住址：</div>
                    <div class="panel-info-item">毕业院校：</div>
                    <div class="panel-info-item">身份证号码：</div>
                </div>
            </div>

            <div class="panel-box mt-30">
                <div class="panel-body">
                    <div class="float-left mb-15 d-flex">
                        <div class="info-item">
                            <div class="info-label">毕业证照片：</div>
                            <div class="info-value">
                                <div class="image"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">身份证正面照：</div>
                            <div class="info-value">
                                <div class="image"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">身份证背面照：</div>
                            <div class="info-value">
                                <div class="image"></div>
                            </div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">手持身份证照：</div>
                            <div class="info-value">
                                <div class="image"></div>
                            </div>
                        </div>
                    </div>
                </div>
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
        return {};
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

<style lang="less" scoped>
.meedu-main-body {
    flex: 1;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 5px 20px 20px;
    overflow-y: auto;
    background-color: #f1f2f9;
    .user-main-body {
        width: 100%;
        height: auto;
        float: left;
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
        .panel-info-box {
            width: 100%;
            height: auto;
            float: left;
            box-sizing: border-box;
            padding-bottom: 20px;
            padding-top: 10px;
            display: grid;
            row-gap: 30px;
            -moz-column-gap: 0;
            column-gap: 0;
            grid-template-columns: repeat(5, minmax(0, 1fr));
            .panel-info-item {
                height: 14px;
                font-size: 14px;
                font-weight: 400;
                color: #333;
                line-height: 14px;
            }
        }
        .panel-box {
            width: 100%;
            height: auto;
            float: left;
            box-sizing: border-box;
            padding: 30px;
            background-color: #fff;
            border-radius: 15px;
            .panel-body {
                width: 100%;
                height: auto;
                float: left;
                .info-item {
                    width: 324px;
                    height: auto;
                    float: left;
                    display: flex;
                    flex-direction: column;
                    .info-label {
                        width: 100%;
                        float: left;
                        height: 14px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #333;
                        line-height: 14px;
                        margin-bottom: 20px;
                    }
                    .info-value {
                        width: 100%;
                        height: auto;
                        float: left;
                        .image {
                            width: 200px;
                            height: 150px;
                            background: #f0f0f8;
                            border-radius: 8px;
                        }
                    }
                }
            }
        }
    }
    .float-left {
        width: 100%;
        height: auto;
        float: left;
    }
    .d-flex {
        display: flex;
        align-items: center;
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
    .mt-30 {
        margin-top: 30px;
    }
    .mb-15 {
        margin-bottom: 15px;
    }
}
</style>
