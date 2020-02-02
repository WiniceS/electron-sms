export default {
  computedDealList(state) {
    return state.goodsDealList.map(e => {
      e.subtotal = e.good_sell_number *( e.good_sell - e.discounts)
      return e
    })
  }
}