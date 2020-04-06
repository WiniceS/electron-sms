<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in showList" :key="item.path">
        <span
          v-if="item.redirect === 'noredirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ item.meta.title }}</span
        >
        <router-link v-else :to="item.redirect || item.path">{{
          item.meta.title
        }}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created() {
    this.getBreadcrumb()
  },
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb()
    }
  },
  computed: {
    showList() {
      if (!this.levelList) {
        return []
      } else {
        return this.levelList.filter((f) => f.meta.title)
      }
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(
          matched
        )
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
