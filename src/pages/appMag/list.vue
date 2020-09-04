<template>
  <div class="app-mag">
    <c-breadcrumb :router-list="routerList"></c-breadcrumb>
    <div class="container">
      应用列表
    </div>
  </div>
</template>

<script>
import CBreadcrumb from 'components/CBreadcrumb'
export default {
  data () {
    return {
      routerList: [
        {
          routeName: 'home',
          title: '首页'
        },
        {
          routeName: 'account-list',
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
