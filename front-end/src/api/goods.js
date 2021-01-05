import request from '@/utils/request'

export function getGoodsList(params) {
  return request({
    url: '/config/Good',
    method: 'get',
    params
  })
}

export function getGoodByNo(number) {
  return request({
    url: `/config/GoodByNo/${number}`,
    method: 'get'
  })
}

export function deleteGoods(id) {
  return request({
    url: `/config/DeleteGoods/${id}`,
    method: 'delete'
  })
}

export function addGood(good) {
  return request({
    url: `/config/AddGood`,
    method: 'post',
    data: good
  })
}

export function updateGood({ id, good }) {
  return request({
    url: `/config/UpdateGood/${id}`,
    method: 'put',
    data: good
  })
}

