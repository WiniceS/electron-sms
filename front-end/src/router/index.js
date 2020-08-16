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
    path: '/search',
    component: Layout,
    redirect: '/search/search',
    name: 'SearchCompilations',
    meta: { title: 'SearchCompilations', icon: 'search' },
    hidden: false,
    children: [
      {
        name: 'Search',
        path: 'search',
        component: () => import('@/views/search/index'),
        meta: { title: '查找', icon: 'search' }
      }
    ]
  },
  {
    path: '/deal',
    component: Layout,
    redirect: '/deal/deal',
    name: 'DealCompilations',
    meta: { title: 'DealCompilations', icon: 'deal' },
    hidden: false,
    children: [
      {
        name: 'Deal',
        path: 'deal',
        component: () => import('@/views/deal/index'),
        meta: { title: '销售', icon: 'deal' }
      }
    ]
  },
  {
    path: '/warehousing',
    component: Layout,
    redirect: '/warehousing/warehousing',
    name: 'WarehousingCompilations',
    meta: { title: 'WarehousingCompilations', icon: 'warehousing' },
    hidden: false,
    children: [
      {
        name: 'Warehousing',
        path: 'warehousing',
        component: () => import('@/views/warehousing/index'),
        meta: { title: '库存', icon: 'warehousing' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/statistics',
    name: 'StatisticsCompilations',
    meta: { title: 'StatisticsCompilations', icon: 'earning' },
    hidden: false,
    children: [
      {
        name: 'Statistics',
        path: 'statistics',
        child: {
          hidden: false
        },
        component: () => import('@/views/statistics/index'),
        meta: { title: '统计', icon: 'statistics' }
      }
    ]
  },
  {
    path: '/earning',
    component: Layout,
    redirect: '/earning/earning',
    name: 'EarningCompilations',
    meta: { title: 'EarningCompilations', icon: 'earning' },
    hidden: false,
    children: [
      {
        name: 'Earning',
        path: 'earning',
        component: () => import('@/views/earning/index'),
        meta: { title: '收入', icon: 'earning' }
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
        meta: { title: '支出', icon: 'expend' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/commodity',
    name: 'ConfigCompilations',
    meta: { title: 'ConfigCompilations', icon: 'config' },
    hidden: false,
    children: [
      {
        name: 'Commodity',
        path: 'commodity',
        child: {
          hidden: false
        },
        component: () => import('@/views/config/commodity.vue'),
        meta: { title: '商品', icon: 'commodity' }
      },
      {
        name: 'CommodityUnit',
        path: 'commodityUnit',
        child: {
          hidden: false
        },
        component: () => import('@/views/config/commodityUnit.vue'),
        meta: { title: '商品单位', icon: 'commodityUnit' }
      },
      {
        name: 'GoodsType',
        path: 'goodsType',
        child: {
          hidden: false
        },
        component: () => import('@/views/config/goodsType.vue'),
        meta: { title: '商品类别', icon: 'goodsType' }
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
        meta: { title: '个人', icon: 'personal' }
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
