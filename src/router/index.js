import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
    meta: {
      title: '登录',
    },
  },
  //主页
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    meta: {
      title: '主页',
    },
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/dashboard',
          title: '主页',
        },
      },
      {
        path: 'change-pass',
        name: 'ChangePass',
        component: () => import('@/views/ChangePassView.vue'),
        meta: {
          fatherPath: '/dashboard',
          title: '修改密码',
        },
      },
    ],
  },
  //装修
  {
    path: '/decoration',
    name: 'Decoration',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/decoration/pc',
        name: 'DecorationPC',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/decoration/h5',
        name: 'DecorationH5',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/decoration/singlePage',
        name: 'DecorationSinglePage',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  //课程
  {
    path: '/course',
    name: 'Course',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/course/vod',
        name: 'CourseVod',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/course/vod',
          title: '录播课',
        },
      },
      {
        path: '/course/live',
        name: 'CourseLive',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/course/topic',
        name: 'CourseTopic',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },
  //学员
  {
    path: '/member',
    name: 'Member',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/member/list',
        name: 'MemberList',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/member/list',
          title: '学员列表',
        },
      },
    ],
  },
  //财务
  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/finance/order-list',
        name: 'FinanceOrderList',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/finance/order-list',
          title: '全部订单',
        },
      },
      {
        path: '/finance/withdraw',
        name: 'FinanceWithdraw',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/finance/withdraw',
          title: '余额提现',
        },
      },
    ],
  },
  //运营
  {
    path: '/operate',
    name: 'Operate',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/operate/role',
        name: 'OperateRole',
        component: () => import('@/views/operation/Role/RoleView.vue'),
        meta: {
          fatherPath: '/operate/role',
          title: 'VIP会员',
        },
        
      },
      {
        path: '/addRole',
        name: 'addRole',
        component: () => import('@/views/operation/Role/AddRoleView.vue'),
        meta: {
          fatherPath: '/operate/role',
          title: '添加会员',
        },
      },
      {
        path: '/editRole',
        name: 'editRole',
        component: () => import('@/views/operation/Role/EditRoleView.vue'),
        meta: {
          fatherPath: '/operate/role',
          title: '编辑会员',
        },
      },
      {
        path: '/operate/promocode',
        name: 'OperatePromocode',
        component: () => import('@/views/operation/Promocode/PromocodeView.vue'),
        meta: {
          fatherPath: '/operate/promocode',
          title: '优惠码',
        },
      },
      {
        path: '/createcode',
        name: 'Createcode',
        component: () => import('@/views/operation/Promocode/CreatecodeView.vue'),
        meta: {
          fatherPath: '/operate/promocode',
          title: '添加优惠码',
        },
      },
      {
        path: '/createmulticode',
        name: 'Createmulticode',
        component: () => import('@/views/operation/Promocode/CreatemulticodeView.vue'),
        meta: {
          fatherPath: '/operate/promocode',
          title: '优惠码批量生成',
        },
      },
      {
        path: '/codeImport',
        name: 'CodeImport',
        component: () => import('@/views/operation/Promocode/CodeImportView.vue'),
        meta: {
          fatherPath: '/operate/promocode',
          title: '优惠码批量生成',
        },
      },
      {
        path: '/operate/message',
        name: 'OperateMessage',
        component: () => import('@/views/operation/wechat/WechatView.vue'),
        meta: {
          fatherPath: '/operate/message',
          title: '公众号',
        },
      },
      {
        path: '/wechat/messagereply/create',
        name: 'OperateMessage',
        component: () => import('@/views/operation/wechat/MessagereplyCreateView.vue'),
        meta: {
          fatherPath: '/operate/message',
          title: '新建自动回复',
        },
      },
      {
        path: '/wechat/messagereply/update',
        name: 'MessagereplyUpdate',
        component: () => import('@/views/operation/wechat/MessagereplyUpdateView.vue'),
        meta: {
          fatherPath: '/operate/message',
          title: '编辑自动回复',
        },
      },
      {
        path: '/decoration/mp-wechat-menu',
        name: 'WechatMenu',
        component: () => import('@/views/operation/wechat/WechatMenuView.vue'),
        meta: {
          fatherPath: '/operate/message',
          title: '编辑自动回复',
        },
      },
    ],
  },

  //系统
  {
    path: '/system',
    name: 'System',
    component: () => import('@/views/DashboardView.vue'),
    children: [
      {
        path: '/system/system-administrator',
        name: 'system-administrator',
        component: () => import('@/views/HomeView.vue'),
        meta: {
          fatherPath: '/system/system-administrator',
          title: '管理人员',
        },
      },
      {
        path: '/system/config',
        name: 'system-config',
        component: () => import('@/views/HomeView.vue'),
      },
      {
        path: '/system/system-application',
        name: 'system-application',
        component: () => import('@/views/HomeView.vue'),
      },
    ],
  },

  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
];

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
