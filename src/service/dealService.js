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

    // 新建销售记录
    let record = deal.map(m => {
      return {
        id: uuid.v1(),
        goodId: m.id,
        sellNumber: m.quantity,
        unitPrice: m.sell,
        totalPrice: m.sell * m.quantity - m.discounts,
        sellDate: db.literals.now,
        discounts: m.discounts,
        earnings: (m.sell - m.cost) * m.quantity - m.discounts,
        creator: userId,
        createTime: db.literals.now,
        deleted: '0'
      }
    })
    // 修改库存
    let inventory = inventoryList.map(m => {
      let deal = convergeDeal.find(i => i.goodId === m.goodId)
      if (deal) {
        m.quantity -= deal.quantity
      }
      m.modifier = userId
      m.modifyTime = db.literals.now
      return m
    })

    // 新增货修改销售统计数据
    let saleSql = 'SELECT * FROM `r_sales_t` WHERE time BETWEEN curdate() AND curdate() + 1'
    let saleRecord = await db.query(saleSql)
    debugger

    let addSales = []
    let updateSales = []
    deal.forEach(f => {
      let tmp = saleRecord.find(item => item.goodId === f.id)
      if (tmp) {
        let update = updateSales.find(i => i.goodId === tmp.goodId)
        if (update) {
          update.amount += f.quantity
        } else {
          tmp.amount += f.quantity
          updateSales.push(tmp)
        }
      } else {
        let add = addSales.find(i => i.goodId === f.id)
        if (add) {
          add.amount += f.quantity
        } else {
          addSales.push({
            id: uuid.v1(),
            goodId: f.id,
            time: db.literals.now,
            amount: f.quantity,
            creator: userId,
            createTime: db.literals.now
          })
        }
      }
    })

    // 新增每天收入数据
    let incomeSql = "SELECT * FROM `r_income_t` WHERE type = '0' AND time BETWEEN curdate() AND curdate() + 1"
    let incomeRecord = await db.query(incomeSql)
    debugger
    let addIncome = {}
    let updateIncome = {}
    if (incomeRecord.length > 0) {
      updateIncome = incomeRecord[0]
      updateIncome.netProfit += _.sum(deal.map(m => (m.sell - m.cost) * m.quantity - m.discounts))
      updateIncome.grossMargin += _.sum(deal.map(m => m.sell * m.quantity))
    } else {
      addIncome = {
        id: uuid.v1(),
        time: db.literals.now,
        netProfit: _.sum(deal.map(m => (m.sell - m.cost) * m.quantity - m.discounts)),
        grossMargin: _.sum(deal.map(m => m.sell * m.quantity)),
        type: '0',
        creator: userId,
        createTime: db.literals.now
      }
    }

    // 新增每天支出数据
    let expendSql = "SELECT * FROM `r_expend_t` WHERE type = '0' AND time BETWEEN curdate() AND curdate() + 1"
    let expendRecord = await db.query(expendSql)
    debugger
    let addExpend = {}
    let updateExpend = {}
    if (expendRecord.length > 0) {
      updateExpend = expendRecord[0]
      updateExpend.amount += _.sum(deal.map(m => m.cost * m.quantity - m.discounts))
    } else {
      addExpend = {
        id: uuid.v1(),
        time: db.literals.now,
        amount: _.sum(deal.map(m => m.cost * m.quantity - m.discounts)),
        type: '0',
        creator: userId,
        createTime: db.literals.now
      }
    }

    // 开启事务
    let tran = await db.beginTransaction()
    try {
      await tran.insert('r_sell_t', record)
      await tran.updateRows('r_inventory_t', inventory)

      if (addSales.length > 0) {
        await tran.insert('r_sales_t', addSales)
      }
      if (updateSales.length > 0) {
        await tran.updateRows('r_sales_t', updateSales)
      }

      if (addIncome.id) {
        await tran.insert('r_income_t', addIncome)
      }
      if (updateIncome.id) {
        await tran.update('r_income_t', updateIncome)
      }

      if (addExpend.id) {
        await tran.insert('r_expend_t', addExpend)
      }
      if (updateExpend.id) {
        await tran.update('r_expend_t', updateExpend)
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
