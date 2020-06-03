import db from '../db/index'
import _ from 'lodash'
const uuid = require('node-uuid')

const dealService = {
  async sell(deal, userId) {
    // 获取所有的销售的物料库存数
    let groupTmp = _.groupBy(deal, 'id')
    let goodIds = Object.keys(groupTmp)
    let convergeDeal = goodIds.map(m => {
      return { goodId: m, quantity: _.reduce(groupTmp[m], (sum, n) => sum + n.quantity, 0) }
    })
    let inventoryList = await db.select('r_inventory_t', {
      where: {
        goodId: goodIds,
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
        goodId: m.id,
        sellNumber: m.quantity,
        unitPrice: m.sell,
        totalPrice: m.sell * m.quantity,
        sellDate: db.literals.now,
        discounts: m.discounts,
        earnings: (m.sell - m.cost) * m.quantity - m.discounts,
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
      m.modifier = userId
      m.modifyTime = db.literals.now
      return m
    })

    // let inventory = inventoryList.map(m => {
    //   let deal = convergeDeal.find(i => i.goodId === m.goodId)
    //   if (deal) {
    //     m.quantity -= deal.quantity
    //   }
    //   return {
    //     row: { modifier: userId, modifyTime: db.literals.now, quantity: m.quantity },
    //     where: { id: m.id }
    //   }
    // })

    // 开启事务
    let tran = await db.beginTransaction()
    try {
      await tran.insert('r_sell_t', record)
      for (let i = 0; i < inventory.length; i++) {
        await tran.update('r_inventory_t', inventory[i])
      }
      await tran.commit()
    } catch (err) {
      console.log(err)
      await tran.rollback()
      throw err
    }
  }
}

export default dealService
