<!-- 订单详情 -->
<template>
  <div class="orderdeta-box">
    <div class="order-top-box">
      <div class="top-left" @click.stop="go">
        <i class="el-icon-back"></i>
        返回
      </div>
      <div class="line"></div>
      <div class="pany">订单详情</div>
    </div>
    <div class="bottom-box">
      <div class="float-left mb-30" v-if="tableData.status_text != '已支付'">
        <el-button type="danger">改为已支付</el-button>
      </div>
      <!-- 上面基础信息 -->
      <div v-else></div>
      <div class="panel-box p-0 mb-30">
        <div class="panel-header">订单基础信息</div>
        <div class="panel-body">
          <div class="float-left">
            <div class="float-left d-flex mb-30">
              <div class="flex-1">UID：{{ user.id }}</div>
              <div class="flex-1">学员：{{ user.nick_name }}</div>
              <div class="flex-1">订单ID：{{ tableData.id }}</div>
              <div class="flex-1">订单编号：{{ tableData.order_id }}</div>
              <div class="flex-1">总额：￥{{ tableData.charge }}</div>
            </div>
            <div class="float-left d-flex">
              <div class="flex-1">状态：{{ tableData.status_text }}</div>
              <div class="flex-1">支付渠道：{{ tableData.payment_text }}</div>
              <div class="flex-1">
                时间：{{ tableData.created_at | dateFormat }}
              </div>
              <div class="flex-1"></div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel-box p-0 mt-30 mb-30">
        <div class="panel-header">订单商品</div>
        <div class="panel-body">
          <el-table :data="tableData.goods" style="width: 100%">
            <el-table-column label="ID" width="120">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                {{ scope.row.id }}
              </template>
            </el-table-column>
            <el-table-column prop="newname" label="商品ID" width="120">
              <template slot-scope="scope">
                {{ scope.row.goods_id }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="商品" width="680">
              <template slot-scope="scope">
                {{ scope.row.goods_name }}
              </template>
            </el-table-column>
            <el-table-column prop="address" label="价格" width="200">
              <template slot-scope="scope">
                {{ scope.row.goods_ori_charge }}元
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel-box p-0 mt-30">
        <div class="panel-header">支付记录</div>
        <div class="panel-body">
          <el-table :data="tableDatatwo" style="width: 100%">
            <el-table-column prop="date" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="newname" label="支付渠道" width="300">
            </el-table-column>
            <el-table-column prop="name" label="支付金额" width="580">
            </el-table-column>
            <el-table-column prop="address" label="渠道ID" width="120">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel-box p-0 mt-30">
        <div class="panel-header">退款记录</div>
        <div class="panel-body">
          <el-table :data="tableDatatwo.refund" style="width: 100%">
            <el-table-column prop="id" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="refund_no" label="退款单号" width="300">
            </el-table-column>
            <el-table-column prop="newname" label="支付渠道" width="225">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                <div class="cell" v-if="scope.row.payment == 'wechat'">
                  <span
                    ><img src="@/assets/img/wepay.png" width="30" height="30"
                  /></span>
                </div>
                <div class="cell" v-if="scope.row.payment == 'handPay'">
                  <span
                    ><img src="@/assets/img/card.png" width="30" height="30"
                  /></span>
                </div>
                <div class="cell" v-if="scope.row.payment == 'alipay'">
                  <span
                    ><img src="@/assets/img/ali-pay.png" width="30" height="30"
                  /></span>
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
            <el-table-column prop="newname" label="退款类型" width="120">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                <div class="cell" v-if="scope.row.is_local == 2">
                  <span>原渠道返回</span>
                </div>
                <div class="cell" v-if="scope.row.is_local == 1">
                  <span>线下退款</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="newname" label="退款金额" width="150">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                <span>{{ scope.row.amout /hundred}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="状态" width="220">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                <span>{{ scope.row.created_at | dateFormat }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="提交时间" width="220">
              <!-- eslint-disable-next-line -->
              <template slot-scope="scope">
                <div style="color: green" v-if="scope.row.status == 5">
                  · 退款成功
                  <div>{{ scope.row.success_at | dateFormat }}</div>
                </div>
                <div style="color: yellow" v-if="scope.row.status == 1">
                  · 待处理
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="address" label="操作" width="60">
              <el-link type="danger">删除</el-link>
            </el-table-column>
          </el-table>
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
      tableDatatwo: [],
      user: {},
      id: this.$route.query.id,
      number: {},
      hundred:100,
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
    //请求
    async getorder() {
      // console.log(this.user);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let res = await this.$request.get(`/order/${this.id}`);
    // console.log(this.id);
    // this.torderdata = res.data;
    this.tableData = res.data.order;
    this.tableDatatwo = res.data.order;
    this.user = res.data.user;
    // console.log(this.tableData.id);
    console.log(this.tableData);
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
.orderdeta-box {
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
  .order-top-box {
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
    .pany {
      font-weight: bold;
    }
  }
  .bottom-box {
    width: 100%;
    height: auto;
    float: left;
    .panel-box {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 15px;

      .panel-header {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding-left: 15px;
        border-left: 4px solid #409eff;
        font-size: 16px;
        font-weight: 700;
        color: #333;
        margin-bottom: 30px;
      }
      .panel-body {
        width: 100%;
        height: auto;
        float: left;
      }
    }
  }

  .float-left {
    width: 100%;
    height: auto;
  }
  .p-0 {
    padding: 0;
  }
  .mb-30 {
    margin-bottom: 30px;
  }
  .mt-30 {
    margin-top: 30px;
  }
  .d-flex {
    display: flex;
    align-items: center;
  }
  .flex-1 {
    flex: 1;
  }
}
</style>