import db from '../db/index'
import moment from 'moment'
const uuid = require('node-uuid')

const dealService = {
  async add(deal, userId) {
    if (deal.parentNo !== '') {
      let _sqlParent = `select * from c_goods_t where deleted = '0' and id = '${deal.parentId}'`
      let parent = await db.query(_sqlParent)
      if (!(parent === null || parent === '' || parent.length === 0)) {
        deal.parentId = parent.id
      }
    }
    let _sql = `insert into c_goods_t (id,no,name,specification,unit,variety,sell,cost,parentId,radio,creator,createTime,deleted) values ('${uuid.v1()}','${
      deal.no
    }','${deal.name}','${deal.specification}','${deal.unit}','${
      deal.variety
    }','${deal.sell}','${deal.cost}','${deal.parentId}','${
      deal.radio
    }','${userId}','${moment().format('YYYY/MM/DD hh:mm:ss')}','0')`
    let res = await db.query(_sql, name, userId)
    return res
  }
}

export default dealService
