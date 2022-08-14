<!-- 全部订单 -->
<template>
  <div class="View-box" v-loading="loading">
    <div class="View-top-box">
      <div class="View-top-left">
        <el-button type="primary" @click.stop="Jump">退款订单</el-button>
      </div>
      <div class="View-top-right">
        <div class="ml-10">
          <el-input
            v-model="input"
            placeholder="订单编号"
            style="width: 150px"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-input
            v-model="Commodity"
            placeholder="商品关键字"
            style="width: 150px"
          ></el-input>
        </div>
        <div class="ml-10">
          <el-select
            v-model="value"
            placeholder="请选择支付渠道"
            style="width: 150px"
          >
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
        <div class="ml-10">
          <el-button @click.stop="empty">清空</el-button>
          <el-button type="primary" @click.stop="screen">筛选</el-button>
        </div>
        <!-- 已选 -->
        <div class="drawerMore">
          <img
            src="@/assets/img/icon-filter.png"
            alt=""
            @click.stop="drawer = true"
          />
          
          <el-button @click.stop="drawer = true" type="text"> 更多 </el-button>
          <!-- <span>更多</span> -->
        </div>
      </div>
    </div>
    <!-- 下半部分 -->
    <!-- <div class="View-bottom-box"> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane :label="`全部(${total})`" name=0>
      </el-tab-pane> -->
      <el-tab-pane label="全部" name="0"> </el-tab-pane>
      <el-tab-pane label="已支付(99)" name="9"> </el-tab-pane>
      <el-tab-pane label="支付中(512)" name="5"> </el-tab-pane>
      <el-tab-pane label="未支付(1936)" name="1"> </el-tab-pane>
      <el-tab-pane label="已取消(0)" name="7"> </el-tab-pane>
    </el-tabs>
    <div class="bottom-box-mian">
      <el-table
        :data="tableData"
        @sort-change="sortChange"
        style="width: 100%"
        :default-sort="{ prop: 'id', order: 'descending' }"
      >
        <el-table-column prop="id" label="ID" sortable="custom" width="100">
        </el-table-column>
        <el-table-column prop="avatar" label="学员" width="210">
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
        <el-table-column prop="goods_name" label="商品名称" width="300">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            {{ tableData[scope.$index].goods[0].goods_name }}
          </template>
        </el-table-column>
        <el-table-column
          prop="charge"
          label="支付金额"
          sortable="custom"
          width="150"
        >
          <template slot-scope="scope">
            ￥{{ tableData[scope.$index].charge }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="支付渠道" width="150">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
          <div class="cell" v-if="tableData[scope.$index].payment == 'handPay'">
            <span><img src="@/assets/img/card.png" width="30" height="30" /></span>
          </div>
          <div class="cell" v-else><span>-</span></div>
          </template>
        </el-table-column>
        <el-table-column prop="status_text" label="支付状态" width="150">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <div
              style="color: orange"
              v-if="tableData[scope.$index].status_text == '未支付'"
            >
              {{ tableData[scope.$index].status_text }}
            </div>
            <div
              style="color: green"
              v-if="tableData[scope.$index].status_text == '已支付'"
            >
              {{ tableData[scope.$index].status_text }}
            </div>
            <div
              style="color: yellow"
              v-if="tableData[scope.$index].status_text == '支付中'"
            >
              {{ tableData[scope.$index].status_text }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="退款" width="128">
          <div class="cell"><span>-</span></div>
        </el-table-column>
        <!-- prop="created_at" -->
        <el-table-column
          prop="created_at"
          label="订单创建时间"
          sortable="custom"
          width="220"
        >
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            {{ tableData[scope.$index].created_at | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作" width="120">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <el-link type="primary" @click.stop="detail">查看</el-link>
            <el-dropdown>
              <el-link type="primary" style="margin-left: 5px;">
                <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </el-link>
              <el-dropdown-menu slot="dropdown">

                <!-- 判断 -->
                <el-dropdown-item v-if="tableData[scope.$index].status_text == '已支付'">
                  <el-button type="text" @click.stop="dialogFormVisible = true"
                    >退款</el-button
                  >
                </el-dropdown-item>
                <el-dropdown-item  v-else style="color:gray" disabled >
                  <el-button type="text" @click.stop="dialogFormVisible = true"
                    >退款</el-button
                  >
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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

    <!-- 退款 -->
    <el-dialog title="退款" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="退款方式" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="退款金额" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 更多 -->
    <el-drawer :size="360" :visible.sync="drawer" :with-header="false">
      <div class="n-padding-box">
        <div class="title mb-20">更多筛选</div>

        <div class="j-flex">
          <el-input
            v-model="input"
            placeholder="订单编号"
            style="width: 292px"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-input
            v-model="Commodity"
            placeholder="商品关键字"
            style="width: 292px"
          ></el-input>
        </div>
        <div class="j-flex mt-20">
          <el-select
            v-model="value"
            placeholder="请选择支付渠道"
            style="width: 292px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>

        <div class="j-flex mt-20">
          <el-select
            v-model="newvalue"
            placeholder="是否有退款"
            style="width: 292px"
          >
            <el-option
              v-for="item in newoptions"
              :key="item.newvalue"
              :label="item.label"
              :value="item.newvalue"
            >
            </el-option>
          </el-select>
        </div>

        <div class="j-flex mt-20">
          <el-date-picker
            v-model="created_at"
            type="daterange"
            range-separator="至"
            start-placeholder="订单添加开始时间"
            end-placeholder="结束时间"
            :picker-options="pickerOptions"
          ></el-date-picker>
        </div>
        <div class="j-b-flex mt-30">
          <el-button @click.stop="empty">清空</el-button>
          <el-button @click.stop="screen" type="primary">筛选</el-button>
        </div>
      </div>
    </el-drawer>
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
      //日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      //更多
      drawer: false,
      //退款
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
      // 排序
      tableData: [], // 数据列表
      currpage: 1, //当前页码
      proptype: "", //存放column.prop的字符串值

      loading: "true",
      options: [
        {
          value: "alipay",
          label: "支付宝支付",
        },
        {
          value: "wechat",
          label: "微信支付",
        },
        {
          value: "handPay",
          label: "线下打款",
        },
      ],
      newoptions: [
        {
          newvalue: "-1",
          label: "是否有退款",
        },
        {
          newvalue: "1",
          label: "有退款",
        },
        {
          newvalue: "0",
          label: "无退款",
        },
      ],
      newvalue: "",
      created_at: "",
      value: "",
      activeName: "0",
      tableData: [],
      data: {},
      users: {},
      user_id: {},
      total: null,
      totals: "555",
      currentPage: 1,
      input: "",
      Commodity: "",
      numser: {
        page: 1,
        size: 10,
        sort: "id",
        order: "desc",
        order_id: null,
        is_refund: -1,
        status: 0,
        goods_name: null,
        payment: null,
        created_at: null,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    //退款
    // 排序
    sortChange(column) {
      //打印看看参数有哪些？
      console.log("排序", column.prop, column.order);
      this.currpage = 1; // 排序后返回第一页
      this.proptype = column.prop; // 将键名prop赋值给变量proptype
      this.tableData = this.tableData.sort(
        this.SortFun(column.prop, column.order === "descending")
      );
      /* if (column.order === "descending") {
        //大到小
        this.tableData = this.tableData.sort(this.SortFun(column.prop, 1)); //从大到小
      } else if (column.order === "ascending") {
        this.tableData = this.tableData.sort(this.SortFun(column.prop, -1)); //从小到大
      } */
    },
    SortFun(attr, rev) {
      //第一个参数传入info里的prop表示排的是哪一列，第二个参数是升还是降排序
      if (rev == undefined) {
        rev = 1;
      } else {
        rev = rev ? 1 : -1;
        //rev = rev>0 ? 1 : -1;
      }
      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      };
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
      // this.getorder(this.numser);
    },
    //筛选
    screen() {
      this.numser.goods_name = this.Commodity;
      this.numser.order_id = this.input;
      this.numser.payment = this.value;
      this.numser.created_at = this.created_at;
      this.numser.is_refund = this.newvalue;
      this.getorder(this.numser);
      this.drawer = false;
    },

    detail: function () {
      this.$router.push({
        name: "Financedetail",
      });
    },

    Jump: function () {
      // path: "/order/refund",
      this.$router.push({
        name: "Financerefund",
        params: {
          is_local: -1,
          status: 0,
          page: 1,
          size: 10,
        },
      });
    },
    handleClick(tab, event) {
      this.numser.status = tab.name;
      this.getorder(this.numser);
    },
    formatter(row, column) {
      return row.address;
    },
    //请求
    async getorder(params) {
      let res = await this.$request.get("/order", { params });
      this.total = res.data.orders.total;
      // console.log(this.total);
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
    //订单编号
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
.View-box {
  width: 100%;
  background-color: #fff;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 100px;
  padding: 30px;
  .View-top-box {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    // padding-right: 30px;
    .View-top-left {
    }
    .View-top-right {
      display: flex;
      align-items: center;
      .ml-10 {
        margin-left: 10px;
      }
      .drawerMore {
        display: flex;
        align-items: center;
        img {
          width: 14px;
          height: 14px;
        }
        // span {
        //   color: blue;
        // }
      }
    }
  }
  .View-bottom-box {
    .bottom-box-mian {
      width: 100%;
      height: auto;
      float: left;
    }
    .bottom-bottom {
      margin: 50px 0;
      padding-bottom: 20px;
    }
  }
  .block {
    margin: 0px 425px;
  }
  .j-flex {
    display: flex;
    justify-content: center;
  }
  .mt-20 {
    margin-top: 20px;
  }
  .mb-20 {
    margin-bottom: 20px;
  }
  .cell {
  }
  .downcolor{
    color:red;
  }
}
</style>