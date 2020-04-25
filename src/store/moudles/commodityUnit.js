import { getAll } from '@/api/commodityUnit'

const commodityUnit = {
  state: {},

  mutations: {},

  actions: {
    async getAll() {
      let res = await getAll()
      console.log('store', res)
      return res
    }
  }
}

export default commodityUnit
