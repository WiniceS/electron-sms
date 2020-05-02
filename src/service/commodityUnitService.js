import db from '../db/index'
import moment from 'moment'
const uuid = require('node-uuid')

const commodityUnitService = {
  async getAll() {
    let _sql = 'select * from c_commodity_unit_t'
    let res = await db.query(_sql)
    return res
  },
  async getAllExtant() {
    let _sql = 'select * from c_commodity_unit_t where deleted = 0'
    let res = await db.query(_sql)
    return res
  },
  async add(name, userId) {
    let _sql = `insert into c_commodity_unit_t (id,name,creator,createTime,deleted) values ('${uuid.v1()}','${name}','${userId}','${moment().format('YYYY/MM/DD hh:mm:ss')}','0')`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async update(id, name, userId) {
    let _sql = `update c_commodity_unit_t set name='${name}',modifier='${userId}',modifyTime='${moment().format('YYYY/MM/DD hh:mm:ss')}' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async delete(id, userId) {
    let _sql = `update c_commodity_unit_t set modifier='${userId}',modifyTime='${moment().format('YYYY/MM/DD hh:mm:ss')}',deleter='${userId}',deletedTime='${moment().format('YYYY/MM/DD hh:mm:ss')}',deleted='1' where id='${id}'`
    let res = await db.query(_sql, name, userId)
    return res
  },
  async getByName(name) {
    let _sql = `select * from c_commodity_unit_t where name like '%${name}%' and delete='0'`
    let res = await db.query(_sql, name)
    return res
  }
}

export default commodityUnitService
