<template>
  <el-button class="back-btn" type="primary" size="small" @click="goBack()">
    <i class="icon iconfont icon-back"></i>返回
  </el-button>
</template>

<script>
export default {
  props: {
    to: {
      type: Object,
      default: () => {
        return null
      }
    },
    params: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  methods: {
    goBack () {
      if (this.to) {
        this.$router.push(this.to)
      } else {
        this.$store.dispatch('setBackRouteParams', this.params)
        window.history.length > 2 ? this.$router.go(-1) : this.$router.push('/')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.back-btn {
  width: 128px;
  height: 34px;
  .icon-back {
    margin-right: 13px;
    vertical-align: middle;
  }
}
</style>
