const productList = () => import('@/views/productMag/list')

const routes = [
  {
    path: 'productList',
    name: 'productList',
    component: productList,
    meta: {
      title: '产品列表',
      parentTitle: '产品管理'
    }
  }
]

export default routes
