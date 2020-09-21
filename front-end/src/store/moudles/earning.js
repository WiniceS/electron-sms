import earningApi from '@/api/earning'
import _ from 'lodash'
import moment from 'moment'

// initial state
const state = {
  chartSettings: {
    showLine: ['saleLine'],
    yAxisName: ['收入'],
    legendName: {
      sale: '商品销售额',
      saleLine: '商品利润',
      majiang: '麻将',
      other: '其他'
    },
    labelMap: {
      sale: '商品销售额',
      saleLine: '商品利润',
      majiang: '麻将',
      other: '其他'
    },
    label: { show: true, position: 'top' }
  },
  chartData: {
    columns: ['date', 'sale', 'majiang', 'other', 'saleLine'],
    rows: []
  }
}

// getters
const getters = {

}

// actions
const actions = {
  async getEarning(store, { startTime, endTime }) {
    const { commit } = store
    await earningApi.getEarning({ startTime, endTime }).then(res => {
      let group = _.groupBy(res, (g) => moment(g.time).format('L'))
      let row = []
      _.forIn(group, (value, key) => {
        let majiang = value.find(f => f.type === '1')
        let sale = value.find(f => f.type === '0')
        let other = value.find(f => f.type === '3')
        let saleLine = value.find(f => f.type === '0')
        let record = {
          date: moment(key).format('L'),
          sale: sale ? sale.grossMargin : 0,
          majiang: majiang ? majiang.grossMargin : 0,
          other: other ? other.grossMargin : 0,
          saleLine: saleLine ? saleLine.netProfit : 0
        }
        row.push(record)
      })
      let tmp = {
        columns: ['date', 'sale', 'majiang', 'other', 'saleLine'],
        rows: row
      }
      commit('setEarning', { data: tmp })
    })
  },
  async addEarning({ rootState }, { type, grossMargin, netProfit }) {
    await earningApi.addNew({ type, grossMargin, netProfit, userId: rootState.user.userId })
  }
}

// mutations
const mutations = {
  setEarning(state, { data }) {
    state.chartData = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
