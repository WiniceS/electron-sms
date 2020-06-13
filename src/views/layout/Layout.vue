<template>
  <div class="app-wrapper">
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container" :style="{height:appHeight,width:appWidth}">
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import { mapState } from 'vuex'
export default {
  name: 'layout',
  components: {
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState(['winHeight', 'winWidth']),
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    appHeight() {
      return this.winHeight + 'px'
    },
    appWidth() {
      return this.winWidth - 50 + 'px'
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-wrapper {
  display: flex;
  height: 100%;
  width: 100%;
}

.main-container {
  width: 100%;
  height: 100%;
  min-height: 100%;
  background-color: #eee;
}
</style>
