import db from '../db/index'
const uuid = require('node-uuid')

const commodityUnitService = {
  async getAll() {
    let _sql = 'select * from c_commodity_unit_t'
    let res = await db.query(_sql)
    console.log('service', res)
    return res
  },
  async getAllExtant() {
    let _sql = 'select * from c_commodity_unit_t where deleted = 0'
    let res = await db.query(_sql)
    console.log('service', res)
    return res
  },
  async add(name, userId) {
    let _sql = `insert into c_commodity_unit_t (id,name,creator,createTime,deleted) values (${uuid.v1()},${name},${userId},${new Date()},'0')`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async update(id, name, userId) {
    let _sql = `update c_commodity_unit_t set name=${name},modifier=${userId},modifyTime=${new Date()} where id=${id}`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async delete(id, userId) {
    let _sql = `update c_commodity_unit_t set modifier=${userId},modifyTime=${new Date()},deleter=${userId},deletedTime=${new Date()},deleted='1' where id=${id}`
    let res = await db.query(_sql, name, userId)
    return res
  }
}

export default commodityUnitService
