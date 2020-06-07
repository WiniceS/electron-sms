import service from '../service'

const salesApi = {
  async getSalesTop(amount) {
    let res = await service.salesService.getTop(amount)
    return res
  }
}

export default salesApi
