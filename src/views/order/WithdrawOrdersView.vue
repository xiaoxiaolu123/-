<!-- 余额提现 -->
<template>
  <div class="Balance-box">
    <div class="Balance-top">
      <div class="operation-left">
        <el-button type="primary" @click="open">批量操作</el-button>
      </div>
      <div class="operation-right">
        <!-- 学员id -->
        <div class="ml">
          <el-input v-model="input" placeholder="学员ID" style="width:150px"></el-input>
        </div>
        <!-- 全部筛选 -->
        <div class="ml">
          <el-select v-model="value" placeholder="请选择" style="width:150px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <!-- 清空和筛选 -->
        <div class="ml">
          <el-button @click.stop="empty">清空</el-button>
          <el-button type="primary" @click.stop="screen">筛选</el-button>
        </div>
      </div>
    </div>
    <div class="Balance-bottom">
      <!-- 内容 -->
      <div class="bottom-top">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" disabled> </el-table-column>
          
          <el-table-column prop="id" label="ID" width="55">
          </el-table-column>
          <el-table-column prop="user_id" label="学员ID" width="120">
          </el-table-column>
          <!-- show-overflow-tooltip -->
          <el-table-column prop="address" label="学员" width="300">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <div style="display: flex; align-items: center">
              <img
                :src="users[tableData[scope.$index].user_id].avatar"
                alt=""
                style="
                  width: 40px;
                  height: 40px;
                  margin-right: 10px;
                  border-radius: 50%;
                "
              />
              <div>
                {{ users[tableData[scope.$index].user_id].nick_name }}
              </div>
            </div>
          </template>
          </el-table-column>
          <el-table-column prop="before_balance" label="提现金额" width="80">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
            {{ tableData[scope.$index].before_balance }}元
          </template>
          </el-table-column>
          <el-table-column prop="name" label="打款信息" width="300">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
             <div>渠道:{{ tableData[scope.$index].channel}}</div> 
              <div>姓名:{{ tableData[scope.$index].channel_name}}</div>
              <div>账号:{{ tableData[scope.$index].total}}</div> 
            </template>
          </el-table-column>
          <el-table-column prop="name" label="状态" width="150">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">

              <el-tag v-if="tableData[scope.$index].status==0">待处理</el-tag>
              <el-tag type="info" v-if="tableData[scope.$index].status==1">已处理</el-tag>
              <el-tag type="danger" v-if="tableData[scope.$index].status==2">已驳回</el-tag>
        
            </template>
          </el-table-column>
          <el-table-column prop="remark" label="备注" width="300">
          </el-table-column>
          <el-table-column prop="name" label="添加时间" width="200">
            <!-- eslint-disable-next-line -->
            <template slot-scope="scope">
            {{ tableData[scope.$index].created_at | dateFormat  }}
          </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页 -->
      <div class="bottom-bottom">
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
      options: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "待处理",
        },
        {
          value: "1",
          label: "已处理",
        },
        {
          value: "2",
          label: "已驳回",
        },
      ],
      value: "",
      input:"",

      tableData: [],
      total: null,
      users: {},
      loading: "true",
      user_id: {},

      multipleSelection: [],
      currentPage: 1,

      numser: {
        // sort: "id",
        // order: "desc",
        // is_refund: -1,
        
        // withdrawOrders:"",
       user_id: "",
        status: -1,
        keywords:"",
        page: 1,
        size: 10,
        
        order_id:null,
        goods_name:null,
        payment:null,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    open() {
        this.$message({
           showClose: true,
          message: '请选择需要操作的数据',
          type: 'error'
        });
    },
    //清空
    empty() {
      this.numser.page = 1;
      this.numser.size = 10;
      this.numser.sort = "id";
      this.numser.order = "desc";
      this.numser.order_id = null;
      (this.numser.is_refund = -1),
        (this.numser.status = "0"),
        this.getorder(this.numser);
      this.drawer = false;

    },
    //筛选
    screen(){
      // this.numser.goods_name=this.Commodity;
      this.numser.user_id=this.input;
      this.numser.status=this.value;
      this.getorder(this.numser);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //请求
    async getorder(params) {
      let res = await this.$request.get("/member/inviteBalance/withdrawOrders", { params });
      this.total = res.data.orders.total;
      console.log(this.total);
      this.tableData = res.data.orders.data;
      // console.log(this.tableData);
      this.users = res.data.users;
      // console.log(this.users);
      this.loading = false;
      this.user_id = res.data.orders.data;
    },
    handleSizeChange(val) {
      this.numser.size = val;
      this.getorder(this.numser);
    },
    handleCurrentChange(val) {
      this.numser.page = val;
      this.getorder(this.numser);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getorder(this.numser);
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
.Balance-box {
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
   padding: 30px;
  .Balance-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    .operation-right {
      display: flex;
      .ml {
        margin-left: 10px;
      }
    }
  }
  .Balance-bottom{
    .bottom-top{
    }
    .bottom-bottom{
        .block{
            display: flex;
            justify-content: center;
        }
    }
  }
}
</style>