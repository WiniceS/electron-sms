import * as types from './types'
const mutations = {
  [types.SET_GOODS_INPUT_LIST](state, list) {
    state.goodsInputData = list
  },
  [types.SET_GOOD_INFO](state, info) {
    state.goodInfo = info
  },
  [types.SET_TOTAL](state, total) {
    state.total = total
  },
  [types.SET_PAGESIZE](state, pageSize) {
    state.pageSize = pageSize
  },
  [types.SET_CURRENTSIZE](state, currentSize) {
    state.currentSize = currentSize
  }
}

export default mutations
