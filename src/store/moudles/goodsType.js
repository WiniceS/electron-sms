import goodsTypeApi from '@/api/goodsType'

const goodsType = {
  namespaced: true,
  state: {
    goodsTypeList: []
  },
  getters: {
  },
  mutations: {
    setGoodsTypeList(state, list) {
      state.goodsTypeList = list
    },
    modifyGoodsTypeList(state, { id, name }) {
      state.goodsTypeList.forEach(e => {
        if (e.id === id) {
          e.name = name
        }
      })
    },
    deleteGoodsTypeList(state, { id }) {
      state.goodsTypeList = state.goodsTypeList.filter(f => f.id === id)
    }
  },
  actions: {
    async getAll({ commit }) {
      let res = await goodsTypeApi.getAll()
      return commit('setGoodsTypeList', res)
    },
    async getAllExtant({ commit }) {
      let res = await goodsTypeApi.getAllExtant()
      return commit('setGoodsTypeList', res)
    },
    async add({ dispatch, rootState }, { name }) {
      await goodsTypeApi.add(name, rootState.user.userId)
      return dispatch('getAllExtant')
    },
    async delete({ commit, rootState }, { id }) {
      await goodsTypeApi.delete(id, rootState.user.userId)
      return commit('deleteGoodsTypeList')
    },
    async update({ commit, rootState }, { id, name }) {
      await goodsTypeApi.update(id, name, rootState.user.userId)
      return commit('modifyGoodsTypeList')
    }
  }
}

export default goodsType
