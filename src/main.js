import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import '@/assets/common/reset.css';
import '@/assets/common/iconfont/iconfont.css';
// import '@/assets/common/common.less';
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