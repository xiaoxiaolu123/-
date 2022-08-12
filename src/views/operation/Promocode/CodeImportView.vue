<!-- 优惠码批量生成 -->
<template>
  <div class="codeImport">
    <div class="meedu-main-body">
     
      <top-vue title="优惠码批量生成"></top-vue>
      <div class="user-import-box">
        <div class="btn">
          <el-button type="primary" size="default" @click="choiceFile">
            选择Excel表格文件
          </el-button>

          <a href="https://www.yuque.com/meedu/fvvkbf/lpwsry">
            点击链接下载「优惠码批量导入模板」
          </a>
        </div>
        <div class="inp">
          <div style="display: none">
            <form ref="form" action="">
              <input
                type="file"
                name=""
                id=""
                ref="xlsfile"
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
import TopVue from "@/components/Top.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {TopVue},
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
    choiceFile() {
      this.$refs.xlsfile.click();
    },
    handleFile(e) {
      // 处理文件
      let files = e.target.files;
      if (files.length === 0) {
        this.$message.error("请选择文件");
        return;
      }
      let f = files[0];
      // 文件扩展名检测
      let extension = f.name.split(".");
      extension = extension[extension.length - 1];
      if (extension !== "xlsx") {
        this.$message.error("请选择xlsx文件");
        return;
      }

      // 读取数据
      let reader = new FileReader();
      reader.onload = (e) => {
        let data = new Uint8Array(e.target.result);
        let workbook = XLSX.read(data, { type: "array", cellDates: true });
        //将表格数据切片分页
        let parseData = this.parseData(workbook);
        // parseData.splice(0, 1);

        if (parseData.length === 0) {
          this.$message.error("数据为空");
          return;
        }
        this.loading = true;
        this.$request.post('/promoCode/import',{ data: parseData })
          .then((res) => {
            if(res.status==0){
              this.$message.success("导入成功");
              this.$router.back();
            }else{
              this.$refs.xlsfile.value='';

              this.loading = false;
              this.$message({
                showClose: true,
                message: res.message,
                type: 'error'
              })
            }
            
          })
          .catch((e) => {
            this.loading = false;
            this.$message({
              showClose: true,
              message: e.message,
              type: "error",
              duration: 0,
            });
          });
      };
      reader.readAsArrayBuffer(f);
    },
    parseData(workbook) {
      let data = [];
      workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
          header: 1,
        });
        if (roa.length) {
          data.push(...roa);
        }
      });
      return data;
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {
    this.$nextTick(() => {
      this.$refs.xlsfile.addEventListener("change", this.handleFile, false);
    });
  },
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