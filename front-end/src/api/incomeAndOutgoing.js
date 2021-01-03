import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `/IncomeAndOutgoing/Get`,
    method: 'get',
    params
  })
}
