import earningApi from '@/api/earning'

// initial state
const state = {
  chartSettings: {
    showLine: ['user', 'user2'],
    yAxisName: ['收入'],
    legendName: {
      user: '用户',
      user2: '永固',
      down: '啥率'
    },
    labelMap: {
      user: '用户',
      user2: '永固',
      down: '啥率'
    },
    label: { show: true, position: 'top' }
  },
  chartData: {
    columns: ['date', 'user', 'user2', 'down'],
    rows: [
      { date: '1/1', user: 13, user2: 10, down: 0.32 },
      { date: '1/2', user: 35, user2: 32, down: 0.26 },
      { date: '1/3', user: 29, user2: 26, down: 0.76 },
      { date: '1/4', user: 17, user2: 14, down: 0.49 },
      { date: '1/5', user: 37, user2: 34, down: 0.323 },
      { date: '1/6', user: 45, user2: 42, down: 0.78 }
    ]
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
      let tmp = {
        columns: ['date', 'utilitiesExpense', 'purchaseExpense', 'livingExpenses', 'utilitiesExpenseLine', 'purchaseExpenseLine', 'livingExpensesLine'],
        row: res.map(m => {
          return { good: m.name, sales: m.amount }
        })
      }
      commit('setExpend', { data: tmp })
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
