import store from '@/store'

const {
  body
} = document
const WIDTH = 1024
const RATIO = 3

export default {
  data() {
    return {
      timer: null
    }
  },
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('CloseSideBar', {
          withoutAnimation: false
        })
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('ToggleDevice', 'mobile')
      store.dispatch('CloseSideBar', {
        withoutAnimation: true
      })
    }
  },
  methods: {
    isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - RATIO < WIDTH
    },
    resizeHandler() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        if (!document.hidden) {
          const isMobile = this.isMobile()
          store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')
          store.commit('SET_WINWIDTH', window.innerWidth)
          store.commit('SET_WINHEIGHT', window.innerHeight)
          if (isMobile) {
            store.dispatch('CloseSideBar', {
              withoutAnimation: true
            })
          }
        }
      }, 500);
    }
  }
}
