
import useSWR from "swr"
import { getCartListApi } from '@/api/cart'

function getCart() {
  return getCartListApi().then(res => res.data)
}

export function getCartList() {
  const { data, error, mutate, isValidating } = useSWR('shoppingCart/list', getCart)

  return {
    data,
    error,
    loading: !error && !data,
    isValidating,
    mutate
  }
}