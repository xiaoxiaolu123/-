<template>
  <div class="categoryView">
    <Head>
      <template slot="title">
        <div id="title">录播分类管理</div>
      </template>
    </Head>
    <div class="nav">
      <el-button type="primary" @click.stop="gotoCreateView"
        >添加分类</el-button
      >
    </div>
    <div class="tabBox">
      <el-table
        :data="categoryInfo"
        style="width: 100%; margin-bottom: 20px"
        row-key="id"
        max-height="300"
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        >
        <el-table-column fixed prop="id" label="ID" width="150">
        </el-table-column>
        <el-table-column prop="sort" label="升序" width="150">
        </el-table-column>
        <el-table-column prop="name" label="分类名" width="510">
        </el-table-column>
        <el-table-column label="显示" width="150">
          <!-- 待后期传 -->
          <span class="ishow">否</span>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button
              type="text"
              size="small"
              style="fontsize: 14px"
              @click.native.prevent="editInfo(scope.$index, scope.row)"
              >编辑</el-button
            >
            <!-- 删除按钮 -->
            <el-button
              @click.native.prevent="deleteRow(scope.$index, scope.row)"
              type="text"
              size="small"
              style="fontsize: 14px"
              class="red"
              @click="open"
            >
              删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页导航 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="4"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import Head from "@/components/ReturnBackHead.vue";
export default {
  components: {
    Head,
  },
  data() {
    return {
      msg: "",
      delarr: [],
      index: null,
      // 导航当前页码
      currentPage: 1,
      // 接口所有数据
      category: {},
      // 分类信息
      categoryInfo: [],
      //   总页数
      categoryTotal: 0,
      // 要发送给编辑页的ID
      sendID:null,
    };
  },
  methods: {
    // 实现底部导航的两种方法
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 单行删除
    // 删除行
    deleteRow(index, rows) {
      // console.log(index);
      // console.log(rows);
      this.index = index;
      this.msg = rows;
      this.delarr.push(this.msg.id);
      // rows.splice(index, 1);
    },
    // 删除提醒
    open() {
      this.$confirm("确认此操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delCategory();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 跳转编辑页面
    editInfo: function (index, rows) {
      this.sendID = rows.id;
      // console.log(this.sendID);
      this.$router.push({
        path:'update',
        query:{
          id:this.sendID
        }
      })
    },
    // 跳转创建分类
    gotoCreateView: function () {
      this.$router.push({
        path: "create",
      });
    },
    // 获取分类数据（接口）
    getCategory: function () {
      // console.log(1213)
      this.$request
        .get(`courseCategory`, {
          params: {
            page: 1,
            size: 10,
          },
        })
        .then((res) => {
          // console.log(res.data.data);
          this.category = res.data;
          this.categoryInfo = this.category.data;
          this.categoryTotal = this.category.total;
        });
    },
    // 删除分类数据（接口）
    delCategory: function () {
      // console.log(this.msg.id)
      this.$request.delete(`courseCategory/${this.msg.id}`).then((res) => {
        // console.log(res)
        this.$nextTick(() => {
          this.$router.go(0);
        });
      });
    },
  },
  created() {
    this.getCategory();
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.categoryView {
  // margin: 20px 5px 20px 20px;
  padding: 20px 30px;
  border-radius: 15px;
  background-color: white;
  .nav {
    margin-top: 10px;
    background-color: white;
    line-height: 50px;
    height: 50px;
    display: flex;
    justify-items: center;
    align-items: center;
    /deep/ .el-button {
      height: 40px;
    }
  }
  .block {
    margin-top: 30px;
    display: flex;
    /deep/ .el-pagination {
      display: inline-block;
      margin: auto;
    }
  }
  .red {
    color: red;
  }
}
</style>
