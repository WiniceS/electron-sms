import service from '../service'

const earningApi = {
  async getEarning({ startTime, endTime }) {
    let res = await service.earningService.getEarning(startTime, endTime)
    return res
  },
  async addNew({ type, grossMargin, netProfit, userId }) {
    let res = await service.earningService.add(type, grossMargin, netProfit, userId)
    return res
  }
}

export default earningApi
