import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Login",
        component: () => import("@/views/LoginView.vue"),
        meta: {
            title: "登录",
        },
    },
    //主页
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/DashboardView.vue"),
        meta: {
            title: "主页",
        },
        children: [
            {
                path: "",
                name: "DashboardHome",
                component: () => import("@/views/HomeView.vue"),
                meta: {
                    fatherPath: "/dashboard",
                    title: "主页",
                },
            },
            {
                path: "change-pass",
                name: "ChangePass",
                component: () => import("@/views/ChangePassView.vue"),
                meta: {
                    fatherPath: "/dashboard",
                    title: "修改密码",
                },
            },
        ],
    },
    //装修
    {
        path: "/decoration",
        name: "Decoration",
        component: () => import("@/views/DashboardView.vue"),
        children: [
            {
                path: "/decoration/pc",
                name: "DecorationPC",
                component: () => import("@/views/HomeView.vue"),
            },
            {
                path: "/decoration/h5",
                name: "DecorationH5",
                component: () => import("@/views/HomeView.vue"),
            },
            {
                path: "/decoration/singlePage",
                name: "DecorationSinglePage",
                component: () => import("@/views/HomeView.vue"),
            },
        ],
    },
    //课程
    {
        path: "/course",
        name: "Course",
        component: () => import("@/views/DashboardView.vue"),
        children: [
            {
                path: "/course/vod",
                name: "IndexView",
                component: () => import("@/views/course/IndexView.vue"),
                meta: {
                    fatherPath: "/course/vod",
                    title: "录播课",
                },
            },
            // 新建课程的主页
            {
                path: "/course/vod/create",
                component: () => import("@/views/course/Create/CreateCourseView.vue"),
                meta: {
                    title: "新建课程",
                },
            },
            // 录播课分类的主页
            {
                path: "/course/vod/category/index",
                component: () => import("@/views/course/Category/IndexView.vue"),
                meta: {
                    title: "录播课分类",
                },
            },
            // 添加课程分类的页面
            {
                path: "/course/vod/category/create",
                component: () => import("@/views/course/Category/CreateView.vue"),
                meta: {
                    title: "添加课程分类",
                },
            },
            // 更新分类的页面
            {
                path: "/course/vod/category/update",
                component: () => import("@/views/course/Category/UpdateView.vue"),
                meta: {
                    title: "更新课程分类",
                },
            },
            // 课程评论区的页面
            {
                path: "/course/vod/components/vod-comments",
                component: () => import("@/views/course/CourseCommentView.vue"),
                meta: {
                    title: " 课程评论",
                },
            },
            // 章节管理 /course/vod/chapter/index
            // 课时评论的页面
            {
                path: "/course/vod/video/comments",
                component: () => import("@/views/course/Video/VideoCommentView.vue"),
                meta: {
                    title: "课时评论",
                },
            },
            // 课时管理的页面
            {
                path: "/course/vod/video/index",
                component: () => import("@/views/course/Video/CourseTimeView.vue"),
                meta: {
                    title: "课时管理",
                },
            },
            // 添加课时
            {
                path: "/course/vod/video/create",
                component: () => import("@/views/course/Video/CreateVideoView.vue"),
                meta: {
                    title: "添加课时",
                },
            },
            // 视频录入页面
            {
                path: "/course/vod/video-import",
                component: () => import("@/views/course/Video/VideoImportView.vue"),
                meta: {
                    title: "视频批量导入",
                },
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
                    title: "学员列表",
                },
            },
            {
                path: "/member/import",
                name: "MemberImport",
                component: () => import("@/views/member/ImportView.vue"),
                meta: {
                    fatherPath: "/member/index",
                    title: "学员列表",
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
                path: "/finance/refund",
                name: "Financerefund",
                component: () => import("@/views/order/Refundorder.vue"),
                meta: {
                    fatherPath: "/finance/refund",
                    title: "全部订单",
                },
            },
            {
                path: "/finance/detail",
                name: "Financedetail",
                component: () => import("@/views/order/Orderdetails.vue"),
                meta: {
                    fatherPath: "/finance/Orderdetails",
                    title: "全部订单",
                },
            },
            
        ],
    },
    //运营
    {
        path: "/operate",
        name: "Operate",
        component: () => import("@/views/DashboardView.vue"),
        children: [
            {
                path: "/operate/role",
                name: "OperateRole",
                component: () => import("@/views/operation/Role/RoleView.vue"),
                meta: {
                    fatherPath: "/operate/role",
                    title: "VIP会员",
                },
            },
            {
                path: "/addRole",
                name: "addRole",
                component: () => import("@/views/operation/Role/AddRoleView.vue"),
                meta: {
                    fatherPath: "/operate/role",
                    title: "添加会员",
                },
            },
            {
                path: "/editRole",
                name: "editRole",
                component: () => import("@/views/operation/Role/EditRoleView.vue"),
                meta: {
                    fatherPath: "/operate/role",
                    title: "编辑会员",
                },
            },
            {
                path: "/operate/promocode",
                name: "OperatePromocode",
                component: () => import("@/views/operation/Promocode/PromocodeView.vue"),
                meta: {
                    fatherPath: "/operate/promocode",
                    title: "优惠码",
                },
            },
            {
                path: "/createcode",
                name: "Createcode",
                component: () => import("@/views/operation/Promocode/CreatecodeView.vue"),
                meta: {
                    fatherPath: "/operate/promocode",
                    title: "添加优惠码",
                },
            },
            {
                path: "/createmulticode",
                name: "Createmulticode",
                component: () => import("@/views/operation/Promocode/CreatemulticodeView.vue"),
                meta: {
                    fatherPath: "/operate/promocode",
                    title: "优惠码批量生成",
                },
            },
            {
                path: "/codeImport",
                name: "CodeImport",
                component: () => import("@/views/operation/Promocode/CodeImportView.vue"),
                meta: {
                    fatherPath: "/operate/promocode",
                    title: "优惠码批量生成",
                },
            },
            {
                path: "/operate/message",
                name: "OperateMessage",
                component: () => import("@/views/operation/wechat/WechatView.vue"),
                meta: {
                    fatherPath: "/operate/message",
                    title: "公众号",
                },
            },
            {
                path: "/wechat/messagereply/create",
                name: "OperateMessage",
                component: () => import("@/views/operation/wechat/MessagereplyCreateView.vue"),
                meta: {
                    fatherPath: "/operate/message",
                    title: "新建自动回复",
                },
            },
            {
                path: "/wechat/messagereply/update",
                name: "MessagereplyUpdate",
                component: () => import("@/views/operation/wechat/MessagereplyUpdateView.vue"),
                meta: {
                    fatherPath: "/operate/message",
                    title: "编辑自动回复",
                },
            },
            {
                path: "/decoration/mp-wechat-menu",
                name: "WechatMenu",
                component: () => import("@/views/operation/wechat/WechatMenuView.vue"),
                meta: {
                    fatherPath: "/operate/message",
                    title: "编辑自动回复",
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
        ],
    },

    {
        path: "/about",
        name: "about",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
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
