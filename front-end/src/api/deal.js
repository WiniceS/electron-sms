import request from '@/utils/request'

export function deal(record) {
  return request({
    url: `/Deal/Deal`,
    method: 'post',
    data: record
  })
}
