import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import '@/assets/common/reset.css';
import '@/assets/common/iconfont/iconfont.css';
import '@/assets/common/variable.less';
import instance from '@/api/instance';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/common/common.less';
import moment from "moment";
// 引入moment日期处理插件
Vue.prototype.$moment =moment;
Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$request = instance;
// 处理时间
Vue.filter("dateFormat", function (dateStr, pattern = "YYYY-MM-DD HH:mm") {
  if (!dateStr) {
    return dateStr;
  }
  return moment(dateStr).format(pattern);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


