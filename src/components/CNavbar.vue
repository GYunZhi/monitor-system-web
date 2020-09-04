<template>
  <div class="navbar">
    <div class="navbar-wrap" :style="{left: sidebar.width + 'px'}">
      <span class="hamburger" @click="toggleSidebar">
        <i class="icon iconfont icon-hamburger"></i>
      </span>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- <i class="icon iconfont icon-avatar"></i> -->
          <span class="user-name">admin</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link to="/">
            <el-dropdown-item>
              home
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item>
            <span @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { mapGetters, mapActions } from 'vuex'
import CBreadcrumb from './CBreadcrumb'
export default {
  name: 'CNavbar',
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    ...mapActions([
      'toggleSidebar',
      'logout'
    ])
  },
  components: {
    CBreadcrumb,
    Dropdown,
    DropdownMenu,
    DropdownItem
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  .navbar-wrap {
    position: fixed;
    padding: 0 30px;
    height: 50px;
    line-height: 50px;
    top: 0;
    right: 0;
    transition: left 0.28s;
    border-bottom: solid 1px #e6e6e6;
    background-color: #fff;
    z-index: 100;
  }
  .hamburger {
    float: left;
    cursor: pointer;
    line-height: 50px;
  }
  .avatar-container {
    float: right;
    cursor: pointer;
    .icon-avatar {
      font-size: 30px;
    }
  }
}
</style>
