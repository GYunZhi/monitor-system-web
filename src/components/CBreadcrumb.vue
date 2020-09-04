<template>
  <el-breadcrumb class="breadcrumb" separator-class="el-icon-arrow-right">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in routerList"
        :key="item.routeName"
        v-if="item.title">
        <span
          v-if="index === routerList.length - 1"
          class="no-redirect">
          {{item.title}}
        </span>
        <router-link
          v-else
          :to="{name: item.routeName, params: item.params}">
          {{item.title}}
        </router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import { Breadcrumb, BreadcrumbItem } from 'element-ui'
export default {
  name: 'CBreadcrumb',
  props: {
    routerList: {
      type: Array
    }
  },
  components: {
    [Breadcrumb.name]: Breadcrumb,
    [BreadcrumbItem.name]: BreadcrumbItem
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.breadcrumb {
  display: block;
  line-height: 48px;
  height: 48px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}

/* fade */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}
.breadcrumb-move {
  transition: all 0.5s;
}
.breadcrumb-leave-active {
  position: absolute;
}

</style>
