<!-- 管理员角色 -->
<template>
    <div class="box">
         <FanHui :msg="'管理员角色'"></FanHui>
        <div class="float-left mb-30">
            <button type="button" class="el-button el-button--primary" @click.stop="Routing"><!----><!----><span>添加</span></button>
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="id" label="ID" width="120"> </el-table-column>
                <el-table-column prop="display_name" label="角色名" width="120"> </el-table-column>
                <el-table-column prop="slug" label="Slug" width="250"> </el-table-column>
                <el-table-column  prop="description" label="描述" width="657">
                   
                </el-table-column>
                <el-table-column prop="" label="操作" width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" @click.stop="Compile(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.row.id, scope.row.slug)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="footer">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </div>
        </div>
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
            currentPage: 1,
            tableData: [],
            // loading: true,
            total: null,

            num: {
                page: 1,
                size: 10,
                sort: "id",
                order: "desc",
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合{}
    methods: {
        handleDelete(id,slug){
    this.$confirm("确认操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .delete(`administrator_role/${id}`)
            .then(() => {
              if (slug === "administrator") {
                this.$message.error("当前用户是超级管理员账户无法删除");
                return;
              }
            //   this.indexInfo();
              this.$message({
                type: "success",
                
                message: "删除成功!",
              });
            })
           
            .catch((e) => {
              this.$message.error("删除失败");
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
        },
        Routing() {
            this.$router.push({
                path: "/system/adminroles/creata",
            });
        },
         Compile(id) {
            this.$router.push({
                path: "/system/adminroles/updata",
                query:{
                    id:id
                }
            });
        },
        noticeFormat(tableData, column) {
            if (tableData.is_ban_login == 0) {
                return "否";
            } else {
                return "是";
            }
        },
        async getParameters(params) {
            let arr = await this.$request.get("administrator_role", { params }).then((res) => {
                console.log(JSON.parse(JSON.stringify(res.data)));
                this.tableData = res.data.data;
                this.total = res.data.total;
            });
        },

        handleSizeChange(val) {
            this.getParameters(this.num);
            this.num.size = val;
        },
        handleCurrentChange(page) {
            this.num.page = page;
            this.getParameters(this.num);
            this.num.size = val;
        },
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getParameters(this.num);
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
    .el-button {
        margin-bottom: 30px;
    }
    /deep/th.el-table__cell {
        background: #f1f2f9;
        height: 70px;
        font-weight: 1200;
        font-size: 16px;
    }
    /deep/.el-button--mini {
        font-size: 16px;
        padding: 0;
        border: 0;
        transform: translateY(14px);
        //  padding-top: 10px;
        color: #66b1ff;
        cursor: pointer;
        font-weight: 400;
        box-sizing: border-box;
        
    }
    /deep/.el-button--mini:hover{
      // padding-top: 4px;
     text-decoration: underline;
        // color: #409eff;

    }
    /deep/.el-table__cell {
        padding: 2px 0;
        font-size: 16px;
        font-weight: 500;
    }
    /deep/.el-button--danger {
        color: #f78998;
        background: beige;
        font-size: 16px;

    }
    .footer {
        text-align: center;
        margin-top: 40px;
    }
}
</style>
