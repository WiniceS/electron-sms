import db from '../db/index'

const salesService = {
  async getTop(startTime, endTime, amount) {
    let _sql = `SELECT
    r.id,
    r.time,
    Sum(r.amount) AS amount,
    r.goodId,
    g.name
    FROM
    r_sales_t AS r
    INNER JOIN c_goods_t AS g ON r.goodId = g.id
    WHERE
    r.time >= ? AND
    r.time < ?
    GROUP BY
    r.goodId
    ORDER BY
    Sum(r.amount) DESC
    LIMIT ?`
    let res = await db.query(_sql, [startTime, endTime, amount])
    return res
  },
  async getMinimum(startTime, endTime, amount) {
    let _sql = `SELECT
    r.id,
    r.time,
    Sum(r.amount) AS amount,
    r.goodId,
    g.name
    FROM
    r_sales_t AS r
    INNER JOIN c_goods_t AS g ON r.goodId = g.id
    WHERE
    r.time >= ? AND
    r.time < ?
    GROUP BY
    r.goodId
    ORDER BY
    Sum(r.amount) ASC
    LIMIT ?`
    let res = await db.query(_sql, [startTime, endTime, amount])
    return res
  }
}

export default salesService
