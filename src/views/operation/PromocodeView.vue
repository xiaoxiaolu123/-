<!-- 优惠码 -->
<template>
  <div class="promocode">
    <div class="meedu-main-body">
      <div class="top">
        <div class="btnBox">
          <el-button type="primary" size="danger">批量删除</el-button>
          <el-button type="primary" size="default">添加</el-button>
          <el-button type="primary" size="default">批量导入</el-button>
          <el-button type="primary" size="default">批量生产</el-button>
        </div>

        <div class="inputBox">
          <el-input v-model="promotionCode" placeholder="优惠码" clearable></el-input>
          <el-input v-model="studentID" placeholder="学员ID" clearable></el-input>
          <el-button size="default">清空</el-button>
          <el-button type="primary" size="default">筛选</el-button>
          <div class="drawerMore" @click="drawer = true">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAAXNSR0IArs4c6QAAAOpQTFRFAAAAAAAAgICAVVVVbW1tbW1tYGBgaWlpZGRkZmZmYmJiYWFhampqZmZmZ2dnZGRkZ2dnZmZmZmZmZGRkZmZmZmZmZ2dnZWVlZWVlZGRkZWVlZmZmZWVlZ2dnZmZmZ2dnZmZmZmZmZ2dnZmZmZmZmZ2dnZmZmZ2dnZmZmZmZmZmZmZ2dnZmZmZWVlZ2dnZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZmZWVlZmZmZmZmZmZmZWVlZmZmZmZmu0wimAAAAE10Uk5TAAECBgcOEBEXGRodHR4lKSotPD1BRkhMU1RYZG1tbnJziYqPlqSlqaq0tri8vb3AwcbQ0dTZ4OHj5Obn6+3u7/Dz9PX29/j5+vz9/v4lSILoAAAA00lEQVQoz92SZxKCMBCFVyzYFbsodlHsvXcUFd37X0czjANicgHfj7dv58vMbjIBkFSkSpUA4LivU7U/vqGCeaCogMrb+ck988uy+sRDanB5idlZ/LIIGEk4bCPfLLo7CJ+c0GZ+K/PPtYTZifrIbXbusS5az5aw4/xkZxdL31OqKDuM5JCxaluPa2LZSBVscPblXYNnktQU9l2/1/apLVLaJx/twYZr4oshjUFvQ3zT+3dYwyIb8uNHjgnBO72LTAih2S3NhBBen68KC4IwXVm+1gubkCWZPFyEoAAAAABJRU5ErkJggg=="
              alt="" />
            <span>更多</span>
          </div>
        </div>
        <el-drawer title="" :visible.sync="drawer" direction="rtl" size="360px" :show-close="true" :with-header="false">
          <div class="n-padding-box">
            <div class="tlt">更多筛选</div>
            <el-input v-model="romotionCode" placeholder="优惠码" size="normal" clearable></el-input>
            <el-input v-model="studentID" placeholder="学员ID" size="normal" clearable></el-input>

            <div class="block">
              <el-date-picker v-model="pastData" type="daterange" range-separator="至" start-placeholder="过期时间-开始"
                end-placeholder="过期时间-结束">
              </el-date-picker>
            </div>

            <div class="block">
              <el-date-picker v-model="addData" type="daterange" unlink-panels range-separator="至"
                start-placeholder="添加时间-开始" end-placeholder="添加时间-结束" :picker-options="pickerOptions">
              </el-date-picker>
            </div>
            <div class="btn">
              <el-button size="default">清空</el-button>
              <el-button type="primary" size="default">筛选</el-button>
            </div>
          </div>
        </el-drawer>
      </div>

      <div class="bottom">
        <el-table ref="multipleTable" :data="tableData" header-row-class-name="tableHeader" size="medium"
          tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column label="ID" prop="id" width="120">

          </el-table-column>
          <el-table-column label="优惠码" width="300">
            <template slot-scope="scope">
              <div>{{ scope.row.code }}</div>
              <div>
                面值:{{ scope.row.invited_user_reward }}
              </div>
              <div>
                奖励:{{ scope.row.invite_user_reward }}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="可使用次数" show-overflow-tooltip width="300">
            <template slot-scope="scope">
              <el-tag type="danger" size="normal" v-if="scope.row.use_times == 0">不限制</el-tag>
              <el-tag type="info" size="normal" effect="light" v-if="scope.row.use_times != 0">{{ scope.row.use_times
              }}次
              </el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="used_times" label="已使用次数" show-overflow-tooltip width="150">
          </el-table-column>
          <el-table-column prop="expired_at" label="过期时间" show-overflow-tooltip width="200">
          </el-table-column>
          <el-table-column prop="created_at" label="添加时间" show-overflow-tooltip width="120">
          </el-table-column>
        </el-table>
      </div>

      <div class="page">
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="currentPage4" :page-sizes="[10, 20, 50, 100]" :page-size="10"
            layout="total, sizes, prev, pager, next, jumper" :total="total">
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
      promotionCode: "",
      studentID: "",
      drawer: false,
      passData: "",
      addData: "",
      page: 1,
      size: 10,
      tableData: [],
      total: 0,
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange: function (size) {
      this.size=size;
      this.$request.get('/promoCode', {
        params: {
          page: this.page,
          size: size
        }
      }).then((res)=>{
        this.tableData = res.data.data;
      })
    },
    handleCurrentChange:function(page){
      this.page=page;
      this.$request.get('/promoCode', {
        params: {
          page: page,
          size: this.size
        }
      }).then((res)=>{
        this.tableData = res.data.data;
      })
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let res = await this.$request.get('/promoCode', {
      params: {
        page: this.page,
        size: 10
      }
    })
    this.tableData = res.data.data;
    this.total = res.data.total;
    console.log(this.total)
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() { },
  beforeCreate() { }, //生命周期 - 创建之前
  beforeMount() { }, //生命周期 - 挂载之前
  beforeUpdate() { }, //生命周期 - 更新之前
  updated() { }, //生命周期 - 更新之后
  beforeDestroy() { }, //生命周期 - 销毁之前
  destroyed() { }, //生命周期 - 销毁完成
  activated() { }, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style  lang='less' scoped>
/deep/ .el-input {
  width: 130px;
}

/deep/ .tableHeader th {
  background-color: rgb(241, 242, 249);
  color: rgb(51, 51, 51);
  height: 71px;
}

.el-drawer {
  .n-padding-box {
    width: 100%;
    height: auto;
    padding: 30px;

    .tlt {
      width: 100%;
      height: 16px;
      font-size: 16px;
      font-weight: 400;
      color: #333;
      line-height: 16px;
      margin-bottom: 10px;
    }

    .el-input {
      margin-top: 20px;
      border-color: #c0c4cc;
      width: 100%;
    }

    .block {
      margin-top: 20px;

      /deep/.el-date-picker {
        width: 300px;
      }
    }
  }

  .btn {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.promocode {
  .meedu-main-body {
    width: 100%;
    height: auto;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 90px;
    box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
    min-width: 1180px;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .btnBox {
        display: flex;
        align-items: center;
      }

      .inputBox {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 530px;

        .drawerMore {
          height: 14px;
          font-size: 14px;
          font-weight: 400;
          color: #666;
          line-height: 14px;
          cursor: pointer;

          img {
            width: 14px;
            height: 14px;
            margin-right: 5px;
          }

          span {}
        }
      }
    }

    .bottom {
      margin-top: 30px;
    }

    .page {
      text-align: center;
      margin-top: 30px;
      width: 100%;
      height: auto;

      .block {
        text-align: center;
      }
    }
  }
}
</style>