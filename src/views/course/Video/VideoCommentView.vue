<!-- 评论区 -->
<template>
  <div class="comment">
    <Head>
      <template slot="title">
        <div id="title">课时评论</div>
      </template>
    </Head>
    <!-- 导航操作部分 -->
    <div class="nav">
      <div class="left">
        <!-- 删除按钮 -->
        <el-button type="danger" @click.stop="deleteData">删除</el-button>
      </div>

      <div class="right">
        <!-- 学员ID -->
        <el-input v-model="user_id" placeholder="学员ID"></el-input>
        <!-- 课时 -->
        <el-select v-model="course_id" placeholder="课时" @change="selectData">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <!-- 日历 -->
        <div class="block">
          <el-date-picker
            :picker-options="pickerOptions"
            v-model="value1"
            type="daterange"
            range-separator="至"
            start-placeholder="评论时间-开始"
            end-placeholder="评论时间-结束"
          >
          </el-date-picker>
        </div>
        <!-- 清空按钮 -->
        <el-button @click.stop="resetInput">清空</el-button>
        <!-- 筛选按钮 -->
        <el-button type="primary" @click="Selection">筛选</el-button>
      </div>
    </div>
    <!-- 表单部分 -->
    <div class="tabBox">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="user_id" label="学员ID" width="120">
        </el-table-column>
        <el-table-column prop="name" label="学员" width="300">
          <template slot-scope="scope">
            <div class="infoBox">
              <div class="info" v-for="name in userLists" :key="name.id">
                <div
                  class="img"
                  v-if="name.id === tableData[scope.$index].user_id"
                >
                  <img draggable="false" :src="name.avatar" alt="" />
                </div>
                <div v-if="name.id === tableData[scope.$index].user_id">
                  {{ name.nick_name }}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="video.title" label="课程" width="223">
        </el-table-column>
        <el-table-column prop="render_content" label="内容" width="222">
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template slot-scope="scope">{{
            scope.row.created_at | dateFormat
          }}</template>
        </el-table-column>
      </el-table>
      <!-- 分页部分 -->
      <div class="block">
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
import Head from "@/components/ReturnBackHead.vue";
// import moment from "moment";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //这里存放数据
    return {
      // --------------------------------------------------------------
      //                    ElementUI数据
      // --------------------------------------------------------------
      // 分页当前页数
      currentPage: 1,
      //学员ID输入框
      input: "",
      // 日历选中时间
      value1: "",
      multipleSelection: [],
      // 下拉框选择中的数据
      selectCoures: "",
      // ElementUI内置方法
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      // --------------------------------------------------------------
      //                    接口数据
      // --------------------------------------------------------------
      // 点击的页码
      //1.以下存储评论接口获取的数据
      getCommentDataInfo: {},
      commentsData: [],
      commentsInfo: [],
      // 总页数
      total: null,
      // 表单数据
      tableData: [],
      // 用户信息
      userLists: [],
      // 下拉框选择的课程id
      course_id: null,
      // 存储用户名做判断
      user_id: null,
      // 存放接口获取的数据渲染下拉框选项
      options: [],
      // 存放要删除的评论id
      ids: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // ElementUI分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.$nextTick(() => {
        this.getCommentData(val);
      });
    },
    // ElementUI下拉框选中的数据
    selectData: function (val) {
      this.selectCoures = val;
    },
    // 监听选择框勾选状态
    handleSelectionChange(val) {
      this.multipleSelection = val;
      let idArr = val;
      for (let i = 0; i < idArr.length; i++) {
        this.ids.push(idArr[i].id);
      }
      console.log(this.ids);
    },
    // 过滤时间
    // formData在main.js定义了
    dataFilter(val) {
      this.formData.keywords = val;
      let params = {};
      Object.assign(params, this.filter, this.formData);
      this.$api.Course.Live.Course.List(params).then((res) => {
        this.filterData.courses = res.data.data.data;
      });
    },
    // 获取课程信息接口 course?page=1&size=10
    getVideoDate: function () {
      this.$request.get(`video?page=1&size=10`).then((res) => {
        this.options = res.data.videos.data;
        // console.log(this.options);
      });
    },
    // 获取评论区数据// video?page=1&size=10
    getCommentData: function (
      page = this.currentPage,
      UID = this.user_id,
      courseId = this.course_id,
      created_at = this.value1
    ) {
      // console.log(page);
      this.$request
        .get(`video_comment`, {
          params: {
            page: page,
            size: 10,
            user_id: UID,
            video_id: courseId,
            created_at: created_at,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.getCommentDataInfo = res.data;
          this.commentsInfo = this.getCommentDataInfo.data;
          this.tableData = this.commentsInfo.data;
          this.userLists = this.getCommentDataInfo.users;
          // console.log(this.commentsInfo);
          this.total = this.commentsInfo.total;
        });
    },
    // 筛选功能course_comment?course_id=29&page=1&size=10&user_id=46
    Selection: function () {
      this.$request
        .get(`video_comment`, {
          params: {
            video_id: this.selectCoures,
            page: 1,
            size: 10,
            user_id: this.user_id,
            created_at: this.value1,
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.$nextTick(() => {
            this.tableData = res.data.data.data;
            console.log(res.data.data.data);
          });
        });
    },
    // 清空筛选项
    resetInput: function () {
      this.user_id = "";
      this.course_id = "";
      this.value1 = "";
      this.$nextTick(() => {
        this.getCommentData();
      });
    },
    // 没有勾选要删除的数据
    open3() {
      this.$message({
        message: "请选择您要操作的数据",
        type: "warning",
      });
    },
    // 勾选后警示是否删除
    open() {
      this.$confirm("确认操作?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$request
            .post(`video_comment/delete`, {
              ids: this.ids,
            })
            .then((res) => {
              this.$nextTick(() => {
                console.log("删除成功");
                this.getCommentData();
              });
            })
            .catch((err) => {
              console.log(222);
            });
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
    // 删除评论 course_comment/delete
    deleteData: function () {
      // 弹窗警告
      if (this.ids.length == 0) {
        this.open3();
      } else {
        this.open();
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCommentData();
    this.getVideoDate();
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
.comment {
  min-width: 1100px;
  padding: 20px 5px 20px 30px;
  background-color: white;
  border-radius: 15px;
  /deep/.el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }
  .nav {
    height: 40px;
    margin-top: 15px;
    margin-bottom: 30px;
    width: 100%;
    // background-color: yellow;
    .left {
      float: left;
    }
    .right > * {
      margin-left: 10px;
    }
    .right {
      float: right;
      display: flex;
      /deep/ .el-input {
        height: 40px;
        width: 150px;
      }
      /deep/ .el-select {
        width: 150px;
        height: 40px;
      }
      .block {
        width: 350px;
        height: 40px;
      }
    }
  }
  .tabBox {
    // background-color: yellow;
    // background-color: red;
    .infoBox {
      .info {
        display: flex;
        justify-items: center;
        align-items: center;
        .img {
          overflow: hidden;
          border-radius: 50%;
          height: 40px;
          width: 40px;
          margin-right: 10px;
          img {
            height: 40px;
            width: 40px;
            aspect-ratio: auto 40 / 40;
          }
        }
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
  }
}
</style>