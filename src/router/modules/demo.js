const i18n = () => import('@/pages/demo/i18n')

const routes = [
  {
    path: 'i18n',
    name: 'i18n',
    component: i18n,
    meta: {
      title: '国际化',
      parentTitle: '测试组件'
    }
  }
]

export default routes
