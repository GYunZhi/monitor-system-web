<template>
  <div class="product-mag">
    <c-breadcrumb :router-list="routerList"></c-breadcrumb>
    <div class="container">
      产品列表
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
          routeName: 'product-list',
          title: '产品列表'
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
