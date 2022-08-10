<!--  -->
<template>
  <div class="codeImport">
    <div class="meedu-main-body">
      <div class="top">
        <div class="btn-back" @click="goBack">
          <i class="el-icon-back"></i>
          返回
        </div>
        <div class="line"></div>
        <div class="name">优惠码批量生成</div>
      </div>

      <div class="user-import-box">
        <div class="btn">
          <el-button type="primary" size="default">
            选择Excel表格文件
            <!-- <input type="file" name="" id=""> -->
          </el-button>

          <a href="https://www.yuque.com/meedu/fvvkbf/lpwsry">
            点击链接下载「优惠码批量导入模板」
          </a>
        </div>
        <div class="inp">
          <div>
            <form action="">
              <input
                type="file"
                name=""
                id=""
                @click="
                  (e) => {
                    e.target.value = '';
                  }
                "
                ref="file"
                @change="uploading()"
                accept=".xls,.xlsx"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import XLSX from "xlsx";

export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      outputs: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    goBack: function () {
      this.$router.go(-1);
    },
    handlePreview: function (e) {
      console.log(e);
    },
    uploading: function (e) {
      let that = this;
      const files = this.$refs.file.files[0];
        console.log(files)
    //   if (files.length < 1) {
    //     return false;
    //   } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
    //     this.$toast("上传文件格式不正确，请上传xls或者xlsx格式");
    //     return false;
    //   }

      const fileReader = new FileReader();
    //   console.log(XLSX.utils.sheet_to_json(files))
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          console.log(workbook)
          const wsname = workbook.SheetNames[0]; // 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json                 表格内容
          console.log(ws);
          that.outputs = [];
          // 编辑数据
          for (let i = 0; i < ws.length; i++) {
            let sheetData = ws[i]; // 对数据自行操作
            that.outputs.push(sheetData);
          }
        } catch (e) {
            
          return false;
        }
      };
      fileReader.readAsBinaryString(files);
      console.log(this.outputs);
      //   this.$request
      //     .post("promoCode/import", {
      //       data: filedata,
      //     })
      //     .then((res) => {
      //       if (res.status == 0) {
      //         this.$router.go(-1);
      //       }
      //     });
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
<style  lang='less' scoped>
.codeImport {
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
      width: 100%;
      height: auto;
      margin-bottom: 30px;

      .btn-back {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        cursor: pointer;
      }

      .line {
        width: 1px;
        height: 14px;
        background-color: #d8d8d8;
        margin-right: 15px;
        margin-left: 15px;
      }

      .name {
        font-size: 14px;
        font-weight: 600;
        color: #333;
      }
    }

    .user-import-box {
      position: relative;
      width: 100%;
      height: auto;
      box-sizing: border-box;
      padding: 30px 100px;
      border-radius: 15px;
      background-color: #fff;

      .btn {
        z-index: 9;
        display: flex;
        align-items: center;
        margin-bottom: 15px;
        a {
          margin-left: 30px;
          color: #409eff;
        }
      }
    }

    .inp {
      opacity: 0;
      position: absolute;
      top: 30px;

      z-index: 999;
      form {
        display: block;
        margin-top: 0em;
        input {
          width: 160px;
          height: 40px;

          display: block;
          // visibility:hidden;
        }
      }
    }
  }
}
</style>