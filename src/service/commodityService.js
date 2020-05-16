import db from '../db/index'
import moment from 'moment'
const uuid = require('node-uuid')

const commodityService = {
  async getAll() {
    let _sql = 'select * from c_goods_t'
    let res = await db.query(_sql)
    return res
  },
  async getAllExtant() {
    let _sql = `select * from c_goods_t where deleted = '0'`
    let res = await db.query(_sql)
    return res
  },
  async getByNo(no) {
    let _sql = `SELECT
    g.id,
    g.no,
    g.name,
    g.specification,
    g.unit,
    g.variety,
    g.sell,
    v.name AS varietyName,
    g.cost,
    g.parentId,
    g.radio 
  FROM
    c_goods_t AS g
    INNER JOIN c_variety_t AS v ON g.variety = v.id 
  WHERE
    g.deleted = '0' 
    AND g.no = '${no}'`
    let res = await db.query(_sql)
    return res
  },
  async add(commodity, userId) {
    if (commodity.parentNo !== '') {
      let _sqlParent = `select * from c_goods_t where deleted = '0' and id = '${commodity.parentId}'`
      let parent = await db.query(_sqlParent)
      if (!(parent === null || parent === '' || parent.length === 0)) {
        commodity.parentId = parent.id
      }
    }
    let _sql = `insert into c_goods_t (id,no,name,specification,unit,variety,sell,cost,parentId,radio,creator,createTime,deleted) values ('${uuid.v1()}','${
      commodity.no
    }','${commodity.name}','${commodity.specification}','${commodity.unit}','${
      commodity.variety
    }','${commodity.sell}','${commodity.cost}','${commodity.parentId}','${
      commodity.radio
    }','${userId}','${moment().format('YYYY/MM/DD hh:mm:ss')}','0')`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async update(id, commodity, userId) {
    if (commodity.parentNo !== '') {
      let _sqlParent = `select * from c_goods_t where deleted = '0' and no = '${commodity.parentNo}'`
      let parent = await db.query(_sqlParent)
      if (!(parent === null || parent === '' || parent.length === 0)) {
        commodity.parentId = parent[0].id
      }
    }
    let _sql = `update c_goods_t set no='${commodity.no}',name='${
      commodity.name
    }',specification='${commodity.specification}',unit='${
      commodity.unit
    }',variety='${commodity.variety}',sell='${commodity.sell}',cost='${
      commodity.cost
    }',parentId='${commodity.parentId}',radio='${
      commodity.radio
    }',modifier='${userId}',modifyTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async delete(id, userId) {
    let _sql = `update c_goods_t set modifier='${userId}',modifyTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}',deleter='${userId}',deletedTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}',deleted='1' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  }
}

export default commodityService
