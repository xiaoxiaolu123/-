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

Vue.use(ElementUI);


Vue.config.productionTip = false

Vue.prototype.$request = instance;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

let formatDateTime = function (date) {
  var y = date.getFullYear();
  var m = date.getMonth() + 1;//注意这个“+1”
  m = m < 10 ? ('0' + m) : m;
  var d = date.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = date.getHours();
  h=h < 10 ? ('0' + h) : h;
  var minute = date.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  var second=date.getSeconds();
  second=second < 10 ? ('0' + second) : second;
  return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};
