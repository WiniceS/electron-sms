import service from '../service'

const dealApi = {
  async sell(record, userId) {
    let res = await service.dealService.sell(record, userId)
    return res
  }
}

export default dealApi
