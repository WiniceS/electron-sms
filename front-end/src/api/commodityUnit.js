import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const commodityUnitApi = {
  async add(name, userId) {
    let res = await service.commodityUnitService.add(name, userId)
    return res
  },
  async getAll() {
    let res = await service.commodityUnitService.getAll()
    return res
  },
  async getAllExtant() {
    let res = await service.commodityUnitService.getAllExtant()
    return res
  },
  async delete(id, userId) {
    let res = await service.commodityUnitService.delete(id, userId)
    return res
  },
  async update(id, name, userId) {
    let res = await service.commodityUnitService.update(id, name, userId)
    return res
  }
}

export default commodityUnitApi
