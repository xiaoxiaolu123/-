<!-- 公众号 -->
<template>
  <div class="WechatView">
    <div class="meedu-main-body">
      <div class="top">
        <el-button type="primary" size="default" @click="goCreate"
          >新建自动回复</el-button
        >
        <el-button type="primary" size="default">公众号菜单</el-button>
        <div class="options-link">
          <div class="link">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAAXNSR0IArs4c6QAAAJNQTFRFAAAAkpKSmZmZoqKilZWVkpKSlpaWm5ubnJycl5eXm5ubmZmZmpqam5ubmJiYl5eXmpqamZmZm5ubmZmZmpqamZmZmZmZmZmZmpqamZmZmJiYmZmZmZmZmpqamJiYmpqamZmZmZmZmpqamZmZmZmZmJiYmpqamZmZmZmZmZmZmZmZmZmZmZmZmpqamZmZmpqamZmZvx7YHQAAADB0Uk5TAAcKCwwOERwfICEjNTg5QERGT1BRdXh/g4qLj5GSmqassbq+wcLC4ePm6PL4+f3+TfOvXAAAAQRJREFUSMftldkOgjAQRUGpCrjgvqIiLqBY+/9f5xTXKiVMedPeFzohJ2lmejKGofOnqTWbNUXU21LG6NZTYacXluYyxbMj9swIy9oJUIfFPIJPYhfnSAeyBGhTgSKEw7IjyXc72/fb0gavHMrk6Urh462MleAz4ZWVoOD6GLKDXzNe+XDYjSVxs7vW4lNeD/oBn3QLO6vV63Ir9COx9g92X8U/MXNy4uhpYiqZQXrDYY9oTctpGs1zNSUyAbmmIXnXVK5kVqgjaNpFwbGoKQ5OLEFTiZJZ4Zr6gqZu8W6nmgZ9ranWr7h+uVtS1A+5JZ0SWzIusyU/9ENuSb/UltT66fxErqwugIaAuPOnAAAAAElFTkSuQmCC"
              alt=""
            />
            公众号配置
          </div>
        </div>
      </div>

      <div class="bottom">
        <template>
          <el-table :data="tableData" style="width: 100%" class="table">
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
            <el-table-column label="匹配规则" width="500">
              <template slot-scope="scope">
                {{ scope.row.type }}@{{ scope.row.rule
                }}{{
                  scope.row.event_type != "" ? scope.row.event_type + ":" : ""
                }}{{ scope.row.event_key }}
              </template>
            </el-table-column>
            <el-table-column prop="reply_content" label="回复内容" width="500">
            </el-table-column>
            <el-table-column label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  size="middle"
                  class="del"
                  @click="del(scope.row.id)"
                  >删除</el-button
                >
                <el-button
                  type="text"
                  size="middle"
                  @click="update(scope.row.id)"
                  >编辑</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </template>
      </div>

      <div class="page">
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
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
    return {
      tableData: [],
      total: 0,
      page: 1,
      size: 10,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    del(e) {
      this.$confirm("确定操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request.delete("/mpWechatMessageReply/" + e).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$request
              .get("/mpWechatMessageReply", {
                params: {
                  page: this.page,
                  size: this.size,
                },
              })
              .then((res) => {
                this.tableData = res.data.data.data;
              });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    update: function (e) {
      this.$router.push({
        path: "/wechat/messagereply/update",
        query: {
          id: e,
        },
      });
    },
    goCreate: function () {
      this.$router.push("/wechat/messagereply/create");
    },
    handleSizeChange: function (size) {
      this.size = size;
      this.$request
        .get("/mpWechatMessageReply", {
          params: {
            page: this.page,
            size: size,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.data;
        });
    },
    handleCurrentChange: function (page) {
      this.page = page;
      this.$request
        .get("/mpWechatMessageReply", {
          params: {
            page: page,
            size: this.size,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.data;
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let res = await this.$request.get("/mpWechatMessageReply", {
      params: {
        page: 1,
        size: 10,
      },
    });
    this.tableData = res.data.data.data;
    this.total = res.data.data.total;
    // console.log(res)
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
<style  lang='less' scoped>
/deep/ .table th {
  background-color: rgb(241, 242, 249);
}
/deep/ .del {
  color: red;
}
.WechatView {
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

    .top {
      margin-bottom: 30px;
      width: 100%;
      height: auto;

      .options-link {
        display: inline-block;

        vertical-align: middle;
        width: auto;
        height: 30px;
        box-sizing: border-box;
        padding: 0 0 0 20px;
        border-left: 1px solid #d8d8d8;
        margin-left: 30px;

        .link {
          width: 100%;
          height: 100%;
          cursor: pointer;
          font-size: 16px;
          font-weight: 400;
          color: #606266;
          display: flex;
          flex-direction: row;
          align-items: center;

          img {
            width: 30px;
            height: 30px;
            margin-right: 10px;
          }
        }
      }
    }

    .page {
      text-align: center;
      margin-top: 30px;
      width: 100%;
      height: auto;

      .block {
        text-align: center;
      }
    }
  }
}
</style>