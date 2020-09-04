<template>
  <div class="login-page" :style="{'min-height': height + 'px'}">
    <login></login>
  </div>
</template>
<script>
import login from './components/login'
export default {
  data () {
    return {
      height: 600
    }
  },
  mounted () {
    this.height = $(window).height()
  },
  components: {
    login
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import 'assets/css/variables.scss';
.login-page {
  padding-top: 200px;
  background-color: $main_bg;
}
</style>
