import * as types from './types'
import request from 'framework/network/request.js'
import { Message } from 'element-ui'
export default {
  onSale({ state, commit }, sale) {
    const tmp = {
      goodsId: '0000000000000',
      goodsName: '优惠金额',
      goodsSpecification: '',
      goodsSell: -sale,
      goodsSellNumber: 1
    }
    const tmpList = state.goodsDealList
      .filter(f => f.goodsId !== '0000000000000')
      .concat([tmp])
    commit(types.SET_DEAL_LIST, tmpList)
  },
  // 获取商品信息
  getGoodInfoById(store, id) {
    const { commit, state } = store
    return request.get(`/goods/api/getGoodInfoById/${id}`, store).then(res => {
      let goodInfo = res.data.goodInfo
      if (goodInfo.length > 0) {
        let alreadyHad = state.goodsDealList.some(item => item.good_id === id)
        if (alreadyHad) {
          commit('PLUS_DEAL_LIST', id)
        } else {
          let good = goodInfo[0]
          good.good_sell_number = 1
          good.discounts = 0
          good.sell_date = new Date()
          commit('ADD_DEAL_LIST', good)
        }
      } else {
        Message({
          type: 'error',
          $message: '没有找到此商品，请前往商品入库页面添加'
        })
      }
    })
  },
  // 商品销售
  sell(store) {
    const { commit, state } = store
    return request
      .post('/sell/api/sell', state.goodsDealList, store)
      .then(res => {
        commit('CLEAR_DEAL_LIST')
      })
  }
}
