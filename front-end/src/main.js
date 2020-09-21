import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'
import VueI18n from 'vue-i18n'
import VCharts from 'v-charts'

import '@/icons' // icon
import '@/permission' // permission control

Vue.config.productionTip = false

// const i18n = new VueI18n({
//   // locale: LangStorage.getLang('zh'),  // 语言标识，后面会用做切换和将用户习惯存储到本地浏览器
//   locale: 'zh', // 语言标识
//   messages: {
//     'zh': require('./common/lang/zh'),
//     'en': require('./common/lang/en')
//   }
// })

Vue.use(ElementUI, VueI18n, {
  locale
})

Vue.use(VCharts)

new Vue({
  // i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
