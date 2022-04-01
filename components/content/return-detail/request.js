import useSWR from 'swr'
import { getRedundDetailApi } from '@/api/returns'
import { getExpress } from '@/api/common'

const fetchDetail = (refundNo) => {
  return getRedundDetailApi({ refundNo }).then(res => res.data)
}

export const refundDetailSwr = (refundNo) => {
  const { data, error, mutate } = useSWR('refund/detail', () => fetchDetail(refundNo))
  return {
    data,
    error,
    loading: !data && !error,
    mutate
  }
}

export const refundStatus = [
  { id: 1, name: 'processing' },
  { id: 2, name: 'buyer returns to seller' },
  { id: 3, name: 'Request Rejected' },
  { id: 4, name: 'succeed' },
  { id: 5, name: 'cancelled' },
  { id: 6, name: 'Refund Rejected' }
]

const fetchExpress = () => {
  return getExpress().then(res => res.data.couriers)
}

export const expressSwr = () => {
  const { data } = useSWR('tracking/getAllCouriersByC', fetchExpress)
  const list = data?.map(item => {
    item.value = item.slug
    item.label = item.name
    return item
  })
  return {
    data: list
  }
}