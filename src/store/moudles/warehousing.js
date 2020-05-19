import warehousingApi from '@/api/warehousing'

const warehousing = {
  namespaced: true,
  state: {
    warehousingList: []
  },
  getters: {},
  mutations: {
    setWarehousingList(state, list) {
      state.warehousingList = list
    },
    modifyWarehousingList(state, warehousing) {
      state.warehousingList.forEach(e => {
        if (e.id === warehousing.id) {
          e = warehousing
        }
      })
    },
    deleteWarehousingList(state, { id }) {
      state.warehousingList = state.warehousingList.filter(f => f.id === id)
    }
  },
  actions: {
    async getAll({ commit }) {
      let res = await warehousingApi.getAll()
      return commit('setWarehousingList', res)
    },
    async getAllExtant({ commit }) {
      let res = await warehousingApi.getAllExtant()
      return commit('setWarehousingList', res)
    },
    async add({ dispatch, rootState }, warehousing) {
      await warehousingApi.add(warehousing, rootState.user.userId)
      return dispatch('getAllExtant')
    },
    async delete({ commit, rootState }, { id }) {
      await warehousingApi.delete(id, rootState.user.userId)
      return commit('deleteWarehousingList')
    },
    async update({ commit, rootState }, {id, warehousing}) {
      await warehousingApi.update(id, warehousing, rootState.user.userId)
      let nameList = rootState.goodsType.goodsTypeList.filter(
        f => f.id === warehousing.variety
      )
      warehousing.varietyName = nameList.length > 0 ? nameList[0].name : ''
      return commit('modifyWarehousingList', warehousing)
    }
  }
}

export default warehousing
