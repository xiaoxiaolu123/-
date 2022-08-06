import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/DashboardView.vue'),
    children:[
      {
        path:'/role',
        component: () => import('@/views/operation/RoleView.vue'),
      },
      {
        path:'/promocode',
        component: () => import('@/views/operation/PromocodeView.vue'),
      },
      {
        path:'/wechat/messagereply/index',
        component: () => import('@/views/operation/WechatView.vue'),
      },
      {
        path:'/course/vod/index',
        component: () => import('@/views/course/IndexView.vue'),
      },
      {
        path:'/member/index',
        component: () => import('@/views/member/IndexView.vue'),
      },
      {
        path:'/order/index',
        component: () => import('@/views/order/IndexView.vue'),
      },
      {
        path:'/withdrawOrders',
        component: () => import('@/views/order/WithdrawOrdersView.vue'),
      },
      {
        path:'/system/administrator',
        component: () => import('@/views/system/AdministratorView.vue'),
      },
      {
        path:'/system/index',
        component: () => import('@/views/system/IndexView.vue'),
      },
      {
        path:'/system/application',
        component: () => import('@/views/system/ApplicationView.vue'),
      }
      
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

export default router
