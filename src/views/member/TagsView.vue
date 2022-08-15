<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="学员标签">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">学员标签</div>
        </div>

        <div class="float-left">
            <el-form ref="form" label-width="200px">
                <el-form-item label="标签">
                    <div class="d-flex">
                        <div>
                            <el-select multiple filterable v-model="tagID">
                                <el-option v-for="(item, index) in tags" :key="index" :label="item.name" :value="item.id"></el-option>
                            </el-select>
                        </div>

                        <div class="ml-15">
                            <el-link type="primary" @click.stop="$router.push({name:'MemberTagIndex'})">标签管理</el-link>
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </div>

        <!-- 保存   取消 -->
        <div class="bottom-menus">
            <div class="bottom-menus-box">
                <el-button type="primary" class="save" @click.stop="submitModification">保存</el-button>
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

            tagID: [],
            tags: [],

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
                    let data = [];

                    if (res.data.tags) {
                        for (let i = 0; i < res.data.tags.length; i++) {
                            data.push(res.data.tags[i].id);
                        }
                    }

                    this.tagID = data;
                });
        },

        //获取创建学员所需数据
        createMember() {
            this.$request
                .get("http://1.14.239.98/backend/api/v1/member/create", {
                    params: {},
                })
                .then((res) => {
                    this.tags = res.data.tags;
                    // console.log(this.tags);
                });
        },

        // 提交修改后的学员信息
        submitModification() {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .put("http://1.14.239.98/backend/api/v1/member/" + this.id + "/tags", {
                    tag_ids: this.tagID.join(","),
                })
                .then(() => {
                    this.$message.success("修改成功");
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
        this.createMember();
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
    .d-flex {
        display: flex;
        align-items: center;
    }
    .float-left {
        width: 100%;
        height: auto;
        float: left;
    }
    .bg-white {
        background-color: #fff;
    }
    .mb-30 {
        margin-bottom: 30px;
    }
    .ml-15 {
        margin-left: 15px;
    }
}
</style>
