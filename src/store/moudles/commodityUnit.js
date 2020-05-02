import commodityUnitApi from '@/api/commodityUnit'

const commodityUnit = {
  namespaced: true,
  state: {
    commodityUnitList: [],
    filterNmae: ''
  },
  getters: {
    filterCommodityUnitList(state) {
      return state.commodityUnitList.filter(
        f => f.name.indexOf(state.filterName) > 0
      )
    }
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
    },
    setFilterName(state, { name }) {
      state.filterName = name
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
      return commit('deleteCommodityUnitList')
    },
    async update({ commit, rootState }, { id, name }) {
      await commodityUnitApi.update(id, name, rootState.user.userId)
      return commit('modifyCommodityUnitList')
    },
    async search({ commit }, { name }) {
      return commit('setFilterName', { name })
    }
  }
}

export default commodityUnit
