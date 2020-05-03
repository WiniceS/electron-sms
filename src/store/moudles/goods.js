import goodsApi from '@/api/goods'

const goods = {
  namespaced: true,
  state: {
    goodsList: []
  },
  getters: {},
  mutations: {
    setGoodsList(state, list) {
      state.goodsList = list
    },
    modifyGoodsList(state, { id, name }) {
      state.goodsList.forEach(e => {
        if (e.id === id) {
          e.name = name
        }
      })
    },
    deleteGoodsList(state, { id }) {
      state.goodsList = state.goodsList.filter(f => f.id === id)
    }
  },
  actions: {
    async getAll({ commit }) {
      let res = await goodsApi.getAll()
      return commit('setGoodsList', res)
    },
    async getAllExtant({ commit }) {
      let res = await goodsApi.getAllExtant()
      return commit('setGoodsList', res)
    },
    async add({ dispatch, rootState }, { name }) {
      await goodsApi.add(name, rootState.user.userId)
      return dispatch('getAllExtant')
    },
    async delete({ commit, rootState }, { id }) {
      await goodsApi.delete(id, rootState.user.userId)
      return commit('deleteGoodsList')
    },
    async update({ commit, rootState }, { id, name }) {
      await goodsApi.update(id, name, rootState.user.userId)
      return commit('modifyGoodsList')
    }
  }
}

export default goods
