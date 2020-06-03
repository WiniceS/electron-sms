<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  data() {
    return {}
  },
  created() {
    window.addEventListener('resize', this.getResize)
  },
  computed: {
    ...mapState(['winHeight', 'winWidth']),
    ...mapState('goodsType', ['goodsTypeList']),
    ...mapState('commodityUnit', ['commodityUnitList'])
  },
  methods: {
    ...mapActions('goodsType', {
      getGoodsType: 'getAllExtant'
    }),
    ...mapActions('commodityUnit', {
      getCommodityUnit: 'getAllExtant'
    }),
    ...mapMutations({
      setWindowWidth: 'SET_WINWIDTH',
      setWindowHeight: 'SET_WINHEIGHT'
    }),
    getResize() {
      this.setWindowWidth(window.innerWidth)
      this.setWindowHeight(window.innerHeight)
    }
  }
}
</script>
<style lang="scss">
@import './styles/index.scss'; // 全局自定义的css样式
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
