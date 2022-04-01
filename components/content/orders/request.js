import useSWRInfinite from 'swr/infinite'
import useSWR from 'swr'
import { getOrderApi, getOrderItem } from "@/api/order"
import useGetParams from '@/hooks/useGetParams'
import formatParams from '@/utils/formatParams'

function getOrder (url) {
  const params = useGetParams(url)
  return getOrderApi(formatParams(params)).then(res => res.data.contents)
}

export const loadOrderList = (getKey) => {
  const {data, error, size, setSize, isValidating} = useSWRInfinite(getKey, getOrder, {revalidateFirstPage: false})

  return {
    data, 
    error,
    size,
    setSize,
    loading: !data && !error,
    isValidating
  }
}


async function fetchCardList () {
  const res = await fetch('/api/order/card-list')
  const data = await res.json()
  return data.data
}

export const getCardList = () => {
  const {data} = useSWR('/api/card-list', fetchCardList)
  return data
}

async function fetchItemDetail (id) {
  return getOrderItem(id).then(res => res.data)
}

export const getOrderItemDetail = (id) => {
  const {data, error} = useSWR(`order/orderInfo?orderNo=${id}`, () => fetchItemDetail(id))

  return {
    data,
    error,
    loading: !error && !data
  }
}