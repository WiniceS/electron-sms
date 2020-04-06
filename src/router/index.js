import Vue from 'vue'
import VueRouter from 'vue-router'
/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(VueRouter)
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
  {
    path: '/',
    component: Layout,
    redirect: '/input',
    name: 'Input',
    hidden: true,
    children: [
      {
        path: 'input',
        component: () => import('@/views/input/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/statistics',
    name: 'Statistics',
    hidden: true,
    children: [
      {
        path: 'statistics',
        component: () => import('@/views/statistics/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/earning',
    name: 'Earning',
    hidden: true,
    children: [
      {
        path: 'earning',
        component: () => import('@/views/earning/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/expend',
    name: 'Expend',
    hidden: true,
    children: [
      {
        path: 'expend',
        component: () => import('@/views/expend/index')
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/personal',
    name: 'Personal',
    hidden: true,
    children: [
      {
        path: 'personal',
        component: () => import('@/views/personal/index')
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
