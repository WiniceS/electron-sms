import request from '@/utils/request'

export function getDashboardStatistics(params) {
  return request({
    url: `/Statistics/Dashboard`,
    method: 'get',
    params
  })
}

export function getIncomeAndOutgoingStatistics(params) {
  return request({
    url: `/Statistics/IncomeAndOutgoing`,
    method: 'get',
    params
  })
}