import commodityUnitApi from '@/api/commodityUnit'

const commodityUnit = {
  namespaced: true,
  state: {
    commodityUnitList: []
  },
  getters: {
  },
  mutations: {
    setCommodityUnitList(state, list) {
      state.commodityUnitList = list
    },
    modifyCommodityUnitList(state, { id, name }) {
      state.commodityUnitList.forEach(e => {
        if (e.id === id) {
          e.name = name
        }
      })
    },
    deleteCommodityUnitList(state, { id }) {
      state.commodityUnitList = state.commodityUnitList.filter(f => f.id === id)
    }
  },
  actions: {
    async getAll({ commit }) {
      let res = await commodityUnitApi.getAll()
      return commit('setCommodityUnitList', res)
    },
    async getAllExtant({ commit }) {
      let res = await commodityUnitApi.getAllExtant()
      return commit('setCommodityUnitList', res)
    },
    async add({ dispatch, rootState }, { name }) {
      await commodityUnitApi.add(name, rootState.user.userId)
      return dispatch('getAllExtant')
    },
    async delete({ commit, rootState }, { id }) {
      await commodityUnitApi.delete(id, rootState.user.userId)
      return commit('deleteCommodityUnitList', { id })
    },
    async update({ commit, rootState }, { id, name }) {
      await commodityUnitApi.update(id, name, rootState.user.userId)
      return commit('modifyCommodityUnitList', { id, name })
    }
  }
}

export default commodityUnit
