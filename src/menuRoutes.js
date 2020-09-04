const menuRoutes = [
  {
    routeName: 'productList',
    title: '产品管理',
    path: '/productList',
    icon: 'icon-chanpin',
    children: [
      {
        routeName: 'productList',
        path: '/productList',
        title: '产品列表'
      }
    ]
  },
  {
    routeName: 'appList',
    title: '应用管理',
    path: '/appList',
    icon: 'icon-yingyong',
    children: [
      {
        routeName: 'appList',
        path: '/appList',
        title: '应用列表'
      }
    ]
  },
  {
    routeName: 'i18n',
    title: '测试组件',
    path: '/i18n',
    icon: 'icon-chanpin',
    children: [
      {
        routeName: 'i18n',
        path: '/i18n',
        title: '语言切换测试'
      }
    ]
  }
]

export default menuRoutes
