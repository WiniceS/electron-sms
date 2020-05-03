import commodityApi from '@/api/commodity'

const commodity = {
  namespaced: true,
  state: {
    commodityList: []
  },
  getters: {},
  mutations: {
    setCommodityList(state, list) {
      state.commodityList = list
    },
    modifyCommodityList(state, { id, name }) {
      state.commodityList.forEach(e => {
        if (e.id === id) {
          e.name = name
        }
      })
    },
    deleteCommodityList(state, { id }) {
      state.commodityList = state.commodityList.filter(f => f.id === id)
    }
  },
  actions: {
    async getAll({ commit }) {
      let res = await commodityApi.getAll()
      return commit('setCommodityList', res)
    },
    async getAllExtant({ commit }) {
      let res = await commodityApi.getAllExtant()
      return commit('setCommodityList', res)
    },
    async add({ dispatch, rootState }, commodity) {
      await commodityApi.add(commodity, rootState.user.userId)
      return dispatch('getAllExtant')
    },
    async delete({ commit, rootState }, { id }) {
      await commodityApi.delete(id, rootState.user.userId)
      return commit('deleteCommodityList')
    },
    async update({ commit, rootState }, id, commodity) {
      await commodityApi.update(id, commodity, rootState.user.userId)
      return commit('modifyCommodityList')
    }
  }
}

export default commodity
