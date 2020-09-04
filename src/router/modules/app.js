const appList = () => import('@/pages/appMag/list')

const routes = [
  {
    path: 'appList',
    name: 'appList',
    component: appList,
    meta: {
      title: '应用列表',
      parentTitle: '应用管理'
    }
  }
]

export default routes
