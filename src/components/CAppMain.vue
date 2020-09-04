<template>
  <section
    class="app-main">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'CAppMain',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-main {
  width: 100%;
  min-height: calc(100vh - 50px);
  background-color: #f0f2f5;
  padding: 0 20px 20px 20px;
}
</style>
