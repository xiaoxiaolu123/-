import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);


const routes = [{
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
    children: [{
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
    children: [{
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
    children: [{
        path: '/course/vod',
        name: 'IndexView',
        component: () => import('@/views/course/IndexView.vue'),
        meta: {
          fatherPath: '/course/vod',
          title: '录播课',
        },
      },
      // 新建课程的主页
      {
        path: '/course/vod/create',
        component: () => import('@/views/course/Create/CreateCourseView.vue'),
        meta: {
          title: '新建课程',
        },
      },
      // 录播课分类的主页
      {
        path: '/course/vod/category/index',
        component: () => import('@/views/course/Category/IndexView.vue'),
        meta: {
          title: '录播课分类',
        },
      },
      // 添加课程分类的页面
      {
        path: '/course/vod/category/create',
        component: () => import('@/views/course/Category/CreateView.vue'),
        meta: {
          title: '添加课程分类'
        }
      },
      // 更新分类的页面
      {
        path: '/course/vod/category/update',
        component: () => import('@/views/course/Category/UpdateView.vue'),
        meta: {
          title: '更新课程分类'
        }
      },
      // 课程评论区的页面
      {
        path: '/course/vod/components/vod-comments',
        component: () => import('@/views/course/CourseCommentView.vue'),
        meta: {
          title: " 课程评论"
        }
      },
      // 章节管理 /course/vod/chapter/index
      // 课时评论的页面
      {
        path: '/course/vod/video/comments',
        component: () => import('@/views/course/Video/VideoCommentView.vue'),
        meta: {
          title: '课时评论'
        }
      },
      // 课时管理的页面 
      {
        path: '/course/vod/video/index',
        component: () => import('@/views/course/Video/CourseTimeView.vue'),
        meta: {
          title: '课时管理'
        }
      },
      // 添加课时
      {
        path: '/course/vod/video/create',
        component: () => import('@/views/course/Video/CreateVideoView.vue'),
        meta: {
          title: '添加课时'
        }
      },
      // 视频录入页面
      {
        path: '/course/vod/video-import',
        component: () => import('@/views/course/Video/VideoImportView.vue'),
        meta: {
          title: '视频批量导入'
        }
      },
      // 编辑录播课程
      {
        path: '/course/vod/update',
        component: () => import('@/views/course/Video/EditVideoView.vue'),
        meta: {
          title: '编辑录播课程'
        }
      },
      // 主页学员--录播学员
      {
        path: '/course/vod/1/view',
        component: () => import('@/views/course/Student/StudentView.vue'),
        meta: {
          title: '录播学员'
        }
      },
      // 主页课时里面学员模块--课时学习记录
      {
        path: '/course/vod/video/watch-records',
        component: () => import('@/views/course/Student/WatchRecordsView.vue'),
        meta: {
          title: '课时学习记录'
        }
      },
      // 主页更多--课程附件管理
      {
        path: '/course/vod/attach/index',
        component: () => import('@/views/course/Create/AttachView.vue'),
        meta: {
          title: '课程附件管理'
        }
      },
      // 附件里面的---添加课程附件
      {
        path: '/course/vod/attach/create',
        component: () => import('@/views/course/Create/AddAttachView.vue'),
        meta: {
          title: '添加课程附件'
        }
      },
      // {
      //   path: '/course/vod',
      //   name: 'CourseVod',
      //   component: () => import('@/views/HomeView.vue'),
      //   meta: {
      //     fatherPath: '/course/vod',
      //     title: '录播课',
      //   },
      // },

    ],
  },

  //学员

  //财务

  {
    path: '/finance',
    name: 'Finance',
    component: () => import('@/views/DashboardView.vue'),
    children: [{
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
      },
    ]},
    //主页

    //装修

    //课程

    //学员
    {
        path: "/member",
        name: "Member",
        component: () => import("@/views/DashboardView.vue"),
        children: [
            {
                path: "/member/index",
                name: "MemberIndex",
                component: () => import("@/views/member/IndexView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员列表",
                },
            },
            {
                path: "/member/create",
                name: "MemberCreate",
                component: () => import("@/views/member/CreateView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "添加学员",
                },
            },
            {
                path: "/member/import",
                name: "MemberImport",
                component: () => import("@/views/member/ImportView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员批量导入",
                },
            },
            {
                path: "/member/profile",
                name: "MemberProfile",
                component: () => import("@/views/member/ProfileView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "实名信息",
                },
            },
            {
                path:"/member/:id",
                name:'Member',
                component: () => import("@/views/member/MemberView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员详情",
                },
            },
            {
                path:"/member/:id/edit",
                name:'MemberEdit',
                component: () => import("@/views/member/EditView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员编辑",
                },
            },
            {
                path:"/member/:id/credit1",
                name:'MemberCredit1',
                component: () => import("@/views/member/Credit1View.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员积分",
                },
            },
            {
                path:"/member/:id/tags",
                name:'MemberTags',
                component: () => import("@/views/member/TagsView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员标签",
                },
            },
            {
                path:"/member/:id/remark",
                name:'MemberRemark',
                component: () => import("@/views/member/RemarkView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员备注",
                },
            },
            {
                path:"/member/tag/index",
                name:'MemberTagIndex',
                component: () => import("@/views/member/TagIndexView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员标签列表",
                },
            },
            {
                path:"/member/tag/create",
                name:'MemberTagCreate',
                component: () => import("@/views/member/TagCreateView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "添加学员标签",
                },
            },
            {
                path:"/member/tag/:id",
                name:'MemberTagEdit',
                component: () => import("@/views/member/TagEditView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "编辑学员标签",
                },
            },
        ],
    },
    //财务


    {
        path: "/finance",
        name: "Finance",
        component: () => import("@/views/DashboardView.vue"),
        children: [
            {
                path: "/finance/order-list",
                name: "FinanceOrderList",
                component: () => import("@/views/order/IndexView.vue"),
                meta: {
                    fatherPath: "/finance/order-list",
                    title: "全部订单",
                },
            },
            {
                path: "/finance/withdraw",
                name: "FinanceWithdraw",
                component: () => import("@/views/order/WithdrawOrdersView.vue"),
                meta: {
                    fatherPath: "/finance/withdraw",
                    title: "余额提现",
                },
            },
            {
                path: "/finance/order-list/refund",
                name: "Financerefund",
                component: () => import("@/views/order/Refundorder.vue"),
                meta: {
                    fatherPath: "/finance/order-list",
                    title: "全部订单",
                },
            },
            {
                path: "/finance/detail",
                name: "Financedetail",
                component: () => import("@/views/order/Orderdetails.vue"),
                meta: {
                    fatherPath: "/finance/order-list",
                    title: "全部订单",
                },
            },
            
        ],
    },

    //运营
    {
      path: '/operate',
      name: 'Operate',
      component: () => import('@/views/DashboardView.vue'),
      children: [{
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
            title: '公众号菜单',
          },
        },
      ],
    },
  

    //系统
    {
        path: "/system",
        name: "System",
        component: () => import("@/views/DashboardView.vue"),

        children: [
            {
                path: "/system/system-administrator",
                name: "system-administrator",
                component: () => import("@/views/system/AdministratorView.vue"),
                meta: {
                    fatherPath: "/system/system-administrator",
                    title: "管理人员",
                },
            },

            {
                path: "/system/config",
                name: "system-config",
                component: () => import("@/views/HomeView.vue"),
            },
            {
                path: "/system/system-application",
                name: "system-application",
                component: () => import("@/views/HomeView.vue"),
            },
            {
                path: "/system/system-administrator/create",
                name: "create",
                component: () => import("@/views/system/CreateView.vue"),
                meta: {
                    fatherPath: "/system/create",
                    title: "添加管理员",
                },
            },
            {
                path: '/system/adminroles',
                name: 'adminroles',
                component: () => import('@/views/system/AdminrolesView.vue'),
                meta: {
                  fatherPath: '/system/system-administrator',
                  title: '管理员角色',
                },
              },
              {
                path: '/system/adminroles/creata',
                name: 'adminroles',
                component: () => import('@/views/system/CreataView.vue'),
                meta: {
                  fatherPath: '/system/system-administrator',
                  title: '添加管理员角色',
                },
              },
              {
                path: '/system/adminroles/updata',
                name: 'adminroles',
                component: () => import('@/views/system/UpdataView.vue'),
                meta: {
                  fatherPath: '/system/system-administrator',
                  title: '编辑管理员角色',
                },
              },
              {
                path: '/system/system-administrator/update',
                name: 'update',
                component: () => import('@/views/system/UpdateView.vue'),
                meta: {
                  fatherPath: '/system/system-administrator',
                  title: '编辑管理员',
                },
              },
        ],
    },
  
   
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    let token = localStorage.getItem("admin-token");
    if (token) {
        next();
    } else {
        if (to.name === "Login") {
            next();
        } else {
            next("/");
        }
    }
});
export default router;
