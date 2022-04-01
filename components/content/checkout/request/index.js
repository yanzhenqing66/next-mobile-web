import useSWR from "swr"
import {
  getAddressList,
  getStateList,
  getAddressItem,
  getPayCardList,
  getPayCardDetail,
  getCheckoutApi,
  createOrder as createOrderApi
} from "@/api/cart"
import { createUsn } from "@/api/common"
import store from '@/store'

// 地址列表
function getAddressApi() {
  return getAddressList().then(res => res.data)
}

export function getAddress() {
  const { data, error, mutate } = useSWR('userAddress/list', getAddressApi)

  return {
    data,
    error,
    loading: !error && !data,
    mutate
  }
}


function getStateApi() {
  return getStateList().then(res => res.data)
}

export function getState() {
  const { data } = useSWR('country/getUSCountryList', getStateApi)

  if (data) {
    const stateList = data.map(item => {
      item.label = item.ename
      item.value = item.code
      return item
    })

    return {
      stateList
    }
  } else {
    return {
      stateList: undefined
    }
  }
}

function getAddressItemApi(id) {
  return getAddressItem(id).then(res => res.data)
}

export function getAddressDetail(id) {
  const { data } = useSWR(`userAddress/detail?id=${id}`, () => getAddressItemApi(id))
  return {
    formData: data
  }
}

// 生成订单
const getShopInfo = (orderInfo) => {
  const Store = store.getState()
  const { notes } = Store.editCheckReducer

  const shopInfo = orderInfo?.shops?.map(item => {
    const buyList = item?.skus?.map(item2 => {
      return {
        skuId: item2.skuId,
        skuNum: item2.skuNum
      }
    })
    const note = notes.filter(item3 => item3?.shopId == item?.shopId)?.[0]?.note || ''
    return {
      shopId: item.shopId,
      note,
      buyList
    }
  })
  return shopInfo
}

export const createOrder = (orderInfo) => {
  return new Promise((resolve, reject) => {
    const params = {
      // buyOrigin: 'cart',
      orderChannel: 1,
      addressId: orderInfo?.userAddress?.id,
      cardId: orderInfo?.payment?.id,
      shopInfo: getShopInfo(orderInfo),
    }
    createUsn().then(res1 => {
      createOrderApi(params, {'Access-Api-Unique-Serial-Number': res1.data}).then(res => {
        if (res.code === 200) {
          resolve(res?.data)
        } else {
          reject(res.data)
        }
      })
    }).catch(err => {
      reject(err)
    })
  })
}


// 银行卡 支付
function getPayCardListApi() {
  return getPayCardList().then(res => res.data)
}

export function getPayCard() {
  const { data, error, mutate } = useSWR('payment/paymentList?type=1', getPayCardListApi)

  return {
    data,
    error,
    loading: !error && !data,
    mutate
  }
}

function getPayCardDetailApi(id) {
  return getPayCardDetail(id).then(res => res.data)
}

export function getPayCardItemDetail(id) {
  const { data } = useSWR(`payment/paymentDetail?id=${id}`, () => getPayCardDetailApi(id))

  return {
    data
  }
}

function getCheckout(url) {
  return getCheckoutApi(url).then(res => res.data)
}

export function getCheckoutInfo(id = null) {
  const url = id ? `order/preSubmitOrder/addressId=${id}` : `order/preSubmitOrder`
  const { data: orderInfo, mutate } = useSWR(url, () => getCheckout(url))

  return {
    orderInfo,
    checkMutate: mutate
  }
}