import Vue from 'vue';
import Vuex from 'vuex';
import login from './loginModule';
// Vue 的原型上面添加一个属性，$store=> 指向仓库部分
// this.$store 访问到仓库数据以及方法
Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  // Vuex 五大模块
  // vue=> data 定义页面之间共享数据 => 响应式的 => 定义方式和vue data是一样的
  // state 本身是一个JS对象，页面刷新的时候，如果你没有做持久化处理，数据重新清空
  state: {
    
  },
  // vue 中的计算属性
  getters: {

  },
  mutations: {
    
  },
  actions: {},
  modules: {
    login,
  },
});
