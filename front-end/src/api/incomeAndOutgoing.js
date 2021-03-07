import request from '@/utils/request'

export function getList(params) {
  return request({
    url: `/IncomeAndOutgoing/Get`,
    method: 'get',
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    },
    params
  })
}

export function del({ id, type }) {
  if (type === 'income') {
    return request({
      url: `/incomeAndOutgoing/DeleteIncome/${id}`,
      method: 'delete'
    })
  }
  if (type === 'outgoing') {
    return request({
      url: `/incomeAndOutgoing/DeleteOutgoing/${id}`,
      method: 'delete'
    })
  }
}

export function add({ info, type }) {
  if (type === 'income') {
    return request({
      url: `/IncomeAndOutgoing/AddIncome`,
      method: 'post',
      data: info
    })
  }
  if (type === 'outgoing') {
    return request({
      url: `/IncomeAndOutgoing/AddOutgoing`,
      method: 'post',
      data: info
    })
  }
}

export function update({ id, info, type }) {
  if (type === 'income') {
    return request({
      url: `/IncomeAndOutgoing/ModifyIncome/${id}`,
      method: 'put',
      data: info
    })
  }
  if (type === 'ModifyOutgoing') {
    return request({
      url: `/IncomeAndOutgoing/AddOutgoing/${id}`,
      method: 'put',
      data: info
    })
  }
}
