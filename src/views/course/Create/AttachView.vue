<!-- 附件页面 -->
<template>
  <div class="AttachView">
    <Head>
      <template slot="title">
        <div class="title">课程附件管理</div>
      </template>
    </Head>
    <div class="add">
      <el-button type="primary" @click.stop="gotoAddAttachView">添加</el-button>
    </div>
    <div class="tabBox">
      <el-table
        :data="dataInfo"
        style="width: 100%"
        max-height="250"
        :header-cell-style="{ background: '#f1f2f9', color: 'black' }"
      >
        <el-table-column fixed prop="id" label="ID" width="120">
        </el-table-column>
        <el-table-column prop="name" label="附件名" width="290">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="500">
        </el-table-column>
        <el-table-column prop="download_times" label="下载次数" width="150">
          <template slot-scope="scope"
            ><span>{{ scope.row.download_times }}次</span></template
          >
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="60">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="open(scope)"
              type="text"
              size="big"
              style="color: red"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      // 前一页面传过来的课程id
      getID: this.$route.query.cid,
      //   接收附件接口数据
      dataInfo: [],
      attachId: null,
      tableData: {
        course_id: 2,
        created_at: "",
        deleted_at: null,
        disk: "",
        download_times: 0,
        extension: "png",
        id: 9,
        name: "ali.png",
        only_buyer: 1,
        path: "",
        size: 0,
        updated_at: "",
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //   删除警告的弹窗
    open(rows) {
      this.$confirm("确定操作?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.deleteRow(rows);
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
    // 删除方法s
    deleteRow(rows) {
      // http://1.14.239.98/backend/api/v1/course_attach/9
      this.attachId = rows.row.id;
      console.log(this.attachId);
      this.$request.delete(`course_attach/${this.attachId}`).then((res) => {
        this.getAttachData();
      });
    },
    // http://1.14.239.98/backend/api/v1/course_attach?course_id=254
    getAttachData: function () {
      this.$request.get(`course_attach?course_id=${this.getID}`).then((res) => {
        this.dataInfo = res.data.data;
        // console.log(this.dataInfo);
      });
    },
    // 跳转添加附件页面
    gotoAddAttachView:function(){
        this.$router.push('create');
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getAttachData();
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
<style lang="less"  scoped>
.AttachView {
  background-color: white;
  border-radius: 15px;
  padding: 20px 5px 20px 30px;
  .add {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .tabBox {
    el-table {
      el-table-column {
      }
    }
  }
}
</style>