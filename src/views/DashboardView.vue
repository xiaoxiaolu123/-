<!--  -->
<template>
  <div class="dashboard">
    <div class="header-box">
      <div class="logo-box">
        <a data-v-46b0c60a="" href="javascript:void(0)">
          <img
            src="data:image/png;base64,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"
            width="112"
            height="30"
          />
        </a>
      </div>
      <div class="page-name">{{ pageName }}</div>
      <div class="user-info">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{ user.name }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="change_pass">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="page-body">
      <div class="page-body-left-menus">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :default-active="defaultActive"
              class="el-menu-vertical-demo"
              @select="select"
              :unique-opened="true"
            >
              <template v-for="menu in activeMenus">
                <el-menu-item
                  v-if="menu.children.length === 0"
                  :key="menu.key"
                  :index="menu.key"
                >
                  <i class="iconfont" :class="menu.icon"></i>
                  <span slot="title">{{ menu.name }}</span>
                </el-menu-item>
                <el-submenu v-else :key="menu" :index="menu.key">
                  <template slot="title">
                    <i class="iconfont" :class="menu.icon"></i>
                    <span>{{ menu.name }}</span>
                  </template>
                  <el-menu-item
                    v-for="child in menu.children"
                    :index="child.key"
                    :key="child.key"
                    >{{ child.name }}
                  </el-menu-item>
                </el-submenu>
              </template>
            </el-menu>
          </el-col>
        </el-row>
      </div>

      <div class="page-main-body-box">
      
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import { mapState } from "vuex";
import Menus from "@/common/menus.js";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  data() {
    //这里存放数据
    return {
      pageName: "主页",
      defaultActive: "/dashboard",
    };
  },
  //监听属性 类似于data概念
  computed: {
    ...mapState({
      user: (state) => {
        return state.login.user || {};
      },
    }),
    activeMenus: function () {
      let menus = [];
      if (!this.user) {
        return menus;
      }
      for (let i = 0; i < Menus.length; i++) {
        let menuItem = Menus[i];
        if (menuItem.children.length === 0) {
          menus.push(menuItem);
        } else {
          let children = [];
          for (let j = 0; j < menuItem.children.length; j++) {
            if (this.user.is_super) {
              if (menuItem.children[j].permission === "super-slug") {
                children.push(menuItem.children[j]);
                continue;
              }
            }
            if (
              this.user.permissions &&
              this.user.permissions[menuItem.children[j].permission] !=
                undefined
            ) {
              children.push(menuItem.children[j]);
            }
          }
          if (children.length != 0) {
            menuItem.children = children;
            menus.push(menuItem);
          }
        }
      }
      return menus;
    },
  },
  //监控data中的数据变化
  watch: {
    $route: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        this.pageName = newValue.meta.title;
        this.defaultActive = newValue.meta.fatherPath; // 激活项进行动态的切换
      },
    },
  },
  //方法集合
  methods: {
    handleCommand: function (command) {
      if (command == "change_pass") {
        this.$router.push({
          path: "/dashboard/change-pass",
        });
      }
      if (command == "logout") {
        this.$request.post("logout").then((res) => {
          localStorage.removeItem("admin-token");
        });
        this.$router.push("/");
      }
    },
    select(key) {
      // this.pageName = key;
      this.$router.push(key)
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.$store.dispatch("login/getUserInfo");
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
/deep/ .el-menu-item.is-active {
  background-color: #409eff;
  color: #fff;

  i {
    color: white;
  }
}

/deep/ .el-menu-item,
.el-submenu {
  i {
    font-size: 24px;
    margin-right: 15px;
    color: #556;
  }
}

/deep/ .el-col {
  width: 100%;
}

.dashboard {
  .header-box {
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    position: relative;
    padding-left: 0;
    padding-right: 0;
    background-color: #fff;

    .logo-box {
      margin-left: 44px;
      margin-right: 44px;
      padding-top: 25px;

      a {
        img {
          width: 112px;
          aspect-ratio: auto 112 / 30;
          height: 30px;
        }
      }
    }

    .page-name {
      flex: 1;
      padding-left: 30px;
      font-size: 20px;
      font-weight: 600;
      color: #333;
      line-height: 56px;
      text-align: left;
    }

    .user-info {
      width: auto;
      padding-right: 30px;
    }
  }

  .page-body {
    width: 100%;
    height: calc(100vh - 56px);
    display: flex;

    .page-body-left-menus {
      width: 200px;
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      box-sizing: border-box;
      padding-top: 24px;
      background-color: #fff;
    }

    .page-main-body-box {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding: 20px 5px 20px 20px;
      overflow-y: auto;
      background-color: #f1f2f9;
    }
  }
}
</style>