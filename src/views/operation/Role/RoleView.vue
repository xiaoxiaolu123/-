<!-- VIP会员 -->
<template>
  <div class="role">
    <div class="meedu-main-body">
      <div class="top">
        <el-button type="primary" size="default" @click="goAdd">添加</el-button>
      </div>
      <div class="bottom">
        <el-table :data="tableData"  stripe >
          <el-table-column
            v-for="(col) in columns"
            :prop="col.id"
            :key="col.id"
            :label="col.label"
            :width="col.width"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="col.id=='id'">{{scope.row.id}}</span>
              <span v-if="col.id=='name'">{{scope.row.name}}</span>
              <span v-if="col.id=='expire_days'">{{scope.row.expire_days}}</span>
              <span v-if="col.id=='charge'">{{scope.row.charge}}</span>
              <el-button v-if="col.id=='cz'"
                @click="handleClick(scope.row)"
                type="text"
                size="middle"
                class="del"
                >删除</el-button
              >
              <el-button  v-if="col.id=='cz'" type="text" size="middle" @click="goEditrole(scope.row)">编辑</el-button>
              
            </template>
          </el-table-column>
        </el-table>
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
      tableData: [],
      columns: [
        {
          id: "id",
          label: "ID",
          width: "120",
        },
        {
          id: "name",
          label: "VIP",
          width: "280",
        },
        {
          id: "expire_days",
          label: "天数",
          width: "280",
        },
        {
          id: "charge",
          label: "价格",
          width: "280",
        },

        {
          id: "cz",
          label: "操作",
          width: "160",
        },
      ],
    };
  },
  //监听属性 类似于data概念
  computed: {},
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    handleClick:function(e){
      this.$request.delete('role/'+e.id).then(()=>{
        this.$request.get("role").then((res)=>{
          this.tableData = res.data.data;
        })
      });
    },  
    goEditrole:function(e){
      console.log(e.id)
      this.$router.push({
        path:'/editRole',
        query:{
          id:e.id
        }
      })
    },  
    goAdd:function(){
      this.$router.push("/addRole")
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  async created() {
    let roleRes = await this.$request.get("/role");
    this.tableData = roleRes.data.data;
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
/deep/ .del{
  color: red;
}
.role {
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
      width: 100%;
      height: auto;
    }
  }
}
</style>