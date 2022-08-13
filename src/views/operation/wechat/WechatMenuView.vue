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
        <el-button type="primary" size="default" @click="update">
          将菜单更新到微信公众号
        </el-button>
      </div>

      <div class="mp-menu-edit-box">
        <div class="menu-render-box">
          <div class="menus">
            <div class="menu-item">
              <i class="el-icon-plus"></i>
            </div>
          </div>
        </div>

        <div class="menu-edit-box">
          <div class="name menu-item">
            <div class="helper-text">菜单名</div>
            <div class="c-red">*</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
          </div>

          <div class="type menu-item">
            <div class="helper-text">菜单类型</div>
            <div class="inp">
              <el-select style="width:300px" v-model="select" slot="prepend" placeholder="请选择">
                <el-option label="跳转网页" value="1"></el-option>
                <el-option label="点击事件" value="2"></el-option>
                <el-option label="打开小程序" value="3"></el-option>
              </el-select>
            </div>
          </div>

          <div class="net menu-item" v-if="select == 1">
            <div class="helper-text">网址</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
          </div>

          <div class="event menu-item" v-if="select == 2">
            <div class="helper-text">事件Key</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
          </div>

          <div class="AppId menu-item" v-if="select == 3">
            <div class="helper-text">小程序AppID</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
          </div>

           <div class="AppRouter menu-item" v-if="select == 3">
            <div class="helper-text">小程序打开页面路径</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
          </div>

          <div class="AppURL menu-item" v-if="select == 3">
            <div class="helper-text">URL地址</div>
            <div class="inp">
              <el-input style="width:300px" placeholder="" size="normal" clearable></el-input>
            </div>
            <div>
              <span class="helper-text">
                 不支持打开小程序的老版客户端将会打开该地址 
              </span>
            </div>
          </div>

          <div class="del menu-item">
            <el-button type="danger" size="default" @click="del">
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
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {},
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