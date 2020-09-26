import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: 'dashboard', icon: 'dashboard' }
    }]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/deal',
    component: Layout,
    redirect: '/deal/index',
    children: [
      {
        path: 'index',
        name: 'Deal',
        component: () => import('@/views/deal/index'),
        meta: { title: 'deal', icon: 'deal' }
      }
    ]
  },
  {
    path: '/inOut',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'InOut',
        component: () => import('@/views/incomeAndOutgoings/index'),
        meta: { title: 'inOut', icon: 'inOut' }
      }
    ]
  },
  {
    path: '/inventory',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Inventory',
        component: () => import('@/views/inventory/index'),
        meta: { title: 'inventory', icon: 'inventory' }
      }
    ]
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/goods',
    name: 'Config',
    meta: { title: 'config' },
    children: [
      {
        path: 'goods',
        component: () => import('@/views/config/goods'), // Parent router-view
        name: 'Goods',
        meta: { title: 'goods' }
      },
      {
        path: 'units',
        component: () => import('@/views/config/units'),
        name: 'Units',
        meta: { title: 'units' }
      },
      {
        path: 'types',
        component: () => import('@/views/config/types'),
        name: 'Types',
        meta: { title: 'types' }
      }
    ]
  },
  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/sell',
    name: 'Statistics',
    meta: { title: 'statistics' },
    children: [
      {
        path: 'sell',
        component: () => import('@/views/statistics/sell'), // Parent router-view
        name: 'Sell',
        meta: { title: 'sell' }
      },
      {
        path: 'income',
        component: () => import('@/views/statistics/income'),
        name: 'Income',
        meta: { title: 'income' }
      },
      {
        path: 'outgoings',
        component: () => import('@/views/statistics/outgoings'),
        name: 'Outgoings',
        meta: { title: 'outgoings' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
