import service from '../service'

const expendApi = {
  async getExpend({ startTime, endTime }) {
    let res = await service.expendService.getExpend(startTime, endTime)
    return res
  }
}

export default expendApi
