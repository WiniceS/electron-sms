import { asyncRoutes, constantRoutes } from '@/router'
import _ from 'lodash'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role === role)
  } else {
    return true
  }
}

/**
 * 平铺后台返回的菜单权限(去重)
 * @param roles
 */
function flatRole(roles) {
  let res = []
  roles.forEach(f => {
    const tmp = { ...f }
    if (tmp.children && tmp.children.length > 0) {
      res = res.concat(flatRole(tmp.children))
    }
    if (tmp.name) {
      res.push(tmp.name)
    }
  })

  return _.uniq(res)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit, state }, roles) {
    return new Promise(resolve => {
      const faltRoles = flatRole(roles) // 这边可以自行处理权限与路由的匹配规则
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, faltRoles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
