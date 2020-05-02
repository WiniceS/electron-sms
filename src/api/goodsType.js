import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const goodsTypeApi = {
  async add(name, userId) {
    let res = await service.goodsTypeService.add(name, userId)
    return res
  },
  async getAll() {
    let res = await service.goodsTypeService.getAll()
    return res
  },
  async getAllExtant() {
    let res = await service.goodsTypeService.getAllExtant()
    return res
  },
  async delete(id, userId) {
    let res = await service.goodsTypeService.delete(id, userId)
    return res
  },
  async update(id, name, userId) {
    let res = await service.goodsTypeService.update(id, name, userId)
    return res
  }
}

export default goodsTypeApi
