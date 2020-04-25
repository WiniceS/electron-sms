const uuid = require('node-uuid')

const commodityUnitService = {
  async getAll() {
    let res = await CommodityUnit.findAll()
    console.log('service', res)
    return res
  },
  async add({ name, userId }) {
    await CommodityUnit.create({
      id: uuid.v1(),
      name,
      creator: userId,
      createTime: new Date()
    })
  }
}

export default commodityUnitService
