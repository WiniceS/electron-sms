import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/deal',
    name: 'deal',
    component: () => import('../view/deal/index.vue')
  },
  {
    path: '/input',
    name: 'input',
    component: () => import('../view/input/index.vue')
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: () => import('../view/statistics/index.vue')
  },
  {
    path: '/earning',
    name: 'earning',
    component: () => import('../view/earning/index.vue')
  },
  {
    path: '/expend',
    name: 'expend',
    component: () => import('../view/expend/index.vue')
  },
  {
    path: '/personal',
    name: 'personal',
    component: () => import('../view/personal/index.vue')

  }
]

const router = new VueRouter({
  routes
})

export default router
