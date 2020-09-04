<template>
  <!-- page-name：页面名称，如应用管理 app-mag -->
  <div class="page-name">
    <c-breadcrumb :router-list="routerList"></c-breadcrumb>
    <div class="container">
      页面内容
    </div>
  </div>
</template>

<script>
import CBreadcrumb from 'components/layout/breadcrumb'
export default {
  name: 'page-name',
  data () {
    return {
      routerList: [
        {
          routeName: 'home',
          title: '首页'
        },
        {
          routeName: 'appList',
          title: '应用列表'
        }
      ]
    }
  },
  components: {
    CBreadcrumb
  }
}
</script>

<style lang="scss" scoped>

</style>
