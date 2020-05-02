'use strict'
import Vue from 'vue'
import Vuex from 'vuex'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import { initState } from './initState'
import deal from './moudles/deal'
import input from './moudles/input'
import gearning from './moudles/earning'
import expend from './moudles/expend'
import statistics from './moudles/statistics'
import personal from './moudles/personal'
import app from './moudles/app'
import user from './moudles/user'
import commodityUnit from './moudles/commodityUnit'
import goodsType from './moudles/goodsType'

Vue.use(Vuex)
const state = initState()

const store = new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  modules: {
    deal,
    input,
    gearning,
    expend,
    statistics,
    personal,
    app,
    user,
    commodityUnit,
    goodsType
  }
})
export default store
