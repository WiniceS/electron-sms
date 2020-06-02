import db from '../db/index'
import _ from 'lodash'
const uuid = require('node-uuid')

const dealService = {
  async sell(deal, userId) {
    // 获取所有的销售的物料库存数
    let groupTmp = _.groupBy(deal, 'goodId')
    let goodIds = Object.keys(groupTmp)
    let convergeDeal = goodIds.map(m => {
      return { goodId: m, quantity: _.reduce(groupTmp[m], (sum, n) => sum + n.quantity, 0) }
    })
    let inventoryList = db.select('r_inventory_t', {
      where: {
        id: goodIds,
        deleted: '0'
      }
    })
    inventoryList.forEach(f => {
      let deal = convergeDeal.find(i => i.goodId === f.goodId)
      if (deal) {
        if (f.quantity < deal.quantity) {
          throw new Error('库存数量小于销售数额')
        }
      }
    })

    let record = deal.map(m => {
      return {
        id: uuid.v1(),
        goodId: m.goodId,
        sellNumber: m.quantity,
        unitPrice: m.sell,
        totalPrice: m.sell * m.quantity,
        sellDate: db.literals.now,
        discounts: m.discounts,
        earnings: (m.sell - m.discounts - m.cost) * m.quantity,
        creator: userId,
        createTime: db.literals.now,
        deleted: '0'
      }
    })
    let inventory = inventoryList.map(m => {
      let deal = convergeDeal.find(i => i.goodId === m.goodId)
      if (deal) {
        m.quantity -= deal.quantity
      }
      return m
    })

    // 开启事务
    let tran = db.beginTransaction()
    try {
      await tran.insert('r_sell_t', record)
      await tran.update('r_inventory_t', inventory)
      await tran.commit()
    } catch (err) {
      await tran.rollback()
      throw err
    }
  }
}

export default dealService
