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
    modifyCommodityList(state, commodity) {
      state.commodityList.forEach(e => {
        if (e.id === commodity.id) {
          e = commodity
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
    async getAllExtant({ commit, rootState }) {
      let res = await commodityApi.getAllExtant()

      res = res.map(m => {
        let nameList = rootState.goodsType.goodsTypeList.filter(
          f => f.id === m.variety
        )
        m.varietyName = nameList.length > 0 ? nameList[0].name : ''
        return m
      })
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
    async update({ commit, rootState }, { id, commodity }) {
      await commodityApi.update(id, commodity, rootState.user.userId)
      let nameList = rootState.goodsType.goodsTypeList.filter(
        f => f.id === commodity.variety
      )
      commodity.varietyName = nameList.length > 0 ? nameList[0].name : ''
      return commit('modifyCommodityList', commodity)
    },
    async getByNo({ commit }, { no }) {
      let res = await commodityApi.getByNo(no)
      res = res.length > 0 ? res[0] : {}
      return res
    }
  }
}

export default commodity
