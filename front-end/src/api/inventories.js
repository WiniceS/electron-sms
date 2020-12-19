import request from '@/utils/request'

export function getInventories(params) {
  return request({
    url: '/Config/Inventory',
    method: 'get',
    params
  })
}

export function deleteInventory(id) {
  return request({
    url: `/config/DeleteInventory/${id}`,
    method: 'delete'
  })
}

export function addInventory(inventory) {
  return request({
    url: `/config/AddInventory`,
    method: 'post',
    data: inventory
  })
}

export function updateInventory({ id, inventory }) {
  return request({
    url: `/config/UpdateInventory/${id}`,
    method: 'put',
    data: inventory
  })
}

export function getInventoryStatistics(params) {
  return request({
    url: `/Statistics/Inventory`,
    method: 'get',
    params
  })
}
