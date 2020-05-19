import db from '../db/index'
import moment from 'moment'
const uuid = require('node-uuid')

const warehousingService = {
  async getAll() {
    let _sql = `SELECT
    r_inventory_t.id AS id,
    r_inventory_t.goodId AS commodityId,
    r_inventory_t.quantity AS quantity,
    c_goods_t.no AS no,
    c_goods_t.name AS name,
    c_goods_t.variety AS variety,
    c_variety_t.name AS varietyName,
    c_goods_t.specification AS specification
    FROM
    r_inventory_t
    INNER JOIN c_goods_t ON r_inventory_t.goodId = c_goods_t.id
    INNER JOIN c_variety_t ON c_goods_t.variety = c_variety_t.id`
    let res = await db.query(_sql)
    return res
  },
  async getAllExtant() {
    let _sql = `SELECT r_inventory_t.id AS id, r_inventory_t.goodId AS commodityId, r_inventory_t.quantity AS quantity,
    c_goods_t.no AS no,
    c_goods_t.name AS name,
    c_goods_t.variety AS variety,
    c_variety_t.name AS varietyName,
    c_goods_t.specification AS specification,
    r_inventory_t.quantity AS quantity
    FROM
    r_inventory_t
    INNER JOIN c_goods_t ON r_inventory_t.goodId = c_goods_t.id
    INNER JOIN c_variety_t ON c_goods_t.variety = c_variety_t.id
    WHERE
    r_inventory_t.deleted = '0'`
    let res = await db.query(_sql)
    console.log(res)
    return res
  },
  async add(warehousing, userId) {
    console.log(warehousing)
    let _sql = `insert into r_inventory_t (id,goodId,quantity,creator,createTime,deleted) values ('${uuid.v1()}','${
      warehousing.goodId
    }','${warehousing.quantity}','${userId}','${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}','0')`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async update(id, warehousing, userId) {
    let _sql = `update r_inventory_t set goodId='${
      warehousing.commodityId
    }',quantity='${
      warehousing.quantity
    }',modifier='${userId}',modifyTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async delete(id, userId) {
    let _sql = `update r_inventory_t set modifier='${userId}',modifyTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}',deleter='${userId}',deletedTime='${moment().format(
      'YYYY/MM/DD hh:mm:ss'
    )}',deleted='1' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  }
}

export default warehousingService
