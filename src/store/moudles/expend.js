import expendApi from '@/api/expend'

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
  chartData: {
    columns: ['date', 'utilitiesExpense', 'purchaseExpense', 'livingExpenses', 'utilitiesExpenseLine', 'purchaseExpenseLine', 'livingExpensesLine'],
    rows: [
      { date: '1/1', utilitiesExpense: 13, purchaseExpense: 10, livingExpenses: 32, utilitiesExpenseLine: 13, purchaseExpenseLine: 10, livingExpensesLine: 32 },
      { date: '1/2', utilitiesExpense: 35, purchaseExpense: 32, livingExpenses: 26, utilitiesExpenseLine: 35, purchaseExpenseLine: 32, livingExpensesLine: 26 },
      { date: '1/3', utilitiesExpense: 29, purchaseExpense: 26, livingExpenses: 76, utilitiesExpenseLine: 29, purchaseExpenseLine: 26, livingExpensesLine: 76 },
      { date: '1/4', utilitiesExpense: 17, purchaseExpense: 14, livingExpenses: 49, utilitiesExpenseLine: 17, purchaseExpenseLine: 14, livingExpensesLine: 49 },
      { date: '1/5', utilitiesExpense: 37, purchaseExpense: 34, livingExpenses: 23, utilitiesExpenseLine: 37, purchaseExpenseLine: 34, livingExpensesLine: 23 },
      { date: '1/6', utilitiesExpense: 45, purchaseExpense: 42, livingExpenses: 78, utilitiesExpenseLine: 45, purchaseExpenseLine: 42, livingExpensesLine: 78 }
    ]
  }
}

// getters
const getters = {

}

// actions
const actions = {
  async getExpend(store, { startTime, endTime }) {
    const { commit } = store
    await expendApi.getExpend({ startTime, endTime }).then(res => {
      let tmp = {
        columns: ['date', 'utilitiesExpense', 'purchaseExpense', 'livingExpenses', 'utilitiesExpenseLine', 'purchaseExpenseLine', 'livingExpensesLine'],
        row: res.map(m => {
          return { good: m.name, sales: m.amount }
        })
      }
      commit('setExpend', { data: tmp })
    })
  }
}

// mutations
const mutations = {
  setExpend(state, { data }) {
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
