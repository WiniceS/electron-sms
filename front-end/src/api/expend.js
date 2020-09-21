import service from '../service'

const expendApi = {
  async getExpend({ startTime, endTime }) {
    let res = await service.expendService.getExpend(startTime, endTime)
    return res
  },
  async getNew({ type, amount, userId }) {
    let res = await service.expendService.add(type, amount, userId)
    return res
  }
}

export default expendApi
