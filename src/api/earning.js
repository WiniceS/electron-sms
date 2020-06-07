import service from '../service'

const earningApi = {
  async getEarning({ startTime, endTime }) {
    let res = await service.earningService.getEarning(startTime, endTime)
    return res
  }
}

export default earningApi
