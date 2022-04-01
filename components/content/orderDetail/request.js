import useSWR from "swr"
import { getOrderDetailApi } from "@/api/order"


function getOrderDetailFetch(id) {
  return getOrderDetailApi(id).then(res => res.data)
}

export function getOrderDetail(id) {
  const {data, error} = useSWR(`order/detail?orderNo=${id}`, () => getOrderDetailFetch(id))

  return {
    data,
    error,
    loading: !error && !data
  }
}

async function getOrderStatusApi () {
  const res = await fetch('/api/order/order-status')
  const data = await res.json()
  return data.orderStatusData
}

export function getOrderStatus() {
  const {data: orderStatus} = useSWR('/api/order/order-status', getOrderStatusApi) 
  return orderStatus
}