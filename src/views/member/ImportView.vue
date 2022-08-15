<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="添加学员">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">学员批量导入</div>
        </div>

        <div class="user-import-box">
            <div class="float-left d-flex mb-30">
                <el-button type="primary">选择Excel表格文件</el-button>
                <el-link type="primary" class="ml-30">点击链接下载「学员批量导入模板」</el-link>
            </div>

            <div class="float-left rules">
                <div class="title">用户批量导入规则介绍</div>
                <div class="rule-item">
                    <div class="item-title">1.手机号</div>
                    <div class="item-desc"><span class="c-red">必填</span> - 支持中国大陆手机号，标准的11位，不需要在手机号前面添加（+86）区号</div>
                </div>
                <div class="rule-item">
                    <div class="item-title">2.密码</div>
                    <div class="item-desc"><span class="c-red">必填</span> - 任意英文+数字的组合字符串</div>
                </div>
                <div class="rule-item">
                    <div class="item-title">3.VIP</div>
                    <div class="item-desc">选填 - 请填写[后台-运营-VIP会员]列表显示的ID</div>
                </div>
                <div class="rule-item">
                    <div class="item-title">4.VIP过期时间</div>
                    <div class="item-desc">
                        选填 - 时间格式为：
                        <code>YYYY-mm-dd HH:ii:ss</code>
                        ，如：
                        <code>2022-04-08 12:00:00</code>
                    </div>
                </div>
                <div class="rule-item">
                    <div class="item-title">5.是否锁定</div>
                    <div class="item-desc">选填 - 可填写值：[1, 0] - 1:锁定意味着无法登录,0:不锁定意味着无登录限制</div>
                </div>
                <div class="rule-item">
                    <div class="item-title">6.标签</div>
                    <div class="item-desc">选填 - 任意的字符串，多个标签请用英文逗号分割 - 例如我想给用户打上“大客户”+“精神小伙”这两个标签的话，可以这样输入：大客户,精神小伙</div>
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
    .user-import-box {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding: 30px 100px;
        border-radius: 15px;
        background-color: #fff;
        .rules {
            color: #333;
            font-weight: 400;
            .title {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
            }
            .rule-item {
                margin-bottom: 15px;
                .item-title {
                    font-size: 16px;
                    font-weight: 500;
                    margin-bottom: 10px;
                }
                .item-desc {
                    font-size: 14px;
                    padding-top: 8px;
                    padding-bottom: 8px;
                    margin: 0;
                    line-height: 18px;
                    color: #333;
                    .c-red {
                        color: #ff4d4f;
                    }
                    code {
                        background-color: rgba(0, 0, 0, 0.5);
                        color: #fff;
                    }
                }
            }
        }
    }
    .mb-30 {
        margin-bottom: 30px;
    }
    .ml-30 {
        margin-left: 30px;
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
}
</style>
