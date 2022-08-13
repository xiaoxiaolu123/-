<!-- 选择要上传图片 -->
<template>
  <div class="SelectImg" :class="sendState == true ? 'mask' : 'hidden'">
    <div class="selectImgBox">
      <div class="top">
        <div class="title">选择图片</div>
        <div class="btn"><el-button>上传图片</el-button></div>
      </div>
      <div class="body">
        <div class="left">
          <div
            class="selectBtn-item"
            :class="flag == item.name ? 'active' : ''"
            v-for="item in fromRows"
            :key="item.key"
            @click.stop="onClick(item.name, item.key)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="right">
          <!-- 有图片 -->
          <div class="showBox">
            <div
              class="image-item"
              :class="item.url == selectImg ? 'active' : ''"
              :data="imglist"
              v-for="item in data"
              :key="item.id"
              @click.stop="select(item.url)"
            >
              <div class="image-render">
                <div class="image-view">
                  <img :src="item.url" alt="" />
                  <img
                    src="@/assets/home/selected.png"
                    alt=""
                    class="click"
                    :class="item.id == selectImg ? 'show' : ''"
                  />
                </div>
              </div>
              <div class="image-name">
                <div class="name">{{ item.name }}</div>
              </div>
            </div>
          </div>
          <!-- 无图片 -->
          <div class="empyBox" :class="flag2 == true ? 'show' : ''">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="15"
              layout="total, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <div class="btns">
        <el-button @click.stop="commit">确定</el-button>
        <el-button type="primary" @click.stop="cancel">取消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
  props: ["sendState"],
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      // 接收父组件的弹窗状态
      isState: this.sendState,
      // 要发送父组件的状态
      chidState: null,
      // 图片数据
      data: this.imglist,
      // 按钮状态选择
      flag: "",
      // 空白页是否显示
      flag2: false,
      // 图片是否被选中
      selectImg: "",
      // 当前页码
      currentPage: 1,
      // 图片接口要获取传参数
      page: 1,
      from: 0,
      size: 15,
      total: 0,
      //   按钮组
      fromRows: [
        { key: 0, name: "全部图片" },
        {
          key: 1,
          name: "幻灯片",
        },
        {
          key: 2,
          name: "课程封面",
        },
        {
          key: 3,
          name: "课程详情页",
        },
        {
          key: 4,
          name: "文章配图",
        },
      ],
      //   图片数据
      imglist: [],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.getImageData(val, this.size, this.from);
    },
    // 获取图片数据
    getImageData: function (
      page = this.page,
      size = this.size,
      from = this.from
    ) {
      // console.log(this.from);
      this.$request
        .get(`media/images`, {
          params: {
            page: page,
            size: size,
            from: from,
          },
        })
        .then((res) => {
          this.imglist = res.data.data.data;
          this.data = this.imglist;
          this.total = res.data.data.total;
          // 无数据显示空白页面
          if (this.total - this.page * 15 > -14) {
            this.flag2 = false;
          } else {
            this.flag2 = true;
          }
          // console.log(res.data.data);
        });
    },
    // 列表按钮点击切换
    onClick: function (name, key) {
      this.flag = name;
      this.from = key;
      this.getImageData(this.page, this.size, key);
    },
    // 获取选择图片的id
    select: function (val) {
      this.selectImg = val;
    },

    //  提交数据
    commit: function () {
      this.isState = false;
      this.$emit("childSendDate", {
        imgUrl: this.selectImg,
        childSate: this.isState,
      });
    },
    cancel: function () {
      this.isState = false;
      this.$emit("childSendDate", {
        childSate: this.isState,
      });
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.getImageData();
  },
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {
    // console.log(this.sendState);
  }, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.hidden {
  display: none;
}
.mask {
  display: block;
}
.SelectImg {
  position: fixed;
  inset: 0px;
  z-index: 2002;
  background-color: rgba(0, 0, 0, 0.5);
  .selectImgBox {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 881px;
    height: 674px;
    background: rgb(255, 255, 255);
    margin-top: -337px;
    margin-left: -440.5px;
    box-sizing: border-box;
    .top {
      width: 100%;
      height: 70px;
      float: left;
      box-sizing: border-box;
      padding: 26px 30px;
      font-size: 18px;
      font-weight: 400;
      color: rgb(51, 51, 51);
      line-height: 18px;
      .title {
        //   background-color: yellow;
        float: left;
      }
      .btn {
        float: right;
        //   background-color: yellowgreen;
      }
    }
    .body {
      width: 100%;
      height: 534px;
      float: left;
      display: flex;
      box-sizing: border-box;
      padding-left: 0;
      padding-right: 30px;
      padding-bottom: 0;
      .left {
        // background-color: yellowgreen;
        width: 170px;
        height: auto;
        margin-right: 30px;
        border-right: 1px solid #d8d8d8;
        border-radius: 3px;
        .active {
          background-color: rgba(60, 167, 250, 0.1);
          color: #333;
        }
        .selectBtn-item {
          width: 100%;
          height: auto;
          float: left;
          box-sizing: border-box;
          padding-left: 30px;
          padding-right: 30px;
          padding-top: 15px;
          padding-bottom: 15px;
          cursor: pointer;
          font-size: 15px;
          line-height: 15px;
          color: #333;
        }
      }

      .right {
        width: 100%;
        position: relative;
        //   background-color: yellowgreen;
        .showBox {
          // display: none;
          //   background-color: yellowgreen;
          width: 100%;
          height: auto;
          box-sizing: border-box;
          padding: 0;
          float: left;
          display: grid;
          row-gap: 27px;
          -moz-column-gap: 30px;
          column-gap: 30px;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          .active {
            z-index: 9999;
            background: #fff !important;
            border: 2px solid #3ca7fa;
            // border-bottom: none;
            box-sizing: border-box;
            .image-item {
              .image-name {
                display: flex;
                position: absolute;
                top: 110px;
                left: -2px;
                z-index: 10;
                background-color: yellow;
                border-bottom: 2px solid #3ca7fa;
                .name {
                  height: auto !important;
                  width: 96px !important;
                  word-wrap: break-word !important;
                  white-space: unset !important;
                  overflow: unset !important;
                  text-align: unset;
                }
              }
            }
          }
          .image-item:hover {
            z-index: 9999;
            background: #fff !important;
            border: 2px solid #3ca7fa;
            box-sizing: border-box;
          }
          .image-item {
            width: 110px;
            min-height: 142px;
            background: #f4fafe;
            box-sizing: border-box;
            cursor: pointer;
            position: relative;
            .image-render {
              height: 110px;
              display: flex;
              justify-content: center;
              align-items: center;
              .image-view {
                // background-image: url(http://1.14.239.98/storage/images/OatitX1Yuu9hEhvVCcaD7PQsHac7dImaKZkCgJbz.webp);
                width: 100%;
                height: 110px;
                display: flex;
                align-items: center;
                justify-items: center;
                background-repeat: no-repeat;
                background-size: contain;
                position: relative;
                img {
                  width: 100%;
                }
                .click {
                  display: none;
                  width: 30px;
                  top: 40%;
                  left: 40%;
                  position: absolute;
                }
              }
            }
            .image-name {
              width: 110px;
              height: auto;
              padding: 10px 5px;
              box-sizing: border-box;
              .name {
                width: 100px;
                height: 15px;
                font-size: 10px;
                font-weight: 400;
                color: #333;
                line-height: 15px;
                text-align: center;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
        .empyBox {
          display: none;
          z-index: 9999;
          position: absolute;
          left: 0px;
          width: 100%;
          height: 100%;
          top: 0;
          background-color: white;
          /deep/ .el-empty {
            margin-top: 100px;
          }
        }
        .block {
          position: absolute;
          // display: flex;
          bottom: 0px;
          margin-left: 50px;
        }
        .show {
          display: block !important;
        }
      }
    }
    .btns {
      // background-color: blueviolet;
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      padding: 15px 30px;
      box-shadow: 0 -2px 4px 0 hsl(0deg 0% 40% / 5%);
      /deep/ .el-button {
        margin-right: 20px;
      }
    }
  }
}
</style>