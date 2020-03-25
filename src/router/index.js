import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Deal from '../views/deal/index.vue'
import Input from '../views/input/index.vue'
import Statistics from '../views/statistics/index.vue'
import Earning from '../views/earning/index.vue'
import Expend from '../views/expend/index.vue'
import Personal from '../views/personal/index.vue'
import NotFound from '../views/notfound.vue'

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
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/deal',
    name: 'deal',
    component: Deal
  },
  {
    path: '/input',
    name: 'input',
    component: Input
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: Statistics
  },
  {
    path: '/earning',
    name: 'earning',
    component: Earning
  },
  {
    path: '/expend',
    name: 'expend',
    component: Expend
  },
  {
    path: '/personal',
    name: 'personal',
    component: Personal
  },
  {
    path: '*',
    name: 'notfound',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
