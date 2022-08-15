<!--  -->
<template>
    <div class="meedu-main-body">
        <div class="back-bar-box mb-30" title="标签管理">
            <div class="btn-back" @click.stop="goBack">
                <i class="el-icon-back"></i>
                返回
            </div>
            <div class="line"></div>
            <div class="name">标签管理</div>
        </div>

        <!-- 跳转添加标签页面 -->
        <div class="float-left mb-30">
            <el-button type="primary" @click.stop="$router.push({name: 'MemberTagCreate'})">添加标签</el-button>
        </div>

        <!-- 表格 -->
        <div class="float-left" v-loading="loading">
            <el-table :header-cell-style="{ background: '#f1f2f9' }" :data="list" class="float-left">
                <!-- ID -->
                <el-table-column prop="id" label="ID" width="120"></el-table-column>

                <!-- 标签名 -->
                <el-table-column prop="name" label="标签名"></el-table-column>

                <!-- 操作 -->
                <el-table-column fixed="right" label="操作" width="100">
                    <template slot-scope="scope">
                        <!-- 编辑 -->
                        <el-link @click.stop="handleClick(scope.row)" type="primary">编辑</el-link>

                        <!-- 删除 -->
                        <el-link type="danger" class="ml-15" @click.stop="whetherDestroy(scope.row)">删除</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 取消 -->
        <div class="bottom-menus">
            <div class="bottom-menus-box">
                <el-button type="default" @click.stop="goBack">取消</el-button>
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
            page: 1,
            size: 10,

            total: 0,
            list: [],

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

        // 获取表格数据
        getData() {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .get("http://1.14.239.98/backend/api/v1/member/tag/index", {
                    params: {
                        page: this.page,
                        size: this.size,
                    },
                })
                .then((res) => {
                    // console.log(res);
                    this.loading = false;
                    this.list = res.data.data;
                    this.total = res.data.total;
                });
        },

        // 删除
        Destroy(item) {
            if (this.loading) {
                return;
            }
            this.loading = true;

            this.$request
                .delete("http://1.14.239.98/backend/api/v1/member/tag/" + item.id, {})
                .then(() => {
                    this.loading = false;
                    this.$message.success("删除成功");
                    this.getData();
                })
                .catch((e) => {
                    this.loading = false;
                    this.$message.error(e.$message);
                });
        },

        // 确认是否删除
        whetherDestroy(item) {
            this.$confirm("确认操作？", "警告", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }).then(() => {
                this.Destroy(item);
            }).catch((e) => {
                this.$message.error(e.message);
            });
        },

        // 标页码改变，刷新页面
        paginationPageChange(page) {
            this.page = page;
            this.getData();
        },

        //获取当前行
        handleClick(row) {
            this.$router.push({
                path:`/member/tag/${row.id}`,
            });
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getData();
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
    .ml-15 {
        margin-left: 15px;
    }
}
</style>
