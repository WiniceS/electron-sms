import db from '../db/index'

const salesService = {
  async getTop(startTime, endTime, amount) {
    let _sql = `SELECT
    s.id,
    s.time,
    s.amount,
    s.goodId,
    g.name
    FROM
    r_sales_t AS s
    INNER JOIN c_goods_t AS g ON s.goodId = g.id
    WHERE
    s.time >= ? AND
    s.time <= ?
    ORDER BY
    s.amount DESC
    LIMIT ?`
    let res = await db.query(_sql, [startTime, endTime, amount])
    return res
  },
  async getMinimum(startTime, endTime, amount) {
    let _sql = `SELECT
    s.id,
    s.time,
    s.amount,
    s.goodId,
    g.name
    FROM
    r_sales_t AS s
    INNER JOIN c_goods_t AS g ON s.goodId = g.id
    WHERE
    s.time >= ? AND
    s.time <= ?
    ORDER BY
    s.amount ASC
    LIMIT ?`
    let res = await db.query(_sql, [startTime, endTime, amount])
    return res
  }
}

export default salesService
