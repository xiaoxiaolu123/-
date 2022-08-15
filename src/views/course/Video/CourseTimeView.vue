<!-- 课时管理页面 -->
<template>
  <div class="CourseTimeView">
    <Head>
      <template slot="title">
        <div id="title">课时管理</div>
      </template>
    </Head>
    <div class="btns">
      <el-button type="primary" @click.stop="gotoCreateVideo"
        >添加课时</el-button
      >
      <el-button type="primary">章节管理</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <div class="tabBox">
      <el-table
        style="width: 100%"
        :header-cell-style="{ background: '#f1f2f9', color: 'black' }"
        :data="videosData"
        :default-sort="{ prop: 'id', order: 'ascending' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="ID" sortable width="70">
        </el-table-column>
        <el-table-column
          prop="chapter"
          label="课时"
          width="420"
          :formatter="formatter"
        >
          <template slot-scope="scope">
            <span>
              {{ scope.row.chapter.title }}
            </span>
            /
            <span>
              {{ scope.row.title }}
            </span>
          </template>

          <!-- <div>{{videosData[index].list[scope.$index].chapter.title}}</div> -->
        </el-table-column>
        <el-table-column prop="duration" label="课时时长" sortable width="165">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="上架时间"
          sortable
          width="176"
        >
          <template slot-scope="scope">{{
            scope.row.created_at | dateFormat
          }}</template>
        </el-table-column>
        <el-table-column prop="is_show" label="是否显示" sortable width="100">
          <template slot-scope="scope">
            <div class="isShow">
              ·
              <!-- {{ scope.row.is_show == 0 ? "隐藏" : "显示" }} -->
              <span v-if="scope.row.is_show == 0" style="color: red">隐藏</span>
              <span v-if="scope.row.is_show == 1" style="color: #04c877"
                >显示</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column width="154" label="操作" fixed="right">
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
              <span class="el-dropdown-link" style="marginLeft:10px;color:#409eff">
                更多<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <div class="clickBtn" @click.stop="gotoEditVideo(scope.row)">
                  <el-dropdown-item>单独订阅</el-dropdown-item>
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
          :page-sizes="[10, 20, 50, 100]"
          :page-size="page"
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
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //这里存放数据
    return {
      ctid: this.$route.query.ctid,
      page: 1,
      size: 100,
      sort: "published_at",
      order: "asc",
      // 接口获得的数据
      videos: {},
      videosData: [],
      currentPage: 1,
      page2: null,
      total: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 跳转添加课时页面
    gotoCreateVideo: function () {
      this.$router.push({ path: "create" });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 当前页面
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
    },
    formatter(row, column) {
      return row.address;
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },

    // 数据接口获取video?cid=79&page=1&size=100&sort=published_at&order=asc
    getCourseTime: function () {
      // console.log(this.ctid);
      this.$request
        .get(`video`, {
          params: {
            cid: this.ctid,
            page: this.page,
            size: 100,
            sort: this.sort,
            order: this.order,
          },
        })
        .then((res) => {
          // console.log(res.data);
          this.videos = res.data.videos;
          // 要遍历的数据
          this.videosData = this.videos.data;
          console.log(this.videosData);
          this.page2 = this.videos.per_page;
          this.total = this.videos.total;
          // console.log(this.total);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getCourseTime();
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
.CourseTimeView {
  padding: 30px;
  border-radius: 15px;
  background-color: white;
  .btns {
    margin-bottom: 20px;
    margin-top: 20px;
  }
  .tabBox {
    .block > * {
      text-align: center;
    }
  }
}
</style>