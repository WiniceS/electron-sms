<template>
  <scroll-bar>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <el-dropdown
        class="avatar-container"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            class="user-avatar"
            :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'"
          />
        </div>
        <el-dropdown-menu
          class="user-dropdown"
          slot="dropdown"
        >
          <router-link
            class="inlineBlock"
            to="/deal"
          >
            <el-dropdown-item>Home</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span
              style="display: block;"
              @click="handleLogOut"
            >LogOut</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  name: 'sidebar',
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters(['sidebar', 'avatar']),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    handleLogOut() {
      // this.$router.push('login')
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-container {
  height: 50px;
  display: inline-block;

  .avatar-wrapper {
    cursor: pointer;
    margin-top: 5px;
    position: relative;

    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }

    .el-icon-caret-bottom {
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }
}
</style>
