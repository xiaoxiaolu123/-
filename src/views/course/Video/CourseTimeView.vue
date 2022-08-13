<!-- 课时管理页面 -->
<template>
  <div class="CourseTimeView">
    <Head>
      <template slot="title">
        <div id="title">课时管理</div>
      </template>
    </Head>
    <div class="btns">
      <el-button type="primary" @click.stop="gotoCreateVideo">添加课时</el-button>
      <el-button type="primary">章节管理</el-button>
      <el-button type="danger">删除</el-button>
    </div>
    <div class="tabBox">
      <el-table
        style="width: 100%"
        :header-cell-style="{ background: '#f1f2f9', color: 'black' }"
        :data="videosData"
        :default-sort="{ prop: 'id', order: 'descending' }"
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
        </el-table-column>
        <el-table-column prop="duration" label="课时时长" sortable width="165">
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="上架时间"
          sortable
          width="176"
        >
        </el-table-column>
        <el-table-column prop="is_show" label="是否显示" sortable width="100">
        </el-table-column>
        <el-table-column width="154" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
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
      // 获取接口数据要传的参数
      page: 1,
      size: 10,
      sort: "id",
      order: "desc",
      cid: null,
      sort2: "published_at",
      order2: "asc",
      // 接口获得的数据
      videos: {},
      videosData: [],
      currentPage: 1,
      total: null,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    gotoCreateVideo:function(){
      this.$router.push(
        {path:"create"}
      )
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
    // 获取刚创建的课时course?page=1&size=10&sort=id&order=desc
    // data。courses。data[0].id

    getCid: function () {
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
          //  console.log(res.data.courses.data[0].id)
          this.cid = res.data.courses.data[0].id;
          this.getCourseTime();
        });
    },
    // category: {id: 1, name: "前端开发"}
    // category_id: 1
    // chapters_count: 0
    // charge: 0
    // comments_count: 0
    // created_at: "2022-08-12T12:49:16.000000Z"
    // id: 85
    // is_free: 1
    // is_rec: 0
    // is_show: 1
    // published_at: "2022-08-12 20:46:00"
    // short_description: "1"
    // slug: ""
    // thumb: "http://1.14.239.98/storage/images/h2v6oYBHjBXHDC1xxwGbYfZwNr2e4j269TJ8u1Fa.jpg"
    // title: "JJ"
    // updated_at: "2022-08-12T12:49:16.000000Z"
    // user_count: 0
    // user_id: 0
    // videos_count: 0
    // 数据接口获取video?cid=79&page=1&size=100&sort=published_at&order=asc

    getCourseTime: function () {
      console.log(this.cid);
      this.$request
        .get(`video`, {
          params: {
            // cid: 13,
            cid: this.cid,
            page: this.page,
            size: 100,
            sort: this.sort2,
            order: this.order2,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.videos = res.data.videos;
          this.videosData = this.videos.data;
          this.page = this.videos.per_page;
          this.total = this.videos.total;
          console.log(this.total);
        });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    // this.getCourseTime();
    this.getCid();
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
  .btns{
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