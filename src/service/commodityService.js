import db from '../db/index'
const uuid = require('node-uuid')

const commodityService = {
  // 查询所有商品
  async getAll() {
    let _sql = `SELECT
    g.id,
    g.no,
    g.name,
    g.specification,
    g.unit,
    g.variety,
    g.sell,
    v.name AS varietyName
  FROM
    c_goods_t AS g
    INNER JOIN c_variety_t AS v ON g.variety = v.id`
    let res = await db.query(_sql)
    return res
  },
  // 查询所有商品（没有被删除的）
  async getAllExtant() {
    let _sql = `SELECT
    g.id,
    g.no,
    g.name,
    g.specification,
    g.unit,
    g.variety,
    g.sell,
    v.name AS varietyName
  FROM
    c_goods_t AS g
    INNER JOIN c_variety_t AS v ON g.variety = v.id 
  WHERE
    g.deleted = '0'`
    let res = await db.query(_sql)
    return res
  },
  // 根据商品编码查询
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
    AND g.no = '%${db.escape(no)}%'`
    let res = await db.query(_sql)
    return res
  },
  // 新增
  async add(commodity, userId) {
    let row = Object.assign(...commodity, {
      id: uuid.v1(),
      creator: userId,
      createTime: db.literals.now,
      deleted: '0'
    })
    let res = await db.insert('c_goods_t', row)
    return res
  },
  // 编辑
  async update(id, commodity, userId) {
    let row = Object.assign(...commodity, {
      modifier: userId,
      modifyTime: db.literals.now
    })
    let res = await db.update('c_goods_t', row)
    return res
  },
  // 删除
  async delete(id, userId) {
    let row = {
      id: id,
      modifier: userId,
      modifyTime: db.literals.now,
      deleter: userId,
      deletedTime: db.literals.now,
      deleted: '1'
    }
    let res = await db.update('c_goods_t', row)
    return res
  }
}

export default commodityService
