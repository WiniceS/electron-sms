import service from '../service'
// const ipc = require('electron').ipcRenderer
// console.log(ipc)

export function add(name) {}

export async function getAll() {
  let res = await service.commodityUnitService.getAll()
  console.log('api', res)
  return res
}
