import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Deal from '../views/deal/index.vue'
// import Input from '../views/input/index.vue'
// import Statistics from '../views/statistics/index.vue'
// import Earning from '../views/earning/index.vue'
// import Expend from '../views/expend/index.vue'
// import Personal from '../views/personal/index.vue'
// import NotFound from '../views/notfound.vue'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)

// const routes = [
//   {
//     path: '/',
//     name: 'home',
//     component: Home
//   },
//   {
//     path: '/about',
//     name: 'about',
//     // route level code-splitting
//     // this generates a separate chunk (about.[hash].js) for this route
//     // which is lazy-loaded when the route is visited.
//     component: () =>
//       import(/* webpackChunkName: "about" */ '../views/About.vue')
//   },
//   {
//     path: '/deal',
//     name: 'deal',
//     component: Deal
//   },
//   {
//     path: '/input',
//     name: 'input',
//     component: Input
//   },
//   {
//     path: '/statistics',
//     name: 'statistics',
//     component: Statistics
//   },
//   {
//     path: '/earning',
//     name: 'earning',
//     component: Earning
//   },
//   {
//     path: '/expend',
//     name: 'expend',
//     component: Expend
//   },
//   {
//     path: '/personal',
//     name: 'personal',
//     component: Personal
//   },
//   {
//     path: '*',
//     name: 'notfound',
//     component: NotFound
//   }
// ]
/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/deal',
    name: 'Deal',
    hidden: true,
    children: [
      {
        path: 'deal',
        component: () => import('@/views/deal/index')
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new VueRouter({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
