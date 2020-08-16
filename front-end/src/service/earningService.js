import db from '../db/index'
const uuid = require('node-uuid')

const earningService = {
  async getEarning(startTime, endTime, limit) {
    let _sql = `SELECT
    i.id,
    i.time,
    i.netProfit,
    i.grossMargin,
    i.type
    FROM
    r_income_t AS i
    WHERE
    i.time >= ? AND
    i.time < ?
    ORDER BY
    i.time ASC`
    let res = await db.query(_sql, [startTime, endTime])
    return res
  },
  async add(type, grossMargin, netProfit, userId) {
    let row = {
      id: uuid.v1(),
      netProfit: netProfit,
      grossMargin: grossMargin,
      time: db.literals.now,
      type: type,
      creator: userId,
      createTime: db.literals.now
    };
    let res = await db.insert('r_income_t', row)
    return res
  }
}

export default earningService
