import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    meta: {
      title: '登录',
    },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      title: '主页',
    },
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/role',
        name: "Role",
        meta: {
          title: 'VIP会员',
        },
        component: () => import('@/views/operation/RoleView.vue'),
      },
      {
        path: '/promocode',
        name: 'Promocode',
        meta: {
          title: '优惠码',
        },
        component: () => import('@/views/operation/PromocodeView.vue'),
      },
      {
        path: '/wechat/messagereply/index',
        name: 'MessagereplyIndex',
        meta: {
          title: '公众号',
        },
        component: () => import('@/views/operation/WechatView.vue'),
      },
      {
        path: '/course/vod/index',
        name: 'vodIndex',
        meta: {
          title: '录播课',
        },
        component: () => import('@/views/course/IndexView.vue'),
      },
      {
        path: '/member/index',
        name: 'memberIndex',
        meta: {
          title: '学员列表',
        },
        component: () => import('@/views/member/IndexView.vue'),
      },
      {
        path: '/order/index',
        name: 'orderIndex',
        meta: {
          title: '全部订单',
        },
        component: () => import('@/views/order/IndexView.vue'),
      },
      {
        path: '/withdrawOrders',
        name: 'withdrawOrders',
        meta: {
          title: '余额提现',
        },
        component: () => import('@/views/order/WithdrawOrdersView.vue'),
      },
      {
        path: '/system/administrator',
        name: 'systemAdministrator',
        meta: {
          title: '管理人员',
        },
        component: () => import('@/views/system/AdministratorView.vue'),
      },
      {
        path: '/system/index',
        name: 'systemIndex',
        meta: {
          title: '系统配置',
        },
        component: () => import('@/views/system/IndexView.vue'),
      },
      {
        path: '/system/application',
        name: 'systemApplication',
        meta: {
          title: '功能模块',
        },
        component: () => import('@/views/system/ApplicationView.vue'),
      }, 
      {
        path: '/addRole',
        name: "addRole",
        meta: {
          title: 'VIP会员',
        },
        component: () => import('@/views/operation/AddRoleView.vue'),
      },

    ]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/decoration/pc',
    name: 'pc',
    component: () => import('@/views/decoration/PcView.vue')
  },
  {
    path: '/decoration/h5',
    name: 'h5',
    component: () => import('@/views/decoration/H5View.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let token = localStorage.getItem('admin-token');
  if (token) {
    next();
  } else {
    if (to.name === 'Login') {
      next();
    } else {
      next('/');
    }
  }
});
export default router
