import request from '../../../framework/network/request.js'
import * as Type from './types'
import tarnslate from '../../../framework/tool/translate'
export default {
  // 通过id获取商品信息
  getGoodInfoById(store, { id }) {
    return request.get(`/goods/api/getGoodInfoById/${id}`, store)
  },
  // 获取商品信息，ID，每页数，当前页
  getGoodInfo(store, { id }) {
    const { commit, state } = store
    return request
      .get(
        `/goods/api/getGoodInfo?id=${id}&pageSize=${state.pageSize}&currentSize=${state.currentSize}`,
        store
      )
      .then(res => {
        commit(Type.SET_TOTAL, res.data.total)
        let list = res.data.data.map(item => {
          item.update_time = tarnslate.tarnslateDate(item.update_time, true)
          return item
        })
        commit(Type.SET_GOODS_INPUT_LIST, list)
      })
      .catch(e => {
        console.log(e)
      })
  },
  // 根据商品的id删除商品
  delGoodById(store, { id }) {
    const { dispatch } = store
    return request
      .post(
        '/goods/api/delGoodById',
        {
          id
        },
        store
      )
      .then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        dispatch('getGoodInfo', {
          id
        })
      })
  },
  // 根据ID更新商品信息
  updateGoodById(store, goodInfo) {
    return request.post('/goods/api/updateGoodById', goodInfo, store)
  },
  // 添加商品信息
  addGood(store, goodInfo) {
    return request.post('/goods/api/addGood', goodInfo, store)
  }
}
