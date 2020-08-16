import db from '../db/index'
const uuid = require('node-uuid')

const expendService = {
  async getExpend(startTime, endTime) {
    let _sql = `SELECT
    e.id,
    e.time,
    e.amount,
    e.type
    FROM
    r_expend_t AS e
    WHERE
    e.time >= ? AND
    e.time < ?
    ORDER BY
    e.time ASC`
    let res = await db.query(_sql, [startTime, endTime])
    return res
  },
  async add(type, amount, userId) {
    let row = {
      id: uuid.v1(),
      amount: amount,
      time: db.literals.now,
      type: type,
      creator: userId,
      createTime: db.literals.now
    };
    let res = await db.insert('r_expend_t', row)
    return res
  }
}

export default expendService
