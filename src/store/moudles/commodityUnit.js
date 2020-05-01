import { getAll } from '@/api/commodityUnit'

const commodityUnit = {
  namespaced: true,
  state: {
    commodityUnitList: []
  },
  mutations: {},
  actions: {
    async getAll() {
      console.log('store')
      let res = await getAll()
      console.log('store', res)
      return res
    }
  }
}

export default commodityUnit
