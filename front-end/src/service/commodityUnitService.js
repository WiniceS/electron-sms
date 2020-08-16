import db from '../db/index'
const uuid = require('node-uuid')

const commodityUnitService = {
  async getAll() {
    let res = await db.select('c_unit_t')
    return res
  },
  async getAllExtant() {
    let res = await db.select('c_unit_t', { where: { deleted: '0' } })
    return res
  },
  async getById(id) {
    let res = await db.select('c_unit_t', { where: { id } })
    return res
  },
  async add(name, userId) {
    let row = {
      id: uuid.v1(),
      name: name,
      creator: userId,
      createTime: db.literals.now,
      deleted: '0'
    }
    let res = await db.insert('c_unit_t', row)
    return res
  },
  async update(id, name, userId) {
    let row = {
      id: id,
      name: name,
      modifier: userId,
      modifyTime: db.literals.now
    }
    let res = await db.update('c_unit_t', row)
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
    let res = await db.update('c_unit_t', row)
    return res
  },
  async getByName(name) {
    let _sql = `select * from c_unit_t where name like '%${db.escape(name)}%' and delete='0'`
    let res = await db.query(_sql)
    return res
  }
}

export default commodityUnitService
