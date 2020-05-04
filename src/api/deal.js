import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

const dealApi = {
  async add(deal, userId) {
    let res = await service.dealService.add(deal, userId)
    return res
  }
}

export default dealApi
