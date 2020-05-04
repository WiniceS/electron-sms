import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const warehousingApi = {
  async add(warehousing, userId) {
    let res = await service.warehousingService.add(warehousing, userId)
    return res
  },
  async getAll() {
    let res = await service.warehousingService.getAll()
    return res
  },
  async getAllExtant() {
    let res = await service.warehousingService.getAllExtant()
    return res
  },
  async delete(id, userId) {
    let res = await service.warehousingService.delete(id, userId)
    return res
  },
  async update(id, warehousing, userId) {
    let res = await service.warehousingService.update(id, warehousing, userId)
    return res
  }
}

export default warehousingApi
