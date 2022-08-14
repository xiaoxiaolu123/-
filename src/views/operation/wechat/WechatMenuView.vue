<!--  -->
<template>
  <div class="WechatMenuView">
    <div class="meedu-main-body">
      <top title="公众号菜单"></top>

      <div class="commonProblem">
        <h3>常见问题</h3>
        <div class="helper-text">
          1.菜单编辑之后需要点击「更新菜单」按钮将更改同步到微信公众号，这样才是一次正确的菜单更新操作。
        </div>
        <div class="helper-text">
          1.
          2.点击「更新菜单」按钮之后，已修改的公众号菜单并不是立马就可以看到，最多需要等待10分钟才会看到最新修改的菜单
        </div>
        <div class="helper-text">
          3.自定义菜单最多包括3个一级菜单，每个一级菜单最多包含5个二级菜单。
        </div>
        <div class="helper-text">
          4.一级菜单最多4个汉字，二级菜单最多8个汉字，多出来的部分将会以“...”代替。
        </div>
      </div>

      <div class="btn">
        <el-button type="primary" size="default" @click="sync">
          将菜单更新到微信公众号
        </el-button>
      </div>

      <div class="mp-menu-edit-box">
        <div class="menu-render-box">
          <div class="menus">
            <div class="menu-item" v-for="(item, index) in menus" :key="index">
              <span @click="editMenuItem(item, index)">{{ item.name }}</span>
              <div class="children-box">
                <div
                  class="children-menu-item"
                  @click="addChildrenMenu(index)"
                  v-if="!item.sub_button || item.sub_button.length < 5"
                >
                  <i class="el-icon-plus"></i>
                </div>
                <template v-if="item.sub_button">
                  <div
                    class="children-menu-item"
                    @click="editMenuItem(childrenItem, index, childrenIndex)"
                    v-for="(childrenItem, childrenIndex) in item.sub_button"
                    :key="childrenIndex"
                  >
                    {{ childrenItem.name }}
                  </div>
                </template>
              </div>
            </div>
            <div class="menu-item" @click="addMenu" v-if="menus.length < 3">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>

        <div class="menu-edit-box" v-if="editItem.item">
          <div class="name menu-item">
            <div class="helper-text">菜单名</div>
            <div class="c-red">*</div>
            <div class="inp">
              <el-input
                v-model="editItem.item.name"
                style="width: 300px"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="type menu-item">
            <div class="helper-text">菜单类型</div>
            <div class="inp">
              <el-select
                style="width: 300px"
                v-model="select"
                slot="prepend"
                placeholder="请选择"
              >
                <el-option label="跳转网页" value="1"></el-option>
                <el-option label="点击事件" value="2"></el-option>
                <el-option label="打开小程序" value="3"></el-option>
              </el-select>
            </div>
          </div>

          <div class="net menu-item" v-if="select == 1">
            <div class="helper-text">网址</div>
            <div class="inp">
              <el-input
                v-model="editItem.item.url"
                style="width: 300px"
                placeholder="请输入网址"
                size="normal"
                clearable
              ></el-input>
            </div>
            <!-- <div
              style="margin-left: 10px"
              class="c-red"
              v-if="editItem.item.url"
            >
              {{ this.$utils.wechatUrlRules(editItem.item.url) }}
            </div> -->
          </div>

          <div class="event menu-item" v-if="select == 2">
            <div class="helper-text">事件Key</div>
            <div class="inp">
              <el-input
                v-model="editItem.item.key"
                style="width: 300px"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="AppId menu-item" v-if="select == 3">
            <div class="helper-text">小程序AppID</div>
            <div class="inp">
              <el-input
                v-model="editItem.item.appid"
                style="width: 300px"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="AppRouter menu-item" v-if="select == 3">
            <div class="helper-text">小程序打开页面路径</div>
            <div class="inp">
              <el-input
                v-model="editItem.item.pagepath"
                style="width: 300px"
                placeholder=""
                size="normal"
                clearable
              ></el-input>
            </div>
          </div>

          <div class="AppURL menu-item" v-if="select == 3">
            <div class="helper-text">URL地址</div>
            <div class="inp">
              <el-input
                style="width: 300px"
                placeholder=""
                v-model="editItem.item.url"
                size="normal"
                clearable
              ></el-input>
            </div>
            <div>
              <span class="helper-text">
                不支持打开小程序的老版客户端将会打开该地址
              </span>
            </div>
          </div>

          <div class="del menu-item">
            <el-button type="danger" size="default" @click="delMenuItem">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import top from "@/components/Top.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    top,
  },
  data() {
    //这里存放数据
    return {
      select: "",
      menus: [],
      editItem: {
        index: null,
        pIndex: null,
        item: null,
      },
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    getMenu() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      this.$api.Wechat.Menu.Index()
        .then((res) => {
          this.loading = false;

          let menu = res.data.menu;
          if (typeof menu.selfmenu_info === "undefined") {
            // 不是想要的数据
            return;
          }

          this.menus = [];
          let data = menu.selfmenu_info.button;
          data.forEach((item) => {
            if (item.sub_button) {
              item.sub_button = item.sub_button.list;
            } else {
              item.sub_button = [];
            }

            this.menus.push(item);
          });
        })
        .catch((e) => {
          this.$message.error(e.message);
        });
    },
    editMenuItem(menuItem, index, pIndex) {
      this.editItem.item = menuItem;
      this.editItem.index = index;
      this.editItem.pIndex = pIndex;
    },
    delMenuItem() {
      if (!this.editItem.item) {
        return;
      }
      console.log(this.editItem.index + "," + this.editItem.pIndex);
      if (this.editItem.pIndex === 0) {
        this.menus[this.editItem.index].sub_button = null;
      } else if (this.editItem.pIndex > 0) {
        this.menus[this.editItem.index].sub_button.splice(this.editItem.pIndex);
      } else {
        this.menus.splice(this.editItem.index, 1);
      }

      this.reset();
    },
    reset() {
      this.editItem.item = null;
      this.editItem.index = null;
      this.editItem.pIndex = null;
    },
    addMenu() {
      if (this.menus.length >= 3) {
        return;
      }
      this.menus.push({
        name: "未命名",
        type: null,
        sub_button: [],
      });

      this.reset();
    },
    addChildrenMenu(index) {
      if (this.menus[index].sub_button) {
        this.menus[index].sub_button.push({
          name: "未命名",
          type: null,
        });
      } else {
        this.menus[index].sub_button = [];
        this.menus[index].sub_button.push({
          name: "未命名",
          type: null,
        });
      }

      this.reset();
    },
    sync() {
      if (this.loading) {
        return;
      }
      if (this.menus.length == 0) {
        this.$message.error("请编辑菜单");
        return;
      }
      // 必填检测
      for (let i = 0; i < this.menus.length; i++) {
        let line = i + 1;
        if (!this.menus[i].name) {
          this.$message.error("第" + line + "个菜单的「菜单名」为空");
          this.setEditItem(i);
          return;
        }
        if (!this.menus[i].type) {
          this.$message.error("第" + line + "个菜单的「类型」为空");
          this.setEditItem(i);
          return;
        }

        if (this.menus[i].type === "view") {
          if (!this.menus[i].url) {
            this.$message.error("第" + line + "个菜单的「网址」为空");
            this.setEditItem(i);
            return;
          }
          if (this.$utils.wechatUrlRules(this.menus[i].url)) {
            this.$message.error(
              "第" +
                line +
                "个菜单的「网址」错误，必须携带http://或https://协议"
            );
            this.setEditItem(i);
            return;
          }
        } else if (this.menus[i].type === "click") {
          if (!this.menus[i].key) {
            this.$message.error("第" + line + "个菜单的「事件key」为空");
            this.setEditItem(i);
            return;
          }
        } else if (this.menus[i].type === "miniprogram") {
          if (!this.menus[i].appid) {
            this.$message.error("第" + line + "个菜单的「小程序appid」为空");
            this.setEditItem(i);
            return;
          }
          if (!this.menus[i].pagepath) {
            this.$message.error(
              "第" + line + "个菜单的「小程序打开页面路径」为空"
            );
            this.setEditItem(i);
            return;
          }
          if (!this.menus[i].url) {
            this.$message.error("第" + line + "个菜单的「URL地址」为空");
            this.setEditItem(i);
            return;
          }
        }
        if (this.menus[i].sub_button === undefined) {
          // 无子菜单
          if (!this.menus[i].name) {
            this.$message.error("第" + line + "个菜单的「菜单名」为空");
            this.setEditItem(i);
            return;
          }
          if (!this.menus[i].type) {
            this.$message.error("第" + line + "个菜单的「类型」为空");
            this.setEditItem(i);
            return;
          }

          if (this.menus[i].type === "view") {
            if (!this.menus[i].url) {
              this.$message.error("第" + line + "个菜单的「网址」为空");
              this.setEditItem(i);
              return;
            }
            if (this.$utils.wechatUrlRules(this.menus[i].url)) {
              this.$message.error(
                "第" +
                  line +
                  "个菜单的「网址」错误，必须携带http://或https://协议"
              );
              this.setEditItem(i);
              return;
            }
          } else if (this.menus[i].type === "click") {
            if (!this.menus[i].key) {
              this.$message.error("第" + line + "个菜单的「事件key」为空");
              this.setEditItem(i);
              return;
            }
          } else if (this.menus[i].type === "miniprogram") {
            if (!this.menus[i].appid) {
              this.$message.error("第" + line + "个菜单的「小程序appid」为空");
              this.setEditItem(i);
              return;
            }
            if (!this.menus[i].pagepath) {
              this.$message.error(
                "第" + line + "个菜单的「小程序打开页面路径」为空"
              );
              this.setEditItem(i);
              return;
            }
            if (!this.menus[i].url) {
              this.$message.error("第" + line + "个菜单的「URL地址」为空");
              this.setEditItem(i);
              return;
            }
          }
          continue;
        }

        // 存在子菜单
        for (let j = 0; j < this.menus[i].sub_button.length; j++) {
          let cLine = j + 1;

          if (!this.menus[i].sub_button[j].name) {
            this.$message.error(
              "第" + line + "个菜单的第" + cLine + "子菜单的「菜单名」为空"
            );
            this.setEditItem(i, j);
            return;
          }
          if (!this.menus[i].sub_button[j].type) {
            this.$message.error(
              "第" + line + "个菜单的第" + cLine + "子菜单的「类型」为空"
            );
            this.setEditItem(i, j);
            return;
          }

          if (this.menus[i].sub_button[j].type === "view") {
            if (!this.menus[i].sub_button[j].url) {
              this.$message.error(
                "第" + line + "个菜单的第" + cLine + "子菜单的「网址」为空"
              );
              this.setEditItem(i, j);
              return;
            }
            if (this.$utils.wechatUrlRules(this.menus[i].sub_button[j].url)) {
              this.$message.error(
                "第" +
                  line +
                  "个菜单的第" +
                  cLine +
                  "子菜单的「网址」错误，必须携带http://或https://协议"
              );
              this.setEditItem(i, j);
              return;
            }
          } else if (this.menus[i].sub_button[j].type === "click") {
            if (!this.menus[i].sub_button[j].key) {
              this.$message.error(
                "第" + line + "个菜单的第" + cLine + "子菜单的「事件key」为空"
              );
              this.setEditItem(i, j);
              return;
            }
          } else if (this.menus[i].sub_button[j].type === "miniprogram") {
            if (!this.menus[i].sub_button[j].appid) {
              this.$message.error(
                "第" +
                  line +
                  "个菜单的第" +
                  cLine +
                  "子菜单的「小程序appid」为空"
              );
              this.setEditItem(i, j);
              return;
            }
            if (!this.menus[i].sub_button[j].pagepath) {
              this.$message.error(
                "第" +
                  line +
                  "个菜单的第" +
                  cLine +
                  "子菜单的「小程序打开页面路径」为空"
              );
              this.setEditItem(i, j);
              return;
            }
            if (!this.menus[i].sub_button[j].url) {
              this.$message.error(
                "第" + line + "个菜单的第" + cLine + "子菜单的「URL地址」为空"
              );
              this.setEditItem(i, j);
              return;
            }
          }
        }
      }
      this.loading = true;

      let menuData = [];
      this.menus.forEach((item) => {
        if (item.sub_button && item.sub_button.length === 0) {
          delete item.sub_button;
        }
        menuData.push(item);
      });

      this.$request.put('mpWechat/menu',{
        menu: {
          button: menuData,
        },
      })
        .then(() => {
          this.$message.success(this.$t("common.success"));
          this.loading = false;
        })
        .catch((e) => {
          this.$message.error(e.message);
          this.loading = false;
        });
    },
    empty() {
      if (this.loading) {
        return;
      }
      this.$confirm("确认操作？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.loading = true;
          this.$api.Wechat.Menu.Destroy()
            .then(() => {
              this.$message.success(this.$t("common.success"));
              this.loading = false;
              this.menus = [];
            })
            .catch((e) => {
              this.$message.error(e.message);
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    setEditItem(index, cIndex) {
      this.reset();
      if (typeof cIndex !== "undefined") {
        this.editItem.item = this.menus[index].sub_button[cIndex];
        this.editItem.index = index;
        this.editItem.pIndex = cIndex;
      } else {
        this.editItem.item = this.menus[index];
        this.editItem.index = index;
        this.editItem.pIndex = null;
      }
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
.WechatMenuView {
  .meedu-main-body {
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

    .commonProblem {
      width: 100%;
      height: auto;
      h3 {
      }

      .helper-text {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.5);
      }
    }

    .btn {
      margin-bottom: 15px;
      margin-top: 15px;
    }

    .mp-menu-edit-box {
      width: 100%;
      height: auto;
      display: flex;
      .menu-render-box {
        position: relative;
        width: 360px;
        height: 500px;
        background-color: rgba(0, 0, 0, 0.05);
        .menus {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.05);
          display: flex;
          align-items: center;
          height: 50px;
          .menu-item {
            position: relative;
            flex: 1;
            text-align: center;
            font-size: 14px;
            color: #333;
            font-weight: 600;
            height: 50px;
            line-height: 50px;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            cursor: pointer;

            &:last-child {
              border-right: 0;
            }

            .children-box {
              position: absolute;
              bottom: 55px;
              left: 10px;
              width: 100px;
              background-color: rgba(0, 0, 0, 0.07);

              .children-menu-item {
                position: relative;
                width: 100%;
                height: 50px;
                float: left;
                text-align: center;
                line-height: 50px;
                border-top: 1px solid rgba(0, 0, 0, 0.03);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;

                &:first-child {
                  border-top: 0;
                }
              }
            }
          }
        }

        
      }
    }

    .menu-edit-box {
      flex: 1;
      box-sizing: border-box;
      padding-left: 50px;
      .menu-item {
        margin-bottom: 15px;
        width: 100%;
        height: auto;
        .helper-text {
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(0, 0, 0, 0.5);
        }

        .c-red {
          color: #ff4d4f;
        }
      }
    }
  }
}
</style>