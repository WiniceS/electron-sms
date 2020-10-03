import request from '@/utils/request'

export function getTypesOption() {
  return request({
    url: '/config/VarietyOption',
    method: 'get'
  })
}

export function getTypes(params) {
  return request({
    url: '/Config/Variety',
    method: 'get',
    params
  })
}

export function deleteType(id) {
  return request({
    url: `/config/DeleteVariety/${id}`,
    method: 'delete'
  })
}

export function addType(type) {
  return request({
    url: `/config/AddVariety`,
    method: 'post',
    data: type
  })
}

export function updateType({ id, type }) {
  return request({
    url: `/config/UpdateVariety/${id}`,
    method: 'put',
    data: type
  })
}

