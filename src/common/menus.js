export default [
  {
    name: '主页',
    key: '/dashboard',
    children: [],
    icon: 'icon-icon-study-n',
  },
  {
    name: '装修',
    key: '/decoration',
    icon: 'icon-icon-decorate',
    children: [
      {
        name: '电脑端',
        key: '/decoration/pc',
        permission: 'viewBlock',
      },
      {
        name: '移动端',
        key: '/decoration/h5',
        permission: 'viewBlock',
      },
      {
        name: '单页面',
        key: '/decoration/singlePage',
        permission: 'addons.SinglePage.page.list',
      },
    ],
  },
  {
    name: '课程',
    key: '/course',
    icon: 'icon-icon-lesson',
    children: [
      {
        name: '录播课',
        key: '/course/vod',
        permission: 'course',
      },
      {
        name: '直播课',
        key: '/course/live',
        permission: 'addons.Zhibo.course.list',
      },
      {
        name: '图文',
        key: '/course/topic',
        permission: 'addons.meedu_topics.topic.list',
      },
      {
        name: '电子书',
        key: '/course/book',
        permission: 'addons.meedu_books.book.list',
      },
      {
        name: '大小班',
        key: '/course/k12',
        permission: 'addons.XiaoBanKe.course.list',
      },
      {
        name: '学习路径',
        key: '/course/learning-path',
        permission: 'addons.learnPaths.path.list',
      },
    ],
  },
  {
    name: '考试',
    key: '/exam',
    icon: 'icon-icon-exam-n',
    children: [
      {
        name: '题库',
        key: '/exam/question',
        permission: 'addons.Paper.question.list',
      },
      {
        name: '试卷',
        key: '/exam/exam-paper',
        permission: 'addons.Paper.paper.list',
      },
      {
        name: '模拟试卷',
        key: '/exam/mock',
        permission: 'addons.Paper.mock_paper.list',
      },
      {
        name: '练习',
        key: '/exam/practise',
        permission: 'addons.Paper.practice.list',
      },
    ],
  },
  {
    name: '学员',
    key: '/member',
    icon: 'icon-icon-me-n',
    children: [
      {
        name: '学员列表',
        key: '/member/index',
        permission: 'member',
      },
      {
        name: '学习照片',
        key: '/member/snapshot',
        permission: 'addons.Snapshot.images',
      },
      {
        name: '学员证书',
        key: '/member/certificate',
        permission: 'addons.cert.list',
      },
    ],
  },
  {
    name: '财务',
    key: '/finance',
    icon: 'icon-icon-money-n',
    children: [
      {
        name: '全部订单',
        key: '/finance/order-list',
        permission: 'order',
      },
      {
        name: '充值订单',
        key: '/finance/charge',
        permission: 'addons.TemplateOne.rechargeOrders.list',
      },
      {
        name: '余额提现',
        key: '/finance/withdraw',
        permission: 'member.inviteBalance.withdrawOrders',
      },
    ],
  },
  {
    name: '运营',
    key: '/operate',
    icon: 'icon-icon-operate',
    children: [
      {
        name: 'VIP会员',
        key: '/operate/role',
        permission: 'role',
      },
      {
        name: '积分商城',
        key: '/operate/mall',
        permission: 'addons.credit1Mall.goods.list',
      },
      {
        name: '团购课程',
        key: '/operate/tuangou',
        permission: 'addons.TuanGou.goods.list',
      },
      {
        name: '秒杀课程',
        key: '/operate/miaosha',
        permission: 'addons.MiaoSha.goods.list',
      },
      {
        name: '多级分销',
        key: '/operate/share',
        permission: 'addons.MultiLevelShare.goods.list',
      },
      {
        name: '问答',
        key: '/operate/question',
        permission: 'addons.Wenda.question.list',
      },
      {
        name: '兑换码',
        key: '/operate/code-exchanger',
        permission: 'addons.CodeExchanger.goods.list',
      },
      {
        name: '优惠码',
        key: '/operate/promocode',
        permission: 'promoCode',
      },
      {
        name: '公众号',
        key: '/operate/message',
        permission: 'mpWechatMessageReply',
      },
    ],
  },
  {
    name: '系统',
    key: '/system',
    icon: 'icon-icon-setting-n',
    children: [
      {
        name: '管理人员',
        key: '/system/system-administrator',
        permission: 'administrator',
      },
      {
        name: '系统配置',
        key: '/system/config',
        permission: 'setting',
      },
      {
        name: '功能模块',
        key: '/system/system-application',
        permission: 'super-slug',
      },
    ],
  },
];
