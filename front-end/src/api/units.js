import request from '@/utils/request'

export function getUnitsOption() {
  return request({
    url: '/config/UnitOption',
    method: 'get'
  })
}

export function getUnits(params) {
  return request({
    url: '/Config/Unit',
    method: 'get',
    params
  })
}

export function deleteUnit(id) {
  return request({
    url: `/config/DeleteUnit/${id}`,
    method: 'delete'
  })
}

export function addUnit(unit) {
  return request({
    url: `/Config/AddUnit`,
    method: 'post',
    data: unit
  })
}

export function updateUnit({ id, unit }) {
  return request({
    url: `/config/UpdateUnit/${id}`,
    method: 'put',
    data: unit
  })
}
