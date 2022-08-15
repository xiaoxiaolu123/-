<!--  -->
<template>
  <div class="member">
    <div class="meedu-main-body">
      <top-vue title="学员详情"></top-vue>

      <div class="user-info-box">
        <div class="user-base-info-box">
          <div class="user-avatar">
            <img :src="uesrData.avatar" alt="" />
          </div>
          <div class="user-nickname">{{ uesrData.nick_name }}</div>
          <div class="buttons">
            <el-button
              type="primary"
              size="default"
              style="margin-right: 20px; margin-left: 30px"
              >实名信息</el-button
            >
            <el-link
              type="primary"
              style="margin-right: 20px"
              :underline="false"
              href=""
              target="_blank"
              >修改资料</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 20px"
              :underline="false"
              href=""
              target="_blank"
              >修改积分</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 20px"
              :underline="false"
              href=""
              target="_blank"
              >修改标签</el-link
            >
            <el-link
              type="primary"
              style="margin-right: 20px"
              :underline="false"
              href=""
              target="_blank"
              >修改备注</el-link
            >
          </div>
        </div>
      </div>
      <div class="panel-info-box">
        <div class="panel-info-item">ID: {{ uesrData.id }}</div>
        <div class="panel-info-item">手机号: {{ uesrData.mobile }}</div>
        <div class="panel-info-item">积分: {{ uesrData.credit1 }}</div>
        <div class="panel-info-item">
          VIP: {{ uesrData.role != null ? uesrData.role.name : "" }}
        </div>
        <div class="panel-info-item">
          VIP过期时间: {{ uesrData.role_expired_at }}
        </div>
        <div class="panel-info-item">
          一级邀请人: {{ uesrData.invitor == null ? "" : uesrData.invitor }}
        </div>
        <div class="panel-info-item">
          学员邀请码:
          {{
            uesrData.is_used_promo_code == 0
              ? "未使用"
              : uesrData.is_used_promo_code
          }}
        </div>
        <div class="panel-info-item">
          推广余额: {{ uesrData.invite_balance }}
        </div>
        <div class="panel-info-item">
          锁定登录: {{ uesrData.is_lock == 0 ? "否" : "是" }}
        </div>
        <div class="panel-info-item">IP地址:</div>
        <div class="panel-info-item">注册区域:</div>
        <div class="panel-info-item">
          标签:
          <el-tag
            style="marginleft: 5px"
            v-for="item in uesrData.tags"
            :key="item"
            >{{ item.name }}</el-tag
          >
        </div>
        <div class="panel-info-item">
          备注:
          <div
            v-if="uesrData.remark != null"
            v-html="uesrData.remark.remark"
          ></div>
        </div>
      </div>
    </div>
    <template>
      <el-tabs
        v-model="tabsKey"
        type="card"
        tab-position="top"
        @tab-click="tabsChange"
      >
        <!-- <el-tab-pane
        v-for="item in panes"
        :key="item.key"
        :label="item.label"
        :name="item.key"
      >
      </el-tab-pane> -->
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"
          >定时任务补偿</el-tab-pane
        >
      </el-tabs>
    </template>
  </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import TopVue from "@/components/Top.vue";
import TabsVue from "@/components/Tabs.vue";
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {
    TopVue,
    TabsVue,
  },
  data() {
    //这里存放数据
    return {
      id: "",
      uesrData: "",
      userCourses: "",
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick() {},
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    this.id = this.$route.params.id;
    let userRes = await this.$request("/member/" + this.id + "/detail");
    this.uesrData = userRes.data.data;
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
.member {
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
    .user-info-box {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      display: flex;
      justify-content: center;
      margin-top: 10px;
      flex-direction: column;
      .user-base-info-box {
        width: 100%;
        height: auto;
        float: left;
        box-sizing: border-box;
        padding-bottom: 20px;
        border-bottom: 1px solid #f3f6f9;
        display: flex;
        flex-direction: row;
        .user-avatar {
          width: 80px;
          height: 80px;
          float: left;
          margin-right: 20px;
          img {
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }

        .user-nickname {
          width: auto;
          height: 80px;
          float: left;
          font-size: 20px;
          font-weight: 600;
          color: #333;
          line-height: 80px;
        }

        .buttons {
          width: auto;
          height: 80px;
          float: left;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }

    .panel-info-box {
      width: 100%;
      height: auto;
      float: left;
      box-sizing: border-box;
      padding-bottom: 20px;
      padding-top: 30px;
      display: grid;
      row-gap: 30px;
      -moz-column-gap: 0;
      column-gap: 0;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      .panel-info-item {
        display: flex;
        width: auto;
        height: auto;
        font-size: 14px;
        font-weight: 400;
        color: #333;
        line-height: 14px;
        align-items: center;
      }
    }
    .aaa {
      width: 100%;
      height: auto;
      background-color: #fff;
      box-sizing: border-box;
      padding: 30px;
      border-radius: 15px;
      margin-bottom: 90px;
      box-shadow: 0 2px 4px 0 hsl(0deg 0% 40% / 5%);
      min-width: 1180px;
    }
  }
}
</style>