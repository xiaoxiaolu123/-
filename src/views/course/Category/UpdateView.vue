<!-- 添加课程分类 -->
<template>
  <div class="createCategory">
    <div class="createCategoryBox">
      <!-- 头部 -->
      <div class="headBox">
        <Head>
          <template slot="title">
            <div id="title">添加课程分类</div>
          </template>
        </Head>
      </div>
      <!-- 表单 -->
      <div class="formBox">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 下拉框选择 -->
          <div class="line1">
            <el-form-item label="父级">
              <el-select v-model="ruleForm.region" placeholder="请选择">
                <el-option
                  v-for="items in categoriesInfo"
                  :key="items.id"
                  :value="items.name"
                  :id="items.id"
                  @click.native="getID(items.id)"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 排序 -->
          <div class="line1">
            <el-form-item label="升序" prop="order">
              <el-input type="number" v-model="ruleForm.order"></el-input>
              <span class="warn"
                ><i class="el-icon-warning"></i
                >请输入整数。小数排在前面，大数排在后面。</span
              >
            </el-form-item>
          </div>
          <!-- 分类名 -->
          <div class="line1">
            <el-form-item label="分类名" prop="className">
              <el-input v-model="ruleForm.className"></el-input>
            </el-form-item>
          </div>
          <!-- 是否显示 -->
          <div class="line1">
            <span class="title">显示</span>
            <el-switch v-model="value1"></el-switch>
          </div>
        </el-form>
      </div>
    </div>
    <!-- 底部 -->
    <div class="bottom">
      <div class="btns">
        <el-button type="primary" @click.stop="editCategory">保存</el-button>
        <el-button @click.stop="gotoIndexView">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "@/components/ReturnBackHead.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    Head,
  },
  data() {
    //下拉框存放数据
    return {
      ID: this.$route.query.id,
      // 接口获取的所有数据
      categories: {},
      //   分类数据
      categoriesInfo: [],
      // 是否显示按钮
      value1: false,
      // 存储下拉框的课程id
      id: "",
      //通过课程id获取父类id
      parentId: null,
      is_show: 1,
      //   存储数据
      ruleForm: {
        // 下拉框数据
        region: "",
        // 排序
        order: null,
        // 分类名
        className: null,
      },
      //  设置输入框聚焦提示
      rules: {
        order: [
          {
            required: true,
            message: "升序不能为空",
            trigger: "blur",
          },
        ],
        className: [
          {
            required: true,
            message: "分类名不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    // 捕获下拉框选择的类型ID
    getID: function (id) {
      this.id = id;
      //   console.log("捕获")
    },

    // 保存编辑数据
    editCategory: function () {
      if (this.id == "") {
        this.id = this.parentId;
      }
      if (this.value1 == false) {
        this.is_show = 0;
      } else {
        this.is_show = 1;
      }
      //   console.log(this.is_show);

      this.$request
        .put(`courseCategory/${this.ID}`, {
          id: this.ID,
          is_show: this.is_show,
          name: this.ruleForm.className,
          parent_id: this.id,
          sort: this.ruleForm.order,
        })
        .then((res) => {
        //   console.log(1);
        this.$nextTick(()=>{
            this.gotoIndexView();
        })
        })
        .catch((err) => {
          console.log(0);
        });
    },

    // 跳转分类主页
    gotoIndexView: function () {
      this.$router.go(-1);
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    console.log(this.getID);
    await this.$request.get(`courseCategory/create`, {}).then((res) => {
      this.categories = res.data;
      this.categoriesInfo = this.categories.categories;
    //   console.log(this.categoriesInfo);
    });
    await this.$request.get(`courseCategory/${this.ID}`).then((res) => {
      console.log(res);
      this.ruleForm.order = res.data.sort;
      this.parentId = res.data.parent_id;
      this.ruleForm.className = res.data.name;
      this.is_show = res.data.is_show;
      if (this.is_show == 0) {
        this.value1 = false;
      } else {
        this.value1 = true;
      }

      //   根据制定键值获取数据

      let ids = [this.parentId];
      const newArr = ids.map((item1) => {
        return this.categoriesInfo.find((item2) => item2.id === item1);
      });
    //   console.log(newArr);
      this.ruleForm.region = newArr[0].name;
      //   console.log(newArr[0].name)
    });
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
.createCategory {
  position: relative;
  height: 100%;
  width: calc(100%-200px);
  overflow: hidden;
  .createCategoryBox {
    background-color: white;
    // margin: 20px 5px 20px 20px;
    min-width: 1020px;
    border-radius: 15px;
    overflow: hidden;
    .headBox {
      margin-left: 30px;
      margin-top: 30px;
    }
    .formBox {
      margin-left: 120px;
      padding: 10px;
      margin-top: 10px;
      // background-color: white;
      .line1 {
        //   background-color: yellowgreen;
        height: 40px;
        line-height: 40px;
        margin-bottom: 22px;
        position: relative;
        /deep/ .el-select {
          position: absolute;
          left: 0px;
          // height: 40px;
          width: 300px;
        }
        /deep/ .el-input {
          position: absolute;
          left: 0px;
          width: 300px;
        }
        /deep/.el-switch {
          position: absolute;
          left: 100px;
          margin-top: 10px;
        }
        .title {
          position: absolute;
          left: 50px;
        }
        .warn {
          position: absolute;
          left: 310px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }
      }
    }
  }

  .bottom {
    position: absolute;
    // width:calc(100%-200px);
    width: 100%;
    height: 80px;
    bottom: 0px;
    line-height: 80px;
    background-color: white;
    .btns {
      position: absolute;
      bottom: 0px;
      left: 30px;

      /deep/.el-button {
        margin-right: 10px;
      }
    }
  }
}
</style>