import service from '../service'

const salesApi = {
  async getSalesTop({ startTime, endTime, amount }) {
    let res = await service.salesService.getTop(startTime, endTime, amount)
    return res
  },
  async getSalesMinimum({ startTime, endTime, amount }) {
    let res = await service.salesService.getMinimum(startTime, endTime, amount)
    return res
  }
}

export default salesApi
