import warehousingApi from '@/api/warehousing'
import salesApi from '@/api/sales'

// initial state
const state = {
  chartSettingsSale: {
    metrics: ['sales'],
    dataOrder: {
      label: 'sales',
      order: 'desc'
    },
    legendName: {
      good: '商品',
      sales: '商品销售数'
    },
    labelMap: {
      good: '商品',
      sales: '商品销售数'
    }
  },
  chartSettingsInventory: {
    metrics: ['inventory'],
    dataOrder: {
      label: 'inventory',
      order: 'desc'
    },
    legendName: {
      good: '商品',
      inventory: '库存数'
    },
    labelMap: {
      good: '商品',
      inventory: '库存数'
    }
  },
  chartDataSaleTop: {},
  chartDataSaleMinimum: {},
  chartDataInventoryTop: {},
  chartDataInventoryMinimum: {}
}

// getters
const getters = {}

// actions
const actions = {
  // 获取销售记录
  async getSales(store, { startTime, endTime }) {
    const { commit } = store
    const amount = 6
    await salesApi.getSalesTop({ startTime, endTime, amount }).then(res => {
      let tmp = {
        columns: ['good', 'sales'],
        row: res.map(m => {
          return { good: m.name, sales: m.amount }
        })
      }
      commit('setSalesTop', tmp)
    })
    await salesApi.getSalesMinimum({ startTime, endTime, amount }).then(res => {
      let tmp = {
        columns: ['good', 'sales'],
        row: res.map(m => {
          return { good: m.name, sales: m.amount }
        })
      }
      commit('setSalesMinimum', tmp)
    })
  },
  // 获取商品库存
  async getInventory(store) {
    const { commit } = store
    const amount = 6
    await warehousingApi.getInventoryTop({ amount }).then(res => {
      let tmp = {
        columns: ['good', 'inventory'],
        row: res.map(m => {
          return { good: m.name, inventory: m.quantity }
        })
      }
      commit('setInventoryTop', tmp)
    })
    await warehousingApi.getInventoryMinimum({ amount }).then(res => {
      let tmp = {
        columns: ['good', 'inventory'],
        row: res.map(m => {
          return { good: m.name, inventory: m.quantity }
        })
      }
      commit('setInventoryMinimum', tmp)
    })
  }
}

// mutations
const mutations = {
  setSalesTop(state, { top }) {
    state.chartDataSaleTop = top
  },
  setSalesMinimum(state, { minimum }) {
    state.chartDataSaleMinimum = minimum
  },
  setInventoryTop(state, { top }) {
    state.chartDataInventoryTop = top
  },
  setInventoryMinimum(state, { minimum }) {
    state.chartDataInventoryMinimum = minimum
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
