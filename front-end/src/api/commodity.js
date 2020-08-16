import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const commodityApi = {
  async add(commodity, userId) {
    let res = await service.commodityService.add(commodity, userId)
    return res
  },
  async getAll() {
    let res = await service.commodityService.getAll()
    return res
  },
  async getAllExtant() {
    let res = await service.commodityService.getAllExtant()
    return res
  },
  async delete(id, userId) {
    let res = await service.commodityService.delete(id, userId)
    return res
  },
  async update(id, commodity, userId) {
    let res = await service.commodityService.update(id, commodity, userId)
    return res
  },
  async getByNo(no) {
    let res = await service.commodityService.getByNo(no)
    return res
  },
  async getById(Id) {
    let res = await service.commodityService.getById(Id)
    return res
  }
}

export default commodityApi
