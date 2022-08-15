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
      <div class="panel-box p-0 mb-30">
        <div class="panel-header">订单基础信息</div>
        <div class="panel-body">
          <div class="float-left">
            <div class="float-left d-flex mb-30">
              <div class="flex-1">UID：42</div>
              <div class="flex-1">学员：Mosquito</div>
              <div class="flex-1">订单ID：2546</div>
              <div class="flex-1">订单编号：4214423062</div>
              <div class="flex-1">总额：￥0</div>
            </div>
            <div class="float-left d-flex">
              <div class="flex-1">状态：已支付</div>
              <div class="flex-1">支付渠道：</div>
              <div class="flex-1">时间：2022-08-11 14:42</div>
              <div class="flex-1"></div>
              <div class="flex-1"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-box p-0 mt-30 mb-30">
        <div class="panel-header">订单商品</div>
        <div class="panel-body">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="newname" label="商品ID" width="120">
            </el-table-column>
            <el-table-column prop="name" label="商品" width="680">
            </el-table-column>
            <el-table-column prop="address" label="价格" width="200"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel-box p-0 mt-30">
        <div class="panel-header">支付记录</div>
        <div class="panel-body">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="date" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="newname" label="支付渠道" width="300">
            </el-table-column>
            <el-table-column prop="name" label="支付金额" width="580">
            </el-table-column>
            <el-table-column prop="address" label="渠道ID" width="120"> </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="panel-box p-0 mt-30">
        <div class="panel-header">退款记录</div>
        <div class="panel-body">
          <el-table :data="tableData2" style="width: 100%">
            <el-table-column prop="date" label="ID" width="120">
            </el-table-column>
            <el-table-column prop="newname" label="退款单号" width="300">
            </el-table-column>
            <el-table-column prop="newname" label="支付渠道" width="225">
            </el-table-column>
            <el-table-column prop="newname" label="退款类型" width="120">
            </el-table-column>
            <el-table-column prop="newname" label="退款金额" width="150">
            </el-table-column>
            <el-table-column prop="name" label="状态" width="220">
            </el-table-column>
            <el-table-column prop="name" label="提交时间" width="220">
            </el-table-column>
            <el-table-column prop="address" label="操作" width="60"> </el-table-column>
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
      tableData: [
        {
          date: "2546",
          newname: "11",
          name: "supervip",
          address: "0元",
        },
      ],
      //   tableData2:{

      //   },
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
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
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
    background-color: #fff;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
    margin-bottom: 100px;
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