import * as types from './types'
const mutations = {
  [types.SET_DEAL_LIST](state, list) {
    state.goodsDealList = list
  },
  [types.ADD_DEAL_LIST](state, good) {
    state.goodsDealList.push(good)
  },
  [types.DEL_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList.filter(e => {
      return e.good_id !== id
    })
  },
  [types.PLUS_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList.map(e => {
      if (e.good_id === id) {
        e.good_sell_number++
      }
      return e
    })
  },
  [types.MINUS_DEAL_LIST](state, id) {
    state.goodsDealList = state.goodsDealList
      .map(e => {
        if (e.good_id === id) {
          e.good_sell_number--
        }
        return e
      })
      .filter(f => f.good_sell_number > 0)
  },
  [types.MODIFY_DISCOUNTS](state, { value, id }) {
    state.goodsDealList = state.goodsDealList.map(e => {
      if (e.good_id === id) {
        e.discounts = value
      }
      return e
    })
  },
  [types.CLEAR_DEAL_LIST](state) {
    state.goodsDealList = []
  }
}

export default mutations
