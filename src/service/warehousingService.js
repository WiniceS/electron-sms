import db from '../db/index'
const uuid = require('node-uuid')

const warehousingService = {
  async getAll() {
    let _sql = `SELECT
    i.id AS id,
    i.goodId AS commodityId,
    i.quantity AS quantity,
    g.no AS no,
    g.name AS name,
    g.variety AS variety,
    v.name AS varietyName,
    g.specification AS specification
    FROM
    r_inventory_t AS i
    INNER JOIN c_goods_t AS g ON i.goodId = g.id
    INNER JOIN c_variety_t AS v ON g.variety = v.id`
    let res = await db.query(_sql)
    return res
  },
  async getAllExtant() {
    let _sql = `SELECT
    i.id AS id,
    i.goodId AS commodityId,
    i.quantity AS quantity,
    g.no AS no,
    g.name AS name,
    g.variety AS variety,
    v.name AS varietyName,
    g.specification AS specification
    FROM
    r_inventory_t AS i
    INNER JOIN c_goods_t AS g ON i.goodId = g.id
    INNER JOIN c_variety_t AS v ON g.variety = v.id
    where
    i.deleted='0'`
    let res = await db.query(_sql)
    return res
  },
  async add(warehousing, userId) {
    let row = {
      id: uuid.v1(),
      goodId: warehousing.goodId,
      quantity: warehousing.quantity,
      creator: userId,
      createTime: db.literals.now,
      deleted: '0'
    }
    let res = await db.insert('r_inventory_t', row)
    return res
  },
  async update(id, warehousing, userId) {
    let row = {
      id: id,
      goodId: warehousing.commodityId,
      quantity: warehousing.quantity,
      modifier: userId,
      modifyTime: db.literals.now
    }
    let res = await db.update('r_inventory_t', row)
    return res
  },
  async delete(id, userId) {
    let row = {
      id: id,
      modifier: userId,
      modifyTime: db.literals.now,
      deleter: userId,
      deletedTime: db.literals.now,
      deleted: '1'
    }
    let res = await db.update('r_inventory_t', row)
    return res
  }
}

export default warehousingService
