import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import {
  initState
} from './initState'
const state = initState()

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
