<!--Course  IndexView -->
<template>
  <div class="index">
    <!-- 头部 -->
    <div class="headBox">
      <Head>
        <template slot="Left">
          <el-row>
            <el-button type="primary" @click.stop="gotoCreateCourseView">新建课程</el-button>
            <el-button type="primary" @click.stop="gotoCategoryView">录播课分类</el-button>
            <el-button type="primary" @click.stop="gotoCommentView">课程评论</el-button>
            <el-button type="primary" @click.stop="gotoViewCommentView">课时评论</el-button>
            <el-button type="primary" @click.stop="gotoVideoImport">课程批量导入</el-button>
          </el-row>
          <div class="btn">
            <span><img src="@/assets/img/setting.png" alt="" />公众号配置</span>
          </div>
        </template>
        <template slot="Right">
          <div class="input">
            <el-input v-model="keywords" placeholder="请输入内容"></el-input>
          </div>
          <el-row>
            <el-button  @click.stop="clearSelection">清空</el-button>
            <el-button type="primary" @click.stop="selectData">筛选</el-button>
          </el-row>
          <div class="more" @click="drawer = true" >
            <span><img src="@/assets/img/setting.png" alt="" /></span>更多
          </div>
        </template>
      </Head>
    </div>
    <!-- 表单部分 -->
    <div class="tableBox">
        <el-table   
        @sort-change="changeSort"
        ref="filterTable"
        :data="courseInfo" 
        row-key="id"
        style="width: 100%" :header-cell-style="{background:'#f1f2f9',color:'black'}">
          <!-- ID -->
          <el-table-column prop="id" label="ID" sortable width="74">
          </el-table-column>
          <!-- 课程 -->
          <el-table-column prop="title"  label="课程" width="370">
           <template slot-scope="scope">
              <img :src="scope.row.thumb" min-width="40" height="90" width="120"  />
              <span class="title">
                {{scope.row.title}}
              </span>
          </template>
          </el-table-column>
          <!-- 分类 -->
          <el-table-column
            prop="category.name"
            label="分类"
            width="134"
          >
          </el-table-column>
          <!-- 价格 -->
          <el-table-column prop="charge" label="价格"  sortable  column-key="charge"  width="89">
          </el-table-column>
          <!-- 销量 -->
          <el-table-column
            prop="user_count"
            label="销量"
            sortable
            width="89"
            column-key="sales"
          >
          </el-table-column>
          <!-- 上架时间 -->
          <el-table-column
            prop="published_at"
            label="上架时间"
            sortable
            order: string
            width="156"
            column-key="date"
          >
          </el-table-column>
          <!-- 是否显示 -->
          <el-table-column prop="is_show" label="是否显示" width="135">
            <template slot-scope="scope">
            <div class="isShow">·
              <!-- {{ scope.row.is_show == 0 ? "隐藏" : "显示" }} -->
              <span v-if="(scope.row.is_show == 0)" style="color:red">隐藏</span>
              <span v-if="(scope.row.is_show == 1)" >显示</span>
            </div>
            </template>
          
          </el-table-column>
          <!-- 操作 -->
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="gotoCourseTime(scope.row)"
                type="text"
                size="big"
              >
                课时
              </el-button>

              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="big"
              >学员
             </el-button>
      
            <el-dropdown>
            <span class="el-dropdown-link">
              更多<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <div class="clickBtn" @click.stop="gotoEditVideo(scope.row)">
                  <el-dropdown-item>编辑</el-dropdown-item>
              </div>
              <div  class="clickBtn" @click.stop="gotoAttachView(scope.row)">
                  <el-dropdown-item >附件</el-dropdown-item>
              </div>
              <div  class="clickBtn" @click.stop="DeleteCourseId(scope.row)" >
                <el-dropdown-item >删除</el-dropdown-item>
              </div>
            </el-dropdown-menu>
            </el-dropdown>
    
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20,50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="14"
        >
        </el-pagination>
      </div>
    </div>

    <div class="drawer">
      <el-drawer
        title="更多筛选"
        :visible.sync="drawer"
        :size="360"
        :with-header="false">
        <div class="box">
           <div class="title">更多筛选</div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item >
            <el-input placeholder="课程名称关键字" v-model="keywords"></el-input>
        </el-form-item>
        <el-form-item >
          <el-select v-model="form.categoryID" placeholder="分类">
         <el-option
                  v-for="item in categories"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
          </el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
            <el-input v-model="form.courseID" placeholder="课程ID"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="float:left"  @click.stop="clearSelection">清空</el-button>
          <el-button  style="float:right" @click="selectData" type="primary">筛选</el-button>
        </el-form-item>
        </el-form>
        </div>
       
      </el-drawer>
    </div>
  </div>

             
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Head from "@/components/Head.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //这里存放数据
    return {
      // 侧边抽屉筛选项
      drawer: false,
      // 显示或隐藏时的文字
      showtext: "显示",
      // 当前页码
      currentPage: 1,
      // // 搜索内容
      // input: "",
      // 数据存储
      // 课程分类
      categories: [],
      // 课程所有信息
      course: {},
      // 课程详细信息
      courseInfo: [],
      // 导航信息
      links: [],
      page: 1,
      size: 10,
      // 排序类别(升降序)
      order: "asc",
      // 排序类别（id/销量/）
      sort: "id",
      // 排序类型（id/销量/价格）
      prop: "",
      // 总页数
      total: null,
      // 课程id(传给“编辑”和“附件”操作的)
      cid: "",
      // 课时ctid（"课时"操作的）
      ctid: "",
      // 关键字筛选词
      keywords: null,
      form: {
        // keywords: "",
        categoryID: "",
        courseID: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 获取排序的数据,重新排序
    changeSort(val) {
      // console.log(val); // column: {…} order: "ascending" prop: "date"
      this.prop = val.prop;
      this.sort = this.prop;
      if (val.order == "descending") {
        this.order = "desc";
        // console.log(val);
      }
      if (val.order == "ascending") {
        this.order = "asc";
      }
      this.getData();
    },
    // 实现底部导航的两种方法
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.total = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      // console.log(this.page);
      this.getData();
    },
    // 跳转新建课程页面
    gotoCreateCourseView: function () {
      this.$router.push({
        path: "vod/create",
      });
    },
    // 跳转录播课分类页面
    gotoCategoryView: function () {
      this.$router.push({
        path: "vod/category/index",
      });
    },
    // 跳转课程评论页面
    gotoCommentView: function () {
      this.$router.push({
        path: "vod/components/vod-comments",
      });
    },
    // 跳转课时评论页面
    gotoViewCommentView: function () {
      this.$router.push({
        path: "vod/video/comments",
      });
    },
    // vod/
    gotoVideoImport: function () {
      this.$router.push({
        path: "vod/video-import",
      });
    },
    // 课时（跳转课时管理）
    gotoCourseTime: function (val) {
      this.ctid = val.id;
      // console.log(this.ctid)
      this.$router.push({
        path: "vod/video/index",
        query: {
          ctid: this.ctid,
        },
      });
      // console.log(this.ctid)
    },
    // 接口获取主页渲染数据方法
    getData: function () {
      this.$request
        .get(`course`, {
          params: {
            page: this.page,
            size: this.size,
            sort: this.sort,
            order: this.order,
          },
        })
        .then((res) => {
          console.log(res);
          this.course = res.data.courses;
          // console.log(this.course)
          this.categories = res.data.categories;
          console.log(this.categories);
          this.links = this.course.links;
          this.courseInfo = this.course.data;
        });
    },
    // 删除前的警告框
    open() {
      this.$confirm("确定操作?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 删除数据方法
          // http://1.14.239.98/backend/api/v1/course/133
          this.$request.delete(`course/${this.cid}`).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.$nextTick(() => {
              this.getData();
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
    // 删除课程id(获取id，弹窗、删除功能)
    DeleteCourseId: function (val) {
      this.cid = val.id;
      this.open();
      console.log(val);
    },
    // 编辑功能（跳转编辑录播课程）
    gotoEditVideo: function (val) {
      this.cid = val.id;
      this.$router.push({
        path: "vod/update",
        query: {
          cid: this.cid,
        },
      });
    },
    // 筛选功能
    // http://1.14.239.98/backend/api/v1/course?keywords=%E9%92%B1%E7%AB%AF&page=1&size=10&sort=id&order=desc
    selectData: function () {
      // console.log(word111)
      this.$request
        .get(`course`, {
          params: {
            // 课程id
            id: this.form.courseID,
            // 关键字
            keywords: this.keywords,
            // 课程类名id
            cid: this.form.categoryID,
            // 页码
            page: this.page,
            // 页数
            size: this.size,
            // 排序类型
            sort: this.sort,
            // 排序顺序
            order: this.order,
          },
        })
        .then((res) => {
          this.course = res.data.courses;
          this.links = this.course.links;
          this.categories = this.categories;
          this.courseInfo = this.course.data;
          console.log(res.data);
        });
    },
    // 清空筛选条件
    clearSelection: function () {
      console.log(111);
      this.keywords = "";
      (this.form.courseID = ""), (this.form.categoryID = ""), this.getData();
    },
    gotoAttachView: function (val) {
      this.cid = val.id;
      this.$router.push({
        path: "vod/attach/index",
        query: {
          cid: this.cid,
        },
      });
    },
  },

  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getData();
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
.index::-webkit-scrollbar {
  width: 0px;
}
.index {
  // margin: 20px 5px 20px 20px;
  height: auto;
  background-color: rgb(255, 255, 255);
  padding: 30px;
  float: left;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom: 90px;
  box-shadow: rgb(102 102 102 / 5%) 0px 2px 4px 0px;
  min-width: 1180px;
  // min-width: 1000px;
  overflow-y: auto;
  .headBox {
    .input {
      width: 150px !important;
      // background-color: wheat;
      margin-right: 10px;
    }
    .more {
      margin-left: 10px;
      display: flex;
      justify-items: center;
      align-items: center;
      font-size: 16px;
      span {
        display: flex;
        img {
          height: 30px;
        }
      }
    }
    .n-padding-box {
      width: 100%;
      height: auto;
      float: left;
      padding: 30px;
        .title {
        width: 100%;
        height: 16px;
        font-size: 16px;
        font-weight: 400;
        color: #333;
        line-height: 16px;
        margin-bottom: 30px;
        display: flex;
      }
    }
  }
  .tableBox {
    margin-top: 30px;
    span.title {
      // position: absolute;
      // display: block;
      padding-top: 20px;
      float: left;
      height: 70px;
      // background-color: pink;
      width: 200px;
      margin-left: 10px;
    }
    img {
      display: block;
      float: left;
      height: 90px;
    }
    .block {
      margin-top: 30px;
      display: flex;
      /deep/ .el-pagination {
        display: inline-block;
        margin: auto;
      }
    }
    .isShow {
      width: 100%;
      // background-color: chocolate !important ;
      color: #52c88c;
      // text-align: center;
    }
  }
  .drawer {
    /deep/ .el-drawer__body {
      // padding-left: 30px;
      width: 360px !important;
    }
    .box {
      width: 300px;
      margin-left: 30px;
      // background-color: yellowgreen;
    }
    .title {
      margin-bottom: 30px;
      margin-top: 30px;
    }
    /deep/ .el-form-item {
      width: 300px !important;
      height: 40px !important;
    }
    .el-input {
      width: 300px !important;
    }
    /deep/ .el-form-item__content {
      margin-left: 0px !important;
    }
    /deep/ .el-drawer.ltr,
    .el-drawer.rtl {
      width: 360px !important;
      padding-left: 30px !important;
    }
    /deep/ .el-select > .el-input {
      width: 300px;
    }
  }
}
.el-dropdown {
  display: inline-block;
  position: absolute;
  // background-color: aqua;
  top: 45px;
  margin-left: 10px;
  height: 20px;
  width: 70px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>