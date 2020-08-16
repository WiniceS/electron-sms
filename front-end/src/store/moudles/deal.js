import dealApi from '@/api/deal'

const deal = {
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {
    async sell({ rootState }, { record }) {
      await dealApi.sell(record, rootState.user.userId)
    }
  }
}

export default deal
