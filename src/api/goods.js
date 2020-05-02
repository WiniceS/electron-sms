import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const goodsApi = {
  async add(name, userId) {
    let res = await service.goodsService.add(name, userId)
    return res
  },
  async getAll() {
    let res = await service.goodsService.getAll()
    return res
  },
  async getAllExtant() {
    let res = await service.goodsService.getAllExtant()
    return res
  },
  async delete(id, userId) {
    let res = await service.goodsService.delete(id, userId)
    return res
  },
  async update(id, name, userId) {
    let res = await service.goodsService.update(id, name, userId)
    return res
  }
}

export default goodsApi
