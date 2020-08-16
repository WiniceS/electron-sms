import expendApi from '@/api/expend'
import _ from 'lodash'
import moment from 'moment'

// initial state
const state = {
  chartSettings: {
    showLine: ['utilitiesExpenseLine', 'purchaseExpenseLine', 'livingExpensesLine'],
    legendName: {
      utilitiesExpense: '水电费用',
      utilitiesExpenseLine: '水电费用',
      purchaseExpense: '进货费用',
      purchaseExpenseLine: '进货费用',
      livingExpenses: '生活费用',
      livingExpensesLine: '生活费用'
    },
    labelMap: {
      utilitiesExpense: '水电费用',
      utilitiesExpenseLine: '水电费用',
      purchaseExpense: '进货费用',
      purchaseExpenseLine: '进货费用',
      livingExpenses: '生活费用',
      livingExpensesLine: '生活费用'
    },
    label: { show: true, position: 'top' }
  },
  rowData: []
}

// getters
const getters = {

}

// actions
const actions = {
  async getExpend(store, { startTime, endTime }) {
    const { commit } = store
    await expendApi.getExpend({ startTime, endTime }).then(res => {
      let group = _.groupBy(res, (g) => moment(g.time).format('L'))
      let row = []
      _.forIn(group, (value, key) => {
        let utilities = value.find(f => f.type === '1')
        let purchase = value.find(f => f.type === '0')
        let living = value.find(f => f.type === '3')
        let record = {
          date: moment(key).format('L'),
          utilitiesExpense: utilities ? utilities.amount : 0,
          purchaseExpense: purchase ? purchase.amount : 0,
          livingExpenses: living ? living.amount : 0,
          utilitiesExpenseLine: utilities ? utilities.amount : 0,
          purchaseExpenseLine: purchase ? purchase.amount : 0,
          livingExpensesLine: living ? living.amount : 0
        }
        row.push(record)
      })
      commit('setExpend', { data: row })
    })
  },
  async addNew(rootState, { type, amount }) {
    await expendApi.addNew({ type, amount, userId: rootState.user.userId })
  }
}

// mutations
const mutations = {
  setExpend(state, { data }) {
    state.rowData = data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
