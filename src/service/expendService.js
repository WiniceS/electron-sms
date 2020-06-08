import db from '../db/index'
const uuid = require('node-uuid')

const expendService = {
  async getExpend(startTime, endTime) {
    let _sql = `SELECT
    s.id,
    s.time,
    s.amount,
    s.goodId,
    g.name
    FROM
    r_expend_t AS s
    INNER JOIN c_goods_t AS g ON s.goodId = g.id
    WHERE
    s.time >= ? AND
    s.time <= ?
    ORDER BY
    s.amount DESC
    LIMIT ?`
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
