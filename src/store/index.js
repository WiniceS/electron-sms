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

Vue.use(Vuex)
const state = initState()
export default function createStore() {
  return new Vuex.Store({
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
      personal
    }
  })
}
