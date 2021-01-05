import { getUnitsOption } from '@/api/units'
import { getTypesOption } from '@/api/types'

const state = {
  typeOptions: [],
  unitOption: []
}

const mutations = {
  SET_TYPEOPTIONS: (state, options) => {
    state.typeOptions = options
  },
  SET_UNITOPTIONS: (state, options) => {
    state.unitOption = options
  }
}

const actions = {
  setTypeOptions({ commit }) {
    getTypesOption().then(res => {
      commit('SET_TYPEOPTIONS', res)
    })
  },
  setUnitOptions({ commit }) {
    getUnitsOption().then(res => {
      commit('SET_UNITOPTIONS', res)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
