<!-- 退款操作 -->
<template>
  <div class="Refun-box">
    <div class="View-top-box">
      <div class="top-left" @click.stop="go">
        <i class="el-icon-back"></i>
        返回
      </div>
      <div class="line"></div>
      <div class="pany">退款订单</div>
    </div>
    <div class="View-top-two">
      <div class="ml-10 w-150">
        <el-select v-model="value" filterable placeholder="请选择支付渠道">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="ml-10 w-150">
        <el-input v-model="input" placeholder="请输入手机号"></el-input>
      </div>

      <div class="ml-10 w-150">
        <el-input v-model="input" placeholder="请输入退款单号"></el-input>
      </div>

      <div class="ml-10 w-150">
        <el-select v-model="newvalue" filterable placeholder="退款类型">
          <el-option
            v-for="item in newoptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>

      <div class="ml-10 w-150">
        <el-select v-model="newvalues" filterable placeholder="退款状态">
          <el-option
            v-for="item in newoptionss"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <!-- 清空和筛选 -->
      <div class="ml-10 fun-btn">
        <el-button>清空</el-button>
        <el-button type="primary">筛选</el-button>
      </div>
      <!-- 已选 -->
      <div class="ml-10 d-flex drawerMore">
        <img src="@/assets/img/icon-filter.png" alt="" />
        <el-button @click.stop="drawer = true" type="text"> 更多 </el-button>
        <!-- <span>更多</span> -->
      </div>
    </div>
    

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="date" label="ID" width="100">
      </el-table-column>
      <el-table-column prop="name" label="学员" width="300"> </el-table-column>
      <el-table-column prop="province" label="退款单号" width="300">
      </el-table-column>
      <el-table-column prop="city" label="退款类型" width="120"> </el-table-column>
      <el-table-column prop="address" label="支付渠道" width="150">
      </el-table-column>
      <el-table-column prop="zip" label="退款金额" width="80"> </el-table-column>
      <el-table-column prop="zip" label="状态" width="220"> </el-table-column>
      <el-table-column prop="zip" label="时间" width="200"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="60">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
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
          :total="0"
        >
        </el-pagination>
      </div>
    </div>
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

      //分页
      currentPage: 1,

      //   loading:'true',
      options: [
        {
          value: "选项1",
          label: "支付宝支付",
        },
        {
          value: "选项2",
          label: "微信支付",
        },
        {
          value: "选项3",
          label: "线下打款",
        },
      ],
      newoptions:[
        {
          value: "选项1",
          label: "退款类型",
        },
        {
          value: "选项2",
          label: "原渠道退回",
        },
        {
          value: "选项3",
          label: "线下打款(线上记录)",
        },
      ],
      newoptionss:[
         {
          value: "选项1",
          label: "退款状态",
        },
        {
          value: "选项2",
          label: "待处理",
        },
        {
          value: "选项3",
          label: "退款成功",
        },
        {
          value: "选项4",
          label: "退款异常",
        },
            {
          value: "选项5",
          label: "退款已关闭",
        },
      ],
      value: "",
      newvalue:"",
      newvalues:"",
      // 这是手机号和退款单号，
      input: "",

      tableData: [],
      numser: {
        is_local:-1,
        status:0,
        page:1,
        size:10,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    go() {
      this.$router.go(-1);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    // 接口
    async getrefund(params) {
      let res = await this.$request.get("/order/refund/list", { params});
      console.log(res);
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
    this.getrefund(this.numser);
    // console.log(this.$route.params.getsb);
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
<style lang='less' scoped>
.Refun-box {
   width: 100%;
    background-color: #fff;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 100px;
    padding: 30px;
  .View-top-box {
    display: flex;
    align-items: center;
    font-size: 16px;
    margin-bottom: 20px;
    .top-left {
      cursor: pointer;
    }
    .top-left:hover {
      color: #3ca7fa;
    }
    .line {
      width: 1px;
      height: 14px;
      background-color: #d8d8d8;
      margin-right: 15px;
      margin-left: 15px;
    }
  }

  .pany {
    font-weight: bold;
  }
  .View-top-two {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .d-flex {
      display: flex;
      align-items: center;
      img {
        width: 14px;
        height: 14px;
        margin-right: 5px;
      }
      .drawerMore {
        height: 14px;
        font-size: 16px;
        font-weight: 400;
        color: #666;
        line-height: 14px;
        cursor: pointer;
      }
    }
  }
  .ml-10 {
    margin-left: 10px;
  }
  .w-150 {
    width: 150px;
  }
  .bottom-bottom {
    padding: 20px 0 0 0;
    .block {
      display: flex;
      justify-content: center;
    }
  }
 
}
</style>