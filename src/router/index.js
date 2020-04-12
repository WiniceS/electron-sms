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
    path: '/deal',
    component: Layout,
    redirect: '/deal/deal',
    name: 'DealCompilations',
    meta: { title: 'DealCompilations', icon: 'dealCompilations' },
    hidden: false,
    children: [
      {
        name: 'Deal',
        path: 'deal',
        component: () => import('@/views/deal/index'),
        meta: { title: 'Deal', icon: 'deal' }
      }
    ]
  },
  {
    path: '/input',
    component: Layout,
    redirect: '/input/input',
    name: 'InputCompilations',
    meta: { title: 'InputCompilations', icon: 'inputCompilations' },
    hidden: false,
    children: [
      {
        name: 'Input',
        path: 'input',
        component: () => import('@/views/input/index'),
        meta: { title: 'Input', icon: 'input' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/statistics',
    name: 'StatisticsCompilations',
    meta: { title: 'StatisticsCompilations', icon: 'statisticsCompilations' },
    hidden: false,
    children: [
      {
        name: 'Statistics',
        path: 'statistics',
        child: {
          hidden: false
        },
        component: () => import('@/views/statistics/index'),
        meta: { title: 'Statistics', icon: 'statistics' }
      },
      {
        name: 'Test',
        path: 'test',
        child: {
          hidden: false
        },
        component: () => import('@/views/input/index'),
        meta: { title: 'Test', icon: 'test' }
      }
    ]
  },
  {
    path: '/earning',
    component: Layout,
    redirect: '/earning/earning',
    name: 'EarningCompilations',
    meta: { title: 'EarningCompilations', icon: 'earningCompilations' },
    hidden: false,
    children: [
      {
        name: 'Earning',
        path: 'earning',
        component: () => import('@/views/earning/index'),
        meta: { title: 'Earning', icon: 'earning' }
      }
    ]
  },
  {
    path: '/expend',
    component: Layout,
    redirect: '/expend/expend',
    name: 'ExpendCompilations',
    meta: { title: 'ExpendCompilations', icon: 'expendCompilations' },
    hidden: false,
    children: [
      {
        name: 'Expend',
        path: 'expend',
        component: () => import('@/views/expend/index'),
        meta: { title: 'Expend', icon: 'expend' }
      }
    ]
  },
  {
    path: '/personal',
    component: Layout,
    redirect: '/personal/personal',
    name: 'PersonalCompilations',
    meta: { title: 'PersonalCompilations', icon: 'personalCompilations' },
    hidden: false,
    children: [
      {
        name: 'Personal',
        path: 'personal',
        component: () => import('@/views/personal/index'),
        meta: { title: 'Personal', icon: 'personal' }
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
