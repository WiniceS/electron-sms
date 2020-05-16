import db from '../db/index'
const uuid = require('node-uuid')

const dealService = {
  async sell(deal, userId) {
    let _sql = ''
    let res = await db.query(_sql)
    return res
  }
}

export default dealService
